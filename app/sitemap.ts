import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { COURSES } from "@/content/courses";
import { SERVICES } from "@/content/services";
import { AUDITS } from "@/content/audits";
import { POSTS, POSTS_PER_PAGE } from "@/content/blog";
import { CITIES } from "@/content/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const stat = (
    path: string,
    priority: number,
    freq: "weekly" | "monthly",
    lastModified: Date = now
  ): MetadataRoute.Sitemap[number] => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: freq,
    priority,
  });

  const totalBlogPages = Math.max(
    1,
    Math.ceil(POSTS.length / POSTS_PER_PAGE)
  );

  // Most recent post date (used as lastModified for /blog index pages)
  const latestPostDate = POSTS.reduce<Date>((latest, p) => {
    const d = new Date(p.date);
    return d > latest ? d : latest;
  }, new Date(0));

  const blogPagedRoutes = Array.from(
    { length: totalBlogPages - 1 },
    (_, i) => stat(`/blog/page/${i + 2}`, 0.6, "weekly", latestPostDate)
  );

  return [
    stat("/", 1.0, "weekly"),
    stat("/services", 0.95, "weekly"),
    stat("/audit", 0.95, "weekly"),
    stat("/training", 0.9, "weekly"),
    stat("/training/offsec", 0.95, "weekly"),
    stat("/contact", 0.8, "monthly"),
    stat("/about", 0.7, "monthly"),
    stat("/blog", 0.85, "weekly", latestPostDate),
    ...blogPagedRoutes,
    stat("/clients", 0.7, "monthly"),
    stat("/awards", 0.7, "monthly"),
    stat("/locations", 0.85, "monthly"),
    ...CITIES.map((c) => stat(`/locations/${c.slug}`, c.primary ? 0.95 : 0.9, "monthly")),
    ...SERVICES.map((s) => stat(`/services/${s.slug}`, 0.9, "monthly")),
    ...COURSES.map((c) => stat(`/training/${c.slug}`, 0.85, "monthly")),
    ...AUDITS.map((a) =>
      stat(`/audit/${a.slug}`, a.authority ? 0.95 : 0.9, "monthly")
    ),
    ...POSTS.map((p) =>
      stat(`/blog/${p.slug}`, 0.75, "monthly", new Date(p.updated ?? p.date))
    ),
  ];
}
