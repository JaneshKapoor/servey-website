# DRAFT - not published

Every `<<FILL: ...>>` below is a measurement nobody has taken yet. This file is
deliberately NOT in `lib/blog.ts`, so it cannot ship by accident.

Run `scripts/benchmark/` first, fill the blanks, then move it into the posts
registry. Publishing this with invented figures would destroy the one thing
that makes the page worth linking to.

---

- **slug**: `servey-vs-screens-vs-jump-desktop-benchmark`
- **metaTitle**: `Mac remote desktop latency tested` (33)
- **title**: We measured latency and text sharpness on three Mac remote desktop apps
- **description**: Servey, Screens and Jump Desktop on the same Mac, the same
  network and the same test pattern. Measured latency, measured sharpness, and
  where each one loses.
- **keywords**: best remote desktop for Mac, Screens vs Jump Desktop, remote
  desktop latency, Mac screen sharing quality, control Mac from iPhone
- **date**: `<<FILL: date the runs happened>>`

## Lede

Every remote desktop app says it is fast and sharp. None of them publish a
number you can check. We ran the two measurements that actually decide whether
one of these is pleasant to use - how long the picture takes to reach your hand,
and whether 10px text survives the trip - on Servey, Screens and Jump Desktop,
on one Mac, one client and one network. The method and the scripts are public so
you can disagree with them precisely rather than vaguely.

## Table 1: the setup (fill before anything else)

| | |
|---|---|
| Mac | `<<FILL: model, chip, RAM, macOS version>>` |
| Client | `<<FILL: device, iOS version>>` |
| LAN | `<<FILL: router, band, client link rate>>` |
| Remote network | `<<FILL: carrier, tech, typical down/up>>` |
| App versions | Servey `<<FILL>>` · Screens `<<FILL>>` · Jump Desktop `<<FILL>>` |
| Camera | `<<FILL: phone, fps>>` (resolution limit +/- `<<FILL>>`ms) |
| Runs | `<<FILL: n>>` per app per network, median reported |

## Table 2: latency, same Wi-Fi (median ms)

| App | Median | Min | Max | Negotiated resolution |
|---|---|---|---|---|
| Servey | `<<FILL>>` | `<<FILL>>` | `<<FILL>>` | `<<FILL>>` |
| Screens | `<<FILL>>` | `<<FILL>>` | `<<FILL>>` | `<<FILL>>` |
| Jump Desktop | `<<FILL>>` | `<<FILL>>` | `<<FILL>>` | `<<FILL>>` |

## Table 3: latency, away from home (median ms)

Same shape. Report the network for each run; a mobile connection is not a
controlled environment and the post should say so.

## Table 4: text sharpness (SSIM against the Mac's own screenshot, 1.0 = identical)

| App | SSIM | PSNR dB | 9px legible? | 10px legible? |
|---|---|---|---|---|
| Servey | `<<FILL>>` | `<<FILL>>` | `<<FILL: yes/no, by eye>>` | `<<FILL>>` |
| Screens | `<<FILL>>` | `<<FILL>>` | `<<FILL>>` | `<<FILL>>` |
| Jump Desktop | `<<FILL>>` | `<<FILL>>` | `<<FILL>>` | `<<FILL>>` |

## Sections to write once the numbers exist

1. **What we measured and why** - the two things people notice; why frame rate
   is not on the list.
2. **How we measured it** - the flasher, the one-camera trick that removes clock
   sync, the SSIM pattern. Link the scripts. State the camera's resolution
   limit.
3. **Results on your own Wi-Fi** - table 2 and 4, a paragraph on what the gap
   feels like in use, not just what it measures.
4. **Results from outside** - table 3, and the honest caveat that a mobile
   network moves under you.
5. **Where Screens wins** - `<<FILL from the data>>`. It ships today, it is
   mature, and it may well beat us somewhere. Say exactly where.
6. **Where Jump Desktop wins** - `<<FILL from the data>>`. Reaches Windows and
   Linux, connects over RDP and VNC to machines with no host app, one-time
   purchase. None of that is affected by our numbers.
7. **Where Servey wins** - `<<FILL from the data>>`, plus what no measurement
   shows: a real terminal beside the screen, sessions that outlive the app.
8. **What we did not measure** - audio, multi-monitor, file transfer, Windows
   and Linux hosts, long sessions, battery.
9. **Run it yourself** - the scripts, and an invitation to publish contradicting
   numbers.

## Honesty checklist before publishing

- [ ] Every `<<FILL>>` replaced with a measured value
- [ ] Sections 5 and 6 name a real advantage, from the data
- [ ] Servey labelled as ours, and as pre-launch
- [ ] Exact versions and dates stated
- [ ] Raw output committed alongside, so the numbers can be checked
- [ ] Numbers sent to Edovia and Phase Five Systems before publication
