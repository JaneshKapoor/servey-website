import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { ContactDialog } from "@/components/contact-dialog";
import { site, ogImage } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms you agree to when you use Servey: what your subscription grants, who owns the software, acceptable use, and how the service can change or end.",
  alternates: { canonical: `${site.url}/terms` },
  openGraph: {
    type: "website",
    url: `${site.url}/terms`,
    title: `Terms of Service - ${site.name}`,
    description: "What your subscription grants, who owns Servey, and how the service can change.",
    images: [ogImage],
  },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="September 2026">
      <p>
        These terms cover your use of the <strong>Servey</strong> apps for macOS, iOS
        and iPadOS and the <strong>servey.in</strong> website. By joining the waitlist,
        installing an app, or using the service, you agree to them. If you do not
        agree, please do not use Servey.
      </p>
      <p>
        Servey is currently <strong>pre-launch</strong>. Until the apps are generally
        available, the sections on the waitlist and the website are the ones that
        apply to you.
      </p>

      <h2>Who can use Servey</h2>
      <p>
        You must be at least <strong>13 years old</strong>, and old enough to enter a
        contract where you live. You need a Mac running macOS 15.3 or later and an
        iPhone or iPad running iOS or iPadOS 18.5 or later. You are responsible for
        the security of the Google account you sign in with and for the master
        password you set on your Mac.
      </p>

      <h2>What your subscription grants</h2>
      <p>
        A subscription grants you a <strong>personal, non-exclusive,
        non-transferable, revocable licence</strong> to use the Servey apps on devices
        you own or control, for as long as the subscription is active. That is the
        whole of what is granted.
      </p>
      <p>
        Servey also has a free tier with time and session limits. We may change those
        limits, and we will say so on the pricing page when we do.
      </p>

      <h2>Subscriptions, billing and refunds</h2>
      <p>
        Subscriptions are sold and billed through <strong>Apple</strong>, not by us.
        They renew automatically until cancelled, and you cancel or change them in
        your Apple account settings rather than here. Because Apple takes the payment,{" "}
        <strong>refunds are handled by Apple</strong> under their policy - we cannot
        issue one directly, though we will help you where we can.
      </p>
      <p>
        Prices shown before launch are introductory and may change. You are not
        charged until launch, and joining the waitlist creates no obligation to buy
        and no guarantee of access, pricing, or availability.
      </p>

      <h2>Ownership</h2>
      <p>
        Servey - the applications, the website, the source code, the name, the logo,
        the design and all associated intellectual property - is and remains the{" "}
        <strong>exclusive property of the builders of Servey</strong> and its rights
        holders. These terms grant you a licence to use the software. They transfer{" "}
        <strong>no ownership</strong> of any part of it to you.
      </p>
      <p>
        <strong>Your content stays yours.</strong> Your files, your terminal sessions
        and everything on your Mac belong to you, and we claim no rights over any of
        it. Servey is a way to reach your own machine, not a place we keep your work.
      </p>
      <p>
        If you send us feedback or a suggestion, we may use it to improve Servey
        without owing you payment or attribution. You keep the right to your own idea;
        you are simply not charging us for having mentioned it.
      </p>

      <h2>Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>
          Use Servey to access a computer you do not own or are not authorised to
          control.
        </li>
        <li>
          Copy, resell, sublicense, rent out or redistribute the apps or your access
          to them.
        </li>
        <li>
          Reverse engineer, decompile or attempt to derive the source code, except
          where the law expressly permits it.
        </li>
        <li>
          Circumvent the free-tier limits, the licence checks, or the device approval
          and master password protections.
        </li>
        <li>
          Attack, overload or disrupt the service, our relay, or the waitlist and
          contact forms.
        </li>
        <li>Use Servey for anything unlawful, or to harm or surveil another person.</li>
      </ul>

      <h2>Availability, changes and discontinuation</h2>
      <p>
        We may change, suspend, limit or <strong>discontinue</strong> Servey, any
        feature of it, or support for it, at our discretion - including where
        continuing would not be sustainable for the organisation, or where it is
        necessary for the <strong>welfare, viability or security</strong> of Servey
        and the people who build it. We may also do so where a platform change,
        supplier, or legal requirement forces our hand.
      </p>
      <p>
        Where a discontinuation is planned rather than forced on us, we will give
        reasonable notice, stop billing, and give you the chance to export or delete
        your data before access ends. Where you have paid in advance for a period we
        cut short, you may claim a pro-rata refund through Apple.
      </p>
      <p>
        Servey depends on your network and on services we do not control, so we do not
        promise uninterrupted availability, and no specific uptime is guaranteed.
      </p>

      <h2>Suspending or ending your account</h2>
      <p>
        You can stop using Servey at any time, cancel your subscription through Apple,
        and ask us to delete your data as described in our{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>
      <p>
        We may suspend or terminate your access if you breach these terms, if your
        use puts the service or other people at risk, or if we are required to. Where
        it is reasonable to do so, we will tell you why and give you a chance to put
        it right first.
      </p>

      <h2>No warranty</h2>
      <p>
        Servey is provided on an <strong>&ldquo;as is&rdquo;</strong> and{" "}
        <strong>&ldquo;as available&rdquo;</strong> basis, without warranties of any
        kind, express or implied, including fitness for a particular purpose. Product
        features described on this site reflect the app as built, and details may
        change before launch. You are responsible for keeping your own backups.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent the law allows, Servey and its builders are not liable
        for indirect, incidental, special or consequential loss, or for lost profits,
        lost data, or business interruption. Where liability cannot be excluded, it is
        limited to the <strong>amount you paid us in the twelve months</strong> before
        the claim arose.
      </p>
      <p>
        Nothing here excludes liability that cannot lawfully be excluded, including
        for death or personal injury caused by negligence, or for fraud. If you are a
        consumer, you keep every right your local consumer law gives you.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms, and the date at the top always reflects the current
        version. If a change materially affects your rights, we will tell you by email
        or in the app before it takes effect. Continuing to use Servey afterwards
        means you accept the updated terms.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of <strong>India</strong>, and the courts
        of India have jurisdiction over any dispute. If you are a consumer elsewhere,
        this does not deprive you of the protection of the mandatory laws of the
        country you live in.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> or reach us through the{" "}
        <ContactDialog>
          <button type="button" className="text-accent-strong underline underline-offset-2">
            contact form
          </button>
        </ContactDialog>{" "}
        on this website.
      </p>
    </LegalPage>
  );
}
