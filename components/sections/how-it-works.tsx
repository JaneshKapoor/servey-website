import { SectionHeading } from "@/components/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { Screenshot } from "@/components/device-frame";
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

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <RevealGroup className="space-y-4">
            {steps.map((step) => (
              <RevealItem key={step.n}>
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong">
                  <div className="flex items-start gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent-deep font-mono text-sm font-semibold text-accent-strong">
                      {step.n}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-fg">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.body}</p>
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <Tilt max={4} className="[perspective:1400px]">
              <Screenshot name="mac-host-ui" />
            </Tilt>
            <p className="mt-4 text-center text-xs text-muted">
              The Servey host on your Mac — online and discoverable, ready for your devices.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
