import Link from "next/link";
import { Heart, Mail } from "lucide-react";
import { Wordmark } from "@/components/wordmark";
import { nav, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="hairline-top mt-8 bg-surface/30">
      <div className="container-page py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Wordmark />
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Your Mac. In your pocket. Native remote access - crystal-clear on your
              network, private peer-to-peer anywhere else.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
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
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
              >
                <Mail className="size-4" />
                {site.email}
              </a>
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
