import type { LucideIcon } from "lucide-react";
import {
  ShieldCheck,
  Landmark,
  ClipboardCheck,
  CreditCard,
  FileBadge,
  AlertTriangle,
  Cloud,
  Lock,
  Brain,
  Globe,
  Heart,
  BadgeCheck,
  TrendingUp,
  Receipt,
  Database,
  Building,
} from "lucide-react";

export type AuditCategory =
  | "Indian Regulatory"
  | "GCC Regulatory"
  | "International Standard"
  | "Industry & Privacy"
  | "Foundational";

export const AUDIT_CATEGORIES: AuditCategory[] = [
  "Indian Regulatory",
  "GCC Regulatory",
  "International Standard",
  "Industry & Privacy",
  "Foundational",
];

export interface Audit {
  /** ISO date of last meaningful content change (drives sitemap lastmod). */
  updated?: string;
  slug: string;
  title: string;
  shortTitle: string;
  icon: LucideIcon;
  iconName: string;
  authority?: boolean;
  category: AuditCategory;
  hero: {
    eyebrow: string;
    tagline: string;
    description: string;
  };
  whyItMatters: string;
  applicability: string[];
  frameworks: string[];
  methodology: { phase: string; activities: string[] }[];
  deliverables: string[];
  /**
   * Optional coverage pillars (workstreams inside the engagement).
   * When omitted, the audit deep-dive view derives pillars from `frameworks`.
   */
  pillars?: { title: string; blurb?: string; points: string[] }[];
  caseStudies: { industry: string; engagement: string; outcome: string }[];
  faqs: { q: string; a: string }[];
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

export const AUDITS: Audit[] = [
  // ====================================================================
  // FOUNDATIONAL
  // ====================================================================
  {
    slug: "cybersecurity-audit",
    title: "Cybersecurity Audit Services",
    shortTitle: "Cyber Audit",
    icon: ShieldCheck,
    iconName: "ShieldCheck",
    category: "Foundational",
    hero: {
      eyebrow: "Comprehensive Security Audits",
      tagline: "An honest mirror to your security posture.",
      description:
        "End-to-end cybersecurity audits covering technical controls, processes, governance and people. Designed to satisfy boards, regulators, certification bodies and enterprise customers in one engagement.",
    },
    whyItMatters:
      "Cybersecurity audits are the single most important evidence of security maturity for boards, regulators and B2B customers. A Macksofy audit goes beyond a control checklist — it tests controls, validates effectiveness and produces evidence acceptable for ISO 27001, SOC 2, CERT-In, RBI CSF and customer security questionnaires.",
    applicability: [
      "Annual board / audit committee reporting",
      "Pre-funding / pre-acquisition due diligence",
      "Enterprise customer security assessments (e.g. Microsoft SSPA, Google SAQ)",
      "ISO 27001 / SOC 2 internal audit",
    ],
    frameworks: [
      "NIST Cybersecurity Framework (CSF) 2.0",
      "ISO 27001:2022 Annex A",
      "CIS Controls v8",
      "RBI Cyber Security Framework (2016, updated)",
      "SEBI CSCRF",
      "UAE Information Assurance Standards (IAS)",
    ],
    methodology: [
      {
        phase: "1 · Scoping",
        activities: [
          "Asset + business process inventory",
          "Audit framework selection (NIST CSF / ISO / CIS)",
          "Stakeholder mapping",
        ],
      },
      {
        phase: "2 · Documentation review",
        activities: [
          "Policy, procedure, control documentation",
          "Risk register, asset register, third-party register",
          "Prior audit / incident review",
        ],
      },
      {
        phase: "3 · Technical testing",
        activities: [
          "VAPT (where in scope)",
          "Configuration audit (firewalls, AD, cloud)",
          "Log + monitoring efficacy review",
        ],
      },
      {
        phase: "4 · Process audit",
        activities: [
          "Change management, access management",
          "IR + BCP/DR testing evidence",
          "Vendor risk management",
        ],
      },
      {
        phase: "5 · Reporting",
        activities: [
          "Maturity scoring against framework",
          "Findings ranked by risk + remediation effort",
          "Roadmap to next maturity tier",
        ],
      },
    ],
    deliverables: [
      "Executive maturity report (board-ready)",
      "Detailed findings register with risk + ETA",
      "Remediation roadmap (12-month)",
      "Evidence pack for ISO / SOC 2 / customer audits",
      "Re-audit (closure) within 6 months — discounted",
    ],
    pillars: [
      {
        title: "Asset & data inventory",
        blurb: "The audit only goes as deep as your inventory does. We start by fixing the inventory.",
        points: [
          "Asset register across IT, OT, cloud, SaaS",
          "Data-flow + crown-jewel mapping",
          "Shadow-IT discovery",
        ],
      },
      {
        title: "Governance & policy",
        blurb: "Board-down accountability with operator-up evidence.",
        points: [
          "CISO charter + RACI",
          "Policy library currency & ownership",
          "Risk-committee minutes evidence",
        ],
      },
      {
        title: "Technical control posture",
        blurb: "Hands-on testing of what the policies say is in place.",
        points: [
          "Network segmentation + perimeter",
          "Identity, MFA, privileged access",
          "Endpoint, patch, anti-malware baseline",
        ],
      },
      {
        title: "Threat & vulnerability mgmt",
        blurb: "From discovery to closure — the lifecycle most audits skip.",
        points: [
          "VAPT + scanning cadence",
          "Vulnerability triage & SLA evidence",
          "Threat-intel ingestion + ATT&CK coverage",
        ],
      },
      {
        title: "Incident & response readiness",
        blurb: "How would you detect, contain, recover from a real incident next Tuesday?",
        points: [
          "SOC / MSSP coverage & runbooks",
          "IR plan + tabletop drill",
          "Backup, DR, communication plan",
        ],
      },
      {
        title: "Maturity roadmap",
        blurb: "Where you are today vs where you need to be in 12-24 months.",
        points: [
          "Heatmap vs NIST CSF + ISO 27001",
          "Top-10 prioritised actions",
          "Year-1 + Year-2 investment plan",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "Listed Pharma (India)",
        engagement: "Annual NIST CSF maturity audit",
        outcome:
          "Maturity moved from 'Tier 2 (Risk-Informed)' to 'Tier 3 (Repeatable)' inside 12 months",
      },
    ],
    faqs: [
      {
        q: "How long does an audit take?",
        a: "Typically 3–6 weeks for mid-market organizations, 6–12 weeks for larger or multi-site enterprises.",
      },
      {
        q: "Can we use the same audit for multiple frameworks?",
        a: "Yes — we map findings across NIST CSF, ISO 27001 and CIS in one engagement to maximize value.",
      },
    ],
    seoTitle:
      "Cybersecurity Audit Services in India | NIST + ISO + CIS | Macksofy",
    seoDescription:
      "End-to-end cybersecurity audit services in India. NIST CSF, ISO 27001, CIS Controls. CERT-In empanelled, board-ready reporting.",
    keywords: [
      "cybersecurity audit India",
      "cyber audit Mumbai",
      "NIST CSF audit India",
      "ISO 27001 internal audit India",
    ],
  },

  {
    slug: "compliance-audit",
    title: "Compliance & Regulatory Audits",
    shortTitle: "Compliance Audits",
    icon: ClipboardCheck,
    iconName: "ClipboardCheck",
    category: "Foundational",
    hero: {
      eyebrow: "Regulator-Ready · India + UAE",
      tagline: "Compliance, simplified.",
      description:
        "Single-engagement compliance audits across the regulations your business actually faces — Indian (CERT-In, RBI, SEBI, UIDAI, IRDAI), UAE (NESA, DESC, ADHICS, NHS), and global (ISO, SOC 2, GDPR, PCI-DSS).",
    },
    whyItMatters:
      "Compliance fatigue is real. Your fintech might face RBI + SEBI + PCI-DSS + ISO 27001 + customer security questionnaires simultaneously. Macksofy maps controls across frameworks once and produces evidence acceptable for all of them — saving months of redundant work.",
    applicability: [
      "Fintechs facing multiple Indian regulators",
      "SaaS companies entering enterprise / regulated markets",
      "Healthcare entities (Indian + UAE)",
      "UAE entities under NESA / DESC mandates",
      "Multinationals with India + UAE presence",
    ],
    frameworks: [
      "RBI Cyber Security Framework (2016, updated)",
      "SEBI CSCRF",
      "PCI-DSS v4.0",
      "ISO 27001:2022",
      "SOC 2 (Type 1 + Type 2)",
      "GDPR (Article 32 controls + DPIA)",
      "UAE NESA / IAS",
      "UAE DESC ISR",
      "Abu Dhabi Healthcare Information Cyber Security (ADHICS)",
    ],
    methodology: [
      {
        phase: "1 · Multi-framework gap analysis",
        activities: [
          "Map current controls to each in-scope framework",
          "Identify shared evidence opportunities",
          "Prioritize by deadline / business impact",
        ],
      },
      {
        phase: "2 · Remediation roadmap",
        activities: [
          "Single roadmap covering all frameworks",
          "Owner + ETA per finding",
          "Quick-win identification",
        ],
      },
      {
        phase: "3 · Implementation support",
        activities: [
          "Policy / procedure templates",
          "Control implementation guidance",
          "Evidence collection workflow",
        ],
      },
      {
        phase: "4 · Audit execution",
        activities: [
          "Internal audit per framework",
          "Evidence pack assembly",
          "Management response coordination",
        ],
      },
      {
        phase: "5 · Certification / submission",
        activities: [
          "Coordination with certification body / regulator",
          "External audit support (Stage 1 / Stage 2)",
          "Findings remediation + closure",
        ],
      },
    ],
    deliverables: [
      "Multi-framework gap analysis matrix",
      "Single remediation roadmap",
      "Policy + procedure templates",
      "Evidence pack per framework",
      "Audit execution + closure support",
    ],
    pillars: [
      {
        title: "Regulatory mapping",
        blurb: "We start with the regulator stack you actually answer to — not a generic checklist.",
        points: [
          "CERT-In, RBI, SEBI, IRDAI applicability",
          "Cross-border obligations (GDPR, DPDP, HIPAA)",
          "Sector overlays (PCI, ISO, SOC 2)",
        ],
      },
      {
        title: "Gap analysis",
        blurb: "What's in place, what's missing, what's mis-evidenced.",
        points: [
          "Control-by-control attestation review",
          "Evidence-completeness scoring",
          "Mis-classification & over-scope cleanup",
        ],
      },
      {
        title: "Control inventory",
        blurb: "A single control register that satisfies every framework in scope.",
        points: [
          "Unified control catalogue (one truth)",
          "Mapping to each regulator's clause IDs",
          "Owner + cadence + evidence pointer",
        ],
      },
      {
        title: "Remediation plan",
        blurb: "Realistic and prioritised — not a 400-row finding list nobody fixes.",
        points: [
          "Top-10 high-impact / low-effort",
          "Quarterly remediation roadmap",
          "Quick-win tracker for board updates",
        ],
      },
      {
        title: "Board & regulator reporting",
        blurb: "What you put in front of the board, the regulator, and the certification body.",
        points: [
          "Board-ready compliance dashboard",
          "Regulator-format submission packs",
          "External-audit handover bundle",
        ],
      },
      {
        title: "Continuous compliance",
        blurb: "Compliance is a state, not an event. We hand over the rhythm.",
        points: [
          "Self-attestation cadence + templates",
          "Control-drift monitoring playbook",
          "Annual review + freshness flagging",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "Fintech (Mumbai, RBI + PCI scope)",
        engagement: "Combined RBI + PCI-DSS audit",
        outcome:
          "Both submissions cleared in same quarter; saved ~40% effort vs sequential audits",
      },
    ],
    faqs: [
      {
        q: "Do you handle UAE compliance?",
        a: "Yes — NESA / IAS, DESC ISR, ADHICS for healthcare, and the standard ISO / SOC 2 audits for UAE entities.",
      },
    ],
    seoTitle: "Compliance & Regulatory Audit Services India + UAE | Macksofy",
    seoDescription:
      "Single-engagement compliance audits across CERT-In, RBI, SEBI, PCI-DSS, ISO 27001, SOC 2, GDPR, NESA. India + UAE.",
    keywords: [
      "compliance audit India",
      "regulatory audit UAE",
      "RBI compliance Mumbai",
      "NESA UAE compliance",
      "ISO 27001 + SOC 2 India",
    ],
  },

  {
    slug: "risk-assessment",
    title: "Cybersecurity Risk Assessment",
    shortTitle: "Risk Assessment",
    icon: AlertTriangle,
    iconName: "AlertTriangle",
    category: "Foundational",
    hero: {
      eyebrow: "Quantitative + Qualitative · Board-Ready",
      tagline: "Know what to fix first. With math.",
      description:
        "Cybersecurity risk assessment using quantitative methods (FAIR) and qualitative frameworks (ISO 27005, NIST 800-30). Outcome: a prioritized risk register your board can act on, not a 200-page document nobody reads.",
    },
    whyItMatters:
      "Most risk assessments produce paperwork, not decisions. Macksofy uses FAIR (Factor Analysis of Information Risk) to express risk in financial terms — letting you compare a $4M expected loss against a $200K control investment with executive clarity.",
    applicability: [
      "Boards needing quantitative risk for investment decisions",
      "M&A due diligence (target-side or acquirer-side)",
      "Pre-product-launch risk assessment",
      "Annual risk-register update (ISO 27001 / NIST CSF)",
      "Cyber insurance underwriting evidence",
    ],
    frameworks: [
      "FAIR (Factor Analysis of Information Risk)",
      "ISO 27005:2022",
      "NIST SP 800-30",
      "OCTAVE Allegro",
    ],
    methodology: [
      {
        phase: "1 · Scoping",
        activities: [
          "Asset + business process inventory",
          "Critical risk areas identification",
          "Quantitative vs qualitative scope split",
        ],
      },
      {
        phase: "2 · Threat modeling",
        activities: [
          "Threat actor profiles per industry / geography",
          "Attack scenario decomposition",
          "Kill chain mapping",
        ],
      },
      {
        phase: "3 · Risk analysis",
        activities: [
          "Loss event frequency (LEF) analysis",
          "Loss magnitude (LM) analysis",
          "Monte Carlo simulation for top scenarios",
        ],
      },
      {
        phase: "4 · Control evaluation",
        activities: [
          "Existing control efficacy review",
          "Residual risk calculation",
          "Investment ROI for new controls",
        ],
      },
      {
        phase: "5 · Reporting",
        activities: [
          "Quantified risk register (FAIR-aligned)",
          "Top-10 risk briefing for board",
          "Investment-prioritization matrix",
        ],
      },
    ],
    deliverables: [
      "FAIR-quantified risk register",
      "Board-level executive briefing",
      "Investment prioritization matrix (ROI by control)",
      "Tabletop scenarios (top 3 risks)",
      "Annual update playbook",
    ],
    pillars: [
      {
        title: "Asset & process inventory",
        blurb: "You cannot rank risk on assets you do not know exist.",
        points: [
          "Critical business-process catalogue",
          "Asset → process → data linkage",
          "Crown-jewel + revenue-impact ranking",
        ],
      },
      {
        title: "Threat & vulnerability ID",
        blurb: "Threat-modelling married to your real attack surface.",
        points: [
          "STRIDE / PASTA threat models",
          "MITRE ATT&CK technique applicability",
          "Vulnerability + misconfig baseline",
        ],
      },
      {
        title: "Impact & likelihood scoring",
        blurb: "Quantified where possible, qualitative where appropriate.",
        points: [
          "Quantitative risk (₹ revenue / penalty exposure)",
          "Qualitative likelihood (CIS-RAM aligned)",
          "Sensitivity / what-if scenarios",
        ],
      },
      {
        title: "Treatment plan",
        blurb: "Treat / transfer / accept / avoid — with evidence behind each call.",
        points: [
          "Per-risk treatment decision + owner",
          "Control selection + effort estimate",
          "Insurance & contractual transfer review",
        ],
      },
      {
        title: "Residual risk acceptance",
        blurb: "Documented sign-off so the board has clarity, not surprises.",
        points: [
          "Residual risk register + tolerance bands",
          "Executive / board sign-off pack",
          "Trigger conditions for re-assessment",
        ],
      },
      {
        title: "Continuous monitoring",
        blurb: "Risk is dynamic — your view of it should be too.",
        points: [
          "KRI / KPI dashboard",
          "Quarterly recalibration cadence",
          "Material-change re-assessment trigger",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "Listed Indian Bank",
        engagement: "Annual board-level risk assessment",
        outcome:
          "Quantified annual loss expectancy enabled $3M cyber-insurance premium negotiation",
      },
    ],
    faqs: [
      {
        q: "Do you use FAIR exclusively?",
        a: "We default to FAIR for quantitative scenarios and ISO 27005 / NIST 800-30 for qualitative scope. Mix depends on stakeholder needs.",
      },
    ],
    seoTitle:
      "Cybersecurity Risk Assessment Services India | FAIR + ISO 27005 | Macksofy",
    seoDescription:
      "Quantitative cybersecurity risk assessment using FAIR + ISO 27005 + NIST 800-30. Board-ready quantified risk register. India + UAE.",
    keywords: [
      "cybersecurity risk assessment India",
      "FAIR risk assessment",
      "ISO 27005 India",
      "cyber risk quantification",
    ],
  },

  // ====================================================================
  // INDIAN REGULATORY
  // ====================================================================
  {
    slug: "cert-in-empanelled-audit",
    title: "CERT-In Empanelled Audit",
    shortTitle: "CERT-In Audit",
    icon: Landmark,
    iconName: "Landmark",
    authority: true,
    category: "Indian Regulatory",
    hero: {
      eyebrow: "Government of India · MeitY · CERT-In Empanelled",
      tagline: "The audit your regulator will accept on the first read.",
      description:
        "Macksofy is empanelled by the Indian Computer Emergency Response Team (CERT-In) under the Ministry of Electronics and Information Technology. Our audits are accepted by SEBI, RBI, UIDAI, IRDAI, payment system operators and every major Indian regulator and certification body — without rework.",
    },
    whyItMatters:
      "CERT-In empanelment is the gold standard for cybersecurity auditors in India. For BFSI entities, payment aggregators, government contractors, regulated fintechs and any organization handling sensitive Indian data, a CERT-In empanelled audit is the only one that satisfies regulator inspection. Macksofy holds active empanelment with the requisite scope to perform information security audits.",
    applicability: [
      "BFSI: Banks, NBFCs, brokers, AMCs, custodians, RTAs, RIAs",
      "Payment Aggregators / Payment Gateways (RBI authorized)",
      "Government / PSU IT systems (annual audits)",
      "UIDAI Aadhaar ecosystem entities (AUAs, KUAs, ASAs)",
      "Critical Information Infrastructure (CII) per CERT-In",
      "Healthcare entities (NDHM / ABDM)",
    ],
    frameworks: [
      "CERT-In Information Security Audit Scope",
      "RBI Cyber Security Framework (2016, updates)",
      "SEBI Cybersecurity & Cyber Resilience Framework (CSCRF)",
      "UIDAI Aadhaar Authentication Operating Model",
      "Indian IT Act 2000 + Rules",
      "Cyber Crisis Management Plan (CCMP)",
    ],
    methodology: [
      {
        phase: "1 · Empanelment letter + scoping",
        activities: [
          "CERT-In empanelment confirmation to client",
          "Scope per regulator requirement (e.g., RBI System Audit Report)",
          "Engagement letter + RoE",
        ],
      },
      {
        phase: "2 · Technical audit (VAPT)",
        activities: [
          "Annual VAPT per regulator schedule",
          "Network, application, mobile, cloud as applicable",
          "Manual exploitation of high-severity findings",
        ],
      },
      {
        phase: "3 · Process + governance audit",
        activities: [
          "Information security policy review",
          "Access management, change management",
          "Incident response evidence",
          "Third-party risk management",
        ],
      },
      {
        phase: "4 · Compliance attestation",
        activities: [
          "Mapping to specific regulator framework",
          "Gap identification + closure plan",
          "Management acceptance + risk treatment",
        ],
      },
      {
        phase: "5 · Regulator-format report",
        activities: [
          "CERT-In format report",
          "RBI System Audit Report (where applicable)",
          "SEBI cybersecurity attestation (where applicable)",
        ],
      },
      {
        phase: "6 · Closure + retest",
        activities: [
          "Free retest of remediated findings within 30 days",
          "Final closure letter + Macksofy attestation",
          "Ongoing advisory included in engagement",
        ],
      },
    ],
    deliverables: [
      "CERT-In empanelment letter for the engagement",
      "Audit report in regulator-prescribed format",
      "Findings register with risk + ETA + management response",
      "Free retest of remediated findings",
      "Closure letter / Macksofy attestation",
      "Ongoing advisory for regulator inspections",
    ],
    pillars: [
      {
        title: "Governance & policy review",
        blurb: "Board-level accountability through to operator-level execution.",
        points: [
          "InfoSec policy, charter, RACI",
          "Risk-management framework alignment",
          "Asset & data classification review",
        ],
      },
      {
        title: "Technical security audit",
        blurb: "Hands-on testing against the production estate — not a paper review.",
        points: [
          "External + internal VAPT in CERT-In format",
          "Configuration & patch-management evidence",
          "Vulnerability backlog with CVSS 3.1 + remediation effort",
        ],
      },
      {
        title: "Incident-response readiness",
        blurb: "Validating that CERT-In's 6-hour reporting rule actually fires.",
        points: [
          "IR plan + playbook walk-through",
          "Detection-and-response capability assessment",
          "CERT-In incident-reporting drill",
        ],
      },
      {
        title: "Third-party & supply chain",
        blurb: "Vendor and cloud-provider exposure mapped end to end.",
        points: [
          "Vendor security questionnaire & contract review",
          "Cloud-shared-responsibility evidence",
          "Critical SaaS dependency mapping",
        ],
      },
      {
        title: "Audit pack & evidence",
        blurb: "Submission-ready artefacts in the format CERT-In actually reads.",
        points: [
          "CERT-In format executive + technical report",
          "Evidence vault keyed to control statements",
          "Remediation tracker + 30-day retest letter",
        ],
      },
      {
        title: "Continuous monitoring uplift",
        blurb: "What you keep running once the audit ships.",
        points: [
          "SOC use-case backlog seeded from audit findings",
          "Quarterly self-attestation template",
          "Year-2 readiness roadmap",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "RBI-regulated Stock Broker (Mumbai)",
        engagement: "Annual System Audit Report",
        outcome:
          "Submitted to SEBI in CERT-In format inside 12 working days; zero rework",
      },
      {
        industry: "Payment Aggregator (RBI-authorized)",
        engagement: "Annual cybersecurity audit per RBI guidelines",
        outcome: "All controls validated; remediation closed within 60 days",
      },
    ],
    faqs: [
      {
        q: "Are you currently CERT-In empanelled?",
        a: "Yes — Macksofy Technologies holds active CERT-In empanelment for information security audits in India. Empanelment letter is provided at engagement kickoff.",
      },
      {
        q: "Can you handle the full RBI System Audit Report (SAR)?",
        a: "Yes — Macksofy regularly delivers SARs for RBI-regulated entities including NBFCs, payment aggregators and stock brokers, in the format SEBI / RBI accept.",
      },
      {
        q: "What about UIDAI / Aadhaar audits?",
        a: "We perform AUA / KUA / ASA audits per the UIDAI Aadhaar Authentication Operating Model.",
      },
      {
        q: "What is your turnaround for last-minute regulatory deadlines?",
        a: "We can compress engagements for last-minute deadlines (within 15–25 working days for typical scopes). Talk to us — we've helped clients meet 30-day-out RBI / SEBI deadlines successfully.",
      },
    ],
    seoTitle: "CERT-In Empanelled Auditor in India | Macksofy Technologies",
    seoDescription:
      "Macksofy is a CERT-In empanelled Information Security Auditor. RBI System Audit Reports, SEBI cybersecurity attestation, UIDAI audits. Mumbai HQ.",
    keywords: [
      "CERT-In empanelled auditor",
      "CERT-In auditor India",
      "CERT-In empanelment Mumbai",
      "RBI system audit report",
      "SEBI cybersecurity audit",
      "UIDAI audit",
    ],
  },

  {
    slug: "rbi-csf",
    title: "RBI Cyber Security Framework Audit",
    shortTitle: "RBI CSF",
    icon: Landmark,
    iconName: "Landmark",
    category: "Indian Regulatory",
    hero: {
      eyebrow: "Reserve Bank of India · Banks · NBFCs · UCBs · Payment Operators",
      tagline:
        "End-to-end RBI CSF audit — control assessment, SAR drafting, inspector defence.",
      description:
        "Full RBI Cyber Security Framework audit for scheduled commercial banks, cooperative banks, NBFCs, payment aggregators, prepaid wallets and authorised payment system operators. Covers the 2016 framework, IT Examination 2020 and 2024 master directions on IT governance.",
    },
    whyItMatters:
      "RBI penalties for cyber-non-compliance crossed ₹100 crore across 2023–25. Inspections have moved from paper review to live evidence walks. Macksofy's CERT-In empanelled team conducts RBI CSF audits the way RBI inspectors will read them — control statements, technical evidence, and SAR-format submission packs that don't trigger follow-up queries.",
    applicability: [
      "Scheduled Commercial Banks · Public, Private, Foreign",
      "Urban Cooperative Banks (UCBs) — graded 4-tier framework",
      "NBFC-Upper / Middle / Base layer per Scale-Based Regulation",
      "Payment Aggregators + Payment Gateways (RBI authorisation)",
      "Prepaid Payment Instrument (PPI) issuers",
      "White Label ATM operators · ATM service providers",
    ],
    frameworks: [
      "RBI Cyber Security Framework for Banks (June 2016)",
      "RBI Master Direction on IT Governance, Risk, Controls and Assurance Practices (2023)",
      "RBI Master Direction on Outsourcing of IT Services (2023)",
      "RBI Cooperative Bank IT Framework (4-tier)",
      "Cyber Crisis Management Plan (CCMP)",
      "RBI Digital Lending Guidelines (Sept 2022)",
    ],
    methodology: [
      {
        phase: "1 · Scoping + asset register",
        activities: [
          "Tier classification (UCB tiers / NBFC layers)",
          "Critical Information Infrastructure scoping",
          "CISO + Board IT Strategy Committee engagement",
        ],
      },
      {
        phase: "2 · Control assessment",
        activities: [
          "Baseline cyber security controls (Annex-1)",
          "Cyber resilience controls",
          "Cyber incident reporting (CSITE Cell)",
          "Vendor + third-party risk",
        ],
      },
      {
        phase: "3 · Technical validation",
        activities: [
          "Annual VAPT — internal, external, application",
          "Network segmentation + DMZ review",
          "ATM, NEFT, RTGS, IMPS, UPI environment testing",
          "Cloud + DC/DR testing",
        ],
      },
      {
        phase: "4 · System Audit Report drafting",
        activities: [
          "RBI prescribed SAR format",
          "Findings register with severity + risk acceptance",
          "Compliance with each control of CSF",
        ],
      },
      {
        phase: "5 · Submission + inspector support",
        activities: [
          "Submission to CSITE / Department of Supervision",
          "On-site inspector queries support",
          "Closure of remediation + revalidation",
        ],
      },
    ],
    deliverables: [
      "Macksofy CERT-In empanelment letter",
      "RBI System Audit Report (SAR) in prescribed format",
      "Findings register mapped to CSF Annex-1 / Annex-2",
      "Cyber Crisis Management Plan template (where missing)",
      "Free retest within 30 days · regulator-acceptable closure letter",
      "RBI inspector / IT Examination defence support",
    ],
    pillars: [
      {
        title: "Governance & oversight",
        blurb: "Board, IT-Strategy and Risk-Committee accountability validated against RBI expectations.",
        points: [
          "Board-approved cyber-security policy review",
          "CISO charter + reporting lines",
          "Cyber-risk metrics presented at board level",
        ],
      },
      {
        title: "Baseline cyber-security controls",
        blurb: "All 21 baseline RBI CSF controls walked end-to-end with technical evidence.",
        points: [
          "Network segmentation + secure architecture",
          "Patch-management + vulnerability lifecycle",
          "Privileged-access management & MFA",
        ],
      },
      {
        title: "Advanced threat-defence",
        blurb: "RBI's expectation for systemically-important banks — moving beyond baseline.",
        points: [
          "EDR + 24×7 SOC capability evidence",
          "Threat-intel ingestion & ATT&CK coverage",
          "Anti-phishing + DMARC enforcement",
        ],
      },
      {
        title: "Operational resilience",
        blurb: "Withstand and recover from a major cyber event without breaching customer SLAs.",
        points: [
          "BCP / DR with declared RTO + RPO",
          "Cyber-incident drill (table-top + technical)",
          "Crisis-communications playbook",
        ],
      },
      {
        title: "Customer-data protection",
        blurb: "What RBI inspectors care about most: where customer data lives and how it moves.",
        points: [
          "Data localisation evidence (RBI Apr 2018)",
          "Encryption-at-rest and in-transit posture",
          "Outsourcing & cloud due-diligence pack",
        ],
      },
      {
        title: "RBI-format submission pack",
        blurb: "Artefacts assembled exactly the way RBI inspections consume them.",
        points: [
          "Control-statement to evidence map",
          "SAR-compatible findings register",
          "Inspector Q&A walk-through deck",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "Urban Cooperative Bank (Western India)",
        engagement: "Tier-2 UCB annual CSF audit + SAR",
        outcome:
          "RBI inspection cleared with zero major findings; Tier-3 controls validated 8 months ahead of mandate",
      },
      {
        industry: "NBFC-Upper Layer (listed)",
        engagement: "IT governance + cyber resilience audit",
        outcome:
          "Board reporting cycle compressed from quarterly to monthly with automated control evidence",
      },
    ],
    faqs: [
      {
        q: "How often do RBI-regulated entities need CSF audit?",
        a: "Annual minimum. Larger banks run quarterly internal + annual external. NBFCs under Scale-Based Regulation tier their cycle by layer.",
      },
      {
        q: "Do you support cooperative banks under the new 4-tier framework?",
        a: "Yes — across all four tiers, with controls scaled to tier-appropriate budget and team size.",
      },
      {
        q: "What about the new Master Direction on IT Governance (2023)?",
        a: "Fully integrated into our methodology — board IT Strategy Committee, CISO independence, IT steering committee evidence and audit committee reporting.",
      },
    ],
    seoTitle:
      "RBI Cyber Security Framework Audit | Banks, NBFCs, PA-PGs | Macksofy",
    seoDescription:
      "CERT-In empanelled RBI CSF audit for banks, UCBs, NBFCs, payment aggregators. System Audit Report drafting + RBI inspector support. India.",
    keywords: [
      "RBI CSF audit India",
      "RBI System Audit Report",
      "RBI cyber security framework audit Mumbai",
      "UCB cyber audit",
      "NBFC IT governance audit",
      "payment aggregator RBI audit",
    ],
  },

  {
    slug: "sebi-cscrf",
    title: "SEBI CSCRF Audit",
    shortTitle: "SEBI CSCRF",
    icon: TrendingUp,
    iconName: "TrendingUp",
    category: "Indian Regulatory",
    hero: {
      eyebrow: "SEBI Cybersecurity & Cyber Resilience Framework",
      tagline: "CSCRF audit for stock brokers, depository participants, AMCs.",
      description:
        "SEBI's CSCRF (effective 2025) consolidates earlier circulars into a single framework graded by entity type and size. Macksofy delivers full CSCRF audit + cyber resilience assessment + System Audit submission for SEBI-regulated entities.",
    },
    whyItMatters:
      "CSCRF replaces SEBI's 2015–2022 cybersecurity circulars with a unified, graded framework. Every regulated entity now sits in one of five categories — Market Infrastructure Institutions, Qualified REs, Mid-size REs, Small REs, Self-certification REs — with controls calibrated to scale. Non-compliance attracts SEBI penalties under Sections 11/15HA. Macksofy's CSCRF audit ships in a format SEBI's IT department reads in days, not weeks.",
    applicability: [
      "Stock Exchanges, Clearing Corporations, Depositories (MIIs)",
      "Stock Brokers + Depository Participants (Qualified / Mid-size / Small)",
      "Asset Management Companies + Mutual Fund RTAs",
      "Custodians, Portfolio Managers, RIAs",
      "Investment Bankers, Merchant Bankers",
      "Alternative Investment Funds (AIFs)",
    ],
    frameworks: [
      "SEBI CSCRF (Cybersecurity & Cyber Resilience Framework, 2024)",
      "SEBI Cybersecurity Circular 2015 (legacy controls retained)",
      "CERT-In Information Security Audit",
      "ISO 27001:2022 (mapped to CSCRF)",
      "NIST Cybersecurity Framework 2.0",
    ],
    methodology: [
      {
        phase: "1 · Categorisation + scoping",
        activities: [
          "Determine RE category (MII / Qualified / Mid-size / Small / SC)",
          "Scoped controls from CSCRF Annexure",
          "Cyber resilience baseline assessment",
        ],
      },
      {
        phase: "2 · Control assessment",
        activities: [
          "Identify · Protect · Detect · Respond · Recover (NIST CSF aligned)",
          "Cyber Capability Index (CCI) computation",
          "Cyber Resilience Maturity Model (CRMM) scoring",
        ],
      },
      {
        phase: "3 · Technical testing",
        activities: [
          "VAPT covering trading + back-office systems",
          "DR drill validation + recovery time evidence",
          "Cloud + colocation environment testing",
          "API gateway + customer-facing surface",
        ],
      },
      {
        phase: "4 · Reporting",
        activities: [
          "SEBI System Audit Report (CSCRF format)",
          "CCI score + CRMM tier report",
          "Quarterly compliance certificate",
        ],
      },
      {
        phase: "5 · Submission + advisory",
        activities: [
          "Submission to SEBI / MII as applicable",
          "Board / Audit Committee briefing",
          "Annual surveillance + change-event re-audit",
        ],
      },
    ],
    deliverables: [
      "CSCRF Annexure-mapped findings register",
      "Cyber Capability Index (CCI) score sheet",
      "Cyber Resilience Maturity Model (CRMM) tier report",
      "SEBI-format System Audit Report",
      "Quarterly compliance certificate template",
      "Free retest within 30 days · SEBI inspector support",
    ],
    pillars: [
      {
        title: "Governance & cyber-risk management",
        blurb: "Board, MD/CEO and CISO accountability lined up to SEBI CSCRF clauses.",
        points: [
          "Cyber-security & cyber-resilience policy review",
          "CSC / CRC committee minutes evidence",
          "Annual self-assessment + board-approved risk register",
        ],
      },
      {
        title: "Identify & inventory",
        blurb: "What SEBI auditors check first — completeness of the protected asset list.",
        points: [
          "Critical-systems inventory keyed to business processes",
          "Data classification + ownership matrix",
          "Third-party / vendor / DP / RTA dependency map",
        ],
      },
      {
        title: "Protect & detect",
        blurb: "The technical-control evidence that CSCRF inspections actually consume.",
        points: [
          "Network segmentation + DMZ posture",
          "EDR / SIEM coverage on critical systems",
          "VAPT + secure-SDLC artefacts",
        ],
      },
      {
        title: "Respond & recover",
        blurb: "Cyber-incident & recovery capabilities mapped to the SEBI CSCRF lifecycle.",
        points: [
          "Cyber-IR playbook + escalation matrix",
          "DR / BCP drill evidence (RTO/RPO recorded)",
          "Major-incident communication to SEBI",
        ],
      },
      {
        title: "Outsourcing & third-party",
        blurb: "Where most CSCRF gaps actually surface — cloud, MII, RTA, custodian linkages.",
        points: [
          "Vendor-risk classification (critical / non-critical)",
          "Cloud + DR-site security audits",
          "MII / Depository / Exchange interface review",
        ],
      },
      {
        title: "Reporting & assurance",
        blurb: "What you submit, when, and in which format — preserved for inspectors.",
        points: [
          "Quarterly SAR + cyber-resilience reports",
          "Half-yearly compliance status to board",
          "Annual third-party CSCRF audit pack",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "Stock Broker (Mid-size RE, Mumbai)",
        engagement: "First CSCRF audit + transition from 2015 circular",
        outcome:
          "Submitted in CSCRF format ahead of go-live; CCI score 78 / 100; zero penalty",
      },
      {
        industry: "AMC (Top-10 by AUM)",
        engagement: "Annual CSCRF + DR drill validation",
        outcome:
          "DR RTO reduced from 6h to 90 min; CRMM tier moved from Bronze to Silver",
      },
    ],
    faqs: [
      {
        q: "When does CSCRF become mandatory?",
        a: "CSCRF is effective in phases through 2025. Qualified REs and MIIs first; Mid-size and Small REs thereafter. Self-certification REs need a Macksofy review for the self-attestation.",
      },
      {
        q: "What's the difference between CSCRF and the old 2015 circular?",
        a: "CSCRF is graded by entity size, adds resilience metrics (RTO/RPO drills), introduces CCI / CRMM scoring, and requires explicit board accountability — far beyond the 2015 controls list.",
      },
      {
        q: "Can a single audit cover SEBI + RBI for a fintech holding both licences?",
        a: "Yes — we deliver a single combined engagement that produces both SEBI CSCRF and RBI SAR submissions, sharing 60–70% of the underlying evidence.",
      },
    ],
    seoTitle: "SEBI CSCRF Audit | Stock Broker · DP · AMC · MII | Macksofy",
    seoDescription:
      "CSCRF audit by CERT-In empanelled Macksofy. CCI + CRMM scoring, SEBI System Audit Report, DR drill validation. Stock brokers, AMCs, MIIs.",
    keywords: [
      "SEBI CSCRF audit",
      "CSCRF compliance India",
      "SEBI cybersecurity audit Mumbai",
      "stock broker cybersecurity audit",
      "AMC SEBI audit",
      "Cyber Capability Index",
    ],
  },

  {
    slug: "sebi-sar",
    title: "SEBI System Audit Report (SAR)",
    shortTitle: "SEBI SAR",
    icon: Receipt,
    iconName: "Receipt",
    category: "Indian Regulatory",
    hero: {
      eyebrow: "Annual System Audit · CERT-In Empanelled",
      tagline:
        "The half-yearly / annual SAR your stock broker or DP can submit on the first read.",
      description:
        "Stock brokers and depository participants submit System Audit Reports to SEBI on a defined cycle. Macksofy delivers SARs that survive SEBI inspection because we draft them the way SEBI's auditors and inspection teams read them.",
    },
    whyItMatters:
      "Brokers receive SEBI penalty notices for SAR submissions that miss findings, fail to evidence remediation, or use the wrong format. Macksofy ships SARs that hit SEBI's prescribed structure verbatim, with technical evidence attached and a closure trail that addresses the most-asked SEBI inspection questions in advance.",
    applicability: [
      "Trading members / clearing members / depository participants",
      "Qualified REs (Type-A / Type-B brokers)",
      "Stock brokers under SEBI's enhanced supervision",
      "Mutual Fund Distributors (where applicable)",
      "Research analysts + Investment advisors above threshold",
    ],
    frameworks: [
      "SEBI SAR Format (annexures)",
      "SEBI CSCRF (2024)",
      "SEBI Cybersecurity Circular 2015 (transition mapping)",
      "Stock Exchange / Clearing Corp inspection format",
      "CERT-In empanelment requirement",
    ],
    methodology: [
      {
        phase: "1 · SAR cycle scoping",
        activities: [
          "Half-yearly / annual cycle confirmation",
          "Auditable controls per SEBI annexures",
          "Asset + critical-system inventory",
        ],
      },
      {
        phase: "2 · Audit execution",
        activities: [
          "Trading platform + RMS audit",
          "Order management + risk management evidence",
          "Algo trading + DMA controls (where applicable)",
          "Customer-facing portal + KYC pipeline",
        ],
      },
      {
        phase: "3 · Cybersecurity domain",
        activities: [
          "VAPT external + internal",
          "Phishing / social engineering test (annual)",
          "Privileged access + segregation review",
          "Data leak + log retention audit",
        ],
      },
      {
        phase: "4 · SAR drafting",
        activities: [
          "SEBI prescribed annexure format",
          "Severity-graded findings",
          "Management responses + closure ETA",
          "Auditor opinion + signature",
        ],
      },
      {
        phase: "5 · Submission + closure",
        activities: [
          "Submission via member portal",
          "Stock Exchange / Clearing Corp queries",
          "Closure validation + sign-off",
        ],
      },
    ],
    deliverables: [
      "SEBI-format System Audit Report (annexure-compliant)",
      "Findings register with management response per finding",
      "Cybersecurity audit annexure",
      "Operational risk audit annexure",
      "Auditor opinion letter (CERT-In empanelment cited)",
      "Free retest within 30 days · closure letter",
    ],
    pillars: [
      {
        title: "SAR scope per SEBI circular",
        blurb: "We map the SAR exactly to the SEBI circular applicable to your entity class.",
        points: [
          "MII / Stock-Exchange / Depository / DP scope",
          "AMC / Broker / RIA / RTA scope",
          "Customised system & data inventory",
        ],
      },
      {
        title: "IT governance review",
        blurb: "Where SEBI inspectors usually pull the thread first.",
        points: [
          "IT-strategy + steering-committee evidence",
          "Policy currency + board approval trail",
          "CISO / CTO charter + reporting lines",
        ],
      },
      {
        title: "Application & infra controls",
        blurb: "The technical-control evidence SEBI SAR submissions hinge on.",
        points: [
          "Trading / DP / RTA application review",
          "Network segmentation + DMZ posture",
          "Database / endpoint / patch posture",
        ],
      },
      {
        title: "Change & incident management",
        blurb: "The two areas where SEBI most often raises observations.",
        points: [
          "Change-control gating evidence",
          "Major-incident root cause + SEBI notice",
          "Post-mortem + corrective-action log",
        ],
      },
      {
        title: "BCP / DR",
        blurb: "Live drill evidence, declared RTO / RPO, recovery proof.",
        points: [
          "Cyber-incident DR drill record",
          "Site-shift drill + RTO/RPO actuals",
          "Alternate-site readiness attestation",
        ],
      },
      {
        title: "SAR submission pack",
        blurb: "Assembled in SEBI's preferred submission format.",
        points: [
          "SAR cover letter + executive summary",
          "Control register keyed to SEBI clauses",
          "Observation register + remediation tracker",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "Top-50 Stock Broker (Mumbai)",
        engagement: "Half-yearly SAR (first cycle post-CSCRF)",
        outcome:
          "Submitted within SEBI deadline; zero SEBI clarification queries returned",
      },
    ],
    faqs: [
      {
        q: "What is the SAR submission cycle for stock brokers?",
        a: "Half-yearly for Type-A members, annual for Type-B. Specific dates depend on member category and stock exchange.",
      },
      {
        q: "Do SAR auditors need to be CERT-In empanelled?",
        a: "For most categories, yes — Macksofy is CERT-In empanelled and provides the empanelment letter as part of the SAR submission.",
      },
      {
        q: "How is SAR different from CSCRF audit?",
        a: "CSCRF is the framework. SAR is the artefact your broker / DP submits to SEBI on cycle. CSCRF audit findings feed directly into SAR.",
      },
    ],
    seoTitle:
      "SEBI System Audit Report (SAR) | Stock Broker DP Audit | Macksofy",
    seoDescription:
      "CERT-In empanelled SEBI SAR audit and submission for stock brokers, DPs, AMCs. Half-yearly + annual cycles. Mumbai HQ.",
    keywords: [
      "SEBI SAR audit",
      "SEBI System Audit Report",
      "stock broker SAR India",
      "depository participant audit",
      "SEBI member audit",
    ],
  },

  {
    slug: "irdai-compliance",
    title: "IRDAI Information Security Audit",
    shortTitle: "IRDAI Audit",
    icon: Heart,
    iconName: "Heart",
    category: "Indian Regulatory",
    hero: {
      eyebrow: "Insurance Regulatory · IRDAI Cyber Crisis Management",
      tagline: "IRDAI compliance for insurers, brokers, web aggregators, TPAs.",
      description:
        "End-to-end audit per IRDAI's Information & Cyber Security Guidelines (2023). Insurance regulators require annual + event-driven audits across insurers, intermediaries, web aggregators and TPAs — Macksofy delivers them all with a single engagement.",
    },
    whyItMatters:
      "IRDAI Cyber Security Guidelines (2023) cover not just IT controls but governance, third-party risk and incident reporting within 6 hours of detection. Insurance entities face sanctions including licence suspension for material non-compliance. Macksofy's IRDAI audit team includes auditors who have delivered to top private and PSU insurers across India.",
    applicability: [
      "Life + general + health insurers (Indian + foreign)",
      "Reinsurers operating in India",
      "Insurance brokers + corporate agents",
      "Web aggregators (PoS / IMF)",
      "Third-Party Administrators (TPAs)",
      "Insurance marketing firms",
    ],
    frameworks: [
      "IRDAI Information & Cyber Security Guidelines (2023)",
      "IRDAI Cyber Crisis Management Plan",
      "Insurance Act + IRDAI Regulations",
      "CERT-In Empanelment requirement",
      "ISO 27001:2022 (mapped controls)",
      "DPDP Act 2023 (overlap with privacy)",
    ],
    methodology: [
      {
        phase: "1 · Scoping",
        activities: [
          "Insurer category (life / general / health / reinsurer)",
          "Distribution channel inventory (online / agents / corporate)",
          "TPA + claim processing surface",
        ],
      },
      {
        phase: "2 · Governance audit",
        activities: [
          "Board IT / Information Security Committee evidence",
          "CISO independence + reporting line",
          "Risk Management Committee artefacts",
        ],
      },
      {
        phase: "3 · Technical audit",
        activities: [
          "VAPT — policy admin, claims, customer portals, mobile",
          "Underwriting + actuarial system controls",
          "Aadhaar e-KYC integration audit",
          "Payment + premium collection security",
        ],
      },
      {
        phase: "4 · Privacy + DPDP overlap",
        activities: [
          "Personal sensitive data inventory (medical, financial)",
          "DPDP consent + breach notification readiness",
          "Cross-border transfer review (reinsurer / Big-4 audits)",
        ],
      },
      {
        phase: "5 · IRDAI report + submission",
        activities: [
          "IRDAI prescribed audit format",
          "Cyber Crisis Management Plan validation",
          "6-hour incident reporting playbook",
        ],
      },
    ],
    deliverables: [
      "IRDAI-format audit report",
      "Cyber Crisis Management Plan (template + validation)",
      "Findings register · severity · ETA · management response",
      "DPDP overlap remediation plan",
      "IRDAI inspector support package",
      "Free retest within 30 days · closure letter",
    ],
    pillars: [
      {
        title: "IRDAI cyber framework alignment",
        blurb: "The IRDAI 2017 cyber-security framework + 2022 ISNP refresh.",
        points: [
          "31-control board-approved policy review",
          "CISO appointment + reporting evidence",
          "Annual self-assessment to IRDAI",
        ],
      },
      {
        title: "Information & cyber security audit",
        blurb: "What IRDAI inspections actually test on the ground.",
        points: [
          "Policyholder-data protection posture",
          "PII / financial-data encryption evidence",
          "Insurance-application secure-SDLC",
        ],
      },
      {
        title: "Outsourcing & cloud",
        blurb: "The vendor-risk angle IRDAI cares about more than most regulators realise.",
        points: [
          "Outsourcing-policy + vendor-risk register",
          "Cloud due-diligence + data-residency",
          "Sub-processor + access-management",
        ],
      },
      {
        title: "Business continuity & DR",
        blurb: "Continuity expectations on insurance ops + claims processing.",
        points: [
          "BCP plan + drill evidence",
          "Claims-processing recovery RTO/RPO",
          "Customer-communication playbook",
        ],
      },
      {
        title: "Reporting & disclosure",
        blurb: "What you tell IRDAI, when, and in what format.",
        points: [
          "Half-yearly compliance status to IRDAI",
          "Cyber-incident reporting workflow",
          "Annual cyber-resilience report",
        ],
      },
      {
        title: "Insurance product security",
        blurb: "Securing the product surface — apps, partner portals, agent tools.",
        points: [
          "Mobile + web application security",
          "Agent / broker portal access review",
          "PoS / partner integration security",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "Health Insurer (top-5 by GWP)",
        engagement: "Annual IRDAI audit + DPDP readiness",
        outcome:
          "All findings closed within 60 days; first-attempt clearance from IRDAI on-site inspection",
      },
    ],
    faqs: [
      {
        q: "Is annual audit mandatory for all insurers?",
        a: "Yes, per IRDAI 2023 guidelines. Larger insurers and reinsurers run quarterly internal + annual external. TPAs and aggregators on annual cycle.",
      },
      {
        q: "Do you handle the 6-hour incident reporting requirement?",
        a: "Yes — we deliver the playbook + tabletop exercise so the insurer can credibly meet the 6-hour notification mandate.",
      },
    ],
    seoTitle: "IRDAI Information Security Audit | Insurer + TPA + Broker | Macksofy",
    seoDescription:
      "CERT-In empanelled IRDAI audit per 2023 Cyber Security Guidelines. Insurers, brokers, web aggregators, TPAs. Mumbai HQ.",
    keywords: [
      "IRDAI audit India",
      "IRDAI cyber security guidelines",
      "insurance audit India",
      "TPA cybersecurity audit",
      "insurer information security audit",
    ],
  },

  {
    slug: "dpdp-act",
    title: "DPDP Act Compliance",
    shortTitle: "DPDP Act",
    icon: Lock,
    iconName: "Lock",
    category: "Indian Regulatory",
    hero: {
      eyebrow: "Digital Personal Data Protection Act 2023",
      tagline: "Audit + advisory for India's first comprehensive privacy law.",
      description:
        "End-to-end DPDP Act 2023 readiness — data principal rights, consent management, breach notification, cross-border transfers, Significant Data Fiduciary obligations and Data Protection Officer support.",
    },
    whyItMatters:
      "DPDP penalties reach ₹250 crore per breach. The Data Protection Board can demand remediation, restrict cross-border transfers and shut down non-compliant data fiduciaries. Yet most Indian organisations still treat DPDP as a privacy-policy update. Macksofy's DPDP audit covers the full nine pillars — from data inventory to DPO appointment to grievance redressal.",
    applicability: [
      "Any Data Fiduciary processing personal data of Indian residents",
      "Significant Data Fiduciaries (SDFs) — DPO mandatory",
      "Cross-border processors (data export to US / EU / GCC)",
      "Consent Managers seeking Board registration",
      "Healthcare, financial, edtech, e-commerce — all in scope",
    ],
    frameworks: [
      "Digital Personal Data Protection Act 2023",
      "DPDP Rules (notified in stages)",
      "Sectoral overlays — RBI / SEBI / IRDAI / TRAI",
      "GDPR (mapped where multinational)",
      "ISO 27701 (PIMS) for systematic compliance",
    ],
    methodology: [
      {
        phase: "1 · Data inventory + RoPA",
        activities: [
          "Personal data discovery + classification",
          "Records of Processing Activities (RoPA)",
          "Data flow mapping incl. cross-border",
          "Significant Data Fiduciary assessment",
        ],
      },
      {
        phase: "2 · Consent + notice",
        activities: [
          "Consent management platform review / build",
          "Notice (Section 5) compliance — itemised, plain language",
          "Withdrawal mechanism testing",
        ],
      },
      {
        phase: "3 · Data principal rights",
        activities: [
          "Access + correction + erasure workflows",
          "Grievance redressal (15-day SLA)",
          "Nominee handling",
        ],
      },
      {
        phase: "4 · Security safeguards (Section 8(5))",
        activities: [
          "Reasonable security measures audit",
          "Personal data breach detection + 72-hour notification",
          "Processor + sub-processor contracts",
        ],
      },
      {
        phase: "5 · Governance + DPO",
        activities: [
          "DPO appointment + RACI",
          "Board reporting cadence",
          "Annual compliance review",
        ],
      },
    ],
    deliverables: [
      "Full RoPA + data inventory",
      "DPDP gap analysis vs current state",
      "Notice + consent template pack",
      "Data principal rights workflow + portal spec",
      "Breach notification playbook (72-hour)",
      "DPO charter + role description (where SDF)",
      "Annual DPDP audit report (board-ready)",
    ],
    pillars: [
      {
        title: "Personal-data inventory",
        blurb: "DPDP audits live or die on completeness of the personal-data inventory.",
        points: [
          "Data-discovery across systems + SaaS",
          "Classification: personal, sensitive, children's data",
          "Processing-activity register (PAR)",
        ],
      },
      {
        title: "Lawful basis & consent",
        blurb: "Section 6 + 7 — the consent / legitimate-use distinction India auditors test hardest.",
        points: [
          "Consent-notice design + multilingual delivery",
          "Consent-revocation flow validation",
          "Legitimate-uses register (Section 7)",
        ],
      },
      {
        title: "Data-fiduciary obligations",
        blurb: "Section 8 — accuracy, retention, security safeguards, breach notification.",
        points: [
          "Reasonable-security-safeguards evidence",
          "Retention & deletion automation",
          "72-hour breach-notification drill",
        ],
      },
      {
        title: "Significant Data Fiduciary (SDF) controls",
        blurb: "If you cross the SDF threshold, the bar jumps materially — section 10.",
        points: [
          "DPO appointment + reporting lines",
          "Annual DPIA + audit pack",
          "Algorithmic-fairness review for AI processing",
        ],
      },
      {
        title: "Data-principal rights",
        blurb: "Section 11–14 — access, correction, erasure, grievance.",
        points: [
          "Rights-request intake + SLA workflow",
          "Grievance-redressal portal evidence",
          "Cross-border transfer + restricted-country posture",
        ],
      },
      {
        title: "Board reporting & DPB readiness",
        blurb: "What you put in front of the board, the DPO, and the Data Protection Board.",
        points: [
          "Compliance dashboard + risk register",
          "Penalty-exposure simulation (up to ₹250 cr)",
          "Mock DPB inquiry response pack",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "EdTech (Series-C)",
        engagement: "DPDP readiness + GDPR overlap",
        outcome:
          "Single playbook covered both regimes; cross-border transfer architecture validated for EU expansion",
      },
      {
        industry: "Hospital Group (Tier-1 cities)",
        engagement: "DPDP + ABDM + IRDAI overlap",
        outcome:
          "Patient health data flows mapped end-to-end; consent UX deployed across 7 hospitals",
      },
    ],
    faqs: [
      {
        q: "Is DPDP enforced today?",
        a: "Substantive provisions notified in phases through 2025. Penalty regime live; Data Protection Board operational. Treat it as live compliance, not future-state.",
      },
      {
        q: "Do we need a DPO?",
        a: "If you're a Significant Data Fiduciary (SDF) — yes, mandatory. Even if not, a DPO-equivalent role is best-practice and we provide DPO-as-a-Service.",
      },
      {
        q: "How does DPDP overlap with GDPR?",
        a: "About 70% of controls map directly. We build a single 'highest-bar' compliance program so multinationals don't run two parallel privacy stacks.",
      },
    ],
    seoTitle: "DPDP Act 2023 Compliance Audit | Data Fiduciary · DPO | Macksofy",
    seoDescription:
      "DPDP Act 2023 readiness — RoPA, consent, breach notification, DPO. CERT-In empanelled. India + GDPR overlap support.",
    keywords: [
      "DPDP Act compliance India",
      "DPDP audit Mumbai",
      "Data Fiduciary DPDP",
      "DPO India",
      "Significant Data Fiduciary",
      "Indian privacy law compliance",
    ],
  },

  {
    slug: "cicra",
    title: "CICRA Compliance Audit",
    shortTitle: "CICRA",
    icon: Database,
    iconName: "Database",
    category: "Indian Regulatory",
    hero: {
      eyebrow: "Credit Information Companies Regulation Act, 2005",
      tagline:
        "CICRA + RBI directions audit for CICs, lenders and credit specified users.",
      description:
        "CICRA + RBI Master Directions audit covering credit bureaus (CIBIL, Experian, Equifax, CRIF) and the lenders / NBFCs / fintechs that submit and consume credit data. Includes data submission accuracy, dispute resolution and the new Section 17A consumer-rights additions.",
    },
    whyItMatters:
      "CICRA non-compliance triggers ₹1 lakh / day per occurrence under Section 11A. With Indian fintechs adding ~50 million new credit records per quarter, regulators have stepped up enforcement on data submission accuracy and the 30-day dispute resolution mandate. Macksofy audits the full CIC + Specified User chain — many Indian audit firms only check the surface.",
    applicability: [
      "Credit Information Companies (CICs)",
      "Banks + NBFCs as Specified Users",
      "Fintech lenders + LSPs in digital lending",
      "Microfinance institutions (NBFC-MFIs)",
      "Co-branded credit card issuers",
      "Account Aggregators consuming credit data",
    ],
    frameworks: [
      "Credit Information Companies (Regulation) Act, 2005 (CICRA)",
      "CIC Rules 2006",
      "RBI Master Direction — Credit Information Reporting (2017)",
      "RBI Master Direction — IT Governance (2023)",
      "DPDP Act (consumer credit data overlap)",
      "Section 17A — Consumer Rights to Credit Information",
    ],
    methodology: [
      {
        phase: "1 · Data submission audit",
        activities: [
          "Submission file validation (CIBIL TUDF, Experian, Equifax)",
          "Reject rate + correction lifecycle review",
          "Linkage of accounts to PAN / Aadhaar / mobile",
        ],
      },
      {
        phase: "2 · Dispute resolution audit",
        activities: [
          "30-day dispute resolution SLA tracking",
          "Consumer-facing dispute portal review",
          "Section 17A compliance for free credit report rights",
        ],
      },
      {
        phase: "3 · Data accuracy + DPDP overlap",
        activities: [
          "Accuracy of overdue / DPD reporting",
          "Settlement / write-off / OTS reporting",
          "DPDP consent for credit information sharing",
        ],
      },
      {
        phase: "4 · Cyber + access controls",
        activities: [
          "Privileged access to CIC submission systems",
          "Encryption of submission files in transit + at rest",
          "Audit log retention (7 years)",
        ],
      },
      {
        phase: "5 · Reporting",
        activities: [
          "RBI / CIC submission audit report",
          "Findings register with corrective action",
          "Board attestation",
        ],
      },
    ],
    deliverables: [
      "CICRA + RBI submission audit report",
      "Reject + correction analytics",
      "Dispute resolution SLA dashboard",
      "Section 17A compliance evidence",
      "DPDP consent + credit data overlap report",
      "Free retest within 30 days",
    ],
    pillars: [
      {
        title: "CIC eligibility & licensing",
        blurb: "Are you a CIC, a Specified User, or both? CICRA treats them differently.",
        points: [
          "RBI CIC licence conditions",
          "Specified-user obligations (Sec 16)",
          "Cross-entity sharing arrangements",
        ],
      },
      {
        title: "Data accuracy & dispute resolution",
        blurb: "The 30-day mandate and the ₹1L / day penalty stick.",
        points: [
          "Source-to-bureau data-quality controls",
          "Dispute-resolution SLA evidence (Reg 21)",
          "Reject-rate / reconciliation metrics",
        ],
      },
      {
        title: "Specified-user obligations",
        blurb: "What banks, NBFCs and fintechs that consume credit data must demonstrate.",
        points: [
          "Purpose-limitation evidence",
          "Consent + customer-disclosure trail",
          "Data-retention + disposal proof",
        ],
      },
      {
        title: "Consumer-data security",
        blurb: "Technical controls on the credit-data crown jewels.",
        points: [
          "Encryption-at-rest / in-transit posture",
          "Privileged access + audit-log integrity",
          "Insider-threat detection on CIC interfaces",
        ],
      },
      {
        title: "Reporting & retention",
        blurb: "What you must keep, for how long, and what you must report.",
        points: [
          "Credit-data retention schedule",
          "Dispute & breach reporting log",
          "Annual filings to RBI",
        ],
      },
      {
        title: "Penalty & breach posture",
        blurb: "Section 11A and 28 — the parts that move quickly in enforcement.",
        points: [
          "Penalty-exposure simulation",
          "Sec 28 breach-notification workflow",
          "Self-attestation + audit-trail evidence",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "Mid-size NBFC (Mumbai)",
        engagement: "First-time CICRA + RBI submission audit",
        outcome:
          "Reject rate dropped from 6.4% to 0.9% in one quarter; eliminated ₹40L/yr in penalties",
      },
    ],
    faqs: [
      {
        q: "Are NBFCs required to do an annual CICRA audit?",
        a: "Yes per RBI Master Direction. Larger NBFCs run quarterly + annual external audit.",
      },
      {
        q: "What's Section 17A about?",
        a: "Section 17A guarantees consumers free credit reports on demand — non-compliance attracts penalties. We audit your consumer-rights workflow end to end.",
      },
    ],
    seoTitle: "CICRA Compliance Audit | NBFC + CIC + Lender | Macksofy",
    seoDescription:
      "CICRA + RBI submission audit for NBFCs, banks, fintech lenders. Section 17A, dispute resolution, DPDP overlap. Mumbai HQ.",
    keywords: [
      "CICRA audit India",
      "credit bureau submission audit",
      "NBFC CICRA compliance",
      "Section 17A audit",
      "CIBIL submission accuracy audit",
    ],
  },

  {
    slug: "regulatory-vapt",
    title: "VAPT for RBI / PCI-DSS",
    shortTitle: "RBI + PCI VAPT",
    icon: CreditCard,
    iconName: "CreditCard",
    category: "Indian Regulatory",
    hero: {
      eyebrow: "Annual + Quarterly · Regulator-Format",
      tagline: "VAPT engineered to satisfy RBI and PCI-DSS in one engagement.",
      description:
        "Regulator-grade VAPT for RBI-regulated entities and PCI-DSS scope environments. Our reports are accepted by RBI inspectors, PCI QSAs and Big-4 audit firms without rework.",
    },
    whyItMatters:
      "RBI and PCI-DSS both require regular VAPT — but with very different reporting expectations. Macksofy delivers a single engagement that satisfies both: CERT-In format for RBI submission, PCI 6.5 + 11.3 evidence for QSA review.",
    applicability: [
      "Banks, NBFCs, payment aggregators (RBI scope)",
      "Merchants and processors handling card data (PCI scope)",
      "Issuing / acquiring banks",
      "Wallet operators",
      "Stock brokers facing SEBI VAPT requirement (similar)",
    ],
    frameworks: [
      "RBI Cyber Security Framework — VAPT requirements",
      "PCI-DSS v4.0 Requirement 11.3 (Pen testing) + 11.2 (Vulnerability scanning)",
      "PCI ASV scanning (when in scope)",
      "SEBI CSCRF VAPT requirements",
    ],
    methodology: [
      {
        phase: "1 · Scoping per framework",
        activities: [
          "RBI: Critical Information Infrastructure scope",
          "PCI: CDE (Cardholder Data Environment) scope + segmentation validation",
          "Combined asset inventory",
        ],
      },
      {
        phase: "2 · Vulnerability assessment",
        activities: [
          "External + internal scans",
          "Authenticated + unauthenticated coverage",
          "ASV scan coordination (PCI)",
        ],
      },
      {
        phase: "3 · Penetration testing",
        activities: [
          "Manual exploitation of high-severity findings",
          "Network segmentation validation (PCI)",
          "Application + API testing (where in scope)",
        ],
      },
      {
        phase: "4 · Reporting",
        activities: [
          "RBI System Audit Report format",
          "PCI 6.5 / 11.3 evidence + ASV report attachment",
          "Findings register, executive summary",
        ],
      },
      {
        phase: "5 · Closure",
        activities: [
          "Free retest within 30 days",
          "QSA support during PCI assessment",
          "Final closure letter",
        ],
      },
    ],
    deliverables: [
      "RBI-format VAPT report (CERT-In aligned)",
      "PCI-DSS 11.3 evidence pack",
      "ASV scan report (where applicable)",
      "Network segmentation validation",
      "Free retest within 30 days",
      "QSA / RBI inspection support",
    ],
    pillars: [
      {
        title: "Scoping & threat profile",
        blurb: "The wrong scope will make a regulator-compliant VAPT useless. We get this right first.",
        points: [
          "Regulator-aligned asset enumeration",
          "Threat-actor profile for your sector",
          "Rules of engagement + auth letter",
        ],
      },
      {
        title: "External + internal VAPT",
        blurb: "Both halves matter — the regulator will ask for both.",
        points: [
          "External perimeter + internet-facing apps",
          "Internal AD + segmented-zone testing",
          "Wireless + physical entry-point review",
        ],
      },
      {
        title: "Mobile / API / cloud",
        blurb: "Modern attack surface — where most legacy VAPT vendors fall short.",
        points: [
          "Mobile (Android + iOS) deep review",
          "REST / GraphQL API security testing",
          "Cloud config + IAM blast-radius review",
        ],
      },
      {
        title: "Regulator-format reporting",
        blurb: "Reports that satisfy CERT-In, RBI, SEBI, IRDAI, PCI — without rework.",
        points: [
          "CERT-In format master report",
          "Regulator-specific control mapping",
          "Board + technical + auditor packs",
        ],
      },
      {
        title: "Remediation & retest",
        blurb: "Findings without a closure path aren't really findings.",
        points: [
          "Per-finding remediation guidance",
          "Free 30-day retest of High/Critical",
          "Closure letter accepted by regulators",
        ],
      },
      {
        title: "Continuous-monitoring uplift",
        blurb: "Year-1 VAPT findings should seed year-2 detection engineering.",
        points: [
          "Detection use-cases from findings",
          "Vulnerability KPI/KRI dashboard",
          "Annual retest cadence + scoping refresh",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "Payment Aggregator (RBI-authorized)",
        engagement: "Annual VAPT covering RBI + PCI scope",
        outcome:
          "Single engagement satisfied both regulators; saved 6 weeks vs sequential",
      },
    ],
    faqs: [
      {
        q: "Are you a PCI ASV?",
        a: "Macksofy partners with an authorized ASV for the scan-only portion. We handle the full pentest and segmentation validation in-house. Single deliverable.",
      },
      {
        q: "How often do RBI-regulated entities need VAPT?",
        a: "Minimum annually per RBI CSF. Mature programs run quarterly + post-major-release. PCI requires annual + post-significant-change.",
      },
    ],
    seoTitle: "VAPT for RBI / PCI-DSS Compliance | India + UAE | Macksofy",
    seoDescription:
      "Regulator-grade VAPT for RBI Cyber Security Framework and PCI-DSS v4.0. CERT-In empanelled. Single engagement satisfies both.",
    keywords: [
      "RBI VAPT India",
      "PCI-DSS VAPT India",
      "PCI compliance Mumbai",
      "RBI cyber audit",
      "payment aggregator VAPT",
    ],
  },

  // ====================================================================
  // INTERNATIONAL STANDARDS
  // ====================================================================
  {
    slug: "iso-27001",
    title: "ISO 27001 Consulting & Implementation",
    shortTitle: "ISO 27001",
    icon: FileBadge,
    iconName: "FileBadge",
    category: "International Standard",
    hero: {
      eyebrow: "Implementation · Internal Audit · Certification",
      tagline:
        "ISO 27001 done in 16 weeks — by people who've shipped 30+ certifications.",
      description:
        "Full ISO 27001:2022 implementation, internal audit, and certification support. Macksofy walks you from gap analysis to certificate — minimum disruption to engineering, maximum value at audit.",
    },
    whyItMatters:
      "ISO 27001 has become table-stakes for B2B SaaS, fintechs and BPOs targeting enterprise customers in India + UAE + global markets. The 2022 update tightened many controls. Macksofy has implemented ISO 27001 for 30+ Indian and UAE organizations, with a near-100% Stage 2 pass rate.",
    applicability: [
      "B2B SaaS targeting enterprise customers",
      "BPO / KPO with multinational clients",
      "Fintech (often paired with PCI-DSS)",
      "Healthcare / HealthTech (paired with HIPAA / ADHICS)",
      "Government contractors",
    ],
    frameworks: [
      "ISO/IEC 27001:2022",
      "ISO/IEC 27002:2022 (controls)",
      "ISO/IEC 27017 (cloud)",
      "ISO/IEC 27018 (PII in public cloud)",
      "ISO/IEC 27701 (privacy extension)",
    ],
    methodology: [
      {
        phase: "Wk 1–2 · Gap analysis",
        activities: [
          "Current control posture vs ISO 27001:2022 Annex A",
          "Risk register baseline",
          "Stakeholder mapping",
        ],
      },
      {
        phase: "Wk 3–4 · ISMS scope + governance",
        activities: [
          "ISMS scope statement",
          "Information security policy + 13 supporting policies",
          "Roles + responsibilities matrix",
        ],
      },
      {
        phase: "Wk 5–8 · Risk + controls",
        activities: [
          "Risk assessment per ISO 27005",
          "Statement of Applicability (SoA)",
          "Risk treatment plan",
          "Control implementation",
        ],
      },
      {
        phase: "Wk 9–10 · Awareness + training",
        activities: [
          "All-hands awareness training",
          "Role-specific training (devs, IT, HR, support)",
          "Phishing simulation baseline",
        ],
      },
      {
        phase: "Wk 11–12 · Internal audit",
        activities: [
          "Full internal audit by Macksofy ISO 27001 Lead Auditor",
          "Findings register + management response",
          "Management review",
        ],
      },
      {
        phase: "Wk 13–14 · Stage 1 audit",
        activities: [
          "Coordination with certification body",
          "Documentation review (Stage 1)",
          "Closure of Stage 1 findings",
        ],
      },
      {
        phase: "Wk 15–16 · Stage 2 audit + certificate",
        activities: [
          "On-site / remote Stage 2 audit",
          "Findings closure",
          "Certificate issuance",
        ],
      },
    ],
    deliverables: [
      "13+ policies + procedures (ready to operate)",
      "Statement of Applicability + risk register",
      "Internal audit report",
      "Stage 1 + Stage 2 audit support",
      "Awareness training + recorded sessions",
      "Annual surveillance audit support",
    ],
    pillars: [
      {
        title: "Context & ISMS scoping",
        blurb: "Clause 4-6 alignment — getting the scope statement right is half the audit.",
        points: [
          "Interested-parties + obligations register",
          "Scope statement + boundary diagrams",
          "ISMS objectives keyed to business strategy",
        ],
      },
      {
        title: "Leadership & risk",
        blurb: "Clauses 5-6 + Annex A — the parts certification bodies scrutinise hardest.",
        points: [
          "Information-security policy + topic-specific policies",
          "Risk-assessment methodology + treatment plan",
          "Statement of Applicability (SoA) walk-through",
        ],
      },
      {
        title: "Annex A controls — organisational",
        blurb: "Annex A.5 organisational controls (2022 revision) evidenced end to end.",
        points: [
          "Policies, roles, segregation of duties",
          "Information-classification + handling",
          "Threat-intel + supplier-relationship controls",
        ],
      },
      {
        title: "Annex A controls — technological",
        blurb: "Annex A.8 — where most non-conformities are raised.",
        points: [
          "Identity, access, authentication",
          "Configuration, capacity, monitoring",
          "Secure-development + change-management",
        ],
      },
      {
        title: "Operational ISMS",
        blurb: "Clauses 7-10 — the day-to-day evidence that the ISMS is actually alive.",
        points: [
          "Internal-audit programme (clause 9.2)",
          "Management-review records (clause 9.3)",
          "CAPA + continual-improvement evidence",
        ],
      },
      {
        title: "Stage-1 / Stage-2 readiness",
        blurb: "Pre-certification dry-run mirroring the certification body's audit plan.",
        points: [
          "Stage-1 documentation review walk",
          "Stage-2 technical evidence sampling",
          "Major / minor / observation tracker",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "B2B SaaS (Series-B, India)",
        engagement: "First-time ISO 27001:2022 certification",
        outcome:
          "Stage 2 cleared in 16 weeks; enterprise pipeline doubled within 2 quarters",
      },
      {
        industry: "BPO (Mumbai + Pune)",
        engagement: "ISO 27001 + ISO 27701 (privacy)",
        outcome: "Both certificates issued in single audit cycle",
      },
    ],
    faqs: [
      {
        q: "How long does first ISO 27001 take?",
        a: "16 weeks for typical mid-market. Larger / multi-site organizations: 20–28 weeks. We can compress for funding deadlines.",
      },
      {
        q: "Do you also handle SOC 2?",
        a: "Yes — and we map controls across ISO + SOC 2 to share evidence and reduce effort.",
      },
    ],
    seoTitle: "ISO 27001:2022 Consulting in India + UAE | Macksofy",
    seoDescription:
      "ISO 27001:2022 implementation, internal audit and certification support. 16-week typical engagement. India + UAE. ISO 27001 Lead Auditor team.",
    keywords: [
      "ISO 27001 consulting India",
      "ISO 27001 Mumbai",
      "ISO 27001 UAE",
      "ISO 27001 implementation India",
      "ISMS consultant India",
    ],
  },

  {
    slug: "iso-27017",
    title: "ISO/IEC 27017 — Cloud Security Certification",
    shortTitle: "ISO 27017",
    icon: Cloud,
    iconName: "Cloud",
    category: "International Standard",
    hero: {
      eyebrow: "Cloud-Specific Controls · Extension to ISO 27001",
      tagline: "Cloud security controls procurement teams actually look for.",
      description:
        "ISO/IEC 27017 extends ISO 27001 with 37 cloud-specific controls covering shared responsibility, virtual machine isolation, administrative operations and customer geographic boundaries. Mandatory for cloud providers and increasingly demanded from cloud consumers in regulated industries.",
    },
    whyItMatters:
      "Enterprise procurement teams now ask cloud service providers for ISO 27017 alongside ISO 27001. SaaS vendors targeting BFSI, healthcare and government deals add 12–18% to win rate post-certification. Macksofy implements ISO 27017 as a 6–8 week extension to existing ISO 27001 — sharing 60% of the evidence pack.",
    applicability: [
      "Cloud Service Providers (IaaS, PaaS, SaaS)",
      "Multi-tenant SaaS targeting regulated industries",
      "Cloud-native fintechs + healthtechs",
      "Hyperscaler resellers + managed service providers",
      "Government cloud / community cloud operators",
    ],
    frameworks: [
      "ISO/IEC 27017:2015",
      "ISO/IEC 27001:2022 (parent ISMS)",
      "ISO/IEC 27018:2019 (PII complement)",
      "Cloud Security Alliance (CSA) STAR mapping",
      "MeitY cloud empanelment guidelines",
    ],
    methodology: [
      {
        phase: "1 · Cloud architecture scoping",
        activities: [
          "Service model classification (IaaS / PaaS / SaaS)",
          "Tenant isolation model review",
          "Shared responsibility matrix authoring",
        ],
      },
      {
        phase: "2 · 37-control mapping",
        activities: [
          "Cloud-specific control gap analysis",
          "Customer-administrator boundary controls",
          "Virtual machine + container isolation testing",
        ],
      },
      {
        phase: "3 · Implementation",
        activities: [
          "Multi-tenant separation evidence",
          "Geographic data-locality controls",
          "Monitoring + alerting integration",
        ],
      },
      {
        phase: "4 · Internal audit + Stage 1/2",
        activities: [
          "Internal audit by Macksofy Cloud Lead Auditor",
          "Stage 1 documentation review",
          "Stage 2 evidence walk + control sampling",
        ],
      },
    ],
    deliverables: [
      "37-control gap analysis",
      "Shared Responsibility Matrix (publishable)",
      "Tenant isolation evidence pack",
      "ISO 27001 + 27017 combined SoA",
      "Stage 1 / Stage 2 audit support",
      "Annual surveillance support",
    ],
    pillars: [
      {
        title: "Cloud-provider relationships",
        blurb: "The supplier-context controls — where most ISO 27017 gaps surface.",
        points: [
          "Provider SOC 2 / ISO 27001 due-diligence",
          "DPA + shared-responsibility evidence",
          "Exit & data-portability provisions",
        ],
      },
      {
        title: "Shared-responsibility model",
        blurb: "Who owns what control — documented and reviewable.",
        points: [
          "Per-service shared-responsibility matrix",
          "Customer-managed control evidence",
          "Hand-off testing for each boundary",
        ],
      },
      {
        title: "Virtualised environment controls",
        blurb: "Hypervisor, container, network — controls the base 27001 doesn't fully cover.",
        points: [
          "Hypervisor hardening evidence",
          "Container & K8s security posture",
          "Virtual network segmentation",
        ],
      },
      {
        title: "Cloud-specific incident response",
        blurb: "Cloud incidents move faster than the IR plan that worked on-prem.",
        points: [
          "Cloud-forensics readiness",
          "Provider-side IR coordination",
          "Tenant-isolation breach playbook",
        ],
      },
      {
        title: "Customer-tenant isolation",
        blurb: "The single most important assurance for cloud customers.",
        points: [
          "Logical-isolation evidence",
          "Encryption-key separation",
          "Cross-tenant access prevention testing",
        ],
      },
      {
        title: "Cloud audit & assurance",
        blurb: "The 27017-specific clauses on monitoring and audit-rights.",
        points: [
          "Cloud audit-log completeness",
          "Customer right-to-audit + evidence",
          "Continuous-compliance reporting",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "Multi-tenant SaaS (Series-B, India + UAE)",
        engagement: "ISO 27001 → 27017 add-on",
        outcome:
          "Extension delivered in 7 weeks; enabled BFSI procurement deals worth ₹14 crore",
      },
    ],
    faqs: [
      {
        q: "Do we need ISO 27001 first?",
        a: "Yes — 27017 is an extension. Most clients add it during the ISO 27001 cycle for combined certification.",
      },
      {
        q: "How does this differ from CSA STAR?",
        a: "CSA STAR is self-attestation or third-party reviewed. ISO 27017 is full audited certification, generally considered more rigorous.",
      },
    ],
    seoTitle: "ISO 27017 Cloud Security Certification | Macksofy",
    seoDescription:
      "ISO/IEC 27017 implementation for cloud providers and multi-tenant SaaS. 6–8 week extension to existing ISO 27001. India + UAE.",
    keywords: [
      "ISO 27017 certification India",
      "cloud security ISO",
      "multi-tenant SaaS audit",
      "ISO 27017 implementation Mumbai",
    ],
  },

  {
    slug: "iso-27018",
    title: "ISO/IEC 27018 — PII in Public Cloud",
    shortTitle: "ISO 27018",
    icon: Lock,
    iconName: "Lock",
    category: "International Standard",
    hero: {
      eyebrow: "Privacy Controls · Public Cloud Processors",
      tagline: "The PII-in-cloud certification customers ask for first.",
      description:
        "ISO/IEC 27018 is the international standard for privacy protection when processing PII in public clouds. Provides 25+ controls and an audit trail customers can see — covering consent, data location, deletion and customer notification.",
    },
    whyItMatters:
      "When customers entrust personal data to your cloud, ISO 27018 is the certification they look for in your security questionnaire. Combined with DPDP / GDPR readiness, it shortens enterprise sales cycles by 30%+. Macksofy implements ISO 27018 as an extension to ISO 27001 (or alongside ISO 27701 for full PIMS).",
    applicability: [
      "Public cloud processors handling customer PII",
      "Multi-tenant SaaS in EU / India / US enterprise sales",
      "DPDP Significant Data Fiduciaries",
      "GDPR processors (Article 28)",
      "Healthtech storing patient data in cloud",
    ],
    frameworks: [
      "ISO/IEC 27018:2019",
      "ISO/IEC 27001:2022 (parent)",
      "ISO/IEC 27701 (PIMS — synergistic)",
      "GDPR Article 28 + Article 32",
      "DPDP Section 8 — Reasonable Security",
    ],
    methodology: [
      {
        phase: "1 · PII inventory + processor classification",
        activities: [
          "Customer-PII vs. organisation-PII separation",
          "Cross-border + sub-processor mapping",
          "Customer consent / contract review",
        ],
      },
      {
        phase: "2 · 27018-specific controls",
        activities: [
          "Customer consent for data use beyond service",
          "Disclosure to law enforcement controls",
          "Data return / erasure on contract end",
          "Sub-processor disclosure",
        ],
      },
      {
        phase: "3 · Customer-visible controls",
        activities: [
          "Public privacy notice review",
          "Customer audit-rights workflow",
          "Notification to customers of breach (Article 33-style)",
        ],
      },
      {
        phase: "4 · Audit",
        activities: [
          "Combined ISO 27001 + 27018 internal audit",
          "Stage 1 + Stage 2 with certification body",
        ],
      },
    ],
    deliverables: [
      "PII processing register (customer + organisation split)",
      "Sub-processor disclosure list (publishable)",
      "Customer audit + breach-notification playbooks",
      "ISO 27001 + 27018 combined SoA",
      "Stage 1 / 2 certification support",
    ],
    pillars: [
      {
        title: "PII classification in cloud",
        blurb: "Knowing what's PII and where it lives is half the audit.",
        points: [
          "PII inventory in cloud workloads",
          "Sensitivity & jurisdiction tagging",
          "Pseudonymisation + minimisation posture",
        ],
      },
      {
        title: "Consent & purpose limitation",
        blurb: "The 27018-specific controls on use of PII.",
        points: [
          "Customer-consent recording",
          "Purpose-binding evidence",
          "Marketing / secondary-use restriction",
        ],
      },
      {
        title: "Customer-controlled keys & encryption",
        blurb: "Who holds the keys is what 27018 hinges on.",
        points: [
          "BYOK / HYOK key-management evidence",
          "Encryption-at-rest + in-transit",
          "Key-rotation + access audit",
        ],
      },
      {
        title: "Sub-processor & cross-border",
        blurb: "Transparency and notice requirements that GDPR and DPDP also lean on.",
        points: [
          "Sub-processor register + notice flow",
          "Cross-border transfer mechanisms",
          "Onward-transfer due-diligence",
        ],
      },
      {
        title: "Data-subject rights workflow",
        blurb: "How requests flow from customer → provider → resolution.",
        points: [
          "Access / correction / erasure intake",
          "Customer-controller hand-off SLA",
          "Audit-trail of subject-rights actions",
        ],
      },
      {
        title: "Privacy incident handling",
        blurb: "The notification timelines and forensic readiness specific to PII.",
        points: [
          "72-hour customer notification flow",
          "Forensic preservation of PII-related logs",
          "Post-incident privacy review",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "Customer-data SaaS (Mumbai + Singapore)",
        engagement: "ISO 27001 + 27018 combined",
        outcome:
          "Customer security questionnaires shortened 60%; closed two ₹5cr+ enterprise deals on the certification alone",
      },
    ],
    faqs: [
      {
        q: "Do we need ISO 27001 first?",
        a: "Yes — 27018 is an extension. Pair with ISO 27017 if you also operate as a cloud provider.",
      },
      {
        q: "Is ISO 27018 enough for GDPR?",
        a: "It demonstrates strong technical + organisational measures (Article 32). Pair with ISO 27701 (PIMS) for full GDPR-aligned governance.",
      },
    ],
    seoTitle: "ISO 27018 PII in Public Cloud Certification | Macksofy",
    seoDescription:
      "ISO/IEC 27018 — privacy controls for PII in public cloud. 6–8 week extension to ISO 27001. India + UAE.",
    keywords: [
      "ISO 27018 certification India",
      "PII cloud audit",
      "ISO 27018 SaaS",
      "cloud PII protection certification",
    ],
  },

  {
    slug: "iso-27701",
    title: "ISO/IEC 27701 — Privacy Information Management",
    shortTitle: "ISO 27701",
    icon: ShieldCheck,
    iconName: "ShieldCheck",
    category: "International Standard",
    hero: {
      eyebrow: "PIMS · Privacy as a Management System",
      tagline: "GDPR + DPDP, certified as a system — not a checklist.",
      description:
        "ISO 27701 extends ISO 27001 into a full Privacy Information Management System (PIMS). The only certification that demonstrates GDPR / DPDP / CCPA compliance via independent audit. Mandatory shortlist for enterprises selling to EU + India enterprise.",
    },
    whyItMatters:
      "DPOs need evidence the privacy program is operating, not just documented. ISO 27701 audit produces that evidence — and translates directly to GDPR Article 5(2) accountability and DPDP Section 8 reasonable-security obligations. Macksofy implements 27701 alongside ISO 27001 in a single 18–22 week engagement.",
    applicability: [
      "Data Controllers + Processors processing significant PII",
      "Multinationals with GDPR + DPDP obligations",
      "BPO / KPO handling EU / Indian customer data",
      "Healthtechs, fintechs, edtechs",
      "B2B SaaS handling end-customer PII",
    ],
    frameworks: [
      "ISO/IEC 27701:2019",
      "ISO/IEC 27001:2022 (parent)",
      "GDPR + DPDP mapping",
      "ISO/IEC 29100 privacy framework",
      "ISO/IEC 27018 (cloud PII complement)",
    ],
    methodology: [
      {
        phase: "1 · Privacy scoping",
        activities: [
          "Controller / processor role determination",
          "PII inventory + RoPA",
          "Cross-border transfer mapping",
        ],
      },
      {
        phase: "2 · PIMS implementation",
        activities: [
          "Privacy policy + 8+ supporting procedures",
          "DPIA framework + sample DPIAs",
          "Consent + lawful basis evidence",
          "Data subject rights workflow",
        ],
      },
      {
        phase: "3 · Controller / processor controls",
        activities: [
          "Article 28 / Section 8 DPA templates",
          "Sub-processor management",
          "Breach notification (72-hour GDPR / DPDP)",
        ],
      },
      {
        phase: "4 · Audit",
        activities: [
          "Combined 27001 + 27701 internal audit",
          "Stage 1 + Stage 2",
          "Annual surveillance",
        ],
      },
    ],
    deliverables: [
      "Full PIMS documentation (8+ procedures)",
      "RoPA + DPIA framework + sample DPIAs",
      "Combined 27001 + 27701 SoA",
      "Data subject rights workflow + portal spec",
      "Breach notification playbook (72-hour)",
      "Stage 1 / 2 audit + annual surveillance",
    ],
    pillars: [
      {
        title: "PIMS scope & context",
        blurb: "Get the controller-vs-processor split right and the rest of the audit gets easier.",
        points: [
          "Controller / processor / joint-controller delineation",
          "PIMS scope statement + boundary",
          "Stakeholder & legal-context register",
        ],
      },
      {
        title: "Privacy by design integration",
        blurb: "Embedding privacy into how engineering actually builds.",
        points: [
          "Privacy-by-design SDLC gates",
          "Default-private configuration evidence",
          "Privacy-engineering tooling review",
        ],
      },
      {
        title: "DPIA + ROPA",
        blurb: "The two artefacts that anchor everything else.",
        points: [
          "Data Protection Impact Assessments",
          "Records of Processing Activities",
          "High-risk processing inventory",
        ],
      },
      {
        title: "Data-subject rights ops",
        blurb: "From intake form to verified resolution — within deadline.",
        points: [
          "Rights-request portal + workflow",
          "Identity-verification protocol",
          "SLA + audit-trail evidence",
        ],
      },
      {
        title: "Cross-border transfer governance",
        blurb: "SCCs, adequacy decisions, derogations — what you actually rely on.",
        points: [
          "Transfer-impact assessments (TIA)",
          "SCC + SCC-2021 implementation",
          "Onward-transfer + sub-processor flow",
        ],
      },
      {
        title: "Privacy continual improvement",
        blurb: "PIMS clauses 5-10 — keeping the system alive after certification.",
        points: [
          "Internal audit + management review",
          "Privacy KPIs + breach trending",
          "CAPA + maturity uplift roadmap",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "Data Annotation BPO (Bengaluru)",
        engagement: "ISO 27001 + 27701 dual certification",
        outcome:
          "EU customer questionnaires reduced to a single artefact handover; passed GDPR processor audits without rework",
      },
    ],
    faqs: [
      {
        q: "How is 27701 different from a privacy policy?",
        a: "Policy is a document. PIMS is the operating system that produces evidence the policy is followed — controls, audits, accountability, KPIs.",
      },
      {
        q: "Does 27701 satisfy GDPR / DPDP fully?",
        a: "It satisfies the systemic / accountability requirements. Specific obligations (e.g. cross-border, consent, DSARs) still need legal review per jurisdiction.",
      },
    ],
    seoTitle: "ISO 27701 PIMS Certification | GDPR + DPDP | Macksofy",
    seoDescription:
      "ISO/IEC 27701 PIMS implementation — GDPR + DPDP certified privacy management. 18–22 weeks combined with ISO 27001. India + UAE.",
    keywords: [
      "ISO 27701 India",
      "PIMS certification",
      "GDPR ISO certification India",
      "privacy management ISO",
    ],
  },

  {
    slug: "iso-42001",
    title: "ISO/IEC 42001 — AI Management System",
    shortTitle: "ISO 42001",
    icon: Brain,
    iconName: "Brain",
    category: "International Standard",
    hero: {
      eyebrow: "AI Governance · World's First AI Management Standard",
      tagline: "Demonstrate responsible AI to customers, regulators and boards.",
      description:
        "ISO/IEC 42001 (2023) is the first international standard for AI Management Systems — covering governance, risk, lifecycle, transparency and stakeholder impact. Macksofy implements 42001 alongside the EU AI Act / DPDP / sectoral guidance for organisations shipping AI to enterprise.",
    },
    whyItMatters:
      "Boards, customers and regulators are asking 'how do you govern your AI?' Answers like 'we have an internal policy' no longer cut it. ISO 42001 audited certification — alongside DPDP / EU AI Act readiness — is fast becoming a procurement-stage requirement, especially for AI sold into BFSI, healthcare and government.",
    applicability: [
      "AI / ML product companies + LLM application builders",
      "Banks + insurers using AI for underwriting / claims",
      "Healthtech using AI for diagnostics / triage",
      "Edtech / hiring-tech using AI for evaluation",
      "Cloud + SaaS embedding generative AI features",
    ],
    frameworks: [
      "ISO/IEC 42001:2023",
      "EU AI Act (risk-tier mapping)",
      "NIST AI Risk Management Framework",
      "Macksofy AI Risk Taxonomy",
      "DPDP / GDPR — automated decision-making provisions",
    ],
    methodology: [
      {
        phase: "1 · AI inventory + risk tiering",
        activities: [
          "Inventory of AI systems + use cases",
          "Risk tiering (EU AI Act categories)",
          "Stakeholder impact assessment",
        ],
      },
      {
        phase: "2 · AIMS design",
        activities: [
          "AI policy + 7+ supporting procedures",
          "Lifecycle controls (data, model, deployment, monitoring)",
          "Human oversight + override controls",
        ],
      },
      {
        phase: "3 · Controls implementation",
        activities: [
          "Bias + fairness testing methodology",
          "Explainability + transparency artefacts",
          "Incident detection + post-incident learning",
          "Third-party / foundation-model risk management",
        ],
      },
      {
        phase: "4 · Internal audit + certification",
        activities: [
          "Internal audit by Macksofy AI Auditor",
          "Stage 1 + Stage 2 with certification body",
          "Annual surveillance",
        ],
      },
    ],
    deliverables: [
      "AI inventory + risk-tier register",
      "AI policy + 7+ procedures",
      "Bias / fairness / explainability evidence pack",
      "Incident playbook + audit log spec",
      "Stage 1 / 2 audit support",
      "EU AI Act gap mapping",
    ],
    pillars: [
      {
        title: "AI policy & governance",
        blurb: "The first thing 42001 auditors ask: who owns AI risk at your organisation?",
        points: [
          "AI policy + ethics charter",
          "AI governance board + RACI",
          "AI use-case inventory",
        ],
      },
      {
        title: "AI risk assessment & impact",
        blurb: "AI system risk is not classical InfoSec risk. We assess it as a distinct domain.",
        points: [
          "AIIA — AI Impact Assessment",
          "Model risk tiering (low / med / high)",
          "Stakeholder-impact analysis",
        ],
      },
      {
        title: "Data & model lifecycle",
        blurb: "From dataset to deployment to decommissioning.",
        points: [
          "Training-data lineage + consent",
          "Model versioning + reproducibility",
          "Decommissioning & retention policy",
        ],
      },
      {
        title: "Bias, fairness, transparency",
        blurb: "The differentiator from any prior ISO standard.",
        points: [
          "Bias-testing methodology + thresholds",
          "Explainability artefacts per model",
          "Human-in-the-loop checkpoints",
        ],
      },
      {
        title: "AI incident handling",
        blurb: "What happens when the model goes wrong in production.",
        points: [
          "AI-incident detection + escalation",
          "Model rollback / kill-switch evidence",
          "Affected-party notification playbook",
        ],
      },
      {
        title: "AI compliance & assurance",
        blurb: "Internal audit + third-party assurance specific to AI systems.",
        points: [
          "AI internal-audit programme",
          "Vendor-AI due diligence",
          "Annual AI-system attestation",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "AI-led Healthtech (India + GCC)",
        engagement: "First ISO 42001 + EU AI Act readiness",
        outcome:
          "Cleared diligence at two strategic investors and one EU enterprise deal on the strength of certified AI governance",
      },
    ],
    faqs: [
      {
        q: "Is ISO 42001 widely recognised yet?",
        a: "Adoption is rapid — major procurement teams in BFSI, healthcare and government are starting to ask for it. Early movers gain a 12–18 month differentiation window.",
      },
      {
        q: "Does this satisfy the EU AI Act?",
        a: "ISO 42001 is the closest standard alignment. We map every 42001 control to the relevant EU AI Act article and DPDP automated-decision provisions.",
      },
    ],
    seoTitle: "ISO 42001 AI Management Certification | Macksofy",
    seoDescription:
      "ISO/IEC 42001 AI Management System implementation. EU AI Act + DPDP mapped. India + UAE. Macksofy.",
    keywords: [
      "ISO 42001 India",
      "AI governance certification",
      "EU AI Act compliance India",
      "responsible AI audit",
      "AIMS implementation",
    ],
  },

  {
    slug: "soc-2",
    title: "SOC 2 Type 1 + Type 2 Audit",
    shortTitle: "SOC 2",
    icon: BadgeCheck,
    iconName: "BadgeCheck",
    category: "International Standard",
    hero: {
      eyebrow: "AICPA Trust Services · Type 1 + Type 2",
      tagline: "The single artefact every US enterprise customer asks for.",
      description:
        "Full SOC 2 Type 1 + Type 2 readiness, internal audit and CPA-coordination. We implement the five Trust Services Criteria (Security, Availability, Confidentiality, Processing Integrity, Privacy) as a system that operates — and produces evidence — for the entire 12-month observation window.",
    },
    whyItMatters:
      "If your buyers are US enterprises, a SOC 2 Type 2 report is the single most-requested artefact in security questionnaires. Type 1 (point-in-time) gets you in the door; Type 2 (12-month operating effectiveness) closes deals. Macksofy delivers Type 1 in 6–8 weeks and prepares for Type 2 across the observation window — coordinated with a US CPA firm for the final attestation.",
    applicability: [
      "B2B SaaS targeting US + global enterprise",
      "BPO / KPO with US customer accounts",
      "Cloud-hosted services handling customer data",
      "Fintechs serving US institutional clients",
      "Healthtech (paired with HIPAA)",
    ],
    frameworks: [
      "AICPA SOC 2 — 2017 Trust Services Criteria (revised)",
      "AICPA SOC 1 (financial reporting — separate engagement)",
      "ISO 27001 (mapped — 60% control overlap)",
      "PCI-DSS (where in scope)",
    ],
    methodology: [
      {
        phase: "1 · TSC scoping",
        activities: [
          "Security (mandatory) + optional categories",
          "System description authoring",
          "Sub-service organisation mapping",
        ],
      },
      {
        phase: "2 · Control implementation",
        activities: [
          "Common Criteria (CC1–CC9) build-out",
          "Availability / Confidentiality / PI / Privacy controls (where in scope)",
          "Evidence collection workflow + automation",
        ],
      },
      {
        phase: "3 · Type 1 readiness audit",
        activities: [
          "Macksofy internal audit (point-in-time)",
          "Findings + remediation",
          "Coordination with CPA for Type 1 attestation",
        ],
      },
      {
        phase: "4 · Type 2 observation window",
        activities: [
          "12-month evidence collection (typically 6 + 6)",
          "Quarterly check-ins + control sampling",
          "Annual control testing",
        ],
      },
      {
        phase: "5 · Type 2 attestation",
        activities: [
          "Auditor walkthrough + sample testing",
          "Findings closure",
          "SOC 2 Type 2 report issuance",
        ],
      },
    ],
    deliverables: [
      "System description + control matrix",
      "Common Criteria + optional category control evidence",
      "Type 1 readiness audit report",
      "Type 2 evidence dashboard",
      "CPA-firm attestation coordination",
      "Annual SOC 2 cycle playbook",
    ],
    pillars: [
      {
        title: "Trust Service Criteria scoping",
        blurb: "Pick the right criteria — most SaaS in India over-scope and over-pay.",
        points: [
          "Security (common criteria) — mandatory baseline",
          "Availability / Confidentiality / Privacy as relevant",
          "System description aligned to your customer commitments",
        ],
      },
      {
        title: "Common Criteria controls",
        blurb: "The 100+ control points every SOC 2 audit hinges on.",
        points: [
          "Control environment + risk-assessment posture",
          "Logical & physical access controls",
          "System operations + change management",
        ],
      },
      {
        title: "Trust Services — availability",
        blurb: "If you sell uptime SLAs, this is the criteria your customers want evidenced.",
        points: [
          "Capacity-management + monitoring evidence",
          "Backup, replication, DR test artefacts",
          "Incident-response playbooks linked to SLOs",
        ],
      },
      {
        title: "Trust Services — confidentiality & privacy",
        blurb: "Cross-border data flows + DPDP / GDPR overlap covered in one pass.",
        points: [
          "Encryption-at-rest / in-transit posture",
          "Data-retention & disposal policy evidence",
          "Sub-processor + DPA management",
        ],
      },
      {
        title: "Type 1 vs Type 2 readiness",
        blurb: "Most Indian SaaS go Type 1 first — we tell you when Type 2 is realistic.",
        points: [
          "Type 1 — point-in-time design assessment",
          "Type 2 — 3 to 12-month evidence window",
          "Sampling-strategy alignment with your CPA / AICPA-licensee",
        ],
      },
      {
        title: "Auditor handover pack",
        blurb: "Everything your independent CPA needs, in the format they prefer.",
        points: [
          "Walk-through narratives + control matrix",
          "Population lists + sampling artefacts",
          "Management assertion + remediation log",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "B2B SaaS (Series-C, India + US)",
        engagement: "First-time SOC 2 Type 1 → Type 2",
        outcome:
          "Type 1 in 7 weeks; Type 2 issued at month 13; closed three US enterprise deals tied to attestation",
      },
    ],
    faqs: [
      {
        q: "Type 1 vs Type 2 — which do I need?",
        a: "Type 1 is point-in-time; gets you into procurement. Type 2 is 12-month operating effectiveness; required to close enterprise deals. Most clients pursue both consecutively.",
      },
      {
        q: "Do you do the CPA attestation directly?",
        a: "We coordinate with a US-licensed CPA firm for the formal attestation. Macksofy delivers the readiness, internal audit, evidence collection and continuous monitoring.",
      },
      {
        q: "Can SOC 2 + ISO 27001 share evidence?",
        a: "Yes — about 60% of controls overlap. Single evidence pack, two attestations.",
      },
    ],
    seoTitle: "SOC 2 Type 1 + Type 2 Audit India + UAE | Macksofy",
    seoDescription:
      "Full SOC 2 readiness — Type 1 in 6–8 weeks, Type 2 over 12 months. CPA-coordinated. ISO 27001 + SOC 2 sharing. India + UAE.",
    keywords: [
      "SOC 2 audit India",
      "SOC 2 Type 2 Mumbai",
      "SOC 2 readiness India",
      "AICPA SOC 2 India",
      "SaaS SOC 2 certification",
    ],
  },

  {
    slug: "nist-csf",
    title: "NIST Cybersecurity Framework Audit",
    shortTitle: "NIST CSF",
    icon: ShieldCheck,
    iconName: "ShieldCheck",
    category: "International Standard",
    hero: {
      eyebrow: "NIST CSF 2.0 · Govern · Identify · Protect · Detect · Respond · Recover",
      tagline:
        "The maturity model boards understand and regulators reference everywhere.",
      description:
        "Full NIST Cybersecurity Framework 2.0 maturity audit + roadmap. CSF 2.0 added the Govern function and tightened supply-chain controls. Macksofy uses CSF as the connective tissue across ISO 27001 / SOC 2 / RBI / SEBI / UAE regulators — one assessment, many outputs.",
    },
    whyItMatters:
      "NIST CSF is the lingua franca of cybersecurity maturity globally. Boards understand it; insurers price it; regulators reference it. CSF 2.0's new Govern function makes it directly auditable for board accountability. Macksofy's CSF audit produces both a maturity tier (Partial → Adaptive) and a tier-by-function map that drives investment decisions for the next 12–24 months.",
    applicability: [
      "Boards seeking quantifiable cybersecurity maturity",
      "Listed companies + Big-4 audit committees",
      "Multinationals harmonising cyber across geographies",
      "Insurers pricing cyber-insurance premiums",
      "M&A diligence (target + acquirer)",
    ],
    frameworks: [
      "NIST Cybersecurity Framework 2.0 (2024)",
      "NIST SP 800-53 (control catalog)",
      "NIST SP 800-171 (controlled unclassified info — for US gov contractors)",
      "ISO 27001 (mapped)",
      "CIS Controls v8 (mapped)",
    ],
    methodology: [
      {
        phase: "1 · Profile + tier baseline",
        activities: [
          "Current Profile authoring (per CSF Core)",
          "Target Profile (12–24 month aspiration)",
          "Tier 1–4 baseline assessment",
        ],
      },
      {
        phase: "2 · Function-by-function audit",
        activities: [
          "Govern · Identify · Protect · Detect · Respond · Recover",
          "Evidence-based control testing",
          "Subcategory-level scoring",
        ],
      },
      {
        phase: "3 · Supply chain (CSF 2.0)",
        activities: [
          "Critical supplier inventory + concentration risk",
          "C-SCRM (Cyber Supply Chain Risk Management) maturity",
          "SBOM + third-party VAPT requirement",
        ],
      },
      {
        phase: "4 · Roadmap + investment plan",
        activities: [
          "Gap-to-target heatmap",
          "Investment prioritisation by tier-uplift ROI",
          "Quarterly milestones",
        ],
      },
      {
        phase: "5 · Board reporting + cycle",
        activities: [
          "Maturity dashboard for board",
          "Annual re-audit + tier-uplift validation",
        ],
      },
    ],
    deliverables: [
      "Current + Target Profile (CSF Core)",
      "Tier scorecard (per function + per subcategory)",
      "Supply-chain risk maturity report",
      "12–24 month investment roadmap",
      "Board-ready maturity dashboard",
      "Annual re-audit + tier-uplift evidence",
    ],
    pillars: [
      {
        title: "Govern (CSF 2.0)",
        blurb: "The new function in CSF 2.0 — anchors all the rest.",
        points: [
          "Organisational context + cyber strategy",
          "Cyber-risk appetite + tolerance",
          "Roles, RACI, supply-chain governance",
        ],
      },
      {
        title: "Identify",
        blurb: "Asset, data, supplier and risk inventories that the rest of CSF rests on.",
        points: [
          "Asset management evidence",
          "Risk assessment + business environment",
          "Supply-chain risk register",
        ],
      },
      {
        title: "Protect",
        blurb: "The largest function — preventative controls across access, awareness, data, tech.",
        points: [
          "Identity & access management",
          "Awareness + training programmes",
          "Data security + protective tech",
        ],
      },
      {
        title: "Detect",
        blurb: "Continuous monitoring, anomaly detection, security-event analysis.",
        points: [
          "Continuous-monitoring posture",
          "Security-event correlation (SIEM)",
          "ATT&CK detection coverage",
        ],
      },
      {
        title: "Respond",
        blurb: "Response planning, communications, analysis, mitigation, improvements.",
        points: [
          "IR plan + playbooks",
          "Mitigation + recovery activities",
          "Post-incident lessons learned",
        ],
      },
      {
        title: "Recover",
        blurb: "Recovery planning, improvements, communications.",
        points: [
          "Recovery plan + RTO / RPO",
          "Communications with stakeholders",
          "Continuous improvement loop",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "Listed Manufacturer (India)",
        engagement: "Annual CSF 2.0 maturity audit",
        outcome:
          "Maturity moved from Tier 2 (Risk-Informed) to Tier 3 (Repeatable) inside 14 months; cyber-insurance premium reduced 22%",
      },
    ],
    faqs: [
      {
        q: "Is NIST CSF mandatory?",
        a: "Not directly mandatory in India / UAE, but referenced by RBI / SEBI / NESA / DESC. Most multinationals adopt it as the connective layer across regulator obligations.",
      },
      {
        q: "What's new in CSF 2.0?",
        a: "Added Govern function, tightened supply-chain controls, broadened applicability beyond critical infrastructure to all organisations.",
      },
    ],
    seoTitle: "NIST CSF 2.0 Maturity Audit | Boards + Multinationals | Macksofy",
    seoDescription:
      "NIST Cybersecurity Framework 2.0 audit + maturity roadmap. Govern function, supply-chain. Board-ready. India + UAE.",
    keywords: [
      "NIST CSF audit India",
      "NIST CSF 2.0 implementation",
      "cyber maturity audit Mumbai",
      "board cyber maturity NIST",
    ],
  },

  // ====================================================================
  // INDUSTRY & PRIVACY
  // ====================================================================
  {
    slug: "pci-dss",
    title: "PCI-DSS v4.0 Compliance",
    shortTitle: "PCI-DSS",
    icon: CreditCard,
    iconName: "CreditCard",
    category: "Industry & Privacy",
    hero: {
      eyebrow: "PCI Security Standards Council · v4.0 Mandatory",
      tagline: "PCI-DSS v4.0 readiness, internal audit and QSA coordination.",
      description:
        "Full PCI-DSS v4.0 readiness for merchants, processors, issuers, acquirers and service providers. Macksofy delivers ROC / SAQ readiness, network segmentation validation, ASV scanning and QSA coordination — all under one engagement.",
    },
    whyItMatters:
      "PCI-DSS v4.0 became fully mandatory in March 2025 — with 64 new or revised requirements including continuous discovery of vulnerabilities, customised approach options and tighter authentication. Non-compliant merchants face fines from card brands ($5K–$100K+/month) and increased liability shift. Macksofy is the only Indian / UAE firm combining CERT-In empanelment with PCI-DSS depth across QSA-coordination, ASV scans and segmentation tests.",
    applicability: [
      "Merchants — Levels 1–4 (transaction-volume tiers)",
      "Acquirers + Issuing banks",
      "Payment processors + gateways",
      "Service providers (storage / processing / transmitting CHD)",
      "Mobile wallet operators",
    ],
    frameworks: [
      "PCI-DSS v4.0 (mandatory March 2025)",
      "PCI Software Security Framework (SSF)",
      "PCI Mobile Payment Acceptance Security",
      "PCI 3DS Core Security Standard (where in scope)",
    ],
    methodology: [
      {
        phase: "1 · Scope reduction + CDE definition",
        activities: [
          "Cardholder Data Environment (CDE) inventory",
          "Network segmentation review",
          "Tokenisation + scope-reduction architecture",
        ],
      },
      {
        phase: "2 · Gap analysis vs v4.0",
        activities: [
          "12 requirement domains assessment",
          "v4.0 customised-approach evaluation",
          "Targeted-risk-analysis (TRA) framework setup",
        ],
      },
      {
        phase: "3 · Technical validation",
        activities: [
          "Internal + external VAPT (Req 11.4)",
          "ASV quarterly scans (coordinated)",
          "Segmentation testing (Req 11.4.5)",
          "Authenticated app + API testing",
        ],
      },
      {
        phase: "4 · ROC / SAQ readiness",
        activities: [
          "ROC / SAQ-A / SAQ-D drafting",
          "Evidence pack for each requirement",
          "AOC (Attestation of Compliance) preparation",
        ],
      },
      {
        phase: "5 · QSA coordination",
        activities: [
          "QSA selection support (independent)",
          "QSA walkthrough + control sampling",
          "Findings closure + AOC issuance",
        ],
      },
    ],
    deliverables: [
      "PCI-DSS v4.0 gap analysis (per requirement)",
      "Network segmentation diagram + validation",
      "ASV scan reports (quarterly)",
      "ROC / SAQ + AOC drafts",
      "Targeted Risk Analysis (TRA) artefacts",
      "QSA-handover pack + remediation closure",
    ],
    pillars: [
      {
        title: "Scope reduction",
        blurb: "Most PCI cost overruns come from over-broad scope. We fix that first.",
        points: [
          "Cardholder-data discovery & flow mapping",
          "Network-segmentation validation testing",
          "Tokenisation / outsourcing reduction strategy",
        ],
      },
      {
        title: "Build & maintain secure systems",
        blurb: "PCI DSS v4.0 requirements 1, 2, 6 — secure baselines + change control.",
        points: [
          "Firewall + segmentation rules walk-through",
          "Hardened-baseline evidence per device class",
          "Secure-SDLC artefacts (Req 6) for in-scope apps",
        ],
      },
      {
        title: "Protect account data",
        blurb: "Encryption, key management and access — the heart of the standard.",
        points: [
          "Stored cardholder data: encryption + retention",
          "Key-management lifecycle (Req 3.6)",
          "Transmission encryption + cipher hygiene (Req 4)",
        ],
      },
      {
        title: "Vulnerability & access management",
        blurb: "Reqs 5, 7, 8 — Defender, MFA, RBAC, anti-malware evidence.",
        points: [
          "Anti-malware coverage + tamper-protection",
          "Role-based access + least-privilege evidence",
          "MFA on all in-scope access (v4 enforcement)",
        ],
      },
      {
        title: "Monitor, test, respond",
        blurb: "Reqs 10–12 — daily ops evidence that QSAs sample heavily.",
        points: [
          "Centralised logging + retention proof",
          "Internal + external ASV scans, segmentation test",
          "IR plan + breach-notification flow",
        ],
      },
      {
        title: "QSA audit pack",
        blurb: "Everything the Qualified Security Assessor needs in one place.",
        points: [
          "Self-assessment questionnaire (SAQ) or RoC dry-run",
          "Evidence catalogue keyed to each requirement",
          "Compensating-controls worksheet where applicable",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "Payment Aggregator (Level 1)",
        engagement: "v3.2.1 → v4.0 transition + ROC",
        outcome:
          "Cleared QSA assessment first attempt; saved ~₹35L in penalty exposure during transition",
      },
      {
        industry: "Acquiring Bank (top-10)",
        engagement: "Scope-reduction + tokenisation architecture",
        outcome:
          "PCI scope reduced ~70% of systems; annual recurring audit cost down 40%",
      },
    ],
    faqs: [
      {
        q: "Are you a QSA?",
        a: "We partner with leading QSAs for the formal Report on Compliance. Macksofy delivers readiness, internal audit, ASV + VAPT, segmentation testing and QSA coordination — usually saving 30–40% of QSA effort.",
      },
      {
        q: "Do we need PCI-DSS at all? We use a payment gateway.",
        a: "Even SAQ-A (outsourced gateway, no card data on your servers) requires controls. The scope is just smaller. Most merchants underestimate.",
      },
    ],
    seoTitle: "PCI-DSS v4.0 Compliance Audit | Merchant + Processor | Macksofy",
    seoDescription:
      "PCI-DSS v4.0 readiness, internal audit, ASV + VAPT, segmentation testing, QSA coordination. India + UAE.",
    keywords: [
      "PCI-DSS v4.0 India",
      "PCI compliance Mumbai",
      "PCI ROC India",
      "merchant PCI audit",
      "payment processor PCI",
    ],
  },

  {
    slug: "hipaa",
    title: "HIPAA Compliance Audit",
    shortTitle: "HIPAA",
    icon: Heart,
    iconName: "Heart",
    category: "Industry & Privacy",
    hero: {
      eyebrow: "Privacy · Security · Breach Notification · Omnibus",
      tagline:
        "HIPAA + HITRUST audits for healthcare entities and business associates.",
      description:
        "End-to-end HIPAA Privacy + Security + Breach Notification rule audits for covered entities and business associates. Includes US OCR enforcement readiness, BAA review, EHR / PHI security validation and HITRUST CSF mapping where required by US health-system customers.",
    },
    whyItMatters:
      "OCR HIPAA settlements crossed $135M cumulative; per-record penalty under the Omnibus Rule reaches $50,000. Indian + UAE healthtechs and BPOs serving US payers / providers are increasingly contractually required to demonstrate HIPAA — often via HITRUST. Macksofy bridges Indian operations with US HIPAA expectations end-to-end.",
    applicability: [
      "US health systems' Indian / UAE BPO partners",
      "Healthtech SaaS storing PHI for US customers",
      "Telehealth + remote monitoring providers",
      "Medical billing + RCM operations",
      "Clinical research organisations (CROs)",
    ],
    frameworks: [
      "HIPAA Privacy Rule (45 CFR 164 Subpart E)",
      "HIPAA Security Rule (45 CFR 164 Subpart C)",
      "HIPAA Breach Notification Rule",
      "HIPAA Omnibus Final Rule (2013)",
      "HITRUST CSF v11 (where required by health-system customers)",
      "21st Century Cures Act — Information Blocking",
    ],
    methodology: [
      {
        phase: "1 · PHI inventory + BAA review",
        activities: [
          "PHI flow mapping (intake, processing, storage, transmission)",
          "Business Associate Agreement review + uplift",
          "Subcontractor BAA tracking",
        ],
      },
      {
        phase: "2 · Privacy Rule audit",
        activities: [
          "Notice of Privacy Practices",
          "Patient rights (access, amendment, accounting)",
          "Minimum Necessary + de-identification controls",
        ],
      },
      {
        phase: "3 · Security Rule audit",
        activities: [
          "Administrative safeguards (workforce, training, sanctions)",
          "Physical safeguards (workstation, media)",
          "Technical safeguards (encryption, audit logs, integrity)",
        ],
      },
      {
        phase: "4 · Breach notification readiness",
        activities: [
          "Breach risk assessment workflow",
          "60-day notification SOP",
          "OCR-template + state-AG mapping",
        ],
      },
      {
        phase: "5 · HITRUST mapping (optional)",
        activities: [
          "HITRUST CSF v11 control mapping",
          "Self-assessment / Validated assessment readiness",
          "External assessor coordination",
        ],
      },
    ],
    deliverables: [
      "PHI inventory + flow diagrams",
      "BAA template + uplift recommendations",
      "Privacy + Security + Breach Notification audit report",
      "Workforce sanctions + training program",
      "Breach notification SOP + tabletop scenario",
      "HITRUST gap analysis (where in scope)",
    ],
    pillars: [
      {
        title: "Administrative safeguards",
        blurb: "§164.308 — policies, training, contracts, BAAs that OCR reviewers ask for first.",
        points: [
          "Security-management process + risk analysis",
          "Workforce-training + sanction policy",
          "Business-Associate Agreements (BAA) review",
        ],
      },
      {
        title: "Physical safeguards",
        blurb: "§164.310 — workstation, facility and device controls covering ePHI.",
        points: [
          "Facility-access + visitor controls",
          "Workstation use + secure-disposal evidence",
          "Device & media controls for ePHI storage",
        ],
      },
      {
        title: "Technical safeguards",
        blurb: "§164.312 — access, audit, integrity and transmission security on ePHI systems.",
        points: [
          "Unique-user-ID + emergency-access workflow",
          "Audit-controls coverage (logging completeness)",
          "Encryption-at-rest + in-transit for ePHI",
        ],
      },
      {
        title: "Breach-notification rule",
        blurb: "§164.400-414 — the 60-day / 500-record / OCR-portal workflows.",
        points: [
          "Breach-risk-assessment methodology",
          "60-day individual & media notification flow",
          "OCR portal submission pack",
        ],
      },
      {
        title: "Privacy rule alignment",
        blurb: "§164.500-534 — NPP, minimum necessary, individual rights.",
        points: [
          "Notice of Privacy Practices (NPP) review",
          "Minimum-necessary use + disclosure controls",
          "Individual-rights workflow (access, amend, account)",
        ],
      },
      {
        title: "OCR audit pack",
        blurb: "Everything Office for Civil Rights needs in their preferred format.",
        points: [
          "Documentation-retention 6-year evidence",
          "Self-audit + corrective-action plan",
          "Workforce-training completion records",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "Medical Billing BPO (Bengaluru, US clients)",
        engagement: "HIPAA + HITRUST CSF readiness",
        outcome:
          "First-attempt HITRUST validated assessment passed; all five US health-system customer audits cleared without rework",
      },
      {
        industry: "Telehealth (UAE + India)",
        engagement: "HIPAA Security Rule audit + ADHICS overlay",
        outcome:
          "Cross-jurisdiction PHI architecture validated; UAE NHS + US OCR overlap reduced effort 35%",
      },
    ],
    faqs: [
      {
        q: "We're an Indian BPO, not US-based — does HIPAA apply to us?",
        a: "Yes if you process PHI of US patients on behalf of a Covered Entity (you are a Business Associate). Penalties flow through to BAs under the Omnibus Rule.",
      },
      {
        q: "Do we need HITRUST or just HIPAA?",
        a: "HIPAA is the law. HITRUST is the certification many US health systems require from their vendors as proof. We deliver both in a single program.",
      },
    ],
    seoTitle: "HIPAA Compliance Audit India + UAE | HITRUST | Macksofy",
    seoDescription:
      "HIPAA Privacy + Security + Breach audit for healthtechs, BPOs, telehealth. HITRUST CSF mapping. India + UAE.",
    keywords: [
      "HIPAA audit India",
      "HIPAA compliance Mumbai",
      "HITRUST India",
      "healthtech HIPAA audit",
      "medical billing HIPAA",
    ],
  },

  {
    slug: "gdpr",
    title: "GDPR Compliance Audit",
    shortTitle: "GDPR",
    icon: Globe,
    iconName: "Globe",
    category: "Industry & Privacy",
    hero: {
      eyebrow: "EU General Data Protection Regulation",
      tagline:
        "GDPR audits, DPIAs, EU representative and DPO services for India + UAE businesses.",
      description:
        "End-to-end GDPR readiness — Article 30 RoPA, Article 28 processor agreements, Article 32 security, Article 35 DPIAs, Article 27 EU representative service, plus DPO-as-a-Service. Designed for India + UAE businesses with EU customers, EU staff or EU monitoring.",
    },
    whyItMatters:
      "GDPR fines reached €4.48 billion cumulative by 2024, with several €1B+ single-entity penalties. Indian + UAE businesses targeting EU customers (or monitoring EU residents) fall under Article 3(2) extraterritorial reach. Macksofy delivers GDPR readiness alongside DPDP and ISO 27701 — a single program that satisfies both regimes.",
    applicability: [
      "B2B SaaS with EU enterprise customers",
      "E-commerce shipping to EU + UK",
      "EdTech + healthtech with EU residents",
      "BPO / KPO processing EU data on behalf of clients",
      "Digital marketing / adtech tracking EU residents",
    ],
    frameworks: [
      "EU General Data Protection Regulation 2016/679",
      "UK GDPR + Data Protection Act 2018",
      "EU AI Act (AI overlap)",
      "ePrivacy Directive (cookies)",
      "ISO 27701 (PIMS) — synergistic certification",
      "DPDP Act (Indian overlap)",
    ],
    methodology: [
      {
        phase: "1 · Applicability + role",
        activities: [
          "Article 3 territorial scope",
          "Controller / processor / joint-controller determination",
          "EU representative requirement (Article 27)",
        ],
      },
      {
        phase: "2 · RoPA + lawful basis",
        activities: [
          "Article 30 Records of Processing Activities",
          "Lawful basis per processing (Article 6)",
          "Special category processing (Article 9)",
        ],
      },
      {
        phase: "3 · Data subject rights",
        activities: [
          "DSAR workflow + 30-day SLA",
          "Erasure + portability + objection",
          "Automated decision-making (Article 22)",
        ],
      },
      {
        phase: "4 · Security + breach (Article 32, 33, 34)",
        activities: [
          "Risk-based technical + organisational measures",
          "72-hour breach notification SOP",
          "Encryption + pseudonymisation evidence",
        ],
      },
      {
        phase: "5 · Cross-border + DPO",
        activities: [
          "SCCs / TIA / adequacy decisions",
          "EU representative appointment (Article 27)",
          "DPO appointment + RACI (Article 37–39)",
        ],
      },
    ],
    deliverables: [
      "Article 30 RoPA",
      "DPIA framework + sample DPIAs",
      "Article 28 processor / sub-processor agreements",
      "DSAR portal + workflow",
      "72-hour breach notification SOP",
      "EU representative + DPO services (where required)",
      "Annual GDPR audit report",
    ],
    pillars: [
      {
        title: "Lawful basis & consent",
        blurb: "Article 6 + 7 — the foundation every GDPR audit starts with.",
        points: [
          "Lawful-basis register per processing",
          "Consent capture + revocation flow",
          "Children + special-category bases",
        ],
      },
      {
        title: "Data-subject rights",
        blurb: "Article 15-22 — workflows + evidence for each right.",
        points: [
          "Access / portability / erasure SLA",
          "Restriction + objection workflows",
          "Automated-decision opt-out",
        ],
      },
      {
        title: "DPO + ROPA",
        blurb: "Article 30 + 37-39 — the artefacts EU regulators sample first.",
        points: [
          "DPO appointment + independence",
          "ROPA completeness + freshness",
          "Processor / sub-processor register",
        ],
      },
      {
        title: "Cross-border transfer",
        blurb: "Post-Schrems II — SCCs, TIAs, derogations.",
        points: [
          "Transfer-impact assessments (TIA)",
          "SCC 2021 + supplementary measures",
          "Adequacy + derogation reliance",
        ],
      },
      {
        title: "72-hour breach notification",
        blurb: "Article 33 + 34 — the drill that defines audit confidence.",
        points: [
          "Breach-detection + escalation flow",
          "Supervisory-authority notice",
          "Data-subject communication trigger",
        ],
      },
      {
        title: "DPIA + privacy by design",
        blurb: "Article 25 + 35 — the controls EDPB enforces most aggressively.",
        points: [
          "DPIA gating high-risk processing",
          "Privacy-by-design SDLC integration",
          "DPO consultation evidence",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "Adtech (Delhi + Berlin)",
        engagement: "GDPR + ePrivacy + EU AI Act readiness",
        outcome:
          "Cleared three EU enterprise diligences; eliminated 4M cookie-consent error per quarter via revised CMP",
      },
    ],
    faqs: [
      {
        q: "Do we need an EU representative?",
        a: "If you have no EU establishment but offer goods/services to EU residents or monitor them, yes — Article 27 mandates it. Macksofy provides EU representative service.",
      },
      {
        q: "Can we use DPDP work for GDPR?",
        a: "About 70% of controls overlap. Macksofy builds a single 'highest-bar' program so you don't run two parallel privacy stacks.",
      },
    ],
    seoTitle: "GDPR Compliance Audit India + UAE | DPO + EU Rep | Macksofy",
    seoDescription:
      "GDPR readiness for India + UAE businesses. Article 30 RoPA, DPIAs, EU representative, DPO services. ISO 27701-aligned.",
    keywords: [
      "GDPR India",
      "GDPR audit Mumbai",
      "EU representative India",
      "DPO services India",
      "GDPR DPDP overlap",
    ],
  },

  // === India regulator additions (rbi-digital-lending · rbi-it-governance · rbi-it-outsourcing · sebi-mii · dpdp-sdf) ===
  {
    slug: "rbi-digital-lending",
    title: "RBI Digital Lending Guidelines Audit",
    shortTitle: "RBI DLG",
    icon: CreditCard,
    iconName: "CreditCard",
    category: "Indian Regulatory",
    hero: {
      eyebrow: "Reserve Bank of India · REs · LSPs · DLAs · FLDG partners",
      tagline:
        "FLDG, DLG, LSP and DLA audit — disbursement-to-collection trail RBI inspectors actually read.",
      description:
        "End-to-end audit against the RBI Digital Lending Guidelines (DLG) — covering Regulated Entities, Lending Service Providers (LSPs), Digital Lending Apps (DLAs), the First Loss Default Guarantee (FLDG) framework, Key Facts Statement, cooling-off, customer redressal and data-localisation obligations.",
    },
    whyItMatters:
      "RBI's Digital Lending Guidelines (Sep 2022) and the subsequent FLDG circular (Jun 2023) re-wrote how every RE, fintech, NBFC and bank-LSP must operate. Disbursement and repayment must flow only between the borrower's and the RE's bank account — no LSP pass-through. The FLDG cap of 5% of the loan portfolio, DLA registration and Key Facts Statement requirements are now active enforcement triggers; RBI has already debarred multiple LSPs and barred new customer onboarding for non-compliant REs. Macksofy's audit produces the disbursement-vs-collection trail, FLDG ledger reconciliation and DLA artefact pack RBI inspections demand on day one.",
    applicability: [
      "Scheduled Commercial Banks + Small Finance Banks running digital lending",
      "NBFCs (Upper / Middle / Base layer) with own or partner-app lending",
      "Lending Service Providers (LSPs) sourcing for an RE",
      "Digital Lending App (DLA) operators — owned or white-labelled",
      "FLDG-receiving REs + FLDG-providing LSPs",
      "Payment Aggregators routing loan disbursement / repayment flows",
    ],
    frameworks: [
      "RBI Guidelines on Digital Lending (RBI/2022-23/111 dated 02-Sep-2022)",
      "RBI Default Loss Guarantee in Digital Lending (RBI/2023-24/41 dated 08-Jun-2023)",
      "Working Group on Digital Lending Report (Nov 2021) — annexed expectations",
      "RBI Master Direction on Outsourcing of IT Services (2023)",
      "RBI Master Direction on IT Governance (2024)",
      "RBI Storage of Payment System Data (Apr 2018) — data localisation",
      "Fair Practices Code + SBR for NBFCs",
      "DPDP Act 2023 — overlap on consent + data principal rights",
    ],
    methodology: [
      {
        phase: "1 · RE-LSP-DLA mapping",
        activities: [
          "Inventory of LSPs, DLAs, co-lending and FLDG partners",
          "Loan-product classification (own-book / co-lend / FLDG)",
          "Customer journey + data-flow walk-through",
          "Board-approved digital-lending policy review",
        ],
      },
      {
        phase: "2 · Disbursement & collection audit",
        activities: [
          "Direct RE-to-borrower disbursement trail (no LSP pass-through)",
          "Repayment routing into RE account only",
          "Reconciliation against bank statements + payment-aggregator MIS",
          "Cooling-off / look-up period evidence",
        ],
      },
      {
        phase: "3 · FLDG framework audit",
        activities: [
          "FLDG cap test — 5% of outstanding portfolio per arrangement",
          "Eligible FLDG instruments (cash, FD lien, BG) verification",
          "FLDG invocation triggers + ageing ledger",
          "Disclosure to credit-information companies",
        ],
      },
      {
        phase: "4 · Customer-protection controls",
        activities: [
          "Key Facts Statement (KFS) format + APR disclosure",
          "Grievance redressal + nodal-officer SLA",
          "Recovery-agent code of conduct audit",
          "Cooling-off cancellation flow testing",
        ],
      },
      {
        phase: "5 · Data & technology controls",
        activities: [
          "DLA permissions audit — only need-to-know access (contacts/SMS/gallery prohibited)",
          "Data localisation evidence per RBI Apr-2018 directive",
          "Encryption-in-transit + tokenisation review",
          "Cyber-security + outsourcing controls (cross-mapped to IT Governance MD)",
        ],
      },
      {
        phase: "6 · Reporting & submission pack",
        activities: [
          "DLA registration + Sachet portal submission readiness",
          "CSITE / DoS submission pack",
          "Inspector Q&A walk-through deck",
          "Remediation tracker + 30-day retest",
        ],
      },
    ],
    pillars: [
      {
        title: "RE accountability & policy",
        blurb: "RBI holds the Regulated Entity — not the LSP — liable. The audit starts there.",
        points: [
          "Board-approved digital-lending policy currency",
          "LSP / DLA appointment due-diligence pack",
          "Quarterly digital-lending review at board level",
        ],
      },
      {
        title: "Money-flow integrity",
        blurb: "Disbursement and collection routing is the single most-tested control by RBI.",
        points: [
          "Direct RE-borrower flow (no LSP pool account)",
          "Pass-through nostro / escrow exception ledger",
          "Reconciliation evidence with PA + bank MIS",
        ],
      },
      {
        title: "FLDG governance",
        blurb: "The 5% cap, eligible instruments and invocation audit-trail.",
        points: [
          "FLDG cap test per arrangement + portfolio",
          "Eligible instrument (cash / FD lien / BG) validation",
          "Invocation + CIC-reporting ageing ledger",
        ],
      },
      {
        title: "Customer-protection stack",
        blurb: "What every borrower must see, sign and be able to walk away from.",
        points: [
          "Key Facts Statement + APR disclosure evidence",
          "Cooling-off cancellation tested end-to-end",
          "Grievance redressal + Sachet integration",
        ],
      },
      {
        title: "DLA & data hygiene",
        blurb: "Permissions, localisation, DPDP overlap — where most LSP enforcement actions land.",
        points: [
          "DLA permission audit (no contacts / SMS / gallery)",
          "Payment-data localisation evidence",
          "DPDP consent + data-principal-rights overlap",
        ],
      },
      {
        title: "Inspector-ready submission pack",
        blurb: "The artefact bundle a CSITE / DoS inspection actually consumes.",
        points: [
          "DLA registration & Sachet-portal pack",
          "Control-to-evidence map per DLG clause",
          "Remediation tracker + retest letter",
        ],
      },
    ],
    deliverables: [
      "Digital-lending policy + procedure gap report",
      "Disbursement-vs-collection reconciliation ledger",
      "FLDG cap + ageing dashboard",
      "Key Facts Statement template pack (per loan product)",
      "DLA permission & data-localisation evidence pack",
      "Sachet / DLA registration submission bundle",
      "RBI inspector Q&A walk-through deck",
      "Free retest within 30 days + closure letter",
    ],
    caseStudies: [
      {
        industry: "Mid-size NBFC (consumer lending)",
        engagement: "DLG + FLDG audit across 4 LSP partners",
        outcome:
          "FLDG portfolio re-cut to within the 5% cap; two non-compliant LSPs offboarded ahead of RBI thematic inspection",
      },
      {
        industry: "Bank-led co-lending DLA",
        engagement: "DLA permission + customer-protection audit",
        outcome:
          "Permission set reduced from 17 to 4; KFS rolled out across loan products and cooling-off cancellation rate validated",
      },
    ],
    faqs: [
      {
        q: "Are LSPs directly regulated by RBI?",
        a: "Indirectly — RBI regulates the RE, but holds the RE accountable for every LSP / DLA it appoints. The audit is run on the RE; LSP controls are validated as part of the RE's outsourcing posture.",
      },
      {
        q: "What is the FLDG cap and how is it tested?",
        a: "5% of the loan amount disbursed under the arrangement, in eligible instruments only (cash, FD lien, BG). We reconcile the FLDG ledger to outstanding portfolio per arrangement and aggregate, and validate invocation triggers and CIC reporting.",
      },
      {
        q: "Does the DPDP Act change anything for digital lenders?",
        a: "Yes — consent capture, retention and data-principal rights now overlap with DLG. We run DLG and DPDP as a combined engagement for digital lenders.",
      },
      {
        q: "What about the cooling-off / look-up period?",
        a: "DLG mandates a cooling-off period during which the borrower can exit the loan by paying principal + proportionate APR, without prepayment penalty. We test that the cancellation flow actually fires end-to-end.",
      },
      {
        q: "Do you cover BNPL and PPI-linked credit lines?",
        a: "Yes — RBI's June 2022 clarification on PPI + credit lines and the 2023 BNPL guardrails are part of the engagement where applicable.",
      },
    ],
    seoTitle: "RBI Digital Lending Audit | FLDG · DLG · LSP · DLA | Macksofy",
    seoDescription:
      "CERT-In empanelled RBI Digital Lending Guidelines audit — FLDG 5% cap, DLA permissions, KFS, cooling-off, data localisation. India.",
    keywords: [
      "RBI digital lending audit",
      "FLDG audit India",
      "DLG compliance audit",
      "LSP audit RBI",
      "DLA registration audit",
      "Key Facts Statement RBI",
      "digital lending NBFC audit",
      "RBI cooling off period audit",
      "fintech lending compliance India",
    ],
  },

  {
    slug: "rbi-it-governance",
    title: "RBI IT Governance Master Direction Audit",
    shortTitle: "RBI IT Gov MD",
    icon: Landmark,
    iconName: "Landmark",
    category: "Indian Regulatory",
    hero: {
      eyebrow: "RBI Master Direction · IT Governance, Risk, Controls & Assurance · 2023-24",
      tagline:
        "Board IT Strategy Committee to operator-level evidence — audited the way RBI inspectors read it.",
      description:
        "Audit against the RBI Master Direction on Information Technology Governance, Risk, Controls and Assurance Practices (effective 01-Apr-2024). Covers IT governance, IT services management, IT operations, information security, business continuity and IT audit obligations for banks, NBFCs, AIFIs and credit information companies.",
    },
    whyItMatters:
      "RBI Master Direction RBI/2023-24/107 dated 07-Nov-2023 (effective 01-Apr-2024) replaced two decades of fragmented IT-governance guidance with a single, prescriptive direction. The board IT Strategy Committee, IT Steering Committee, CISO independence, IT-services management lifecycle and IT-audit independence are now individually examinable. RBI inspections in 2024-25 have already cited dozens of REs for non-constitution of the IT Strategy Committee or CISO reporting through the CIO. Macksofy's audit produces the governance evidence, control-to-clause map and inspector walk-through pack required for a clean IT examination.",
    applicability: [
      "Scheduled Commercial Banks (excl. RRBs and LABs as per applicability matrix)",
      "Top, Upper and Middle Layer NBFCs per Scale-Based Regulation",
      "All-India Financial Institutions (NABARD, NHB, EXIM, SIDBI, NaBFID)",
      "Credit Information Companies regulated under CICRA",
      "Boards looking to pre-empt the FY25-26 IT examination cycle",
      "Group entities consolidated under banking-group IT governance",
    ],
    frameworks: [
      "RBI Master Direction on IT Governance, Risk, Controls and Assurance Practices (RBI/2023-24/107 dated 07-Nov-2023)",
      "RBI Cyber Security Framework for Banks (Jun 2016, updated)",
      "RBI Master Direction on Outsourcing of IT Services (RBI/2023-24/102 dated 10-Apr-2023)",
      "RBI IT Examination Framework + Annexures",
      "COBIT 2019 (mapped) + ISO 27001:2022",
      "ITIL 4 service-management practices",
      "ISO 22301 (BCP) — mapped where in scope",
    ],
    methodology: [
      {
        phase: "1 · Governance baseline",
        activities: [
          "Board IT Strategy Committee constitution + charter audit",
          "IT Steering Committee minutes + decision-trail walk",
          "CIO / CISO / Head-IT-Assurance independence test",
          "IT-strategy alignment with business-strategy evidence",
        ],
      },
      {
        phase: "2 · IT services & operations",
        activities: [
          "IT-services management lifecycle review (intake to retire)",
          "Change, release, configuration, problem, incident management",
          "Capacity, performance & availability management evidence",
          "Cryptographic-control inventory + lifecycle",
        ],
      },
      {
        phase: "3 · Risk, controls & information security",
        activities: [
          "IT-risk register + risk-acceptance audit trail",
          "Information-security policy + control-baseline currency",
          "Vulnerability + patch lifecycle SLA evidence",
          "Logging + monitoring + SOC capability assessment",
        ],
      },
      {
        phase: "4 · Business continuity & DR",
        activities: [
          "BCP / DR policy + tested RTO / RPO evidence",
          "DR drill cadence + lessons-learned closure",
          "Cyber-incident scenario in BCP testing",
          "Critical-system recovery walk-through",
        ],
      },
      {
        phase: "5 · IT assurance & audit",
        activities: [
          "IT-audit charter + Head-IT-Assurance independence",
          "Risk-based IT-audit plan adequacy",
          "Audit-finding closure + board reporting",
          "External-audit coverage gap analysis",
        ],
      },
      {
        phase: "6 · Reporting & inspection pack",
        activities: [
          "Clause-by-clause compliance attestation",
          "RBI IT examination walk-through deck",
          "Remediation roadmap + 30-day retest",
        ],
      },
    ],
    pillars: [
      {
        title: "Board & strategic governance",
        blurb: "IT Strategy Committee, IT Steering Committee and CISO independence — the three things RBI checks first.",
        points: [
          "IT Strategy Committee constitution + minute trail",
          "IT Steering Committee composition + decisions",
          "CISO reporting line independence from CIO",
        ],
      },
      {
        title: "IT services management",
        blurb: "End-to-end lifecycle from demand intake through retirement — auditable, not anecdotal.",
        points: [
          "Change / release / configuration evidence",
          "Capacity + performance management",
          "Cryptographic-key lifecycle + HSM controls",
        ],
      },
      {
        title: "IT operations & infrastructure",
        blurb: "The everyday running of the estate the rest of the MD assumes is in place.",
        points: [
          "Data-centre + DR site operations",
          "Backup, restore, integrity-test cadence",
          "Patch & vulnerability SLA evidence",
        ],
      },
      {
        title: "Information & cyber security",
        blurb: "Cross-mapped to the RBI CSF — the MD pulls security squarely into governance.",
        points: [
          "ISMS alignment + control baseline",
          "SOC + threat-monitoring capability evidence",
          "Cyber-incident reporting (CSITE 6h / CERT-In)",
        ],
      },
      {
        title: "Business continuity",
        blurb: "Tested RTO / RPO with cyber-incident scenarios in the drill plan.",
        points: [
          "BCP policy + scenario-based DR tests",
          "Cyber-incident scenario in BCP testing",
          "Critical-system recovery time evidence",
        ],
      },
      {
        title: "IT assurance & audit",
        blurb: "An independent IT-audit function, risk-based plan, and closure traceable to the board.",
        points: [
          "Head-IT-Assurance charter + independence",
          "Risk-based IT-audit plan + coverage",
          "Audit-finding closure + board reporting trail",
        ],
      },
    ],
    deliverables: [
      "Governance constitution pack — IT Strategy + Steering Committee charters",
      "CISO / Head-IT-Assurance independence attestation",
      "Clause-by-clause MD compliance register",
      "IT-services management lifecycle gap report",
      "BCP / DR drill evidence + cyber-scenario test report",
      "IT-audit charter + risk-based plan",
      "RBI IT-examination walk-through deck",
      "Free retest within 30 days + closure letter",
    ],
    caseStudies: [
      {
        industry: "Mid-tier private bank",
        engagement: "Pre-IT-examination MD readiness audit",
        outcome:
          "IT Strategy Committee re-constituted with independent director; CISO moved out of CIO reporting line; clean RBI IT examination with no major findings",
      },
      {
        industry: "Upper-Layer NBFC (listed)",
        engagement: "End-to-end MD audit + board reporting reset",
        outcome:
          "Risk-based IT-audit plan rolled out; quarterly IT-Strategy-Committee dashboard live; audit-finding closure cycle compressed from 180 to 60 days",
      },
    ],
    faqs: [
      {
        q: "When did the IT Governance Master Direction become effective?",
        a: "01-Apr-2024. RBI inspections from FY25 onwards are testing against it directly — including the constitution of the IT Strategy Committee and CISO independence.",
      },
      {
        q: "How is this different from the RBI CSF audit?",
        a: "The CSF is a controls framework; the MD is the governance umbrella. CSF sits inside the MD as the information-security pillar. We run them together where the entity needs both, or just the MD where CSF is already in cycle.",
      },
      {
        q: "Does the MD apply to small NBFCs and RRBs?",
        a: "Applicability is graded — Top / Upper / Middle Layer NBFCs are in scope; Base Layer is largely out. RRBs and LABs have a separate applicability statement. We confirm scope in the first kickoff workshop.",
      },
      {
        q: "What does a clean MD audit deliverable look like to RBI?",
        a: "A clause-by-clause attestation register with evidence references, governance constitution pack, IT-audit charter, and a remediation roadmap — submission-ready for the IT examination.",
      },
      {
        q: "Do you cover the IT Outsourcing Master Direction in the same engagement?",
        a: "They are sister directions — most clients run them together. We offer a combined IT-Governance + IT-Outsourcing engagement at a blended fee.",
      },
    ],
    seoTitle: "RBI IT Governance Master Direction Audit 2024 | Macksofy",
    seoDescription:
      "CERT-In empanelled audit of RBI Master Direction on IT Governance, Risk, Controls & Assurance (2024). Banks, NBFCs, AIFIs, CICs.",
    keywords: [
      "RBI IT Governance Master Direction",
      "RBI IT governance audit",
      "RBI MD 2024 audit",
      "IT Strategy Committee RBI",
      "CISO independence audit RBI",
      "RBI IT examination readiness",
      "NBFC IT governance audit",
      "Head IT Assurance RBI",
    ],
  },

  {
    slug: "rbi-it-outsourcing",
    title: "RBI IT Outsourcing Master Direction Audit",
    shortTitle: "RBI IT Outsourcing",
    icon: Cloud,
    iconName: "Cloud",
    category: "Indian Regulatory",
    hero: {
      eyebrow: "RBI Master Direction · Outsourcing of IT Services · 2023",
      tagline:
        "Vendor risk, cloud, offshoring and concentration — the IT-outsourcing audit RBI expects.",
      description:
        "Full audit against the RBI Master Direction on Outsourcing of Information Technology Services (Apr 2023). Covers vendor due-diligence, outsourcing-risk management, cloud and offshoring controls, concentration risk, exit management, sub-contracting and BCP for outsourced operations.",
    },
    whyItMatters:
      "RBI Master Direction RBI/2023-24/102 dated 10-Apr-2023 (effective 01-Oct-2023) was the first dedicated direction on IT outsourcing for banks, NBFCs and AIFIs. It explicitly covers cloud services, offshoring, sub-contracting and intra-group arrangements — the very surfaces where post-pandemic RE estates have ballooned. RBI now requires a comprehensive outsourcing policy, Outsourcing Risk Management Committee oversight, concentration-risk monitoring and a tested exit strategy for every material outsourcing. Inspection findings under the MD have included missing right-to-audit clauses, untested exits and unmapped fourth-party concentration. Macksofy's audit produces the vendor-by-vendor evidence pack RBI inspections accept on first read.",
    applicability: [
      "Scheduled Commercial Banks (excl. RRBs / LABs as per applicability)",
      "Top, Upper and Middle Layer NBFCs per Scale-Based Regulation",
      "All-India Financial Institutions",
      "Credit Information Companies under CICRA",
      "REs running material cloud workloads (IaaS / PaaS / SaaS)",
      "REs with offshore captives or intra-group IT arrangements",
    ],
    frameworks: [
      "RBI Master Direction on Outsourcing of IT Services (RBI/2023-24/102 dated 10-Apr-2023)",
      "RBI Guidelines on Managing Risks in Outsourcing of Financial Services (2006, updated)",
      "RBI Master Direction on IT Governance (RBI/2023-24/107 dated 07-Nov-2023)",
      "RBI Storage of Payment System Data (Apr 2018)",
      "BCBS 239 + FSB outsourcing & third-party-risk principles",
      "ISO 27036 (supplier security) + ISO 27017 (cloud)",
      "DPDP Act 2023 — processor / sub-processor obligations",
    ],
    methodology: [
      {
        phase: "1 · Outsourcing inventory",
        activities: [
          "Material vs non-material outsourcing classification",
          "Vendor + sub-contractor + fourth-party register",
          "Cloud workload inventory (IaaS / PaaS / SaaS)",
          "Offshoring + intra-group arrangement map",
        ],
      },
      {
        phase: "2 · Policy & governance",
        activities: [
          "Board-approved outsourcing policy review",
          "Outsourcing Risk Management Committee charter + minutes",
          "Roles: Senior Management / IT function / IT-Risk function",
          "Approval workflow for material outsourcing",
        ],
      },
      {
        phase: "3 · Due-diligence & contracts",
        activities: [
          "Vendor due-diligence pack adequacy",
          "Right-to-audit + RBI access clauses in contracts",
          "Data-localisation + cross-border clauses",
          "Sub-contracting consent + chain-of-control",
        ],
      },
      {
        phase: "4 · Cloud & offshoring controls",
        activities: [
          "Shared-responsibility-matrix evidence",
          "Cloud configuration + tenancy + key-management audit",
          "Offshore captive / vendor location risk",
          "Data-residency + sovereignty evidence",
        ],
      },
      {
        phase: "5 · Risk monitoring & exit",
        activities: [
          "Concentration-risk dashboard (vendor / geography / cloud region)",
          "BCP / DR for outsourced operations — tested",
          "Documented + tested exit strategy",
          "Continuous monitoring KPIs + breach triggers",
        ],
      },
      {
        phase: "6 · Reporting & inspection pack",
        activities: [
          "Vendor-by-vendor compliance attestation",
          "Material-outsourcing register submission pack",
          "Inspector walk-through deck",
          "Remediation tracker + 30-day retest",
        ],
      },
    ],
    pillars: [
      {
        title: "Outsourcing policy & oversight",
        blurb: "Board policy and an Outsourcing Risk Management Committee that actually meets.",
        points: [
          "Board-approved outsourcing policy currency",
          "ORM Committee minutes + decision trail",
          "Material vs non-material classification rigour",
        ],
      },
      {
        title: "Vendor due-diligence",
        blurb: "Pre-onboarding rigour matched to the materiality of the arrangement.",
        points: [
          "Financial + operational + security due-diligence pack",
          "Sub-contractor disclosure + consent",
          "Reputation + sanctions screening",
        ],
      },
      {
        title: "Contract & right-to-audit",
        blurb: "Every material contract must give the RE — and RBI — a clean line of sight.",
        points: [
          "Right-to-audit + RBI access clauses",
          "Data-protection + data-localisation clauses",
          "SLAs + breach + termination clauses",
        ],
      },
      {
        title: "Cloud & offshoring",
        blurb: "The fastest-growing risk surface — and the one RBI is testing most aggressively.",
        points: [
          "Shared-responsibility-matrix evidence",
          "Encryption + key-management ownership",
          "Data-residency + sovereignty controls",
        ],
      },
      {
        title: "Concentration & exit",
        blurb: "What happens when one vendor — or one cloud region — has too much of the bank in it.",
        points: [
          "Concentration-risk dashboard (vendor / region / cloud)",
          "Tested exit strategy with portability evidence",
          "BCP for outsourced operations",
        ],
      },
      {
        title: "Continuous monitoring",
        blurb: "Outsourcing risk is dynamic — the audit validates the monitoring that catches drift.",
        points: [
          "KPI + SLA monitoring evidence",
          "Sub-contractor change-notification trail",
          "Annual reassessment + board reporting",
        ],
      },
    ],
    deliverables: [
      "Material-outsourcing register (board-ready)",
      "Vendor-by-vendor compliance attestation",
      "Cloud + offshoring controls evidence pack",
      "Concentration-risk dashboard",
      "Tested exit-strategy playbook (per material vendor)",
      "Contract clause gap report + remediation tracker",
      "RBI inspector walk-through deck",
      "Free retest within 30 days + closure letter",
    ],
    caseStudies: [
      {
        industry: "Foreign bank (India branches)",
        engagement: "IT outsourcing MD audit incl. intra-group + offshore captive",
        outcome:
          "All material intra-group arrangements re-papered with right-to-audit + data-residency clauses; concentration on parent-group cloud region quantified and board-accepted",
      },
      {
        industry: "Listed NBFC (Upper Layer)",
        engagement: "Cloud + LSP outsourcing audit",
        outcome:
          "Shared-responsibility matrix signed off per workload; exit strategy tabletop-tested for the two most material vendors; clean RBI thematic review",
      },
    ],
    faqs: [
      {
        q: "Does the MD apply to SaaS that we don't host?",
        a: "Yes — material SaaS is in scope. The materiality test is risk- and impact-based, not delivery-model based. Core-banking SaaS, loan-origination SaaS and CRM SaaS handling customer data are typically material.",
      },
      {
        q: "What about intra-group arrangements with a parent or sister entity?",
        a: "Explicitly in scope. RBI does not exempt intra-group outsourcing. We treat them with the same DD, contract and exit rigour as third-party arrangements.",
      },
      {
        q: "How is concentration risk measured?",
        a: "Across vendor, geography, cloud region and fourth-party dimensions. We build a concentration heatmap that the ORM Committee owns quarterly.",
      },
      {
        q: "Can we run this alongside the IT Governance MD audit?",
        a: "Yes — they are sister directions and most clients run them together. Shared evidence (board minutes, BCP, audit charter) is harvested once.",
      },
      {
        q: "What about cross-border data flows for cloud workloads?",
        a: "We test against the MD's localisation expectations, the Apr-2018 payment-data localisation directive, sectoral overlays (SEBI / IRDAI) and DPDP cross-border restrictions.",
      },
    ],
    seoTitle: "RBI IT Outsourcing Master Direction Audit | Macksofy",
    seoDescription:
      "CERT-In empanelled audit of the RBI IT Outsourcing Master Direction (2023). Vendor risk, cloud, offshoring, concentration, exit.",
    keywords: [
      "RBI IT outsourcing audit",
      "RBI outsourcing Master Direction",
      "cloud outsourcing audit RBI",
      "vendor risk audit India",
      "RBI right to audit clause",
      "concentration risk RBI",
      "exit strategy RBI outsourcing",
      "RBI cloud compliance India",
    ],
  },

  {
    slug: "sebi-mii",
    title: "SEBI MII Cybersecurity Framework Audit",
    shortTitle: "SEBI MII",
    icon: TrendingUp,
    iconName: "TrendingUp",
    category: "Indian Regulatory",
    hero: {
      eyebrow: "SEBI · Stock Exchanges · Clearing Corporations · Depositories",
      tagline:
        "MII-grade cyber audit — 99.99% availability, capacity-tested, cross-MII coordinated.",
      description:
        "Cybersecurity and cyber-resilience audit for Market Infrastructure Institutions — Stock Exchanges, Clearing Corporations and Depositories. Covers the SEBI MII cyber framework, the CSCRF MII tier, capacity planning, cyber-resilience drills and cross-MII coordination obligations.",
    },
    whyItMatters:
      "MIIs sit at the apex of India's capital-market plumbing — a single outage propagates across every broker, AMC and investor. SEBI's MII cyber framework (originating with SEBI/HO/MIRSD/CIR/P/2018/147 and consolidated under CSCRF in 2024-25) mandates 99.99% availability, periodic capacity testing, red-team exercises, cross-MII cyber drills and quarterly SEBI reporting. Non-MII brokers run against the CSCRF Qualified / Mid-size / Small RE tiers — but MIIs face the strictest bar, with SEBI inspections, SOP-2 access reviews and ETP reporting layered on top. Macksofy's MII audit produces the cyber-resilience, capacity and cross-MII evidence pack SEBI's IT department reviews quarterly.",
    applicability: [
      "Stock Exchanges (BSE, NSE, MSE, MCX, NCDEX, etc.)",
      "Clearing Corporations (NSCCL, ICCL, MCCIL, NCCL, etc.)",
      "Depositories (NSDL, CDSL)",
      "MII subsidiaries running critical capital-market services",
      "MII-style entities seeking IOSCO-aligned attestation",
      "MII technology providers (where SEBI access extends)",
    ],
    frameworks: [
      "SEBI Cybersecurity & Cyber Resilience Framework (CSCRF) — MII tier (SEBI/HO/MIRSD/CRADT/CIR/P/2024/113 dated 20-Aug-2024 and successors)",
      "SEBI Cybersecurity & Cyber Resilience Framework for MIIs (SEBI/HO/MIRSD/CIR/P/2018/147)",
      "SEBI Business Continuity Plan & Disaster Recovery for MIIs",
      "SEBI Outsourcing by Stock Exchanges, Clearing Corporations & Depositories",
      "IOSCO Principles for Financial Market Infrastructures (PFMI)",
      "ISO 27001:2022 + ISO 22301 (BCP)",
      "NIST CSF 2.0 (cross-mapped)",
      "CERT-In incident-reporting obligations",
    ],
    methodology: [
      {
        phase: "1 · MII tier scoping",
        activities: [
          "Critical-system inventory (matching, clearing, settlement, depository)",
          "RTO / RPO + 99.99% availability commitment baseline",
          "Cross-MII dependency mapping",
          "SEBI / IT-Committee + IOSCO PFMI alignment",
        ],
      },
      {
        phase: "2 · Cybersecurity controls",
        activities: [
          "CSCRF MII-tier control assessment",
          "Identity, access, privileged-access, MFA evidence",
          "Network segmentation + microsegmentation",
          "Cryptographic-control + HSM lifecycle",
        ],
      },
      {
        phase: "3 · Cyber resilience & capacity",
        activities: [
          "Capacity-planning + stress-testing evidence",
          "Cyber-resilience drill (matching engine failover)",
          "Active-active / hot-DR validation",
          "Recovery-time + recovery-point empirical evidence",
        ],
      },
      {
        phase: "4 · Threat operations",
        activities: [
          "24×7 SOC capability + use-case coverage",
          "Threat-intel ingestion + TTP coverage (ATT&CK)",
          "Red-team + purple-team exercise evidence",
          "Vulnerability + patch SLA per criticality",
        ],
      },
      {
        phase: "5 · Cross-MII & ecosystem",
        activities: [
          "Cross-MII cyber-drill participation evidence",
          "Member / broker connectivity security audit",
          "Outsourcing + third-party risk per SEBI outsourcing circular",
          "Incident-reporting to SEBI + CERT-In (6h)",
        ],
      },
      {
        phase: "6 · Reporting & SEBI pack",
        activities: [
          "Quarterly SEBI cyber-report format",
          "CSCRF System Audit Report draft",
          "IT-Committee + Board cybersecurity dashboard",
          "Remediation tracker + 30-day retest",
        ],
      },
    ],
    pillars: [
      {
        title: "MII availability & capacity",
        blurb: "99.99% is not a marketing target — SEBI tests it quarter on quarter.",
        points: [
          "Capacity-planning + stress-test evidence",
          "Active-active / hot-DR validation",
          "Latency + jitter monitoring at matching layer",
        ],
      },
      {
        title: "Cyber resilience drills",
        blurb: "Tested failover under cyber-incident scenarios, not just hardware faults.",
        points: [
          "Annual cyber-resilience drill participation",
          "Cross-MII coordinated drill evidence",
          "Recovery-time empirical proof per critical system",
        ],
      },
      {
        title: "MII-tier security controls",
        blurb: "CSCRF MII tier — the strictest control baseline in the SEBI universe.",
        points: [
          "Privileged-access + MFA + JIT controls",
          "Network segmentation + microsegmentation",
          "Crypto + HSM lifecycle management",
        ],
      },
      {
        title: "Threat operations & red-team",
        blurb: "Continuous threat detection plus periodic adversary-emulation testing.",
        points: [
          "24×7 SOC use-case + ATT&CK coverage",
          "Threat-intel ingestion + sharing",
          "Red-team + purple-team annual exercise",
        ],
      },
      {
        title: "Ecosystem & cross-MII",
        blurb: "The MII is only as resilient as the brokers, clearing members and inter-MII links it touches.",
        points: [
          "Member-connectivity security audit",
          "Cross-MII drill + information sharing",
          "Outsourcing + third-party risk evidence",
        ],
      },
      {
        title: "SEBI reporting & governance",
        blurb: "What the IT Committee, Board and SEBI see — in the cadence SEBI sets.",
        points: [
          "Quarterly SEBI cyber report",
          "IT-Committee + Board cyber dashboard",
          "Incident reporting (SEBI + CERT-In 6h)",
        ],
      },
    ],
    deliverables: [
      "CSCRF MII-tier compliance attestation",
      "Capacity + cyber-resilience drill evidence pack",
      "Red-team + purple-team executive report",
      "Cross-MII coordination evidence file",
      "Quarterly SEBI cyber-report template + first submission",
      "IT-Committee + Board cybersecurity dashboard",
      "Member-connectivity security audit pack",
      "Free retest within 30 days + closure letter",
    ],
    caseStudies: [
      {
        industry: "Tier-1 Depository",
        engagement: "CSCRF MII-tier audit + cross-MII drill facilitation",
        outcome:
          "Cross-MII drill cleared end-to-end; 99.99% availability empirically evidenced; SEBI quarterly report cycle reduced from 14 to 5 working days",
      },
      {
        industry: "National Stock Exchange (commodity segment)",
        engagement: "Capacity test + cyber-resilience drill",
        outcome:
          "Matching-engine failover validated under simulated DDoS + insider scenarios; recovery-time empirical evidence accepted by SEBI without queries",
      },
    ],
    faqs: [
      {
        q: "Is the MII tier the same as the Qualified RE tier under CSCRF?",
        a: "No. The MII tier is the apex tier — stricter controls than Qualified REs, with availability, capacity-testing and cross-MII obligations layered on top.",
      },
      {
        q: "How often is the cyber-resilience drill required?",
        a: "Annual at minimum, with quarterly internal validation; cross-MII coordinated drills run on the SEBI-set calendar.",
      },
      {
        q: "What about IOSCO PFMI alignment?",
        a: "MIIs benchmark against IOSCO PFMI Principle 17 (operational risk) and Principle 22 (communication). We cross-map CSCRF MII controls to PFMI for global counterparty due-diligence.",
      },
      {
        q: "Do you cover the SEBI outsourcing circular for MIIs?",
        a: "Yes — outsourcing by MIIs is in scope, including critical IT outsourcing, cloud and intra-group arrangements.",
      },
      {
        q: "Can you support red-team exercises in-house?",
        a: "Yes — Macksofy's offensive-security team runs MII-grade red-team and purple-team exercises with regulator-acceptable rules of engagement.",
      },
    ],
    seoTitle: "SEBI MII Cybersecurity Audit | CSCRF MII Tier | Macksofy",
    seoDescription:
      "CERT-In empanelled SEBI Market Infrastructure Institution cyber audit — CSCRF MII tier, 99.99% availability, cross-MII drills.",
    keywords: [
      "SEBI MII audit",
      "Market Infrastructure Institution cyber audit",
      "CSCRF MII tier audit",
      "stock exchange cyber audit India",
      "clearing corporation cyber audit",
      "depository cyber audit India",
      "SEBI cyber resilience drill",
      "IOSCO PFMI cyber audit",
    ],
  },

  {
    slug: "dpdp-sdf",
    title: "DPDP Significant Data Fiduciary Audit",
    shortTitle: "DPDP SDF",
    icon: FileBadge,
    iconName: "FileBadge",
    category: "Indian Regulatory",
    hero: {
      eyebrow: "DPDP Act 2023 · Section 10 · Significant Data Fiduciaries",
      tagline:
        "DPIA, DPO, independent data audit — the SDF obligations that sit on top of base DPDP.",
      description:
        "Independent Section 10 audit for Significant Data Fiduciaries under the DPDP Act 2023. Covers Data Protection Impact Assessment, independent data auditor obligations, DPO charter, algorithmic-risk review and periodic Section 10 attestation — complementary to the base DPDP audit, not a duplicate.",
    },
    whyItMatters:
      "Once the Central Government notifies an entity (or class of entities) as a Significant Data Fiduciary under Section 10 of the DPDP Act 2023, base-tier obligations escalate sharply — appointment of a Data Protection Officer based in India, an independent Data Auditor, periodic Data Protection Impact Assessments, periodic compliance audits and additional algorithmic-risk obligations for processing that involves risk to the rights of Data Principals. Penalties under Schedule remain at up to ₹250 crore per breach. SDF notification is expected to land on large social-media intermediaries, e-commerce, edtech, healthcare platforms and AI-driven fiduciaries first. Macksofy's SDF audit is run by independent personnel, separately scoped from the base DPDP engagement, and produces a Section-10-grade attestation pack the Data Protection Board can rely on.",
    applicability: [
      "Entities notified or likely to be notified as SDFs under Section 10",
      "Large e-commerce / social media intermediaries / edtech platforms",
      "Healthcare + financial fiduciaries processing sensitive personal data at scale",
      "AI / ML platforms processing personal data with rights-impact",
      "Multi-jurisdictional Data Fiduciaries (GDPR + DPDP overlap)",
      "Boards wanting voluntary SDF-grade attestation ahead of notification",
    ],
    frameworks: [
      "Section 10, Digital Personal Data Protection Act 2023",
      "DPDP Rules — DPO, Data Auditor, DPIA notifications (in stages)",
      "Sectoral overlays — RBI / SEBI / IRDAI / TRAI",
      "ISO 27701 (PIMS) — privacy-management cross-walk",
      "ISO 42001 (AI management) — for algorithmic-risk obligations",
      "GDPR Article 35 (DPIA) + Article 37-39 (DPO) — mapped for multinationals",
      "OECD AI Principles + NIST AI RMF — for rights-impact analysis",
    ],
    methodology: [
      {
        phase: "1 · SDF scope confirmation",
        activities: [
          "SDF notification status / likelihood assessment",
          "Volume + sensitivity + risk-to-rights triggers analysis",
          "Cross-border + algorithmic-processing inventory",
          "Independent-auditor independence attestation",
        ],
      },
      {
        phase: "2 · DPIA programme audit",
        activities: [
          "DPIA methodology review vs Section 10(2)(c)",
          "DPIA inventory across high-risk processing",
          "Algorithmic / AI-system DPIA depth check",
          "Residual-risk acceptance + board sign-off trail",
        ],
      },
      {
        phase: "3 · DPO charter & operations",
        activities: [
          "DPO appointment + Indian-residency confirmation",
          "DPO reporting line + board access independence",
          "DPO RACI + grievance-redressal SLA evidence",
          "DPO training + tooling assessment",
        ],
      },
      {
        phase: "4 · Independent data audit",
        activities: [
          "Section 10(2)(d) periodic audit execution",
          "Control testing against DPDP Section 8 baseline",
          "Processor + sub-processor flow-through audit",
          "Independent-auditor report drafting",
        ],
      },
      {
        phase: "5 · Algorithmic & rights-impact review",
        activities: [
          "Algorithmic-fairness + bias review",
          "Automated-decision impact on data-principal rights",
          "Children + sensitive-data special handling",
          "Cross-border processing rights-impact",
        ],
      },
      {
        phase: "6 · Attestation & DPB pack",
        activities: [
          "Section 10 compliance attestation",
          "DPIA + audit + DPO evidence vault",
          "DPB inquiry-response template",
          "Annual SDF audit calendar + rollover plan",
        ],
      },
    ],
    pillars: [
      {
        title: "SDF designation & scope",
        blurb: "Where the SDF bar applies — based on volume, sensitivity and risk-to-rights triggers.",
        points: [
          "SDF notification status / likelihood",
          "Volume + sensitivity + risk-to-rights triggers",
          "Sectoral overlay (RBI / SEBI / IRDAI / TRAI)",
        ],
      },
      {
        title: "DPIA programme",
        blurb: "A repeatable DPIA programme — not a one-off PDF exercise.",
        points: [
          "DPIA methodology + cadence",
          "Algorithmic / AI-system DPIA depth",
          "Residual-risk acceptance + board sign-off",
        ],
      },
      {
        title: "Data Protection Officer",
        blurb: "An India-based DPO with the independence and access the law requires.",
        points: [
          "Indian-residency + reporting-line independence",
          "Board access + grievance-redressal SLA",
          "DPO training, budget and tooling",
        ],
      },
      {
        title: "Independent data audit",
        blurb: "Section 10(2)(d) — a separate, periodic, independent audit.",
        points: [
          "Independent-auditor independence attestation",
          "Control testing vs Section 8 baseline",
          "Processor + sub-processor flow-through",
        ],
      },
      {
        title: "Algorithmic & rights-impact",
        blurb: "Where AI / automated processing meets data-principal rights — the new SDF frontier.",
        points: [
          "Algorithmic fairness + bias review",
          "Automated-decision impact on rights",
          "Children + sensitive-data handling",
        ],
      },
      {
        title: "DPB readiness",
        blurb: "Artefacts the Data Protection Board can consume on first request.",
        points: [
          "Section 10 attestation pack",
          "DPIA + audit + DPO evidence vault",
          "DPB inquiry-response template",
        ],
      },
    ],
    deliverables: [
      "Section 10 SDF compliance attestation",
      "DPIA methodology + cadence playbook",
      "DPO charter + RACI + board reporting template",
      "Independent Data Auditor report (Section 10(2)(d))",
      "Algorithmic-risk + automated-decision register",
      "DPB inquiry-response template + tabletop drill output",
      "Annual SDF audit calendar + rollover plan",
      "Penalty-exposure simulation (up to ₹250 cr) for board",
    ],
    caseStudies: [
      {
        industry: "Edtech (K-12 + test-prep)",
        engagement: "Voluntary SDF-grade audit ahead of expected notification",
        outcome:
          "DPO charter + DPIA programme stood up across 6 product lines; algorithmic-recommendation review surfaced two high-risk processing flows that were re-designed before SDF notification could land",
      },
      {
        industry: "Digital-lending NBFC",
        engagement: "DPDP SDF + RBI digital-lending overlap audit",
        outcome:
          "Single combined evidence vault served both RBI digital-lending inspection and the DPDP independent-auditor obligation; DPO appointment finalised with reporting line to the Board Risk Committee",
      },
    ],
    faqs: [
      {
        q: "How do we know if we are a Significant Data Fiduciary?",
        a: "The Central Government notifies SDFs based on factors including volume and sensitivity of personal data, risk to the rights of Data Principals, risk to electoral democracy, sovereignty and integrity of India, security of the State, and public order. Many large platforms expect to be in the first SDF notification — we run the trigger analysis as the first step.",
      },
      {
        q: "Is this audit the same as the base DPDP audit?",
        a: "No — and it should not be run by the same team. The base DPDP audit covers Sections 4-9 obligations on every Data Fiduciary. The SDF audit is the Section 10 layer on top: DPIA, DPO, independent auditor and additional measures. We staff them independently.",
      },
      {
        q: "Who can act as the Independent Data Auditor under Section 10(2)(d)?",
        a: "An independent professional with adequate qualifications, not involved in the day-to-day operation of the Data Fiduciary's privacy programme. Macksofy is structured to provide a Section-10-grade independent auditor distinct from any advisory engagement.",
      },
      {
        q: "Does the DPO have to be in India?",
        a: "Yes — Section 10(2)(a) requires the DPO to be based in India and answerable to the board / governing body. We provide DPO-as-a-Service for entities scaling into SDF status.",
      },
      {
        q: "How often is the DPIA needed?",
        a: "Section 10(2)(c) requires periodic DPIAs; the Rules will specify cadence. Best practice today is annual at minimum, with a triggered DPIA for any new high-risk processing or material algorithmic change.",
      },
      {
        q: "What about overlap with GDPR Article 35 / 37?",
        a: "Roughly 80% of the DPIA and DPO controls map across. We build a single 'highest-bar' programme so multinationals do not run parallel privacy stacks.",
      },
    ],
    seoTitle: "DPDP SDF Audit | Section 10 · DPO · DPIA | Macksofy",
    seoDescription:
      "Independent Section 10 audit for Significant Data Fiduciaries under the DPDP Act 2023 — DPIA, DPO, independent data auditor, algorithmic risk.",
    keywords: [
      "DPDP Significant Data Fiduciary audit",
      "SDF audit India",
      "Section 10 DPDP Act audit",
      "DPIA India",
      "Data Protection Officer DPDP",
      "independent data auditor India",
      "algorithmic risk audit DPDP",
      "DPDP Act compliance audit India",
      "SDF DPO as a service",
    ],
  },

  // === UAE / GCC regulator pillar (uae-pdpl · nesa-uae-ias · adhics · desc-isr · sama-csf · cbuae-cyber · nca-ecc-2) ===
  {
    slug: "uae-pdpl",
    title: "UAE PDPL Compliance Audit",
    shortTitle: "UAE PDPL",
    icon: Lock,
    iconName: "Lock",
    category: "GCC Regulatory",
    hero: {
      eyebrow: "UAE Federal Personal Data Protection Law",
      tagline:
        "End-to-end PDPL readiness — controller register, consent, DPO, cross-border transfers.",
      description:
        "Full UAE Federal Decree-Law No. 45 of 2021 readiness — applicability assessment, data inventory, lawful-basis register, data-subject rights, controller / processor obligations, breach notification to the UAE Data Office and cross-border transfer controls. Designed for entities established in the UAE mainland and those processing UAE-resident data from abroad.",
    },
    whyItMatters:
      "The UAE PDPL (Federal Decree-Law No. 45 of 2021) is the federal-level privacy regime that sits alongside the sectoral DIFC DP Law and ADGM DP Regulations. The Data Office (under the UAE Cybersecurity Council) supervises enforcement and the implementing Executive Regulations finalise penalty quantum, breach windows and DPO triggers. Boards that treat PDPL as a policy refresh miss the heavier obligations — cross-border transfer impact assessments, controller-to-processor contracting and the Data Office's evidence expectations during a complaint.",
    applicability: [
      "Entities established in the UAE mainland (outside DIFC / ADGM free zones)",
      "Controllers and processors handling UAE-resident personal data from outside the UAE",
      "Healthcare, banking, telecom, e-commerce, edtech, HR services processing UAE data",
      "Multinationals running shared services or BPO in the UAE for global clients",
      "Cloud / SaaS providers with UAE data-residency commitments to customers",
    ],
    frameworks: [
      "UAE Federal Decree-Law No. 45 of 2021 — Personal Data Protection",
      "Executive Regulations (latest published version)",
      "UAE Data Office decisions and guidance",
      "DIFC Data Protection Law No. 5 of 2020 (free-zone overlap)",
      "ADGM Data Protection Regulations 2021 (free-zone overlap)",
      "GDPR mapping for multinationals",
      "ISO 27701 Privacy Information Management",
    ],
    methodology: [
      {
        phase: "1 · Applicability + role",
        activities: [
          "Federal vs DIFC / ADGM jurisdiction assessment",
          "Controller / processor / joint-controller determination",
          "Mainland establishment + extraterritorial test",
        ],
      },
      {
        phase: "2 · Data inventory + RoPA",
        activities: [
          "Personal-data discovery across UAE entities + cloud",
          "Records of processing activities",
          "Sensitive personal data + criminal data flagging",
          "Cross-border transfer mapping",
        ],
      },
      {
        phase: "3 · Lawful basis + rights",
        activities: [
          "Consent capture + withdrawal flow",
          "Lawful-basis register per processing activity",
          "Data-subject request workflow + SLA",
        ],
      },
      {
        phase: "4 · Security + breach",
        activities: [
          "Article 20 appropriate technical + organisational measures",
          "Breach detection + Data Office notification SOP",
          "Processor + sub-processor contract uplift",
        ],
      },
      {
        phase: "5 · Governance + DPO",
        activities: [
          "DPO appointment where triggered (Article 10)",
          "Data Office registration / complaint response readiness",
          "Annual PDPL audit + board reporting cadence",
        ],
      },
    ],
    deliverables: [
      "PDPL applicability + jurisdiction memo (federal vs free zone)",
      "Records of Processing Activities for UAE operations",
      "Lawful-basis + consent template pack (Arabic + English)",
      "Cross-border transfer impact assessment pack",
      "Data-subject rights portal + workflow spec",
      "Breach notification SOP aligned to Data Office timelines",
      "DPO charter (where triggered) + board reporting deck",
    ],
    pillars: [
      {
        title: "Applicability & jurisdiction",
        blurb: "Federal PDPL, DIFC and ADGM regimes overlap — clean scoping prevents double work.",
        points: [
          "Mainland vs free-zone establishment test",
          "Extraterritorial-processing assessment",
          "Sector-overlay mapping (healthcare, telecom, finance)",
        ],
      },
      {
        title: "Data inventory & RoPA",
        blurb: "Article 6 + 17 evidence — the artefact the Data Office samples first.",
        points: [
          "Personal-data discovery across UAE systems",
          "Sensitive + criminal-data classification",
          "Processing-activity register with retention",
        ],
      },
      {
        title: "Lawful basis & consent",
        blurb: "Bilingual consent and Article 5 lawful-basis evidence built for UAE residents.",
        points: [
          "Arabic + English consent UX",
          "Withdrawal + objection flow validation",
          "Legitimate-interest balancing tests",
        ],
      },
      {
        title: "Data-subject rights",
        blurb: "Access, correction, erasure, portability and objection workflows under Articles 13-16.",
        points: [
          "Rights-request intake + SLA workflow",
          "Identity verification controls",
          "Automated-decision opt-out evidence",
        ],
      },
      {
        title: "Cross-border transfer",
        blurb: "Articles 22-23 — adequacy, contractual safeguards and Data Office approvals.",
        points: [
          "Adequacy-list reliance + monitoring",
          "Standard contractual clauses + safeguards",
          "Transfer-impact assessment per recipient country",
        ],
      },
      {
        title: "Breach response & DPO",
        blurb: "Notification to the UAE Data Office, processor coordination and DPO independence.",
        points: [
          "Detection-to-notification timeline drill",
          "DPO appointment + reporting lines",
          "Data Office complaint response pack",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "UAE-headquartered fintech (mainland)",
        engagement: "PDPL readiness + DIFC overlap mapping",
        outcome:
          "Single privacy program covered mainland PDPL and DIFC DP Law; cleared two enterprise customer privacy diligences in one quarter",
      },
      {
        industry: "Global SaaS with UAE data-residency offering",
        engagement: "RoPA + cross-border transfer architecture",
        outcome:
          "Transfer-impact assessments completed for 14 sub-processors; UAE customer contracts uplifted with PDPL-compliant DPA",
      },
    ],
    faqs: [
      {
        q: "Does PDPL apply if we have no UAE entity?",
        a: "Yes — if you process personal data of UAE residents from outside the UAE, the law applies extraterritorially. Establishment in DIFC or ADGM puts you under their separate free-zone DP laws instead.",
      },
      {
        q: "When are PDPL fines enforceable?",
        a: "The substantive law is in force. Specific penalty quantum and breach windows are set by the Executive Regulations — treat enforcement as live, not future-state.",
      },
      {
        q: "Do we need a DPO?",
        a: "Article 10 lists triggers — high-risk processing, large-scale sensitive data and systematic monitoring. Even where optional, we recommend a DPO-equivalent role for regulated sectors.",
      },
      {
        q: "How does PDPL overlap with GDPR?",
        a: "Roughly 70% of controls map directly. Macksofy builds a single 'highest-bar' program so multinationals don't run two parallel privacy stacks.",
      },
      {
        q: "What about DIFC and ADGM?",
        a: "DIFC follows DP Law No. 5 of 2020, ADGM follows its 2021 Regulations. Both are GDPR-style and operate independently of the federal PDPL — we scope per legal-entity footprint.",
      },
    ],
    seoTitle: "UAE PDPL Compliance Audit | Federal Data Protection | Macksofy",
    seoDescription:
      "UAE Federal PDPL (Decree-Law 45 of 2021) audit — RoPA, consent, cross-border transfer, DPO. Dubai + Abu Dhabi.",
    keywords: [
      "UAE PDPL audit",
      "UAE data protection law compliance",
      "Federal Decree-Law 45 of 2021",
      "PDPL Dubai",
      "PDPL Abu Dhabi",
      "UAE Data Office",
      "DIFC DP Law overlap",
      "ADGM data protection",
      "DPO UAE",
      "cross-border transfer UAE",
    ],
  },

  {
    slug: "nesa-uae-ias",
    title: "UAE Information Assurance (NESA / IAS) Audit",
    shortTitle: "UAE IAS",
    icon: ShieldCheck,
    iconName: "ShieldCheck",
    category: "GCC Regulatory",
    hero: {
      eyebrow: "UAE IA Standards · formerly NESA · now under TDRA / Cyber Security Council",
      tagline:
        "Tier-1 to Tier-4 IA Standards audit for UAE critical sectors and federal entities.",
      description:
        "Full UAE Information Assurance Standards audit — applicability and tiering, 60 management + 128 technical control assessment, sector-overlay alignment and submission pack for the Cyber Security Council / TDRA. Covers government entities, semi-government and Critical Information Infrastructure operators across energy, finance, telecom, transport and health.",
    },
    whyItMatters:
      "The framework originally published by the National Electronic Security Authority (NESA) is now maintained under the UAE Cyber Security Council with TDRA as the operational regulator — but the structure remains the IA Standards Tier-1 through Tier-4, with controls graded by sector criticality. UAE government entities, CII operators and their major suppliers are expected to evidence compliance as part of TDRA / sector-regulator audit cycles. Macksofy's IAS audit is sequenced the way the regulator reads it: priority controls, risk-based tier selection and technical evidence rather than narrative.",
    applicability: [
      "UAE federal and emirate-level government entities",
      "Critical Information Infrastructure operators (energy, finance, telecom, transport, health)",
      "Semi-government entities and government-owned enterprises",
      "Strategic suppliers and managed-service providers to government / CII",
      "Large UAE enterprises adopting IAS voluntarily as a national baseline",
      "Cloud + data-centre operators hosting government workloads",
    ],
    frameworks: [
      "UAE Information Assurance Standards (latest published version)",
      "UAE Information Assurance Regulation",
      "Cyber Security Council National Cybersecurity Strategy",
      "TDRA sector cybersecurity directives",
      "Critical Information Infrastructure Protection Policy",
      "ISO 27001 / ISO 27002 (mapped)",
      "NIST SP 800-53 (mapped)",
    ],
    methodology: [
      {
        phase: "1 · Tiering + scoping",
        activities: [
          "Sector + criticality assessment",
          "Tier-1 to Tier-4 control set selection",
          "Crown-jewel + CII asset identification",
        ],
      },
      {
        phase: "2 · Management controls (M1-M6)",
        activities: [
          "Strategy + governance review",
          "Risk-management framework evidence",
          "Awareness, HR, third-party + asset management",
        ],
      },
      {
        phase: "3 · Technical controls (T1-T9)",
        activities: [
          "Operations + communications security",
          "Access control + cryptography",
          "Physical, OT and information-systems acquisition controls",
        ],
      },
      {
        phase: "4 · Technical validation",
        activities: [
          "VAPT scoped to CII boundaries",
          "Configuration audit on priority systems",
          "Incident-response + log-monitoring efficacy",
        ],
      },
      {
        phase: "5 · Submission + regulator support",
        activities: [
          "TDRA / Cyber Security Council submission pack",
          "Sector-regulator alignment (CBUAE / DOH / DESC)",
          "Closure + revalidation cycle",
        ],
      },
    ],
    deliverables: [
      "IAS tier classification + scoping memo",
      "Control-by-control compliance register (M1-M6, T1-T9)",
      "Technical validation report (VAPT + config audit)",
      "Risk treatment plan with priority + ETA",
      "Regulator submission pack (TDRA / sector regulator)",
      "Tabletop incident-response evidence",
      "Annual recertification plan",
    ],
    pillars: [
      {
        title: "Tiering & applicability",
        blurb: "IAS controls scale by tier — Tier-1 to Tier-4 — and incorrect tiering inflates cost without lowering risk.",
        points: [
          "Sector-criticality classification",
          "CII scoping + asset-criticality map",
          "Tier confirmation with sector regulator",
        ],
      },
      {
        title: "Management controls (M1-M6)",
        blurb: "The governance backbone the Cyber Security Council expects to see first.",
        points: [
          "Strategy + risk-management evidence",
          "HR, awareness + third-party controls",
          "Asset + information classification",
        ],
      },
      {
        title: "Technical controls (T1-T9)",
        blurb: "Hands-on testing against the 128 technical controls in the standard.",
        points: [
          "Access control + cryptography",
          "Operations + communications security",
          "Physical + environmental controls",
        ],
      },
      {
        title: "Incident response & continuity",
        blurb: "Detection, escalation and recovery walked end-to-end with table-top evidence.",
        points: [
          "SOC + log-monitoring efficacy",
          "Tabletop drill with sector-specific scenarios",
          "BCP / DR with declared RTO + RPO",
        ],
      },
      {
        title: "Sector overlay alignment",
        blurb: "IAS rarely lives alone — banks add CBUAE, healthcare adds ADHICS, Dubai gov adds DESC ISR.",
        points: [
          "CBUAE / DESC / ADHICS overlay map",
          "Single-evidence-pack design across regulators",
          "Free-zone vs mainland scoping",
        ],
      },
      {
        title: "Regulator submission pack",
        blurb: "The format TDRA and sector regulators consume — control statement to evidence map.",
        points: [
          "Control-statement to evidence map",
          "Findings register with severity + risk acceptance",
          "Inspector Q&A walk-through deck",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "UAE utility (Critical Information Infrastructure)",
        engagement: "IAS Tier-1 audit + OT security uplift",
        outcome:
          "Closed all priority-1 gaps in two cycles; sector regulator accepted submission without follow-up queries",
      },
      {
        industry: "Government shared-services entity",
        engagement: "IAS + ISO 27001 unified audit",
        outcome:
          "Single evidence pack covered both regimes; recertification effort cut by an estimated 40%",
      },
    ],
    faqs: [
      {
        q: "Is NESA still the regulator?",
        a: "NESA was rebranded; cybersecurity policy is now set by the UAE Cyber Security Council with TDRA as the operational regulator. The IA Standards themselves — including the Tier-1 to Tier-4 structure — continue to apply.",
      },
      {
        q: "Which entities must comply?",
        a: "Federal and emirate-level government entities and Critical Information Infrastructure operators are in scope. Strategic suppliers are pulled in via contractual flow-down.",
      },
      {
        q: "How is the tier decided?",
        a: "Tier is driven by sector criticality and the impact of a compromise on national interests. We work with you and the sector regulator to confirm tiering before scoping the audit.",
      },
      {
        q: "Does IAS replace ISO 27001?",
        a: "No — they are complementary. IAS is the national baseline; ISO 27001 is the certification many regulated entities pursue alongside. We build a single ISMS satisfying both.",
      },
      {
        q: "How often is the audit?",
        a: "Annual is the working baseline, with continuous control monitoring expected for higher tiers. Sector regulators may impose tighter cycles.",
      },
    ],
    seoTitle: "UAE IAS (NESA) Audit | TDRA Cyber Security Council | Macksofy",
    seoDescription:
      "UAE Information Assurance Standards audit — Tier-1 to Tier-4 controls for government and CII. TDRA-aligned. Dubai + Abu Dhabi.",
    keywords: [
      "UAE IAS audit",
      "NESA compliance UAE",
      "TDRA cybersecurity audit",
      "UAE Cyber Security Council",
      "Information Assurance Standards UAE",
      "Critical Information Infrastructure UAE",
      "IAS Tier 1 audit Abu Dhabi",
      "NESA Dubai",
      "UAE government cybersecurity audit",
      "CII compliance UAE",
    ],
  },

  {
    slug: "adhics",
    title: "ADHICS Compliance Audit",
    shortTitle: "ADHICS",
    icon: Heart,
    iconName: "Heart",
    category: "GCC Regulatory",
    hero: {
      eyebrow: "Abu Dhabi Healthcare Information & Cyber Security Standard · DoH",
      tagline:
        "Full ADHICS readiness for Abu Dhabi healthcare providers, payers and Malaffi participants.",
      description:
        "End-to-end ADHICS (Abu Dhabi Healthcare Information and Cyber Security) Standard audit — Department of Health Abu Dhabi (DoH) controls across governance, asset management, HR, communications, third-party, incident response and health-information exchange. Designed for hospitals, clinics, insurers, labs, pharmacies and HealthTech integrators connected to Malaffi.",
    },
    whyItMatters:
      "ADHICS is the Department of Health Abu Dhabi's mandatory information and cyber-security standard for all licensed healthcare entities in the emirate. Non-compliance can trigger licence-condition action, exclusion from the Malaffi health-information exchange and reputational risk in a sector where DoH publishes facility ratings. Macksofy's ADHICS audit walks the control families end-to-end with the evidence DoH inspectors actually sample — control statements, technical artefacts and a submission pack mapped to the standard.",
    applicability: [
      "Hospitals, clinics and day-surgery centres licensed by DoH",
      "Diagnostic labs, imaging centres and pharmacies in Abu Dhabi",
      "Health insurance / TPA entities operating in the emirate",
      "Malaffi-connected providers and HealthTech integrators",
      "Telemedicine and digital-health platforms serving Abu Dhabi residents",
      "Suppliers handling protected health information for DoH-licensed entities",
    ],
    frameworks: [
      "ADHICS Standard (latest published version, Department of Health Abu Dhabi)",
      "DoH licensing standards and circulars",
      "Malaffi Health Information Exchange security requirements",
      "UAE Federal PDPL (Decree-Law 45 of 2021)",
      "UAE Information Assurance Standards",
      "ISO 27001:2022 (mapped)",
      "HIPAA Security Rule (mapped for multinational operators)",
    ],
    methodology: [
      {
        phase: "1 · Scoping + applicability",
        activities: [
          "DoH licence-category mapping",
          "Malaffi-connectivity scoping",
          "PHI flow + crown-jewel identification",
        ],
      },
      {
        phase: "2 · Governance + HR controls",
        activities: [
          "Information-security policy + RACI",
          "HR security + training evidence",
          "Asset + information classification",
        ],
      },
      {
        phase: "3 · Technical + operational controls",
        activities: [
          "Access control + cryptography on PHI",
          "Communications + operations security",
          "Medical-device + IoMT security review",
        ],
      },
      {
        phase: "4 · Third-party + HIE controls",
        activities: [
          "Supplier risk + contract review",
          "Malaffi integration security testing",
          "Cloud + outsourcing controls",
        ],
      },
      {
        phase: "5 · Incident response + submission",
        activities: [
          "PHI breach detection + DoH notification SOP",
          "Tabletop drill scoped to clinical workflows",
          "ADHICS submission pack + DoH inspector support",
        ],
      },
    ],
    deliverables: [
      "ADHICS applicability + scoping memo",
      "Control-by-control compliance register",
      "PHI data-flow + Malaffi-integration diagram",
      "Medical-device / IoMT inventory + risk register",
      "Third-party + supplier risk pack",
      "PHI breach notification SOP",
      "DoH submission pack + inspector Q&A deck",
    ],
    pillars: [
      {
        title: "Governance & policy",
        blurb: "Board-down accountability for PHI with DoH-aligned policy library.",
        points: [
          "Information-security policy currency",
          "CISO / security-officer charter",
          "Risk-register + board reporting cadence",
        ],
      },
      {
        title: "PHI inventory & classification",
        blurb: "ADHICS audits live or die on completeness of the PHI inventory.",
        points: [
          "PHI discovery across EMR, PACS, lab + billing",
          "Information classification + handling rules",
          "Crown-jewel + Malaffi-asset map",
        ],
      },
      {
        title: "Access control & cryptography",
        blurb: "Clinical workflows, identity and PHI encryption walked end-to-end.",
        points: [
          "Role-based access in EMR + clinical apps",
          "MFA + privileged-access for admins",
          "Encryption-at-rest + in-transit on PHI",
        ],
      },
      {
        title: "Medical device & IoMT security",
        blurb: "The control set most healthcare audits skip — and where DoH increasingly focuses.",
        points: [
          "Connected-device inventory + patching",
          "Network segmentation for IoMT",
          "Vendor-managed device risk register",
        ],
      },
      {
        title: "Third-party & Malaffi integration",
        blurb: "Suppliers and HIE connectivity tested against ADHICS supplier controls.",
        points: [
          "Supplier risk + contract clause review",
          "Malaffi integration security testing",
          "Cloud + outsourcing due diligence",
        ],
      },
      {
        title: "Incident response & submission",
        blurb: "DoH-format submission pack and a tested PHI breach playbook.",
        points: [
          "PHI breach detection + escalation",
          "Tabletop drill (clinical + technical)",
          "DoH submission pack + inspector deck",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "Abu Dhabi multi-specialty hospital group",
        engagement: "ADHICS audit + Malaffi-integration security review",
        outcome:
          "Closed all priority-1 gaps before annual DoH inspection; Malaffi integration cleared without remediation conditions",
      },
      {
        industry: "Diagnostic-lab chain (Abu Dhabi + Al Ain)",
        engagement: "ADHICS + ISO 27001 unified program",
        outcome:
          "Single ISMS satisfied both DoH and ISO assessors; audit effort cut by an estimated 35% in year two",
      },
    ],
    faqs: [
      {
        q: "Is ADHICS mandatory?",
        a: "Yes — for DoH-licensed healthcare entities operating in Abu Dhabi and their PHI-handling suppliers. Compliance evidence is sampled during DoH licensing and inspection cycles.",
      },
      {
        q: "How does ADHICS relate to Malaffi?",
        a: "Connectivity to Malaffi (the emirate's HIE) carries additional security expectations layered on top of the ADHICS baseline. We scope both in one engagement.",
      },
      {
        q: "Does ADHICS replace HIPAA?",
        a: "No — ADHICS is the local mandate. HIPAA may still apply where you handle US-resident PHI. The two map cleanly and we build a unified control set.",
      },
      {
        q: "What about Dubai healthcare entities?",
        a: "Dubai's DHA has its own framework. ADHICS is specific to Abu Dhabi — we cover both emirates and handle the cross-emirate scoping for groups.",
      },
      {
        q: "How often is the audit?",
        a: "Annual at minimum, with continuous control monitoring expected. DoH inspection cycles may compress this for higher-risk facilities.",
      },
    ],
    seoTitle: "ADHICS Compliance Audit Abu Dhabi | DoH Healthcare | Macksofy",
    seoDescription:
      "ADHICS audit for Abu Dhabi hospitals, clinics, labs, insurers. DoH-aligned, Malaffi-ready, ISO + HIPAA mapped.",
    keywords: [
      "ADHICS audit Abu Dhabi",
      "ADHICS compliance UAE",
      "DoH cybersecurity audit",
      "Abu Dhabi healthcare cyber",
      "Malaffi security compliance",
      "ADHICS standard Department of Health",
      "hospital cybersecurity Abu Dhabi",
      "PHI compliance UAE",
      "healthcare information security UAE",
      "ADHICS consultants",
    ],
  },

  {
    slug: "desc-isr",
    title: "Dubai DESC ISR Audit",
    shortTitle: "DESC ISR",
    icon: BadgeCheck,
    iconName: "BadgeCheck",
    category: "GCC Regulatory",
    hero: {
      eyebrow: "Dubai Electronic Security Centre · Information Security Regulation",
      tagline:
        "DESC ISR readiness for Dubai government entities and sector-specific operators.",
      description:
        "Full Dubai Electronic Security Centre Information Security Regulation audit — applicability mapping, control families across governance, asset, HR, access, operations, communications, acquisition, incident management and compliance. Sequenced for the DESC audit cycle and the Dubai Government Information Security Maturity model.",
    },
    whyItMatters:
      "The Dubai Electronic Security Centre's Information Security Regulation (DESC ISR v1.0 in 2017, updated to v2.0 in 2023) is the mandatory baseline for Dubai government entities and a growing set of sector-specific operators. DESC operates a regular audit cycle that grades entities against the ISR control set and the broader Dubai Cyber Security Strategy maturity model. Macksofy's DESC ISR audit is run the way DESC examiners read it — control mapping, sampled evidence and a clean closure pack.",
    applicability: [
      "Dubai government entities (departments, authorities, councils)",
      "Government-owned enterprises and free-zone authorities in Dubai",
      "Sector-specific operators designated by DESC (utilities, transport, real estate, smart-city)",
      "Strategic suppliers and managed-service providers to Dubai government",
      "Smart-Dubai and digital-government platform operators",
      "Major private-sector entities adopting ISR voluntarily as the emirate baseline",
    ],
    frameworks: [
      "DESC Information Security Regulation v1.0 (2017) and v2.0 (2023)",
      "Dubai Cyber Security Strategy",
      "Dubai Government Information Security Maturity model",
      "Smart Dubai / Digital Dubai security directives",
      "UAE Information Assurance Standards (overlay)",
      "ISO 27001:2022 (mapped)",
      "NIST CSF (mapped)",
    ],
    methodology: [
      {
        phase: "1 · Applicability + scoping",
        activities: [
          "Entity classification under DESC ISR",
          "Sector-specific overlay mapping",
          "Crown-jewel + critical-service identification",
        ],
      },
      {
        phase: "2 · Control assessment",
        activities: [
          "ISR control families walked end-to-end",
          "Maturity scoring against Dubai Govt model",
          "Evidence sampling per DESC examiner expectations",
        ],
      },
      {
        phase: "3 · Technical validation",
        activities: [
          "VAPT scoped to citizen-facing services",
          "Cloud + Smart-Dubai integration testing",
          "Identity, MFA + privileged-access review",
        ],
      },
      {
        phase: "4 · Incident + supplier controls",
        activities: [
          "Incident-management process + DESC notification",
          "Third-party + outsourcing risk review",
          "Tabletop drill with emirate-level escalation",
        ],
      },
      {
        phase: "5 · Submission + audit-cycle support",
        activities: [
          "DESC submission pack",
          "DESC examiner walk-through support",
          "Closure of findings + revalidation",
        ],
      },
    ],
    deliverables: [
      "DESC ISR applicability + scoping memo",
      "Control-by-control compliance register",
      "Maturity heatmap against Dubai Govt model",
      "Technical validation report (VAPT + config audit)",
      "Incident-response + supplier-risk pack",
      "DESC submission pack + examiner Q&A deck",
      "Annual recertification + closure tracker",
    ],
    pillars: [
      {
        title: "Applicability & scoping",
        blurb: "DESC ISR coverage varies by entity classification — scoping defines audit cost and depth.",
        points: [
          "Entity-classification under ISR",
          "Sector-overlay + free-zone scoping",
          "Critical-service inventory",
        ],
      },
      {
        title: "Governance & policy",
        blurb: "DESC examiners open every audit with policy currency and board accountability.",
        points: [
          "Information-security policy library",
          "Security-committee charter + cadence",
          "Risk-register + board reporting",
        ],
      },
      {
        title: "Access control & operations",
        blurb: "Identity, privileged access and operational security tested against ISR clauses.",
        points: [
          "Identity + MFA on citizen services",
          "Privileged-access + admin controls",
          "Operations + change-management evidence",
        ],
      },
      {
        title: "Smart-Dubai integration",
        blurb: "The control set where Dubai-specific examiners increasingly focus.",
        points: [
          "API + integration security with Dubai-Now / DubaiPulse",
          "Cloud + data-residency posture",
          "Citizen-data classification + protection",
        ],
      },
      {
        title: "Incident response & continuity",
        blurb: "Detection, escalation and recovery with emirate-level coordination expectations.",
        points: [
          "Incident-detection + DESC notification SOP",
          "Tabletop drill (citizen-service scenario)",
          "BCP / DR with declared RTO + RPO",
        ],
      },
      {
        title: "DESC audit-cycle pack",
        blurb: "Artefacts assembled exactly the way DESC examiners consume them.",
        points: [
          "Control-statement to evidence map",
          "Maturity-heatmap deck",
          "Examiner Q&A walk-through",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "Dubai government authority",
        engagement: "DESC ISR audit + Dubai Govt maturity uplift",
        outcome:
          "Maturity score lifted by two grades inside one audit cycle; closure achieved without follow-up DESC visit",
      },
      {
        industry: "Smart-city platform operator",
        engagement: "ISR + ISO 27001 unified program",
        outcome:
          "Single evidence pack satisfied both regimes; supplier-risk review cycle automated for 90+ suppliers",
      },
    ],
    faqs: [
      {
        q: "Is DESC ISR mandatory?",
        a: "Yes — for Dubai government entities and entities designated by DESC. Private-sector adoption is rising as enterprises align with the emirate's cyber strategy.",
      },
      {
        q: "How often is the DESC audit?",
        a: "DESC operates a recurring audit cycle, typically annual with continuous control monitoring expected. Higher-risk entities may face tighter cadences.",
      },
      {
        q: "How does DESC ISR relate to UAE IAS?",
        a: "ISR is Dubai-specific; UAE IAS is the federal baseline maintained under the Cyber Security Council / TDRA. We map both and design a single control set.",
      },
      {
        q: "Does ISR replace ISO 27001?",
        a: "No — they complement. ISR is the local mandate; ISO 27001 is the certification many entities pursue alongside.",
      },
      {
        q: "Do free-zone entities have to comply?",
        a: "Coverage depends on entity classification and the free-zone authority's own directives — we scope per legal-entity footprint and free-zone designation.",
      },
    ],
    seoTitle: "DESC ISR Audit Dubai | Information Security Regulation | Macksofy",
    seoDescription:
      "Dubai DESC ISR v2.0 audit for government entities + sector operators. DESC examiner-ready, ISO + UAE IAS mapped.",
    keywords: [
      "DESC ISR audit Dubai",
      "Dubai Electronic Security Centre",
      "Information Security Regulation Dubai",
      "DESC compliance",
      "Dubai government cybersecurity",
      "ISR v2.0 audit",
      "Smart Dubai security",
      "DESC examiner support",
      "Dubai cyber security strategy",
      "DESC ISR consultants",
    ],
  },

  {
    slug: "sama-csf",
    title: "SAMA Cyber Security Framework Audit",
    shortTitle: "SAMA CSF",
    icon: Landmark,
    iconName: "Landmark",
    category: "GCC Regulatory",
    hero: {
      eyebrow: "Saudi Central Bank · Banks · Insurers · Finance Companies",
      tagline:
        "End-to-end SAMA CSF audit — control assessment, maturity scoring, submission pack.",
      description:
        "Full SAMA Cyber Security Framework audit for Saudi banks, insurers, finance companies and payment service providers under the Saudi central bank. Covers SAMA CSF 1.0 (May 2017) and subsequent CSF updates, IT-governance and outsourcing circulars, with maturity scoring against the four-tier SAMA scale.",
    },
    whyItMatters:
      "The SAMA Cyber Security Framework (1.0, May 2017) and its later updates set the cybersecurity expectations for all entities under SABB / SAMA — banks, insurers, finance companies and payment service providers — graded on a four-tier maturity scale. SAMA inspections evaluate evidence against each control, and the central bank uses the maturity score as input to supervisory ratings. Macksofy's SAMA CSF audit is sequenced the way SAMA inspectors read it — control statements, sampled evidence, maturity score and a clean closure plan.",
    applicability: [
      "Saudi licensed banks (local and foreign branches)",
      "Insurance and reinsurance companies under SAMA",
      "Finance companies and consumer-credit entities",
      "Payment service providers and Saudi Payments participants",
      "Major third-party suppliers to SAMA-regulated entities",
      "Fintechs licensed under SAMA's Regulatory Sandbox graduating to full licence",
    ],
    frameworks: [
      "SAMA Cyber Security Framework 1.0 (May 2017)",
      "SAMA IT Governance + Outsourcing circulars (latest published version)",
      "SAMA Business Continuity Management Framework",
      "SAMA Counter-Fraud Framework",
      "SAMA Open Banking framework (where applicable)",
      "NCA Essential Cyber Controls (ECC-2:2024) overlay",
      "PCI DSS v4.0 (mapped for card-handling banks)",
      "ISO 27001:2022 (mapped)",
    ],
    methodology: [
      {
        phase: "1 · Scoping + tiering",
        activities: [
          "Entity-type + size classification",
          "Critical-service inventory",
          "Target-maturity tier confirmation",
        ],
      },
      {
        phase: "2 · Control assessment",
        activities: [
          "Cyber Security Leadership + Governance",
          "Cyber Security Risk + Compliance",
          "Cyber Security Operations + Technology",
          "Third-Party Cyber Security",
        ],
      },
      {
        phase: "3 · Technical validation",
        activities: [
          "VAPT — internal, external, application",
          "Network + segmentation review",
          "Mada / SARIE / SADAD environment testing",
        ],
      },
      {
        phase: "4 · Maturity scoring",
        activities: [
          "SAMA four-tier maturity scoring per control",
          "Heatmap vs target tier",
          "Gap-to-target investment plan",
        ],
      },
      {
        phase: "5 · Submission + inspector support",
        activities: [
          "SAMA-format submission pack",
          "On-site SAMA inspector queries",
          "Closure + revalidation cycle",
        ],
      },
    ],
    deliverables: [
      "SAMA CSF scoping + tier memo",
      "Control-by-control compliance register",
      "Maturity heatmap on SAMA four-tier scale",
      "Technical validation report (VAPT + config audit)",
      "Third-party + outsourcing risk pack",
      "SAMA submission pack + inspector Q&A deck",
      "Closure tracker + annual recertification plan",
    ],
    pillars: [
      {
        title: "Leadership & governance",
        blurb: "Board, cyber-committee and CISO accountability validated against SAMA expectations.",
        points: [
          "Board-approved cyber-security policy",
          "CISO charter + reporting independence",
          "Cyber-risk metrics at board level",
        ],
      },
      {
        title: "Risk & compliance",
        blurb: "Risk register, regulatory mapping and compliance evidence walked end-to-end.",
        points: [
          "Cyber-risk-management framework",
          "Regulatory compliance register",
          "Internal audit + assurance cadence",
        ],
      },
      {
        title: "Operations & technology",
        blurb: "The largest control family in SAMA CSF — operational and technical controls.",
        points: [
          "Identity, MFA + privileged-access",
          "Network + endpoint + cloud baselines",
          "SOC + 24x7 monitoring evidence",
        ],
      },
      {
        title: "Third-party cyber security",
        blurb: "Outsourcing, supplier and cloud-provider cyber controls SAMA samples aggressively.",
        points: [
          "Supplier risk + contract clauses",
          "Cloud + outsourcing due diligence",
          "Concentration-risk register",
        ],
      },
      {
        title: "Maturity scoring",
        blurb: "Four-tier maturity score per control — the metric SAMA inspectors anchor on.",
        points: [
          "Per-control maturity rating",
          "Target-tier gap analysis",
          "Investment plan by tier delta",
        ],
      },
      {
        title: "SAMA submission pack",
        blurb: "Artefacts assembled exactly the way SAMA inspections consume them.",
        points: [
          "Control-statement to evidence map",
          "Maturity-heatmap deck",
          "Inspector Q&A walk-through",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "Saudi bank (Tier-1 retail)",
        engagement: "SAMA CSF audit + maturity uplift",
        outcome:
          "Maturity score lifted from Tier-2 to Tier-3 across all four domains in one audit cycle; SAMA inspection closed with no major findings",
      },
      {
        industry: "Saudi insurer + payment service provider",
        engagement: "SAMA CSF + NCA ECC-2 unified program",
        outcome:
          "Single control set covered both regimes; audit effort reduced by an estimated 30% in year two",
      },
    ],
    faqs: [
      {
        q: "How often is SAMA CSF audit required?",
        a: "Annual at minimum. SAMA-regulated entities also run continuous internal assurance and may face tighter on-site inspection cycles based on risk profile.",
      },
      {
        q: "Is SAMA CSF the same as NCA ECC?",
        a: "No — SAMA CSF applies to entities under the Saudi central bank (banks, insurers, finance companies, PSPs). NCA ECC-2 is the broader National Cybersecurity Authority baseline for any organisation in KSA. Most SAMA-regulated entities sit under both.",
      },
      {
        q: "What about Open Banking participants?",
        a: "SAMA's Open Banking framework adds further control expectations on top of CSF — API security, consent and dispute handling. We scope all three in a single engagement.",
      },
      {
        q: "Do you support cross-border banking groups?",
        a: "Yes — including alignment with home-regulator requirements (RBI / CBUAE / others) so a single ISMS can satisfy multiple regulators.",
      },
      {
        q: "Where does PCI DSS fit?",
        a: "Card-handling banks and PSPs continue to need PCI DSS v4.0 in parallel. We deliver both with a shared evidence pack.",
      },
    ],
    seoTitle: "SAMA Cyber Security Framework Audit | Saudi Banks | Macksofy",
    seoDescription:
      "SAMA CSF audit for Saudi banks, insurers, finance companies, PSPs. Four-tier maturity scoring + inspector support.",
    keywords: [
      "SAMA CSF audit",
      "SAMA cyber security framework",
      "Saudi Arabian Monetary Authority audit",
      "Saudi bank cybersecurity",
      "SAMA maturity scoring",
      "SAMA inspection support",
      "SAMA insurance cybersecurity",
      "Saudi payment service provider audit",
      "SAMA outsourcing framework",
      "Riyadh cybersecurity audit",
    ],
  },

  {
    slug: "cbuae-cyber",
    title: "CBUAE Cyber & Digital Banking Compliance",
    shortTitle: "CBUAE Cyber",
    icon: Landmark,
    iconName: "Landmark",
    category: "GCC Regulatory",
    hero: {
      eyebrow: "Central Bank of UAE · Banks · Finance Companies · Digital Banks · Exchange Houses",
      tagline:
        "Cyber, IT-operations and digital-banking compliance for CBUAE-regulated entities.",
      description:
        "Full Central Bank of UAE cyber + digital-banking compliance program — consumer-protection cyber expectations, digital-banking licence cyber clauses, IT operations + outsourcing regulations, retail-payment KYC tied to cyber and SWIFT customer-security alignment. Designed for UAE banks, finance companies, digital banks, exchange houses, payment service providers and stored-value-facility issuers.",
    },
    whyItMatters:
      "The Central Bank of UAE has tightened its cyber, IT-governance, outsourcing and consumer-protection regulations through successive circulars — covering banks, finance companies, digital banks, payment service providers, stored-value-facility issuers and exchange houses. Recent attention to mobile-banking fraud, retail-payment KYC and outsourcing concentration risk means CBUAE inspections probe well beyond cyber-policy text into operational evidence. Macksofy's CBUAE program walks each regulation end-to-end and lands a submission pack inspectors can read in days.",
    applicability: [
      "UAE licensed banks (national + foreign branches)",
      "Finance companies and consumer-credit entities under CBUAE",
      "Digital-bank licence holders and licensee applicants",
      "Stored-Value-Facility issuers and Retail Payment Services licensees",
      "Exchange houses and remittance operators",
      "Major third-party suppliers and cloud providers to CBUAE-regulated entities",
    ],
    frameworks: [
      "CBUAE Consumer Protection Regulation + Standards (latest published version)",
      "CBUAE Retail Payment Services and Card Schemes Regulation",
      "CBUAE Stored Value Facilities Regulation",
      "CBUAE Outsourcing Regulation for Banks",
      "CBUAE Risk Management Standards (IT, operational, cyber)",
      "Digital-Bank licensing framework cyber clauses",
      "SWIFT Customer Security Programme (CSP)",
      "UAE IA Standards + Federal PDPL overlay",
    ],
    methodology: [
      {
        phase: "1 · Scoping + licence overlay",
        activities: [
          "Licence-type mapping (bank / FC / digital / SVF / RPSP / exchange)",
          "Applicable regulation + circular inventory",
          "Critical-service + critical-supplier identification",
        ],
      },
      {
        phase: "2 · Cyber + IT-operations controls",
        activities: [
          "Cyber-risk + IT-governance assessment",
          "Identity, MFA + privileged-access review",
          "SOC + monitoring + incident-response evidence",
        ],
      },
      {
        phase: "3 · Consumer protection + retail-payment KYC",
        activities: [
          "Customer-onboarding + KYC controls",
          "Mobile-banking + fraud-prevention controls",
          "Complaint handling + dispute resolution",
        ],
      },
      {
        phase: "4 · Outsourcing + cloud",
        activities: [
          "Outsourcing-regulation gap analysis",
          "Cloud-provider due diligence + concentration risk",
          "Exit + portability plan evidence",
        ],
      },
      {
        phase: "5 · SWIFT CSP + submission",
        activities: [
          "SWIFT CSP attestation support (where applicable)",
          "CBUAE submission pack",
          "On-site CBUAE inspector queries support",
        ],
      },
    ],
    deliverables: [
      "CBUAE regulation-to-control map by licence type",
      "Cyber + IT-operations findings register",
      "Consumer-protection + retail-payment KYC review",
      "Outsourcing + cloud-risk pack",
      "SWIFT CSP self-attestation + remediation plan",
      "CBUAE submission pack + inspector Q&A deck",
      "Annual board-reporting deck",
    ],
    pillars: [
      {
        title: "Licence-type scoping",
        blurb: "Banks, FCs, digital banks, SVFs, RPSPs and exchange houses each have different cyber expectations.",
        points: [
          "Licence-type + circular inventory",
          "Critical-service mapping",
          "Group / cross-border scoping",
        ],
      },
      {
        title: "Cyber & IT operations",
        blurb: "Identity, monitoring, change and incident-response evidence — the backbone of any CBUAE inspection.",
        points: [
          "Identity + MFA + privileged-access",
          "SOC + 24x7 monitoring evidence",
          "Incident-response runbooks",
        ],
      },
      {
        title: "Consumer protection & retail-payment KYC",
        blurb: "Where CBUAE has focused enforcement — mobile fraud, KYC quality and dispute handling.",
        points: [
          "Customer-onboarding + KYC controls",
          "Mobile-banking + transaction-fraud controls",
          "Complaint + dispute-resolution evidence",
        ],
      },
      {
        title: "Outsourcing & cloud",
        blurb: "CBUAE Outsourcing Regulation + cloud due diligence walked end-to-end.",
        points: [
          "Outsourcing-regulation gap analysis",
          "Cloud-provider due diligence",
          "Concentration-risk + exit-plan evidence",
        ],
      },
      {
        title: "Digital-bank licence clauses",
        blurb: "For neo-banks and licence applicants — the cyber clauses CBUAE applies in addition to baseline.",
        points: [
          "API + open-banking security",
          "Customer authentication + step-up",
          "Operational-resilience evidence",
        ],
      },
      {
        title: "SWIFT CSP + submission",
        blurb: "SWIFT customer-security alignment plus a CBUAE submission pack inspectors can sign off quickly.",
        points: [
          "SWIFT CSP self-attestation",
          "CBUAE submission pack",
          "Inspector Q&A walk-through",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "UAE national bank",
        engagement: "CBUAE cyber + outsourcing + SWIFT CSP unified program",
        outcome:
          "Three regulator-facing programs collapsed into one evidence pack; SWIFT CSP attestation closed with zero exceptions",
      },
      {
        industry: "UAE-licensed digital bank",
        engagement: "Digital-bank licence cyber-clause readiness + RPSP overlay",
        outcome:
          "Cleared CBUAE supervisory review without remediation conditions; mobile-banking fraud rate reduced through revised step-up rules",
      },
    ],
    faqs: [
      {
        q: "How is CBUAE different from UAE IAS?",
        a: "CBUAE is the financial-sector regulator with detailed cyber, IT, outsourcing and consumer-protection rules for licensed entities. UAE IAS is the federal cyber baseline. CBUAE-regulated entities typically need both.",
      },
      {
        q: "Do you support digital-bank licence applicants?",
        a: "Yes — we run cyber-clause readiness, operational-resilience and outsourcing reviews as part of the licence-application pack, then transition to ongoing compliance after go-live.",
      },
      {
        q: "Does the Outsourcing Regulation apply to cloud?",
        a: "Yes — cloud is treated as material outsourcing with due-diligence, concentration-risk and exit-plan expectations. We deliver the artefact set CBUAE samples first.",
      },
      {
        q: "Is SWIFT CSP mandatory?",
        a: "SWIFT participants must self-attest annually and complete an independent assessment on a defined cycle. Macksofy supports both self-attestation and independent assessment.",
      },
      {
        q: "How does CBUAE relate to SAMA?",
        a: "CBUAE governs UAE-licensed entities; SAMA governs Saudi-licensed entities. Cross-border groups run both — we design one ISMS with regulator-specific submission overlays.",
      },
    ],
    seoTitle: "CBUAE Cyber & Digital Banking Compliance | UAE Banks | Macksofy",
    seoDescription:
      "CBUAE cyber, outsourcing + digital-banking compliance for UAE banks, FCs, digital banks, RPSPs, SVFs, exchange houses.",
    keywords: [
      "CBUAE cyber compliance",
      "Central Bank UAE audit",
      "CBUAE outsourcing regulation",
      "UAE digital bank compliance",
      "CBUAE consumer protection",
      "UAE retail payment services",
      "Stored Value Facility UAE",
      "SWIFT CSP UAE",
      "exchange house cybersecurity UAE",
      "CBUAE inspector support",
      "Abu Dhabi bank cyber audit",
      "Dubai bank cybersecurity",
    ],
  },

  {
    slug: "nca-ecc-2",
    title: "Saudi NCA ECC-2:2024 Audit",
    shortTitle: "NCA ECC-2",
    icon: ShieldCheck,
    iconName: "ShieldCheck",
    category: "GCC Regulatory",
    hero: {
      eyebrow: "National Cybersecurity Authority · Essential Cybersecurity Controls v2",
      tagline:
        "NCA ECC-2:2024 audit — baseline cybersecurity for all organisations in KSA.",
      description:
        "Full NCA Essential Cybersecurity Controls v2 (ECC-2:2024) audit — applicability scoping, control-by-control assessment across governance, defence, resilience and third-party / cloud domains. Designed for government entities, critical national infrastructure operators and private-sector organisations in the Kingdom of Saudi Arabia.",
    },
    whyItMatters:
      "The National Cybersecurity Authority's Essential Cybersecurity Controls v2 (ECC-2:2024) is the baseline cybersecurity standard for any organisation operating in the Kingdom of Saudi Arabia — government, critical national infrastructure and private sector. NCA performs compliance assessments and references ECC compliance in its national cybersecurity reporting; sector regulators (SAMA, CMA, CITC, Ministry of Health) layer their own controls on top. Macksofy's NCA ECC-2 audit walks the four domains end-to-end and produces the assessment artefacts NCA samples first.",
    applicability: [
      "Saudi government entities (ministries, authorities, government-owned companies)",
      "Critical national infrastructure operators (energy, water, transport, finance, health)",
      "Private-sector organisations operating in KSA (any size)",
      "Cloud and digital-platform providers serving KSA customers",
      "Suppliers and managed-service providers to NCA-regulated entities",
      "Multinationals with Saudi operations or KSA data-residency commitments",
    ],
    frameworks: [
      "NCA Essential Cybersecurity Controls v2 (ECC-2:2024)",
      "NCA Critical Systems Cybersecurity Controls (CSCC)",
      "NCA Cloud Cybersecurity Controls (CCC)",
      "NCA Telework Cybersecurity Controls",
      "Saudi PDPL (Personal Data Protection Law)",
      "SAMA CSF overlay (financial sector)",
      "ISO 27001:2022 (mapped)",
      "NIST CSF (mapped)",
    ],
    methodology: [
      {
        phase: "1 · Applicability + scoping",
        activities: [
          "Sector classification + NCA scope test",
          "Critical-system identification (CSCC overlay)",
          "Cloud / telework overlay assessment",
        ],
      },
      {
        phase: "2 · Governance + defence domains",
        activities: [
          "Cybersecurity governance + risk management",
          "Asset, identity + access management",
          "Network, endpoint + email defence",
        ],
      },
      {
        phase: "3 · Resilience domain",
        activities: [
          "Backup + recovery evidence",
          "Cybersecurity event-log management",
          "Incident response + tabletop drill",
        ],
      },
      {
        phase: "4 · Third-party + cloud",
        activities: [
          "Third-party cybersecurity controls",
          "Cloud-provider due diligence (CCC overlay)",
          "Telework cybersecurity (where applicable)",
        ],
      },
      {
        phase: "5 · Assessment + submission",
        activities: [
          "Compliance level scoring per ECC control",
          "NCA-format submission pack",
          "Closure + revalidation plan",
        ],
      },
    ],
    deliverables: [
      "NCA ECC-2 applicability + scoping memo",
      "Control-by-control compliance register",
      "Critical-system + cloud overlay risk pack",
      "Incident-response + tabletop drill report",
      "Third-party cybersecurity review",
      "NCA-format submission pack",
      "Annual recertification plan + closure tracker",
    ],
    pillars: [
      {
        title: "Applicability & scoping",
        blurb: "ECC-2 baseline applies broadly — CSCC and CCC overlays apply selectively. Clean scoping prevents over-engineering.",
        points: [
          "Sector + criticality classification",
          "Critical-system + cloud-overlay scoping",
          "Telework-control applicability",
        ],
      },
      {
        title: "Governance domain",
        blurb: "Cybersecurity strategy, risk management and human-resources controls — the spine of ECC-2.",
        points: [
          "Cybersecurity strategy + governance",
          "Cyber-risk management framework",
          "HR + awareness controls",
        ],
      },
      {
        title: "Defence domain",
        blurb: "Asset, identity, network and endpoint defence walked end-to-end with technical evidence.",
        points: [
          "Asset + identity-and-access management",
          "Network, endpoint + email defence",
          "Cryptography + secure data handling",
        ],
      },
      {
        title: "Resilience domain",
        blurb: "Backup, recovery, log management and incident response — the controls that decide breach outcomes.",
        points: [
          "Backup + recovery evidence",
          "Event-log management + retention",
          "Incident-response + tabletop drill",
        ],
      },
      {
        title: "Third-party & cloud",
        blurb: "Supplier and cloud-provider controls under ECC-2 + the CCC overlay where cloud is used.",
        points: [
          "Third-party cybersecurity controls",
          "Cloud Cybersecurity Controls (CCC) overlay",
          "Contractual + exit-plan evidence",
        ],
      },
      {
        title: "NCA submission pack",
        blurb: "Artefacts assembled exactly the way NCA assessments consume them.",
        points: [
          "Control-statement to evidence map",
          "Compliance-level heatmap",
          "Assessor Q&A walk-through",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "Saudi government-owned enterprise",
        engagement: "NCA ECC-2 audit + CSCC overlay on critical systems",
        outcome:
          "Closed all priority-1 gaps in one cycle; NCA assessment cleared with no follow-up actions on critical systems",
      },
      {
        industry: "Multinational SaaS with KSA data-residency",
        engagement: "ECC-2 + Cloud Cybersecurity Controls (CCC) overlay",
        outcome:
          "Cloud-overlay evidence pack accepted by two NCA-regulated customer assessments without remediation",
      },
    ],
    faqs: [
      {
        q: "Who must comply with NCA ECC-2?",
        a: "ECC-2 is the baseline for any organisation operating in KSA — government, critical national infrastructure and private sector. Sector regulators layer their own controls on top.",
      },
      {
        q: "How is ECC-2 different from SAMA CSF?",
        a: "ECC-2 is the broader national baseline maintained by NCA. SAMA CSF is the financial-sector framework maintained by the Saudi central bank for banks, insurers, finance companies and PSPs. SAMA-regulated entities typically need both.",
      },
      {
        q: "What about cloud workloads?",
        a: "NCA's Cloud Cybersecurity Controls (CCC) layer on top of ECC-2 for cloud customers and providers. We scope CCC as part of the engagement where cloud is in use.",
      },
      {
        q: "Are critical-system controls separate?",
        a: "Yes — NCA's Critical Systems Cybersecurity Controls (CSCC) apply on top of ECC-2 to designated critical systems. We map both and produce one evidence set.",
      },
      {
        q: "How often is the assessment?",
        a: "Annual is the working baseline. NCA may schedule additional assessments based on sector, incidents or maturity. Sector regulators may impose tighter cycles.",
      },
    ],
    seoTitle: "NCA ECC-2:2024 Audit | Saudi Essential Cyber Controls | Macksofy",
    seoDescription:
      "Saudi NCA ECC-2:2024 audit for government, CNI and private sector. CSCC + CCC overlay, SAMA + ISO mapped. Riyadh + Jeddah.",
    keywords: [
      "NCA ECC-2 audit",
      "Essential Cybersecurity Controls Saudi",
      "NCA cybersecurity audit",
      "ECC-2:2024 compliance",
      "Saudi National Cybersecurity Authority",
      "NCA CSCC critical systems",
      "NCA Cloud Cybersecurity Controls",
      "KSA cybersecurity compliance",
      "Riyadh cybersecurity audit",
      "Jeddah ECC audit",
      "Saudi government cybersecurity",
      "NCA assessor support",
    ],
  },

  // ====================================================================
  // WASA — Web Application Security Assessment
  // ====================================================================
  {
    slug: "wasa-audit",
    title: "WASA — Web Application Security Assessment",
    shortTitle: "WASA Audit",
    icon: Lock,
    iconName: "Lock",
    category: "Indian Regulatory",
    hero: {
      eyebrow: "OWASP ASVS · SANS CWE Top 25 · Compliance-mapped",
      tagline:
        "Procurement-grade Web Application Security Assessment — design integrity, not just exploit-finding.",
      description:
        "WASA is a structured, framework-mapped evaluation of how a web application withstands real-world attack behavior across architecture, business logic, APIs, session handling and authentication. Macksofy delivers WASA reports that drop directly into enterprise procurement, RBI / SEBI / DPDP submissions, and SOC 2 / ISO 27001 evidence packs — without the rework most pentest PDFs trigger.",
    },
    whyItMatters:
      "A modern enterprise buyer (and an increasing share of Indian BFSI auditors) doesn't want a raw pentest PDF. They want a Web Application Security Assessment that proves design integrity, maps every finding to a recognised control framework (OWASP Top 10, ASVS V4.0, SANS CWE Top 25, ISO 27001 Annex A, PCI DSS), and surfaces compound risk — the chained low-severity flaws that combine into account takeover, lateral movement or tenant-bleed. The 2025 State of Continuous Pentesting report attributes 96% of vulnerabilities in the last 12 months to web applications, and most of them are not zero-days; they are weak session controls, exposed API metadata and misconfigured headers that look minor in isolation but combine into compound exposure. Macksofy's WASA programme is purpose-built for that reality, with dual-layered AI-augmented + manual testing, threat-modelled scoping, and RFP-ready reporting that satisfies enterprise InfoSec, CERT-In format submission and the RBI Master Direction on IT Governance (November 2023) Annex-1 evidence the inspector reads.",
    applicability: [
      "B2B SaaS shipping enterprise security questionnaires (CAIQ, SIG, Shared Assessments)",
      "Fintech / lending / payment-aggregator licensees needing RBI-format AppSec evidence",
      "Healthtech / US-PHI GCC operators needing HIPAA Security Rule §164.308–312 evidence",
      "BPO / KPO + IT-services majors with customer-third-party-AppSec-standard obligations",
      "Public-sector and ministry-adjacent operators on the Digital India ecosystem",
      "AI / LLM product companies adding OWASP LLM Top 10 (2025) coverage on AI surfaces",
    ],
    frameworks: [
      "OWASP Top 10 (2021) + API Security Top 10 (2023)",
      "OWASP ASVS V4.0 (Application Security Verification Standard)",
      "SANS CWE Top 25",
      "NIST SP 800-53 (IA-5, SC-7) + NIST SP 800-115 v2 testing methodology",
      "ISO/IEC 27001:2022 Annex A.5, A.8 + ISO/IEC 27002:2022",
      "PCI DSS v4.0 (clauses 6.x + 8.2.6 session controls)",
      "OWASP Top 10 for LLM Applications (2025) — for AI surfaces in scope",
      "CERT-In empanelled submission format (for Indian regulator inputs)",
      "RBI Master Direction on IT Governance (Nov 2023) Annex-1 (for BFSI scopes)",
    ],
    methodology: [
      {
        phase: "Wk 1 · Threat-Modelled Scoping",
        activities: [
          "Architecture review and trust-boundary mapping with CTO + AppSec lead",
          "Authorisation matrix discovery role-by-role (tenant / role / api-key / admin)",
          "Sensitive-data flow inventory (PII, PHI, payment, regulated-financial-data)",
          "Engagement letter with production safe-harbour + rules of engagement",
        ],
      },
      {
        phase: "Wk 2 · AI-Augmented Recon & DAST Baseline",
        activities: [
          "Authenticated and unauthenticated surface map (Burp Pro, Caido, Nuclei)",
          "Misconfiguration, exposed-endpoint, insecure-header, CORS gap discovery",
          "Known-CVE / dependency-vulnerability triage against the deployed stack",
          "Dynamic attack-surface mapping for the manual phase to chain into",
        ],
      },
      {
        phase: "Wk 3 · Manual Context-Aware Testing",
        activities: [
          "Authentication & session — brute-force, MFA flow tampering, session fixation, token replay, refresh-token rotation, JWT algorithm confusion",
          "Access control — broken object-level access (BOLA), IDOR chaining, tenant-bleed, SCIM impersonation, role-misassignment",
          "API behaviour — fuzzing, parameter pollution, endpoint over-exposure, rate-limit bypass",
          "Business logic — order manipulation, unauthorised workflow branching, billing abuse, design-flaw exploitation",
          "Error & info leakage — debug-trace exposure, verbose error handling, stack metadata in UI responses",
        ],
      },
      {
        phase: "Wk 4 · Chained Exploit Modelling",
        activities: [
          "Combine low-severity findings into compound exploit narratives (account takeover, privilege escalation, data leakage)",
          "Map each chain to MITRE ATT&CK techniques where applicable",
          "Validate proof-of-exploit with reproducible curl / Burp .req / Python harness",
          "Tie every finding to the threat-model output and the framework control it violates",
        ],
      },
      {
        phase: "Wk 5 · RFP-Ready Reporting",
        activities: [
          "Executive summary in buyer-readable language (InfoSec + procurement)",
          "Framework crosswalk per finding (OWASP, ASVS, SANS CWE Top 25, ISO 27001 Annex A, PCI DSS)",
          "CERT-In empanelled format + RBI Master Direction Annex-1 mapping where Indian scope applies",
          "Vendor-pack annex for customer-security-questionnaire attachment (CAIQ, SIG, Shared Assessments)",
        ],
      },
      {
        phase: "Wk 6 · Remediation & Validation",
        activities: [
          "60-day re-test of every Critical and High finding at no extra cost",
          "Updated severity scoring with clean validation output per finding",
          "Engineer-readable remediation guidance with reproducible repros",
          "Risk-register sync to the customer's GRC tool (Archer / ServiceNow IRM / Vanta / Drata)",
        ],
      },
    ],
    deliverables: [
      "WASA report with framework-mapped findings (OWASP Top 10, ASVS V4.0, SANS CWE Top 25, ISO 27001 Annex A, PCI DSS)",
      "Reproducible exploit code (curl / Burp .req / Python) per High and Critical finding",
      "Chained-exploit narrative with MITRE ATT&CK technique mapping",
      "Threat-model output document — architecture, trust boundaries, authorisation matrix",
      "CERT-In empanelled submission-format report for Indian regulator scope",
      "Vendor-pack annex for enterprise procurement (CAIQ, SIG, Shared Assessments) attachment",
      "60-day re-test of every Critical and High at no extra cost",
      "Post-engagement risk-register sync to GRC tool (Archer / ServiceNow IRM / Vanta / Drata)",
    ],
    pillars: [
      {
        title: "Authentication & session integrity",
        blurb: "Where most procurement-questionnaire callouts originate — auth flows, MFA tampering, session lifecycle.",
        points: [
          "Brute-force resistance, MFA flow tampering, credential stuffing",
          "Session fixation, token replay, refresh-token rotation",
          "JWT algorithm confusion, audience-claim handling, PKCE enforcement",
        ],
      },
      {
        title: "Access control & multi-tenant authz",
        blurb: "Broken Object Level Authorisation (BOLA) remains OWASP API Top 10 #1 — exercised role-by-role.",
        points: [
          "BOLA + IDOR chaining across every role boundary",
          "Tenant-bleed and shared-store impersonation",
          "SCIM impersonation paths in enterprise-customer-driven SaaS",
        ],
      },
      {
        title: "API behaviour",
        blurb: "Modern web apps are API surfaces — fuzzing, rate-limit and endpoint over-exposure are first-class scope.",
        points: [
          "Input fuzzing, parameter pollution, mass-assignment",
          "Endpoint over-exposure and shadow-API discovery",
          "Rate-limit bypass and abuse-case testing on partner-API trust chains",
        ],
      },
      {
        title: "Business logic",
        blurb: "The flaws automation cannot find — design-level abuse paths tied to real business impact.",
        points: [
          "Order / billing / workflow manipulation",
          "Unauthorised workflow branching and state-machine abuse",
          "Privilege escalation through legitimate-looking sequences",
        ],
      },
      {
        title: "Error & info leakage",
        blurb: "Verbose errors and stack traces hand attackers the exploit blueprint — removed at source.",
        points: [
          "Debug / verbose error suppression at the application boundary",
          "Stack-metadata and tech-stack-disclosure removal",
          "Header hygiene (HSTS, CSP, X-Frame-Options, X-Content-Type-Options)",
        ],
      },
      {
        title: "AI / LLM application surface",
        blurb: "OWASP Top 10 for LLM Applications (2025) coverage on any AI feature in scope.",
        points: [
          "Direct + indirect prompt-injection (via RAG corpus or upstream customer data)",
          "Tool-use abuse on agent reasoning",
          "Training-data exfiltration via inference-API probing",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "Series-D B2B SaaS (US-Fortune-500 enterprise customer base)",
        engagement: "Annual WASA tied to next SOC 2 Type II audit + customer-procurement evidence pack",
        outcome:
          "23 chained-exploit findings closed pre-disclosure; report shipped as vendor-pack annex for 18 enterprise RFPs over the next 12 months; SOC 2 Type II audit cleared with zero AppSec findings carried forward.",
      },
      {
        industry: "RBI PA-PG licensee (Sector 18, Noida)",
        engagement: "WASA + CERT-In submission-format report + RBI Master Direction Annex-1 crosswalk",
        outcome:
          "Three settlement-flow abuse paths closed pre-disclosure; one indirect-prompt-injection-via-RAG path on the AI customer-service assistant closed; RBI DPSS thematic review cleared with zero clarifications.",
      },
      {
        industry: "Healthtech SaaS (US-PHI, India-built)",
        engagement: "WASA + HIPAA Security Rule §164.308–312 evidence + DPDP §16 cross-border-transfer attestation",
        outcome:
          "Three SCIM impersonation paths closed; HIPAA evidence pack accepted by two US-customer compliance functions on first read; DPDP §16 attestation accepted by sponsor DPO.",
      },
    ],
    faqs: [
      {
        q: "How is WASA different from a regular web app pentest?",
        a: "A pentest is scoped to break things — it answers 'can this be exploited?'. WASA is scoped to evaluate design integrity and control coverage — it answers 'why was this possible, what trust assumptions broke, and what else does this expose?'. WASA is broader, context-aware, framework-mapped and produces RFP-ready output. Most Macksofy buyers run both annually — pentest for the audit committee's adversary-realism question, WASA for the procurement-and-compliance evidence cycle.",
      },
      {
        q: "Will the WASA report satisfy our enterprise customers' security questionnaires (CAIQ / SIG / Shared Assessments)?",
        a: "Yes. Every WASA engagement ships a vendor-pack annex written in customer-security-questionnaire language, with framework crosswalk to OWASP, ASVS, ISO 27001:2022 Annex A and (where applicable) HIPAA / PCI DSS. The pack is the operational-evidence attachment your customer-success team uses on enterprise RFPs.",
      },
      {
        q: "Does WASA close my CERT-In + RBI Master Direction obligations?",
        a: "For BFSI / fintech / payment-aggregator scope, yes. The WASA deliverable is shipped in CERT-In empanelled submission format with explicit crosswalk to RBI Master Direction on IT Governance (Nov 2023) Annex-1 clauses. The same evidence inputs the next CSITE Cell or DPSS thematic review without rework.",
      },
      {
        q: "How long does a WASA engagement take?",
        a: "5–6 weeks for a mid-sized SaaS or fintech scope. Larger / multi-tenant / multi-region scopes stretch to 7–8 weeks. The closing week is dedicated to remediation validation and the 60-day re-test window covers every Critical and High finding.",
      },
      {
        q: "Do you cover AI / LLM application security in WASA scope?",
        a: "Yes — OWASP Top 10 for LLM Applications (2025) is the default catalogue for any AI surface in scope. Direct + indirect prompt-injection, tool-use abuse, training-data exfiltration, and domain-specific impersonation paths are tested as base scope.",
      },
      {
        q: "Will the report drop into our GRC tool?",
        a: "Yes. Findings export to Archer, ServiceNow IRM, Vanta, Drata, Tugboat Logic, OneTrust or Jira / Linear / GitHub Issues with owner, severity, CWE and ETA. The risk-register sync happens at engagement closure as part of the standard deliverable.",
      },
      {
        q: "How is WASA priced?",
        a: "Fixed-fee SoW sized by application count, tenant model and framework-overlay scope. Pricing transparency is standard — methodology document, lead consultant credentials, comparable-engagement references and a sample anonymised report are shared at the proposal stage.",
      },
    ],
    seoTitle: "WASA Audit India | Web App Security Assessment | Macksofy",
    seoDescription:
      "WASA — Web Application Security Assessment in India + UAE. OWASP ASVS V4.0 + SANS CWE Top 25 + ISO 27001 Annex A + CERT-In format + RBI Master Direction crosswalk. RFP-ready.",
    keywords: [
      "WASA audit",
      "WASA audit India",
      "Web Application Security Assessment",
      "OWASP ASVS audit",
      "WASA report",
      "WASA vs pentest",
      "WASA checklist",
      "web application security audit India",
      "CERT-In WASA",
      "RBI WASA audit",
      "WASA SaaS audit",
      "WASA compliance audit",
      "WASA Mumbai",
      "WASA Bengaluru",
    ],
  },

  // NCIIPC CII Audit — government / critical infrastructure -----------
  {
    slug: "nciipc-cii-audit",
    title: "NCIIPC Critical Information Infrastructure Audit",
    shortTitle: "NCIIPC CII Audit",
    icon: Building,
    iconName: "Building",
    category: "Indian Regulatory",
    hero: {
      eyebrow: "IT Act 2000 §70 · NCIIPC · MeitY",
      tagline: "Audit your Critical Information Infrastructure the way NCIIPC inspectors do.",
      description:
        "Macksofy delivers NCIIPC-aligned audits for entities operating Critical Information Infrastructure (CII) — Government, PSU, banking, power, telecom, transport and strategic-public-enterprise assets notified under IT Act §70. CERT-In empanelled, NCIIPC-framework mapped, inspection-evidence ready.",
    },
    whyItMatters:
      "If your organisation operates assets that have been notified as Critical Information Infrastructure under IT Act §70, you are subject to NCIIPC oversight. The National Critical Information Infrastructure Protection Centre publishes baseline-security guidelines, mandates incident reporting timelines, and conducts inspections. A non-compliant CII finding can result in operational restrictions, public-record sanction or — for designated essential services — Cabinet-level attention. Most operators have never been audited in the NCIIPC format specifically; an ISO 27001 or RBI CSF audit does not substitute. Macksofy walks an estate that has only ever been audited in another format through the gap-closure required to clear an NCIIPC inspection without rework.",
    applicability: [
      "Government IT systems notified as CII under IT Act §70",
      "Public-sector banks (notified CII assets)",
      "Power & energy sector — generation, transmission, distribution (notified CII)",
      "Telecom & internet infrastructure operators (notified CII)",
      "Transport — railways, airports, ports (notified CII)",
      "Strategic & public enterprise IT systems (notified CII)",
      "Health-sector CII (notified state / central facilities)",
      "Defence-public-sector undertakings (notified CII)",
    ],
    frameworks: [
      "NCIIPC Guidelines for Protection of CII (current revision)",
      "IT Act 2000 §70 + Rules 2013",
      "MeitY Information Security Policy",
      "CERT-In Empanelled Auditor Scope of Work",
      "ISO 27001:2022 (Annex A crosswalk)",
      "NIST SP 800-53 (control-family crosswalk)",
      "RBI CSF (banking-sector CII overlap)",
      "TRAI / DoT Security Conditions (telecom CII overlap)",
    ],
    methodology: [
      {
        phase: "1 · CII scoping confirmation",
        activities: [
          "Confirm notified CII assets with the designated Authority (CISO / CIO)",
          "Map notified assets to operational systems + data flows",
          "Identify dependency-chain CII (upstream / downstream)",
          "Cross-reference NCIIPC sectoral guidance if sector-specific notification exists",
        ],
      },
      {
        phase: "2 · NCIIPC baseline-control gap analysis",
        activities: [
          "Walk the NCIIPC baseline-security guidelines control-by-control",
          "Map existing controls (ISO / RBI / NIST) to NCIIPC control families",
          "Identify NCIIPC-specific controls without prior coverage",
          "Risk-rank gaps with NCIIPC-inspector severity weighting",
        ],
      },
      {
        phase: "3 · Technical assessment",
        activities: [
          "Vulnerability assessment of notified CII assets",
          "Penetration test scoped to CII boundary",
          "Network segmentation review (CII vs non-CII)",
          "Incident-response readiness drill against CII attack scenarios",
        ],
      },
      {
        phase: "4 · Evidence pack + inspection readiness",
        activities: [
          "NCIIPC-format inspection-readiness evidence pack",
          "Designated-Authority sign-off pack",
          "Sectoral-CERT (CERT-Sec, CERT-Fin, CERT-Power) reporting templates",
          "Incident-reporting playbook with NCIIPC-mandated timelines",
        ],
      },
      {
        phase: "5 · Continuous compliance",
        activities: [
          "Quarterly drift audit against NCIIPC baseline",
          "Inspection-prep rehearsal 60 days before scheduled NCIIPC visit",
          "Sectoral threat-intel briefings calibrated to CII operators",
          "Annual re-assessment cadence",
        ],
      },
    ],
    deliverables: [
      "NCIIPC-format inspection-readiness evidence pack",
      "Gap-closure register with risk-ranked actions and target dates",
      "Designated-Authority briefing pack (board / CISO level)",
      "Sectoral CERT reporting playbook with NCIIPC timelines",
      "Macksofy CERT-In empanelment confirmation letter",
      "Quarterly drift-audit reports (retainer)",
    ],
    pillars: [
      {
        title: "NCIIPC baseline-control adherence",
        blurb: "The control families NCIIPC inspectors actually check.",
        points: [
          "Information security policy + governance",
          "Asset management + CII boundary",
          "Access control + privileged access",
          "Cryptographic controls",
          "Physical & environmental security",
          "Communications security + network segmentation",
          "System acquisition / development / maintenance security",
          "Supplier / third-party security (sectoral relevance)",
          "Incident management + sectoral-CERT reporting",
          "BCP / DR aligned to CII service-restoration RTO",
        ],
      },
      {
        title: "Inspection readiness",
        blurb: "What an NCIIPC inspector asks for, in the order they ask.",
        points: [
          "Designated-Officer + ISC composition + meeting records",
          "Updated CII inventory + dependency map",
          "Risk-assessment & risk-treatment plan",
          "Pentest / VAPT reports for notified CII assets",
          "Incident register with sectoral-CERT timelines met",
          "DR / BCP exercise records (annual minimum)",
          "Training & awareness records for CII personnel",
          "Third-party / supplier-security evidence",
        ],
      },
      {
        title: "Sectoral overlap",
        blurb: "Where NCIIPC meets RBI / SEBI / TRAI / DoT / health-regulatory.",
        points: [
          "Public-sector bank: NCIIPC + RBI CSF crosswalk",
          "Power utility: NCIIPC + CEA Cyber Security in Power Sector",
          "Telecom: NCIIPC + DoT licence security conditions",
          "Government IT system: NCIIPC + CERT-In + DPDP §16",
          "Health-CII: NCIIPC + DPDP + IT Act §43A overlap",
        ],
      },
    ],
    caseStudies: [
      {
        industry: "Public-sector bank (NCIIPC-notified)",
        engagement: "First-time NCIIPC inspection-readiness audit + RBI CSF crosswalk",
        outcome: "Cleared NCIIPC inspection with zero major non-conformance; RBI CSF evidence re-used 70% of artefacts.",
      },
      {
        industry: "Central PSU power utility",
        engagement: "NCIIPC + CEA crosswalk for transmission OT/IT estate",
        outcome: "Boundary clarified between IT (CII) and OT (sectoral); audit cycle compressed from 16 to 9 weeks.",
      },
      {
        industry: "State government IT department",
        engagement: "Notified-application inventory + NCIIPC baseline gap closure",
        outcome: "20-application portfolio cleared in 12 weeks; sectoral-CERT reporting workflow operational.",
      },
    ],
    faqs: [
      {
        q: "Is our organisation actually under NCIIPC oversight?",
        a: "Only if one or more of your information infrastructure assets has been notified as Critical Information Infrastructure under IT Act §70 by a competent authority. Notification is published in the Gazette or communicated by the designated sectoral CERT. If you are unsure, we help you confirm with the Designated Authority during phase-1 scoping — it's a 1-week activity.",
      },
      {
        q: "How does NCIIPC audit differ from a CERT-In empanelled audit?",
        a: "A CERT-In audit certifies controls against the CERT-In Information Security Audit scope (broadly aligned with ISO and CIS). An NCIIPC audit specifically tests adherence to the NCIIPC baseline-security guidelines for Critical Information Infrastructure — a tighter, sector-aware control set with mandatory sectoral-CERT incident-reporting timelines. Macksofy is empanelled with CERT-In; the audit is delivered against the NCIIPC framework.",
      },
      {
        q: "Can we crosswalk an existing ISO 27001 audit?",
        a: "Up to a point. ISO 27001 Annex A maps to perhaps 60% of NCIIPC baseline controls. The remaining 40% — sectoral-CERT reporting, dependency-chain risk, BCP RTOs for CII service-restoration, supplier-security depth for sectoral suppliers — needs dedicated work.",
      },
      {
        q: "What's the typical engagement timeline?",
        a: "First-time NCIIPC inspection-readiness: 12-16 weeks for an estate of ~30 notified CII assets. Subsequent annual re-assessment: 4-6 weeks. Quarterly drift audit (retainer): 1 week each.",
      },
      {
        q: "Do you handle the sectoral-CERT reporting set-up too?",
        a: "Yes — we set up the workflow with your sectoral CERT (CERT-Sec for state-government, CERT-Fin for BFSI, CERT-Power for power-utility, etc.) including reporting-form templates, escalation matrix and the mandatory NCIIPC timelines.",
      },
    ],
    seoTitle: "NCIIPC CII Audit India | Critical Info Infrastructure | Macksofy",
    seoDescription:
      "NCIIPC-framework audits for IT Act §70 notified Critical Information Infrastructure. Government, PSU, power, telecom, transport. CERT-In empanelled.",
    keywords: [
      "NCIIPC audit India",
      "CII audit India",
      "Critical Information Infrastructure audit",
      "NCIIPC inspection readiness",
      "IT Act §70 audit",
      "government IT system audit India",
      "PSU cybersecurity audit",
      "MeitY information security audit",
      "CERT-In NCIIPC audit",
      "power sector CII audit",
      "telecom CII audit India",
      "sectoral CERT reporting",
      "NCIIPC baseline controls",
    ],
  },
];

export const getAuditBySlug = (slug: string) =>
  AUDITS.find((a) => a.slug === slug);

export const auditsByCategory = (category: AuditCategory) =>
  AUDITS.filter((a) => a.category === category);
