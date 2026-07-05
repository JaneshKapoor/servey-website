# Product screenshots

Drop your real captures here, named exactly by their key, then flip that slot's
`ready` to `true` in `lib/screenshots.ts`. The `src` paths are already wired.

| File to add here | Shown | Capture (device screenshot) | Aspect |
|---|---|---|---|
| `hero-devices.png` | Hero, big iPad | Mac desktop mirrored on an **iPad (landscape)** | ~16:10 |
| `iphone-controls.png` | Hero small phone + Feature 02 | **iPhone** with the trackpad / control dock | 9:19.5 |
| `mirroring-ipad.png` | Feature 01 | Mac desktop full-screen on an **iPad (landscape)** | 16:10 |
| `terminal.png` | Feature 03 | The terminal running on an **iPhone** | 9:19.5 |
| `quality-closeup.png` | Feature 06 | Tight crop of razor-sharp remote text | 4:3 |
| `mac-host-ui.png` | (optional, unused slot) | The **Mac** host connect screen | 16:10 |

Notes:
- iOS/iPadOS screenshots are already PNG at the right aspect — no editing needed.
- Images are `object-cover`, so a slightly-off ratio just crops the edges.
- `dual-path` needs no image — it's the animated diagram.
- After adding files + flipping flags, commit & push; Vercel redeploys automatically.
