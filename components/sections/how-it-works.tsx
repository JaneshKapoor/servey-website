import { SectionHeading } from "@/components/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { steps } from "@/lib/content";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          label="How it works"
          title="Up and running in three taps."
          intro="No VPN. No port forwarding. No vendor accounts to manage. Just sign in and go."
        />

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <RevealItem key={step.n}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-7 transition-colors hover:border-border-strong">
                <div
                  aria-hidden
                  className="absolute -right-6 -top-8 select-none font-mono text-8xl font-bold text-fg/[0.04] transition-colors group-hover:text-accent/10"
                >
                  {step.n}
                </div>
                <div className="relative">
                  <span className="flex size-10 items-center justify-center rounded-xl border border-accent/30 bg-accent-deep font-mono text-sm font-semibold text-accent-strong">
                    {step.n}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-fg">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
