import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleAlert, CircleCheck, Mail } from "lucide-react";
import { Footer } from "@/components/sections/footer";
import { Wordmark } from "@/components/wordmark";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

/**
 * servey.in/thanks - where Dodo Payments returns the browser after checkout.
 *
 * Dodo appends `?status=...&subscription_id=...&email=...`, and this page is a
 * signpost, not a receipt. Three things follow from that, and all three are
 * load-bearing:
 *
 * 1. **It grants nothing.** Query parameters are typed by whoever is at the
 *    keyboard. The plan is unlocked by Dodo's signed webhook to our backend,
 *    which is the only thing that has seen the money move. This page calls no
 *    API, looks nothing up, and must never say something that would be a lie if
 *    the payment had actually failed.
 *
 * 2. **The email in the URL is a liability from the moment it arrives.** The
 *    inline script below strips the query string before first paint, so it
 *    never reaches the Referer header, browser history, or PostHog. The
 *    analytics tracker drops this path's query as well (see
 *    components/analytics.tsx) - replaceState does not update the App Router's
 *    own copy of the search params, so stripping the address bar alone would
 *    not have been enough.
 *
 * 3. **The copy survives without JavaScript.** All three variants are in the
 *    static HTML and CSS picks between them off `data-pay` on <html>. With no
 *    script, the attribute is never set and the neutral block - the one that
 *    claims nothing - is what renders. The success copy is unreachable without
 *    a status parameter that says so.
 *
 * An unrecognised status falls through to neutral rather than to failure. The
 * brief says to treat anything that is not success as "not completed", but that
 * block tells people nothing has been charged, and that would be its own lie if
 * Dodo ever adds a success value we have not listed here.
 */

export const metadata: Metadata = {
  // Neutral in every state: this title sits in the tab and in browser history
  // for failed payments too.
  title: "Payment",
  description: "Confirmation page for a Servey purchase.",
  // Nothing here should ever be a search result, and there is no equity to pass.
  robots: { index: false, follow: false },
  // Belt and braces with the query strip below: no Referer leaves this page.
  referrer: "no-referrer",
};

/** Runs during parse - before first paint, before hydration, before analytics. */
const PICK_VARIANT = `(function(){try{
var q=window.location.search;
var s=new URLSearchParams(q).get("status");
var el=document.documentElement;
if(s&&/^(active|succeeded|success|successful|paid|completed|complete|trialing)$/i.test(s))el.setAttribute("data-pay","ok");
else if(s&&/^(failed|failure|cancelled|canceled|expired|declined|rejected|payment_failed)$/i.test(s))el.setAttribute("data-pay","no");
if(q)history.replaceState({},"","/thanks");
}catch(e){}})();`;

export default function ThanksPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: PICK_VARIANT }} />

      {/* Not the site header. That one carries nav to #pricing and a "Join the
          waitlist" button, which is an odd thing to show somebody who has just
          paid. Same shell, same type, no selling. */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-bg/70 backdrop-blur-xl">
        <div className="container-page flex h-16 items-center justify-between">
          <Wordmark />
          <ThemeToggle />
        </div>
      </header>

      <main id="main" className="container-page flex min-h-[70vh] flex-col justify-center pb-24 pt-32">
        <div className="mx-auto w-full max-w-2xl">
          {/* 1. Success. */}
          <section className="pay-ok">
            <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-accent-strong">
              <CircleCheck className="size-4" aria-hidden />
              Payment received
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Your Servey subscription is being activated.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              <strong className="text-fg">Go back to Servey on your Mac.</strong>{" "}
              Your plan appears there automatically within a few seconds. There is
              nothing to enter and nothing to restart.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              A receipt is on its way to your email from Dodo Payments, who
              handled the checkout.
            </p>
            <p className="mt-8 border-t border-border pt-6 text-sm leading-relaxed text-muted">
              Still showing Free after a minute? Quit Servey and open it again.
              If it persists, email{" "}
              <a
                className="text-accent-strong underline underline-offset-2"
                href={`mailto:${site.email}`}
              >
                {site.email}
              </a>{" "}
              and we will sort it out.
            </p>
          </section>

          {/* 2. An explicit failure or cancellation. */}
          <section className="pay-no">
            <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted">
              <CircleAlert className="size-4" aria-hidden />
              Payment not completed
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Nothing has been charged.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              The checkout did not finish. You can start it again from Servey on
              your Mac whenever you are ready.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              If something looks wrong - or you think you were charged anyway -
              email{" "}
              <a
                className="text-accent-strong underline underline-offset-2"
                href={`mailto:${site.email}`}
              >
                {site.email}
              </a>{" "}
              and we will check it against our records.
            </p>
          </section>

          {/* 3. No status parameter, or one we do not recognise. Also what a
              visitor with JavaScript off sees, which is why it claims nothing
              in either direction. */}
          <section className="pay-neutral">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
              Servey
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              This page confirms a Servey purchase.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              You land here after paying for Servey. If you have just bought a
              plan, open Servey on your Mac - it unlocks on its own, with nothing
              for you to type in.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Your receipt comes by email from Dodo Payments, who handle the
              checkout.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/">
                  Back to home
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <a href={`mailto:${site.email}`}>
                  <Mail className="size-4" />
                  Contact support
                </a>
              </Button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
