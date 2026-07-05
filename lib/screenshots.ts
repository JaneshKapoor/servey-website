/**
 * Typed registry of every product image slot.
 *
 * We ship styled placeholders — no faked UI. To drop in a real capture:
 *   1. Save the file to /public/screenshots/<key>.png  (filename == the key)
 *   2. Flip that slot's `ready` from false to true.
 * The `src` paths are already wired below. If you save as .jpg/.webp instead of
 * .png, update that slot's `src` extension to match. Everything else stays.
 */
export type DeviceFrame = "ipad" | "iphone" | "mac" | "diagram" | "crop";

export interface ScreenshotSlot {
  frame: DeviceFrame;
  /** width / height, used to reserve space and avoid layout shift */
  ratio: number;
  alt: string;
  /** Short label shown on the placeholder. */
  hint: string;
  /** Real image path once provided. */
  src?: string;
  ready?: boolean;
}

export const screenshots = {
  "hero-devices": {
    frame: "ipad",
    ratio: 16 / 10,
    hint: "iPad + iPhone",
    alt: "Servey on iPad and iPhone — a Mac desktop mirrored to the iPad with the control dock on the iPhone",
    src: "/screenshots/hero-devices.png",
    ready: false,
  },
  "mirroring-ipad": {
    frame: "ipad",
    ratio: 16 / 10,
    hint: "iPad — screen mirroring",
    alt: "A Mac desktop mirrored full-screen on an iPad through Servey, with crisp, aspect-correct text",
    src: "/screenshots/mirroring-ipad.png",
    ready: false,
  },
  "iphone-controls": {
    frame: "iphone",
    ratio: 9 / 19.5,
    hint: "iPhone — controls",
    alt: "Servey's on-screen trackpad, click buttons, and control dock on an iPhone",
    src: "/screenshots/iphone-controls.png",
    ready: false,
  },
  terminal: {
    frame: "iphone",
    ratio: 9 / 19.5,
    hint: "iPhone — terminal",
    alt: "A live macOS terminal session running inside Servey on iPhone",
    src: "/screenshots/terminal.png",
    ready: false,
  },
  "dual-path": {
    frame: "diagram",
    ratio: 16 / 9,
    hint: "Two streaming paths",
    alt: "Diagram: Servey streams HEVC on the local network and private peer-to-peer WebRTC across the internet",
  },
  "quality-closeup": {
    frame: "crop",
    ratio: 4 / 3,
    hint: "Adaptive quality",
    alt: "Close-up showing razor-sharp remote text with no cropping at adaptive quality",
    src: "/screenshots/quality-closeup.png",
    ready: false,
  },
  "mac-host-ui": {
    frame: "mac",
    ratio: 16 / 10,
    hint: "Mac host app",
    alt: "Servey's Mac host app with its dark, neon-green connect screen",
    src: "/screenshots/mac-host-ui.png",
    ready: false,
  },
} as const satisfies Record<string, ScreenshotSlot>;

export type ScreenshotKey = keyof typeof screenshots;
