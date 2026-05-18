import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { PHP_REDIRECTS } from "./lib/legacy-redirects";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "192.168.0.131",
    "192.168.0.*",
    "10.*",
  ],
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async redirects() {
    return PHP_REDIRECTS.map((r) => ({ ...r, statusCode: 301 as const }));
  },
  async headers() {
    // Content-Security-Policy — frame-ancestors enforces clickjacking
    // protection at a level X-Frame-Options can't reach. script-src keeps
    // 'unsafe-inline' / 'unsafe-eval' because Next.js inlines hydration
    // and framer-motion uses eval — accepted trade-off without nonces.
    // connect-src whitelists Turnstile siteverify + Resend used by API routes.
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'self'",
      "form-action 'self'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com",
      "frame-src https://challenges.cloudflare.com",
      "connect-src 'self' https://challenges.cloudflare.com https://api.resend.com",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

    const securityHeaders = [
      // Force HTTPS on every subsequent visit for 2 years, include subdomains, request preload.
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      // Modern clickjacking + injection defence via frame-ancestors + script-src.
      { key: "Content-Security-Policy", value: csp },
      // Clickjacking defence — disallow being framed by other origins (legacy).
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      // MIME-sniffing defence.
      { key: "X-Content-Type-Options", value: "nosniff" },
      // Send origin only on cross-origin navigation; full path on same-origin.
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      // Cross-origin opener isolation — opt out of process sharing with attacker windows.
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      // Disable powerful browser features by default; explicit opt-in elsewhere.
      {
        key: "Permissions-Policy",
        value:
          "camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=(), gyroscope=(), magnetometer=()",
      },
    ];
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
