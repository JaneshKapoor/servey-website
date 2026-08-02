import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { contentUpdated, posts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const updated = new Date(contentUpdated);
  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    // Reflect the last real review of the content, not just first-published date.
    lastModified: updated > new Date(p.date) ? updated : new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...postEntries,
    { url: `${site.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
