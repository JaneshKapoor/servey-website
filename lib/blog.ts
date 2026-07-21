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
  | { type: "img"; src: string; alt: string; width: number; height: number; caption?: string };

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
    title: "How to run and monitor AI agents on your Mac from anywhere",
    description:
      "Start long-running AI coding agents on your Mac, then watch, approve, and steer them from your iPhone or iPad - with a real terminal and screen mirroring, from anywhere.",
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
    title: "Who Servey is for: developers, home labs, and the endlessly curious",
    description:
      "Servey turns your iPhone or iPad into a window onto your Mac. Here is who gets the most from it - developers, home-lab and Mac Mini owners, AI tinkerers, and the simply curious.",
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
    title: "Run AI agents locally on your Mac - and reach them from anywhere",
    description:
      "Why running AI coding agents locally on your Mac beats the cloud - privacy, your real environment, no metered bills - and how to supervise them from your iPhone or iPad.",
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
    title: "AI agents can use your computer now - here's how to stay in control from anywhere",
    description:
      "As AI agents increasingly drive your computer, watching, pausing, and steering them remotely matters. Here's how to keep a human in the loop from your iPhone or iPad.",
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
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
