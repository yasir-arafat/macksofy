"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import {
  CASE_STUDIES,
  SECTORS,
  ENGAGEMENT_TYPES,
  type CaseStudyHero,
} from "@/content/caseStudies";

type Region = "All" | "India" | "UAE" | "GCC";

const REGIONS: Region[] = ["All", "India", "UAE", "GCC"];

const ACCENT_RING: Record<CaseStudyHero["accent"], string> = {
  cyan: "ring-neon-cyan/30 hover:ring-neon-cyan/60",
  purple: "ring-neon-purple/30 hover:ring-neon-purple/60",
  amber: "ring-amber-400/30 hover:ring-amber-400/60",
  pink: "ring-pink-400/30 hover:ring-pink-400/60",
  green: "ring-emerald-400/30 hover:ring-emerald-400/60",
  red: "ring-red-400/30 hover:ring-red-400/60",
};

const ACCENT_GLOW: Record<CaseStudyHero["accent"], string> = {
  cyan: "from-neon-cyan/15",
  purple: "from-neon-purple/15",
  amber: "from-amber-400/15",
  pink: "from-pink-400/15",
  green: "from-emerald-400/15",
  red: "from-red-400/15",
};

const ACCENT_TEXT: Record<CaseStudyHero["accent"], string> = {
  cyan: "text-neon-cyan",
  purple: "text-neon-purple",
  amber: "text-amber-300",
  pink: "text-pink-300",
  green: "text-emerald-300",
  red: "text-red-300",
};

export function CaseStudyGrid() {
  const [sector, setSector] = useState<string>("All");
  const [engagement, setEngagement] = useState<string>("All");
  const [region, setRegion] = useState<Region>("All");

  const filtered = useMemo(() => {
    return CASE_STUDIES.filter((cs) => {
      if (sector !== "All" && cs.sector !== sector) return false;
      if (engagement !== "All" && cs.engagement !== engagement) return false;
      if (region !== "All" && cs.region !== region) return false;
      return true;
    });
  }, [sector, engagement, region]);

  return (
    <div>
      {/* Filter strip */}
      <div className="mb-10 rounded-2xl glass p-5 ring-1 ring-white/10">
        <div className="flex items-center gap-2 text-fg-muted text-xs font-mono uppercase tracking-[0.2em] mb-4">
          <Filter className="size-3.5" />
          Filter case studies
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <FilterRow
            label="Sector"
            value={sector}
            options={["All", ...SECTORS]}
            onChange={setSector}
          />
          <FilterRow
            label="Engagement"
            value={engagement}
            options={["All", ...ENGAGEMENT_TYPES]}
            onChange={setEngagement}
          />
          <FilterRow
            label="Region"
            value={region}
            options={REGIONS}
            onChange={(v) => setRegion(v as Region)}
          />
        </div>

        <div className="mt-4 text-xs text-fg-faint">
          Showing <span className="text-fg font-bold">{filtered.length}</span>{" "}
          of {CASE_STUDIES.length} case studies
        </div>
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl glass p-12 text-center ring-1 ring-white/10">
          <p className="text-fg-muted">
            No case studies match those filters yet.
          </p>
          <button
            onClick={() => {
              setSector("All");
              setEngagement("All");
              setRegion("All");
            }}
            className="mt-3 text-sm font-semibold text-neon-cyan hover:underline"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cs) => {
            const Icon = cs.icon;
            return (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-2xl glass p-6 ring-1 transition-all hover:-translate-y-1",
                  ACCENT_RING[cs.accent]
                )}
              >
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -right-12 -top-12 size-40 rounded-full blur-3xl bg-gradient-to-br to-transparent opacity-60 transition-opacity group-hover:opacity-100",
                    ACCENT_GLOW[cs.accent]
                  )}
                />

                <div className="relative flex items-start justify-between">
                  <div
                    className={cn(
                      "grid size-12 place-items-center rounded-xl bg-bg-2 ring-1",
                      ACCENT_RING[cs.accent],
                      ACCENT_TEXT[cs.accent]
                    )}
                  >
                    <Icon className="size-6" />
                  </div>
                  <ArrowUpRight className="size-5 text-fg-faint transition-transform group-hover:rotate-12 group-hover:text-fg" />
                </div>

                <div className="relative mt-5 flex flex-wrap gap-1.5">
                  <Badge variant="cyan">{cs.sector}</Badge>
                  <Badge variant="purple">{cs.engagement}</Badge>
                  <Badge variant="outline">{cs.region}</Badge>
                </div>

                <h3 className="relative mt-4 font-display text-lg font-bold text-fg leading-tight line-clamp-3">
                  {cs.headline}
                </h3>

                <p className="relative mt-3 text-sm text-fg-muted line-clamp-3">
                  {cs.summary}
                </p>

                {/* Headline metric strip */}
                <div className="relative mt-5 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
                  {cs.metrics.slice(0, 2).map((m) => (
                    <div key={m.label}>
                      <div
                        className={cn(
                          "font-display text-xl font-black leading-none",
                          ACCENT_TEXT[cs.accent]
                        )}
                      >
                        {m.value}
                      </div>
                      <div className="mt-1 text-[10px] uppercase tracking-wider text-fg-faint font-mono">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative mt-auto pt-5 flex items-center justify-between text-xs text-fg-faint font-mono">
                  <span>{cs.clientType}</span>
                  <span>
                    {cs.year} · {cs.duration}
                  </span>
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
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-fg-faint mb-2">
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">
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
