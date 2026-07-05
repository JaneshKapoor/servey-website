"use client";

import * as React from "react";
import { toast } from "sonner";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = "idle" | "submitting" | "success";

export function WaitlistForm({
  source = "website",
  className,
  autoFocus = false,
  onSuccess,
}: {
  source?: string;
  className?: string;
  autoFocus?: boolean;
  onSuccess?: () => void;
}) {
  const [email, setEmail] = React.useState("");
  const [website, setWebsite] = React.useState(""); // honeypot
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const value = email.trim().toLowerCase();
    if (!EMAIL_RE.test(value)) {
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, source, website }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        duplicate?: boolean;
      };

      if (!res.ok || !data.ok) {
        setStatus("idle");
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      if (data.duplicate) {
        toast.success("You're already on the list", {
          description: "We'll email you the moment Servey is ready.",
        });
      } else {
        toast.success("You're on the list ✅", {
          description: "We'll email you the moment Servey is ready.",
        });
      }
      onSuccess?.();
    } catch {
      setStatus("idle");
      setError("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex items-center justify-center gap-2 rounded-full border border-accent/40 bg-accent-deep px-5 py-3 text-sm font-medium text-accent-strong",
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <Check className="size-4" />
        You&rsquo;re on the list — we&rsquo;ll be in touch.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("w-full", className)} noValidate>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <div className="flex-1">
          <label htmlFor={`waitlist-email-${source}`} className="sr-only">
            Email address
          </label>
          <Input
            id={`waitlist-email-${source}`}
            type="email"
            inputMode="email"
            autoComplete="email"
            autoFocus={autoFocus}
            placeholder="you@example.com"
            value={email}
            aria-invalid={!!error}
            aria-describedby={error ? `waitlist-error-${source}` : undefined}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            disabled={status === "submitting"}
          />
        </div>

        {/* Honeypot — hidden from users, tempting to bots. */}
        <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`website-${source}`}>Leave this field empty</label>
          <input
            id={`website-${source}`}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <Button type="submit" disabled={status === "submitting"} className="shrink-0">
          {status === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Joining…
            </>
          ) : (
            <>
              Join the waitlist
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </div>

      {error && (
        <p
          id={`waitlist-error-${source}`}
          role="alert"
          className="mt-2 pl-1 text-sm text-red-400"
        >
          {error}
        </p>
      )}
    </form>
  );
}
