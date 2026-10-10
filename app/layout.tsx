import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@/components/analytics";
import { site, ogImage } from "@/lib/site";
import { features } from "@/lib/content";
import { screenshots, type ScreenshotSlot } from "@/lib/screenshots";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} - Your Mac. In your pocket.`,
    template: `%s - ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "remote desktop",
    "control Mac from iPhone",
    "control Mac from iPad",
    "screen mirroring",
    "remote terminal",
    "WebRTC remote desktop",
    "HEVC screen share",
    "Jump Desktop alternative",
    "Screens alternative",
    "macky alternative",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: {
    canonical: site.url,
    types: { "application/rss+xml": `${site.url}/feed.xml` },
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} - Your Mac. In your pocket.`,
    description: site.description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} - Your Mac. In your pocket.`,
    description: site.description,
    images: [ogImage],
  },
  robots: { index: true, follow: true },
  // Favicon + apple-touch-icon are provided by app/icon.png and app/apple-icon.png.
};

export const viewport: Viewport = {
  themeColor: "#0a0b0d",
  colorScheme: "dark light",
};

/**
 * The real captures, as ImageObjects hung off the product node.
 *
 * Only slots with `ready` and measured dimensions qualify - a placeholder is
 * not a screenshot of the product, and declaring one as such would break the
 * "never fabricate a screenshot" rule at the structured-data layer too. The
 * dimensions come from the registry so schema can never disagree with the file.
 */
const screenshotSlots: ScreenshotSlot[] = Object.values(screenshots);
// Dedupe by src: two slots may legitimately point at one file, and @id is
// derived from src, so without this the graph carries duplicate @id nodes and
// SoftwareApplication.screenshot lists the same image twice.
const uniqueBySrc = [...new Map(screenshotSlots.map((s) => [s.src, s])).values()];
const productScreenshots = uniqueBySrc
  .filter((s) => s.ready && s.src && s.width && s.height)
  .map((s) => ({
    "@type": "ImageObject",
    "@id": `${site.url}${s.src}#image`,
    contentUrl: `${site.url}${s.src}`,
    width: s.width,
    height: s.height,
    caption: s.alt,
  }));

// A single @graph so search + AI engines get the organization, the site and the
// product with its real feature list.
//
// **Offers and the FAQ deliberately live on the homepage instead** (see
// app/page.tsx). This graph is emitted by the root layout, so anything in it
// appears in the HTML of *every* page - and /how-it-works is linked from inside
// the iPad app, where App Store Review Guidelines 3.1.3 and 4.8 forbid pointing
// users at a non-Apple payment route. Prices in that page's markup are exactly
// what those rules are about. The nodes that carry money moved to the one page
// that is about money; `#app` is still defined here, so the `about` reference on
// every use-case page still resolves.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/icon.png`,
      description: site.description,
      email: site.email,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: site.email,
        url: `${site.url}/#contact`,
        availableLanguage: ["English"],
      },
      sameAs: ["https://x.com/KapoorJanesh", "https://x.com/dwivediishivam"],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      publisher: { "@id": `${site.url}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${site.url}/#app`,
      name: site.name,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "macOS 14 or later, iOS 17 or later, iPadOS 17 or later",
      description: site.description,
      url: site.url,
      publisher: { "@id": `${site.url}/#organization` },
      featureList: features.map((f) => f.title.replace(/\.$/, "")),
      screenshot: productScreenshots.map((s) => ({ "@id": s["@id"] })),
    },
    ...productScreenshots,
  ],
};

/**
 * Speculation Rules - prefetch and prerender same-origin navigations.
 *
 * Every page here is statically generated, so the speculated response is a file
 * off the CDN and the work is close to free; by the time the click lands the
 * next document is already parsed and its LCP image decoded.
 *
 * `moderate` (hover / pointerdown) rather than `eager`, because eager would
 * speculate all ~20 links on the blog index at once for one click. Both lists
 * carry the same rule on purpose: prerender is capped at two in flight and is
 * dropped entirely under memory pressure or Data Saver, and the prefetch is
 * what still helps in those cases.
 *
 * `href_matches: "/*"` is relative, so it is same-origin by construction. The
 * exclusions are the two paths that are not documents - /api/* is POST-only
 * JSON and /ingest/* is the PostHog proxy, where a speculative GET would be a
 * wasted round trip at best and a phantom event at worst.
 */
const documentRule = {
  where: {
    and: [
      { href_matches: "/*" },
      { not: { href_matches: "/api/*" } },
      { not: { href_matches: "/ingest/*" } },
    ],
  },
  eagerness: "moderate",
};

const speculationRules = {
  prefetch: [documentRule],
  prerender: [documentRule],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        {/* Set theme before paint to avoid a flash; defaults to dark. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('servey-theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`,
          }}
        />
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(speculationRules) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Visually hidden until focused - lets keyboard users jump the nav. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-contrast"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--surface)",
              border: "1px solid var(--border-strong)",
              color: "var(--fg)",
            },
          }}
        />
      </body>
    </html>
  );
}
