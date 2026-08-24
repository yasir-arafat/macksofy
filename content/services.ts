import type { LucideIcon } from "lucide-react";
import {
  Crosshair,
  ScanSearch,
  Activity,
  Code2,
  Cloud,
  Skull,
  Microscope,
  Bug,
  Radar,
  Smartphone,
  Webhook,
  Factory,
  FileScan,
  ShieldCheck,
  CalendarClock,
  UserCog,
  Combine,
  Users,
  BrainCircuit,
  Wifi,
  Network,
  Fish,
} from "lucide-react";

export interface CaseStudy {
  industry: string;
  scope: string;
  finding: string;
  impact: string;
  severity: 0 | 1 | 2 | 3;
}

export interface Service {
  /** ISO date of last meaningful content change (drives sitemap lastmod). */
  updated?: string;
  slug: string;
  title: string;
  shortTitle: string;
  icon: LucideIcon;
  iconName: string;
  category:
    | "Offensive"
    | "Defensive"
    | "Compliance Adjacent"
    | "Managed Services";
  popular?: boolean;
  hero: {
    eyebrow: string;
    tagline: string;
    description: string;
  };
  realWorld: string;
  businessImpact: string[];
  methodology: { phase: string; activities: string[] }[];
  toolStack: string[];
  industriesServed: string[];
  deliverables: string[];
  caseStudies: CaseStudy[];
  faqs: { q: string; a: string }[];
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

export const SERVICES: Service[] = [
  // 1 -----------------------------------------------------------------
  {
    slug: "penetration-testing",
    title: "Penetration Testing",
    shortTitle: "Pentest",
    icon: Crosshair,
    iconName: "Crosshair",
    category: "Offensive",
    popular: true,
    hero: {
      eyebrow: "Manual + Tooled · OSCP / OSWE-Certified Operators",
      tagline: "Find what attackers will. Before they do.",
      description:
        "Goal-oriented penetration testing across infrastructure, web, mobile, cloud and Active Directory. We chain low-severity findings into business-impacting compromises — and deliver a report your engineering team can actually fix.",
    },
    realWorld:
      "A typical Macksofy pen-test isn't a Nessus scan with a logo. We follow the PTES methodology — pre-engagement, intel gathering, threat modeling, vulnerability analysis, exploitation, post-exploitation, reporting. Manual exploitation finds the BOLA in your /api/v1/orders endpoint, the kerberoastable accounts in your AD, the S3 bucket your CI pipeline misconfigured. Then we chain them.",
    businessImpact: [
      "Quantify real risk before regulators or attackers do",
      "Satisfy CERT-In, RBI System Audit, SEBI CSCRF and ISO 27001 requirements",
      "De-risk product launches and M&A due diligence",
      "Train your blue team via a free purple-team handoff",
    ],
    methodology: [
      {
        phase: "1 · Pre-engagement",
        activities: [
          "Mutual NDA + scoping",
          "Rules of engagement (RoE), authorization letter",
          "Crown-jewel asset identification",
        ],
      },
      {
        phase: "2 · Intelligence gathering",
        activities: [
          "Active + passive recon (OSINT, ASN, DNS, certificate transparency)",
          "Attack surface mapping",
          "Technology stack fingerprinting",
        ],
      },
      {
        phase: "3 · Threat modeling",
        activities: [
          "STRIDE / PASTA-style threat decomposition",
          "Attacker profiles aligned to your industry threat actors",
          "Prioritized attack paths",
        ],
      },
      {
        phase: "4 · Vulnerability analysis",
        activities: [
          "Authenticated + unauthenticated scanning (Nessus, Nuclei)",
          "Manual code/config review where in-scope",
          "Credential weakness assessment",
        ],
      },
      {
        phase: "5 · Exploitation",
        activities: [
          "Manual exploitation chains (we don't ship Nessus reports)",
          "Custom payloads where commercial tooling fails",
          "Validated impact, not theoretical CVSS",
        ],
      },
      {
        phase: "6 · Post-exploitation",
        activities: [
          "Privilege escalation, lateral movement",
          "AD compromise paths via BloodHound",
          "Sensitive data access demonstration",
        ],
      },
      {
        phase: "7 · Reporting & retest",
        activities: [
          "Executive summary for the board",
          "Technical detail with PoC for each finding",
          "Free retest within 30 days of remediation",
        ],
      },
    ],
    toolStack: [
      "Nmap",
      "Burp Suite Pro",
      "Metasploit",
      "BloodHound",
      "CrackMapExec",
      "Impacket",
      "Hashcat",
      "Cobalt Strike (RoE-permitting)",
      "Custom tooling",
      "Nessus",
      "Nuclei",
      "ScoutSuite",
    ],
    industriesServed: [
      "Banking & Financial Services",
      "Insurance & InsurTech",
      "Healthcare & HealthTech",
      "Fintech & Payments",
      "Government & PSU",
      "SaaS & Product Companies",
      "Manufacturing & Energy",
      "Telecom",
    ],
    deliverables: [
      "Executive summary (board-ready, 2–3 pages)",
      "Technical report with CVSS 3.1 scoring and proof-of-concept",
      "Remediation guidance per finding (developer-friendly)",
      "MITRE ATT&CK mapping of TTPs used",
      "Free retest within 30 days of fix submission",
      "Compliance-ready letter for ISO / SOC 2 / PCI-DSS / CERT-In",
    ],
    caseStudies: [
      {
        industry: "Listed Fintech (Mumbai)",
        scope: "Web + API + AWS environment",
        finding: "Chained BOLA + JWT alg=none → full customer PII exfiltration capability",
        impact: "Critical — all customer balances + KYC accessible by any logged-in user",
        severity: 3,
      },
      {
        industry: "BFSI MNC (Mumbai BKC)",
        scope: "Internal AD + Citrix infrastructure",
        finding: "Kerberoastable service account → DA in 4 hours via NoPac (CVE-2021-42278)",
        impact: "Domain Admin compromise simulated and contained inside red-cell window",
        severity: 3,
      },
      {
        industry: "GCC Telecom Operator",
        scope: "Customer mobile app (iOS + Android)",
        finding: "API key in shared_prefs + insecure deeplink → account takeover at scale",
        impact: "Critical — pre-prod fix shipped before public release",
        severity: 3,
      },
    ],
    faqs: [
      {
        q: "How long is a typical engagement?",
        a: "Most engagements run 5–15 working days depending on scope (apps, network, cloud, mobile). We give a fixed-price proposal within 48 hours of discovery.",
      },
      {
        q: "Do you test in production or staging?",
        a: "Strongly prefer a staging environment that mirrors production. Production testing is possible with rate-limiting and a small white-cell on your side.",
      },
      {
        q: "Are your reports CERT-In / ISO compliant?",
        a: "Yes. Macksofy is a CERT-In empanelled auditor — our reports are accepted by SEBI, RBI, certification bodies and Big-4 audit firms without rework.",
      },
      {
        q: "What's your discount for repeat engagements?",
        a: "Annual retainer programs typically reduce per-engagement cost by 25–35% compared to one-off engagements. Talk to us for a quote.",
      },
    ],
    seoTitle: "Penetration Testing Services India & UAE | CERT-In | Macksofy",
    seoDescription:
      "Manual + tooled penetration testing by OSCP/OSWE-certified consultants. CERT-In empanelled, free retest, MITRE ATT&CK mapping. Mumbai, India and UAE.",
    keywords: [
      "penetration testing services India",
      "penetration testing Mumbai",
      "pentest company India",
      "pentest Dubai",
      "OSCP pentest India",
      "CERT-In pentest",
    ],
  },

  // 2 -----------------------------------------------------------------
  {
    slug: "vapt",
    title: "Vulnerability Assessment & Penetration Testing (VAPT)",
    shortTitle: "VAPT",
    icon: ScanSearch,
    iconName: "ScanSearch",
    category: "Offensive",
    popular: true,
    hero: {
      eyebrow: "Annual + Quarterly · CERT-In Format Reports",
      tagline: "VAPT done properly — not a scan with a cover page.",
      description:
        "VA finds the inventory of weaknesses; PT proves which ones an attacker can actually exploit. Macksofy delivers both as a single engagement, in the format Indian regulators expect.",
    },
    realWorld:
      "Most Indian VAPT engagements are scan reports with executive fluff. Macksofy combines authenticated + unauthenticated scanning (Nessus / Qualys), curated vulnerability triage and manual exploitation of the high-impact findings. The result: a report where every High/Critical issue has been validated, exploited, and impact-quantified.",
    businessImpact: [
      "Satisfy annual VAPT requirements for CERT-In, RBI CSF, SEBI CSCRF",
      "Quantify true risk vs. CVSS theoretical risk",
      "Reduce alert fatigue with curated, deduplicated findings",
      "Provide evidence acceptable to Big-4 auditors and regulators",
    ],
    methodology: [
      {
        phase: "1 · Asset discovery",
        activities: [
          "External attack surface mapping",
          "Internal asset inventory reconciliation",
          "Cloud asset enumeration (AWS / Azure / GCP)",
        ],
      },
      {
        phase: "2 · Vulnerability assessment",
        activities: [
          "Authenticated + unauthenticated scans",
          "Web app + API scans (Burp Pro, Acunetix)",
          "Container, IaC, secrets scanning",
        ],
      },
      {
        phase: "3 · Triage + validation",
        activities: [
          "False-positive elimination",
          "Manual validation of every High/Critical",
          "Risk re-scoring per your business context",
        ],
      },
      {
        phase: "4 · Exploitation (PT)",
        activities: [
          "Proof-of-concept exploitation",
          "Chain analysis (low + low = critical)",
          "Impact demonstration",
        ],
      },
      {
        phase: "5 · Reporting (regulator-format)",
        activities: [
          "CERT-In format, ready for direct submission",
          "Executive + technical sections",
          "Risk register update",
        ],
      },
      {
        phase: "6 · Remediation + retest",
        activities: [
          "Developer-ready fix guidance",
          "Free retest within 30 days",
          "Compliance closure letter",
        ],
      },
    ],
    toolStack: [
      "Nessus Professional",
      "Qualys VMDR",
      "Burp Suite Pro",
      "Acunetix",
      "Nuclei",
      "Nikto",
      "OWASP ZAP",
      "Trivy (containers)",
      "Checkov (IaC)",
      "Custom tooling",
    ],
    industriesServed: [
      "BFSI · NBFC · Brokers · AMCs",
      "Payment Aggregators",
      "Healthcare",
      "SaaS",
      "Government / PSU",
      "Manufacturing",
      "Education / EdTech",
    ],
    deliverables: [
      "VAPT report in CERT-In submission format",
      "Risk register updates with CVSS + business risk score",
      "Findings tracked by severity, asset, owner, ETA",
      "Remediation guidance per CWE",
      "Free retest within 30 days",
      "Annual closure letter + Macksofy attestation",
    ],
    caseStudies: [
      {
        industry: "RBI-regulated NBFC",
        scope: "Quarterly VAPT (40+ assets)",
        finding: "Misconfigured WAF rule allowed SSRF → metadata service compromise",
        impact: "AWS IAM key extraction blocked at remediation",
        severity: 3,
      },
      {
        industry: "Stock Broker (SEBI-regulated)",
        scope: "Trading platform + ops portal",
        finding: "Authenticated session token replay across users",
        impact: "Order injection capability — fixed pre-prod",
        severity: 2,
      },
    ],
    faqs: [
      {
        q: "Do you submit reports directly to CERT-In?",
        a: "Yes — Macksofy is CERT-In empanelled. Our reports are formatted for direct regulatory submission.",
      },
      {
        q: "How often should we do VAPT?",
        a: "Minimum annually for compliance. Mature programs run quarterly + after every major release. Macksofy offers retainer pricing for both.",
      },
    ],
    seoTitle: "VAPT Services India | Vulnerability Assessment + Pentest | Macksofy",
    seoDescription:
      "CERT-In empanelled VAPT services for BFSI, fintech, healthcare. Manual exploitation + scanner triage, regulator-format reports, free retest. Mumbai + UAE.",
    keywords: [
      "VAPT services India",
      "VAPT Mumbai",
      "vulnerability assessment India",
      "VAPT CERT-In",
      "RBI VAPT",
      "SEBI VAPT",
    ],
  },

  // 3 -----------------------------------------------------------------
  {
    slug: "managed-soc",
    title: "SOC Setup & SIEM Engineering (Wazuh + ELK)",
    shortTitle: "SOC + SIEM",
    icon: Activity,
    iconName: "Activity",
    category: "Managed Services",
    hero: {
      eyebrow: "Wazuh · ELK · Splunk · Microsoft Sentinel",
      tagline: "A SOC that detects what matters. Not just what's loud.",
      description:
        "We design, build and operationalize Security Operations Centers — from your first SIEM rollout to a fully tuned 24×7 detection capability. Wazuh + ELK (open-source, India data-residency friendly), Splunk or Microsoft Sentinel — we work in your stack, not ours.",
    },
    realWorld:
      "Most SOC builds fail not because of tools, but because of detection-engineering discipline. Macksofy ships SOCs that have a real coverage map (MITRE ATT&CK), real playbooks (TheHive + Cortex), real KPIs (MTTD, MTTR, escalation hygiene), and real analysts who know what they're looking at.",
    businessImpact: [
      "Cut breach detection time from weeks to hours",
      "Satisfy 24×7 monitoring requirements (RBI, SEBI, NESA UAE)",
      "Replace expensive proprietary SIEM with Wazuh + ELK without losing capability",
      "Build internal SOC capability with Macksofy training-as-handover",
    ],
    methodology: [
      {
        phase: "1 · Discovery & maturity assessment",
        activities: [
          "Current logging, detection, IR maturity scoring",
          "Crown-jewel asset identification",
          "Threat profile per industry / geography",
        ],
      },
      {
        phase: "2 · Architecture design",
        activities: [
          "SIEM platform selection (Wazuh / Splunk / Sentinel / Elastic)",
          "Log source inventory + ingestion plan",
          "Data residency design (India / UAE constraints)",
        ],
      },
      {
        phase: "3 · Deployment",
        activities: [
          "Wazuh + ELK cluster build (multi-node, HA)",
          "Sysmon rollout (industry-standard ruleset)",
          "Cloud log forwarders (AWS, Azure, GCP)",
        ],
      },
      {
        phase: "4 · Detection engineering",
        activities: [
          "MITRE ATT&CK coverage mapping",
          "Sigma rule library + custom Wazuh decoders",
          "False-positive tuning workflow",
        ],
      },
      {
        phase: "5 · IR + automation",
        activities: [
          "TheHive + Cortex case management",
          "SOAR playbooks (phishing, ransomware, cloud incident)",
          "Threat intel feeds (MISP) + IOC enrichment",
        ],
      },
      {
        phase: "6 · Operationalization",
        activities: [
          "Analyst training, shift design, escalation matrix",
          "Monthly threat-hunt exercises",
          "Quarterly purple-team drills",
        ],
      },
    ],
    toolStack: [
      "Wazuh",
      "Elastic Stack",
      "Splunk Enterprise / ES",
      "Microsoft Sentinel",
      "Sysmon",
      "Sigma",
      "TheHive",
      "Cortex",
      "MISP",
      "OpenCTI",
      "Velociraptor",
      "Suricata",
      "Zeek",
    ],
    industriesServed: [
      "BFSI",
      "Fintech",
      "Healthcare",
      "Telecom",
      "Government / PSU",
      "Mid-market enterprises",
    ],
    deliverables: [
      "Architecture design document",
      "Deployed SIEM with HA + DR",
      "MITRE ATT&CK coverage matrix",
      "100+ tuned detection rules at handover",
      "IR playbook library (≥20 playbooks)",
      "Analyst onboarding + training",
      "Optional: 24×7 managed SOC (MDR)",
    ],
    caseStudies: [
      {
        industry: "Mid-size NBFC (RBI-regulated)",
        scope: "Greenfield Wazuh + ELK SOC, 350 endpoints, multi-region cloud",
        finding: "Detected real attacker reconnaissance during week-1 of go-live",
        impact: "Containment in 47 minutes, full RBI-format incident report",
        severity: 3,
      },
    ],
    faqs: [
      {
        q: "Why Wazuh + ELK and not Splunk?",
        a: "We work in either. Wazuh + ELK is open-source, India data-residency friendly, and dramatically cheaper at scale — ideal for mid-market BFSI and fintechs who need 24×7 monitoring without the Splunk price tag. We deploy Splunk and Sentinel where the business case fits.",
      },
      {
        q: "Do you also operate the SOC after build?",
        a: "Yes — Macksofy MDR offers 24×7 managed SOC services from our Mumbai operations center, with India data residency.",
      },
    ],
    seoTitle: "SOC Setup & SIEM Engineering Services India | Wazuh + ELK | Macksofy",
    seoDescription:
      "Build, tune and operationalize a Security Operations Center with Wazuh, ELK, Splunk or Sentinel. CERT-In empanelled, India + UAE engagements.",
    keywords: [
      "SOC setup India",
      "SIEM implementation Mumbai",
      "Wazuh consulting India",
      "ELK SIEM India",
      "managed SOC India",
      "SOC services UAE",
    ],
  },

  // 4 -----------------------------------------------------------------
  {
    slug: "web-application-security",
    title: "Web Application Security Testing",
    shortTitle: "Web App Pentest",
    icon: Code2,
    iconName: "Code2",
    category: "Offensive",
    popular: true,
    hero: {
      eyebrow: "OWASP Web Top 10 · OSWE-Led · Manual Exploitation",
      tagline: "Test web apps the way attackers (and bug bounty hunters) do.",
      description:
        "Browser-side web application pentesting by OSWE-certified consultants. XSS, CSRF, SSRF, file-upload abuse, deserialization, OAuth client flows, session and cookie handling, business-logic flaws — found by hand, exploited end-to-end, reported in language a developer can act on.",
    },
    realWorld:
      "Scanners find ~30% of real-world web vulnerabilities. The remaining 70% — the stored-XSS chain hiding behind a content sanitizer, the OAuth state-parameter omission, the SSO redirect that opens up open-redirect-to-account-takeover, the race condition between two form submits — needs a consultant. Macksofy weights manual testing heavily and ships findings in language a developer can patch tonight.",
    businessImpact: [
      "Catch stored-XSS, CSRF and SSRF chains scanners miss",
      "Validate auth + session + cookie + CORS posture before launch",
      "Reduce post-release security bugs and customer-facing incidents",
      "Satisfy OWASP / ASVS attestation for enterprise sales cycles",
    ],
    methodology: [
      {
        phase: "1 · Scoping",
        activities: [
          "Application inventory + user-role map",
          "Authentication paths, SSO + SAML + OAuth touchpoints",
          "Test data + accounts setup",
        ],
      },
      {
        phase: "2 · Recon + mapping",
        activities: [
          "Spider + manual crawl across every authenticated state",
          "Subdomain + endpoint discovery, JS-route enumeration",
          "Tech stack + framework + CMS fingerprinting",
        ],
      },
      {
        phase: "3 · Authenticated + unauthenticated testing",
        activities: [
          "OWASP Web Top 10 coverage end-to-end",
          "Authn, authz, session + cookie + CORS testing",
          "CSP, SRI, HSTS, frame-options posture review",
        ],
      },
      {
        phase: "4 · Business logic testing",
        activities: [
          "Workflow bypasses (payment, KYC, approval flows)",
          "Race conditions, atomicity bugs",
          "Negative-amount, currency-flip, voucher-stacking abuses",
        ],
      },
      {
        phase: "5 · Manual exploitation + chains",
        activities: [
          "Confirmed exploitation, no theoretical findings",
          "Chained low+low → critical (e.g. open-redirect + OAuth state)",
          "PoC scripts and reproducible cURL / Burp request bundles",
        ],
      },
      {
        phase: "6 · Reporting + retest",
        activities: [
          "Per-finding remediation in dev language",
          "CVSS 3.1 scoring + OWASP / ASVS mapping",
          "Free retest within 30 days",
        ],
      },
    ],
    toolStack: [
      "Burp Suite Pro",
      "Caido",
      "OWASP ZAP",
      "ffuf",
      "sqlmap",
      "DOMPurify probe scripts",
      "Custom Burp extensions",
    ],
    industriesServed: [
      "Fintech & Payments",
      "SaaS / Product",
      "BFSI",
      "Healthcare / HealthTech",
      "E-commerce",
      "InsurTech",
      "EdTech",
    ],
    deliverables: [
      "OWASP Web Top 10 attestation",
      "Per-finding PoC + reproduction steps",
      "Developer-ready remediation",
      "CSP / cookie / header hardening checklist",
      "Free retest within 30 days",
    ],
    caseStudies: [
      {
        industry: "Fintech (India, NBFC)",
        scope: "Customer-facing portal + admin console",
        finding: "Stored XSS in transaction-narrative field → admin takeover via session hijack",
        impact: "Critical — fixed before RBI System Audit window",
        severity: 3,
      },
      {
        industry: "SaaS (Series-B, UAE)",
        scope: "Multi-tenant web app + SSO",
        finding: "OAuth state-param omission + open redirect → 1-click account takeover",
        impact: "Critical — fixed pre enterprise customer onboarding",
        severity: 3,
      },
    ],
    faqs: [
      {
        q: "Do you test SPAs differently from server-rendered apps?",
        a: "Yes. React/Vue/Angular SPAs hide a lot of attack surface in JS bundles — we extract route maps from the bundle, instrument the runtime in DevTools, and test the API as it's called from the SPA so server-side issues don't hide behind client validation.",
      },
      {
        q: "What about SSO / SAML / OAuth?",
        a: "Always in scope. SAML signature stripping, SAML XSW, OAuth state omission, redirect-URI confusion, and JWT misuse on the client side are tested as a dedicated track within the engagement.",
      },
      {
        q: "Will you sign an NDA?",
        a: "Always. Mutual NDA is step 0 of every engagement.",
      },
    ],
    seoTitle: "Web Application Security Testing India | OSWE-Led | Macksofy",
    seoDescription:
      "OSWE-led web application pentesting. OWASP Top 10 + business-logic + auth + SSO. Manual exploitation, dev-ready reports, free retest. India + UAE.",
    keywords: [
      "web application security testing India",
      "web app penetration testing Mumbai",
      "OWASP Top 10 audit India",
      "XSS CSRF SSRF testing",
      "OSWE consultants UAE",
      "SSO SAML OAuth security audit",
    ],
  },

  // 4b ----------------------------------------------------------------
  {
    slug: "api-security",
    title: "API Security Testing",
    shortTitle: "API Pentest",
    icon: Webhook,
    iconName: "Webhook",
    category: "Offensive",
    popular: true,
    hero: {
      eyebrow: "OWASP API Top 10 · REST · GraphQL · gRPC",
      tagline: "Test the API the same way every client will.",
      description:
        "Dedicated API security testing for REST, GraphQL and gRPC surfaces. BOLA, BFLA, mass-assignment, JWT and OAuth server-side flows, rate-limit and resource-consumption abuse, GraphQL introspection and depth attacks — by OSWE-certified consultants who treat the API as the product, not the website's backend.",
    },
    realWorld:
      "Modern breaches don't happen at the website. They happen at the API the mobile app, the SPA and the partner integration all call. BOLA across tenants, mass-assignment that elevates a regular user to admin, JWT alg=none accepted in production, OAuth flows where one parameter swap rewrites the redirect to an attacker domain — these are the findings that move regulators, and they live below the login form, not above it.",
    businessImpact: [
      "Catch BOLA, BFLA, mass-assignment and access-control flaws scanners miss",
      "Validate REST + GraphQL + gRPC posture before public release",
      "Reduce cross-tenant data leaks and account-takeover risk",
      "Satisfy OWASP API Top 10 attestation for enterprise sales cycles",
    ],
    methodology: [
      {
        phase: "1 · API inventory & scoping",
        activities: [
          "REST + GraphQL + gRPC endpoint inventory from spec, traffic and disassembly",
          "Authentication scheme map — Bearer, OAuth, JWT, mTLS, HMAC, session",
          "User-role + tenant-isolation model agreement",
        ],
      },
      {
        phase: "2 · Discovery + shadow-API hunt",
        activities: [
          "OpenAPI / Postman / swagger parse",
          "Endpoint fuzzing (ffuf, kiterunner) for undocumented routes",
          "Old API-version (v1, v2, beta) abandoned-but-live discovery",
        ],
      },
      {
        phase: "3 · Auth at the API layer",
        activities: [
          "BOLA + BFLA across roles and tenants",
          "JWT alg confusion, alg=none, kid injection, signing-key abuse",
          "OAuth flow abuse — state, PKCE, redirect-URI confusion server-side",
        ],
      },
      {
        phase: "4 · Object + property level testing",
        activities: [
          "Mass-assignment via PUT / PATCH bodies",
          "Property-level read/write authorization bypass",
          "GraphQL field-level authz, introspection abuse, batching attacks",
        ],
      },
      {
        phase: "5 · Resource consumption + abuse",
        activities: [
          "Rate-limit and quota bypass",
          "GraphQL depth, complexity and alias attacks",
          "Bulk endpoint + business-flow abuse (signup, password reset, OTP)",
        ],
      },
      {
        phase: "6 · Reporting + retest",
        activities: [
          "OWASP API Top 10 attestation + per-finding PoC",
          "Postman / OpenAPI test collection so dev can re-validate",
          "CVSS 3.1 scoring + free retest within 30 days",
        ],
      },
    ],
    toolStack: [
      "Burp Suite Pro",
      "Caido",
      "Postman + Newman",
      "ffuf",
      "kiterunner (API route fuzzing)",
      "GraphQL Voyager",
      "InQL (GraphQL recon)",
      "JWT_tool",
      "grpcurl + grpcui",
      "Custom Burp extensions",
    ],
    industriesServed: [
      "Fintech & Payments",
      "SaaS / Product (multi-tenant)",
      "BFSI",
      "Healthcare / HealthTech (FHIR APIs)",
      "E-commerce",
      "InsurTech",
      "Open-banking / aggregator platforms",
    ],
    deliverables: [
      "OWASP API Top 10 attestation",
      "Per-finding PoC + reproduction steps",
      "Postman / OpenAPI regression collection",
      "Developer-ready remediation per platform",
      "Free retest within 30 days",
    ],
    caseStudies: [
      {
        industry: "B2B SaaS (Series-B, India)",
        scope: "Multi-tenant SaaS REST + GraphQL API",
        finding: "BOLA across tenants via tenant-id header swap → cross-tenant data exposure",
        impact: "Critical — fixed pre enterprise contract signing",
        severity: 3,
      },
      {
        industry: "Healthcare API (UAE)",
        scope: "Patient portal FHIR API",
        finding: "JWT alg=none accepted; account takeover at scale",
        impact: "Critical — fixed within 24 hours of report delivery",
        severity: 3,
      },
      {
        industry: "Open-banking aggregator (India)",
        scope: "Account aggregator REST API + OAuth flow",
        finding: "Mass-assignment via PATCH /accounts → arbitrary role elevation",
        impact: "Critical — fixed pre RBI System Audit",
        severity: 3,
      },
    ],
    faqs: [
      {
        q: "Do you test GraphQL specifically?",
        a: "Extensively. Introspection abuse, depth and complexity attacks, batching, alias overloading, and field-level authorization issues that REST-trained testers miss are a dedicated track in every GraphQL engagement.",
      },
      {
        q: "What about gRPC and Protobuf APIs?",
        a: "Yes. We use grpcurl, grpcui and custom Burp extensions to test gRPC endpoints, including reflection abuse, server-side streaming flaws, and metadata-based auth bypass.",
      },
      {
        q: "Do you need OpenAPI / Postman collections to test?",
        a: "Helpful but not required. With a spec we're faster; without one we run discovery + fuzzing + traffic capture to build the inventory. Black-box is supported and matches the public attacker view.",
      },
      {
        q: "Can you test internal / partner-only APIs?",
        a: "Yes. We test internal APIs through site-to-site VPN, jump-host or temporary mTLS credentials per the rules of engagement signed at scoping.",
      },
      {
        q: "Will you sign an NDA?",
        a: "Always. Mutual NDA is step 0 of every engagement.",
      },
    ],
    seoTitle: "API Security Testing India | REST + GraphQL + gRPC | Macksofy",
    seoDescription:
      "Manual API security testing across REST, GraphQL and gRPC, aligned to the OWASP API Top 10 — dev-ready reports, a Postman regression suite and a free retest.",
    keywords: [
      "API security testing India",
      "API penetration testing Mumbai",
      "OWASP API Top 10 audit India",
      "GraphQL security audit India",
      "gRPC penetration testing",
      "REST API pentest UAE",
      "BOLA testing India",
      "JWT OAuth API security",
    ],
  },

  // 5 -----------------------------------------------------------------
  {
    slug: "mobile-application-security",
    title: "Mobile Application Security Testing",
    shortTitle: "Mobile Pentest",
    icon: Smartphone,
    iconName: "Smartphone",
    category: "Offensive",
    popular: true,
    hero: {
      eyebrow: "Android · iOS · OWASP MASVS / MSTG",
      tagline: "Test the app the way an attacker holds the phone.",
      description:
        "Manual + tooled penetration testing for Android (APK / AAB) and iOS (IPA) apps. We decompile, instrument with Frida, intercept TLS, abuse the backend the app talks to, and prove which findings actually move money or PII — not just which ones the scanner flagged.",
    },
    realWorld:
      "Mobile pentests fail when teams stop at MobSF output. We run the full OWASP MASVS / MSTG playbook: static decompilation (jadx, apktool, Hopper), runtime instrumentation with Frida + Objection, traffic interception under cert-pinning bypass, secure-storage abuse on rooted/jailbroken handsets, and end-to-end backend testing of the same APIs the app calls. Then we prove the real-world impact — taking over a banking session, exfiltrating PII from local SQLite, or replaying a wallet transaction.",
    businessImpact: [
      "RBI Mobile Banking Security guidelines + UIDAI/Aadhaar SDK compliance",
      "PCI DSS scope reduction for payment apps (cardholder data on device)",
      "App Store / Play Store policy attestation pre-submission",
      "Pre-launch sign-off your CISO and product head can both defend",
    ],
    methodology: [
      {
        phase: "1 · Scope & threat-model",
        activities: [
          "Acquire the build under test — APK, AAB or IPA, version-pinned",
          "Map the backend endpoints the app actually calls in production",
          "Set the threat-actor profile — opportunistic, targeted, or insider",
          "Agree the crown jewels — what would actually hurt if exfiltrated",
          "Sign rules of engagement and the authorisation letter",
        ],
      },
      {
        phase: "2 · Decompile & read (SAST)",
        activities: [
          "Decompile APKs with jadx + apktool; IPAs with class-dump + Hopper",
          "Walk smali, resources.arsc, Info.plist and Mach-O strings by hand",
          "Catalogue hard-coded secrets, debug endpoints, shipped feature flags",
          "Audit Manifest permissions, exported components, ATS exceptions",
          "Triage every third-party SDK + native lib against the live CVE feed",
        ],
      },
      {
        phase: "3 · Instrument & intercept (DAST)",
        activities: [
          "Run the build on rooted Pixel / Samsung / OnePlus + jailbroken iPhone",
          "Hook with Frida + Objection to introspect, patch, replay in flight",
          "Bypass SSL pinning and intercept TLS through Burp on a hostile CA",
          "Inspect KeyChain, SharedPreferences, SQLite, Realm and WebView cache",
          "Catch background-snapshot, logcat and clipboard PII leakage",
        ],
      },
      {
        phase: "4 · Bypass & chain (MAST)",
        activities: [
          "Bypass root + SafetyNet + Play Integrity + jailbreak detection",
          "Defeat anti-Frida, anti-debug and integrity-check protections",
          "Stress-test obfuscation depth — ProGuard, R8, Bitcode, Swift Shield",
          "Tamper, repackage, re-sign — and see what the app still accepts",
          "Chain low-severity findings into business-impacting takeover paths",
        ],
      },
      {
        phase: "5 · Attack the backend",
        activities: [
          "Run BOLA, IDOR, mass-assignment and JWT-replay against every mobile-facing endpoint",
          "Abuse session, OAuth and biometric-token flows for account takeover",
          "Hijack deep links + push notifications to surface phishing + redirect bugs",
          "Probe server-side input handling the way the OSWE-led web team does",
          "Validate rate-limit, anti-automation and abuse-pattern controls",
        ],
      },
      {
        phase: "6 · Attest & retest",
        activities: [
          "Attest against OWASP MASVS — explicit L1, L2 or R verification level",
          "Ship per-finding PoC video, recorded live on a rooted device",
          "Hand developers fix-ready guidance per platform, mapped to MSTG controls",
          "Map every High and Critical to RBI / UIDAI / DESC / PCI as applicable",
          "Free retest within 30 days of dev sign-off — closed, not pending",
        ],
      },
    ],
    toolStack: [
      "Frida",
      "Objection",
      "Burp Suite Pro",
      "MobSF",
      "jadx",
      "apktool",
      "Hopper / Ghidra",
      "Drozer",
      "class-dump / otool",
      "Magisk + LSPosed",
      "Corellium (iOS)",
      "Custom Frida scripts",
    ],
    industriesServed: [
      "Mobile Banking & UPI",
      "Fintech wallets & payments",
      "Healthcare / patient portals (HL7 / NDHM)",
      "Insurance",
      "E-commerce & quick-commerce",
      "Travel & ride-hailing",
      "GovTech (Aadhaar / DigiLocker / mAadhaar)",
    ],
    deliverables: [
      "OWASP MASVS / MSTG attestation report (L1 + L2 verification)",
      "Per-finding PoC with screen recording from a rooted/jailbroken device",
      "Decompiled-code annotations with vulnerable line references",
      "Frida script bundle covering each bypass demonstrated",
      "Backend API findings linked to mobile attack chain",
      "Free retest within 30 days of dev sign-off",
    ],
    caseStudies: [
      {
        industry: "Mobile banking app (India, BFSI Tier-1)",
        scope: "Android + iOS retail-banking app + REST APIs",
        finding: "Root-detection bypass via Frida + transaction-replay through expired-but-accepted JWT",
        impact: "Critical — pre-RBI audit fix prevented six-figure exposure window",
        severity: 3,
      },
      {
        industry: "Healthcare patient app (UAE)",
        scope: "iOS + backend FHIR APIs",
        finding: "Biometric-bypass via Touch ID hook + cross-tenant prescription read via API IDOR",
        impact: "Critical — PHI exposure closed before DESC notification window expired",
        severity: 3,
      },
      {
        industry: "Quick-commerce app (India)",
        scope: "Android app + payment SDK",
        finding: "Hard-coded payment gateway secret in resources.arsc + deep-link order-status takeover",
        impact: "High — chained to free-order PoC, fixed pre-funding round close",
        severity: 2,
      },
    ],
    faqs: [
      {
        q: "Do you test on rooted / jailbroken devices?",
        a: "Yes — that's our default. The threat model includes a determined attacker with a compromised device. We also verify your root/jailbreak detection holds up against current Magisk + Frida bypasses, so app-store reviewers and bug-bounty hunters don't beat your team to the finding.",
      },
      {
        q: "Will you bypass SSL pinning?",
        a: "Yes. SSL pinning is a defence layer, not an audit blocker — we bypass it with Frida hooks (Android) or SSL Kill Switch (iOS) to inspect the request/response stream, then assess whether your pinning implementation itself is robust.",
      },
      {
        q: "Do I need to give you source code?",
        a: "No. Black-box (binary-only) is supported and matches the real attacker view. Grey-box (binary + obfuscation map / ProGuard rules / TestFlight build) is faster and gets deeper coverage. White-box (source-code review on top of the binary tests) is the most thorough and required for OWASP MASVS-R verification.",
      },
      {
        q: "Which platforms do you cover?",
        a: "Android (APK + AAB) and iOS (IPA). Hybrid frameworks — React Native, Flutter, Cordova, Ionic, Xamarin — are first-class; we decompile the JS bundle / dart_snapshot / DLL accordingly. Cross-platform Capacitor / Tauri shells are handled the same way.",
      },
      {
        q: "How long does a mobile pentest take?",
        a: "Typical retail app: 8–10 business days for one platform, 12–14 for both. Banking / payment apps with strong RASP and complex backend flows are 3–4 weeks. We share a phase-by-phase progress log so your release planning isn't blind during the window.",
      },
      {
        q: "Will the test break production?",
        a: "No. Mobile pentests happen against a build the dev team supplies — staging-pointed or production-pointed but on test accounts you authorise. Backend API testing follows the rules of engagement signed at scoping.",
      },
      {
        q: "Do you map to RBI Mobile Banking Security guidelines?",
        a: "Yes. The deliverable explicitly maps each finding to RBI's Master Direction on Mobile Banking, the RBI Cybersecurity Framework for SCBs, and where applicable the UIDAI Aadhaar Authentication API security controls.",
      },
      {
        q: "What about App Store / Play Store policy review?",
        a: "We flag policy issues (privacy manifest gaps on iOS 17+, restricted permission overuse on Android 14+, Data Safety form mismatches) as a separate appendix so submission rejections don't blindside a release.",
      },
    ],
    seoTitle: "Mobile App Security Testing India & UAE | Android + iOS | Macksofy",
    seoDescription:
      "OWASP MASVS-aligned mobile penetration testing for Android and iOS — Frida, Burp and manual exploitation for RBI mobile banking and PCI DSS. India + UAE.",
    keywords: [
      "mobile application penetration testing India",
      "Android pentest Mumbai",
      "iOS application security testing",
      "OWASP MASVS audit India",
      "mobile banking app security RBI",
      "Frida penetration testing UAE",
      "APK security assessment",
      "IPA security testing Dubai",
    ],
  },

  // 6 -----------------------------------------------------------------
  {
    slug: "cloud-security",
    title: "Cloud Security (AWS / Azure / GCP)",
    shortTitle: "Cloud Security",
    icon: Cloud,
    iconName: "Cloud",
    category: "Offensive",
    hero: {
      eyebrow: "AWS · Azure · GCP · Kubernetes",
      tagline: "Cloud-native attacks demand cloud-native testing.",
      description:
        "From IAM privilege escalation to S3 misconfigurations, exposed Lambda functions to over-permissive K8s RBAC — Macksofy assesses your cloud environment with the same depth as on-prem, but with cloud-native tooling and attacker tradecraft.",
    },
    realWorld:
      "Cloud breaches almost always exploit configuration mistakes, not zero-days. We use Pacu, ScoutSuite, Prowler and custom tooling to enumerate IAM, find privilege escalation paths, exposed services and lateral movement opportunities — then validate with controlled exploitation.",
    businessImpact: [
      "Prevent the next 'misconfigured S3' headline",
      "CIS benchmark + cloud-provider best-practice attestation",
      "Reduce cloud bill by exposing rogue + over-provisioned resources",
      "Satisfy SOC 2 / ISO 27001 / CERT-In cloud audit requirements",
    ],
    methodology: [
      {
        phase: "1 · Cloud inventory",
        activities: [
          "Account / subscription / project mapping",
          "Service inventory across regions",
          "Identity & access enumeration",
        ],
      },
      {
        phase: "2 · CIS benchmarking",
        activities: [
          "AWS / Azure / GCP CIS benchmark gap analysis",
          "ScoutSuite + Prowler + CloudSploit",
          "Custom checks per industry (BFSI, healthcare)",
        ],
      },
      {
        phase: "3 · IAM / privilege analysis",
        activities: [
          "Pacu IAM enumeration",
          "Privilege escalation path discovery",
          "Cross-account trust analysis",
        ],
      },
      {
        phase: "4 · Network + service review",
        activities: [
          "Security group / NSG / VPC firewall review",
          "Public exposure inventory",
          "Service-specific deep-dive (S3, Lambda, RDS, EKS)",
        ],
      },
      {
        phase: "5 · Container + K8s",
        activities: [
          "Image scanning (Trivy)",
          "K8s RBAC + network policy review",
          "Runtime security (Falco)",
        ],
      },
      {
        phase: "6 · Reporting + remediation",
        activities: [
          "Prioritized remediation roadmap",
          "IaC fixes (Terraform / CloudFormation snippets)",
          "Free retest within 30 days",
        ],
      },
    ],
    toolStack: [
      "Pacu",
      "ScoutSuite",
      "Prowler",
      "CloudSploit",
      "Trivy",
      "Checkov",
      "kube-bench",
      "kube-hunter",
      "Falco",
      "AWS CLI",
      "Azure CLI",
      "gcloud SDK",
    ],
    industriesServed: [
      "SaaS / Product",
      "Fintech / BFSI",
      "Startups (Series A onwards)",
      "Healthcare",
      "Enterprise IT (cloud migration programs)",
    ],
    deliverables: [
      "Cloud security posture report",
      "CIS benchmark gap analysis",
      "IAM privilege escalation paths",
      "K8s + container security findings",
      "IaC remediation snippets",
      "Free retest within 30 days",
    ],
    caseStudies: [
      {
        industry: "B2B SaaS startup (Bangalore)",
        scope: "AWS account audit",
        finding: "Lambda execution role with wildcard IAM → admin escalation",
        impact: "Critical — patched same week, IaC guardrails added",
        severity: 3,
      },
    ],
    faqs: [
      {
        q: "Do you need provider permission for a cloud pentest?",
        a: "AWS, Azure and GCP all permit customer-initiated pentests against your own resources without prior notification (with some exclusions). Macksofy adheres to all three policies.",
      },
      {
        q: "Can you test Kubernetes?",
        a: "Yes — RBAC, network policies, runtime security and supply chain are part of our standard K8s assessment.",
      },
    ],
    seoTitle: "Cloud Security Services in India | AWS Azure GCP Audit | Macksofy",
    seoDescription:
      "Cloud penetration testing and security audit for AWS, Azure, GCP and Kubernetes. CIS benchmarking, IAM analysis, free retest. Mumbai + UAE.",
    keywords: [
      "cloud security audit India",
      "AWS pentest India",
      "Azure security assessment",
      "Kubernetes security India",
      "cloud security Dubai",
    ],
  },

  // 6 -----------------------------------------------------------------
  {
    slug: "red-teaming",
    title: "Red Team Operations",
    shortTitle: "Red Team",
    icon: Skull,
    iconName: "Skull",
    category: "Offensive",
    hero: {
      eyebrow: "Goal-Based Adversary Simulation · MITRE ATT&CK Aligned",
      tagline: "Find out if your blue team can detect a real attacker.",
      description:
        "Penetration tests find vulnerabilities. Red team operations answer the harder question: 'Can a determined APT-style attacker achieve their goal — and will we know?' Macksofy red teams use real-world TTPs, custom infrastructure, and EDR-bypass tradecraft.",
    },
    realWorld:
      "A Macksofy red team engagement typically runs 6–12 weeks. We agree on objectives ('exfiltrate the customer DB', 'achieve Domain Admin', 'pivot from corporate to OT'), build dedicated infrastructure (no shared C2), bypass commercial EDRs and execute the campaign. Your blue team finds out it happened only at the post-engagement debrief — unless they detect us.",
    businessImpact: [
      "Validate detection + response capability against real-world adversary",
      "Train blue team via purple-team handoff at engagement close",
      "Provide board-level evidence of resilience (or gaps)",
      "Satisfy advanced regulatory expectations (SEBI CSCRF tier-1)",
    ],
    methodology: [
      {
        phase: "1 · Goals + RoE",
        activities: [
          "Mutual NDA + authorization letter",
          "Goal definition (e.g., domain admin, data exfil, OT pivot)",
          "White-cell appointment + safety protocols",
        ],
      },
      {
        phase: "2 · Recon + initial access",
        activities: [
          "Deep OSINT, employee profiling",
          "Phishing campaign with custom payloads (RoE permitting)",
          "External infrastructure exploitation",
        ],
      },
      {
        phase: "3 · Foothold + EDR evasion",
        activities: [
          "Custom payloads, AMSI/AV bypass",
          "Process injection, hollowing, indirect syscalls",
          "Living off the land",
        ],
      },
      {
        phase: "4 · Lateral movement",
        activities: [
          "BloodHound path enumeration",
          "Kerberos delegation attacks (RBCD, S4U2Self)",
          "Pass-the-hash / pass-the-ticket",
        ],
      },
      {
        phase: "5 · Persistence + objective",
        activities: [
          "Persistence mechanisms aligned to MITRE ATT&CK",
          "Goal achievement (data exfil, DA, OT pivot)",
          "Detection-evasion analysis",
        ],
      },
      {
        phase: "6 · Reporting + purple team",
        activities: [
          "Engagement narrative with timeline",
          "MITRE ATT&CK heatmap (TTPs used vs detected)",
          "Detection-engineering recommendations",
          "Optional purple-team workshop with blue team",
        ],
      },
    ],
    toolStack: [
      "Cobalt Strike",
      "Sliver",
      "Mythic",
      "Brute Ratel (RoE permitting)",
      "BloodHound",
      "Mimikatz",
      "Rubeus",
      "Impacket",
      "Custom C2 infrastructure",
      "Custom payloads (no signatures)",
    ],
    industriesServed: [
      "BFSI (Banks, NBFCs, AMCs)",
      "Government & Defense",
      "Critical infrastructure (OT)",
      "Large enterprise",
      "Tier-1 fintechs",
    ],
    deliverables: [
      "Engagement narrative (attack timeline)",
      "MITRE ATT&CK heatmap of TTPs used",
      "Detection-engineering recommendations",
      "Purple-team workshop (optional)",
      "Board-level executive briefing",
    ],
    caseStudies: [
      {
        industry: "Listed Indian Bank",
        scope: "Goal: 'Achieve Domain Admin without detection'",
        finding: "DA in 4h 12m via phishing → SentinelOne EDR bypass → AD enumeration",
        impact: "Blue team detection coverage gaps mapped + remediated in next quarter",
        severity: 3,
      },
    ],
    faqs: [
      {
        q: "How long is a red team engagement?",
        a: "Typically 6–12 weeks end-to-end including planning, execution and reporting. Realistic engagements need time for stealth.",
      },
      {
        q: "Can you bypass our EDR (CrowdStrike / SentinelOne / Defender)?",
        a: "Our team operates in environments protected by all the major commercial EDRs and has documented bypass capability. We provide bypass methodology in the report so your team can build detections.",
      },
    ],
    seoTitle: "Red Team Services in India | Adversary Simulation | Macksofy",
    seoDescription:
      "Goal-based red team and adversary simulation in India. EDR bypass, MITRE ATT&CK mapping, purple-team handoff. CERT-In empanelled.",
    keywords: [
      "red team services India",
      "adversary simulation Mumbai",
      "MITRE ATT&CK assessment",
      "EDR bypass India",
      "red team UAE",
    ],
  },

  // 7 -----------------------------------------------------------------
  {
    slug: "digital-forensics-incident-response",
    title: "Digital Forensics & Incident Response (DFIR)",
    shortTitle: "DFIR",
    icon: Microscope,
    iconName: "Microscope",
    category: "Defensive",
    hero: {
      eyebrow: "24×7 IR · Court-Admissible Forensics",
      tagline: "When the worst happens, every minute matters.",
      description:
        "Macksofy's DFIR team responds to ransomware, business email compromise, insider threats and APT intrusions across India and the GCC. Court-admissible chain of custody, structured Velociraptor + KAPE collection, expert reporting for regulators, insurers and law enforcement.",
    },
    realWorld:
      "An incident isn't the time to figure out what to collect. Our IR team has been on the other end of ransomware calls at 3 AM — we know the playbook, the artifacts, the questions your CISO and board will ask. Volatility for memory, Plaso for timelines, KAPE for triage. Reporting in formats CERT-In + insurers accept.",
    businessImpact: [
      "Contain incidents in hours, not weeks",
      "Preserve evidence for legal / regulatory action",
      "Satisfy CERT-In incident reporting requirements (6-hour rule)",
      "Reduce insurance claim disputes via proper documentation",
    ],
    methodology: [
      {
        phase: "1 · Triage call",
        activities: [
          "30-minute bridge call to scope the incident",
          "Initial containment guidance (network isolation, etc.)",
          "Engagement letter + RoE for forensic work",
        ],
      },
      {
        phase: "2 · Evidence collection",
        activities: [
          "Velociraptor agents deployed (or KAPE for offline)",
          "Memory + disk imaging where required",
          "Cloud log preservation (CloudTrail, Activity Log, Audit Log)",
        ],
      },
      {
        phase: "3 · Analysis",
        activities: [
          "Timeline construction (Plaso / log2timeline)",
          "Memory analysis (Volatility 3)",
          "Malware triage + IOC extraction",
          "Lateral movement reconstruction",
        ],
      },
      {
        phase: "4 · Containment + eradication",
        activities: [
          "Attacker eviction plan",
          "Persistence mechanism removal",
          "Credential reset orchestration",
        ],
      },
      {
        phase: "5 · Reporting",
        activities: [
          "Executive incident summary",
          "Technical forensic report",
          "CERT-In incident report (6-hour rule compliance)",
          "Insurance + legal-ready documentation",
        ],
      },
      {
        phase: "6 · Recovery + lessons",
        activities: [
          "Hardening recommendations",
          "Detection improvements",
          "Tabletop exercise replay (optional)",
        ],
      },
    ],
    toolStack: [
      "Velociraptor",
      "KAPE",
      "Volatility 3",
      "Plaso / log2timeline",
      "Autopsy",
      "FTK Imager",
      "X-Ways Forensics",
      "SANS SIFT Workstation",
      "REMnux (malware)",
      "MISP (IOC enrichment)",
    ],
    industriesServed: [
      "BFSI",
      "Healthcare",
      "Manufacturing (post-ransomware)",
      "Government / PSU",
      "SaaS",
    ],
    deliverables: [
      "Executive incident summary",
      "Detailed forensic report (court-admissible)",
      "CERT-In incident report (6-hour timeline)",
      "Insurance documentation",
      "Eradication + recovery plan",
      "Tabletop exercise (post-incident)",
    ],
    caseStudies: [
      {
        industry: "Mid-size manufacturer (Maharashtra)",
        scope: "Ransomware (LockBit variant)",
        finding: "Initial access via exposed RDP + leaked creds; lateral movement via PsExec",
        impact: "Containment in 11h; 80% of systems restored from backups within 72h",
        severity: 3,
      },
    ],
    faqs: [
      {
        q: "What's your IR response time?",
        a: "Initial bridge call within 30 minutes for retainer clients, within 2 hours for new clients. Forensic team on-ground within 24 hours anywhere in India / UAE.",
      },
      {
        q: "Do you handle CERT-In incident reporting?",
        a: "Yes — we draft the CERT-In report in the prescribed format and timeline (6 hours for major incidents).",
      },
    ],
    seoTitle: "Digital Forensics & Incident Response (DFIR) India | Macksofy",
    seoDescription:
      "24×7 incident response and digital forensics in India + UAE. Ransomware, BEC, insider threat. CERT-In reporting, court-admissible reports.",
    keywords: [
      "incident response India",
      "DFIR services Mumbai",
      "digital forensics India",
      "ransomware response India",
      "CERT-In incident reporting",
    ],
  },

  // 8 -----------------------------------------------------------------
  {
    slug: "malware-analysis",
    title: "Malware Analysis & Reverse Engineering",
    shortTitle: "Malware Analysis",
    icon: Bug,
    iconName: "Bug",
    category: "Defensive",
    hero: {
      eyebrow: "Static · Dynamic · Behavioural",
      tagline: "Decode what hit you. Detect the next variant.",
      description:
        "Static, dynamic and behavioural analysis of malware samples — from commodity ransomware to targeted APT toolchains. We extract IOCs, document TTPs, map to MITRE ATT&CK and produce YARA / Sigma rules to detect future variants.",
    },
    realWorld:
      "When your AV finds something but doesn't know what, or when an IR engagement pulls suspicious binaries off compromised hosts, malware analysis turns the unknown into actionable intelligence. We use IDA Pro, Ghidra, x64dbg for static / dynamic analysis; Cuckoo / ANY.RUN sandboxes for behavioural; REMnux for orchestration.",
    businessImpact: [
      "Convert unknown samples into actionable IOCs and detections",
      "Satisfy IR + insurance reporting on what hit you",
      "Build organization-specific threat intelligence",
      "Map attacker capabilities to MITRE ATT&CK",
    ],
    methodology: [
      {
        phase: "1 · Triage",
        activities: [
          "File metadata, hashes, VirusTotal classification",
          "Strings + entropy analysis",
          "Initial PE/ELF structure review",
        ],
      },
      {
        phase: "2 · Static analysis",
        activities: [
          "Disassembly (IDA Pro / Ghidra / Binary Ninja)",
          "Function flow + algorithm reverse engineering",
          "Obfuscation/packing analysis",
        ],
      },
      {
        phase: "3 · Dynamic analysis",
        activities: [
          "Sandbox detonation (Cuckoo, ANY.RUN, in-house)",
          "API + system call tracing",
          "Network traffic capture + decryption",
        ],
      },
      {
        phase: "4 · Behavioural mapping",
        activities: [
          "MITRE ATT&CK technique mapping",
          "C2 protocol analysis",
          "Persistence + privilege escalation TTPs",
        ],
      },
      {
        phase: "5 · Detection engineering",
        activities: [
          "YARA rule generation",
          "Sigma rule generation",
          "Network IDS rule (Suricata)",
        ],
      },
      {
        phase: "6 · Reporting",
        activities: [
          "Technical malware report",
          "IOC bundle (STIX/TAXII)",
          "Detection rule bundle",
        ],
      },
    ],
    toolStack: [
      "IDA Pro",
      "Ghidra",
      "Binary Ninja",
      "x64dbg",
      "OllyDbg",
      "Cuckoo Sandbox",
      "ANY.RUN",
      "REMnux",
      "PE-bear",
      "Detect It Easy",
      "YARA",
      "Sigma",
    ],
    industriesServed: [
      "BFSI (post-incident)",
      "Government / PSU",
      "Manufacturing (post-ransomware)",
      "MSSPs (third-party analysis)",
    ],
    deliverables: [
      "Technical malware analysis report",
      "IOC bundle (STIX/TAXII format)",
      "YARA + Sigma rule bundle",
      "MITRE ATT&CK technique mapping",
      "Network IDS rules",
    ],
    caseStudies: [
      {
        industry: "BFSI (post-IR analysis)",
        scope: "Custom Cobalt Strike beacon variant",
        finding: "Modified C2 protocol with domain fronting + PE injection chain",
        impact: "YARA rules deployed across estate; new variant detected within 30 days",
        severity: 3,
      },
    ],
    faqs: [
      {
        q: "Do you analyze APT samples?",
        a: "Yes — including nation-state-grade samples on a need-to-know basis. We hold tight chain-of-custody and reporting protocols.",
      },
      {
        q: "Can you do live reverse engineering training?",
        a: "Yes — see our Corporate Training service.",
      },
    ],
    seoTitle: "Malware Analysis & Reverse Engineering India | Macksofy",
    seoDescription:
      "Static, dynamic and behavioural malware analysis. IDA Pro, Ghidra, sandbox detonation. IOC + YARA + Sigma rules. India + UAE.",
    keywords: [
      "malware analysis India",
      "reverse engineering services Mumbai",
      "YARA rule development",
      "APT analysis India",
    ],
  },

  // 9 -----------------------------------------------------------------
  {
    slug: "threat-intelligence",
    title: "Cyber Threat Intelligence",
    shortTitle: "Threat Intel",
    icon: Radar,
    iconName: "Radar",
    category: "Managed Services",
    hero: {
      eyebrow: "Strategic · Operational · Tactical",
      tagline: "Move from reactive defense to proactive hunting.",
      description:
        "Build a threat intelligence program that produces intel your SOC actually uses. We design the collection plan, deploy MISP / OpenCTI, integrate threat feeds, and train your team to produce intel that changes how you defend.",
    },
    realWorld:
      "Most threat intel programs are RSS readers in a trench coat. A real program starts with intelligence requirements (IRs) tied to your business, defines collection sources to satisfy them, processes intel through structured analysis (Diamond model, Kill Chain), and disseminates it in formats your SOC, IR team and executives can act on.",
    businessImpact: [
      "Detect attacker activity faster via curated IOC feeds",
      "Anticipate industry-specific threat actor TTPs",
      "Reduce SIEM noise via curated, high-confidence indicators",
      "Brief executives on relevant threats with confidence",
    ],
    methodology: [
      {
        phase: "1 · Requirements",
        activities: [
          "Stakeholder mapping",
          "Intelligence requirements definition (IR matrix)",
          "Threat actor profiling per industry",
        ],
      },
      {
        phase: "2 · Collection",
        activities: [
          "OSINT + commercial feed selection",
          "Industry sharing groups (FS-ISAC, etc.)",
          "Honeypot + sinkhole deployment (where appropriate)",
        ],
      },
      {
        phase: "3 · Processing",
        activities: [
          "MISP + OpenCTI deployment + tuning",
          "IOC normalization + enrichment",
          "Confidence scoring",
        ],
      },
      {
        phase: "4 · Analysis",
        activities: [
          "Diamond model + Kill Chain mapping",
          "Adversary attribution (cautious, evidence-based)",
          "Strategic / operational / tactical reporting",
        ],
      },
      {
        phase: "5 · Dissemination",
        activities: [
          "SIEM IOC integration (auto-detection)",
          "TIP-to-firewall/EDR automation",
          "Executive briefings",
        ],
      },
      {
        phase: "6 · Feedback loop",
        activities: [
          "IR review (quarterly)",
          "Detection efficacy metrics",
          "Source pruning + replacement",
        ],
      },
    ],
    toolStack: [
      "MISP",
      "OpenCTI",
      "ThreatConnect (where licensed)",
      "Recorded Future (where licensed)",
      "VirusTotal Premium",
      "Shodan + Censys",
      "DomainTools / RiskIQ",
      "Yeti (open source)",
    ],
    industriesServed: [
      "BFSI",
      "Government / PSU",
      "Critical infrastructure",
      "MSSPs",
    ],
    deliverables: [
      "Intelligence requirements matrix",
      "MISP / OpenCTI deployment + integrations",
      "Curated IOC feed (format: STIX/TAXII)",
      "Quarterly threat landscape report",
      "Executive briefings",
    ],
    caseStudies: [
      {
        industry: "Indian Stock Broker (SEBI-regulated)",
        scope: "Threat intel program build",
        finding: "Custom MISP feed detected attacker recon 11 days before exploitation attempt",
        impact: "Pre-emptive blocking of C2 infrastructure across estate",
        severity: 2,
      },
    ],
    faqs: [
      {
        q: "Do we need to buy commercial feeds?",
        a: "Not necessarily — for many Indian mid-market clients, open-source feeds + MISP + industry sharing covers 80% of needs. We help you spend wisely if commercial feeds are warranted.",
      },
    ],
    seoTitle: "Threat Intelligence Services India | MISP + OpenCTI | Macksofy",
    seoDescription:
      "Build a threat intelligence program that drives detection, not noise. MISP + OpenCTI deployment, curated feeds, executive briefings. India + UAE.",
    keywords: [
      "threat intelligence India",
      "MISP consulting India",
      "OpenCTI deployment",
      "threat intel program",
    ],
  },

  // 10 ----------------------------------------------------------------
  {
    slug: "iot-ot-security",
    title: "IoT & OT Security Assessment",
    shortTitle: "IoT / OT",
    icon: Factory,
    iconName: "Factory",
    category: "Offensive",
    popular: true,
    hero: {
      eyebrow: "ICS / SCADA · IEC 62443 · NIST SP 800-82 · Purdue-aware",
      tagline: "Where a typo on the HMI becomes a process incident.",
      description:
        "OT-aware penetration testing for industrial control systems, smart meters, BMS, medical devices and connected products. We test live without tripping safeties, map IT→OT pivot paths, and report in language your plant manager and your auditor both accept.",
    },
    realWorld:
      "OT is not just IT with PLCs. A misfired Nmap on a Modbus segment can drop a turbine. Our operators carry IEC 62443 training alongside OSCP, work with your reliability engineers to define a clear safety envelope, and use passive-first techniques (Wireshark, GRASSMARLIN, ICS-NetGazer) before touching anything that talks Profinet or DNP3. When active testing is approved, we use ICS-validated tooling — never a generic vulnerability scanner pointed at the process network.",
    businessImpact: [
      "Avoid the headline-grade incidents (Colonial, Oldsmar, Stuxnet-class) before regulators force the question",
      "Satisfy IEC 62443, NIS2, NCA-ECC OT controls and India's CEA cyber security guidelines for power utilities",
      "Quantify IT→OT pivot risk concretely — not as 'air-gap assumed'",
      "Build the OT asset inventory + network baseline that compliance keeps asking for",
    ],
    methodology: [
      {
        phase: "1 · Safety envelope & scoping",
        activities: [
          "Site walk-down with reliability + safety engineers",
          "Process-impact assessment (PHA) review",
          "Zone & conduit mapping per IEC 62443-3-2",
          "Clear go / no-go signals for every test action",
        ],
      },
      {
        phase: "2 · Passive discovery",
        activities: [
          "SPAN / TAP-based protocol capture (Modbus, DNP3, S7, Profinet, OPC UA, BACnet, IEC 60870-5-104)",
          "Asset inventory via passive fingerprinting (GRASSMARLIN, Claroty xDome read-only)",
          "Communication baseline & anomaly hunting",
        ],
      },
      {
        phase: "3 · IT / OT boundary review",
        activities: [
          "DMZ + jump-host architecture audit",
          "Engineering workstation hardening review",
          "Remote-access (VPN, SD-WAN, vendor portals) attack-surface mapping",
        ],
      },
      {
        phase: "4 · Targeted active testing",
        activities: [
          "ICS-aware vulnerability validation (no scanner storms)",
          "Authentication + authorization testing on HMIs, EWS, historians",
          "Firmware reverse-engineering on representative devices",
          "Wireless audit (802.15.4, LoRaWAN, ISA-100, cellular)",
        ],
      },
      {
        phase: "5 · Pivot simulation",
        activities: [
          "IT→OT lateral path demonstration (read-only by default)",
          "Engineering workstation → PLC code-change capability",
          "Safety-system isolation validation (SIS)",
        ],
      },
      {
        phase: "6 · Reporting & remediation",
        activities: [
          "Findings mapped to IEC 62443 SLs + MITRE ATT&CK for ICS",
          "Plant-manager friendly executive summary",
          "Compensating-control roadmap with operational reality in mind",
          "Free retest of high/critical within 60 days",
        ],
      },
    ],
    toolStack: [
      "Wireshark + ICS dissectors",
      "GRASSMARLIN",
      "Claroty CTD (read-only)",
      "Nozomi Guardian (read-only)",
      "ICSSPLOIT",
      "PLCScan",
      "Redpoint",
      "ModScan / mbtget",
      "S7scan",
      "Shodan ICS filters",
      "Binwalk + Ghidra (firmware)",
      "HackRF + SDR tooling",
    ],
    industriesServed: [
      "Power generation & T&D utilities",
      "Oil & gas (upstream, midstream, refineries)",
      "Water & wastewater",
      "Manufacturing (discrete + process)",
      "Smart buildings & data centres",
      "Healthcare (connected medical devices)",
      "Transportation & rail",
      "Smart-city + critical infra programs",
    ],
    deliverables: [
      "OT asset inventory + protocol baseline",
      "Zone-and-conduit network diagram with risk overlays",
      "Findings report with IEC 62443 SL gap analysis",
      "MITRE ATT&CK for ICS technique mapping",
      "Plant-manager + CISO + board-ready executive summary",
      "Free retest of high/critical findings within 60 days",
      "Evidence pack accepted by CEA / NIS2 / NCA-ECC auditors",
    ],
    caseStudies: [
      {
        industry: "State Electricity Utility (India)",
        scope: "220 kV substation SCADA + RTU fleet",
        finding: "Engineering workstation reachable from corporate AD with cached domain creds → PLC logic-modification capability across three substations",
        impact: "Critical — IT→OT pivot path closed via jump-host + tiered admin model before the next CEA audit cycle",
        severity: 3,
      },
      {
        industry: "GCC Refinery Operator",
        scope: "DCS + safety instrumented system review",
        finding: "Vendor remote-support VPN terminated inside Level 2 with no MFA + shared service account",
        impact: "High — replaced with broker-mediated session + per-engineer credential within the engagement window",
        severity: 3,
      },
      {
        industry: "Smart Building / Data Centre (Mumbai)",
        scope: "BMS + CCTV + access-control fabric",
        finding: "BACnet broadcast write-property exposed on guest VLAN → HVAC setpoint manipulation possible from break-room jack",
        impact: "High — segmentation + BACnet/SC migration roadmap delivered",
        severity: 2,
      },
    ],
    faqs: [
      {
        q: "Will testing take our plant down?",
        a: "No — the engagement is built around a written safety envelope agreed with your reliability and safety engineers. We default to passive techniques, and any active testing happens against approved targets in approved windows with a documented stop-test signal. We have never caused a process trip on a Macksofy OT engagement.",
      },
      {
        q: "Do you actually test live production, or just a lab?",
        a: "Both, depending on risk tolerance. Greenfield projects and HMIs / historians at Level 3 are usually safe to test live. Level 1/2 PLC and SIS testing is normally done on a representative bench, on a sister unit during planned outage, or via vendor-supported lab — we'll recommend the right mix during scoping.",
      },
      {
        q: "Which frameworks do you align reports to?",
        a: "IEC 62443-2-1 / 2-4 / 3-2 / 3-3, NIST SP 800-82r3, MITRE ATT&CK for ICS, NIS2 (EU), NCA-ECC OT controls (KSA), India CEA cyber security guidelines for power utilities, and CERT-In OT advisories. Output is mapped so a single engagement produces evidence for multiple audits.",
      },
      {
        q: "Do you also assess connected products and medical devices?",
        a: "Yes — product-side IoT, IoMT (medical), connected-vehicle and smart-meter assessments are a large part of this practice. Scope typically covers firmware extraction + reverse engineering, hardware interfaces (UART, JTAG, SPI), wireless (BLE, Zigbee, LoRa, cellular), companion mobile app, cloud back-end and OTA update pipeline.",
      },
    ],
    seoTitle: "IoT & OT / ICS Security Assessment India & UAE | IEC 62443 | Macksofy",
    seoDescription:
      "OT-aware penetration testing for SCADA, ICS, smart meters and connected products — IEC 62443 and NIST SP 800-82 aligned, mapped to ATT&CK for ICS.",
    keywords: [
      "OT security assessment India",
      "ICS penetration testing",
      "SCADA security audit India",
      "IEC 62443 assessment",
      "IoT pentest India",
      "smart meter security audit",
      "BMS security audit",
      "industrial cybersecurity Mumbai",
      "OT pentest UAE",
    ],
  },

  // 11 ----------------------------------------------------------------
  {
    slug: "source-code-review",
    title: "Secure Source Code Review",
    shortTitle: "Code Review",
    icon: FileScan,
    iconName: "FileScan",
    category: "Offensive",
    hero: {
      eyebrow: "Manual + SAST + SCA · OWASP / SANS 25 / CWE-aligned",
      tagline: "Find the flaw at line 412 — before it ships to prod.",
      description:
        "Line-by-line review of your source by OSCP/OSWE-trained reviewers, paired with commercial SAST and SCA tooling. Covers Java, .NET, Node.js, Python, Go, PHP, Ruby, Swift and Kotlin — mapped to OWASP Top 10, SANS Top 25 and the CWE taxonomy your auditor expects.",
    },
    realWorld:
      "We don't ship a Semgrep dump with our logo on the cover. A typical engagement starts with a dependency graph and SBOM, builds a SAST baseline across the codebase, then a senior reviewer spends 60–70% of the engagement on manual deep-dives in the spots tools miss: authentication and session handling, crypto, deserialization, business-logic authorization, file handling and race conditions. Every finding ships with the exact file:line, a runnable PoC, the secure-coding pattern to replace it with, and a CI rule to prevent regression.",
    businessImpact: [
      "Catch flaws at SDLC stage where remediation costs ~10× less than post-prod",
      "Satisfy CERT-In, RBI IT Governance, SEBI CSCRF, ISO 27001 A.14 and SOC 2 SDLC controls",
      "De-risk pre-launch releases and M&A code due diligence (SBOM + risk inventory)",
      "Reduce production CVSS exposure surface before a public push",
      "Train your dev team on secure-by-default patterns via the walkthrough handoff",
    ],
    methodology: [
      {
        phase: "1 · Pre-engagement & scope",
        activities: [
          "Mutual NDA + source-handling agreement (on-prem review or read-only repo grant)",
          "Language + framework inventory, third-party dependency list",
          "Crown-jewel module identification (auth, payments, PII handling, admin)",
          "Branch / tag pin so the review is reproducible",
        ],
      },
      {
        phase: "2 · Automated baseline",
        activities: [
          "SAST sweep (Semgrep, SonarQube, CodeQL, Checkmarx / Fortify when client-licensed)",
          "SCA + SBOM (OWASP Dependency-Check, Snyk, Trivy) — known CVEs in third-party libs",
          "Secrets scan (Gitleaks, TruffleHog) across full git history, not just HEAD",
          "Lint + style baseline to surface dead branches and unreachable code",
        ],
      },
      {
        phase: "3 · Manual deep-dive review",
        activities: [
          "Authentication, session and password handling",
          "Cryptography: algorithm choice, key handling, IV/nonce reuse, JWT pitfalls",
          "Input validation, output encoding, injection sinks (SQLi, XSS, SSRF, RCE, XXE, LDAP, NoSQL)",
          "Business-logic authorization (BOLA, IDOR, mass-assignment, race conditions)",
          "Deserialization, file upload, path traversal, SSRF + DNS rebinding",
          "Logging, error handling, secret material in logs",
        ],
      },
      {
        phase: "4 · Data-flow / taint analysis",
        activities: [
          "Source-to-sink tracing for high-risk sinks (CodeQL queries + manual)",
          "Trust-boundary crossing review (request → DB, request → file, request → shell)",
          "Tenant-isolation review for multi-tenant SaaS",
        ],
      },
      {
        phase: "5 · Triage & validation",
        activities: [
          "False-positive elimination — every reported finding is human-confirmed",
          "Exploitability + business-impact scoring (CVSS 3.1 + Macksofy risk rating)",
          "PoC or repro snippet for every High / Critical",
        ],
      },
      {
        phase: "6 · Reporting",
        activities: [
          "Executive summary (board-ready, 2–3 pages)",
          "Findings inventory: file:line, CWE, CVSS, exploitability, recommended fix",
          "Inline patched code snippets — copy-pasteable, not pseudo-code",
          "SDLC-integration recommendations (pre-commit hooks, CI gates, IDE plugins)",
        ],
      },
      {
        phase: "7 · Walkthrough & retest",
        activities: [
          "Live walkthrough session with the development team",
          "Q&A on secure-coding patterns and refactor strategy",
          "Free retest of remediated findings within 30 days of fix submission",
          "Compliance evidence letter (ISO 27001 A.14 / SOC 2 / CERT-In / PCI-DSS req 6.3)",
        ],
      },
    ],
    toolStack: [
      "Semgrep",
      "SonarQube",
      "CodeQL",
      "Checkmarx (client-licensed)",
      "Fortify SCA (client-licensed)",
      "Brakeman (Ruby on Rails)",
      "Bandit (Python)",
      "gosec (Go)",
      "ESLint security plugins",
      "Snyk Code + Snyk Open Source",
      "OWASP Dependency-Check",
      "Trivy (containers + SBOM)",
      "Gitleaks",
      "TruffleHog",
      "Custom Semgrep + CodeQL queries",
    ],
    industriesServed: [
      "Banking & Financial Services",
      "Fintech & Payments",
      "Insurance & InsurTech",
      "Healthcare & HealthTech",
      "SaaS & Product Companies",
      "Government & PSU",
      "E-commerce & D2C",
      "Telecom",
    ],
    deliverables: [
      "Executive summary (board-ready, 2–3 pages)",
      "Per-finding report: file:line, CWE, CVSS 3.1, exploitability, business impact",
      "Runnable PoC or repro for every High / Critical finding",
      "Inline fix snippets — production-ready, not pseudo-code",
      "Software Bill of Materials (SBOM) in CycloneDX / SPDX format",
      "SDLC-integration playbook: pre-commit hooks, CI gates, IDE plugins",
      "Free retest of fixed findings within 30 days",
      "Compliance evidence letter (ISO 27001 A.14 / SOC 2 / CERT-In / PCI-DSS 6.3)",
    ],
    caseStudies: [
      {
        industry: "Listed Fintech (Bengaluru)",
        scope: "Customer-facing Java / Spring Boot monolith, ~340 KLOC",
        finding: "7 hardcoded JWT secrets across env profiles + 3 second-order SQLi in admin module surfaced via Semgrep custom rules and confirmed manually",
        impact: "Critical — pre-prod fix shipped before public launch; saved estimated ₹3 Cr breach-cost exposure",
        severity: 3,
      },
      {
        industry: "HealthTech SaaS (Mumbai)",
        scope: "Node.js + Python microservices (12 services, ~180 KLOC)",
        finding: "Insecure Jackson deserialization → RCE in 2 microservices, traced via CodeQL taint analysis from REST handlers to ObjectMapper.readValue",
        impact: "Critical — patched in 5 working days; HIPAA-aligned customer notification avoided",
        severity: 3,
      },
      {
        industry: "Government PSU (Delhi NCR)",
        scope: ".NET 6 portal + Python report-generation service",
        finding: "SSRF in PDF generation library (chained Server-Side request → internal metadata service) and IDOR across 4 admin endpoints",
        impact: "High — disclosed to internal SOC; remediated under CERT-In coordinated disclosure",
        severity: 2,
      },
    ],
    faqs: [
      {
        q: "Which languages and frameworks do you cover?",
        a: "Java (Spring, Struts, JSP), .NET (Framework + Core), Node.js (Express, NestJS, Fastify), Python (Django, Flask, FastAPI), Go, PHP (Laravel, Symfony, WordPress plugins), Ruby on Rails, Swift / Kotlin (mobile), and a long tail of Scala, Rust, Elixir, C / C++ on request. We assign reviewers by language proficiency, not as a generalist pool.",
      },
      {
        q: "Do you need our full repo? Can the review happen on-prem?",
        a: "Both options. Default is read-only access to a pinned branch in your repo (GitHub / GitLab / Bitbucket / Azure DevOps). For sensitive codebases — BFSI, defence, healthcare — we run on-prem from a Macksofy laptop inside your office, or in a jump-host VM you control. NDA + source-handling agreement are mandatory either way.",
      },
      {
        q: "Is this just a SAST tool run, or actual manual review?",
        a: "Roughly 30% automated baseline, 70% manual. SAST and SCA give us coverage and triage speed; the bulk of value comes from a senior reviewer walking authentication, crypto, business-logic authorization, deserialization and trust-boundary code by hand. Every finding we ship is human-confirmed — no raw tool dumps.",
      },
      {
        q: "Can you integrate the findings into our CI / SDLC?",
        a: "Yes. The report includes a SDLC-integration playbook: pre-commit hooks (Semgrep CI, Gitleaks, custom rules tuned to your repo), CI gates (fail-the-build thresholds), IDE plugins for developers, and a Jira / Linear import of all findings as actionable tickets. We can run a follow-on engagement to set this up.",
      },
      {
        q: "How long does a typical engagement run?",
        a: "5–20 working days depending on KLOC, language count and crown-jewel scope. A focused module review (e.g. payment service, auth subsystem) is usually 5–7 days. A full-codebase review of a mid-size SaaS is 12–20. Fixed-price proposal within 48 hours of scoping.",
      },
      {
        q: "Is our source code kept confidential?",
        a: "Yes. Mutual NDA signed before any code is shared. Source is stored encrypted at rest, only the assigned reviewer has access, and everything is wiped 30 days after the retest closes. We never copy, fork or retain your code beyond the engagement window. On-prem review option is available for the most sensitive engagements.",
      },
    ],
    seoTitle: "Secure Source Code Review Services India & UAE | SAST + Manual | Macksofy",
    seoDescription:
      "Manual and SAST source code review by OSCP/OSWE-trained reviewers across Java, .NET, Node.js, Python and Go — OWASP and CWE aligned. India + UAE.",
    keywords: [
      "secure code review India",
      "source code review services",
      "SAST consulting India",
      "code review company Mumbai",
      "secure code review UAE",
      "OWASP secure code review",
      "Java code review India",
      ".NET code review India",
      "Node.js security audit",
      "Python code audit",
      "CERT-In code review",
      "SDLC security review India",
    ],
  },

  // 12 — Managed Services umbrella ------------------------------------
  {
    slug: "managed-security-services",
    title: "Managed Security Services (MSSP)",
    shortTitle: "MSSP",
    icon: ShieldCheck,
    iconName: "ShieldCheck",
    category: "Managed Services",
    hero: {
      eyebrow: "24×7 · CERT-In Empanelled · India Data-Residency",
      tagline: "Your security operations team — without the 18-month hiring cycle.",
      description:
        "Outsource the heavy lifting of day-to-day security operations to a CERT-In empanelled team. Managed SOC, managed EDR/XDR, managed vulnerability operations, managed identity hygiene and incident response — all under one SLA, one ticketing pane and one quarterly board report.",
    },
    realWorld:
      "Most mid-market security teams in India and the GCC have 2–4 in-house engineers covering 200+ assets across cloud, on-prem and SaaS. Macksofy plugs in a 24×7 analyst pod (L1/L2/L3 + IR on-call), a tuned SIEM you keep ownership of, and a quarterly governance forum that measures MTTD, MTTR, control coverage and risk burn-down. You stop chasing alerts. We stop talking about tools and start talking about outcomes.",
    businessImpact: [
      "Predictable monthly cost vs. fully-loaded ₹3–5 Cr/yr for a 24×7 in-house SOC",
      "Coverage maturity in 30–60 days instead of 12–18 months of hiring",
      "Single accountable provider for SOC, EDR, IR, vuln-ops and reporting",
      "Quarterly board pack auditors and regulators accept as-is (CERT-In · RBI · SEBI · ISO 27001)",
    ],
    methodology: [
      {
        phase: "1 · Onboarding & baseline",
        activities: [
          "Asset and identity inventory · crown-jewel tagging",
          "Risk baseline + control coverage gap analysis",
          "SIEM / EDR / IDS / cloud-log connector mapping",
          "Runbook + escalation matrix sign-off",
        ],
      },
      {
        phase: "2 · Detection engineering",
        activities: [
          "MITRE ATT&CK coverage map (current → target)",
          "Use-case backlog prioritised by risk + business impact",
          "Custom detection rules · noise tuning · KPI baselining (MTTD / MTTR / false-positive ratio)",
        ],
      },
      {
        phase: "3 · 24×7 operations",
        activities: [
          "Tier-1 triage SLA 15 minutes · Tier-2 investigation SLA 30 minutes",
          "Threat hunting cycles aligned to MITRE TTPs and your industry threat actors",
          "Managed vulnerability operations: prioritisation, exception tracking, remediation chasing",
          "Identity hygiene watch (stale accounts, MFA exceptions, privileged access drift)",
        ],
      },
      {
        phase: "4 · Incident response on-call",
        activities: [
          "DFIR retainer hours rolled into the MSS contract",
          "Containment + eradication playbooks pre-approved with your IT team",
          "Forensic preservation + chain-of-custody if litigation likely",
        ],
      },
      {
        phase: "5 · Reporting & governance",
        activities: [
          "Monthly operations report (MTTD, MTTR, top-10 risks, control gaps)",
          "Quarterly business review with security leadership + finance",
          "Annual program maturity assessment (NIST CSF / ISO 27001 alignment)",
          "Evidence pack ready for CERT-In, RBI, SEBI, SOC 2 and ISO 27001 audits",
        ],
      },
    ],
    toolStack: [
      "Wazuh + ELK (open-source)",
      "Splunk · Microsoft Sentinel · IBM QRadar (client-licensed)",
      "CrowdStrike Falcon · SentinelOne · Microsoft Defender XDR",
      "Tenable · Qualys · Rapid7 InsightVM",
      "TheHive + Cortex",
      "MISP · OpenCTI",
      "Custom SOAR playbooks",
    ],
    industriesServed: [
      "Banking & Financial Services",
      "Fintech & Payments",
      "Healthcare & HealthTech",
      "Insurance & InsurTech",
      "SaaS & Product Companies",
      "Government & PSU",
      "Manufacturing & Energy",
      "Telecom",
    ],
    deliverables: [
      "24×7 monitoring + Tier-1 to Tier-3 triage and investigation",
      "Managed EDR / XDR + managed vulnerability operations",
      "Incident response retainer hours (included)",
      "Monthly operations report + quarterly business review",
      "MITRE ATT&CK coverage map kept current",
      "Annual program maturity assessment",
      "Audit-ready evidence pack for CERT-In · RBI · SEBI · ISO 27001 · SOC 2",
    ],
    caseStudies: [
      {
        industry: "Listed NBFC (Mumbai)",
        scope: "24×7 MSS across AWS + on-prem AD, 1,800 endpoints",
        finding: "Detected and contained a ransomware-precursor (Cobalt Strike beacon) inside 22 minutes of initial access — domain compromise avoided",
        impact: "Critical — regulator notification not required; full forensic timeline delivered in 48 hours",
        severity: 3,
      },
      {
        industry: "Fintech Lending Platform (Bengaluru)",
        scope: "Managed SOC + managed EDR + DFIR retainer",
        finding: "MTTD reduced from 6.8 hours to 18 minutes over 90-day baseline period",
        impact: "Material — measurable risk reduction reported to board + SEBI System Audit",
        severity: 2,
      },
    ],
    faqs: [
      {
        q: "Do you own our SIEM or do we?",
        a: "You own the SIEM, the data, and the detection content — always. We deploy, tune and operate it under your tenancy. If the engagement ends, you keep everything: rules, dashboards, historical logs, runbooks. No lock-in.",
      },
      {
        q: "Where do logs and case data reside?",
        a: "Inside your environment by default (your AWS / Azure / GCP tenant or on-prem datacenter). India data-residency available on demand. For regulated clients (RBI, SEBI, CERT-In), we run the full stack in-country and produce data-localisation evidence on request.",
      },
      {
        q: "What's the minimum engagement?",
        a: "12 months. Onboarding takes 30–60 days; we want a clean baseline period to demonstrate measurable MTTD / MTTR improvement. 24- and 36-month engagements unlock discounted rates and rolled-in DFIR hours.",
      },
      {
        q: "Can you co-source rather than fully outsource?",
        a: "Yes. Co-managed SOC is common — your in-house team owns Tier-1 + business context, we own Tier-2/3 + detection engineering + 24×7 cover. Pricing scales with split.",
      },
      {
        q: "How does this differ from your SOC + SIEM build engagement?",
        a: "The SOC build engagement is a one-time setup; MSS is the run-state operation. Many clients buy the build first, then transition into MSS for the operate phase. The contracts integrate cleanly.",
      },
    ],
    seoTitle: "Managed Security Services (MSSP) India & UAE | 24×7 SOC | Macksofy",
    seoDescription:
      "CERT-In empanelled managed security services — 24×7 SOC, managed EDR/XDR, vulnerability ops and an IR retainer, with India data residency.",
    keywords: [
      "managed security services India",
      "MSSP India",
      "managed SOC India",
      "managed XDR India",
      "MSSP Mumbai",
      "MSSP UAE",
      "co-managed SIEM India",
      "24x7 SOC services India",
      "managed security services Dubai",
    ],
  },

  // 13 — Annual Security Program (advisory retainer) ------------------
  {
    slug: "annual-security-program",
    title: "Annual Security Program",
    shortTitle: "Annual Program",
    icon: CalendarClock,
    iconName: "CalendarClock",
    category: "Managed Services",
    hero: {
      eyebrow: "Continuous Assurance · Quarterly Cadence · Single Retainer",
      tagline: "One annual partner. Every assessment, every quarter, every audit.",
      description:
        "Bundle your pentest, VAPT, code review, configuration audits and tabletop exercises into a single 12-month program with a quarterly cadence — at a 25–35% discount to one-off pricing. Audit-evidence-ready, board-reportable, regulator-defensible.",
    },
    realWorld:
      "The annual security program replaces the panic-driven one-off engagement cycle. We sit with your CISO, map the 12-month assessment plan against your regulatory deadlines (RBI System Audit, SEBI CSCRF, CERT-In, ISO 27001 surveillance, SOC 2 Type 2), and execute on a rolling quarterly cadence. Findings flow into a single risk register. Remediation gets chased between quarters. Free retests are unlimited within the contract window. Your board sees one trend chart, not 11 disconnected PDFs.",
    businessImpact: [
      "25–35% lower spend vs. one-off engagement pricing across the same scope",
      "Single risk register across pentest + audit + code review + tabletop findings",
      "Regulator-defensible evidence package — no last-minute scramble before audit",
      "Continuous remediation chasing (we don't just hand over a PDF and disappear)",
      "Quarterly board / risk-committee deck produced for you",
    ],
    methodology: [
      {
        phase: "1 · Annual scoping & roadmap",
        activities: [
          "Regulatory calendar mapping (RBI · SEBI · CERT-In · ISO · SOC 2 · PCI-DSS)",
          "Asset + product roadmap intake",
          "12-month assessment cadence designed jointly with your CISO",
          "Risk-register baseline established",
        ],
      },
      {
        phase: "2 · Quarter 1 execution",
        activities: [
          "Baseline external + internal pentest",
          "Cloud configuration audit (CIS / Macksofy hardening pack)",
          "Identity hygiene + privileged access review",
        ],
      },
      {
        phase: "3 · Quarter 2 execution",
        activities: [
          "Web + API VAPT across new releases",
          "Source code review on crown-jewel modules",
          "Tabletop exercise (incident response + business continuity)",
        ],
      },
      {
        phase: "4 · Quarter 3 execution",
        activities: [
          "Red team / assumed-breach exercise (assumed-breach scope)",
          "Mobile + thick-client testing",
          "Vendor / third-party risk spot-checks",
        ],
      },
      {
        phase: "5 · Quarter 4 execution",
        activities: [
          "Re-pentest of remediated findings (closure validation)",
          "ISO 27001 / SOC 2 readiness sweep",
          "Annual maturity assessment + next-year planning",
        ],
      },
      {
        phase: "6 · Continuous governance",
        activities: [
          "Single risk register updated quarterly",
          "Unlimited free retests within the contract window",
          "Quarterly business review with security leadership",
          "Year-end board pack + auditor evidence package",
        ],
      },
    ],
    toolStack: [
      "Macksofy proprietary risk-register platform",
      "Tenable / Qualys / Rapid7 InsightVM (configuration audits)",
      "Burp Suite Pro · Nuclei · Custom tooling (pentest cadence)",
      "Semgrep · CodeQL · Snyk (code review cadence)",
      "TheHive + Cortex (tabletop exercise infrastructure)",
    ],
    industriesServed: [
      "Banking & Financial Services",
      "Fintech & Payments",
      "Insurance & InsurTech",
      "Healthcare & HealthTech",
      "Government & PSU",
      "SaaS & Product Companies",
      "Manufacturing & Energy",
    ],
    deliverables: [
      "12-month assessment roadmap aligned to your regulatory calendar",
      "Quarterly execution: pentest · VAPT · code review · audit · tabletop",
      "Single consolidated risk register (Macksofy platform)",
      "Quarterly business review + board-ready trend chart",
      "Unlimited free retests within the contract window",
      "Year-end auditor evidence package (CERT-In · RBI · SEBI · ISO · SOC 2)",
      "Annual maturity assessment (NIST CSF + ISO 27001 alignment)",
    ],
    caseStudies: [
      {
        industry: "Listed Insurance MNC (Mumbai BKC)",
        scope: "12-month program: 4 pentests + 2 code reviews + 1 red team + 4 audits",
        finding: "Consolidated savings of ₹68 L vs. one-off pricing; closed 91% of High/Critical findings inside the contract window",
        impact: "Material — passed IRDAI System Audit + ISO 27001 surveillance with zero major non-conformities",
        severity: 2,
      },
      {
        industry: "Regulated Fintech (Bengaluru)",
        scope: "12-month program for SEBI CSCRF + RBI master direction readiness",
        finding: "Found 3 Critical issues in pre-prod that would have triggered SEBI CSCRF non-conformity; remediated before go-live",
        impact: "High — avoided regulatory delay of new investment platform launch",
        severity: 3,
      },
    ],
    faqs: [
      {
        q: "Can we customise the quarterly mix?",
        a: "Yes — the cadence above is a template. We sit with your CISO during scoping and re-balance based on your regulatory deadlines, product roadmap and where past assessments found weaknesses. The total scope, not the exact split, is what's contracted.",
      },
      {
        q: "What if our scope grows mid-year?",
        a: "Scope adjustments are handled via change-orders at the discounted retainer rate, not at one-off pricing. The annual program is designed to flex.",
      },
      {
        q: "Is this just a pre-paid block of hours?",
        a: "No — it's outcomes-based. The deliverables list above is contractually committed. Hours are tracked for transparency but the contract is for the assessments + deliverables, not a bucket of consulting time.",
      },
      {
        q: "How is this different from a vCISO retainer?",
        a: "The annual program is execution-heavy (we run the assessments). The vCISO is leadership-heavy (we sit in your governance forums, set policy, advise on architecture). Most regulated mid-market clients buy both — the vCISO designs the program, this contract executes it.",
      },
      {
        q: "What's the typical contract size?",
        a: "Ranges from ₹40 L to ₹2.5 Cr depending on asset count, product portfolio and regulatory footprint. Fixed price for the year, billed quarterly. Quote within 5 working days of scoping.",
      },
    ],
    seoTitle: "Annual Security Program India | Continuous VAPT + Audit + Code Review | Macksofy",
    seoDescription:
      "A 12-month security assurance programme bundling pentest, VAPT, code review, audit and red team at 25–35% off, on a quarterly cadence. India + UAE.",
    keywords: [
      "annual security program India",
      "continuous assurance India",
      "annual VAPT retainer",
      "security retainer Mumbai",
      "RBI annual security audit",
      "SEBI CSCRF program India",
      "annual penetration testing retainer",
      "security program management India",
    ],
  },

  // 14 — Virtual CISO ------------------------------------------------
  {
    slug: "vciso",
    title: "Virtual CISO (vCISO)",
    shortTitle: "vCISO",
    icon: UserCog,
    iconName: "UserCog",
    category: "Managed Services",
    hero: {
      eyebrow: "Fractional CISO · India + GCC · Board-Ready",
      tagline: "C-suite security leadership — fractional, accountable, board-ready.",
      description:
        "An experienced CISO embedded in your leadership team on a fractional basis — 1, 2 or 4 days a week. Sets policy, owns risk register, presents to the board, manages regulators, mentors your in-house team and stays accountable to outcomes, not hours billed.",
    },
    realWorld:
      "A vCISO is not an advisor who emails recommendations. Macksofy vCISOs (15–22 years experience, prior in-house CISO roles at BFSI / fintech / SaaS) join your leadership calendar, attend your board / risk committee meetings, own the security strategy, sign off on the risk register, sit across the table from RBI / SEBI / CERT-In inspectors, and mentor your 2–6 person security team. They report to your CEO or COO, not to us. The model fits start-ups and mid-market firms who need real CISO leadership without the ₹2–4 Cr/yr fully-loaded cost.",
    businessImpact: [
      "C-level security leadership at 25–40% of the fully-loaded in-house cost",
      "Board + risk-committee reporting handled by someone who has done it before",
      "Regulator-facing interlocutor (CERT-In · RBI · SEBI · DPDP Authority · DESC / NCA in GCC)",
      "Mentorship pipeline for your in-house engineers (career-ladder, training plan)",
      "Continuity through founder departures, fundraises and M&A diligence",
    ],
    methodology: [
      {
        phase: "1 · Onboarding (Month 1)",
        activities: [
          "Stakeholder interviews (board, CEO, CTO, CFO, audit, legal, ops)",
          "Asset, vendor and regulator inventory",
          "Current-state risk register + maturity baseline (NIST CSF · ISO 27001)",
          "12-month security strategy + budget draft",
        ],
      },
      {
        phase: "2 · Strategy ratification (Month 2)",
        activities: [
          "Strategy presented to board / risk committee",
          "Policy stack reviewed or rewritten (information security · acceptable use · incident response · vendor risk · DPDP / GDPR)",
          "KRIs and KPIs agreed with leadership",
        ],
      },
      {
        phase: "3 · Operate (Months 3–12)",
        activities: [
          "Monthly risk-committee chair + quarterly board reporting",
          "Regulator engagement (CERT-In · RBI · SEBI · DESC · NCA · DPDP)",
          "Architecture review on every major change (cloud, third-party, product)",
          "In-house team mentoring + recruitment / interview support",
          "Incident command during High / Critical incidents",
        ],
      },
      {
        phase: "4 · Annual cycle",
        activities: [
          "Annual maturity reassessment + strategy refresh",
          "Annual board pack + audit readiness sign-off",
          "Succession-planning for in-house CISO hire (if applicable)",
        ],
      },
    ],
    toolStack: [
      "Macksofy risk-register platform",
      "Vanta · Drata · Sprinto (compliance automation, if client-licensed)",
      "JIRA / Linear (risk-treatment tracking)",
      "Confluence / Notion (policy stack)",
    ],
    industriesServed: [
      "Fintech & Payments",
      "SaaS & Product Companies",
      "Banking & Financial Services",
      "Insurance & InsurTech",
      "Healthcare & HealthTech",
      "E-commerce & D2C",
      "Government & PSU",
      "Series-A to Series-D startups",
    ],
    deliverables: [
      "12-month security strategy + budget signed off by board",
      "Policy stack (10–14 core policies) — drafted or refreshed",
      "Monthly risk-committee meetings chaired",
      "Quarterly board pack (trend chart, top risks, regulator status, hiring plan)",
      "Regulator interlocutor for CERT-In · RBI · SEBI · DPDP · DESC · NCA",
      "Incident command during High / Critical events",
      "Mentorship + interview support for in-house security hires",
      "Annual maturity reassessment (NIST CSF + ISO 27001)",
    ],
    caseStudies: [
      {
        industry: "Series-C Fintech (Bengaluru)",
        scope: "vCISO 2 days/week for 14 months",
        finding: "Built security from 1-person to 4-person team; passed SOC 2 Type 2 and SEBI CSCRF; supported successful Series-D due diligence",
        impact: "Strategic — avoided estimated ₹2.5 Cr/yr full-time CISO cost during pre-IPO scaling phase",
        severity: 0,
      },
      {
        industry: "Listed Insurance MNC (Mumbai BKC)",
        scope: "vCISO 4 days/week — interim coverage during in-house CISO transition",
        finding: "Continuity through 7-month CISO transition; chaired IRDAI inspection response; closed 14 of 17 audit observations before handover",
        impact: "Material — zero regulatory observation carried into the new CISO tenure",
        severity: 1,
      },
      {
        industry: "GCC SaaS (Dubai)",
        scope: "vCISO 1 day/week + 24×7 IR on-call",
        finding: "Built UAE PDPL + ISO 27001 program from scratch; passed ISO certification within 9 months of engagement",
        impact: "Strategic — unlocked GCC enterprise sales channel previously blocked on certification gap",
        severity: 0,
      },
    ],
    faqs: [
      {
        q: "Who actually does the vCISO work — a junior or a real CISO?",
        a: "A senior practitioner. Macksofy vCISOs are 15–22 years experienced, every one of them has held an in-house CISO or Deputy CISO role at a regulated firm. We do not staff this with junior consultants. You meet the named vCISO before contract sign-off.",
      },
      {
        q: "How many days a week?",
        a: "1, 2 or 4 days/week are standard. 1-day plans suit early-stage startups (governance + policy + board reporting). 4-day plans suit mid-market firms in active regulatory cycles or M&A. We don't sell hourly — the engagement is for outcomes, with time committed up-front.",
      },
      {
        q: "Will the vCISO sit in our office?",
        a: "Hybrid by default — typically 1 day/week on-site (Mumbai · Bengaluru · Delhi NCR · Dubai · Abu Dhabi) plus remote attendance at all leadership and risk-committee meetings. Fully on-site engagements are available for sensitive sectors.",
      },
      {
        q: "Does the vCISO own incident response?",
        a: "Yes — they are your Incident Commander during High / Critical events, work alongside your IT lead, manage breach communications and regulator notifications, and bring in Macksofy DFIR forensics as needed under the same contract.",
      },
      {
        q: "What happens when we're ready to hire a full-time CISO?",
        a: "The vCISO supports the search — writes the JD, interviews shortlist, advises on package, then runs a structured 4–8 week handover. Several Macksofy vCISO engagements end in a recruited full-time CISO; that's a success metric, not a churn risk.",
      },
      {
        q: "Pricing?",
        a: "₹4–18 L per month depending on day-count and seniority. Quote within 48 hours of a discovery call. 12-month minimum.",
      },
    ],
    seoTitle: "Virtual CISO (vCISO) Services India & UAE | Fractional CISO | Macksofy",
    seoDescription:
      "Fractional CISO leadership for fintech, BFSI and SaaS — board reporting, regulator engagement, policy and IR command. India + UAE, from ₹4 L/month.",
    keywords: [
      "virtual CISO India",
      "vCISO India",
      "fractional CISO India",
      "vCISO Mumbai",
      "vCISO Bengaluru",
      "virtual CISO Dubai",
      "vCISO UAE",
      "vCISO fintech India",
      "vCISO SaaS India",
      "CISO as a service India",
    ],
  },

  // 15 — Purple Teaming ----------------------------------------------
  {
    slug: "purple-teaming",
    title: "Purple Team Exercises",
    shortTitle: "Purple Team",
    icon: Combine,
    iconName: "Combine",
    category: "Offensive",
    hero: {
      eyebrow: "Red + Blue · MITRE ATT&CK · Detection Validation",
      tagline: "Test the detection, not just the defence.",
      description:
        "Collaborative red + blue team exercises that validate your detection and response capability against real adversary TTPs — running side-by-side with your SOC analysts so every missed alert becomes a tuned rule before the engagement closes.",
    },
    realWorld:
      "Most red team reports tell you what got missed. A purple team engagement makes sure it stops getting missed. Macksofy red operators execute a MITRE ATT&CK-aligned playbook in agreed phases — initial access, persistence, lateral movement, exfiltration — with your SOC watching live. When a technique slips past detection, we pause, write the rule together, replay, and confirm the alert fires. The output is a tuned SIEM, a measurably hardened MITRE coverage map, and SOC analysts who have seen the attacker's actual tradecraft.",
    businessImpact: [
      "Convert red team findings into shipped detection rules — not next-quarter remediation tickets",
      "Measurable MITRE ATT&CK coverage improvement (baseline → target) with evidence",
      "Train Tier-1 and Tier-2 SOC analysts on real adversary tradecraft, not vendor demos",
      "Build the executive evidence pack: '92 ATT&CK techniques tested, 78 detected, 14 hardened'",
    ],
    methodology: [
      {
        phase: "1 · Pre-engagement",
        activities: [
          "Threat-model intake: industry-relevant APTs and ransomware families",
          "MITRE ATT&CK baseline assessment of current detection coverage",
          "Joint engagement charter signed by red + blue + IT leads",
        ],
      },
      {
        phase: "2 · Phase-by-phase execution",
        activities: [
          "Initial access scenarios (phishing, exposed services, supply-chain)",
          "Execution + persistence + privilege escalation",
          "Lateral movement + credential access",
          "Defense evasion + collection + exfiltration",
          "Each phase: red executes → blue detects/misses → joint tuning → replay",
        ],
      },
      {
        phase: "3 · Detection engineering co-build",
        activities: [
          "Sigma / Splunk / Sentinel / Wazuh rule authoring with your analysts",
          "False-positive tuning against your baseline noise profile",
          "Validation: re-execute technique until the alert fires reliably",
        ],
      },
      {
        phase: "4 · ATT&CK coverage hardening",
        activities: [
          "Coverage map: techniques tested vs. detected vs. blocked vs. tuned",
          "Gap inventory ranked by likelihood + business impact",
          "Quick-win + medium-term hardening roadmap",
        ],
      },
      {
        phase: "5 · Reporting & retest",
        activities: [
          "Executive summary with coverage delta (before / after)",
          "Per-technique writeup: PoC, detection rule shipped, remaining gap",
          "30-day retest of the hardened rule set",
        ],
      },
    ],
    toolStack: [
      "MITRE Caldera",
      "Atomic Red Team",
      "Prelude Operator",
      "Cobalt Strike (RoE-permitting)",
      "Covenant + Sliver",
      "BloodHound",
      "Custom EDR-evasion tooling",
      "Sigma · Splunk SPL · KQL · Wazuh rule editor",
    ],
    industriesServed: [
      "Banking & Financial Services",
      "Fintech & Payments",
      "Insurance & InsurTech",
      "SaaS & Product Companies",
      "Government & PSU",
      "Healthcare & HealthTech",
      "Telecom",
    ],
    deliverables: [
      "MITRE ATT&CK coverage heatmap (before / after)",
      "Per-technique evidence pack (red PoC + blue detection rule shipped)",
      "Tuned Sigma / Splunk / Sentinel / Wazuh rule set",
      "Detection engineering runbook + future-cadence recommendation",
      "Free 30-day retest of the hardened rule set",
      "Executive coverage delta report",
    ],
    caseStudies: [
      {
        industry: "Listed Bank (Mumbai BKC)",
        scope: "5-day on-site purple team across AD + endpoint + email gateway",
        finding: "Lifted ATT&CK coverage from 47% to 71% across 18 techniques; shipped 14 new SIEM rules during the engagement",
        impact: "Material — passed RBI System Audit detection-control test on the same quarter",
        severity: 2,
      },
      {
        industry: "Fintech Lending Platform (Bengaluru)",
        scope: "Phishing → lateral → exfil scenario with managed SOC live in the loop",
        finding: "Discovered that EDR detected the technique but the alert never reached the SOC queue (broken connector) — fixed mid-engagement",
        impact: "Critical — silent detection-pipeline failure that would have hidden a real ransomware precursor",
        severity: 3,
      },
    ],
    faqs: [
      {
        q: "How is this different from a red team engagement?",
        a: "A red team runs covert and reports at the end. A purple team runs collaboratively — red executes a technique, blue tries to detect, we pause and tune together, then replay. The deliverable is shipped detection rules + a hardened MITRE map, not just a list of what got missed.",
      },
      {
        q: "Do we need a SOC for this to work?",
        a: "You need a SIEM + analysts (in-house or MSSP-provided). If you're early-stage, our SOC Setup or MSS engagement makes more sense first; purple teaming is the validate-and-tune step that comes after you have a SOC running.",
      },
      {
        q: "How long does a typical engagement run?",
        a: "5–15 working days. Focused scope (email phishing + AD lateral, for example) is 5 days. Full estate (cloud + endpoint + identity + email) is 10–15. Quote within 48 hours of scoping.",
      },
      {
        q: "Can you run this against our MSSP?",
        a: "Yes — we run purple teaming against client-operated SOCs, MSSP-operated SOCs and hybrid setups. We're tone-neutral about who operates blue; the goal is to leave your detection coverage measurably better.",
      },
    ],
    seoTitle: "Purple Team Exercises India & UAE | MITRE ATT&CK Validation | Macksofy",
    seoDescription:
      "Collaborative purple team exercises that validate detection coverage against MITRE ATT&CK and ship tuned SIEM rules during the engagement. India + UAE.",
    keywords: [
      "purple team India",
      "purple teaming services",
      "MITRE ATT&CK validation India",
      "detection engineering India",
      "red blue purple team Mumbai",
      "purple team Dubai",
      "SIEM rule tuning India",
      "SOC validation services",
    ],
  },

  // 16 — Network Pentesting ------------------------------------------
  {
    slug: "network-pentesting",
    title: "Network Penetration Testing",
    shortTitle: "Network Pentest",
    icon: Network,
    iconName: "Network",
    category: "Offensive",
    hero: {
      eyebrow: "Internal · External · AD · Hybrid Cloud",
      tagline: "Find the path from the perimeter to the domain controller.",
      description:
        "Goal-oriented network penetration testing across your external attack surface, internal segments, Active Directory and cloud-to-on-prem boundaries. We chain misconfigurations, exposed services and credential weaknesses the way a real attacker would — and report so your network team can fix, not just acknowledge.",
    },
    realWorld:
      "A Macksofy network pentest is not a Nessus scan with a logo. We map your external footprint (ASN, DNS, certificate transparency), find the exposed Citrix portal or Confluence instance, get the foothold, kerberoast a service account, run BloodHound, find the over-permissioned admin path, and demonstrate the domain compromise. Then we test segmentation — does compromising the user VLAN actually reach the database tier? We pair the findings with concrete remediation: ACL changes, GPO updates, segmentation rules, EDR exclusions reviewed.",
    businessImpact: [
      "Quantify real network-side risk vs. theoretical CVSS scores",
      "Satisfy CERT-In annual VAPT, RBI System Audit, SEBI CSCRF and ISO 27001 network testing requirements",
      "Validate that segmentation actually segments — not just on paper",
      "De-risk M&A integrations and datacenter migrations",
    ],
    methodology: [
      {
        phase: "1 · External attack surface mapping",
        activities: [
          "ASN, subdomain, certificate transparency, OSINT recon",
          "Exposed service enumeration (VPN, mail, web, API, file-share, RDP)",
          "Cloud-edge attack surface (S3, ALB, exposed buckets, public endpoints)",
        ],
      },
      {
        phase: "2 · External exploitation",
        activities: [
          "Authenticated + unauthenticated scanning (Nessus, Nuclei) with manual triage",
          "Manual exploitation of misconfigurations, default credentials, exposed admin",
          "Phishing as a controlled initial-access vector (RoE-permitting)",
        ],
      },
      {
        phase: "3 · Internal lateral movement",
        activities: [
          "Network reconnaissance and segment mapping",
          "Active Directory enumeration (BloodHound, AdRecon)",
          "Kerberoasting, AS-REP roasting, NTLM relay, ADCS abuse",
          "Lateral movement via WMI, PSExec, WinRM, SSH",
        ],
      },
      {
        phase: "4 · Privilege escalation + domain compromise",
        activities: [
          "Local-admin to domain-admin path discovery",
          "Constrained / unconstrained delegation abuse",
          "Kerberos delegation attacks (Resource-Based, S4U2Self)",
          "Demonstrated DA compromise (read-only by RoE default)",
        ],
      },
      {
        phase: "5 · Segmentation validation",
        activities: [
          "User VLAN → server VLAN reachability testing",
          "DMZ → internal trust path discovery",
          "Cloud → on-prem hybrid trust validation",
          "EDR / IDS bypass attempts within agreed scope",
        ],
      },
      {
        phase: "6 · Reporting & retest",
        activities: [
          "Executive summary with attack-path diagram",
          "Per-finding writeup (CVSS, PoC, remediation snippet)",
          "MITRE ATT&CK TTP mapping",
          "Free retest within 30 days of fix submission",
        ],
      },
    ],
    toolStack: [
      "Nmap",
      "Nessus",
      "Nuclei",
      "Metasploit",
      "BloodHound + SharpHound",
      "CrackMapExec / NetExec",
      "Impacket",
      "Responder + NTLMRelayX",
      "Mimikatz / Rubeus",
      "Hashcat",
      "Custom Macksofy tooling",
    ],
    industriesServed: [
      "Banking & Financial Services",
      "Insurance & InsurTech",
      "Government & PSU",
      "Manufacturing & Energy",
      "Healthcare & HealthTech",
      "Telecom",
      "Retail & E-commerce",
      "SaaS & Product Companies",
    ],
    deliverables: [
      "Executive summary (board-ready, 2–3 pages)",
      "Technical report with CVSS 3.1 scoring and PoC per finding",
      "Attack-path diagram (perimeter → domain compromise)",
      "Segmentation validation matrix",
      "MITRE ATT&CK TTP mapping",
      "Remediation guidance per finding (network-team friendly)",
      "Free retest within 30 days of fix submission",
      "CERT-In / ISO 27001 / SOC 2 compliance letter",
    ],
    caseStudies: [
      {
        industry: "Listed Manufacturer (Pune)",
        scope: "External + internal + AD, 8 sites + DR datacenter",
        finding: "External Citrix → kerberoast → DA in 6 hours via misconfigured constrained delegation",
        impact: "Critical — fixed before next IT-audit cycle, no incident occurred",
        severity: 3,
      },
      {
        industry: "Government Department (Delhi)",
        scope: "Internal pentest of segmented citizen-data network",
        finding: "User VLAN → database VLAN reachable via unfiltered SMB on a forgotten jump-host",
        impact: "High — segmentation gap remediated, MeitY data-localisation control restored",
        severity: 2,
      },
    ],
    faqs: [
      {
        q: "External, internal, or both?",
        a: "Both is the common scope — external proves the perimeter, internal proves what an insider or post-phish attacker can reach. We quote them independently or bundled.",
      },
      {
        q: "Do you actually compromise domain admin or just demonstrate the path?",
        a: "We demonstrate the technique to the point of validated impact, never operationally use it. DA compromise is signalled (e.g., dumping our own canary password hash, not your CFO's) unless explicitly authorised in the RoE.",
      },
      {
        q: "Will it crash production?",
        a: "Network pentesting against modern infrastructure is low-risk if scoped well. We coordinate scan windows with your NOC, avoid known-fragile devices (printers, legacy SCADA), and pause on any operational impact signal.",
      },
    ],
    seoTitle: "Network Penetration Testing India & UAE | External + Internal + AD | Macksofy",
    seoDescription:
      "External + internal + Active Directory network pentest. CERT-In empanelled, OSCP/OSEP operators, MITRE ATT&CK mapped reports. Mumbai, India and UAE.",
    keywords: [
      "network penetration testing India",
      "internal network pentest India",
      "external pentest India",
      "Active Directory pentest India",
      "network VAPT Mumbai",
      "network pentest Dubai",
      "AD security assessment",
      "network pentest CERT-In",
    ],
  },

  // 17 — Wireless Pentesting -----------------------------------------
  {
    slug: "wireless-pentesting",
    title: "Wireless Network Penetration Testing",
    shortTitle: "Wireless Pentest",
    icon: Wifi,
    iconName: "Wifi",
    category: "Offensive",
    hero: {
      eyebrow: "WPA2 / WPA3 · 802.1X · Guest · IoT · Bluetooth",
      tagline: "Find the WiFi that lets the parking lot onto your finance VLAN.",
      description:
        "On-site wireless penetration testing across corporate, guest, IoT, BYOD and Bluetooth attack surfaces. We test WPA2/WPA3-Enterprise authentication, rogue AP scenarios, evil-twin attacks, client-side credential capture and post-association lateral movement into the wired network.",
    },
    realWorld:
      "Wireless is the attack surface most internal pentests skip. A Macksofy wireless engagement walks the site with directional antennas, captures EAP/WPA handshakes, attacks captured handshakes offline, runs evil-twin attacks against employees who roam to the parking-lot SSID, and — when an SSID gets cracked — pivots straight to the corporate VLAN to demonstrate the segmentation gap. We also assess Bluetooth + BLE attack surface (beacons, conference systems, ID badges, IoT) and the 2.4 / 5 / 6 GHz noise floor for rogue APs.",
    businessImpact: [
      "Surface the unauthorised AP in the boardroom that nobody admits installing",
      "Validate that the guest WiFi actually segments from corporate (and not just on paper)",
      "Identify weak PSK / EAP credentials before an attacker in the car-park does",
      "Satisfy CERT-In annual VAPT and PCI-DSS req 11.1 wireless scanning requirements",
    ],
    methodology: [
      {
        phase: "1 · Site survey & passive recon",
        activities: [
          "RF survey of corporate + guest + IoT SSIDs across all floors",
          "Rogue AP discovery (employee-installed, attacker-installed)",
          "Client device profiling (who is connecting where)",
          "Bluetooth / BLE beacon enumeration",
        ],
      },
      {
        phase: "2 · WPA2 / WPA3 attack",
        activities: [
          "EAPOL / 4-way handshake capture",
          "Offline cracking (Hashcat, John, custom wordlists)",
          "WPA3 SAE attack scenarios (Dragonblood-class)",
          "WPS Pixie-Dust where enabled",
        ],
      },
      {
        phase: "3 · 802.1X / EAP attack",
        activities: [
          "EAP method enumeration (PEAP, EAP-TTLS, EAP-TLS)",
          "Certificate validation bypass testing (EAP-PWN-style)",
          "Rogue RADIUS attack (hostapd-wpe) for credential capture",
          "Privilege analysis post-authentication",
        ],
      },
      {
        phase: "4 · Evil-twin & client attacks",
        activities: [
          "Evil-twin AP impersonation",
          "Karma-style auto-connect exploitation",
          "Captive-portal credential phishing (with RoE consent)",
          "Roaming behaviour analysis",
        ],
      },
      {
        phase: "5 · Post-association lateral movement",
        activities: [
          "Once on the WiFi, attempt lateral movement into wired VLANs",
          "Guest → corporate segmentation validation",
          "IoT VLAN → corporate VLAN reachability",
        ],
      },
      {
        phase: "6 · Reporting & retest",
        activities: [
          "Site-by-site report with floor-plan heat maps",
          "Per-finding remediation (RADIUS hardening, certificate pinning, segmentation)",
          "Free retest within 30 days",
        ],
      },
    ],
    toolStack: [
      "Aircrack-ng suite",
      "Bettercap",
      "hostapd-wpe / hostapd-mana",
      "EAPHammer",
      "WiFi Pineapple",
      "Kismet",
      "Wireshark + tshark",
      "Hashcat",
      "Bluetooth: bettercap-ble · gattool · btscanner",
      "Software-Defined Radio (SDR) for Sub-GHz",
    ],
    industriesServed: [
      "Banking & Financial Services",
      "Insurance & InsurTech",
      "Government & PSU",
      "Healthcare & HealthTech",
      "Manufacturing & Energy",
      "Retail & E-commerce",
      "Hospitality",
      "SaaS & Product Companies",
    ],
    deliverables: [
      "Site-by-site wireless coverage + risk heat map",
      "Rogue AP inventory (employee + attacker-installed)",
      "Per-SSID finding writeups (authentication weakness, segmentation, EAP)",
      "Wired-side blast-radius assessment from each cracked SSID",
      "Hardening recommendations: RADIUS, certificate pinning, segmentation, IDS",
      "Free retest within 30 days of fix submission",
      "PCI-DSS req 11.1 evidence pack (if in scope)",
    ],
    caseStudies: [
      {
        industry: "BFSI (Mumbai BKC)",
        scope: "12-floor corporate HQ, all SSIDs + Bluetooth",
        finding: "Evil-twin rogue AP impersonating corporate SSID captured 8 employee credentials; 1 captured certificate would have enabled VPN access from the car-park",
        impact: "Critical — pre-incident discovery; certificate revoked + RADIUS hardened",
        severity: 3,
      },
      {
        industry: "Hospital Group (Bengaluru)",
        scope: "Patient-care WiFi + IoT medical-device WiFi",
        finding: "IoT VLAN allowed lateral movement to HMIS web interface via unfiltered IPv6 neighbour discovery",
        impact: "High — segmentation rule added; HIPAA-aligned exposure closed",
        severity: 2,
      },
    ],
    faqs: [
      {
        q: "Do you need to be on-site?",
        a: "Yes — wireless testing is fundamentally a physical-layer activity. Macksofy operators travel to your site (Mumbai · Delhi NCR · Bengaluru · Hyderabad · Chennai · Pune · Ahmedabad · Dubai · Abu Dhabi) with kit. Remote-assisted scope is possible if you have a trusted local operator, but the bulk of value comes from on-site.",
      },
      {
        q: "Will testing disrupt our WiFi?",
        a: "Active attacks (deauth, evil-twin) can briefly affect connectivity in the targeted area; we coordinate with your IT team to schedule disruptive tests outside business hours. Passive recon and offline cracking are zero-impact.",
      },
      {
        q: "Is Bluetooth / BLE always in scope?",
        a: "Optional — Bluetooth assessment adds 1–2 days per site but surfaces a real attack surface (conference bridges, ID badges, IoT, smart locks). Recommended for sensitive sites; optional for general corporate.",
      },
    ],
    seoTitle: "Wireless Penetration Testing India & UAE | WPA2 / WPA3 / 802.1X | Macksofy",
    seoDescription:
      "On-site wireless pentest — WPA2/WPA3, 802.1X, rogue AP, evil-twin and Bluetooth, with PCI-DSS 11.1 evidence and segmentation validation included.",
    keywords: [
      "wireless penetration testing India",
      "WiFi pentest India",
      "wireless VAPT Mumbai",
      "WPA2 WPA3 audit India",
      "wireless pentest Dubai",
      "rogue AP detection",
      "802.1X security audit",
      "Bluetooth pentest India",
    ],
  },

  // 18 — AI Pentesting -----------------------------------------------
  {
    slug: "ai-pentesting",
    title: "AI / LLM Security Testing",
    shortTitle: "AI Pentest",
    icon: BrainCircuit,
    iconName: "BrainCircuit",
    category: "Offensive",
    hero: {
      eyebrow: "OWASP LLM Top 10 · MITRE ATLAS · MLSecOps",
      tagline: "Test the model. Test the agent. Test the pipeline.",
      description:
        "Security testing for production AI / LLM systems — prompt injection, jailbreaks, data exfiltration via context windows, model supply-chain risks, RAG pipeline poisoning, agentic tool-call abuse and ML training-data integrity. Mapped to OWASP LLM Top 10 and MITRE ATLAS, with deliverables your AI safety team and your CISO both accept.",
    },
    realWorld:
      "AI security is not a generic pentest with the word 'AI' added. A Macksofy AI engagement tests the live model behind your chatbot, the RAG pipeline that retrieves context, the tools your agent can invoke, the training data your fine-tune ingests, and the supply chain (HuggingFace weights, embedding models, vector DBs) underneath. We chain: prompt injection → tool-call abuse → data exfiltration. We test for membership inference, model inversion, and PII leakage from training corpora. And we ship rules — guardrail prompts, output validators, sandboxing patterns — that your platform team can deploy on Monday.",
    businessImpact: [
      "De-risk customer-facing LLM products before regulator or media exposure",
      "Satisfy emerging AI-governance frameworks: EU AI Act, India DPDP Act AI-system controls, NIST AI RMF, ISO/IEC 42001",
      "Catch RAG-pipeline data leakage before it becomes a customer-data incident",
      "Validate agentic systems (function-calling, tool-use, MCP) for unintended actions",
    ],
    methodology: [
      {
        phase: "1 · Threat model & scope",
        activities: [
          "Architecture review: model, RAG, agent tools, fine-tune pipeline, deployment surface",
          "Data-flow review: training data, embeddings, vector store, output channels",
          "Threat model aligned to OWASP LLM Top 10 + MITRE ATLAS",
        ],
      },
      {
        phase: "2 · Prompt injection & jailbreak",
        activities: [
          "Direct + indirect (RAG-borne) prompt injection",
          "Jailbreak technique sweep (DAN, roleplay, encoding, multi-turn)",
          "System-prompt extraction attempts",
          "Output-format hijack (markdown, link, image injection)",
        ],
      },
      {
        phase: "3 · RAG pipeline testing",
        activities: [
          "Indirect prompt injection via poisoned documents in the corpus",
          "Embedding-space attacks (adversarial similar-meaning queries)",
          "Cross-tenant retrieval leakage testing for multi-tenant RAG",
          "Vector-DB access control and authorization review",
        ],
      },
      {
        phase: "4 · Agentic / tool-use abuse",
        activities: [
          "Function-call schema fuzzing",
          "Tool-chain confused-deputy testing (agent invoking privileged tools on user behalf)",
          "MCP server enumeration and abuse",
          "Sandbox escape from code-execution tools",
        ],
      },
      {
        phase: "5 · Training-data + supply chain",
        activities: [
          "Training-data integrity review (poisoning vectors)",
          "Model supply chain (HuggingFace weights, embedding-model provenance)",
          "Membership inference + model inversion testing",
          "PII leakage from training corpus probing",
        ],
      },
      {
        phase: "6 · Guardrail validation",
        activities: [
          "Output-classifier coverage testing (toxicity, PII, secrets, prompt-leak)",
          "Rate-limit + abuse-detection circumvention attempts",
          "Cost-amplification attack scenarios (long-context, tool-loop)",
        ],
      },
      {
        phase: "7 · Reporting & guardrail co-build",
        activities: [
          "Per-finding writeup with reproducer prompt",
          "Suggested guardrail prompt + output-validator rule",
          "Free retest of guardrails within 30 days",
        ],
      },
    ],
    toolStack: [
      "PyRIT (Microsoft AI red-teaming)",
      "Garak (LLM vulnerability scanner)",
      "promptfoo (regression + eval)",
      "LLM Guard / Lakera Guard / Guardrails AI",
      "Custom Macksofy prompt-injection corpus",
      "MITRE ATLAS technique playbooks",
      "OpenAI Evals + Inspect AI",
    ],
    industriesServed: [
      "SaaS & Product Companies",
      "Fintech & Payments",
      "Banking & Financial Services",
      "Healthcare & HealthTech",
      "EdTech",
      "Government & PSU",
      "E-commerce & D2C",
      "Series-A to Series-D startups",
    ],
    deliverables: [
      "OWASP LLM Top 10 + MITRE ATLAS findings inventory",
      "Reproducer prompts for every finding (copy-pasteable)",
      "Recommended guardrail prompts + output-validator rules",
      "RAG pipeline + vector-store hardening checklist",
      "Agent tool-use sandboxing patterns",
      "Training-data integrity + supply-chain risk register",
      "Free retest within 30 days of guardrail deployment",
    ],
    caseStudies: [
      {
        industry: "Fintech Chatbot SaaS (Bengaluru)",
        scope: "Customer-facing GPT-4o-powered support agent + RAG over support docs",
        finding: "Indirect prompt injection via a poisoned support article let an attacker exfiltrate other tenants' chat history via the agent's retrieval tool",
        impact: "Critical — patched via guardrail prompt + retrieval-tenancy enforcement; cross-tenant leakage closed before launch",
        severity: 3,
      },
      {
        industry: "HealthTech Triage Bot (Mumbai)",
        scope: "Patient-symptom triage LLM with EMR tool-call access",
        finding: "Tool-call confused-deputy: a craftily-phrased patient prompt caused the agent to retrieve another patient's record via the EMR lookup tool",
        impact: "Critical — authz enforced at the tool layer not the agent layer; remediated before clinical rollout",
        severity: 3,
      },
    ],
    faqs: [
      {
        q: "Do you test foundation models or only our application?",
        a: "Both layers. Foundation-model behaviour (jailbreak resistance, refusal patterns) is part of the assessment, but the highest-impact findings usually live in your application layer — the RAG pipeline, the agent tools, the guardrails. We test the full stack.",
      },
      {
        q: "Which models do you cover?",
        a: "OpenAI (GPT), Anthropic (Claude), Google (Gemini), Meta (Llama), Mistral, open-source via vLLM / Ollama, and custom fine-tunes. Provider-agnostic and version-agnostic — we test whichever models and versions you actually ship.",
      },
      {
        q: "Is this just prompt-injection testing?",
        a: "No — prompt injection is one of seven phases. The high-impact engagements typically uncover issues in RAG tenancy, agentic tool-use authorization, training-data leakage, or supply-chain trust (e.g. embedding model from an unknown HuggingFace org).",
      },
      {
        q: "Can you also test our MCP servers?",
        a: "Yes — MCP server security is a fast-growing engagement type. We enumerate exposed tools, fuzz parameters, test authorization boundaries and look for confused-deputy patterns where the agent invokes privileged MCP tools on the user's behalf.",
      },
    ],
    seoTitle: "AI / LLM Penetration Testing India & UAE | OWASP LLM Top 10 + MITRE ATLAS | Macksofy",
    seoDescription:
      "Security testing for LLM apps, RAG pipelines, AI agents and MCP servers — OWASP LLM Top 10 and MITRE ATLAS aligned. Prompt injection, tool-use abuse.",
    keywords: [
      "AI penetration testing India",
      "LLM security testing India",
      "AI red teaming India",
      "prompt injection testing",
      "OWASP LLM Top 10 audit",
      "MITRE ATLAS assessment",
      "RAG security testing",
      "AI security audit Mumbai",
      "LLM security Dubai",
      "MCP server pentest",
    ],
  },

  // 19 — Staffing Service --------------------------------------------
  {
    slug: "staffing-service",
    title: "Cybersecurity Staffing & Resource Augmentation",
    shortTitle: "Staffing",
    icon: Users,
    iconName: "Users",
    category: "Managed Services",
    hero: {
      eyebrow: "L1–L4 SOC · Pentest · GRC · DFIR · vCISO Pool",
      tagline: "Plug Macksofy people into your team — same week, vetted, deployable.",
      description:
        "Contract, contract-to-hire and managed-pool staffing for SOC analysts (L1–L4), penetration testers (OSCP+), GRC consultants (ISO 27001 / SOC 2 LA), DFIR responders and fractional CISOs. Bench depth lets us deploy in 5–10 working days, not the 90-day hiring cycle.",
    },
    realWorld:
      "Cybersecurity hiring in India and the GCC takes 60–120 days, and the candidates who pass technical screens take another 4-week notice period. Macksofy maintains a vetted bench: ~80 SOC analysts (Wazuh + ELK + Splunk + Sentinel experience), ~25 OSCP-certified pentesters, ~15 OSCP+/OSWE/OSEP-certified senior consultants, ~12 ISO 27001 Lead Auditors, and ~6 fractional CISOs. We deploy under your management, on your tooling, with our QA layer behind them. Roll-on, roll-off, or convert-to-direct hire — all three contracts available.",
    businessImpact: [
      "5–10 working day deployment vs. 60–120 day in-house hiring cycle",
      "Roll-on / roll-off model for surge capacity (audit season, M&A diligence, incident response)",
      "Contract-to-hire option converts to your direct payroll after 6 months with no placement fee",
      "Macksofy QA layer (peer review + cadence) behind every deployed resource — not the body-shopping model",
    ],
    methodology: [
      {
        phase: "1 · Discovery & scoping",
        activities: [
          "Skill matrix + clearance requirements intake",
          "Tooling / environment + shift / location requirements",
          "Engagement model: contract · contract-to-hire · managed pool",
        ],
      },
      {
        phase: "2 · Candidate match",
        activities: [
          "3–5 candidates shortlisted from bench within 5 working days",
          "CV pack + Macksofy internal evaluation scorecards",
          "Client technical + culture interviews scheduled inside the same week",
        ],
      },
      {
        phase: "3 · Onboarding & deployment",
        activities: [
          "NDA + access provisioning checklist",
          "Macksofy senior buddy assigned for first 30 days",
          "Tooling familiarisation + your runbook handover",
        ],
      },
      {
        phase: "4 · Quality assurance",
        activities: [
          "Weekly cadence with Macksofy delivery manager",
          "Monthly performance review with client lead",
          "Peer review of deliverables (rule writes, reports, RCAs)",
        ],
      },
      {
        phase: "5 · Lifecycle management",
        activities: [
          "Backfill within 5 working days if a resource exits",
          "Convert-to-hire pathway at 6 months (no placement fee)",
          "Knowledge-transfer pack on roll-off",
        ],
      },
    ],
    toolStack: [
      "Bench skills: Wazuh · ELK · Splunk · Sentinel · CrowdStrike · SentinelOne · Defender XDR",
      "Pentest: Burp Pro · Metasploit · BloodHound · Cobalt Strike",
      "GRC: ISO 27001 · SOC 2 · CERT-In · RBI · SEBI · PCI-DSS · HIPAA · GDPR · DPDP",
      "DFIR: Volatility · Velociraptor · Plaso · X-Ways",
      "Cloud: AWS · Azure · GCP security specialists",
    ],
    industriesServed: [
      "Banking & Financial Services",
      "Fintech & Payments",
      "Insurance & InsurTech",
      "SaaS & Product Companies",
      "Healthcare & HealthTech",
      "Manufacturing & Energy",
      "Government & PSU",
      "Big-4 audit firm subcontracting",
    ],
    deliverables: [
      "Resource deployed in 5–10 working days from contract sign",
      "Macksofy delivery manager + senior buddy attached for first 30 days",
      "Weekly cadence + monthly performance review with client lead",
      "Backfill SLA: 5 working days if resource exits",
      "Convert-to-hire pathway at 6 months — no placement fee",
      "Knowledge-transfer pack on roll-off",
    ],
    caseStudies: [
      {
        industry: "Big-4 Consulting Firm (Mumbai)",
        scope: "30-day surge: 8 OSCP pentesters for BFSI client engagement",
        finding: "All 8 deployed inside 7 working days; engagement closed 2 weeks ahead of schedule",
        impact: "Strategic — won follow-on framework deal at the same Big-4",
        severity: 0,
      },
      {
        industry: "Listed Insurance MNC (Mumbai BKC)",
        scope: "12-month contract-to-hire: 4 L2 SOC analysts",
        finding: "3 of 4 converted to direct hire at month 6; 4th rolled into Macksofy MSS",
        impact: "Material — bridged 90-day hiring gap without disrupting 24×7 cover",
        severity: 0,
      },
    ],
    faqs: [
      {
        q: "Is this body-shopping or managed deployment?",
        a: "Managed deployment. Every deployed resource has a Macksofy delivery manager attached, a senior buddy for the first 30 days, and a peer-review layer for deliverables. You get the productivity of an in-house hire with a quality net behind them.",
      },
      {
        q: "What's the typical cost vs. in-house?",
        a: "Contract rates are 1.15–1.35× a fully-loaded equivalent in-house FTE (depending on seniority and clearance) — the premium covers Macksofy's bench, QA, training and backfill SLA. Most clients find it cheaper than the hire-then-retrain cycle when you factor in time-to-productivity.",
      },
      {
        q: "Can we go to direct hire later?",
        a: "Yes — convert-to-hire at month 6 with no placement fee is the standard option. Earlier conversion is possible with a buy-out (typically equivalent to 1 month's billing).",
      },
      {
        q: "What clearances and certifications are on the bench?",
        a: "OSCP, OSCP+, OSWE, OSEP, OSED, CRTP, CRTO, CISSP, ISO 27001 LA, SOC 2 PSAC, CEH, Splunk certified, AWS / Azure / GCP security specialty, CHFI, GCFA, GREM. Indian PoS clearance available for government engagements; UAE PCC available for GCC deployments.",
      },
      {
        q: "Can you support a 24×7 SOC pod?",
        a: "Yes — multi-shift SOC pods (2 analysts × 4 shifts × 6 days, etc.) are a common engagement model. Roster management + leave coverage is Macksofy's responsibility, not yours.",
      },
    ],
    seoTitle: "Cybersecurity Staffing & Resource Augmentation India & UAE | OSCP + SOC Bench | Macksofy",
    seoDescription:
      "A vetted cybersecurity contractor pool — SOC L1–L4, OSCP+ pentesters, ISO 27001 LA, DFIR and vCISO, deployed in 5–10 days. India + UAE.",
    keywords: [
      "cybersecurity staffing India",
      "SOC analyst staffing India",
      "OSCP pentester contract India",
      "GRC consultant staffing",
      "DFIR contractor India",
      "security resource augmentation",
      "contract pentester India",
      "cybersecurity staff augmentation Dubai",
      "ISO 27001 LA contractor India",
    ],
  },

  // 22 — Identity Security & Zero Trust ---------------------------------
  {
    slug: "identity-security-zero-trust",
    title: "Identity Security & Zero Trust",
    shortTitle: "Identity & ZT",
    icon: UserCog,
    iconName: "UserCog",
    category: "Defensive",
    hero: {
      eyebrow: "IAM · PAM · SSO · Zero Trust Architecture",
      tagline: "Identity is the new perimeter. Audit it like one.",
      description:
        "End-to-end identity security: IAM topology review, privileged-access (PAM) tightening, SSO / OIDC / SAML hardening, conditional-access design and a phased Zero Trust roadmap mapped to NIST SP 800-207 and India's CERT-In + DPDP authentication expectations.",
    },
    realWorld:
      "Most Indian enterprises run a sprawl of identity systems — on-prem Active Directory still authoritative, Entra ID syncing a partial estate, Okta or Azure AD federating SaaS, three separate PAM tools owned by three different teams, and ~40% of admin accounts shared. Macksofy enumerates every authentication boundary, maps lateral-movement paths from a phished user to crown jewels, and ships a 90-day plan that closes the worst paths first — phishing-resistant MFA on tier-0, JIT for break-glass, RBAC consolidation, and a measured Zero Trust rollout that survives contact with the change-advisory-board.",
    businessImpact: [
      "Phishing-resistant MFA on tier-0 and admin populations",
      "Cut blast radius — kill standing privilege, enforce JIT/JEA",
      "Pass RBI / SEBI / DPDP authentication evidence asks on first pass",
      "Reduce identity-related audit findings to near-zero within one cycle",
      "Cost-rationalise overlapping IAM/PAM tooling",
    ],
    methodology: [
      {
        phase: "1 · Identity inventory",
        activities: [
          "Enumerate every IdP, directory, federation and break-glass account",
          "Crowdsource shadow-IAM via SaaS SSO logs + finance procurement data",
          "Tier-0 / Tier-1 / Tier-2 classification of human + service identities",
          "Privileged-account census — domain, cloud, app and DB admins",
        ],
      },
      {
        phase: "2 · Attack-path mapping",
        activities: [
          "BloodHound + Azure AD attack-path enumeration",
          "Kerberoasting, AS-REP, ACL-abuse and constrained-delegation review",
          "Cloud lateral movement — IAM trust policies, role chaining, secrets",
          "SaaS-to-SaaS OAuth scope abuse and stale grants",
        ],
      },
      {
        phase: "3 · Zero Trust architecture",
        activities: [
          "Trust-boundary diagram aligned to NIST 800-207 + CISA ZTMM",
          "Conditional access policy design (Entra ID / Okta / Ping)",
          "Phishing-resistant MFA rollout plan — FIDO2 / passkeys / certificate-based",
          "Microsegmentation design for east-west traffic",
        ],
      },
      {
        phase: "4 · PAM tightening",
        activities: [
          "Vault rationalisation across CyberArk / Delinea / HashiCorp Vault",
          "JIT / JEA workflows; break-glass with dual-control + alerting",
          "Service-account rotation, password-less wherever possible",
          "Privileged session recording + UEBA alerting",
        ],
      },
      {
        phase: "5 · Roadmap & evidence",
        activities: [
          "90-day quick wins backlog + 12-month maturity plan",
          "RBI / SEBI / DPDP authentication-evidence pack",
          "Quarterly red-team identity validation (optional retainer)",
          "Board-level metrics: standing-privilege count, MFA coverage, JIT %",
        ],
      },
    ],
    toolStack: [
      "BloodHound CE / Enterprise",
      "PingCastle",
      "ROADrecon",
      "Microsoft Entra ID / Azure AD",
      "Okta",
      "Ping Identity",
      "CyberArk",
      "Delinea Secret Server",
      "HashiCorp Vault",
      "Sailpoint",
      "Saviynt",
    ],
    industriesServed: [
      "BFSI (RBI / SEBI / IRDAI authentication evidence)",
      "Fintech, payment aggregators (RBI PA-PG)",
      "SaaS / product (SOC 2 CC6 controls)",
      "Healthcare (ADHICS / HIPAA access control)",
      "Manufacturing / OT (IEC 62443 SR 1.1–1.13 identification & authentication)",
      "Government / PSU (CERT-In RBAC + privileged-access audit)",
    ],
    deliverables: [
      "Identity inventory + tiering memo",
      "Attack-path map with prioritised closure backlog",
      "Zero Trust target-state architecture diagram + 12-month roadmap",
      "PAM tightening plan with vault-by-vault remediation tasks",
      "Phishing-resistant MFA rollout playbook for tier-0",
      "Regulator-mapped authentication evidence pack",
    ],
    caseStudies: [
      {
        industry: "Listed Bank",
        scope: "Tier-0 path mapping + PAM consolidation",
        finding: "Kerberoastable tier-0 service account + dormant CyberArk safes with 100+ unused admins",
        impact: "Standing privilege cut 78% in 60 days; clean RBI inspection",
        severity: 3,
      },
      {
        industry: "B2B SaaS",
        scope: "Zero Trust architecture for SOC 2 + EU customers",
        finding: "Public-app to admin-app lateral path via shared OAuth client",
        impact: "Split-tenant identity model shipped pre-Series-C diligence",
        severity: 2,
      },
      {
        industry: "Pharma manufacturer",
        scope: "IT-OT identity boundary for IEC 62443",
        finding: "OT engineering laptops domain-joined to IT AD; flat trust",
        impact: "Dedicated OT realm + jump-host model; USFDA-PAI ready",
        severity: 2,
      },
    ],
    faqs: [
      {
        q: "Is this a tool implementation or an assessment?",
        a: "Both — we start with assessment + architecture (no tool bias), then optionally help implement. Macksofy is vendor-neutral; CyberArk, Delinea, HashiCorp Vault, Sailpoint and Saviynt are all in our delivery toolkit.",
      },
      {
        q: "How do you handle hybrid AD + Entra ID environments?",
        a: "Hybrid is the norm in India. We enumerate the sync boundary (AAD Connect / Cloud Sync), find privilege leaks across it (e.g., on-prem admin → cloud Global Admin), and design tier-0 isolation on both sides.",
      },
      {
        q: "Can you map findings to RBI / SEBI / DPDP?",
        a: "Yes. Every finding is mapped to RBI Cyber Security Framework, SEBI CSCRF authentication controls, DPDP §8 reasonable-security-practices, and ISO 27001:2022 A.5.15 / A.5.16 / A.5.17 / A.8.5.",
      },
      {
        q: "What's the typical timeline?",
        a: "8–12 weeks for assessment + Zero Trust roadmap on a ~5,000-identity estate. PAM-only tightening: 4–6 weeks. Full multi-year ZT execution is a retainer model.",
      },
      {
        q: "Do you do phishing-resistant MFA rollout?",
        a: "Yes — FIDO2 / passkey / certificate-based MFA design and phased rollout, including the awkward bits (legacy MFA, helpdesk reset paths, contractor access, third-party vendor identities).",
      },
    ],
    seoTitle: "Identity Security & Zero Trust India | IAM PAM Audit | Macksofy",
    seoDescription:
      "IAM audit, PAM tightening and Zero Trust roadmap for Indian BFSI, SaaS, healthcare and OT. NIST 800-207 + CERT-In + DPDP authentication evidence.",
    keywords: [
      "Zero Trust India",
      "IAM audit India",
      "PAM consulting India",
      "Active Directory security assessment",
      "BloodHound assessment India",
      "Entra ID security audit",
      "Okta security review",
      "CyberArk consulting India",
      "phishing-resistant MFA rollout",
      "RBI authentication controls",
      "SEBI CSCRF identity",
      "DPDP authentication evidence",
      "Zero Trust architecture Mumbai",
    ],
  },

  // 23 — Network Security Architecture & Segmentation -------------------
  {
    slug: "network-security-architecture",
    title: "Network Security Architecture & Segmentation",
    shortTitle: "Network Security",
    icon: Network,
    iconName: "Network",
    category: "Defensive",
    hero: {
      eyebrow: "Segmentation · Firewall Review · SASE · Microsegmentation",
      tagline: "Stop east-west blast radius before the next ransomware does.",
      description:
        "Defensive network engineering — segmentation strategy, firewall rule-base reviews, SASE / ZTNA design, OT-IT boundary architecture and microsegmentation roadmaps that survive procurement and the change-advisory-board. Distinct from our network-pentesting service: this is design and review, not exploitation.",
    },
    realWorld:
      "Indian enterprise networks accrete. Two acquisitions later, the firewall rule base has 12,000 rules, half of them ANY-ANY-ANY, with comments like 'temporary - 2018'. A typical Macksofy engagement starts with a rule-base cleanup that drops 35–50% of dead rules without breaking a single application, then layers segmentation by trust zone — corporate, OT, DMZ, PCI, tier-0 — with documented exceptions. We close with a microsegmentation roadmap (NSX / Illumio / Cisco ACI / native cloud) that gives the SOC a fighting chance during the next ransomware blast.",
    businessImpact: [
      "Eliminate flat-network lateral movement during incidents",
      "Pass RBI / SEBI / ISO / PCI segmentation evidence asks",
      "Cut firewall change-failure rate; recover engineering velocity",
      "Reduce attack surface visible to compromised endpoints",
      "Future-proof against board-level ransomware scenario asks",
    ],
    methodology: [
      {
        phase: "1 · Topology + asset discovery",
        activities: [
          "Passive discovery (NetFlow, sFlow, span ports) — no agents required",
          "Active discovery where allowed (Nmap, Forescout, native cloud)",
          "Trust-zone classification — tier-0 / OT / PCI / DMZ / corporate",
          "Crown-jewel mapping with business + data-flow owners",
        ],
      },
      {
        phase: "2 · Firewall + rule-base review",
        activities: [
          "Multi-vendor rule analysis (Palo Alto, Check Point, Fortinet, Cisco, Juniper)",
          "Dead rule + shadowed rule + overly-permissive rule identification",
          "Object cleanup + zone-based rebase plan",
          "Risk-ranked rule-by-rule remediation with rollback windows",
        ],
      },
      {
        phase: "3 · Segmentation strategy",
        activities: [
          "Target-state segmentation map per trust zone",
          "OT / ICS demarcation per IEC 62443-3-2 zones & conduits",
          "PCI cardholder-data-environment boundary memo",
          "Vendor-network and BYOD isolation design",
        ],
      },
      {
        phase: "4 · SASE / ZTNA / microsegmentation",
        activities: [
          "SASE vendor short-list (Zscaler, Netskope, Cisco, Palo Alto Prisma)",
          "ZTNA design for remote + branch + third-party",
          "Microsegmentation tool short-list (Illumio, Akamai Guardicore, NSX, native cloud)",
          "Phased rollout plan that survives a 12-month CAB calendar",
        ],
      },
      {
        phase: "5 · Evidence + handover",
        activities: [
          "Regulator-mapped segmentation evidence pack (RBI / SEBI / ISO / PCI)",
          "Network architecture diagram suite — current vs target",
          "Change-management playbook + rollback-tested templates",
          "Optional 90-day quarterly drift audit (retainer)",
        ],
      },
    ],
    toolStack: [
      "Nmap",
      "Forescout",
      "Tufin",
      "AlgoSec",
      "FireMon",
      "Skybox",
      "Cisco DNA / ACI",
      "Palo Alto Panorama",
      "VMware NSX",
      "Illumio",
      "Akamai Guardicore",
      "Zscaler / Netskope",
    ],
    industriesServed: [
      "BFSI (RBI Cyber Security Framework network controls)",
      "Manufacturing / OT (IEC 62443 zones & conduits)",
      "Healthcare (ADHICS / HIPAA network safeguards)",
      "Payment processors (PCI-DSS 1.x scoping)",
      "SaaS / data-centre tenants (multi-tenant isolation)",
      "Government / PSU (CERT-In network architecture audit)",
    ],
    deliverables: [
      "Network topology + trust-zone map (current state)",
      "Firewall rule-base cleanup plan with risk-ranked actions",
      "Target-state segmentation architecture + diagrams",
      "SASE / ZTNA / microsegmentation vendor short-list memo",
      "12-month phased rollout plan with CAB-aware change windows",
      "Regulator-mapped segmentation evidence pack",
    ],
    caseStudies: [
      {
        industry: "Multinational Bank",
        scope: "12,000-rule firewall cleanup + zone rebase",
        finding: "47% rules dead or shadowed; tier-0 reachable from BYOD VLAN",
        impact: "Rule count to 6,400 with zero outage; RBI inspection clean",
        severity: 3,
      },
      {
        industry: "Pharma manufacturer (USFDA-regulated)",
        scope: "IT-OT segmentation per IEC 62443",
        finding: "Engineering workstation in same VLAN as plant historian",
        impact: "Zone & conduit redesign; USFDA pre-approval inspection ready",
        severity: 3,
      },
      {
        industry: "Payment aggregator",
        scope: "PCI-DSS 1.x CDE scoping + microsegmentation pilot",
        finding: "CDE not properly isolated; sandbox env reachable from CDE",
        impact: "CDE blast radius reduced 80%; QSA pass on first attempt",
        severity: 3,
      },
    ],
    faqs: [
      {
        q: "How is this different from your network-pentesting service?",
        a: "Network-pentesting is offensive — we attack your existing network and report findings. This service is defensive — we design segmentation, review firewall rule bases, and roadmap microsegmentation. Many clients buy both; the pentest validates the architecture work.",
      },
      {
        q: "Do you work with a specific firewall vendor?",
        a: "No — vendor neutral. We hold delivery experience across Palo Alto, Check Point, Fortinet, Cisco ASA / FTD, Juniper SRX, and the native cloud security groups (AWS, Azure, GCP).",
      },
      {
        q: "Can you handle OT segmentation?",
        a: "Yes — IEC 62443-3-2 zones & conduits, plus the practical realities of Indian manufacturing (legacy PLCs, vendor-mandated flat networks, engineering laptop hygiene). We've delivered this for pharma, automotive and process industries.",
      },
      {
        q: "What's the typical engagement size?",
        a: "Rule-base review only: 3–4 weeks. Full segmentation architecture for a ~3,000-host estate: 8–10 weeks. Microsegmentation pilot + 12-month rollout plan: 12 weeks for design, then a retainer.",
      },
      {
        q: "Do you stay through implementation?",
        a: "Optional. We can hand-over to your network engineering team, or stay as architecture advisors during a phased rollout. We do not resell firewall licences — neutrality matters.",
      },
    ],
    seoTitle: "Network Security Architecture & Segmentation India | Macksofy",
    seoDescription:
      "Firewall rule-base review, segmentation strategy, SASE / ZTNA design and IEC 62443 OT zoning for Indian BFSI, manufacturing, healthcare and payments.",
    keywords: [
      "network segmentation India",
      "firewall rule review India",
      "SASE architecture India",
      "ZTNA design India",
      "microsegmentation consulting India",
      "IEC 62443 OT segmentation",
      "RBI network security framework",
      "PCI-DSS CDE segmentation",
      "Cisco ACI consulting India",
      "VMware NSX consulting India",
      "Illumio India",
      "Palo Alto firewall review",
      "network architecture audit Mumbai",
    ],
  },

  // 24 — Phishing Simulation & Awareness Programmes ---------------------
  {
    slug: "phishing-simulation",
    title: "Phishing Simulation & Awareness",
    shortTitle: "Phishing Sim",
    icon: Fish,
    iconName: "Fish",
    category: "Managed Services",
    hero: {
      eyebrow: "Targeted campaigns · Click-rate metrics · Repeat-offender coaching",
      tagline: "Train the human firewall against the threats actually hitting India.",
      description:
        "Realistic phishing-simulation programmes calibrated to Indian-context lures — UPI fraud pretexts, GST refund spoofs, payroll-portal redirects, vendor-invoice BEC. Quarterly cadence with role-segmented templates, click-rate benchmarks, and just-in-time coaching for repeat clickers.",
    },
    realWorld:
      "Phishing is still the #1 initial-access vector for ransomware and BEC in India, but the off-the-shelf international templates miss the Indian context — your accounts team will click an HSBC London invoice once, but they'll click a GSTN refund-credit lure every Tuesday. Macksofy runs the simulation from our own GoPhish-based lab so payloads stay in-scope (no third-party processor exposure), templates are written for Indian regulators (CBDT, GSTN, EPFO, RBI circulars, BSE / NSE notices) and the post-campaign coaching is delivered in Hindi / English / regional language as required.",
    businessImpact: [
      "Cut click-through rate from industry-baseline 15-22% to <5% within 4 quarters",
      "Identify repeat-clicker populations needing targeted coaching",
      "Build evidence pack for SEBI / RBI / ISO 27001 awareness-control requirements",
      "Reduce successful BEC + ransomware initial-access incidents",
      "Quantify human-risk metric for board-level dashboards",
    ],
    methodology: [
      {
        phase: "1 · Baseline + scoping",
        activities: [
          "Email-environment review (M365 / Workspace, MTA, gateway, DMARC posture)",
          "Workforce segmentation by role + risk tier (finance, HR, engineering, exec)",
          "Lure-library calibration to client industry + India regulatory context",
          "Allow-list set-up with mail-security vendor (Proofpoint, Mimecast, ATP)",
        ],
      },
      {
        phase: "2 · Campaign design",
        activities: [
          "Pretext selection — GST refund, UPI alert, payroll, vendor BEC, internal IT",
          "Landing page design (credential capture, attachment, MFA-fatigue, OAuth grant)",
          "Difficulty tiering — easy / medium / hard / spear",
          "Schedule + send-window with global / regional timezone awareness",
        ],
      },
      {
        phase: "3 · Execution + telemetry",
        activities: [
          "Phased send-out from Macksofy's GoPhish-based platform",
          "Real-time click, credential-entry, attachment-open, MFA-grant tracking",
          "Reporter-button telemetry (positive behaviour signal)",
          "Immediate just-in-time microlearning for clickers (60s screen)",
        ],
      },
      {
        phase: "4 · Coaching + remediation",
        activities: [
          "Role-segmented post-campaign report with click-rate benchmarking",
          "Repeat-offender list + 1:1 coaching path (or HR escalation)",
          "Manager-tier dashboards for line-of-business owners",
          "Awareness-content refresh: short videos, posters, intranet articles",
        ],
      },
      {
        phase: "5 · Quarterly cadence + reporting",
        activities: [
          "Quarterly campaign with rotating pretexts (avoid pattern adaptation)",
          "Trendline dashboards — click-rate, report-rate, time-to-report",
          "ISO 27001 A.6.3 / SEBI / RBI evidence pack",
          "Annual exec readout with industry-benchmark comparison",
        ],
      },
    ],
    toolStack: [
      "GoPhish (Macksofy-hosted)",
      "Macksofy Phishing-Sim Lab (in-house)",
      "Microsoft Defender for O365 allow-list",
      "Proofpoint / Mimecast integration",
      "KnowBe4 (optional content library)",
      "Cofense PhishMe (reporter button)",
      "Custom Indian lure templates (CBDT / GSTN / EPFO / RBI / NSE / BSE)",
    ],
    industriesServed: [
      "BFSI (RBI / SEBI / IRDAI awareness controls)",
      "Fintech & payment aggregators (RBI PA-PG)",
      "SaaS / product (SOC 2 CC1.4 + ISO A.6.3)",
      "Manufacturing (ransomware initial-access reduction)",
      "Healthcare (ADHICS / HIPAA workforce-training requirement)",
      "Government / PSU (CERT-In awareness mandates)",
    ],
    deliverables: [
      "Campaign design pack + lure-library selections",
      "Per-campaign telemetry report (click / credential / MFA / report)",
      "Repeat-offender list + coaching plan",
      "Quarterly trendline + benchmark report",
      "ISO / SEBI / RBI awareness-evidence pack",
      "Annual exec dashboard with year-over-year human-risk metric",
    ],
    caseStudies: [
      {
        industry: "Listed NBFC",
        scope: "Quarterly phishing-sim across 4,200 staff, 4 quarters",
        finding: "Q1 click-rate 19%; finance & ops teams 28%",
        impact: "Q4 click-rate 4.1%; SEBI awareness-control evidence passed first-pass",
        severity: 2,
      },
      {
        industry: "B2B SaaS (Series C)",
        scope: "Pre-SOC 2 Type II awareness baseline + 2 quarters",
        finding: "Engineering grade tier showed 23% click on internal-IT lures",
        impact: "Q2 click-rate to 6%; SOC 2 CC1.4 + ISO A.6.3 evidence cleared",
        severity: 2,
      },
      {
        industry: "Pharma manufacturer",
        scope: "Plant-floor + corporate awareness for ransomware-readiness",
        finding: "Plant-engineer population had 31% click on vendor-portal lure",
        impact: "Targeted local-language coaching; click-rate to 8% in 6 months",
        severity: 2,
      },
    ],
    faqs: [
      {
        q: "Why a Macksofy programme vs an off-the-shelf KnowBe4 subscription?",
        a: "Off-the-shelf libraries are 80% US/EU lures (DocuSign, Amazon Prime, HR portal). Macksofy templates are built for Indian context — GST refunds, EPFO notices, RBI circulars, NSE/BSE compliance notes — which is what your staff actually fall for. We can also operate alongside an existing KnowBe4 if you want both.",
      },
      {
        q: "Is the platform hosted in India?",
        a: "Yes — Macksofy's GoPhish-based platform is hosted in our India infrastructure. No client PII, mail content or click telemetry leaves Indian jurisdiction, which simplifies DPDP §16 and CERT-In data-residency posture.",
      },
      {
        q: "What if our existing mail security blocks the simulation emails?",
        a: "We set up the allow-list with your mail-security vendor (Defender for O365, Proofpoint, Mimecast, Cisco) as part of phase 1 scoping. Standard setup takes 1-2 days and is reversible.",
      },
      {
        q: "How do you handle repeat clickers without it becoming punitive?",
        a: "First two clicks — just-in-time 60-second microlearning, no escalation. Third click — 1:1 coaching with their manager + Macksofy. Fourth-plus — HR escalation path if your policy demands it. We document, you decide on enforcement.",
      },
      {
        q: "Can you also run targeted spear-phishing tests for the C-suite?",
        a: "Yes — bespoke spear-phishing campaigns against pre-agreed exec / board / CFO / CISO targets using OSINT-derived pretexts. Engagement runs under a separate written authorisation; results are CISO-only by default.",
      },
    ],
    seoTitle: "Phishing Simulation Services India | BFSI BEC Awareness | Macksofy",
    seoDescription:
      "India-context phishing simulation (GST, UPI, EPFO, RBI lures), quarterly campaigns, repeat-clicker coaching and SEBI / ISO 27001 awareness evidence.",
    keywords: [
      "phishing simulation India",
      "phishing awareness training India",
      "BEC simulation India",
      "GoPhish India",
      "spear phishing test India",
      "security awareness programme India",
      "phishing test BFSI",
      "phishing test SEBI compliance",
      "phishing simulation Mumbai",
      "phishing awareness Dubai",
      "human-risk metric India",
      "ISO 27001 awareness evidence",
      "RBI awareness control",
    ],
  },
];

export const getServiceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
