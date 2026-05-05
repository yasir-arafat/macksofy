import type { Metadata } from "next";
import { SITE } from "./site";

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
}: BuildMetadataInput): Metadata {
  const includesBrand = title.includes(SITE.shortName);
  const url = abs(path);
  const ogImage = image ? abs(image) : abs(SITE.ogImage);

  return {
    title: includesBrand ? { absolute: title } : title,
    description,
    keywords: keywords?.join(", "),
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: url,
      languages: { "en-IN": url, "x-default": url },
    },
    openGraph: {
      type,
      title,
      description,
      url,
      siteName: SITE.name,
      locale: "en_IN",
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
