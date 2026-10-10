/**
 * Read the download counter.
 *
 *   npm run downloads          # last 14 days
 *   npm run downloads -- 60    # last 60 days
 *
 * Reads the same `downloads/{YYYY-MM-DD}` documents /api/download writes, using
 * the same FIREBASE_* credentials the site uses. There is deliberately no web
 * endpoint for this: the numbers are nobody else's business, and an HTTP route
 * would either leak them or need another secret to guard them.
 *
 * Needs FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY in
 * .env.local - the same three Vercel has in production.
 */
import { readFileSync, existsSync } from "node:fs";

// Minimal .env.local reader - no dependency, and it only has to handle the
// quoted private key.
if (existsSync(".env.local")) {
  for (const line of readFileSync(".env.local", "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    process.env[m[1]] ??= v;
  }
}

const days = Number(process.argv[2]) || 14;

if (
  !process.env.FIREBASE_PROJECT_ID ||
  !process.env.FIREBASE_CLIENT_EMAIL ||
  !process.env.FIREBASE_PRIVATE_KEY
) {
  console.error(
    "No Firebase credentials. Put FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL\n" +
      "and FIREBASE_PRIVATE_KEY in .env.local - the same values Vercel has.",
  );
  process.exit(1);
}

const { initializeApp, cert } = await import("firebase-admin/app");
const { getFirestore } = await import("firebase-admin/firestore");

initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

const db = getFirestore();
const since = new Date(Date.now() - days * 86_400_000).toISOString().slice(0, 10);

const snap = await db
  .collection("downloads")
  .orderBy("__name__", "desc")
  .limit(days)
  .get();

const rows = snap.docs
  .filter((d) => d.id >= since)
  .map((d) => ({ day: d.id, ...d.data() }))
  .sort((a, b) => a.day.localeCompare(b.day));

if (!rows.length) {
  console.log(`No downloads recorded since ${since}.`);
  process.exit(0);
}

let total = 0;
const platforms = {};
const referrers = {};

console.log(`\nDownloads since ${since}\n`);
for (const r of rows) {
  total += r.count ?? 0;
  for (const [k, v] of Object.entries(r.platforms ?? {}))
    platforms[k] = (platforms[k] ?? 0) + v;
  for (const [k, v] of Object.entries(r.referrers ?? {}))
    referrers[k] = (referrers[k] ?? 0) + v;
  console.log(`  ${r.day}   ${String(r.count ?? 0).padStart(5)}`);
}

const breakdown = (label, obj) => {
  const entries = Object.entries(obj).sort((a, b) => b[1] - a[1]);
  if (!entries.length) return;
  console.log(`\n  ${label}: ${entries.map(([k, v]) => `${k} ${v}`).join(", ")}`);
};

console.log(`\n  total ${total}`);
breakdown("by platform", platforms);
breakdown("by referrer", referrers);
console.log();
