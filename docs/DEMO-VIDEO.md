# Demo video - footage notes and shot list

Written 2026-08-27 after cutting a 34s test edit from existing recordings.
**Verdict: the existing footage is not publishable.** The owner's call, and it
is the right one. This file records why, so the same edit is not attempted
twice, and what to record instead.

---

## 1. Source footage audit

### `Servey_Live_Demo.mov` (Desktop, 6m36s, 29 May) - DO NOT USE

An Xcode session, not a demo. Roughly 90% of frames show the IDE. Visible on
screen and legible at full resolution:

- `ContentView.swift` source, including the `SignalingMessage` construction
- File tree: `BonjourAdvertiser`, `ScreenCaptureManager`, `KeyboardController`,
  `MouseController`, `SignalingServer`, `TerminalManager`, `WebRTCManager`,
  `AuthManager`, `OAuthCallbackServer`, `iOSWebRTCManager`, and a **`Secrets`**
  file
- **`LiveKitWebRTC 144.7559.6`** in Package Dependencies
- Full local path under `/Users/.../serveyios/`

This is the internal tech stack the site deliberately does not publish - see the
`copy: soften FAQ - drop protocol-level tech-stack details` commit. It is also
an **iPhone Simulator**, not a real device, and the phone region is only ~416px
wide in a 2560x1440 frame, so it cannot be blown up.

### `IPad Screen Recording.MP4` (1640x2360 portrait, rotation 90 -> decodes
### 2360x1640 landscape, 60fps, 3m43s) - USABLE IN PARTS

Real device capture. Segment map:

| Range | Content | Usable |
|---|---|---|
| 0-35s | Home screen, Wi-Fi settings | No - lists other people's device names |
| ~37-43s | Servey connect screen: **Screen Sharing \| Terminal** cards | **Yes** |
| ~44-54s | Mac desktop mirrored, `REMOTE - CONNECTED` badge, on-screen trackpad with L/R, Dock | **Yes, best shot in the whole reel** |
| ~55-62s | Google homepage on the mirrored Mac | Marginal - Calendar event with a street address, Drive file list with third-party names |
| **~63-130s** | **Gmail inbox, wide open** | **No. Real senders and subject lines referencing PAN and certificates. Third-party data - not ours to publish.** |
| ~131-190s | **Terminal on iPad**: `ls`, `cd Desktop`, `ls`, with the esc/tab/ctrl/^C/^L shortcut bar | **Yes** |
| ~205-215s | Back to connect screen | **Yes** |

Persistent minor exposure across all frames: a thin tab-title band showing Gmail
inbox counts and a GitHub email-verification subject. Maskable with two blur
strips without losing the `REMOTE - CONNECTED` badge:

```
[0:v]split=3[base][r1][r2];
[r1]crop=2040:88:320:104,boxblur=16:3:8:3[b1];
[r2]crop=640:52:60:243,boxblur=10:3:6:3[b2];
[base][b1]overlay=320:104[t1];
[t1][b2]overlay=60:243
```

### `Servey Mac Side Recording.mov` (2940x1912, 60fps, 91s) - USABLE IN PARTS

Mac host app. Good beats: **Offline -> Online transition (~t=48-62)** and the
**permissions panel** showing Screen Recording and Accessibility granted
(~t=72). Avoid: browser tabs carry personal Gmail addresses, and ~t=86 shows
Wi-Fi network names including a personal hotspot and an organisation name.

---

## 2. Why the test edit did not work

The cut itself was fine - 34.3s, correct structure, masks held. The problem is
what the footage *shows*:

1. **The mirroring shot mirrors Servey's own Mac app.** Watching Servey's
   connect screen inside Servey is recursive and proves nothing. A demo has to
   show someone doing something **useful** on the remote Mac.
2. **Nothing is at stake.** `ls` and `cd Desktop` demonstrate that a shell
   exists, not why anyone would want one from a sofa.
3. **Pacing.** 15 seconds of real-time typing with no cuts.
4. **The scratch VO** (macOS Samantha) is flat. Fixable for $5 - see §4.

---

## 3. Shot list for recording it properly

Record on a **real iPhone or iPad**, screen recording on, in **one continuous
take per shot**. Use a **clean macOS user account** with an empty desktop, a
plain wallpaper, no mail client, and no browser tabs - this removes every
privacy problem above at source and costs ten minutes to set up.

| # | Shot | Why it earns its place |
|---|---|---|
| 1 | Phone on a desk, Mac visibly **across the room or shut** | Establishes the problem in one frame, no words needed |
| 2 | Connect screen, tap **Screen Sharing** | The two-things-in-one-app promise |
| 3 | Mac desktop appears - **pinch to zoom into small text** | The sharpness claim, which is our actual differentiator. Must be a real document or code, not Servey's own UI |
| 4 | Drive something with the **trackpad**: drag a window, right-click a file | Proves the input model that Jump Desktop and Screens are beaten on |
| 5 | Tap **Terminal**, run something with a **visible consequence** - restart a stuck dev server, `tail -f` a log that is actively moving | The "your build broke while you were on the couch" story from the landing page |
| 6 | Tap back to **Screen Sharing** without reconnecting | Shell and screen one tap apart - the thing no competitor does |
| 7 | End on the connect screen | Landing beat |

**Total target: 30-40s.** Record each shot 3 times.

The single most valuable frame in the entire reel is **#5**, because it is the
only one that shows Servey doing something a person actually needed doing.

---

## 4. Production stack (researched 2026-08-27)

- **Voice:** ElevenLabs Starter, **$5/mo**. The free tier **cannot be used
  commercially** and forces attribution. Iterate free on Kokoro-82M
  (`af_heart`, Apache-2.0, runs offline via `mlx-audio`), final take in
  ElevenLabs.
- **Music:** Uppbeat `build-up` / `trailer` categories, ~$7/mo for the
  perpetual licence and no attribution. Mixkit is the free fallback with the
  cleanest terms.
  **Avoid:** Epidemic Sound (licence dies if you cancel), Pixabay music
  (contributors fingerprint tracks - real Content ID claim risk), Suno/Udio
  (Sony's claims still live against both).
- **Editing:** `Vincentwei1021/video-shotcraft` (6.4k stars, Apache-2.0) plus
  the official `remotion-dev/skills`. Remotion is free at **3 people or fewer**;
  $25/seat/month above that.
  **Not** `Bomx/super-video-maker-skill` - **no LICENSE file** (all rights
  reserved), built for AI-avatar/UGC content, and ~$16.50 per render in
  Seedance b-roll alone.
- **Never** use an AI video generator for anything showing the product UI. No
  model as of Aug 2026 renders a specific real interface with legible labels;
  it will hallucinate our app. This is also the site's standing rule against
  fabricated screenshots.

---

## 5. Once it exists

- Add `VideoObject` JSON-LD - already flagged in `SEO-CONTEXT.md` §7.
- It unblocks the AlternativeTo submission, the Reddit posts, and the
  landing-page proof gap (question 4: *why should they believe you*), including
  the `PlayCircle` "See how it works" CTA at `components/sections/hero.tsx:78`,
  which currently anchors to a text section.
