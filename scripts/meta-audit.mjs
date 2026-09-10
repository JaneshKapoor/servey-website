/**
 * Duplicate + length audit for rendered <title> and <meta name="description">.
 *
 * Bing's SEO report flags "too many pages with identical titles/descriptions",
 * and on 1 Sep both warnings turned out to be false positives caused by a
 * tracking parameter. The only way to answer that confidently is to diff the
 * rendered pages, so this does it: build, then walk .next for every prerendered
 * HTML file and compare what actually shipped.
 *
 * Limits mirror SEO-CONTEXT §3: rendered title <= 60 (the `%s - Servey`
 * template adds 9 to each page's own metaTitle), description 110-160.
 *
 *   npm run build && npm run seo:meta
 */
import { readdirSync, statSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = ".next/server/app";
const TITLE_MAX = 60;
const DESC_MIN = 110;
const DESC_MAX = 160;
// Error and 404 routes carry no marketing metadata and are not in the sitemap.
const EXEMPT = /_not-found|_global-error/;

if (!existsSync(ROOT)) {
  console.error("No build found. Run `npm run build` first.");
  process.exit(1);
}

const files = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".html")) files.push(p);
  }
})(ROOT);

const titles = new Map();
const descs = new Map();
const long = [];

for (const f of files) {
  if (EXEMPT.test(f)) continue;
  const html = readFileSync(f, "utf8");
  const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "(none)";
  const desc =
    (html.match(/<meta name="description" content="([\s\S]*?)"/) || [])[1] || "(none)";
  const route = f.slice(ROOT.length).replace(/\.html$/, "") || "/";

  if (!titles.has(title)) titles.set(title, []);
  titles.get(title).push(route);
  if (!descs.has(desc)) descs.set(desc, []);
  descs.get(desc).push(route);

  if (title !== "(none)" && title.length > TITLE_MAX)
    long.push(`title ${title.length} > ${TITLE_MAX}  ${route}  "${title}"`);
  if (desc !== "(none)" && (desc.length < DESC_MIN || desc.length > DESC_MAX))
    long.push(`desc ${desc.length} outside ${DESC_MIN}-${DESC_MAX}  ${route}`);
}

const dupTitles = [...titles].filter(([k, v]) => v.length > 1 && k !== "(none)");
const dupDescs = [...descs].filter(([k, v]) => v.length > 1 && k !== "(none)");

console.log(`pages checked: ${files.filter((f) => !EXEMPT.test(f)).length}`);
console.log(`duplicate titles: ${dupTitles.length}`);
for (const [k, v] of dupTitles) console.log(`   "${k}"\n     ${v.join("\n     ")}`);
console.log(`duplicate descriptions: ${dupDescs.length}`);
for (const [k, v] of dupDescs) console.log(`   "${k.slice(0, 70)}..."\n     ${v.join("\n     ")}`);
console.log(`length violations: ${long.length}`);
for (const l of long) console.log("   " + l);

const failed = dupTitles.length + dupDescs.length + long.length;
console.log(failed ? `\nFAIL - ${failed} issue(s)` : "\nPASS - unique and within limits");
process.exit(failed ? 1 : 0);
