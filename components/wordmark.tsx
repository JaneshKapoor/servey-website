import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/** Servey wordmark using the brand app-icon logo. */
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
        "group inline-flex items-center gap-2.5 text-lg font-semibold tracking-tight text-fg",
        className,
      )}
    >
      <Image
        src="/brand/servey-logo-512.png"
        alt="Servey logo"
        width={28}
        height={28}
        priority
        className="size-7 rounded-[7px] ring-1 ring-white/10 transition-transform group-hover:scale-105"
      />
      Servey
    </Link>
  );
}
