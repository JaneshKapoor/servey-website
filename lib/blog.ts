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
  | { type: "ul"; items: string[] }
  // Comparison tables are the structure answer engines extract most reliably
  // from a page, so head-to-head posts should lead with one.
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | { type: "img"; src: string; alt: string; width: number; height: number; caption?: string };

export interface Post {
  slug: string;
  /** On-page H1. Can be longer and more descriptive than the meta title. */
  title: string;
  /**
   * Optional shorter <title> for search results. Google truncates around 60
   * characters including our " - Servey" template, so headlines that read well
   * as an H1 often need a tighter version here. Falls back to `title`.
   */
  metaTitle?: string;
  /** Meta description + card summary. Keep ~110-160 chars. */
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
    metaTitle: "A Screens and Jump Desktop alternative for Mac",
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
    slug: "screens-vs-jump-desktop",
    metaTitle: "Screens vs Jump Desktop: which should you pick?",
    title: "Screens vs Jump Desktop: which Mac remote control app is right for you?",
    description:
      "An honest head-to-head of Screens 5 and Jump Desktop for controlling a Mac - how they differ, who each one suits, and what to consider before picking.",
    date: "2026-08-02",
    keywords: [
      "Screens vs Jump Desktop",
      "Jump Desktop vs Screens 5",
      "Screens 5 alternative",
      "Jump Desktop alternative Mac",
      "best Mac remote desktop app",
    ],
    readingMinutes: 6,
    lede:
      "Screens and Jump Desktop are the two names that come up most when people want to control a Mac from an iPhone or iPad. They are both genuinely good, and they are good at different things. Here is how to tell which one fits you.",
    body: [
      { type: "h2", text: "The short answer" },
      {
        type: "p",
        text: "Pick Screens if you live entirely in the Apple ecosystem and want the most polished, native-feeling Mac-to-iPhone experience. Pick Jump Desktop if you also need to reach Windows machines, or if you want the widest protocol support in one app. If your priority is a real terminal and setup with no network configuration at all, neither is built primarily around that - and that is the gap newer tools like Servey are aimed at.",
      },
      { type: "h2", text: "What Screens is good at" },
      {
        type: "p",
        text: "Screens is made by Edovia and is unapologetically Apple-first. Its strength is polish: it looks and feels like a Mac and iOS app should, and the interface stays out of your way. For someone whose devices are all Apple and who mainly wants to see and drive their Mac's desktop from an iPad or iPhone, it is a very comfortable choice.",
      },
      {
        type: "ul",
        items: [
          "Native, well-designed Mac and iOS apps that feel at home on the platform.",
          "Straightforward for the common case: reach my own Mac, see my desktop, click things.",
          "A companion tool to help reach your Mac when you are away from your home network.",
        ],
      },
      { type: "h2", text: "What Jump Desktop is good at" },
      {
        type: "p",
        text: "Jump Desktop's strength is reach. It supports multiple remote-desktop protocols, including RDP and VNC, alongside its own higher-performance protocol, and it runs across more platforms. If your life is not purely Apple - a Windows desktop at work, a Linux box somewhere - Jump Desktop handles that variety in one app better than an Apple-only tool can.",
      },
      {
        type: "ul",
        items: [
          "Broad protocol support, so it connects to more kinds of machines.",
          "Cross-platform: useful if you are not exclusively on Apple hardware.",
          "A strong reputation for responsiveness on its own optimised protocol.",
        ],
      },
      { type: "h2", text: "How to actually choose between them" },
      {
        type: "p",
        text: "The honest framing is that this is not a question of which app is better, but which problem you have. Ask yourself three things:",
      },
      {
        type: "ul",
        items: [
          "Do I only ever need to reach Macs? If yes, an Apple-focused tool like Screens will feel more natural. If no, Jump Desktop's protocol range is the deciding factor.",
          "How much network setup am I willing to do? Reaching a machine from outside your home network is where remote-desktop tools differ most, and where people most often give up.",
          "Do I need a command line, or just a screen? If a lot of your work is restarting services, tailing logs, or kicking off builds, a screen-only tool makes you drive a GUI to reach a shell.",
        ],
      },
      {
        type: "p",
        text: "Because both apps are actively developed, check each one's current feature list and pricing directly before you buy - details change, and you should not take a blog post's word for what a product does today.",
      },
      { type: "h2", text: "Where a newer option like Servey fits" },
      {
        type: "p",
        text: "Servey is not trying to be a broader Jump Desktop or a more polished Screens. It is built around a narrower question: what if controlling your Mac from your iPhone required no network setup at all, and came with a real terminal?",
      },
      {
        type: "ul",
        items: [
          "Setup is signing in with Google on both devices. No VPN, no port forwarding, no IP addresses, nothing to configure on your router.",
          "It picks its own path: a direct high-quality stream when both devices are on the same Wi-Fi, and a private end-to-end encrypted connection between your own devices when you are away - including on strict mobile and carrier networks.",
          "A genuine shell on your Mac sits alongside the screen, so command-line work does not mean driving a GUI with a trackpad overlay.",
          "It is native to the Apple ecosystem rather than a cross-platform port.",
        ],
      },
      {
        type: "p",
        text: "The honest trade-off: Servey is Apple-only and it is still pre-launch, so it has none of the track record that Screens and Jump Desktop have earned over years. If you need something battle-tested today, buy one of those. If the zero-setup plus real-terminal combination is what you have been missing, Servey is worth a look.",
      },
      { type: "h2", text: "Bottom line" },
      {
        type: "p",
        text: "Screens wins on Apple-native polish. Jump Desktop wins on breadth and protocol support. Both are solid, established products and you will not regret either. The thing neither is built around is zero-configuration networking paired with a genuine terminal - which is exactly what Servey is being built for. It launches soon; join the waitlist to be notified.",
      },
    ],
  },
  {
    slug: "access-your-mac-remotely-over-cellular",
    title: "How to access your Mac remotely over cellular",
    description:
      "Reach your Mac from your iPhone on 4G or 5G - no VPN or port forwarding - even behind strict carrier networks and CGNAT. Here is how it works.",
    date: "2026-07-09",
    keywords: [
      "access Mac remotely over cellular",
      "control Mac over 4G 5G",
      "remote Mac without VPN",
      "connect to Mac behind CGNAT",
      "Mac remote access on mobile data",
    ],
    readingMinutes: 4,
    lede:
      "Getting to your Mac over Wi-Fi is easy. Getting to it from your phone on mobile data, behind your carrier's network, is where most remote tools fall apart. Here is why - and how to do it without any router setup.",
    body: [
      {
        type: "p",
        text: "You are out with just your phone on 5G, and you need something from your Mac at home. In theory this is simple; in practice, carrier networks make it hard. Understanding why helps you pick a tool that actually connects.",
      },
      { type: "h2", text: "Why cellular is the hard case" },
      {
        type: "p",
        text: "Most mobile carriers put you behind carrier-grade NAT (CGNAT), which means your phone does not have a public address that your Mac can call back to. The same is true for most home networks behind a router. Two devices that both sit behind NAT cannot simply open a direct connection - which is why traditional remote access asks you to set up a VPN, forward ports, or use a jump server.",
      },
      { type: "h2", text: "The modern approach: no router setup at all" },
      {
        type: "p",
        text: "Rather than making you configure the network, a well-built app coordinates the connection for you. A lightweight signaling step helps your two devices discover each other, then they establish a private, direct link. When a fully direct path is not possible, traffic is securely relayed so the session still works - all without you touching a router.",
      },
      {
        type: "ul",
        items: [
          "No VPN to install or maintain.",
          "No port forwarding or firewall rules on your home router.",
          "No public IP address or dynamic-DNS setup.",
          "Works from mobile data, cafe Wi-Fi, or a hotel network.",
        ],
      },
      { type: "h2", text: "How Servey connects over cellular" },
      {
        type: "p",
        text: "Servey is designed for exactly this situation. When you are away, it establishes a private, end-to-end encrypted connection between your own devices, using NAT traversal so it connects even on strict mobile and CGNAT networks. If a direct path is not available, it securely relays instead of failing. You never configure any of it - you sign in with Google on both devices and connect.",
      },
      {
        type: "p",
        text: "It also adapts quality to your connection automatically, so the picture stays smooth on a weaker mobile signal instead of freezing. Servey is launching soon - join the waitlist to try it.",
      },
    ],
  },
  {
    slug: "control-a-headless-mac-mini-remotely",
    metaTitle: "Control a headless Mac Mini from your iPhone",
    title: "Control a headless Mac Mini remotely from your iPhone or iPad",
    description:
      "Run a Mac Mini with no monitor and drive it entirely from your iPhone or iPad - screen, keyboard, and a real terminal - from your network or anywhere.",
    date: "2026-07-09",
    keywords: [
      "headless Mac Mini remote control",
      "Mac Mini no monitor",
      "control Mac Mini from iPad",
      "remote access Mac Mini server",
      "Mac Mini home server",
    ],
    readingMinutes: 4,
    lede:
      "A Mac Mini tucked on a shelf with no monitor makes a fantastic little always-on machine - a build box, a media server, an automation host. The catch is driving it. Here is how to run a headless Mac Mini from your iPhone or iPad.",
    body: [
      {
        type: "p",
        text: "The Mac Mini is popular as a headless machine: small, quiet, efficient, and powerful enough to be a home server, CI runner, or automation host. But 'headless' means no keyboard, mouse, or monitor attached - so you need a reliable way to reach it, both for the occasional GUI task and for everyday command-line work.",
      },
      { type: "h2", text: "You need two things: a screen and a shell" },
      {
        type: "p",
        text: "Most headless work is command-line: check a service, pull code, run a job, read a log. For that you want a real terminal. But now and then you need the actual desktop - to click through a GUI installer, approve a permission dialog, or use an app that has no command-line equivalent. A good remote tool gives you both from the same place.",
      },
      {
        type: "ul",
        items: [
          "A genuine shell on the Mac Mini for day-to-day commands and maintenance.",
          "Full screen mirroring with mouse and keyboard for the occasional GUI task.",
          "Access from your local network at home and remotely when you are out.",
          "Setup that does not require plugging in a monitor just to get started.",
        ],
      },
      { type: "h2", text: "Driving a Mac Mini with Servey" },
      {
        type: "p",
        text: "Servey turns your iPhone or iPad into the head for your headless Mac Mini. You get crystal-clear screen mirroring with real mouse and keyboard when you need the desktop, plus a real terminal for everything else - both available on your local network and remotely. Because setup is just signing in with Google on each device, you do not need to attach a display to configure it.",
      },
      {
        type: "p",
        text: "Whether the Mini is a build box, a home server, or an automation host, you can check on it and control it from your pocket. Servey is launching soon - join the waitlist to be notified before release.",
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
  {
    slug: "run-ai-agents-on-your-mac-remotely",
    metaTitle: "Monitor AI agents on your Mac from anywhere",
    title: "How to run and monitor AI agents on your Mac from anywhere",
    description:
      "Start long-running AI coding agents on your Mac, then watch, approve, and steer them from your iPhone or iPad - with a real terminal, from anywhere.",
    date: "2026-07-21",
    keywords: [
      "run AI agents remotely",
      "monitor coding agent from iPhone",
      "check on AI agent while away from computer",
      "remote terminal for AI agents",
      "control AI agent on Mac remotely",
    ],
    readingMinutes: 5,
    lede:
      "AI coding agents love to run for a long time - refactoring, testing, building - while you would rather not be chained to your desk. Here is how to start an agent on your Mac and keep an eye on it from your phone, wherever you are.",
    body: [
      {
        type: "p",
        text: "AI agents have changed how a lot of people work: you hand one a task, it churns for minutes or hours, and it stops now and then to ask a question or show you what it did. That is fantastic - right up until you need to leave your desk while it is still running. The agent lives on your Mac, with your code, your tools, and your compute. The trick is staying connected to that Mac from whatever device is actually in your hand.",
      },
      { type: "h2", text: "Why the agent should run on your Mac" },
      {
        type: "p",
        text: "An agent is only as capable as the machine it runs on. Your Mac has your real project checkout, your installed toolchain, your credentials, and the horsepower to actually do the work. Running the agent there - rather than on a phone-sized substitute - keeps everything local, fast, and private. The only thing missing when you walk away is a window back to it, and that is exactly the gap a good remote tool fills.",
      },
      { type: "h2", text: "What you need to babysit an agent remotely" },
      {
        type: "ul",
        items: [
          "A real terminal on your Mac - to launch the agent, read its live output, and answer the prompts it pauses on.",
          "Screen mirroring for the moments an agent's work spills into a browser, an app, or a GUI approval dialog.",
          "A connection that survives you leaving the house, switching from Wi-Fi to cellular, with no VPN or port forwarding.",
          "Low enough latency that a quick 'yes, continue', a Ctrl-C, or a one-line correction feels immediate.",
        ],
      },
      { type: "h2", text: "A simple remote-agent workflow" },
      {
        type: "p",
        text: "Start the agent in a terminal on your Mac before you head out. Once you are away, open the same terminal from your phone to watch it work in real time. When it stops to ask whether it should proceed, type your answer right there. If it kicks off something visual - opening a browser, running an app, or surfacing a permission dialog - switch to full screen mirroring, handle it, and switch back. Your Mac never stops being the one doing the work; your phone is simply the remote control.",
      },
      { type: "h2", text: "How Servey fits" },
      {
        type: "p",
        text: "Servey gives you a genuine shell on your Mac plus crystal-clear screen mirroring, both on your local network and remotely. Kick off a coding agent or a long build at your desk, walk away, and check in from your iPhone or iPad - read the log, approve the next step, nudge it in a new direction, or stop it. Because Servey also mirrors the full desktop with real mouse and keyboard, you are covered for the moments an agent needs a browser tab or a GUI click, not just the command line.",
      },
      {
        type: "p",
        text: "Setup is just signing in with Google on both devices - no VPN, no port forwarding. On the remote path your session is private and end-to-end encrypted between your own devices, and quality adapts automatically so it stays smooth even on cellular. Servey is launching soon; join the waitlist to be first to run your agents from anywhere.",
      },
    ],
  },
  {
    slug: "who-is-servey-for-developers-home-labs",
    metaTitle: "Who Servey is for: developers and home labs",
    title: "Who Servey is for: developers, home labs, and the endlessly curious",
    description:
      "Who gets the most from Servey: developers, home-lab and Mac Mini owners, AI tinkerers, and anyone curious about reaching their Mac from a phone.",
    date: "2026-07-21",
    keywords: [
      "remote Mac access for developers",
      "home lab remote control",
      "control Mac mini from phone",
      "remote desktop for developers",
      "who is remote Mac access for",
    ],
    readingMinutes: 4,
    lede:
      "Servey does one thing: it puts your Mac in your pocket. That is broadly useful, but a few kinds of people feel the difference immediately. Here is who Servey is really for.",
    body: [
      {
        type: "p",
        text: "Plenty of tools claim to be for everyone, which usually means they are sharply useful to no one. Servey is deliberately focused: it lets you control your Mac from your iPhone or iPad, with sharp screen mirroring and a real terminal, on your network or anywhere. A handful of people run into that need constantly - and for them, it is the difference between being stuck and getting on with it.",
      },
      { type: "h2", text: "Developers who don't want to be chained to a desk" },
      {
        type: "p",
        text: "Builds break, deploys need babysitting, and incidents never wait until you are back at your keyboard. With a real terminal on your Mac in your pocket, you can restart a service, tail a log, re-run a failed build, or pull the latest changes from the couch or a train - and when a task needs the actual desktop, screen mirroring is right there. Your development machine stays your development machine; you just reach it from wherever you are.",
      },
      { type: "h2", text: "Home-lab and Mac Mini owners" },
      {
        type: "p",
        text: "A Mac Mini on a shelf with no monitor makes a superb little always-on machine: a build box, a media or home server, an automation host. The catch is driving something headless. Servey becomes the head for it - a real shell for everyday maintenance, full screen mirroring with mouse and keyboard for the occasional GUI task, and no need to plug in a display just to get started.",
      },
      { type: "h2", text: "People running AI agents and long jobs" },
      {
        type: "p",
        text: "If you set an AI coding agent, a render, or a long training or build job running and then step away, you want to keep an eye on it. Servey lets you check progress from your phone, answer the prompts an agent stops on, and stop or redirect it if it goes sideways - without racing home to your desk.",
      },
      { type: "h2", text: "The simply curious" },
      {
        type: "p",
        text: "You do not need a job title to want your Mac in your hand. A file sitting on your desktop while you are out, an app that only runs on the Mac, or just checking on something at home - anyone who wants their Mac's full power available from the device they already carry gets it from Servey.",
      },
      { type: "h2", text: "What ties them together" },
      {
        type: "p",
        text: "Every one of these people wants their real Mac - not a stripped-down mobile stand-in - without paying a networking tax to reach it. That is what Servey is built for: native to the Apple ecosystem, zero-config setup, sharp mirroring, a genuine terminal, and private by design. It is launching soon; join the waitlist to try it.",
      },
    ],
  },
  {
    slug: "run-ai-agents-locally-on-your-mac",
    metaTitle: "Run AI agents locally on your Mac",
    title: "Run AI agents locally on your Mac - and reach them from anywhere",
    description:
      "Why running AI coding agents locally on your Mac beats the cloud - privacy, your real environment, no metered bills - and how to supervise them remotely.",
    date: "2026-07-21",
    keywords: [
      "run AI agents locally",
      "local AI agent on Mac",
      "run coding agent on your own machine",
      "self-hosted AI agent Mac",
      "private local AI agent",
    ],
    readingMinutes: 5,
    lede:
      "You do not need a cloud VM to run a capable AI agent. Your Mac already is one - with your code, your tools, and real horsepower. Here is why local is the better default, and how to stay connected to your agent when you step away.",
    body: [
      {
        type: "p",
        text: "The default assumption is that AI agents live in the cloud. But for a lot of real work, the most capable place to run an agent is the machine you already own. Your Mac has your actual project checkout, your configured toolchain, your credentials, and enough power to do serious work - and running the agent there keeps your code and data on your own hardware.",
      },
      { type: "h2", text: "Why local beats the cloud for a lot of agent work" },
      {
        type: "ul",
        items: [
          "Privacy: your source code, files, and secrets never leave your machine to sit on someone else's server.",
          "Your real environment: the agent works against your actual repo, dependencies, and config - not a blank sandbox you rebuild every time.",
          "No metered surprises: no per-hour VM you forgot to shut down, no cloud egress bills for shuffling your own data around.",
          "Speed: the agent reads and writes on a local SSD and uses your Mac's CPU and GPU directly.",
        ],
      },
      {
        type: "img",
        src: "/screenshots/quality-closeup.png",
        alt: "An AI coding agent running in a terminal on a Mac, with razor-sharp, fully legible text.",
        width: 1280,
        height: 692,
        caption: "An AI coding agent, running right in the terminal on your Mac.",
      },
      { type: "h2", text: "The one catch: you have to stay near the Mac" },
      {
        type: "p",
        text: "The trade-off of local is physical. A cloud agent you can poke from a browser anywhere; a local one lives on a machine at your desk. The moment you walk away - to lunch, to bed, out the door - you lose your window into it, which is right when a long run is most likely to stop and ask you something.",
      },
      { type: "h2", text: "Keep your window open from your phone" },
      {
        type: "p",
        text: "The fix is not to move the agent to the cloud; it is to carry a remote control for your Mac. With a real terminal on your Mac available from your iPhone or iPad, you can read the agent's live output, answer the prompts it pauses on, and stop or redirect it - all while it keeps running locally. When it does something visual, screen mirroring covers the rest.",
      },
      { type: "h2", text: "How Servey fits" },
      {
        type: "p",
        text: "Servey keeps a local-first agent practical. Run the agent on your Mac for all the reasons above, then use Servey to reach that Mac from your pocket: a genuine terminal plus crystal-clear screen mirroring, on your local network and remotely. Sign in with Google on both devices - no VPN, no port forwarding - and your remote session stays private and end-to-end encrypted between your own devices.",
      },
      {
        type: "p",
        text: "If running agents on your own machine appeals to you, Servey is launching soon. Join the waitlist to be first to run them locally and steer them from anywhere.",
      },
    ],
  },
  {
    slug: "stay-in-control-of-ai-agents-from-anywhere",
    metaTitle: "Stay in control of AI agents from anywhere",
    title: "AI agents can use your computer now - here's how to stay in control from anywhere",
    description:
      "As AI agents increasingly drive your computer, watching, pausing, and steering them remotely matters. How to keep a human in the loop from anywhere.",
    date: "2026-07-21",
    keywords: [
      "stay in control of AI agents",
      "supervise AI agent remotely",
      "human in the loop AI agent",
      "monitor computer use agent",
      "keep AI agent in check",
    ],
    readingMinutes: 4,
    lede:
      "AI agents are getting good at operating a real computer - editing files, running commands, clicking through apps. The more they can do on their own, the more it matters that you can watch and step in. Here is how to keep that oversight from anywhere.",
    body: [
      {
        type: "p",
        text: "A new class of AI agent does not just answer questions - it acts. It runs commands in your terminal, edits your files, opens apps, and clicks through interfaces on a real machine. That is powerful, and it is exactly why oversight matters: an agent working unattended for an hour can do a lot of good, or wander somewhere you did not intend.",
      },
      { type: "h2", text: "Autonomy is great - until it isn't" },
      {
        type: "p",
        text: "The point of an agent is that you can leave it alone. But 'leave it alone' and 'have no idea what it is doing' are different things. The healthy middle is supervised autonomy: the agent works on its own, and you can glance in at any time to see progress, approve a risky step, or pull the brakes. The catch is that the agent runs on your computer, and you are not always sitting at it.",
      },
      { type: "h2", text: "What staying in control actually requires" },
      {
        type: "ul",
        items: [
          "Visibility: see the agent's live output and what it is touching, in real time, from wherever you are.",
          "A pause button: answer a confirmation or send an interrupt the instant the agent stops to ask.",
          "The full picture: not just the terminal, but the actual screen, for when the work moves into a browser or an app.",
          "No friction to check in: reaching your machine should not need a VPN, a jump host, or setup you will not bother with at 11pm.",
        ],
      },
      {
        type: "img",
        src: "/screenshots/terminal.png",
        alt: "A real Mac terminal open on an iPad, reaching a Mac Mini's shell to supervise what is running.",
        width: 2360,
        height: 1640,
        caption: "Check in on - and take over - what's running on your Mac, from an iPad anywhere.",
      },
      { type: "h2", text: "Keep a human in the loop from your pocket" },
      {
        type: "p",
        text: "You do not need to sit at your desk to stay in control. With a real terminal and full screen mirroring of your Mac on your iPhone or iPad, you can supervise an agent from anywhere: watch what it is doing, respond when it pauses for permission, take over the desktop if it needs a human decision, or stop it outright. The agent keeps its autonomy; you keep the final say.",
      },
      { type: "h2", text: "How Servey fits" },
      {
        type: "p",
        text: "Servey is built for exactly this kind of oversight. It puts a genuine shell and crystal-clear screen mirroring of your Mac in your pocket, on your network and remotely, so an agent running on your machine is never more than a glance away. Setup is signing in with Google on both devices - no VPN or ports - and the remote path is private and end-to-end encrypted between your own devices.",
      },
      {
        type: "p",
        text: "If you want to hand more work to agents without handing over control, Servey is launching soon. Join the waitlist to keep a human in the loop from anywhere.",
      },
    ],
  },
  {
    slug: "best-remote-desktop-for-mac",
    metaTitle: "Best remote desktop apps for Mac (2026)",
    title: "The best remote desktop apps for Mac in 2026",
    description:
      "An honest roundup of the ways to control a Mac remotely - Jump Desktop, Screens, Splashtop, RustDesk, Chrome Remote Desktop, Screen Sharing, and Servey.",
    date: "2026-08-02",
    keywords: [
      "best remote desktop for Mac",
      "remote desktop Mac",
      "Mac remote access app",
      "control Mac remotely",
      "remote control Mac from iPhone",
    ],
    readingMinutes: 9,
    lede:
      "There is no single best remote desktop app for the Mac, because people are solving different problems with the word remote. Here is an honest map of the options, what each is genuinely good at, and how to pick.",
    body: [
      { type: "h2", text: "Quick picks" },
      {
        type: "ul",
        items: [
          "Best all-rounder, especially if you also use Windows: Jump Desktop.",
          "Best Apple-native polish for straightforward Mac-to-iPad control: Screens.",
          "Best free and open source: RustDesk.",
          "Easiest free setup that works from anywhere: Chrome Remote Desktop.",
          "Free and already installed, if you only need it on your own Wi-Fi: macOS Screen Sharing.",
          "If you want zero network setup plus a genuine terminal on iPhone or iPad: Servey (pre-launch).",
        ],
      },
      {
        type: "p",
        text: "Details and pricing change, so check each product's own site before buying. What follows is about approach and fit rather than a feature-by-feature scorecard that would be out of date in a month.",
      },
      { type: "h2", text: "First, decide which problem you actually have" },
      {
        type: "p",
        text: "A lot of confusion in this category comes from three genuinely different needs getting the same label. Sorting yours first eliminates most of the list:",
      },
      {
        type: "ul",
        items: [
          "Remote control: you want to see and drive a Mac that is somewhere else. This is what remote desktop means, and it is what most of this list does.",
          "Second screen: you want your iPad to become an extra display for a Mac sitting right next to you. That is Duet Display, Astropad, and Apple's own Sidecar - a different product category, not a weaker remote desktop.",
          "Command line only: you just need a shell to restart a service or check a build. SSH or a tool with a real terminal solves this without any video at all.",
        ],
      },
      { type: "h2", text: "macOS Screen Sharing (built in, free)" },
      {
        type: "p",
        text: "Every Mac already includes Screen Sharing, which is VNC under the hood. Turn it on in System Settings, Sharing, and connect from a VNC client. On your own network it is free, low latency, and completely adequate for occasional use.",
      },
      {
        type: "p",
        text: "The limits show up when you leave the house. Reaching it from outside your network means a VPN, port forwarding, or some other tunnel, and VNC is not the sharpest protocol for text-heavy screens. Good starting point, rarely the final answer.",
      },
      { type: "h2", text: "Jump Desktop" },
      {
        type: "p",
        text: "The most common recommendation in this category, and deservedly so. It supports RDP and VNC alongside its own higher-performance protocol, runs across more platforms than the Apple-only tools, and has a long reputation for responsive input on iPad.",
      },
      {
        type: "p",
        text: "Pick it if you need to reach more than just Macs, or if you want the safest well-tested choice. It is paid, and its breadth is the reason to choose it.",
      },
      { type: "h2", text: "Screens" },
      {
        type: "p",
        text: "Apple-first and unapologetic about it. Screens is the most polished option if your devices are all Apple and you mainly want to see your Mac's desktop from an iPad or iPhone. It is VNC-based with its own companion service for reaching your Mac when you are away.",
      },
      {
        type: "p",
        text: "Pick it for the native feel. Skip it if you also need Windows or Linux machines.",
      },
      { type: "h2", text: "Splashtop" },
      {
        type: "p",
        text: "Widely used, cross-platform, and strong on streaming performance, which is why it comes up for graphics-heavy work. It leans more commercial and IT-oriented than the Apple-focused apps, and its plans are worth reading carefully to find the one that matches personal versus business use.",
      },
      { type: "h2", text: "RustDesk" },
      {
        type: "p",
        text: "Open source, free, cross-platform, and self-hostable. If you are comfortable running your own relay server, RustDesk gives you remote access without trusting anyone else's infrastructure, which is a genuinely strong privacy story.",
      },
      {
        type: "p",
        text: "The trade-off is effort. Self-hosting is work, and the polish on iOS is not at the level of the paid Apple-focused apps. Excellent if you want control and do not mind the setup.",
      },
      { type: "h2", text: "Chrome Remote Desktop" },
      {
        type: "p",
        text: "Free, from Google, and by far the easiest thing to get working from anywhere: install it, sign in, done. No router configuration. For basic access to your desktop from another machine it is hard to argue with the price or the setup time.",
      },
      {
        type: "p",
        text: "It is basic by design, though. Input on a touchscreen is not built around iPad the way the native apps are, there is no real terminal, and the picture is not tuned for reading fine text.",
      },
      { type: "h2", text: "Servey" },
      {
        type: "p",
        text: "Servey is what we build, so treat this section with the appropriate scepticism and go look for yourself. It is aimed at a narrow version of the problem: controlling a Mac from an iPhone or iPad with no network setup at all, and with a genuine shell alongside the screen.",
      },
      {
        type: "ul",
        items: [
          "Setup is signing in with Google on both devices. No VPN, no port forwarding, no IP addresses.",
          "It chooses its own path: a direct stream when both devices are on the same Wi-Fi, and a private end-to-end encrypted connection between your own devices when you are away, including on strict carrier networks.",
          "A real terminal on your Mac, not a web console, over both connection paths.",
          "Built natively for Apple platforms rather than wrapped from a generic app.",
        ],
      },
      {
        type: "p",
        text: "The honest caveats: it is Apple-only, and it is pre-launch, so it has none of the track record the established names have earned. If you need something proven today, buy one of those instead.",
      },
      { type: "h2", text: "How to choose in one minute" },
      {
        type: "ul",
        items: [
          "Only ever on your own Wi-Fi, and cost matters most? Start with built-in Screen Sharing.",
          "Need Windows or Linux too? Jump Desktop.",
          "All Apple, want the most polished established app? Screens.",
          "Want free and open source, and happy to self-host? RustDesk.",
          "Want the fastest possible setup for free? Chrome Remote Desktop.",
          "Want your iPad as an extra monitor rather than remote control? Sidecar, Duet, or Astropad - different category.",
          "Want zero configuration plus a real terminal from your phone? Servey, once it launches.",
        ],
      },
      { type: "h2", text: "Bottom line" },
      {
        type: "p",
        text: "Most people asking for the best remote desktop for Mac will be well served by Jump Desktop or Screens, and by built-in Screen Sharing if they never leave their own network. The gap we kept running into - and the reason we are building Servey - is that almost none of these treat the command line as a first-class thing, and most still make you think about networking. If that is your gap too, join the waitlist.",
      },
    ],
  },
  {
    slug: "termius-alternative-mac-terminal",
    title: "Is Servey a Termius alternative? Honestly, only for one job",
    metaTitle: "Termius alternative? Only for one job",
    description:
      "Termius is an SSH client for many servers. Servey is a zero-setup agent for one Mac, with a terminal and screen mirroring. An honest comparison.",
    date: "2026-08-14",
    readingMinutes: 8,
    keywords: [
      "termius alternative",
      "ssh client for mac",
      "run terminal on mac from iphone",
      "mobile ssh client",
      "mac terminal from iphone",
    ],
    lede:
      "Termius comes up whenever someone wants a terminal on their phone, so it is a fair thing to be compared against. But the two products are shaped differently, and pretending otherwise would waste your time.",
    body: [
      { type: "h2", text: "The short answer" },
      {
        type: "p",
        text: "Termius is an SSH client: you bring the servers, configure the connections, and it reaches all of them from any platform. Servey is a host agent for a single machine - your Mac - that you reach from an iPhone or iPad with no SSH setup at all, and it also mirrors the screen. If you manage more than one machine, Termius is the right tool and Servey is not a replacement for it.",
      },
      { type: "h2", text: "What Termius actually is" },
      {
        type: "p",
        text: "Termius is a mature, cross-platform SSH client that runs on macOS, Windows, Linux, iOS, iPadOS and Android. Alongside SSH it handles SFTP, Mosh, Telnet and serial connections, plus port forwarding, jump hosts and proxies. It stores credentials in encrypted vaults, supports hardware keys and biometrics, and adds team features such as shared vaults, SSO and session logging. It has been shipping since 2019 and has a very large user base.",
      },
      {
        type: "p",
        text: "In other words it is built to manage a fleet. That is a genuinely hard problem and Termius solves it well.",
      },
      { type: "h2", text: "What Servey actually is" },
      {
        type: "p",
        text: "Servey installs a host app on your Mac. You sign in on the Mac and on your iPhone or iPad, and the Mac appears in a list. Tapping it opens a session: a real shell on that Mac, and optionally its mirrored screen with a trackpad and keyboard. There is no sshd to enable, no key to manage on a phone, no port to forward and no VPN. It reaches exactly one kind of target, and nothing else.",
      },
      { type: "h2", text: "Side by side" },
      {
        type: "table",
        caption:
          "Where the two overlap, and where they genuinely do not.",
        headers: ["", "Termius", "Servey"],
        rows: [
          ["Reaches", "Any SSH host you configure", "A Mac running its host app"],
          ["Setup to get in from outside", "SSH, plus VPN, port forward or jump host", "Sign in on both devices"],
          ["Screen / GUI control", "No", "Yes"],
          ["Multiple hosts", "Yes, unlimited", "No"],
          ["SFTP, Mosh, Telnet, serial", "Yes", "No"],
          ["Port forwarding, jump hosts", "Yes", "Not applicable"],
          ["Snippets, workspaces, autocomplete", "Yes", "No"],
          ["Team vaults, SSO, audit logs", "Yes", "No"],
          ["Platforms", "macOS, Windows, Linux, iOS, iPadOS, Android", "macOS host; iPhone and iPad client"],
          ["Track record", "Shipping since 2019, millions of users", "Pre-launch, no users"],
        ],
      },
      { type: "h2", text: "The real difference: a client versus an agent" },
      {
        type: "p",
        text: "This is the distinction that matters, and it explains every row in that table. Termius is a client. It speaks SSH to something that is already listening, which means the target has to be reachable: sshd running, and a route in from wherever you are. On your own network that is easy. From a cafe it means a VPN, a forwarded port, or an overlay network - and if your ISP uses CGNAT, forwarding a port may not be possible at all.",
      },
      {
        type: "p",
        text: "Servey is an agent. The Mac runs software that registers itself to your account and establishes the connection outward, so nothing needs to accept inbound traffic and nothing is exposed on a public address. That is why there is no configuration step. It is also why Servey cannot reach a machine you have not installed it on, which is a real limitation rather than an oversight.",
      },
      { type: "h2", text: "When Termius is the better choice" },
      {
        type: "p",
        text: "Most of the time, if you are the kind of person who already uses Termius. Specifically:",
      },
      {
        type: "ul",
        items: [
          "You connect to more than one machine, or to anything that is not a Mac.",
          "You need SFTP, Mosh, Telnet, serial, port forwarding or jump hosts.",
          "You work from Windows, Linux or Android.",
          "You need team vaults, credential sharing, SSO or audit-grade session logs.",
          "You want snippets, workspaces and a terminal refined over several years.",
          "You want a tool with a long track record, which Servey does not have.",
        ],
      },
      { type: "h2", text: "When Servey makes more sense" },
      {
        type: "ul",
        items: [
          "The machine you actually need is your own Mac, and only that.",
          "You do not want to enable Remote Login or expose anything to the internet.",
          "You have tried the SSH-from-a-phone route and abandoned it over setup.",
          "You sometimes need to see the screen, not just type at a prompt.",
        ],
      },
      { type: "h2", text: "Pricing, compared fairly" },
      {
        type: "p",
        text: "Termius has a free tier that is generous on protocol features but keeps sync between devices on the paid plan, with Pro around $10 per month billed annually and team tiers above that. Servey's Terminal plan is Rs 99 per month in India or $1.99 internationally, and Full access - screen mirroring plus terminal - is Rs 299 or $4.49.",
      },
      {
        type: "p",
        text: "That comparison is not as favourable as the numbers make it look. Servey costs less because it does far less: one machine, no SFTP, no fleet management, no team features. It is a lower price for a much narrower job, not a discount on the same thing.",
      },
      { type: "h2", text: "What Servey does not have" },
      {
        type: "p",
        text: "Worth stating plainly, because a comparison that only lists strengths is not a comparison. Servey has no SFTP, no multi-host support, no snippets or workspaces, no team or compliance features, and no Windows, Linux or Android client. Its terminal is a version one and does not have the refinements Termius has accumulated. And Servey is pre-launch: no users, no App Store reviews, nothing independent to check.",
      },
      {
        type: "p",
        text: "If a proven track record is what you are buying, that is Termius today, and that is a perfectly good reason to pick it.",
      },
      { type: "h2", text: "Bottom line" },
      {
        type: "p",
        text: "These two products share a keyboard and not much else. Termius is for infrastructure you run. Servey is for the one Mac you own, when getting to it should not require a VPN. If that second description is the one that fits, join the waitlist.",
      },
    ],
  },
];

/**
 * A real, named author for every post. AI answer engines and Google both weight
 * human authorship (E-E-A-T) more than a faceless brand byline, so we surface a
 * name, role, and bio and emit them as Person schema.
 */
export const author = {
  name: "Janesh Kapoor",
  role: "Co-creator of Servey",
  url: "https://x.com/KapoorJanesh",
  bio: "Janesh is building Servey, a native app that puts your Mac in your pocket. He writes about remote Mac access, terminals, and running things while away from your desk.",
};

/**
 * Date the posts were last reviewed/updated. A visible, machine-readable
 * "updated" signal is a freshness cue AI engines (Perplexity especially) reward.
 * Bump this whenever you meaningfully revise the posts.
 */
export const contentUpdated = "2026-08-14";

/**
 * Per-post FAQs. Rendered on the page and emitted as FAQPage JSON-LD so answer
 * engines can lift a direct, citable Q&A for each topic. Keep answers self-
 * contained (BLUF): the first sentence should stand on its own as the answer.
 */
export const faqsBySlug: Record<string, { q: string; a: string }[]> = {
  "termius-alternative-mac-terminal": [
    {
      q: "Is Servey a replacement for Termius?",
      a: "For most Termius users, no. Termius manages many servers over SSH, SFTP, Mosh, Telnet and serial across six platforms. Servey controls one machine - your Mac - from an iPhone or iPad. If you only use Termius to reach a single Mac and dislike the SSH setup, Servey may replace it. If you manage a fleet, it will not.",
    },
    {
      q: "Do I still need to set up SSH to use Servey?",
      a: "No. Termius is an SSH client, so your Mac needs Remote Login enabled and must be reachable - usually via a VPN, port forward or jump host when you are away. Servey installs a host app on your Mac and you sign in on both devices. No ports, no keys, no VPN.",
    },
    {
      q: "Can Termius show my Mac's screen?",
      a: "No. Termius is terminal-only and has never claimed otherwise. Servey includes screen mirroring with a real trackpad and keyboard alongside the terminal, for work that is not command-line work.",
    },
    {
      q: "Is Servey cheaper than Termius?",
      a: "The Terminal plan is Rs 99 per month in India or $1.99 internationally, against Termius Pro at roughly $10 per month billed annually. But Servey does far less - one Mac, no SFTP, no fleet management, no team features. It is a lower price for a much narrower job, not a discount on the same thing.",
    },
    {
      q: "Why trust a pre-launch app with access to my Mac?",
      a: "You should not take that on faith. Servey has not launched, has no users and no independent reviews. We document how pairing and encryption work, but if you need a proven track record today, Termius has one and Servey does not.",
    },
  ],
  "control-your-mac-from-iphone-ipad": [
    {
      q: "Can I control my Mac from my iPhone?",
      a: "Yes. With an app like Servey you get your Mac's full screen, a real trackpad and keyboard, and a genuine terminal on your iPhone - on your home Wi-Fi or anywhere else.",
    },
    {
      q: "Do I need a VPN to control my Mac remotely?",
      a: "No. Servey pairs your own devices when you sign in with Google on each, so there is no VPN, port forwarding, or IP addresses to manage.",
    },
    {
      q: "Is controlling my Mac from my phone secure?",
      a: "Yes. Servey only pairs your own devices under your account, and away from home your screen is end-to-end encrypted between your devices.",
    },
  ],
  "screens-jump-desktop-alternative-mac": [
    {
      q: "What is a good alternative to Screens or Jump Desktop?",
      a: "Servey is a native, Apple-focused alternative that adds a real terminal, automatic networking with no VPN, and end-to-end-encrypted remote connections between your own devices.",
    },
    {
      q: "Is Servey better than VNC or TeamViewer for a Mac?",
      a: "For controlling a Mac from an iPhone or iPad, yes - it is sharper than VNC and lighter than TeamViewer, with no manual network setup.",
    },
    {
      q: "How much does Servey cost?",
      a: "Terminal is Rs 99/month in India ($1.99 internationally); Full access (screen mirroring plus terminal) is Rs 299/month in India ($4.49 internationally).",
    },
  ],
  "best-remote-desktop-for-mac": [
    {
      q: "What is the best remote desktop app for Mac?",
      a: "For most people it is Jump Desktop if you also use Windows, or Screens if you are all-Apple. macOS Screen Sharing is free and fine if you never leave your own network.",
    },
    {
      q: "Is there a free way to control my Mac remotely?",
      a: "Yes. macOS Screen Sharing is built in and free on your local network, Chrome Remote Desktop is free and works from anywhere, and RustDesk is free and open source.",
    },
    {
      q: "How do I control my Mac from an iPhone or iPad without a VPN?",
      a: "Chrome Remote Desktop and Servey both avoid router setup entirely. Servey pairs your own devices after a Google sign-in and adds a real terminal alongside screen mirroring.",
    },
    {
      q: "Can I use my iPad as a second monitor instead?",
      a: "That is a different category. Apple Sidecar, Duet Display, and Astropad extend your desktop onto an iPad next to you; remote desktop apps control a Mac that is somewhere else.",
    },
    {
      q: "Which remote desktop app has a real terminal?",
      a: "Most are screen-only, so you drive a GUI to reach a shell. Servey ships a genuine shell on your Mac alongside mirroring, over both local and remote connections.",
    },
  ],
  "screens-vs-jump-desktop": [
    {
      q: "Which is better, Screens or Jump Desktop?",
      a: "Neither is universally better. Screens is the more polished Apple-only choice; Jump Desktop supports more protocols and platforms, so it wins if you also need to reach Windows or Linux machines.",
    },
    {
      q: "What is a good Screens 5 alternative for Mac?",
      a: "Jump Desktop is the closest established alternative. If you want zero network setup plus a real terminal on your Mac, Servey is a newer Apple-native option built around that.",
    },
    {
      q: "Is there a Jump Desktop alternative that includes a terminal?",
      a: "Servey pairs screen mirroring with a genuine shell on your Mac, available both locally and remotely, with no VPN or port forwarding to configure.",
    },
    {
      q: "Do Screens or Jump Desktop need port forwarding?",
      a: "Reaching a Mac from outside your home network is where remote tools differ most; check each product's current documentation. Servey avoids the question entirely by pairing your own devices after a Google sign-in.",
    },
  ],
  "access-your-mac-remotely-over-cellular": [
    {
      q: "Can I access my Mac over cellular (4G or 5G)?",
      a: "Yes. Servey connects your Mac and iPhone even on mobile networks, switching to a private encrypted path automatically when you are off your home Wi-Fi.",
    },
    {
      q: "Do I need to forward ports to reach my Mac on mobile data?",
      a: "No. Servey needs no port forwarding or static IP - sign in on both devices and it links them for you.",
    },
    {
      q: "Does it work on strict carrier networks?",
      a: "Yes. Servey is built to connect reliably even on strict mobile and carrier networks where many remote tools fail.",
    },
  ],
  "control-a-headless-mac-mini-remotely": [
    {
      q: "Can I control a headless Mac Mini with no monitor?",
      a: "Yes. Servey gives you the Mini's screen plus a real terminal from your iPhone or iPad, so it runs fine with no display attached.",
    },
    {
      q: "How do I access a Mac Mini remotely without a keyboard or mouse?",
      a: "Servey provides an on-screen trackpad, a full keyboard, and a terminal, so you can drive a headless Mini entirely from your phone.",
    },
    {
      q: "Is a terminal included for server-style tasks?",
      a: "Yes. Servey ships a genuine shell on your Mac, ideal for restarting services, tailing logs, or deploying on a headless Mini.",
    },
  ],
  "real-terminal-on-your-mac-from-iphone": [
    {
      q: "Can I get a real terminal on my Mac from my iPhone?",
      a: "Yes. Servey runs a genuine shell on your Mac - not a limited web console - over both local and remote connections.",
    },
    {
      q: "Isn't SSH enough for a terminal on my Mac?",
      a: "SSH works but is fiddly to expose safely. Servey gives you the same shell with no port forwarding, keys, or VPN to configure.",
    },
    {
      q: "Does the terminal work when I'm away from home?",
      a: "Yes. The terminal is available over the remote path too, so you can fix a build or run a deploy from anywhere.",
    },
  ],
  "run-ai-agents-on-your-mac-remotely": [
    {
      q: "Can I monitor an AI coding agent from my phone?",
      a: "Yes. Servey lets you watch and steer an agent running in your Mac's terminal from your iPhone, so you can approve steps or stop it from anywhere.",
    },
    {
      q: "Why run an AI agent on my Mac instead of the cloud?",
      a: "Your Mac already has your files and environment and no metered per-token infrastructure bills - Servey just lets you reach it while you are away.",
    },
    {
      q: "Can I take over if the agent goes wrong?",
      a: "Yes. You get a real terminal and full screen control, so you can intervene the moment something looks off.",
    },
  ],
  "who-is-servey-for-developers-home-labs": [
    {
      q: "Who is Servey for?",
      a: "Developers, home-lab and Mac Mini owners, people running AI agents or long jobs, and anyone who wants their Mac's full power from an iPhone or iPad.",
    },
    {
      q: "Do I need to be technical to use Servey?",
      a: "No. Setup is signing in with Google on both devices - the screen mirroring and trackpad work like any app.",
    },
    {
      q: "Does Servey work for a home lab or always-on Mac?",
      a: "Yes. It is built to reach an always-on or headless Mac, with a terminal for server-style tasks.",
    },
  ],
  "run-ai-agents-locally-on-your-mac": [
    {
      q: "Can I run AI agents locally on my Mac?",
      a: "Yes - local agents keep your data private, use your real environment, and avoid metered cloud bills. Servey lets you reach them from your phone.",
    },
    {
      q: "Is running agents locally private?",
      a: "It is more private than the cloud because the work stays on your Mac. Servey only pairs your own devices to view it.",
    },
    {
      q: "How do I check a local agent when I leave my desk?",
      a: "Servey mirrors your Mac and its terminal to your iPhone or iPad, so a local job never traps you at your desk.",
    },
  ],
  "stay-in-control-of-ai-agents-from-anywhere": [
    {
      q: "How do I stay in control of an AI agent that uses my computer?",
      a: "Keep a human in the loop: Servey lets you watch the agent, approve actions, and take over the terminal from your phone, anywhere.",
    },
    {
      q: "Can I stop an AI agent remotely if it misbehaves?",
      a: "Yes. With Servey's real terminal and screen control you can pause or kill a run the moment it goes off track.",
    },
    {
      q: "Do I have to sit at my Mac to supervise an agent?",
      a: "No. Servey brings your Mac's screen and shell to your iPhone or iPad so you can supervise from anywhere.",
    },
  ],
};

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/**
 * Related posts for the "Keep reading" section.
 *
 * Ranks by shared keywords so suggestions are genuinely on-topic, then breaks
 * ties by rotating forward through the list. The rotation matters: naively
 * taking the first N posts pointed every article at the same two oldest posts,
 * which left newer posts with a single inlink (from /blog) and starved them of
 * internal PageRank. Rotating spreads inlinks evenly across every post.
 */
export function relatedPosts(slug: string, count = 3): Post[] {
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return [];
  const keys = new Set(posts[idx].keywords.map((k) => k.toLowerCase()));

  return posts
    .map((p, i) => ({
      post: p,
      overlap: p.keywords.filter((k) => keys.has(k.toLowerCase())).length,
      distance: (i - idx + posts.length) % posts.length,
    }))
    .filter((c) => c.post.slug !== slug)
    .sort((a, b) => b.overlap - a.overlap || a.distance - b.distance)
    .slice(0, count)
    .map((c) => c.post);
}
