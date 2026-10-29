import { appStore } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Apple's supplied "Download on the App Store" badge, linking to the listing.
 *
 * Apple sets rules on this artwork and they are not stylistic preferences:
 * use the supplied file, do not recolour or redraw it, do not crowd it, and
 * keep it at or above the minimum size. So this renders Apple's own SVG at its
 * native aspect ratio, leaves a quarter of the badge height as clear space,
 * and swaps between the two variants Apple ships rather than filtering one.
 *
 * The swap is CSS rather than a theme hook because the theme is applied to
 * <html> before paint - a JS-chosen variant would flash the wrong one on load
 * and would be wrong entirely until hydration.
 */
export function AppStoreBadge({
  className,
  height = 48,
}: {
  className?: string;
  /** Rendered height in px. Apple's floor is well below this; do not go under 40. */
  height?: number;
}) {
  const width = Math.round((height * appStore.badge.width) / appStore.badge.height);

  return (
    <a
      href={appStore.url}
      className={cn(
        // The padding is Apple's clear space: a quarter of the badge height,
        // kept on the element so neighbouring buttons cannot encroach.
        "inline-flex shrink-0 items-center justify-center rounded-lg transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        className,
      )}
      style={{ padding: height / 4 }}
      aria-label={`${appStore.name} on the App Store`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={appStore.badge.white}
        alt="Download on the App Store"
        width={width}
        height={height}
        style={{ height, width }}
        className="block [:root[data-theme='light']_&]:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={appStore.badge.black}
        alt=""
        aria-hidden
        width={width}
        height={height}
        style={{ height, width }}
        className="hidden [:root[data-theme='light']_&]:block"
      />
    </a>
  );
}
