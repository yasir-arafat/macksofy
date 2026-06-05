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
    // protection. script-src keeps 'unsafe-inline' / 'unsafe-eval'
    // because Next.js inlines hydration and framer-motion uses eval —
    // accepted trade-off without nonces. frame-src whitelists
    // Turnstile + Google Maps embeds. connect-src whitelists Turnstile
    // siteverify + Resend + Maps tile fetch.
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
      `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com ${analyticsScriptSrc.join(" ")}`,
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

      // Note: HTML responses intentionally do NOT have a Cache-Control
      // override here. Next.js will apply sensible defaults
      // (s-maxage=0, stale-while-revalidate) per route, and the CDN
      // layer can apply its own HTML caching policy. The previous
      // "no-store, must-revalidate" override killed CDN HTML caching
      // and hurt TTFB on repeat visits — removed.
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
