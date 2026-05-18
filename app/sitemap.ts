import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { COURSES } from "@/content/courses";
import { SERVICES } from "@/content/services";
import { AUDITS } from "@/content/audits";
import { POSTS, POSTS_PER_PAGE } from "@/content/blog";
import { CITIES } from "@/content/cities";
import { CASE_STUDIES } from "@/content/caseStudies";
import { RESOURCES } from "@/content/resources";
import { COMBO_PAIRS } from "@/content/combos";
import { AWARDS } from "@/content/awards";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  // hreflang: every URL serves both en-IN and en-AE — declaring both
  // (with x-default) tells Google the same content is targeted at both
  // markets, avoiding duplicate-content penalties without per-locale URLs.
  const altLanguages = (path: string): Record<string, string> => ({
    "x-default": `${base}${path}`,
    en: `${base}${path}`,
    "en-IN": `${base}${path}`,
    "en-AE": `${base}${path}`,
  });

  const stat = (
    path: string,
    priority: number,
    freq: "weekly" | "monthly",
    lastModified: Date = now,
    images?: string[]
  ): MetadataRoute.Sitemap[number] => {
    const entry: MetadataRoute.Sitemap[number] = {
      url: `${base}${path}`,
      lastModified,
      changeFrequency: freq,
      priority,
      alternates: { languages: altLanguages(path) },
    };
    if (images && images.length > 0) entry.images = images;
    return entry;
  };

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

  const awardImages = AWARDS.map((a) => `${base}${a.image}`);

  return [
    stat("/", 1.0, "weekly", now, [`${base}/og-default.png`]),
    stat("/services", 0.95, "weekly"),
    stat("/audit", 0.95, "weekly"),
    stat("/training", 0.9, "weekly"),
    stat("/training/offsec", 0.95, "weekly"),
    stat("/contact", 0.8, "monthly"),
    stat("/about", 0.7, "monthly"),
    stat("/blog", 0.85, "weekly", latestPostDate),
    ...blogPagedRoutes,
    stat("/clients", 0.7, "monthly"),
    stat("/awards", 0.7, "monthly", now, awardImages),
    stat("/press", 0.7, "monthly"),
    stat("/products/pentaudit", 0.9, "monthly"),
    stat("/products/learn-to-exploit", 0.85, "monthly"),
    stat("/privacy", 0.4, "monthly"),
    stat("/case-studies", 0.9, "monthly"),
    ...CASE_STUDIES.map((c) => stat(`/case-studies/${c.slug}`, 0.85, "monthly")),
    stat("/resources", 0.9, "monthly"),
    ...RESOURCES.map((r) => stat(`/resources/${r.slug}`, 0.8, "monthly")),
    stat("/locations", 0.85, "monthly"),
    ...CITIES.map((c) =>
      stat(`/locations/${c.slug}`, c.primary ? 0.95 : 0.9, "monthly")
    ),
    ...COMBO_PAIRS.map((p) =>
      stat(`/locations/${p.city}/${p.service}`, 0.85, "monthly")
    ),
    ...SERVICES.map((s) => stat(`/services/${s.slug}`, 0.9, "monthly")),
    ...COURSES.map((c) =>
      stat(`/training/${c.slug}`, 0.85, "monthly", now, [
        `${base}${c.image}`,
      ])
    ),
    ...AUDITS.map((a) =>
      stat(`/audit/${a.slug}`, a.authority ? 0.95 : 0.9, "monthly")
    ),
    ...POSTS.map((p) =>
      stat(
        `/blog/${p.slug}`,
        0.75,
        "monthly",
        new Date(p.updated ?? p.date)
      )
    ),
  ];
}
