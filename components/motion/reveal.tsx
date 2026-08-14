"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import * as React from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.02 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

/**
 * Fade + rise on scroll into view (once).
 *
 * The reduced-motion check has to live here in JS: Framer Motion drives these
 * through the Web Animations API, so the `prefers-reduced-motion` block in
 * globals.css (which only zeroes CSS animations) never touches them.
 * `initial={false}` also means content stays visible if JS fails to run.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "span";
}) {
  const MotionTag = motion[as];
  const reduce = useReducedMotion();
  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: easeOut, delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Wraps children so each direct <RevealItem> staggers in. */
export function RevealGroup({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "tbody";
}) {
  const MotionTag = motion[as];
  const reduce = useReducedMotion();
  return (
    <MotionTag
      className={className}
      variants={container}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "tr";
}) {
  const MotionTag = motion[as];
  const reduce = useReducedMotion();
  return (
    // Dropping the variants entirely under reduced motion, rather than relying
    // on the parent's absent variant label to leave these visible - getting
    // that inference wrong would pin whole sections at opacity 0.
    <MotionTag variants={reduce ? undefined : item} className={className}>
      {children}
    </MotionTag>
  );
}
