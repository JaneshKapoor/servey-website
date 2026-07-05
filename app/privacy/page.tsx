import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Servey handles your data - account-scoped, private by design.",
  alternates: { canonical: `${site.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 2025">
      <p>
        This is a placeholder privacy policy for the Servey marketing website while
        we finalize our full legal documentation ahead of launch. It describes our
        intended approach; the final policy will be published here before Servey is
        generally available.
      </p>

      <h2>What we collect</h2>
      <p>
        On this website, the only personal information we collect is the{" "}
        <strong>email address</strong> you voluntarily provide to join the waitlist,
        along with basic metadata (the time of signup and which part of the page it
        came from) so we can contact you about Servey&rsquo;s launch.
      </p>

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
        Questions about privacy? Email us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
