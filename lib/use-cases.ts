/**
 * Task-shaped landing pages.
 *
 * These are deliberately NOT under /blog: they are commercial landing pages for
 * a specific job someone is trying to do, not articles. Each one shares most of
 * its structure with the others and differs in the part that matters - the
 * `tiles`, which argue that task's specific ergonomics. That mix is what keeps
 * a templated page family from reading as thin.
 *
 * Honesty rule for everything in this file: Servey is pre-launch. No ratings, no
 * testimonials, no download counts, no claims we cannot back. Every page renders
 * a plain pre-launch disclosure.
 */

export interface UseCaseTile {
  title: string;
  body: string;
}

export interface UseCaseSection {
  h2: string;
  /** Paragraphs. The first should answer the H2 directly - answer engines lift it. */
  body: string[];
  bullets?: string[];
}

export interface UseCase {
  slug: string;
  /** <= 51 chars: the " - Servey" title template adds 9. */
  metaTitle: string;
  /** 110-160 chars. */
  description: string;
  h1: string;
  lede: string;
  /** The task-specific module. Four tiles arguing this job's ergonomics. */
  tiles: UseCaseTile[];
  sections: UseCaseSection[];
  faqs: { q: string; a: string }[];
  keywords: string[];
  /** Existing guide to cross-link. Must be a real slug in lib/blog.ts. */
  relatedSlug: string;
  /** Short label for the cross-link mesh at the bottom of every page. */
  navLabel: string;
}

