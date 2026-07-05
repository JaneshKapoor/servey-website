import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { Features } from "@/components/sections/features";
import { Statement } from "@/components/sections/statement";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Comparison } from "@/components/sections/comparison";
import { OnePager } from "@/components/sections/one-pager";
import { Pricing } from "@/components/sections/pricing";
import { WaitlistCta } from "@/components/sections/waitlist-cta";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Features />
        <Statement />
        <HowItWorks />
        <Comparison />
        <OnePager />
        <Pricing />
        <WaitlistCta />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
