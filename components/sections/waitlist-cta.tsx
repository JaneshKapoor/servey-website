import { Aurora } from "@/components/aurora";
import { Reveal } from "@/components/motion/reveal";
import { WaitlistForm } from "@/components/waitlist-form";

export function WaitlistCta() {
  return (
    <section id="waitlist" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border-strong bg-surface px-6 py-16 text-center sm:px-10 sm:py-20">
            <Aurora intensity={0.7} />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Put your Mac in your pocket.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-pretty text-base text-muted sm:text-lg">
                Join the waitlist and we&rsquo;ll email you the moment Servey is ready.
              </p>
              <div className="mx-auto mt-8 max-w-md">
                <WaitlistForm source="waitlist-section" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
