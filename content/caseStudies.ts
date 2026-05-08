import type { LucideIcon } from "lucide-react";
import {
  Crosshair,
  Smartphone,
  Skull,
  Activity,
  Cloud,
  ShieldAlert,
} from "lucide-react";

export type Sector =
  | "BFSI"
  | "Fintech"
  | "Telecom"
  | "SaaS"
  | "Healthcare"
  | "Manufacturing"
  | "Government"
  | "Retail";

export type Region = "India" | "UAE" | "GCC";

export type EngagementType =
  | "Penetration Testing"
  | "Red Team"
  | "VAPT"
  | "Application Security"
  | "Cloud Security"
  | "DFIR"
  | "Internal Network"
  | "Mobile Security";

export interface CaseStudyHero {
  slug: string;

  /* Identity (always anonymised) */
  clientType: string;
  sector: Sector;
  region: Region;
  size: "Enterprise" | "Mid-market" | "Startup";

  /* Engagement */
  engagement: EngagementType;
  serviceSlug: string;
  duration: string;
  year: string;
  icon: LucideIcon;
  iconName: string;
  accent: "cyan" | "purple" | "amber" | "pink" | "green" | "red";

  /* Display */
  headline: string;
  summary: string;

  /* Long-form */
  challenge: { title: string; body: string }[];
  approach: { phase: string; activities: string[] }[];
  findings: {
    severity: "critical" | "high" | "medium";
    title: string;
    impact: string;
  }[];
  outcome: { title: string; body: string }[];

  /* Quantified */
  metrics: { value: string; label: string; sub?: string }[];

  /* Trust */
  quote: { text: string; author: string };

  /* Tags */
  tags: string[];

