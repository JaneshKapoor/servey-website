import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { contentUpdated, posts } from "@/lib/blog";
import { useCases } from "@/lib/use-cases";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date(contentUpdated);
  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    // Reflect the last real review of the content, not just first-published date.
    lastModified: updated > new Date(p.date) ? updated : new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));
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
    { url: site.url, lastModified: updated, changeFrequency: "weekly", priority: 1 },
    ...useCaseEntries,
    { url: `${site.url}/blog`, lastModified: updated, changeFrequency: "weekly", priority: 0.8 },
    ...postEntries,
    { url: `${site.url}/privacy`, lastModified: updated, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/terms`, lastModified: updated, changeFrequency: "yearly", priority: 0.3 },
  ];
}
