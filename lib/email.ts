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

You're on the list.

Servey puts your Mac in your pocket - full screen mirroring, a real mouse and
keyboard, and a genuine terminal on your iPhone and iPad. Sharp on your own
network, private peer-to-peer anywhere else.

To be straight with you about where things stand: we are still building. There
is nothing to download yet, and you have not been charged for anything. When
Servey is ready you will get one email from us saying so, and the pricing will
be exactly what is on the site.

If you have a question, or you want to tell us what you would use Servey for,
just reply to this. It reaches a person.

Janesh
${site.url}

---
You are receiving this because you joined the waitlist at ${site.domain}.
Reply with "unsubscribe" and we will remove you.`;
}

function htmlBody(name: string): string {
  // Inline styles only, one column, no external CSS - the constraints every
  // mail client still imposes. Text-forward by design: image-heavy mail from a
  // brand new sending domain is exactly what spam filters distrust.
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#f7f9fa;">
  <div style="max-width:520px;margin:0 auto;padding:32px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:#16181c;">
    <p style="margin:0 0 20px;font-size:20px;font-weight:600;letter-spacing:-0.02em;">Servey</p>

    <p style="margin:0 0 16px;">Hi ${escapeHtml(firstName(name))},</p>

    <p style="margin:0 0 16px;"><strong>You're on the list.</strong></p>

    <p style="margin:0 0 16px;">Servey puts your Mac in your pocket - full screen mirroring, a real mouse and keyboard, and a genuine terminal on your iPhone and iPad. Sharp on your own network, private peer-to-peer anywhere else.</p>

    <p style="margin:0 0 16px;">To be straight with you about where things stand: we are still building. There is nothing to download yet, and you have not been charged for anything. When Servey is ready you will get one email from us saying so, and the pricing will be exactly what is on the site.</p>

    <p style="margin:0 0 16px;">If you have a question, or you want to tell us what you would use Servey for, just reply to this. It reaches a person.</p>

    <p style="margin:0 0 4px;">Janesh</p>
    <p style="margin:0 0 28px;"><a href="${site.url}" style="color:#0a7a3c;text-decoration:none;">${site.domain}</a></p>

    <hr style="border:none;border-top:1px solid #dfe4ea;margin:0 0 16px;">
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
  return send({
    to: [opts.email],
    subject: SUBJECT,
    text: textBody(opts.name),
    html: htmlBody(opts.name),
    // A mailto unsubscribe needs no endpoint to honour it, which keeps the
    // promise in the footer true from day one. Gmail and Outlook both surface
    // this as a one-click option.
    headers: {
      "List-Unsubscribe": `<mailto:${site.email}?subject=unsubscribe>`,
    },
  });
}
