import type { NextConfig } from "next";

// Default to PostHog US cloud. Set these if the project lives in the EU region
// (https://eu.i.posthog.com / https://eu-assets.i.posthog.com).
const POSTHOG_INGEST_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
const POSTHOG_ASSET_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_ASSET_HOST ?? "https://us-assets.i.posthog.com";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Screenshots are text-heavy; allow high quality so fine UI text stays crisp.
    // (Next 16 only serves qualities listed here.)
    qualities: [75, 90, 95],
    formats: ["image/avif", "image/webp"],
  },

  // Proxy PostHog under our own origin so content blockers - which ship
  // *.i.posthog.com on their default lists - do not silently delete most of the
  // traffic data.
  //
  // Returning a plain array puts these in the "afterFiles" phase, which is
  // evaluated *before* dynamic routes. That matters here: app/[useCase] is a
  // top-level dynamic segment, so without this ordering /ingest/* would be
  // swallowed by it and 404 under dynamicParams = false.
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: `${POSTHOG_ASSET_HOST}/static/:path*`,
      },
      {
        source: "/ingest/:path*",
        destination: `${POSTHOG_INGEST_HOST}/:path*`,
      },
    ];
  },

  // PostHog's ingest endpoints end in a slash (e.g. /ingest/e/). Next's default
  // trailing-slash redirect would 308 those away and break capture.
  //
  // Trade-off: content URLs like /blog/ no longer redirect to /blog either. Every
  // page already emits an explicit alternates.canonical, which is what keeps the
  // duplicate out of the index - do not remove those canonicals.
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
