/**
 * Tiny in-memory fixed-window rate limiter. Good enough for a marketing form on
 * a single instance; swap for Upstash/Redis if the site ever scales out.
 */
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {},
): { ok: boolean; remaining: number; retryAfter: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }

  bucket.count += 1;
  if (bucket.count > limit) {
    return { ok: false, remaining: 0, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  return { ok: true, remaining: limit - bucket.count, retryAfter: 0 };
}

// Opportunistic cleanup so the map doesn't grow unbounded.
if (typeof globalThis !== "undefined") {
  const g = globalThis as unknown as { __waitlistSweep?: boolean };
  if (!g.__waitlistSweep) {
    g.__waitlistSweep = true;
    setInterval(() => {
      const now = Date.now();
      for (const [k, v] of buckets) if (v.resetAt < now) buckets.delete(k);
    }, 5 * 60_000).unref?.();
  }
}
