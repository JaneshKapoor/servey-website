# Servey - SEO Context

**The SEO playbook for servey.in: what we do, what we deliberately do not do,
and the evidence behind each decision.**

Companion to [`CONTEXT.md`](CONTEXT.md), which covers the product and codebase.
This file covers search and answer-engine strategy only.

- **Last reviewed:** 16 August 2026
- **Source of truth:** `docs/SEO-CONTEXT.md`. `docs/seo-context.pdf` is generated
  from it by `npm run context:pdf` - never edit the PDF.

> **Why this file exists.** Nearly every conclusion below was expensive to reach
> and easy to forget. Several were reached *twice* because the reasoning was not
> written down. If you are about to "improve" something here, read the reason
> first - most of these are deliberate trade-offs, not oversights.

---

## 1. Baseline - where we actually are

Google Search Console, 3-month window to **14 August 2026**:

| Metric | Value |
|---|---|
| Clicks | **16** |
| Impressions | **626** |
| CTR | **2.6%** |
| Average position | **15.8** |
| Distinct queries | 39 |

Prior reading (to ~2 Aug): 14 clicks · 502 impressions · 2.8% · position 14.9.
Impressions are growing; position drifted slightly down, which is normal when
new pages enter the index low and pull the average with them.

**Brand vs non-brand:** `servey` alone is 7 clicks / 131 impressions - **44% of
all clicks from 21% of impressions.** Non-brand is the entire growth opportunity.

**Index coverage (verified 16 Aug 2026):**
- **Google** - sitemap submitted, **26 URLs discovered**, last read 16 Aug 2026.
- **Bing** - indexed. Homepage plus at least four blog URLs return on a phrase
  search, and Bing's own AI summary describes Servey accurately from our pages.
  This matters because **ChatGPT Search reads Bing's index**, so the pipe to the
  largest answer engine is connected.

### The core diagnosis

Position 15.8 is page two, which takes roughly **1% of clicks** versus ~25% on
page one. CTR of 2.6% is *above* par for that position, which means **titles and
descriptions are working.** This is a **ranking problem, not a copywriting
problem**, and the bottleneck is authority - we have effectively no backlinks.

**Do not respond to flat numbers by rewriting metadata again.** That lever is
already pulled. The remaining levers are links, entity presence, and shipping.

---

## 2. What the query data proves

All 39 queries, clustered:

| Cluster | Impressions | Clicks | Verdict |
|---|---|---|---|
| **Competitor vs competitor** (`screens vs jump desktop` + ~11 variants) | ~58 | **2** | ✅ The only non-brand cluster earning clicks |
| **AI on Mac** (`run local ai on mac`, `mac ai agent`) | ~15 | 0 | Largest non-competitor cluster |
| **Control Mac from iPhone** (10 phrasings) | ~12 | 0 | Core intent - was fragmented |
| **Headless Mac mini** (7 phrasings) | ~9 | 0 | Was fragmented |
| `airplayuiagent` | 4 | 0 | Accidental, off-intent (a macOS process name) |

**Three conclusions that drive every content decision:**

1. **Comparison content is the only proven format** - specifically
   *competitor-vs-competitor*, where Servey is **not** the subject. We rank by
   genuinely helping someone choose between two other products.
2. **Fragmentation is the failure mode.** Ten phrasings of one intent, each with
   1-2 impressions and zero clicks, is what Google does when it reads a site as
   marginally relevant to all of a group and authoritative on none. The fix is
   **one strong pillar**, not more pages.
3. **Pure how-to content is not ranking.** It earns impressions and no clicks.

---

## 3. What we DO

### Content
- **Write competitor-vs-competitor comparisons.** The proven format. Currently:
  `screens-vs-jump-desktop`, `jump-desktop-vs-teamviewer`,
  `jump-desktop-vs-rustdesk`, `screens-5-alternatives`,
  `screens-jump-desktop-alternative-mac`, `termius-alternative-mac-terminal`,
  `best-remote-desktop-for-mac`.
