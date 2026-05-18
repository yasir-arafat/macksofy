import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { PHP_REDIRECTS } from "./lib/legacy-redirects";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },

  pageExtensions: ["ts", "tsx", "md", "mdx"],

  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  generateBuildId: async () => {
    return "stable-build";
  },

  async redirects() {
    return PHP_REDIRECTS.map((r) => ({
      ...r,
      statusCode: 301 as const,
    }));
  },

  async headers() {
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'self'",
      "form-action 'self'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com",
      "connect-src 'self' https://challenges.cloudflare.com https://api.resend.com",
      "object-src 'none'",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Cache-Control",
            value: "no-store, must-revalidate",
          },
        ],
      },

      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
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