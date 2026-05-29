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
  Bug,
  Mail,
  Skull,
  Server,
  Microscope,
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

  /** Designed PDF edition served from /public — surfaces a download button on the resource page */
  pdfHref?: string;

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
    relatedServiceSlugs: ["penetration-testing", "web-application-security"],
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
    relatedServiceSlugs: ["web-application-security", "penetration-testing"],
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
    relatedServiceSlugs: ["web-application-security", "penetration-testing"],
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
    relatedServiceSlugs: ["managed-soc", "threat-intelligence"],
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
    relatedServiceSlugs: ["cloud-security", "managed-soc"],
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

  // ───── Malware analysis cluster (P2.7) ──────────────────────────────
  {
    slug: "yara-rule-writing-cheat-sheet",
    type: "Cheat Sheet",
    title: "YARA Rule Writing Cheat Sheet",
    subtitle: "Single-page reference for malware analysts — syntax, modifiers, performance and the gotchas that get rules wrong in production.",
    summary: "Quick-reference YARA cheat sheet covering rule anatomy, string types, condition logic, performance tuning and the common mistakes that turn good rules into false-positive cannons.",
    refNo: "MKS-CS-YARA-2026",
    pageCount: "1-page cheat sheet",
    sector: ["Cross-sector"],
    region: ["Global"],
    topics: ["Malware Analysis", "DFIR", "Threat Hunting", "YARA"],
    publishedYear: "2026",
    icon: Bug,
    accent: "purple",
    relatedServiceSlugs: ["malware-analysis", "digital-forensics-incident-response", "threat-intelligence"],
    intro:
      "YARA is the de-facto pattern-matching language for malware analysts. The syntax is small, the conditions are flexible, and the rules run anywhere — endpoint EDR, mail gateway, SIEM, retro-hunting buckets. This cheat sheet covers the syntax that matters in production plus the mistakes that quietly turn good intel into noise.",
    blocks: [
      { type: "heading", text: "1. Rule anatomy" },
      {
        type: "para",
        text: "A YARA rule has three sections: meta (free-form attributes), strings (the patterns you'll match), and condition (the boolean expression that decides hits). Strings are referenced by their $variable name in the condition.",
      },
      { type: "heading", text: "2. String types", level: 3 },
      {
        type: "table",
        head: ["Type", "Syntax", "Notes"],
        rows: [
          ["Text", "$a = \"GET /api/v1\"", "Quoted, case-sensitive by default"],
          ["Text (nocase)", "$a = \"admin\" nocase", "Case-insensitive matching"],
          ["Text (wide)", "$a = \"admin\" wide", "Match UTF-16LE strings (Windows PE common)"],
          ["Hex", "$h = { 4D 5A ?? ?? 50 45 }", "Bytes, with ?? wildcards and [n-m] ranges"],
          ["Regex", "$r = /admin[0-9]{1,3}/", "Use sparingly — perf hit"],
        ],
      },
      { type: "heading", text: "3. Condition shortcuts", level: 3 },
      {
        type: "list",
        items: [
          "any of them — at least one $string hits",
          "all of them — every $string must hit",
          "N of them — at least N hits",
          "$a at 0 — anchored at file offset",
          "filesize < 10MB — file-size gating to skip big files cheaply",
          "uint16(0) == 0x5A4D — PE magic gate; runs only on Windows EXEs",
        ],
      },
      { type: "heading", text: "4. Performance — the only thing that matters at scale" },
      {
        type: "checklist",
        items: [
          { item: "Add a filesize gate first; nothing is cheaper than skipping the file" },
          { item: "Gate by magic bytes (uint16(0) == 0x5A4D for PE, 0x7F454C46 for ELF)" },
          { item: "Avoid regex strings unless you've proved a text/hex alternative won't work" },
          { item: "Use 4+ byte hex anchors; 2-byte hex matches everything" },
          { item: "Test on a benign-file corpus (Govt-clean-set, Windows ISO, Linux distro) before deploy" },
        ],
      },
      { type: "heading", text: "5. The five mistakes that ruin rules in production" },
      {
        type: "list",
        items: [
          "1. Matching strings the malware borrowed from a public library (curl UA, OpenSSL banner) — false-positives on every benign binary that imports the same library.",
          "2. Single 4-byte hex pattern as the only signal — collides with random data in compressed archives.",
          "3. Using $string at offset against a packed sample — the unpacked image moves the offset.",
          "4. Forgetting `wide` for Windows malware that uses UTF-16LE — half the malware family is missed.",
          "5. Author / threat-actor names in meta without verification — survives the binary update; rule becomes wrong after the attacker refactors.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Two-string minimum rule.",
        body: "Every production rule should require ≥ 2 distinct strings to hit. Single-string rules survive one malware update, then they're noise. Two-or-three string rules tied by `and` survive the next variant.",
      },
      { type: "heading", text: "6. Template you can paste" },
      {
        type: "para",
        text: "rule Suspicious_Loader_Macksofy_2026 { meta: author = \"Macksofy DFIR\" date = \"2026-05\" hash1 = \"a1b2c3...\" reference = \"INT-2026-042\" strings: $s1 = \"HelloKitty.dll\" wide nocase $s2 = { 48 8B ?? ?? 48 89 ?? ?? E8 } $s3 = /\\/cmd\\/[a-f0-9]{16}/ condition: filesize < 5MB and uint16(0) == 0x5A4D and 2 of them }",
      },
    ],
    seoTitle: "YARA Rule Writing Cheat Sheet — Single Page Reference | Macksofy",
    seoDescription:
      "Single-page YARA cheat sheet for malware analysts: syntax, string types, performance gates and the five mistakes that turn rules into false-positive cannons.",
    keywords: [
      "YARA cheat sheet",
      "YARA rule writing",
      "malware analysis YARA",
      "YARA performance tips",
      "threat hunting YARA",
      "YARA syntax reference",
      "Macksofy DFIR",
      "malware signatures",
    ],
  },

  {
    slug: "ioc-extraction-methodology",
    type: "Whitepaper",
    title: "IOC Extraction Methodology for Indian SOCs",
    subtitle: "How to turn a malware sample into a layered IOC pack — file, network, behaviour — that your SOC can actually action.",
    summary: "Methodical IOC extraction across atomic, computed and behavioural layers. Pyramid-of-Pain priorities, threat-intel platform feeds (MISP, OpenCTI), and the IOC lifecycle that prevents stale-feed fatigue.",
    refNo: "MKS-WP-IOC-2026",
    pageCount: "10-page whitepaper",
    sector: ["BFSI", "Fintech", "SaaS", "Government", "Cross-sector"],
    region: ["India"],
    topics: ["Malware Analysis", "Threat Intelligence", "SOC Operations", "IOC"],
    publishedYear: "2026",
    icon: Microscope,
    accent: "amber",
    relatedServiceSlugs: ["malware-analysis", "threat-intelligence", "digital-forensics-incident-response"],
    intro:
      "Indian SOCs are drowning in IOC feeds — and missing the actor. A 50,000-IOC feed of expired SHA-256s and parked C2 domains feels productive but catches nothing. This whitepaper documents the IOC extraction methodology Macksofy DFIR runs on every malware engagement, organised by the David Bianco Pyramid of Pain and tuned for the operational realities of an Indian SOC.",
    blocks: [
      { type: "heading", text: "1. The Pyramid of Pain — why it still matters" },
      {
        type: "para",
        text: "Atomic IOCs (hashes, IPs, domains) are cheap for an attacker to change. Computed IOCs (Imphash, ssdeep, behavioural patterns) are harder. TTPs are the most expensive. A SOC that only ingests atomic IOCs is fighting yesterday's campaign; a SOC that hunts TTPs is fighting the actor.",
      },
      {
        type: "stats",
        items: [
          { value: "<24h", label: "median lifespan of a typical malware C2 domain" },
          { value: "~6 weeks", label: "average malware-family Imphash stability" },
          { value: "months", label: "TTP stability for established threat actors" },
        ],
      },
      { type: "heading", text: "2. Atomic IOCs — extract them, but don't stop there" },
      {
        type: "list",
        items: [
          "MD5 / SHA-1 / SHA-256 — capture all three for compatibility with feeds and EDRs",
          "Domain + URL paths — full URL, not just the apex domain",
          "IPv4 / IPv6 — both, with ASN annotation for cluster correlation",
          "Email indicators — sender, X-Originating-IP, SPF/DKIM/DMARC status",
          "Filenames + paths — when distinctive (avoid `update.exe`, capture `c:\\users\\public\\winhost_v2.exe`)",
          "Registry keys + persistence paths",
        ],
      },
      { type: "heading", text: "3. Computed IOCs — the real value layer" },
      {
        type: "table",
        head: ["IOC type", "How to compute", "Why it survives variants"],
        rows: [
          ["Imphash", "pefile.PE(f).get_imphash()", "PE import table changes slowly across variants"],
          ["TLSH", "tlsh.hash(open(f,'rb').read())", "Locality-sensitive hash; catches near-duplicates"],
          ["ssdeep", "ssdeep --compare", "Fuzzy hash for chunk-level similarity"],
          ["YARA cluster ID", "From your YARA rule's family tag", "Pattern-match across the malware family"],
          ["Behavioural pattern", "From sandbox (e.g., Cuckoo, ANY.RUN) signatures", "Same family acts the same way under detonation"],
        ],
      },
      { type: "heading", text: "4. Behavioural IOCs — TTPs you can actually hunt" },
      {
        type: "para",
        text: "TTPs are MITRE ATT&CK techniques the malware exhibits. They survive every cosmetic change to the binary. A SOC that hunts T1566.001 (spearphishing attachment), T1204 (user execution), T1059.001 (PowerShell), T1071.001 (web protocol C2) for malware-family X catches the same family even when the binary changes weekly.",
      },
      {
        type: "list",
        items: [
          "Encode each malware family as a MITRE ATT&CK technique-set",
          "Convert techniques into Sigma rules for SIEM hunting",
          "Convert Sigma into your specific SIEM dialect (Splunk SPL / KQL / ESQL / etc.)",
          "Tune for false-positive rate against a known-good corpus before promotion to production",
        ],
      },
      { type: "heading", text: "5. The IOC lifecycle — preventing stale-feed fatigue" },
      {
        type: "checklist",
        items: [
          { item: "Every IOC has a publication-date and an expiry-date in metadata" },
          { item: "Atomic IOC default expiry: 30 days (parked / sinkholed quickly)" },
          { item: "Computed IOC expiry: 180 days" },
          { item: "Behavioural / Sigma IOC expiry: revisit annually" },
          { item: "Reputation re-check at expiry — promote, demote or delete" },
          { item: "Track false-positive rate per IOC source; demote noisy sources" },
        ],
      },
      { type: "heading", text: "6. Tooling stack (open + commercial)" },
      {
        type: "list",
        items: [
          "MISP — IOC sharing platform; native event model + STIX export",
          "OpenCTI — threat-intel platform with knowledge-graph view",
          "TheHive + Cortex — case management with IOC enrichment connectors",
          "VirusTotal — multi-engine atomic-IOC reputation",
          "URLhaus / abuse.ch — community feeds for malware C2",
          "Macksofy IOC pack — India-context curated feed (BFSI / fintech-targeting families)",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "India-context advantage.",
        body: "Many global IOC feeds under-cover Indian-targeting malware — banking trojans pivoted to UPI fraud, fake-RBI lure infrastructure, GSTN-themed phishing kits. Macksofy's IOC feed is sourced from Indian customer engagements and is calibrated to what hits Indian SOCs first.",
      },
    ],
    seoTitle: "IOC Extraction Methodology for Indian SOCs — Whitepaper | Macksofy",
    seoDescription:
      "How to extract atomic, computed and behavioural IOCs from malware. Pyramid of Pain, MITRE ATT&CK mapping and the IOC lifecycle that prevents stale-feed fatigue.",
    keywords: [
      "IOC extraction methodology",
      "Indicators of Compromise India",
      "malware IOC extraction",
      "MITRE ATT&CK mapping",
      "Pyramid of Pain IOC",
      "Imphash YARA SOC",
      "threat intelligence India",
      "MISP OpenCTI India",
      "Sigma rule writing",
      "SOC IOC lifecycle",
    ],
  },

  {
    slug: "malware-sandbox-detonation-guide-india",
    type: "Whitepaper",
    title: "Malware Sandbox Detonation — A Practitioner's Guide",
    subtitle: "How to detonate a suspicious sample safely, what to capture, and how to convert sandbox output into actionable IOCs without leaking source-of-find.",
    summary: "Hands-on guide to sandbox-based malware analysis for Indian SOCs and DFIR teams. Cuckoo / CAPE / ANY.RUN comparison, anti-analysis evasion, and operational discipline for source-protection.",
    refNo: "MKS-WP-SBX-2026",
    pageCount: "12-page whitepaper",
    sector: ["BFSI", "Fintech", "SaaS", "Government", "Cross-sector"],
    region: ["India"],
    topics: ["Malware Analysis", "DFIR", "Threat Hunting", "Sandbox"],
    publishedYear: "2026",
    icon: Bug,
    accent: "cyan",
    relatedServiceSlugs: ["malware-analysis", "digital-forensics-incident-response", "threat-intelligence"],
    intro:
      "Sandboxing turns an unknown binary into a behavioural fingerprint in 5-15 minutes. Done well, it produces YARA rules, Sigma rules, and a network-IOC pack the SOC can deploy by end-of-day. Done badly, it leaks the sample to a public service, telegraphs your investigation to the attacker, and burns the source-of-find. This whitepaper covers the discipline.",
    blocks: [
      { type: "heading", text: "1. Public vs private sandbox — when to use which" },
      {
        type: "table",
        head: ["Sandbox", "Type", "Use when…"],
        rows: [
          ["VirusTotal Intelligence", "Public", "Initial triage; sample is already widely known"],
          ["ANY.RUN", "Public (interactive)", "Lure-pretext follow-through where user-interaction matters; sample is public"],
          ["Hybrid Analysis (CrowdStrike Falcon Sandbox)", "Public", "Detailed behaviour; sample already in TI feeds"],
          ["Joe Sandbox", "Private cloud / on-prem", "Sample is sensitive; comprehensive report; commercial licence"],
          ["Cuckoo / CAPE", "Self-hosted", "Operational secrecy; you control telemetry"],
          ["Triage (recordedfuture)", "Private cloud", "High volume; good signature engine"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "The 'just paste it in VirusTotal' mistake.",
        body: "If you upload a targeted-attack sample (especially one with low or zero VT detections) to a public sandbox, the actor is watching that VT account-id and will know you've found them within hours. Use self-hosted Cuckoo / CAPE for targeted-attack samples and reserve public services for already-widely-known families.",
      },
      { type: "heading", text: "2. Sandbox preparation — environment that detects you isn't useful" },
      {
        type: "list",
        items: [
          "Resolution: 1920×1080 (not the VM default 800×600)",
          "Recent activity: open Office documents, simulate user history, populated recycle bin",
          "Domain-joined or workgroup: choose what the family expects — many corp-targeted families only fire on domain-joined",
          "Time zone + locale: match the target (IST for India-targeting samples; the malware may check)",
          "MAC OUI prefix: not a virtualisation prefix (VMware, VirtualBox, KVM all have detectable OUIs)",
          "WMI queries: spoof BIOS vendor, model, manufacturer if the sandbox tooling allows",
          "Process list: at minimum no obvious sandbox processes (procmon, wireshark, etc.) running",
        ],
      },
      { type: "heading", text: "3. What to capture" },
      {
        type: "checklist",
        items: [
          { item: "Process tree — every spawn including parent / commandline / image hash" },
          { item: "File system writes — full path + final hash" },
          { item: "Registry writes — key path + value type + value data" },
          { item: "Network — DNS queries, IPs, full URLs, TLS SNI, raw payloads where in scope" },
          { item: "Memory snapshot at peak-activity for later string-extraction" },
          { item: "Mutex / pipe / event names — useful as family-IOC" },
          { item: "Loaded modules — DLLs sideloaded or reflected" },
          { item: "Persistence — autoruns, scheduled tasks, services, WMI subscriptions" },
        ],
      },
      { type: "heading", text: "4. Anti-analysis: what to expect" },
      {
        type: "para",
        text: "Modern malware almost always checks for sandbox indicators before executing the payload. Common checks: sleep / time-stomp loops, mouse-movement detection, hostname blacklist (SANDBOX, MALWARE, CUCKOO), specific process / DLL presence, parent-process verification, and CPU-core-count thresholds. Cuckoo and CAPE patch most of these by default; commercial sandboxes (Joe, Hybrid Analysis) do better; ANY.RUN's interactivity defeats some by letting you click through.",
      },
      { type: "heading", text: "5. Converting sandbox output to deployable detections" },
      {
        type: "table",
        head: ["From sandbox", "To detection layer", "Time"],
        rows: [
          ["DNS / IP / URL", "Network IDS + DNS firewall blocklist", "< 1 hour"],
          ["Process tree", "Sigma rule (SIEM)", "< 4 hours"],
          ["File-system / Registry artifacts", "EDR custom IOC rules", "< 4 hours"],
          ["String patterns in dropped payload", "YARA rules (endpoint + retro-hunt)", "< 1 day"],
          ["Imphash / TLSH of dropped payload", "EDR cluster + retro-hunt", "< 1 day"],
          ["MITRE ATT&CK techniques observed", "Hunt query backlog", "ongoing"],
        ],
      },
      { type: "heading", text: "6. Operational secrecy — protect your source-of-find" },
      {
        type: "list",
        items: [
          "Do not upload to VT until you've decided source-of-find is OK to burn",
          "Use a dedicated sandbox identity / VT account separate from your main TI account",
          "Don't include client identifiers in sample filenames or metadata",
          "Track who-told-whom in a closed-room CTI workflow (TheHive / Confluence-restricted)",
          "Coordinate with affected client before public disclosure",
        ],
      },
    ],
    seoTitle: "Malware Sandbox Detonation — Practitioner's Guide | Macksofy",
    seoDescription:
      "Practitioner's guide to malware sandbox analysis: public vs self-hosted, anti-analysis evasion, source-of-find protection, and converting output to deployable detections.",
    keywords: [
      "malware sandbox guide",
      "Cuckoo sandbox India",
      "CAPE sandbox",
      "ANY.RUN guide",
      "Joe Sandbox",
      "malware detonation India",
      "anti-sandbox evasion",
      "sandbox detection",
      "SOC malware analysis",
      "Macksofy DFIR",
    ],
  },

  // ───── DFIR runbook cluster (P2.8) ──────────────────────────────────
  {
    slug: "ransomware-ir-runbook-india",
    type: "Whitepaper",
    title: "Ransomware Incident Response Runbook · India 2026",
    subtitle: "First 72 hours of a ransomware incident in India — containment, evidence preservation, CERT-In reporting and the negotiation question.",
    summary: "Hour-by-hour ransomware IR runbook tuned for Indian operating reality: CERT-In 6-hour reporting, RBI / SEBI parallel obligations, evidence preservation, restoration sequencing and the decision framework for engaging negotiators.",
    refNo: "MKS-WP-RANSOM-IR-2026",
    pageCount: "14-page whitepaper",
    sector: ["BFSI", "Fintech", "Manufacturing", "Healthcare", "SaaS", "Cross-sector"],
    region: ["India"],
    topics: ["DFIR", "Incident Response", "Ransomware", "CERT-In"],
    publishedYear: "2026",
    icon: Skull,
    accent: "red",
    relatedServiceSlugs: ["digital-forensics-incident-response", "malware-analysis", "threat-intelligence"],
    intro:
      "Ransomware is the single most-likely existential cyber event for Indian mid-and-large enterprises in 2026. This runbook documents the first 72 hours — what to do, what to preserve, what to report, and the decisions that have to be made by the right people in the right order. Calibrated to Indian regulators (CERT-In, RBI, SEBI, IRDAI) and operational realities. Macksofy DFIR has run this playbook on live engagements across BFSI, manufacturing and healthcare.",
    blocks: [
      { type: "heading", text: "Hour 0–1 — Detection + initial triage" },
      {
        type: "checklist",
        items: [
          { item: "Confirm scope: how many endpoints / servers / domains showing encryption activity?" },
          { item: "Identify the ransomware family (note file extension, ransom note filename, leak site banner)" },
          { item: "Activate Incident Command — name CISO / IT-Ops Lead / Legal / Comms / Macksofy DFIR retainer" },
          { item: "Cut external network connectivity to affected segments — preserve forensics, halt exfil" },
          { item: "Do NOT shut down systems — RAM contains keys; preserve as-is for forensics" },
        ],
      },
      { type: "heading", text: "Hour 1–6 — Containment + reporting clock starts", level: 3 },
      {
        type: "list",
        items: [
          "VLAN-level isolation of affected segments (faster than per-host)",
          "Disable AD accounts known-good before encryption to prevent lateral spread",
          "Snapshot all VMs — encrypted state is still valuable as evidence",
          "Begin memory capture from non-encrypted hosts (winpmem / DumpIt / LiME)",
          "Identify and isolate Domain Controllers — DC compromise is the most-likely scenario",
          "Start CERT-In reporting workflow — 6-hour window for cyber incidents per the 2022 directive",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "CERT-In 6-hour reporting window.",
        body: "Per CERT-In's April 2022 Cyber Security Directions, reportable cyber incidents (which ransomware qualifies for) must be reported within 6 hours of noticing the incident. Filing happens through the prescribed form on incident.cert-in.org.in. RBI / SEBI / IRDAI parallel reporting timelines (typically 2-6 hours, sector-specific) apply too.",
      },
      { type: "heading", text: "Hour 6–24 — Forensic preservation + scope expansion" },
      {
        type: "list",
        items: [
          "Memory captures from every still-running endpoint of interest (priority: DCs, file servers, jump hosts)",
          "Disk imaging from selected hosts using FTK Imager / dd / dcfldd with hash verification",
          "Identify patient-zero — first encrypted host, oldest persistence indicator",
          "Map the attack chain backwards: encryption → privilege escalation → lateral movement → initial access",
          "Engage external counsel + cyber insurance carrier (if covered)",
          "Decide on negotiator engagement — see decision framework below",
        ],
      },
      { type: "heading", text: "Hour 24–72 — Eradication + recovery sequencing" },
      {
        type: "table",
        head: ["Asset class", "Recovery action", "Validate before reconnect"],
        rows: [
          ["Domain Controller", "Restore from offline backup OR rebuild from media", "Tier-0 hygiene + golden-ticket check"],
          ["File servers", "Restore from backup with malware-free validation", "YARA scan against active ransomware family"],
          ["Endpoints", "Wipe and re-image", "EDR baseline before joining domain"],
          ["Email gateway", "Reset; identify if it was the initial-access vector", "Anti-phishing + DMARC tightening"],
          ["VPN / RDP gateway", "Reset credentials, MFA enforcement", "Conditional Access + geo-block"],
          ["Backups", "Validate integrity offline before any restore", "Tabletop-test restore on isolated VLAN"],
        ],
      },
      { type: "heading", text: "The negotiation decision — Macksofy is non-prescriptive but documents the framework" },
      {
        type: "list",
        items: [
          "Is data exfiltration confirmed (leak-site posting or staging activity)? — if yes, restoration alone may not be sufficient",
          "Is restore-from-backup viable on the timeline business survival demands? — if no, the calculus changes",
          "Is the threat actor sanctioned (OFAC list or analogous)? — if yes, payment is legally restricted",
          "What does cyber insurance policy mandate / permit? — read the IR clause",
          "What does board / external counsel advise as fiduciary position?",
          "Macksofy does not facilitate ransom payments. We coordinate with negotiator firms (Coveware, Kivu, others) under client direction, and document the IR position for regulators.",
        ],
      },
      { type: "heading", text: "Reporting deliverables (post-incident)" },
      {
        type: "checklist",
        items: [
          { item: "CERT-In incident report (filed within 6 hours; updated as scope evolves)" },
          { item: "Sectoral regulator notification (RBI / SEBI / IRDAI / DPDP Board)" },
          { item: "Cyber insurance carrier claim package" },
          { item: "Board / audit-committee incident-brief deck" },
          { item: "Customer notification (if PII / customer data exposed; DPDP §16 may apply)" },
          { item: "Post-incident review (PIR) with root-cause + control-improvement backlog" },
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Pre-incident retainer beats hour-1 panic.",
        body: "Hour-0 of a ransomware event is too late to choose an IR firm. A pre-signed Macksofy DFIR retainer (24×7 SLA, 4-hour activation) means containment is in motion within the CERT-In reporting window, not after.",
      },
    ],
    seoTitle: "Ransomware IR Runbook · India 2026 — First 72 Hours | Macksofy",
    seoDescription:
      "Hour-by-hour ransomware incident response runbook for Indian enterprises: containment, CERT-In 6-hour reporting, evidence preservation, recovery sequencing, negotiator framework.",
    keywords: [
      "ransomware incident response India",
      "ransomware runbook India",
      "CERT-In 6 hour reporting",
      "ransomware DFIR India",
      "ransomware IR playbook",
      "ransomware containment",
      "RBI ransomware reporting",
      "SEBI cyber incident",
      "ransomware negotiation India",
      "Macksofy ransomware IR",
    ],
  },

  {
    slug: "bec-incident-response-runbook",
    type: "Whitepaper",
    title: "Business Email Compromise IR Runbook · India 2026",
    subtitle: "Containing a BEC incident inside Microsoft 365 / Google Workspace — inbox-rule hunt, token revocation, financial-recall workflow and CERT-In reporting.",
    summary: "Step-by-step BEC IR playbook for M365 + Workspace environments. Inbox rule hunt, sign-in log triage, OAuth-token revocation, financial-recall workflow with Indian banks, and the regulatory reporting decision-tree.",
    refNo: "MKS-WP-BEC-IR-2026",
    pageCount: "11-page whitepaper",
    sector: ["BFSI", "Fintech", "SaaS", "Manufacturing", "Cross-sector"],
    region: ["India"],
    topics: ["DFIR", "Incident Response", "BEC", "M365"],
    publishedYear: "2026",
    icon: Mail,
    accent: "amber",
    relatedServiceSlugs: ["digital-forensics-incident-response", "phishing-simulation", "threat-intelligence"],
    intro:
      "Business Email Compromise is the highest-volume incident type Macksofy DFIR sees across Indian SaaS, BFSI and mid-market manufacturing. The same playbook applies whether the attacker is after an invoice-redirect (CFO-spoof), a payroll-redirect (HR-spoof), or vendor-payment fraud. This runbook covers the technical containment and the financial-recall workflow — both matter, the second is often what saves the money.",
    blocks: [
      { type: "heading", text: "1. Confirm the compromise — not every suspect email is BEC" },
      {
        type: "list",
        items: [
          "Sign-in log review — risky sign-ins, impossible-travel, non-corporate ASN",
          "Look for unusual MFA acceptance patterns (typical BEC uses adversary-in-the-middle phishing kit)",
          "Mailbox audit log for inbox-rule creation by the user themselves (suspicious)",
          "OAuth grant history — legitimate user rarely grants new third-party apps in an hour",
          "Unified Audit Log + Sign-In Log + MailItemsAccessed entry from the user's IP-range",
        ],
      },
      { type: "heading", text: "2. Contain — order matters" },
      {
        type: "checklist",
        items: [
          { item: "Revoke all sessions for the affected mailbox (Revoke-AzureADUserAllRefreshToken / equivalent)" },
          { item: "Disable mailbox sign-in (cloud + on-prem if hybrid)" },
          { item: "Reset password + require MFA re-registration" },
          { item: "Audit inbox rules — delete attacker-created auto-forward / auto-delete rules" },
          { item: "Revoke OAuth tokens for the user's enterprise apps" },
          { item: "Block attacker IPs / ASN at Conditional Access" },
          { item: "Check for delegate / mailbox-permission additions on the user's mailbox" },
        ],
      },
      { type: "heading", text: "3. Inbox-rule hunt — the BEC fingerprint" },
      {
        type: "para",
        text: "Almost every BEC actor creates one or more inbox rules to hide their activity. Standard patterns to hunt across the entire tenant:",
      },
      {
        type: "list",
        items: [
          "Rule: forward to external address (especially recently-registered domain)",
          "Rule: move to RSS Feeds / Archive / Conversation History on keywords like 'invoice' / 'wire' / 'payment'",
          "Rule: delete inbound from specific senders (typically finance counterparties)",
          "Rule: mark as read + move to Deleted (silences victim's view)",
          "Hunt PowerShell: `Get-Mailbox -ResultSize unlimited | Get-InboxRule | Where-Object {$_.ForwardAsAttachmentTo -or $_.RedirectTo -or $_.DeleteMessage}`",
        ],
      },
      { type: "heading", text: "4. Financial-recall workflow — speed matters" },
      {
        type: "table",
        head: ["Time elapsed", "Recall probability", "Action"],
        rows: [
          ["< 4 hours", "High", "Call beneficiary bank fraud desk immediately; file FIR + cybercrime complaint same day"],
          ["4–24 hours", "Moderate", "Bank fraud desk + cybercrime.gov.in complaint + RBI ombudsman if applicable"],
          ["1–7 days", "Low", "Same as above + civil-recovery counsel + cyber insurance carrier notification"],
          ["> 7 days", "Very low", "Recovery unlikely; focus on root-cause + insurance"],
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Indian-context recall channels.",
        body: "For India-domestic wire fraud: cybercrime.gov.in (Indian Cyber Crime Coordination Centre — I4C). Mandate the bank put a hold under the BNS / IT Act provisions. For cross-border: SWIFT recall through your own bank with MT599 message. RBI's 'Pay Net' framework provides additional escalation for inter-bank disputes.",
      },
      { type: "heading", text: "5. Forensics — what to preserve for prosecution + insurance" },
      {
        type: "checklist",
        items: [
          { item: "Full unified audit log export (90+ days retained) covering attacker activity window" },
          { item: "Sign-in log export covering impacted user(s)" },
          { item: "Mailbox audit log entries for the user(s)" },
          { item: "Snapshot copies of attacker-created inbox rules before deletion" },
          { item: "Email message export (.eml) of the wire-instruction email + the conversation thread" },
          { item: "Header analysis showing originating IP / spoofed display name" },
          { item: "Endpoint forensic image of the user's machine if endpoint compromise is suspected" },
        ],
      },
      { type: "heading", text: "6. Regulatory reporting" },
      {
        type: "list",
        items: [
          "CERT-In — file within 6 hours for cyber incident classification (BEC qualifies)",
          "DPDP §16 — if customer / counterparty PII exposed, notification obligations apply",
          "RBI / SEBI sectoral — if BFSI / regulated-entity affected",
          "Cyber insurance carrier — under the policy's notice clause (typically 24-72 hours)",
          "Cybercrime.gov.in (I4C) — for fraud-recall workflow",
          "FIR with local cyber police — required for many insurance claims",
        ],
      },
      { type: "heading", text: "7. Post-incident hardening (a 90-day plan)" },
      {
        type: "checklist",
        items: [
          { item: "Enforce phishing-resistant MFA (FIDO2 / certificate / passkey) for finance + exec roles" },
          { item: "Disable basic / legacy auth across the tenant" },
          { item: "Implement out-of-band callback verification for wire-instruction changes > defined threshold" },
          { item: "DMARC enforcement (p=quarantine → p=reject) to prevent inbound spoof" },
          { item: "Inbox-rule alerting via M365 Defender + auto-quarantine on suspicious patterns" },
          { item: "Quarterly phishing-simulation campaign with BEC-style pretexts (see Macksofy Phishing Sim service)" },
        ],
      },
    ],
    seoTitle: "BEC Incident Response Runbook — M365 + Workspace | Macksofy",
    seoDescription:
      "Business Email Compromise IR playbook for M365 / Workspace: inbox-rule hunt, OAuth revocation, financial-recall workflow with Indian banks, CERT-In + DPDP reporting.",
    keywords: [
      "BEC incident response India",
      "Business Email Compromise India",
      "M365 BEC investigation",
      "BEC playbook India",
      "wire fraud recall India",
      "cybercrime.gov.in BEC",
      "OAuth token revocation",
      "inbox rule hunt",
      "BEC forensics India",
      "Macksofy DFIR BEC",
    ],
  },

  {
    slug: "active-directory-compromise-runbook",
    type: "Whitepaper",
    title: "Active Directory Compromise IR Runbook · 2026",
    subtitle: "Recovering from a Domain-Admin-level compromise — golden-ticket containment, KRBTGT rotation, tier-0 rebuild and proving you're clean.",
    summary: "End-to-end runbook for recovering from an AD compromise where the attacker reached Domain Admin or persisted at tier-0. KRBTGT double-reset, persistence hunt, tier-0 isolation rebuild, and the long-tail of validating you're actually clean.",
    refNo: "MKS-WP-AD-IR-2026",
    pageCount: "13-page whitepaper",
    sector: ["BFSI", "Fintech", "SaaS", "Manufacturing", "Government", "Cross-sector"],
    region: ["India"],
    topics: ["DFIR", "Incident Response", "Active Directory", "Identity"],
    publishedYear: "2026",
    icon: Server,
    accent: "red",
    relatedServiceSlugs: ["digital-forensics-incident-response", "identity-security-zero-trust", "malware-analysis"],
    intro:
      "An attacker with Domain Admin is an attacker who can persist in your environment forever unless you do this right. This runbook covers the technical recovery — golden-ticket containment, KRBTGT double-reset, tier-0 rebuild — plus the often-skipped step of proving you're actually clean. Most AD-recovery efforts that fail fail at the proof step; the attacker comes back six weeks later from a persistence layer nobody checked.",
    blocks: [
      { type: "heading", text: "1. Confirm the compromise level" },
      {
        type: "list",
        items: [
          "Did the attacker reach Domain Admin / Enterprise Admin / Schema Admin?",
          "Was KRBTGT credential extracted (golden ticket possible)?",
          "Was the AD database (ntds.dit) accessed / extracted?",
          "Were Domain Controllers' SYSTEM-level shells observed?",
          "Were Cert Authority credentials / private keys accessed?",
          "Were ADFS / federation services compromised?",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Golden-ticket assumption.",
        body: "If you cannot definitively rule out KRBTGT extraction within the attacker's window, assume golden-ticket capability. This drives the KRBTGT double-reset sequence (below) — without which the attacker can re-issue valid Kerberos tickets even after you've reset every other credential.",
      },
      { type: "heading", text: "2. Tier-0 isolation — first 24 hours" },
      {
        type: "checklist",
        items: [
          { item: "Identify tier-0 assets: DCs, ADFS, AD Connect, CA, PAM vault" },
          { item: "Physically + logically isolate tier-0 from tier-1/2" },
          { item: "Block tier-1/2 endpoints from communicating with DCs except via jump-hosts" },
          { item: "Disable any tier-0 service accounts identified as compromised" },
          { item: "Force re-authentication for every tier-0 admin (cancel active sessions)" },
          { item: "Snapshot all DCs + ADFS for forensics before any changes" },
        ],
      },
      { type: "heading", text: "3. KRBTGT double-reset sequence" },
      {
        type: "para",
        text: "KRBTGT is the Kerberos service account whose hash signs every TGT. If extracted, the attacker can issue valid TGTs at will (golden ticket). A single reset is insufficient — Kerberos retains the previous password for one rotation cycle. You must reset twice, with a wait window in between.",
      },
      {
        type: "list",
        items: [
          "1. Reset KRBTGT password #1 via Reset-ADAccountPassword + replicate to all DCs (Repadmin /syncall)",
          "2. Wait at least 12-24 hours (ticket-validity window) to ensure all valid tickets expire",
          "3. Reset KRBTGT password #2 + replicate again",
          "4. Verify replication health — every DC must have the second reset before validating clean state",
          "5. Expect operational disruption — every Kerberos client re-authenticates; plan a low-traffic window",
        ],
      },
      { type: "heading", text: "4. Credential reset sweep" },
      {
        type: "table",
        head: ["Account class", "Reset action", "Priority"],
        rows: [
          ["Domain Admins (humans)", "Reset + smart-card / FIDO2 re-bind", "1 — first 24 hours"],
          ["Domain service accounts (incl. KRBTGT)", "Rotate + lengthen + complexity", "1 — first 24 hours"],
          ["Privileged service accounts (SQL SA, backup-svc, etc.)", "Reset + rotate connection strings", "2 — first 72 hours"],
          ["Server local-admin accounts", "Reset (LAPS rotation if deployed)", "2 — first 72 hours"],
          ["End-user passwords (if forced password attack suspected)", "Phased reset across population", "3 — first 2 weeks"],
        ],
      },
      { type: "heading", text: "5. Persistence hunt — where attackers hide post-DA" },
      {
        type: "checklist",
        items: [
          { item: "GPO modifications — startup / shutdown scripts pointing to attacker-controlled UNC" },
          { item: "AdminSDHolder ACL tampering (privilege re-grant mechanism)" },
          { item: "DCSync rights on regular user (e.g., for password-hash extraction)" },
          { item: "DPAPI master-key abuse — local + domain backup keys" },
          { item: "Scheduled tasks on DCs running attacker code" },
          { item: "WMI event subscriptions (persistence outside the file system)" },
          { item: "Certificate templates modified for ESC1-8 escalation" },
          { item: "Skeleton-key implants (LSASS-side persistence)" },
          { item: "Hidden ACLs on Domain Controllers' computer objects" },
          { item: "RID-500 (built-in Administrator) being used; should be disabled in modern environments" },
        ],
      },
      { type: "heading", text: "6. Tier-0 rebuild vs in-place clean — decision framework" },
      {
        type: "para",
        text: "An in-place clean is faster but assumes you've found every persistence mechanism. A fresh tier-0 rebuild is slower but provides cryptographic certainty. The choice depends on: how long the attacker dwelled, how broad their privilege, whether ADFS / CA / PAM was touched, and how much business risk you're willing to carry post-IR.",
      },
      {
        type: "table",
        head: ["Indicator", "Lean towards in-place clean", "Lean towards rebuild"],
        rows: [
          ["Dwell time", "< 2 weeks", "> 2 months"],
          ["Tier-0 systems touched", "Domain Controllers only", "DCs + ADFS + CA"],
          ["Persistence layers found", "≤ 3, all in well-instrumented places", "Unknown / multiple categories"],
          ["Audit-log coverage during dwell", "Complete; reviewed in detail", "Gaps; logging was attacker-tampered"],
          ["Attacker sophistication", "Commodity / known TTPs", "Nation-state / APT / unknown TTPs"],
        ],
      },
      { type: "heading", text: "7. Validating you're clean — the long-tail" },
      {
        type: "list",
        items: [
          "30-day post-IR red-team validation — Macksofy or equivalent, scoped to test the same attack chain",
          "BloodHound re-enumeration; compare attack paths before vs after",
          "Sigma rules deployed for the specific TTPs the attacker used; monitor 90+ days",
          "Threat-intel signal — attacker re-engagement attempts from same C2 / similar TTPs",
          "User and Service-account behaviour baseline; alert on deviation from baseline",
          "Quarterly purple-team validation through the first year post-IR",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "The hardest 5% of the work is the validation.",
        body: "Most AD recoveries lose the attacker for a while, then have them come back through a missed persistence layer. Plan time and budget for 90 days of monitoring + 30-day red-team validation — that's where you actually win.",
      },
    ],
    seoTitle: "Active Directory Compromise IR Runbook — 2026 | Macksofy",
    seoDescription:
      "Recover from AD Domain Admin compromise: KRBTGT double-reset, tier-0 rebuild, persistence hunt and the long-tail of proving you're actually clean.",
    keywords: [
      "Active Directory IR runbook",
      "AD compromise recovery India",
      "KRBTGT double reset",
      "golden ticket containment",
      "tier-0 rebuild AD",
      "AD persistence hunt",
      "BloodHound IR",
      "DFIR Active Directory",
      "domain admin compromise IR",
      "Macksofy AD IR",
    ],
  },

  {
    slug: "cert-in-12-hour-patch-mandate",
    type: "Whitepaper",
    title: "CERT-In's 12-Hour Patch Mandate — Research Note",
    subtitle:
      "India's AI-paced patching standard: the tiered remediation schedule, the exploit-window data that justifies it, and what security teams should do now.",
    summary:
      "CERT-In's May 2026 AI Threat Landscape guidance sets an indicative 12-hour window to remediate exploited vulnerabilities on internet-facing systems. This research note breaks down the tiered schedule, the collapsing CVE-to-exploit data, the compensating-control path, India's position vs CISA, and a 30/60/90-day action list.",
    refNo: "MKS-WP-CERTIN12H-2026",
    pageCount: "5-page research note",
    sector: ["Cross-sector"],
    region: ["India"],
    topics: ["CERT-In", "Patch Management", "Compliance"],
    publishedYear: "2026",
    icon: ShieldAlert,
    accent: "red",
    pdfHref: "/cert-in-12-hour-patch-mandate.pdf",
    relatedServiceSlugs: ["vapt", "managed-soc", "threat-intelligence"],
    intro:
      "On 25 May 2026 CERT-In set an indicative 12-hour expectation for containing or remediating known exploited vulnerabilities (KEVs) on internet-facing and high-value crown-jewel systems — a timeline calibrated to the speed at which AI-assisted attacks now weaponise disclosed flaws. This note distils what was published, the data behind it, and the practical response.",
    blocks: [
      { type: "heading", text: "The tiered remediation schedule" },
      {
        type: "table",
        head: ["Window", "Vulnerability & exposure profile", "What qualifies"],
        rows: [
          ["12 hours", "KEV on internet-exposed / high-value system", "Already exploited in the wild; internet-facing or crown-jewel asset"],
          ["24 hours", "Critical, not yet exploited, externally exposed", "Critical severity with external exposure, no confirmed exploitation"],
          ["3 days", "Critical on internal high-value system", "Critical severity, high-value, not directly internet-facing"],
          ["5 days", "High-severity, below critical threshold", "High severity flaws outside the critical band"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Indicative, not statutory — yet",
        body: "CERT-In framed these as indicative expectations rather than legally binding obligations. The signal is unambiguous: the regulator is benchmarking patch cadence against AI-speed exploitation. The 12-hour clock is an obligation to act — patch or contain — not exclusively to apply a software fix.",
      },
      { type: "heading", text: "Why 12 hours — the exploit window has collapsed" },
      {
        type: "stats",
        items: [
          { value: "56d → ~10h", label: "Average CVE-to-exploit window, 2024 vs mid-2026" },
          { value: "28.3%", label: "Of CVEs exploited within 24h of disclosure (Mandiant M-Trends 2026)" },
          { value: "51% @ $2.77", label: "Of 2024–25 CVEs auto-reproduced as working exploits, per-CVE cost (CVE-Genie research)" },
        ],
      },
      { type: "para", text: "AI frameworks that generate working exploits from a CVE description in minutes have changed the economics of weaponisation. Any organisation holding 30-day or even 7-day windows for internet-exposed systems is running a risk posture formulated before the current AI capability environment existed." },
      { type: "heading", text: "When you can't patch in time — compensating controls" },
      { type: "para", text: "CERT-In explicitly accepts interim containment where vendor patches don't exist or deployment can't be compressed. A documented measure executed within 12 hours satisfies the intent of the standard:" },
      { type: "list", items: [
        "Network isolation of the affected system from non-essential reachability.",
        "Access restriction — authenticated users only; tighten firewall and identity policy.",
        "WAF rule deployment to virtually patch the exploited path at the edge.",
        "Segmentation, JIT access and protocol restriction that neutralise the exposure.",
      ] },
      { type: "heading", text: "India vs the current US federal posture" },
      {
        type: "table",
        head: ["", "CERT-In (India) · May 2026", "CISA KEV (US) · 2026"],
        rows: [
          ["Window", "12 hours for KEVs on internet-facing / crown-jewel systems", "~14-day average remediation deadlines"],
          ["Structure", "Tiered by severity × exposure (12h / 24h / 3d / 5d)", "Moving toward a 14-day default window"],
          ["Calibration", "Explicitly calibrated to AI exploitation speed", "Three-day KEV standard reportedly under consideration"],
          ["Flexibility", "Compensating controls accepted as interim compliance", "Same AI threat data informing the debate"],
        ],
      },
      { type: "heading", text: "What to do in the next 30 / 60 / 90 days" },
      {
        type: "checklist",
        items: [
          { item: "Audit internet-facing assets and map them against CERT-In advisories and the CISA KEV catalog" },
          { item: "Integrate a near-real-time KEV threat-intelligence feed with alerting tied to the asset inventory" },
          { item: "Build and test a compensating-control playbook executable inside 12 hours" },
          { item: "Stand up tested emergency patch-deployment automation for the internet-facing tier" },
          { item: "Add vulnerability-triggered containment scenarios to incident-response playbooks" },
          { item: "Run a live-KEV tabletop: CVE lands 09:00 with confirmed exploitation — contained by 21:00?" },
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Download the designed edition",
        body: "A 5-page Macksofy-branded research note PDF — the tiered schedule, exploit-window data, compensating-control path and action list — is available for download at the top of this page. Built from public facts; sources cited; not affiliated with CERT-In or the Cloud Security Alliance.",
      },
      { type: "heading", text: "Sources" },
      { type: "list", items: [
        "CERT-In — AI Threat Landscape guidance, 25 May 2026.",
        "Cloud Security Alliance — research note on CERT-In's 12-hour patch mandate, May 2026.",
        "Mandiant — M-Trends 2026 (time-to-exploit metrics).",
        "CVE-Genie / \"From CVE Entries to Verifiable Exploits\" — arXiv:2509.01835, 2026.",
        "CISA — Known Exploited Vulnerabilities catalog (remediation deadlines, 2026).",
        "Full analysis: /blog/cert-in-12-hour-patch-mandate-ai-exploitation-2026",
      ] },
    ],
    seoTitle: "CERT-In 12-Hour Patch Mandate — Research Note (PDF) | Macksofy",
    seoDescription:
      "Free Macksofy research note on CERT-In's May 2026 12-hour patch mandate: the tiered remediation schedule, the collapsing exploit-window data, compensating controls, India vs CISA, and a 30/60/90-day action list. PDF download.",
    keywords: [
      "CERT-In 12 hour patch mandate",
      "CERT-In AI threat landscape guidance 2026",
      "India 12 hour patching standard",
      "CERT-In KEV remediation timeline",
      "CERT-In tiered patch schedule",
      "AI exploitation patch window India",
      "CERT-In vulnerability management India",
      "Macksofy research note CERT-In",
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
