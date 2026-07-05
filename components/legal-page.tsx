import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";

/** Shared shell for /privacy and /terms - on-brand, readable prose. */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
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
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-3 text-sm text-muted">Last updated {updated}</p>
          <div className="legal-prose mt-10 space-y-6 text-[15px] leading-relaxed text-muted">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
