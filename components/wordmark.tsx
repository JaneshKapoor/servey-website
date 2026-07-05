import Link from "next/link";
import { cn } from "@/lib/utils";

/** Servey wordmark with the signature neon-green mark. */
export function Wordmark({
  className,
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="Servey home"
      className={cn(
        "group inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-fg",
        className,
      )}
    >
      <span className="relative flex size-6 items-center justify-center">
        <span className="absolute inset-0 rounded-lg bg-accent/15 transition-colors group-hover:bg-accent/25" />
        <span className="size-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(34,220,110,0.9)]" />
      </span>
      Servey
    </Link>
  );
}
