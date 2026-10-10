import type { ScreenshotKey } from "@/lib/screenshots";

/* Trust strip - quick value props. */
export const trustItems = [
  { icon: "Sparkles", label: "Sharp, readable screen" },
  { icon: "TerminalSquare", label: "Real terminal" },
  { icon: "ShieldCheck", label: "Private by design" },
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
    before:
      "A build is running on the Mac at your desk, and you are not at your desk.",
    after:
      "Tail the log, restart the job, or open a simulator from your phone - in your real environment, with your toolchain and credentials already in place.",
    slug: "mac-for-developers",
  },
  {
    icon: "Bot",
    who: "Anyone running AI agents",
    before:
      "Your coding agent has been working for forty minutes and has stopped to ask a yes-or-no question.",
    after:
      "See what it is doing, answer the prompt, and let it carry on - without walking back to the desk to press one key.",
    slug: "remote-mac-for-ai-agents",
  },
  {
    icon: "Server",
    who: "Headless Mac and home lab owners",
    before:
      "The Mac mini has no monitor, no keyboard, and lives on a shelf behind the router.",
    after:
      "Its screen and its shell on your iPad, through the login screen and back after a reboot, with nothing exposed to the internet. A MacBook counts too - Servey can drive one with the lid shut, no dummy HDMI plug required.",
    slug: "headless-mac-mini",
  },
  {
    icon: "Smartphone",
    who: "Everyone else with a Mac",
    before:
      "The file, the screenshot, the one click you need is on a Mac you left at home.",
    after:
      "Your whole desktop on your iPhone, aspect-correct and sharp enough to actually read - so you just do it and move on.",
    slug: "control-mac-from-iphone",
  },
];

/**
 * The situations, not the category.
 *
 * "Remote desktop for Mac" is a crowded shelf and a weak frame - it describes a
 * tool rather than a moment, and every competitor is already on that shelf. These
 * are the moments people actually recognise, written as a `when` and a `then` so a
 * visitor finds their own case in the first few seconds rather than decoding a
 * feature list.
 *
 * Order is deliberate: the two most universally understood first, then the two
 * nobody else can serve (a session that outlived the app, and an agent waiting on
 * a human), which is where the real wedge is.
 *
 * KEEP THE COUNT A MULTIPLE OF SIX. The section renders 2 columns at `sm` and 3
 * at `lg`, so only a multiple of both fills every row. This shipped with seven
 * and left one card stranded on a row of its own.
 */
export interface Situation {
  icon: string;
  when: string;
  then: string;
}

