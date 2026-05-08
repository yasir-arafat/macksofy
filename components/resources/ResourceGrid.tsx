"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Filter,
  FileText,
  ListChecks,
  ScrollText,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import {
  RESOURCES,
  RESOURCE_TYPES,
  type Resource,
  type ResourceType,
} from "@/content/resources";

export interface BrochureEntry {
  slug: string;
  title: string;
  subtitle: string;
  href: string;
  pageCount: string;
  topics: string[];
}

interface Props {
  brochures: BrochureEntry[];
}

const TYPE_ICON: Record<ResourceType, LucideIcon> = {
  Whitepaper: ScrollText,
  Checklist: ListChecks,
  "Cheat Sheet": Sparkles,
  Brochure: FileText,
};

const ACCENT_RING: Record<Resource["accent"], string> = {
  cyan: "ring-neon-cyan/30 hover:ring-neon-cyan/60",
  purple: "ring-neon-purple/30 hover:ring-neon-purple/60",
  amber: "ring-amber-400/30 hover:ring-amber-400/60",
  pink: "ring-pink-400/30 hover:ring-pink-400/60",
  green: "ring-emerald-400/30 hover:ring-emerald-400/60",
  red: "ring-red-400/30 hover:ring-red-400/60",
};

const ACCENT_GLOW: Record<Resource["accent"], string> = {
  cyan: "from-neon-cyan/15",
  purple: "from-neon-purple/15",
  amber: "from-amber-400/15",
  pink: "from-pink-400/15",
  green: "from-emerald-400/15",
  red: "from-red-400/15",
};

const ACCENT_TEXT: Record<Resource["accent"], string> = {
  cyan: "text-neon-cyan",
  purple: "text-neon-purple",
  amber: "text-amber-300",
  pink: "text-pink-300",
  green: "text-emerald-300",
  red: "text-red-300",
};

interface UnifiedItem {
  kind: "owned" | "brochure";
  slug: string;
  type: ResourceType;
  title: string;
  subtitle: string;
  href: string;
  pageCount: string;
  topics: string[];
  icon: LucideIcon;
  accent: Resource["accent"];
}

export function ResourceGrid({ brochures }: Props) {
  const [type, setType] = useState<string>("All");
  const [topic, setTopic] = useState<string>("All");

  const items: UnifiedItem[] = useMemo(() => {
    const owned: UnifiedItem[] = RESOURCES.map((r) => ({
      kind: "owned",
      slug: r.slug,
      type: r.type,
      title: r.title,
      subtitle: r.subtitle,
      href: `/resources/${r.slug}`,
      pageCount: r.pageCount,
      topics: r.topics,
      icon: r.icon,
      accent: r.accent,
    }));
    const broch: UnifiedItem[] = brochures.map((b) => ({
      kind: "brochure",
      slug: b.slug,
      type: "Brochure",
      title: b.title,
      subtitle: b.subtitle,
      href: b.href,
      pageCount: b.pageCount,
      topics: b.topics,
      icon: FileText,
      accent: "amber",
    }));
    return [...owned, ...broch];
  }, [brochures]);

  const allTopics = useMemo(() => {
    const s = new Set<string>();
    items.forEach((i) => i.topics.forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [items]);

  const filtered = items.filter((i) => {
    if (type !== "All" && i.type !== type) return false;
    if (topic !== "All" && !i.topics.includes(topic)) return false;
    return true;
  });

  return (
    <div>
      <div className="mb-10 rounded-2xl glass p-5 ring-1 ring-white/10">
        <div className="flex items-center gap-2 text-fg-muted text-xs font-mono uppercase tracking-[0.2em] mb-4">
          <Filter className="size-3.5" />
          Filter resources
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <FilterRow
            label="Type"
            value={type}
            options={["All", ...RESOURCE_TYPES]}
            onChange={setType}
          />
          <FilterRow
            label="Topic"
            value={topic}
            options={["All", ...allTopics]}
            onChange={setTopic}
            wrap
          />
        </div>

        <div className="mt-4 text-xs text-fg-faint">
          Showing <span className="text-fg font-bold">{filtered.length}</span>{" "}
          of {items.length} resources
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl glass p-12 text-center ring-1 ring-white/10">
          <p className="text-fg-muted">No resources match those filters.</p>
          <button
            onClick={() => {
              setType("All");
              setTopic("All");
            }}
            className="mt-3 text-sm font-semibold text-neon-cyan hover:underline"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((it) => {
            const Icon = it.icon;
            const TypeIcon = TYPE_ICON[it.type];
            return (
              <Link
                key={`${it.kind}-${it.slug}`}
                href={it.href}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-2xl glass p-6 ring-1 transition-all hover:-translate-y-1",
                  ACCENT_RING[it.accent]
                )}
              >
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -right-12 -top-12 size-40 rounded-full blur-3xl bg-gradient-to-br to-transparent opacity-60 transition-opacity group-hover:opacity-100",
                    ACCENT_GLOW[it.accent]
                  )}
                />

                <div className="relative flex items-start justify-between">
                  <div
                    className={cn(
                      "grid size-12 place-items-center rounded-xl bg-bg-2 ring-1",
                      ACCENT_RING[it.accent],
                      ACCENT_TEXT[it.accent]
                    )}
                  >
                    <Icon className="size-6" />
                  </div>
                  <ArrowUpRight className="size-5 text-fg-faint transition-transform group-hover:rotate-12 group-hover:text-fg" />
                </div>

                <div className="relative mt-5 flex flex-wrap items-center gap-1.5">
                  <Badge variant="cyan">
                    <TypeIcon className="size-3" />
                    {it.type}
                  </Badge>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-fg-faint">
                    {it.pageCount}
                  </span>
                </div>

                <h3 className="relative mt-3 font-display text-base font-bold text-fg leading-tight line-clamp-2">
                  {it.title}
                </h3>

                <p className="relative mt-3 text-sm text-fg-muted line-clamp-3">
                  {it.subtitle}
                </p>

                <div className="relative mt-auto pt-5 flex flex-wrap gap-1.5">
                  {it.topics.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-fg-muted ring-1 ring-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FilterRow({
  label,
  value,
  options,
  onChange,
  wrap,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  wrap?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-fg-faint mb-2">
        {label}
      </div>
      <div className={cn("flex gap-1.5", wrap ? "flex-wrap" : "flex-wrap")}>
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold ring-1 transition",
                active
                  ? "bg-neon-cyan text-bg ring-neon-cyan"
                  : "bg-white/5 text-fg-muted ring-white/10 hover:text-fg hover:ring-white/30"
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
