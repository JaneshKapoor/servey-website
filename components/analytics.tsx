"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { capturePageview } from "@/lib/analytics";

/**
 * useSearchParams() opts the whole route out of static rendering unless it sits
 * inside a Suspense boundary. Every page on this site is statically generated,
 * so this boundary is load-bearing rather than decorative - without it, mounting
 * the tracker in the root layout would turn the entire site dynamic.
 *
 * Search params are worth the boundary: they carry the utm_* and ref tags that
 * tell us which of the launch channels actually sent the traffic.
 */
function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    if (!pathname) return;
    const query = searchParams.toString();
    capturePageview(
      `${window.location.origin}${pathname}${query ? `?${query}` : ""}`,
    );
  }, [pathname, searchParams]);

  return null;
}

export function Analytics() {
  return (
    <React.Suspense fallback={null}>
      <PageviewTracker />
    </React.Suspense>
  );
}
