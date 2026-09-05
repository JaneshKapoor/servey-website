# Servey - SEO Context

**The SEO playbook for servey.in: what we do, what we deliberately do not do,
and the evidence behind each decision.**

Companion to [`CONTEXT.md`](CONTEXT.md), which covers the product and codebase.
This file covers search and answer-engine strategy only.

- **Last reviewed:** 1 September 2026
- **Source of truth:** `docs/SEO-CONTEXT.md`. `docs/seo-context.pdf` is generated
  from it by `npm run context:pdf` - never edit the PDF.

> **Why this file exists.** Nearly every conclusion below was expensive to reach
> and easy to forget. Several were reached *twice* because the reasoning was not
> written down. If you are about to "improve" something here, read the reason
> first - most of these are deliberate trade-offs, not oversights.

---

## 1. Baseline - where we actually are

Google Search Console, 3-month window to **29 August 2026** (read 31 Aug):

| Metric | Value | 25 Aug | 14 Aug |
|---|---|---|---|
| Clicks | **54** | 38 | 16 |
| Impressions | **2,200** | 1,460 | 626 |
| CTR | **2.5%** | 2.6% | 2.6% |
| Average position | **16.5** | 16.4 | 15.8 |
| Distinct queries | **162** | 39 | - |

**Clicks +42% and impressions +51% in four days; the query count more than
quadrupled.** The query count is the number that matters most here. Going from
39 to 162 distinct queries means Google has stopped treating us as a handful of
pages about Jump Desktop and started matching us across the whole category.

Position holding flat at ~16.5 while impressions grow is the expected shape and
is **not** a regression - see the note in §10 on reading position correctly.

**Brand vs non-brand:** `servey` is 9 clicks / 257 impressions - **17% of clicks
from 12% of impressions.** Brand share of clicks has gone 44% -> 24% -> 17% over
three readings while brand click volume stayed flat at 9. Non-brand is now
carrying essentially all growth. That was the goal of this whole strategy.

**Attribution caveat:** the 162-row query table accounts for only **23 of the 54
clicks**. GSC anonymises rare queries, so ~31 clicks are unattributable to a
specific term. Cluster click counts below are therefore floors, not totals.

**Index coverage (verified 31 Aug 2026):**
- **Google** - sitemap submitted, now **38 URLs**.
- **Bing - the blocking status is `Discovered but not crawled`, not "not indexed".**
  Two corrections landed here on 1 Sep, in this order:
  1. The original note said "indexed... so that pipe is connected." Never
     verified. Wrong.
  2. The replacement said "9 URLs indexed of 34, not one comparison post among
     them," taken from **Site Explorer**. **Also wrong** - Site Explorer
     undercounts. `screens-vs-jump-desktop` returns **"Indexed successfully"**
     under URL Inspection while being **entirely absent from Site Explorer**,
     on both the `Indexed URLs` and `All URLs` filters.
- **Site Explorer is not the index. Use URL Inspection** (left nav) for any
  per-URL question. Site Explorer is a lagging, partial report and must not be
  used to conclude a URL is missing.
- **Full per-URL audit of the blog, 1 Sep.** Every post checked through URL
  Inspection; **16 Request indexing submissions made** (quota went 99 -> 83,
  confirming all 16 landed - the daily cap is **100**, not 10):

  | URL | Status before | Discovered | Submitted |
  |---|---|---|---|
  | `blog/splashtop-vs-jump-desktop` | Discovered, not crawled | 19 Aug | yes |
  | `blog/jump-desktop-vs-rustdesk` | Discovered, not crawled | 31 Aug | yes |
  | `blog/chrome-remote-desktop-vs-jump-desktop` | Discovered, not crawled | 19 Aug | yes |
  | `blog/jump-desktop-vs-teamviewer` | Discovered, not crawled | 31 Aug | yes |
  | `blog/screens-5-alternatives` | Discovered, not crawled | 31 Aug | yes |
  | `blog/control-iphone-from-mac` | Discovered, not crawled | 31 Aug | yes |
  | `blog/headless-mac-mini-setup` | Discovered, not crawled | 31 Aug | yes |
  | `blog/anydesk-vs-teamviewer` | Discovered, not crawled | (null) | yes |
  | `blog/rustdesk-vs-anydesk` | Discovered, not crawled | 26 Aug | yes |
  | `blog/termius-alternative-mac-terminal` | Discovered, not crawled | 16 Aug | yes |
  | `blog/does-mac-screen-sharing-work-over-the-internet` | Discovered, not crawled | 24 Aug | yes |
  | `blog/what-replaced-back-to-my-mac` | Discovered, not crawled | (null) | yes |
  | `blog/control-your-mac-from-iphone-ipad` | **Indexed** (pre-rebuild copy) | - | yes, recrawl |
  | `blog/screens-jump-desktop-alternative-mac` | **Indexed** | - | yes, recrawl |
  | `blog/access-your-mac-remotely-over-cellular` | **Indexed** | - | yes, recrawl |
  | `blog/who-is-servey-for-developers-home-labs` | **Indexed** | - | yes, recrawl |
  | `blog/screens-vs-jump-desktop` | **Indexed** | - | no, unchanged |
  | `blog/best-remote-desktop-for-mac` | **Indexed** | - | no, unchanged |

- **So Bing's real coverage was better than Site Explorer implied but worse than
  Google's:** roughly 6 of 18 posts indexed, the rest sitting uncrawled. Note
  `control-your-mac-from-iphone-ipad` was indexed as the **old pitch version**,
  pre-31-Aug rebuild - a recrawl was requested for exactly that reason.
