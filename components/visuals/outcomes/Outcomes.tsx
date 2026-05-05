import {
  Crosshair,
  ShieldCheck,
  ClipboardCheck,
  Microscope,
  Cog,
  FileText,
  Brain,
  Cloud,
  CheckCircle2,
} from "lucide-react";
import { OutcomesSkillTree } from "./OutcomesSkillTree";
import { OutcomesCapabilityBars } from "./OutcomesCapabilityBars";
import { OutcomesAchievementGrid } from "./OutcomesAchievementGrid";
import { OutcomesCareerLadder } from "./OutcomesCareerLadder";

export type OutcomesStyle =
  | "skilltree"
  | "capabilitybars"
  | "achievementgrid"
  | "careerladder";

export type OutcomesAccent = "cyan" | "purple" | "amber" | "rose" | "green";

export type OutcomeCategory =
  | "offensive"
  | "defensive"
  | "governance"
  | "analysis"
  | "engineering"
  | "reporting"
  | "ai"
  | "cloud"
  | "general";

export interface CareerRole {
  role: string;
  salaryINR: string;
  experience: string;
}

export interface OutcomeItem {
  text: string;
  category: OutcomeCategory;
}

interface BaseProps {
  outcomes: OutcomeItem[];
  careerRoles?: CareerRole[];
  accent: OutcomesAccent;
  courseShortTitle?: string;
  duration?: string;
}

interface PublicProps {
  slug: string;
  outcomes: string[];
  careerRoles?: CareerRole[];
  duration?: string;
  courseShortTitle?: string;
  style?: OutcomesStyle;
  accent?: OutcomesAccent;
}

/* ============================================================ */
/*  Keyword → category classifier                                */
/* ============================================================ */

export function classifyOutcome(text: string): OutcomeCategory {
  const t = text.toLowerCase();
  if (/\b(ai|llm|prompt|machine|model)\b/.test(t)) return "ai";
  if (/\b(cloud|aws|azure|gcp|kubernetes|container)\b/.test(t)) return "cloud";
  if (
    /\b(exploit|attack|compromise|pen.?test|red team|kerberoast|escalat|payload|c2|adversary|infiltrat|breach)\b/.test(
      t
    )
  )
    return "offensive";
  if (
    /\b(harden|defend|monitor|detect|protect|respond|patch|sandbox|firewall|baseline|hunt)\b/.test(
      t
    )
  )
    return "defensive";
  if (/\b(audit|complian|policy|governance|risk|gdpr|iso|nist|cert.?in|rbi|sebi)\b/.test(t))
    return "governance";
  if (
    /\b(investigat|forensic|analy[sz]e|reverse|memor|disk|triage|timeline|artifact|evidence)\b/.test(
      t
    )
  )
    return "analysis";
  if (
    /\b(build|implement|deploy|configure|integrat|wire|automat|engineer|orchestrat|set.?up|install)\b/.test(
      t
    )
  )
    return "engineering";
  if (/\b(report|communicat|present|brief|writ|document)\b/.test(t))
    return "reporting";
  return "general";
}

export const CATEGORY_META: Record<
  OutcomeCategory,
  {
    label: string;
    icon: typeof CheckCircle2;
    accent: OutcomesAccent;
  }
> = {
  offensive: { label: "Offensive", icon: Crosshair, accent: "rose" },
  defensive: { label: "Defensive", icon: ShieldCheck, accent: "cyan" },
  governance: { label: "Governance", icon: ClipboardCheck, accent: "amber" },
  analysis: { label: "Analysis", icon: Microscope, accent: "purple" },
  engineering: { label: "Engineering", icon: Cog, accent: "cyan" },
  reporting: { label: "Reporting", icon: FileText, accent: "green" },
  ai: { label: "AI", icon: Brain, accent: "purple" },
  cloud: { label: "Cloud", icon: Cloud, accent: "cyan" },
  general: { label: "Capability", icon: CheckCircle2, accent: "cyan" },
};

/* ============================================================ */
/*  Slug → style map                                             */
/* ============================================================ */

