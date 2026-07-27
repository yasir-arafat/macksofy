import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { PHP_REDIRECTS } from "./lib/legacy-redirects";

const nextConfig: NextConfig = {
  // Next.js image optimization re-enabled. Disabling it ships every
  // image at full resolution with no WebP/AVIF and no responsive
  // srcset — direct LCP + Lighthouse Performance regression. The
  // chunk-mismatch issue this was trying to solve is a CDN cache
  // problem (see Cache-Control section below), not an image problem.
  pageExtensions: ["ts", "tsx", "md", "mdx"],

  images: {
    // Serve AVIF first (≈20-30% smaller than WebP at equal quality), then WebP,
    // then the original as a last resort. Directly shrinks the LCP image byte
    // weight on mobile. Next negotiates per-request via the Accept header, so
    // older browsers still get WebP/original — no compatibility risk.
    formats: ["image/avif", "image/webp"],
    // Every <Image> source on this site is a local /public asset (logos, award
    // badges, client logos, accreditation marks) with no query string, so
    // neither `remotePatterns` nor `localPatterns` is required. Add a
    // remotePatterns entry only if a genuine third-party <Image> host appears.
    //
    // The blog featured card (/api/og) is intentionally NOT an <Image>: Vercel
    // does not run its optimizer over Function-sourced images, so routing it
    // through /_next/image returns the same PNG with weaker caching. Details in
    // app/api/og/route.tsx.
    //
    // If you do add an <Image> whose src carries a query string, Next 16 needs
    // it allowlisted in `localPatterns` — and note `search` there is an EXACT
    // string comparison, not a glob: `search: "**"` builds clean but 400s every
    // request at runtime. Omit `search` entirely to allow any query string.
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // Locked build ID to avoid chunk-hash churn between deploys. Trade-off:
  // hot-fixes that ship under the same "stable-build" id rely on the CDN
  // doing the right cache-bust. If chunk mismatch returns, the real
  // root cause is CDN cache vs origin sync, not the build ID — purge
  // _next/static at CDN edge after each deploy instead of disabling
  // optimization / caching site-wide.
  generateBuildId: async () => "stable-build",

  async redirects() {
    return PHP_REDIRECTS.map((r) => ({ ...r, statusCode: 301 as const }));
  },

  async headers() {
    // Content-Security-Policy — frame-ancestors enforces clickjacking
    // protection. frame-src whitelists Turnstile + Google Maps embeds.
    // connect-src whitelists Turnstile siteverify + Resend + Maps tile fetch.
    //
    // script-src hardening (L-02):
    //   • 'unsafe-eval' is REMOVED — nothing in the app uses eval/new Function,
    //     and framer-motion v12 no longer requires it. This eliminates the
    //     dynamic-code-execution capability outright.
    //   • 'unsafe-inline' is RETAINED, by necessity: Next.js App Router emits
    //     per-page inline RSC bootstrap scripts (self.__next_f.push(...)) that
    //     have no stable hash, so the only way to drop 'unsafe-inline' is a
    //     per-request nonce via proxy — which forces every route into
    //     DYNAMIC rendering and destroys the static prerender + s-maxage edge
    //     cache this site depends on for crawl-health/SEO. The residual risk is
    //     low and bounded: there is NO HTML-injection sink (the only
    //     dangerouslySetInnerHTML is JSON-LD with <-escaping), and object-src
    //     'none' + base-uri 'self' + frame-ancestors 'self' + form-action 'self'
    //     block the usual escalation paths.
    //   • EXIT CRITERIA to remove 'unsafe-inline': adopt nonce-based CSP only if
    //     the site moves to dynamic/SSR rendering (accepting the caching cost).
    //
    // Analytics origins: gtag.js / GTM load from www.googletagmanager.com and
    // beacon to *.google-analytics.com (regional collect endpoints) and
    // *.analytics.google.com (Google Signals). The Meta Pixel loads from
    // connect.facebook.net and beacons to www.facebook.com. The /lp paid pages
    // also fire Google Ads conversions via googleadservices.com / doubleclick.
    // Without these, the browser silently blocks every analytics hit — which is
    // exactly what left GA4 Realtime empty.
    const analyticsScriptSrc = [
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
      "https://ssl.google-analytics.com",
      "https://connect.facebook.net",
      "https://www.googleadservices.com",
      "https://googleads.g.doubleclick.net",
    ];
    const analyticsConnectSrc = [
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
      "https://*.google-analytics.com",
      "https://*.analytics.google.com",
      "https://connect.facebook.net",
      "https://www.facebook.com",
      "https://www.googleadservices.com",
      "https://googleads.g.doubleclick.net",
      "https://*.g.doubleclick.net",
    ];
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'self'",
      "form-action 'self'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      `script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com ${analyticsScriptSrc.join(" ")}`,
      "frame-src 'self' https://challenges.cloudflare.com https://maps.google.com https://www.google.com https://www.google.com/maps https://www.googletagmanager.com https://td.doubleclick.net https://googleads.g.doubleclick.net",
      `connect-src 'self' https://challenges.cloudflare.com https://api.resend.com https://maps.googleapis.com https://www.google.com ${analyticsConnectSrc.join(" ")}`,
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

    const securityHeaders = [
      // Force HTTPS on every subsequent visit for 2 years, include
      // subdomains, request preload-list inclusion.
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      // Modern clickjacking + injection defence.
      { key: "Content-Security-Policy", value: csp },
      // Legacy clickjacking defence — disallow being framed.
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      // MIME-sniffing defence.
      { key: "X-Content-Type-Options", value: "nosniff" },
      // Send origin only on cross-origin navigation; full path on same-origin.
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      // Process-level isolation from attacker windows.
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      // Disable powerful browser features by default; explicit opt-in elsewhere.
      {
        key: "Permissions-Policy",
        value:
          "camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=(), gyroscope=(), magnetometer=()",
      },
    ];

    return [
      // Security headers on every response.
      { source: "/(.*)", headers: securityHeaders },

      // Long-lived caching for hashed static assets — these are content-
      // addressable and never change, so cache-busting is automatic when
      // filename changes. Critical for repeat-visit performance.
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // next/image responses — short cache, served from the optimizer
      // route. CDN can extend this safely; the optimizer regenerates if
      // the source changes.
      {
        source: "/_next/image(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },

      // Keep statically-prerendered content pages warm at the CDN edge.
      // These sections all use generateStaticParams + dynamicParams=false,
      // so their HTML only changes on a redeploy — and Vercel purges the
      // CDN cache on every deploy — which makes a long s-maxage safe.
      // Why this matters for SEO: deep, rarely-trafficked pages were
      // cold-missing the edge cache and answering Googlebot in ~10s
      // (origin cold-fetch). Slow responses on the exact pages Google is
      // already reluctant to crawl signal poor crawl-health and suppress
      // crawl rate — feeding the "Discovered – currently not indexed /
      // last crawled N/A" backlog. s-maxage pins the prerendered HTML at
      // the edge so Googlebot always gets an instant HIT. max-age=0 keeps
      // browsers revalidating so users never see stale HTML after a deploy.
      ...[
        "services",
        "audit",
        "locations",
        "industries",
        "training",
        "resources",
        "case-studies",
        "products",
        "blog",
      ].map((seg) => ({
        // `/:path*` matches the section root and all descendants.
        source: `/${seg}/:path*`,
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      })),

      // Note: the homepage and other top-level HTML responses intentionally
      // keep Next.js's per-route defaults. The previous site-wide
      // "no-store, must-revalidate" override killed CDN HTML caching and
      // hurt TTFB on repeat visits — do not reintroduce it.
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
