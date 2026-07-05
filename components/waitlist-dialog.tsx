"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WaitlistForm } from "@/components/waitlist-form";

/** Waitlist capture in a modal — used by the hero + nav CTAs. */
export function WaitlistDialog({
  children,
  source = "hero-dialog",
}: {
  children: React.ReactNode;
  source?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join the Servey waitlist</DialogTitle>
          <DialogDescription>
            Be first to put your Mac in your pocket. We&rsquo;ll email you the moment
            Servey is ready — no spam, ever.
          </DialogDescription>
        </DialogHeader>
        <WaitlistForm source={source} autoFocus />
      </DialogContent>
    </Dialog>
  );
}
