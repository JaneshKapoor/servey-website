/** Central site constants - single source of truth for copy-adjacent facts. */
export const site = {
  name: "Servey",
  domain: "servey.in",
  url: "https://servey.in",
  tagline: "Your Mac. In your pocket.",
  // Kept under 160 chars so Google does not truncate it in results.
  description:
    "Servey mirrors your Mac to your iPhone and iPad with full mouse, keyboard, and a real terminal - sharp on your network, private anywhere else.",
  email: "hello@servey.in",
  accent: "#22dc6e",
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
