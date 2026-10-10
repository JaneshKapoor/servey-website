import { NextRequest, NextResponse } from "next/server";
import { getFirestoreDb } from "@/lib/firebase-admin";
import { site } from "@/lib/site";

export const runtime = "nodejs";
// Counting is the entire point, so this must never be cached or prerendered.
export const dynamic = "force-dynamic";

/**
 * The human-facing download link: count it, then send them to the file.
 *
 *   Website buttons -> /api/download -> record -> 302 -> /download/Servey.dmg
 *   App updater     -> /download/Servey.dmg (direct, never through here)
 *
 * **That split is load-bearing.** `latest.json` and the shipped Mac app have
 * the raw URL hardcoded, so it has to keep serving the file directly. Only
 * buttons a person clicks come through here, which also keeps the number
 * meaningful: it counts people, not update checks.
 *
 * **The download outranks the counter.** Every failure path below still ends
 * in the redirect. A Firestore outage, missing credentials, a malformed
 * header - none of them may stop somebody getting the app.
 *
 * **What is recorded, and why it is not personal data.** One integer per day,
 * plus two coarse breakdowns: the referring *hostname* (not the URL, so no
 * query strings and no paths) and the operating system family parsed from the
 * User-Agent (mac / windows / linux / ios / android / other). No IP address is
 * read, stored or hashed. No cookie is set, nothing is fingerprinted, and
 * nothing here can be tied back to a person - which is why `/privacy` needs no
 * change for it. If you add anything to this route that could identify
 * somebody, that stops being true and the policy changes in the same commit.
 */

const DMG_PATH = "/download/Servey.dmg";

/** Coarse OS family. Deliberately lossy - it is a bucket, not a fingerprint. */
function platformOf(ua: string): string {
  const s = ua.toLowerCase();
  if (/iphone|ipad|ipod/.test(s)) return "ios";
  if (/android/.test(s)) return "android";
  if (/mac os x|macintosh/.test(s)) return "mac";
  if (/windows/.test(s)) return "windows";
  if (/linux|x11/.test(s)) return "linux";
  return "other";
}

/**
 * Referring hostname only. A full referrer can carry a search query or a path
 * that identifies somebody; a hostname cannot. Our own domain collapses to
 * "servey.in" so the interesting number - how many arrive from elsewhere -
 * stays readable.
 */
function refererHostOf(raw: string | null): string {
  if (!raw) return "direct";
  try {
    return new URL(raw).hostname.replace(/^www\./, "") || "direct";
  } catch {
    return "unknown";
  }
}

/** Firestore field names cannot contain `.`, `/`, `*`, `[`, `]` or `~`. */
function fieldSafe(value: string): string {
  return value.replace(/[./*[\]~`]/g, "_").slice(0, 64) || "unknown";
}

async function record(req: NextRequest): Promise<void> {
  const db = await getFirestoreDb();
  // No credentials (local dev, previews) - the download still works, silently.
  if (!db) return;

  const { FieldValue } = await import("firebase-admin/firestore");
  // UTC so the day boundary is the same wherever this executes. Vercel runs
  // this in whichever region is closest to the visitor.
  const day = new Date().toISOString().slice(0, 10);
  const platform = fieldSafe(platformOf(req.headers.get("user-agent") ?? ""));
  const referer = fieldSafe(refererHostOf(req.headers.get("referer")));

  await db
    .collection("downloads")
    .doc(day)
    .set(
      {
        count: FieldValue.increment(1),
        [`platforms.${platform}`]: FieldValue.increment(1),
        [`referrers.${referer}`]: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
}

export async function GET(req: NextRequest) {
  // Awaited, not fire-and-forget: a serverless function can be frozen the
  // instant the response is returned, which drops an un-awaited write. It is
  // wrapped so that a slow or broken Firestore costs the visitor nothing but
  // the few milliseconds it took to fail.
  try {
    await record(req);
  } catch (err) {
    console.error("[download] counter failed, serving the file anyway:", err);
  }

  // 302, not 308: the destination is allowed to move, and a permanent redirect
  // would be cached by browsers and stop counting repeat downloads.
  //
  // Resolved against site.url rather than the request, so the Location is the
  // canonical file wherever this runs. A preview deployment therefore hands
  // you the production dmg, which is the right file - the one notarisation
  // covers. (In local dev that means the redirect leaves localhost.)
  return NextResponse.redirect(new URL(DMG_PATH, site.url), {
    status: 302,
    headers: { "Cache-Control": "no-store" },
  });
}
