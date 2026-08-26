# Servey backlink playbook

Status as of 2026-08-26: **2 referring domains.** This is the single biggest
constraint on the site. Technical SEO is finished and content is ahead of the
field; nothing else moves the needle until this number grows.

Position 16.4 average is the symptom. Pages 2 and 3 are where good content on a
domain with no authority lands. Impressions grew 2.3x in the eleven days to
25 Aug without the average position improving, which is exactly what an
authority ceiling looks like: more relevance, same ranking band.

---

## 1. Two tactics we evaluated and what we concluded

### Wikipedia dead-link building - do NOT do this

The method: find `[dead link]` citations on Wikipedia, recreate the dead
resource, edit Wikipedia to point at your copy.

Why it fails here, in order of severity:

1. **Every external link on Wikipedia is `rel="nofollow"`.** Verified directly
   against the live `Virtual_Network_Computing` article: external links render
   as `<a rel="nofollow" class="external text">`. This has been sitewide policy
   since 2007. These links pass no ranking signal. "13 Wikipedia backlinks"
   means 13 nofollow links.
2. **Adding links to your own site violates WP:COI and WP:REFSPAM.** Editors
   patrol for exactly this pattern. The downside is not a reverted edit, it is
   `servey.in` landing on the Wikipedia spam blacklist, which is public,
   mirrored widely, and hard to reverse.
3. **Notability.** The articles that would plausibly cite us (Comparison of
   remote desktop software, Screen Sharing, Apple Remote Desktop) require
   independent secondary sources. A pre-launch product's own marketing blog is
   the textbook example of a non-independent primary source.

Wikipedia is **downstream of press coverage, not a substitute for it.** Revisit
after launch and after real independent coverage exists.

### Broken-link building off Wikipedia - DO this

Same underlying method, applied where the links are actually dofollow and the
outreach is legitimate: you email a site owner, they decide. No policy to
violate.

We have an unusually good asset for this. Apple killed Back to My Mac in macOS
Mojave (2018) and left dead documentation behind. Verified 404s:

- `https://www.apple.com/support/backtomymac/` -> 404
- `https://support.apple.com/en-us/HT204618` -> 404

Thousands of blog posts, forum answers and tutorials from 2010-2018 still link
to those URLs. All four were **re-verified as 404 on 26 Aug 2026.**

Our replacement resource is now an exact-match page, published 26 Aug:

**`https://servey.in/blog/what-replaced-back-to-my-mac`**

This matters for hit rate. Until now the only thing we could offer was
`does-mac-screen-sharing-work-over-the-internet`, which is a good post but
covers Back to My Mac in one section of a piece about something else. An editor
replacing a dead *Back to My Mac* citation wants a page about Back to My Mac.
The Screen Sharing post stays the secondary suggestion for pages whose dead
link was about Screen Sharing or Apple Remote Desktop rather than BTMM.

### Verified prospect list (checked 2026-08-24)

These pages are live, on-topic, and still link to a URL that returns 404. Each
was confirmed by fetching the page, extracting its apple.com links, and
resolving each link's status code.

The most valuable dead target is **`support.apple.com/en-us/HT208922`**, which
was Apple's own Back to My Mac deprecation notice. It now 404s and is cited by
three of the largest Mac publications.

| Page | Dead link it carries | Notes |
|---|---|---|
| AppleInsider - "three quick and easy alternatives to Back to My Mac" | `support.apple.com/en-us/HT208922` | Highest authority. Article is the canonical "what replaces it" piece. |
| MacRumors - "Apple Eliminating Back to My Mac Service" | `support.apple.com/en-us/HT208922` | News piece, still ranks. |
| 9to5Mac - "All versions of macOS losing Back to My Mac" | `support.apple.com/en-us/HT208922` | Same dead citation. |
| iMore - "Alternatives to Back to My Mac" | `help.apple.com/remotedesktop/mac/3.9/` | Title is a direct intent match for our post. |
| OWC / MacSales - "Three Ways to Remotely Access and Control a Mac" | `support.apple.com/kb/ht4908` | Also links a dead iTunes URL. |

Approach these in that order. AppleInsider, MacRumors and 9to5Mac all have
public tips/corrections addresses, and a dead-link correction is a normal,
welcome email to a newsroom rather than a pitch.

Note the framing that works here: you are reporting that **Apple's own
documentation link is broken**, which is true, verifiable in one click, and
useful to them regardless of whether they link back to us.

Search operators to find further pages:

```
"back to my mac" "apple.com/support/backtomymac"
"back to my mac" HT204618
"back to my mac" alternative -site:apple.com
site:reddit.com "back to my mac" replacement
site:apple.stackexchange.com "back to my mac"
```

Prioritise pages that are still maintained (recent comments, recent posts).
A dead site will not fix its links.

---

## 2. Ready-to-paste copy block

Use this verbatim for every directory so the listing text stays consistent.

**Name:** Servey

**Tagline (short, <=40 chars):** Your Mac. In your pocket.

**Tagline (medium, <=60 chars):** Control your Mac from your iPhone - screen and terminal

