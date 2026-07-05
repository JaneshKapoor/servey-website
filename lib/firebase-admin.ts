import type { Firestore } from "firebase-admin/firestore";

/**
 * Lazily initialise the Firebase Admin SDK and return a Firestore instance,
 * or `null` when credentials aren't configured (dev / preview without env).
 * Shared by the waitlist and contact route handlers so there's one init path.
 */
export async function getFirestoreDb(): Promise<Firestore | null> {
  const hasCreds =
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY;
  if (!hasCreds) return null;

  const { getApps, initializeApp, cert } = await import("firebase-admin/app");
  const { getFirestore } = await import("firebase-admin/firestore");

  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Env stores the key with escaped newlines; restore real ones.
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  }

  return getFirestore();
}
