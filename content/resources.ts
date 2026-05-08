import type { LucideIcon } from "lucide-react";
import {
  ScrollText,
  ListChecks,
  Network,
  Smartphone,
  ShieldAlert,
  FileWarning,
  Lock,
  Cloud,
  KeySquare,
  Activity,
} from "lucide-react";

export type ResourceType =
  | "Whitepaper"
  | "Checklist"
  | "Cheat Sheet"
  | "Brochure";

export type ResourceSector =
  | "BFSI"
  | "Fintech"
  | "Telecom"
  | "SaaS"
  | "Healthcare"
  | "Manufacturing"
  | "Government"
  | "Retail"
  | "Cross-sector";

export type ResourceRegion = "India" | "UAE" | "GCC" | "Global";

export type ResourceBlock =
  | { type: "para"; text: string }
  | { type: "heading"; text: string; level?: 2 | 3 }
  | { type: "list"; items: string[] }
  | { type: "checklist"; items: { item: string; sub?: string }[] }
  | {
      type: "callout";
      tone: "info" | "warn" | "tip";
      title: string;
      body: string;
    }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "stats"; items: { value: string; label: string }[] };

export interface Resource {
  slug: string;
  type: ResourceType;
  title: string;
  subtitle: string;
  summary: string;
  refNo: string;
  pageCount: string;
  sector: ResourceSector[];
  region: ResourceRegion[];
  topics: string[];
  publishedYear: string;
  icon: LucideIcon;
  accent: "cyan" | "purple" | "amber" | "pink" | "green" | "red";

  /** External href for aggregator entries (brochures) */
  externalHref?: string;

  /** Content blocks for owned resources (whitepapers + checklists) */
  intro?: string;
  blocks?: ResourceBlock[];

