"use client";

import * as React from "react";
import { Check, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WaitlistDialog } from "@/components/waitlist-dialog";
import { pricing } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Pricing() {
  const [region, setRegion] = React.useState<"inr" | "usd">("inr");

  return (
    <section id="pricing" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          label="Pricing"
          title="Simple pricing. Pick your plan."
          intro="Start with a real terminal, or unlock the full experience with screen mirroring. One flat monthly price - no add-ons, no surprises."
        />

        {/* Region toggle */}
        <Reveal className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Choose your region"
            className="inline-flex rounded-full border border-border bg-surface p-1"
          >
            {pricing.regions.map((r) => {
              const active = r.key === region;
              return (
                <button
                  key={r.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setRegion(r.key as "inr" | "usd")}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-accent text-accent-contrast"
                      : "text-muted hover:text-fg",
                  )}
                >
                  {r.symbol} {r.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <RevealGroup className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {pricing.plans.map((plan) => {
            const symbol = region === "inr" ? "₹" : "$";
            const amount = plan.price[region];
            return (
              <RevealItem key={plan.id}>
                <div
                  className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-3xl p-8 sm:p-9",
                    plan.featured
                      ? "border border-accent/30 bg-surface"
                      : "border border-border bg-surface/40",
                  )}
                >
                  {plan.featured && (
                    <div
                      aria-hidden
                      className="absolute inset-x-0 -top-24 mx-auto h-48 w-48 rounded-full bg-accent/15 blur-3xl"
                    />
                  )}
                  <div className="relative flex flex-col">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold tracking-tight text-fg">
                        {plan.name}
                      </h3>
                      {plan.featured && (
                        <Badge className="border-accent/30 bg-accent-deep/60 text-accent-strong">
                          <Sparkles className="size-3.5" />
                          Most popular
                        </Badge>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {plan.tagline}
                    </p>

                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="text-4xl font-semibold tracking-tight text-fg tabular-nums">
                        {symbol}
                        {amount}
                      </span>
                      <span className="text-sm text-muted">/month</span>
                    </div>

                    <ul className="mt-7 space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex gap-2.5 text-sm">
                          <Check className="mt-0.5 size-4 shrink-0 text-accent-strong" />
                          <span className="text-fg">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 pt-2">
                      <WaitlistDialog source={`pricing:${plan.id}`}>
                        <Button
                          className="w-full"
                          variant={plan.featured ? "primary" : "secondary"}
                        >
                          Join the waitlist
                        </Button>
                      </WaitlistDialog>
                    </div>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted">
          {pricing.note}
        </p>
      </div>
    </section>
  );
}
