import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { COURSES } from "@/content/courses";
import { SERVICES } from "@/content/services";
import { AUDITS } from "@/content/audits";
import { POSTS } from "@/content/blog";
import { CITIES } from "@/content/cities";
import { CASE_STUDIES } from "@/content/caseStudies";
import { RESOURCES } from "@/content/resources";
import { SITEMAP_COMBO_PAIRS } from "@/content/combos";
import { AWARDS } from "@/content/awards";
import { INDUSTRIES } from "@/content/industries";
import { getPersonAuthors } from "@/content/authors";
import { TOPIC_HUBS } from "@/content/topicHubs";

// Per-content-type fallback dates, sourced from the last git commit that
// touched each content file. Used only when an individual entry has no
// `updated` field of its own.
const FALLBACK = {
  services: new Date("2026-11-13"),
  audits: new Date("2026-11-13"),
  courses: new Date("2026-11-13"),
  resources: new Date("2026-10-16"),
  caseStudies: new Date("2026-09-18"),
  cities: new Date("2026-08-07"),
  industries: new Date("2026-08-09"),
  combos: new Date("2026-11-10"),
  topicHubs: new Date("2026-11-08"),
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  // Use the entry's own `updated` date when available; otherwise fall back
  // to the content-type date above. Every URL now emits <lastmod>.
  const rev = (updated: string | undefined, fallback: Date): Date =>
    updated ? new Date(updated) : fallback;

  const freshenBlog = (postDate: Date): Date =>
    postDate > now ? now : postDate;

  const stat = (
    path: string,
    lastModified: Date,
    images?: string[]
  ): MetadataRoute.Sitemap[number] => {
    const p = path === "/" ? "" : path;
    const entry: MetadataRoute.Sitemap[number] = {
      url: `${base}${p}`,
      lastModified,
    };
    if (images && images.length > 0) entry.images = images;
    return entry;
  };

  const latestPostDate = POSTS.reduce<Date>((latest, p) => {
    const d = new Date(p.date);
    return d > latest ? d : latest;
  }, new Date(0));

  const awardImages = AWARDS.map((a) => `${base}${a.image}`);

  return [
    stat("/", freshenBlog(latestPostDate), [`${base}/og-default.png`]),
    stat("/services", new Date("2026-08-09")),
    stat("/audit", new Date("2026-09-28")),
    stat("/training", new Date("2026-11-11")),
    stat("/training/offsec", new Date("2026-11-10")),
    stat("/contact", new Date("2026-11-05")),
    stat("/about", new Date("2026-11-08")),
    stat("/best-cybersecurity-company", new Date("2026-09-30")),
    stat("/blog", freshenBlog(latestPostDate)),
    ...TOPIC_HUBS.map((hub) =>
      stat(`/blog/category/${hub.slug}`, rev(hub.updated, FALLBACK.topicHubs))
    ),
    stat("/clients", new Date("2026-08-07")),
    stat("/awards", new Date("2026-08-07"), awardImages),
    stat("/press", new Date("2026-08-07")),
    stat("/glossary", new Date("2026-10-16")),
    ...(getPersonAuthors().length > 0
      ? [
          stat("/team", new Date("2026-08-07")),
          ...getPersonAuthors().map((p) =>
            stat(`/team/${p.slug}`, new Date("2026-08-07"))
          ),
        ]
      : []),
    stat("/products/pentaudit", new Date("2026-09-28")),
    stat("/products/learn-to-exploit", new Date("2026-11-10")),
    stat("/privacy", new Date("2026-08-07")),
    stat("/case-studies", new Date("2026-08-09")),
    ...CASE_STUDIES.map((c) =>
      stat(`/case-studies/${c.slug}`, rev(c.updated, FALLBACK.caseStudies))
    ),
    stat("/resources", new Date("2026-08-09")),
    ...RESOURCES.map((r) =>
      stat(`/resources/${r.slug}`, rev(r.updated, FALLBACK.resources))
    ),
    stat("/industries", new Date("2026-08-09")),
    ...INDUSTRIES.map((i) =>
      stat(`/industries/${i.slug}`, rev(i.updated, FALLBACK.industries))
    ),
    stat("/locations", new Date("2026-08-09")),
    ...CITIES.map((c) =>
      stat(`/locations/${c.slug}`, FALLBACK.cities)
    ),
    ...SITEMAP_COMBO_PAIRS.map((p) =>
      stat(`/locations/${p.city}/${p.service}`, rev(p.updated, FALLBACK.combos))
    ),
    ...SERVICES.map((s) =>
      stat(`/services/${s.slug}`, rev(s.updated, FALLBACK.services))
    ),
    ...COURSES.map((c) =>
      stat(`/training/${c.slug}`, rev(c.updated, FALLBACK.courses), [
        `${base}${c.image}`,
      ])
    ),
    ...AUDITS.map((a) =>
      stat(`/audit/${a.slug}`, rev(a.updated, FALLBACK.audits))
    ),
    ...POSTS.map((p) =>
      stat(
        `/blog/${p.slug}`,
        freshenBlog(new Date(p.updated ?? p.date))
      )
    ),
  ];
}
