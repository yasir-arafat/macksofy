import type { Metadata, Viewport } from "next";
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyWhatsApp } from "@/components/widgets/StickyWhatsApp";
import { Chatbot } from "@/components/widgets/Chatbot";
import { LeadMagnetPopup } from "@/components/widgets/LeadMagnetPopup";
import { BackToTop } from "@/components/widgets/BackToTop";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
} from "@/lib/schema";
import { SITE } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
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
    languages: { "en-IN": SITE.url, "x-default": SITE.url },
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
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <JsonLd
          data={[organizationSchema(), localBusinessSchema(), websiteSchema()]}
        />
        <Header />
        <main
          className="flex-1"
          style={{ paddingTop: "var(--header-h, 80px)" }}
        >
          {children}
        </main>
        <Footer />
        <StickyWhatsApp />
        <Chatbot />
        <LeadMagnetPopup />
        <BackToTop />
      </body>
    </html>
  );
}
