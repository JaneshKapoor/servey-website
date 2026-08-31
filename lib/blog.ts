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
    metaTitle: "Control your Mac from your iPhone",
    title: "How to control your Mac from your iPhone or iPad",
    description:
      "How to control your Mac from an iPhone or iPad - the free option built into macOS, why it stops working when you leave the house, and what to use instead.",
    date: "2026-07-09",
    keywords: [
      "control Mac from iPhone",
      "control Mac from iPad",
      "remote access Mac from iPhone",
      "access Mac remotely",
      "iPhone Mac remote control",
      "remote desktop for Mac",
      "macOS Screen Sharing",
    ],
    readingMinutes: 7,
    lede:
      "There is a free way to do this that is already on both of your devices, and it works well right up until you leave the house. Here is how to set it up, exactly where it breaks, and what to do about the part it cannot solve.",
    body: [
      {
        type: "p",
        text: "There are plenty of moments when you want your Mac but only have your phone: a build broke while you were on the couch, a render needs babysitting, or a file lives on your desktop and you are on a train. The good news is that macOS has shipped the core of this for years and you do not have to buy anything to try it. The catch is that the built-in route was designed for a local network, and most of the times you actually want your Mac are the times you are not on it.",
      },
      {
        type: "table",
        caption:
          "The three ways to reach a Mac from an iPhone or iPad, and where each one stops.",
        headers: ["", "On your own Wi-Fi", "Away from home", "Terminal", "Cost"],
        rows: [
          [
            "macOS Screen Sharing plus a VNC app",
            "Yes - free and built in",
            "No, not without a VPN or port forwarding",
            "Separate SSH app",
            "Free",
          ],
          [
            "A VPN or mesh VPN back home",
            "Yes",
            "Yes, once it is set up and running everywhere",
            "Separate SSH app",
            "Free to low",
          ],
          [
            "A purpose-built remote app",
            "Yes",
            "Yes, with no network configuration",
            "Depends on the app",
            "Paid",
          ],
          [
            "Servey",
            "Yes - hardware-encoded HEVC",
            "Yes - automatic, encrypted peer-to-peer",
            "Yes - a real shell, built in",
            "From $1.99/month",
          ],
        ],
      },
      { type: "h2", text: "The free way, step by step" },
      {
        type: "p",
        text: "Every Mac has a VNC server built into it, and turning it on takes about thirty seconds. On the Mac, open System Settings, go to General and then Sharing, and switch on Screen Sharing. Click the small info button next to it and note the address it shows you - it will look like a name ending in .local, and that is what you will connect to. While you are there, switch on Remote Login as well if you want SSH, because the two are separate services and turning on one does not turn on the other.",
      },
      {
        type: "p",
        text: "On the iPhone or iPad you need a VNC client, because iOS does not have one built in. There are several on the App Store at a range of prices. Point it at the .local address from the previous step, sign in with your Mac account name and password, and your desktop appears. On the same Wi-Fi this works well and costs nothing beyond the client app.",
      },
      {
        type: "p",
        text: "Two things commonly go wrong here. If the connection is refused, check that both devices really are on the same network - a phone that has silently dropped to mobile data will fail with a confusing error. And if you have a Mac mini or any Mac with no display attached, the desktop may arrive at an odd, cramped resolution, which is a headless-specific problem rather than anything to do with your phone.",
      },
      { type: "h2", text: "Why it stops working when you leave the house" },
      {
        type: "p",
        text: "This is the wall almost everyone hits. Screen Sharing is designed for a local network, and .local addresses only mean anything on the network you are standing in. The moment you are on mobile data or someone else's Wi-Fi, there is no route to your Mac at all. Your home router does not accept unsolicited inbound connections, your home IP address changes when your provider feels like it, and a large number of people are behind carrier-grade NAT, which means there is no inbound path to open even if you wanted one.",
      },
      {
        type: "p",
        text: "The traditional fixes are port forwarding with dynamic DNS, or a VPN back to your home network. Port forwarding is the one to avoid: putting VNC or SSH directly on the public internet gets them found by automated scanners within hours, and it does not work at all behind CGNAT. A VPN is the sound version of this idea, and a mesh VPN such as Tailscale is genuinely good - free for personal use, and it solves the CGNAT problem properly. The honest cost is that it is one more service to install, update and reason about on every device you own, and it gets you a network connection rather than a good experience on a touchscreen.",
      },
      { type: "h2", text: "What actually makes this pleasant on a phone" },
      {
        type: "p",
        text: "Getting a picture is only half of it. Most remote desktop tools were built for cross-platform IT support, where somebody sits at a desk with a mouse and fixes a colleague's Windows machine. Driving a Mac from a five-inch touchscreen is a different problem, and the things that separate a tool you keep using from one you uninstall are fairly specific:",
      },
      {
        type: "ul",
        items: [
          "Sharp, aspect-correct mirroring - text you can actually read, not a blurry cropped rectangle you have to squint at.",
          "Real input: a precise on-screen trackpad with left and right click, plus a full keyboard including Esc, Tab, and the modifier keys.",
          "Low latency, so the cursor tracks your finger instead of lagging behind it.",
          "A connection that works away from home without you configuring anything.",
          "A real terminal, because a lot of what you want your Mac for is one command rather than a whole desktop.",
        ],
      },
      {
        type: "p",
        text: "That last point is the one people underestimate. Restarting a service, tailing a log, checking why a job stalled or kicking off a rebuild are all faster typed than they are done by dragging a mouse pointer around with your thumb. A tool that makes you install a separate SSH app and switch between the two is solving half the problem.",
      },
      { type: "h2", text: "Where Servey fits" },
      {
        type: "p",
        text: "Servey is built for exactly this one job: your Mac, in your pocket, on your own iPhone or iPad. Screen mirroring and a real terminal - a genuine shell on your Mac, not a web console - live in the same native app, one tap apart. On your own Wi-Fi it streams hardware-encoded HEVC, so text stays sharp enough to read and you can pinch to zoom into it. Away from home it switches automatically to a private, end-to-end encrypted peer-to-peer link between your own two devices, and it holds that connection on the strict mobile networks where most tools give up. Setup is signing in with Google on both devices: no VPN, no ports, no dynamic DNS, no relay server to choose.",
      },
      {
        type: "p",
        text: "Where it is honestly not the right answer: Servey is Apple-only, with the Mac as host and the iPhone or iPad as the client, so if you need to reach a Windows box or a Linux server it is the wrong tool and something like RustDesk or Jump Desktop will serve you better. It also cannot be self-hosted, which for some people is the entire point of the mesh VPN approach. And if you only ever need your Mac while sitting in the same house as it, macOS Screen Sharing is free and already installed, and there is no reason to pay for anything.",
      },
      { type: "h2", text: "Which one should you use" },
      {
        type: "ul",
        items: [
          "You only need your Mac from the sofa: macOS Screen Sharing plus any VNC client. Free.",
          "You need it from anywhere and enjoy running infrastructure: a mesh VPN such as Tailscale.",
          "You need to reach Windows or Linux machines too: a cross-platform tool like Jump Desktop or RustDesk.",
          "You want your own Mac from your own iPhone with nothing to configure, and a terminal in the same app: Servey.",
        ],
      },
      { type: "h2", text: "The short version" },
      {
        type: "p",
        text: "Turn on Screen Sharing in System Settings and grab a VNC client, and you can control your Mac from your iPhone on your own Wi-Fi today for free. The part that is genuinely hard is everywhere else, and it is hard because of NAT and changing IP addresses rather than because of anything on your Mac. Either adopt a VPN and maintain it, or use an app that handles the networking for you. Servey is built to be the second of those for Apple devices specifically, with a real terminal alongside the screen. It launches soon; the waitlist is open now.",
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
      "headless Mac Mini remote control",
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
      "Mac Mini home server",
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
      "macOS Screen Sharing",
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
        text: "Servey is what we build, so treat this section with the appropriate scepticism - but here is the case. Every other tool on this list is a screen tool that treats the command line as somebody else's problem. Servey gives you both on your iPhone and iPad: crystal-clear screen mirroring of your Mac and a genuine shell on it, in one app, one tap apart. On your own Wi-Fi it streams a direct hardware-encoded HEVC feed, so your Mac's text stays razor-sharp rather than soft, and pinch-to-zoom lets you read the smallest detail on screen. Away from home it switches by itself to a private peer-to-peer connection, end-to-end encrypted between your own two devices, that hardly touches our servers and keeps working on strict carrier networks. Nothing is configured at any point - no VPN, no port forwarding, no static IP, no companion app to leave running. You sign in with Google on both devices and your Mac is simply there. The limits are real and deliberate: Servey is Apple-only, it reaches a Mac running its host app rather than any machine anywhere, and it is pre-launch, so there is nothing to download today. It arrives soon at ₹99 or $1.99 a month for the terminal, and ₹299 or $4.49 for full access.",
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
  {
    slug: "screens-5-alternatives",
    metaTitle: "Screens 5 alternatives for Mac and iPad",
    title: "Screens 5 alternatives: what to use instead, and when",
    description:
      "Honest Screens 5 alternatives for controlling a Mac from an iPhone or iPad - Jump Desktop, RustDesk, Chrome Remote Desktop, Screen Sharing and more.",
    date: "2026-08-16",
    keywords: [
      "Screens 5 alternative",
      "Screens alternative",
      "Screens 5 vs Jump Desktop",
      "best remote desktop for Mac",
      "best Mac remote desktop app",
      "macOS Screen Sharing",
    ],
    readingMinutes: 7,
    lede:
      "Screens is a genuinely good app, so most people searching for an alternative have a specific reason: a platform it does not cover, a feature it does not have, or a licence change they did not want. Here is what to switch to for each reason - and when the honest answer is to stay put.",
    body: [
      {
        type: "table",
        caption:
          "Screens 5 and the main alternatives, compared by the job each one is actually best at.",
        headers: [
          "Tool",
          "Best for",
          "Platforms",
          "Access from outside your network",
          "Real terminal",
        ],
        rows: [
          [
            "Screens 5",
            "The most polished Apple-only experience",
            "macOS, iOS, iPadOS",
            "Screens Connect companion app",
            "No",
          ],
          [
            "Jump Desktop",
            "Windows and Linux machines too",
            "macOS, iOS, iPadOS, Windows, Android",
            "Jump Desktop Connect, or your own RDP/VNC route",
            "No",
          ],
          [
            "RustDesk",
            "Free, open source, self-hosting",
            "macOS, Windows, Linux, iOS, Android",
            "Project relay by default, or a relay you host",
            "No",
          ],
          [
            "Chrome Remote Desktop",
            "The fastest free setup",
            "Browser, plus iOS and Android apps",
            "Works anywhere through your Google account",
            "No",
          ],
          [
            "macOS Screen Sharing",
            "Free, already on your Mac",
            "macOS host, VNC clients elsewhere",
            "VPN or port forwarding",
            "No - SSH separately",
          ],
          [
            "Splashtop",
            "Streaming-heavy and graphics work",
            "macOS, Windows, Linux, iOS, Android",
            "Works anywhere through your account",
            "No",
          ],
          [
            "Servey (pre-launch)",
            "One Mac, from an iPhone or iPad",
            "macOS host; iPhone and iPad client",
            "Automatic after signing in on both devices",
            "Yes",
          ],
        ],
      },
      { type: "h2", text: "Why do people look for a Screens 5 alternative?" },
      {
        type: "p",
        text: "In practice there are four reasons, and which one applies to you decides the answer. The first is platform: Screens is Apple-only by design, so the moment you need to reach a Windows PC or a Linux box it cannot help. The second is licensing - Screens has changed how it is sold across major versions, and some long-time users went looking after an upgrade rather than because of the app itself. The third is the connection story: reaching your Mac from outside your home network depends on the Screens Connect companion, which is one more moving part to keep running. The fourth is scope: Screens mirrors a screen, and if what you actually wanted was a command line, a screen-only tool means driving a GUI with a trackpad overlay to reach a shell. None of these are bugs. They are the edges of a deliberately narrow product.",
      },
      { type: "h2", text: "What is the closest direct replacement for Screens 5?" },
      {
        type: "p",
        text: "Jump Desktop is the closest like-for-like replacement, and it is the one most people end up on. It covers the same core job - see and drive a remote desktop from a Mac, iPhone or iPad - and then goes further in the direction Screens deliberately does not: it speaks RDP and VNC as well as its own Fluid protocol, and it runs on Windows and Android too. Jump Desktop Connect handles reaching a machine from outside your network without router configuration, which is the same problem Screens Connect solves. The trade-off is character rather than capability: Screens is the more focused, more Apple-feeling app, and people who chose it for that will notice Jump Desktop is built to serve a wider audience. If you want that comparison in detail, we have a separate head-to-head on Screens versus Jump Desktop.",
      },
      {
        type: "ul",
        items: [
          "Pick Jump Desktop if you also need Windows or Linux machines, or want protocol flexibility.",
          "Pick Jump Desktop if you want an established, actively developed app with a long track record on iPad.",
          "Stay with Screens if Apple-native polish was the reason you bought it in the first place.",
        ],
      },
      { type: "h2", text: "Is there a free alternative to Screens 5?" },
      {
        type: "p",
        text: "Yes, three of them, and each is free for a different reason. macOS Screen Sharing is already on your Mac: turn it on in System Settings under Sharing and connect from any VNC client. It costs nothing and is perfectly good on your own Wi-Fi, but reaching it from outside means a VPN or port forwarding, which is exactly the work the paid apps exist to remove. Chrome Remote Desktop is free from Google and is by far the fastest thing to get working from anywhere - install, sign in, done - but it is basic by design, with touch input that was not built around iPad and no terminal. RustDesk is free and open source, cross-platform, and can be fully self-hosted if you would rather not trust anyone else's relay. The cost there is your time rather than your money.",
      },
      { type: "h2", text: "What if you mostly need a command line, not a screen?" },
      {
        type: "p",
        text: "Then a remote desktop app is the wrong shape of tool, and you will be happier with a terminal. A large amount of what people use Screens for is restarting a service, tailing a log, re-running a build, or checking on a headless Mac Mini - all of which are faster typed than clicked. SSH from a phone works if you are willing to enable Remote Login and get a route in from outside, usually a VPN, a forwarded port or a jump host. A dedicated mobile SSH client such as Termius handles the fleet case well. What none of the screen-first apps in the table above give you is a genuine shell alongside the picture, so today you are generally choosing one or the other rather than getting both in one app.",
      },
      { type: "h2", text: "When Screens 5 is still the right answer" },
      {
        type: "p",
        text: "Stay with Screens if your setup is entirely Apple and the app already works for you. It is a mature, well-designed product from Edovia, it feels like a Mac and iOS app should, and switching costs you a paid licence and a working configuration in exchange for problems you may not have. Specifically, Screens is still the better choice when:",
      },
      {
        type: "ul",
        items: [
          "Every machine you need to reach is a Mac, and every device you reach it from is an Apple one.",
          "Native design and a quiet interface matter more to you than protocol breadth.",
          "Screens Connect already works on your network and you have no reason to touch it.",
          "You need something proven today, from a vendor with years of shipping behind it.",
        ],
      },
      { type: "h2", text: "Where Servey fits, and why it is the only Yes in that last column" },
      {
        type: "p",
        text: "Servey is what we are building, so weigh this section accordingly - but look again at the last column of that table. Every other tool on this list answers No. Servey is aimed squarely at one job: your Mac, on your iPhone and iPad, with a genuine shell sitting beside the mirrored screen rather than behind it. Setup is signing in with Google on both devices - no VPN, no port forwarding, no companion service to keep running - and it chooses its own path. On the same Wi-Fi it streams a direct hardware-encoded HEVC feed, which is why the text stays razor-sharp enough to read and pinch-zoom into instead of going soft. Away from home it switches by itself to a private, end-to-end encrypted peer-to-peer connection between your own two devices, and that connection holds on strict carrier networks where a lot of tools simply give up. Servey is Apple-only and it reaches your own Mac rather than any machine anywhere, which is a trade we made deliberately. It launches soon, from $1.99 a month, or ₹99 in India.",
      },
      {
        type: "p",
        text: "The honest caveats matter more than the pitch. Servey is Apple-only, so it is not the answer if Windows was your reason for leaving Screens. It reaches only a Mac running its own host app, not arbitrary VNC or RDP targets. And it is pre-launch and waitlist-only: there is nothing to download today, no users, and no independent reviews to check. If you need a working alternative this afternoon, buy one of the established apps above. If the zero-setup plus real-terminal combination is the gap you keep hitting, it is one to watch.",
      },
      { type: "h2", text: "How to choose in one minute" },
      {
        type: "ul",
        items: [
          "Need Windows or Linux as well as Macs? Jump Desktop.",
          "Want free, and never leave your own Wi-Fi? macOS Screen Sharing.",
          "Want free and working from anywhere with zero effort? Chrome Remote Desktop.",
          "Want free, open source, and happy to run your own server? RustDesk.",
          "Want your iPad as a second monitor rather than a remote control? Sidecar, Duet or Astropad - a different category entirely.",
          "Mostly typing commands? A terminal or SSH client, not a remote desktop.",
          "Want zero configuration plus a genuine terminal on one Mac? Servey, once it launches.",
        ],
      },
      { type: "h2", text: "A note on pricing" },
      {
        type: "p",
        text: "Pricing in this category moves, and licence models have changed more than once, so check each vendor's own page before you buy rather than trusting any comparison article - including this one. What is stable enough to plan around is the shape of each model: the built-in and open-source options cost nothing up front, the Apple-focused apps are commercial products, and the business-oriented tools bill per seat. Match the model to how you actually use the thing, not to the headline number.",
      },
      { type: "h2", text: "Bottom line" },
      {
        type: "p",
        text: "If you are leaving Screens 5 because you need more platforms, Jump Desktop is the answer. If you are leaving over cost, Screen Sharing, Chrome Remote Desktop and RustDesk all do the core job for free with different trade-offs. If you are leaving because you wanted a terminal, no screen-first app on this list will fix that - and that is the gap Servey is being built into. If none of those describe you, staying with Screens is a perfectly good decision.",
      },
    ],
  },
  {
    slug: "jump-desktop-vs-teamviewer",
    metaTitle: "Jump Desktop vs TeamViewer: which to pick",
    title: "Jump Desktop vs TeamViewer: which remote desktop should you use?",
    description:
      "An honest head-to-head of Jump Desktop and TeamViewer for Mac - what each one is really built for, where each genuinely wins, and how to choose.",
    date: "2026-08-16",
    keywords: [
      "Jump Desktop vs TeamViewer",
      "TeamViewer alternative Mac",
      "Jump Desktop alternative Mac",
      "best remote desktop for Mac",
      "control Mac remotely",
    ],
    readingMinutes: 7,
    lede:
      "Jump Desktop and TeamViewer both put a distant computer on your screen, which makes them look like competitors. They were built for different jobs - reaching your own machines versus supporting other people's - and that difference decides the answer more than any feature list does.",
    body: [
      {
        type: "table",
        caption: "Jump Desktop, TeamViewer and Servey at a glance.",
        headers: ["", "Jump Desktop", "TeamViewer", "Servey"],
        rows: [
          [
            "Built for",
            "Reaching machines you own",
            "IT support and managed fleets",
            "Reaching your own Mac from your iPhone or iPad",
          ],
          [
            "Client platforms",
            "macOS, iOS, iPadOS, Windows, Android",
            "Windows, macOS, Linux, iOS, Android, ChromeOS and more",
            "iPhone and iPad, with a Mac as the host",
          ],
          [
            "Protocols",
            "RDP and VNC, plus its own Fluid protocol",
            "Its own proprietary protocol",
            "Hardware HEVC on your network, encrypted peer-to-peer away from it",
          ],
          [
            "Connect with nothing installed on the host",
            "Yes, over RDP or VNC",
            "No, TeamViewer must be on both ends",
            "No, your Mac runs the Servey host app",
          ],
          [
            "Helping someone else, live",
            "Not what it is for",
            "Yes - session codes, chat, remote reboot",
            "Not what it is for",
          ],
          [
            "Unattended access",
            "Yes",
            "Yes, with a device management console",
            "Yes - your Mac is simply there when you open the app",
          ],
          [
            "File transfer",
            "Yes",
            "Yes",
            "Not yet",
          ],
          [
            "Pricing model",
            "Paid app, bought per platform; separate team plans",
            "Free for genuine personal use; per-seat subscription for business",
            "From $1.99/month, or ₹99 in India",
          ],
          [
            "Touch input on iPad",
            "A long-standing strength",
            "Workable, but not the design centre",
            "Purpose-built virtual trackpad, pinch-to-zoom",
          ],
          [
            "Most-cited weakness",
            "No Linux client of its own",
            "Commercial-use detection can flag personal users",
            "Apple-only, and still pre-launch",
          ],
          [
            "Real terminal",
            "No",
            "No",
            "Yes - a genuine shell, built in",
          ],
        ],
      },
      { type: "h2", text: "The short answer" },
      {
        type: "p",
        text: "Choose Jump Desktop if you are reaching your own computers, especially from an iPad or iPhone, and you want the best input feel for the money. Choose TeamViewer if you need to support machines other people are sitting at, cover platforms beyond Apple and Windows, or manage many devices from one console with logging and access control. The two overlap on the narrow case of unattended access to your own desktop, and that is the only case where the choice is genuinely close. For everything else, one of them is clearly the wrong shape and the decision is easy once you name your actual job.",
      },
      { type: "h2", text: "What is Jump Desktop actually for?" },
      {
        type: "p",
        text: "Jump Desktop is a personal remote-control app for machines you own. It speaks RDP and VNC, which means it can connect to a Mac with Screen Sharing enabled or a Windows PC with Remote Desktop turned on without installing anything extra on the host, and it adds its own Fluid protocol for a faster, more responsive session when you do install its companion. Jump Desktop Connect handles the away-from-home case so you are not forwarding ports. Its reputation on iPad is the thing people mention most: the trackpad, keyboard and gesture handling were clearly designed by someone who uses them daily, rather than bolted onto a desktop app. It is a paid product with no free tier, and that is the trade you are making - you pay once instead of maintaining a licence relationship.",
      },
      { type: "h2", text: "What is TeamViewer actually for?" },
      {
        type: "p",
        text: "TeamViewer is a remote-support and device-management platform that happens to include remote desktop. Its defining feature is the attended session: someone reads you a code over the phone, you connect, and you fix their machine - no account, no network knowledge, no firewall rules on their end. Around that it has built unattended access, a management console, group and permission structures, session logging, file transfer, remote printing and support for platforms well beyond the consumer ones, including Linux, ChromeOS and embedded devices. It is free for genuine personal use and sold per seat for business use. Understanding it as support software rather than as a nicer VNC explains almost everything about how it behaves, including the parts individual users find heavy.",
      },
      { type: "h2", text: "Where TeamViewer is genuinely better than Jump Desktop" },
      {
        type: "p",
        text: "TeamViewer wins clearly on reach and on helping other people, and it is not close. If any of the following describe you, Jump Desktop is the wrong tool and you should stop comparing:",
      },
      {
        type: "ul",
        items: [
          "You need to help a relative or a colleague fix their machine live, with them sitting in front of it. Jump Desktop has no equivalent of the code-based attended session.",
          "You need Linux, ChromeOS or less common platforms as first-class clients, not just as things you connect to.",
          "You manage more than a handful of devices and want a console, groups, permissions, and session logs.",
          "You need it to work through a corporate firewall you do not control, which TeamViewer is unusually good at.",
          "You want a capable free option for personal use, which Jump Desktop does not offer at all.",
          "You need supporting features like remote printing, wake-on-LAN, or session recording for compliance.",
        ],
      },
      { type: "h2", text: "Where Jump Desktop is genuinely better than TeamViewer" },
      {
        type: "p",
        text: "Jump Desktop wins on the individual-user experience and on cost predictability. Its touch input on iPad is better tuned than TeamViewer's, which matters enormously if the iPad is your main client rather than an occasional one. It can connect to standard RDP and VNC hosts with no agent installed, so it fits into setups you did not build for it. Its pricing is a paid app rather than an ongoing per-seat relationship, which suits a person with three machines far better than a subscription designed for a support desk. And it avoids TeamViewer's most-complained-about behaviour: automated commercial-use detection, which sometimes flags heavy personal users and interrupts sessions until they resolve it. If you are one person reaching your own computers, that difference alone often decides it.",
      },
      { type: "h2", text: "Which is better for controlling a Mac from an iPad?" },
      {
        type: "p",
        text: "Jump Desktop, for most people, and the reason is input rather than picture quality. Driving a desktop operating system through a touchscreen is a hard interaction problem - you need a precise pointer, a right click that does not require a menu dive, modifier keys, and text selection that behaves. Jump Desktop has spent years on that specific problem and it shows. TeamViewer will do the job, and if you already run it for support work there is no reason to add a second app, but its touch layer reads as a port of a desktop interface rather than something designed for a tablet. If your workflow is genuinely iPad-first, that gap is felt within about five minutes of real use.",
      },
      { type: "h2", text: "What about pricing?" },
      {
        type: "p",
        text: "Compare the models rather than the numbers, because the numbers change and both vendors restructure their plans periodically. Jump Desktop is a paid app you buy for the platforms you use, with separate plans aimed at teams. TeamViewer is free for genuine personal use and sold as a per-seat subscription for business, with tiers based on concurrent users and managed devices. That means a single person with a few of their own machines usually pays less overall with Jump Desktop, while an organisation supporting many endpoints gets far more for its money from TeamViewer. Check both vendors' current pricing pages before you commit - and if you will use a tool for anything that could count as work, read TeamViewer's commercial-use terms first rather than after.",
      },
      { type: "h2", text: "What Servey does that neither of these does" },
      {
        type: "p",
        text: "There is one row in that table where both of these tools say no, and it is the row we built Servey around. Servey puts your Mac on your iPhone and iPad with crystal-clear screen mirroring and a genuine shell on the Mac - not a bolted-on web console - and you move between the two with a single tap. On your own network it streams hardware-encoded HEVC, so your Mac's text stays razor-sharp instead of turning into the soft grey smear software encoders produce, and you can pinch to zoom right into the detail. Step outside and it switches by itself to a private peer-to-peer connection, end-to-end encrypted between your own two devices, that hardly touches our servers - and it keeps working on strict carrier networks where plenty of tools give up. There is no VPN, no port forwarding and no IP address to remember: you sign in with Google on both devices and your Mac is simply there. That focus costs us breadth, and we took the trade on purpose - Servey is Apple-only and it reaches your Mac, not a fleet of other people's machines. It launches soon from $1.99 a month, and the waitlist is open now.",
      },
      { type: "h2", text: "Bottom line" },
      {
        type: "p",
        text: "Jump Desktop is the better personal remote-control app, particularly from an iPad, and the better value for one person with their own machines. TeamViewer is the better support and fleet-management platform, covers far more platforms, and is the only one of the two that solves the problem of helping someone else with their computer. Neither is a compromise choice - they are different products that share a screenshot. Name the job first and the answer follows. And if the job is your own Mac, reached from your own iPhone or iPad, with a real terminal sitting in the same app as the screen - that is the one Servey is built for, and it launches soon.",
      },
    ],
  },
  {
    slug: "jump-desktop-vs-rustdesk",
    metaTitle: "Jump Desktop vs RustDesk: an honest look",
    title: "Jump Desktop vs RustDesk: paid polish or free and open source?",
    description:
      "Jump Desktop vs RustDesk for Mac remote access - a paid, polished app against a free open-source one you can self-host. Where each genuinely wins.",
    date: "2026-08-16",
    keywords: [
      "Jump Desktop vs RustDesk",
      "RustDesk alternative Mac",
      "free remote desktop for Mac",
      "best remote desktop for Mac",
      "Jump Desktop alternative Mac",
    ],
    readingMinutes: 6,
    lede:
      "This comparison is really a question about what you would rather spend: money or time. Jump Desktop is a paid app that works out of the box. RustDesk is free, open source, and can be run entirely on infrastructure you control - if you are willing to run it.",
    body: [
      {
        type: "table",
        caption: "Jump Desktop, RustDesk and Servey, side by side.",
        headers: ["", "Jump Desktop", "RustDesk", "Servey"],
        rows: [
          [
            "Licence",
            "Commercial, closed source",
            "Open source (AGPL)",
            "Commercial, closed source",
          ],
          [
            "Cost model",
            "Paid app, bought per platform",
            "Free; a paid self-hosted server edition exists",
            "Subscription from $1.99/month, or ₹99 in India",
          ],
          [
            "Platforms",
            "macOS, iOS, iPadOS, Windows, Android",
            "macOS, Windows, Linux, iOS, Android, web",
            "Mac as the host; iPhone and iPad as clients",
          ],
          [
            "Protocols",
            "RDP and VNC, plus its own Fluid protocol",
            "Its own protocol only",
            "Hardware HEVC on your network, encrypted peer-to-peer away from it",
          ],
          [
            "Connect to a host with nothing extra installed",
            "Yes, over RDP or VNC",
            "No, RustDesk needed on both ends",
            "No, your Mac runs the Servey host app",
          ],
          [
            "Away-from-home access",
            "Jump Desktop Connect",
            "Project-run relay by default, or your own",
            "Automatic - no relay to pick, no setup at all",
          ],
          [
            "Self-hosting",
            "No",
            "Yes - run your own ID and relay servers",
            "No",
          ],
          [
            "Linux",
            "Connect to it over VNC",
            "First-class client and host",
            "No, Apple only",
          ],
          [
            "Touch input on iPad",
            "A long-standing strength",
            "Functional, less refined",
            "Purpose-built virtual trackpad, pinch-to-zoom",
          ],
          [
            "Support",
            "Commercial vendor",
            "Community, with paid options",
            "Direct from the team building it",
          ],
          [
            "Real terminal",
            "No",
            "No",
            "Yes - a genuine shell, built in",
          ],
        ],
      },
      { type: "h2", text: "The short answer" },
      {
        type: "p",
        text: "Choose Jump Desktop if you want remote access to work well immediately and the input experience on an iPad matters to you. Choose RustDesk if you want to pay nothing, keep the source auditable, or run the whole thing on servers you control so no third party sits between your devices. The honest framing is that these are not competing on quality so much as on posture: one is a product you buy and stop thinking about, the other is infrastructure you adopt. People who are happy with RustDesk are usually people who enjoy running their own services. People who are happy with Jump Desktop usually wanted the problem to go away.",
      },
      { type: "h2", text: "What RustDesk is genuinely better at" },
      {
        type: "p",
        text: "RustDesk wins outright on cost, transparency and control, and those are real advantages rather than consolation prizes. It is free, so there is no licence to buy for each platform and no per-device maths as your machine count grows. It is open source under the AGPL, so the code can be inspected by anyone - a meaningfully stronger position than trusting a vendor's description of its own encryption. Most importantly it can be fully self-hosted: run your own ID and relay servers and no third-party infrastructure is involved in your sessions at all, which is something none of the commercial options in this category can offer. It also treats Linux as a first-class platform on both ends, where Jump Desktop can only connect to Linux over VNC.",
      },
      { type: "h2", text: "What Jump Desktop is genuinely better at" },
      {
        type: "p",
        text: "Jump Desktop wins on polish, on protocol flexibility, and on the specific experience of driving a desktop from a touchscreen. Its iPad input handling - pointer precision, right click, modifier keys, text selection - has had years of attention and is noticeably ahead of RustDesk's mobile clients, which are functional but clearly secondary to the desktop experience. It also speaks RDP and VNC, so it can connect to a Mac with Screen Sharing on or a Windows box with Remote Desktop enabled without installing anything on the host at all, while RustDesk requires its own software on both ends. And there is a vendor to hold responsible when something breaks, versus a community issue tracker.",
      },
      { type: "h2", text: "Is RustDesk safe to use?" },
      {
        type: "p",
        text: "The code is open and auditable, which is a genuine security advantage, but the default configuration deserves a clear-eyed look. Out of the box, RustDesk routes connection setup through relay servers run by the project rather than by you. Sessions are encrypted, but you are still trusting infrastructure operated by a third party, and if that is not acceptable then self-hosting is the answer - it is supported, documented, and the main reason people choose RustDesk in the first place. Worth stating separately: remote-access tools of every brand are a favourite of phone scammers, so never install any of them because someone who called you asked you to. That warning applies equally to RustDesk, TeamViewer and everything else in the category, and it is about the caller, not the software.",
      },
      { type: "h2", text: "Which should you pick for a Mac?" },
      {
        type: "p",
        text: "If your client is an iPhone or iPad, Jump Desktop is the more comfortable choice, and the gap is in input rather than picture. If your client is another desktop and you value self-hosting, RustDesk is excellent and costs nothing. A reasonable middle path that a lot of people land on: use macOS Screen Sharing on your own Wi-Fi where it is already free and installed, and add one of these two for the away-from-home case. Both handle that case without router configuration - Jump Desktop through Jump Desktop Connect, RustDesk through a relay you either borrow or host - which is the part people most often give up on when they try to solve it themselves.",
      },
      {
        type: "ul",
        items: [
          "iPad-first, want it to just work: Jump Desktop.",
          "Cost is the deciding factor: RustDesk.",
          "You want nobody else's servers involved at all: RustDesk, self-hosted.",
          "You need Linux on both ends: RustDesk.",
          "You need to reach plain RDP or VNC hosts with no agent: Jump Desktop.",
        ],
      },
      { type: "h2", text: "Where Servey wins for one specific job" },
      {
        type: "p",
        text: "Both of these are built to reach anything from anything. Servey is built to do one thing extremely well: put your Mac in your pocket. You get crystal-clear screen mirroring and a real terminal - a genuine shell on your Mac, not a web console - in a single app, one tap apart. On your own Wi-Fi it streams hardware-encoded HEVC for razor-sharp text you can pinch to zoom into; away from home it moves automatically to a private, end-to-end encrypted peer-to-peer link between your own two devices, and it holds that connection on mobile networks that defeat most tools. Setup is signing in with Google on both devices: no relay server to choose, no ports to forward, no infrastructure to maintain. If running your own infrastructure is the point, that is exactly what RustDesk is for and it does it well. Servey is Apple-only and cannot be self-hosted, both deliberately, because the whole design goal was that you never think about the network at all. It launches soon from $1.99 a month; the waitlist is open now.",
      },
      { type: "h2", text: "Bottom line" },
      {
        type: "p",
        text: "RustDesk is the better answer if you want control, transparency and a bill of zero, and you are comfortable running a server to get the most from it. Jump Desktop is the better answer if you want a finished product, the best touch input in the category, and the ability to connect to machines that were never set up for it. Both are legitimate choices, and the deciding question is not which is better software but whether you would rather spend money or time. If your honest answer is that you would rather spend neither, Servey is the third path: nothing to host, nothing to configure, a genuine shell and a razor-sharp screen on your own Mac from your own iPhone or iPad. It launches soon.",
      },
    ],
  },
  {
    slug: "splashtop-vs-jump-desktop",
    metaTitle: "Splashtop vs Jump Desktop for Mac",
    title: "Splashtop vs Jump Desktop: subscription or buy it once?",
    description:
      "Splashtop vs Jump Desktop for Mac remote access. One is a subscription tuned for performance and teams, the other a one-time purchase with the best iPad input.",
    date: "2026-08-19",
    keywords: [
      "Splashtop vs Jump Desktop",
      "Splashtop alternative Mac",
      "Jump Desktop alternative Mac",
      "best remote desktop for Mac",
      "remote desktop Mac subscription",
    ],
    readingMinutes: 7,
    lede:
      "These two are both good, and they are aimed at different people. Splashtop is a subscription built around streaming performance and managing a fleet. Jump Desktop is a one-time purchase built around one person reaching their own machines, with the best touch input in the category. The pricing model is not a detail here - it is the decision.",
    body: [
      {
        type: "table",
        caption: "Splashtop, Jump Desktop and Servey, side by side.",
        headers: ["", "Splashtop", "Jump Desktop", "Servey"],
        rows: [
          [
            "Cost model",
            "Subscription, per user or per computer",
            "One-time purchase per platform",
            "Subscription from $1.99/month, or ₹99 in India",
          ],
          [
            "Business tier",
            "The main product",
            "Jump Desktop for Teams, sold separately",
            "No - built for your own devices, not a fleet",
          ],
          [
            "Host platforms",
            "macOS, Windows, Linux",
            "macOS, Windows, plus any RDP or VNC host",
            "macOS",
          ],
          [
            "Client platforms",
            "macOS, Windows, Linux, iOS, Android, browser",
            "macOS, iOS, iPadOS, Windows, Android",
            "iOS and iPadOS",
          ],
          [
            "Protocols",
            "Its own protocol only",
            "RDP and VNC, plus its own Fluid protocol",
            "Hardware HEVC on your network, encrypted peer-to-peer away from it",
          ],
          [
            "Connect to a host with nothing extra installed",
            "No",
            "Yes, over RDP or VNC",
            "No, your Mac runs the Servey host app",
          ],
          [
            "Away-from-home access",
            "Built in",
            "Jump Desktop Connect",
            "Automatic - it switches paths on its own",
          ],
          [
            "Remote sound",
            "A long-standing strength",
            "Supported",
            "Not yet",
          ],
          [
            "Multi-monitor",
            "Strong, including per-monitor selection",
            "Supported, and can split monitors across iPad displays",
            "Not yet",
          ],
          [
            "Session recording, roles, audit",
            "Yes, on business tiers",
            "Limited to Teams",
            "No - nothing about your session is recorded",
          ],
          [
            "Touch input on iPad",
            "Functional",
            "A long-standing strength",
            "Purpose-built virtual trackpad, pinch-to-zoom",
          ],
          [
            "Real terminal",
            "No",
            "No",
            "Yes - a genuine shell, built in",
          ],
        ],
      },
      { type: "h2", text: "The short answer" },
      {
        type: "p",
        text: "Choose Splashtop if you are supporting machines that are not yours, if more than a couple of people need access, or if the work is visually demanding enough that frame rate and colour matter. Choose Jump Desktop if you are one person reaching your own small number of machines, you would rather pay once than monthly, and your client is an iPad. The uncomfortable truth about this comparison is that a lot of people pick on features and then regret it on billing, or pick on price and then find the tool was not built for the job they actually have. Work out which of those two people you are first, because it settles the question faster than any feature table.",
      },
      { type: "h2", text: "What Splashtop is genuinely better at" },
      {
        type: "p",
        text: "Splashtop is built for sustained, demanding streaming and it shows. Its high frame-rate modes hold up on work where a laggy or washed-out picture is not merely annoying but disqualifying - video editing, colour work, CAD, anything where you are judging what is on screen rather than just clicking through it. Remote audio has been a priority for years rather than an afterthought. Multi-monitor handling is more mature, including picking a single monitor out of several. It also treats Linux as a real host platform, and it can be reached from a plain browser, which matters when you are on a machine you cannot install software on. And once you are past one user it has the management layer that individuals never think about until they need it: session recording, role-based permissions, audit trails, deployment at scale. Jump Desktop only reaches for that with its separate Teams product.",
      },
      { type: "h2", text: "What Jump Desktop is genuinely better at" },
      {
        type: "p",
        text: "Jump Desktop wins on economics for individuals and on the specific experience of driving a Mac from an iPad. Buying it once per platform, with no recurring bill, is unusual in a category that has moved almost entirely to subscriptions, and over a few years the difference is not small. Its iPad input handling - pointer precision, right click, modifier keys, text selection, Apple Pencil, splitting monitors across external displays with Stage Manager - has had years of attention and is the reason people stay with it. It also speaks RDP and VNC, so it can reach a Mac with Screen Sharing already enabled, or a Windows machine with Remote Desktop turned on, without installing anything on the host at all. Splashtop always needs its own software on both ends.",
      },
      { type: "h2", text: "Pricing, compared fairly" },
      {
        type: "p",
        text: "Splashtop sells subscriptions, with an inexpensive personal-scale tier covering a small number of computers and business tiers priced per user that climb as you add features like session recording and unattended support. Jump Desktop is bought once on each platform you use, so a Mac and an iPad is two purchases and then nothing, with Jump Desktop Connect available as a small monthly charge per computer if you want the simplified away-from-home path, and Teams as a separate subscription if you outgrow single-user use. Both companies change prices, so treat any specific figure you read anywhere - including here - as a starting point to verify rather than a quote. The stable part is the shape: recurring versus up front, and which of those two you would rather explain to yourself in three years.",
      },
      { type: "h2", text: "Which should you pick for a Mac?" },
      {
        type: "p",
        text: "For a single person reaching their own Mac from an iPad, Jump Desktop is the more comfortable tool and the cheaper one over any reasonable time horizon. For anyone whose remote access is really remote support - other people's machines, unattended, with a record of what happened - Splashtop is built for that and Jump Desktop is not, and no amount of saving on licences makes up for missing management features when you need them. A detail worth knowing before you commit either way: on your own Wi-Fi, macOS Screen Sharing is already installed and free, and it is genuinely good. Both of these products earn their money mainly on the away-from-home case, where they save you from port forwarding and VPN configuration.",
      },
      {
        type: "ul",
        items: [
          "One person, own machines, iPad client: Jump Desktop.",
          "Supporting machines that are not yours: Splashtop.",
          "Video, design or colour-critical work: Splashtop.",
          "You would rather not have another subscription: Jump Desktop.",
          "You need to reach a host with nothing installed on it: Jump Desktop, over RDP or VNC.",
          "You need Linux hosts or browser-only clients: Splashtop.",
        ],
      },
      { type: "h2", text: "What Servey offers that neither of these does" },
      {
        type: "p",
        text: "Look at the last row of that table. Neither of these ships a real terminal, and for anyone who works on a Mac that is the gap that bites. Servey closes it: crystal-clear screen mirroring and a genuine shell on your Mac in the same app, a tap apart, so when the fix turns out to be a permission dialog rather than a command, you are already looking at the screen that can dismiss it. On your network Servey uses hardware HEVC, which is why remote text stays sharp enough to read comfortably and pinch-to-zoom is actually worth using. Away from it, Servey switches on its own to a private peer-to-peer connection, end-to-end encrypted between your two devices, that barely touches our servers - your screen is not relayed through a vendor cloud, and nothing about your session is recorded. The entire setup is a Google sign-in on both devices. Servey is Apple-only, with no fleet management and no Linux, because it is built for your own Mac rather than someone else's estate. Launching soon from $1.99 a month, and the waitlist is open.",
      },
      { type: "h2", text: "Bottom line" },
      {
        type: "p",
        text: "Splashtop is the better answer when remote access is a job you do for other people or on demanding visual work, and when the management layer around the session matters as much as the session. Jump Desktop is the better answer when it is your own Mac, your own iPad, and you resent monthly bills for software you use occasionally. Neither is a compromise, and the honest deciding question is not which is better but whether you are running a fleet or running your own life. And if you are running your own life - one Mac, your iPhone, your iPad, and a terminal you keep wishing were there - Servey was built for precisely that, from $1.99 a month.",
      },
    ],
  },
  {
    slug: "anydesk-vs-teamviewer",
    metaTitle: "AnyDesk vs TeamViewer: an honest look",
    title: "AnyDesk vs TeamViewer: which remote desktop should you actually use?",
    description:
      "AnyDesk vs TeamViewer in 2026: a lean, fast, cheaper tool against the broadest feature set in the category. Where each genuinely wins, and the free-tier catch.",
    date: "2026-08-19",
    keywords: [
      "AnyDesk vs TeamViewer",
      "TeamViewer alternative Mac",
      "AnyDesk alternative",
      "best Mac remote desktop app",
      "best remote desktop for Mac",
    ],
    readingMinutes: 7,
    lede:
      "This is the most-searched pairing in remote desktop, and the honest summary is that AnyDesk is lighter, faster on bad connections and cheaper, while TeamViewer does far more and is far more widely deployed. The thing that decides it for most people is not a feature at all - it is how each company treats the free tier.",
    body: [
      {
        type: "table",
        caption: "AnyDesk, TeamViewer and Servey, side by side.",
        headers: ["", "AnyDesk", "TeamViewer", "Servey"],
        rows: [
          [
            "Free for personal use",
            "Yes, with features held back",
            "Yes, but commercial use is actively detected",
            "No, but it starts at $1.99/month",
          ],
          [
            "Paid entry price",
            "Lower",
            "Higher",
            "The lowest of the three",
          ],
          [
            "Footprint",
            "Very small, runs without installing",
            "Larger",
            "Native Swift, small and quiet",
          ],
          [
            "Performance on poor connections",
            "A long-standing strength",
            "Good",
            "Adapts quality automatically, and never crops",
          ],
          [
            "Platform breadth",
            "Broad",
            "Broader, including mobile device control and IoT",
            "Apple only, by design",
          ],
          [
            "Enterprise and compliance features",
            "Present",
            "The most complete in the category",
            "None - it reaches your own Mac, not a fleet",
          ],
          [
            "Integrations and ecosystem",
            "Fewer",
            "Extensive",
            "None",
          ],
          [
            "Unattended access on free tier",
            "No",
            "Limited",
            "Included in every plan",
          ],
          [
            "Mac host support",
            "Yes",
            "Yes",
            "The entire point of the product",
          ],
          [
            "Tuned for iPad touch input",
            "No",
            "No",
            "Yes - purpose-built trackpad and pinch-to-zoom",
          ],
          [
            "Real terminal",
            "No",
            "No",
            "Yes - a genuine shell, built in",
          ],
        ],
      },
      { type: "h2", text: "The short answer" },
      {
        type: "p",
        text: "Choose AnyDesk if you want something lean that connects quickly, performs well when the network is poor, and costs less when you do start paying. Choose TeamViewer if you need breadth - more platforms, mobile device control, integrations, compliance features - or if you are working somewhere that already standardised on it. For strictly personal use both are free, and the practical difference is that TeamViewer's commercial-use detection is aggressive enough that ordinary people using it for genuinely personal reasons sometimes get flagged and have sessions cut short. That single behaviour drives more switching than any feature comparison.",
      },
      { type: "h2", text: "The free tier is the real difference" },
      {
        type: "p",
        text: "Both products are free for personal, non-commercial use, and both mean it. TeamViewer enforces the boundary with automated detection, and when it decides a session looks commercial it cuts the connection after a few minutes and asks you to buy a licence. Appeals are possible but the process is tedious, and being wrongly flagged while helping a relative is a well-worn complaint rather than a rare edge case. AnyDesk takes a quieter approach: the free tier simply omits the things a business would need, such as unattended access and the address book, so there is less to police. If you are a genuine home user, that difference in posture matters more day to day than any of the technical comparisons below.",
      },
      { type: "h2", text: "What AnyDesk is genuinely better at" },
      {
        type: "p",
        text: "AnyDesk is lighter and it feels it. The client is small and can be run without a full installation, which is genuinely useful when you are on a machine you would rather not modify. Its codec was designed around responsiveness, and on constrained or high-latency connections - hotel Wi-Fi, tethered phones, connections to another continent - it tends to stay usable where heavier tools become unpleasant. Paid tiers start meaningfully cheaper than TeamViewer's, and the gap widens as you add seats. The interface is simpler, which cuts both ways but is a real advantage if all you want is to connect to a machine and do something.",
      },
      { type: "h2", text: "What TeamViewer is genuinely better at" },
      {
        type: "p",
        text: "TeamViewer does more, and for many organisations that is decisive rather than merely nice. It reaches a wider range of devices, including remote control of mobile devices and industrial and IoT endpoints that AnyDesk does not target. It has a far larger integration ecosystem, so it slots into existing ticketing and management stacks without custom work. Its compliance, auditing and device-management story is the most developed in the category, which matters if you have to answer to an auditor rather than only to yourself. And ubiquity is itself a feature: if you support non-technical people, there is a reasonable chance they have already heard of it, already have it installed, or can be talked through installing it over the phone.",
      },
      { type: "h2", text: "A warning that applies to both" },
      {
        type: "p",
        text: "Remote access tools of every brand are the favourite instrument of phone scammers, and AnyDesk and TeamViewer are both named constantly in those scams because they are the best known. Never install either one because somebody who called you asked you to, no matter who they claim to be - not your bank, not Microsoft, not your internet provider. This is not a criticism of either product. It is a property of the category: software that lets someone else drive your computer is exactly as dangerous as the person you give it to, and the failure is always in the phone call rather than the code.",
      },
      { type: "h2", text: "Which should you pick for a Mac?" },
      {
        type: "p",
        text: "Neither is Mac-first, and it is worth saying plainly. Both work on macOS, both require you to grant Screen Recording and Accessibility permissions before they can do anything useful, and both are built around a Windows-centric idea of remote support rather than around Apple hardware. Neither is tuned for touch, so driving a Mac from an iPad with either is workable rather than pleasant. If your job is supporting a mixed fleet from a desk, that is fine and one of these two is probably right. If your job is reaching your own Mac from your own iPad, the Mac-focused tools - Screens, Jump Desktop, or macOS Screen Sharing on your own network - are a better fit than either of these, and you should read a comparison aimed at that instead.",
      },
      {
        type: "ul",
        items: [
          "Personal use, want to be left alone: AnyDesk.",
          "Poor or high-latency connections: AnyDesk.",
          "Lowest cost once you start paying: AnyDesk.",
          "Mixed fleet, integrations, compliance: TeamViewer.",
          "Remote control of mobile or IoT devices: TeamViewer.",
          "Supporting non-technical people who may already have it: TeamViewer.",
          "Reaching your own Mac from an iPad: neither, look at Mac-focused tools.",
        ],
      },
      { type: "h2", text: "Where Servey is the better answer for a Mac" },
      {
        type: "p",
        text: "Both of these are cross-platform tools built largely so you can fix someone else's computer, and it shows the moment you try to use one on your own Mac from an iPad. Servey is built for exactly that job instead. It puts your Mac on your iPhone and iPad with sharp screen mirroring and a genuine shell - a real terminal, not a web console - and a purpose-built on-screen trackpad rather than a mouse pointer bolted onto a touchscreen. It is written natively in Swift, so it launches instantly and stays quiet, and on your own network its hardware-HEVC stream keeps your Mac's text properly legible instead of soft. Away from home the connection is private peer-to-peer and end-to-end encrypted between your own two devices, so your screen is not relayed through a vendor's datacentre - and there is no commercial-use detection waiting to lock you out, because there is no free tier to police. Servey does none of the fleet, compliance or IoT work these two are known for, and it is Apple-only. It launches soon from $1.99 a month, well under either of them, and the waitlist is open now.",
      },
      { type: "h2", text: "Bottom line" },
      {
        type: "p",
        text: "AnyDesk is the better answer for individuals and small teams who want speed, a low bill and to be left alone by licensing enforcement. TeamViewer is the better answer for organisations that need breadth, integrations and an auditable trail, and that would rather have one tool covering everything than the fastest one covering most things. Both are mature and both are safe when you are the one initiating the session. The deciding question is whether you are supporting a business or supporting yourself. If the answer is yourself, and the machine is a Mac, neither of these was designed for you. Servey was, it adds the real terminal both of them lack, and it launches soon at a fraction of either price.",
      },
    ],
  },
  {
    slug: "chrome-remote-desktop-vs-jump-desktop",
    metaTitle: "Chrome Remote Desktop vs Jump Desktop",
    title: "Chrome Remote Desktop vs Jump Desktop: is free good enough?",
    description:
      "Chrome Remote Desktop is free and sets up in minutes. Jump Desktop costs money and is better in daily use. Here is where the gap shows on a Mac.",
    date: "2026-08-19",
    keywords: [
      "Chrome Remote Desktop vs Jump Desktop",
      "Chrome Remote Desktop Mac",
      "free remote desktop for Mac",
      "Jump Desktop alternative Mac",
      "control Mac from iPad",
      "macOS Screen Sharing",
    ],
    readingMinutes: 6,
    lede:
      "Chrome Remote Desktop is free, takes about five minutes to set up, and needs no router configuration. That is a genuinely strong offer and a lot of people never need more. This is an honest account of where it runs out, and whether the gap is worth paying to close.",
    body: [
      {
        type: "table",
        caption: "Chrome Remote Desktop, Jump Desktop and Servey, side by side.",
        headers: ["", "Chrome Remote Desktop", "Jump Desktop", "Servey"],
        rows: [
          [
            "Cost",
            "Free",
            "One-time purchase per platform",
            "From $1.99/month, or ₹99 in India",
          ],
          [
            "Account required",
            "A Google account on both ends",
            "None beyond the app",
            "A Google sign-in on both devices",
          ],
          [
            "Setup effort",
            "Very low",
            "Low",
            "Very low - sign in and your Mac appears",
          ],
          [
            "Away-from-home access",
            "Built in, no port forwarding",
            "Jump Desktop Connect",
            "Built in, no port forwarding, holds up on cellular",
          ],
          [
            "Protocols",
            "Its own only",
            "RDP and VNC, plus its own Fluid protocol",
            "Hardware HEVC on your network, encrypted peer-to-peer away from it",
          ],
          [
            "Connect to a host with nothing extra installed",
            "No",
            "Yes, over RDP or VNC",
            "No, your Mac runs the Servey host app",
          ],
          [
            "Client on a machine you cannot install to",
            "Yes, any Chrome browser",
            "No, needs the app",
            "No, it needs the iPhone or iPad app",
          ],
          [
            "Multi-monitor",
            "Workable but awkward",
            "Supported, and refined on iPad",
            "Not yet",
          ],
          [
            "Remote sound on a Mac",
            "Limited",
            "Supported",
            "Not yet",
          ],
          [
            "File transfer",
            "Basic",
            "Built in",
            "Not yet",
          ],
          [
            "Touch input on iPad",
            "Basic",
            "A long-standing strength",
            "Purpose-built virtual trackpad, pinch-to-zoom",
          ],
          [
            "Real terminal",
            "No",
            "No",
            "Yes - a genuine shell, built in",
          ],
        ],
      },
      { type: "h2", text: "The short answer" },
      {
        type: "p",
        text: "Use Chrome Remote Desktop if you need to reach your Mac occasionally, from wherever you happen to be, and you mostly want to grab a file, restart something or check that a job finished. Buy Jump Desktop if you are driving that Mac for real - regularly, for stretches at a time, especially from an iPad. The gap between them is not about whether the connection works. Both connect. The gap is entirely in how it feels after the first ten minutes, and whether that matters depends on how long your sessions actually are.",
      },
      { type: "h2", text: "What Chrome Remote Desktop is genuinely better at" },
      {
        type: "p",
        text: "It is free, permanently, with no tier to outgrow and no licence to track, and that is not a small thing when the alternative is paying per platform. Setup is the easiest in the category: install the host package, sign in with the Google account you already have, and you can reach the machine from anywhere without touching your router. And it has one capability none of the paid apps can match - you can sit down at any computer in the world with Chrome on it, sign in, and be on your Mac in under a minute with nothing installed. If you travel and use machines that are not yours, that is a real advantage rather than a consolation. For occasional access it is genuinely sufficient, and people who tell you it is not are usually describing a heavier use case than yours.",
      },
      { type: "h2", text: "What Jump Desktop is genuinely better at" },
      {
        type: "p",
        text: "Jump Desktop is better at everything that becomes noticeable during a long session. Its Fluid protocol is more responsive and holds up better as conditions get worse. Input on an iPad is the clearest difference: pointer precision, right click, modifier keys, text selection and Apple Pencil support have all had years of attention, where Chrome Remote Desktop's mobile clients are functional but plainly secondary to the browser experience. It handles multiple monitors properly rather than as an afterthought. It speaks RDP and VNC, so it can reach machines that were never set up for it. And it does not tie your access to a Google account on both ends, which some people care about a great deal and others not at all.",
      },
      { type: "h2", text: "The test that settles it" },
      {
        type: "p",
        text: "Ask how long your typical session is. Under about ten minutes and Chrome Remote Desktop's rough edges never really surface - you connect, you do the thing, you leave, and the money you did not spend is the whole story. Over about half an hour and the same rough edges become the entire experience: imprecise pointing, awkward modifier keys, a picture that softens when the connection dips. Almost nobody regrets starting with the free option, because it costs nothing to find out which of those two you are. The mistake is staying on it out of inertia long after your sessions got longer.",
      },
      {
        type: "ul",
        items: [
          "Occasional access, short sessions: Chrome Remote Desktop.",
          "You often use computers that are not yours: Chrome Remote Desktop.",
          "Cost is the deciding factor: Chrome Remote Desktop.",
          "Long sessions from an iPad: Jump Desktop.",
          "You need to reach a host with nothing installed on it: Jump Desktop.",
          "You would rather your remote access not depend on a Google account: Jump Desktop.",
        ],
      },
      { type: "h2", text: "What neither of them does" },
      {
        type: "p",
        text: "Neither gives you a real terminal. That sounds like a narrow complaint until you notice how much of what people actually do remotely is command line work: checking a build, restarting a service, tailing a log, killing a process that has hung. Doing that through a mirrored screen means pointing at a tiny Terminal window with a laggy cursor, which works but is miserable. The usual workaround is a separate SSH client alongside the remote desktop app, which means two tools, two connections and two sets of credentials to keep straight.",
      },
      { type: "h2", text: "Where Servey fits between free and full-featured" },
      {
        type: "p",
        text: "Chrome Remote Desktop wins on price, Jump Desktop wins on polish, and the row they both lose is the last one. Servey gives you a genuine shell on your Mac alongside crystal-clear screen mirroring, in one app, a tap apart - which matters, because a lot of what you actually need to do remotely is a command, and a lot of the rest is a dialog box only the GUI can dismiss. Getting started is as easy as Chrome Remote Desktop: sign in with Google on both devices and your Mac appears. No ports, no VPN, no IP address. The difference is what happens next - on your own network Servey streams hardware-encoded HEVC, so text stays sharp rather than mushy, and away from home it switches automatically to a private, end-to-end encrypted peer-to-peer connection that keeps working over cellular. Servey is Apple-only, there is no browser client, and file transfer and multi-monitor are not there yet. It launches soon from $1.99 a month, or ₹99 in India - the waitlist is open.",
      },
      { type: "h2", text: "Bottom line" },
      {
        type: "p",
        text: "Chrome Remote Desktop is the right starting point for almost everyone, because it is free, it is fast to set up, and it answers the question of whether you need anything better. Jump Desktop is what you buy once that question has been answered - when you know your sessions are long, your client is an iPad, and the friction has stopped being tolerable. Start free, upgrade on evidence rather than on a review, and do not let anyone tell you the paid option is mandatory when your sessions last four minutes. And if what keeps sending you back to your desk is a command rather than a click, neither of these will fix it - that is exactly the gap Servey closes, with a genuine shell beside the mirrored screen. Launching soon.",
      },
    ],
  },
  {
    slug: "does-mac-screen-sharing-work-over-the-internet",
    metaTitle: "Does Mac Screen Sharing work over the internet?",
    title: "Does macOS Screen Sharing work over the internet?",
    description:
      "Not on its own - macOS Screen Sharing stops at your router. Here is why, and the four realistic ways to reach your Mac's screen from outside your network.",
    date: "2026-08-23",
    keywords: [
      "does Mac Screen Sharing work over the internet",
      "macOS Screen Sharing",
      "Screen Sharing outside my network",
      "access Mac remotely",
      "control Mac from iPhone",
      "Back to My Mac replacement",
    ],
    readingMinutes: 6,
    lede:
      "Screen Sharing is already on your Mac, it is free, and it works beautifully - right up to the edge of your home network. Here is exactly where it stops, why Apple removed the feature that used to fix this, and what actually works instead.",
    body: [
      {
        type: "p",
        text: "You turned on Screen Sharing in System Settings, connected to your Mac from another room, and it was perfect. Then you tried the same thing from a cafe, and nothing happened at all. This is the single most common point of confusion about Apple's built-in remote access, and the answer is more useful than a plain yes or no.",
      },
      { type: "h2", text: "The short answer" },
      {
        type: "p",
        text: "No. macOS Screen Sharing does not work over the internet on its own. It is designed for your local network, and outside that network it will not find your Mac at all. It is not broken and you have not misconfigured it - reaching across the internet is simply not something it does by itself. Everything below is about the four ways people bridge that gap, and what each one costs you.",
      },
      {
        type: "p",
        text: "Those four are: forwarding a port on your router, running a VPN back home, a mesh VPN such as Tailscale, or an app that traverses NAT for you - Screens, Jump Desktop, RustDesk or Servey, which is the app we make. Three of the four are worth your time and one of them is not, and the comparison below says plainly which is which.",
      },
      { type: "h2", text: "Why it stops at your router" },
      {
        type: "p",
        text: "Two separate things have to happen for a screen sharing session to start: your device has to find your Mac, and then it has to open a connection to it. Screen Sharing fails at both once you leave the house.",
      },
      {
        type: "p",
        text: "Discovery uses Bonjour, Apple's local network service discovery. It is what makes your Mac appear in the Finder sidebar automatically, and it is deliberately confined to the local network - Bonjour announcements do not cross a router. Once you are on a different network, there is nothing to discover.",
      },
      {
        type: "p",
        text: "The connection itself runs over VNC on port 5900. On your own Wi-Fi that is a direct hop. From outside, your Mac is sitting behind your router's NAT with no public address of its own, so an incoming connection has nowhere to land. If you are on mobile data, your phone is usually behind carrier-grade NAT too, which means neither end has a reachable address. That is the whole problem, and it is a networking problem rather than an Apple one.",
      },
      { type: "h2", text: "Apple used to solve this, then removed it" },
      {
        type: "p",
        text: "If you remember this working years ago, you are not misremembering. Back to My Mac did exactly this job: it used your iCloud account to find and reach your Mac from anywhere, with no router configuration. Apple discontinued it in macOS Mojave in 2018 and pointed users toward third-party alternatives. Nothing built into macOS has replaced it since, which is why this question keeps being asked.",
      },
      {
        type: "p",
        text: "One thing that does still work over the internet is asking to share screens through Messages with another Apple ID. That is built for helping another person with their Mac, and it needs someone at the other end to accept the request - so it is no use for reaching your own machine while you are out.",
      },
      { type: "h2", text: "Does Apple Remote Desktop fix it?" },
      {
        type: "p",
        text: "No, and this catches people out because the name sounds like it should. Apple Remote Desktop is a paid admin tool on the Mac App Store, built for managing a room full of Macs - software distribution, reporting, running commands across many machines at once. It speaks the same underlying protocol and hits the same NAT wall. Buying it does not give you internet access to your Mac; it gives you fleet management on a network you can already reach.",
      },
      {
        type: "p",
        text: "The third name in this family is Remote Management, the separate checkbox in Sharing settings. That is the toggle Apple Remote Desktop uses. It is not a different way of reaching your Mac from outside either.",
      },
      { type: "h2", text: "The four ways to actually reach it from outside" },
      {
        type: "table",
        caption: "Reaching a Mac's screen from outside your network, and what each approach costs.",
        headers: ["Approach", "Setup", "Works behind CGNAT", "The catch"],
        rows: [
          [
            "Forward port 5900 on your router",
            "Router config, plus a static IP or dynamic DNS",
            "No",
            "Exposes a screen sharing port to the open internet. Widely scanned. Not worth doing.",
          ],
          [
            "VPN back to your home network",
            "Run and maintain a VPN server",
            "Usually not",
            "Secure and legitimate, but it is infrastructure you now own and keep running.",
          ],
          [
            "A mesh VPN such as Tailscale",
            "Install on both devices, sign in",
            "Yes",
            "Genuinely good. Still a second product to run alongside the thing you actually wanted.",
          ],
          [
            "A remote access app that traverses NAT itself (Screens, Jump Desktop, RustDesk, Servey)",
            "Install, sign in, done",
            "Yes",
            "You are trusting the app's connection handling and privacy model, so check both.",
          ],
        ],
      },
      {
        type: "ul",
        items: [
          "Only ever on your own Wi-Fi: plain Screen Sharing is fine, and free.",
          "Comfortable running infrastructure: a VPN or Tailscale, then Screen Sharing over it.",
          "You want it to just work from a phone: a purpose-built remote access app, and if you need one working today rather than soon, buy Screens or Jump Desktop.",
          "Never: forwarding port 5900 to the internet.",
        ],
      },
      { type: "h2", text: "How Servey handles this" },
      {
        type: "p",
        text: "Servey was built for precisely the gap Back to My Mac left behind. There is no router configuration at any point - no port forwarding, no VPN to maintain, no dynamic DNS, no static IP. You sign in with Google on your Mac and on your iPhone or iPad, and your Mac is simply there. It works out which path to use on its own: on your own Wi-Fi it streams a direct hardware-encoded HEVC feed, which is sharper than the VNC picture Screen Sharing gives you and stays legible when you pinch to zoom into small text. Away from home it switches by itself to a private peer-to-peer connection, end-to-end encrypted between your own two devices, that hardly touches our servers - and its NAT traversal is built to hold up on strict carrier networks and CGNAT, exactly where port forwarding cannot help you.",
      },
      {
        type: "p",
        text: "The other thing Screen Sharing cannot do is give you a shell. Servey puts a genuine terminal on your Mac one tap away from the mirrored screen, so when the answer is a command you type it, and when the answer is a dialog box only the GUI can dismiss, you are already looking at it. Servey is Apple-only and it reaches your own Mac rather than any machine anywhere, which is a trade we made deliberately.",
      },
      { type: "h2", text: "Bottom line" },
      {
        type: "p",
        text: "macOS Screen Sharing is excellent software with one hard boundary: your local network. Apple has not shipped a built-in way across that boundary since 2018, so every solution is either infrastructure you run yourself or an app that handles it for you. If you are happy maintaining a VPN, Screen Sharing over Tailscale is a perfectly good answer. If you would rather sign in once and have your Mac appear on your phone - with a real terminal beside the screen - that is what Servey is for, and it launches soon from $1.99 a month, or ₹99 in India.",
      },
    ],
  },
  {
    slug: "what-replaced-back-to-my-mac",
    metaTitle: "What replaced Back to My Mac?",
    title: "Back to My Mac is gone: what actually replaced it",
    description:
      "Apple removed Back to My Mac in macOS Mojave and never replaced it. Here is what it really did, and what covers each part of the job today.",
    date: "2026-08-26",
    keywords: [
      "Back to My Mac replacement",
      "Back to My Mac alternative",
      "macOS Screen Sharing",
      "access Mac remotely",
      "remote Mac without VPN",
      "best remote desktop for Mac",
    ],
    readingMinutes: 6,
    lede:
      "For years, Back to My Mac was the answer to reaching your own Mac from anywhere: no ports, no VPN, no IP addresses. Apple removed it in 2018 and shipped nothing to take its place. Here is exactly what you lost and what genuinely fills the gap.",
    body: [
      {
        type: "p",
        text: "If you set up a Mac before 2018, there is a good chance you used Back to My Mac without ever thinking about how it worked. You ticked a box in iCloud preferences, and your Mac at home simply appeared in the Finder sidebar of your Mac at work. Then one year it was not there any more, and the replacement never arrived. This is what it did, why it went, and what actually covers the job now.",
      },
      { type: "h2", text: "The short answer" },
      {
        type: "p",
        text: "Nothing built into macOS replaced Back to My Mac. Apple deprecated it in macOS Mojave in 2018, switched the service off entirely on 1 July 2019, and pointed people at third-party alternatives rather than shipping a successor. Everything that fills the gap today is either infrastructure you run yourself, such as a VPN back to your home network, or an app from someone other than Apple. The built-in tools that remain - Screen Sharing, File Sharing, Apple Remote Desktop - all stop at the edge of your local network, which is precisely the boundary Back to My Mac existed to cross."
      },
      {
        type: "p",
        text: "In practice that leaves four options, and the rest of this page walks through each one: a VPN back to your home network, a mesh VPN such as Tailscale, port forwarding on your router, or a remote access app that handles the networking for you. That last group includes Screens, Jump Desktop, RustDesk, AnyDesk and Servey, which is the app we make and which exists specifically because Apple left this gap open. We have tried to be straight about where each of the others is the better answer.",
      },
      { type: "h2", text: "What Back to My Mac actually did" },
      {
        type: "p",
        text: "It solved three separate problems at once, which is why losing it hurt more than it first appeared. The first was discovery: it used your iCloud account to make your Macs findable from any network, effectively extending Bonjour beyond the local network it is normally confined to. The second was connectivity: it opened an encrypted tunnel between your machines, negotiating its way through home routers automatically rather than asking you to forward ports or hold a static IP. The third was that it carried both Screen Sharing and File Sharing over that tunnel, so a Mac hundreds of miles away behaved almost exactly like a Mac in the next room.",
      },
      {
        type: "p",
        text: "The part people remember most fondly is what it did not ask of you. There was no router configuration, no dynamic DNS account, no VPN to maintain, no address to memorise. You signed in to the same iCloud account on both machines and the rest was handled. That expectation is the real thing Apple removed, and it is why every replacement feels like more work than it should.",
      },
      { type: "h2", text: "Why did Apple remove it?" },
      {
        type: "p",
        text: "Apple never published a detailed reason. The deprecation notice in Mojave simply recommended alternatives for each of the three jobs: iCloud Drive for reaching files, Screen Sharing for reaching a screen, and Apple Remote Desktop for managing machines. That advice was widely criticised at the time, because two of those three only work on your local network and the third is a paid administration tool, so none of them actually does the thing Back to My Mac was valued for.",
      },
      {
        type: "p",
        text: "The reasonable guess is maintenance cost against usage. The feature relied on a fairly involved combination of wide-area Bonjour, IPv6 and IPsec tunnelling, plus router negotiation that had to keep working against a moving target of consumer hardware. It was almost certainly used by a small, technical minority of Mac owners. Apple's own dead documentation is the clearest evidence of how completely it was retired: the support page that announced the shutdown now returns a 404.",
      },
      { type: "h2", text: "What covers each part of the job now" },
      {
        type: "table",
        caption: "The jobs Back to My Mac did, what covers each one today, and which of them Servey covers.",
        headers: ["What it did", "Still built into macOS?", "What covers it now", "Servey"],
        rows: [
          [
            "Find your Mac from any network",
            "No",
            "A VPN back to your home network, a mesh VPN such as Tailscale, or an app that handles NAT traversal for you",
            "Yes - sign in on both devices and your Mac is there",
          ],
          [
            "Show your Mac's screen from anywhere",
            "Local network only",
            "Screen Sharing tunnelled over a VPN, or a third-party remote access app",
            "Yes - hardware-encoded HEVC, sharper than the VNC picture",
          ],
          [
            "Reach your Mac's files from anywhere",
            "No",
            "iCloud Drive for files you chose in advance, or SMB File Sharing over a VPN for the whole disk",
            "No - not as a disk mounted in the Finder",
          ],
          [
            "Require no router configuration",
            "Not applicable",
            "Only tools that bring their own relay or peer-to-peer layer",
            "Yes - none at any point",
          ],
          [
            "Give you a shell on the machine",
            "Never did this",
            "SSH, if you set it up and can reach the host",
            "Yes - a real terminal, one tap from the screen",
          ],
        ],
      },
      { type: "h2", text: "Is Screen Sharing a replacement?" },
      {
        type: "p",
        text: "Only on your own Wi-Fi. macOS Screen Sharing is genuinely good software and it is free on every Mac, but it depends on Bonjour to find your Mac and Bonjour announcements do not cross a router. From a cafe or a mobile connection there is nothing for it to discover, and even if you knew the address, your Mac sits behind your router's NAT with no reachable public address of its own. If you are on mobile data you are usually behind carrier-grade NAT as well, so neither end can be reached directly. This is a networking limitation rather than an Apple one, and it is exactly the limitation Back to My Mac used to paper over.",
      },
      {
        type: "p",
        text: "Screen sharing through Messages does work over the internet, but it is built for helping another person with their Mac and needs someone at the other end to accept the request. That makes it useless for reaching your own machine while you are out, which is the case that matters here.",
      },
      { type: "h2", text: "Does Apple Remote Desktop replace it?" },
      {
        type: "p",
        text: "No, and the name is genuinely misleading. Apple Remote Desktop is a paid administration tool on the Mac App Store, designed for managing a room full of Macs: software distribution, reporting, running commands across many machines at once. It speaks the same underlying protocol as Screen Sharing and runs into the same NAT wall. Buying it does not give you access to your Mac from outside your network; it gives you fleet management on a network you can already reach. It was listed in Apple's own deprecation advice, which is part of why that advice landed so badly.",
      },
      { type: "h2", text: "The four realistic replacements" },
      {
        type: "ul",
        items: [
          "A VPN back to your home network. Runs on many routers or on a spare machine, and once connected everything behaves as though you were at home, Screen Sharing included. It is the closest thing to a true replacement and the most work to set up and keep running.",
          "A mesh VPN such as Tailscale. Far easier than a traditional VPN, handles NAT traversal for you, and puts your devices on a private network wherever they are. This is what most technical Mac owners moved to, and it pairs well with Screen Sharing.",
          "Port forwarding on your router. Technically works, and worth ruling out. It exposes port 5900 to the open internet, where it is scanned constantly, and it fails entirely behind carrier-grade NAT.",
          "A remote access app that handles the network itself. Screens, Jump Desktop, RustDesk, AnyDesk and Servey all bring their own relay or peer-to-peer layer, so there is nothing to configure. This is the option that most resembles the old experience of it simply working, and if you want it working today rather than soon, buy one of the established ones.",
        ],
      },
      { type: "h2", text: "Where Servey fits" },
      {
        type: "p",
        text: "Servey was built for exactly the gap Back to My Mac left. There is no router configuration at any point: no port forwarding, no VPN to maintain, no dynamic DNS, no static IP. You sign in with Google on your Mac and on your iPhone or iPad, and your Mac is simply there - which is the same bargain iCloud used to offer. It chooses its own path: on your own Wi-Fi it streams a direct hardware-encoded HEVC feed, sharper than the VNC picture Screen Sharing gives you and still legible when you pinch to zoom into small text. Away from home it switches by itself to a private peer-to-peer connection, end-to-end encrypted between your own two devices, with NAT traversal built to survive strict carrier networks and CGNAT.",
      },
      {
        type: "p",
        text: "It also adds the thing Back to My Mac never had: a genuine terminal on your Mac, one tap from the mirrored screen, so when the answer is a command you type it rather than driving a keyboard through a video feed. The honest limits are worth stating. Servey is Apple-only, it reaches your own Mac rather than any machine anywhere, and it does not mount your Mac's disk in the Finder the way Back to My Mac's File Sharing did. If whole-disk file access from afar is the part you miss most, a mesh VPN with File Sharing is the closer match.",
      },
      { type: "h2", text: "Bottom line" },
      {
        type: "p",
        text: "Back to My Mac was quietly one of the best things about owning two Macs, and Apple has not replaced it in the seven years since it was switched off. The advice Apple gave on the way out does not survive contact with the actual problem, because Screen Sharing and File Sharing both stop at your router. The two honest answers today are a mesh VPN if you enjoy running your own infrastructure, or an app that handles the network for you if you do not. If what you want back is the specific feeling of your Mac just being there on the device in your hand, with a real shell alongside it, that is what Servey is for. It launches soon from $1.99 a month, or ₹99 in India.",
      },
    ],
  },
  {
    slug: "rustdesk-vs-anydesk",
    metaTitle: "RustDesk vs AnyDesk: which should you use?",
    title: "RustDesk vs AnyDesk: open source or the better codec?",
    description:
      "RustDesk is free, open source and self-hostable. AnyDesk is proprietary and hard to beat on a poor connection. Where each genuinely wins on a Mac.",
    date: "2026-08-26",
    keywords: [
      "RustDesk vs AnyDesk",
      "RustDesk alternative Mac",
      "AnyDesk alternative",
      "free remote desktop for Mac",
      "best remote desktop for Mac",
      "best Mac remote desktop app",
    ],
    readingMinutes: 7,
    lede:
      "RustDesk is usually described as the open-source AnyDesk, and the comparison is fair enough to be useful. But the two are making very different offers, and the one that suits you depends far more on how you feel about running a server than on any feature list.",
    body: [
      {
        type: "p",
        text: "These two get compared constantly, and for good reason: they look alike, they work alike, and RustDesk has openly positioned itself as the open-source answer to tools like AnyDesk. The interesting differences are not in the feature grid. They are in who operates the infrastructure your session runs through, what happens when something breaks, and what each one costs you in time rather than money.",
      },
      { type: "h2", text: "The short answer" },
      {
        type: "p",
        text: "Choose RustDesk if you want to pay nothing, want the code to be auditable, or want to run the whole system on servers you control so that no third party is involved in your sessions at all. Choose AnyDesk if you want something that connects immediately, stays usable on a genuinely bad connection, and comes with a company to hold responsible. For most people the deciding question is not which is better software. It is whether self-hosting sounds like a benefit or a chore. If it sounds like a benefit, RustDesk is one of the best things in this category. If it sounds like a chore, AnyDesk will make you happier.",
      },
      {
        type: "table",
        caption: "RustDesk, AnyDesk and Servey, side by side.",
        headers: ["", "RustDesk", "AnyDesk", "Servey"],
        rows: [
          [
            "Licence",
            "Open source, AGPL-3.0",
            "Proprietary",
            "Proprietary",
          ],
          [
            "Cost",
            "Free, including self-hosting",
            "Free for personal use, paid for commercial",
            "From $1.99/month, no free tier",
          ],
          [
            "Self-hostable",
            "Yes, and it is the main reason to choose it",
            "No",
            "No, deliberately",
          ],
          [
            "Who runs the relay",
            "The project by default, or you",
            "AnyDesk",
            "Nobody, it is peer-to-peer between your devices",
          ],
          [
            "Performance on a poor connection",
            "Good",
            "Excellent, its strongest claim",
            "Good, and tuned for carrier networks and CGNAT",
          ],
          [
            "Platforms",
            "macOS, Windows, Linux, iOS, Android, web",
            "macOS, Windows, Linux, iOS, Android, ChromeOS",
            "macOS host, iPhone and iPad clients only",
          ],
          [
            "Touch input quality on iPad",
            "Functional, clearly secondary",
            "Functional, clearly secondary",
            "The thing it was designed around",
          ],
          [
            "Support when it breaks",
            "Community issue tracker",
            "A vendor with a support contract",
            "A small team, pre-launch",
          ],
          [
            "Real terminal",
            "No",
            "No",
            "Yes",
          ],
        ],
      },
      { type: "h2", text: "Where RustDesk genuinely wins" },
      {
        type: "p",
        text: "Cost, transparency and control, and all three are real advantages rather than consolation prizes. It is free with no per-device arithmetic as your machine count grows, which matters more than it sounds once you have a laptop, a desktop and a Mac mini. It is open source under the AGPL, so the code can be inspected by anyone, which is a meaningfully stronger position than trusting a vendor's description of its own encryption. Most importantly it can be fully self-hosted: run your own ID and relay servers and no third-party infrastructure touches your sessions at all. No proprietary tool in this category can offer that, and for anyone with a home lab it is often the whole argument. It also treats Linux as a first-class platform on both ends.",
      },
      { type: "h2", text: "Where AnyDesk genuinely wins" },
      {
        type: "p",
        text: "Responsiveness on bad networks, and it is not close. AnyDesk's codec was designed around latency rather than image fidelity, and on hotel Wi-Fi, a tethered phone, or a connection across an ocean it tends to stay usable where other tools become unpleasant to drive. This is its central engineering claim and it holds up in practice. The client is also small and can be run without a full installation, which is genuinely useful on a machine you would rather not modify. Beyond performance, it offers the things an unpaid project structurally cannot: a support contract, a company accountable for uptime, an address book and unattended access that work without you standing up any infrastructure, and an installer your less technical colleagues will not be frightened of.",
      },
      { type: "h2", text: "Security: two different bargains" },
      {
        type: "p",
        text: "Neither option is simply safer than the other, and it is worth being precise about what you are actually trading. RustDesk's advantage is that the code is open and the infrastructure can be yours. Its default configuration deserves a clear-eyed look though: out of the box, connection setup is routed through relay servers operated by the project rather than by you. Sessions are encrypted, but you are trusting infrastructure that somebody else runs, and if that is not acceptable then self-hosting is the answer. Open source also does not mean audited. It means auditable, which is only worth something if someone with the right expertise actually looks.",
      },
      {
        type: "p",
        text: "AnyDesk's bargain is the ordinary one you make with any commercial vendor: you cannot inspect the code, so you are trusting the company's engineering and its disclosure practices. On that second point there is a specific event worth knowing about. In early 2024 AnyDesk disclosed a security incident affecting its production systems. It revoked and replaced its code-signing certificates and invalidated passwords for its web portal, advising customers to change them, and stated that it had found no evidence that end-user devices were affected. The disclosure and the certificate rotation were the right responses. It is still a reasonable data point if your reason for reading this comparison is that you would rather not depend on a vendor at all.",
      },
      {
        type: "p",
        text: "One warning applies equally to both and to everything else in this category. Remote access tools are the favourite instrument of phone scammers, and AnyDesk in particular is named constantly in those scams because it is well known and installs quickly. Never install any remote access tool because somebody who called you asked you to, whoever they claim to be. That is a property of the category rather than a criticism of either product, and the failure is always in the phone call rather than the code.",
      },
      { type: "h2", text: "On a Mac specifically" },
      {
        type: "p",
        text: "Neither is Mac-first, and both make you feel it during setup. Each needs Screen Recording and Accessibility permissions granted in System Settings before it can do anything useful, and each is built around a broadly Windows-shaped idea of remote support rather than around Apple hardware. RustDesk's macOS build has historically been the fussier of the two to get permissions working on, though it has improved. Neither is tuned for touch, so driving a Mac from an iPad with either is workable rather than pleasant: you get a mouse pointer bolted onto a touchscreen rather than an input model designed for fingers.",
      },
      {
        type: "p",
        text: "If your actual job is supporting a mixed fleet of machines from a desk, that is fine and one of these two is probably right for you. If your job is reaching your own Mac from your own iPad, the Mac-focused tools are a better fit than either, and it is worth reading a comparison aimed at that instead.",
      },
      { type: "h2", text: "Which should you pick" },
      {
        type: "ul",
        items: [
          "You want nobody else's servers involved at all: RustDesk, self-hosted.",
          "You want a bill of zero and do not mind the public relays: RustDesk as it ships.",
          "Your connection is the problem, not your budget: AnyDesk.",
          "You need unattended access and an address book without running a server: AnyDesk.",
          "You support non-technical people who need to install something quickly: AnyDesk.",
          "You are a Linux household: RustDesk, comfortably.",
          "You mainly want your own Mac on your own iPhone or iPad: neither was designed for that.",
        ],
      },
      { type: "h2", text: "Where Servey fits" },
      {
        type: "p",
        text: "Both of these are general-purpose tools built to reach anything from anything, and it shows the moment you try to drive your own Mac from an iPad. Servey does one thing instead: it puts your Mac in your pocket. You get crystal-clear screen mirroring and a real terminal - a genuine shell on your Mac, not a web console - in a single app, one tap apart, with an on-screen trackpad designed for fingers rather than a pointer borrowed from a desktop. On your own Wi-Fi it streams hardware-encoded HEVC, so text stays sharp when you pinch to zoom. Away from home it moves automatically to a private, end-to-end encrypted peer-to-peer link between your own two devices, holding up on the mobile networks and CGNAT that defeat most tools.",
      },
      {
        type: "p",
        text: "Setup is signing in with Google on both devices: no relay to choose, no ports to forward, no infrastructure to maintain. The trades are deliberate and worth stating plainly. Servey is Apple-only, it cannot be self-hosted, and it reaches your own Mac rather than any machine anywhere. If running your own infrastructure is the entire point for you, that is what RustDesk is for and it does it well. If you need to fix a relative's Windows laptop over a terrible connection, that is AnyDesk. Servey launches soon from $1.99 a month, or ₹99 in India, and the waitlist is open now.",
      },
      { type: "h2", text: "Bottom line" },
      {
        type: "p",
        text: "RustDesk is the better answer if you want control, transparency and a bill of zero, and you are comfortable running a server to get the most out of it. AnyDesk is the better answer if you want a finished product that connects fast, survives a bad network, and comes with somebody to call. Both are legitimate, and the deciding question is not which is better software but whether infrastructure is something you enjoy owning. If your honest answer is that you would rather own none of it, and the machine you actually want to reach is your own Mac, Servey is the third path: nothing to host, nothing to configure, a genuine shell and a razor-sharp screen on your iPhone or iPad. It launches soon.",
      },
    ],
  },
  {
    slug: "control-iphone-from-mac",
    metaTitle: "Control your iPhone from your Mac",
    title: "How to control your iPhone from your Mac, and what Apple actually allows",
    description:
      "Can you control an iPhone from a Mac? Yes, with iPhone Mirroring in macOS Sequoia - but only when the phone is next to you. Here is what works and what does not.",
    date: "2026-08-31",
    keywords: [
      "control iPhone from Mac",
      "remote control iPhone from Mac",
      "iPhone Mirroring",
      "control Mac from iPhone",
      "access Mac remotely",
    ],
    readingMinutes: 6,
    lede:
      "Since macOS Sequoia there is a real, Apple-built answer to this: iPhone Mirroring. It works well, and it has one limitation that catches almost everybody out - your iPhone has to be sitting next to your Mac. If what you actually wanted was to reach a machine that is somewhere else, read on, because the direction that genuinely works remotely is the opposite one.",
    body: [
      {
        type: "table",
        caption:
          "The four ways to see or control an iPhone from a Mac, and what each one is actually for.",
        headers: ["", "What it does", "Works when the iPhone is elsewhere?", "Cost"],
        rows: [
          [
            "iPhone Mirroring",
            "Full interactive control of your iPhone in a window on your Mac",
            "No - the phone must be locked and near your Mac",
            "Free, built into macOS Sequoia",
          ],
          [
            "QuickTime Player",
            "Shows and records the iPhone screen; you cannot control the phone",
            "No - requires a USB cable",
            "Free, built into macOS",
          ],
          [
            "Apple Configurator",
            "Bulk configuration, app installs and restores for managed devices",
            "No - USB, and it is a provisioning tool rather than a screen",
            "Free, but aimed at IT",
          ],
          [
            "Mobile device management",
            "Policy, apps and remote wipe across a fleet of company phones",
            "Yes, for management actions - but it is not remote control",
            "Paid, business only",
          ],
        ],
      },
      { type: "h2", text: "The short answer" },
      {
        type: "p",
        text: "You can control your iPhone from your Mac, and the tool is iPhone Mirroring, which Apple shipped in macOS Sequoia. Your phone appears in a window, you drive it with your mouse and keyboard, and notifications come through to the Mac. It is genuinely good. What it is not is remote access: the feature is built on Continuity, which means it works over Bluetooth and Wi-Fi between two devices in the same room. If your iPhone is at home and you are at the office, nothing on this list will let you reach it, and that is a deliberate design decision by Apple rather than a gap somebody is about to fill.",
      },
      { type: "h2", text: "What iPhone Mirroring needs" },
      {
        type: "p",
        text: "Apple is specific about the requirements, and every one of them has to be true or the feature simply will not appear. Your Mac needs macOS Sequoia 15 or later and either Apple silicon or the Apple T2 Security Chip. Your iPhone needs iOS 18 or later and must have a passcode set. Both devices have to be signed in to the same Apple Account with two-factor authentication turned on, and both need Bluetooth and Wi-Fi enabled. Your Mac must not be sharing its internet connection or using AirPlay or Sidecar at the time. You can pair only one Mac with one iPhone at a time.",
      },
      {
        type: "p",
        text: "The requirement that matters most is the physical one. Your iPhone has to be locked and near your Mac - it can be face down on the desk or charging in StandBy, but it has to be there. The phone also stays locked for the whole session, which is a nice privacy property: nobody walking past can see what you are doing, and nobody can pick the phone up and use it while you are mirroring it.",
      },
      { type: "h2", text: "Why you cannot control an iPhone over the internet" },
      {
        type: "p",
        text: "This surprises people who are used to Windows or Android, where remote control apps for phones have existed for years. On iOS, an app cannot read the screen of the whole system or inject taps into other apps. There is no API for it, and App Store review would not permit it if there were. Screen recording is possible with the user's explicit consent through ReplayKit, but recording is not control, and it stops the moment the app is backgrounded. So the tools that do exist for reaching an iPhone remotely are management tools rather than remote desktops: mobile device management can push apps, apply policy, lock or wipe a company phone from anywhere, but it cannot show an administrator the screen and let them tap around on it.",
      },
      {
        type: "p",
        text: "Anything advertising full remote control of an iPhone from across the internet is worth treating with real suspicion. Either it requires the phone to be supervised and enrolled through a business MDM, or it depends on the phone being jailbroken, or it is simply describing screen recording. This is one of the areas where Apple's restrictions genuinely protect you, and the honest answer is that the feature does not exist for consumer devices.",
      },
      { type: "h2", text: "The other options, briefly" },
      {
        type: "ul",
        items: [
          "QuickTime Player: plug the iPhone into the Mac with a cable, choose File then New Movie Recording, and pick the iPhone as the camera source. You get the live screen and can record it. You cannot tap anything - it is a mirror, not a remote.",
          "Apple Configurator: free from the App Store and built for deploying devices in bulk. Useful for restores, app installs and supervision, useless as a screen.",
          "Switch Control: an Accessibility feature that lets you drive an iPhone or iPad using another Apple device on the same network. It is designed for people with motor impairments and it is slow for general use, but it is a real answer for accessibility needs.",
          "Mobile device management: the only option that reaches a phone that is not in the room, and it is aimed at company fleets rather than your own phone.",
        ],
      },
      { type: "h2", text: "The direction that does work remotely" },
      {
        type: "p",
        text: "It is worth checking which problem you are actually trying to solve, because a lot of people arrive at this question having got the two devices the wrong way round in their head. The reason you almost never need to reach an iPhone remotely is that the iPhone is the device you already have with you. The machine that is stuck somewhere else, with your files, your projects and your long-running jobs on it, is the Mac. And unlike the iPhone direction, that one is entirely possible.",
      },
      {
        type: "p",
        text: "That is the job Servey is built for. It puts your Mac on your iPhone or iPad: crystal-clear screen mirroring and a real terminal - a genuine shell on your Mac, not a web console - one tap apart in a single native app. On your own Wi-Fi it streams hardware-encoded HEVC, so text stays sharp enough to read and you can pinch to zoom into it. Away from home it moves automatically to a private, end-to-end encrypted peer-to-peer link between your own two devices, and it holds that connection on the strict mobile networks that defeat most tools. There is no VPN to configure, no ports to forward and no relay server to choose: you sign in with Google on both devices and your Mac shows up.",
      },
      {
        type: "p",
        text: "To be clear about what Servey does not do, since this page is about the opposite direction: it does not control your iPhone, and no third-party app can. Servey is Mac-as-host and iPhone or iPad-as-client, deliberately, because that is the direction where the remote problem is real and worth solving. It launches soon from $1.99 a month, and the waitlist is open now.",
      },
      { type: "h2", text: "Bottom line" },
      {
        type: "p",
        text: "If your iPhone is on the desk in front of you and you want it in a window next to your other apps, iPhone Mirroring is the answer, it is free, and it is already on your Mac if you are running Sequoia. If your iPhone is somewhere else, there is no consumer answer and there is not going to be one, because iOS does not allow it. And if the device you were really trying to reach is your Mac, that problem is solved - by Apple's own Screen Sharing on your local network, and by a purpose-built app like Servey everywhere else.",
      },
    ],
  },
  {
    slug: "headless-mac-mini-setup",
    metaTitle: "Headless Mac mini setup guide",
    title: "How to set up a headless Mac mini that stays reachable",
    description:
      "A practical guide to running a Mac mini with no monitor: enable the right services first, stop it sleeping, survive a power cut, and fix the resolution problem.",
    date: "2026-08-31",
    keywords: [
      "headless Mac Mini setup",
      "macOS headless mode",
      "Mac Mini no monitor",
      "Mac Mini home server",
      "headless Mac Mini remote control",
      "control Mac Mini from iPad",
    ],
    readingMinutes: 7,
    lede:
      "A Mac mini with no monitor is one of the best small always-on machines you can buy. The trap is that macOS was never designed to run without a person sitting in front of it, and the ways it fails are all discovered after you have already put the machine on a shelf. Here is the order to do things in.",
    body: [
      {
        type: "p",
        text: "Do all of this while the monitor is still plugged in. Every step below is far easier with a screen attached, and two of them are close to impossible without one. The single most common way this goes wrong is unplugging the display first and then discovering that remote login was never switched on.",
      },
      {
        type: "table",
        caption:
          "What actually breaks when you take the monitor away, and what fixes each one.",
        headers: ["What breaks", "Why", "The fix"],
        rows: [
          [
            "You cannot get in at all",
            "Screen Sharing and Remote Login are both off by default",
            "Turn both on before you disconnect anything",
          ],
          [
            "The machine disappears after a while",
            "macOS sleeps on idle, and a sleeping Mac answers nothing",
            "Disable system and disk sleep with pmset",
          ],
          [
            "It never comes back after a power cut",
            "It stays powered off, or stops at the FileVault unlock screen",
            "Enable automatic restart; understand the FileVault trade-off",
          ],
          [
            "The desktop is tiny or a strange shape",
            "With no display attached, macOS falls back to a default resolution",
            "A dummy HDMI plug, or set the resolution in your client",
          ],
          [
            "It works at home but not from outside",
            "Your router blocks inbound connections; your IP address changes",
            "Use a tool that handles NAT traversal rather than forwarding ports",
          ],
        ],
      },
      { type: "h2", text: "Step 1: turn on the two services you will need" },
      {
        type: "p",
        text: "There are two separate doors into a Mac and you want both, because they fail independently and each rescues the other. Screen Sharing gives you the graphical desktop over VNC. Remote Login gives you SSH, which keeps working when the window server is confused, the machine is under heavy load, or you simply want to run one command without waiting for a picture to arrive. Open System Settings, go to General and then Sharing, and switch on both Screen Sharing and Remote Login. You can do the same from the command line, which is worth knowing because it is how you will fix things later:",
      },
      {
        type: "ul",
        items: [
          "sudo systemsetup -setremotelogin on - turns on SSH.",
          "sudo systemsetup -getremotelogin - confirms it took.",
          "scutil --get LocalHostName - shows the .local name you will use to reach the machine on your own network.",
        ],
      },
      {
        type: "p",
        text: "While you are in Sharing, give the machine a name you will actually recognise. A Mac called something like mini-server is much easier to live with than the default, which tends to be your full name with an apostrophe in it that then has to be escaped every time you type it.",
      },
      { type: "h2", text: "Step 2: stop it going to sleep" },
      {
        type: "p",
        text: "This is the step people skip, and it produces the most confusing symptom: the machine works perfectly for an hour and then stops answering, apparently at random. A sleeping Mac does not respond to screen sharing or SSH. The pmset command controls all of this, and the -a flag applies the setting to every power source:",
      },
      {
        type: "ul",
        items: [
          "sudo pmset -a sleep 0 - never put the system to sleep.",
          "sudo pmset -a disksleep 0 - keep the disks spinning, which matters if the machine serves files.",
          "sudo pmset -a displaysleep 0 - there is no display, but leaving this on can still confuse some remote clients.",
          "sudo pmset -a womp 1 - wake the machine when it receives a network packet, as a safety net.",
          "pmset -g - print the current settings so you can check your work.",
        ],
      },
      {
        type: "p",
        text: "One caveat worth knowing: on Apple silicon a Mac mini idles at a few watts, so leaving it awake permanently costs very little in electricity. This is much less of a trade-off than it was on Intel machines, and it is the right default for a server.",
      },
      { type: "h2", text: "Step 3: make it survive a power cut" },
      {
        type: "p",
        text: "A machine on a shelf will eventually lose power, and the question is whether it comes back on its own or waits for you to walk over and press the button. Run sudo pmset -a autorestart 1 so the Mac powers itself back on after a power failure. In System Settings under Energy you will find the equivalent switch if you prefer clicking.",
      },
      {
        type: "p",
        text: "Then there is FileVault, and this is a genuine trade-off rather than a setting with a correct answer. With FileVault on, a Mac that reboots stops at the unlock screen and waits for a password before it finishes booting, which means no network, no SSH and no screen sharing until somebody types it. With FileVault off, the machine boots all the way to the login window or straight into the desktop if you have enabled automatic login, and comes back on its own. For a machine holding real data in a home you share with other people, keeping FileVault on and accepting the manual restart is the defensible choice. For a build box on a shelf with nothing sensitive on the disk, turning it off and enabling automatic login in Users and Groups is reasonable. Decide deliberately, because the failure mode only shows up weeks later during a power cut you are not home for.",
      },
      { type: "h2", text: "Step 4: fix the resolution problem" },
      {
        type: "p",
        text: "With no display connected, macOS has no display to describe, so it falls back to a default that is often small and the wrong shape. You connect from your iPad expecting a desktop and get a cramped little rectangle in the corner. There are two ways out. The cheap and reliable one is a dummy HDMI plug - a two-pound adapter that pretends to be a monitor, so macOS sees a real display and offers real resolutions. The other is to use a remote tool that negotiates the resolution itself rather than inheriting whatever the Mac decided on its own. Apple silicon Macs handle the headless case better than Intel ones did, but the dummy plug is still the answer that always works, and it is worth buying one before you need it.",
      },
      { type: "h2", text: "Step 5: reaching it from outside your network" },
      {
        type: "p",
        text: "Everything so far works on your own Wi-Fi. The moment you leave the house, both Screen Sharing and SSH stop being reachable, because your router does not accept unsolicited inbound connections and your home IP address changes when your provider feels like it. Many people are also behind carrier-grade NAT, which means there is no inbound path to forward even if you want one.",
      },
      {
        type: "p",
        text: "The traditional answers are port forwarding with dynamic DNS, or a VPN back to your home network. Port forwarding is the one to avoid: exposing VNC or SSH directly to the internet puts them in front of automated scanners within hours. A mesh VPN such as Tailscale is a genuinely good answer and worth knowing about - it is free for personal use, it solves the CGNAT problem, and once it is running your Mac mini is reachable by name from anywhere. The cost is that it is another service to install, keep updated and reason about on every device.",
      },
      { type: "h2", text: "Driving it from an iPhone or iPad" },
      {
        type: "p",
        text: "The other approach is a tool that does the network part for you, and if the device in your hand is an iPhone or iPad this is where Servey fits. You install it on the Mac mini and on your phone or tablet, sign in with Google on both, and the mini appears - no VPN to maintain, no ports open, no dynamic DNS. On your own Wi-Fi it streams hardware-encoded HEVC, so the terminal text on a headless build box is sharp enough to read and you can pinch to zoom into it. Away from home it switches automatically to a private, end-to-end encrypted peer-to-peer link between your own two devices, and it holds up on mobile networks that defeat most tools.",
      },
      {
        type: "p",
        text: "The part that matters most for a headless machine is that Servey ships a real terminal next to the screen, one tap away. Most of what you do to a Mac mini on a shelf is command-line work - restart a service, tail a log, check why a job stalled, kick off a rebuild - and for that you do not want to wait for a desktop to render and then drive a mouse pointer with your thumb. Where it is honestly not the right fit: Servey is Apple-only, so if half your machines run Linux you want something else, and it cannot be self-hosted, which is the whole point of the mesh VPN approach for some people. It launches soon from $1.99 a month.",
      },
      { type: "h2", text: "A sanity check before you unplug the monitor" },
      {
        type: "ul",
        items: [
          "Screen Sharing and Remote Login are both on, and you have tested each from another device on the same network.",
          "pmset -g shows sleep and disksleep at 0.",
          "autorestart is enabled, and you have decided what you are doing about FileVault.",
          "The machine has a memorable name, and you know its .local address.",
          "You have a way in from outside the house, and you have tested it from mobile data rather than assuming.",
          "A dummy HDMI plug is either fitted or on order.",
        ],
      },
      { type: "h2", text: "Bottom line" },
      {
        type: "p",
        text: "Setting up a headless Mac mini is less about any single clever trick and more about doing five ordinary things in the right order, while you still have a screen to do them on. Turn on both doors, stop it sleeping, make it come back after a power cut, give it a real resolution, and pick a way in from outside that does not involve opening a port. Do that and the machine will sit on its shelf and simply work, which is the entire reason to own one.",
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
export const contentUpdated = "2026-08-31";

/**
 * Per-post FAQs. Rendered on the page and emitted as FAQPage JSON-LD so answer
 * engines can lift a direct, citable Q&A for each topic. Keep answers self-
 * contained (BLUF): the first sentence should stand on its own as the answer.
 */
export const faqsBySlug: Record<string, { q: string; a: string }[]> = {
  "what-replaced-back-to-my-mac": [
    {
      q: "What replaced Back to My Mac?",
      a: "Nothing built into macOS replaced it. Apple deprecated Back to My Mac in macOS Mojave in 2018 and shut the service off entirely on 1 July 2019, recommending iCloud Drive, Screen Sharing and Apple Remote Desktop instead. Two of those only work on your local network and the third is a paid admin tool, so in practice the replacements are a VPN back to your home network, a mesh VPN such as Tailscale, or a third-party remote access app that handles NAT traversal for you.",
    },
    {
      q: "When exactly did Back to My Mac stop working?",
      a: "Apple deprecated it in macOS Mojave in 2018 and the service stopped working completely on 1 July 2019. Macs running High Sierra and earlier kept it until that shutdown date. Apple's own support page announcing the change has since been taken down and now returns a 404.",
    },
    {
      q: "Can I get Back to My Mac functionality without a VPN?",
      a: "Yes. Any remote access app that brings its own relay or peer-to-peer layer will reach your Mac from outside your network with no router configuration, which is the part Back to My Mac made effortless. Screens, Jump Desktop, RustDesk, AnyDesk and Servey all do this. A mesh VPN such as Tailscale is the other common answer, and it is closer to the original in that it also restores file sharing across the whole disk.",
    },
    {
      q: "Does Back to My Mac still work on older versions of macOS?",
      a: "No. The feature depended on Apple's iCloud infrastructure, and that server side was switched off on 1 July 2019. Running an older version of macOS does not bring it back, because the machine has nothing left to connect to.",
    },
    {
      q: "Is there anything that feels like Back to My Mac did?",
      a: "Servey is the closest thing to that experience for an iPhone or iPad. The part people miss about Back to My Mac is that it asked nothing of you: no ports, no VPN, no addresses, just the same account on both machines. Servey works the same way - sign in with Google on your Mac and your iPhone or iPad and your Mac is simply there, direct on your own Wi-Fi and private end-to-end encrypted peer-to-peer anywhere else - and it adds a real terminal, which Back to My Mac never had. The one thing it does not restore is mounting your Mac's whole disk in the Finder; for that, a mesh VPN with File Sharing is the closer match.",
    },
  ],
  "rustdesk-vs-anydesk": [
    {
      q: "Is RustDesk a good alternative to AnyDesk?",
      a: "Yes, particularly if cost or self-hosting matters to you. RustDesk is free and open source under the AGPL, and you can run your own ID and relay servers so no third party is involved in your sessions. The trade-offs are that AnyDesk performs better on poor connections, its mobile clients are more refined, and there is a company to hold accountable when something breaks.",
    },
    {
      q: "Is RustDesk safe to use?",
      a: "It is as safe as its configuration. The source is open and auditable, which is a genuine advantage, but by default connection setup runs through relay servers operated by the project rather than by you. If that is not acceptable, self-hosting is supported and is the main reason people choose RustDesk. Note that open source means auditable rather than audited, and that the biggest real-world risk with any remote access tool is installing it because a stranger on the phone asked you to.",
    },
    {
      q: "Which is faster, RustDesk or AnyDesk?",
      a: "AnyDesk, on constrained connections. Its codec was designed around latency rather than image fidelity, and on hotel Wi-Fi, tethered connections or long-distance links it typically stays usable where other tools become sluggish. On a fast local network the practical difference between the two is much smaller.",
    },
    {
      q: "Is either one good for controlling a Mac from an iPad?",
      a: "Neither is really built for it. Both work on macOS but need Screen Recording and Accessibility permissions, and both give you a mouse pointer bolted onto a touchscreen rather than an input model designed for fingers. If reaching your own Mac from an iPad or iPhone is the actual goal, that is exactly what Servey is built for: sharp screen mirroring with an on-screen trackpad designed for fingers rather than a borrowed mouse pointer, a real terminal in the same app one tap away, and nothing to configure on your router. Servey is Apple-only and launches soon; if you need something today, or you need to reach a Windows or Linux machine, these two remain the right answer.",
    },
  ],
  "does-mac-screen-sharing-work-over-the-internet": [
    {
      q: "Can I use macOS Screen Sharing outside my home network?",
      a: "Not on its own. Screen Sharing relies on Bonjour to find your Mac, and Bonjour does not cross a router, so from another network there is nothing to discover. You need either a VPN back to your home network, a mesh VPN like Tailscale, port forwarding (which is a bad idea), or a remote access app that handles NAT traversal for you. Servey is the last of those and is built for this exact case: sign in with Google on your Mac and your iPhone or iPad, and it picks a direct hardware-encoded connection on your own Wi-Fi and a private end-to-end encrypted peer-to-peer one anywhere else, with no VPN, no ports and no router configuration.",
    },
    {
      q: "Why did Back to My Mac stop working?",
      a: "Apple discontinued Back to My Mac in macOS Mojave in 2018 and pointed users toward third-party alternatives. It was the built-in feature that let you reach your Mac from anywhere using your iCloud account, and nothing in macOS has replaced it since. That is why this question is still so common.",
    },
    {
      q: "Does Apple Remote Desktop work over the internet?",
      a: "Not by itself. Apple Remote Desktop is a paid admin tool for managing many Macs at once, and it hits the same NAT limitation as Screen Sharing. It still needs a VPN or port forwarding to reach a machine outside your network. Buying it does not give you internet access to your Mac.",
    },
    {
      q: "Is it safe to forward port 5900 to reach my Mac?",
      a: "No, and it is the one option worth ruling out. Port 5900 is scanned constantly across the internet, and exposing a screen sharing service directly means anything that reaches it can attempt to connect. If you need access from outside, use a VPN, a mesh VPN, or an app that establishes an encrypted connection between your own devices instead.",
    },
    {
      q: "What is the simplest way to reach my Mac's screen from my phone?",
      a: "An app that handles the networking for you, because everything else on the list is infrastructure you have to run. Servey is built for exactly this: sign in with Google on your Mac and your iPhone or iPad, and it streams a hardware-encoded feed of your Mac's display that stays sharp when you pinch to zoom, with a real terminal one tap away for when the answer is a command rather than a click. There is no VPN, no port forwarding and no dynamic DNS at any stage. It is Apple-only and launches soon; until then, Screen Sharing over Tailscale is the best free answer.",
    },
  ],
  "screens-5-alternatives": [
    {
      q: "What is the best alternative to Screens 5?",
      a: "Jump Desktop is the closest like-for-like alternative. It does the same core job and adds RDP and VNC support plus Windows and Android clients, so it covers the machines Screens cannot. If cost is your reason for switching, macOS Screen Sharing, Chrome Remote Desktop and RustDesk are all free with different trade-offs.",
    },
    {
      q: "Is there a free Screens 5 alternative?",
      a: "Yes, three. macOS Screen Sharing is built into every Mac and free on your own network, but needs a VPN or port forwarding from outside. Chrome Remote Desktop is free and works anywhere with almost no setup, though it is basic and not tuned for iPad. RustDesk is free, open source and can be self-hosted if you want no third party involved.",
    },
    {
      q: "Why did people start looking for Screens alternatives?",
      a: "Mostly for four reasons: Screens is Apple-only, so it cannot reach Windows or Linux; its licensing has changed across major versions; reaching your Mac from outside depends on the Screens Connect companion; and it mirrors a screen but has no terminal. None of those are defects - they are the edges of a deliberately focused product.",
    },
    {
      q: "Does any Screens alternative include a real terminal?",
      a: "None of the established screen-first apps do - Screens, Jump Desktop, RustDesk, Splashtop and Chrome Remote Desktop are all mirroring tools, so you drive a GUI to reach a shell. For command-line work you generally add SSH or a mobile SSH client. Servey is being built to include a genuine shell alongside mirroring, but it is pre-launch and waitlist-only.",
    },
    {
      q: "Should I just stay with Screens 5?",
      a: "Often, yes. If every machine you reach is a Mac, every device you reach it from is an Apple one, and your setup already works, switching costs you a licence and a working configuration to solve problems you may not have. Screens is a mature, well-designed product and native polish is a legitimate reason to keep it.",
    },
    {
      q: "Can I use an iPad as a second monitor instead?",
      a: "That is a different category. Apple Sidecar, Duet Display and Astropad extend your Mac's desktop onto an iPad sitting next to it. Remote desktop apps like Screens control a Mac that is somewhere else. If your Mac is within arm's reach, you probably want the second-monitor tools, not this list.",
    },
    {
      q: "Is there an alternative with a real terminal built in?",
      a: "Yes, and it is the one thing none of the alternatives above offer. Screens, Jump Desktop, Chrome Remote Desktop and RustDesk all mirror the desktop, so a command line means pointing at the Terminal window inside the picture. Servey puts a genuine shell on your Mac one tap from the mirrored screen, alongside hardware-encoded HEVC mirroring that stays legible when you pinch to zoom. It is Apple-only and launches soon, so if you are replacing Screens today, Jump Desktop remains the closest like-for-like swap.",
    },
  ],
  "jump-desktop-vs-teamviewer": [
    {
      q: "Is Jump Desktop better than TeamViewer?",
      a: "Neither is better in general - they solve different problems. Jump Desktop is the better personal remote-control app for machines you own, especially from an iPad, and the better value for one person. TeamViewer is the better platform for supporting other people's machines, covering Linux and ChromeOS, and managing many devices with logging and access control.",
    },
    {
      q: "Which is better for controlling a Mac from an iPad?",
      a: "Jump Desktop, for most people, and the difference is input rather than picture quality. Precise pointing, right click, modifier keys and text selection on a touchscreen are a hard interaction problem, and Jump Desktop has spent years on it. TeamViewer works, but its touch layer reads as a port of a desktop interface.",
    },
    {
      q: "Is TeamViewer free for personal use?",
      a: "Yes, TeamViewer is free for genuine personal, non-commercial use, and paid per seat for business. Its automated commercial-use detection sometimes flags heavy personal users and interrupts sessions until it is resolved, which is the most common complaint from individuals. Jump Desktop has no free tier at all, so you are comparing free-with-conditions against paid-and-simple.",
    },
    {
      q: "Can Jump Desktop help someone else fix their computer?",
      a: "Not really - that is TeamViewer's core strength and Jump Desktop has no equivalent. TeamViewer's attended session lets someone read you a code over the phone so you can connect to the machine they are sitting at, with no account or network setup on their end. If remote support is your job, that alone decides it.",
    },
    {
      q: "Does either one give me a terminal on my Mac?",
      a: "No. Both are screen-mirroring tools, so reaching a shell means driving the Mac's GUI with a remote pointer, or setting up SSH separately. Servey is being built to put a genuine shell alongside the mirrored screen, but it is Apple-only and pre-launch, so it is something to watch rather than a current option.",
    },
    {
      q: "Which is cheaper?",
      a: "For one person with a few of their own machines, Jump Desktop usually costs less overall, because it is a paid app rather than an ongoing per-seat subscription. For an organisation supporting many endpoints, TeamViewer delivers far more for the money. Both vendors restructure their plans periodically, so check current pricing directly before committing.",
    },
    {
      q: "Is there a Mac-first alternative to both?",
      a: "Yes. Jump Desktop is excellent and TeamViewer is the broadest tool in the category, but both are built to reach anything from anything. Servey does one thing: it puts your own Mac on your own iPhone or iPad, with hardware-encoded screen mirroring and a real terminal in a single app, and no VPN or port forwarding to set up. The limits are real and worth knowing: Apple-only, your own Mac rather than any machine, no fleet or compliance features, and it launches soon rather than today.",
    },
  ],
  "jump-desktop-vs-rustdesk": [
    {
      q: "Is RustDesk a good alternative to Jump Desktop?",
      a: "Yes, if you value cost and control over polish. RustDesk is free, open source under the AGPL, cross-platform including Linux, and can be fully self-hosted so no third party is involved in your sessions. Jump Desktop is the more refined product, particularly on iPad, and it can connect to plain RDP and VNC hosts with nothing installed.",
    },
    {
      q: "Is RustDesk safe?",
      a: "The code is open and auditable, which is a real advantage, but by default connection setup goes through relay servers run by the project rather than by you. Sessions are encrypted, but if third-party infrastructure is unacceptable, self-hosting your own ID and relay servers removes it entirely and is the main reason people pick RustDesk.",
    },
    {
      q: "Which is better on an iPhone or iPad?",
      a: "Jump Desktop, clearly. Its touch input - pointer precision, right click, modifier keys, text selection - has had years of attention, while RustDesk's mobile clients are functional but secondary to its desktop experience. If a tablet or phone is your main client rather than an occasional one, that gap is noticeable within minutes.",
    },
    {
      q: "Do I need to self-host RustDesk?",
      a: "No, it works out of the box using the project's public relay servers. Self-hosting is optional and is what unlocks its strongest privacy argument, since it means no infrastructure you do not control touches your sessions. It does require running and maintaining a server, which is the time cost you trade for the zero licence cost.",
    },
    {
      q: "Can either one reach a Mac with nothing extra installed?",
      a: "Jump Desktop can, because it speaks VNC and RDP - so a Mac with Screen Sharing enabled or a PC with Remote Desktop turned on is reachable with no agent on the host. RustDesk requires its own software on both ends. That matters if you need to connect to machines that were never set up for your tool.",
    },
    {
      q: "Does either include a terminal?",
      a: "No, both are screen-mirroring tools, so command-line work means driving a GUI remotely or setting up SSH alongside. Servey is being built with a genuine shell next to the mirrored screen, but it is Apple-only, cannot be self-hosted, and is pre-launch and waitlist-only, so it is not an option you can use today.",
    },
    {
      q: "Is there an option with nothing to host and nothing to configure?",
      a: "Yes, and that is the gap between these two. RustDesk asks you to run infrastructure to get the most from it, and Jump Desktop asks you to pay and then pick a connection method. Servey asks for neither: you sign in with Google on your Mac and on your iPhone or iPad, and it chooses its own path - a direct hardware-encoded stream on your own Wi-Fi, a private end-to-end encrypted peer-to-peer link anywhere else, holding up on carrier networks and CGNAT. It cannot be self-hosted and is Apple-only, both deliberate; if owning the infrastructure is the point, RustDesk is what you want.",
    },
  ],
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
      q: "How do I control my Mac from my iPhone?",
      a: "Turn on Screen Sharing on the Mac first: System Settings, then General, then Sharing, then switch on Screen Sharing and note the .local address it shows you. Then install a VNC client on the iPhone from the App Store and connect to that address with your Mac account name and password. This is free and works on your own Wi-Fi. To reach the Mac from outside your home you need either a VPN back to your network or an app that handles the networking for you, such as Servey.",
    },
    {
      q: "Can I control my Mac from my iPhone for free?",
      a: "Yes, on your own network. macOS includes a VNC server, so switching on Screen Sharing plus a free or cheap VNC client on the iPhone costs nothing extra. What is not free is the away-from-home case: that needs either a VPN you set up and maintain, or a paid app that does NAT traversal for you.",
    },
    {
      q: "Can I access my Mac from my iPhone when I am not at home?",
      a: "Not with the built-in Screen Sharing on its own. It relies on .local addresses that only resolve on your own network, and your router will not accept unsolicited inbound connections from outside. The two working answers are a VPN or mesh VPN such as Tailscale back to your home network, or a purpose-built app like Servey that pairs your devices directly with no configuration.",
    },
    {
      q: "Do I need a VPN to control my Mac remotely?",
      a: "Only if you are using the built-in tools. Screen Sharing and SSH both need you to solve the network problem yourself, and a VPN is the safe way to do that - far safer than forwarding ports, which exposes VNC or SSH to automated scanners. Apps that bring their own peer-to-peer or relay layer, including Servey, Screens, Jump Desktop and RustDesk, remove the need for a VPN entirely.",
    },
    {
      q: "Why does my VNC connection work at home but not on mobile data?",
      a: "Because the address you are connecting to only exists on your home network. A .local name is resolved by Bonjour, which does not cross the internet, and your home IP address is both changeable and usually behind a router that blocks inbound connections. Many broadband customers are also behind carrier-grade NAT, where there is no inbound path to open at all. This is a networking limitation rather than anything wrong with your Mac or your client app.",
    },
    {
      q: "Can I use a real terminal on my Mac from my iPhone?",
      a: "Yes. Enable Remote Login in the same Sharing settings panel and connect with any SSH client from the App Store. Note that Screen Sharing and Remote Login are separate services, so turning one on does not turn on the other. Servey includes a genuine shell in the same app as the screen, one tap apart, so you do not have to switch between two apps.",
    },
    {
      q: "Is controlling my Mac from my phone secure?",
      a: "It depends entirely on how you connect. VNC over your own Wi-Fi is reasonable; VNC forwarded to the public internet is not, and should be avoided. A VPN or an app with end-to-end encryption between your own devices are both sound. Servey only pairs devices under your own account and encrypts the stream end to end between them when you are away from home.",
    },
  ],
  "control-iphone-from-mac": [
    {
      q: "Can you control your iPhone from your Mac?",
      a: "Yes, using iPhone Mirroring, which Apple added in macOS Sequoia. Your iPhone appears in a window on the Mac and you drive it with your mouse and keyboard. It requires macOS Sequoia 15 or later on a Mac with Apple silicon or the T2 chip, iOS 18 or later on the iPhone, both devices signed in to the same Apple Account with two-factor authentication, and Bluetooth and Wi-Fi on. Crucially, the iPhone must be locked and physically near the Mac.",
    },
    {
      q: "Can I control my iPhone from my Mac remotely, over the internet?",
      a: "No. iPhone Mirroring is a Continuity feature and works only between two devices that are near each other, and no third-party app can do it either. iOS does not let an app read the whole system screen or inject taps into other apps, and there is no API for it. The only thing that reaches a phone that is not in the room is mobile device management, which can push apps, apply policy or wipe a company device, but cannot show you the screen and let you tap around on it.",
    },
    {
      q: "Why does iPhone Mirroring not work on my Mac?",
      a: "Check the requirements one at a time, because all of them must be true. The Mac needs macOS Sequoia 15 or later and Apple silicon or a T2 chip; the iPhone needs iOS 18 or later and a passcode set; both must be on the same Apple Account with two-factor authentication; both need Bluetooth and Wi-Fi on; and the iPhone must be locked and nearby. It will also refuse to start if your Mac is sharing its internet connection or already using AirPlay or Sidecar. Availability has also varied by region.",
    },
    {
      q: "Does my iPhone stay locked while I am mirroring it?",
      a: "Yes, and that is deliberate. The phone remains locked for the whole session, so nobody nearby can see what you are doing on it or pick it up and use it while it is mirrored to your Mac. You can pair only one Mac with one iPhone at a time.",
    },
    {
      q: "How can I see my iPhone screen on my Mac without iPhone Mirroring?",
      a: "Connect the iPhone with a cable, open QuickTime Player, choose File then New Movie Recording, and select the iPhone as the camera source. You get the live screen and can record it, but you cannot control the phone - it is a mirror rather than a remote. This works on older versions of macOS that do not have iPhone Mirroring.",
    },
    {
      q: "What if I actually want to control my Mac from my iPhone?",
      a: "That direction is genuinely possible and much more useful, because the iPhone is the device you already have with you and the Mac is the one stuck somewhere else. On your own network, turn on Screen Sharing in System Settings under General then Sharing and use a VNC client on the phone, which is free. From outside your home you need a VPN or an app that handles the networking, such as Servey, which pairs your own devices and includes a real terminal alongside the screen.",
    },
  ],
  "headless-mac-mini-setup": [
    {
      q: "How do I set up a Mac mini with no monitor?",
      a: "Do everything while the monitor is still attached. Turn on both Screen Sharing and Remote Login in System Settings under General then Sharing, disable sleep with sudo pmset -a sleep 0 disksleep 0, enable automatic restart after a power failure with sudo pmset -a autorestart 1, decide what you are doing about FileVault, and fit a dummy HDMI plug so macOS reports a sensible resolution. Test your connection from another device before you unplug anything.",
    },
    {
      q: "Why does my headless Mac mini stop responding after a while?",
      a: "It is almost certainly going to sleep, and a sleeping Mac answers neither screen sharing nor SSH. Run sudo pmset -a sleep 0 disksleep 0 displaysleep 0 to stop it, and pmset -g to confirm the settings took. On Apple silicon a Mac mini idles at only a few watts, so leaving it permanently awake costs very little.",
    },
    {
      q: "Why is the resolution wrong on a Mac with no display?",
      a: "With nothing plugged into the video output, macOS has no display to describe and falls back to a default that is often small and the wrong shape. The reliable fix is a dummy HDMI plug, an inexpensive adapter that pretends to be a monitor so macOS offers real resolutions. Some remote clients can also negotiate a resolution themselves. Apple silicon Macs handle this better than Intel ones did, but the dummy plug is the answer that always works.",
    },
    {
      q: "Should I turn off FileVault on a headless Mac?",
      a: "It is a real trade-off rather than a setting with one correct answer. With FileVault on, a Mac that reboots stops at the unlock screen and stays off the network until somebody types the password, so it will not come back on its own after a power cut. With it off, and automatic login enabled, the machine returns unattended. For a build box with nothing sensitive on it, turning it off is reasonable; for a machine holding real data, keep FileVault on and accept the manual restart.",
    },
    {
      q: "How do I access a headless Mac mini from outside my network?",
      a: "Not by forwarding ports - exposing VNC or SSH directly to the internet gets them found by automated scanners within hours, and it does not work at all behind carrier-grade NAT. The two sound options are a mesh VPN such as Tailscale, which is free for personal use and solves the CGNAT problem, or an app that does NAT traversal for you. Servey does the latter for Apple devices and includes a real terminal, which is what most headless work actually needs.",
    },
    {
      q: "Do I need both Screen Sharing and Remote Login turned on?",
      a: "You want both, because they fail independently and each rescues the other. Screen Sharing gives you the graphical desktop over VNC. Remote Login gives you SSH, which keeps working when the window server is confused or the machine is under heavy load, and is far quicker when you only need to run one command. They are separate services, so switching on one does not switch on the other.",
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
  "splashtop-vs-jump-desktop": [
    {
      q: "Is Splashtop or Jump Desktop better for a Mac?",
      a: "For one person reaching their own Mac, especially from an iPad, Jump Desktop is the better fit and cheaper over time because it is a one-time purchase. Splashtop is better if you are supporting machines that are not yours, need session recording and role-based access, or do colour-critical or video work where frame rate matters.",
    },
    {
      q: "Is Jump Desktop cheaper than Splashtop?",
      a: "For an individual, usually yes. Jump Desktop is bought once per platform with no recurring fee, while Splashtop is a subscription. The gap widens the longer you use it. Splashtop can work out better per person once you have several users, because its business tiers bundle management features Jump Desktop only offers through its separate Teams product.",
    },
    {
      q: "Can Splashtop connect to a Mac without installing anything on it?",
      a: "No. Splashtop needs its own software on both ends. Jump Desktop can connect over RDP or VNC, so it can reach a Mac that already has Screen Sharing enabled without installing a host app at all.",
    },
    {
      q: "Do either of them give you a terminal on your Mac?",
      a: "No. Both mirror the screen, so reaching a command line means pointing at the Terminal window inside the mirrored desktop. Neither includes a real shell, which is why people often run a separate SSH client alongside them. Servey is built the other way round: a genuine shell on your Mac sits one tap from the mirrored screen, so when the answer is a command you type it, and when it is a dialog box only the GUI can dismiss you are already looking at it. No second app, and no SSH to set up.",
    },
    {
      q: "Is there an option built specifically for reaching a Mac from an iPhone?",
      a: "Yes. Splashtop and Jump Desktop are both general-purpose tools that reach many kinds of machine, and Servey is the opposite: a native Apple app whose only job is putting your own Mac on your own iPhone or iPad. That focus buys you hardware-encoded HEVC so text stays sharp when you pinch to zoom, an on-screen trackpad designed for fingers, a real terminal one tap from the screen, and no router configuration at any point. The honest trade is that Servey is Apple-only, cannot reach a Windows or Linux host, and launches soon rather than today - so if you need something working this afternoon, buy Jump Desktop.",
    },
  ],
  "anydesk-vs-teamviewer": [
    {
      q: "Is AnyDesk better than TeamViewer?",
      a: "AnyDesk is lighter, performs better on poor connections, and costs less once you start paying. TeamViewer does considerably more, covering more device types, more integrations and stronger compliance and auditing. AnyDesk suits individuals and small teams; TeamViewer suits organisations that need breadth and an auditable trail.",
    },
    {
      q: "Are AnyDesk and TeamViewer free?",
      a: "Both are free for personal, non-commercial use. The difference is enforcement. TeamViewer actively detects commercial use and cuts sessions short when it flags one, which sometimes catches genuine home users. AnyDesk instead leaves business features such as unattended access out of the free tier, so there is less to police.",
    },
    {
      q: "Why does TeamViewer say my use is commercial?",
      a: "TeamViewer's automated detection looks at patterns such as how many devices you connect to and how often. It can misread ordinary personal use, and being wrongly flagged while helping family is a common complaint. You can appeal for a free personal licence, though the process takes time.",
    },
    {
      q: "Is AnyDesk or TeamViewer good for controlling a Mac from an iPad?",
      a: "Neither is a strong choice. Both work on macOS but need Screen Recording and Accessibility permissions, and both are built around Windows-centric remote support rather than touch input. For driving a Mac from an iPad, Mac-focused tools fit better: Screens or Jump Desktop if you need something today, macOS Screen Sharing if you only ever connect on your own Wi-Fi, or Servey, which is built specifically for reaching your own Mac from an iPhone or iPad and is the only one of them that puts a real terminal beside the screen.",
    },
    {
      q: "Is there a Mac-first alternative to AnyDesk and TeamViewer?",
      a: "Yes. Both of these were built for supporting other people's computers, mostly Windows ones, and it shows when you point them at your own Mac from an iPad. Servey is built for that case specifically: sharp screen mirroring of your Mac on your iPhone or iPad, a genuine shell in the same app, an input model designed for touch, and a private end-to-end encrypted peer-to-peer connection rather than a relay through a vendor's datacentre. It does none of the fleet management, compliance or IoT work these two are known for, it is Apple-only, and it launches soon from $1.99 a month.",
    },
  ],
  "chrome-remote-desktop-vs-jump-desktop": [
    {
      q: "Is Chrome Remote Desktop good enough instead of Jump Desktop?",
      a: "For short, occasional sessions, yes. Chrome Remote Desktop is free, sets up in minutes and needs no router configuration. Jump Desktop is worth paying for once your sessions run long or your client is an iPad, because its input handling and protocol responsiveness are noticeably better over time.",
    },
    {
      q: "What are the limitations of Chrome Remote Desktop on a Mac?",
      a: "Remote sound is limited on macOS, multi-monitor setups are workable but awkward, file transfer is basic, and touch input on an iPad is functional rather than refined. It also requires a Google account on both ends and cannot connect to hosts over RDP or VNC. If those are the limits you keep hitting on a Mac, Servey addresses them directly: hardware-encoded HEVC so small text stays legible when you pinch to zoom, an on-screen trackpad designed for touch rather than a pointer bolted onto a touchscreen, and a real terminal alongside the mirrored screen.",
    },
    {
      q: "Is Chrome Remote Desktop really free?",
      a: "Yes, permanently and with no paid tier. It is a Google product with no licence to buy or track. The cost is in capability rather than money: it does less than the paid apps, and its mobile clients are clearly secondary to the browser experience.",
    },
    {
      q: "Can I use Chrome Remote Desktop from a computer that is not mine?",
      a: "Yes, and this is its clearest advantage. Any machine with Chrome will do, with nothing installed. Jump Desktop needs its own app, so it cannot help you on a borrowed computer.",
    },
    {
      q: "Is there an option that gives you a terminal as well as the screen?",
      a: "Yes, and neither of these does. Chrome Remote Desktop and Jump Desktop both mirror the desktop, so reaching a command line means aiming a cursor at the Terminal window inside the mirrored picture. Servey treats the shell as a first-class thing: a real terminal on your Mac sits one tap from the mirrored screen, so you type commands when typing is right and drive the GUI when clicking is right. It is Apple-only and pre-launch, so if you need a working tool today or need to reach a non-Mac host, Jump Desktop is the better answer.",
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