- **Lead comparison posts with a `table` block.** Tables are the structure answer
  engines extract most reliably.
- **State where every competitor is genuinely better.** This is the single
  reason these pages get read and cited. It is a strategy, not politeness.
- **Keep Servey out of the hero slot** in competitor-vs-competitor posts: one
  late mention, labelled pre-launch, ending by telling the reader to buy an
  established product if they need one today.
- **One commercial pillar per intent**, with informational blog posts as spokes
  pointing at it (`/control-mac-from-iphone` ← `control-your-mac-from-iphone-ipad`).

### On-page
- `metaTitle` **≤51 chars** (the `%s - Servey` template adds 9; rendered ≤60).
- Descriptions **110–160 chars**.
- Explicit `alternates.canonical` **and** explicit `openGraph.url` on every page.
- One `<h1>`, no skipped heading levels.
- Shared `ogImage` object (never the bare string, which drops width/height/alt).

### Technical
- **Static generation everywhere.** Every route is Static/SSG; guard this.
- **Speculation Rules** - same-origin prefetch/prerender at `moderate` eagerness,
  excluding `/api/` and `/ingest/`.
- **Structured data**: one `@graph` (Organization → WebSite → SoftwareApplication
  with PreOrder Offers → FAQPage → ImageObject), plus per-page `Article` /
  `WebPage` / `BreadcrumbList` / `FAQPage`. Cross-reference by `@id`; never
  re-declare a node inline.
- **`sizes` on every responsive image**, matched to its real rendered width.
- **IndexNow** after every content deploy (`npm run indexnow`) - fastest route
  into Bing, and therefore into ChatGPT Search.
- **`npm run seo:audit`** before/after deploys. Currently **26/26 pass**.

### Answer engines (AEO / GEO)
- **Self-contained passages of ~130–170 words** that still make sense quoted in
  isolation.
- **Question-shaped H2s** mirroring real queries.
- **Direct answer in the first sentence** after each heading, then support.
- **`robots.ts` explicitly allows AI crawlers by name** - GPTBot, OAI-SearchBot,
  ChatGPT-User, ClaudeBot, Claude-Web, Claude-SearchBot, PerplexityBot,
  Perplexity-User, Google-Extended, Applebot-Extended, Bingbot, Amazonbot, CCBot.

---

## 4. What we deliberately DO NOT do

This section is as important as the last one. Each of these is a considered
decision with a reason.

### Never - integrity
| We don't | Why |
|---|---|
| Invent ratings, testimonials, review counts, user numbers, or `AggregateRating` | Servey is pre-launch with zero public users. `AggregateRating` without real reviews is a Google structured-data violation, and the rest is simply false. |
| Fabricate product screenshots | Every image is a real capture or an honestly-styled placeholder. |
| Publish a comparison that hides where a competitor wins | It is the entire credibility asset. A post that reads like an advert has failed at its job. |
| Imply Termius shipped malware | They were the **victim** of the ZuRu impersonation campaign. Saying otherwise is false and defamatory. |
| Solicit upvotes anywhere | Against Product Hunt / AlternativeTo rules; triggers rank penalties. |
| Buy links, use PBNs, or exchange links | Cheap short-term, fatal long-term. |
| Keyword-stuff, cloak, or hide text | Trivially detected; the fragmentation fix is pillar pages, not stuffing. |
| Publish thin AI-generated filler to inflate page count | Google's QRG §4.6.5–6 targets exactly this. Page count is not the goal. |

