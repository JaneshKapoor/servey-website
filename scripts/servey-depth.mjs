/**
 * Servey framing check for blog posts.
 *
 * Enforces the SEO-CONTEXT §3 metrics - first-mention depth and density
 * 4.0-6.0 per 1k words - plus a third the other two cannot see.
 *
 * Why the third exists. On 5 Sep 2026 four new posts passed depth and density
 * while the owner correctly read them as burying Servey. Depth measures the
 * first *mention*, which a table cell or one word in the lede satisfies, so it
 * can read 5% while the first sentence that actually says what Servey does
 * sits at 69%. SUBSTANCE measures that instead: the first real paragraph
 * (>=25 words) or <h2> naming Servey, with the lede excluded because the lede
 * always names it and would make the number meaningless.
 *
 * Two archetypes, opposite rules - do not collapse them:
 *
 *   comparison  competitor-vs-competitor and roundup posts. §3 says to keep
 *               Servey OUT of the hero slot here: one late mention, labelled
 *               pre-launch, telling the reader to buy an established product
 *               if they need one today. Late Servey is CORRECT, so substance
 *               is reported but never failed, and depth is not checked.
 *   info        everything else. Servey should arrive early and structurally.
 *
 * Runs against rendered HTML, not source, because reading order is the thing
 * being measured. Build first:  npm run build && npm run seo:framing
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";

const DIR = ".next/server/app/blog";
const INFO = { depth: 15, substance: 35 };
const DENSITY = { min: 4.0, max: 6.0, shortWords: 700, shortMax: 9.0 };

// Slugs whose job is comparing other people's products.
const COMPARISON =
  /(-vs-|alternative|^best-|^screens-5-|^what-replaced-|^does-mac-screen-sharing)/;

if (!existsSync(DIR)) {
  console.error("No build found. Run `npm run build` first.");
  process.exit(1);
}

const slugs = process.argv.slice(2).length
  ? process.argv.slice(2)
  : readdirSync(DIR).filter((f) => f.endsWith(".html")).map((f) => f.replace(/\.html$/, ""));

const strip = (s) =>
  s
    .replace(/<(script|style)[\s\S]*?<\/\1>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;/g, "'")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

let failed = 0;
const rows = [];

for (const slug of slugs) {
  const file = `${DIR}/${slug}.html`;
  if (!existsSync(file)) continue;
  const html = readFileSync(file, "utf8");
  const h1 = html.indexOf("<h1");
  const faq = html.indexOf("Frequently asked", h1);
  const body = html.slice(h1, faq > 0 ? faq : html.length);
  const text = strip(body);
  const words = text.split(" ").length;

  const first = text.indexOf("Servey");
  const depth = first < 0 ? 100 : (first / text.length) * 100;
  const mentions = (text.match(/Servey/g) || []).length;
  const density = (mentions / words) * 1000;

  // Substance: the earliest <h2>, or >=25-word <p>, that names Servey.
  // The renderer emits article blocks as bare <p> / <h2> with no attributes,
  // while the lede, byline and author bio all carry a className - so matching
  // the bare tags is an exact way to exclude the lede, which always names
  // Servey and would otherwise peg this metric near zero for every post.
  const marks = [
    ...body.matchAll(/<h2>([\s\S]*?)<\/h2>/g),
    ...[...body.matchAll(/<p>([\s\S]*?)<\/p>/g)].filter(
      (m) => strip(m[1]).split(" ").length >= 25,
    ),
  ]
    .filter((m) => /Servey/.test(strip(m[1])))
    .map((m) => m.index)
    .sort((a, b) => a - b);
  const substance = marks.length
    ? (strip(body.slice(0, marks[0])).length / text.length) * 100
    : 100;

  const kind = COMPARISON.test(slug) ? "comparison" : "info";
  const densityCap = words < DENSITY.shortWords ? DENSITY.shortMax : DENSITY.max + 0.5;

  const bad = [];
  if (density < DENSITY.min) bad.push(`density ${density.toFixed(1)} low`);
  if (density > densityCap) bad.push(`density ${density.toFixed(1)} high`);
  if (kind === "info") {
    if (depth > INFO.depth) bad.push(`depth ${depth.toFixed(1)}%`);
    if (substance > INFO.substance) bad.push(`substance ${substance.toFixed(0)}%`);
  }
  if (bad.length) failed++;
  rows.push({ slug, kind, words, depth, density, substance, bad });
}

rows.sort((a, b) => (a.bad.length === b.bad.length ? b.substance - a.substance : b.bad.length - a.bad.length));
console.log(
  "slug".padEnd(48) + "kind".padStart(11) + "words".padStart(7) + "depth".padStart(8) + "subst".padStart(7) + "dens".padStart(7) + "  status",
);
for (const r of rows) {
  console.log(
    r.slug.padEnd(48) +
      r.kind.padStart(11) +
      String(r.words).padStart(7) +
      (r.depth.toFixed(1) + "%").padStart(8) +
      (r.substance.toFixed(0) + "%").padStart(7) +
      r.density.toFixed(1).padStart(7) +
      "  " +
      (r.bad.length ? "FAIL - " + r.bad.join(", ") : "ok"),
  );
}
console.log(
  `\n${rows.length - failed}/${rows.length} pass` +
    `  (info: depth <=${INFO.depth}%, substance <=${INFO.substance}%; density ${DENSITY.min}-${DENSITY.max}/1k,` +
    ` <${DENSITY.shortWords}-word posts allowed to ${DENSITY.shortMax})`,
);
process.exit(failed ? 1 : 0);
