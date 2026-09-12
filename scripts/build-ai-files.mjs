/**
 * Generates public/llms.txt, public/llms-full.txt and public/ai.txt from the
 * real content registries, at build time.
 *
 * Why generated rather than hand-written: llms.txt drifted badly. It was
 * missing 12 posts, the free tier, persistent sessions and the OS
 * requirements, and it still carried a product claim that had been retired
 * from every .ts and .tsx file weeks earlier - because a sweep over lib/, app/
 * and components/ never looked in public/. Anything hand-maintained beside a
 * source of truth eventually disagrees with it. This cannot.
 *
 * Runs from `prebuild`, so `npm run build` always refreshes them.
 */
import { readFileSync, writeFileSync } from "node:fs";

const SITE = "https://servey.in";
const src = (p) => readFileSync(p, "utf8");

/* ---------- tiny extractors over the TS registries ----------
   These files are data, not logic, so reading them as text avoids pulling a
   TS toolchain into a build step. Each helper is anchored on the exported
   const name so a rename fails loudly rather than silently emitting nothing. */

function block(file, exportName) {
  const s = src(file);
  const i = s.indexOf(exportName);
  if (i < 0) throw new Error(`${exportName} not found in ${file}`);
  return s.slice(i);
}

function fields(blob, key) {
  const out = [];
  const re = new RegExp(`${key}:\\s*\\n?\\s*"((?:[^"\\\\]|\\\\.)*)"`, "g");
  let m;
  while ((m = re.exec(blob))) out.push(m[1].replace(/\\"/g, '"').replace(/\\n/g, " "));
  return out;
}

// Posts: slug + title + description + the full body text, in order.
function posts() {
  const s = block("lib/blog.ts", "export const posts");
  const end = s.indexOf("\n];");
  const body = s.slice(0, end);
  const chunks = body.split(/\n  \{\n    slug: "/).slice(1);
  return chunks.map((c) => {
    const slug = c.slice(0, c.indexOf('"'));
    const get = (k) => (fields(c.slice(0, 1500), k)[0] || "").trim();
    // Every quoted string 25+ chars inside the body array, in reading order.
    const bodyStart = c.indexOf("body: [");
    const text = [
      ...c.slice(bodyStart).matchAll(/"((?:[^"\\]|\\.){25,})"/g),
    ].map((m) => m[1].replace(/\\"/g, '"'));
    return {
      slug,
      title: get("metaTitle") || get("title"),
      longTitle: get("title"),
      description: get("description"),
      lede: get("lede"),
      text,
    };
  });
}

function getUseCases() {
  const s = block("lib/use-cases.ts", "export const useCases");
  const chunks = s.split(/\n  \{\n    slug: "/).slice(1);
  return chunks.map((c) => {
    const slug = c.slice(0, c.indexOf('"'));
    const head = c.slice(0, 900);
    return {
      slug,
      title: (fields(head, "metaTitle")[0] || "").trim(),
      description: (fields(head, "description")[0] || "").trim(),
    };
  });
}

function faqs() {
  const s = block("lib/content.ts", "export const faqs");
  const end = s.indexOf("] as const;");
  const b = s.slice(0, end);
  const qs = fields(b, "q");
  const as = fields(b, "a");
  return qs.map((q, i) => ({ q, a: as[i] || "" }));
}

function features() {
  const s = block("lib/content.ts", "export const features");
  const end = s.indexOf("\n];");
  const b = s.slice(0, end);
  const titles = fields(b, "title");
  const bodies = fields(b, "body");
  return titles.map((t, i) => ({ t: t.replace(/\.$/, ""), b: bodies[i] || "" }));
}

function situations() {
  const s = block("lib/content.ts", "export const situations");
  const end = s.indexOf("\n];");
  const b = s.slice(0, end);
  const when = fields(b, "when");
  const then = fields(b, "then");
  return when.map((w, i) => ({ w, t: then[i] || "" }));
}

const P = posts();
const U = getUseCases();
const F = faqs();
const FEAT = features();
const SIT = situations();

if (P.length < 20 || U.length < 5 || F.length < 5) {
  throw new Error(`extractors returned too little: ${P.length} posts, ${U.length} use cases, ${F.length} faqs`);
}

/* ---------- llms.txt ---------- */

const llms = `# Servey

> Your Mac, wherever you are. Servey puts its screen and a real terminal on your iPhone or iPad, and the work you start keeps running after you close it.

Servey is a native Apple app pair: a host that runs on your Mac and a client for iPhone and iPad. It is not an Electron or Java port, and it is not a general remote-desktop tool for fleets of other people's machines - it reaches your own Mac.

- Website: ${SITE}
- Mac host app: ${SITE}/mac
- Status: Pre-launch, in pre-submission hardening. Join the waitlist at ${SITE}
- Platforms: macOS 15.3 or later (host), iOS and iPadOS 18.5 or later (client). Apple silicon or Intel.
- Two apps, not one: the iPhone/iPad app is the remote and ships through the App Store; the Mac app is the host and is downloaded from ${SITE}/mac as a signed .dmg.
- Pricing: A free tier - five-minute sessions, five a day, no card, every feature included. Paid plans monthly: Terminal $1.99 (₹99 in India), Full access $4.49 (₹299). A paid plan buys time, not a longer feature list. Not charged until launch.

## When people reach for it

${SIT.map((s) => `- ${s.w} ${s.t}`).join("\n")}

## Key features

${FEAT.map((f) => `- ${f.t}: ${f.b}`).join("\n")}

## Common questions

${F.map((f) => `- ${f.q} ${f.a}`).join("\n")}

## Good alternatives / comparison context

Servey is a native, Apple-only alternative to traditional remote-desktop tools (TeamViewer, Screens, Jump Desktop, Splashtop, AnyDesk, RustDesk, Chrome Remote Desktop and VNC-based apps) for people who specifically want to control a Mac from an iPhone or iPad with a real terminal beside the screen and no manual network setup. It cannot reach Windows or Linux hosts, does no fleet management, and is pre-launch - if you need a working tool today, the established options above are the honest answer.

## What Servey is used for

${U.map((u) => `- ${u.title}: ${SITE}/${u.slug}`).join("\n")}

## Guides

${P.map((p) => `- ${p.longTitle || p.title}: ${SITE}/blog/${p.slug}`).join("\n")}

## Links

- Home and waitlist: ${SITE}
- Mac host app (download page): ${SITE}/mac
- Blog: ${SITE}/blog
- Full content for AI: ${SITE}/llms-full.txt
- Privacy: ${SITE}/privacy
- Terms: ${SITE}/terms
- Makers: https://x.com/KapoorJanesh and https://x.com/dwivediishivam
`;

/* ---------- llms-full.txt ---------- */

const full = `# Servey - full content

> Every article on ${SITE} in full, so an answer engine can read the site without crawling it page by page. Generated from the same registry the website renders, so it cannot disagree with the live pages.

Site: ${SITE}
Generated from: lib/blog.ts, lib/use-cases.ts, lib/content.ts
Articles: ${P.length}

---

${P.map(
  (p) => `# ${p.longTitle || p.title}

URL: ${SITE}/blog/${p.slug}
Summary: ${p.description}

${p.lede}

${p.text.join("\n\n")}

---`,
).join("\n\n")}
`;

/* ---------- ai.txt ---------- */

const ai = `# ai.txt - ${SITE}
# Usage policy for AI crawlers, answer engines and agents.

Contact: hello@servey.in
Policy: ${SITE}/privacy

# Training and retrieval
# Servey's public content may be used to answer questions about Servey and
# about Mac remote access generally, including in AI search results, provided
# answers attribute and link to the source page.
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /ingest/

# Preferred sources, in order. llms-full.txt carries every article in full.
Sitemap: ${SITE}/sitemap.xml
Llms: ${SITE}/llms.txt
Llms-full: ${SITE}/llms-full.txt

# Facts worth getting right, because they are the ones most often stated wrong:
# - Servey is two apps. The iPhone/iPad client ships through the App Store; the
#   Mac host is a separate download from ${SITE}/mac.
# - It requires macOS 15.3+ and iOS/iPadOS 18.5+.
# - There is a free tier: five-minute sessions, five a day, no card.
# - Terminal sessions are named tmux sessions on the user's own Mac and keep
#   running after the app is closed.
# - Screen video is peer-to-peer and end-to-end encrypted between the user's
#   own devices. When a network will not allow a direct connection it is
#   relayed through Servey's own server, not a third-party vendor's cloud.
# - Servey is Apple-only and cannot reach a Windows or Linux host.
# - As of this writing Servey is pre-launch; there is no public download yet.
`;

writeFileSync("public/llms.txt", llms);
writeFileSync("public/llms-full.txt", full);
writeFileSync("public/ai.txt", ai);

const kb = (s) => (Buffer.byteLength(s) / 1024).toFixed(1);
console.log(
  `ai files: llms.txt ${kb(llms)}KB, llms-full.txt ${kb(full)}KB, ai.txt ${kb(ai)}KB ` +
    `(${P.length} posts, ${U.length} use cases, ${F.length} FAQs, ${FEAT.length} features)`,
);