export const situations: Situation[] = [
  {
    icon: "Sofa",
    when: "The MacBook is upstairs and you are on the couch.",
    then: "Open it on the iPad without getting up. The same desktop, the same apps, already signed in to everything.",
  },
  {
    icon: "Coffee",
    when: "The Mac mini is at home and you are at a cafe.",
    then: "It has no monitor and does not need one. It sits on a shelf doing its job, and you reach it anyway.",
  },
  {
    icon: "Hammer",
    when: "A build was running when you had to leave.",
    then: "It kept going without you. Rejoin the same session and read the log from exactly where it got to.",
  },
  {
    icon: "Bot",
    when: "Your coding agent has stopped to ask a question.",
    then: "Answer it from your phone and let the agent carry on, instead of losing the forty minutes it was mid-way through.",
  },
  {
    icon: "FileText",
    when: "The file is on your Mac, not in a cloud folder.",
    then: "Go and get it. Open the app that made it, export what you need, and send it on from there.",
  },
  {
    icon: "Plane",
    when: "You are travelling and need one Mac-only app.",
    then: "Xcode, Logic, Final Cut. Use the real one on the real machine rather than hunting for a substitute.",
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
    body: "On your own Wi-Fi, Servey streams your Mac at high quality: text stays sharp, movement stays smooth, and there is no noticeable lag. Pinch to zoom in and read the smallest detail.",
    bullets: [
      "Text you can actually read",
      "Pinch to zoom into any detail",
      "Your whole screen, never cropped",
    ],
    screenshot: "mirroring-ipad",
  },
  {
    index: "02",
    eyebrow: "Input",
    title: "Real mouse, keyboard & trackpad.",
    body: "A purpose-built on-screen trackpad reaches every edge of your screen, with left/right click and a scroll control. The full keyboard is here too - including ⌘C, ⌘V, Esc, Tab, Return and Backspace.",
    bullets: [
      "An on-screen trackpad built for fingers",
      "Left click, right click, drag and scroll",
      "Copy, paste, Esc and Tab",
    ],
    screenshot: "iphone-controls",
  },
  {
    index: "03",
    eyebrow: "Terminal",
    title: "A real terminal, in your pocket.",
    body: "Not a toy - a genuine shell on your Mac, available over either connection path. Fix a build from the couch, tail a log on the train, or drive a headless Mac Mini from anywhere. And what you start does not stop when you put the phone down.",
    bullets: [
      "A real shell, not a web console",
      "Works at home and away",
      "Built in, no second app",
    ],
    screenshot: "terminal",
  },
  {
    index: "04",
    eyebrow: "Sessions",
    title: "Your work keeps running.",
    body: "Every terminal session is a named session that lives on the Mac, not inside the app. Start a long build from the iPad, close Servey, lose signal, get on a plane - it is still going when you come back. Pick it up from the iPad, from the Mac, or from two devices at once - and if you ever stop using Servey, the same session is still there in the Mac's own Terminal.",
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
    body: "On the same Wi-Fi, Servey connects straight to your Mac with nothing in the middle. Somewhere else, it makes a private connection between your two devices. It picks whichever works on its own, and if you walk out of the door and drop onto mobile data mid-session it reconnects instead of dropping you.",
    bullets: [
      "At home: a direct connection",
      "Away: encrypted, device to device",
      "Works on strict mobile networks",
      "Survives switching to mobile data",
    ],
    diagram: true,
  },
  {
    index: "06",
    eyebrow: "Privacy",
    title: "Two locks, not one.",
    body: "Sign in with Google on both devices, then set a master password on your Mac that every device has to produce before it can connect. New devices wait for you to approve them on the Mac itself, and you can revoke any of them at any time. Your screen goes straight between your two devices, encrypted the whole way. When a network refuses to allow that, it goes through our own server rather than a third party's.",
    bullets: [
      "A master password, set on your Mac",
      "Every new device approved by you",
      "Direct when it can, our own server if not",
    ],
    privacy: true,
  },
  {
    index: "07",
    eyebrow: "Quality",
    title: "Adaptive quality, full frame.",
    body: "Servey keeps adjusting to whatever connection you are on, so the picture stays smooth on a weak signal without ever cropping your screen or squashing it out of shape.",
    bullets: [
      "Adjusts to your connection",
      "Never crops your screen",
      "Smooth on a weak signal",
    ],
    screenshot: "quality-closeup",
  },
];

/* How it works - 3 steps. */
export const steps = [
  {
    n: "1",
    title: "Sign in, then set a master password",
    body: "Install Servey on your Mac and your iPhone or iPad and sign in with Google on each. On the Mac you then set a master password. Every device has to produce it before it can connect, and there is deliberately no way to skip it.",
  },
  {
    n: "2",
    title: "Grant two permissions, go online",
    body: "macOS asks for Screen Recording and Accessibility, because mirroring your screen and moving your cursor are exactly what those two govern. Switch your Mac online and it is reachable by your own devices - still no VPN, no port forwarding, no static IP.",
  },
  {
    n: "3",
    title: "Approve the device, then connect",
    body: "Your Mac appears on your iPhone or iPad by itself. The first time a new device asks, you approve it on the Mac. After that, tap to open a live window and take the screen or the terminal - Servey picks the best path for you.",
  },
] as const;

