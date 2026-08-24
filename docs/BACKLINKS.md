# Servey backlink playbook

Status as of 2026-08-24: **2 referring domains.** This is the single biggest
constraint on the site. Technical SEO is finished and content is ahead of the
field; nothing else moves the needle until this number grows.

Position 16.3 average is the symptom. Pages 2 and 3 are where good content on a
domain with no authority lands.

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
to those URLs. Our replacement resource already exists and covers the exact
ground the dead pages covered:

**`https://servey.in/blog/does-mac-screen-sharing-work-over-the-internet`**

Search operators to find the linking pages:

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
> I wrote up what actually replaced it, including why Screen Sharing alone
> can't reach a Mac from outside the network and the four options that do:
> https://servey.in/blog/does-mac-screen-sharing-work-over-the-internet
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
