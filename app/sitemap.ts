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

  // Keep sitemap signals factual: canonical URLs, truthful last-modified
  // dates, and selected image references. Search engines do not need
  // priority/change-frequency hints, and hreflang is omitted until distinct
  // locale URLs exist.
  return [
    stat("/", CONTENT_REV, [`${base}/og-default.png`]),
    stat("/services"),
    stat("/audit"),
    stat("/training"),
    stat("/training/offsec"),
    stat("/contact"),
    stat("/about"),
    stat("/best-cybersecurity-company", new Date("2026-09-30")),
    stat("/ceh-v13-training"),
    stat("/blog", freshenBlog(latestPostDate)),
    ...TOPIC_HUBS.map((hub) =>
      stat(`/blog/category/${hub.slug}`, rev(hub.updated))
    ),
    stat("/clients"),
    stat("/awards", CONTENT_REV, awardImages),
    stat("/press"),
    stat("/glossary"),
    // /team + expert profiles enter the sitemap only once real named experts
    // exist (getPersonAuthors() is empty until then) — no thin placeholder URLs.
    ...(getPersonAuthors().length > 0
      ? [
          stat("/team"),
          ...getPersonAuthors().map((p) =>
            stat(`/team/${p.slug}`)
          ),
        ]
      : []),
    stat("/products/pentaudit"),
    stat("/products/learn-to-exploit"),
    stat("/privacy"),
    stat("/case-studies"),
    ...CASE_STUDIES.map((c) =>
      stat(`/case-studies/${c.slug}`, rev(c.updated))
    ),
    stat("/resources"),
    ...RESOURCES.map((r) =>
      stat(`/resources/${r.slug}`, rev(r.updated))
    ),
    stat("/industries"),
    ...INDUSTRIES.map((i) =>
      stat(`/industries/${i.slug}`, rev(i.updated))
    ),
    stat("/locations"),
    ...CITIES.map((c) => stat(`/locations/${c.slug}`)),
    // All combos ship in the sitemap. (Wave-gating was retired — see
    // SITEMAP_COMBO_PAIRS in content/combos.ts, which now maps every combo;
    // RELEASED_THROUGH_WAVE / COMBO_WAVES were removed.)
    ...SITEMAP_COMBO_PAIRS.map((p) =>
      stat(`/locations/${p.city}/${p.service}`, rev(p.updated))
    ),
    ...SERVICES.map((s) =>
      stat(`/services/${s.slug}`, rev(s.updated))
    ),
    ...COURSES.map((c) =>
      stat(`/training/${c.slug}`, rev(c.updated), [
        `${base}${c.image}`,
      ])
    ),
    ...AUDITS.map((a) =>
      stat(`/audit/${a.slug}`, rev(a.updated))
    ),
    ...POSTS.map((p) =>
      stat(
        `/blog/${p.slug}`,
        freshenBlog(new Date(p.updated ?? p.date))
      )
    ),
  ];
}
