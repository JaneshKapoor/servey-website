"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Aurora } from "@/components/aurora";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WaitlistDialog } from "@/components/waitlist-dialog";
import { Magnetic } from "@/components/motion/magnetic";
import { Tilt } from "@/components/motion/tilt";
import { IpadFrame, IphoneFrame } from "@/components/device-frame";
import { screenshots } from "@/lib/screenshots";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  // Framer Motion bypasses the CSS reduced-motion block, so gate it here.
  const reduce = useReducedMotion();
  const rise = (y: number) => (reduce ? false : { opacity: 0, y });
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32">
      <Aurora intensity={1.15} />
      <div aria-hidden className="absolute inset-0 bg-grid" />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={rise(12)}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mb-6 flex justify-center"
          >
            <Badge className="border-accent/30 bg-accent-deep/60">
              <span className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(34,220,110,0.9)]" />
              Mac app out now · iPhone and iPad next
            </Badge>
          </motion.div>

          <motion.h1
            initial={rise(16)}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.05 }}
            className="text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.25rem]"
          >
            Your Mac.
            <br />
            <span className="text-sweep">Wherever you are.</span>
          </motion.h1>

          <motion.p
            initial={rise(16)}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.12 }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl"
          >
            Leave your Mac at home. Use it from your iPhone or iPad, anywhere in
            the world.
          </motion.p>

          <motion.div
            initial={rise(16)}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.18 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            {/* Primary action is the thing you can actually have today. The
                download goes through /api/download so it is counted - the raw
                file URL is reserved for the app's own update check. */}
            <Magnetic className="w-full sm:w-auto">
              <Button asChild size="lg" className="w-full">
                {/* A real <a>, not next/link: this is a route handler that
                    302s to a 37 MB file. Client-side routing has nothing to
                    render and would just swallow the click. */}
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a href="/api/download">
                  <Download className="size-4" />
                  Download for Mac
                </a>
              </Button>
            </Magnetic>
            <WaitlistDialog source="hero">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Get the iPhone app
                <ArrowRight className="size-4" />
              </Button>
            </WaitlistDialog>
          </motion.div>
        </div>

        {/* Device mockup */}
        <motion.div
          initial={rise(40)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.25 }}
          className="relative mx-auto mt-16 max-w-5xl [perspective:1600px] sm:mt-20"
        >
          <div
            aria-hidden
            className="absolute -inset-x-8 -top-10 bottom-0 -z-10 rounded-[3rem] bg-accent/10 blur-3xl"
          />
          <Tilt className="relative">
            {/* LCP element - preload it rather than letting it lazy-load. */}
            <IpadFrame slot={screenshots["hero-devices"]} className="w-full" priority />
            <div className="absolute -bottom-8 right-2 w-[26%] max-w-[180px] sm:-bottom-10 sm:right-6">
              {/* Inset phone is 26% of the mockup, capped at 180px - it hits
                  that cap once the mockup passes ~692px wide. */}
              <IphoneFrame
                slot={screenshots["device-picker"]}
                sizes="(max-width: 700px) 26vw, 180px"
              />
            </div>
          </Tilt>
        </motion.div>
      </div>
    </section>
  );
}
