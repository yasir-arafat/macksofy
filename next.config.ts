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
    const securityHeaders = [
      // Force HTTPS on every subsequent visit for 2 years, include subdomains, request preload.
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      // Clickjacking defence — disallow being framed by other origins.
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      // MIME-sniffing defence.
      { key: "X-Content-Type-Options", value: "nosniff" },
      // Send origin only on cross-origin navigation; full path on same-origin.
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
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
