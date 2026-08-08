import type { Metadata } from "next";
import { SITE } from "./site";

/**
 * Geo-meta block for a page. Pass per-city / per-country values from
 * location-aware routes. Pass `null` to opt out of geo meta entirely
 * (use this on non-location pages so Mumbai doesn't get pinned to the
 * UAE page, the OSCP course page, etc.).
 */
export interface PageGeo {
  /** ISO 3166-2 region code, e.g. "IN-MH", "IN-KA", "AE-DU". */
  region: string;
  placename: string;
  lat: number;
  lng: number;
}

/**
 * Content kind drives the accent colour + chip on the dynamic OG image.
 * Keep keys aligned with `app/api/og/route.tsx`'s accentByKind map.
 */
export type OgKind =
  | "service"
  | "audit"
  | "training"
  | "course"
  | "blog"
  | "city"
  | "product"
  | "case"
  | "industry"
  | "macksofy";

interface BuildMetadataInput {
  title: string;
  description: string;
  path: string;
  /**
   * Explicit OG image override. If omitted, a dynamic OG image is built
   * from `ogTitle ?? title` + `ogEyebrow` + `ogKind` via /api/og.
   */
  image?: string;
  keywords?: string[];
  /**
   * `true` emits `noindex, nofollow`. `"follow"` emits `noindex, follow` — for
   * pages that must stay out of the index while still passing link equity on,
   * which is the correct setting for paid-ad landing pages.
   */
  noIndex?: boolean | "follow";
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  /**
   * Geo signals for this page. Default: undefined → no geo meta is emitted.
   * Pass an object to scope this page to a city/country; pass null also = no geo.
   */
  geo?: PageGeo | null;
  /** Open Graph locale override. Default: "en_IN". UAE pages should use "en_AE". */
  locale?: string;
  /** OG image: short title rendered as the big bottom-left line. */
  ogTitle?: string;
  /** OG image: small uppercase eyebrow above the title. */
  ogEyebrow?: string;
  /** OG image: kind chip + accent colour. */
  ogKind?: OgKind;
  /**
   * Emit `title` as an absolute <title> — the layout template does NOT append
   * " | Macksofy", so the whole 60-char SERP budget goes to the title itself.
   *
   * Reserving 11 of 60 chars for the brand is the right trade on pages people
   * reach *because* of the brand. It is the wrong trade on informational pages
   * that rank for keyword queries: the 49-char core budget forces clampTitle's
   * word-boundary fallback to truncate from the right, and English puts the
   * differentiator last — so the year, "Top 10", "vs CRTO" are exactly what
   * gets deleted. Measured 2026-08-07: 44 blog posts (8,192 GSC impressions /
   * 28d) were shipping SERP titles missing the token their own ranking queries
   * contained. Opt in per page by supplying a hand-written, already-short title.
   */
  absoluteTitle?: boolean;
}

/**
 * Build the dynamic OG image URL for a page. Always returns an absolute
 * URL — `metadata.openGraph.images[*].url` must be absolute or social
 * scrapers fail to fetch it.
 */
// Cache-bust token for the /api/og generator. The generated PNGs are served
// `immutable` for a year (good for perf), so editing the generator would
// otherwise serve stale images forever from browser + CDN caches. BUMP THIS
// whenever the /api/og visual design changes — it changes every image URL and
// forces a fresh fetch everywhere.
const OG_VERSION = "3";

function ogQuery(args: {
  title: string;
  eyebrow: string;
  kind: OgKind;
  topic?: string;
  variant?: "social" | "card";
}): string {
  const params = new URLSearchParams({
    title: args.title,
    eyebrow: args.eyebrow,
    kind: args.kind,
  });
  if (args.topic) params.set("topic", args.topic);
  if (args.variant === "card") params.set("variant", "card");
  params.set("v", OG_VERSION);
  return params.toString();
}

/**
 * Absolute /api/og URL — for OG/Twitter meta tags (must be absolute). Defaults
 * to the "social" variant (title baked in) — correct for share previews.
 */
export function dynamicOgImage(args: {
  title: string;
  eyebrow: string;
  kind: OgKind;
  topic?: string;
}): string {
  return `${SITE.url}/api/og?${ogQuery(args)}`;
}

/**
 * Relative /api/og path — for on-page <img> (hero, cards). Same-origin so the
 * current deployment (incl. preview/local) serves its own image rather than
 * pointing at production. Defaults to the "card" variant (no baked-in headline)
 * since the page already renders the title and the image is cropped to fit.
 */
