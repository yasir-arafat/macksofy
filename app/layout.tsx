import type { Metadata, Viewport } from "next";
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Shell } from "@/components/layout/Shell";
import { LazyClientWidgets } from "@/components/widgets/LazyClientWidgets";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
} from "@/lib/schema";
import { SITE } from "@/lib/site";

// Meta (Facebook) Pixel — installed site-wide in <head> via beforeInteractive,
// per Meta's standard "paste in the header of your website" instruction.
// PageView fires on every page; the `Lead` conversion fires on the /lp
// thank-you page (see components/lp/ConversionPing.tsx). ID is env-overridable.
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "657263208736543";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "900"],
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
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
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${poppins.variable} ${mono.variable} h-full antialiased scroll-smooth`}
    >
      {/* Meta Pixel base code — placed in the literal <head>, site-wide,
          per Meta's "paste in the header of your website" instruction. */}
      {META_PIXEL_ID && (
        <head>
          <script
            id="meta-pixel"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`,
            }}
          />
        </head>
      )}
      <body className="min-h-full flex flex-col bg-bg text-fg">
        {/* React 19 hoists these to <head>. */}

        {META_PIXEL_ID && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        )}

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
          header={<Header />}
          footer={<Footer />}
          widgets={<LazyClientWidgets />}
        >
          {children}
        </Shell>
      </body>
    </html>
  );
}
