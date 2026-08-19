import Link from "next/link";
import { ChevronUp, Heart, Mail } from "lucide-react";
import { Wordmark } from "@/components/wordmark";
import { ContactDialog } from "@/components/contact-dialog";
import { nav, site } from "@/lib/site";
import { useCases } from "@/lib/use-cases";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-8 border-t border-border bg-surface/30">
      <div className="container-page py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Wordmark />
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Your Mac. In your pocket. Native remote access - crystal-clear on your
              network, private peer-to-peer anywhere else.
            </p>

            {/* Social proof + reciprocal link. Deliberately in the footer, not the
                header, so it never competes with the waitlist CTA. */}
            <a
              href="https://www.producthunt.com/products/servey"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-surface px-4 py-2.5 text-sm text-muted transition-colors hover:border-accent/50 hover:text-fg"
            >
              <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-[#da552f]/15 text-[#da552f]">
                <ChevronUp className="size-3.5" strokeWidth={3} />
              </span>
              We&rsquo;re live on Product Hunt
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {/* Use cases live in the footer because they were otherwise orphaned:
                the pages cross-link to each other, but nothing outside the cluster
                linked in, so the only route to them was the sitemap. Search Console
                counted 33 internal links across the whole site, and the three most
                linked targets were /privacy, /terms and /blog - i.e. the footer was
                the only internal linking the crawler could see. A footer nav puts
                every one of them one hop from every page. */}
            <nav aria-label="Use cases" className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Use cases
              </span>
              {useCases.map((u) => (
                <Link
                  key={u.slug}
                  href={`/${u.slug}`}
                  className="text-sm text-muted transition-colors hover:text-fg"
                >
                  {u.navLabel}
                </Link>
              ))}
            </nav>

            <nav aria-label="Product" className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Product
              </span>
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/blog" className="text-sm text-muted transition-colors hover:text-fg">
                Blog
              </Link>
            </nav>

            <nav aria-label="Legal" className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Legal
              </span>
              <Link href="/privacy" className="text-sm text-muted transition-colors hover:text-fg">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted transition-colors hover:text-fg">
                Terms
              </Link>
            </nav>

            <nav aria-label="Contact" className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Contact
              </span>
              <ContactDialog>
                <button
                  type="button"
                  className="inline-flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                >
                  <Mail className="size-4" />
                  Contact us
                </button>
              </ContactDialog>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:justify-between">
          <span>
            © {year} {site.name}. All rights reserved.
          </span>

          <span className="inline-flex items-center gap-1.5">
            Made with
            <Heart className="size-3.5 fill-accent text-accent" aria-label="love" />
            by{" "}
            <a
              href="https://x.com/KapoorJanesh"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-fg transition-colors hover:text-accent-strong"
            >
              Janesh
            </a>
            and{" "}
            <a
              href="https://x.com/dwivediishivam"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-fg transition-colors hover:text-accent-strong"
            >
              Shivam
            </a>
          </span>

          <span className="font-mono">{site.domain}</span>
        </div>
      </div>
    </footer>
  );
}