**One-liner (<=160 chars):**
Control your Mac from your iPhone or iPad. Crystal-clear screen mirroring plus
a real terminal. No VPN, no port forwarding.

**Short description (~300 chars):**
Servey is a native Apple app that puts your Mac in your pocket. Screen
mirroring with sharp text and pinch-to-zoom, plus a genuine shell on your Mac,
from your iPhone or iPad. Direct on your local network, private peer-to-peer
anywhere else. Sign in on both devices and your Mac appears.

**Long description:**
Servey is a native app for the Apple ecosystem: a host on your Mac, a client on
your iPhone and iPad. It gives you two things most remote tools treat as
either/or - crystal-clear screen mirroring and a real terminal - because in
practice you switch between them constantly.

On the same Wi-Fi it streams a hardware-encoded feed of your Mac's display:
sharp text, high frame rate, aspect-correct, nothing cropped. On a different
network it falls back to a private peer-to-peer connection that works even on
strict mobile and carrier networks. It switches automatically; you never pick a
mode.

Setup is signing in with Google on both devices. No VPN, no port forwarding, no
router configuration.

Built in Swift and SwiftUI. Not an Electron shell, not a Java port.

**Status:** Pre-launch, waitlist open. Not charged until launch.

**Pricing:** Terminal INR 99/mo (USD 1.99). Full access INR 299/mo (USD 4.49).

**Platforms:** macOS (host), iOS, iPadOS (client)

**URL:** https://servey.in

**Categories/tags:** Developer Tools, Productivity, Remote Work, macOS, iOS,
Mac apps, Remote desktop, SSH/Terminal

---

## 3. Directory targets

All verified reachable 2026-08-24. Ordered by fit, not by DR.

| Target | Pre-launch OK | Notes |
|---|---|---|
| BetaList | Yes | Purpose-built for pre-launch. Best single fit. |
| Peerlist Launchpad | Yes | Strong India founder community. |
| Product Hunt "Coming Soon" | Yes | Real page + email capture before launch day. |
| DevHunt | Yes | Dev-tools only. Highly relevant audience. |
| Uneed | Yes | Accepts upcoming products. |
| MicroLaunch | Yes | Small but easy. |
| Startup Fame | Yes | Easy listing. |
| SaaSHub | Yes | Also generates an "alternatives" page, which is a ranking surface. |
| Indie Hackers | Yes | Product page + the audience actually owns Macs. |
| AlternativeTo | At launch | Generally wants a shipped, installable app. |
| Lobste.rs | At launch | Invite only. |
| dev.to / Hashnode | Now | Republish the Medium piece with `canonical` set to servey.in. |

**Rule: never solicit upvotes** on Product Hunt, AlternativeTo, or anywhere.
Submit, then leave it alone.

---

## 4. Outreach template (broken-link)

Keep it short and lead with the thing that helps them, not the thing that helps
us.

> Subject: broken link on [page title]
>
> Hi [name],
>
> I was reading your piece on [topic] and the Back to My Mac link in it
> (apple.com/support/backtomymac) now 404s - Apple pulled the feature in Mojave
> and eventually took the docs down too.
>
> I wrote up what actually replaced it - what the feature really did, why
> Apple's own suggested alternatives don't cover the job, and the four options
> that do: https://servey.in/blog/what-replaced-back-to-my-mac
>
> Useful as a replacement or not, entirely your call - just wanted to flag the
> dead link.
>
> [name]

Do not follow up more than once.

---

## 5. What actually moves this fastest

Ranked honestly:

1. **The YouTube demo.** Raised repeatedly and still not recorded. A remote
   access product is a visual product; nothing else we can do converts as well
   or earns as many organic links.
2. **Launch.** Most of the highest-value surfaces (AlternativeTo, Show HN, App
   Store, Lobste.rs) require a shipped product.
3. **Broken-link outreach**, per section 1.
4. **Directory submissions**, per section 3. Low value each, but cheap and
   they compound.

---

## 6. Triage of the "75 places to get backlinks" list (26 Aug 2026)

A circulated list of 75 sites, sorted by Domain Rating. Worked through against
our actual constraints: pre-launch, no revenue, closed source, no downloadable
app, Apple-only, and 2 referring domains.

**Result: 9 are usable now.** The rest are blocked, irrelevant, or not the kind
of thing you can simply "get".

### The three things wrong with reading a list like this top to bottom

1. **Most of the high-DR entries are `nofollow`.** Reddit, Quora, Medium,
   Pinterest, Imgur, Flickr, GitHub and Wikipedia all mark outbound links
   `nofollow` or `ugc`. A DR 99 domain that passes no ranking signal is worth
   exactly as much as a DR 20 one that does. These are worth doing for
   **referral traffic and entity presence**, which is a real and separate
   benefit, but they are not link building and should not be counted as such.
2. **The list conflates three unrelated activities.** Self-serve profiles you
   can fill in today, editorial placements you must earn over months, and
   content farms you publish on yourself are not the same task and do not have
   the same value. Forbes and TechCrunch are not "places to get backlinks",
   they are outlets that write about you if there is a reason to.