### Not now - strategy
| We don't | Why |
|---|---|
| **Chase "recommend me a tool" AI queries** | Verified 16 Aug: ChatGPT answered "tool to screen share to my Mac from my phone" with Chrome Remote Desktop, AnyDesk, TeamViewer. **Correctly** - Servey has nothing to download, so recommending it would be a worse answer. Structurally unwinnable until launch. Do not treat it as an SEO failure. |
| **Chase "termius alternative" broadly** | It would pull multi-host-SSH searchers who bounce, polluting waitlist quality pre-launch. The honest overlap is narrow: "run a terminal on your own Mac without SSH setup". |
| **Compete on Termius's page axis** (SSH client × platform) | They hold #1 there. We copied their *template technique* onto a different axis - **task × device** - where they do not rank at all. |
| **Add more pages targeting "control Mac from iPhone"** | That recreates the exact fragmentation `/control-mac-from-iphone` was built to fix. One pillar, many spokes. |
| **Rewrite metadata again to chase CTR** | 2.6% is already above par for position 15.8. The lever is pulled. |
| **Build doorway pages per query variant** | The 10 phrasings get absorbed by one strong page, not 10 weak ones. |
| Chase `airplayuiagent` traffic | Accidental, off-intent, and converts nobody. |

### Myths we do not act on
| Belief | Reality |
|---|---|
| **`llms.txt` improves AI citation** | **It does not.** No major engine consumes it; this is evidence-based, not opinion. We keep ours because it costs nothing and is a tidy human-readable map - **but it is not a citation lever and must not be cited as one.** |
| FAQ schema wins SERP real estate | **Retired 7 May 2026.** See §7. |
| More pages = more traffic | 39 queries across 26 pages says relevance is fine; authority is the constraint. |
| Content needs chunking / AI-specific keyword rewriting | Engines handle synonyms; this is wasted effort. |

---

## 5. Cluster → page ownership map

Each intent has exactly one owner. Adding a second competitor for any row is how
fragmentation comes back.

| Intent cluster | Owning page | Supporting spokes |
|---|---|---|
| Control Mac from iPhone | `/control-mac-from-iphone` | `blog/control-your-mac-from-iphone-ipad` |
| Terminal from iPhone | `/terminal-on-iphone` | `blog/real-terminal-on-your-mac-from-iphone` |
| Terminal from iPad | `/terminal-on-ipad` | - |
| Headless Mac mini / macOS headless mode | `/headless-mac-mini` | `blog/control-a-headless-mac-mini-remotely` |
| Run local AI on Mac / mac ai agent | `/remote-mac-for-ai-agents` | `blog/run-ai-agents-locally-on-your-mac`, `blog/run-ai-agents-on-your-mac-remotely`, `blog/stay-in-control-of-ai-agents-from-anywhere` |
| Developer remote Mac access | `/mac-for-developers` | `blog/who-is-servey-for-developers-home-labs` |
| Mac home lab | `/mac-home-lab` | - |
| Cellular / strict networks | `blog/access-your-mac-remotely-over-cellular` | - |
| Screens vs Jump Desktop | `blog/screens-vs-jump-desktop` | `blog/screens-jump-desktop-alternative-mac` |
| Screens 5 alternatives | `blog/screens-5-alternatives` | - |
| Jump Desktop vs TeamViewer | `blog/jump-desktop-vs-teamviewer` | - |
| Jump Desktop vs RustDesk | `blog/jump-desktop-vs-rustdesk` | - |
| Termius / SSH overlap | `blog/termius-alternative-mac-terminal` | - |
| Category roundup | `blog/best-remote-desktop-for-mac` | - |

---

## 6. Internal linking - a quirk that matters

**`p` blocks render as plain text.** `app/blog/[slug]/page.tsx` parses no
markdown and no HTML, so **you cannot put an anchor in body copy.** The only real
internal-link mechanism between posts is **exact-string keyword overlap feeding
`relatedPosts()`**.

**Engineering the `keywords` array *is* engineering the link graph.** When adding
a post, deliberately share keywords with the posts you want linking to it. The
three newest comparison posts were given keyword overlap with
`screens-vs-jump-desktop` specifically because it is the one page earning clicks,
so its authority flows to them.

Use-case pages *do* have real anchors: the cross-link mesh is derived
automatically from the `useCases` array order, so adding a page wires it in.

---

## 7. Structured-data deprecation register

