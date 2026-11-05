import type { NextConfig } from "next";

// Default to PostHog US cloud. Set these if the project lives in the EU region
// (https://eu.i.posthog.com / https://eu-assets.i.posthog.com).
const POSTHOG_INGEST_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
const POSTHOG_ASSET_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_ASSET_HOST ??
  "https://us-assets.i.posthog.com";

/**
 * Where /download/Servey.dmg is actually served from.
 *
 * **Set in Production since 30 Oct 2026**, to the Vercel Blob store
 * `servey-downloads`. `redirects()` below 307s `/download/Servey.dmg` to
 * `${DMG_ORIGIN}/Servey.dmg`, so the URL the shipped Mac app has hardcoded
 * keeps working and nothing had to be re-released.
 * `public/download/Servey.dmg` was deleted in the same change.
 *
 * This was a proxying rewrite until 2 Nov 2026, when it caused an outage -
 * see the note in `redirects()`. It must not go back to being one.
 *
 * Unset falls back to `public/download/Servey.dmg`, which no longer exists -
 * so **if DMG_ORIGIN is ever cleared, the download 404s.** That is the
 * trade: git keeps every version of a binary forever, so each ~37 MB build
 * was ~37 MB on every clone, for good.
 *
 * Releasing a new build means uploading over the same pathname:
 *
 *   vercel blob put <file> --pathname Servey.dmg --access public  *     --content-type application/x-apple-diskimage --rw-token "$BLOB_RW_TOKEN"
 *
 * Do not pass `--add-random-suffix false`; it is a boolean flag, so passing
 * it at all turns the suffix ON and you get `Servey-<random>.dmg`, which the
 * redirect will not find. Omit it.
 *
 * **The bytes must arrive untouched.** The dmg is notarised, so any
 * transform breaks Gatekeeper and macOS refuses to open it with "Servey is
 * damaged". After every upload, check the hash of what production actually
 * serves, not of what you uploaded:
 *
 *   curl -sL https://servey.in/download/Servey.dmg | shasum -a 256
 *
 * The `-L` is not optional. The URL is a 307 now, so plain `curl -s` follows
 * nothing, returns the empty redirect body, and hashes zero bytes - a release
 * check without it reports a broken download on a perfectly good build.
 *
 * Build 1 is bfbb2a5f15d7dd49bd06a7ddd0493306c6d17de7e985a840900ec7363b93b641.
 * Build 2 is bfb3048841a6091f594eb2e18d1aada1a400a8af7d09807f1bf325e7b430a1cb.
 * Build 3 is 498b5cf3e53a6025c3c709def2c02c163f1af2415295919b91399a3010d9db2e
 * (37179370 bytes).
 *
 * **Overwriting is not instant.** `vercel blob put --force` replaces the
 * object immediately - `vercel blob list` shows the new size straight away -
 * but the Blob store's own CDN kept serving the previous bytes for about two
 * minutes afterwards, as `x-vercel-cache: HIT` with the old ETag, and a
 * cache-busting query string did not defeat it. So an upload that looks done
 * can still be invisible. Wait, then check the ETag and content-length once;
 * do not poll in a loop, which trips Vercel's DDoS mitigation and takes the
 * whole site down with a 403 checkpoint.
 */
const DMG_ORIGIN = process.env.DMG_ORIGIN?.replace(/\/$/, "");

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
  // Merged pages. `control-a-headless-mac-mini-remotely` was 360 words that
  // overlapped `headless-mac-mini-setup` almost entirely and sat at position
  // 9.8 with 1.5% CTR while the guide ranked 6.3 for the same intent. Its one
  // distinct argument now lives in the guide, so a permanent redirect passes
  // the ranking signal on rather than stranding it.
  /**
   * The two URLs the shipped Mac app has hardcoded.
   *
   * `Servey.dmg` is signed and notarised, so the bytes we serve must be the
   * bytes Apple stamped - any optimiser, re-compression or rewrite in the
   * pipeline invalidates the signature and macOS refuses to open the app with
   * "Servey is damaged". It lives in `public/` and is served as a static file
   * for exactly that reason: nothing in the build touches it. The explicit
   * Content-Type stops any host from guessing, and Content-Disposition keeps
   * the filename `Servey.dmg` rather than whatever a redirect might invent.
   *
   * `latest.json` is the update feed: the app reads it at launch and once a
   * day. Its cache is deliberately short - a long one would make a release
   * invisible for as long as the TTL. CORS is open for GET because the app
   * fetches it cross-origin.
   */
  async headers() {
    return [
      {
        source: "/download/Servey.dmg",
        headers: [
          { key: "Content-Type", value: "application/x-apple-diskimage" },
          {
            key: "Content-Disposition",
            value: 'attachment; filename="Servey.dmg"',
          },
          { key: "Access-Control-Allow-Origin", value: "*" },
          // Long enough to be cheap, short enough that replacing the file
          // reaches people the same day.
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          // 2 Nov 2026: these headers are INERT while the redirect below is
          // in place - a 307 short-circuits before they matter, and the Blob
          // store serves the bytes with its own headers. They are kept so
          // that flipping back to a rewrite does not silently lose the
          // content type. See the redirect for why proxying was abandoned.
        ],
      },
      {
        source: "/mac/latest.json",
        headers: [
          { key: "Content-Type", value: "application/json; charset=utf-8" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Cache-Control",
            value: "public, max-age=60, must-revalidate",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      /**
       * The dmg is a REDIRECT, not a rewrite, and that distinction is the
       * whole point.
       *
       * It was a rewrite until 2 Nov 2026, which meant Vercel's edge proxied
       * the Blob store and cached the result keyed on the URL alone. A single
       * range request - a resumed browser download, a download manager, a
       * phone tether that reconnects - made the origin answer 206 with a
       * partial body, and the edge then served that 1 MiB fragment to every
       * plain GET until the TTL expired. macOS mounts the header, finds no
       * filesystem, and reports "The disk image is corrupted". One person on
       * a bad connection broke the download for everyone behind them, which
       * is why it looked intermittent and unreproducible.
       *
       * `Vary: Range` was tried first and the edge ignored it - the poisoning
       * reproduced one second later. Do not try that again. Redirecting keeps
       * the binary out of the edge cache entirely, so there is no cache entry
       * left to poison; the Blob store's own CDN handles ranges correctly.
       *
       * It must stay a 307 (`permanent: false`). A 308 is cached by browsers
       * forever and would weld this URL to today's Blob host, leaving no way
       * to move the file without stranding every Mac already shipped.
       */
      ...(DMG_ORIGIN
        ? [
            {
              source: "/download/Servey.dmg",
              destination: `${DMG_ORIGIN}/Servey.dmg`,
              permanent: false,
            },
          ]
        : []),
      {
        source: "/blog/control-a-headless-mac-mini-remotely",
        destination: "/blog/headless-mac-mini-setup",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return {
      // The dmg used to be proxied here. It is a redirect now - see
      // redirects() for the incident that forced the change.
      beforeFiles: [],
      afterFiles: [
        {
          source: "/ingest/static/:path*",
          destination: `${POSTHOG_ASSET_HOST}/static/:path*`,
        },
        {
          source: "/ingest/:path*",
          destination: `${POSTHOG_INGEST_HOST}/:path*`,
        },
      ],
      fallback: [],
    };
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
