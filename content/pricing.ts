/**
 * Indicative pricing tiers per service / audit slug.
 *
 * Tiers are rendered as a 3-card strip on detail pages. Numbers are in INR
 * lakhs (1 lakh = ₹1,00,000). Macksofy formats them as ₹2.5L–₹4L etc. via
 * the formatRange helper in `components/PricingTiers.tsx`.
 *
 * If a slug is unmapped, the renderer falls back to a category default so
 * every page still shows a price chip — keeps copy consistent and saves
 * editors from updating two files at once.
 */

export interface PriceTier {
  name: string;
  fromINR: number; // in lakhs
  toINR?: number; // in lakhs (optional upper bound)
  starts?: boolean; // when true, render "Starts at ₹X" without an upper bound
  bestFor: string;
  features: string[];
  popular?: boolean;
}

export interface PricingPackage {
  starter: PriceTier;
  standard: PriceTier;
  enterprise: PriceTier;
  notes?: string;
}

/* ============================================================ */
/*  Category defaults                                            */
/* ============================================================ */

const SERVICE_DEFAULT_OFFENSIVE: PricingPackage = {
  starter: {
    name: "Focused",
    fromINR: 2.5,
    toINR: 5,
    bestFor: "Single asset or app",
    features: [
      "Manual + tooled testing",
      "CERT-In format report",
      "Free 30-day retest",
    ],
  },
  standard: {
    name: "Stack",
    fromINR: 6,
    toINR: 12,
    bestFor: "Multi-asset engagement",
    popular: true,
    features: [
      "Everything in Focused",
      "Web + API + mobile coverage",
      "Executive + technical briefings",
    ],
  },
  enterprise: {
    name: "Programme",
    fromINR: 15,
    starts: true,
    bestFor: "Quarterly retainer · large estate",
    features: [
      "Everything in Stack",
      "Quarterly cycles + post-release retests",
      "Same consultants throughout",
    ],
  },
  notes:
    "Indicative pricing in INR. Final quote depends on scope, asset count and engagement window. Fixed-price proposal within 72 hours.",
};

const SERVICE_DEFAULT_DEFENSIVE: PricingPackage = {
  starter: {
    name: "Build",
    fromINR: 4,
    toINR: 8,
    bestFor: "Initial setup · single SOC tier",
    features: [
      "Tooling (Wazuh / ELK / Splunk) implementation",
      "Baseline detection rules",
      "Runbook authoring",
    ],
  },
  standard: {
    name: "Operate",
    fromINR: 10,
    toINR: 20,
    bestFor: "L1 + L2 with retainer",
    popular: true,
    features: [
      "Everything in Build",
      "24×7 monitoring across business hours",
      "Monthly threat-hunt + posture reviews",
    ],
  },
  enterprise: {
    name: "Resilience",
    fromINR: 24,
    starts: true,
    bestFor: "Full 24×7 SOC + threat intel",
    features: [
      "Everything in Operate",
      "L3 threat hunters + IR retainer",
      "Annual table-top + DR drill",
    ],
  },
  notes:
    "Indicative pricing in INR. Setup + 12-month operate is the most-asked combination. Custom blends available.",
};

const AUDIT_DEFAULT_INDIAN: PricingPackage = {
  starter: {
    name: "Compact",
    fromINR: 3,
    toINR: 6,
    bestFor: "Single domain · <500 users",
    features: [
      "Regulator-format report",
      "Findings register + closure plan",
      "Free 30-day retest",
    ],
  },
  standard: {
    name: "Standard",
    fromINR: 6,
    toINR: 12,
    bestFor: "Mid-market · multi-site",
    popular: true,
    features: [
      "Everything in Compact",
      "Onsite + remote sessions",
      "Inspector defence support",
    ],
  },
  enterprise: {
    name: "Enterprise",
    fromINR: 14,
    starts: true,
    bestFor: "Annual retainer · pan-India",
    features: [
      "Everything in Standard",
      "Quarterly mini-audits",
      "Dedicated empanelment letter pack",
    ],
  },
  notes:
    "Indicative pricing in INR. CERT-In empanelment letter included with every engagement.",
};

