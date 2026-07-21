/**
 * Swappable waitlist storage behind one interface. The route handler calls
 * `saveSignup` and never cares which provider is active. Selection is by env:
 *
 *   - Firebase   → set FIREBASE_PROJECT_ID + FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY
 *   - Formspree  → set FORMSPREE_ENDPOINT
 *   - Resend     → set RESEND_API_KEY + RESEND_AUDIENCE_ID
 *   - (none)     → "console" dev fallback: logs and succeeds, no persistence
 *
 * Force a provider with WAITLIST_PROVIDER=firebase|formspree|resend|console.
 */
export interface Signup {
  email: string;
  country: string; // ISO 3166-1 alpha-2
  source: string;
  userAgent: string;
  createdAt: string;
}

export type SaveResult = { ok: true; duplicate: boolean } | { ok: false; error: string };

export function activeProvider(): "firebase" | "formspree" | "resend" | "console" {
  const forced = process.env.WAITLIST_PROVIDER?.toLowerCase();
  if (forced === "firebase" || forced === "formspree" || forced === "resend" || forced === "console") {
    return forced;
  }
  if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    return "firebase";
  }
  if (process.env.FORMSPREE_ENDPOINT) return "formspree";
  if (process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID) return "resend";
  return "console";
}

export async function saveSignup(signup: Signup): Promise<SaveResult> {
  switch (activeProvider()) {
    case "firebase":
      return saveToFirebase(signup);
    case "formspree":
      return saveToFormspree(signup);
    case "resend":
      return saveToResend(signup);
    default:
      // Dev fallback — never persist secrets or invent a backend.
      console.info(`[waitlist] (console provider) new signup: ${signup.email} (${signup.country}) from ${signup.source}`);
      return { ok: true, duplicate: false };
  }
}

/* ----------------------------- Firebase ------------------------------ */
async function saveToFirebase(signup: Signup): Promise<SaveResult> {
  try {
    const { getFirestoreDb } = await import("@/lib/firebase-admin");
    const db = await getFirestoreDb();
    if (!db) return { ok: false, error: "storage_error" };

    const docId = encodeURIComponent(signup.email); // normalized email = doc id → dedupe
    const ref = db.collection("waitlist").doc(docId);
    const existing = await ref.get();
    if (existing.exists) return { ok: true, duplicate: true };

    await ref.set(signup, { merge: true });
    return { ok: true, duplicate: false };
  } catch (err) {
    console.error("[waitlist] firebase error", err);
    return { ok: false, error: "storage_error" };
  }
}

/* ----------------------------- Formspree ----------------------------- */
async function saveToFormspree(signup: Signup): Promise<SaveResult> {
  try {
    const res = await fetch(process.env.FORMSPREE_ENDPOINT!, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        email: signup.email,
        country: signup.country,
        source: signup.source,
        createdAt: signup.createdAt,
      }),
    });
    if (!res.ok) return { ok: false, error: "storage_error" };
    return { ok: true, duplicate: false };
  } catch (err) {
    console.error("[waitlist] formspree error", err);
    return { ok: false, error: "storage_error" };
  }
}

/* ------------------------------ Resend ------------------------------- */
async function saveToResend(signup: Signup): Promise<SaveResult> {
  try {
    const res = await fetch(
      `https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: signup.email, unsubscribed: false }),
      },
    );
    if (res.status === 409) return { ok: true, duplicate: true };
    if (!res.ok) return { ok: false, error: "storage_error" };
    return { ok: true, duplicate: false };
  } catch (err) {
    console.error("[waitlist] resend error", err);
    return { ok: false, error: "storage_error" };
  }
}
