import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** Indexable marketing & guide URLs only — never per-domain result pages. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = [
    "/",
    "/check",
    "/privacy",
    "/guides/is-website-legit",
    "/guides/fake-shopify-stores",
    "/guides/urdu",
  ];
  return paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "/" || path === "/check" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/check" ? 0.9 : 0.7,
  }));
}
