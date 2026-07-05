"use client";

import { Moon, Sun } from "lucide-react";

/**
 * Dark-default theme toggle. The icon is driven purely by CSS off the
 * `data-theme` attribute (set pre-paint in the layout), so no React state is
 * needed — we just read/flip the attribute on click.
 */
export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const next = isLight ? "dark" : "light";
    if (next === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem("servey-theme", next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      title="Toggle color theme"
      className={`inline-flex size-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent/50 hover:text-fg ${className ?? ""}`}
    >
      <Sun className="hidden size-4 [html[data-theme='light']_&]:block" />
      <Moon className="size-4 [html[data-theme='light']_&]:hidden" />
    </button>
  );
}
