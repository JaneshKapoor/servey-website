#!/usr/bin/env node
/**
 * Renders every docs/*.md to a matching docs/*.pdf.
 *
 * The Markdown is the source of truth; each PDF is a build artifact. Generating
 * them rather than hand-maintaining them is the point - a context document that
 * has silently drifted from the codebase is worse than no context document, and
 * two hand-edited copies drift immediately.
 *
 * Every .md in docs/ is picked up automatically, so adding a new document needs
 * no change here. Output name is the source name lowercased with dashes kept:
 * CONTEXT.md -> context.pdf, SEO-CONTEXT.md -> seo-context.pdf.
 *
 * Uses headless Chrome (already on any machine that can test this site) instead
 * of adding a heavyweight PDF dependency.
 *
 * Usage: npm run context:pdf
 */
import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { marked } from "marked";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = join(root, "docs");

/** Chrome ships under different names depending on the machine. */
const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

function findChrome() {
  const found = CHROME_CANDIDATES.find((p) => existsSync(p));
  if (!found) {
    console.error(
      "Could not find Chrome. Install it, or set CHROME_PATH to the binary.",
    );
    process.exit(1);
  }
  return found;
}

/* Print stylesheet. Deliberately light-on-white regardless of the site theme:
   this gets printed and read on paper as often as on screen. */
const CSS = `
  @page { size: A4; margin: 17mm 15mm; }
  * { box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif;
    font-size: 10.2pt;
    line-height: 1.55;
    color: #16181c;
    margin: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  h1 {
    font-size: 23pt; letter-spacing: -0.02em; margin: 0 0 4pt;
    padding-bottom: 8pt; border-bottom: 2.5pt solid #0a7a3c;
  }
  /* Each numbered section starts a page: this is a reference document that gets
     jumped around in, not read front-to-back. */
  h2 {
    font-size: 14pt; letter-spacing: -0.01em; margin: 0 0 9pt;
    padding-bottom: 4pt; border-bottom: 0.75pt solid #d8dde3; color: #0a2417;
    break-before: page; break-after: avoid;
  }
  h1 + h2, h1 + blockquote + h2 { break-before: auto; }
  h3 {
    font-size: 11pt; margin: 15pt 0 5pt; color: #0a7a3c;
    break-after: avoid;
  }
  p, ul, ol { margin: 0 0 8pt; }
  li { margin-bottom: 2.5pt; }
  code {
    font-family: ui-monospace, SFMono-Regular, "JetBrains Mono", Menlo, monospace;
    font-size: 8.8pt; background: #f0f2f5; padding: 1pt 3.5pt;
    border-radius: 3px; color: #12331f;
  }
  pre {
    background: #f7f9fa; border: 0.75pt solid #dfe4ea; border-left: 2.5pt solid #0a7a3c;
    border-radius: 4px; padding: 8pt 10pt; overflow: hidden;
    break-inside: avoid; margin: 0 0 10pt;
  }
  pre code { background: none; padding: 0; font-size: 8.2pt; line-height: 1.45; }
  table {
    width: 100%; border-collapse: collapse; margin: 0 0 11pt;
    font-size: 9pt; break-inside: avoid;
  }
  th {
    text-align: left; background: #eef3f0; color: #0a2417; font-weight: 600;
    padding: 5pt 7pt; border: 0.75pt solid #d8dde3;
  }
  td { padding: 5pt 7pt; border: 0.75pt solid #e4e8ed; vertical-align: top; }
  tr:nth-child(even) td { background: #fafbfc; }
  blockquote {
    margin: 0 0 10pt; padding: 7pt 11pt; background: #fff8e8;
    border-left: 2.5pt solid #d99b1e; border-radius: 0 4px 4px 0;
    break-inside: avoid;
  }
  blockquote p:last-child { margin-bottom: 0; }
  hr { border: none; border-top: 0.75pt solid #dfe4ea; margin: 14pt 0; }
  a { color: #0a7a3c; text-decoration: none; }
  strong { color: #000; font-weight: 600; }
`;

const sources = readdirSync(DOCS)
  .filter((f) => f.endsWith(".md"))
  .sort();

if (sources.length === 0) {
  console.error("No .md files found in docs/");
  process.exit(1);
}

const chrome = findChrome();
const scratch = mkdtempSync(join(tmpdir(), "servey-docs-"));

try {
  for (const source of sources) {
    const markdown = readFileSync(join(DOCS, source), "utf8");
    // First heading becomes the PDF's document title; fall back to the filename.
    const heading = markdown.match(/^#\s+(.+)$/m)?.[1] ?? source;
    const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>${heading}</title>
<style>${CSS}</style>
</head><body>${await marked.parse(markdown)}</body></html>`;

    const htmlPath = join(scratch, `${source}.html`);
    const output = join(DOCS, source.replace(/\.md$/, ".pdf").toLowerCase());

    writeFileSync(htmlPath, html, "utf8");
    execFileSync(
      chrome,
      [
        "--headless=new",
        "--disable-gpu",
        "--no-first-run",
        "--no-pdf-header-footer",
        // Give fonts and layout a beat to settle before the snapshot.
        "--virtual-time-budget=4000",
        `--print-to-pdf=${output}`,
        pathToFileURL(htmlPath).href,
      ],
      { stdio: "pipe" },
    );

    const kb = (readFileSync(output).length / 1024).toFixed(0);
    console.log(`docs/${source} -> docs/${source.replace(/\.md$/, ".pdf").toLowerCase()} (${kb} KB)`);
  }
} finally {
  rmSync(scratch, { recursive: true, force: true });
}
