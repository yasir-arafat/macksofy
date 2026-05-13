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
} from "lucide-react";

export interface CaseStudy {
  industry: string;
  scope: string;
  finding: string;
  impact: string;
  severity: 0 | 1 | 2 | 3;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  icon: LucideIcon;
  iconName: string;
  category: "Offensive" | "Defensive" | "Compliance Adjacent";
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
    category: "Defensive",
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
        a: "Yes. React/Vue/Angular SPAs hide a lot of attack surface in JS bundles — we extract route maps from the bundle, instrument the runtime in DevTools, and test the API as it&rsquo;s called from the SPA so server-side issues don&rsquo;t hide behind client validation.",
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
        "Dedicated API security testing for REST, GraphQL and gRPC surfaces. BOLA, BFLA, mass-assignment, JWT and OAuth server-side flows, rate-limit and resource-consumption abuse, GraphQL introspection and depth attacks — by OSWE-certified consultants who treat the API as the product, not the website&rsquo;s backend.",
    },
    realWorld:
      "Modern breaches don&rsquo;t happen at the website. They happen at the API the mobile app, the SPA and the partner integration all call. BOLA across tenants, mass-assignment that elevates a regular user to admin, JWT alg=none accepted in production, OAuth flows where one parameter swap rewrites the redirect to an attacker domain — these are the findings that move regulators, and they live below the login form, not above it.",
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
        a: "Helpful but not required. With a spec we&rsquo;re faster; without one we run discovery + fuzzing + traffic capture to build the inventory. Black-box is supported and matches the public attacker view.",
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
      "Manual API security testing across REST, GraphQL and gRPC. OWASP API Top 10. OSWE-led consultants, Postman regression suite, dev-ready reports, free retest. India + UAE.",
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
      "OWASP MASVS / MSTG-aligned mobile penetration testing for Android (APK) and iOS (IPA). Frida + Burp + manual exploitation. RBI mobile banking, PCI DSS, App Store policy. Mumbai, India + UAE.",
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
    title: "Threat Intelligence",
    shortTitle: "Threat Intel",
    icon: Radar,
    iconName: "Radar",
    category: "Defensive",
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
      "OT-aware penetration testing for SCADA, ICS, smart meters, BMS and connected products. IEC 62443 + NIST SP 800-82 aligned, MITRE ATT&CK for ICS mapping. India + UAE.",
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
];

export const getServiceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
