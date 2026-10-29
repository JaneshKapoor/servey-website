/** Central site constants - single source of truth for copy-adjacent facts. */
export const site = {
  name: "Servey",
  domain: "servey.in",
  url: "https://servey.in",
  tagline: "Your Mac, wherever you are.",
  // Kept under 160 chars so Google does not truncate it in results.
  description:
    "Your Mac, wherever you are. Servey puts its screen and a real terminal on your iPhone or iPad, and the work you start keeps running after you close it.",
  email: "hello@servey.in",
  accent: "#22dc6e",
} as const;

/**
 * The iPhone and iPad app on the App Store.
 *
 * Deliberately the short /app/id form with no storefront segment and no
 * campaign parameter: Apple redirects it to the visitor's own storefront, so
 * an Indian visitor lands on the rupee page and an American on the dollar one
 * without us detecting anything. Hardcoding /in/ or /us/ would show half our
 * readers a price they cannot pay.
 */
export const appStore = {
  url: "https://apps.apple.com/app/id6792620916",
  id: "6792620916",
  name: "Servey - Remote Desktop",
  // Apple's supplied badge artwork, downloaded from Apple's marketing tools
  // service. Black on light backgrounds, white on dark - those are the two
  // variants Apple ships, and recolouring or redrawing either is not allowed.
  badge: {
    black: "/app-store-badge-black.svg",
    white: "/app-store-badge-white.svg",
    // Intrinsic size of Apple's artwork; keep the ratio when scaling.
    width: 120,
    height: 40,
  },
} as const;

/**
 * The shared Open Graph / Twitter card image.
 *
 * Pass this object rather than the bare string "/opengraph-image": the string
 * form emits only og:image, dropping width, height and alt. Some scrapers will
 * not render a large summary card without explicit dimensions, so every page
 * that passed a string was quietly shipping a weaker card than the homepage.
 */
export const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name} - control your Mac from your iPhone and iPad`,
} as const;

// Leading "/" so these also resolve from /blog and /privacy etc., not just the
// homepage where the header also appears.
export const nav = [
  { label: "Features", href: "/#features" },
  { label: "Who it's for", href: "/#who-its-for" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Compare", href: "/#compare" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
] as const;
