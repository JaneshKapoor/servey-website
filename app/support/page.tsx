import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { site, ogImage } from "@/lib/site";

/**
 * servey.in/support - the Support URL on the App Store listing.
 *
 * App Store Connect requires one and Apple checks that it resolves, so this
 * page existing is a submission requirement rather than a nicety. It carries
 * `hidePricing` on the header and footer for the same reason /mac does: a page
 * Apple reaches from the product listing should not route anyone to a non-Apple
 * payment (Guidelines 3.1.3 and 4.8). Account and payment questions go to email
 * instead of to a billing page.
 *
 * Every fix below is a real failure mode taken from the apps' own code - the
 * two permissions macOS can withhold, the master-password rule, and the
 * "Mac has not started sending" state - not invented troubleshooting.
 */

export const metadata: Metadata = {
  title: { absolute: "Servey Support" },
  description:
    "Get help with Servey: fixes for a Mac that will not appear, a black screen, a cursor that will not move, and how to reach a human if none of those is it.",
  alternates: { canonical: `${site.url}/support` },
  openGraph: {
    type: "website",
    url: `${site.url}/support`,
    title: `Support - ${site.name}`,
    description:
      "Fixes for the things that actually go wrong, and a direct line to us when they do not help.",
    images: [ogImage],
  },
};

const FIXES = [
  {
    q: "My Mac does not appear on my iPhone or iPad",
    a: "Three things have to be true: both devices are signed in to the same Google account, the Mac app is running, and you have pressed Go Online on the Mac. Until you press it, the Mac is deliberately invisible - that is the privacy default, not a fault. Check the Mac is awake and not asleep on battery.",
  },
  {
    q: "The screen is black, or frames never arrive",
    a: "That is the Screen Recording permission. macOS blocks screen capture until you grant it, and it cannot be worked around. Open System Settings, go to Privacy & Security, then Screen Recording, and switch Servey on. Quit and reopen Servey afterwards - macOS does not apply it to a running app.",
  },
  {
    q: "I can see the screen but the cursor and keyboard do nothing",
    a: "That is the other permission: Accessibility. It is what lets Servey move the pointer and send keystrokes. System Settings, Privacy & Security, Accessibility, switch Servey on, then restart Servey. Screen Recording and Accessibility are separate - granting one does not grant the other.",
  },
  {
    q: "It says the Mac has not started sending",
    a: "The connection was made but no video arrived. Check Servey is still online on the Mac, then try again. If the Mac went to sleep or lost its network in between, that is the usual cause.",
  },
  {
    q: "I forgot the master password",
    a: "It is set on the Mac and it never leaves the Mac in a form anyone can read - which means nobody, including us, can reset it remotely. That is deliberate: it is what stops someone who reaches your account from reaching your Mac. Go to the Mac and change it there. Devices you have already approved stay approved; they just need the new password next time they connect.",
  },
  {
    q: "A device is asking for my approval and I do not recognise it",
    a: "Decline it. Only devices you approve on the Mac itself can connect, so declining is enough. Then change the master password on the Mac, which forces every device to present the new one.",
  },
  {
    q: "The picture is soft, or the session keeps dropping",
    a: "On the same Wi-Fi, Servey connects straight to your Mac. From elsewhere it tries a direct connection and falls back to a relay when the network will not allow one, which costs some quality. A mobile hotspot or a restrictive office network is the usual reason.",
  },
];

export default function SupportPage() {
  return (
    <>
      <Header hidePricing />
      <main id="main" className="container-page pb-24 pt-32">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-strong">
            Support
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Something not working?
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Write to us and a person will answer - we are a small team and there
            is no ticket queue to get lost in. Most problems are one of the
            seven below, so it is worth a look first.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <a href={`mailto:${site.email}`}>
                <Mail className="size-4" />
                Email {site.email}
              </a>
            </Button>
            <span className="text-sm text-muted">
              We aim to reply within two working days.
            </span>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-surface/40 p-5">
            <h2 className="text-sm font-semibold text-fg">What to include</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Your macOS version and your iPhone or iPad version, what you were
              doing, and what happened instead. If a message appeared, the exact
              wording. That is usually enough for us to find it without a
              back-and-forth.
            </p>
          </div>

          <h2 className="mt-16 text-2xl font-semibold tracking-tight text-fg">
            The usual suspects
          </h2>
          <dl className="mt-6 space-y-7">
            {FIXES.map((f) => (
              <div key={f.q}>
                <dt className="text-base font-semibold text-fg">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-16 text-2xl font-semibold tracking-tight text-fg">
            What Servey needs to run
          </h2>
          <p className="mt-3 leading-relaxed text-muted">
            A Mac on{" "}
            <strong className="text-fg">macOS 14 (Sonoma) or later</strong>,
            Apple silicon or Intel, and an iPhone or iPad on{" "}
            <strong className="text-fg">iOS or iPadOS 17 or later</strong>. Both
            signed in to the same Google account. If you are below either
            version, that is the problem and no amount of reinstalling will fix
            it.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-fg">
            Your account and your data
          </h2>
          <p className="mt-3 leading-relaxed text-muted">
            To delete your account and the data attached to it, email us from
            the address you signed up with and we will confirm when it is done.
            What we keep, how long, and what we are required to keep afterwards
            is set out in the{" "}
            <Link
              href="/privacy"
              className="text-accent-strong underline underline-offset-2"
            >
              privacy policy
            </Link>
            . For anything about your account or a payment, email us rather than
            guessing from this page - we would rather look at the actual record.
          </p>

          <div className="mt-14 rounded-2xl border border-border bg-surface/40 p-6">
            <h2 className="text-lg font-semibold tracking-tight text-fg">
              Still stuck
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Tell us what you are seeing at{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-accent-strong underline underline-offset-2"
              >
                {site.email}
              </a>
              . If you want to know how the whole thing fits together first,{" "}
              <Link
                href="/how-it-works"
                className="text-accent-strong underline underline-offset-2"
              >
                how it works
              </Link>{" "}
              walks through setup end to end.
            </p>
          </div>
        </div>
      </main>
      <Footer hidePricing />
    </>
  );
}