export const useCases: UseCase[] = [
  /* ---------------------------------------------------------------- */
  {
    slug: "terminal-on-iphone",
    navLabel: "Terminal on iPhone",
    metaTitle: "Run your Mac's terminal on iPhone",
    description:
      "Get a real shell on your Mac from your iPhone, with no SSH setup, no port forwarding and no VPN. Here is how it works and what it is good for.",
    h1: "Run your Mac's terminal on your iPhone",
    lede:
      "A genuine shell on your own Mac, reachable from the phone in your pocket. Not a web console, and not an SSH client you have to configure first.",
    tiles: [
      {
        title: "No SSH to set up",
        body: "You do not enable Remote Login, forward a port, or paste a key into a phone keyboard. Servey runs a host app on your Mac; you sign in on both devices and it appears.",
      },
      {
        title: "A real shell, not a sandbox",
        body: "It is your Mac's shell, with your PATH, your dotfiles, and your tools. Anything you would type at the Terminal app works here.",
      },
      {
        title: "Shortcut keys that phones lack",
        body: "Esc, Tab, Ctrl, and the arrow keys sit above the keyboard, so vim, less, and anything curses-based stay usable on a touch screen.",
      },
      {
        title: "Works off your network",
        body: "On the same Wi-Fi it connects directly. Away from home it switches to a private path between your own devices, automatically, including on cellular.",
      },
    ],
    sections: [
      {
        h2: "What running a terminal on your iPhone actually means",
        body: [
          "It means opening a shell session on your Mac, from your iPhone, and typing commands that run on the Mac. The phone is the keyboard and screen; the Mac does the work. Nothing is executed on the phone itself, and nothing needs to be installed on a server, because the machine you are reaching is one you already own.",
          "That is a narrower job than a general SSH client does, and the narrowness is the point. Because Servey only ever connects you to your own Mac, it can skip the entire configuration step that makes SSH from a phone unpleasant.",
        ],
      },
      {
        h2: "The usual way, and why people give up on it",
        body: [
          "The conventional route is to enable Remote Login on the Mac, install an SSH client on the iPhone, generate or import a key, and connect. On your home network that works. The moment you leave, it stops: your Mac is behind a router that does not accept inbound connections.",
          "The fixes are all real work. Forward a port and you have exposed SSH to the internet. Run a VPN and you have a second thing to maintain. Use an overlay network and you have added a dependency to every device. Most people try one of these, find it fiddly on a phone, and stop bothering.",
        ],
        bullets: [
          "Remote Login enabled, plus a key managed on a touch keyboard.",
          "A port forward, a VPN, or an overlay network to get in from outside.",
          "Carrier networks that block or NAT the connection anyway.",
        ],
      },
      {
        h2: "How Servey does it instead",
        body: [
          "Servey installs a host app on the Mac. Both devices sign in to the same account, and the Mac registers itself. When you tap it, Servey picks a path: a direct connection on your local network, or a private peer-to-peer connection between your two devices when you are elsewhere. You never choose, and there is nothing to configure on your router.",
          "On the remote path the session is end-to-end encrypted between your devices. The cloud brokers the initial handshake and then largely gets out of the way.",
        ],
      },
      {
        h2: "What this is genuinely good for",
        body: [
          "Short, decisive tasks where getting to a prompt is most of the battle: restarting a service that has wedged, tailing a log to see whether a job finished, killing a runaway process, checking disk space before something fills up, or kicking off a build while you are away from your desk.",
          "It is less suited to long editing sessions. A phone screen is a phone screen. For anything sustained, an iPad is a much better client, and the same account reaches the same Mac.",
        ],
      },
      {
        h2: "Where an SSH client is still the better tool",
        body: [
          "If you manage more than one machine, use a proper SSH client such as Termius or Blink. Servey reaches exactly one target - your Mac - and does not do SFTP, Mosh, Telnet, serial connections, jump hosts, or port forwarding. Those are real features and Servey has none of them.",
          "The honest split: an SSH client is for infrastructure you run. Servey is for the one Mac you own.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need to enable SSH or Remote Login on my Mac?",
        a: "No. Servey runs its own host app on your Mac and pairs it to your account, so there is no sshd to enable, no port to forward, and no key to manage on your phone.",
      },
      {
        q: "Is this a real shell or a limited web console?",
        a: "A real shell on your Mac. Your PATH, your dotfiles, and your installed tools are all there, because the session runs on the Mac itself.",
      },
      {
        q: "Does it work over cellular?",
        a: "Yes. When you are away from your Mac's network, Servey establishes a private connection between your own devices and is built to work on strict mobile and carrier networks.",
      },
      {
        q: "Can I use it to reach a Linux server too?",
        a: "No. Servey connects you to a Mac running its host app, and nothing else. If you need to reach arbitrary servers, use an SSH client instead - that is a different tool for a different job.",
      },
      {
        q: "Is Servey available now?",
        a: "Not yet. Servey is pre-launch and you can join the waitlist. Nothing on this page is a review or a track record; it is a description of what the app does, from the people building it.",
      },
    ],
    keywords: [
      "run terminal on mac from iphone",
      "control mac terminal from iphone",
      "ssh into mac from iphone",
      "iphone terminal for mac",
      "remote shell to my mac",
    ],
    relatedSlug: "real-terminal-on-your-mac-from-iphone",
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "terminal-on-ipad",
    navLabel: "Terminal on iPad",
    metaTitle: "Run your Mac's terminal on iPad",
    description:
      "Turn an iPad into a usable terminal for your Mac, with a hardware keyboard, split screen and no SSH configuration. What works well and what does not.",
    h1: "Run your Mac's terminal on your iPad",
    lede:
      "The iPad is the device where a remote terminal stops being an emergency tool and starts being somewhere you can actually work.",
    tiles: [
      {
        title: "Hardware keyboard changes everything",
        body: "With a Magic Keyboard or any Bluetooth keyboard, you get real modifier keys and touch typing. This is the difference between fixing something and working on something.",
      },
      {
        title: "Room for output",
        body: "An iPad shows enough rows and columns for logs, diffs, and curses-based tools to be legible without constant scrolling.",
      },
      {
        title: "Terminal and screen side by side",
        body: "Servey also mirrors your Mac's screen, so when a task turns out not to be shell-shaped you can switch to the desktop instead of giving up.",
      },
      {
        title: "Nothing to configure",
        body: "No Remote Login, no port forwarding, no VPN profile on the iPad. Sign in on both devices and your Mac is listed.",
      },
    ],
    sections: [
      {
        h2: "Why the iPad is the better terminal client",
        body: [
          "A terminal needs two things a phone struggles to give it: a keyboard with real modifiers, and enough screen to see context. An iPad with a keyboard case has both. That moves remote terminal work out of the category of things you do when something is broken, and into the category of things you can plan to do.",
          "If you have tried a shell on a phone and found it frustrating, the device was probably the problem rather than the idea.",
        ],
      },
      {
        h2: "The setup problem, and how this avoids it",
        body: [
          "The standard approach is an SSH client on the iPad talking to your Mac over SSH. That means enabling Remote Login, managing a key, and solving the problem of reaching a machine that sits behind a home router - usually with a port forward, a VPN, or an overlay network.",
          "Servey takes the other approach. A host app on the Mac registers it to your account; the iPad signs in to the same account and the Mac appears. On your own network the connection is direct. Away from it, Servey opens a private path between your two devices without any router configuration.",
        ],
      },
      {
        h2: "When the terminal is not the right answer",
        body: [
          "Plenty of tasks look shell-shaped until you are halfway through them. A dialog needs dismissing, an app has to be clicked through, or you need to see what something actually looks like rather than what a command reports.",
          "This is where a pure SSH client leaves you stuck. Servey includes screen mirroring with a real trackpad and keyboard in the same app, so you can move to the desktop and finish the job.",
        ],
        bullets: [
          "Approving a permission prompt that blocks a build.",
          "Checking a GUI app's actual state rather than its log output.",
          "Dragging a file somewhere a command cannot easily reach.",
        ],
      },
      {
        h2: "Being straight about the limits",
        body: [
          "Servey reaches one Mac. It is not a fleet tool and it does not replace an SSH client if you have servers to manage. There is no SFTP, no Mosh, no serial, no jump hosts. It is Apple-only: a Mac host, an iPhone or iPad client, and nothing on Windows, Linux, or Android.",
          "It is also pre-launch, which means no track record. Established apps in this space have years of refinement behind them and Servey does not.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need a keyboard for the iPad?",
        a: "Not strictly, but it changes the experience completely. Servey shows the keys a terminal needs that iPadOS does not provide, though real modifier keys and touch typing make sustained work far more comfortable.",
      },
      {
        q: "Can I see my Mac's screen as well as the terminal?",
        a: "Yes. Screen mirroring and the terminal are both in the app, so you can switch when a task turns out to need the desktop rather than a prompt.",
      },
      {
        q: "Does this need my iPad and Mac on the same Wi-Fi?",
        a: "No. On the same network Servey connects directly for the sharpest picture. On different networks it opens a private connection between your own devices and switches automatically.",
      },
      {
        q: "Is this an SSH client?",
        a: "No. An SSH client connects to any server you configure. Servey connects only to a Mac running its host app, which is why it needs no configuration at all.",
      },
      {
        q: "When can I use it?",
        a: "Servey has not launched. You can join the waitlist to be told when it does, and you are not charged before then.",
      },
    ],
    keywords: [
      "mac terminal from ipad",
      "terminal app for ipad",
      "control mac from ipad",
      "ssh client for ipad alternative",
      "ipad as mac terminal",
    ],
    relatedSlug: "control-your-mac-from-iphone-ipad",
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "headless-mac-mini",
    navLabel: "Headless Mac mini",
    metaTitle: "Control a headless Mac mini remotely",
    description:
      "Run a Mac mini with no monitor attached and still reach its screen and shell from an iPhone or iPad, including after a reboot. How it works.",
    h1: "Control a headless Mac mini from anywhere",
    lede:
      "A Mac mini with no display is an excellent little server right up to the moment something goes wrong and you need to see the screen.",
    tiles: [
      {
        title: "Screen and shell, not just shell",
        body: "SSH is fine until the problem is a dialog box. Servey gives you the Mac's actual screen with a trackpad and keyboard, alongside a real terminal.",
      },
      {
        title: "Survives a reboot",
        body: "The host app starts with the Mac and re-registers itself, so the mini comes back on its own without someone walking over with a monitor.",
      },
      {
        title: "No router configuration",
        body: "No port forward to your mini, no VPN to maintain, and no static IP. It reaches you through a private path between your own devices.",
      },
      {
        title: "Useful without a display attached",
        body: "Servey streams the Mac's screen whether or not a monitor is plugged in, so you are not buying a dummy HDMI plug to keep it usable.",
      },
    ],
    sections: [
      {
        h2: "What people actually run on a headless Mac mini",
        body: [
          "A mini tucked on a shelf makes a very good always-on machine: a build agent, a media server, a backup target, a place to leave long jobs running, or simply a second Mac that is always awake. It is quiet, it sips power, and macOS-only tooling runs on it natively.",
          "The catch is access. The moment it has no monitor, every problem becomes harder than it should be.",
        ],
      },
      {
        h2: "Why SSH alone is not enough",
        body: [
          "A shell handles most of it. What it does not handle is the class of problem that lives in the GUI: a permission prompt macOS raises the first time something runs, a login window after an update, an app that has hung with a modal open, or a system dialog that is quietly blocking everything behind it.",
          "That is the moment people go and find a monitor. Being able to see the screen turns a twenty-minute interruption into a ten-second one.",
        ],
        bullets: [
          "Permission and security prompts that only appear on screen.",
          "The login window after an unattended restart.",
          "GUI apps that have stopped responding for reasons the logs do not show.",
        ],
      },
      {
        h2: "Reaching it from outside your home",
        body: [
          "The traditional answers are a port forward to VNC or SSH, a VPN back into the house, or an overlay network installed on every device. They all work and they all add something to maintain, and a port forward in particular means exposing a service on your home network to the internet.",
          "Servey pairs the mini to your account instead. From your phone it appears in a list; tapping it opens a session over whichever path is available. On your own network that is a direct connection, and elsewhere it is a private encrypted path between your devices.",
        ],
      },
      {
        h2: "What to know before relying on it",
        body: [
          "Servey needs its host app running on the mini, so it is not a rescue tool for a machine that will not boot. It is not a replacement for hardware-level remote management, and it does not do wake-on-LAN.",
          "It is also pre-launch and unproven. If a headless mini is doing something you genuinely cannot afford to lose access to, keep whatever fallback you already trust.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does the Mac mini need a monitor or a dummy plug?",
        a: "No. Servey streams the Mac's screen whether or not a display is attached, so you do not need a dummy HDMI adapter to keep it usable.",
      },
      {
        q: "What happens after the mini reboots?",
        a: "The host app starts with the Mac and registers it to your account again, so it reappears on your iPhone or iPad without anyone touching the machine.",
      },
      {
        q: "Do I need to forward a port to reach it from outside?",
        a: "No. There is no port forwarding, no VPN and no static IP. Servey opens a private connection between your own devices instead.",
      },
      {
        q: "Can I get a terminal as well as the screen?",
        a: "Yes. Both are in the app and both work on the local and remote paths, so you can use a shell for most things and switch to the screen when a dialog is in the way.",
      },
      {
        q: "Will this recover a Mac that will not boot?",
        a: "No. Servey depends on its host app running, so it cannot help before macOS has started. It is for a machine that is up but out of reach, not one that is down.",
      },
    ],
    keywords: [
      "headless mac mini remote access",
      "control mac mini without monitor",
      "mac mini home server remote control",
      "remote desktop headless mac",
      "terminal for mac mini without monitor",
    ],
    relatedSlug: "control-a-headless-mac-mini-remotely",
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "mac-for-developers",
    navLabel: "For developers",
    metaTitle: "Remote Mac access for developers",
    description:
      "Reach your development Mac from an iPhone or iPad: check a build, tail a log, restart a service or drive the desktop, with no SSH setup.",
    h1: "Remote Mac access for developers",
    lede:
      "Your development machine is a Mac. Most of the time you are sitting at it. The interesting question is what happens when you are not.",
    tiles: [
      {
        title: "Check a build without a laptop",
        body: "Tail the output, see whether the test suite went green, and restart the job if it did not, from wherever you are standing.",
      },
      {
        title: "Your real environment",
        body: "The shell is your Mac's shell, with your toolchain, your versions, and your credentials already in place. Nothing to replicate elsewhere.",
      },
      {
        title: "Screen when the shell is not enough",
        body: "Simulators, GUI debuggers, and permission prompts do not fit down a pipe. The same app mirrors the desktop with a trackpad and keyboard.",
      },
      {
        title: "No exposed SSH",
        body: "Nothing is forwarded to the internet and no VPN sits between you and your machine. Pairing is scoped to your own account.",
      },
    ],
    sections: [
      {
        h2: "The specific problem this solves",
        body: [
          "Development work produces a lot of waiting, and the waiting does not respect where you are. A long build, a test suite, a data import, a model download, a deploy that needs watching. If the machine doing that work is your Mac at home or at the office, then leaving the desk means losing visibility.",
          "The usual answer is to carry the laptop everywhere, which is a heavy answer to a light problem. Most of what you need in that window is a prompt and a way to look at the screen.",
        ],
      },
      {
        h2: "Why not just set up SSH",
        body: [
          "You can, and plenty of developers do. It also means enabling Remote Login, managing keys on a phone, and solving the reachability problem when you are outside the network - a port forward, a VPN, or an overlay network on every device.",
          "None of that is difficult for someone who does this professionally. It is just friction, and friction is why the setup often gets built once and then quietly abandoned.",
        ],
        bullets: [
          "Remote Login plus key management on a touch device.",
          "A tunnel of some kind to get in from outside.",
          "Something extra to keep working every time the network changes.",
        ],
      },
      {
        h2: "What a session looks like",
        body: [
          "Open the app, tap your Mac, and you are in. From the terminal you can tail logs, rerun a failed job, restart a service, check disk usage, or look at what is actually running. If the answer turns out to be in the GUI, switch to the mirrored screen and use the desktop directly.",
          "On your own network the connection is direct and sharp. Away from it, Servey opens a private encrypted path between your devices, automatically, including on cellular.",
        ],
      },
      {
        h2: "What it is not",
        body: [
          "Not a fleet tool. Servey reaches your Mac, not your servers, your staging boxes, or your containers. If you need to manage infrastructure, an SSH client is the right tool and Servey does not replace it.",
          "Not a coding environment either. You can edit a file in vim if you want to, but the honest use case is checking on work and unblocking it, rather than doing the work itself from a phone.",
          "And it is pre-launch, with no track record and no independent reviews.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I use my own shell setup?",
        a: "Yes. The session runs on your Mac, so your shell, dotfiles, PATH, and installed tools are exactly as you left them.",
      },
      {
        q: "Is this a replacement for SSH into my servers?",
        a: "No. Servey connects only to a Mac running its host app. For servers, VMs, or network gear, use a proper SSH client.",
      },
      {
        q: "Can I run a simulator or a GUI debugger?",
        a: "You can see and drive them through screen mirroring with a trackpad and keyboard. That is useful for checking and unblocking things, though a phone or tablet is not a comfortable place to do sustained GUI work.",
      },
      {
        q: "Does anything get exposed to the internet?",
        a: "No ports are forwarded. Devices pair through your account, and on the remote path the session is end-to-end encrypted between your own devices.",
      },
      {
        q: "Can I try it today?",
        a: "Not yet. Servey is pre-launch, so this page describes what the app does rather than reporting anyone's experience of using it. The waitlist is open.",
      },
    ],
    keywords: [
      "remote mac access for developers",
      "access development mac remotely",
      "check build from phone",
      "remote terminal for mac",
      "control mac from iphone without vpn",
    ],
    relatedSlug: "who-is-servey-for-developers-home-labs",
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "remote-mac-for-ai-agents",
    navLabel: "For AI agents",
    metaTitle: "Check on AI agents running on your Mac",
    description:
      "Leave a coding agent working on your Mac and still watch it, answer its prompts and stop it, from an iPhone or iPad, wherever you are.",
    h1: "Watch AI agents on your Mac from anywhere",
    lede:
      "Agents that run for a long time raise an awkward question: what happens when one needs you and you are not at the desk?",
    tiles: [
      {
        title: "Answer the prompt that blocks it",
        body: "Agents stop and ask before doing something consequential. Reaching a prompt from your phone is the difference between a pause and a wasted hour.",
      },
      {
        title: "Watch what it is doing",
        body: "Tail the output as it works, so you can see whether it is making progress or looping on the same failure.",
      },
      {
        title: "Stop it quickly",
        body: "The fastest way to stop something going wrong is a shell you can already reach. No laptop to find, no tunnel to bring up first.",
      },
      {
        title: "See the screen, not just the log",
        body: "When an agent drives GUI apps or opens something you need to look at, the mirrored desktop shows you what actually happened.",
      },
    ],
    sections: [
      {
        h2: "Why this is a real problem now",
        body: [
          "Coding agents and long-running local tasks have made it normal to start something on your Mac and walk away. The work is autonomous but not unattended: agents pause for approval, hit an error and stop, or head off in a direction you would have corrected in five seconds if you had been watching.",
          "The gap between something needing attention and you being able to give it is where the time goes.",
        ],
      },
      {
        h2: "Keeping a human in the loop from a phone",
        body: [
          "The practical requirement is small. You need to see the output, type a response, and be able to stop the thing. All three fit comfortably in a terminal, which is why a reachable shell is worth more here than a full desktop.",
          "Servey gives you that shell on your own Mac without an SSH setup, and adds the screen for the cases where reading the log is not enough.",
        ],
        bullets: [
          "Approve or decline an action the agent is waiting on.",
          "Watch output long enough to tell progress from a loop.",
          "Kill a process before it does something expensive.",
        ],
      },
      {
        h2: "Why it runs on your own machine",
        body: [
          "Running agents locally keeps your code and credentials on hardware you control, and lets them use the tools already installed on your Mac. That is exactly why losing access when you leave the house is annoying: the work is local by design, and so is the machine.",
          "Servey does not move any of that anywhere. It gives you a way back to the Mac the work is already happening on.",
        ],
      },
      {
        h2: "Being honest about scope",
        body: [
          "Servey does not run, schedule, or manage agents. It has no opinion about which ones you use and no integration with any of them. It gives you a terminal and a screen on your Mac; whatever you run there is entirely your business.",
          "It is also pre-launch. Nothing here is a report of how it performs in practice, because nobody outside the team has used it yet.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Servey run or manage AI agents?",
        a: "No. It gives you a terminal and a screen on your own Mac. Whatever agents or tools you run there are yours to choose and manage.",
      },
      {
        q: "Can I answer an agent's prompt from my phone?",
        a: "Yes. The terminal session is a real shell on your Mac, so anything waiting for input in that session can be answered from the phone.",
      },
      {
        q: "What if the agent is driving a GUI app?",
        a: "Switch to screen mirroring. You get the Mac's actual desktop with a trackpad and keyboard, so you can see what happened rather than inferring it from logs.",
      },
      {
        q: "Does my code leave my Mac?",
        a: "The work stays on your Mac. On the remote path the session video is end-to-end encrypted between your own devices and hardly touches our servers.",
      },
      {
        q: "Is it available yet?",
        a: "No. Servey is pre-launch with no users and no independent reviews, and the waitlist is the way to hear when that changes.",
      },
    ],
    keywords: [
      "monitor ai agents on mac remotely",
      "check on coding agent from phone",
      "run ai agents locally on mac",
      "remote access mac ai agent",
      "stay in control of ai agents",
    ],
    relatedSlug: "run-ai-agents-on-your-mac-remotely",
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "mac-home-lab",
    navLabel: "Mac home lab",
    metaTitle: "Reach your Mac home lab from anywhere",
    description:
      "Keep a Mac running at home as part of a home lab and reach its screen and shell from an iPhone or iPad, without opening a port or running a VPN.",
    h1: "Reach your Mac home lab from anywhere",
    lede:
      "Home labs are built to be left alone. The trouble is that the moment you are away, the machine you need is the one you cannot get to.",
    tiles: [
      {
        title: "Nothing exposed to the internet",
        body: "No port forward to a machine on your home network, which is the part of the usual setup most worth avoiding.",
      },
      {
        title: "No VPN to maintain",
        body: "Nothing to install on every client, nothing to reconnect, and no profile to renew. The pairing lives in your account.",
      },
      {
        title: "Screen and shell together",
        body: "Most home lab problems are shell-shaped. The ones that are not tend to be a stuck dialog, and for those you want the actual screen.",
      },
      {
        title: "Works on a phone, on cellular",
        body: "Built to connect on strict mobile and carrier networks, so being away from Wi-Fi does not mean being locked out.",
      },
    ],
    sections: [
      {
        h2: "Where a Mac fits in a home lab",
        body: [
          "Most home labs are Linux, and then there is one Mac. It is there because something needs macOS: Xcode builds, iOS automation, Apple-only media tooling, Time Machine, or a service that simply runs better on the hardware you already own.",
          "That Mac is usually the odd one out. The tooling you use for the rest of the lab does not quite fit it, and the answer ends up being VNC over a VPN, or nothing at all.",
        ],
      },
      {
        h2: "The access problem, stated plainly",
        body: [
          "Your home router does not accept inbound connections. To reach anything behind it you either forward a port, run a VPN, or use an overlay network. Each is a real answer with a real cost, and the port forward carries the most risk because it puts a service on the public internet.",
          "Many people on CGNAT cannot forward a port at all, which removes the simplest option entirely.",
        ],
        bullets: [
          "Port forwarding exposes a service and needs a stable address.",
          "A VPN is another service to run, update, and troubleshoot.",
          "CGNAT can make inbound connections impossible regardless.",
        ],
      },
      {
        h2: "How Servey reaches it",
        body: [
          "The Mac runs a host app and registers to your account. Your iPhone or iPad signs in to the same account and sees it. On your home network the connection is direct; from outside, Servey establishes a private encrypted path between your two devices and is built to traverse strict networks, including CGNAT.",
          "There is nothing to configure on the router and nothing listening on a public address.",
        ],
      },
      {
        h2: "What it does not cover",
        body: [
          "Servey reaches Macs running its host app. It will not give you a console on your Linux boxes, your NAS, your switch, or anything else in the rack. It is one tool for one machine, not a replacement for however you manage the rest of the lab.",
          "It is pre-launch, so treat it as something to try alongside your existing setup rather than something to depend on yet.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need to open a port on my router?",
        a: "No. Servey does not use inbound connections to your network, so there is nothing to forward and nothing exposed on a public address.",
      },
      {
        q: "Does it work if my ISP uses CGNAT?",
        a: "Yes. Servey is built to establish a connection between your own devices even on strict carrier networks where inbound port forwarding is not possible.",
      },
      {
        q: "Can it reach my Linux machines too?",
        a: "No. Servey connects to Macs running its host app. The rest of your lab needs whatever you already use for it.",
      },
      {
        q: "Do I still need a VPN?",
        a: "Not for reaching your Mac through Servey. If you use a VPN for other machines on the network, that is unaffected either way.",
      },
      {
        q: "Can I use it now?",
        a: "Not yet. Servey is pre-launch. This page describes the app's design rather than anyone's experience running it, and the waitlist is open.",
      },
    ],
    keywords: [
      "mac home lab remote access",
      "access home mac from anywhere",
      "mac server remote control",
      "remote access without port forwarding",
      "home lab mac mini",
    ],
    relatedSlug: "who-is-servey-for-developers-home-labs",
  },
];

export function getUseCase(slug: string) {
  return useCases.find((u) => u.slug === slug);
}
