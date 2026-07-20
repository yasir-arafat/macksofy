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

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  // Stable lastmod baseline for pages without their own `updated` date.
  // Using this instead of `now` stops every deploy from re-stamping ~190
  // stable URLs with the build date (which makes <lastmod> meaningless to
  // Google). Per-item `updated` overrides it when a page actually changes.
  const CONTENT_REV = new Date(SITE.contentRevision);
  const rev = (updated?: string): Date =>
    updated ? new Date(updated) : CONTENT_REV;

  // hreflang: every URL serves both en-IN and en-AE — declaring both
  // (with x-default) tells Google the same content is targeted at both
  // markets, avoiding duplicate-content penalties without per-locale URLs.
  const altLanguages = (path: string): Record<string, string> => ({
    "x-default": `${base}${path}`,
    "en-IN": `${base}${path}`,
    "en-AE": `${base}${path}`,
  });

  // Post lastmod = the post's own date (clamping any future-dated drafts to
  // now). Revised 2026-05-31: previously this returned max(postDate, now),
  // bumping every post's lastmod to build time on each deploy. That was a
  // launch-window hack to fight the new-domain "Discovered – not indexed"
  // backlog; now that the domain is cut over and indexing, a truthful
  // per-post date is the stronger signal (Google distrusts a sitemap where
  // every URL changes on every deploy). Use a post's `updated` field to
  // signal a genuine revision.
  const freshenBlog = (postDate: Date): Date =>
    postDate > now ? now : postDate;

  const stat = (
    path: string,
    priority: number,
    freq: "daily" | "weekly" | "monthly",
    lastModified: Date = CONTENT_REV,
    images?: string[]
  ): MetadataRoute.Sitemap[number] => {
    // Normalise the homepage to the no-trailing-slash form so the sitemap URL
    // matches the page's own rel=canonical (SITE.url, no slash). Otherwise the
    // sitemap advertises `${base}/` while the page canonicalises to `${base}`,
    // a (minor) self-inconsistency that asks Google to reconcile two URLs.
    const p = path === "/" ? "" : path;
    const entry: MetadataRoute.Sitemap[number] = {
      url: `${base}${p}`,
      lastModified,
      changeFrequency: freq,
      priority,
      alternates: { languages: altLanguages(p) },
    };
    if (images && images.length > 0) entry.images = images;
    return entry;
  };

  // Most recent post date (used as lastModified for /blog index pages)
  const latestPostDate = POSTS.reduce<Date>((latest, p) => {
    const d = new Date(p.date);
    return d > latest ? d : latest;
  }, new Date(0));

  // Paginated blog archives (/blog/page/N) are deliberately EXCLUDED from the
  // sitemap (2026-06-15). On the crawl-budget-starved young domain they are
  // low-value list pages that dilute Googlebot's attention away from real
  // content. They remain fully crawlable via the /blog pagination UI, so post
  // discovery is unaffected — this only removes them from sitemap promotion.

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
    stat("/best-cybersecurity-company", 0.9, "weekly"),
    stat("/blog", 0.85, "daily", freshenBlog(latestPostDate)),
    stat("/clients", 0.7, "monthly"),
    stat("/awards", 0.7, "monthly", CONTENT_REV, awardImages),
    stat("/press", 0.7, "monthly"),
    stat("/glossary", 0.8, "monthly"),
    // /team + expert profiles enter the sitemap only once real named experts
    // exist (getPersonAuthors() is empty until then) — no thin placeholder URLs.
    ...(getPersonAuthors().length > 0
      ? [
          stat("/team", 0.7, "monthly"),
          ...getPersonAuthors().map((p) =>
            stat(`/team/${p.slug}`, 0.6, "monthly")
          ),
        ]
      : []),
    stat("/products/pentaudit", 0.9, "weekly"),
    stat("/products/learn-to-exploit", 0.85, "monthly"),
    stat("/privacy", 0.4, "monthly"),
    stat("/case-studies", 0.9, "weekly"),
    ...CASE_STUDIES.map((c) =>
      stat(`/case-studies/${c.slug}`, 0.85, "weekly", rev(c.updated))
    ),
    stat("/resources", 0.9, "daily"),
    ...RESOURCES.map((r) =>
      stat(`/resources/${r.slug}`, 0.8, "weekly", rev(r.updated))
    ),
    stat("/industries", 0.9, "weekly"),
    ...INDUSTRIES.map((i) =>
      stat(`/industries/${i.slug}`, 0.85, "weekly", rev(i.updated))
    ),
    stat("/locations", 0.85, "weekly"),
    ...CITIES.map((c) =>
      stat(`/locations/${c.slug}`, c.primary ? 0.95 : 0.9, "weekly")
    ),
    // All combos ship in the sitemap. (Wave-gating was retired — see
    // SITEMAP_COMBO_PAIRS in content/combos.ts, which now maps every combo;
    // RELEASED_THROUGH_WAVE / COMBO_WAVES were removed.)
    ...SITEMAP_COMBO_PAIRS.map((p) =>
      stat(`/locations/${p.city}/${p.service}`, 0.7, "monthly", rev(p.updated))
    ),
    ...SERVICES.map((s) =>
      stat(`/services/${s.slug}`, 0.9, "weekly", rev(s.updated))
    ),
    ...COURSES.map((c) =>
      stat(`/training/${c.slug}`, 0.85, "weekly", rev(c.updated), [
        `${base}${c.image}`,
      ])
    ),
    ...AUDITS.map((a) =>
      stat(`/audit/${a.slug}`, a.authority ? 0.95 : 0.9, "weekly", rev(a.updated))
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
