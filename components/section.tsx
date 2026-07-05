import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

/** Consistent vertical rhythm + centered max-width wrapper for a section. */
export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 sm:py-28", className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}

/** Numbered eyebrow label like `01 / Crystal-clear`. */
export function SectionLabel({
  index,
  children,
  className,
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 text-sm font-medium", className)}>
      {index && (
        <span className="font-mono text-accent-strong tabular-nums">{index}</span>
      )}
      <span className="uppercase tracking-[0.14em] text-muted">{children}</span>
    </div>
  );
}

/** Section heading + optional intro, centered. */
export function SectionHeading({
  label,
  title,
  intro,
  className,
}: {
  label?: React.ReactNode;
  title: React.ReactNode;
  intro?: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn("mx-auto max-w-2xl text-center", className)}>
      {label && (
        <div className="mb-4 flex justify-center">
          <SectionLabel>{label}</SectionLabel>
        </div>
      )}
      <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
        {title}
      </h2>
      {intro && (
        <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {intro}
        </p>
      )}
    </Reveal>
  );
}
