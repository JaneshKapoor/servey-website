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

// Leading "/" so these also resolve from /blog and /privacy etc., not just the
// homepage where the header also appears.
export const nav = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Compare", href: "/#compare" },
  { label: "FAQ", href: "/#faq" },
] as const;
