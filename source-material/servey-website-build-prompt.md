# BUILD PROMPT — Servey Marketing Website (servey.in)

> Paste this entire document to a fresh Claude Opus 4.8 agent. It is the complete
> brief to design and build Servey's marketing/landing website. Everything the
> agent needs — product facts, brand, copy, structure, tech, and deliverables —
> is here. Where you see `‹PASTE …›`, the human will drop in extra material
> (screenshots, getdesign.md tokens). Ask before inventing facts not in this doc.

---

## 0. ROLE & OBJECTIVE

You are a senior product designer + front-end engineer. Build a **premium,
production-ready marketing website** for **Servey** — a native app that lets
people control their Mac from an iPhone or iPad. The site's jobs, in order:

1. Instantly communicate what Servey is and why it's better than the alternatives.
2. Showcase every feature beautifully, with device screenshots.
3. Capture **email waitlist** signups (pricing is "Coming soon").
4. Feel Apple-grade: calm, confident, fast, with subtle, classy motion.

Ship a Next.js app that deploys cleanly to Vercel on the domain **servey.in**.

---

## 1. PRODUCT BRIEF — WHAT SERVEY IS (source of truth for all copy)

**One-liner:** Servey turns your iPhone or iPad into a crystal-clear, low-latency
window into your Mac — full screen mirroring, mouse, keyboard, and a real
terminal — over your local network or from anywhere in the world.

**Category:** Native remote desktop / remote access for the Apple ecosystem
(competitors: Jump Desktop, Screens, TeamViewer, VNC/RDP, Chrome Remote Desktop,
and the closest analog, macky.dev). Servey is Apple-first and built in
Swift/SwiftUI — not an Electron or Java port.

**How it works (two intelligent streaming paths — a key differentiator):**
Servey automatically picks the best path based on where your devices are.

- **On the same Wi-Fi (LAN path):** a custom **hardware HEVC** stream (Apple
  VideoToolbox + ScreenCaptureKit) sent over a direct connection and decoded
  natively on iOS. This is the "crystal-clear" path — razor-sharp text, high
  frame rate, minimal latency. No cloud in the middle.
- **On different networks (Remote path):** a peer-to-peer **WebRTC** connection
  (hardware H.264), with only the initial handshake brokered through the cloud.
  **Your screen video never touches a server.** NAT traversal (STUN/TURN) makes
  it work even on strict mobile/CGNAT networks. Quality adapts automatically to
  the connection (direct vs relayed).

**Feature set (all built and working):**
- Full-HD+ **screen mirroring**, aspect-correct, with **pinch-to-zoom** to inspect detail.
- **Mouse control:** move, left/right click, drag, scroll.
- **On-screen virtual trackpad / mouse** — relative-move pad that reaches every screen edge, with L/R buttons and a scroll control.
- **Full keyboard:** typing plus ⌘C / ⌘V / Esc / Tab / Return and Backspace.
- **Native terminal** — a real shell on your Mac, over either path.
- **Draggable, collapsible control dock** so controls never block the screen.
- **Adaptive quality** — automatically tunes resolution/bitrate to the live network path without cropping or degrading the picture.
- **Private & account-scoped:** sign in with Google on both devices; Servey only ever pairs *your* Mac with *your* iPhone/iPad. Device registration/approval.
- **Works across any network** using the same account — no VPN setup, no port forwarding.
- **Keep-Mac-awake** so the host stays reachable.
- Dark, focused UI with a signature neon-green accent.

**Who it's for:** developers, power users, and creators who want their Mac's full
desktop + terminal in their pocket — to fix a build from the couch, run a script
from a café, grab a file on the train, or drive a headless Mac Mini.

**Why it's different from "traditional" remote tools (use this for the comparison
section and the About PDF):**

| Theme | Traditional (VNC/RDP, TeamViewer, generic) | Servey |
|---|---|---|
| Build | Cross-platform Electron/Java ports, generic UI | Native Swift/SwiftUI, Apple-first, designed for touch |
| Local quality | Software-encoded, soft text, laggy | Hardware **HEVC** on LAN — crystal-clear, native decode |
| Networking | Manual VPN / port forwarding / accounts on a vendor's servers | Auto LAN-or-remote; same-account pairing; zero setup |
| Privacy | Video often relayed through vendor cloud | **P2P** — video never touches a server; cloud only brokers the handshake |
| Terminal | Add-on or absent | Real terminal built in, both paths |
| Touch UX | Desktop cursor bolted onto a phone | Purpose-built virtual trackpad, dock, pinch-zoom |
| Adaptivity | Fixed or clumsy quality | Path-aware adaptive quality, no cropping |

Keep this honest and specific; do not overclaim benchmarks or numbers we haven't
given you.

---

