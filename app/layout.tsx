import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Shell } from "@/components/layout/Shell";
import { LazyClientWidgets } from "@/components/widgets/LazyClientWidgets";
import { JsonLd } from "@/components/seo/JsonLd";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { GoogleTagManager } from "@/components/analytics/GoogleTagManager";
import { ConsentMode } from "@/components/analytics/ConsentMode";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
} from "@/lib/schema";
import { buildNavIndex } from "@/lib/nav-index";
import { clampTitle, clampDesc } from "@/lib/seo";
import { SITE } from "@/lib/site";

// Meta (Facebook) Pixel — installed site-wide in <head> via beforeInteractive,
// per Meta's standard "paste in the header of your website" instruction.
// PageView fires on every page; the `Lead` conversion fires on the /lp
// thank-you page (see components/lp/ConversionPing.tsx). ID is env-overridable.
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "657263208736543";

/**
 * Self-hosted, subsetted webfonts (LCP).
 *
 * These were next/font/google. That emits Google's per-script @font-face split
 * and the browser fetches whichever unicode-ranges the page touches — which
 * meant FOUR files, ~99 KB, on every page load:
 *
 *     JetBrains Mono  latin      40.7 KB   (preloaded)
 *     Space Grotesk   latin      23.6 KB   (preloaded)
 *     JetBrains Mono  latin-ext  19.1 KB
 *     Space Grotesk   latin-ext  15.4 KB
 *
 * A scan of all 296 prerendered pages found exactly one character outside the
 * `latin` range: ₹ (U+20B9), in course prices. That single glyph pulled 34.5 KB
 * of latin-ext — and JetBrains Mono has no rupee glyph at all, so its 19 KB was
 * fetched, searched, and fell back to a system font regardless.
 *
 * scripts/build-font-subsets.py now bakes one file per family covering the same
 * `latin` range plus ₹, with the variable weight axis clipped to the range the
 * site actually renders (nothing below 400 is used anywhere). Result: two files,
 * ~49 KB, no second round-trip.
 *
 * Rendering is unchanged — same glyph coverage, and every character that fell
 * back to a system font before still does.
 *
 * adjustFontFallback is OFF deliberately. The previous next/font/google setup
 * emitted no metric-adjusted fallback face either (verified against the live
 * CSS: nine @font-face rules, none with size-adjust), so leaving it off keeps
 * fallback behaviour — and therefore CLS — byte-identical to what is in the
 * field today. Turning it on generates a `local("Arial")` face with computed
 * size-adjust/ascent/descent overrides, which would likely REDUCE swap reflow,
 * but it changes what the eye sees during the swap (mono labels would flash in
 * proportional Arial) and it cannot be validated on a box without Arial
 * installed. Worth trying as its own change, measured on its own.
 */

