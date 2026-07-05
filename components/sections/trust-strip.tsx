import { Globe, Sparkles, ShieldCheck, TerminalSquare, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { trustItems } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  Sparkles,
  TerminalSquare,
  ShieldCheck,
  Globe,
};

export function TrustStrip() {
  return (
    <section aria-label="At a glance" className="border-y border-border bg-surface/40">
      <div className="container-page">
        <Reveal>
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4">
            {trustItems.map((item) => {
              const Icon = icons[item.icon];
              return (
                <li
                  key={item.label}
                  className="flex items-center justify-center gap-2.5 bg-transparent px-4 py-5 text-center"
                >
                  <Icon className="size-4 shrink-0 text-accent-strong" />
                  <span className="text-sm font-medium text-fg">{item.label}</span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
