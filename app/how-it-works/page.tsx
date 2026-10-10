import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Check, MonitorSmartphone, ShieldCheck, TerminalSquare } from "lucide-react";
import { Screenshot } from "@/components/device-frame";
import { site, ogImage } from "@/lib/site";

/**
 * servey.in/how-it-works - linked from the iPad app's Account screen.
 *
 * **This page is in scope for App Store Review, and that governs everything
 * about it.** An iOS app may not point its users at a non-Apple payment route
 * (App Store Review Guidelines 3.1.3 and 4.8), and the link lives inside the
 * app, so this page must not mention prices, tiers, billing or purchasing, and
 * must not link to any page that does. That rules out the header, the footer
 * and the wordmark as well: the shared header carries nav to #pricing and a
 * waitlist button, the shared footer links to pricing, and the wordmark links
 * to the homepage, which sells. All three are replaced here with local,
 * link-light versions. The homepage, /mac and /blog are all deliberately
 * unlinked.
 *
 * Before changing anything on this page, re-read that paragraph. A 404 or a
 * stray price link here is a rejected submission, not a copy bug.
 */

export const metadata: Metadata = {
  title: { absolute: "How Servey works" },
  description:
    "Servey is two apps: one on your Mac, one on your iPhone or iPad. Here is how they pair, what a session looks like, and how the connection is made.",
  alternates: { canonical: `${site.url}/how-it-works` },
  openGraph: {
    type: "website",
    url: `${site.url}/how-it-works`,
    title: `How Servey works - ${site.name}`,
    description:
      "Two apps, one pairing. How Servey mirrors your Mac's screen and gives you its terminal on an iPhone or iPad.",
    images: [ogImage],
  },
};