const AUDIT_DEFAULT_INTERNATIONAL: PricingPackage = {
  starter: {
    name: "Implementation",
    fromINR: 6,
    toINR: 12,
    bestFor: "First-time certification",
    features: [
      "Gap analysis + roadmap",
      "Policy + procedure pack",
      "Internal audit",
    ],
  },
  standard: {
    name: "Implementation + Audit",
    fromINR: 14,
    toINR: 22,
    bestFor: "End-to-end · cert in 16-22 wks",
    popular: true,
    features: [
      "Everything in Implementation",
      "Stage 1 + Stage 2 audit support",
      "Annual surveillance support",
    ],
  },
  enterprise: {
    name: "Multi-framework",
    fromINR: 26,
    starts: true,
    bestFor: "Combined ISO + SOC 2 + privacy",
    features: [
      "Everything in Implementation + Audit",
      "Shared evidence pack across frameworks",
      "Multi-year roadmap + advisory",
    ],
  },
  notes:
    "Indicative pricing in INR. Pricing varies by site count and ISMS scope.",
};

const AUDIT_DEFAULT_INDUSTRY: PricingPackage = {
  starter: {
    name: "Readiness",
    fromINR: 4,
    toINR: 8,
    bestFor: "Gap-analysis + roadmap",
    features: [
      "Framework gap analysis",
      "Remediation plan",
      "Internal audit dry run",
    ],
  },
  standard: {
    name: "Audit-Ready",
    fromINR: 10,
    toINR: 18,
    bestFor: "Annual audit cycle",
    popular: true,
    features: [
      "Everything in Readiness",
      "External auditor coordination",
      "Findings closure within 60 days",
    ],
  },
  enterprise: {
    name: "Programme",
    fromINR: 22,
    starts: true,
    bestFor: "Multi-year compliance",
    features: [
      "Everything in Audit-Ready",
      "Incident-response retainer",
      "Quarterly board reporting",
    ],
  },
  notes: "Indicative pricing in INR. Quotes finalised within 48-72 hours.",
};

const AUDIT_DEFAULT_FOUNDATIONAL: PricingPackage = {
  starter: {
    name: "Snapshot",
    fromINR: 2.5,
    toINR: 5,
    bestFor: "Quick maturity check",
    features: [
      "Targeted scope",
      "Executive briefing",
      "Top-10 risk register",
    ],
  },
  standard: {
    name: "Comprehensive",
    fromINR: 5,
    toINR: 10,
    bestFor: "Annual cybersecurity audit",
    popular: true,
    features: [
      "Multi-framework mapping",
      "Detailed findings + ETA per item",
      "Free retest",
    ],
  },
  enterprise: {
    name: "Continuous",
    fromINR: 12,
    starts: true,
    bestFor: "Quarterly + advisory",
    features: [
      "Everything in Comprehensive",
      "Quarterly mini-reviews",
      "Embedded advisory hours",
    ],
  },
  notes: "Indicative pricing in INR.",
};

/* ============================================================ */
/*  Service overrides                                            */
/* ============================================================ */

const SERVICE_OVERRIDES: Record<string, PricingPackage> = {
  "red-teaming": {
    starter: {
      name: "Scenario",
      fromINR: 6,
      toINR: 12,
      bestFor: "Single objective · 2-3 weeks",
      features: [
        "Phishing → workstation → AD",
        "Detection metrics report",
        "Purple-team debrief",
      ],
    },
    standard: {
      name: "Campaign",
      fromINR: 15,
      toINR: 25,
      bestFor: "Multi-objective · 4-6 weeks",
      popular: true,
      features: [
        "Everything in Scenario",
        "Multi-vector + opsec stealth",
        "Detection-engineering uplift",
      ],
    },
    enterprise: {
      name: "Annual",
      fromINR: 30,
      starts: true,
      bestFor: "Quarterly red + purple",
      features: [
        "Everything in Campaign",
        "Custom payloads + EDR evasion",
        "Quarterly TLP-Red engagements",
      ],
    },
    notes:
      "Indicative pricing in INR. NDA + RoE signed before any technical scoping.",
  },
  "digital-forensics-incident-response": {
    starter: {
      name: "Triage",
      fromINR: 3,
      toINR: 8,
      bestFor: "Single incident triage",
      features: [
        "Containment + evidence preservation",
        "RCA report",
        "Recovery checklist",
      ],
    },
    standard: {
      name: "Investigation",
      fromINR: 10,
      toINR: 20,
      bestFor: "Full forensic investigation",
      popular: true,
      features: [
        "Everything in Triage",
        "Disk + memory + cloud forensics",
        "Court-ready reporting",
      ],
    },
    enterprise: {
      name: "Retainer",
      fromINR: 18,
      starts: true,
      bestFor: "12-month IR retainer",
      features: [
        "Everything in Investigation",
        "1-hour SLA · 24×7 hotline",
        "Annual table-top exercises",
      ],
    },
    notes: "Indicative pricing in INR. Per-incident or annual retainer options.",
  },
};

