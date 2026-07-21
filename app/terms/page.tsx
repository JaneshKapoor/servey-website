import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { ContactDialog } from "@/components/contact-dialog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using the Servey website and joining the waitlist.",
  alternates: { canonical: `${site.url}/terms` },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="July 2025">
      <p>
        This is a placeholder terms of service for the Servey marketing website while
        we finalize our full legal documentation ahead of launch. Full product terms
        will be published here before Servey is generally available.
      </p>

      <h2>Using this website</h2>
      <p>
        This site provides information about Servey and lets you join a waitlist. By
        using it you agree to use it lawfully and not to attempt to disrupt or abuse
        the service, including the waitlist form.
      </p>

      <h2>The waitlist</h2>
      <p>
        Joining the waitlist does not create any obligation to purchase, and does not
        guarantee access, pricing, or availability. Prices shown are introductory,
        subject to change before launch, and you are not charged until then.
      </p>

      <h2>No warranty</h2>
      <p>
        This website is provided on an &ldquo;as is&rdquo; basis without warranties of
        any kind. Servey product features described here reflect the app as built, but
        details may change before launch.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Reach us through the{" "}
        <ContactDialog>
          <button type="button" className="text-accent-strong underline underline-offset-2">
            contact form
          </button>
        </ContactDialog>{" "}
        on our website.
      </p>
    </LegalPage>
  );
}