const STEPS = [
  {
    title: "Install the Mac app on the Mac you want to reach",
    body: "Servey has two halves and this is the one that does the work. A Mac cannot share its screen or run your shell because a phone asked it to - something has to be running on the Mac itself, with your permission, to capture the display, move the cursor and open a terminal.",
  },
  {
    title: "Sign in with the same Google account on both",
    body: "That shared sign-in is the entire pairing step. There is no code to type, no IP address to find, and nothing to configure on your router.",
  },
  {
    title: "Set a master password on the Mac",
    body: "It is set on the Mac and it stays there. Every device has to produce it before it can connect, and there is deliberately no way to reset it remotely - not by us, not by anyone who reaches your account.",
  },
  {
    title: "Grant Screen Recording and Accessibility",
    body: "macOS asks for these because mirroring a screen and moving a cursor are exactly what those two permissions govern. Servey cannot work without them, and you can withdraw them in System Settings at any time.",
  },
  {
    title: "Press Go Online, then approve the device once",
    body: "Your Mac appears on the iPhone or iPad. The first time a new device asks to connect, you approve it on the Mac itself - so a device you do not recognise never gets in, even with the password.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Deliberately not <Header />: that one links to pricing. The wordmark
          is not a link here either, because it would lead to the homepage. */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-bg/70 backdrop-blur-xl">
        <div className="container-page flex h-16 items-center">
          <span className="inline-flex items-center gap-2.5 text-lg font-semibold tracking-tight text-fg">
            <Image
              src="/brand/servey-logo-512.png"
              alt="Servey logo"
              width={28}
              height={28}
              priority
              className="size-7 rounded-[7px] ring-1 ring-white/10"
            />
            Servey
          </span>
        </div>
      </header>

      <main id="main" className="container-page pb-24 pt-32">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-strong">
            How it works
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Your Mac, on the screen in your hand.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Servey is two apps that work as a pair. One runs on the Mac you want to
            reach. The other runs on your iPhone or iPad and acts as the remote. Once
            they are signed in to the same account, the Mac shows up on the smaller
            device and you can see its screen and use its terminal as though you were
            sitting at it.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: MonitorSmartphone,
                title: "See the screen",
                body: "The Mac's display, mirrored live. Pinch to zoom in on something small; text stays sharp enough to read rather than dissolving into blocks.",
              },
              {
                icon: TerminalSquare,
                title: "Use the terminal",
                body: "A real shell on the Mac, not a simulation. Named sessions keep running after you disconnect, so a long job survives you closing the app.",
              },
              {
                icon: ShieldCheck,
                title: "Stay in control",
                body: "Your screen is shared with your own devices and nobody else's. Every new device waits for you to approve it on the Mac first.",
              },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-surface/40 p-5">
                <f.icon className="size-5 text-accent-strong" />
                <h2 className="mt-3 text-sm font-semibold text-fg">{f.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.body}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-16 text-2xl font-semibold tracking-tight text-fg">
            Setting it up
          </h2>
          <p className="mt-3 leading-relaxed text-muted">
            Five steps, once, and most of them are macOS asking your permission rather
            than anything Servey makes you configure.
          </p>
          <ol className="mt-7 space-y-5">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent-deep font-mono text-xs font-semibold text-accent-strong">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-fg">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12">
            <Screenshot name="mac-host-ui" sizes="(max-width: 768px) 100vw, 768px" />
            <p className="mt-3 text-center text-xs text-muted">
              The Mac app. Grant two permissions, press Go Online, and the Mac becomes
              reachable by your own devices - private until you do.
            </p>
          </div>

          <h2 className="mt-16 text-2xl font-semibold tracking-tight text-fg">
            What a session looks like
          </h2>
          <p className="mt-3 leading-relaxed text-muted">
            Open the app on your iPhone or iPad, pick the Mac, and you are connected.
            Screen mirroring and the terminal are two tabs of the same session, so you
            can read an error in a window and then go and fix it in a shell without
            reconnecting.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <Screenshot name="mirroring-ipad" sizes="(max-width: 640px) 100vw, 380px" />
              <p className="mt-3 text-center text-xs text-muted">
                Connected from an iPad - screen sharing and terminal in one session.
              </p>
            </div>
            <div>
              <Screenshot name="terminal" sizes="(max-width: 640px) 100vw, 380px" />
              <p className="mt-3 text-center text-xs text-muted">
                A real shell on the Mac, with an on-screen row for the keys a software
                keyboard does not have.
              </p>
            </div>
          </div>

          <h2 className="mt-16 text-2xl font-semibold tracking-tight text-fg">
            How the connection is made
          </h2>
          <p className="mt-3 leading-relaxed text-muted">
            On the same Wi-Fi, the two devices talk directly to each other and the
            video never leaves your network. From anywhere else, Servey tries a direct
            peer-to-peer connection first and falls back to our own relay when a
            network refuses to allow one. The stream is encrypted either way, and the
            relay carries it without being able to read it.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Your Mac is not reachable until you press Go Online, and it stops being
            reachable when you press it again. There is no always-on service waiting in
            the background for someone to find.
          </p>

          <h2 className="mt-16 text-2xl font-semibold tracking-tight text-fg">
            What you need
          </h2>
          <ul className="mt-5 space-y-2.5">
            {[
              "A Mac running macOS 14 (Sonoma) or later - Apple silicon or Intel",
              "An iPhone or iPad running iOS or iPadOS 17 or later",
              "A Google account, used to sign in on both",
              "Both devices awake, with the Mac online",
            ].map((r) => (
              <li key={r} className="flex gap-2.5 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-accent-strong" />
                <span className="text-fg">{r}</span>
              </li>
            ))}
          </ul>

          <div className="mt-14 rounded-2xl border border-border bg-surface/40 p-6">
            <h2 className="text-lg font-semibold tracking-tight text-fg">
              What we can and cannot see
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Your screen and your keystrokes travel between your own two devices,
              encrypted. Your master password never leaves the Mac in a form anyone
              could reuse. The record of what connected and when is kept on your Mac,
              where you can read it and clear it. The full detail of what we collect,
              and what we never see, is in our{" "}
              <Link href="/privacy" className="text-accent-strong underline underline-offset-2">
                privacy policy
              </Link>
              .
            </p>
          </div>
        </div>
      </main>

      {/* Deliberately not <Footer />: that one links to pricing too. */}
      <footer className="border-t border-border py-10">
        <div className="container-page flex flex-col items-center gap-3 text-center">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Servey. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs">
            <Link href="/privacy" className="text-muted transition-colors hover:text-fg">
              Privacy
            </Link>
            <Link href="/terms" className="text-muted transition-colors hover:text-fg">
              Terms
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="text-muted transition-colors hover:text-fg"
            >
              {site.email}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
