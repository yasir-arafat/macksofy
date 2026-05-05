import {
  Shield,
  KeyRound,
  Globe,
  Network,
  Brain,
  GitCompare,
  Siren,
} from "lucide-react";
import type { HeroKind } from "@/content/blog";
import { BlogIllustration, hasIllustration } from "./BlogIllustrations";

const META: Record<
  HeroKind,
  {
    icon: typeof Shield;
    bgFrom: string;
    bgTo: string;
    accent: string;
    pattern: "grid" | "circuits" | "rays" | "dots";
    glyph: string;
  }
> = {
  "blue-team": {
    icon: Shield,
    bgFrom: "from-sky-500/20",
    bgTo: "to-cyan-500/10",
    accent: "text-cyan-300",
    pattern: "grid",
    glyph: "DEFEND",
  },
  ad: {
    icon: KeyRound,
    bgFrom: "from-fuchsia-500/20",
    bgTo: "to-purple-500/10",
    accent: "text-fuchsia-300",
    pattern: "circuits",
    glyph: "AD",
  },
  web: {
    icon: Globe,
    bgFrom: "from-emerald-500/15",
    bgTo: "to-cyan-500/15",
    accent: "text-emerald-300",
    pattern: "dots",
    glyph: "HTTP",
  },
  network: {
    icon: Network,
    bgFrom: "from-amber-500/15",
    bgTo: "to-orange-500/10",
    accent: "text-amber-300",
    pattern: "rays",
    glyph: "NET",
  },
  ai: {
    icon: Brain,
    bgFrom: "from-violet-500/20",
    bgTo: "to-fuchsia-500/10",
    accent: "text-violet-300",
    pattern: "circuits",
    glyph: "MCP",
  },
  "cert-compare": {
    icon: GitCompare,
    bgFrom: "from-cyan-500/15",
    bgTo: "to-purple-500/15",
    accent: "text-cyan-300",
    pattern: "grid",
    glyph: "VS",
  },
  incident: {
    icon: Siren,
    bgFrom: "from-rose-500/20",
    bgTo: "to-amber-500/10",
    accent: "text-rose-300",
    pattern: "rays",
    glyph: "IR",
  },
};

export function BlogHeroVisual({
  kind,
  slug,
  className,
}: {
  kind: HeroKind;
  slug?: string;
  className?: string;
}) {
  const meta = META[kind];
  const Icon = meta.icon;

  if (slug && hasIllustration(slug)) {
    return (
      <div className={`relative ${className ?? ""}`}>
        <BlogIllustration slug={slug} />
        <div className="pointer-events-none absolute top-4 right-4">
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.3em] px-3 py-1 rounded-full bg-bg/70 ring-1 ring-line backdrop-blur-sm ${meta.accent}`}
          >
            {meta.glyph}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-line bg-gradient-to-br ${meta.bgFrom} ${meta.bgTo} ${className ?? ""}`}
    >
      <Pattern kind={meta.pattern} />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
      <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
        <div className={`grid size-12 place-items-center rounded-xl bg-bg/70 ring-1 ring-line backdrop-blur-sm ${meta.accent}`}>
          <Icon className="size-6" />
        </div>
        <span className={`font-mono text-[10px] uppercase tracking-[0.3em] px-3 py-1 rounded-full bg-bg/70 ring-1 ring-line backdrop-blur-sm ${meta.accent}`}>
          {meta.glyph}
        </span>
      </div>
    </div>
  );
}

function Pattern({ kind }: { kind: "grid" | "circuits" | "rays" | "dots" }) {
  if (kind === "grid") {
    return (
      <svg className="absolute inset-0 size-full opacity-50" aria-hidden>
        <defs>
          <pattern id="bgGrid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255,255,255,0.08)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bgGrid)" />
      </svg>
    );
  }
  if (kind === "dots") {
    return (
      <svg className="absolute inset-0 size-full opacity-60" aria-hidden>
        <defs>
          <pattern id="bgDots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1.2" fill="rgba(255,255,255,0.15)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bgDots)" />
      </svg>
    );
  }
  if (kind === "rays") {
    return (
      <svg className="absolute inset-0 size-full" aria-hidden viewBox="0 0 600 340" preserveAspectRatio="none">
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1={300}
            y1={170}
            x2={Math.cos((i * Math.PI * 2) / 12) * 800 + 300}
            y2={Math.sin((i * Math.PI * 2) / 12) * 800 + 170}
            stroke="rgba(245,158,11,0.15)"
            strokeWidth={1}
          />
        ))}
      </svg>
    );
  }
  // circuits
  return (
    <svg className="absolute inset-0 size-full opacity-70" aria-hidden viewBox="0 0 600 340" preserveAspectRatio="none">
      <g fill="none" stroke="rgba(168,85,247,0.18)" strokeWidth={1}>
        <path d="M0 60 H180 V120 H320 V60 H600" />
        <path d="M0 200 H120 V260 H280 V200 H440 V280 H600" />
        <path d="M0 300 H80 V340" />
        <circle cx={180} cy={120} r={3} fill="rgba(168,85,247,0.4)" />
        <circle cx={320} cy={60} r={3} fill="rgba(168,85,247,0.4)" />
        <circle cx={280} cy={260} r={3} fill="rgba(168,85,247,0.4)" />
        <circle cx={440} cy={200} r={3} fill="rgba(168,85,247,0.4)" />
      </g>
    </svg>
  );
}
