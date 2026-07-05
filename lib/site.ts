/** Central site constants - single source of truth for copy-adjacent facts. */
export const site = {
  name: "Servey",
  domain: "servey.in",
  url: "https://servey.in",
  tagline: "Your Mac. In your pocket.",
  description:
    "Servey mirrors your Mac to your iPhone and iPad with full mouse, keyboard, and a real terminal - hardware-accelerated on your network, private peer-to-peer anywhere else.",
  email: "hello@servey.in",
  accent: "#22dc6e",
} as const;

export const nav = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Compare", href: "#compare" },
  { label: "FAQ", href: "#faq" },
] as const;
