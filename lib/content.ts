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
    after: "Its screen and its shell on your iPad, through the login screen and back after a reboot, with nothing exposed to the internet. A MacBook counts too - Servey can drive one with the lid shut, no dummy HDMI plug required.",
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
  /** feature 05 renders the animated dual-path diagram instead of a screenshot */
  diagram?: boolean;
  /** feature 06 renders the privacy illustration instead of a screenshot */
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
    body: "Not a toy - a genuine shell on your Mac, available over either connection path. Fix a build from the couch, tail a log on the train, or drive a headless Mac Mini from anywhere. And what you start does not stop when you put the phone down.",
    bullets: ["Full shell access", "Works on LAN and remote", "Native, not a web console"],
    screenshot: "terminal",
  },
  {
    index: "04",
    eyebrow: "Sessions",
    title: "Your work keeps running.",
    body: "Every terminal session is a named session that lives on the Mac, not inside the app. Start a long build from the iPad, close Servey, lose signal, get on a plane - it is still going when you come back. Pick it up from the iPad, from the Mac, from a second device at the same time, or from a plain Terminal window with tmux attach and no Servey involved at all.",
    bullets: [
      "Named sessions that outlive the app",
      "Drop off, come back, still there",
      "Resume on Mac, iPad, or plain Terminal",
    ],
    screenshot: "terminal-sessions",
  },
  {
    index: "05",
    eyebrow: "Networking",
    title: "Two paths, zero thought.",
    body: "Same Wi-Fi? Servey uses a direct hardware-HEVC stream - no cloud in the middle. Different networks? It falls back to a private peer-to-peer WebRTC connection. It switches automatically, and if you walk out of the door and drop onto cellular mid-session it renegotiates the connection instead of dropping you.",
    bullets: [
      "LAN: direct hardware HEVC",
      "Remote: P2P WebRTC (H.264)",
      "STUN/TURN traversal, even on CGNAT",
      "Survives a Wi-Fi to cellular handover",
    ],
    diagram: true,
  },
  {
    index: "06",
    eyebrow: "Privacy",
    title: "Two locks, not one.",
    body: "Sign in with Google on both devices, then set a master password on your Mac that every device has to produce before it can connect. New devices wait for you to approve them on the Mac itself, and you can revoke any of them at any time. Your screen video travels peer-to-peer and end-to-end encrypted; when a network refuses to allow that, it relays through our own server rather than a third party's cloud.",
    bullets: [
      "A master password, set on your Mac",
      "Every new device approved by you",
      "P2P first, our own relay if your network insists",
    ],
    privacy: true,
  },
  {
    index: "07",
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
      servey: "P2P first; when your network won't allow it, our own relay - not a vendor's cloud",
    },
    {
      theme: "Terminal",
      traditional: "Add-on or absent",
      servey: "Real terminal built in, over both paths",
    },
    {
      theme: "Persistence",
      traditional: "Close the client and the session dies with it",
      servey: "Named sessions keep running on the Mac; reattach from any device",
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
    {
      theme: "Cost to try",
      traditional: "Countdown trial, or a free tier that polices commercial use",
      servey: "Free tier, no card: five-minute sessions, five a day",
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
    a: "Yes, and there are two locks rather than one. Signing in with Google pairs only your own devices, scoped to your account. On top of that you set a master password on your Mac that every device must produce before it can connect, each new device waits for you to approve it on the Mac itself, and you can revoke any device at any time. Your screen video travels end-to-end encrypted peer-to-peer between your devices; if your network will not allow a direct connection, it relays through our own server rather than a third party's cloud.",
  },
  {
    q: "What happens to my terminal session if I disconnect?",
    a: "It keeps running. Every terminal session in Servey is a named session that lives on your Mac rather than inside the app, so closing Servey, losing signal or putting the phone in your pocket does not stop the work. Start a long build from the iPad, come back an hour later, and you rejoin it exactly where it got to. You can also open the same live session on your Mac and your iPad at once.",
  },
  {
    q: "Can I hide what I am doing from people near my Mac?",
    a: "Yes. Privacy Mode blacks out every monitor physically attached to your Mac while the stream you are watching keeps showing the real desktop. It covers every app, every space and every connected display, including the cursor, and nothing is overlaid on screen. If Servey quits or the connection drops, macOS restores the displays on its own, so it cannot leave the Mac stuck on black.",
  },
  {
    q: "What if I stop using Servey - am I locked in?",
    a: "No. Servey runs your terminal sessions in tmux on your own Mac, and the app shows you the attach command for each one. Paste it into Terminal.app, iTerm, Ghostty or an SSH connection and you are in the same live session with Servey uninstalled. Nothing you start in Servey is trapped in a format only Servey can open.",
  },
  {
    q: "Does it work over cellular?",
    a: "Yes. Servey is built to connect reliably even on strict mobile and carrier networks where most tools give up, and it tunes quality to your connection automatically so the picture stays smooth.",
  },
  {
    q: "Which devices are supported?",
    a: "A Mac as the host, controlled from an iPhone or iPad. Servey needs macOS 15.3 or later on the Mac and iOS or iPadOS 18.5 or later on the device you control it from, so it is worth checking your versions before you join the waitlist. Any Mac that runs macOS 15.3 works, Apple silicon or Intel, and a MacBook can be driven with the lid shut. Servey is built natively for the Apple ecosystem - not an Electron or Java port - so it feels fast and right at home on your devices.",
  },
  {
    q: "Do I need a VPN or port forwarding?",
    a: "No. There's no VPN to configure and no ports to forward. Sign in with Google on both devices and your Mac appears - that's the entire setup.",
  },
  {
    q: "Is there a free version?",
    a: "Yes. Servey has a free tier with no card and no countdown: five-minute sessions, five sessions a day, and your daily allowance resets at local midnight. Everything Servey does is in it - screen mirroring, input and the terminal - so what you are paying for on a paid plan is time, not a longer feature list.",
  },
  {
    q: "When is it launching and how much will it cost?",
    a: "Servey is in pre-submission hardening now, and the waitlist is how you get in first. Pricing is already set: free to start, the Terminal plan at $1.99/month or ₹99/month in India, and Full access - screen mirroring plus terminal - at $4.49/month or ₹299/month in India. Join the waitlist and we'll email you the moment it's ready. You're never charged until launch.",
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
  note: "Start free, no card required. Paid plans are simple monthly pricing, cancel anytime, and you won't be charged until Servey launches.",
  regions: [
    { id: "intl", label: "International", symbol: "$", key: "usd" },
    { id: "in", label: "India", symbol: "₹", key: "inr" },
  ],
  plans: [
    {
      id: "free",
      name: "Free",
      tagline: "Try everything Servey does. No card, no countdown.",
      price: { inr: "0", usd: "0" },
      featured: false,
      features: [
        "Everything Servey does, five minutes at a time",
        "Five sessions a day, reset at local midnight",
        "No card and no trial that expires on you",
        "Upgrade the day you want longer sessions",
      ],
    },
    {
      id: "terminal",
      name: "Terminal",
      tagline: "A shell on your Mac that keeps running without you.",
      price: { inr: "99", usd: "1.99" },
      featured: false,
      features: [
        "Unlimited terminal time - no five-minute cap",
        "Named sessions that keep running after you disconnect",
        "Reattach from your iPad, your Mac, or any terminal app",
        "Works on your local network and remotely, automatically",
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
