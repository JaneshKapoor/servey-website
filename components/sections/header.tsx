"use client";

import * as React from "react";
import Link from "next/link";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/wordmark";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { WaitlistDialog } from "@/components/waitlist-dialog";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-bg/70 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Wordmark />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/blog"
            className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-fg"
          >
            Blog
          </Link>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <WaitlistDialog source="nav">
            <Button size="sm">Join the waitlist</Button>
          </WaitlistDialog>
        </div>

        {/* Mobile.
            Built on Radix rather than a bare conditional so the sheet gets a
            focus trap, Escape-to-close, and a scroll lock that cooperates with
            the waitlist dialog. The previous hand-rolled version wrote
            document.body.style.overflow directly, and its cleanup ran after
            Radix had locked scroll for the waitlist dialog opened from inside
            it, which let the page scroll behind that dialog on mobile. */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
            <DialogPrimitive.Trigger
              aria-label="Open menu"
              className="inline-flex size-9 items-center justify-center rounded-full border border-border text-fg"
            >
              <Menu className="size-5" aria-hidden />
            </DialogPrimitive.Trigger>

            <DialogPrimitive.Portal>
              <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-[fade-in_0.2s_ease] data-[state=closed]:animate-[fade-out_0.15s_ease] md:hidden" />
              <DialogPrimitive.Content className="fixed inset-x-3 top-3 z-50 rounded-3xl border border-border-strong bg-surface p-5 shadow-2xl data-[state=open]:animate-[dialog-in_0.22s_cubic-bezier(0.16,1,0.3,1)] data-[state=closed]:animate-[fade-out_0.15s_ease] md:hidden">
                <DialogPrimitive.Title className="sr-only">
                  Site menu
                </DialogPrimitive.Title>
                <div className="mb-4 flex items-center justify-between">
                  <Wordmark />
                  <DialogPrimitive.Close
                    aria-label="Close menu"
                    className="inline-flex size-9 items-center justify-center rounded-full border border-border text-fg"
                  >
                    <X className="size-5" aria-hidden />
                  </DialogPrimitive.Close>
                </div>
                <nav className="flex flex-col" aria-label="Mobile">
                  {nav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-2 py-3 text-base text-fg transition-colors hover:bg-surface-2"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href="/blog"
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-2 py-3 text-base text-fg transition-colors hover:bg-surface-2"
                  >
                    Blog
                  </Link>
                </nav>
                <div className="mt-4">
                  {/* Closing the sheet first means only one Radix dialog owns
                      the scroll lock at a time. */}
                  <WaitlistDialog source="nav-mobile">
                    <Button className="w-full" onClick={() => setOpen(false)}>
                      Join the waitlist
                    </Button>
                  </WaitlistDialog>
                </div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        </div>
      </div>
    </header>
  );
}