## 2. BRAND & DESIGN DIRECTION

**Mood:** Apple-keynote calm meets developer-grade precision. Premium, minimal,
lots of negative space, big confident type, and *subtle* motion that rewards
scrolling without ever feeling gimmicky. Think Linear / Vercel / Raycast polish.

**Primary theme: DARK.** (Servey's app is dark with a neon-green accent, and
reactbits motion reads best on dark. Build a light variant only if trivial; dark
is the hero.) Ship with a clean theme toggle if time allows, dark as default.

**Color system (define as CSS variables / Tailwind theme tokens):**
- Background: near-black, layered — e.g. base `#0A0B0D`, elevated surface `#111317`, hairline borders `rgba(255,255,255,0.08)`.
- Text: high-contrast off-white `#F4F6F8`, muted `#9BA1A8`.
- **Brand accent (Servey neon green): `#22DC6E`** — use for CTAs, active states, key highlights, focus rings, and one or two glow/gradient moments. Do NOT flood the page with it; it should feel electric because it's rare.
- Accent support: a deeper green `#12321F` for tinted surfaces; optional subtle cyan/emerald gradient partner for hero aurora.
- Semantic: success uses the brand green; keep everything else neutral.

**Typography:** a clean geometric/grotesk sans (e.g. Inter, Geist, or SF-like via
`next/font`). Very large hero headline (clamp ~48–88px), tight leading, medium
weight; generous body at 16–18px, muted. Use numbered section labels (`01 / 02 /
03`) like macky.dev for scannability. Optional monospace (Geist Mono / JetBrains
Mono) for terminal snippets and technical accents.

**Layout language:** wide, centered max-width (~1200px) content; deep vertical
rhythm between sections; alternating left/right feature blocks pairing copy with a
device screenshot; hairline dividers; soft, large corner radii (16–24px) on cards
and device frames; tasteful shadows/glows only on dark.

**Motion (subtle, performant — prefer Framer Motion + CSS):**
- Scroll-reveal fade/rise on section entry (small y-offset, 300–500ms, ease-out, once).
- Hero: a slow, low-opacity aurora/gradient glow behind the headline; a shiny/gradient text sweep on the product name is OK once.
- Buttons: soft scale + green glow on hover; magnetic/pointer-follow only on the primary hero CTA.
- Device mockups: gentle parallax/tilt on scroll or pointer; never distracting.
- Comparison table + feature cards: staggered reveal.
- Respect `prefers-reduced-motion` everywhere (disable non-essential motion).

**getdesign.md tokens:** `‹PASTE getdesign.md HERE — colors, fonts, spacing, and
any component/animation specs it defines. Treat those as overrides that WIN over
the defaults above where they conflict.›`

**Reference — macky.dev:** match its structure and clarity (sticky nav; bold hero
with dual CTA; numbered alternating feature sections; a competitor comparison
table; minimal footer) but make Servey feel **more premium and more animated**,
and **dark** rather than white. Do not copy their copy or assets.

---

## 3. TECH STACK & SETUP

