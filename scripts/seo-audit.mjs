#!/usr/bin/env node
/**
 * SEO invariant audit.
 *
 *   node scripts/seo-audit.mjs                          # audits https://servey.in
 *   node scripts/seo-audit.mjs --base=http://localhost:3000
 *   node scripts/seo-audit.mjs --json                   # machine-readable
 *
 * Reads sitemap.xml, fetches every URL in it, and asserts the invariants that
 * this site's ranking actually depends on. Exits non-zero if any fail, so it
 * can gate a deploy.
 *
 * Dependency-free on purpose: no HTML parser, no crawler library. The checks
 * below are all structural enough for regex, and a script that never needs
 * `npm install` is a script that still runs in two years.
 *
 * What it checks, and why each one is here:
 *
 *   1. Exactly one <title>, <= 60 chars.  The `%s - Servey` template adds 9
 *      chars, so a metaTitle over 51 silently gets truncated in the SERP.
 *   2. Meta description 110-160 chars.  Shorter wastes the slot, longer is cut.
 *   3. Exactly one self-referential <link rel="canonical">.  Doubly load-bearing
 *      here: skipTrailingSlashRedirect means /blog/ no longer 308s to /blog, so
 *      the canonical is the only thing keeping the duplicate out of the index.
 *   4. og:url agrees with the canonical.  Without an explicit openGraph.url a
 *      page inherits the homepage URL from the root layout and the two disagree.
 *   5. BreadcrumbList ListItem count == visible breadcrumb trail items.  This
 *      exact mismatch shipped once (3 in JSON-LD, 2 visible) and is precisely
 *      what Google penalises.
 *   6. Exactly one <h1>, and heading levels never skip (h2 -> h4 fails).
 *   7. Every JSON-LD block parses, and every {"@id": ...} reference resolves to
 *      a node that is actually defined somewhere on the page.
 *   8. Every sitemap URL returns 200.
 */

const DEFAULT_BASE = "https://servey.in";

/* ----------------------------------------------------------------- *
 * Args                                                               *
 * ----------------------------------------------------------------- */
const args = process.argv.slice(2);
const baseArg = args.find((a) => a.startsWith("--base="));
const base = (baseArg ? baseArg.slice("--base=".length) : DEFAULT_BASE).replace(/\/+$/, "");
const asJson = args.includes("--json");
const concurrency = 6;

if (args.includes("--help") || args.includes("-h")) {
  console.log("usage: node scripts/seo-audit.mjs [--base=<origin>] [--json]");
  process.exit(0);
}

/* ----------------------------------------------------------------- *
 * Output                                                             *
 * ----------------------------------------------------------------- */
const color = process.stdout.isTTY && !asJson;
const c = {
  red: (s) => (color ? `\x1b[31m${s}\x1b[0m` : s),
  green: (s) => (color ? `\x1b[32m${s}\x1b[0m` : s),
  yellow: (s) => (color ? `\x1b[33m${s}\x1b[0m` : s),
  dim: (s) => (color ? `\x1b[2m${s}\x1b[0m` : s),
  bold: (s) => (color ? `\x1b[1m${s}\x1b[0m` : s),
};

/* ----------------------------------------------------------------- *
 * HTML helpers                                                       *
 * ----------------------------------------------------------------- */

/**
 * Comments and inline SVG both contain things that look like the tags we count
 * - an <svg><title> would be counted as the page title, and a commented-out
 * heading would break the heading order. Strip both before anything else.
 */
function stripNoise(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, "");
}