| Type | Status | Action |
|---|---|---|
| **`FAQPage`** | **Rich results retired 7 May 2026.** SC report + Rich Results Test support removed June 2026; API data August 2026. | **Keep the markup.** It remains a valid Schema.org type, Google confirms unused structured data does not affect Search, and answer engines still read it. Only the *expectation* changed. |
| `HowTo` | Removed June 2025 | Do not add |
| `SpecialAnnouncement`, `ClaimReview`, `VehicleListing`, `EstimatedSalary`, `LearningVideo`, Course carousel, Book Actions | Removed June 2025 | Do not add |
| `QAPage` | Retained | Available if ever useful |
| `VideoObject` | Active | **Add when the YouTube demo exists** |
| `AggregateRating` | Active | **Forbidden here** - no real reviews exist |

---

## 8. Constraints that shape everything

1. **Pre-launch, waitlist-only, nothing downloadable.** This is the dominant
   constraint. It makes purchase-intent and "recommend a tool" queries
   unwinnable, and it blocks the highest-authority directories (§9).
2. **Effectively no backlinks.** The real reason for position 15.8.
3. **Almost no entity presence.** AI engines weight presence on YouTube, Reddit,
   LinkedIn and Wikipedia. We have essentially none - and **three of those four
   are free and available pre-launch.**
4. **The brand name carries a search tax.** Bing responds to "servey" with *"Do
   you mean **survey**?"*. Google brand search works (131 impressions), so it is
   not fatal, but every search box and answer engine will fight the name. Worth
   knowing before blaming rankings for it.
5. **`hero-devices.png` exposes personal filenames** and is live on the homepage.
   The owner's decision is to leave it. Not an SEO issue; recorded so nobody
   "fixes" it by accident.

---

## 9. Channels - available vs blocked pre-launch

Verified against each platform's own rules.

| Channel | Status | Note |
|---|---|---|
| **AlternativeTo** | ❌ Blocked | *"If the app is Coming Soon (announced only), in closed/private beta, invite-only, or in Early Access phase, we do not accept it."* Account is created and past the 7-day age requirement, so submission can go in on launch day. |
| **Show HN** | ❌ Blocked | *"If your work isn't ready for users to try out, please don't do a Show HN."* |
| **App Store listing** | ⏳ At launch | **#1 most-cited source** in this category (77 citations) |
| **YouTube demo** | ✅ Available | **#2 most-cited** (74 citations). **The highest-leverage action available today, and still not done.** |
| **Reddit** (r/macapps, r/homelab) | ✅ Available | **#3 most-cited** (65 citations). Genuine participation, never a launch post |
| **BetaList / Peerlist / Uneed** | ✅ Available | Built specifically for unlaunched products |
| **HN as a normal submission** | ✅ Available | Show HN is barred; submitting a post as a regular link is fine |
| **Email the waitlist** | ✅ Available | Still never used |
| **Product Hunt** | Done | Badge in footer. Never solicit upvotes |

---

## 10. Measurement

| Tool | What it answers | How |
|---|---|---|
| **`npm run seo:audit`** | Do the on-page invariants still hold? | Titles ≤60, descriptions 110–160, canonical self-reference, og:url agreement, one h1, no skipped headings, valid JSON-LD with resolving `@id`s, **BreadcrumbList count == visible trail**, all sitemap URLs 200. Exits non-zero - can gate a deploy. |
| **Google Search Console** | Impressions, position, query clusters | The cluster table in §2 is the useful view, not the top-line number |
| **Bing / ChatGPT** | Are we retrievable by answer engines? | Phrase search on Bing; test **comparison** queries, not "recommend me a tool" |
| **PostHog** | What happens after the click | `$pageview`, `waitlist_submitted` → `waitlist_signup` (with `duplicate`), `waitlist_failed`, all carrying `source` |
| **`npm run indexnow`** | Push new URLs to Bing | Run after every content deploy |

### Reading GSC correctly
- **"Discovered – currently not indexed"** → Google knows the URL, hasn't crawled
  it. Requesting indexing helps.
