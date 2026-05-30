import Link from "next/link";
import {
  Info,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import type { ReactNode } from "react";
import type { BlogBlock } from "@/content/blog";
import { BlogDiagram } from "./BlogDiagram";

// ── Inline links in prose ────────────────────────────────────────────────
// Supports markdown-style links `[label](/path)` for clean anchor text, and
// also auto-links bare internal paths (`/audit/...`, `/services/...`) so older
// posts that embed raw paths in prose still emit real internal links. The
// bare-path whitelist of top-level segments avoids false positives like
// "30/60/90" or "24/7".
const INLINE_LINK_CLS =
  "text-neon-cyan underline decoration-neon-cyan/30 underline-offset-2 hover:decoration-neon-cyan transition-colors";
const MD_LINK = /\[([^\]]+)\]\((\/[^)\s]+|https?:\/\/[^)\s]+)\)/g;
const BARE_PATH =
  /\/(?:services|audit|industries|resources|locations|training|blog|products|case-studies|about|contact|clients|press|privacy)(?:\/[a-z0-9-]+)*/g;

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={INLINE_LINK_CLS}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={INLINE_LINK_CLS}>
      {children}
    </a>
  );
}

function autolinkBare(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let k = 0;
  BARE_PATH.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = BARE_PATH.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <InlineLink key={`${keyBase}-b${k++}`} href={m[0]}>
        {m[0]}
      </InlineLink>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Render prose text with markdown links + bare-path autolinks. */
function inline(text: string): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;
  let k = 0;
  MD_LINK.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = MD_LINK.exec(text)) !== null) {
    if (m.index > last) out.push(...autolinkBare(text.slice(last, m.index), `s${k}`));
    out.push(
      <InlineLink key={`md${k++}`} href={m[2]}>
        {m[1]}
      </InlineLink>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(...autolinkBare(text.slice(last), `s${k}`));
  return out.length === 1 ? out[0] : out;
}

const CALLOUT_TONES = {
  info: {
    icon: Info,
    border: "border-cyan-500/30 bg-cyan-500/5",
    iconColor: "text-cyan-300",
    label: "Info",
  },
  warning: {
    icon: AlertTriangle,
    border: "border-amber-500/30 bg-amber-500/5",
    iconColor: "text-amber-300",
    label: "Warning",
  },
  success: {
    icon: CheckCircle2,
    border: "border-emerald-500/30 bg-emerald-500/5",
    iconColor: "text-emerald-300",
    label: "Outcome",
  },
  danger: {
    icon: ShieldAlert,
    border: "border-rose-500/30 bg-rose-500/5",
    iconColor: "text-rose-300",
    label: "Risk",
  },
  tip: {
    icon: Lightbulb,
    border: "border-fuchsia-500/30 bg-fuchsia-500/5",
    iconColor: "text-fuchsia-300",
    label: "Tip",
  },
} as const;

export function BlogContent({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-2">
      {blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "lead":
      return (
        <p
          data-speakable="lead"
          className="text-xl leading-relaxed text-fg text-pretty mb-10 first-letter:text-5xl first-letter:font-display first-letter:font-black first-letter:text-neon-cyan first-letter:mr-2 first-letter:float-left first-letter:leading-none first-letter:mt-1"
        >
          {inline(block.text)}
        </p>
      );

    case "heading": {
      const Tag = block.level === 2 ? "h2" : "h3";
      const cls =
        block.level === 2
          ? "mt-14 mb-5 font-display text-3xl sm:text-4xl font-black text-fg text-balance leading-tight scroll-mt-28"
          : "mt-10 mb-4 font-display text-xl font-bold text-fg scroll-mt-28";
      return (
        <Tag id={block.id} className={cls}>
          {block.text}
        </Tag>
      );
    }

    case "para":
      return (
        <p className="my-5 text-base leading-relaxed text-fg-muted text-pretty">
          {inline(block.text)}
        </p>
      );

    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag
          className={
            block.ordered
              ? "my-6 list-decimal pl-6 space-y-2 text-fg-muted marker:text-neon-cyan marker:font-mono marker:font-bold"
              : "my-6 list-disc pl-6 space-y-2 text-fg-muted marker:text-neon-cyan"
          }
        >
          {block.items.map((it, j) => (
            <li key={j} className="leading-relaxed pl-1">
              {inline(it)}
            </li>
          ))}
        </Tag>
      );
    }

    case "callout": {
      const tone = CALLOUT_TONES[block.tone];
      const ToneIcon = tone.icon;
      return (
        <aside
          className={`my-8 not-prose rounded-2xl border ${tone.border} p-5 sm:p-6`}
        >
          <div className="flex items-start gap-4">
            <div className={`mt-0.5 ${tone.iconColor}`}>
              <ToneIcon className="size-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`font-mono text-[10px] uppercase tracking-[0.22em] font-semibold ${tone.iconColor}`}
              >
                {block.title ?? tone.label}
              </div>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-fg">
                {inline(block.text)}
              </p>
            </div>
          </div>
        </aside>
      );
    }

    case "code":
      return (
        <div className="my-8 not-prose rounded-2xl ring-1 ring-line bg-bg-2 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-line bg-bg/50">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-rose-400/70" />
              <span className="size-2.5 rounded-full bg-amber-400/70" />
              <span className="size-2.5 rounded-full bg-emerald-400/70" />
              {block.title && (
                <span className="ml-3 text-xs text-fg-muted">{block.title}</span>
              )}
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-fg-faint">
              {block.lang}
            </span>
          </div>
          <pre className="p-4 sm:p-5 overflow-x-auto text-[13px] leading-relaxed">
            <code className="font-mono text-fg whitespace-pre">{block.code}</code>
          </pre>
        </div>
      );

    case "table":
      return (
        <div className="my-8 not-prose">
          <div className="overflow-x-auto rounded-2xl ring-1 ring-line">
            <table className="w-full text-sm">
              <thead className="bg-bg-2/50">
                <tr>
                  {block.headers.map((h, j) => (
                    <th
                      key={j}
                      className="px-4 py-3 text-left font-display font-bold text-fg text-xs uppercase tracking-wider border-b border-line"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, j) => (
                  <tr
                    key={j}
                    className="border-b border-line/40 last:border-0 hover:bg-white/[0.02]"
                  >
                    {row.map((cell, k) => (
                      <td
                        key={k}
                        className={
                          k === 0
                            ? "px-4 py-3 align-top text-fg font-medium"
                            : "px-4 py-3 align-top text-fg-muted leading-relaxed"
                        }
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && (
            <p className="mt-3 text-center text-xs font-mono uppercase tracking-[0.18em] text-fg-faint">
              {block.caption}
            </p>
          )}
        </div>
      );

    case "quote":
      return (
        <blockquote className="my-8 not-prose border-l-2 border-neon-cyan pl-5 sm:pl-6">
          <p className="text-lg sm:text-xl leading-relaxed text-fg italic font-display">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.cite && (
            <footer className="mt-3 text-sm text-fg-faint">— {block.cite}</footer>
          )}
        </blockquote>
      );

    case "diagram":
      return <BlogDiagram kind={block.kind} caption={block.caption} />;

    case "stat-row":
      return (
        <div className="my-10 not-prose grid grid-cols-2 lg:grid-cols-4 gap-3">
          {block.stats.map((s, j) => (
            <div
              key={j}
              className="rounded-2xl glass p-5 text-left"
            >
              <div className="font-display text-3xl font-black gradient-text leading-none">
                {s.value}
              </div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-faint leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      );

    case "comparison": {
      const tones = {
        cyan: "ring-neon-cyan/30 text-neon-cyan",
        purple: "ring-neon-purple/30 text-neon-purple",
      } as const;
      return (
        <div className="my-10 not-prose">
          {block.title && (
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-faint text-center">
              {block.title}
            </div>
          )}
          <div className="grid gap-5 md:grid-cols-2">
            {[block.left, block.right].map((side, j) => {
              const tone = side.tone ?? (j === 0 ? "cyan" : "purple");
              return (
                <div
                  key={j}
                  className={`rounded-2xl glass p-6 ring-1 ${tones[tone].split(" ")[0]}`}
                >
                  <div className={`font-display text-lg font-bold ${tones[tone].split(" ")[1]}`}>
                    {side.label}
                  </div>
                  <ul className="mt-4 space-y-2">
                    {side.bullets.map((b, k) => (
                      <li key={k} className="flex gap-2 text-sm text-fg-muted leading-relaxed">
                        <span className={`mt-1.5 size-1 shrink-0 rounded-full bg-current ${tones[tone].split(" ")[1]}`} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    case "cta":
      return (
        <div className="my-10 not-prose rounded-2xl gradient-border p-px">
          <div className="rounded-2xl bg-bg-2 p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <div className="font-display text-lg font-bold text-fg">
                {block.title}
              </div>
              <p className="mt-2 text-sm text-fg-muted leading-relaxed max-w-2xl">
                {block.text}
              </p>
            </div>
            <Link
              href={block.href}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-neon-cyan/15 ring-1 ring-neon-cyan/40 px-5 py-2.5 text-sm font-semibold text-neon-cyan hover:bg-neon-cyan/25 transition-colors"
            >
              {block.cta}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export function BlogToc({ blocks }: { blocks: BlogBlock[] }) {
  const items = blocks.filter(
    (b): b is Extract<BlogBlock, { type: "heading" }> =>
      b.type === "heading" && b.level === 2
  );
  if (items.length === 0) return null;
  return (
    <nav aria-label="Table of contents" className="rounded-2xl glass p-5 sticky top-28">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan font-semibold">
        On this page
      </div>
      <ol className="mt-4 space-y-2 text-sm">
        {items.map((it, i) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className="group flex gap-3 text-fg-muted hover:text-neon-cyan transition-colors"
            >
              <span className="font-mono text-fg-faint group-hover:text-neon-cyan">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="leading-snug">{it.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
