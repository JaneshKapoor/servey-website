import Image from "next/image";
import { cn } from "@/lib/utils";
import { screenshots, type ScreenshotKey, type ScreenshotSlot } from "@/lib/screenshots";

/* ---------------------------------------------------------------- *
 * Placeholder fill — styled, never a fake product screenshot.       *
 * ---------------------------------------------------------------- */
function PlaceholderFill({ hint }: { hint: string }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[radial-gradient(120%_120%_at_50%_-10%,#141a17_0%,#0b0d0f_60%)]">
      {/* faint grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,220,110,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,220,110,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-40 w-64 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(34,220,110,0.22), transparent)" }}
      />
      <div className="relative z-10 flex flex-col items-center gap-2 px-4 text-center">
        <span className="flex size-9 items-center justify-center rounded-xl border border-[rgba(34,220,110,0.3)] bg-[rgba(34,220,110,0.08)]">
          <span className="size-2 rounded-full bg-accent shadow-[0_0_12px_rgba(34,220,110,0.8)]" />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          Screenshot coming
        </span>
        <span className="text-xs text-muted/70">{hint}</span>
      </div>
    </div>
  );
}

function SlotContent({ slot }: { slot: ScreenshotSlot }) {
  if (slot.ready && slot.src) {
    return (
      <Image
        src={slot.src}
        alt={slot.alt}
        fill
        sizes="(max-width: 768px) 100vw, 700px"
        className="object-cover"
      />
    );
  }
  return <PlaceholderFill hint={slot.hint} />;
}

/* ---------------------------------------------------------------- *
 * Frames                                                            *
 * ---------------------------------------------------------------- */
export function MacWindow({
  slot,
  className,
}: {
  slot: ScreenshotSlot;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-2xl shadow-black/50",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-3">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-muted">Servey — host</span>
      </div>
      <div className="relative w-full" style={{ aspectRatio: String(slot.ratio) }}>
        <SlotContent slot={slot} />
      </div>
    </div>
  );
}

export function IpadFrame({
  slot,
  className,
}: {
  slot: ScreenshotSlot;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[1.75rem] border border-border-strong bg-[#111]/90 p-2.5 shadow-2xl shadow-black/50 ring-1 ring-black/40",
        className,
      )}
    >
      <div
        className="relative w-full overflow-hidden rounded-[1.1rem] bg-black"
        style={{ aspectRatio: String(slot.ratio) }}
      >
        <SlotContent slot={slot} />
      </div>
    </div>
  );
}

export function IphoneFrame({
  slot,
  className,
}: {
  slot: ScreenshotSlot;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-[2.4rem] border border-border-strong bg-[#0c0c0c] p-2 shadow-2xl shadow-black/60 ring-1 ring-black/50",
        className,
      )}
    >
      {/* dynamic island */}
      <div className="absolute left-1/2 top-4 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
      <div
        className="relative w-full overflow-hidden rounded-[1.9rem] bg-black"
        style={{ aspectRatio: String(slot.ratio) }}
      >
        <SlotContent slot={slot} />
      </div>
    </div>
  );
}

export function CropFrame({
  slot,
  className,
}: {
  slot: ScreenshotSlot;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border-strong shadow-xl shadow-black/40",
        className,
      )}
    >
      <div className="relative w-full" style={{ aspectRatio: String(slot.ratio) }}>
        <SlotContent slot={slot} />
      </div>
    </div>
  );
}

/**
 * Render a screenshot slot inside its correct device frame by key.
 * `diagram` frames are handled by dedicated section components, not here.
 */
export function Screenshot({
  name,
  className,
}: {
  name: ScreenshotKey;
  className?: string;
}) {
  const slot = screenshots[name];
  switch (slot.frame) {
    case "ipad":
      return <IpadFrame slot={slot} className={className} />;
    case "iphone":
      return <IphoneFrame slot={slot} className={className} />;
    case "mac":
      return <MacWindow slot={slot} className={className} />;
    case "crop":
    case "diagram":
    default:
      return <CropFrame slot={slot} className={className} />;
  }
}
