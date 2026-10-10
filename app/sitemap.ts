import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { contentUpdated, posts } from "@/lib/blog";
import { useCases } from "@/lib/use-cases";
import { screenshots, type ScreenshotSlot } from "@/lib/screenshots";

// Image sitemap entries. Google will not index a screenshot it has not been
// pointed at, and every product shot here is original - captured from the real
// app, never stock - which is exactly what image search rewards. Only `ready`
// slots are listed; a placeholder has no file behind it.
const productImages = (Object.values(screenshots) as ScreenshotSlot[])
  .filter((s) => s.ready && s.src)
  .map((s) => `${site.url}${s.src}`);

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date(contentUpdated);
  const postEntries: MetadataRoute.Sitemap = posts.map((p) => {
    // Only the images a post actually embeds - claiming otherwise is the kind
    // of thing that gets an image sitemap ignored.
    const imgs = p.body
      .filter((b): b is Extract<typeof b, { type: "img" }> => b.type === "img")
      .map((b) => `${site.url}${b.src}`);
    return {
      url: `${site.url}/blog/${p.slug}`,
      // Reflect the last real review of the content, not just first-published date.
      lastModified: updated > new Date(p.date) ? updated : new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      ...(imgs.length ? { images: imgs } : {}),
    };
  });
  // Above the posts: these are the commercial landing pages.
  const useCaseEntries: MetadataRoute.Sitemap = useCases.map((u) => ({
    url: `${site.url}/${u.slug}`,
    lastModified: updated,
    changeFrequency: "monthly",
    priority: 0.9,
  }));
  return [
    // A build timestamp here would claim every page changed on every deploy,
    // which gets the signal discounted. Tie it to the content instead.
    {
      url: site.url,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 1,
      images: productImages,
    },
    ...useCaseEntries,
    // Linked from inside the iPad app, so it must stay reachable - and it is a
    // genuine explainer, so it is worth indexing on its own.
    {
      url: `${site.url}/how-it-works`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [
        `${site.url}${screenshots["mac-host-ui"].src}`,
        `${site.url}${screenshots["mirroring-ipad"].src}`,
      ],
    },
    // /mac is hardcoded in the iOS app's onboarding as the only route to the
    // host app, so it is a real destination rather than a marketing page.
    {
      url: `${site.url}/mac`,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [`${site.url}${screenshots["mac-host-ui"].src}`],
    },
    {
      url: `${site.url}/blog`,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...postEntries,
    // Required by App Store Connect as the listing's Support URL, so it has to
    // stay reachable; it is also a genuinely useful page for people searching
    // for a fix rather than a feature.
    {
      url: `${site.url}/support`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${site.url}/privacy`,
      lastModified: updated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${site.url}/terms`,
      lastModified: updated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