function decodeEntities(s) {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function text(s) {
  return decodeEntities(s.replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim();
}

/** Pull one attribute out of a raw tag string, single or double quoted. */
function attr(tag, name) {
  const m = tag.match(new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i"));
  return m ? decodeEntities(m[2] ?? m[3] ?? "") : null;
}

/** All <meta> / <link> tags whose `key` attribute equals `value`. */
function metaTags(html, tagName, key, value) {
  const out = [];
  const re = new RegExp(`<${tagName}\\b[^>]*>`, "gi");
  for (const m of html.matchAll(re)) {
    const got = attr(m[0], key);
    if (got && got.toLowerCase() === value) out.push(m[0]);
  }
  return out;
}

/**
 * Extract the inner HTML of the first element matching `openRe`, tracking
 * nesting so a nested element of the same type does not close it early.
 */
function elementInner(html, openRe, tagName) {
  const start = html.match(openRe);
  if (!start) return null;
  const rest = html.slice(start.index + start[0].length);
  const re = new RegExp(`<${tagName}\\b|</${tagName}>`, "gi");
  let depth = 1;
  for (const m of rest.matchAll(re)) {
    depth += m[0][1] === "/" ? -1 : 1;
    if (depth === 0) return rest.slice(0, m.index);
  }
  return null;
}

/* ----------------------------------------------------------------- *
 * Checks                                                             *
 * ----------------------------------------------------------------- */

/** Trailing slashes are not meaningful here; the root path keeps its "/". */
function normalizePath(p) {
  return p.length > 1 ? p.replace(/\/+$/, "") : p;
}

function checkTitle(html, add) {
  const titles = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map((m) => text(m[1]));
  if (titles.length !== 1) {
    return add(false, "title", `expected exactly 1 <title>, found ${titles.length}`);
  }
  const t = titles[0];
  add(
    t.length <= 60,
    "title",
    `${t.length} chars ${t.length <= 60 ? "" : "(over 60, will be truncated) "}- "${t}"`,
  );
}

function checkDescription(html, add) {
  const tags = metaTags(html, "meta", "name", "description");
  if (tags.length !== 1) {
    return add(false, "description", `expected exactly 1 meta description, found ${tags.length}`);
  }
  const d = attr(tags[0], "content") ?? "";
  const ok = d.length >= 110 && d.length <= 160;
  add(ok, "description", `${d.length} chars${ok ? "" : " (want 110-160)"}`);
}

function checkCanonical(html, pageUrl, add) {
  const tags = metaTags(html, "link", "rel", "canonical");
  if (tags.length !== 1) {
    add(false, "canonical", `expected exactly 1 rel=canonical, found ${tags.length}`);
    return null;
  }
  const href = attr(tags[0], "href");
  let canonical;
  try {
    canonical = new URL(href, pageUrl);
  } catch {
    add(false, "canonical", `unparseable href: ${href}`);
    return null;
  }
  // Compared by path, not by full URL: auditing a local build serves pages on
  // localhost while the canonical still points at the production origin, which
  // is correct. Origin consistency is asserted once, across all pages, later.
  const same = normalizePath(canonical.pathname) === normalizePath(new URL(pageUrl).pathname);
  add(same, "canonical", same ? href : `points at ${href}, not this page`);
  return canonical;
}

function checkOgUrl(html, canonical, add) {
  const tags = metaTags(html, "meta", "property", "og:url");
  if (tags.length !== 1) {
    return add(false, "og:url", `expected exactly 1 og:url, found ${tags.length}`);
  }
  if (!canonical) return add(false, "og:url", "cannot compare - canonical is invalid");
  const og = attr(tags[0], "content") ?? "";
  const ok = normalizePath(new URL(og, canonical).pathname) === normalizePath(canonical.pathname);
  add(ok, "og:url", ok ? og : `${og} disagrees with canonical ${canonical.href}`);
}

function checkHeadings(html, add) {
  const bodyAt = html.search(/<body\b/i);
  const body = bodyAt === -1 ? html : html.slice(bodyAt);
  const levels = [...body.matchAll(/<h([1-6])\b[^>]*>/gi)].map((m) => Number(m[1]));
  const h1s = levels.filter((l) => l === 1).length;
  add(h1s === 1, "h1", `found ${h1s} <h1>${h1s === 1 ? "" : " (want exactly 1)"}`);

  const skips = [];
  let prev = 0;
  for (const level of levels) {
    if (prev && level > prev + 1) skips.push(`h${prev} -> h${level}`);
    prev = level;
  }
  add(
    skips.length === 0,
    "heading order",
    skips.length === 0
      ? `h${levels.join(", h")}`.slice(0, 90)
      : `skipped a level: ${skips.join(", ")}`,
  );
}

/**
 * Visible trail items, not anchors: the current page is rendered as plain text
 * with aria-current rather than a link, and it still has a matching ListItem in
 * the JSON-LD. The `<li aria-hidden>` separators are not items and are skipped.
 */
function visibleBreadcrumbCount(html) {
  const nav = elementInner(
    html,
    /<nav\b[^>]*aria-label\s*=\s*("Breadcrumb"|'Breadcrumb')[^>]*>/i,
    "nav",
  );
  if (nav === null) return null;
  return [...nav.matchAll(/<li\b[^>]*>/gi)].filter((m) => !/\baria-hidden\b/i.test(m[0])).length;
}

function checkBreadcrumbs(html, blocks, add) {
  const lists = blocks
    .flatMap((b) => flattenNodes(b))
    .filter((node) => node["@type"] === "BreadcrumbList");
  const visible = visibleBreadcrumbCount(html);

  if (lists.length === 0) {
    // A page with no trail and no markup is consistent; markup without a trail
    // is the failure Google acts on.
    return add(
      visible === null,
      "breadcrumbs",
      visible === null ? "none (page has no trail)" : `${visible} visible items, no JSON-LD`,
    );
  }
  if (lists.length > 1) return add(false, "breadcrumbs", `${lists.length} BreadcrumbList blocks`);
  if (visible === null) {
    return add(false, "breadcrumbs", "BreadcrumbList in JSON-LD but no visible trail");
  }
  const items = Array.isArray(lists[0].itemListElement) ? lists[0].itemListElement.length : 0;
  add(
    items === visible,
    "breadcrumbs",
    items === visible
      ? `${items} ListItems == ${visible} visible items`
      : `${items} ListItems but ${visible} visible items`,
  );
}

/** Every plain object anywhere in a JSON-LD block, including @graph members. */
function flattenNodes(value, out = []) {
  if (Array.isArray(value)) {
    for (const v of value) flattenNodes(v, out);
  } else if (value && typeof value === "object") {
    out.push(value);
    for (const v of Object.values(value)) flattenNodes(v, out);
  }
  return out;
}

function checkJsonLd(html, add) {
  const raw = [
    ...html.matchAll(
      /<script\b[^>]*type\s*=\s*("application\/ld\+json"|'application\/ld\+json')[^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ].map((m) => m[2]);

  const blocks = [];
  const bad = [];
  raw.forEach((src, i) => {
    try {
      blocks.push(JSON.parse(src));
    } catch (err) {
      bad.push(`block ${i + 1}: ${err.message}`);
    }
  });
  add(
    bad.length === 0,
    "json-ld parse",
    bad.length === 0 ? `${blocks.length} block(s) valid` : bad.join("; "),
  );

  // A node that carries an @id plus any other key is a definition; an object
  // whose only key is @id is a reference to one, and must resolve.
  const nodes = blocks.flatMap((b) => flattenNodes(b));
  const defined = new Set();
  const referenced = [];
  for (const node of nodes) {
    const id = node["@id"];
    if (typeof id !== "string") continue;
    if (Object.keys(node).length === 1) referenced.push(id);
    else defined.add(id);
  }
  const dangling = [...new Set(referenced.filter((id) => !defined.has(id)))];
  add(
    dangling.length === 0,
    "@id references",
    dangling.length === 0
      ? `${referenced.length} reference(s) resolve`
      : `unresolved: ${dangling.join(", ")}`,
  );

  return blocks;
}

/* ----------------------------------------------------------------- *
 * Drivers                                                            *
 * ----------------------------------------------------------------- */
async function auditPage(url) {
  const results = [];
  const add = (ok, name, detail) => {
    results.push({ ok, name, detail });
    return ok;
  };

  let res;
  try {
    res = await fetch(url, { redirect: "follow", headers: { "user-agent": "servey-seo-audit" } });
  } catch (err) {
    add(false, "fetch", err.message);
    return { url, results };
  }
  if (!add(res.status === 200, "status", String(res.status))) {
    return { url, results };
  }

  const html = stripNoise(await res.text());
  checkTitle(html, add);
  checkDescription(html, add);
  const canonical = checkCanonical(html, url, add);
  checkOgUrl(html, canonical, add);
  checkHeadings(html, add);
  const blocks = checkJsonLd(html, add);
  checkBreadcrumbs(html, blocks, add);

  return { url, results, canonicalOrigin: canonical?.origin };
}

/** Bounded parallelism - 22 simultaneous requests looks like an attack. */
async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        out[i] = await fn(items[i]);
      }
    }),
  );
  return out;
}

