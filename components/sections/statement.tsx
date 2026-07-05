"use client";

import { motion, type Variants } from "framer-motion";
import { Aurora } from "@/components/aurora";

const line = "Control your Mac from anywhere — crystal clear.";
const words = line.split(" ");

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: "0.6em", filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Second headline — the animated mid-scroll statement interstitial (§4). */
export function Statement() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden py-24">
      <Aurora intensity={0.9} className="opacity-80" />
      <div className="container-page relative text-center">
        <motion.h2
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="mx-auto max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          aria-label={line}
        >
          {words.map((w, i) => {
            const highlight = w.startsWith("crystal") || w.startsWith("clear");
            return (
              <motion.span
                key={`${w}-${i}`}
                variants={word}
                className="mr-[0.25em] inline-block"
                aria-hidden
              >
                <span className={highlight ? "text-gradient-brand" : undefined}>{w}</span>
              </motion.span>
            );
          })}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mx-auto mt-6 max-w-md text-pretty text-base text-muted sm:text-lg"
        >
          The couch, the café, the train — your whole desktop and terminal, wherever
          you are.
        </motion.p>
      </div>
    </section>
  );
}
