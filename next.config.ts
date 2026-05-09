import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { PHP_REDIRECTS } from "./lib/legacy-redirects";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  allowedDevOrigins: ["192.168.0.125"],
  async redirects() {
    return PHP_REDIRECTS.map((r) => ({ ...r, statusCode: 301 as const }));
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
