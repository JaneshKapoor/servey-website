/**
 * Typed registry of every product image slot.
 *
 * We ship styled placeholders - no faked UI. To drop in a real capture:
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
  /**
   * The file's real pixel dimensions, measured with `sips -g pixelWidth
   * -g pixelHeight`. `ratio` above must be exactly width / height - when it
   * drifted, object-cover cropped the capture with nothing to show for it.
   * Also feeds the SoftwareApplication.screenshot ImageObjects in the layout.
   */
  width?: number;
  height?: number;
}

export const screenshots = {
  "hero-devices": {
    frame: "ipad",
    // Must match the real file (2560x1440) or object-cover crops the sides.
    ratio: 2560 / 1440,
    width: 2560,
    height: 1440,
    hint: "iPad + iPhone",
    alt: "Servey on iPad and iPhone - a Mac desktop mirrored to the iPad with the control dock on the iPhone",
    src: "/screenshots/hero-devices.png",
    ready: true,
  },
  "device-picker": {
    frame: "iphone",
    // The @3x simulator capture (1206x2622) rather than the 381x828 web copy:
    // next/image downscales, so the larger source gives it more to work with.
    ratio: 1206 / 2622,
    width: 1206,
    height: 2622,
    hint: "iPhone - your Macs",
    alt: "Servey on iPhone - the Macs screen listing Janesh's Mac mini and a MacBook Pro 16, both online and reachable on this network with a Connect action, above the free plan's remaining sessions for the day",
    src: "/screenshots/iphone-home.png",
    ready: true,
  },
  "mirroring-ipad": {
    frame: "ipad",
    ratio: 2360 / 1640,
    width: 2360,
    height: 1640,
    hint: "iPad - connect & control",
    alt: "Servey on iPad connected to a Mac - the session screen with Screen Sharing and Terminal, marked Connected - Remote",
    src: "/screenshots/interfacepage.png",
    ready: true,
  },
  "iphone-controls": {
    // NOTE: this is the Macs list, not the trackpad, so it does not depict what
    // feature 02's copy describes. Placed here at the owner's direction until a
    // real capture of the on-screen trackpad and keyboard exists - swap the src
    // and the alt together when it does.
    frame: "iphone",
    ratio: 1206 / 2622,
    width: 1206,
    height: 2622,
    hint: "iPhone - your Macs",
    alt: "Servey on iPhone - the Macs screen listing Janesh's Mac mini and a MacBook Pro 16, both online and reachable on this network with a Connect action, above the free plan's remaining sessions for the day",
    src: "/screenshots/iphone-home.png",
    ready: true,
  },
  terminal: {
    frame: "ipad",
    ratio: 2360 / 1640,
    width: 2360,
    height: 1640,
    hint: "iPad - terminal",
    alt: "A live macOS terminal session running inside Servey on iPad, listing the home directory after an ls command",
    src: "/screenshots/terminal.png",
    ready: true,
  },
  "dual-path": {
    frame: "diagram",
    ratio: 16 / 9,
    hint: "Two streaming paths",
    alt: "Diagram: Servey streams HEVC on the local network and private peer-to-peer WebRTC across the internet",
  },
  "quality-closeup": {
    frame: "crop",
    ratio: 1280 / 692,
    width: 1280,
    height: 692,
    hint: "Razor-sharp text",
    alt: "A Mac screen mirrored through Servey - a live Claude Code terminal session with razor-sharp, fully legible text and no cropping",
    src: "/screenshots/quality-closeup.png",
    ready: true,
  },
  "terminal-sessions": {
    // Like mac-host-ui, the capture already includes the macOS window chrome,
    // so it renders in a plain crop frame rather than the synthetic MacWindow.
    // Cropped to the opaque window bounds and flattened - the raw screenshot
    // carried ~50px of transparent drop shadow, which read as a box inside
    // CropFrame's own rounded border.
    frame: "crop",
    ratio: 939 / 652,
    width: 939,
    height: 652,
    hint: "Mac - terminal sessions",
    alt: "Servey's Terminal tab on the Mac host listing two named sessions, solar-summit and sunny-raven, each shown as detached and idle but still running with hours left, above a line explaining that sessions run in tmux so they survive a disconnect and can be reopened from any terminal on the Mac",
    src: "/screenshots/terminal-sessions.png",
    ready: true,
  },
  "mac-host-ui": {
    // The capture already includes the macOS window chrome, so it renders in a
    // plain crop frame (not the synthetic MacWindow) to avoid double title bars.
    frame: "crop",
    ratio: 939 / 652,
    width: 939,
    height: 652,
    hint: "Mac host app",
    alt: "Servey's Mac host app on macOS - the Connect screen showing the Mac offline with a Go Online button, Screen Recording and Accessibility granted, Keep Mac Awake on, and Closed-Lid Mode ready to enable",
    src: "/screenshots/mac-connect.png",
    ready: true,
  },
} as const satisfies Record<string, ScreenshotSlot>;

export type ScreenshotKey = keyof typeof screenshots;
