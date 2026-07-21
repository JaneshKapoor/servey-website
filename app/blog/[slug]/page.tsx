import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { WaitlistDialog } from "@/components/waitlist-dialog";
import { getPost, posts } from "@/lib/blog";
import { site } from "@/lib/site";

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
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/opengraph-image"],
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
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}/icon.png` },
    },
    image: `${site.url}/opengraph-image`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.keywords.join(", "),
  };

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <Header />
      <main className="container-page pb-24 pt-32">
        <article className="mx-auto max-w-2xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="size-4" />
            All articles
          </Link>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-muted">
            <time dateTime={post.date}>{dateFmt.format(new Date(post.date))}</time>
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

          {/* CTA */}
          <div className="mt-12 flex flex-col items-start gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              Servey puts your Mac in your pocket. Launching soon.
            </p>
            <WaitlistDialog source={`blog:${post.slug}`}>
              <Button size="md">Join the waitlist</Button>
            </WaitlistDialog>
          </div>

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
