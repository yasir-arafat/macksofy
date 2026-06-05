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
  noIndex?: boolean;
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
}

/**
 * Build the dynamic OG image URL for a page. Always returns an absolute
 * URL — `metadata.openGraph.images[*].url` must be absolute or social
 * scrapers fail to fetch it.
 */
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
const TITLE_LIMIT_CORE = TITLE_LIMIT_TOTAL - BRAND_SUFFIX.length;
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
export function clampTitle(input: string): string {
  let t = input.trim();
  if (t.endsWith(BRAND_SUFFIX)) t = t.slice(0, -BRAND_SUFFIX.length).trim();
  if (t.length <= TITLE_LIMIT_CORE) return t;
  while (true) {
    const m = t.match(/^(.+?)\s[|·]\s[^|·]+$/);
    if (!m) break;
    const shorter = m[1].trim();
    if (shorter.length <= TITLE_LIMIT_CORE) return trimTrailingFluff(shorter);
    if (shorter === t) break;
    t = shorter;
  }
  const cut = t.lastIndexOf(" ", TITLE_LIMIT_CORE - 1);
  const head = cut > 20 ? t.slice(0, cut) : t.slice(0, TITLE_LIMIT_CORE - 1);
  return trimTrailingFluff(head);
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
}: BuildMetadataInput): Metadata {
  // SERP-budget clamps: any seoTitle / seoDescription that drifted long
  // gets trimmed here so the layout template's " | Macksofy" suffix
  // doesn't push the rendered title past Google's truncation threshold.
  // Per-page strings stay long for human authors; SERPs see the clamp.
  title = clampTitle(title);
  description = clampDesc(description);
  const includesBrand = title.includes(SITE.shortName);
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
      ? { index: false, follow: false }
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
