import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrintButton } from "@/components/print-button";
import { DualPathDiagram } from "@/components/dual-path-diagram";
import { Wordmark } from "@/components/wordmark";
import { comparison } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Servey (one-pager)",
  description:
    "What Servey is, its two streaming paths, the full feature list, and how it differs from traditional remote tools.",
  robots: { index: false, follow: false },
};

const featureList = [
  "Full-HD+ screen mirroring, aspect-correct, pinch-to-zoom",
  "Mouse control — move, left/right click, drag, scroll",
  "On-screen virtual trackpad reaching every edge",
  "Full keyboard incl. ⌘C / ⌘V / Esc / Tab / Return",
  "Native terminal — a real shell over either path",
  "Draggable, collapsible control dock",
  "Adaptive quality that never crops the screen",
  "Account-scoped Google pairing of only your devices",
  "Works across any network — no VPN, no port forwarding",
  "Keep-Mac-awake so the host stays reachable",
];

export default function AboutPdfPage() {
  return (
    <main className="container-page max-w-3xl py-16 print:py-0">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="size-4" />
          Back to Servey
        </Link>
        <div className="flex gap-2">
          <PrintButton />
          <Button asChild>
            <a href="/servey-about.pdf" download>
              <Download className="size-4" />
              Download PDF
            </a>
          </Button>
        </div>
      </div>

      <article className="space-y-10">
        <header>
          <Wordmark href="/" />
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Your Mac. <span className="text-gradient-brand">In your pocket.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Servey turns your iPhone or iPad into a crystal-clear, low-latency window
            into your Mac — full screen mirroring, mouse, keyboard, and a real terminal
            — over your local network or from anywhere in the world.
          </p>
        </header>

        <section>
          <h2 className="text-xl font-semibold tracking-tight">What Servey is</h2>
          <p className="mt-3 leading-relaxed text-muted">
            Native remote desktop for the Apple ecosystem, built in{" "}
            <strong className="text-fg">Swift/SwiftUI</strong> — not an Electron or Java
            port. It&rsquo;s Apple-first and designed for touch: developers, power users,
            and creators get their Mac&rsquo;s full desktop and terminal in their pocket.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold tracking-tight">
            Two intelligent streaming paths
          </h2>
          <DualPathDiagram />
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight">Everything it does</h2>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {featureList.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                <Check className="mt-0.5 size-4 shrink-0 text-accent-strong" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold tracking-tight">
            How it&rsquo;s different from traditional tools
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 text-xs font-medium uppercase tracking-wide text-muted">Theme</th>
                  <th className="p-4 text-xs font-medium uppercase tracking-wide text-muted">
                    Traditional
                  </th>
                  <th className="bg-accent-deep/40 p-4 text-xs font-medium uppercase tracking-wide text-accent-strong">
                    Servey
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr key={row.theme} className="border-b border-border last:border-0">
                    <td className="p-4 font-medium text-fg">{row.theme}</td>
                    <td className="p-4 text-muted">{row.traditional}</td>
                    <td className="bg-accent-deep/20 p-4 text-fg">{row.servey}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="border-t border-border pt-6 text-sm text-muted">
          Servey — native remote access for Mac, iPhone &amp; iPad. Pricing coming soon.
          <span className="ml-2 font-mono text-accent-strong">{site.domain}</span>
        </footer>
      </article>
    </main>
  );
}