const STYLE_MAP: Record<string, { style: OutcomesStyle; accent: OutcomesAccent }> = {
  // EC-Council
  ceh: { style: "achievementgrid", accent: "amber" },
  "ceh-practical": { style: "skilltree", accent: "rose" },
  chfi: { style: "capabilitybars", accent: "purple" },
  ctia: { style: "achievementgrid", accent: "cyan" },
  csa: { style: "capabilitybars", accent: "cyan" },
  cpent: { style: "skilltree", accent: "rose" },
  // OffSec
  "sec-100-cybercore": { style: "achievementgrid", accent: "cyan" },
  oscp: { style: "skilltree", accent: "rose" },
  "osep-pen-300": { style: "skilltree", accent: "rose" },
  "oswe-web-300": { style: "skilltree", accent: "amber" },
  "oswa-web-200": { style: "capabilitybars", accent: "amber" },
  "oswp-pen-210": { style: "achievementgrid", accent: "cyan" },
  "soc-200-osda": { style: "capabilitybars", accent: "cyan" },
  "exp-301-osed": { style: "skilltree", accent: "purple" },
  "exp-312-osmr": { style: "skilltree", accent: "purple" },
  "exp-401-osee": { style: "skilltree", accent: "rose" },
  // CompTIA
  "cysa-plus": { style: "capabilitybars", accent: "cyan" },
  "linux-plus": { style: "achievementgrid", accent: "green" },
  "server-plus": { style: "achievementgrid", accent: "amber" },
  // Macksofy
  "soc-analyst": { style: "careerladder", accent: "cyan" },
  "web-application-security": { style: "skilltree", accent: "amber" },
  "corporate-training": { style: "careerladder", accent: "purple" },
};

const FALLBACK_STYLES: OutcomesStyle[] = [
  "skilltree",
  "capabilitybars",
  "achievementgrid",
  "careerladder",
];

function resolveStyle(slug: string): {
  style: OutcomesStyle;
  accent: OutcomesAccent;
} {
  const explicit = STYLE_MAP[slug];
  if (explicit) return explicit;
  const hash = [...slug].reduce((a, c) => a + c.charCodeAt(0), 0);
  return {
    style: FALLBACK_STYLES[hash % FALLBACK_STYLES.length],
    accent: "cyan",
  };
}

/* ============================================================ */
/*  Public component                                             */
/* ============================================================ */

export function Outcomes({
  slug,
  outcomes,
  careerRoles,
  duration,
  courseShortTitle,
  style: styleOverride,
  accent: accentOverride,
}: PublicProps) {
  const resolved = resolveStyle(slug);
  const style = styleOverride ?? resolved.style;
  const accent = accentOverride ?? resolved.accent;

  const enriched: OutcomeItem[] = outcomes.map((text) => ({
    text,
    category: classifyOutcome(text),
  }));

  const props: BaseProps = {
    outcomes: enriched,
    careerRoles,
    accent,
    courseShortTitle,
    duration,
  };

  switch (style) {
    case "skilltree":
      return <OutcomesSkillTree {...props} />;
    case "capabilitybars":
      return <OutcomesCapabilityBars {...props} />;
    case "achievementgrid":
      return <OutcomesAchievementGrid {...props} />;
    case "careerladder":
      return <OutcomesCareerLadder {...props} />;
  }
}

export type { BaseProps as OutcomesBaseProps };

export const ACCENT_TOKEN: Record<
  OutcomesAccent,
  {
    text: string;
    bg: string;
    bgSoft: string;
    ring: string;
    glow: string;
    hex: string;
  }
> = {
  cyan: {
    text: "text-neon-cyan",
    bg: "bg-neon-cyan",
    bgSoft: "bg-neon-cyan/10",
    ring: "ring-neon-cyan/40",
    glow: "shadow-[0_0_24px_rgba(0,229,255,0.35)]",
    hex: "#00e5ff",
  },
  purple: {
    text: "text-neon-purple",
    bg: "bg-neon-purple",
    bgSoft: "bg-neon-purple/10",
    ring: "ring-neon-purple/40",
    glow: "shadow-[0_0_24px_rgba(168,85,247,0.35)]",
    hex: "#a855f7",
  },
  amber: {
    text: "text-amber-300",
    bg: "bg-amber-300",
    bgSoft: "bg-amber-500/10",
    ring: "ring-amber-400/40",
    glow: "shadow-[0_0_24px_rgba(251,191,36,0.35)]",
    hex: "#fbbf24",
  },
  rose: {
    text: "text-rose-300",
    bg: "bg-rose-400",
    bgSoft: "bg-rose-500/10",
    ring: "ring-rose-400/40",
    glow: "shadow-[0_0_24px_rgba(251,113,133,0.35)]",
    hex: "#fb7185",
  },
  green: {
    text: "text-emerald-300",
    bg: "bg-emerald-400",
    bgSoft: "bg-emerald-500/10",
    ring: "ring-emerald-400/40",
    glow: "shadow-[0_0_24px_rgba(74,222,128,0.35)]",
    hex: "#4ade80",
  },
};
