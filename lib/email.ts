/**
 * Transactional email through Resend's REST API.
 *
 * No SDK on purpose: lib/waitlist-providers.ts already talks to Resend over
 * plain fetch, and posting JSON does not need a dependency.
 *
 * Every helper is a no-op when RESEND_API_KEY is unset, so local dev and
 * preview deploys never send real mail and no call site needs a guard.
 *
 * Nothing here may ever throw into a request path - see sendWaitlistConfirmation.
 */
import { site } from "@/lib/site";

/**
 * Must be an address on a domain verified in Resend. Falls back to the mailbox
 * that actually exists, so a missing env var sends from something real rather
 * than from a bounced no-reply.
 */
const FROM = process.env.EMAIL_FROM ?? `${site.name} <${site.email}>`;

type SendResult = { sent: boolean; reason?: string };

async function send(payload: Record<string, unknown>): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { sent: false, reason: "no_api_key" };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM, ...payload }),
    });
    if (!res.ok) {
      console.error(`[email] resend returned ${res.status}`);
      return { sent: false, reason: `http_${res.status}` };
    }
    return { sent: true };
  } catch (err) {
    console.error("[email] send failed", err);
    return { sent: false, reason: "network_error" };
  }
}

/** "Janesh Kapoor" -> "Janesh". Greetings read badly with a full legal name. */
function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] ?? name;
}

const SUBJECT = "You're on the Servey waitlist";

function textBody(name: string): string {
  return `Hi ${firstName(name)},

You're on the list - thank you.

Servey puts your Mac in your pocket: full screen mirroring, a real mouse and
keyboard, and a genuine terminal on your iPhone and iPad. Sharp on your own
network, private peer-to-peer anywhere else.

We're building it now, and you'll be among the first to know the moment it's
ready to download.

Got a question, or something you'd want to use Servey for? Just reply to this -
we're listening.

Thanks once again for believing in us.

Janesh
${site.url}

You are receiving this because you joined the waitlist at ${site.domain}.
Reply with "unsubscribe" and we will remove you.`;
}

function htmlBody(name: string): string {
  // Deliberately looks like a letter, not a template. Gmail's Promotions
  // classifier reads styled containers, background panels, wide banner images,
  // buttons and multiple links as marketing, so this has none of them:
  //   - one small square logo, inline at text size, not a full-width header
  //   - no background colour, no card, no border radius, no CTA button
  //   - exactly one link in the whole message
  // The logo is the one concession that works against Primary placement; every
  // other lever is pushed the other way to pay for it.
  const first = escapeHtml(firstName(name));
  return `<!doctype html>
<html><body style="margin:0;padding:0;">
  <div style="max-width:500px;margin:0;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:#16181c;">
    <img src="${site.url}/brand/servey-logo-192.png" width="40" height="40" alt="${site.name}"
         style="width:40px;height:40px;border-radius:10px;display:block;margin:0 0 20px;">

    <p style="margin:0 0 16px;">Hi ${first},</p>

    <p style="margin:0 0 16px;">You&rsquo;re on the list - thank you.</p>

    <p style="margin:0 0 16px;">Servey puts your Mac in your pocket: full screen mirroring, a real mouse and keyboard, and a genuine terminal on your iPhone and iPad. Sharp on your own network, private peer-to-peer anywhere else.</p>

    <p style="margin:0 0 16px;">We&rsquo;re building it now, and you&rsquo;ll be among the first to know the moment it&rsquo;s ready to download.</p>

    <p style="margin:0 0 16px;">Got a question, or something you&rsquo;d want to use Servey for? Just reply to this - we&rsquo;re listening.</p>

    <p style="margin:0 0 16px;">Thanks once again for believing in us.</p>

    <p style="margin:0 0 2px;">Janesh</p>
    <p style="margin:0 0 24px;"><a href="${site.url}" style="color:#0a7a3c;">${site.domain}</a></p>

    <p style="margin:0;font-size:13px;color:#5b626b;">You are receiving this because you joined the waitlist at ${site.domain}. Reply with &ldquo;unsubscribe&rdquo; and we will remove you.</p>
  </div>
</body></html>`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}

/**
 * Confirms a waitlist signup.
 *
 * Resolves rather than throws on every failure path. A signup that was already
 * persisted must not be reported to the visitor as failed just because the
 * confirmation email did not go out - they would sign up again, and the second
 * attempt would come back as a duplicate.
 */
export async function sendWaitlistConfirmation(opts: {
  name: string;
  email: string;
}): Promise<SendResult> {
  // No List-Unsubscribe header on purpose. It is one of the strongest signals
  // Gmail uses to bucket mail as bulk marketing, and it is not required here:
  // this is a one-to-one transactional reply to an action the person just took,
  // not a campaign. The footer still tells them how to leave, in plain words, so
  // the promise in the privacy policy holds. Add the header back for the launch
  // broadcast, where it genuinely is bulk mail and Gmail expects it.
  return send({
    to: [opts.email],
    subject: SUBJECT,
    text: textBody(opts.name),
    html: htmlBody(opts.name),
  });
}
