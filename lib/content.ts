import type { ScreenshotKey } from "@/lib/screenshots";

/* Trust strip - quick value props. */
export const trustItems = [
  { icon: "Sparkles", label: "Crystal-clear HEVC" },
  { icon: "TerminalSquare", label: "Real terminal" },
  { icon: "ShieldCheck", label: "Private P2P" },
  { icon: "Globe", label: "Works anywhere" },
] as const;

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
    a: "Pricing is coming soon. Join the waitlist and we'll email you the moment Servey is ready, with pricing details before launch.",
  },
] as const;
