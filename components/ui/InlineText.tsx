import Link from "next/link";
import type { ReactNode } from "react";

// ── Inline links in prose ────────────────────────────────────────────────
// Supports markdown-style links `[label](/path)` for clean anchor text, and
// also auto-links bare internal paths (`/audit/...`, `/services/...`) so older
// copy that embeds raw paths in prose still emits real internal links. The
// bare-path whitelist of top-level segments avoids false positives like
// "30/60/90" or "24/7". Shared by blog and resource renderers (moved out of
// BlogContent 2026-10-16 so resource copy can carry links too).
export const INLINE_LINK_CLS =
  "text-neon-cyan underline decoration-neon-cyan/30 underline-offset-2 hover:decoration-neon-cyan transition-colors";
const MD_LINK = /\[([^\]]+)\]\((\/[^)\s]+|https?:\/\/[^)\s]+)\)/g;
const BARE_PATH =
  /\/(?:services|audit|industries|resources|locations|training|blog|products|case-studies|about|contact|clients|press|privacy)(?:\/[a-z0-9-]+)*/g;

function InlineLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

function autolinkBare(text: string, keyBase: string, className?: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let k = 0;
  BARE_PATH.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = BARE_PATH.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <InlineLink key={`${keyBase}-b${k++}`} href={m[0]} className={className}>
        {m[0]}
      </InlineLink>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/**
 * Render prose text with markdown links + bare-path autolinks.
 * `linkClassName` defaults to the dark-theme neon style; pass `undefined`
 * explicitly where a surrounding `prose` class should style links.
 */
export function inline(text: string, linkClassName: string | undefined = INLINE_LINK_CLS): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;
  let k = 0;
  MD_LINK.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = MD_LINK.exec(text)) !== null) {
    if (m.index > last) out.push(...autolinkBare(text.slice(last, m.index), `s${k}`, linkClassName));
    out.push(
      <InlineLink key={`md${k++}`} href={m[2]} className={linkClassName}>
        {m[1]}
      </InlineLink>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(...autolinkBare(text.slice(last), `s${k}`, linkClassName));
  return out.length === 1 ? out[0] : out;
}
