import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { ContactDialog } from "@/components/contact-dialog";
import { site, ogImage } from "@/lib/site";

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
    images: [ogImage],
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
        scoped to your account. On top of that you set a{" "}
        <strong>master password</strong> on your Mac. We never receive it: your Mac
        stores only a key derived from it, in the macOS Keychain, and there is
        deliberately no remote reset. Every device must prove it knows that password,
        every new device waits for you to approve it on the Mac itself, and you can
        revoke any device at any time.
      </p>
      <p>
        On the remote path your screen video travels{" "}
        <strong>peer-to-peer and end-to-end encrypted</strong> between your own
        devices, and our cloud is used only to broker the initial connection
        handshake. Some networks - strict NATs and certain mobile carriers - refuse to
        allow a direct connection. When that happens the encrypted stream is relayed,
        and it is relayed through <strong>our own server</strong> rather than a
        third-party vendor&apos;s cloud.
      </p>
      <p>
        Your Mac also keeps an <strong>activity log</strong> of what happened to it:
        when it came online, which device connected and over which path, incorrect
        master password attempts, approvals and removals, and sessions opened and
        ended. That log is written to your Mac and{" "}
        <strong>is never uploaded to us</strong>. It exists so you can answer
        &quot;who connected to my Mac, and when&quot; without asking anyone.
      </p>

      <h2>How we use your email</h2>
      <ul>
        <li>
          To send you one confirmation email when you join the waitlist, so you have
          a record of it and a way to reach us.
        </li>
        <li>To notify you when Servey is ready and share launch and pricing details.</li>
        <li>
          That is all. We do not send newsletters, drip sequences, or marketing from
          anyone else.
        </li>
        <li>We do not sell or rent your email address to anyone.</li>
        <li>
          You can leave at any time - reply &ldquo;unsubscribe&rdquo; to any email we
          send, and we will remove you.
        </li>
      </ul>
      <p>
        Waitlist email is delivered through <strong>Resend</strong>, which processes
        your name and email address solely to send these messages on our behalf.
      </p>

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
