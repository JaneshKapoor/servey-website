import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { ContactDialog } from "@/components/contact-dialog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy and data handling",
  description:
    "How Servey handles your data: sessions are scoped to your own account, your remote screen is end-to-end encrypted, and we collect as little as possible.",
  alternates: { canonical: `${site.url}/privacy` },
  // Without an explicit og:url these inherit the homepage URL from the root
  // layout, which leaves Open Graph disagreeing with the canonical tag.
  openGraph: {
    type: "website",
    url: `${site.url}/privacy`,
    title: `Privacy Policy - ${site.name}`,
    description: "How Servey handles your data - account-scoped and private by design.",
    images: ["/opengraph-image"],
  },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="August 2026">
      <p>
        This is a placeholder privacy policy for the Servey marketing website while
        we finalize our full legal documentation ahead of launch. It describes our
        intended approach; the final policy will be published here before Servey is
        generally available.
      </p>

      <h2>What we collect</h2>
      <p>
        The only personal information you actively give us on this website is the{" "}
        <strong>email address</strong> you provide to join the waitlist, along with
        your name, country, the time of signup and which part of the page it came
        from, so we can contact you about Servey&rsquo;s launch. Separately, we use
        analytics to understand how the site is doing - described below.
      </p>

      <h2>Analytics</h2>
      <p>
        We use <strong>PostHog</strong> to see how people find this site and whether
        it is doing its job: which pages get read, which links get used, and how many
        visitors go on to join the waitlist. We keep it as light-touch as we can:
      </p>
      <ul>
        <li>
          We do <strong>not</strong> build a personal profile for anonymous visitors,
          and we never link analytics activity to the email address you give us on the
          waitlist form.
        </li>
        <li>
          We do <strong>not</strong> record your screen, your typing, or the contents
          of any form on this site.
        </li>
        <li>
          Your IP address is used to derive an approximate country, so we can see
          where Servey is wanted. We use it for nothing else.
        </li>
        <li>
          Analytics requests are served from <strong>servey.in</strong> rather than a
          third-party domain, so the setup does not rely on third-party cookies.
        </li>
        <li>
          If your browser sends a <strong>Do Not Track</strong> signal, we honour it
          and collect nothing at all.
        </li>
      </ul>

      <h2>The Servey app</h2>
      <p>
        Servey is <strong>private by design</strong>. You sign in with Google on both
        your Mac and your iPhone or iPad, and Servey only ever pairs your own devices,
        scoped to your account. On the remote path, your screen video travels{" "}
        <strong>peer-to-peer and end-to-end encrypted</strong> - it hardly touches our
        servers. Our cloud is used only to broker the initial connection handshake.
      </p>

      <h2>How we use your email</h2>
      <ul>
        <li>To notify you when Servey is ready and share launch and pricing details.</li>
        <li>We do not sell or rent your email address to anyone.</li>
        <li>You can ask us to remove you from the waitlist at any time.</li>
      </ul>

      <h2>Contact</h2>
      <p>
        Questions about privacy? Reach us through the{" "}
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
