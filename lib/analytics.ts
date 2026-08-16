"use client";

/**
 * PostHog, loaded lazily.
 *
 * posthog-js is ~60 KB gzipped. Importing it at module scope would pull it into
 * the shared client bundle and inflate First Load JS on every route - including
 * the use-case landing pages whose whole job is to rank. Instead the SDK is
 * dynamically imported on first use, so it lands in its own chunk that is
 * fetched after hydration and never blocks first paint.
 *
 * Every helper is a no-op when NEXT_PUBLIC_POSTHOG_KEY is unset, so local dev
 * and preview builds stay silent without guards at the call sites.
 */

import type { PostHog } from "posthog-js";

/** Memoized so the SDK is imported and initialized exactly once. */
let client: Promise<PostHog | null> | null = null;

function load(): Promise<PostHog | null> {
  if (client) return client;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key || typeof window === "undefined") {
    client = Promise.resolve(null);
    return client;
  }

  client = import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.init(key, {
        // Same-origin path, rewritten to PostHog in next.config.ts. The
        // *.i.posthog.com hosts sit on the default content-blocker lists, so
        // proxying through our own domain is the difference between measuring
        // most visitors and measuring only the ones without a blocker.
        api_host: "/ingest",
        // Only used to build "view in PostHog" links; not a request target.
        ui_host: process.env.NEXT_PUBLIC_POSTHOG_UI_HOST ?? "https://us.posthog.com",

        // Pageviews are captured in components/analytics.tsx instead: the SDK's
        // own listener fires once per document load and would miss every
        // client-side navigation the App Router performs.
        capture_pageview: false,
        capture_pageleave: true,

        // Anonymous visitors stay anonymous. Nothing in this codebase calls
        // identify(), so no person profile is ever created and no analytics
        // data is linked to a waitlist email address. Keep it that way unless
        // the privacy policy is updated to match.
        person_profiles: "identified_only",

        // On-brand for a product sold on privacy, and cheap to honor.
        respect_dnt: true,

        // Off by default: replay records real browsing, which would widen what
        // the privacy policy has to promise. Opt in per environment.
        disable_session_recording:
          process.env.NEXT_PUBLIC_POSTHOG_SESSION_RECORDING !== "true",
      });
      return posthog;
    })
    // Analytics must never take the page down with it.
    .catch(() => null);

  return client;
}

/** Fire-and-forget: callers never await analytics. */
export function capture(event: string, properties?: Record<string, unknown>) {
  void load().then((posthog) => posthog?.capture(event, properties));
}

/**
 * `$current_url` has to be passed explicitly. With capture_pageview disabled the
 * SDK is not the one observing navigation, so on a client-side route change its
 * own view of the URL can still be the previous page.
 */
export function capturePageview(url: string) {
  void load().then((posthog) => posthog?.capture("$pageview", { $current_url: url }));
}
