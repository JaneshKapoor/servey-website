import { Check, Minus } from "lucide-react";
import { SectionHeading } from "@/components/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Wordmark } from "@/components/wordmark";
import { comparison } from "@/lib/content";

export function Comparison() {
  return (
    <section id="compare" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          label="Compare"
          title="Servey vs. traditional remote tools."
          intro="Most remote-desktop apps are cross-platform ports with the Mac experience bolted on. Servey was built the other way around."
        />

        {/* Desktop / tablet: full table. */}
        <Reveal className="mt-14 hidden md:block">
          <div className="overflow-hidden rounded-3xl border border-border">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="w-[26%] p-5 text-sm font-medium text-muted">Theme</th>
                  <th className="w-[37%] p-5 text-sm font-medium text-muted">
                    {comparison.columns.traditional}
                  </th>
                  <th className="w-[37%] bg-accent-deep/40 p-5">
                    <span className="flex items-center gap-2">
                      <Wordmark href="#compare" className="text-base" />
                    </span>
                  </th>
                </tr>
              </thead>
              <RevealGroup as="tbody">
                {comparison.rows.map((row) => (
                  <RevealItem as="tr" key={row.theme} className="border-b border-border last:border-0">
                    <td className="p-5 align-top text-sm font-medium text-fg">{row.theme}</td>
                    <td className="p-5 align-top text-sm text-muted">
                      <span className="flex gap-2.5">
                        <Minus className="mt-0.5 size-4 shrink-0 text-muted/60" />
                        {row.traditional}
                      </span>
                    </td>
                    <td className="bg-accent-deep/20 p-5 align-top text-sm text-fg">
                      <span className="flex gap-2.5">
                        <Check className="mt-0.5 size-4 shrink-0 text-accent-strong" />
                        {row.servey}
                      </span>
                    </td>
                  </RevealItem>
                ))}
              </RevealGroup>
            </table>
          </div>
        </Reveal>

        {/* Phone: stacked cards, no horizontal scroll. */}
        <RevealGroup className="mt-12 space-y-4 md:hidden">
          {comparison.rows.map((row) => (
            <RevealItem key={row.theme}>
              <div className="rounded-2xl border border-border bg-surface p-5">
                <h3 className="text-sm font-semibold tracking-tight text-fg">{row.theme}</h3>
                <div className="mt-4 space-y-3">
                  <div className="flex gap-2.5">
                    <Minus className="mt-0.5 size-4 shrink-0 text-muted/60" />
                    <div>
                      <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted/70">
                        Traditional
                      </div>
                      <p className="mt-0.5 text-sm text-muted">{row.traditional}</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 rounded-xl border border-accent/20 bg-accent-deep/25 p-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent-strong" />
                    <div>
                      <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-accent-strong">
                        Servey
                      </div>
                      <p className="mt-0.5 text-sm text-fg">{row.servey}</p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted">
          Comparison reflects Servey&rsquo;s architecture and typical traditional
          remote-desktop tools (VNC/RDP, TeamViewer). No benchmark numbers are claimed.
        </p>
      </div>
    </section>
  );
}
