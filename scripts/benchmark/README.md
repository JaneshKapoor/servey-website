# Benchmark harness: Servey vs Screens vs Jump Desktop

Everything needed to produce the numbers for the benchmark post. The post draft
lives at `docs/benchmark-post-draft.md` and **must not be published until these
scripts have actually been run** - the entire value of that post is that the
figures are measured.

## What gets measured

| Metric | How | Why it matters |
|---|---|---|
| Glass-to-glass latency | `flash.html` + `measure-latency.py` | Whether the cursor feels attached to your finger |
| Text sharpness | `pattern.html` + `measure-sharpness.py` | Whether 10px code is readable or a grey smear |

Two things people actually notice. Frame rate is deliberately not measured:
every app claims 60fps and it tells you nothing about how the picture looks.

## Rules that make it fair

Break any of these and the post is not worth publishing.

1. **One Mac, one client, one session.** Same hardware throughout, nothing else
   running, display asleep elsewhere.
2. **Same client resolution.** Set each app to native/best and record what it
   actually negotiated. If they differ, say so in the post - that IS a finding.
3. **Same network, twice.** Once on LAN, once from outside on the same mobile
   connection. Report them separately; they behave nothing alike.
4. **Alternate the order** across runs (A-B-C, C-B-A, ...) so warm-up and
   network drift do not land on one app.
5. **Five runs minimum per app per network.** Report the median, not the best.
6. **Record versions and date.** App versions, macOS, iOS, and the date.
7. **Say where they beat us.** They will somewhere. A benchmark that only
   flatters the publisher gets treated as marketing, correctly.

## Latency

1. Open `flash.html` full screen on the Mac.
2. Connect the client, full screen, no controls overlaying the picture.
3. Put both screens in one camera frame. Film at the highest frame rate the
   phone supports - 240fps gives +/-4.2ms, 60fps only +/-16.7ms.
4. `python3 measure-latency.py run.mov --probe` to dump a frame, read the two
   rectangles off it, then:

```
python3 measure-latency.py run.mov --mac 0,0,600,800 --client 620,0,500,800
```

It finds each flash on the Mac, finds the next one on the client, and prints
min/median/max. Quote the median and the camera frame rate.

## Sharpness

1. Open `pattern.html` full screen on the Mac.
2. Screenshot the CLIENT device for each app, plus one screenshot on the Mac
   itself as the reference.
3. ```
   python3 measure-sharpness.py mac-reference.png servey.png jump.png screens.png
   ```

Quote SSIM. It tracks structure, which is exactly what makes small text
readable. PSNR is printed alongside for completeness.

## Before publishing

- Fill every `<<FILL: ...>>` in the draft. Any left means it is not ready.
- Re-read rule 7.
- Consider sending the numbers to Edovia and Phase Five Systems before you
  publish. It costs nothing and turns a possible argument into a possible link.
