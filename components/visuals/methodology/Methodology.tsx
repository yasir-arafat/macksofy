import { MethodologyTimeline } from "./MethodologyTimeline";
import { MethodologyStepper } from "./MethodologyStepper";
import { MethodologyRadial } from "./MethodologyRadial";
import { MethodologyJourney } from "./MethodologyJourney";
import { MethodologyCardDeck } from "./MethodologyCardDeck";
import { MethodologyBlueprint } from "./MethodologyBlueprint";

export type MethodologyStyle =
  | "timeline"
  | "stepper"
  | "radial"
  | "journey"
  | "carddeck"
  | "blueprint";

export type MethodologyAccent = "cyan" | "purple" | "amber" | "rose" | "green";

export interface MethodologyPhase {
  phase: string;
  activities: string[];
}

interface Props {
  slug: string;
  phases: MethodologyPhase[];
  /** Optional override; otherwise resolved from slug map. */
  style?: MethodologyStyle;
  /** Optional accent override. */
  accent?: MethodologyAccent;
  subjectLabel?: string;
  /**
   * Optional per-phase decorative image. Index matches `phases`. Each entry
   * may be a public-path URL (e.g. "/methodology/foo.webp") or null/undefined
   * to skip. Currently honoured by the "stepper" style; ignored by others.
   */
  phaseImages?: (string | null | undefined)[];
}

/* ============================================================ */
/*  Slug → style mapping. Picked for thematic fit + variety.    */
/* ============================================================ */

const STYLE_MAP: Record<string, { style: MethodologyStyle; accent: MethodologyAccent }> = {
  // ─── Services
  "penetration-testing": { style: "timeline", accent: "rose" },
  vapt: { style: "blueprint", accent: "cyan" },
  "managed-soc": { style: "radial", accent: "cyan" },
  "web-application-security": { style: "carddeck", accent: "amber" },
  "mobile-application-security": { style: "stepper", accent: "cyan" },
  "cloud-security": { style: "journey", accent: "cyan" },
  "red-teaming": { style: "timeline", accent: "rose" },
  "digital-forensics-incident-response": { style: "journey", accent: "amber" },
  "malware-analysis": { style: "blueprint", accent: "purple" },
  "threat-intelligence": { style: "radial", accent: "purple" },

  // ─── Audits — Foundational
  "cybersecurity-audit": { style: "stepper", accent: "cyan" },
  "compliance-audit": { style: "carddeck", accent: "purple" },
  "risk-assessment": { style: "radial", accent: "amber" },

  // ─── Audits — Indian Regulatory
  "cert-in-empanelled-audit": { style: "timeline", accent: "amber" },
  "rbi-csf": { style: "stepper", accent: "amber" },
  "sebi-cscrf": { style: "journey", accent: "amber" },
  "sebi-sar": { style: "timeline", accent: "amber" },
  "irdai-compliance": { style: "stepper", accent: "rose" },
  "dpdp-act": { style: "carddeck", accent: "purple" },
  cicra: { style: "blueprint", accent: "cyan" },
  "regulatory-vapt": { style: "blueprint", accent: "rose" },

  // ─── Audits — International Standards
  "iso-27001": { style: "radial", accent: "cyan" },
  "iso-27017": { style: "journey", accent: "cyan" },
  "iso-27018": { style: "journey", accent: "purple" },
  "iso-27701": { style: "stepper", accent: "purple" },
  "iso-42001": { style: "blueprint", accent: "purple" },
  "soc-2": { style: "timeline", accent: "cyan" },
  "nist-csf": { style: "radial", accent: "cyan" },

  // ─── Audits — Industry & Privacy
  "pci-dss": { style: "stepper", accent: "cyan" },
  hipaa: { style: "journey", accent: "rose" },
  gdpr: { style: "carddeck", accent: "green" },
};

const FALLBACK_STYLES: MethodologyStyle[] = [
  "timeline",
  "stepper",
  "radial",
  "journey",
  "carddeck",
  "blueprint",
];

function resolveStyle(slug: string): {
  style: MethodologyStyle;
  accent: MethodologyAccent;
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

export function Methodology({
  slug,
  phases,
  style: styleOverride,
  accent: accentOverride,
  subjectLabel,
  phaseImages,
}: Props) {
  const resolved = resolveStyle(slug);
  const style = styleOverride ?? resolved.style;
  const accent = accentOverride ?? resolved.accent;

  const props = { phases, accent, subjectLabel };

  switch (style) {
    case "stepper":
      return <MethodologyStepper {...props} phaseImages={phaseImages} />;
    case "radial":
      return <MethodologyRadial {...props} />;
    case "journey":
      return <MethodologyJourney {...props} />;
    case "carddeck":
      return <MethodologyCardDeck {...props} />;
    case "blueprint":
      return <MethodologyBlueprint {...props} />;
    case "timeline":
    default:
      return <MethodologyTimeline {...props} />;
  }
}

export const ACCENT_TOKEN: Record<
  MethodologyAccent,
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