3. **Doing all 75 would itself be the problem.** A burst of submissions to
   dozens of unrelated low-quality directories is the recognisable footprint of
   a link scheme, and on a profile with 2 referring domains it would be the
   *only* pattern visible. Relevance beats volume at this size.

Also worth noticing: **SEO Wins (DR 27)** sits at #20 in a list otherwise
dominated by DR 90+ names, and it is the list author's own product. Treat the
list as marketing for it, which does not make the good entries less good.

### Do now - the 9 that survive triage

| # on list | Target | Link | Why it survives |
|---|---|---|---|
| 19 | **Crunchbase** | nofollow | Free company profile. The canonical startup entity record, which is what AI engines and journalists check. Best new find on the list. |
| 21 | **GitHub** | nofollow | `JaneshKapoor/servey-website` is already public - its **Website field currently points at `servey-website.vercel.app`, not `servey.in`.** Free fix, see below. |
| 40 | **BetaList** | dofollow | Already in section 3. Purpose-built for pre-launch. |
| 60 | **Indie Hackers** | nofollow | Already in section 3. The audience actually owns Macs. |
| 17 | **Medium** | nofollow | Draft is written and sitting in `docs/medium/`. Set `canonical` to servey.in. |
| 68 | **dev.to** | dofollow-ish | Republish the Medium piece with canonical set. Genuinely relevant dev audience. |
| 62 | **Hashnode** | dofollow-ish | Same treatment. |
| 16 | **YourStory** | dofollow | India startup media, accepts founder submissions. Real fit for an INR-priced product from an India-based founder, and none of the other outlets on the list are. |
| 27 | **Reddit** | nofollow | Already ranked #3 in `SEO-CONTEXT.md` §9 as a most-cited source. Participation only, never a launch post. |

**The GitHub fix**, because it is free and currently wrong:

```
gh repo edit JaneshKapoor/servey-website \
  --homepage "https://servey.in" \
  --description "Marketing site for Servey - control your Mac from your iPhone or iPad."
```

The `servey-website.vercel.app` alias itself is **not** a duplicate-content
problem: verified 26 Aug that it serves `<link rel="canonical" href="https://servey.in">`
and its `robots.txt` declares `Host: https://servey.in`. Only the repo metadata
points at the wrong URL.

### Blocked until launch

AlternativeTo, Alternative Me, Hacker News (Show HN explicitly bars unreleased
work), Product Hunt full launch, Lobste.rs, App Store. Same reasoning as
`SEO-CONTEXT.md` §9.

### Blocked by revenue - we have none

TrustMRR, Latka, Starter Story, Failory, Revenue Memo, Boring Cash Cow, Micro
Founder, Milestones, Founder Reports. All of these gate on published revenue
figures. Pre-launch with zero revenue, there is nothing to submit, and
inventing a number is not on the table.

### Blocked by needing real customers

TrustRadius, PeerSpot. Both are review platforms requiring verified customer
reviews. We have no public users, and **inventing reviews is on the permanent
never list** in `SEO-CONTEXT.md` §4.

### Not applicable to this product

| Target | Why |
|---|---|
| Chrome Web Store | We have no browser extension. |
| SourceForge, OSS Gallery | Open-source projects only. Servey is closed source. |
| Privacy Tools | Listing criteria effectively require open source. |
| Gumroad | Nothing to sell pre-launch. |
| Toolify AI | An AI-tools directory. Servey is not an AI tool; listing it there is the kind of stretch that gets a listing rejected and teaches an engine the wrong thing about us. |
| Yelp | Local businesses. |
| Goodreads | Books. |
| Fandom, WikiHow | Editorial wikis, same COI problem as Wikipedia. |
| Pinterest, Imgur, Flickr, Pixabay, Pexels | Image hosts. Nofollow, no relevant audience. |
| MakerPad | No-code tooling. |
| StackShare | Would mean publishing our internal stack in detail. Swift/SwiftUI is already public in our own copy; going further is against the standing rule not to disclose the internal stack. |
| Wikipedia | Rejected with evidence in section 1. |

### Editorial - must be earned, not "gotten"

Forbes, TechCrunch, VentureBeat, Entrepreneur, Smashing Magazine, DZone,
Hackernoon, First Round Review, The Hustle, Foundr, SaaStr, AppSumo Blog,
Mixergy, My First Million, Indie Bites, SaaS Club, GrowthMentor, Niche Pursuits.

These are outlets and podcasts. The route in is a story, and pre-launch we do
not yet have one beyond "founder is building a thing". **The broken-link
campaign in section 1 is the version of this that works today**, because it
approaches a newsroom with something useful to them rather than something we
want from them.

### Self-publishing platforms - use sparingly

Substack, Blogger, HubPages, Vocal Media. Publishing your own content on a
high-DR domain is a self-made link, and search engines treat it accordingly.
One good republication with `canonical` set is worth doing. The same article
pasted across six platforms without canonicals is duplicate content competing
with our own page, which is actively harmful.