/* ============================================================ */
/*  Audit overrides                                              */
/* ============================================================ */

const AUDIT_OVERRIDES: Record<string, PricingPackage> = {
  "iso-27001": {
    starter: {
      name: "Implementation",
      fromINR: 6,
      toINR: 10,
      bestFor: "≤200-employee SaaS · 16 wks",
      features: [
        "13+ policies + procedures",
        "Risk register + SoA",
        "Internal audit",
      ],
    },
    standard: {
      name: "Implementation + Cert",
      fromINR: 12,
      toINR: 20,
      bestFor: "Cert in 16-22 wks · all-in",
      popular: true,
      features: [
        "Everything in Implementation",
        "Stage 1 + Stage 2 support",
        "Annual surveillance support",
      ],
    },
    enterprise: {
      name: "Multi-site / Multi-framework",
      fromINR: 24,
      starts: true,
      bestFor: "ISO + SOC 2 + 27701 combined",
      features: [
        "Everything in Implementation + Cert",
        "Shared evidence across frameworks",
        "3-year roadmap",
      ],
    },
    notes:
      "Indicative pricing in INR. Pricing depends on ISMS scope and number of sites.",
  },
  "soc-2": {
    starter: {
      name: "Type 1",
      fromINR: 8,
      toINR: 14,
      bestFor: "First-time, point-in-time",
      features: [
        "Readiness + control build-out",
        "Internal audit",
        "CPA-firm coordination",
      ],
    },
    standard: {
      name: "Type 1 → Type 2",
      fromINR: 16,
      toINR: 26,
      bestFor: "Most common path",
      popular: true,
      features: [
        "Everything in Type 1",
        "12-month evidence collection",
        "Type 2 attestation",
      ],
    },
    enterprise: {
      name: "Annual + ISO 27001",
      fromINR: 30,
      starts: true,
      bestFor: "Combined SOC 2 + ISO",
      features: [
        "Everything in Type 1 → Type 2",
        "Shared evidence with ISO program",
        "Continuous monitoring playbook",
      ],
    },
    notes:
      "Indicative pricing in INR. Pricing depends on TSC categories in scope.",
  },
  "cert-in-empanelled-audit": {
    starter: {
      name: "Annual",
      fromINR: 4,
      toINR: 8,
      bestFor: "Single domain regulator audit",
      features: [
        "CERT-In empanelment letter",
        "Regulator-format report",
        "Free 30-day retest",
      ],
    },
    standard: {
      name: "Multi-regulator",
      fromINR: 10,
      toINR: 18,
      bestFor: "RBI + SEBI + CERT-In combined",
      popular: true,
      features: [
        "Everything in Annual",
        "Combined audit, single artefact",
        "Inspector defence support",
      ],
    },
    enterprise: {
      name: "Continuous",
      fromINR: 22,
      starts: true,
      bestFor: "Quarterly + advisory retainer",
      features: [
        "Everything in Multi-regulator",
        "Quarterly mini-audits",
        "Continuous CISO advisory",
      ],
    },
    notes:
      "Indicative pricing in INR. CERT-In empanelment letter supplied with every engagement.",
  },
};

/* ============================================================ */
/*  Resolver                                                     */
/* ============================================================ */

export type ServiceCategory =
  | "Offensive"
  | "Defensive"
  | "Compliance Adjacent";

export type AuditCategory =
  | "Indian Regulatory"
  | "International Standard"
  | "Industry & Privacy"
  | "Foundational";

export function getServicePricing(
  slug: string,
  category: ServiceCategory
): PricingPackage {
  return (
    SERVICE_OVERRIDES[slug] ??
    (category === "Defensive"
      ? SERVICE_DEFAULT_DEFENSIVE
      : SERVICE_DEFAULT_OFFENSIVE)
  );
}

export function getAuditPricing(
  slug: string,
  category: AuditCategory
): PricingPackage {
  if (AUDIT_OVERRIDES[slug]) return AUDIT_OVERRIDES[slug];
  switch (category) {
    case "Indian Regulatory":
      return AUDIT_DEFAULT_INDIAN;
    case "International Standard":
      return AUDIT_DEFAULT_INTERNATIONAL;
    case "Industry & Privacy":
      return AUDIT_DEFAULT_INDUSTRY;
    case "Foundational":
      return AUDIT_DEFAULT_FOUNDATIONAL;
  }
}
