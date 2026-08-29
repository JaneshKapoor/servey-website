# Servey - website

The premium marketing/landing site for **Servey** - a native app that puts your
Mac in your pocket: full screen mirroring, mouse, keyboard, and a real terminal
on your iPhone and iPad, hardware-accelerated on your network and private
peer-to-peer anywhere else.

Built to deploy on **Vercel** at **[servey.in](https://servey.in)**.

> **Start here: [`docs/CONTEXT.md`](docs/CONTEXT.md)** - the full context primer for
> this project (product, content system, SEO architecture, analytics, growth
> constraints, and the standing rules that must not be broken).
>
> **Then: [`docs/SEO-CONTEXT.md`](docs/SEO-CONTEXT.md)** - the search and
> answer-engine playbook: what we do, **what we deliberately do not do**, the
> query-cluster → page ownership map, and the evidence behind each call. Read it
> before touching anything that affects ranking.
>
> Print-ready PDFs of both are generated with `npm run context:pdf`, which
> renders every `docs/*.md`. Edit the Markdown, never the PDF.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (design tokens in `app/globals.css`)
- **Framer Motion** for scroll reveals and micro-interactions
- **Radix UI** primitives (Accordion, Dialog) + custom shadcn-style components
- **lucide-react** icons, **sonner** toasts
- Fonts via `next/font` (Inter + JetBrains Mono, self-hosted)

## Getting started

```bash
npm install
cp .env.example .env.local   # optional - the form works without it (console provider)
npm run dev                  # http://localhost:3000
```

```bash
npm run build        # production build
npm run start        # serve the production build
npm run lint         # eslint
npm run indexnow     # ping IndexNow with the current sitemap URLs
npm run context:pdf  # regenerate docs/context.pdf from docs/CONTEXT.md
npm run seo:audit    # assert the SEO invariants against live (or --base=localhost)
```

## Project structure

```
app/
  layout.tsx            # fonts, metadata, JSON-LD, theme bootstrap, Toaster
  page.tsx              # the landing page (composes the sections)
  globals.css           # brand tokens (dark + light), utilities, keyframes
  api/waitlist/route.ts # POST handler (honeypot + rate limit + provider)
  privacy/ terms/       # on-brand legal pages
  api/contact/route.ts  # POST handler -> Firestore `contacts` collection
  opengraph-image.tsx   # generated 1200x630 OG image
  sitemap.ts robots.ts icon.svg
components/
  sections/             # header, hero, features, statement, comparison, ...
  ui/                   # button, input, badge, accordion, dialog
  motion/               # reveal, tilt, magnetic wrappers
  device-frame.tsx      # iPad / iPhone / Mac frames + screenshot placeholders
lib/
  content.ts            # all section copy/data
  screenshots.ts        # typed registry of image slots
  site.ts               # site constants
  waitlist-providers.ts # swappable Firebase / Formspree / Resend / console
  rate-limit.ts
public/
  brand/                # Servey app-icon logos (used in nav/footer + favicon)
  llms.txt              # curated map for AI answer engines
docs/
  CONTEXT.md            # full project context primer (source of truth)
  context.pdf           # generated from CONTEXT.md - do not edit directly
scripts/
  indexnow.mjs          # IndexNow submission
  build-context-pdf.mjs # CONTEXT.md -> context.pdf via headless Chrome
source-material/        # the original brief + WebRTC explainer + one-pager HTML
```

## Screenshots

No fake product UI is shipped - every image is a styled **placeholder** inside the
correct device frame with a real, descriptive `alt`. To drop in real captures:

1. Save the file to `public/screenshots/<key>.png`
2. In `lib/screenshots.ts`, set that slot's `src` and flip `ready: true`.

Keys: `hero-devices`, `mirroring-ipad`, `iphone-controls`, `terminal`,
`dual-path`, `quality-closeup`, `mac-host-ui`.

## Waitlist backend

The form posts to `POST /api/waitlist`, which persists through **one swappable
provider** (see `lib/waitlist-providers.ts`). Selection is automatic from env, or
force it with `WAITLIST_PROVIDER`:

| Provider | Env vars | Notes |
|---|---|---|
| **Firebase** (recommended) | `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` | Writes `{ email, createdAt, source, userAgent }` to a `waitlist` collection; de-dupes by email (doc id = email). |
| **Formspree** | `FORMSPREE_ENDPOINT` | Zero-backend fallback. |
| **Resend** | `RESEND_API_KEY`, `RESEND_AUDIENCE_ID` | Adds the email to a Resend audience; handles duplicates. |
| **console** (default) | - | Logs and succeeds so the form works with no setup. |

Protections: hidden **honeypot** field + a simple per-IP **rate limit** (5/min).
Secrets are read from `.env.local` only and never hardcoded.

## Contact form

The footer "Contact us" button (and the legal pages) open a modal that posts to
`POST /api/contact`, which stores `{ name, email, message, createdAt, userAgent,
source, handled }` to a Firestore **`contacts`** collection via the same Firebase
Admin credentials as the waitlist (see `lib/firebase-admin.ts`). Same protections
(honeypot + per-IP rate limit). If Firebase isn't configured it logs and returns
success so the form still works in dev.

## Deploy to Vercel (servey.in)

1. Push this repo to GitHub (wired to `github.com/janeshKapoor/servey-website`).
2. In Vercel, **New Project → Import** the repo. Framework auto-detects as
   Next.js; no build config needed.
3. Add your chosen waitlist env vars under **Settings → Environment Variables**
   (Production + Preview). Redeploy.
4. **Domain:** Settings → Domains → add `servey.in` (and `www.servey.in`).
   - Apex `servey.in`: at your DNS/registrar add an **A** record to
     `76.76.21.21`, **or** an `ALIAS`/`ANAME` to `cname.vercel-dns.com`.
   - `www`: add a **CNAME** to `cname.vercel-dns.com`.
   - Set `servey.in` as the primary and redirect `www` → apex.
5. Update `site.url` in `lib/site.ts` if the canonical domain ever changes.

## Analytics

**PostHog**, wired up in `lib/analytics.ts` + `components/analytics.tsx`.

Set `NEXT_PUBLIC_POSTHOG_KEY` to switch it on - with the key unset every helper
is a **silent no-op**, so local dev never pollutes production numbers. See
`.env.example` for the EU-region and session-replay variables.

- **Lazy-loaded.** `posthog-js` (~60 KB gz) is dynamically imported on first use
  so it never lands in the shared bundle or delays first paint.
- **Reverse-proxied** through `/ingest` (rewrites in `next.config.ts`) so content
  blockers don't delete most of the data.
- **No person profiles, no `identify()`, no session replay, and Do Not Track is
  honoured.** Analytics is never linked to a waitlist email.
- Funnel events: `waitlist_submitted` → `waitlist_signup` (with `duplicate`) /
  `waitlist_failed`, plus `contact_message_sent`. Each carries `source`, so
  "which CTA actually converts" is answerable out of the box.

> If you change what is collected, update `app/privacy/page.tsx` in the same
> commit - it makes specific promises about all of the above.

## Accessibility & performance

Semantic landmarks, keyboard-navigable, brand-green focus rings, labeled form,
`alt` on every image, and `prefers-reduced-motion` honored throughout. Images use
`next/image`, fonts use `next/font`, and heavy motion is client-only - no CLS.
