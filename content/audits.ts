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
} from "lucide-react";

export type AuditCategory =
  | "Indian Regulatory"
  | "International Standard"
  | "Industry & Privacy"
  | "Foundational";

export const AUDIT_CATEGORIES: AuditCategory[] = [
  "Indian Regulatory",
  "International Standard",
  "Industry & Privacy",
  "Foundational",
];

export interface Audit {
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
    slug: "compliance-regulatory-audits",
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
      "RBI Cyber Security Framework Audit | SAR for Banks, NBFCs, PA-PGs | Macksofy",
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
    slug: "vapt-rbi-pci",
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
];

export const getAuditBySlug = (slug: string) =>
  AUDITS.find((a) => a.slug === slug);

export const auditsByCategory = (category: AuditCategory) =>
  AUDITS.filter((a) => a.category === category);
