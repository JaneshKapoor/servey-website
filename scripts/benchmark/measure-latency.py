#!/usr/bin/env python3
"""Measure glass-to-glass latency from one video of both screens.

Film the Mac's display and the client device side by side in a SINGLE video,
with flash.html full screen on the Mac. Both screens flash; the client's copy
lags by the latency you want to measure. Because both are in one recording,
no clock synchronisation between devices is needed and no frame is read by a
human.

    python3 measure-latency.py run.mov --mac 0,0,600,800 --client 620,0,500,800

Rectangles are x,y,w,h in the video's own pixels. Use --probe to dump a frame
first so you can read the coordinates off it.

Report the MEDIAN of at least five flashes, and state the camera frame rate:
the measurement cannot be finer than one frame (240fps = 4.2ms).
"""
import argparse, json, os, subprocess, sys, tempfile
import numpy as np
from PIL import Image


def probe_fps(path):
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0",
         "-show_entries", "stream=r_frame_rate", "-of", "json", path],
        capture_output=True, text=True, check=True).stdout
    num, den = json.loads(out)["streams"][0]["r_frame_rate"].split("/")
    return float(num) / float(den)


def extract(path, outdir):
    subprocess.run(["ffmpeg", "-v", "error", "-i", path,
                    os.path.join(outdir, "f%06d.png")], check=True)
    return sorted(os.listdir(outdir))


def luma(img, rect):
    x, y, w, h = rect
    return float(np.asarray(img.convert("L").crop((x, y, x + w, y + h)), dtype=np.float32).mean())


def transitions(series, threshold):
    """Frame indices where mean luminance crosses the midpoint."""
    lo, hi = min(series), max(series)
    mid = (lo + hi) / 2.0
    if hi - lo < threshold:
        return []
    out, above = [], series[0] > mid
    for i, v in enumerate(series[1:], 1):
        now = v > mid
        if now != above:
            out.append(i)
            above = now
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video")
    ap.add_argument("--mac", required=False, help="x,y,w,h of the Mac's screen in frame")
    ap.add_argument("--client", required=False, help="x,y,w,h of the client device in frame")
    ap.add_argument("--min-contrast", type=float, default=12.0)
    ap.add_argument("--probe", action="store_true", help="save frame 30 and exit")
    a = ap.parse_args()

    fps = probe_fps(a.video)
    with tempfile.TemporaryDirectory() as td:
        frames = extract(a.video, td)
        if a.probe:
            Image.open(os.path.join(td, frames[min(30, len(frames) - 1)])).save("probe-frame.png")
            print("wrote probe-frame.png - read your two rectangles off it"); return
        if not (a.mac and a.client):
            sys.exit("need --mac and --client (run with --probe first)")
        mac_r = tuple(int(v) for v in a.mac.split(","))
        cli_r = tuple(int(v) for v in a.client.split(","))

        mac_s, cli_s = [], []
        for f in frames:
            im = Image.open(os.path.join(td, f))
            mac_s.append(luma(im, mac_r))
            cli_s.append(luma(im, cli_r))

    mt = transitions(mac_s, a.min_contrast)
    ct = transitions(cli_s, a.min_contrast)
    if not mt or not ct:
        sys.exit("no flashes detected - check the rectangles and that flash.html was full screen")

    deltas = []
    for m in mt:
        later = [c for c in ct if c >= m]
        if later:
            deltas.append((later[0] - m) / fps * 1000.0)

    if not deltas:
        sys.exit("found flashes on the Mac but none after them on the client")

    deltas.sort()
    med = deltas[len(deltas) // 2]
    print(f"camera fps      : {fps:.1f}  (resolution limit +/- {1000/fps:.1f}ms)")
    print(f"flashes matched : {len(deltas)}")
    print(f"latency ms      : min {min(deltas):.1f}  median {med:.1f}  max {max(deltas):.1f}")
    print("\nReport the median. Anything finer than one camera frame is noise.")


if __name__ == "__main__":
    main()
