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
import { INDUSTRIES } from "@/content/industries";

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

  // For posts: take the most recent of (post date, build/deploy date).
  // Honest because every metadata-layer deploy (title clamp, schema
  // updates, etc.) materially changes what Googlebot sees on the page —
  // we're not gaming, we're signalling truthfully that the rendered
  // page changed. Without this, stale post-dates on a 2-day-old domain
  // cutover tell Google "low urgency" and contribute to the
  // "Discovered – not indexed" backlog.
  const freshenBlog = (postDate: Date): Date =>
    postDate > now ? postDate : now;

  const stat = (
    path: string,
    priority: number,
    freq: "daily" | "weekly" | "monthly",
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

  // changeFrequency policy (revised 2026-05-26 to address GSC
  // "Discovered – currently not indexed" backlog on the 2-day-old domain):
  //
  //   daily   → live-updating index pages (homepage, blog index, /resources)
  //   weekly  → high-value canonical pages we actually iterate on
  //             (services / audits / training / industries / case studies)
  //   monthly → genuinely stable pages (privacy, products, awards listing,
  //             location × service templated combos)
  //
  // The previous all-monthly policy on a freshly-launched site told
  // Google there was no urgency to crawl, contributing to the
  // discovery-not-crawled backlog.
  return [
    stat("/", 1.0, "daily", now, [`${base}/og-default.png`]),
    stat("/services", 0.95, "weekly"),
    stat("/audit", 0.95, "weekly"),
    stat("/training", 0.9, "weekly"),
    stat("/training/offsec", 0.95, "weekly"),
    stat("/contact", 0.8, "monthly"),
    stat("/about", 0.7, "monthly"),
    stat("/blog", 0.85, "daily", freshenBlog(latestPostDate)),
    ...blogPagedRoutes,
    stat("/clients", 0.7, "monthly"),
    stat("/awards", 0.7, "monthly", now, awardImages),
    stat("/press", 0.7, "monthly"),
    stat("/products/pentaudit", 0.9, "weekly"),
    stat("/products/learn-to-exploit", 0.85, "monthly"),
    stat("/privacy", 0.4, "monthly"),
    stat("/case-studies", 0.9, "weekly"),
    ...CASE_STUDIES.map((c) => stat(`/case-studies/${c.slug}`, 0.85, "weekly")),
    stat("/resources", 0.9, "daily"),
    ...RESOURCES.map((r) => stat(`/resources/${r.slug}`, 0.8, "weekly")),
    stat("/industries", 0.9, "weekly"),
    ...INDUSTRIES.map((i) => stat(`/industries/${i.slug}`, 0.85, "weekly")),
    stat("/locations", 0.85, "weekly"),
    ...CITIES.map((c) =>
      stat(`/locations/${c.slug}`, c.primary ? 0.95 : 0.9, "weekly")
    ),
    // Combos kept at monthly + lower priority so Google focuses crawl
    // budget on canonical /services + /audit pages first. They'll get
    // indexed as the canonical pages establish authority.
    ...COMBO_PAIRS.map((p) =>
      stat(`/locations/${p.city}/${p.service}`, 0.7, "monthly")
    ),
    ...SERVICES.map((s) => stat(`/services/${s.slug}`, 0.9, "weekly")),
    ...COURSES.map((c) =>
      stat(`/training/${c.slug}`, 0.85, "weekly", now, [
        `${base}${c.image}`,
      ])
    ),
    ...AUDITS.map((a) =>
      stat(`/audit/${a.slug}`, a.authority ? 0.95 : 0.9, "weekly")
    ),
    ...POSTS.map((p) =>
      stat(
        `/blog/${p.slug}`,
        0.75,
        "weekly",
        freshenBlog(new Date(p.updated ?? p.date))
      )
    ),
  ];
}
