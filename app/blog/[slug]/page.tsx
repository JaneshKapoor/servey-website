import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { WaitlistDialog } from "@/components/waitlist-dialog";
import {
  author,
  contentUpdated,
  faqsBySlug,
  getPost,
  posts,
  relatedPosts,
} from "@/lib/blog";
import { useCasesForPost } from "@/lib/use-cases";
import { site, ogImage } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `${site.url}/blog/${post.slug}`;
  return {
    title: post.metaTitle ?? post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

const dateFmt = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${site.url}/blog/${post.slug}`;
  const postFaqs = faqsBySlug[post.slug] ?? [];
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: contentUpdated,
    author: {
      "@type": "Person",
      name: author.name,
      url: author.url,
      description: author.bio,
    },
    // Reference the layout's Organization by @id rather than re-declaring it.
    // Two inline copies drift apart silently; the use-case pages already use
    // this idiom for the same reason.
    publisher: { "@id": `${site.url}/#organization` },
    image: `${site.url}/opengraph-image`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.keywords.join(", "),
  };
  // Google retired FAQ rich results on 7 May 2026 - this earns no SERP
  // treatment now, and is kept for the answer engines that still read it.
  const faqLd =
    postFaqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${url}#faq`,
          mainEntity: postFaqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  // Breadcrumbs let Google render "servey.in › Blog › <post>" in the result
  // instead of the raw URL, which measurably lifts click-through.
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const others = relatedPosts(post.slug, 3);
  const relatedUseCases = useCasesForPost(post.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Header />
      <main id="main" className="container-page pb-24 pt-32">
        <article className="mx-auto max-w-2xl">
          {/* Visible trail mirrors the BreadcrumbList JSON-LD - Google expects
              the two to agree before it will render the trail in results. */}
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
              <li>
                <Link href="/blog" className="transition-colors hover:text-fg">
                  Blog
                </Link>
              </li>
              <li aria-hidden className="text-muted/50">
                /
              </li>
              <li aria-current="page" className="max-w-full truncate text-fg/70">
                {post.title}
              </li>
            </ol>
          </nav>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-muted">
            By{" "}
            <a
              href={author.url}
              rel="author noopener noreferrer"
              target="_blank"
              className="text-fg/80 transition-colors hover:text-accent-strong"
            >
              {author.name}
            </a>
            {" · "}
            <time dateTime={post.date}>{dateFmt.format(new Date(post.date))}</time>
            {contentUpdated !== post.date && (
              <>
                {" · Updated "}
                <time dateTime={contentUpdated}>
                  {dateFmt.format(new Date(contentUpdated))}
                </time>
              </>
            )}
            {" · "}
            {post.readingMinutes} min read
          </p>
          <p className="mt-6 text-lg leading-relaxed text-fg/90">{post.lede}</p>

          <div className="legal-prose mt-8 space-y-6 text-[15px] leading-relaxed text-muted">
            {post.body.map((block, i) => {
              if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
              if (block.type === "ul")
                return (
                  <ul key={i}>
                    {block.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                );
              if (block.type === "table")
                return (
                  // Wrapper scrolls on its own so a wide table never makes the
                  // whole page scroll sideways on a phone.
                  <div
                    key={i}
                    className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0"
                  >
                    <table className="w-full min-w-[34rem] border-collapse text-left text-[14px]">
                      {block.caption && (
                        <caption className="mb-3 text-left text-xs text-muted">
                          {block.caption}
                        </caption>
                      )}
                      <thead>
                        <tr>
                          {block.headers.map((h, j) => (
                            <th
                              key={j}
                              scope="col"
                              className="border-b border-border-strong pb-2.5 pr-4 align-bottom font-medium text-fg last:pr-0"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.rows.map((row, j) => (
                          <tr key={j} className="border-b border-border last:border-0">
                            {row.map((cell, k) => (
                              <td
                                key={k}
                                className={`py-3 pr-4 align-top last:pr-0 ${
                                  k === 0 ? "font-medium text-fg" : "text-muted"
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              if (block.type === "img")
                return (
                  <figure
                    key={i}
                    className="overflow-hidden rounded-2xl border border-border bg-surface"
                  >
                    <Image
                      src={block.src}
                      alt={block.alt}
                      width={block.width}
                      height={block.height}
                      className="h-auto w-full"
                      sizes="(max-width: 768px) 100vw, 42rem"
                      quality={90}
                    />
                    {block.caption && (
                      <figcaption className="border-t border-border px-4 py-3 text-center text-xs text-muted">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              return <p key={i}>{block.text}</p>;
            })}
          </div>

          {/* FAQ — visible Q&A that mirrors the FAQPage JSON-LD for AI answer engines. */}
          {postFaqs.length > 0 && (
            <section className="mt-14 border-t border-border pt-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Frequently asked questions
              </h2>
              <dl className="mt-5 space-y-6">
                {postFaqs.map((f, i) => (
                  <div key={i}>
                    <dt className="text-base font-medium text-fg">{f.q}</dt>
                    <dd className="mt-2 text-[15px] leading-relaxed text-muted">
                      {f.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {/* Author */}
          <aside className="mt-12 flex items-start gap-4 rounded-2xl border border-border bg-surface p-5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-base font-semibold text-accent-strong">
              {author.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium text-fg">
                {author.name}
                <span className="font-normal text-muted"> · {author.role}</span>
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{author.bio}</p>
            </div>
          </aside>

          {/* CTA */}
          <div className="mt-12 flex flex-col items-start gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              Servey puts your Mac in your pocket. Launching soon.
            </p>
            <WaitlistDialog source={`blog:${post.slug}`}>
              <Button size="md">Join the waitlist</Button>
            </WaitlistDialog>
          </div>

          {/* The commercial counterpart to this guide. Rendered above "Keep
              reading" on purpose: it is the link most likely to be followed by
              a reader who has finished the article and wants the product page,
              and it is the only inbound path a crawler has into the use-case
              cluster from the part of the site Google actually indexes. */}
          {relatedUseCases.length > 0 && (
            <aside className="mt-14">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Servey for this
              </h2>
              <ul className="mt-4 space-y-3">
                {relatedUseCases.map((u) => (
                  <li key={u.slug}>
                    <Link
                      href={`/${u.slug}`}
                      className="group inline-flex items-center gap-2 text-fg transition-colors hover:text-accent-strong"
                    >
                      {u.h1}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* Related */}
          {others.length > 0 && (
            <aside className="mt-14">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Keep reading
              </h2>
              <ul className="mt-4 space-y-3">
                {others.map((p) => (
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
            </aside>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
