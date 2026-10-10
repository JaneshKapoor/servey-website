import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { Situations } from "@/components/sections/situations";
import { Features } from "@/components/sections/features";
import { Statement } from "@/components/sections/statement";
import { Audience } from "@/components/sections/audience";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Comparison } from "@/components/sections/comparison";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { faqs, pricing } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * The money-bearing structured data, kept on the one page that is about money.
 *
 * These two nodes used to sit in the root layout's @graph, which put prices and
 * the pricing FAQ into the HTML of every page on the site - including
 * /how-it-works, which the iPad app links to and where App Store Review
 * Guidelines 3.1.3 and 4.8 make a price a liability. They describe the homepage
 * anyway: an Offer belongs where you can act on it, and a FAQPage belongs on the
 * page whose questions it answers (blog posts already emit their own).
 *
 * `#app` itself is still defined site-wide in the layout, so this adds offers to
 * that node by @id rather than redeclaring the product. Prices are read from
 * `pricing` so this cannot drift from what the page shows.
 */
const plansJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${site.url}/#app`,
      offers: pricing.plans.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        price: plan.price.usd,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${site.url}/#pricing`,
      })),
    },
    // Google retired FAQ *rich results* on 7 May 2026, so expect no accordion in
    // the SERP from this. It stays because the markup is still valid and answer
    // engines read it for machine-readable Q&A.
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(plansJsonLd) }}
      />
      <Header />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Situations />
        <Features />
        <Statement />
        <Audience />
        <HowItWorks />
        <Comparison />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