- Several rows report `Discovered on 01 Jan 2006`, which is a null placeholder,
  not a real date. Do not read anything into it.

- **`Discovered but not crawled` is the tractable bucket.** Bing knows the URL
  and has not fetched it yet. This is *not* the equivalent of Google's
  `Crawled - currently not indexed`, which is a quality verdict; it is a crawl
  budget queue, and **Request indexing is the correct lever for it**. Bing's
  own copy on the panel says so.
- **Consequence still stands, with a smaller number:** ChatGPT Search reads
  Bing's index, so every comparison post stuck in this bucket is invisible to
  it. A distribution gap, not a content gap.
- Bing's sitemap read was last crawled **19 Aug (29 URLs)**, 5 behind live.
  IndexNow re-push of all 34 sent and accepted 1 Sep - note this alone did
  **not** move these URLs out of `Discovered but not crawled`, which is why
  per-URL Request indexing is needed on top of it.

### The core diagnosis - CORRECTED 1 Sep 2026

**The site is bimodal, and the 16.5 average is a meaningless midpoint between
two populations that behave completely differently.** Per-query position data
pulled 1 Sep (the metric was never enabled before, which is how this went
unnoticed for three readings):

| Query | Position | Impressions | Clicks |
|---|---|---|---|
| `splashtop vs jump desktop` | **2.3** | 9 | 1 |
| `jump desktop vs rustdesk` | **3.3** | 25 | 1 |
| `jump desktop vs chrome remote desktop` | **3.3** | 19 | 1 |
| `rustdesk vs jump desktop` | **3.8** | 17 | 4 |
| `jump desktop vs splashtop` | **4.0** | 8 | 1 |
| `servey` (brand) | 5.0 | 257 | 9 |
| `screens vs jump desktop` | 7.0 | 27 | 3 |
| `jump desktop vs screens 5` | 7.9 | 24 | 1 |
| `screens 5 vs jump desktop` | 10.8 | 24 | 1 |
| `remote control iphone from mac` | **44.6** | 23 | 0 |
| `remote access mac from iphone` | **40.0** | 18 | 0 |

**The comparison cluster is already on page one - top five for most of it.** The
core product cluster is on **page four to five**. Averaging those two gives 16.5,
a number that describes nothing real and that we have been reasoning from since
14 August.

**What this changes:**

1. **"We are stuck on page two, it is an authority problem" was wrong as
   stated.** We are on page one where we have topical depth (six Jump Desktop
   comparisons) and on page four where we have one page. Authority is still the
   binding constraint on the *core* cluster, but the comparison cluster proves
   the site can rank when the topic is covered properly.
2. **The §4 ruling against metadata work was based on the bad average and is now
   partially lifted** - see that section. CTR at position 3 is not evaluated
   against the same benchmark as CTR at position 16.
3. **The core-cluster rebuild of 31 Aug cannot be judged on CTR.** At position
   40 the page is not being seen, so a flat click count over the next fortnight
   means nothing. Watch **position**, not clicks, for that page.

