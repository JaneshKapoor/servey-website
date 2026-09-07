import { Bot, Coffee, FileText, Hammer, Plane, Sofa, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { situations } from "@/lib/content";

const icons: Record<string, LucideIcon> = { Sofa, Coffee, Hammer, Bot, FileText, Plane };

/**
 * The situations section - positioning, not features.
 *
 * "Remote desktop for Mac" is a crowded category and a weak frame: it names a
 * kind of tool rather than a moment, and every competitor already sits on that
 * shelf. This section exists so a visitor recognises their own case in the first
 * few seconds. It sits directly under the hero for that reason - before the
 * feature deep-dive, because "why would I want this" has to land before "what
 * does it do".
 */
export function Situations() {
  return (
    <section id="situations" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          label="When you'd reach for it"
          title="Your Mac is somewhere. You are somewhere else."
          intro="That gap is the whole product. Here is what it looks like on an ordinary day."
        />

        {/* 2 cols at sm, 3 at lg - so `situations` must stay a multiple of six
            or the last row is short. See the note in lib/content.ts. */}
        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {situations.map((s) => {
            const Icon = icons[s.icon];
            return (
              <RevealItem key={s.when}>
                <div className="group h-full rounded-2xl border border-border bg-surface/40 p-6 transition-colors hover:border-border-strong">
                  <span className="inline-flex size-9 items-center justify-center rounded-xl border border-accent/25 bg-accent-deep/60 text-accent-strong">
                    <Icon className="size-4" />
                  </span>
                  <p className="mt-4 text-sm font-semibold leading-snug text-fg">{s.when}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.then}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
