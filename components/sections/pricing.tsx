import { Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/section";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { WaitlistForm } from "@/components/waitlist-form";

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          label="Pricing"
          title="Pricing is coming soon."
          intro="We're putting the finishing touches on plans. Join the waitlist and you'll be the first to know — with pricing details before launch."
        />

        <Reveal className="mx-auto mt-12 max-w-xl">
          <div className="relative overflow-hidden rounded-3xl border border-accent/25 bg-surface p-8 text-center sm:p-10">
            <div
              aria-hidden
              className="absolute inset-x-0 -top-24 mx-auto h-48 w-48 rounded-full bg-accent/15 blur-3xl"
            />
            <div className="relative">
              <div className="flex justify-center">
                <Badge className="border-accent/30 bg-accent-deep/60 text-accent-strong">
                  <Sparkles className="size-3.5" />
                  Coming soon
                </Badge>
              </div>
              <p className="mx-auto mt-5 max-w-sm text-lg font-medium text-fg">
                Be first to know — join the waitlist.
              </p>
              <div className="mx-auto mt-6 max-w-md">
                <WaitlistForm source="pricing" />
              </div>
              <p className="mt-4 text-xs text-muted">
                No spam. Just one email when Servey is ready.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
