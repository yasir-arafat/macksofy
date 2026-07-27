import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
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
import { SITE } from "@/lib/site";

// Meta (Facebook) Pixel — installed site-wide in <head> via beforeInteractive,
// per Meta's standard "paste in the header of your website" instruction.
// PageView fires on every page; the `Lead` conversion fires on the /lp
// thank-you page (see components/lp/ConversionPing.tsx). ID is env-overridable.
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "657263208736543";

// Space Grotesk — single techy/grotesk family for body + headings (the
// site's "hacker-adjacent" type voice). Variable font (axis 300–700), so no
// weight array is needed; Tailwind's font-black (900) clamps to its 700 max,
// which is Space Grotesk's intended bold and renders cleanly (no faux-bold).
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  // next/font already emits a metric-adjusted fallback (adjustFontFallback is
  // on by default), so the swap from fallback → Space Grotesk causes no reflow.
  // Declaring the fallback stack explicitly makes that guarantee robust even if
  // the adjusted @font-face fails to load.
  fallback: ["system-ui", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
});

// JetBrains Mono drives both the code/labels AND (now) the headings for a
// terminal look — so load the full variable axis (100–800) instead of three
// static weights. Tailwind font-black (900) clamps to its 800 max cleanly.
const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.positioning}`,
    template: `%s | ${SITE.shortName}`,
  },
  icons: {
  icon: "/favicon.ico",
},
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  generator: "Next.js",
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
