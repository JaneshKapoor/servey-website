import type { ScreenshotKey } from "@/lib/screenshots";

/* Trust strip - quick value props. */
export const trustItems = [
  { icon: "Sparkles", label: "Crystal-clear HEVC" },
  { icon: "TerminalSquare", label: "Real terminal" },
  { icon: "ShieldCheck", label: "Private P2P" },
  { icon: "Globe", label: "Works anywhere" },
] as const;

/**
 * Who it's for - the audience answer.
 *
 * The landing page argued what Servey is and what to do next, but never named
 * a person. These four cards each state a before and an after for one real
 * audience, and promote the matching use-case page out of footer-only linking.
 *
 * `slug` must be a real slug in lib/use-cases.ts. The section derives its
 * "more" links by excluding these four, so adding a use case surfaces it
 * automatically instead of silently staying in the footer.
 */
export interface Audience {
  icon: string;
  who: string;
  before: string;
  after: string;
  slug: string;
}

export const audiences: Audience[] = [
  {
    icon: "Code2",
    who: "Developers",
    before: "A build is running on the Mac at your desk, and you are not at your desk.",
    after: "Tail the log, restart the job, or open a simulator from your phone - in your real environment, with your toolchain and credentials already in place.",
    slug: "mac-for-developers",
  },
  {
    icon: "Bot",
    who: "Anyone running AI agents",
    before: "Your coding agent has been working for forty minutes and has stopped to ask a yes-or-no question.",
    after: "See what it is doing, answer the prompt, and let it carry on - without walking back to the desk to press one key.",
    slug: "remote-mac-for-ai-agents",
  },
  {
    icon: "Server",
    who: "Headless Mac and home lab owners",
    before: "The Mac mini has no monitor, no keyboard, and lives on a shelf behind the router.",
    after: "Its screen and its shell on your iPad, through the login screen and back after a reboot, with nothing exposed to the internet.",
    slug: "headless-mac-mini",
  },
  {
    icon: "Smartphone",
    who: "Everyone else with a Mac",
    before: "The file, the screenshot, the one click you need is on a Mac you left at home.",
    after: "Your whole desktop on your iPhone, aspect-correct and sharp enough to actually read - so you just do it and move on.",
    slug: "control-mac-from-iphone",
  },
];

/* Numbered feature sections (alternating left/right). */
export interface Feature {
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
  screenshot?: ScreenshotKey;
  /** feature 04 renders the animated dual-path diagram instead of a screenshot */
  diagram?: boolean;
  /** feature 05 renders the privacy illustration instead of a screenshot */
  privacy?: boolean;
}

export const features: Feature[] = [
  {
    index: "01",
    eyebrow: "Screen mirroring",
    title: "Crystal-clear screen mirroring.",
    body: "On your network, Servey streams a custom hardware-HEVC feed of your Mac - razor-sharp text at a high frame rate with minimal latency. Pinch to zoom in and inspect the smallest detail.",
    bullets: ["Full-HD+, aspect-correct", "Hardware HEVC via VideoToolbox", "Pinch-to-zoom inspection"],
    screenshot: "mirroring-ipad",
  },
  {
    index: "02",
    eyebrow: "Input",
    title: "Real mouse, keyboard & trackpad.",
    body: "A purpose-built on-screen trackpad reaches every edge of your screen, with left/right click and a scroll control. The full keyboard is here too - including ⌘C, ⌘V, Esc, Tab, Return and Backspace.",
    bullets: ["Relative-move virtual trackpad", "L/R click, drag & scroll", "Shortcuts: ⌘C · ⌘V · Esc · Tab"],
    screenshot: "iphone-controls",
  },
  {
    index: "03",
    eyebrow: "Terminal",
    title: "A real terminal, in your pocket.",
    body: "Not a toy - a genuine shell on your Mac, available over either connection path. Fix a build from the couch, tail a log on the train, or drive a headless Mac Mini from anywhere.",
    bullets: ["Full shell access", "Works on LAN and remote", "Native, not a web console"],
    screenshot: "terminal",
  },
  {
    index: "04",
    eyebrow: "Networking",
    title: "Two paths, zero thought.",
    body: "Same Wi-Fi? Servey uses a direct hardware-HEVC stream - no cloud in the middle. Different networks? It falls back to a private peer-to-peer WebRTC connection. It switches automatically; you never choose.",
    bullets: ["LAN: direct hardware HEVC", "Remote: P2P WebRTC (H.264)", "STUN/TURN traversal, even on CGNAT"],
    diagram: true,
  },
  {
    index: "05",
    eyebrow: "Privacy",
    title: "Private by design.",
    body: "Sign in with Google on both devices; Servey only ever pairs your Mac with your iPhone or iPad. On the remote path your screen video is peer-to-peer and end-to-end encrypted - it hardly touches our servers. The cloud only brokers the initial handshake.",
    bullets: ["Account-scoped device pairing", "Video hardly touches our servers", "Device registration & approval"],
    privacy: true,
  },
  {
    index: "06",
    eyebrow: "Quality",
    title: "Adaptive quality, full frame.",
    body: "Servey continuously tunes resolution and bitrate to the live network path - direct or relayed - so the picture stays smooth without ever cropping or degrading your screen.",
    bullets: ["Path-aware bitrate", "No cropping, ever", "Smooth on weak connections"],
    screenshot: "quality-closeup",
  },
];

