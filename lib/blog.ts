/**
 * Lightweight, typed blog registry. No CMS, no MDX toolchain - each post is a
 * list of simple content blocks so pages stay fully static and crawlable, which
 * is what search + AI answer engines need to index and cite Servey.
 *
 * To add a post: append an entry below. Pages, sitemap, and JSON-LD pick it up.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export interface Post {
  slug: string;
  title: string;
  /** Meta description + card summary. Keep ~150-160 chars. */
  description: string;
  /** ISO date (published). */
  date: string;
  keywords: string[];
  readingMinutes: number;
  /** Short intro shown under the H1 and used as the article lede. */
  lede: string;
  body: Block[];
}

export const posts: Post[] = [
  {
    slug: "control-your-mac-from-iphone-ipad",
    title: "How to control your Mac from your iPhone or iPad",
    description:
      "A practical guide to controlling your Mac from an iPhone or iPad - screen mirroring, mouse, keyboard, and a real terminal, on your network or anywhere.",
    date: "2026-07-09",
    keywords: [
      "control Mac from iPhone",
      "control Mac from iPad",
      "remote desktop for Mac",
      "access Mac remotely",
      "iPhone Mac remote control",
    ],
    readingMinutes: 5,
    lede:
      "Your Mac has the storage, the horsepower, and all your files. Your iPhone and iPad are what you actually have in your hand. Here is how to bridge the two - and what to look for in a tool that does it well.",
    body: [
      {
        type: "p",
        text: "There are plenty of moments when you want your Mac but only have your phone: a build broke while you were on the couch, a render needs babysitting, or a file lives on your desktop and you are on a train. Controlling your Mac from an iPhone or iPad turns your pocket device into a window onto your real machine - the full desktop, your apps, your terminal.",
      },
      { type: "h2", text: "What good Mac remote control should feel like" },
      {
        type: "p",
        text: "Remote access for a Mac has existed for years, but most tools were built for cross-platform IT support, not for the specific experience of driving a Mac from an Apple touchscreen. A tool built for this should get a few things right:",
      },
      {
        type: "ul",
        items: [
          "Sharp, aspect-correct screen mirroring - text you can actually read, not a blurry, cropped rectangle.",
          "Real input: a precise on-screen trackpad with left and right click, plus a full keyboard including Copy, Paste, Esc, and Tab.",
          "Low latency on your local network, so the cursor tracks your finger instead of lagging behind it.",
          "A connection that just works away from home, without you configuring a VPN or forwarding ports on your router.",
          "Privacy by design - your screen should stay between your own devices, not pass through a stranger's servers.",
        ],
      },
      { type: "h2", text: "The setup problem most tools ignore" },
      {
        type: "p",
        text: "The single biggest reason people give up on remote desktop is networking. Traditional tools ask you to set up a VPN, forward ports, or memorize IP addresses. That is fine for an IT department and miserable for everyone else. The better model is simple: sign in on both devices with an account you already have, and let the app pair your own devices for you.",
      },
      {
        type: "p",
        text: "This is exactly the approach Servey takes. You install it on your Mac and on your iPhone or iPad, sign in with Google on each, and your Mac appears on your phone automatically - no VPN, no port forwarding, nothing to configure.",
      },
      { type: "h2", text: "On your network vs. anywhere else" },
      {
        type: "p",
        text: "The best experience happens when both devices are on the same Wi-Fi: a direct, high-performance video stream gives you the sharpest possible picture at a high frame rate. When you are away, a good tool should switch automatically to a private connection between your devices, so you never have to think about which mode you are in.",
      },
      {
        type: "p",
        text: "Servey does this switch for you. At home it streams directly for maximum quality; away from home it falls back to a private, end-to-end encrypted connection between your own devices, and it stays reliable even on strict mobile and carrier networks where many tools give up.",
      },
      { type: "h2", text: "Do not forget the terminal" },
      {
        type: "p",
        text: "Screen mirroring is great for clicking around, but a lot of what you want your Mac for is command-line work: restart a service, tail a log, kick off a deploy, fix a build. A remote tool that includes a genuine terminal - a real shell on your Mac, not a toy web console - turns your phone into a legitimate way to get work done.",
      },
      {
        type: "p",
        text: "Servey ships a real terminal alongside screen mirroring, available over both the local and remote connection paths, so you can drive a headless Mac Mini or fix a project from anywhere.",
      },
      { type: "h2", text: "The short version" },
      {
        type: "p",
        text: "To control your Mac from your iPhone or iPad well, you want sharp mirroring, real input, a terminal, automatic networking, and privacy - without the VPN-and-port-forwarding tax. Servey is built natively for the Apple ecosystem to do exactly this. It is launching soon; you can join the waitlist to be notified before release.",
      },
    ],
  },
  {
    slug: "screens-jump-desktop-alternative-mac",
    title: "Choosing a Screens or Jump Desktop alternative for Mac remote control",
    description:
      "What to look for in a modern alternative to Screens, Jump Desktop, TeamViewer, and VNC for controlling a Mac from an iPhone or iPad.",
    date: "2026-07-09",
    keywords: [
      "Screens alternative",
      "Jump Desktop alternative",
      "TeamViewer alternative Mac",
      "VNC alternative Mac",
      "best remote desktop for Mac",
    ],
    readingMinutes: 4,
    lede:
      "If you have been using Screens, Jump Desktop, TeamViewer, or a VNC app to reach your Mac from your phone, here is an honest checklist for evaluating a modern alternative.",
    body: [
      {
        type: "p",
        text: "Remote-desktop tools for the Mac fall into a few camps. VNC-based apps are open and flexible but often blurry and fiddly to secure. Cross-platform suites like TeamViewer are powerful but heavy and built primarily for IT support. Native Apple-focused apps like Screens and Jump Desktop are much nicer to use, and set the bar for what a good experience looks like. So what should you compare when choosing among them - or when looking for something new?",
      },
      { type: "h2", text: "A practical comparison checklist" },
      {
        type: "ul",
        items: [
          "Picture quality: is text crisp and aspect-correct, or blurry and stretched? Look for a modern, hardware-accelerated video path rather than plain VNC.",
          "Setup: does it require a VPN, port forwarding, or IP addresses - or do you just sign in on both devices?",
          "Away-from-home connectivity: does it connect reliably over cellular and behind strict carrier networks, and switch paths automatically?",
          "Input quality: a genuine trackpad and full keyboard with shortcuts, not a clumsy tap-to-click overlay.",
          "Terminal: can you run a real shell on your Mac, or is it screen-only?",
          "Privacy: is your session end-to-end encrypted and scoped to your own account, or relayed through third-party infrastructure?",
          "Native feel: is it built for Apple platforms, or an Electron or Java port that feels foreign on iOS?",
        ],
      },
      { type: "h2", text: "Where Servey fits" },
      {
        type: "p",
        text: "Servey is a new, native alternative built specifically for controlling a Mac from an iPhone or iPad. It aims at the parts of this checklist that matter most day to day:",
      },
      {
        type: "ul",
        items: [
          "Crystal-clear mirroring on your local network with a direct, hardware-accelerated stream.",
          "Zero-config setup: sign in with Google on both devices, no VPN and no port forwarding.",
          "Automatic path switching - direct on your network, private peer-to-peer when you are away - reliable even on strict mobile networks.",
          "A real terminal on your Mac, over either connection path.",
          "Private by design: sessions are scoped to your own account and end-to-end encrypted on the remote path.",
          "Built natively for the Apple ecosystem - not an Electron or Java port.",
        ],
      },
      { type: "h2", text: "Bottom line" },
      {
        type: "p",
        text: "Screens and Jump Desktop are excellent and well established. If you specifically want a native, zero-configuration tool with sharp mirroring and a real terminal - and you are happy to be an early adopter - Servey is worth watching. It is launching soon; join the waitlist to try it.",
      },
    ],
  },
  {
    slug: "real-terminal-on-your-mac-from-iphone",
    title: "Run a real terminal on your Mac from your iPhone",
    description:
      "How to get a genuine macOS shell on your iPhone or iPad - tail logs, fix builds, and drive a headless Mac from anywhere, not through a limited web console.",
    date: "2026-07-09",
    keywords: [
      "terminal on iPhone",
      "SSH to Mac from iPhone",
      "run terminal on Mac remotely",
      "headless Mac Mini remote",
      "mobile shell for Mac",
    ],
    readingMinutes: 4,
    lede:
      "Sometimes you do not need your whole desktop - you just need a command line on your Mac. Here is how to get a real shell in your pocket, and why the quality of that terminal matters.",
    body: [
      {
        type: "p",
        text: "A surprising amount of Mac work is command-line work: restart a stuck service, tail a log during an incident, re-run a failed build, pull the latest changes, or drive a headless Mac Mini sitting in a closet. For all of that, a full mirrored desktop is overkill - what you want is a fast, honest terminal.",
      },
      { type: "h2", text: "Why not just SSH?" },
      {
        type: "p",
        text: "SSH from a phone works, but getting there is the hard part: you need your Mac reachable from the internet, which usually means a VPN, port forwarding, or a jump host, plus key management on a device with a touch keyboard. That is a lot of setup for a quick command. A purpose-built app can give you the same shell without any of the network plumbing.",
      },
      { type: "h2", text: "What makes a mobile terminal actually usable" },
      {
        type: "ul",
        items: [
          "A genuine shell on your Mac - your real environment, tools, and paths - not a sandboxed web console.",
          "The keys you actually need on a touch keyboard: Esc, Tab, Ctrl, arrows, and pipe, ready without hunting through menus.",
          "It works both on your local network and remotely, so the same terminal is there whether you are home or out.",
          "No VPN or port forwarding to reach your machine.",
        ],
      },
      { type: "h2", text: "How Servey handles it" },
      {
        type: "p",
        text: "Servey includes a real terminal as a first-class feature, right next to screen mirroring. It is a genuine shell on your Mac, available over both the direct local connection and the private remote path, so you can fix a build from the couch or check a process on a headless Mac from a train. Setup is just signing in with Google on both devices - no VPN, no ports.",
      },
      {
        type: "p",
        text: "If a real terminal in your pocket sounds useful, Servey is launching soon. Join the waitlist and we will let you know the moment it is ready.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
