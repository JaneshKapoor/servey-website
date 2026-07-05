import * as React from "react";
import { cn } from "@/lib/utils";

/** Small pill used for eyebrow labels and inline tags. */
export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted",
        className,
      )}
      {...props}
    />
  );
}