// Space Grotesk — body copy. Variable axis clipped to 400–700; Tailwind's
// font-black (900) clamps to the 700 max, which is the family's intended bold.
const spaceGrotesk = localFont({
  src: "./fonts/SpaceGrotesk-subset.woff2",
  variable: "--font-space-grotesk",
  weight: "400 700",
  style: "normal",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["system-ui", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
});

// JetBrains Mono — headings + code/labels. Variable axis clipped to 400–800;
// Tailwind font-black (900) clamps to the 800 max cleanly.
const mono = localFont({
  src: "./fonts/JetBrainsMono-subset.woff2",
  variable: "--font-jetbrains-mono",
  weight: "400 800",
  style: "normal",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  // A layout deliberately does NOT go through buildMetadata — that helper emits
  // a per-page canonical and hreflang, which must never become a site-wide
  // default. But the two strings below are still real SERP output (any page
  // without its own metadata renders them, e.g. the 404), so they get the same
  // budgets every other page is held to. `default` is used verbatim, so it is
  // clamped as an absolute title rather than to the brand-suffix core budget.
  title: {
    default: clampTitle(`${SITE.name} — ${SITE.positioning}`, { absolute: true }),
    template: `%s | ${SITE.shortName}`,
  },
  icons: {
  icon: "/favicon.ico",
},
  description: clampDesc(SITE.description),
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  keywords: [
    "cybersecurity company India",
    "cybersecurity company Mumbai",
    "CERT-In empanelled auditor",
    "VAPT services India",
    "penetration testing Mumbai",
    "OSCP training India",
    "CEH training Mumbai",
    "SOC analyst training India",
    "ISO 27001 consultant India",
    "cybersecurity audit India",
    "cybersecurity UAE",
    "Macksofy",
  ],
  alternates: {
    canonical: SITE.url,
    languages: { "en-IN": SITE.url, "en-AE": SITE.url, "x-default": SITE.url },
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.positioning}`,
    description: SITE.description,
    url: SITE.url,
    locale: "en_IN",
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: {
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
  formatDetection: { telephone: true, address: true, email: true },
  category: "Technology",
  verification: {
    ...(SITE.verification.google ? { google: SITE.verification.google } : {}),
    ...(SITE.verification.yandex ? { yandex: SITE.verification.yandex } : {}),
    ...(SITE.verification.bing
      ? { other: { "msvalidate.01": SITE.verification.bing } }
      : {}),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050510",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Computed here, on the server, so the Header/Footer Client Components never
  // import content/{services,courses,audits}.ts — 575 KB of page content that
  // previously shipped as JavaScript to every route. See lib/nav-index.ts.
  const nav = buildNavIndex();

  return (
    <html
      lang="en-IN"
      className={`${spaceGrotesk.variable} ${mono.variable} h-full antialiased scroll-smooth`}
    >
      {/* Google Consent Mode v2 — sets all non-essential storage to "denied"
          BEFORE any analytics/ads tag loads, so the first hit is consent-aware
          (GDPR/DPDP). Must precede GoogleAnalytics / GoogleTagManager. */}
      <ConsentMode />
      <body className="min-h-full flex flex-col bg-bg text-fg">
        {/* React 19 hoists these to <head>. */}

        {/* Google Tag Manager — site-wide. Fires the Google Ads Conversion tag
            off the `generate_lead` Custom Event pushed by the contact form
            (lib/analytics.ts) and the /lp thank-you page (ConversionPing.tsx).
            Inert until NEXT_PUBLIC_GTM_ID is set. */}
        <GoogleTagManager />

        {/* Google Analytics 4 — site-wide. Loads gtag.js once for the whole
            app (including the nested /lp landing pages) and tracks a pageview
            on every App Router navigation. */}
        <GoogleAnalytics />

        {/* Meta Pixel — consent-gated. Loads ONLY after the visitor grants
            "marketing" consent in the cookie banner (M-04). The old
            unconditional inline pixel + <noscript> beacon were removed: a
            no-JS visitor can't be shown the banner, so can't be tracked. */}
        {META_PIXEL_ID && <MetaPixel pixelId={META_PIXEL_ID} />}

        {/* Preconnect / dns-prefetch for the third-party origins we
            hit in the critical user flow — Turnstile (contact form)
            and Google Maps (contact page office map). Preconnect saves
            ~100-300ms on first interaction by paying DNS+TCP+TLS up
            front. dns-prefetch is cheaper for less-critical origins. */}
        <link rel="preconnect" href="https://challenges.cloudflare.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://challenges.cloudflare.com" />
        <link rel="dns-prefetch" href="https://api.resend.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        {/* googletagmanager is the one third-party that loads on EVERY route,
            yet it was the only one with no resolution hint while narrower
            origins had them. dns-prefetch, deliberately not preconnect: gtag is
            lazyOnload and doesn't request until ~3.9 s, so holding a warm
            socket open from first paint would just contend with the LCP fetch
            for nothing. gtag then pulls a second container script for the Ads
            tag off the same origin — see components/analytics/GoogleAnalytics.tsx. */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Skip-link — visually-hidden but keyboard-focusable. First
            stop on the tab order; lets keyboard / screen-reader users
            jump past nav directly to content. Lighthouse a11y score
            requires this; a11y is a soft ranking factor on mobile. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-bg focus:text-fg focus:ring-2 focus:ring-neon-cyan focus:px-4 focus:py-2 focus:font-semibold"
        >
          Skip to content
        </a>

        {/* RSS auto-discovery. */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE.name} · Cybersecurity Blog`}
          href={`${SITE.url}/feed.xml`}
        />
        <JsonLd
          data={[organizationSchema(), localBusinessSchema(), websiteSchema()]}
        />
        {/* Shell renders the global chrome (Header/Footer/widgets) on every
            page EXCEPT paid-ad landing pages under /lp, which are intentionally
            chrome-free. See components/layout/Shell.tsx. */}
        <Shell
          header={<Header nav={nav} />}
          footer={<Footer nav={nav} />}
          widgets={<LazyClientWidgets />}
        >
          {children}
        </Shell>
      </body>
    </html>
  );
}
