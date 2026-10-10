import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Clock, Download, Monitor, ShieldCheck, TerminalSquare } from "lucide-react";
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
 * Shipping since 9 Oct 2026. `DOWNLOAD` is the URL the Mac app itself has
 * hardcoded for its update check, so the page and the app agree by
 * construction - do not point this at a mirror or a redirect.
 */
const DOWNLOAD: string | null = "https://servey.in/download/Servey.dmg";

/**
 * Read off MACOSX_DEPLOYMENT_TARGET and IPHONEOS_DEPLOYMENT_TARGET in the app
 * project, not off a changelog. This page said macOS 15.3 and iOS 18.5 until
 * 10 Oct 2026, which turned away every Mac on 14 and every device between 17.0
 * and 18.4 - machines that run Servey perfectly well.
 */
const REQUIREMENTS = [
  "macOS 14 (Sonoma) or later",
  "Apple silicon or Intel",
  "An iPhone or iPad on iOS or iPadOS 17 or later",
  "A Google account, used on both devices",
];

export const metadata: Metadata = {
  // Absolute: the root template appends " - Servey", which would render this
  // as "Servey for Mac - the host app - Servey".
  title: { absolute: "Servey for Mac - the host app" },
  description:
    "Download the Mac app - the half of Servey that does the work, sharing your screen and shell with your iPhone or iPad. Signed and notarised by Apple.",
  alternates: { canonical: `${site.url}/mac` },
  openGraph: {
    type: "website",
    url: `${site.url}/mac`,
    title: `Servey for Mac - ${site.name}`,
    description:
      "The Mac app is what your iPhone or iPad talks to. Download it here - signed, notarised, and free to install.",
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
            <>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button asChild size="lg">
                  <a href={DOWNLOAD}>
                    <Download className="size-4" />
                    Download for Mac
                  </a>
                </Button>
                <span className="text-sm text-muted">
                  Apple silicon and Intel - macOS 14 or later
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                A 35 MB disk image, downloaded from this site rather than the Mac App
                Store - the App Store cannot carry an app that captures your screen and
                runs your shell. It is{" "}
                <strong className="text-fg">signed and notarised by Apple</strong>, so
                macOS will open it normally: double-click, drag it to Applications, done.
                No right-click-to-open, no Gatekeeper warning to talk yourself past.
              </p>
            </>
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
            macOS 14 came out in September 2023, so most Macs still in use qualify. If
            you are not sure, the version is in the Apple menu under About This Mac.
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
              Before you start
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              If you want to know what you are getting into,{" "}
              <Link href="/how-it-works" className="text-accent-strong underline underline-offset-2">
                how it works
              </Link>{" "}
              walks the whole setup, and{" "}
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
