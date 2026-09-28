#!/usr/bin/env python3
"""Compare a client screenshot of pattern.html against the Mac's own capture.

    python3 measure-sharpness.py reference.png servey.png jump.png screens.png

Every image is cropped to the pattern, converted to greyscale and scaled to the
reference's size, then scored with PSNR and SSIM against the reference. Higher
is closer to what the Mac actually drew.

These numbers only mean something when every app streamed the SAME pattern at
the SAME client resolution over the SAME network. State all three.
"""
import sys
import numpy as np
from PIL import Image


def load(path, size=None):
    im = Image.open(path).convert("L")
    if size and im.size != size:
        im = im.resize(size, Image.LANCZOS)
    return np.asarray(im, dtype=np.float64)


def psnr(a, b):
    mse = np.mean((a - b) ** 2)
    return float("inf") if mse == 0 else 10 * np.log10(255.0 ** 2 / mse)


def box(a, k=8):
    """Mean filter via a summed-area table - keeps this dependency-free."""
    pad = np.pad(a, ((1, 0), (1, 0)), mode="constant")
    s = pad.cumsum(0).cumsum(1)
    h, w = a.shape
    kh, kw = min(k, h), min(k, w)
    out = (s[kh:, kw:] - s[:-kh, kw:] - s[kh:, :-kw] + s[:-kh, :-kw]) / (kh * kw)
    return out


def ssim(a, b, k=8):
    C1, C2 = (0.01 * 255) ** 2, (0.03 * 255) ** 2
    mu_a, mu_b = box(a, k), box(b, k)
    sa = box(a * a, k) - mu_a ** 2
    sb = box(b * b, k) - mu_b ** 2
    sab = box(a * b, k) - mu_a * mu_b
    num = (2 * mu_a * mu_b + C1) * (2 * sab + C2)
    den = (mu_a ** 2 + mu_b ** 2 + C1) * (sa + sb + C2)
    return float(np.mean(num / den))


def main():
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    ref_path, others = sys.argv[1], sys.argv[2:]
    ref_img = Image.open(ref_path).convert("L")
    ref = np.asarray(ref_img, dtype=np.float64)
    print(f"reference: {ref_path}  {ref_img.size[0]}x{ref_img.size[1]}\n")
    print(f"{'file':<28}{'PSNR dB':>10}{'SSIM':>10}")
    for p in others:
        a = load(p, ref_img.size)
        print(f"{p:<28}{psnr(ref, a):>10.2f}{ssim(ref, a):>10.4f}")
    print("\nSSIM is the one to quote: it tracks structure, which is what makes")
    print("small text readable or not. PSNR is reported for completeness.")


if __name__ == "__main__":
    main()
