"use client";

import { motion } from "framer-motion";
import { Laptop, Smartphone, Cloud, Wifi, Globe } from "lucide-react";

function FlowDots({ color, count = 3 }: { color: string; count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center">
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute size-1.5 rounded-full"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
          initial={{ left: "6%", opacity: 0 }}
          animate={{ left: ["6%", "94%"], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 1.8,
            delay: i * 0.6,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function Node({
  icon: Icon,
  label,
}: {
  icon: typeof Laptop;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex size-14 items-center justify-center rounded-2xl border border-border-strong bg-surface-2">
        <Icon className="size-6 text-fg" />
      </div>
      <span className="text-xs font-medium text-muted">{label}</span>
    </div>
  );
}

export function DualPathDiagram() {
  return (
    <div className="rounded-2xl border border-border-strong bg-surface p-5 shadow-xl shadow-black/30 sm:p-7">
      {/* LAN path */}
      <div className="rounded-xl border border-accent/25 bg-accent-deep/40 p-4 sm:p-5">
        <div className="mb-4 flex items-center gap-2">
          <Wifi className="size-4 text-accent-strong" />
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-strong">
            Same Wi-Fi — hardware HEVC
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <Node icon={Laptop} label="Your Mac" />
          <div className="relative mx-1 h-10 flex-1">
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-accent/40" />
            <FlowDots color="#22dc6e" />
          </div>
          <Node icon={Smartphone} label="iPhone / iPad" />
        </div>
        <p className="mt-3 text-center text-[11px] text-muted">
          Direct connection · no cloud in the middle
        </p>
      </div>

      {/* Remote path */}
      <div className="mt-4 rounded-xl border border-border bg-surface-2/60 p-4 sm:p-5">
        <div className="mb-4 flex items-center gap-2">
          <Globe className="size-4 text-fg" />
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            Anywhere — private P2P WebRTC
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <Node icon={Laptop} label="Your Mac" />
          <div className="relative mx-1 h-10 flex-1">
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-border-strong [border-top:1px_dashed_var(--border-strong)]" />
            <FlowDots color="#2dd4bf" count={2} />
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex size-14 items-center justify-center rounded-2xl border border-dashed border-border-strong bg-surface">
              <Cloud className="size-6 text-muted" />
            </div>
            <span className="text-[11px] text-muted">Handshake only</span>
          </div>
          <div className="relative mx-1 h-10 flex-1">
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 [border-top:1px_dashed_var(--border-strong)]" />
            <FlowDots color="#2dd4bf" count={2} />
          </div>
          <Node icon={Smartphone} label="iPhone / iPad" />
        </div>
        <p className="mt-3 text-center text-[11px] text-muted">
          End-to-end encrypted · your screen video never touches a server
        </p>
      </div>
    </div>
  );
}