  /** Inferred related-services for cross-linking */
  relatedServiceSlugs?: string[];

  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

export const RESOURCES: Resource[] = [
  /* ════════════════════════════════════════════════════════════
     WHITEPAPERS (4)
     ════════════════════════════════════════════════════════════ */

  {
    slug: "sebi-cscrf-playbook-2026",
    type: "Whitepaper",
    title: "SEBI CSCRF Playbook · 2026",
    subtitle:
      "How regulated entities prepare for the SEBI Cyber Security & Cyber Resilience Framework — scope, controls, evidence pack and 90-day rollout plan.",
    summary:
      "A practitioner's playbook for SEBI-regulated entities preparing for CSCRF. Maps the framework's control families to evidence artefacts, with a 90-day rollout plan and the gaps that fail audits most often.",
    refNo: "MKS-WP-CSCRF-2026",
    pageCount: "12-page whitepaper",
    sector: ["BFSI", "Fintech"],
    region: ["India"],
    topics: ["SEBI CSCRF", "Compliance", "Audit", "BFSI"],
    publishedYear: "2026",
    icon: ScrollText,
    accent: "cyan",
    relatedServiceSlugs: ["vapt", "penetration-testing"],
    intro:
      "SEBI's Cyber Security & Cyber Resilience Framework (CSCRF) reshapes how regulated entities — stockbrokers, depositories, AMCs, MIIs and intermediaries — prove their security posture. This whitepaper unpacks the framework into a scope-map, a control-evidence matrix, and a 90-day rollout plan that an internal team can run without external hand-holding.",
    blocks: [
      {
        type: "heading",
        text: "1. Why CSCRF, why now",
      },
      {
        type: "para",
        text: "CSCRF is SEBI's response to a decade of cyber incidents in the Indian capital-markets ecosystem. It moves entities from a tick-box ISO 27001 posture to evidence-driven, control-tested resilience. Where ISO certifies management systems, CSCRF audits real-world cyber operations — pentests, SOC monitoring, IR drills, supply-chain risk and recovery time objectives.",
      },
      {
        type: "para",
        text: "The framework graduates entities into MII / Qualified / Mid-size / Self-certified tiers. Each tier inherits a different control surface and a different audit cadence. The mistake we see most often: an entity audited at the wrong tier — usually one tier above their actual classification — burns auditing budget and engineering time on controls that were never expected of them.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Tier first, controls second.",
        body: "Confirm your CSCRF tier in writing with your CISO + Compliance head before any control work begins. The tier dictates the entire scope, including pentest depth, RTO targets, and SOC requirements.",
      },
      {
        type: "heading",
        text: "2. Mapping CSCRF control families to evidence artefacts",
      },
      {
        type: "para",
        text: "Auditors don't grade intent — they grade evidence. The table below lists the seven CSCRF control families with the artefact a tier-1 auditor expects to see for each.",
      },
      {
        type: "table",
        head: ["Control family", "Auditor expects", "Macksofy artefact"],
        rows: [
          [
            "Identify & Govern",
            "Asset register, risk register, signed-off policies",
            "Risk-register template, board-pack walkthrough",
          ],
          [
            "Protect — IAM",
            "Privileged-access reviews, MFA enforcement evidence",
            "Quarterly PAM review report",
          ],
          [
            "Protect — Network",
            "Segmentation diagram, firewall ruleset audit",
            "Network arch + ruleset hygiene report",
          ],
          [
            "Detect",
            "SOC use-case catalogue, MTTD / MTTR metrics",
            "SIEM use-case library + tuning runbook",
          ],
          [
            "Respond",
            "IR plan, tabletop minutes, CERT-In submission template",
            "IR runbook + tabletop facilitation",
          ],
          [
            "Recover",
            "Backup test logs, RTO/RPO drill evidence",
            "DR drill report",
          ],
          [
            "Pentest & Assurance",
            "Manual pentest report, retest evidence, fix-rate metrics",
            "CERT-In format pentest with retest sign-off",
          ],
        ],
      },
      {
        type: "heading",
        text: "3. The five gaps that fail CSCRF audits",
      },
      {
        type: "list",
        items: [
          "Pentest scope set to 'web app' only — CSCRF expects API + cloud + internal network in-scope.",
          "Vulnerabilities marked 'closed' without retest evidence — the auditor wants a live retest, not a JIRA ticket close.",
          "SOC use-case catalogue ungoverned — no MITRE-mapped library, no tuning logs.",
          "DR drills run on backups but never on tier-0 systems — backup ≠ DR.",
          "Third-party / supply-chain risk register absent or stale — CSCRF makes this a tier-1 expectation.",
        ],
      },
      {
        type: "heading",
        text: "4. The 90-day CSCRF rollout plan",
      },
      {
        type: "para",
        text: "An internal team can run this plan without an external prime. Macksofy can plug in for the pentest + DR drill weeks if internal capacity is constrained.",
      },
      {
        type: "checklist",
        items: [
          {
            item: "Days 0–14 · Tier confirmation + scope-map",
            sub: "Confirm CSCRF tier in writing. Build the asset register against the in-scope estate.",
          },
          {
            item: "Days 15–30 · Policy + IAM hygiene",
            sub: "Refresh policies; complete a quarterly PAM review; enforce MFA on every tier-0 / tier-1 account.",
          },
          {
            item: "Days 31–55 · Detect + Respond",
            sub: "Build/refresh SOC use-case library; run a tabletop with IR plan; submit a CERT-In drill report.",
          },
          {
            item: "Days 56–75 · Pentest + retest",
            sub: "Manual pentest covering web + API + cloud + internal AD. Retest within 30 days.",
          },
          {
            item: "Days 76–90 · DR drill + audit-ready pack",
            sub: "Restore drill on tier-0 systems. Compile evidence pack mapped to CSCRF control IDs.",
          },
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Run the audit-ready pack quarterly.",
        body: "Don't wait for the annual audit cycle to assemble evidence. A standing quarterly cadence — pentest retest, PAM review, SOC tuning logs, DR drill — produces an always-current pack that any auditor can consume in two days.",
      },
      {
        type: "heading",
        text: "5. Engaging Macksofy",
      },
      {
        type: "para",
        text: "Macksofy is a CERT-In empanelled cybersecurity auditor. Our CSCRF engagements range from full-scope tier-1 audits down to focused pentest + retest packages for self-certified entities. Reports are accepted by the major audit and Big-4 firms without rework.",
      },
    ],
    seoTitle: "SEBI CSCRF Playbook 2026 — Scope, Controls, 90-day Plan | Macksofy",
    seoDescription:
      "A practitioner's playbook for SEBI CSCRF: tiering, control-to-evidence mapping, the five gaps that fail audits and a 90-day rollout plan. Free whitepaper from CERT-In empanelled Macksofy.",
    keywords: [
      "SEBI CSCRF playbook",
      "SEBI CSCRF compliance",
      "CSCRF audit India",
      "SEBI cybersecurity framework",
      "BFSI compliance whitepaper",
      "CSCRF 90 day plan",
    ],
  },

  {
    slug: "ot-it-segmentation-india-manufacturers",
    type: "Whitepaper",
    title: "OT / IT Segmentation for Indian Manufacturers",
    subtitle:
      "Why flat networks keep losing — design patterns, vendor-agnostic implementation, and the five mistakes auditors flag most often.",
    summary:
      "Manufacturing networks across Maharashtra, Gujarat and Tamil Nadu still run a single L2 between corporate IT and the plant. This whitepaper lays out the segmentation patterns that work, the five recurring mistakes auditors flag, and a vendor-agnostic implementation sequence.",
    refNo: "MKS-WP-OTIT-2026",
    pageCount: "10-page whitepaper",
    sector: ["Manufacturing", "Cross-sector"],
    region: ["India"],
    topics: ["OT Security", "Network Segmentation", "Manufacturing", "Industrial"],
    publishedYear: "2026",
    icon: Network,
    accent: "purple",
    relatedServiceSlugs: ["vapt", "digital-forensics-incident-response"],
    intro:
      "Most Indian manufacturers we work with discover the cost of a flat network the hard way. This whitepaper shows the segmentation patterns that survive a real incident, anchored to the Purdue model and adapted for the realities of legacy PLCs, vendor support contracts, and patch-cycle constraints common in Indian plants.",
    blocks: [
      {
        type: "heading",
        text: "1. Why flat networks keep losing",
      },
      {
        type: "para",
        text: "When a corporate-IT phishing victim's laptop sits two ARP hops from a plant historian, a single credentialed adversary can pivot from email to MES in minutes. The 2024–2025 wave of LockBit and Akira campaigns we've responded to in Maharashtra and Gujarat all shared this same shape — flat L2, no DMZ, plant credentials reused on corporate workstations.",
      },
      {
        type: "stats",
        items: [
          { value: "73%", label: "of manufacturer DFIR cases lacked OT/IT segmentation" },
          { value: "11h", label: "median dwell time before MES exposure" },
          { value: "₹2.8Cr", label: "median containment + recovery cost" },
        ],
      },
      {
        type: "heading",
        text: "2. The Purdue model, adapted for Indian plants",
      },
      {
        type: "para",
        text: "The classical Purdue Enterprise Reference Architecture stays the right scaffolding. But a 2008-vintage shop-floor with PLCs that can't tolerate active scanning needs adaptation, not dogma.",
      },
      {
        type: "table",
        head: ["Level", "Function", "Indian-plant reality"],
        rows: [
          ["L0–L2", "Field devices, PLCs, HMIs", "Legacy SCADA on Windows XP / 7 — passive monitoring only"],
          ["L3", "Site control + MES", "Often Windows Server 2012 — patch on quarterly maintenance windows"],
          ["L3.5", "Industrial DMZ", "Rarely present; create as the FIRST hardening step"],
          ["L4", "Site business network", "ERP, plant scheduling, vendor remote-support"],
          ["L5", "Enterprise network", "Corporate IT, email, internet"],
        ],
      },
      {
        type: "heading",
        text: "3. Three implementation patterns that work in Indian plants",
      },
      {
        type: "list",
        items: [
          "Pattern A — Hardware DMZ with one-way replication: corporate IT pulls plant telemetry into a DMZ, never the other way. Best for new plants.",
          "Pattern B — VLAN + ACL segmentation with jump-host: cheap retrofit for existing flat networks; needs disciplined ACL hygiene.",
          "Pattern C — SDP / ZTNA overlay: software-defined perimeter for vendor remote-support; pairs well with pattern A or B.",
        ],
      },
      {
        type: "heading",
        text: "4. The five mistakes auditors flag most",
      },
      {
        type: "list",
        items: [
          "Vendor remote-support tunnels that bypass the DMZ — usually IT-only knows about half of them.",
          "Shared service accounts between corporate Active Directory and plant Active Directory.",
          "Backup network reachable from corporate IT — defeats the entire segmentation premise on incident.",
          "PLC management ports open across L3 — most operators leave Modbus and OPC-UA on default ACLs.",
          "Patch-cycle exceptions that never expire — every quarterly skip becomes a permanent gap.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Backup network is part of the segmentation perimeter.",
        body: "If your corporate domain admin can reach backup storage, your backups are not safe in a ransomware scenario. The 11-hour-containment manufacturer case study from 2025 hinged on backups being writable from compromised tier-1 admin accounts.",
      },
      {
        type: "heading",
        text: "5. Six-step rollout sequence",
      },
      {
        type: "checklist",
        items: [
          {
            item: "Step 1 · Inventory",
            sub: "Build an asset register covering every PLC, HMI, historian and engineering workstation. Passive discovery only.",
          },
          {
            item: "Step 2 · Communication map",
            sub: "Document required east-west and north-south flows before designing controls.",
          },
          {
            item: "Step 3 · DMZ instantiation",
            sub: "Stand up the L3.5 industrial DMZ as a hardware firewall, not a VLAN-only construct.",
          },
          {
            item: "Step 4 · Identity separation",
            sub: "Plant AD / corporate AD become independent forests with one-way trust at most.",
          },
          {
            item: "Step 5 · Vendor access controls",
            sub: "Replace VPN-into-corporate with SDP/ZTNA terminating in the DMZ. Per-vendor logging.",
          },
          {
            item: "Step 6 · Tabletop + IR drill",
            sub: "Run a ransomware tabletop where corporate IT is presumed compromised. Confirm OT survives.",
          },
        ],
      },
    ],
    seoTitle:
      "OT/IT Segmentation Whitepaper — Indian Manufacturers · Macksofy",
    seoDescription:
      "Why flat networks keep losing in Indian manufacturing — Purdue-adapted segmentation patterns, 5 audit mistakes, 6-step rollout. CERT-In empanelled, ransomware-tested guidance.",
    keywords: [
      "OT IT segmentation India",
      "manufacturing cybersecurity whitepaper",
      "Purdue model India",
      "SCADA segmentation",
      "industrial DMZ",
      "manufacturing ransomware India",
    ],
  },

  {
    slug: "mobile-app-security-bfsi-india",
    type: "Whitepaper",
    title: "Mobile App Security for Indian BFSI",
    subtitle:
      "RBI Mobile Cyber Security Framework expectations, the OWASP Mobile Top 10 — translated for Indian banks and NBFCs — and a secure-SDLC integration model.",
    summary:
      "What RBI expects from mobile-banking apps, the OWASP Mobile Top 10 translated into BFSI control language, and how to fold mobile pentesting into a release cadence without breaking velocity.",
    refNo: "MKS-WP-MOBILE-2026",
    pageCount: "11-page whitepaper",
    sector: ["BFSI", "Fintech"],
    region: ["India"],
    topics: ["Mobile Security", "RBI", "BFSI", "OWASP MASVS"],
    publishedYear: "2026",
    icon: Smartphone,
    accent: "pink",
    relatedServiceSlugs: ["penetration-testing", "web-api-security"],
    intro:
      "Indian BFSI mobile apps face a tighter scrutiny than most: RBI's Mobile Cyber Security Framework, BBPS / NPCI integration audits, and a customer base that loses trust quickly. This whitepaper distils what we see across mobile pentests for tier-1 banks, listed NBFCs and fintechs.",
    blocks: [
      {
        type: "heading",
        text: "1. RBI's mobile expectations, in plain language",
      },
      {
        type: "para",
        text: "RBI's mobile guidance — combined with the Master Direction on Digital Payment Security — sets the floor: device-binding, secure storage, runtime protections, transaction-signing, and tamper detection. Most banks meet four of those five; the fifth (tamper detection) is where pentests routinely surface findings.",
      },
      {
        type: "heading",
        text: "2. OWASP Mobile Top 10, translated for BFSI",
      },
      {
        type: "table",
        head: ["OWASP risk", "BFSI failure mode", "Auditor question"],
        rows: [
          ["M1 Improper credential use", "API keys / tokens in shared_prefs / Keychain", "Show me your secret-storage architecture."],
          ["M2 Inadequate supply chain", "SDKs that exfiltrate device data", "List every SDK + its data-collection scope."],
          ["M3 Insecure auth/auth", "Account takeover via deeplink", "Walk me through deeplink validation."],
          ["M4 Insufficient I/O validation", "JWT alg=none accepted", "Show JWT validation tests."],
          ["M5 Insecure communication", "Cert-pinning bypass via debug builds", "Demonstrate pinning under MITM."],
          ["M6 Privacy controls", "Logging PAN / Aadhaar to system log", "Audit your log-redaction layer."],
          ["M7 Insufficient binary protections", "No tamper detection / no anti-debug", "What happens to a re-signed app?"],
          ["M8 Security misconfiguration", "Backup flag enabled on production", "Show your manifest hardening."],
          ["M9 Insecure data storage", "Cleartext database files", "Where do you store offline data?"],
          ["M10 Insufficient cryptography", "Hard-coded encryption keys", "Demonstrate key derivation."],
        ],
      },
      {
        type: "heading",
        text: "3. Secure-SDLC integration without killing velocity",
      },
      {
        type: "para",
        text: "Mobile teams that integrate security at release-cycle granularity outperform teams that bolt it on annually. The pattern that scales:",
      },
      {
        type: "list",
        items: [
          "MASVS-driven static analysis on every commit (free or commercial — both work)",
          "Quarterly external mobile pentest covering iOS + Android + backend APIs",
          "Annual deep red-team-grade engagement with binary-protection bypass attempts",
          "Block-on-build CI gates for hard-coded secrets, weak crypto, and insecure manifest flags",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Cert-pinning is necessary, not sufficient.",
        body: "We bypass cert-pinning in 90%+ of mobile pentests in under an hour. Pinning slows down the script kiddie; it does not stop a real adversary or even a determined penetration tester. Treat pinning as one layer, never the only layer.",
      },
      {
        type: "heading",
        text: "4. Five things to demand from your mobile pentest provider",
      },
      {
        type: "checklist",
        items: [
          {
            item: "Manual exploitation, not just MobSF output",
            sub: "Tooling-only reports miss authorization, deeplink and session-handling logic flaws.",
          },
          {
            item: "Both iOS and Android in scope",
            sub: "Findings on one platform almost always have analogues on the other.",
          },
          {
            item: "Backend API in the same engagement",
            sub: "Mobile pentest without API depth misses 60% of the customer-impact findings.",
          },
          {
            item: "Free retest within 30 days",
            sub: "Standard at Macksofy; treat this as a baseline expectation across vendors.",
          },
          {
            item: "OSCP / OSWE-certified operators on the engagement",
            sub: "Verify the assigned consultant's certs before signing the SOW.",
          },
        ],
      },
    ],
    seoTitle:
      "Mobile App Security Whitepaper — Indian BFSI · RBI MCSF + OWASP Mobile | Macksofy",
    seoDescription:
      "RBI Mobile Cyber Security Framework expectations, OWASP Mobile Top 10 translated for BFSI, and a secure-SDLC integration model. CERT-In empanelled mobile pentest guidance from Macksofy.",
    keywords: [
      "mobile app security BFSI India",
      "RBI mobile cyber security framework",
      "OWASP Mobile Top 10",
      "mobile pentest whitepaper India",
      "BFSI mobile security",
      "OWASP MASVS India",
    ],
  },

  {
    slug: "india-ransomware-landscape-2026",
    type: "Whitepaper",
    title: "India Ransomware Landscape · 2026",
    subtitle:
      "Threat actors active against Indian organisations, sector-wise hit rates, common entry vectors and a 6-step preparedness checklist.",
    summary:
      "Active threat actors against Indian organisations, sector hit-rates, the entry vectors we see most often in DFIR cases, and a 6-step preparedness checklist that significantly reduces blast radius when an incident arrives.",
    refNo: "MKS-WP-RW-2026",
    pageCount: "10-page whitepaper",
    sector: ["Cross-sector"],
    region: ["India"],
    topics: ["Ransomware", "Threat Intelligence", "Incident Response"],
    publishedYear: "2026",
    icon: ShieldAlert,
    accent: "red",
    relatedServiceSlugs: [
      "digital-forensics-incident-response",
      "threat-intelligence",
    ],
    intro:
      "Macksofy's DFIR retainer book and threat-intelligence telemetry give us a privileged view of the ransomware landscape in India. This whitepaper shares what we see across 2025 and into 2026 — without naming victims — and what posture changes most reduce blast-radius when an incident does arrive.",
    blocks: [
      {
        type: "heading",
        text: "1. Active threat actors against Indian organisations",
      },
      {
        type: "list",
        items: [
          "LockBit variants — sustained presence; manufacturing and BFSI common targets.",
          "Akira — fast-moving against mid-market across NCR and Maharashtra.",
          "Black Basta affiliates — opportunistic, often via VPN credential reuse.",
          "8Base — common against logistics and SaaS.",
          "Nation-aligned wipers — rare but visible against government and CII targets.",
        ],
      },
      {
        type: "heading",
        text: "2. Sector hit-rates from our DFIR book (2025)",
      },
      {
        type: "stats",
        items: [
          { value: "31%", label: "Manufacturing" },
          { value: "24%", label: "BFSI / NBFC" },
          { value: "18%", label: "SaaS / IT services" },
          { value: "27%", label: "Other (logistics, retail, healthcare)" },
        ],
      },
      {
        type: "heading",
        text: "3. Top five entry vectors we keep seeing",
      },
      {
        type: "table",
        head: ["Vector", "Share of cases", "Why it keeps working"],
        rows: [
          ["Internet-exposed RDP", "29%", "Legacy bastions never decommissioned"],
          ["VPN credential reuse", "23%", "No MFA on the VPN; password spray succeeds"],
          ["Phishing → MFA fatigue", "21%", "MFA push-spam against under-trained users"],
          ["Vulnerable edge appliance", "15%", "Known CVEs on Citrix / Fortinet / SonicWall"],
          ["Malicious vendor access", "12%", "Always-on third-party tunnels"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "MFA on email is not MFA on VPN.",
        body: "Across 2025 IR cases the single most common preventable failure was a VPN with password-only authentication while corporate email had MFA. Attackers always go to the weaker control.",
      },
      {
        type: "heading",
        text: "4. The 12-month outlook",
      },
      {
        type: "list",
        items: [
          "Identity-attack tooling will continue to commoditise — Kerberoasting + AD CS abuse will appear in mid-market cases.",
          "Cloud-native ransomware patterns (S3 + KMS-key-deletion blackmail) will move from niche to common.",
          "Vendor / supply-chain entry will overtake direct phishing in BFSI as MFA enforcement tightens.",
          "Regulators will lean harder on RTO/RPO drill evidence — paying ransom because backups failed will become a reputational liability.",
        ],
      },
      {
        type: "heading",
        text: "5. The six-step preparedness checklist",
      },
      {
        type: "checklist",
        items: [
          {
            item: "MFA on every external surface",
            sub: "Email + VPN + admin portals + SaaS. No exceptions.",
          },
          {
            item: "Decommission internet-exposed RDP",
            sub: "Replace with ZTNA or RDP-over-Gateway with MFA.",
          },
          {
            item: "Patch the edge weekly",
            sub: "Citrix / Fortinet / SonicWall / Pulse — these CVEs are exploited within hours.",
          },
          {
            item: "Tier-0 / tier-1 / tier-2 admin separation",
            sub: "No DA credentials caching on tier-2 hosts. PAW workstations for tier-0 admins.",
          },
          {
            item: "Immutable + offline backups",
            sub: "3-2-1 with one offline copy. Restore drills monthly on tier-0 systems.",
          },
          {
            item: "DFIR retainer with a 30-minute SLA",
            sub: "Pre-signed SOW + secure-channel comms + on-call bridge defined before an incident.",
          },
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Pre-signed retainer beats best-of-breed-no-contract.",
        body: "When you need DFIR you need it in 30 minutes — not after a 5-day procurement cycle. Sign the retainer SOW with a CERT-In empanelled provider while you're calm, not while file extensions are changing on your shares.",
      },
    ],
    seoTitle:
      "India Ransomware Landscape 2026 — Actors, Vectors, Preparedness | Macksofy",
    seoDescription:
      "Active threat actors against Indian organisations, sector hit-rates, top entry vectors and a 6-step preparedness checklist. CERT-In empanelled DFIR + threat intelligence whitepaper from Macksofy.",
    keywords: [
      "India ransomware 2026",
      "ransomware whitepaper India",
      "LockBit India",
      "Akira ransomware India",
      "ransomware preparedness checklist",
      "DFIR retainer India",
    ],
  },

  /* ════════════════════════════════════════════════════════════
     CHECKLISTS & CHEAT SHEETS (6)
     ════════════════════════════════════════════════════════════ */

  {
    slug: "cert-in-incident-reporting-checklist",
    type: "Checklist",
    title: "CERT-In Incident Reporting Checklist",
    subtitle:
      "The 6-hour reporting timeline, what counts as reportable, and the format CERT-In expects — distilled into a single page.",
    summary:
      "What to report to CERT-In, when, and how. Built for IR commanders who need a clear, lawful path through CERT-In's 6-hour reporting window without legal-team back-and-forth.",
    refNo: "MKS-CL-CERTIN-2026",
    pageCount: "1-page checklist",
    sector: ["Cross-sector"],
    region: ["India"],
    topics: ["CERT-In", "Incident Response", "Compliance"],
    publishedYear: "2026",
    icon: FileWarning,
    accent: "amber",
    relatedServiceSlugs: ["digital-forensics-incident-response"],
    intro:
      "CERT-In's directions require reportable incidents to be notified within 6 hours of discovery. This single-page checklist gives IR commanders a clear path through that window — what counts as reportable, what to gather, and the format CERT-In expects.",
    blocks: [
      {
        type: "heading",
        text: "1. Is it reportable?",
      },
      {
        type: "checklist",
        items: [
          { item: "Targeted scanning / probing of critical networks or systems" },
          { item: "Compromise of critical systems / information" },
          { item: "Unauthorised access to IT systems / data" },
          { item: "Defacement of website / intrusion into a website + suspicious or hidden inserts" },
          { item: "Malicious code attacks (virus, worm, trojan, bots, spyware, ransomware, cryptominers)" },
          { item: "Attack on servers (database, mail, DNS) and network devices (routers)" },
          { item: "Identity theft, spoofing and phishing attacks" },
          { item: "DoS and DDoS attacks" },
          { item: "Attacks on critical infrastructure, SCADA, industrial control systems" },
          { item: "Data breach + data leak" },
          { item: "Attacks on IoT devices and associated systems / networks / software / servers" },
          { item: "Attacks impacting digital payment systems" },
          { item: "Attacks via malicious mobile apps" },
          { item: "Fake mobile apps" },
          { item: "Unauthorised access to social media accounts" },
          { item: "Attacks / suspicious activities affecting cloud computing systems / servers / software / applications" },
          { item: "Attacks / breach / suspicious activity related to BGP, DNS protocols" },
          { item: "Attacks and incidents impacting cyber-physical / robotics / drones systems" },
          { item: "Attacks on systems / networks of identified critical sectors (BFSI, telecom, transport, power, healthcare, etc.)" },
          { item: "Data breach involving personal / sensitive personal information" },
        ],
      },
      {
        type: "heading",
        text: "2. The 6-hour window — what to gather",
      },
      {
        type: "checklist",
        items: [
          { item: "Time + date of detection · with timezone" },
          { item: "Time + date of suspected first compromise · with timezone" },
          { item: "Description of incident (1-paragraph factual)" },
          { item: "Affected systems / networks / data (categories, no customer-PII)" },
          { item: "Source of attack (IP, indicators) — only if known" },
          { item: "Suspected method / vector" },
          { item: "Indicators of Compromise (IOCs) collected so far" },
          { item: "Containment actions already taken" },
          { item: "Reporter name + designation + organisation + 24×7 contact" },
        ],
      },
      {
        type: "heading",
        text: "3. How to file",
      },
      {
        type: "list",
        items: [
          "Email: incident@cert-in.org.in",
          "Phone (24×7): +91 1800-11-4949",
          "Online: cert-in.org.in (incident report form)",
          "Fax: +91 1800-11-6969 (yes, still listed)",
          "Subject line format: '[Org Name] [Incident Type] · [Detection Time IST]'",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Pre-fill the report skeleton today.",
        body: "Every line above except 'time of detection' can be pre-filled and reviewed by Legal in calm circumstances. Doing this now turns a chaotic 6-hour window into a 30-minute editing exercise during a real incident.",
      },
      {
        type: "heading",
        text: "4. Common pitfalls",
      },
      {
        type: "list",
        items: [
          "Including customer PII in the initial report — CERT-In does not need it; provide via secure channel if requested.",
          "Marking 'detection time' as the time IT was paged — use the time the first signal landed in any monitoring system.",
          "Filing late and trying to backdate — CERT-In's portal timestamps automatically; document the delay openly.",
          "Forgetting to update — file an updated report when material new facts emerge (scope, IOCs, attribution).",
        ],
      },
    ],
    seoTitle:
      "CERT-In Incident Reporting Checklist — 6-hour Window | Macksofy",
    seoDescription:
      "What to report to CERT-In, when, and how — distilled to one page. Reportable categories, the 6-hour information set, filing channels, and common pitfalls. Free checklist from CERT-In empanelled Macksofy.",
    keywords: [
      "CERT-In incident reporting",
      "CERT-In 6 hour rule",
      "CERT-In reportable incidents",
      "incident response checklist India",
      "CERT-In format",
      "incident reporting India",
    ],
  },

  {
    slug: "rbi-csf-gap-check-2026",
    type: "Checklist",
    title: "RBI Cyber Security Framework Gap-Check · 2026",
    subtitle:
      "A self-assessment checklist for banks, NBFCs and co-operative banks against the RBI Cyber Security Framework circular.",
    summary:
      "A self-assessment checklist that maps the RBI Cyber Security Framework circular into 'have we?' questions an internal audit team can run in a single afternoon.",
    refNo: "MKS-CL-RBICSF-2026",
    pageCount: "2-page checklist",
    sector: ["BFSI"],
    region: ["India"],
    topics: ["RBI", "Compliance", "BFSI", "Audit"],
    publishedYear: "2026",
    icon: ListChecks,
    accent: "cyan",
    relatedServiceSlugs: ["vapt", "penetration-testing"],
    intro:
      "RBI's Cyber Security Framework circular sets a baseline that every bank, NBFC and co-operative bank must meet. This checklist converts the circular into ~50 binary questions an internal audit team can run in an afternoon — surfacing the gaps that will fail the next ITGC / RBI inspection.",
    blocks: [
      {
        type: "heading",
        text: "1. Governance",
      },
      {
        type: "checklist",
        items: [
          { item: "Board-approved cybersecurity policy reviewed annually" },
          { item: "CISO designated, reports outside CIO line, attends board cyber agenda" },
          { item: "Cyber Crisis Management Plan (CCMP) signed-off and tabletop-tested annually" },
          { item: "Information Security Committee meets at least quarterly with documented minutes" },
        ],
      },
      {
        type: "heading",
        text: "2. Identify",
      },
      {
        type: "checklist",
        items: [
          { item: "Inventory of all IT and OT assets, refreshed quarterly" },
          { item: "Inventory of digital channels (mobile, internet banking, BBPS, UPI integrations)" },
          { item: "Risk register classifies cyber risks with named owners" },
          { item: "Critical-vendor register with cybersecurity terms in contracts" },
        ],
      },
      {
        type: "heading",
        text: "3. Protect",
      },
      {
        type: "checklist",
        items: [
          { item: "MFA enforced on all administrative + privileged accounts" },
          { item: "Privileged Access Management (PAM) solution in production" },
          { item: "End-user devices encrypted at rest" },
          { item: "Network segmentation between corporate, branch, payments and DC environments" },
          { item: "DLP deployed on email + endpoints + cloud SaaS" },
          { item: "Patch SLAs documented per asset class — and met" },
          { item: "Quarterly access-recertification on critical applications" },
        ],
      },
      {
        type: "heading",
        text: "4. Detect",
      },
      {
        type: "checklist",
        items: [
          { item: "24×7 SOC (in-house or managed) with documented use-case catalogue" },
          { item: "SIEM ingest covers AD, email, EDR, firewall, payments and SWIFT logs" },
          { item: "MITRE ATT&CK-mapped detection coverage measured at least quarterly" },
          { item: "MTTD / MTTR measured and reported to CISO" },
        ],
      },
      {
        type: "heading",
        text: "5. Respond",
      },
      {
        type: "checklist",
        items: [
          { item: "Incident response runbook covers ransomware, BEC, fraud, payments incidents" },
          { item: "DFIR retainer with named provider and 30-minute SLA" },
          { item: "CERT-In incident-reporting template pre-filled and ready" },
          { item: "RBI incident-reporting + customer-communication templates approved by Legal" },
        ],
      },
      {
        type: "heading",
        text: "6. Recover",
      },
      {
        type: "checklist",
        items: [
          { item: "RPO / RTO defined per critical application + tested annually" },
          { item: "Backup architecture follows 3-2-1 with one immutable / offline copy" },
          { item: "DR drill on tier-0 systems performed at least annually" },
          { item: "Lessons-learned + remediation tracking after every incident" },
        ],
      },
      {
        type: "heading",
        text: "7. Pentest, VAPT and Assurance",
      },
      {
        type: "checklist",
        items: [
          { item: "Independent VAPT every 6 months on internet-facing applications" },
          { item: "Manual penetration testing on payment systems annually" },
          { item: "Mobile-app pentest each release" },
          { item: "All findings retested with documented closure evidence" },
          { item: "VAPT provider is CERT-In empanelled" },
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Score it.",
        body: "Award 1 point per checked item. Below 35 / 50 means a focused 90-day remediation programme is needed before the next inspection. 35–42 is recoverable with disciplined sprints. 43+ is audit-ready.",
      },
    ],
    seoTitle:
      "RBI Cyber Security Framework Gap-Check 2026 — Self-Assessment | Macksofy",
    seoDescription:
      "Self-assessment checklist mapping the RBI Cyber Security Framework circular into ~50 binary questions. Run in an afternoon, surface gaps before the next inspection. Free from CERT-In empanelled Macksofy.",
    keywords: [
      "RBI cyber security framework checklist",
      "RBI CSF gap analysis",
      "BFSI compliance checklist India",
      "RBI cybersecurity self-assessment",
      "ITGC checklist banks India",
      "RBI master direction cyber",
    ],
  },

  {
    slug: "bola-prevention-checklist",
    type: "Checklist",
    title: "BOLA Prevention Checklist for API Engineers",
    subtitle:
      "Broken Object-Level Authorization is the #1 API risk on OWASP. This checklist gives engineers concrete patterns and anti-patterns to ship safer APIs.",
    summary:
      "Concrete patterns and anti-patterns for ownership-anchored authorization. Built from real BOLA findings across BFSI, fintech and SaaS pentests.",
    refNo: "MKS-CL-BOLA-2026",
    pageCount: "1-page checklist",
    sector: ["Cross-sector"],
    region: ["Global"],
    topics: ["AppSec", "API Security", "OWASP"],
    publishedYear: "2026",
    icon: Lock,
    accent: "purple",
    relatedServiceSlugs: ["web-api-security", "penetration-testing"],
    intro:
      "BOLA — Broken Object-Level Authorization — sits at the top of the OWASP API Security Top 10 because it keeps shipping. This one-pager gives API engineers concrete patterns and anti-patterns drawn from real findings across BFSI, fintech and SaaS pentests.",
    blocks: [
      {
        type: "heading",
        text: "Anchor every authorization decision to ownership",
      },
      {
        type: "checklist",
        items: [
          {
            item: "Resolve the actor's tenant / customer-id from the session — never from the URL or body.",
          },
          {
            item: "Resolve the resource's owner from the database — never trust a client claim.",
          },
          {
            item: "Compare the two before doing anything else with the resource.",
          },
          {
            item: "Reject with 404 (not 403) to avoid leaking existence of resources.",
          },
        ],
      },
      {
        type: "heading",
        text: "Anti-patterns to fail in code review",
      },
      {
        type: "list",
        items: [
          "Authorization implemented inside templates / view layer — must be in the resolver / controller.",
          "Authorization dependent on a client-supplied 'customerId' or 'tenantId' field.",
          "Authorization checked once at login and assumed for the session.",
          "Bulk endpoints (`/customers/batch`) without per-element ownership checks.",
          "Admin endpoints living on the same router as user endpoints — easy to leak.",
        ],
      },
      {
        type: "heading",
        text: "GraphQL-specific tripwires",
      },
      {
        type: "list",
        items: [
          "Authorization on root query/mutation only — must be on every resolver that fetches a tenant-bound object.",
          "Permissive schema directives (@auth on parent type only) — directives must apply to fields, not types.",
          "Subscription endpoints frequently miss ownership checks entirely.",
        ],
      },
      {
        type: "heading",
        text: "Testing tips for engineers",
      },
      {
        type: "checklist",
        items: [
          { item: "Two-account integration test: account A asks for resource owned by account B → expect 404." },
          { item: "Sequential-ID enumeration test: try id+1, id-1, id*2 — expect 404 on every other tenant's ID." },
          { item: "GraphQL fragment test: bypass per-field auth by aliasing fields under `__typename` queries." },
          { item: "Bulk-endpoint test: include one cross-tenant ID in a batch — expect rejection of the whole batch or per-item filter." },
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "BOLA + alg=none = full breach.",
        body: "Most of our 'critical' BOLA findings are critical because they chain with a JWT validation flaw. Treat your JWT validation layer as part of your BOLA defence, not separate from it.",
      },
    ],
    seoTitle:
      "BOLA Prevention Checklist — API Engineers · OWASP API Top 10 | Macksofy",
    seoDescription:
      "Concrete patterns and anti-patterns for preventing Broken Object-Level Authorization. GraphQL tripwires, testing tips, real-world chaining notes. Free checklist from Macksofy.",
    keywords: [
      "BOLA prevention checklist",
      "OWASP API Top 10",
      "broken object level authorization",
      "API security checklist",
      "GraphQL authorization",
      "object level authorization",
    ],
  },

  {
    slug: "jwt-pitfalls-cheat-sheet",
    type: "Cheat Sheet",
    title: "JWT Pitfalls Cheat Sheet",
    subtitle:
      "alg=none, weak HS256 secrets, kid abuse, and the validation must-haves your auth gateway needs to enforce.",
    summary:
      "The handful of JWT pitfalls we keep finding in pentests, with the validation must-haves your auth gateway should enforce.",
    refNo: "MKS-CL-JWT-2026",
    pageCount: "1-page cheat sheet",
    sector: ["Cross-sector"],
    region: ["Global"],
    topics: ["AppSec", "Authentication", "API Security"],
    publishedYear: "2026",
    icon: KeySquare,
    accent: "green",
    relatedServiceSlugs: ["web-api-security", "penetration-testing"],
    intro:
      "JSON Web Tokens are simple to implement and easy to break. This cheat sheet lists the pitfalls we keep finding across BFSI, fintech and SaaS pentests — with the must-haves your auth gateway should enforce on every request.",
    blocks: [
      {
        type: "heading",
        text: "The big six pitfalls",
      },
      {
        type: "table",
        head: ["Pitfall", "Why it ships", "What to enforce"],
        rows: [
          [
            "alg=none accepted",
            "Default JWT libs accept it",
            "Reject all tokens where alg ∈ {none, None, NONE}",
          ],
          [
            "HS256 with weak secret",
            "Dev seed copy-pasted into prod",
            "≥ 256-bit random secret; rotation policy",
          ],
          [
            "Algorithm confusion (HS256 ↔ RS256)",
            "Validator picks alg from token header",
            "Pin the expected alg server-side; never trust header alg",
          ],
          [
            "kid path traversal / SQLi",
            "kid value used as filename / SQL parameter",
            "Whitelist kid → key; never use kid in I/O",
          ],
          [
            "Forever-valid tokens",
            "exp claim missing or far-future",
            "Enforce short exp + refresh-token model",
          ],
          [
            "Replay after revoke",
            "Stateless design with no server denylist",
            "Maintain server-side revocation list keyed by jti",
          ],
        ],
      },
      {
        type: "heading",
        text: "Validation must-haves on every request",
      },
      {
        type: "checklist",
        items: [
          { item: "Pinned algorithm (server picks, not the token)" },
          { item: "Cryptographic signature verification" },
          { item: "Issuer (iss) match" },
          { item: "Audience (aud) match" },
          { item: "Expiry (exp) check with no clock-skew tolerance > 60s" },
          { item: "Not-before (nbf) check if used" },
          { item: "Revocation check against server denylist (jti)" },
          { item: "Rate-limit on validation failures" },
        ],
      },
      {
        type: "heading",
        text: "Quick decisions",
      },
      {
        type: "list",
        items: [
          "Sessions are simpler. If a JWT-stateful design forces you to maintain server state anyway, prefer plain sessions.",
          "Short-lived access tokens + opaque refresh tokens is the safe default for OAuth flows.",
          "Don't put PII in the JWT body — assume the token will be logged somewhere it shouldn't be.",
          "Encrypt (JWE), don't just sign (JWS), if the body must contain sensitive claims.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "alg=none is still hitting prod in 2026.",
        body: "Across 2025 pentests we found alg=none accepted in 3 of every 10 BFSI / fintech engagements — almost always on a sidecar service, not the main login. Audit every service that validates JWTs, not just the customer-facing one.",
      },
    ],
    seoTitle:
      "JWT Pitfalls Cheat Sheet — alg=none, kid abuse, validation must-haves | Macksofy",
    seoDescription:
      "Six JWT pitfalls we keep finding in pentests + validation must-haves your auth gateway should enforce. Free one-page cheat sheet from CERT-In empanelled Macksofy.",
    keywords: [
      "JWT cheat sheet",
      "JWT alg none vulnerability",
      "JWT validation checklist",
      "JWT pitfalls API",
      "kid abuse JWT",
      "JWT security best practices",
    ],
  },

  {
    slug: "psexec-detection-cheat-sheet",
    type: "Cheat Sheet",
    title: "PsExec Detection Cheat Sheet",
    subtitle:
      "Telemetry sources, sigma-style detection logic and false-positive patterns for PsExec lateral movement.",
    summary:
      "The telemetry sources, sigma-style detections and false-positive patterns to detect PsExec — the lateral-movement tool that keeps being missed in mid-market environments.",
    refNo: "MKS-CL-PSEXEC-2026",
    pageCount: "1-page cheat sheet",
    sector: ["Cross-sector"],
    region: ["Global"],
    topics: ["SOC", "Detection", "MITRE ATT&CK", "Lateral Movement"],
    publishedYear: "2026",
    icon: Activity,
    accent: "red",
    relatedServiceSlugs: ["soc-setup-siem", "threat-intelligence"],
    intro:
      "PsExec is a Sysinternals tool — and an attacker's lateral-movement workhorse. Most mid-market SOCs miss it because the detections that ship by default fire on something every IT admin uses anyway. This cheat sheet lists the telemetry sources, the sigma-style logic and the false-positive patterns that separate IT-admin PsExec from adversary PsExec.",
    blocks: [
      {
        type: "heading",
        text: "Telemetry sources",
      },
      {
        type: "list",
        items: [
          "Windows Security log: 4624 (logon), 4688 (process), 4697 (service install), 5145 (network share access)",
          "Sysmon: 1 (process), 3 (network connection), 11 (file create), 13 (registry value set)",
          "EDR process telemetry — most critical, ties parent → child reliably",
          "Network telemetry — SMB to ADMIN$ from a non-admin source",
        ],
      },
      {
        type: "heading",
        text: "Sigma-style high-fidelity detections",
      },
      {
        type: "table",
        head: ["Behavior", "Signal", "Confidence"],
        rows: [
          [
            "PSEXESVC service install on remote host",
            "Event 4697 with ServiceName=PSEXESVC OR ServiceFileName ending psexesvc.exe",
            "High",
          ],
          [
            "psexesvc.exe process spawned",
            "Sysmon EID 1, Image ends \\psexesvc.exe, ParentImage=services.exe",
            "High",
          ],
          [
            "ADMIN$ share access from non-admin source",
            "Event 5145, ShareName=\\\\*\\ADMIN$, AccessRequest=WriteData",
            "Medium",
          ],
          [
            "Cmd / PowerShell as child of psexesvc",
            "Sysmon EID 1, ParentImage ends \\psexesvc.exe, Image ends \\cmd.exe OR \\powershell.exe",
            "High — investigate immediately",
          ],
          [
            "Anonymous pipe usage from psexesvc",
            "Sysmon EID 17/18 (pipe events), PipeName matches PSEXESVC pattern",
            "Medium — useful for variant detection",
          ],
        ],
      },
      {
        type: "heading",
        text: "False-positive sources",
      },
      {
        type: "list",
        items: [
          "Legitimate IT-admin remediation runs — burn an exception list keyed by source host + admin user account.",
          "RMM tools (ConnectWise, Kaseya, NinjaOne) using PsExec under the hood — exception by parent process and code-sign.",
          "Patch-management vendors that wrap PsExec — usually pinned source IPs, easy to except.",
        ],
      },
      {
        type: "heading",
        text: "PsExec variants and impostors",
      },
      {
        type: "list",
        items: [
          "Renamed psexesvc.exe — file-hash detection beats name-only detection.",
          "Custom forks (Ms-Wbt-Server, RemCom) use the same SCM + ADMIN$ technique — detect on the technique, not the binary.",
          "PsExec-style behavior implemented inside Cobalt Strike beacons — pivot to EDR command-line + parent telemetry.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Detect the technique, not the binary.",
        body: "Service install via SCM + a 4-letter random name + a binary in C:\\Windows\\ that wasn't there 60 seconds ago is the technique. Whether the file is psexesvc.exe or x9q4.exe, the SCM-install + temp-binary pattern is the high-confidence detection.",
      },
    ],
    seoTitle:
      "PsExec Detection Cheat Sheet — Telemetry, Sigma, FP Patterns | Macksofy",
    seoDescription:
      "PsExec lateral-movement detection: telemetry sources, sigma-style logic, false-positive patterns and variant handling. SOC-ready cheat sheet from CERT-In empanelled Macksofy.",
    keywords: [
      "PsExec detection",
      "PsExec sigma rule",
      "lateral movement detection",
      "SOC PsExec cheat sheet",
      "MITRE ATT&CK lateral movement",
      "Sysmon PsExec",
    ],
  },

  {
    slug: "m365-hardening-checklist-india",
    type: "Checklist",
    title: "M365 Hardening Checklist · Indian BFSI",
    subtitle:
      "Conditional Access, mailbox audit, anti-phishing and tenant-wide controls — the order that produces the biggest risk reduction first.",
    summary:
      "A pragmatic order-of-operations for hardening Microsoft 365 in an Indian BFSI tenant — Conditional Access, audit, anti-phishing and tenant controls, sequenced for biggest risk reduction first.",
    refNo: "MKS-CL-M365-2026",
    pageCount: "2-page checklist",
    sector: ["BFSI", "Cross-sector"],
    region: ["India"],
    topics: ["Cloud Security", "M365", "Identity"],
    publishedYear: "2026",
    icon: Cloud,
    accent: "cyan",
    relatedServiceSlugs: ["cloud-security", "soc-setup-siem"],
    intro:
      "M365 ships permissive — that's its design. Hardening is a deliberate set of moves. This checklist is the pragmatic order-of-operations we run on Indian BFSI tenants, sequenced so the biggest risk reduction lands in the first afternoon.",
    blocks: [
      {
        type: "heading",
        text: "1. Identity foundation (do these first)",
      },
      {
        type: "checklist",
        items: [
          { item: "Block legacy authentication tenant-wide" },
          { item: "Enforce MFA on all users via Conditional Access (not Security Defaults)" },
          { item: "Privileged Identity Management (PIM) for all Global Admin / Exchange Admin / SharePoint Admin roles" },
          { item: "Break-glass account: 2 cloud-only accounts excluded from CA, 24+ char passwords, alerting on use" },
          { item: "Disable self-service password reset for privileged accounts" },
        ],
      },
      {
        type: "heading",
        text: "2. Conditional Access policies",
      },
      {
        type: "checklist",
        items: [
          { item: "Require MFA for all users" },
          { item: "Block sign-in from countries you don't operate in" },
          { item: "Require compliant device for admins" },
          { item: "Block legacy auth (yes, again — this catches misconfig)" },
          { item: "Require approved client app (Outlook / Edge) for mobile" },
          { item: "Session controls: web session 8 hours, persistent browser session disabled for sensitive apps" },
        ],
      },
      {
        type: "heading",
        text: "3. Email + anti-phishing",
      },
      {
        type: "checklist",
        items: [
          { item: "Enable SPF, DKIM, DMARC on every accepted domain — DMARC at p=reject after 30 days at p=quarantine" },
          { item: "Anti-phishing policy with mailbox-intelligence + impersonation protection" },
          { item: "External tagging on all inbound external email" },
          { item: "Safe Links + Safe Attachments enabled with detonation" },
          { item: "Auto-forwarding to external addresses blocked tenant-wide" },
        ],
      },
      {
        type: "heading",
        text: "4. Audit + monitoring",
      },
      {
        type: "checklist",
        items: [
          { item: "Unified audit log enabled tenant-wide" },
          { item: "Mailbox audit enabled with Owner action set" },
          { item: "Sign-in logs forwarded to SIEM" },
          { item: "Defender for Office 365 alerts forwarded to SOC" },
          { item: "Microsoft Defender for Cloud Apps connected for OAuth-app + anomaly detection" },
        ],
      },
      {
        type: "heading",
        text: "5. Sharing + DLP",
      },
      {
        type: "checklist",
        items: [
          { item: "OneDrive + SharePoint external sharing limited to allowed-domain list" },
          { item: "Anonymous links disabled or time-bound (≤14 days)" },
          { item: "DLP policy covering PAN, Aadhaar, account numbers — at least 'audit + tip' mode" },
          { item: "Sensitivity labels published for Confidential / Restricted classifications" },
        ],
      },
      {
        type: "heading",
        text: "6. App + integration governance",
      },
      {
        type: "checklist",
        items: [
          { item: "User OAuth-app consent restricted to verified-publisher apps with low-risk permissions" },
          { item: "Admin consent workflow enabled for higher-risk permissions" },
          { item: "Quarterly review of granted enterprise apps + their permissions" },
          { item: "Power Automate / Power Apps DLP policies prevent business-data ↔ social connector flows" },
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Order matters.",
        body: "If you only have one afternoon, do section 1 — block legacy auth, enforce MFA via CA, and harden privileged accounts. That single afternoon eliminates 80% of the M365 attack surface.",
      },
    ],
    seoTitle:
      "M365 Hardening Checklist — Indian BFSI Tenant | Macksofy",
    seoDescription:
      "Pragmatic order-of-operations for hardening Microsoft 365 in an Indian BFSI tenant: Conditional Access, audit, anti-phishing, sharing/DLP, app governance. Free checklist from Macksofy.",
    keywords: [
      "M365 hardening checklist India",
      "Microsoft 365 BFSI security",
      "Conditional Access policies",
      "M365 audit India",
      "Office 365 security checklist",
      "M365 BFSI compliance",
    ],
  },
];

export const getResourceBySlug = (slug: string) =>
  RESOURCES.find((r) => r.slug === slug);

export const RESOURCE_TYPES: ResourceType[] = [
  "Whitepaper",
  "Checklist",
  "Cheat Sheet",
  "Brochure",
];
