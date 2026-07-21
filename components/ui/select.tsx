import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Native <select> styled to match Input. Native is deliberate: it gives the
 * best mobile picker and free accessibility. `data-placeholder` dims the text
 * while the empty first option is selected.
 */
const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "h-11 w-full appearance-none rounded-full border border-border-strong bg-surface pl-5 pr-11 text-sm text-fg transition-colors",
          "focus-visible:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
          "disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-red-500/70",
          "data-[placeholder=true]:text-muted",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted"
      />
    </div>
  );
});
Select.displayName = "Select";

export { Select };
