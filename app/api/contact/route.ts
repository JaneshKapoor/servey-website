import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { getFirestoreDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  const limit = rateLimit(`contact:${ip}`, { limit: 4, windowMs: 60_000 });
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: { name?: unknown; email?: unknown; message?: unknown; website?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — silently accept bots.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().toLowerCase();
  const message = String(body.message ?? "").trim().slice(0, 4000);

  if (!name) {
    return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 422 });
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 422 },
    );
  }
  if (message.length < 5) {
    return NextResponse.json(
      { ok: false, error: "Please write a short message." },
      { status: 422 },
    );
  }

  const doc = {
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
    userAgent: req.headers.get("user-agent")?.slice(0, 300) ?? "unknown",
    source: "website-contact",
    handled: false,
  };

  try {
    const db = await getFirestoreDb();
    if (db) {
      await db.collection("contacts").add(doc);
    } else {
      // Dev / unconfigured fallback — log, never lose the message silently.
      console.info(`[contact] (no Firebase) message from ${email}: ${message.slice(0, 80)}`);
    }
  } catch (err) {
    console.error("[contact] storage error", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
