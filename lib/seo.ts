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

interface BuildMetadataInput {
  title: string;
  description: string;
  path: string;
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
}

function abs(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
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
}: BuildMetadataInput): Metadata {
  const includesBrand = title.includes(SITE.shortName);
  const url = abs(path);
  const ogImage = image ? abs(image) : abs(SITE.ogImage);

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
