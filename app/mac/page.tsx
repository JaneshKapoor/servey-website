import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Clock, Monitor, ShieldCheck, TerminalSquare } from "lucide-react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Screenshot } from "@/components/device-frame";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WaitlistDialog } from "@/components/waitlist-dialog";
import { site, ogImage } from "@/lib/site";

/**
 * servey.in/mac - the Mac app's landing page.
 *
 * This URL is hardcoded in the iOS app as `OnboardingView.macDownloadURL` and
 * is offered three ways in the tour's fourth step: AirDrop, copy link, and open
 * in browser. Only the iPhone/iPad client ships through the App Store, so this
 * page is the ONLY route to the host - the half of the product that does the
 * work. It must never 404.
 *
 * Pre-launch it explains what the Mac app is and takes an email. When the DMG
 * exists, set `DOWNLOAD` below to its URL and the page becomes a download page:
 * the hero swaps its button, and the "what happens next" copy is already written
 * for both states.
 */
const DOWNLOAD: string | null = null;

const REQUIREMENTS = [
  "macOS 15.3 or later",
  "Apple silicon or Intel",
  "An iPhone or iPad on iOS or iPadOS 18.5 or later",
  "A Google account, used on both devices",
];

export const metadata: Metadata = {
  // Absolute: the root template appends " - Servey", which would render this
  // as "Servey for Mac - the host app - Servey".
  title: { absolute: "Servey for Mac - the host app" },
  description:
    "The Mac app is the half of Servey that does the work: it shares your screen and shell with your iPhone or iPad. Here is what it needs and when you can get it.",
  alternates: { canonical: `${site.url}/mac` },
  openGraph: {
    type: "website",
    url: `${site.url}/mac`,
    title: `Servey for Mac - ${site.name}`,
    description:
      "The Mac app is what your iPhone or iPad talks to. Requirements, what it does, and how to get it.",
    images: [ogImage],
  },
};

export default function MacPage() {
  return (
    <>
      <Header />
      <main id="main" className="container-page pb-24 pt-32">
        <div className="mx-auto max-w-3xl">
          <Badge className="border-accent/30 bg-accent-deep/60 text-accent-strong">
            <Clock className="size-3.5" />
            {DOWNLOAD ? "Available now" : "Coming soon"}
          </Badge>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            Servey for Mac
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            If you arrived here from the iPhone or iPad app, this is the piece it was
            asking for. That app is the remote. <strong className="text-fg">This</strong>{" "}
            is what it talks to - the app that runs on the Mac you want to reach, shares
            its screen, and hands you a real shell on it.
          </p>

          {DOWNLOAD ? (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <a href={DOWNLOAD}>
                  Download for Mac
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <span className="text-sm text-muted">
                Apple silicon and Intel - macOS 15.3 or later
              </span>
            </div>
          ) : (
            <div className="mt-8">
              <WaitlistDialog source="mac-page">
                <Button size="lg">
                  Tell me when the Mac app is ready
                  <ArrowRight className="size-4" />
                </Button>
              </WaitlistDialog>
            </div>
          )}

          <div className="mt-14">
            <Screenshot name="mac-host-ui" sizes="(max-width: 768px) 100vw, 768px" />
            <p className="mt-3 text-center text-xs text-muted">
              The Mac app. Grant two permissions, press Go Online, and your Mac is
              reachable by your own devices - private until you do.
            </p>
          </div>

          <h2 className="mt-16 text-2xl font-semibold tracking-tight text-fg">
            Why there are two apps
          </h2>
          <p className="mt-3 leading-relaxed text-muted">
            A Mac cannot share its screen or run your shell because a phone asked it
            to nicely. Something has to be running on the Mac itself, with your
            permission, to capture the display, inject real mouse and keyboard events,
            and open a terminal session. That is this app. It is why Servey is a pair
            rather than a single download, and it is why the App Store only carries
            half of it.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-fg">
            What it does on your Mac
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Monitor,
                title: "Shares the screen",
                body: "Hardware-encoded HEVC on your own network, so text stays sharp enough to read when you pinch to zoom.",
              },
              {
                icon: TerminalSquare,
                title: "Runs your sessions",
                body: "Named tmux sessions that keep going after you disconnect, and can be reattached from any terminal on the Mac.",
              },
              {
                icon: ShieldCheck,
                title: "Holds the keys",
                body: "Your master password lives here and never leaves. Every new device waits for you to approve it on this machine.",
              },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-surface/40 p-5">
                <f.icon className="size-5 text-accent-strong" />
                <h3 className="mt-3 text-sm font-semibold text-fg">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.body}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-fg">
            What you will need
          </h2>
          <ul className="mt-5 space-y-2.5">
            {REQUIREMENTS.map((r) => (
              <li key={r} className="flex gap-2.5 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-accent-strong" />
                <span className="text-fg">{r}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            The macOS 15.3 requirement is a genuinely narrow window and it will exclude
            some Macs. Worth checking now rather than after you have waited for us -
            the version is in the Apple menu, under About This Mac.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-fg">
            What happens when you install it
          </h2>
          <ol className="mt-5 space-y-4">
            {[
              "Open the .dmg and drag Servey to Applications, the way you would any Mac app.",
              "Sign in with the same Google account you used on your iPhone or iPad. That pairing is what connects the two.",
              "Set a master password. Every device has to produce it before it can connect, and there is deliberately no way to skip it or reset it remotely.",
              "Grant Screen Recording and Accessibility. macOS asks because mirroring a screen and moving a cursor are exactly what those two permissions govern.",
              "Press Go Online. Your Mac appears on your iPhone or iPad, you approve the device once, and you are in.",
            ].map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent-deep font-mono text-xs font-semibold text-accent-strong">
                  {i + 1}
                </span>
                <span className="pt-1 text-sm leading-relaxed text-muted">{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-14 rounded-2xl border border-border bg-surface/40 p-6">
            <h2 className="text-lg font-semibold tracking-tight text-fg">
              While you wait
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              If you want to know what you are getting into, the{" "}
              <Link href="/#how-it-works" className="text-accent-strong underline underline-offset-2">
                how it works
              </Link>{" "}
              section walks the whole setup, and{" "}
              <Link
                href="/blog/headless-mac-mini-setup"
                className="text-accent-strong underline underline-offset-2"
              >
                our headless Mac mini guide
              </Link>{" "}
              is worth reading first if the Mac you are reaching lives on a shelf
              without a monitor. What we collect, and what we never see, is in the{" "}
              <Link href="/privacy" className="text-accent-strong underline underline-offset-2">
                privacy policy
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
