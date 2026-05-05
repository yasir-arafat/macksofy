import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { COURSES } from "@/content/courses";
import { SERVICES } from "@/content/services";
import { AUDITS } from "@/content/audits";
import { POSTS } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();
  const stat = (path: string, priority: number, freq: "weekly" | "monthly") => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  });

  return [
    stat("/", 1.0, "weekly"),
    stat("/about", 0.7, "monthly"),
    stat("/services", 0.9, "weekly"),
    stat("/training", 0.9, "weekly"),
    stat("/audit", 0.95, "weekly"),
    stat("/blog", 0.7, "weekly"),
    stat("/clients", 0.7, "monthly"),
    stat("/awards", 0.7, "monthly"),
    stat("/contact", 0.6, "monthly"),
    ...SERVICES.map((s) => stat(`/services/${s.slug}`, 0.85, "monthly")),
    ...COURSES.map((c) => stat(`/training/${c.slug}`, 0.85, "monthly")),
    ...AUDITS.map((a) => stat(`/audit/${a.slug}`, a.authority ? 0.95 : 0.85, "monthly")),
    ...POSTS.map((p) => stat(`/blog/${p.slug}`, 0.7, "monthly")),
  ];
}
