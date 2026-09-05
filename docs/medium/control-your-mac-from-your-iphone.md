# How to Control Your Mac From Your iPhone or iPad - Without a VPN or Port Forwarding

### Why we built Servey: crystal-clear screen mirroring and a real terminal, built natively for Apple. Launching soon.

---

> **IMAGE 1 - hero.** Use `public/screenshots/hero-devices.png`
> Caption: *Servey on iPad and iPhone - a Mac desktop mirrored to the iPad with the control dock on the iPhone.*

---

There is a specific kind of frustration that only happens to people who own a Mac.

You are away from your desk. Something needs your attention on that Mac - a build that failed, a render that stalled, a file you need, an agent that has been chewing on a task for forty minutes and has now stopped to ask you a yes-or-no question. Your iPhone is in your hand. Your Mac is nine feet away, or nine hundred miles away. It makes no difference. You cannot reach it.

So you try the existing options.

You start with Apple's own tools, because they are already installed. macOS Screen Sharing works beautifully - right up to the edge of your local network, where it stops. Apple Remote Desktop is a paid admin tool built for managing labs of machines, not for reaching your own. Neither traverses the internet on its own, which is the exact thing you needed.

So you set up a VPN, and now you are maintaining a VPN. Or you forward a port on your router, and now you have opened a hole in your home network and you are not entirely sure how big it is.

You try the dedicated apps. Screens and Jump Desktop are genuinely good VNC and RDP clients, and both are Mac-native - but they are screen tools, so when the fix is a shell command you are typing it through a mirrored on-screen keyboard. Splashtop, TeamViewer and AnyDesk are built cross-platform, which means a mouse cursor bolted onto a touchscreen and your Mac's text rendered as a soft grey smear. Or you go the other way and install an SSH client like Termius or Blink Shell - a beautiful terminal, and no way at all to see the screen. The moment the problem is a permission dialog rather than a command, you are stuck again.

Every one of these tools works. Each was designed for a different job than the one you are doing, which is reaching your own Mac, from your own phone, and needing whichever surface the problem happens to live on.

That is the gap Servey was built to close.

## What Servey is

Servey is a native Apple app in two halves: a host that runs on your Mac, and a client that runs on your iPhone and iPad. Install both, sign in with Google on each, and your Mac appears on your phone. That is the entire setup. No VPN. No port forwarding. No router configuration. No vendor account to provision.

Once connected, you get two things, not one.

---

> **IMAGE 2 - the session screen.** Use `public/screenshots/interfacepage.png`
> Caption: *Connect once, choose your tool. Screen Sharing and Terminal are both first-class, over either connection path.*

---

**Crystal-clear screen mirroring.** On your local network, Servey streams a hardware-encoded HEVC feed of your Mac's display. That matters more than it sounds. Text stays razor-sharp at a high frame rate with minimal latency, and you can pinch to zoom in and inspect the smallest detail on screen. Nothing is cropped and nothing is downscaled to fit - you get your whole Mac, aspect-correct.

**A real terminal.** Not a web console. Not an add-on. A genuine shell on your Mac, available over both connection paths, with the keys that actually matter surfaced where your thumbs are: Esc, Tab, Ctrl, arrows, Ctrl-C, pipe, tilde, slash. You can fix a build from the couch, tail a log on a train, or drive a headless Mac mini from another country.

---

> **IMAGE 3 - the terminal.** Use `public/screenshots/terminal.png`
> Caption: *A genuine macOS shell running on an iPad, reaching a Mac mini. Note the dedicated key row - Esc, Tab, Ctrl, arrows, Ctrl-C - because a shell without those keys is not a shell.*

---

Most remote tools treat the terminal as an afterthought, if they include it at all. Most terminal apps have no concept of a screen. Servey treats both as the point, because in practice you switch between them constantly. You SSH in to check a process, realise the problem is a permissions dialog nobody dismissed, and switch to the screen to click it. One app. One connection. One tap between them.

## Two network paths, and you never pick one

This is the part we spent the most time on, and it is the part users will never think about - which is the goal.

**Same Wi-Fi?** Servey opens a direct hardware-HEVC stream between your devices. No cloud in the middle, and the sharpest picture we can produce.

**Different networks?** It falls back to a private peer-to-peer WebRTC connection between your Mac and your phone, using STUN and TURN traversal so it still connects on strict mobile and carrier networks - including CGNAT, where a lot of tools simply give up.

It switches automatically. You never choose a mode, toggle a setting, or find out mid-session that you picked the wrong one. You tap your Mac, and it connects by whichever route is available.

## Private by design

Your screen is not our business model.

Servey pairs only your Mac with your own iPhone or iPad, scoped to your own account. On top of that you set a master password on the Mac that every device must produce, each new device waits for you to approve it on the Mac itself, and you can revoke any device at any time. On the remote path, your screen video travels peer-to-peer and end-to-end encrypted between your two devices, and our cloud only brokers the initial handshake. When a network refuses to allow a direct connection, the encrypted stream is relayed through our own server rather than a third party's cloud.

That is a deliberate architectural choice with a real cost to us, and we made it because "your desktop is relayed through a vendor's datacentre" is a sentence that should make anyone uncomfortable.

---

> **IMAGE 4 - real work, real quality.** Use `public/screenshots/quality-closeup.png`
> Caption: *A live coding agent session on the Mac, mirrored through Servey. Fully legible, nothing cropped - this is what "razor-sharp" actually has to mean.*

---

## Who this is for

We built Servey for ourselves first, and then found we were not alone.

**Developers** who want to check on a long-running build, restart a stuck process, or approve an AI coding agent's next step without walking back to the desk. If you run Claude Code, Cursor, or any agent that pauses to ask permission, you know exactly how much of your day is spent walking back to the desk.

**Home lab and headless Mac mini owners** running a Mac as a server with no monitor, no keyboard, and no interest in buying either.

**Anyone with a Mac and a phone** who has ever needed a file, a screenshot, or one click, and had to wait until they got home.

## Built natively, on purpose

Servey is written in Swift and SwiftUI for macOS, iOS and iPadOS. It is not an Electron shell, not a Java port, not a web app in a native wrapper.

This is not aesthetics. It is why hardware HEVC encoding and native decode are available to us at all, why the touch controls behave like touch controls rather than a mouse pointer someone attached to a finger, and why the app launches instantly and does not sound like a jet engine. Cross-platform frameworks give you five platforms and a compromise on each. We picked one ecosystem and went deep.

## Pricing

Simple, monthly, cancel anytime.

| Plan | India | International |
|---|---|---|
| **Terminal** - a genuine shell on your Mac | ₹99/month | $1.99/month |
| **Full access** - screen mirroring plus terminal | ₹299/month | $4.49/month |

We priced it this way on purpose. Remote access to your own machine should not cost more than a streaming subscription, and if all you need is the shell, you should not have to pay for the rest.

You will not be charged until Servey launches.

## Servey is launching soon

Servey is in final development and heading to the App Store.

**Join the waitlist at [servey.in](https://servey.in)** and we will email you the moment it is ready. No spam, no drip sequence, no charge until launch - one email, when there is something to open.

Your Mac. In your pocket.

---

*Servey is a native remote access app for the Apple ecosystem - screen mirroring and a real terminal for your Mac, from your iPhone and iPad. Learn more at [servey.in](https://servey.in).*
