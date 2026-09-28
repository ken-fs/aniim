import type { MetadataRoute } from "next";
import { creatures } from "@/lib/creatures";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["/", "/dex/", "/tier-list/", "/codes/", "/map/", "/catch-calculator/", "/elements/", "/habitats/", "/guides/", "/guides/catch-chance/", "/guides/beginner/", "/guides/evolution/", "/about/", "/privacy/"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, lastModified: now, changeFrequency: (p === "/" || p === "/codes/" ? "daily" : "weekly") as "daily" | "weekly", priority: p === "/" ? 1 : 0.8 })),
    ...creatures.map((c) => ({ url: `${site.url}/dex/${c.slug}/`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 })),
  ];
}
