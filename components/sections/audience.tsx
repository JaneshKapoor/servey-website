import Link from "next/link";
import { ArrowRight, Bot, Code2, Server, Smartphone, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { audiences } from "@/lib/content";
import { useCases } from "@/lib/use-cases";

const icons: Record<string, LucideIcon> = {
  Code2,
  Bot,
  Server,
  Smartphone,
};

/** The use-case pages the four cards do not already cover. */
const featured = new Set(audiences.map((a) => a.slug));
const more = useCases.filter((u) => !featured.has(u.slug));

export function Audience() {
  return (
    <section
      id="who-its-for"
      aria-labelledby="audience-heading"
      className="scroll-mt-24 py-20 sm:py-28"
    >
      <div className="container-page">
        <SectionHeading
          label="Who it's for"
          title={
            <span id="audience-heading">
              Built for the moment you are not at your desk.
            </span>
          }
          intro="Different jobs, the same gap: your Mac is somewhere else, and the thing you need is on it."
        />

        <RevealGroup
          as="ul"
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:gap-5"
        >
          {audiences.map((a) => {
            const Icon = icons[a.icon];
            const useCase = useCases.find((u) => u.slug === a.slug);
            return (
              <RevealItem key={a.slug} as="li">
                <Link
                  href={`/${a.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong sm:p-7"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent-deep text-accent-strong">
                      <Icon className="size-4" />
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight text-fg">
                      {a.who}
                    </h3>
                  </div>

                  <p className="mt-5 text-pretty text-sm leading-relaxed text-muted">
                    {a.before}
                  </p>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-fg">
                    {a.after}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong">
                    {useCase?.navLabel ?? "Learn more"}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {more.length > 0 && (
          <Reveal className="mt-8 text-center" delay={0.05}>
            <p className="text-sm text-muted">
              Also:{" "}
              {more.map((u, i) => (
                <span key={u.slug}>
                  {i > 0 && <span aria-hidden> · </span>}
                  <Link
                    href={`/${u.slug}`}
                    className="text-fg underline-offset-4 transition-colors hover:text-accent-strong hover:underline"
                  >
                    {u.navLabel}
                  </Link>
                </span>
              ))}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
