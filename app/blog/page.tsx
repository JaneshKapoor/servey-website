import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { posts } from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides on controlling your Mac from your iPhone and iPad - remote desktop, screen mirroring, a real terminal, and how Servey does it.",
  alternates: { canonical: `${site.url}/blog` },
  openGraph: {
    type: "website",
    url: `${site.url}/blog`,
    title: `Blog - ${site.name}`,
    description:
      "Guides on controlling your Mac from your iPhone and iPad - remote desktop, screen mirroring, and a real terminal.",
    images: ["/opengraph-image"],
  },
};

const dateFmt = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function BlogIndexPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  const listLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${site.url}/blog`,
    name: `${site.name} Blog`,
    url: `${site.url}/blog`,
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    blogPost: sorted.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: `${site.url}/blog/${p.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listLd) }}
      />
      <Header />
      <main className="container-page pb-24 pt-32">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="size-4" />
            Back to Servey
          </Link>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Blog</h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
            Guides on controlling your Mac from your iPhone and iPad - screen mirroring,
            a real terminal, and getting work done from your pocket.
          </p>

          <ul className="mt-10 space-y-4">
            {sorted.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group block rounded-2xl border border-border bg-surface/30 p-6 transition-colors hover:border-accent/40 hover:bg-surface-2"
                >
                  <p className="text-xs text-muted">
                    <time dateTime={p.date}>{dateFmt.format(new Date(p.date))}</time>
                    {" · "}
                    {p.readingMinutes} min read
                  </p>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight text-fg transition-colors group-hover:text-accent-strong">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">
                    {p.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong">
                    Read article
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