/* How it works - 3 steps. */
export const steps = [
  {
    n: "1",
    title: "Sign in on both devices",
    body: "Install Servey on your Mac and your iPhone or iPad, then sign in with Google on each. That's the whole setup - no VPN, no port forwarding.",
  },
  {
    n: "2",
    title: "Your Mac appears",
    body: "Servey registers your Mac to your account and it shows up on your iPhone or iPad automatically, ready and waiting - near or far.",
  },
  {
    n: "3",
    title: "Tap to connect & control",
    body: "Tap your Mac to open a live, crystal-clear window. Move the mouse, type, run the terminal - Servey picks the best path for you.",
  },
] as const;

/* Comparison table (§1). */
export const comparison = {
  columns: { traditional: "Traditional remote tools", servey: "Servey" },
  rows: [
    {
      theme: "Build",
      traditional: "Cross-platform Electron/Java ports, generic UI",
      servey: "Native Swift/SwiftUI, Apple-first, designed for touch",
    },
    {
      theme: "Local quality",
      traditional: "Software-encoded, soft text, laggy",
      servey: "Hardware HEVC on LAN - crystal-clear, native decode",
    },
    {
      theme: "Networking",
      traditional: "Manual VPN / port forwarding / vendor accounts",
      servey: "Auto LAN-or-remote; same-account pairing; zero setup",
    },
    {
      theme: "Privacy",
      traditional: "Video often relayed through a vendor cloud",
      servey: "P2P - video hardly touches our servers; cloud only brokers the handshake",
    },
    {
      theme: "Terminal",
      traditional: "Add-on or absent",
      servey: "Real terminal built in, over both paths",
    },
    {
      theme: "Touch UX",
      traditional: "Desktop cursor bolted onto a phone",
      servey: "Purpose-built virtual trackpad, dock, pinch-zoom",
    },
    {
      theme: "Adaptivity",
      traditional: "Fixed or clumsy quality",
      servey: "Path-aware adaptive quality, no cropping",
    },
  ],
} as const;

/* FAQ. */
export const faqs = [
  {
    q: "Do I need to be on the same network?",
    a: "No. On the same Wi-Fi, Servey uses a direct, high-performance stream for the sharpest possible picture. On different networks it automatically switches to a private connection between your own devices. Either way it just works.",
  },
  {
    q: "Is it secure and private?",
    a: "Yes. Servey pairs only your Mac with your own iPhone or iPad, scoped to your account. On the remote path your screen stays private and end-to-end encrypted between your devices - it hardly touches our servers.",
  },
  {
    q: "Does it work over cellular?",
    a: "Yes. Servey is built to connect reliably even on strict mobile and carrier networks where most tools give up, and it tunes quality to your connection automatically so the picture stays smooth.",
  },
  {
    q: "Which devices are supported?",
    a: "A Mac as the host, controlled from an iPhone or iPad. Servey is built natively for the Apple ecosystem - not an Electron or Java port - so it feels fast and right at home on your devices.",
  },
  {
    q: "Do I need a VPN or port forwarding?",
    a: "No. There's no VPN to configure and no ports to forward. Sign in with Google on both devices and your Mac appears - that's the entire setup.",
  },
  {
    q: "When is it launching and how much will it cost?",
    a: "Servey is a simple monthly subscription. The Terminal plan is $1.99/month, or ₹99/month in India; Full access - screen mirroring plus terminal - is $4.49/month, or ₹299/month in India. Join the waitlist and we'll email you the moment it's ready. You're never charged until launch.",
  },
] as const;

/**
 * Two plans, priced per region. USD everywhere, INR for India.
 *
 * International (USD) is the default tab, and `regions` is ordered to match so
 * the selected tab is also the first one. USD is the only currency in the
 * SoftwareApplication Offers in `app/layout.tsx`, so this keeps the visible
 * price consistent with the structured data a crawler reads.
 *
 * Pre-launch: cards drive to the waitlist, not checkout.
 */
export const pricing = {
  note: "Simple monthly pricing. Cancel anytime. You won't be charged until Servey launches.",
  regions: [
    { id: "intl", label: "International", symbol: "$", key: "usd" },
    { id: "in", label: "India", symbol: "₹", key: "inr" },
  ],
  plans: [
    {
      id: "terminal",
      name: "Terminal",
      tagline: "A genuine shell on your Mac, in your pocket.",
      price: { inr: "99", usd: "1.99" },
      featured: false,
      features: [
        "A real terminal - a genuine shell on your Mac, not a web console",
        "Works on your local network and remotely, automatically",
        "Handy shortcuts: Copy, Paste, Esc, Tab, and more",
        "Private by design, scoped to your own devices",
      ],
    },
    {
      id: "full",
      name: "Full access",
      tagline: "Screen mirroring and terminal - everything Servey does.",
      price: { inr: "299", usd: "4.49" },
      featured: true,
      features: [
        "Everything in Terminal, plus:",
        "Crystal-clear full screen mirroring of your Mac",
        "Real mouse, keyboard, and an on-screen trackpad",
        "Adaptive quality with pinch-to-zoom, never cropped",
      ],
    },
  ],
} as const;
