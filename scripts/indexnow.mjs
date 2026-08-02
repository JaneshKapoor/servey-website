/**
 * Ping IndexNow so Bing (and Yandex, Seznam, Naver) re-crawl our pages within
 * minutes instead of waiting for their normal schedule. Bing's index is what
 * ChatGPT Search reads from, so fast Bing coverage is worth the extra step.
 *
 *   npm run indexnow                    # submit every URL in the live sitemap
 *   npm run indexnow -- /blog/some-post # submit specific paths only
 *
 * The key must stay reachable at https://servey.in/<key>.txt — that file is how
 * IndexNow verifies we own the domain. Do not rename it.
 */
const KEY = "f79fa191eb94133fb4c62f3e675a3633";
const HOST = "servey.in";
const ORIGIN = `https://${HOST}`;

async function urlsFromSitemap() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

const args = process.argv.slice(2);
const urlList = args.length
  ? args.map((a) => (a.startsWith("http") ? a : `${ORIGIN}${a.startsWith("/") ? a : `/${a}`}`))
  : await urlsFromSitemap();

if (urlList.length === 0) {
  console.error("No URLs to submit.");
  process.exit(1);
}

console.log(`Submitting ${urlList.length} URL(s) to IndexNow:`);
for (const u of urlList) console.log(`  ${u}`);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `${ORIGIN}/${KEY}.txt`,
    urlList,
  }),
});

// 200 = accepted, 202 = accepted but key still being validated. Both are fine.
if (res.status === 200 || res.status === 202) {
  console.log(`\n✓ Accepted (HTTP ${res.status}). Bing will recrawl shortly.`);
} else {
  console.error(`\n✗ IndexNow returned HTTP ${res.status}`);
  console.error(await res.text());
  process.exit(1);
}
