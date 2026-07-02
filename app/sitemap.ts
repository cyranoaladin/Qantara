import type { MetadataRoute } from "next";

import { blogPosts } from "@/lib/data/blog";
import { absoluteUrl } from "@/lib/seo";

const routes = [
  "",
  "/services",
  "/formations",
  "/studio",
  "/gouvernance",
  "/education",
  "/diagnostic-ia",
  "/ressources",
  "/blog",
  "/cas-usages",
  "/contact",
  "/mentions-legales",
  "/confidentialite",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...routes.map((route): MetadataRoute.Sitemap[number] => ({
      url: absoluteUrl(route || "/"),
      lastModified: now,
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.7,
    })),
    ...blogPosts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
