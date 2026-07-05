"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
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
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32">
      <Aurora intensity={1.15} />
      <div aria-hidden className="absolute inset-0 bg-grid" />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mb-6 flex justify-center"
          >
            <Badge className="border-accent/30 bg-accent-deep/60">
              <span className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(34,220,110,0.9)]" />
              Native remote access for Mac · Waitlist open
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.05 }}
            className="text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.25rem]"
          >
            Your Mac.
            <br />
            In your <span className="text-sweep">pocket.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.12 }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl"
          >
            Servey mirrors your Mac to your iPhone and iPad with full mouse, keyboard,
            and a real terminal — hardware-accelerated on your network, private
            peer-to-peer anywhere else.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.18 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Magnetic className="w-full sm:w-auto">
              <WaitlistDialog source="hero">
                <Button size="lg" className="w-full">
                  Join the waitlist
                  <ArrowRight className="size-4" />
                </Button>
              </WaitlistDialog>
            </Magnetic>
            <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
              <Link href="#how-it-works">
                <PlayCircle className="size-4" />
                See how it works
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Device mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.25 }}
          className="relative mx-auto mt-16 max-w-5xl [perspective:1600px] sm:mt-20"
        >
          <div
            aria-hidden
            className="absolute -inset-x-8 -top-10 bottom-0 -z-10 rounded-[3rem] bg-accent/10 blur-3xl"
          />
          <Tilt className="relative">
            <IpadFrame slot={screenshots["hero-devices"]} className="w-full" />
            <div className="absolute -bottom-8 right-2 w-[26%] max-w-[180px] sm:-bottom-10 sm:right-6">
              <IphoneFrame slot={screenshots["device-picker"]} />
            </div>
          </Tilt>
        </motion.div>
      </div>
    </section>
  );
}