**Index coverage (verified 1 Sep 2026):** 28 indexed, 3 not indexed (2 "Page
with redirect", 1 "Discovered - not indexed"). **"Crawled - currently not
indexed" is 0**, which is the bucket that carries a quality verdict. There is
**no index bloat** and nothing has been rejected on quality grounds.

---

## 2. What the query data proves

All 162 queries, clustered (3-month window to 29 Aug 2026):

| Cluster | Phrasings | Impressions | Clicks | Verdict |
|---|---|---|---|---|
| **Competitor vs competitor** (Jump Desktop is in nearly all of them) | ~20 | ~235 | **14** | ✅ Earns every attributable non-brand click |
| **Control Mac FROM iPhone** (`remote access mac from iphone`, `control mac with iphone`, ...) | **55** | **~120** | **0** | ❌ Our core product intent. Biggest miss on the site |
| **Control iPhone FROM Mac** (`remote control iphone from mac`, ...) | 13 | ~46 | 0 | ❌ Inverse intent - we had no page for it at all |
| **Headless Mac mini** (`headless mac mini setup`, `macos headless mode`, ...) | 12 | ~32 | 0 | ❌ How-to intent; we only had a "why" page |
| **AI on Mac** (`mac ai agent`, `run local ai on mac`) | 10 | ~26 | 0 | Three posts already; saturated, do not add more |
| **Screens 5 pricing** (`screens 5 cost`, `screens 5 price`) | 4 | ~17 | 0 | Commercial intent, uncovered. Blocked: pricing not verifiable |
| `airplayuiagent`, `publicrelay`, `splashbuddy` | 5 | ~8 | 0 | Accidental - macOS process names. Ignore |

**The finding that reset priorities on 31 Aug:** the *"control my Mac from my
iPhone"* family - Servey's exact job - produces **~120 impressions across 55
distinct phrasings and converts zero of them.** It is by far the largest cluster
on the site and the only one where we should be the definitive answer.

The cause was diagnosable by reading the page. `control-your-mac-from-iphone-ipad`
was written as a *pitch* ("what good Mac remote control should feel like"), not
as a *guide*. It never mentioned System Settings, Screen Sharing, VNC or any
actual step. Google ranked it for the topic and then buried it, because the
queries are overwhelmingly `how to ...` and the page answered nothing. Rebuilt
31 Aug as a real how-to that leads with Apple's free built-in route.

**Four conclusions that drive every content decision:**

1. **Comparison content is the only proven format** - specifically
   *competitor-vs-competitor*, where Servey is **not** the subject. We rank by
   genuinely helping someone choose between two other products.
2. **Fragmentation is the failure mode.** 55 phrasings of one intent with zero
   clicks is what Google does when it reads a site as marginally relevant to all
   of a group and authoritative on none.
3. **A page that pitches instead of answering cannot rank for a how-to query**,
   however well optimised. Lead with the free/built-in answer, then position
   Servey against the part it genuinely does not solve. This is exactly the
   shape that made `does-mac-screen-sharing-work-over-the-internet` convert.
4. **Check for inverse intent.** ~46 impressions were people wanting the
   *opposite* direction (their iPhone from their Mac). Serving that on its own
   page both captures the traffic and stops it diluting the core page.

---

## 3. What we DO

### Content
- **Write competitor-vs-competitor comparisons.** The proven format. Currently:
  `screens-vs-jump-desktop`, `jump-desktop-vs-teamviewer`,
  `jump-desktop-vs-rustdesk`, `rustdesk-vs-anydesk`, `screens-5-alternatives`,
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
- **Name Servey in the first ~15% of the article, and measure it with
  `npm run build && npm run seo:framing`** (`scripts/servey-depth.mjs`), which
  runs against rendered HTML because reading order is the thing being measured.
  **Three** metrics, not two:
  - **first-mention depth ≤15%** - where the word first appears.
  - **substance ≤35%** *(added 5 Sep)* - where the first real paragraph (≥25
    words) or `<h2>` naming Servey starts, **excluding the lede**. Depth alone
    is satisfiable by a table cell and *was* satisfied on all four 5 Sep posts,
    which the owner still read as burying Servey: depth 4.9-9.0% while the
    first Servey-bearing section sat at 49-69%. **Depth says the word is
    early; substance says the reader is.**
  - **density 4.0-6.0 per 1k words** (posts under 700 words are allowed up to
    9.0 - a short post runs over mechanically).
  These apply to **informational** posts. **Comparison and roundup posts are
  exempt from depth and substance by design** - §3 says keep Servey out of the
  hero slot there - so the script classifies by slug and only reports those two
  for them. Do not "fix" a comparison post's late Servey section.
  The fix when substance is deep is **a short-answer paragraph after the
  opening table** that answers the question and names Servey in it with an
  explicit "the app we make" disclosure - not more mentions. Trimming words
  while keeping mentions pushes density up and reads as an advert. The
  informational posts both drifted to 56% and 63% because they had no reason to
  name Servey until the dedicated section - a reader on a phone scrolls a long
  way before learning a product exists. The fix that works is **structural, not a
  pitch**: give the post's table a Servey column, or name Servey inside the row
  or list item it genuinely belongs to, alongside the competitors.
- **On pages used for outreach, keep the honest "No".** The Back to My Mac table
  says Servey does *not* mount your Mac's disk in the Finder, because it doesn't.
  A table that only says yes is worth nothing to a reader, and an editor deciding
  whether to swap a dead citation for our page will not link to an advert.

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
- **`npm run seo:audit`** before/after deploys. Currently **38/38 pass**
  (run it against a local build with `--base=http://localhost:PORT` to cover
  pages that are not on the live sitemap yet - the default base is production,
  so new posts are silently skipped on the run that matters most).

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
| **Add our own links to Wikipedia** (dead-link building) | Verified 24 Aug: Wikipedia renders external links as `rel="nofollow"` sitewide, so they pass no ranking signal. Adding our own also violates WP:COI/WP:REFSPAM, where the failure mode is `servey.in` on the public Wikipedia spam blacklist. Wikipedia is downstream of independent press, not a substitute. Broken-link building **off** Wikipedia is fine and is our active tactic - see `docs/BACKLINKS.md`. |
| Buy links, use PBNs, or exchange links | Cheap short-term, fatal long-term. |
| **Work a bulk "N places to get backlinks" list top to bottom** | Triaged one of 75 on 26 Aug: **9 were usable now.** The rest were editorial placements you must earn (Forbes, TechCrunch), revenue-gated directories we cannot enter pre-launch, review sites needing real customers, open-source-only listings, or content farms. Submitting to dozens of unrelated low-quality directories in a burst is the classic footprint of a link scheme, and on a domain with 2 referring domains it is the *only* pattern in our profile. Pick for relevance, submit steadily, and never post the same text everywhere without a canonical. See `docs/BACKLINKS.md` §6. |
| Keyword-stuff, cloak, or hide text | Trivially detected; the fragmentation fix is pillar pages, not stuffing. |
| Publish thin AI-generated filler to inflate page count | Google's QRG §4.6.5–6 targets exactly this. Page count is not the goal. |

### Not now - strategy
| We don't | Why |
|---|---|
| **Chase "recommend me a tool" AI queries** | Verified 16 Aug: ChatGPT answered "tool to screen share to my Mac from my phone" with Chrome Remote Desktop, AnyDesk, TeamViewer. **Correctly** - Servey has nothing to download, so recommending it would be a worse answer. Structurally unwinnable until launch. Do not treat it as an SEO failure. |
| **Chase "termius alternative" broadly** | It would pull multi-host-SSH searchers who bounce, polluting waitlist quality pre-launch. The honest overlap is narrow: "run a terminal on your own Mac without SSH setup". |
| **Compete on Termius's page axis** (SSH client × platform) | They hold #1 there. We copied their *template technique* onto a different axis - **task × device** - where they do not rank at all. |
| **Add more pages targeting "control Mac from iPhone"** | That recreates the exact fragmentation `/control-mac-from-iphone` was built to fix. One pillar, many spokes. |
| **Rewrite metadata sitewide to chase CTR** | Still ruled out as a *bulk* exercise. But the original reasoning ("above par for position 16.4") **used the misleading site average** and is void - see §1. Targeted work on the specific page-one comparison URLs is now allowed, and only those. |
| **Build doorway pages per query variant** | The 10 phrasings get absorbed by one strong page, not 10 weak ones. |
| **Do multilingual / translated SEO** | Considered 24 Aug and deliberately held. 19 posts x 7 locales is 133 URLs on a domain with **2 referring domains** already averaging position 16.3. Translations multiply pages, not authority, and scaled machine translation without human review is named in Google's spam policies. The tactic works for language-independent utility queries ("instagram photo downloads"); ours are niche Mac comparison queries whose product names, docs and buyers are all English. Revisit once referring domains are in double digits, then as a **one-language, 4-post pilot** chosen from GSC Countries data - never a 7-locale bulk translation. |
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
| Control Mac from iPhone | `/control-mac-from-iphone` | `blog/control-your-mac-from-iphone-ipad` (the how-to half - see §2) |
| Control iPhone from Mac (inverse intent) | `blog/control-iphone-from-mac` | - |
| Terminal from iPhone | `/terminal-on-iphone` | `blog/real-terminal-on-your-mac-from-iphone` |
| Terminal from iPad | `/terminal-on-ipad` | - |
| Headless Mac mini / macOS headless mode | `/headless-mac-mini` | `blog/headless-mac-mini-setup` (setup), `blog/control-a-headless-mac-mini-remotely` (access) |
| Run local AI on Mac / mac ai agent | `/remote-mac-for-ai-agents` | `blog/run-ai-agents-locally-on-your-mac`, `blog/run-ai-agents-on-your-mac-remotely`, `blog/stay-in-control-of-ai-agents-from-anywhere` |
| Developer remote Mac access | `/mac-for-developers` | `blog/who-is-servey-for-developers-home-labs` |
| Mac home lab | `/mac-home-lab` | - |
| Cellular / strict networks | `blog/access-your-mac-remotely-over-cellular` | - |
| Screens vs Jump Desktop | `blog/screens-vs-jump-desktop` | `blog/screens-jump-desktop-alternative-mac` |
| Back to My Mac replacement | `blog/what-replaced-back-to-my-mac` | `blog/does-mac-screen-sharing-work-over-the-internet` |
| RustDesk vs AnyDesk | `blog/rustdesk-vs-anydesk` | - |
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

See [`docs/DEMO-VIDEO.md`](DEMO-VIDEO.md) for what the existing footage can and cannot
be used for, and the shot list for recording it properly.
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
2. **Close the Bing crawl gap (new, 1 Sep).** The comparison posts sit in
   `Discovered but not crawled`, so ChatGPT Search - which reads Bing's index -
   cannot see the only cluster we rank page one for. Fix via **URL Inspection ->
   Request indexing**, one URL at a time. **Not** via Site Explorer, which only
   lists URLs Bing already crawled and therefore cannot reach these.
   **Status 1 Sep: 16 URLs submitted (see change log); sitemap cleaned and
   resubmitted by the owner - 1 known sitemap, 0 warnings, 34 URLs discovered,
   crawled 1 Sep.** What remains is waiting for Bing to actually crawl: re-inspect
   a sample in ~a week, starting with `splashtop-vs-jump-desktop` and
   `control-your-mac-from-iphone-ipad`. **5 Sep: done - 12 URLs submitted
   (4 new, 4 rewritten, 4 minor) and the sitemap resubmitted; quota 100 -> 88
   confirms all 12 landed.** Two things still owed: the 1 Sep batch has now had
   4 days, so re-inspect that sample; and GSC Request Indexing for the 8 tier-1
   and tier-2 URLs is **the owner's to do** - Bing is done, Google is not.
3. **Fix the 13 posts `seo:framing` flags (new, 5 Sep, not yet done).** The
   new script surfaced pre-existing failures; **none were touched**, because
   rewriting 13 posts was not what was asked. Worth doing in priority order:
   - **`control-your-mac-from-iphone-ipad` (substance 70%) and
     `headless-mac-mini-setup` (65%).** Both were explicitly "fixed" on 31 Aug
     for *depth* - 4% and 3% - and both still bury Servey. Same blind spot,
     same posts, which is the strongest evidence the new metric was needed.
   - **6 short posts at 69-79% depth**: `real-terminal-on-your-mac-from-iphone`,
     `access-your-mac-remotely-over-cellular`,
     `control-a-headless-mac-mini-remotely`, `run-ai-agents-on-your-mac-remotely`,
     `run-ai-agents-locally-on-your-mac`, `stay-in-control-of-ai-agents-from-anywhere`.
     All 360-575 words, all naming Servey only in a closing section.
   - **Density too high**: `who-is-servey-for-developers-home-labs` (16.6) and
     `termius-alternative-mac-terminal` (16.4) are Servey-centric by design, so
     check whether the *post* is right before changing the number.
     `splashtop-vs-jump-desktop` (6.7) and
     `chrome-remote-desktop-vs-jump-desktop` (6.5) are marginal.
4. **Capture the Mac host's SESSIONS screen (new, 5 Sep).** The persistent-
   sessions feature card ships a styled placeholder, because the standing rule
   is placeholders and never mocked-up UI. It is now the most important feature
   on the page with no picture, and it is the one a visitor is least likely to
   believe without seeing. One screenshot from the owner closes it -
   `public/screenshots/terminal-sessions.png`, then flip `ready` to `true` in
   `lib/screenshots.ts`. **Check the desktop for personal data before sending**
   (see the `hero-devices.png` and `Servey_Live_Demo.mov` precedents in
   `docs/CONTEXT.md`).
5. **Reddit participation** in r/macapps and r/homelab - genuine, not promotional.
6. ~~Email the waitlist.~~ **Ruled out by the owner** - no bulk or broadcast
   sends to existing waitlist members. Do not re-propose this.
7. **BetaList / Peerlist / Uneed** submissions.
8. **Add `VideoObject` schema** once the demo exists.
9. Re-test AI citation on **comparison** queries in ~2 weeks.
10. At launch: App Store listing, AlternativeTo submission, Show HN.

**Explicitly not on this list:** more landing pages, more metadata rewrites,
more schema. On-site SEO has reached sharply diminishing returns. What is missing
is that **nobody has ever seen Servey move.**

---

## 12. Change log

| Date | Change |
|---|---|
| 2026-09-05 | **Bing: 12 URLs submitted and sitemap resubmitted.** Worked out what actually changed rather than resubmitting everything - **4 new** (the new posts), **4 substantially rewritten** (`/`, `/blog`, `/privacy`, `/remote-mac-for-ai-agents`), **4 one-sentence edits** (the 3 posts carrying the retired overclaim, plus `control-iphone-from-mac`'s description fix). Method note: diffing `lib/blog.ts` naively reported **14** changed posts, all false - prettier had reflowed the file. The reliable check is to grep for the *specific replacement strings* and map each hit back to its slug, or compare rendered HTML; never trust a source diff after a formatter has run. **All 4 new posts were `Discovered but not crawled`, discovered 05 Sept** - that is IndexNow working (it got them into Bing's queue within hours) and simultaneously *not* working (queued is not crawled), which is the same split logged on 1 Sep. `/` was **`Indexed successfully`** but holding the pre-rebuild page - 6 features, 2 plans, no free tier, and the overclaim - so the recrawl request matters more there than anywhere else. **Quota went 100 -> 88, exactly 12**, which is the check to use; the success toast is easy to miss when batching. Sitemap re-submitted: last submit 9/5, status Processing, still 1 known sitemap / 0 errors / 0 warnings, and it will move 34 -> 38 once processed. **GSC left to the owner.** Advice given: spend GSC's ~10-12/day Request Indexing quota on the 8 in tiers 1-2 only and skip the 4 one-sentence edits, which Google will pick up unaided. |
| 2026-09-05 | **Owner: the new posts over-served the free how-to and buried Servey. Both true; the depth metric could not see the second one.** Depth measures the first *mention*, which a table cell or the lede satisfies - all four posts read 4.9-9.0% while the first paragraph that actually says what Servey does sat at **49%, 51%, 65% and 69%**. A reader on a phone scrolled past ~700 words of free tutorial first. This is the **31 Aug regression in a new costume**, and the rule written to stop it was satisfiable by a token, so a third metric now exists: **substance** (first ≥25-word paragraph or `<h2>` naming Servey, lede excluded) with a ≤35% ceiling, in `scripts/servey-depth.mjs` / `npm run seo:framing`. **Fixed structurally, per the 26 Aug precedent:** a short-answer paragraph after each opening table giving the real answer and naming Servey with a "the app we make" disclosure, plus naming Servey in the privacy-screen table's approach row (the only one of the four tables that did not). **Cut**, because the owner was right it was surplus and it was what pushed Servey down: pmset list 5→3 commands, the dummy-HDMI and heat/battery/FileVault paragraphs, the screen-vs-tmux paragraph, the shopping advice, the remediation walkthrough, `lsof` and two log commands - **every one of them duplicated a table row or its own FAQ answer verbatim.** Then removed 7 repeated Servey mentions, because trimming words while holding mentions took the closed-lid post to **9.3/1k**, which reads as an advert on exactly the pages the broken-link outreach points at. Final: depth 4.9-9.0%, substance 18-32%, density 5.8-6.2. `readingMinutes` corrected (closed-lid claimed 7 min for 971 words against a ~235 wpm site convention). **The script found pre-existing failures I have not touched - see §11.** |
| 2026-09-05 | **Site brought up to date with the app; 34 -> 38 URLs.** The site described the product as of roughly mid-July while four things had shipped since, so the copy work came before the content work. **Added:** a 7th feature card for **persistent sessions** (named tmux sessions on the Mac that outlive the app - the biggest change to the product and the one that converts the AI-agent persona already written into the page, which until now implied you had to sit and watch); a **Free column** in pricing (5-minute sessions, 5 a day, no card - the entire top of the funnel, previously invisible); the **second lock** in the privacy card and policy (master password set on the Mac, per-device approval, revocation - the page said only "device registration & approval"); and the **activity log** in the privacy policy. **Corrected: "video hardly touches our servers" was an overclaim** and appeared in **8 places**. True on LAN and for direct P2P, false on a strict NAT where the stream relays - which the Networking card admitted two sections earlier. Replaced everywhere with "P2P first; our own relay if your network insists", which is *stronger* now the relay is ours (`turn.servey.in`) rather than a vendor's. Also: launch FAQ no longer reads as less certain than the pricing section three scrolls above it; **macOS 15.3 / iOS 18.5 stated plainly** (narrow, excludes visitors, better learned before joining a waitlist than after); Terminal plan bullets rewritten (oldest copy on the page, and it undersold what the tier became). **Four posts**, each aimed at existing demand rather than at a feature name: `keep-terminal-session-running-after-disconnect` (SIGHUP, tmux, and why it is harder from a phone - no Control key for the prefix), `blank-mac-screen-during-remote-access` (why vendor privacy screens keep breaking on macOS - kernel/DriverKit extensions - and why the gamma-after-capture approach avoids every overlay failure mode; targets `teamviewer black screen mac`), `macbook-closed-lid-remote-access` (clamshell, dummy HDMI, what `pmset disablesleep` really changes), `who-connected-to-my-mac-remotely` (`last` vs `log show`, and the honest point that the unified log rolls over in hours). Depth 3.6-6.2%, density 5.4-6.0/1k, all measured **before** committing per the 1 Sep rule. **Every feature claim was verified against the app repo at `894c87f`, not against a changelog** - free-tier numbers read out of `SessionLimitManager`, deployment targets out of the pbxproj, relay host out of the ICE config. The audit that started this is an artifact the owner commissioned; treating its claims as requirements rather than facts was the right instinct, because two of them needed the source to confirm. Fixed `control-iphone-from-mac` at 161 chars, the one failing audit check. **Local audit 38/38, zero duplicate titles or descriptions across 40 rendered pages.** |
| 2026-09-01 | **Bing sitemap cleaned by the owner.** The 7 bogus rows (page URLs submitted as sitemaps on 16 Jul) deleted and `sitemap.xml` resubmitted. Bing now reports **1 known sitemap, 0 errors, 0 warnings, 34 URLs discovered, last crawl 1 Sep** - matching the live sitemap exactly and replacing the stale 19 Aug read at 29 URLs. Both remaining Bing inputs (sitemap freshness and per-URL crawl requests) are now clean; the only open Bing item is waiting for the crawl itself. |
| 2026-09-01 | **Bing crawl gap worked through: 16 URLs submitted for indexing.** Audited all 18 blog posts individually through URL Inspection and submitted every one that was either uncrawled or holding stale content. **12 were `Discovered but not crawled`** - Bing knew them and had never fetched them, including 5 of the 6 comparison posts that rank page one on Google. 4 more were indexed but stale and got a recrawl request, most importantly `control-your-mac-from-iphone-ipad`, which Bing was holding as the **pre-rebuild pitch version**. Only `screens-vs-jump-desktop` and `best-remote-desktop-for-mac` were left alone - indexed and unchanged. **Bing's daily quota is 100, not 10** (owner was right); it went 99 -> 83, which independently confirms all 16 submissions landed and is the check to use, since the success toast is easy to miss in a batch. Expect crawling over the following days; re-inspect a sample rather than assuming. |
| 2026-09-01 | **Correction to the same-day Bing entry below: Site Explorer undercounts, and "9 of 34 indexed" was wrong.** Checking individual URLs through **URL Inspection** shows `screens-vs-jump-desktop` **"Indexed successfully"** despite being absent from Site Explorer under both the `Indexed URLs` and `All URLs` filters. So the claim "not one comparison post is in Bing's index" was false, and it was drawn from a report that is not the index. **Rule: Site Explorer is a lagging partial report; use URL Inspection for any per-URL question, and never conclude a URL is missing from Site Explorer alone.** The real status of the uncrawled pages is **`Discovered but not crawled`** - Bing knows the URL and has not fetched it (`splashtop-vs-jump-desktop` discovered 19 Aug, `jump-desktop-vs-rustdesk` and `headless-mac-mini-setup` 31 Aug). This is **not** Google's `Crawled - currently not indexed`; it carries no quality verdict, it is a crawl queue, and **Request indexing is the right lever**. Two process notes: the IndexNow push earlier today did **not** clear these, so per-URL requests are needed on top of it; and the URL Inspection result panel **does not refresh when you type a new URL and press Enter** - it keeps showing the previous URL's verdict until you click **Inspect**, which briefly produced a false "Indexed successfully" for `headless-mac-mini-setup` here. Confirm the `urlToInspect` query parameter matches before believing a result. |
| 2026-09-01 | **Bing Webmaster Tools reviewed. Its two "duplicate content" warnings are false positives; the real finding is underneath them.** Both "too many pages with identical titles/meta descriptions" resolve to **one cause**: Bing indexes `https://servey.in/?ref=producthunt` as a page separate from `https://servey.in/`. Same page, tracking param on an inbound link nobody on our side generates (`grep` for `ref=producthunt` across the repo: no hits; not in the sitemap). Both URLs serve `<link rel="canonical" href="https://servey.in"/>`, verified live - Bing's SEO linter simply does not consult canonical before running this report. **No code change; do not "fix" this by rewriting metadata or disallowing the param**, which would break the canonical consolidation that is already working. Verified independently that the site has **zero** genuine duplicates: all 36 prerendered pages have unique `<title>` and `<meta name="description">`, every title <= 60 chars, every description within 120-165 (script: build, then diff extracted tags). **The real finding: Bing has indexed 9 URLs of 34** - see §1. Also confirmed the 7 bogus "sitemap" rows are still present (page URLs submitted as sitemaps on 16 Jul, all Warning / 0 URLs discovered); they are inert, not harmful, but they hide the one real row. IndexNow re-push of all 34 URLs sent and accepted. |
| 2026-09-01 | **Audited against the eight durable SEO strategies; two real defects found and fixed, one standing diagnosis corrected.** (1) **Per-query position enabled for the first time** - the site is bimodal, comparison cluster at **2.3-7.9 (page one)** and core product cluster at **40-44.6 (page four)**. The 16.5 average we have reasoned from since 14 Aug is a midpoint between two unrelated populations. §1 core diagnosis rewritten; the §4 ban on CTR/metadata work is **partially lifted**, because it was justified with that bad average. (2) **Internal links: 2 true orphans.** Simulating `relatedPosts()` rather than counting raw keyword overlap showed `screens-vs-jump-desktop` - our **best non-brand page**, position 7.0 - receiving **zero inbound internal links**, because a top-3-by-overlap rule lets hubs crowd out mid-tier pages. Raising the count to 4 or 5 does not fix it and concentrates hubs further (max inbound 7 -> 10), so fixed at keyword level: `Screens vs Jump Desktop` added to `screens-5-alternatives` (30 Screens / 12 Jump Desktop mentions) and `connect to Mac behind CGNAT` to `headless-mac-mini-setup` (has a full section on CGNAT). **All 23 posts now have >= 1 inbound; min 1, max 7.** (3) **Index bloat: none.** 28 indexed, "Crawled - not indexed" **0**. (4) Keyword cannibalization: checked and **not present** - `keywords` drives `relatedPosts()` and inert `<meta keywords>`, so 9 posts sharing `best remote desktop for Mac` is a hub, not competition. Real cannibalization would be two pages targeting one query in title/H1, and the `/control-mac-from-iphone` vs `blog/control-your-mac-from-iphone-ipad` pair is deliberately split commercial/informational. |
| 2026-09-01 | **Servey framing regression on the 31 Aug posts, caught by the owner.** The rule in §3 (first mention <=15% depth, density 4.0-6.0/1k) was written on 26 Aug in response to this exact complaint, and the two new posts broke it: `control-iphone-from-mac` **77% depth / 3.2 per 1k**, `headless-mac-mini-setup` **76% / 1.8** - less than half the density floor. The specific failure the owner quoted was the phrase pattern *"a VPN or an app that handles the networking, such as Servey"*: Servey demoted to a trailing example of a category, listed after the alternative, in a subordinate clause. **Cause worth remembering:** the §2 finding that day was that the old core page failed *because it pitched instead of answering*, so I over-applied "lead with the free built-in answer" and let it suppress Servey everywhere, including in FAQ answers where it does not apply at all. Leading with the honest free option is a rule about the *opening frame of an informational section*, not a licence to bury the product. Fixed to **6% / 5.2, 4% / 4.6, 3% / 5.2**, all passing. Every honesty caveat verified intact afterwards (Servey does not control iPhones; Tailscale genuinely good; Apple-only; cannot be self-hosted; Screen Sharing free and already installed). **Check depth and density before committing a post, not after.** |
| 2026-08-31 | **Link-graph fix on arrival.** `headless-mac-mini-setup` shipped with **1 inbound post**, the same failure mode logged on 23 Aug. Added `headless Mac Mini remote control` as a 6th keyword to `real-terminal-on-your-mac-from-iphone` (4 headless mentions, genuinely about driving one from a shell) and `Mac Mini home server` to `who-is-servey-for-developers-home-labs` (4 Mac mini mentions). **Inbound 1 -> 3.** `control-iphone-from-mac` arrived with 3 and needed nothing. Reminder for future posts: check inbound overlap *before* committing, not after - keyword overlap is the entire internal link graph (§6). |
| 2026-08-31 | **GSC query count went 39 -> 162, which exposed the real problem.** Pulled the full query list rather than the top 10 and clustered it (§2). The `control my Mac from my iPhone` family - Servey's exact job - was **~120 impressions across 55 phrasings, converting zero**, the largest cluster on the site. Cause was legible on the page: `control-your-mac-from-iphone-ipad` was a pitch, not a guide, and never named System Settings, Screen Sharing or VNC while the queries were overwhelmingly `how to ...`. **Rebuilt it as a genuine how-to** that leads with Apple's free built-in route, then places Servey against the away-from-home case it does not solve - the same shape that made `does-mac-screen-sharing-work-over-the-internet` convert. Added a 4-row approaches table, 7 FAQs replacing 3 pitch-only ones, `metaTitle`, and 7 keywords covering the actual phrasings. This page is the *informational* half of the pair; `/control-mac-from-iphone` stays the commercial half, so the rewrite reduces overlap rather than creating it. |
| 2026-08-31 | **Two posts, 32 -> 34 URLs, both chosen from zero-click clusters rather than by adding more competitor comparisons.** `control-iphone-from-mac` serves **inverse intent** - ~46 impressions across 13 phrasings of people wanting their *iPhone* from their *Mac*, which we had no page for and which was diluting the core page. Answered honestly with iPhone Mirroring (requirements verified against Apple support 120421) including the limitation that decides the question: the phone must be locked and *near* the Mac, so it is not remote access, and iOS permits no third-party equivalent. States plainly that **Servey does not control iPhones** before pivoting to the direction that does work. `headless-mac-mini-setup` serves ~32 impressions of *setup* intent (`headless mac mini setup`, `macos headless mode`) that the existing access-oriented post does not answer; real commands, and the FileVault-vs-auto-login trade-off stated as a trade-off rather than a recommendation. Link-worthy for the r/homelab outreach in BACKLINKS §2. |
| 2026-08-31 | **Servey row highlighting.** The green-border treatment added 27 Aug only detected a Servey *column*. Tables comparing *approaches* (rather than products) put Servey in a row, so the rebuilt core post got no highlight. Extended `app/blog/[slug]/page.tsx` to detect either orientation. |
| 2026-08-31 | **Not written: a `screens 5 cost` post** (~17 impressions, pure commercial intent, uncovered). Edovia does not publish pricing on the product page, and shipping figures we cannot verify - or vague copy that ranks for nothing - both fail. Revisit only with a verifiable source. |
| 2026-08-26 | **Servey raised in the two Apple-tools posts.** First-mention depth was 63% (`what-replaced-back-to-my-mac`) and 56% (`does-mac-screen-sharing-work-over-the-internet`), against 3% on `jump-desktop-vs-rustdesk` and 12% on `rustdesk-vs-anydesk`. The comparison posts score well because they lead with a table carrying a Servey column; the informational posts had tables with no Servey in them. Fixed structurally rather than by adding copy: the Back to My Mac jobs table gained a Servey column plus a terminal row (and an honest **No** on mounting the disk in the Finder), and the Screen Sharing approaches table - whose shape is approach x cost, so a Servey column would be a category error - instead names Screens, Jump Desktop, RustDesk and Servey inside the row they all belong to. Both posts now open the short-answer section by naming all four routes with a `which is the app we make` disclosure. **63% -> 14% and 56% -> 14%**; density 5.9 and 6.6 per 1k. The disclosure and the honest No are load-bearing here, not decoration: these are the pages the AppleInsider / MacRumors / 9to5Mac broken-link outreach points at. |
| 2026-08-26 | **Two posts, 30 -> 32 URLs.** `what-replaced-back-to-my-mac` exists to serve the broken-link campaign: AppleInsider, MacRumors and 9to5Mac all cite `support.apple.com/en-us/HT208922`, which still 404s (re-verified today, along with the other three dead Apple URLs). Our only replacement resource was `does-mac-screen-sharing-work-over-the-internet`, which covers Back to My Mac in a single section - Back to My Mac appeared 4 times sitewide, all inside that one post. An exact-match page makes the swap an easier yes for an editor. `rustdesk-vs-anydesk` feeds the only cluster earning non-brand clicks; RustDesk positions itself against AnyDesk explicitly, and the open-source axis already converts via `jump-desktop-vs-rustdesk`. Link graph engineered rather than incidental: `Back to My Mac replacement` added as a 6th keyword to the Screen Sharing post (it genuinely has a section and an FAQ on it), giving inbound counts of **6 and 3 on arrival** against the 1 the previous post shipped with. Includes the AnyDesk 2024 production-systems incident, stated with its disclosure and cert rotation, because the comparison axis is literally auditable-vs-trust-the-vendor and omitting it would be dishonest. seo:audit 32/32. |
| 2026-08-23 | `does-mac-screen-sharing-work-over-the-internet` - first post in the Apple-tools cluster. Apple Remote Desktop appeared **0 times** anywhere on the site; Screen Sharing and VNC appeared only as passing mentions inside comparison posts, with one keyword entry sitewide (`VNC alternative Mac`). No page targeted Apple's built-in tooling. Targets the Screen Sharing variant of the query (higher volume than the ARD variant Macky targets) and covers ARD and Remote Management inside it. Link graph: shipped with 1 inbound, so `macOS Screen Sharing` was added as a 6th keyword to the three posts that genuinely discuss it (`chrome-remote-desktop-vs-jump-desktop` 7 mentions, `best-remote-desktop-for-mac` 6, `screens-5-alternatives` 5) - inbound 1 -> 2, outbound now 3 topically-matched posts. **29 -> 30 URLs.** |
| 2026-08-23 | **Comparison posts re-pitched.** The 6 comparison/roundup posts read as neutral review-site content: `jump-desktop-vs-teamviewer` had 2 Servey mentions in 1,526 words (1.3/1k), `anydesk-vs-teamviewer` 2 in 1,298. Their `Where Servey fits` sections actively deflected ("it does not compete with either of these", "pick one of the two above") and all 5 `Bottom line` sections had no Servey at all. Added a **Servey column to all 5 head-to-head tables** (each already ended with a `Real terminal | No | No` row), rewrote every Servey section to lead with real advantages (hardware HEVC sharpness, shell + screen one tap apart, zero config, P2P E2E, CGNAT, price), and added a closing pitch to each `Bottom line`. Honest competitor-is-better sections kept intact. Density 1.3-4.8/1k -> 4.0-6.0/1k. |
| 2026-08-19 | **Internal-linking fix:** the 7 use-case pages were orphaned - they cross-linked to each other but nothing linked in, so the homepage emitted only 4 internal links (`/`, `/blog`, `/privacy`, `/terms`). GSC counted 33 internal links sitewide with `/privacy`, `/terms`, `/blog` as top targets, i.e. the footer was the only link graph Google saw. Added a footer `Use cases` nav (homepage 4 -> 11 links) and a `Servey for this` block on posts inverting `relatedSlug`. |
| 2026-08-19 | 3 comparison posts (`splashtop-vs-jump-desktop`, `anydesk-vs-teamviewer`, `chrome-remote-desktop-vs-jump-desktop`), keyword-wired to `screens-vs-jump-desktop`. **26 -> 29 URLs.** |
| 2026-08-19 | Em dashes replaced with `-` across code comments and docs (owner preference). None were in rendered copy. `source-material/` left untouched as owner input. |
| 2026-08-16 | 3 comparison posts (`screens-5-alternatives`, `jump-desktop-vs-teamviewer`, `jump-desktop-vs-rustdesk`); `/control-mac-from-iphone` pillar; headless + local-AI pages retargeted; Speculation Rules; image `sizes` fix; `ImageObject` JSON-LD; og:image dimensions on all pages; `/blog` twitter card fix; `Article` publisher by `@id`; `scripts/seo-audit.mjs`. **22 → 26 URLs.** Sitemap re-read by Google: 26 discovered. |
| 2026-08-16 | PostHog analytics (lazy-loaded, first-party proxied, DNT honoured, no person profiles). |
| 2026-08-14 | 6 use-case landing pages; Termius comparison; `table` block type; breadcrumbs; RSS feed; 404 page; light-mode contrast and reduced-motion fixes. **15 → 22 URLs.** |
| Earlier | JSON-LD `@graph`; IndexNow; AI-crawler allowlist; `llms.txt`; comparison and roundup posts. |
