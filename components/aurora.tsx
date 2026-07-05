import { cn } from "@/lib/utils";

/**
 * Low-opacity aurora glow. Pure CSS (no JS), decorative, cheap.
 * `intensity` scales the opacity so the hero can be brighter than section glows.
 */
export function Aurora({
  className,
  intensity = 1,
}: {
  className?: string;
  intensity?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className="absolute left-1/2 top-[-10%] h-[520px] w-[820px] max-w-[140vw] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          opacity: 0.28 * intensity,
          background:
            "radial-gradient(closest-side, rgba(34,220,110,0.9), rgba(34,220,110,0) 70%)",
        }}
      />
      <div
        className="absolute left-[18%] top-[20%] h-[380px] w-[380px] rounded-full blur-[110px]"
        style={{
          opacity: 0.18 * intensity,
          background:
            "radial-gradient(closest-side, rgba(45,212,191,0.8), rgba(45,212,191,0) 70%)",
        }}
      />
      <div
        className="absolute right-[14%] top-[8%] h-[320px] w-[320px] rounded-full blur-[110px]"
        style={{
          opacity: 0.16 * intensity,
          background:
            "radial-gradient(closest-side, rgba(16,185,129,0.7), rgba(16,185,129,0) 70%)",
        }}
      />
    </div>
  );
}
