import { Download, FileText } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export function OnePager() {
  return (
    <section className="scroll-mt-24 py-20 sm:py-24">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border-strong bg-surface p-8 sm:p-10">
            <div
              aria-hidden
              className="absolute -right-16 -top-16 size-56 rounded-full bg-accent/10 blur-3xl"
            />
            <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-5">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-accent/30 bg-accent-deep">
                  <FileText className="size-7 text-accent-strong" />
                </span>
                <div>
                  <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    The one-pager: “About Servey”
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                    A clean, on-brand PDF covering what Servey is, the two streaming
                    paths, the full feature list, and how it&rsquo;s different from
                    traditional remote tools.
                  </p>
                </div>
              </div>
              <Button asChild size="lg" className="shrink-0">
                <a href="/servey-about.pdf" download>
                  <Download className="size-4" />
                  Download PDF
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