/* Comparison table (§1). */
export const comparison = {
  // Plain English on purpose. This section is read by someone deciding whether
  // Servey is for them, not by someone auditing the protocol stack, and the
  // owner was right that the old rows (hardware HEVC, P2P, CGNAT, path-aware
  // bitrate) asked the reader to already know the answer. The technical detail
  // still exists where people go looking for it: the blog comparisons and the
  // privacy policy.
  columns: { traditional: "Most remote desktop apps", servey: "Servey" },
  rows: [
    {
      theme: "Reading your screen",
      traditional: "Soft, blurry text you end up squinting at",
      servey: "Sharp enough to read, and you can pinch to zoom in",
    },
    {
      theme: "Getting set up",
      traditional: "Set up a VPN, forward ports, or make a vendor account",
      servey: "Sign in with Google on both devices. Nothing to change on your router.",
    },
    {
      theme: "Who sees your screen",
      traditional: "Your video usually travels through the vendor's servers",
      servey: "Straight between your own devices. If your network blocks that, through our server, not someone else's.",
    },
    {
      theme: "Getting to a command line",
      traditional: "A separate app, or not possible at all",
      servey: "A real terminal, one tap from the screen",
    },
    {
      theme: "Leaving mid-job",
      traditional: "Close the app and whatever you started stops with it",
      servey: "Your work keeps running on the Mac. Come back later and pick it up.",
    },
    {
      theme: "Using it on a phone",
      traditional: "A desktop mouse pointer squeezed onto a touchscreen",
      servey: "A trackpad and keyboard designed for fingers",
    },
    {
      theme: "Trying it",
      traditional: "A countdown trial, or a free plan that accuses you of business use",
      servey: "Free: three five-minute sessions a day, no card",
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
    a: "Yes, and there are two locks rather than one. Signing in with Google pairs only your own devices, scoped to your account. On top of that you set a master password on your Mac that every device must produce before it can connect, each new device waits for you to approve it on the Mac itself, and you can revoke any device at any time. Your screen goes straight between your devices, encrypted the whole way. If your network will not allow a direct connection, it goes through our own server rather than a third party's.",
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
    a: "A Mac as the host, controlled from an iPhone or iPad. Servey needs macOS 14 or later on the Mac and iOS or iPadOS 17 or later on the device you control it from, so it is worth checking your versions first. Any Mac that runs macOS 14 works, Apple silicon or Intel, and a MacBook can be driven with the lid shut. Servey is built natively for the Apple ecosystem - not an Electron or Java port - so it feels fast and right at home on your devices.",
  },
  {
    q: "Do I need a VPN or port forwarding?",
    a: "No. There's no VPN to set up, no ports to forward and nothing to change on your router - Servey works out how to reach your Mac on its own, even on mobile networks that normally block incoming connections. Setup is signing in with Google on both devices, setting a master password on the Mac, and granting the two macOS permissions any screen-sharing tool needs: Screen Recording and Accessibility.",
  },
  {
    q: "Is there a free version?",
    a: "Yes. Servey has a free tier with no card and no countdown: five-minute sessions, three sessions a day, and your daily allowance resets at local midnight. Everything Servey does is in it - screen mirroring, input and the terminal - so what you are paying for on a paid plan is time, not a longer feature list.",
  },
  {
    q: "Is it out yet, and how much does it cost?",
    a: "The Mac app is out now and downloads straight from this site - it is signed and notarised by Apple, so it opens like any other Mac app. The iPhone and iPad app is on its way to the App Store. Pricing: free to start, the Terminal plan at $1.99/month or ₹99/month in India, and Full access - screen mirroring plus terminal - at $4.49/month or ₹299/month in India. You can buy and manage a subscription from the Account screen in the Mac app.",
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
  note: "Start free, no card required. Paid plans are simple monthly pricing, and you can cancel anytime from the Account screen in the app.",
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
        "Three sessions a day, reset at local midnight",
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
