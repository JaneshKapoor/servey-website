import { Lock, ShieldCheck, KeyRound, ServerOff } from "lucide-react";

/** Static illustration for the "Private by design" feature (05). */
export function PrivacyIllustration() {
  const points = [
    { icon: KeyRound, label: "Google sign-in on both devices" },
    { icon: ShieldCheck, label: "Only your Mac pairs with your devices" },
    { icon: ServerOff, label: "Remote video hardly touches our servers" },
  ];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border-strong bg-surface p-7 shadow-xl shadow-black/30">
      <div
        aria-hidden
        className="absolute -right-10 -top-10 size-48 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="relative flex flex-col items-center gap-4 pb-6 text-center">
        <div className="flex size-20 items-center justify-center rounded-3xl border border-accent/30 bg-accent-deep">
          <Lock className="size-9 text-accent-strong" />
        </div>
        <p className="max-w-xs text-sm text-muted">
          End-to-end encrypted. Account-scoped. Peer-to-peer.
        </p>
      </div>
      <ul className="relative space-y-2.5 border-t border-border pt-6">
        {points.map((p) => (
          <li key={p.label} className="flex items-center gap-3 text-sm text-fg">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface-2">
              <p.icon className="size-4 text-accent-strong" />
            </span>
            {p.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