export function dynamicOgImagePath(args: {
  title: string;
  eyebrow: string;
  kind: OgKind;
  topic?: string;
  variant?: "social" | "card";
}): string {
  return `/api/og?${ogQuery({ variant: "card", ...args })}`;
}

function abs(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

// SERP truncation budgets. Google clamps titles around 580px (≈55–60 chars
// in English) and descriptions at 155–160. Per-page seoTitle / seoDescription
// strings drifted long during the P0–P3 content passes; rather than hand-trim
// 274+ violators across 50+ files, clamp at the metadata boundary.
const BRAND_SUFFIX = ` | ${SITE.shortName}`;
const TITLE_LIMIT_TOTAL = 60;
/**
 * Budget for a title the template will append " | Macksofy" to. Exported so
 * callers whose title carries a meaningful trailing clause can tell whether
 * the clamp would eat it and opt into `absoluteTitle` instead — see the
 * city x service combo template.
 */
export const TITLE_LIMIT_CORE = TITLE_LIMIT_TOTAL - BRAND_SUFFIX.length;
const DESC_LIMIT = 158;

const TRAILING_STOPWORDS =
  /\s+(?:in|to|of|on|at|by|for|with|and|or|the|a|an|as|is|are|that|which|how|what|why|when|where|will|vs|via|it|its|your|our|every|any|some|all|this|these|those|should|could|would|do|does|did|has|have|had|be|been|being|than|then|so|while|whether)$/i;
const TRAILING_JUNK = /[\s,;:|·—–\-&·.]+$/;

function trimTrailingFluff(s: string): string {
  let out = s;
  for (let i = 0; i < 5; i++) {
    const before = out;
    out = out.replace(TRAILING_JUNK, "").replace(TRAILING_STOPWORDS, "");
    if (out === before) break;
  }
  return out;
}

/**
 * Clamp a page's seoTitle so the rendered <title>, after the layout
 * template appends " | Macksofy", stays under ~60 chars. Strategy:
 *   1. Strip a trailing " | Macksofy" suffix (template re-adds it).
 *   2. If the core fits, return it.
 *   3. Iteratively drop trailing " | xxx" or " · xxx" segments.
 *   4. Fall back to word-boundary truncation with stopword/junk trim.
 * Output is the *core* title (no brand). Caller / template still appends
 * the brand suffix.
 */
export function clampTitle(input: string, opts?: { absolute?: boolean }): string {
  let t = input.trim();
  if (t.endsWith(BRAND_SUFFIX)) t = t.slice(0, -BRAND_SUFFIX.length).trim();
  // If the title already contains the brand name — or the caller declared it
  // absolute — buildMetadata emits it as an absolute <title> and the template
  // does NOT append " | Macksofy". Such titles therefore get the full 60-char
  // budget instead of reserving ~11 chars for a suffix that never lands (which
  // was silently dropping tail keywords like "in Mumbai · Pan-India · UAE"
  // from the homepage title).
  const limit =
    opts?.absolute || t.includes(SITE.shortName)
      ? TITLE_LIMIT_TOTAL
      : TITLE_LIMIT_CORE;
  if (t.length <= limit) return t;
  while (true) {
    const m = t.match(/^(.+?)\s[|·]\s[^|·]+$/);
    if (!m) break;
    const shorter = m[1].trim();
    if (shorter.length <= limit) return trimTrailingFluff(shorter);
    if (shorter === t) break;
    t = shorter;
  }
  const cut = t.lastIndexOf(" ", limit - 1);
  const head = cut > 20 ? t.slice(0, cut) : t.slice(0, limit - 1);
  return trimTrailingFluff(head);
}

/**
 * True when the author's title carries the brand itself, rather than spelling
 * out the template's " | Macksofy" suffix.
 *
 * This has to be decided from the ORIGINAL title, not the clamped one. A title
 * like "OT/IT Segmentation Whitepaper — Indian Manufacturers · Macksofy" (63) is
 * self-branded, but clampTitle drops the "· Macksofy" segment to reach the
 * budget — so testing the clamped output concludes "no brand", the template
 * appends one, and the result lands back at 63. Deciding first keeps it at 52.
 *
 * The trailing-suffix case is the opposite and must stay that way: a title
 * ending in " | Macksofy" is the author writing out the template's own suffix,
 * so it is stripped here and re-added by the template.
 */
export function isSelfBrandedTitle(input: string): boolean {
  let t = input.trim();
  if (t.endsWith(BRAND_SUFFIX)) t = t.slice(0, -BRAND_SUFFIX.length).trim();
  return t.includes(SITE.shortName);
}

/**
 * Clamp a page's seoDescription to ~158 chars, preferring a clean
 * sentence boundary. Falls back to word boundary + ellipsis.
 */
export function clampDesc(input: string): string {
  const d = input.trim();
  if (d.length <= DESC_LIMIT) return d;
  const slice = d.slice(0, DESC_LIMIT + 1);
  const lastSentence = Math.max(
    slice.lastIndexOf(". "),
    slice.lastIndexOf("! "),
    slice.lastIndexOf("? "),
    slice.lastIndexOf(".\n"),
  );
  if (lastSentence > DESC_LIMIT * 0.6) return d.slice(0, lastSentence + 1);
  const lastSpace = slice.lastIndexOf(" ");
  if (lastSpace > DESC_LIMIT * 0.6) return d.slice(0, lastSpace) + "…";
  return d.slice(0, DESC_LIMIT - 1) + "…";
}

export function buildMetadata({
  title,
  description,
  path,
  image,
  keywords,
  noIndex,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  geo,
  locale = "en_IN",
  ogTitle,
  ogEyebrow,
  ogKind,
  absoluteTitle,
}: BuildMetadataInput): Metadata {
  // SERP-budget clamps: any seoTitle / seoDescription that drifted long
  // gets trimmed here so the layout template's " | Macksofy" suffix
  // doesn't push the rendered title past Google's truncation threshold.
  // Per-page strings stay long for human authors; SERPs see the clamp.
  // Decided BEFORE the clamp — see isSelfBrandedTitle for why the order matters.
  const includesBrand = Boolean(absoluteTitle) || isSelfBrandedTitle(title);
  title = clampTitle(title, { absolute: absoluteTitle });
  description = clampDesc(description);
  const url = abs(path);
  // Dynamic OG image is the default: every page gets a brand-consistent
  // 1200x630 generated via /api/og. Pages can opt out by passing an
  // explicit `image`. Pages can fine-tune the rendering by passing
  // ogTitle / ogEyebrow / ogKind. If none of those are supplied we
  // derive sane defaults from the metadata title.
  const ogImage = image
    ? abs(image)
    : ogKind
    ? dynamicOgImage({
        title: ogTitle ?? title,
        eyebrow: ogEyebrow ?? type.toUpperCase(),
        kind: ogKind,
      })
    : abs(SITE.ogImage);

  // Geo meta is opt-in per page. Pages that pass nothing emit no geo
  // signals — better than pinning Mumbai globally and confusing
  // local-pack relevance on UAE / Bengaluru / etc.
  const geoMeta: Record<string, string> =
    geo == null
      ? {}
      : {
          "geo.region": geo.region,
          "geo.placename": geo.placename,
          "geo.position": `${geo.lat};${geo.lng}`,
          ICBM: `${geo.lat}, ${geo.lng}`,
        };

  return {
    title: includesBrand ? { absolute: title } : title,
    description,
    keywords: keywords?.join(", "),
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: url,
      // hreflang: this URL is intentionally declared as the canonical
      // target for both en-IN and en-AE audiences. Google's docs (and
      // hreflang RFC) explicitly support a single URL serving multiple
      // English-locale regions; the signal helps region-aware ranking
      // in both Indian and UAE SERPs without requiring per-locale URLs.
      // OG locale is set per-page via the `locale` arg (en_AE on UAE
      // pages, en_IN by default).
      languages: { "en-IN": url, "en-AE": url, "x-default": url },
    },
    openGraph: {
      type,
      title,
      description,
      url,
      siteName: SITE.name,
      locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    ...(Object.keys(geoMeta).length > 0 && { other: geoMeta }),
    robots: noIndex
      ? { index: false, follow: noIndex === "follow" }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

/**
 * Convenience: HQ geo for the homepage / about / contact. Other pages
 * should pass their own (city geo from content/cities.ts) or skip.
 */
export const HQ_GEO: PageGeo = {
  region: "IN-MH",
  placename: "Mumbai",
  lat: SITE.geo.lat,
  lng: SITE.geo.lng,
};