  /* SEO */
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

export const CASE_STUDIES: CaseStudyHero[] = [
  /* ─────────────────────────────────────────────────────────────
     1. Listed Fintech (Mumbai) — Web + API + AWS pentest
     ───────────────────────────────────────────────────────────── */
  {
    slug: "listed-fintech-bola-jwt-pentest",
    clientType: "Listed Indian Fintech",
    sector: "Fintech",
    region: "India",
    size: "Enterprise",
    engagement: "Penetration Testing",
    serviceSlug: "penetration-testing",
    duration: "12 working days",
    year: "2025",
    icon: Crosshair,
    iconName: "Crosshair",
    accent: "cyan",
    headline:
      "Chained BOLA + JWT alg=none in a listed fintech — full PII access surfaced and remediated before the next regulator filing",
    summary:
      "A BSE-listed digital lending platform asked Macksofy for a full-scope pentest ahead of a SEBI CSCRF audit. Within four days the team chained an authorization-bypass with a forged JWT to reach every customer's KYC and balance — fixed pre-filing.",
    challenge: [
      {
        title: "A regulator clock and a sprawling estate",
        body: "The client's product-engineering team had shipped four major web releases and two new public APIs in six months. With a SEBI Cyber Security & Cyber Resilience Framework (CSCRF) audit window opening in eight weeks, security needed an independent, manual pentest that mirrored what a real attacker would attempt — not a tool-only scan that would miss authorization logic.",
      },
      {
        title: "Custom auth, custom risk",
        body: "Authentication was a home-grown JWT layer wrapped around a third-party identity provider. Authorization checks lived inside individual GraphQL resolvers and REST controllers — exactly the surface where logic flaws hide and where automated scanners fail.",
      },
    ],
    approach: [
      {
        phase: "01 · Threat-model the money flow",
        activities: [
          "Mapped customer-money paths: onboarding → KYC → loan disbursal → repayment",
          "Identified six tenant-isolation boundaries and three privilege tiers",
          "Aligned scope to SEBI CSCRF + RBI Master Direction expectations",
        ],
      },
      {
        phase: "02 · Manual API + Web exploration",
        activities: [
          "Captured 1,200+ endpoints across REST and GraphQL via authenticated proxying",
          "Audited every authorization decision against the customer-id boundary",
          "Targeted JWT validation, refresh-token replay, and signature-stripping scenarios",
        ],
      },
      {
        phase: "03 · Cloud + IAM review",
        activities: [
          "AWS account walk: IAM, S3 bucket policies, KMS key grants",
          "Lambda + ECS task-role permissions reviewed for blast-radius",
          "VPC + security-group exposure mapped against the public surface",
        ],
      },
      {
        phase: "04 · Chain construction",
        activities: [
          "Validated each finding's exploit path end-to-end against staging",
          "Built a single chained PoC demonstrating worst-case impact",
          "Confirmed the chain would have worked against production with read-only PoC",
        ],
      },
      {
        phase: "05 · Fix-mode handoff",
        activities: [
          "Same-day Slack channel for engineers; live retest of every fix",
          "CERT-In-format final report aligned to SEBI CSCRF control IDs",
          "Free 30-day retest window to confirm closure of all critical findings",
        ],
      },
    ],
    findings: [
      {
        severity: "critical",
        title: "BOLA on /api/v3/customers/{id}",
        impact:
          "Any authenticated customer could substitute another customer's id and read full KYC, PAN, Aadhaar masked digits, account balance and active loan ledger.",
      },
      {
        severity: "critical",
        title: "JWT alg=none accepted by the auth gateway",
        impact:
          "A forged token with header alg=none + arbitrary customer-id passed validation in two of seven services — combined with the BOLA, every customer record was reachable without credentials.",
      },
      {
        severity: "high",
        title: "Refresh-token replay window of 14 days",
        impact:
          "Revoked refresh tokens remained valid for the cache TTL — long-window session hijack feasible after a single credential leak.",
      },
      {
        severity: "high",
        title: "S3 KYC bucket: public-read on three legacy prefixes",
        impact:
          "Around 18,400 KYC documents (driving licence, PAN, address proof) were directly listable from the open internet via the bucket's REST endpoint.",
      },
      {
        severity: "medium",
        title: "Verbose error surface in the lending GraphQL API",
        impact:
          "Stack traces leaked internal service names, JVM versions and DB schema hints — useful reconnaissance for any follow-up attacker.",
      },
    ],
    outcome: [
      {
        title: "All critical findings closed in nine working days",
        body: "Engineering rolled out a hard-fail on alg=none, switched the BOLA-prone resolvers to ownership-anchored authorization, and revoked all legacy S3 prefixes within the same sprint. Macksofy retested every fix live and signed off in writing.",
      },
      {
        title: "Used as evidence in the SEBI CSCRF filing",
        body: "Our CERT-In-format report, mapped to SEBI CSCRF control IDs, was accepted by the client's external CSCRF auditor without rework — saving the client an estimated ₹14L of additional audit-cycle effort and a six-week delay.",
      },
      {
        title: "Annual retainer engaged",
        body: "The client moved to a four-engagement annual retainer covering the lending app, internal API, employee-facing console and quarterly cloud reviews.",
      },
    ],
    metrics: [
      { value: "5", label: "Critical findings", sub: "all closed pre-filing" },
      { value: "9d", label: "Time to remediation" },
      { value: "₹14L", label: "Audit-rework saved" },
      { value: "0", label: "Follow-up audit observations" },
    ],
    quote: {
      text: "Macksofy's pentest landed before our CSCRF auditor even arrived. The chained PoC video they recorded was unambiguous — engineering had no debate, just a fix list. We're on a four-engagement retainer now.",
      author: "Head of Information Security · Listed Indian Fintech",
    },
    tags: ["BFSI", "Fintech", "Mumbai", "BOLA", "JWT", "AWS", "SEBI CSCRF"],
    seoTitle:
      "Case Study: Listed Fintech (Mumbai) — BOLA + JWT alg=none Pentest | Macksofy",
    seoDescription:
      "How Macksofy chained a BOLA with a forged JWT inside a SEBI-regulated listed fintech, surfaced 5 critical findings and helped the client pass CSCRF audit with zero observations.",
    keywords: [
      "fintech pentest case study",
      "BOLA exploit case study India",
      "JWT alg none vulnerability",
      "SEBI CSCRF pentest",
      "CERT-In pentest fintech",
      "Mumbai fintech security audit",
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     2. GCC Telecom Operator — Mobile App Pentest
     ───────────────────────────────────────────────────────────── */
  {
    slug: "gcc-telecom-mobile-app-takeover",
    clientType: "GCC Telecom Operator",
    sector: "Telecom",
    region: "GCC",
    size: "Enterprise",
    engagement: "Mobile Security",
    serviceSlug: "penetration-testing",
    duration: "10 working days",
    year: "2025",
    icon: Smartphone,
    iconName: "Smartphone",
    accent: "purple",
    headline:
      "Account-takeover at scale found in a GCC telecom's pre-launch app — fixed before public release",
    summary:
      "Two weeks before public launch, a Gulf-based mobile carrier asked Macksofy to pentest their refreshed customer app. We surfaced an API-key-in-shared-prefs flaw chained with an insecure deeplink that allowed silent account takeover for any customer who clicked a single SMS link.",
    challenge: [
      {
        title: "Two-week launch window, four million subscribers",
        body: "The operator was migrating four million subscribers from a legacy MyAccount portal to a refreshed iOS + Android app. A delayed launch meant per-day SLA penalties; a launched-then-broken app meant a regulator-grade incident.",
      },
      {
        title: "Mobile + API + telecom-grade auth",
        body: "Authentication blended SIM-based silent OTP with a customer-secret API key embedded in the app. The deeplink layer tied SMS campaigns straight into in-app actions — exactly the surface where a single misstep produces account-takeover.",
      },
    ],
    approach: [
      {
        phase: "01 · Static + binary analysis",
        activities: [
          "Decompiled iOS and Android binaries; mapped sensitive method surface",
          "Audited shared_prefs / NSUserDefaults / Keychain / Keystore usage",
          "Listed every embedded secret, certificate and API token",
        ],
      },
      {
        phase: "02 · Runtime + traffic interception",
        activities: [
          "Instrumented the app under Frida to bypass cert-pinning for testing",
          "Captured the full API surface including silent-OTP and bill-pay flows",
          "Replayed every transactional API across a parallel test subscriber",
        ],
      },
      {
        phase: "03 · Deeplink + intent abuse",
        activities: [
          "Enumerated all registered URL schemes and intent filters",
          "Crafted attacker-origin SMS payloads to test deeplink validation",
          "Tested cross-app intent bridging on Android (implicit intents)",
        ],
      },
      {
        phase: "04 · Backend boundary tests",
        activities: [
          "Confirmed cross-account access on every authenticated endpoint",
          "Tested rate-limiting on bill-pay, recharge and add-on subscription",
          "Reviewed SMS template injection inside the campaign engine",
        ],
      },
      {
        phase: "05 · Live retest before launch",
        activities: [
          "Same-day patches retested under both Android and iOS",
          "Final signoff document delivered 48 hours before the launch ceremony",
        ],
      },
    ],
    findings: [
      {
        severity: "critical",
        title: "API key in Android shared_prefs (cleartext)",
        impact:
          "Any rooted device — or any Android backup — exposed the per-installation API key, which the API treated as proof of customer identity.",
      },
      {
        severity: "critical",
        title: "Insecure deeplink: addPaymentInstrument://?token=…",
        impact:
          "Tapping a crafted SMS link silently bound an attacker-controlled card to the victim's account, then authorised it through the SIM-based silent-OTP path. Account takeover required one tap.",
      },
      {
        severity: "high",
        title: "Cert-pinning trivially bypassed",
        impact:
          "Pinning was implemented only for the login screen — every other API call accepted user-installed CAs, making MITM straightforward on hostile Wi-Fi.",
      },
      {
        severity: "high",
        title: "Bill-pay endpoint missing per-customer rate-limit",
        impact:
          "10,000+ bill-pay attempts per minute were accepted, enabling brute-forcing of short numeric voucher codes.",
      },
      {
        severity: "medium",
        title: "Verbose logging to system log",
        impact:
          "Auth tokens and partial PAN values were written to logcat / unified log on production builds.",
      },
    ],
    outcome: [
      {
        title: "Launched on time with zero critical findings open",
        body: "All five critical and high-severity findings were patched and live-retested before the public-launch ceremony. The operator avoided what would have been a near-certain regulator-reported incident in week one.",
      },
      {
        title: "Hardened deeplink + secret-storage design",
        body: "Macksofy's report shipped with developer-ready remediation patterns — a deeplink-allowlist library and a Keychain/Keystore wrapper — that the platform team adopted across all five sub-brand apps.",
      },
      {
        title: "Rolled into ongoing quarterly retainer",
        body: "After launch, the operator engaged Macksofy for a quarterly mobile + API pentest cycle covering all five consumer apps and the operator's MNO partner integrations.",
      },
    ],
    metrics: [
      { value: "10d", label: "Total engagement" },
      { value: "5", label: "Critical / high findings" },
      { value: "0", label: "Findings open at launch" },
      { value: "4M", label: "Subscribers protected" },
    ],
    quote: {
      text: "We had two weeks to launch and Macksofy showed us, on a recorded video, exactly how an SMS link could take over a customer in one tap. That changed the launch plan — and saved the launch.",
      author: "VP Digital Channels · GCC Telecom Operator",
    },
    tags: [
      "Telecom",
      "GCC",
      "UAE",
      "Mobile Pentest",
      "iOS",
      "Android",
      "Deeplink",
      "API Key",
    ],
    seoTitle:
      "Case Study: GCC Telecom Mobile App Takeover Found Pre-Launch | Macksofy",
    seoDescription:
      "Macksofy's mobile pentest surfaced a chained API-key + deeplink flaw in a Gulf telecom's pre-launch consumer app — fixed before public release with zero critical findings open at go-live.",
    keywords: [
      "mobile app pentest case study",
      "telecom security audit UAE",
      "deeplink account takeover",
      "shared_prefs API key vulnerability",
      "iOS pentest case study",
      "Android pentest case study",
      "GCC telecom cybersecurity",
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     3. Listed Indian Bank — Red Team
     ───────────────────────────────────────────────────────────── */
  {
    slug: "listed-bank-red-team-edr-bypass",
    clientType: "Listed Indian Bank",
    sector: "BFSI",
    region: "India",
    size: "Enterprise",
    engagement: "Red Team",
    serviceSlug: "red-teaming",
    duration: "9 weeks",
    year: "2025",
    icon: Skull,
    iconName: "Skull",
    accent: "red",
    headline:
      "Domain Admin in 4h 12m, undetected — a goal-based red team against a tier-1 listed Indian bank",
    summary:
      "The CISO asked one question: 'Can someone reach Domain Admin without our SOC raising a single ticket?' Nine weeks later we showed how — phishing, EDR bypass, lateral movement and DA in 4 hours and 12 minutes, with the SOC's only ticket auto-closed as a false positive.",
    challenge: [
      {
        title: "Mature SOC, mature controls — and quiet anxiety",
        body: "The bank had moved off Splunk Cloud, deployed SentinelOne across 38,000 endpoints, and rebuilt its SOC playbooks twelve months prior. Tabletop scores were strong. But the CISO suspected — correctly — that table-tops don't surface the failure modes that real adversaries exploit.",
      },
      {
        title: "Goal: prove or disprove DA-without-detection",
        body: "Not a vulnerability list. Not a penetration test. A goal-based red team with a single binary outcome — Domain Admin without a confirmed SOC ticket — across a real banking estate, with realistic operational constraints (no DoS, no client data exfiltration, no fund movement).",
      },
    ],
    approach: [
      {
        phase: "01 · Recon + initial-access tradecraft",
        activities: [
          "Three weeks of OSINT: leaked credentials, GitHub leaks, employee LinkedIn footprint",
          "Crafted spear-phish targeting six engineers in a non-customer-facing team",
          "Built a custom payload tailored to the bank's known EDR (SentinelOne) and EDR exclusions",
        ],
      },
      {
        phase: "02 · Foothold + EDR evasion",
        activities: [
          "Initial access via ISO-side-loading + signed binary proxy execution (LolBAS)",
          "Beacon staged via reflective loader; AMSI + ETW patching in-memory",
          "Validated 'EDR sees nothing' across two of three endpoint product versions in scope",
        ],
      },
      {
        phase: "03 · Internal recon + privilege escalation",
        activities: [
          "BloodHound graph built via opsec-aware collection (no SharpHound default)",
          "Identified Kerberoastable service account with weak password policy carve-out",
          "Cracked offline; pivoted to a host with cached DA credentials",
        ],
      },
      {
        phase: "04 · Lateral movement to Domain Admin",
        activities: [
          "Pass-the-Hash via WMI (no PsExec, no SMB exec)",
          "Confirmed Domain Admin from a stepping-stone host at T+4h 12m",
          "Took screenshots and BloodHound paths as evidence; stopped",
        ],
      },
      {
        phase: "05 · Detection-coverage debrief + purple-team workshop",
        activities: [
          "Side-by-side timeline: every red-team action vs every SOC alert",
          "Mapped gaps to MITRE ATT&CK and to specific SentinelOne ruleset choices",
          "Delivered 23 prioritised detection improvements (14 in SIEM, 9 in EDR)",
        ],
      },
    ],
    findings: [
      {
        severity: "critical",
        title: "Phishing payload undetected by SentinelOne",
        impact:
          "An EDR ruleset that excluded a third-party RPA folder allowed a signed-binary-proxy chain to run unflagged. The bank's only telemetry was a low-signal Defender heuristic that auto-closed.",
      },
      {
        severity: "critical",
        title: "Kerberoastable DA-tier service account",
        impact:
          "A service account in a tier-0 group used a 12-character password with a known dictionary base — cracked in 3 hours of offline GPU time.",
      },
      {
        severity: "high",
        title: "BloodHound collection silent in detection stack",
        impact:
          "Custom LDAP enumeration produced zero alerts despite touching every domain controller — visibility gap mapped to a missing detection-engineering use-case.",
      },
      {
        severity: "high",
        title: "Cached DA credentials on a stepping-stone host",
        impact:
          "Tier-1 admin accounts were re-using sessions on tier-2 hosts, breaking the bank's own privileged-access model.",
      },
    ],
    outcome: [
      {
        title: "23 detection-engineering improvements shipped",
        body: "Within one quarter the SOC engineered, deployed and tested 14 SIEM rules and 9 EDR custom detections. Time-to-detection on the same red-team chain dropped from 'never' to 11 minutes in a follow-up purple-team exercise.",
      },
      {
        title: "Privileged-access model enforced",
        body: "The bank rolled out tiered-admin separation (tier-0/1/2) across the AD estate, with credential-guard mandatory on tier-1 admin workstations. The cached-credential gap closed.",
      },
      {
        title: "Board-level confidence — and a documented playbook",
        body: "The CISO presented the engagement at the audit committee with a clear before/after picture. The bank now runs a full red-team annually plus quarterly purple-team exercises with Macksofy.",
      },
    ],
    metrics: [
      { value: "4h 12m", label: "Time to Domain Admin" },
      { value: "0", label: "SOC tickets at compromise" },
      { value: "23", label: "Detections engineered" },
      { value: "11m", label: "TTD after remediation" },
    ],
    quote: {
      text: "We thought we were ready. Macksofy showed us, in our own logs, exactly where the silence was. Six months later the same playbook gets caught in eleven minutes. That's the value.",
      author: "Chief Information Security Officer · Listed Indian Bank",
    },
    tags: [
      "BFSI",
      "Banking",
      "Red Team",
      "Mumbai",
      "Active Directory",
      "EDR Bypass",
      "MITRE ATT&CK",
    ],
    seoTitle:
      "Case Study: Listed Indian Bank — Red Team to Domain Admin in 4h | Macksofy",
    seoDescription:
      "A goal-based red team against a tier-1 listed Indian bank: Domain Admin in 4h 12m undetected, then 23 detection improvements engineered. EDR bypass, AD compromise, purple-team debrief.",
    keywords: [
      "red team case study India",
      "EDR bypass case study",
      "bank red team engagement",
      "Active Directory compromise case study",
      "MITRE ATT&CK red team",
      "Domain Admin red team",
      "purple team India",
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     4. Maharashtra Manufacturer — LockBit DFIR
     ───────────────────────────────────────────────────────────── */
  {
    slug: "maharashtra-manufacturer-lockbit-dfir",
    clientType: "Mid-size Manufacturer (Maharashtra)",
    sector: "Manufacturing",
    region: "India",
    size: "Mid-market",
    engagement: "DFIR",
    serviceSlug: "digital-forensics-incident-response",
    duration: "Containment 11h · Full IR 21 days",
    year: "2025",
    icon: ShieldAlert,
    iconName: "ShieldAlert",
    accent: "amber",
    headline:
      "LockBit variant contained in 11 hours — manufacturer back to 80% production within 72h of first encrypted file",
    summary:
      "A 1,400-employee manufacturer in Pune called Macksofy at 02:14 IST after a LockBit variant began encrypting file shares. Forensic team on-site by 06:30. Containment achieved at hour 11. Eighty per cent of production systems back online within 72 hours from clean backups.",
    challenge: [
      {
        title: "First encrypted file at 23:47, panic by midnight",
        body: "An IT engineer noticed file extensions changing on a shared drive at 23:47. By 00:30 multiple systems were encrypted. The internal team had a tabletop-grade IR plan but had never run live containment against a credentialed adversary already inside the network.",
      },
      {
        title: "OT exposure was the real fear",
        body: "Beyond the corporate file-share, the plant's MES (Manufacturing Execution System) shared a flat network with corporate IT. If the ransomware crossed into OT, the plant would lose visibility into batches in progress — a regulatory and contractual problem with auto-OEM customers.",
      },
    ],
    approach: [
      {
        phase: "01 · 30-minute bridge call · 02:14 IST",
        activities: [
          "Triage call with CIO + IT manager + plant operations head",
          "Established a unified incident bridge (Slack + voice) with strict comms discipline",
          "Stand-down internal 'fix it ourselves' attempts before they destroyed evidence",
        ],
      },
      {
        phase: "02 · On-site forensic team · 06:30 IST",
        activities: [
          "Two-person forensic team on-site at the Pune plant",
          "Triage agents deployed across DC, OT-edge gateways and the file servers",
          "Volatile-evidence preservation on patient-zero before any reboots",
        ],
      },
      {
        phase: "03 · Containment · hour 11",
        activities: [
          "Identified patient-zero: an internet-exposed RDP host with leaked credentials",
          "Cut the AD-trust between corp and plant networks at hour 7",
          "Isolated 18 actively-encrypting hosts; killed PsExec lateral movement at hour 11",
        ],
      },
      {
        phase: "04 · Eradication + recovery",
        activities: [
          "Validated backup integrity offline before any restoration",
          "Rebuilt domain controllers from gold images; rotated all privileged credentials",
          "Restored 80% of production-critical systems from backups within 72h of first encryption",
        ],
      },
      {
        phase: "05 · Lessons-learned + tabletop exercise",
        activities: [
          "CERT-In incident-reporting filed within statutory window",
          "Root-cause analysis: exposed RDP + leaked credentials + flat network",
          "Tabletop exercise re-run with new playbooks 6 weeks post-incident",
        ],
      },
    ],
    findings: [
      {
        severity: "critical",
        title: "Internet-exposed RDP on a legacy bastion",
        impact:
          "A historical jump-server retained 3389/tcp exposed to the internet. The credentials had appeared on a credential-stuffing dump six months prior — never rotated.",
      },
      {
        severity: "critical",
        title: "Flat L2 between corporate IT and the plant MES network",
        impact:
          "No segmentation between corporate file shares and the plant MES network. If the actor had pivoted 4 hours later, plant visibility would have been lost.",
      },
      {
        severity: "high",
        title: "Weekly backups, no offline copy",
        impact:
          "Backups existed but were online and writeable from a compromised tier-1 admin account. Two recent backup chains were already encrypted; older chains were viable.",
      },
      {
        severity: "high",
        title: "Lateral movement via PsExec unflagged",
        impact:
          "The estate had no detection on PsExec or remote service creation — the actor's primary lateral-movement technique ran unnoticed for two hours.",
      },
    ],
    outcome: [
      {
        title: "Production back online inside 72 hours",
        body: "Eighty per cent of production-critical systems restored from clean backups in under 72 hours from the first encrypted file. Zero confirmed data exfiltration. No ransom paid.",
      },
      {
        title: "OT/IT segmentation hardened",
        body: "Within 30 days the manufacturer rolled out a hardware firewall between corporate and plant networks, with one-way replication for MES telemetry. The flat-network class of risk was eliminated.",
      },
      {
        title: "Backup architecture rebuilt",
        body: "New 3-2-1 backup posture with an air-gapped offline copy, immutable storage on the cloud tier, and quarterly restore drills now run by Macksofy as part of an ongoing IR retainer.",
      },
    ],
    metrics: [
      { value: "11h", label: "Time to containment" },
      { value: "72h", label: "Time to 80% recovery" },
      { value: "0", label: "Ransom paid" },
      { value: "0", label: "Confirmed data exfiltrated" },
    ],
    quote: {
      text: "We called at 2 AM. By breakfast their forensic team was on our shop floor. Eleven hours later the bleeding stopped. We're now on a Macksofy IR retainer — never want a 2 AM scramble like that again.",
      author: "CIO · Mid-size Manufacturer (Maharashtra)",
    },
    tags: [
      "Manufacturing",
      "DFIR",
      "Ransomware",
      "LockBit",
      "Pune",
      "OT Security",
      "Incident Response",
    ],
    seoTitle:
      "Case Study: LockBit Ransomware Contained in 11h at Indian Manufacturer | Macksofy",
    seoDescription:
      "Macksofy DFIR contained a LockBit variant inside 11 hours at a 1,400-employee manufacturer near Pune. 80% production restored from backups in 72h. No ransom paid, no exfiltration confirmed.",
    keywords: [
      "ransomware case study India",
      "LockBit incident response",
      "DFIR case study India",
      "manufacturer ransomware India",
      "CERT-In incident reporting",
      "OT IT segmentation case study",
      "ransomware containment Maharashtra",
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     5. Bangalore B2B SaaS — AWS / Cloud Pentest
     ───────────────────────────────────────────────────────────── */
  {
    slug: "bangalore-saas-aws-iam-cloud-audit",
    clientType: "B2B SaaS Startup (Bangalore)",
    sector: "SaaS",
    region: "India",
    size: "Startup",
    engagement: "Cloud Security",
    serviceSlug: "cloud-security",
    duration: "8 working days",
    year: "2025",
    icon: Cloud,
    iconName: "Cloud",
    accent: "green",
    headline:
      "Wildcard IAM on a single Lambda role gave admin-equivalent reach — closed pre-Series-C diligence",
    summary:
      "A Series-B B2B SaaS team in Bangalore needed an AWS audit before a Series-C technical-diligence call. Within day three Macksofy showed how a Lambda execution role with a wildcard IAM policy could be escalated to admin-equivalent — fixed inside a week with IaC guardrails added.",
    challenge: [
      {
        title: "Pre-diligence pressure, real estate",
        body: "The team had 47 microservices, 19 CI/CD pipelines and 380+ IAM roles across four AWS accounts. The investor's technical diligence partner had a hard checklist — and 'your Lambdas can become admin' was very much on it.",
      },
      {
        title: "Speed-built infrastructure",
        body: "Most IAM policies had been written in the first six months of the company's life and had never been re-scoped. The classic startup pattern: convenient policies that grew teeth over time.",
      },
    ],
    approach: [
      {
        phase: "01 · IAM blast-radius mapping",
        activities: [
          "Pulled every IAM policy across four AWS accounts via read-only role",
          "Used IAM-graph + custom queries to map effective permissions per principal",
          "Flagged every role with iam:PassRole, sts:AssumeRole and wildcard actions",
        ],
      },
      {
        phase: "02 · Lambda + ECS task-role review",
        activities: [
          "Audited every Lambda execution role and ECS task role for blast-radius",
          "Tested escalation paths — could this Lambda assume any admin-tier role?",
          "Identified the wildcard-IAM Lambda role: full admin escalation possible",
        ],
      },
      {
        phase: "03 · S3 + KMS + Secrets Manager",
        activities: [
          "Bucket policies + ACLs reviewed; cross-account access exposed three buckets",
          "KMS key policies audited for cross-account decrypt grants",
          "Secrets Manager rotation status mapped for all 142 secrets",
        ],
      },
      {
        phase: "04 · GuardDuty + CloudTrail posture",
        activities: [
          "Confirmed CloudTrail multi-region trail with log-file validation",
          "Reviewed GuardDuty findings backlog (240+ unaddressed)",
          "Built a ranked remediation list with concrete IaC patches",
        ],
      },
      {
        phase: "05 · IaC guardrails + retest",
        activities: [
          "Shipped Terraform modules with deny-by-default IAM patterns",
          "Added Service Control Policies at the AWS Organisation root",
          "Live-retested all critical / high findings within 30 days",
        ],
      },
    ],
    findings: [
      {
        severity: "critical",
        title: "Lambda execution role with iam:* on Resource:*",
        impact:
          "A bookkeeping-style Lambda had an inherited wildcard IAM policy. Anyone with code-deploy on that Lambda could escalate to admin-equivalent across the account.",
      },
      {
        severity: "high",
        title: "Three S3 buckets cross-account readable",
        impact:
          "Customer-export buckets allowed cross-account reads from a stale third-party vendor account that the client had ended a relationship with 14 months prior.",
      },
      {
        severity: "high",
        title: "KMS key with overly broad cross-account decrypt",
        impact:
          "A multi-tenant KMS key allowed decrypt by 'Principal: *' inside a condition that didn't actually constrain the source — defeating the cross-account control.",
      },
      {
        severity: "medium",
        title: "240+ ignored GuardDuty findings",
        impact:
          "No triage process — findings included three high-severity port-scan and brute-force events older than 90 days.",
      },
    ],
    outcome: [
      {
        title: "Series-C diligence cleared on first pass",
        body: "Macksofy's report and IaC patches landed in time for the diligence call. The diligence partner's checklist came back with zero blocking findings — no extra audit cycle, no delayed close.",
      },
      {
        title: "IaC guardrails now company-wide",
        body: "The deny-by-default Terraform modules we shipped became the company's IAM standard. Every new service launches with scoped policies and SCP-enforced boundaries.",
      },
      {
        title: "GuardDuty backlog cleared in ten days",
        body: "We delivered a triage runbook the platform team adopted; the 240-finding backlog cleared in ten days, and the team now treats new high-severity GuardDuty findings as a paged event.",
      },
    ],
    metrics: [
      { value: "1", label: "Critical IAM finding", sub: "fixed in 4 days" },
      { value: "0", label: "Series-C blocking findings" },
      { value: "240", label: "GuardDuty alerts triaged" },
      { value: "8d", label: "Total engagement" },
    ],
    quote: {
      text: "We were three weeks from diligence and we knew our IAM was a mess. Macksofy didn't just point at things — they shipped Terraform modules our team kept using. Series-C closed on schedule.",
      author: "VP Engineering · B2B SaaS Startup (Bangalore)",
    },
    tags: [
      "SaaS",
      "AWS",
      "Cloud Security",
      "IAM",
      "Bangalore",
      "Series-C",
      "Terraform",
    ],
    seoTitle:
      "Case Study: AWS IAM Wildcard → Admin in B2B SaaS (Bangalore) | Macksofy",
    seoDescription:
      "Macksofy's AWS audit for a Series-B SaaS in Bangalore found a Lambda role with wildcard IAM that escalated to admin. Fixed in a week with IaC guardrails. Series-C diligence cleared first pass.",
    keywords: [
      "AWS pentest case study India",
      "cloud security audit Bangalore",
      "Lambda IAM privilege escalation",
      "Series-C technical diligence",
      "AWS IAM wildcard vulnerability",
      "Terraform IaC security",
      "GuardDuty triage case study",
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     6. BFSI MNC (Mumbai BKC) — Internal AD + Citrix Pentest
     ───────────────────────────────────────────────────────────── */
  {
    slug: "bfsi-mnc-bkc-internal-ad-pentest",
    clientType: "BFSI Multinational (Mumbai BKC)",
    sector: "BFSI",
    region: "India",
    size: "Enterprise",
    engagement: "Internal Network",
    serviceSlug: "vapt",
    duration: "15 working days",
    year: "2025",
    icon: Activity,
    iconName: "Activity",
    accent: "pink",
    headline:
      "NoPac chained with Kerberoasting reached Domain Admin in 4 hours inside a BFSI MNC's internal AD",
    summary:
      "A multinational BFSI's Indian arm asked Macksofy for an assumed-breach internal pentest of its AD + Citrix estate. From a single low-privilege user, the team chained NoPac (CVE-2021-42278) with a Kerberoastable service account to reach Domain Admin in four hours.",
    challenge: [
      {
        title: "Group-wide AD, India-specific risk",
        body: "The Indian arm shared an AD forest with the parent group, but had local-only privilege tiers and Citrix infrastructure for India operations. The CISO wanted independent assurance that an attacker landing on a single India-region endpoint couldn't elevate to forest-wide admin.",
      },
      {
        title: "Citrix as both shield and surface",
        body: "End-user compute ran on Citrix VDI with strict local lockdowns. But VDI lockdowns famously fall to GPO-evasion tradecraft, and Citrix Studio access for engineers was tier-0 by inheritance — exactly the kind of subtle privilege drift we hunt for.",
      },
    ],
    approach: [
      {
        phase: "01 · Assumed-breach starting point",
        activities: [
          "Issued a low-privilege user account on a Citrix VDI session",
          "Mapped the lockdown surface — Group Policy, AppLocker, Windows Defender",
          "Validated the realistic-attacker constraint set with the client",
        ],
      },
      {
        phase: "02 · VDI lockdown evasion",
        activities: [
          "Bypassed AppLocker via signed-binary proxy execution (LolBAS)",
          "Spawned tooling via WSL + COM hijacking inside the VDI session",
          "Confirmed unrestricted egress to internal AD over expected ports",
        ],
      },
      {
        phase: "03 · AD enumeration",
        activities: [
          "Opsec-aware BloodHound collection (no SharpHound default)",
          "Identified Kerberoastable service account in a tier-0 group",
          "Found an unconstrained-delegation host reachable from VDI subnet",
        ],
      },
      {
        phase: "04 · NoPac + Kerberoasting chain to DA",
        activities: [
          "Cracked the Kerberoasted service account offline (3h GPU)",
          "Combined with NoPac (CVE-2021-42278 + CVE-2021-42287) for DC compromise",
          "Confirmed Domain Admin at T+4h; stopped, took evidence, did not persist",
        ],
      },
      {
        phase: "05 · Closure + tier-0 hardening",
        activities: [
          "Live-retested KB5008380 patch deployment across all DCs",
          "Reviewed every tier-0 service-account password policy carve-out",
          "Drafted a Citrix-VDI hardening playbook with the client's EUC team",
        ],
      },
    ],
    findings: [
      {
        severity: "critical",
        title: "NoPac (CVE-2021-42278 + CVE-2021-42287) unpatched on 3 DCs",
        impact:
          "Three domain controllers in the India region had not received the November-2021 hardening rollup — directly exploitable to Domain Admin from any authenticated user.",
      },
      {
        severity: "critical",
        title: "Kerberoastable service account in tier-0 group",
        impact:
          "A backup-software service account with a 12-character password sat inside a Domain-Admin-equivalent group — Kerberoast-and-crack reached DA in 3h offline.",
      },
      {
        severity: "high",
        title: "Citrix AppLocker policy bypassable via WSL",
        impact:
          "Windows Subsystem for Linux was not blocked by AppLocker on any VDI image — providing a clean path to run arbitrary tooling outside the lockdown perimeter.",
      },
      {
        severity: "high",
        title: "Unconstrained delegation on a print server",
        impact:
          "A legacy print server retained unconstrained delegation — combined with a forced-auth primitive, full TGT delegation to attacker-controlled host was feasible.",
      },
    ],
    outcome: [
      {
        title: "All three DCs patched + tier-0 hygiene fixed in 14 days",
        body: "KB5008380 rollups deployed within fourteen days; the tier-0 service account moved to a managed-service-account model with a 240-character random password. Kerberoasting risk on tier-0 closed.",
      },
      {
        title: "Citrix VDI lockdown rebuilt",
        body: "WSL + COM-hijack escape paths blocked at the GPO layer; AppLocker policy moved from Audit to Enforce on three VDI images; baseline retested in a follow-up engagement four weeks later.",
      },
      {
        title: "Quarterly internal pentest cadence adopted",
        body: "The client moved to a quarterly assumed-breach internal pentest cadence — with each engagement starting from a different Citrix VDI persona to surface privilege drift early.",
      },
    ],
    metrics: [
      { value: "4h", label: "Time to Domain Admin" },
      { value: "3", label: "Critical findings", sub: "all closed in 14d" },
      { value: "15d", label: "Engagement length" },
      { value: "Q", label: "Cadence after engagement" },
    ],
    quote: {
      text: "We assumed our parent-group hardening covered us. Macksofy proved otherwise — in four hours, on our own VDI, with our SOC watching. We rebuilt our tier-0 model and our VDI lockdowns the next sprint.",
      author: "Regional CISO · BFSI Multinational (India)",
    },
    tags: [
      "BFSI",
      "Mumbai",
      "BKC",
      "Active Directory",
      "Citrix VDI",
      "NoPac",
      "Kerberoasting",
      "Internal Pentest",
    ],
    seoTitle:
      "Case Study: BFSI MNC — NoPac + Kerberoasting → DA in 4h | Macksofy",
    seoDescription:
      "Macksofy's assumed-breach internal pentest reached Domain Admin in 4 hours inside a BFSI multinational's Mumbai BKC estate via NoPac and a Kerberoastable tier-0 account. Closed in 14 days.",
    keywords: [
      "internal pentest case study India",
      "NoPac CVE-2021-42278 case study",
      "Kerberoasting BFSI",
      "Active Directory pentest Mumbai",
      "Citrix VDI lockdown bypass",
      "BFSI internal network pentest",
      "tier-0 service account audit",
    ],
  },
];

export const getCaseStudyBySlug = (slug: string) =>
  CASE_STUDIES.find((c) => c.slug === slug);

export const SECTORS: Sector[] = [
  "BFSI",
  "Fintech",
  "Telecom",
  "SaaS",
  "Healthcare",
  "Manufacturing",
  "Government",
  "Retail",
];

export const ENGAGEMENT_TYPES: EngagementType[] = [
  "Penetration Testing",
  "Red Team",
  "VAPT",
  "Application Security",
  "Cloud Security",
  "DFIR",
  "Internal Network",
  "Mobile Security",
];
