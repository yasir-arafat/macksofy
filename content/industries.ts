/**
 * Industry-vertical pillar pages. Each entry powers one /industries/[slug]
 * landing page with regulator context, services relevant to the vertical,
 * sector-specific case-study scope, and FAQs.
 *
 * Why these exist: competitor parity. Indian + UAE cybersecurity firms
 * targeting BFSI / Healthcare / SaaS / Manufacturing / Government all
 * publish vertical pages — Macksofy didn't. Each page also internally
 * links to 4-6 services + 2-3 audits, lifting the cross-link graph
 * around those slugs.
 */

import type { ComponentType } from "react";
import {
  Banknote,
  HeartPulse,
  Cloud,
  Factory,
  Landmark,
  Zap,
  Umbrella,
} from "lucide-react";

export interface IndustryFAQ {
  q: string;
  a: string;
}

export interface Industry {
  /** ISO date of last meaningful content change (drives sitemap lastmod). */
  updated?: string;
  slug: string;
  name: string;
  shortName: string;
  icon: ComponentType<{ className?: string }>;
  hero: {
    eyebrow: string;
    headline: string;
    description: string;
  };
  /** 2-3 paragraph industry context. */
  context: string[];
  /** Regulators + frameworks relevant to this vertical. */
  regulators: string[];
  /** Key services Macksofy delivers into this vertical (slug references). */
  topServices: string[];
  /** Audits frequently scoped for this vertical. */
  topAudits: string[];
  /** What the buyer is signing for — three to five outcome bullets. */
  outcomes: string[];
  /** Anonymised engagement summary. */
  caseStudy: {
    profile: string;
    scope: string;
    finding: string;
    outcome: string;
  };
  faqs: IndustryFAQ[];
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

export const INDUSTRIES: Industry[] = [
  // =================================================================
  // 1. BFSI — flagship vertical (60%+ of revenue base)
  // =================================================================
  {
    slug: "bfsi",
    name: "Banking, Financial Services & Insurance (BFSI)",
    shortName: "BFSI",
    icon: Banknote,
    hero: {
      eyebrow: "Industry · BFSI · RBI · SEBI · IRDAI",
      headline: "Cybersecurity for India's most-regulated industry.",
      description:
        "Macksofy is built for BFSI cybersecurity. CERT-In empanelled, with senior consultants who have stood inside RBI inspections, SEBI half-yearly audits, IRDAI cyber crisis drills and Central Bank of UAE submissions. 60%+ of our engagements are with banks, NBFCs, brokers, AMCs, insurers and payment aggregators.",
    },
    context: [
      "Indian BFSI sits on the strictest cybersecurity regulatory stack outside of defence — RBI's Cyber Security Framework for banks, the Master Direction for NBFCs, the Digital Payment Security Controls direction, SEBI's CSCRF for stock exchanges and Mutual Funds, the IRDAI Information & Cyber Security Guidelines for insurers, and pan-sector requirements from CERT-In, DPDPA and MeitY. Add UAE clients and the layer multiplies — Central Bank of UAE expectations, NESA Information Assurance, DESC ISR for Dubai entities.",
      "Macksofy delivers cybersecurity audits, VAPT, red teaming and Managed SOC into all the above. Most BFSI engagements run as part of an annual programme — quarterly VAPT cycles plus regulator-aligned point-in-time audits plus a CISO-on-tap retainer. Our reports are accepted by RBI inspectors, SEBI auditors, IRDAI and the Central Bank of UAE without rework.",
      "What's specific to BFSI vs. a generic cybersecurity engagement: regulator-format reporting (not just a finding list), evidence packs that survive a 4-month-after audit ask, segregation between core-banking VAPT and channel/digital VAPT, integration with the bank's existing GRC tool (RSA Archer, ServiceNow IRM, MetricStream), and Mumbai-onsite presence during quarter-end audit windows.",
    ],
    regulators: [
      "Reserve Bank of India — Cyber Security Framework + Master Direction (Banks, NBFCs, PA/PG, Wallets)",
      "SEBI — CSCRF (Stock Exchanges, Depositories, MIIs) + Cybersecurity Circular (Stock Brokers, MFs)",
      "IRDAI — Information & Cyber Security Guidelines for Insurers",
      "CERT-In — Empanelled audit + 6-hour incident reporting + log retention",
      "Central Bank of UAE — Cyber Risk Management Standards",
      "NESA / UAE IA Standards (for UAE BFSI)",
      "DPDPA + UAE Federal PDPL (cross-border BFSI data)",
    ],
    topServices: [
      "vapt",
      "penetration-testing",
      "red-teaming",
      "managed-soc",
      "web-application-security",
      "api-security",
    ],
    topAudits: [
      "rbi-csf",
      "sebi-cscrf",
      "irdai-cybersecurity",
      "iso-27001",
    ],
    outcomes: [
      "Regulator-format reports accepted by RBI, SEBI, IRDAI, CBUAE on the first read",
      "Year-round VAPT coverage across core banking, channels (net-banking, mobile, APIs), DR and partner integrations",
      "Quarterly red-team or assumed-breach exercises mapped to MITRE ATT&CK for Finance",
      "24×7 Managed SOC with BFSI-tuned detections (UPI fraud, wire-fraud patterns, kerberoasting, OWASP API Top 10)",
      "Evidence packs that survive regulator follow-up 4-6 months after submission",
    ],
    caseStudy: {
      profile: "Listed Indian private-sector bank · ₹3 Tn AUM · 1,200+ branches",
      scope:
        "Annual cyber security programme — quarterly VAPT across net-banking, mobile-banking, core-banking, ATM-switch and partner API surfaces. RBI CSF gap closure. Half-yearly red-team exercise. SOC tuning sprint.",
      finding:
        "Channel-VAPT surfaced an OAuth2 redirect-URI misconfiguration in the OEM net-banking layer that allowed account-takeover via fraudulent OAuth client. Red-team chained an internal Active Directory kerberoastable account to Domain Admin in 6 hours.",
      outcome:
        "OAuth redirect_uri allowlist hardened, kerberoastable account migrated to gMSA + 20-character random password, SOC gained 4 new detections (kerberoasting, AS-REP roasting, DCSync, golden-ticket signature). Both findings closed within RBI's stipulated reporting window.",
    },
    faqs: [
      {
        q: "Are Macksofy reports accepted by RBI inspectors?",
        a: "Yes. Macksofy is CERT-In empanelled and our reports follow the RBI Cyber Security Framework + CERT-In audit format. We've supported audits at private-sector banks, cooperative banks, NBFCs and payment aggregators where the report was read by the RBI inspection team — zero rework on the first read.",
      },
      {
        q: "Can you cover both India and UAE BFSI in one engagement?",
        a: "Yes. Several Macksofy clients are India-headquartered BFSI groups with UAE branches (DIFC, ADGM) or UAE-domiciled BFSI groups with India operations. We deliver a unified controls audit that satisfies RBI + Central Bank of UAE + NESA in a single report set, with country-specific annexes.",
      },
      {
        q: "Do you integrate with our existing GRC tool?",
        a: "Yes — we routinely deliver evidence packs into RSA Archer, ServiceNow IRM and MetricStream. We map findings to the framework references the GRC tool uses (RBI CSF clause, ISO 27001 control, NIST CSF sub-category) so risk-acceptance and remediation workflows track natively.",
      },
      {
        q: "How does an annual BFSI programme price?",
        a: "Annual programmes for mid-size BFSI clients run ₹40 L – ₹2.5 Cr per year depending on asset count, regulatory footprint and red-team frequency. At a 25-35% discount vs. one-off engagement pricing. 12-month minimum, scoped within 5 working days.",
      },
    ],
    seoTitle:
      "BFSI Cybersecurity — RBI CSF · SEBI CSCRF · IRDAI · CBUAE | Macksofy",
    seoDescription:
      "CERT-In empanelled cybersecurity for Indian and UAE BFSI — VAPT, red teaming, managed SOC and RBI / SEBI / IRDAI / CBUAE compliance audits.",
    keywords: [
      "BFSI cybersecurity India",
      "RBI cyber security framework audit",
      "SEBI CSCRF compliance",
      "IRDAI cybersecurity guidelines",
      "bank cybersecurity Mumbai",
      "NBFC VAPT India",
      "payment aggregator security audit",
      "cybersecurity for stock brokers",
      "insurer cybersecurity India",
      "Central Bank of UAE cyber compliance",
    ],
  },

  // =================================================================
  // 2. HEALTHCARE
  // =================================================================
  {
    slug: "healthcare",
    name: "Healthcare & Life Sciences",
    shortName: "Healthcare",
    icon: HeartPulse,
    hero: {
      eyebrow: "Industry · Healthcare · ADHICS · NDHM · HIPAA",
      headline: "Cybersecurity for hospitals, payors and HealthTech.",
      description:
        "Macksofy delivers cybersecurity audits, VAPT and DFIR for hospitals, diagnostics chains, health-insurance TPAs, telehealth platforms and HealthTech SaaS — across the ADHICS regime in Abu Dhabi, the NDHM/ABDM in India, and HIPAA-equivalent controls for clients serving US patient data.",
    },
    context: [
      "Healthcare cybersecurity is a cross-jurisdictional puzzle. An Indian hospital chain serving NRIs in the UAE must navigate the National Digital Health Mission's controls (ABDM), DPDPA's sensitive-personal-data provisions, ADHICS for any Abu Dhabi-resident patient data, HIPAA for US-citizen patients, and Dubai DESC ISR if any system serves a DHA-licensed entity. Add operational concerns — connected medical devices, HL7/FHIR APIs, EMR/HIS systems — and the attack surface scales fast.",
      "Macksofy's healthcare practice covers: hospital VAPT (EMR/HIS, PACS, patient portals, kiosk systems), connected-medical-device security (IEC 62304, FDA premarket guidance), HealthTech SaaS security (HIPAA + ADHICS + ISO 27001 + SOC 2 single-pass audits), and DFIR for ransomware response. We've responded inside Indian hospital ransomware events where the priority was patient-safety continuity, not just controls evidence.",
      "What's specific to healthcare cybersecurity: clinical-safety-aware testing (no VAPT that can crash an MRI scheduler or block a sepsis alert), HIPAA Breach Notification Rule timing for cross-border patient data, evidence integration with NABH / NABL audit cycles, and ADHICS Tier-3 controls for any Abu Dhabi entity.",
    ],
    regulators: [
      "Ministry of Health & Family Welfare — NDHM / ABDM controls",
      "DPDPA — sensitive personal data (health) provisions",
      "ADHICS (Abu Dhabi Department of Health) — Tier-1/2/3 controls",
      "DHA (Dubai) — health data residency + DESC ISR overlay",
      "HIPAA Security Rule + Breach Notification Rule (for US-citizen data)",
      "FDA premarket cyber guidance (for connected medical devices)",
      "NABH / NABL audit cycle alignment",
    ],
    topServices: [
      "vapt",
      "web-application-security",
      "api-security",
      "iot-ot-security",
      "digital-forensics-incident-response",
      "managed-soc",
    ],
    topAudits: [
      "iso-27001",
      "hipaa",
      "adhics",
      "soc-2",
    ],
    outcomes: [
      "Clinical-safety-aware VAPT — methodology that won't crash an EMR scheduler or block a clinical alert",
      "Single-pass HIPAA + ADHICS + ISO 27001 audit pack for cross-border HealthTech",
      "Connected-medical-device security assessments (IEC 62304-aware)",
      "Ransomware-readiness drills + 24×7 DFIR retainer with hospital-context runbooks",
      "Evidence integration with NABH / NABL audit cycles",
    ],
    caseStudy: {
      profile:
        "Multi-specialty hospital chain · 14 hospitals · Maharashtra + Karnataka + Tamil Nadu",
      scope:
        "Hospital-grade VAPT covering EMR, HIS, PACS, patient portal and kiosk fleet. NDHM/ABDM controls gap assessment. DPDPA sensitive-data RoPA. Ransomware-readiness drill with the IT + clinical-operations leadership team.",
      finding:
        "PACS DICOM viewer was reachable from the patient-WiFi VLAN. Patient-portal API leaked appointment metadata across patients via an IDOR. Imaging-vendor remote-support VPN was always-on with shared credentials.",
      outcome:
        "PACS isolated into a clinical VLAN, IDOR fixed and 9 similar enumeration patterns identified across the portal, imaging-vendor VPN moved to a per-session JIT model. Ransomware drill produced a documented playbook the IT-Ops team rehearses quarterly.",
    },
    faqs: [
      {
        q: "Will your VAPT crash our clinical systems?",
        a: "No. We use clinical-safety-aware testing: read-only scanning during clinical hours, write/exploitation only in agreed maintenance windows, exclusions for life-critical alerting paths (sepsis, code-blue, lab-result delivery). Every test has a designated clinical-ops POC and an immediate stop-the-test channel.",
      },
      {
        q: "Can you handle a HealthTech serving both India and UAE patients?",
        a: "Yes. Our HealthTech audits map a single controls baseline onto HIPAA + ADHICS + ISO 27001 + SOC 2 + DPDPA simultaneously, with country-specific annexes for the bits that diverge (cross-border transfer mechanisms, ADHICS Tier escalation, breach-notification windows).",
      },
      {
        q: "Do you do connected-medical-device security?",
        a: "Yes — for both in-house developed devices (where we test against IEC 62304 + FDA premarket guidance) and OEM devices deployed in the client estate (where we test the integration surface and the vendor's remote-support footprint).",
      },
    ],
    seoTitle:
      "Healthcare Cybersecurity — Hospital + HealthTech + HIPAA + ADHICS | Macksofy",
    seoDescription:
      "Cybersecurity for hospitals, diagnostics and HealthTech across India + UAE. Clinical-safety-aware VAPT, HIPAA + ADHICS + ISO 27001 audits, ransomware DFIR.",
    keywords: [
      "healthcare cybersecurity India",
      "hospital cybersecurity audit",
      "HealthTech VAPT",
      "HIPAA compliance India",
      "ADHICS audit Abu Dhabi",
      "EMR HIS security",
      "ABDM NDHM controls",
      "medical device cybersecurity",
      "telehealth security India",
      "hospital ransomware response",
    ],
  },

  // =================================================================
  // 3. SAAS / FINTECH
  // =================================================================
  {
    slug: "saas-fintech",
    name: "SaaS & Fintech",
    shortName: "SaaS · Fintech",
    icon: Cloud,
    hero: {
      eyebrow: "Industry · SaaS · Fintech · SOC 2 · ISO 27001 · DPDP",
      headline: "Cybersecurity for product-led SaaS and Indian fintech.",
      description:
        "Macksofy delivers the security programme product-led SaaS and fintech need to close enterprise deals — SOC 2 Type II + ISO 27001 in a single pass, DPDPA-compliant data programmes, continuous VAPT mapped to enterprise customer security questionnaires (Microsoft SSPA, Google SAQ, Salesforce AppExchange).",
    },
    context: [
      "SaaS and Indian fintech are scaling buyers of cybersecurity for one reason: enterprise customers won't sign without SOC 2 Type II, ISO 27001 and an internal pentest annexure. Add Indian regulatory layers — DPDPA for any company processing Indian personal data, RBI's NBFC/PA/PG/Wallet master directions for fintech, SEBI cybersecurity for Wealth-Tech, plus IRDAI for InsureTech — and the compliance ask scales with growth.",
      "Macksofy's SaaS practice runs as a continuous programme, not a point-in-time audit. We deliver quarterly VAPT (web, API, mobile, cloud), a single audit pack covering SOC 2 + ISO 27001 + DPDPA + (where relevant) RBI / SEBI / HIPAA, an enterprise-questionnaire-ready evidence library, and a vCISO retainer for the security leadership role product companies often defer until series-B.",
      "What's specific to SaaS / fintech cybersecurity: enterprise-questionnaire mapping (a finding closes the SSPA question, not just the underlying CVE), DevSecOps integration (Burp/Nuclei in pre-prod CI rather than after-the-fact pentests), multi-tenant tenancy boundary testing, and cloud-native posture management (Wiz / Orca / Prowler-style — we deliver the human eyes layer on top).",
    ],
    regulators: [
      "DPDPA — for any Indian-personal-data processing",
      "SOC 2 (AICPA TSP) — the enterprise-customer default",
      "ISO 27001 + ISO 27017 + ISO 27018 — international + cloud + privacy",
      "RBI Master Directions (Payment Aggregators, Prepaid Wallets, NBFC) — for fintech",
      "SEBI Cybersecurity (WealthTech, RTAs, MIIs)",
      "HIPAA — for HealthTech SaaS serving US patient data",
      "GDPR — for EU customer data",
      "UAE PDPL — for UAE customer data",
    ],
    topServices: [
      "vapt",
      "web-application-security",
      "api-security",
      "cloud-security",
      "mobile-application-security",
      "source-code-review",
    ],
    topAudits: [
      "soc-2",
      "iso-27001",
      "dpdp-act-compliance-audit",
      "gdpr",
    ],
    outcomes: [
      "Single audit pack across SOC 2 + ISO 27001 + DPDPA + (where in-scope) RBI / GDPR / HIPAA — pay once, evidence once",
      "Quarterly continuous-VAPT mapped to enterprise customer security questionnaires",
      "DevSecOps integration — pre-prod scanning, secure-code-review gating, threat-modelling per quarter",
      "Multi-tenant tenancy isolation testing (the failure mode that ends enterprise deals)",
      "vCISO retainer for the leadership role product companies often defer too long",
    ],
    caseStudy: {
      profile:
        "Series-B B2B SaaS · ₹120 Cr ARR · India HQ · 40% NA revenue · 25% EU",
      scope:
        "SOC 2 Type II readiness sprint (8 weeks) + ISO 27001 implementation (16 weeks) + quarterly VAPT setup. Multi-tenant tenancy boundary review. Enterprise-questionnaire response library.",
      finding:
        "Multi-tenant boundary review found a row-level-security misconfiguration in the analytics service — a tenant admin could enumerate aggregate metrics across the platform. Customer-questionnaire library exposed 14 SSPA gaps before they appeared in any real questionnaire.",
      outcome:
        "RLS migration shipped pre-audit, SOC 2 Type II achieved with zero findings, ISO 27001 stage-2 cleared first pass. Customer-questionnaire library now closes a typical SSPA / SAQ ask in 2 working days vs. 2 weeks prior.",
    },
    faqs: [
      {
        q: "Can you do SOC 2 + ISO 27001 + DPDPA in one pass?",
        a: "Yes — and we recommend it. The control overlap is 70-80%. Macksofy runs a unified controls register, with country/framework-specific annexes only where they diverge. One audit-evidence collection effort produces all three certificates within a 4-6 month window.",
      },
      {
        q: "Do you integrate with our DevOps stack?",
        a: "Yes. We run Burp / Nuclei / Trivy / Semgrep in client CI pipelines, integrate findings into the client's Jira or Linear, and provide a quarterly secure-code-review pass on the highest-blast-radius services.",
      },
      {
        q: "What's your fintech-specific experience?",
        a: "We hold engagements with payment aggregators, NBFCs, neobanks, WealthTech and InsureTech across India. We've supported RBI Master Direction filings, SEBI WealthTech notices, IRDAI InsureTech sandbox applications, and pre-funding security due-diligence for enterprise investors.",
      },
      {
        q: "Do you work with early-stage / pre-revenue startups?",
        a: "Yes — we have a stage-appropriate engagement model for seed/series-A startups (lighter audit, focused VAPT, fractional vCISO). The price point scales with stage; we don't push enterprise scope onto a 12-person team.",
      },
    ],
    seoTitle: "SaaS + Fintech Cybersecurity — SOC 2 · ISO 27001 · DPDPA | Macksofy",
    seoDescription:
      "Cybersecurity for product-led SaaS and Indian fintech. SOC 2 + ISO 27001 + DPDPA in a single pass, continuous VAPT, DevSecOps integration, vCISO retainer.",
    keywords: [
      "SaaS cybersecurity India",
      "fintech security audit India",
      "SOC 2 Type II India",
      "ISO 27001 implementation SaaS",
      "DPDPA compliance fintech",
      "RBI master direction payment aggregator",
      "continuous VAPT SaaS",
      "DevSecOps India",
      "multi-tenant security testing",
      "vCISO India",
    ],
  },

  // =================================================================
  // 4. MANUFACTURING / OT
  // =================================================================
  {
    slug: "manufacturing-ot",
    name: "Manufacturing & Operational Technology",
    shortName: "Manufacturing · OT",
    icon: Factory,
    hero: {
      eyebrow: "Industry · OT · ICS · IEC 62443 · IT-OT segmentation",
      headline: "Cybersecurity for the factory floor — without breaking the line.",
      description:
        "Macksofy delivers OT/ICS security assessments, IT-OT segmentation reviews and IEC 62443-aligned programmes for India's manufacturing, automotive, pharma, oil & gas and discrete-process clients. Assessments designed to find what attackers will — without disrupting production.",
    },
    context: [
      "Indian manufacturing has spent the last five years collapsing the gap between IT and OT — MES connecting to ERP, OEE dashboards pulling PLC telemetry, factory WiFi extending into the control room. The result: an attack surface that didn't exist when the OT network was a true air-gap. Recent ransomware events at Indian auto OEMs and pharma majors have made cybersecurity a board-level conversation on the OT side of the house.",
      "Macksofy's OT practice covers: IT-OT segmentation review, ICS / SCADA / PLC security assessments, IEC 62443-aligned controls programmes, OT-aware Managed SOC (Wazuh + agentless OT collectors), and ransomware-readiness drills with production-continuity playbooks. We work alongside the OT integrator, not against them — most engagements have a Honeywell / Siemens / Rockwell / Yokogawa partner in the loop.",
      "What's specific to OT cybersecurity: no active scanning into the OT network (passive only), maintenance-window-aware testing, vendor coordination with the OT OEM, and a reporting style that controls-engineers and process-safety folks actually read.",
    ],
    regulators: [
      "IEC 62443 — Industrial automation & control systems security",
      "CERT-In sectoral CSIRT (for critical-information-infrastructure)",
      "NCIIPC — National Critical Information Infrastructure Protection Centre",
      "MeitY CERT-In CSIRT-Power / CSIRT-Manufacturing alignment",
      "OEM advisories (Siemens, Schneider, Rockwell, Honeywell, Yokogawa)",
      "ISO 27001 + ISO 27019 (energy-sector controls)",
    ],
    topServices: [
      "iot-ot-security",
      "vapt",
      "red-teaming",
      "managed-soc",
      "digital-forensics-incident-response",
      "threat-intelligence",
    ],
    topAudits: [
      "iso-27001",
      "iec-62443",
      "nist-csf",
    ],
    outcomes: [
      "Passive OT discovery — full asset inventory without sending a single active packet into the control network",
      "IT-OT segmentation review with concrete remediation steps the OT team can sequence into a planned shutdown",
      "IEC 62443-aligned controls programme — zone & conduit model, security level targets, gap-closure roadmap",
      "OT-aware SOC content — Modbus / DNP3 / OPC anomaly detection, vendor-remote-support session correlation",
      "Production-continuity-aware ransomware drills",
    ],
    caseStudy: {
      profile:
        "Mid-size auto-component manufacturer · 4 plants · Maharashtra + Gujarat + Tamil Nadu",
      scope:
        "Passive OT discovery across 4 plants. IT-OT segmentation review. IEC 62443 zone & conduit baseline. Quarterly OT-aware vulnerability digest. Ransomware-readiness drill with the plant-leadership team.",
      finding:
        "Discovery surfaced 380+ OT assets the IT team didn't know existed — including 22 PLCs with default credentials and 9 engineering workstations dual-homed to IT and OT. One plant's MES had an outbound internet path the segmentation diagram showed as blocked.",
      outcome:
        "Default credentials rotated, dual-homed workstations migrated to a hardened jump-host model, MES outbound path closed and verified via passive sensor. IEC 62443 baseline locked in as the standard for new line commissioning.",
    },
    faqs: [
      {
        q: "Will your testing disrupt our production line?",
        a: "No — and that's a hard guarantee. We default to passive-only discovery on the OT network. Any active testing requires written sign-off from the plant manager + OT lead + a planned maintenance window. Most clients never let us go active on a production line, and that's fine — passive discovery + segmentation review gets you 80% of the value.",
      },
      {
        q: "Do you work with our existing OT integrator (Siemens / Honeywell / etc)?",
        a: "Yes. We typically operate as an independent security consultant in the loop with the OT OEM and the plant IT/OT team. We don't displace the integrator — we audit the controls they've deployed and recommend gaps for the next change window.",
      },
      {
        q: "What does an IEC 62443 programme cost?",
        a: "Depends on plant count, asset density and how mature your current OT inventory is. Single-plant baseline assessments run ₹15-35 L. Multi-plant programmes with quarterly cadence and dedicated OT-aware SOC content scale into ₹1-2.5 Cr per year. Quoted within 5 working days of a scoping call.",
      },
    ],
    seoTitle:
      "OT + Manufacturing Cybersecurity — IEC 62443 · ICS · SCADA | Macksofy",
    seoDescription:
      "Cybersecurity for India's manufacturing, automotive and pharma sectors — IT-OT segmentation, IEC 62443 programmes and OT-aware managed SOC.",
    keywords: [
      "OT cybersecurity India",
      "ICS SCADA security audit",
      "IEC 62443 India",
      "IT OT segmentation",
      "manufacturing cybersecurity",
      "automotive cybersecurity India",
      "pharma OT security",
      "PLC security assessment",
      "OT-aware SOC",
      "NCIIPC compliance",
    ],
  },

  // =================================================================
  // 5. GOVERNMENT / PSU
  // =================================================================
  {
    slug: "government-psu",
    name: "Government & Public Sector",
    shortName: "Government · PSU",
    icon: Landmark,
    hero: {
      eyebrow: "Industry · Government · PSU · CERT-In · NCIIPC · MeitY",
      headline: "Cybersecurity for government, PSU and citizen-facing platforms.",
      description:
        "Macksofy is CERT-In empanelled and delivers cybersecurity audits, VAPT and DFIR for state-government departments, PSUs, e-governance platforms, smart-city operators and citizen-facing services. Audit format matches MeitY + CERT-In submission requirements directly.",
    },
    context: [
      "Government cybersecurity in India is run by CERT-In's empanelment regime — only empanelled auditors can sign off on the audits that ministries, PSUs, smart-city SPVs and citizen-platform operators rely on. Macksofy has been empanelled across multiple cycles. Adjacent: NCIIPC for critical-information-infrastructure entities, MeitY for e-governance frameworks, state-level IT departments for state-portal audits, and increasingly UIDAI / Aadhaar-system auditor expectations for any platform integrating with the Aadhaar stack.",
      "Macksofy's government practice covers: CERT-In format VAPT for citizen-facing portals, audit-evidence packs for MeitY / CERT-In submissions, NCIIPC-aligned controls assessment for CII entities, e-Office and e-Sign platform security, and DFIR retainers for state-IT departments. We work alongside the empanelled vendor ecosystem (NIC, ERNET, state IT corporations) where the engagement requires it.",
      "What's specific to government cybersecurity: report format must match CERT-In's published audit format exactly, no exceptions; bidding via GeM / state-portal procurement; OEM-product audit constraints (TCO / vendor lock-in considerations); and a longer evidence-retention horizon than commercial work (typically 7 years vs. 3).",
    ],
    regulators: [
      "CERT-In — empanelment + audit format + 6-hour incident reporting",
      "NCIIPC — for critical-information-infrastructure entities",
      "MeitY — e-governance framework + STQC certification",
      "UIDAI — for any Aadhaar-integration platform",
      "State IT departments + state portals (Mumbai-Maharashtra-IT, KEONICS, ELCOT, etc.)",
      "DPDPA — citizen-personal-data provisions",
      "STQC — e-governance application certification",
    ],
    topServices: [
      "vapt",
      "penetration-testing",
      "web-application-security",
      "digital-forensics-incident-response",
      "managed-soc",
      "source-code-review",
    ],
    topAudits: [
      "cert-in-empanelled-audit",
      "iso-27001",
      "nciipc",
    ],
    outcomes: [
      "CERT-In format VAPT reports accepted by the ministry/PSU/state IT department on the first read",
      "NCIIPC-aligned controls assessment for critical-information-infrastructure entities",
      "Evidence packs with 7-year retention horizon and traceable provenance",
      "Bidding via GeM / state-portal procurement with all the empanelment documentation pre-staged",
      "DFIR retainer with state-IT-department-aware playbooks",
    ],
    caseStudy: {
      profile:
        "State-government citizen-services portal · 12 services · 4 Cr+ registered users",
      scope:
        "CERT-In format VAPT across the portal (web + mobile + APIs + admin console). NCIIPC controls baseline (the portal handles citizen data marked sensitive). Audit-evidence pack for the state IT department's annual MeitY submission.",
      finding:
        "Admin-console role-based access had a path-traversal in the user-management endpoint allowing privilege escalation from district-admin to state-admin. Mobile-app login endpoint had a timing-attack-vulnerable user-enumeration finding. Three legacy services were still on TLS 1.0.",
      outcome:
        "Path-traversal fixed and a regression test added to the CI; user-enumeration timing equalised; TLS 1.0 services migrated to TLS 1.2+ behind a load-balancer enforcement. Audit pack accepted by the state IT department's MeitY submission with zero rework.",
    },
    faqs: [
      {
        q: "Is Macksofy CERT-In empanelled?",
        a: "Yes — Macksofy is a CERT-In empanelled Information Security Auditor under MeitY, Government of India, across multiple empanelment cycles. Our reports follow the CERT-In published audit format and are accepted by ministries, PSUs, state IT departments and smart-city SPVs.",
      },
      {
        q: "Can you bid via GeM?",
        a: "Yes. Macksofy is registered on GeM and the major state-portal procurement systems. We can respond to RFPs with the empanelment documentation, NDA + scope-of-work, and audited financials pre-staged.",
      },
      {
        q: "Do you cover NCIIPC requirements?",
        a: "Yes — for critical-information-infrastructure entities we deliver an NCIIPC-aligned controls assessment with the supplementary documentation NCIIPC expects (asset criticality matrix, dependency map, incident-response RACI).",
      },
    ],
    seoTitle:
      "Government Cybersecurity — CERT-In · NCIIPC · MeitY | Macksofy",
    seoDescription:
      "CERT-In empanelled cybersecurity auditor for Indian government, PSU, state IT and citizen-platform clients. VAPT, NCIIPC controls, MeitY audit-evidence packs.",
    keywords: [
      "government cybersecurity India",
      "CERT-In empanelled auditor list",
      "NCIIPC compliance",
      "PSU cybersecurity audit",
      "state government IT audit India",
      "e-governance security audit",
      "MeitY audit format",
      "smart city cybersecurity",
      "Aadhaar integration audit",
      "GeM cybersecurity vendor",
    ],
  },

  // =================================================================
  // 6. ENERGY & UTILITIES (Critical Information Infrastructure)
  // =================================================================
  {
    updated: "2026-06-05",
    slug: "energy-utilities",
    name: "Energy, Power & Utilities (Critical Infrastructure)",
    shortName: "Energy & Utilities",
    icon: Zap,
    hero: {
      eyebrow: "Industry · Power · Oil & Gas · NCIIPC · CEA · IEC 62443",
      headline: "OT-aware cybersecurity for critical infrastructure.",
      description:
        "Power generation, transmission and distribution, load-despatch, oil & gas, renewables and water utilities are India's most consequential cyber targets — and most are designated Critical Information Infrastructure. Macksofy secures the IT and the OT, safety-first, mapped to NCIIPC, the CEA Power-Sector guidelines and IEC 62443.",
    },
    context: [
      "Energy and utilities operate the one cyber-risk class where a breach is measured in megawatts and human safety, not just data. SCADA, PLCs, RTUs and safety instrumented systems run the physical process, and most of this estate is designated Critical Information Infrastructure under Section 70A of the IT Act — placing it squarely under NCIIPC. Power-sector operators additionally answer to the Central Electricity Authority's Cyber Security in Power Sector Guidelines 2021 (a mandatory framework with an ISMS, audits, a CISO and IT/OT segregation), and everyone reports incidents to CERT-In within six hours.",
      "Macksofy runs energy engagements as a safety-first OT programme, not an IT audit pointed at a plant. We begin with passive asset discovery and an IT/OT path map, design zones and conduits to IEC 62443, and deliver OT-aware testing that uses passive analysis and twin/shutdown-window testing rather than live active scanning that could trip a running process. The same evidence base is mapped to NCIIPC and the CEA guidelines so the regulator review and the security programme are one effort, not two.",
      "What's specific to energy vs. a generic engagement: the air-gap is almost always already bridged (engineering laptops, vendor VPNs, IIoT gateways, historians replicating to the corporate data lake), so connectivity is assumed and every path is found; OT devices are 15–30-year assets the OEM forbids you to patch or run EDR on, so segmentation and passive monitoring carry the load; and the incident-response plan's first question is whether the process and the people are safe, with named OT and safety-engineer escalation.",
    ],
    regulators: [
      "NCIIPC — Critical Information Infrastructure protection under IT Act §70A",
      "Central Electricity Authority — Cyber Security in Power Sector Guidelines 2021",
      "CERT-In — 6-hour incident reporting + log retention (incl. OT operators)",
      "IEC 62443 / ISA-99 — Industrial Automation & Control Systems security",
      "PNGRB + sector ministries — oil & gas and pipeline cyber expectations",
      "ISO 27001 — ISMS backbone run jointly with the CEA / NESA mappings",
    ],
    topServices: [
      "iot-ot-security",
      "network-security-architecture",
      "vapt",
      "managed-soc",
      "digital-forensics-incident-response",
      "red-teaming",
    ],
    topAudits: [
      "nciipc-cii-audit",
      "nist-csf",
      "iso-27001",
    ],
    outcomes: [
      "Passive OT asset inventory + full IT/OT path map (the air-gap myth, dispelled)",
      "IEC 62443 zones-and-conduits design with a hardened Level 3.5 DMZ",
      "Controls mapped once to NCIIPC + CEA Power-Sector guidelines — one evidence base, two regulators",
      "OT-aware monitoring (Modbus/DNP3/OPC/PROFINET) into a SOC with process context",
      "An incident-response runbook whose first move protects the process and the people",
    ],
    caseStudy: {
      profile: "State power-distribution utility · multiple grid sub-stations + a SCADA/DMS control centre",
      scope:
        "Passive OT discovery across RTUs, IEDs and the SCADA/DMS estate; IT/OT path mapping; IEC 62443 zones-and-conduits design; gap assessment against the CEA Power-Sector guidelines and NCIIPC controls; OT-aware SOC monitoring pilot.",
      finding:
        "The 'air-gapped' control network had three live paths to corporate IT — a vendor remote-support VPN left dialled-up, an engineering laptop that also reached email, and a historian replicating to the enterprise data lake. A flat OT VLAN let a single compromised HMI reach every RTU.",
      outcome:
        "Vendor access re-brokered through a monitored MFA jump host, the historian flow moved to a one-way data diode through a new Level 3.5 DMZ, the OT estate re-segmented into IEC 62443 zones, and the CEA IT/OT-segregation finding closed ahead of the regulator review. Passive ICS monitoring now feeds the SOC.",
    },
    faqs: [
      {
        q: "Can you test our live SCADA / power-control systems without causing an outage?",
        a: "Yes — by not testing them the way IT is tested. Active scanning or exploitation against fragile legacy controllers can trip the physical process, so OT assessment is passive-first: traffic capture and protocol analysis, configuration and firmware review, and architecture assessment against IEC 62443. Active testing is reserved for a lab, a digital twin or an agreed maintenance shutdown. You get the same findings with zero risk to safety or uptime.",
      },
      {
        q: "Are you familiar with the CEA Cyber Security in Power Sector Guidelines?",
        a: "Yes. The CEA's 2021 guidelines are a mandatory framework for power generation, transmission, distribution and load-despatch — an ISMS, periodic audits, a designated CISO, IT/OT network segregation and incident reporting. We gap-assess your estate against them, prioritise the IT/OT-segregation finding (the most common gap), and map the same control set to NCIIPC and ISO 27001 so you maintain one programme, not three.",
      },
      {
        q: "What is NCIIPC and does it apply to us?",
        a: "NCIIPC — the National Critical Information Infrastructure Protection Centre, under Section 70A of the IT Act — protects designated Critical Information Infrastructure across power, oil & gas, transport and other strategic sectors. If your systems are designated CII (most large grid, generation and pipeline operators are), you carry protection, reporting and baseline-control obligations to NCIIPC. We help you meet them and produce the evidence a review will ask for.",
      },
      {
        q: "Do you secure renewables, oil & gas and water utilities too, or only power grids?",
        a: "All of them. The OT security model — passive discovery, IEC 62443 zones and conduits, OT-aware monitoring and a safety-first IR plan — applies across power (thermal, hydro, solar/wind farms, load-despatch), oil & gas (PNGRB-regulated pipelines and refineries) and water/wastewater utilities. The regulators differ by sub-sector; the engineering discipline is the same.",
      },
    ],
    seoTitle:
      "Energy & Utilities Cybersecurity — NCIIPC · CEA · IEC 62443 | Macksofy",
    seoDescription:
      "OT-aware cybersecurity for Indian power, oil & gas, renewables and water utilities — SCADA/ICS security, IEC 62443 segmentation and NCIIPC + CEA compliance.",
    keywords: [
      "energy cybersecurity India",
      "power sector cybersecurity India",
      "SCADA ICS security India",
      "NCIIPC CII compliance",
      "CEA cyber security power sector guidelines",
      "IEC 62443 India",
      "OT security utilities",
      "oil and gas cybersecurity India",
      "critical infrastructure security India",
      "grid SCADA penetration testing",
    ],
  },

  // =================================================================
  // 7. INSURANCE (insurer-specific deep vertical — IRDAI)
  // =================================================================
  {
    updated: "2026-06-05",
    slug: "insurance",
    name: "Insurance — Life, General, Health & Reinsurance",
    shortName: "Insurance",
    icon: Umbrella,
    hero: {
      eyebrow: "Industry · IRDAI · ISNP · DPDPA · Health Data",
      headline: "Cybersecurity built for insurers and insurtech.",
      description:
        "Insurers sit on the most sensitive personal data outside healthcare — health records, financials, KYC and claims — across sprawling agent, broker, web-aggregator and insurtech ecosystems. Macksofy delivers IRDAI-aligned cybersecurity audits, VAPT and Managed SOC for life, general, health and reinsurance carriers.",
    },
    context: [
      "Insurance is regulated as part of BFSI but carries its own cyber profile. The IRDAI Information & Cyber Security Guidelines set the baseline — a board-approved security policy, a CISO, periodic VAPT and audits, incident reporting and third-party risk management — and they reach the entire distribution chain: insurers, ISNP (Insurance Self-Network Platform) operators, web aggregators, corporate agents, brokers and the growing insurtech layer. Overlaid on this is the DPDP Act, because an insurer's data estate is dominated by sensitive personal and health data, and CERT-In's 6-hour incident-reporting and log-retention directions.",
      "Macksofy delivers IRDAI-aligned audits, application and API VAPT, cloud security and 24×7 Managed SOC into life, general (motor/property/marine), standalone health insurers and reinsurers. Most engagements run as an annual programme — periodic VAPT across the policy-admin system, customer and agent portals, mobile apps, the ISNP and the API estate that connects aggregators and insurtech partners — plus the point-in-time IRDAI audit and a CISO-on-tap retainer.",
      "What's specific to insurance vs. generic BFSI: the attack surface is dominated by web and API channels (aggregator integrations, agent portals, claims and onboarding APIs) and by a long tail of third-party insurtech and TPA integrations; the data sensitivity is health-grade, so DPDPA and breach exposure are acute; and claims-fraud and account-takeover detection belong in the SOC alongside classic web/API threats. Reports follow the IRDAI format and map cleanly to ISO 27001 and the DPDP Act.",
    ],
    regulators: [
      "IRDAI — Information & Cyber Security Guidelines for insurers and intermediaries",
      "IRDAI — ISNP (Insurance Self-Network Platform) security requirements",
      "DPDP Act 2023 — sensitive personal + health data of policyholders",
      "CERT-In — 6-hour incident reporting + log retention + empanelled audit",
      "ISO 27001 — ISMS run jointly with the IRDAI control mapping",
      "SOC 2 — for insurtech / SaaS platforms serving carriers",
    ],
    topServices: [
      "vapt",
      "web-application-security",
      "api-security",
      "managed-soc",
      "cloud-security",
      "penetration-testing",
    ],
    topAudits: [
      "irdai-compliance",
      "iso-27001",
      "dpdp-act",
      "soc-2",
    ],
    outcomes: [
      "IRDAI-format reports accepted by the regulator and internal audit on the first read",
      "Year-round VAPT across policy-admin, portals, mobile, the ISNP and the aggregator/insurtech API estate",
      "DPDPA-aligned handling of policyholder health and financial data, with breach-readiness",
      "24×7 Managed SOC tuned for claims fraud, account-takeover and OWASP API Top 10",
      "Third-party / insurtech / TPA integration risk assessed and continuously monitored",
    ],
    caseStudy: {
      profile: "Standalone health insurer · pan-India · web-aggregator + agent + insurtech distribution",
      scope:
        "Annual programme — IRDAI Information & Cyber Security Guidelines gap closure, quarterly VAPT across the policy-admin system, customer/agent portals, mobile app and the claims/onboarding API estate, plus a review of web-aggregator and TPA integrations.",
      finding:
        "A claims-upload API exposed an IDOR that let an authenticated policyholder enumerate and download other claimants' medical documents. A web-aggregator integration trusted a partner-supplied identifier without server-side authorisation.",
      outcome:
        "Object-level authorisation enforced on every claims/document endpoint, the aggregator integration moved to signed, server-validated tokens, and the SOC gained detections for cross-account enumeration. IRDAI gap items closed and the evidence pack mapped to ISO 27001 + DPDP Act in one report set.",
    },
    faqs: [
      {
        q: "Are Macksofy reports aligned to the IRDAI cyber security guidelines?",
        a: "Yes. We deliver against the IRDAI Information & Cyber Security Guidelines — periodic VAPT, the control-area gap assessment, incident-reporting and third-party-risk requirements — in the format IRDAI and your internal audit expect. Macksofy is CERT-In empanelled, and we map the same findings to ISO 27001 and the DPDP Act so one evidence base serves all three.",
      },
      {
        q: "Do you cover ISNP and web-aggregator / insurtech integrations?",
        a: "Yes — that's where most insurer risk now lives. We test the ISNP (Insurance Self-Network Platform), agent and customer portals, mobile apps, and critically the API estate that connects web aggregators, TPAs and insurtech partners. API authorisation flaws (IDOR/BOLA), token trust issues and weak partner integrations are the most common high-severity findings we surface.",
      },
      {
        q: "How do you handle policyholder health data under the DPDP Act?",
        a: "An insurer's data estate is health-grade, so we treat DPDPA as a first-class scope item, not an afterthought. We map where sensitive personal and health data is collected, processed, stored and shared (including with TPAs and reinsurers), flag the high-risk flows, and align the security controls and breach-response runbook to the DPDP Act alongside the IRDAI requirements.",
      },
      {
        q: "Can you secure an insurtech / SaaS platform that sells to carriers?",
        a: "Yes. Insurtech and SaaS platforms serving insurers need both the security depth (application + API VAPT, cloud security, a Managed SOC) and the assurance artefacts their carrier customers demand — typically SOC 2 and ISO 27001 alongside an IRDAI-aligned posture. We run these as one programme so you can answer a carrier's security due-diligence without a separate project each time.",
      },
    ],
    seoTitle:
      "Insurance Cybersecurity — IRDAI · ISNP · DPDPA | Macksofy",
    seoDescription:
      "CERT-In empanelled cybersecurity for Indian insurers, reinsurers and insurtech — IRDAI-aligned audits, web/API VAPT, managed SOC, DPDPA and ISO 27001.",
    keywords: [
      "insurance cybersecurity India",
      "IRDAI cyber security guidelines audit",
      "insurer VAPT India",
      "ISNP security requirements",
      "health insurance data protection DPDP",
      "insurtech security SOC 2",
      "web aggregator API security",
      "claims fraud detection SOC",
      "reinsurance cybersecurity",
      "IRDAI compliance audit India",
    ],
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
