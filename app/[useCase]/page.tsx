import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Download } from "lucide-react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { AppStoreBadge } from "@/components/app-store-badge";
import { getPost } from "@/lib/blog";
import { getUseCase, useCases } from "@/lib/use-cases";
import { site, ogImage } from "@/lib/site";

export function generateStaticParams() {
  return useCases.map((u) => ({ useCase: u.slug }));
}

/**
 * This route sits at the top level, so without this every unmatched path would
 * render it. Static routes (/blog, /privacy, /terms) still win, and anything
 * that is not a known use-case slug now 404s properly.
 */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ useCase: string }>;
}): Promise<Metadata> {
  const { useCase } = await params;
  const page = getUseCase(useCase);
  if (!page) return {};
  const url = `${site.url}/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: page.h1,
      description: page.description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: page.h1,
      description: page.description,
      images: [ogImage],
    },
  };
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ useCase: string }>;
}) {
  const { useCase } = await params;
  const page = getUseCase(useCase);
  if (!page) notFound();

  const url = `${site.url}/${page.slug}`;
  const related = getPost(page.relatedSlug);
  const others = useCases.filter((u) => u.slug !== page.slug);

  // Google retired FAQ rich results on 7 May 2026 - this earns no SERP
  // treatment now, and is kept for the answer engines that still read it.
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: page.navLabel, item: url },
    ],
  };

  // Points at the SoftwareApplication node in the root layout's @graph rather
  // than redeclaring the product, so the two can never drift apart.
  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: page.h1,
    description: page.description,
    inLanguage: "en",
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#app` },
    primaryImageOfPage: `${site.url}/opengraph-image`,
  };

  return (
    <>
      {[webPageLd, faqLd, breadcrumbLd].map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}
      <Header />
      <main id="main" className="container-page pb-24 pt-32">
        <div className="mx-auto max-w-[68ch]">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-fg">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-muted/50">
                /
              </li>
              <li aria-current="page" className="text-fg/70">
                {page.navLabel}
              </li>
            </ol>
          </nav>

          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
            {page.h1}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-fg/90">{page.lede}</p>

          {/* Both halves of the product ship, so both get an action. The
              Mac download is the primary one because the Mac app is the half
              that has to be installed first - nothing works until the host
              is running. */}
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/api/download">
                <Download className="size-4" />
                Download for Mac
              </a>
            </Button>
            <AppStoreBadge height={44} />
          </div>

          {/* The task-specific module. */}
          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2">
            {page.tiles.map((tile) => (
              <li key={tile.title} className="bg-bg p-5">
                <p className="flex items-start gap-2.5 text-base font-medium text-fg">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent-strong" aria-hidden />
                  {tile.title}
                </p>
                <p className="mt-2 pl-[1.625rem] text-[15px] leading-relaxed text-muted">
                  {tile.body}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-16 space-y-10">
            {page.sections.map((section) => (
              <section key={section.h2}>
                <h2 className="text-2xl font-semibold tracking-[-0.01em] text-fg">
                  {section.h2}
                </h2>
                {section.body.map((para, i) => (
                  <p
                    key={i}
                    className="mt-4 text-[15px] leading-relaxed text-muted"
                  >
                    {para}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-4 space-y-2">
                    {section.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-[15px] leading-relaxed text-muted"
                      >
                        <span
                          aria-hidden
                          className="mt-2 size-1 shrink-0 rounded-full bg-accent-strong"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Where a competitor page would put social proof, this puts the truth. */}
          <aside className="mt-14 rounded-2xl border border-border bg-surface p-5">
            <p className="text-sm font-medium text-fg">Servey is new</p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              Both apps shipped in October 2026, so there are no App Store reviews
              and no track record behind this page yet. Everything above describes
              what the app does, written by the people building it - not by anyone
              who has lived with it for a year. If you need something proven today,
              the established apps in this space have earned that and Servey has
              not.
            </p>
          </aside>

          <section className="mt-14 border-t border-border pt-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Frequently asked questions
            </h2>
            <dl className="mt-5 space-y-6">
              {page.faqs.map((f) => (
                <div key={f.q}>
                  <dt className="text-base font-medium text-fg">{f.q}</dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-muted">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {related && (
            <aside className="mt-14">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Related guide
              </h2>
              <Link
                href={`/blog/${related.slug}`}
                className="group mt-4 inline-flex items-center gap-2 text-fg transition-colors hover:text-accent-strong"
              >
                {related.title}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </aside>
          )}

          {/* Cross-link mesh: every page links every other. */}
          <aside className="mt-14 border-t border-border pt-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              What else Servey is for
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/${o.slug}`}
                    className="group inline-flex items-center gap-2 text-[15px] text-muted transition-colors hover:text-fg"
                  >
                    {o.navLabel}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          <div className="mt-14 flex flex-col items-start gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              Servey puts your Mac in your pocket. Out now on Mac, iPhone and iPad.
            </p>
            <div className="flex items-center gap-2">
              <Button asChild size="md">
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a href="/api/download">Download for Mac</a>
              </Button>
              <AppStoreBadge height={40} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
