import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { SectionLabel } from "@/components/section";
import { Screenshot } from "@/components/device-frame";
import { DualPathDiagram } from "@/components/dual-path-diagram";
import { PrivacyIllustration } from "@/components/privacy-illustration";
import { features, type Feature } from "@/lib/content";
import { cn } from "@/lib/utils";

function Visual({ feature }: { feature: Feature }) {
  if (feature.diagram) return <DualPathDiagram />;
  if (feature.privacy) return <PrivacyIllustration />;
  if (feature.screenshot) {
    return (
      <Tilt max={5} className="[perspective:1400px]">
        <Screenshot name={feature.screenshot} />
      </Tilt>
    );
  }
  return null;
}

function FeatureBlock({ feature, flip }: { feature: Feature; flip: boolean }) {
  return (
    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
      <Reveal
        className={cn("order-1", flip ? "md:order-2" : "md:order-1")}
        y={24}
      >
        <SectionLabel index={feature.index}>{feature.eyebrow}</SectionLabel>
        <h3 className="mt-4 text-balance text-2xl font-semibold tracking-tight sm:text-3xl md:text-[2rem] md:leading-tight">
          {feature.title}
        </h3>
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {feature.body}
        </p>
        {feature.bullets && (
          <ul className="mt-6 space-y-2.5">
            {feature.bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-sm text-fg">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-deep text-accent-strong">
                  <Check className="size-3" />
                </span>
                {b}
              </li>
            ))}
          </ul>
        )}
      </Reveal>

      <Reveal
        className={cn("order-2", flip ? "md:order-1" : "md:order-2")}
        y={24}
        delay={0.08}
      >
        <Visual feature={feature} />
      </Reveal>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-page space-y-24 sm:space-y-32">
        {features.map((feature, i) => (
          <FeatureBlock key={feature.index} feature={feature} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
