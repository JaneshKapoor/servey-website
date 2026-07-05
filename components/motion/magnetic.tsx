"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Subtle magnetic pointer-follow for the primary hero CTA. Deliberately gentle:
 * horizontal axis only, clamped to a few px, well-damped (not jiggly). Snaps
 * back to its resting position when the pointer leaves or the button is pressed
 * (so it isn't offset while the dialog is open).
 */
export function Magnetic({
  children,
  className,
  strength = 0.12,
  max = 6,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  max?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 24, mass: 0.5 });

  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * strength;
    x.set(Math.max(-max, Math.min(max, dx)));
  }

  function reset() {
    x.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onPointerDown={reset}
      style={{ x }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