- **"Crawled – currently not indexed"** → Google crawled it and *chose* not to
  index. Requesting indexing will **not** help. That is an authority verdict, and
  the correct response is links and entity presence, not more pages.

---

## 11. What to do next, in priority order

1. **Record the YouTube demo.** Highest-leverage action available pre-launch,
   feeds YouTube + Reddit + the launch-day AlternativeTo submission, and is the
   only top-3 cited source reachable before shipping.
2. **Reddit participation** in r/macapps and r/homelab - genuine, not promotional.
3. **Email the waitlist.** Costs nothing, never used.
4. **BetaList / Peerlist / Uneed** submissions.
5. **Add `VideoObject` schema** once the demo exists.
6. Re-test AI citation on **comparison** queries in ~2 weeks.
7. At launch: App Store listing, AlternativeTo submission, Show HN.

**Explicitly not on this list:** more landing pages, more metadata rewrites,
more schema. On-site SEO has reached sharply diminishing returns. What is missing
is that **nobody has ever seen Servey move.**

---

## 12. Change log

| Date | Change |
|---|---|
| 2026-08-23 | **Comparison posts re-pitched.** The 6 comparison/roundup posts read as neutral review-site content: `jump-desktop-vs-teamviewer` had 2 Servey mentions in 1,526 words (1.3/1k), `anydesk-vs-teamviewer` 2 in 1,298. Their `Where Servey fits` sections actively deflected ("it does not compete with either of these", "pick one of the two above") and all 5 `Bottom line` sections had no Servey at all. Added a **Servey column to all 5 head-to-head tables** (each already ended with a `Real terminal | No | No` row), rewrote every Servey section to lead with real advantages (hardware HEVC sharpness, shell + screen one tap apart, zero config, P2P E2E, CGNAT, price), and added a closing pitch to each `Bottom line`. Honest competitor-is-better sections kept intact. Density 1.3-4.8/1k -> 4.0-6.0/1k. |
| 2026-08-19 | **Internal-linking fix:** the 7 use-case pages were orphaned - they cross-linked to each other but nothing linked in, so the homepage emitted only 4 internal links (`/`, `/blog`, `/privacy`, `/terms`). GSC counted 33 internal links sitewide with `/privacy`, `/terms`, `/blog` as top targets, i.e. the footer was the only link graph Google saw. Added a footer `Use cases` nav (homepage 4 -> 11 links) and a `Servey for this` block on posts inverting `relatedSlug`. |
| 2026-08-19 | 3 comparison posts (`splashtop-vs-jump-desktop`, `anydesk-vs-teamviewer`, `chrome-remote-desktop-vs-jump-desktop`), keyword-wired to `screens-vs-jump-desktop`. **26 -> 29 URLs.** |
| 2026-08-19 | Em dashes replaced with `-` across code comments and docs (owner preference). None were in rendered copy. `source-material/` left untouched as owner input. |
| 2026-08-16 | 3 comparison posts (`screens-5-alternatives`, `jump-desktop-vs-teamviewer`, `jump-desktop-vs-rustdesk`); `/control-mac-from-iphone` pillar; headless + local-AI pages retargeted; Speculation Rules; image `sizes` fix; `ImageObject` JSON-LD; og:image dimensions on all pages; `/blog` twitter card fix; `Article` publisher by `@id`; `scripts/seo-audit.mjs`. **22 → 26 URLs.** Sitemap re-read by Google: 26 discovered. |
| 2026-08-16 | PostHog analytics (lazy-loaded, first-party proxied, DNT honoured, no person profiles). |
| 2026-08-14 | 6 use-case landing pages; Termius comparison; `table` block type; breadcrumbs; RSS feed; 404 page; light-mode contrast and reduced-motion fixes. **15 → 22 URLs.** |
| Earlier | JSON-LD `@graph`; IndexNow; AI-crawler allowlist; `llms.txt`; comparison and roundup posts. |
