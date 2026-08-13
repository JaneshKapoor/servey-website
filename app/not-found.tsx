import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page does not exist. Find Servey's guides to Mac remote access instead.",
  // A soft-404 that search engines index is worse than none at all.
  robots: { index: false, follow: true },
};

export default function NotFound() {
  // Offer a real way onward rather than a dead end - crawlers and people both
  // benefit from links out of a 404.
  const suggestions = posts.slice(0, 4);

  return (
    <>
      <Header />
      <main id="main" className="container-page flex min-h-[70vh] flex-col justify-center pb-24 pt-32">
        <div className="mx-auto w-full max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-strong">
            404
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            This page moved, or never existed.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Nothing here. The links below cover most of what people come to
            servey.in looking for.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/">
                Back to home
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/blog">Read the guides</Link>
            </Button>
          </div>

          <section className="mt-14 border-t border-border pt-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Popular guides
            </h2>
            <ul className="mt-4 space-y-3">
              {suggestions.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group inline-flex items-center gap-2 text-fg transition-colors hover:text-accent-strong"
                  >
                    {p.title}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