- **Next.js (latest, App Router) + TypeScript.**
- **TailwindCSS** for styling; design tokens in the Tailwind theme.
- **shadcn/ui** for accessible primitives (Button, Input, Dialog, Accordion for FAQ, Sonner/Toast for waitlist feedback, NavigationMenu, Card, Badge).
- **reactbits.dev** for select animated components (copy-in components — pick a *curated few*, don't overuse): e.g. an aurora/gradient hero background, shiny/gradient text for the wordmark, scroll-reveal wrappers, a subtle marquee for a logo/feature strip, a tilt/spotlight card. Keep it classy.
- **Framer Motion** for scroll reveals and micro-interactions.
- **lucide-react** for icons.
- Fonts via **`next/font`** (self-hosted, no layout shift).
- **Deployment:** Vercel; configure for custom domain **servey.in** (note DNS steps in the README).
- Structure with the App Router: a single-page landing (`/`) composed of section
  components under `components/sections/`, plus routes for `/privacy`, `/terms`,
  and a `/api/waitlist` route handler. Keep components small and typed.

---

## 4. INFORMATION ARCHITECTURE (page order, top → bottom)

1. **Sticky header / nav** — Servey wordmark (neon-green dot/mark), anchor links
   (Features, How it works, Compare, FAQ), and a primary **"Join waitlist"**
   button. Condenses/blurs background on scroll. Mobile: clean sheet menu.

2. **Hero** — headline + subhead + dual CTA + a large device mockup.
   - **Hero headline (final): "Your Mac. In your pocket."** Set in the largest
     type scale. The word **"pocket"** (or the whole line) may get a one-time
     shiny/gradient neon-green text sweep on load — subtle, not looping.
   - Subhead: *"Servey mirrors your Mac to your iPhone and iPad with full mouse,
     keyboard, and a real terminal — hardware-accelerated on your network, private
     peer-to-peer anywhere else."*
   - CTAs: **"Join the waitlist"** (primary, opens waitlist) + **"See how it
     works"** (secondary, scrolls to How-it-works).
   - Visual: iPad in landscape showing a Mac desktop, with an iPhone beside it
     showing the control dock. Aurora glow behind. `‹SCREENSHOT: hero-devices›`.

3. **Trust / at-a-glance strip** — 3–4 quick value props with icons: *Crystal-clear
   HEVC · Real terminal · Private P2P · Works anywhere.* (Subtle marquee or static row.)

4. **Feature sections (numbered 01…, alternating left/right)** — each: a short
   eyebrow label, a bold title, 1–2 sentence description (draw from §1), and a
   device screenshot in a frame. Build these:
   - **01 — Crystal-clear screen mirroring.** Hardware HEVC on your network; razor-sharp text, high frame rate, pinch-to-zoom to inspect. `‹SCREENSHOT: mirroring-ipad›`
   - **02 — Real mouse, keyboard & trackpad.** A purpose-built on-screen trackpad that reaches every edge, L/R click, scroll, and full keyboard incl. ⌘C/⌘V. `‹SCREENSHOT: iphone-controls›`
   - **03 — A real terminal, in your pocket.** Full shell access to your Mac over either path. `‹SCREENSHOT: terminal›`
   - **04 — Two paths, zero thought.** LAN HEVC when you're close, private WebRTC when you're not — Servey switches automatically. (Consider a small animated diagram: iPhone ⇄ Mac, "same network" vs "anywhere".) `‹SCREENSHOT or DIAGRAM: dual-path›`
   - **05 — Private by design.** Account-scoped pairing; on remote, video is peer-to-peer and never touches a server. `‹ICON/ILLUSTRATION›`
   - **06 — Adaptive quality, full frame.** Quality tunes to the network without ever cropping your screen. `‹SCREENSHOT: quality-closeup›`

   **↳ Statement interstitial (animated, un-numbered) — SECOND HEADLINE.** A
   full-bleed, near-viewport-height breather placed here (mid-scroll, after the
   feature blocks). Large centered type that animates in on scroll:
   **"Control your Mac from anywhere — crystal clear."** Animate it word-by-word
   (staggered rise/fade) or as a left-to-right gradient/mask text sweep in the
   neon green, revealing as it enters the viewport (once; respect
   `prefers-reduced-motion`). Minimal supporting line optional; faint aurora glow
   behind. This is the emotional counterpart to the hero headline — give it room
   and let the motion carry it.

5. **How it works — 3 steps.** *Sign in on both devices → your Mac appears →
   tap to connect and control.* Simple numbered cards, subtle reveal.

6. **Comparison table** — "Servey vs traditional remote tools." Use the table in
   §1. Columns: Servey (highlighted, green check accents) vs Traditional
   (VNC/RDP/TeamViewer). Clean, scannable, staggered reveal.

7. **Download the one-pager** — a card offering the **"About Servey" PDF**
   (see §7): what it is, how it works, how it's different. Button downloads the PDF.

8. **Pricing — "Coming soon."** A calm section: a single card or headline that
   says pricing is on the way, with the **waitlist email form** as the CTA
   ("Be first to know — join the waitlist"). No fake prices.

9. **Waitlist section / modal** — prominent email capture (see §5). Success state
   with a friendly toast + inline confirmation.

10. **FAQ** — shadcn Accordion. Seed questions: *Do I need the same network? Is it
    secure/private? Does it work over cellular? Which devices are supported
    (Mac + iPhone/iPad)? Do I need to configure a VPN or port forwarding? When is
    it launching / how much will it cost?*

11. **Footer** — wordmark, tagline, anchor nav, **Privacy** + **Terms** links,
    contact email, copyright. Subtle top hairline. `servey.in`.

---

## 5. WAITLIST (email capture) — REQUIRED

Pricing is "Coming soon," so the waitlist is the site's primary conversion.

- A reusable `WaitlistForm` (email input + submit) used in the hero CTA (as a
  dialog), the pricing section, and the footer.
- Validate email client-side; show inline errors; disable while submitting;
  success → toast + persistent "You're on the list ✅" state; handle duplicates
  gracefully.
- **Backend — recommended (Servey already uses Firebase):** a Next.js Route
  Handler `POST /api/waitlist` that writes `{ email, createdAt, source, userAgent }`
  to a Firestore `waitlist` collection using the Firebase Admin SDK, with server
  env vars (`FIREBASE_*`). De-dupe by email (doc id = normalized email).
- **Zero-backend fallback if Firebase creds aren't provided:** wire the form to
  **Formspree** or **Resend** via an env-configured endpoint. Make the provider
  swappable behind the one route handler; never hardcode secrets — read from
  `.env.local` and document them in the README.
- Basic anti-spam: honeypot field + simple rate-limit on the route.

---

## 6. SCREENSHOT PLACEHOLDERS — leave space, don't fake UI

Do NOT mock up fake Servey screens. For every product image, render a **styled
placeholder** inside the correct **device frame** (iPad landscape, iPhone,
Mac window) at the right aspect ratio, with a subtle "Screenshot coming" label and
a **real, descriptive `alt`**. Make each easy to swap later (e.g. drop files into
`/public/screenshots/` and reference by a typed map). Provide these slots:

| Key | Frame / ratio | alt text |
|---|---|---|
| `hero-devices` | iPad landscape + iPhone, ~16:10 | "Servey on iPad and iPhone — a Mac desktop mirrored to the iPad with the control dock on the iPhone" |
| `mirroring-ipad` | iPad landscape, 16:10 | "A Mac desktop mirrored full-screen on an iPad through Servey, with crisp, aspect-correct text" |
| `iphone-controls` | iPhone portrait, 19.5:9 | "Servey's on-screen trackpad, click buttons, and control dock on an iPhone" |
| `terminal` | iPhone or iPad, device ratio | "A live macOS terminal session running inside Servey on iPhone" |
| `dual-path` | wide diagram, 16:9 | "Diagram: Servey streams HEVC on the local network and private peer-to-peer WebRTC across the internet" |
| `quality-closeup` | crop, 4:3 | "Close-up showing razor-sharp remote text with no cropping at adaptive quality" |
| `mac-host-ui` | Mac window, 16:10 | "Servey's Mac host app with its dark, neon-green connect screen" |

Human will provide real captures from Mac, iPhone, and iPad later:
`‹SCREENSHOTS TO BE PROVIDED›`.

---

## 7. "ABOUT SERVEY" PDF (downloadable one-pager)

Produce a clean, branded **PDF** (dark or light, on-brand, ~1–3 pages) covering:
what Servey is, the two streaming paths (with the simple diagram), the full
feature list, and the "how it's different from traditional tools" comparison from
§1. Source all content from this brief — no new claims. Implement by rendering a
styled HTML page (route `/about-pdf` or a print stylesheet) and either exporting to
PDF at build time or providing a "Download / Print to PDF" button; place the final
file at `/public/servey-about.pdf` and link it from the §4.7 card and the footer.

---

## 8. QUALITY BAR

- **Responsive:** flawless from 360px phones to wide desktops; device mockups and the comparison table must never cause horizontal overflow (scroll internally if needed).
- **Accessibility:** semantic landmarks, keyboard-navigable, visible focus rings (brand green), sufficient contrast, `alt` on all images, `prefers-reduced-motion` honored, forms labeled.
- **Performance:** Lighthouse ≥ 95; `next/image` for all art; `next/font`; lazy-load below-the-fold and heavy animation; no CLS.
- **SEO/meta:** title, description, Open Graph + Twitter cards (with an OG image), favicon, `sitemap.xml`, `robots.txt`, canonical `https://servey.in`, JSON-LD SoftwareApplication.
- **Code:** typed, componentized, no dead deps; a `README.md` with setup, env vars, and the Vercel + `servey.in` DNS steps; `.env.example`.

---

## 9. DELIVERABLES CHECKLIST

- [ ] Next.js + TS + Tailwind + shadcn project, dark-first, brand tokens wired.
- [ ] All sections in §4, with real polished copy from §1 and beautiful, subtle motion.
- [ ] Working waitlist (Firebase route handler + Formspree/Resend fallback), validated, with success/dup states.
- [ ] Device-framed screenshot placeholders with correct ratios + alt text (§6).
- [ ] "About Servey" downloadable PDF (§7).
- [ ] Pricing = "Coming soon" tied to the waitlist.
- [ ] Privacy + Terms pages (stubs OK, on-brand).
- [ ] SEO/meta, OG image, sitemap, robots, favicon.
- [ ] README with setup, env vars, and servey.in deployment steps; `.env.example`.
- [ ] Lighthouse ≥ 95, reduced-motion respected, no horizontal overflow.

**Locked decisions (do not re-litigate):** dark theme with the neon-green
(`#22DC6E`) accent; hero headline is **"Your Mac. In your pocket."**; the second
headline **"Control your Mac from anywhere — crystal clear."** is the animated
mid-scroll statement interstitial (§4). Both headlines must appear.

**Before you start:** propose the section-by-section plan and the
component/library list, and note anything in this brief you'd refine. Ask about
any missing asset (screenshots, getdesign.md tokens) rather than inventing product
facts.