async function readSitemap() {
  const res = await fetch(`${base}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map((m) => decodeEntities(m[1].trim()));
  if (locs.length === 0) throw new Error("sitemap.xml contained no <loc> entries");
  // The sitemap always carries production URLs. When auditing a local build we
  // want the same *paths* served from the local origin.
  return locs.map((loc) => `${base}${new URL(loc).pathname}`);
}

async function main() {
  const urls = await readSitemap();
  const pages = await mapLimit(urls, concurrency, auditPage);

  // Canonicals must all agree on one origin. Checked across pages rather than
  // per page, because a local audit legitimately serves servey.in canonicals
  // from localhost - what would be wrong is two different origins in one build.
  const origins = [...new Set(pages.map((p) => p.canonicalOrigin).filter(Boolean))];
  const originsOk = origins.length <= 1;

  let failed = 0;
  for (const page of pages) {
    const bad = page.results.filter((r) => !r.ok);
    failed += bad.length;
    if (!asJson) {
      const path = new URL(page.url).pathname;
      console.log(
        bad.length === 0
          ? `${c.green("PASS")} ${path}`
          : `${c.red("FAIL")} ${c.bold(path)}`,
      );
      for (const r of page.results) {
        if (!r.ok) console.log(`     ${c.red("x")} ${r.name}: ${r.detail}`);
        else if (bad.length > 0) console.log(c.dim(`     . ${r.name}: ${r.detail}`));
      }
    }
  }

  if (!originsOk) failed += 1;

  if (asJson) {
    console.log(
      JSON.stringify({ base, pages, canonicalOrigins: origins, failures: failed }, null, 2),
    );
  } else {
    const clean = pages.filter((p) => p.results.every((r) => r.ok)).length;
    console.log("");
    console.log(c.bold(`${base} - ${urls.length} URLs from sitemap.xml`));
    console.log(`  pages clean:      ${clean}/${pages.length}`);
    console.log(
      `  canonical origin: ${originsOk ? c.green(origins[0] ?? "n/a") : c.red(origins.join(", "))}`,
    );
    console.log(
      failed === 0
        ? c.green("  all invariants hold")
        : c.red(`  ${failed} failed check${failed === 1 ? "" : "s"}`),
    );
  }

  process.exitCode = failed === 0 ? 0 : 1;
}

main().catch((err) => {
  console.error(c.red(`seo-audit: ${err.message}`));
  process.exitCode = 1;
});
