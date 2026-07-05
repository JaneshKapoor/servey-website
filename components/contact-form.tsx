"use client";

import * as React from "react";
import { toast } from "sonner";
import { Check, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
type Status = "idle" | "submitting" | "success";
type FieldErrors = { name?: string; email?: string; message?: string };

export function ContactForm({
  className,
  onSuccess,
}: {
  className?: string;
  onSuccess?: () => void;
}) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [website, setWebsite] = React.useState(""); // honeypot
  const [status, setStatus] = React.useState<Status>("idle");
  const [errors, setErrors] = React.useState<FieldErrors>({});

  function validate(): FieldErrors {
    const e: FieldErrors = {};
    if (!name.trim()) e.name = "Please enter your name.";
    if (!EMAIL_RE.test(email.trim())) e.email = "Please enter a valid email.";
    if (message.trim().length < 5) e.message = "Please write a short message.";
    return e;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          message: message.trim(),
          website,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("idle");
        toast.error(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      toast.success("Message sent ✅", { description: "We'll get back to you soon." });
      onSuccess?.();
    } catch {
      setStatus("idle");
      toast.error("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-2 rounded-2xl border border-accent/40 bg-accent-deep px-5 py-8 text-center",
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-accent/20 text-accent-strong">
          <Check className="size-5" />
        </span>
        <p className="text-sm font-medium text-fg">Thanks — your message is on its way.</p>
        <p className="text-xs text-muted">We&rsquo;ll reply to the email you gave us.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("space-y-3", className)} noValidate>
      <div>
        <label htmlFor="contact-name" className="sr-only">
          Your name
        </label>
        <Input
          id="contact-name"
          placeholder="Your name"
          value={name}
          autoComplete="name"
          aria-invalid={!!errors.name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
          }}
          disabled={status === "submitting"}
        />
        {errors.name && <p className="mt-1 pl-1 text-xs text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="contact-email" className="sr-only">
          Your email
        </label>
        <Input
          id="contact-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          aria-invalid={!!errors.email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
          }}
          disabled={status === "submitting"}
        />
        {errors.email && <p className="mt-1 pl-1 text-xs text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="contact-message" className="sr-only">
          Your message
        </label>
        <Textarea
          id="contact-message"
          placeholder="How can we help?"
          value={message}
          aria-invalid={!!errors.message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors((p) => ({ ...p, message: undefined }));
          }}
          disabled={status === "submitting"}
        />
        {errors.message && <p className="mt-1 pl-1 text-xs text-red-400">{errors.message}</p>}
      </div>

      {/* Honeypot */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <Send className="size-4" />
          </>
        )}
      </Button>
    </form>
  );
}
