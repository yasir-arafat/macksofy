import type { MDXComponents } from "mdx/types";

// Customize the React components used to render MDX content.
// Add styling, swap defaults for next/image, inject custom components, etc.
const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
