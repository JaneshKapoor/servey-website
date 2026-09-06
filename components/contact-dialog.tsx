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
import { site } from "@/lib/site";
import { ContactForm } from "@/components/contact-form";

/** Contact-us capture in a modal. Stores messages to Firestore via /api/contact. */
export function ContactDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Get in touch</DialogTitle>
          <DialogDescription>
            Questions, feedback, or partnership ideas? Send us a message and we&rsquo;ll
            reply by email - or write to{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-accent-strong underline underline-offset-2"
            >
              {site.email}
            </a>{" "}
            directly.
          </DialogDescription>
        </DialogHeader>
        <ContactForm />
      </DialogContent>
    </Dialog>
  );
}
