/**
 * City × Service combo landing pages (/locations/<city>/<service>).
 *
 * These are intentionally narrow programmatic pages with unique, locally
 * grounded body copy — they target high-intent local-pack queries that
 * Kratikal and SISA currently dominate. Each entry references existing
 * citySlug + serviceSlug values from cities.ts and services.ts. Keep copy
 * direct, expert and free of marketing fluff — same tone as the Pune city
 * entry.
 */

export interface CityServiceCombo {
  citySlug: string;
  serviceSlug: string;
  /** SEO H1 + page title (≤72 chars). */
  headline: string;
  /** Hero sub-line, 1 short paragraph (~140-160 chars). */
  lead: string;
  /** Unique combo body — 7-10 paragraphs, 700-900 words. */
  body: string[];
  /** Key buyer concerns in this city × service (7-9 bullet strings). */
  buyerConcerns: string[];
  /** 5-6 differentiators specific to this combo (each 1-2 sentences). */
  differentiators: string[];
  /** ≤160 char meta description, keyword-led. */
  seoDescription: string;
  /** 6-10 long-tail keyword variants for this combo. */
  keywords: string[];

  /* ─── RICH-CONTENT FIELDS (optional; renderer falls back if absent) ─── */

  /** Animated stat strip (4 entries). */
  stats?: { value: string; label: string }[];
  /** 4-5 phase mini-methodology (drives horizontal timeline). */
  methodology?: { phase: string; activities: string[] }[];
  /** Industry verticals served in this city × service. */
  industries?: { name: string; blurb: string }[];
  /** 6-8 concrete deliverables. */
  deliverables?: string[];
  /** Anonymised local case study (1 entry). */
  caseStudy?: { industry: string; scope: string; outcome: string };
  /** 5-7 city × service specific FAQs. */
  faqs?: { q: string; a: string }[];
}

export const COMBOS: CityServiceCombo[] = [
// 1 ─ Mumbai · VAPT ────────────────────────────────────────────────
  {
    citySlug: "mumbai",
    serviceSlug: "vapt",
    headline: "VAPT Services in Mumbai · BFSI & Fintech",
    lead: "CERT-In empanelled VAPT delivered from our BKC HQ for RBI-, SEBI- and IRDAI-regulated firms across Mumbai, Thane and Navi Mumbai.",
    body: [
      "Macksofy's flagship VAPT practice operates out of SRA Commercial Tower in Bandra Kurla Complex (BKC), a five-minute walk from the BKC Metro and roughly 1.4 kilometres from RBI's central office at Fort. Every senior consultant on the Mumbai bench is OSCP- or OSWE-credentialed and has shipped at least one annual VAPT cycle into RBI's CSITE Cell, SEBI's Cyber Security and Cyber Resilience Cell, or IRDAI's IT-supervision wing. We do not subcontract — the consultant who scopes the engagement is the one writing the executive summary the bank's audit committee will read.",
      "Mumbai BFSI VAPT scoping is fundamentally a money-movement exercise, not a checklist scan. On a private-bank engagement we model the transaction graph end-to-end: net-banking authentication, OTP/2FA challenge, beneficiary-add flow, IMPS/NEFT/RTGS rails, the FATCA/CRS edge, and the reconciliation layer that ties book-of-record to the SWIFT gateway. Manual abuse-case testing targets velocity-control bypass on the IMPS rail, OTP-reuse via SS7-style mobile-side weaknesses, and reconciliation gaps that allow an attacker to mint balance without minting debit. Burp Suite Pro is the workhorse; Nuclei templates, custom Python harnesses and a fork of mitmproxy handle the protocol-specific abuse.",
      "For SEBI-regulated brokers and AMCs, the scope shifts to broker-terminal authorisation flaws, algo-API rate-limit bypass, market-data tampering on Refinitiv/Bloomberg feed-handlers, and the order-management-to-exchange (OMS-to-NSE/BSE) gateway. The same engagement also closes SEBI CSCRF Annexure-K evidence — CCI/CRMM scoring, MII-vendor-control attestation and the SAR exhibits the System Audit Report demands. IRDAI insurer engagements layer in claims-fraud paths, KYC-impersonation via OVD upload portals, and the policy-administration-system (PAS) authorisation matrix.",
      "The deliverable is a regulator-grade binder, not a Burp HTML export. Every High or Critical finding carries a manually-validated proof-of-exploit, a CVSS v3.1 score, a Macksofy business-impact score calibrated to the bank's transaction value-at-risk, and a remediation playbook that the AppSec lead can hand to engineering without translation. The executive summary is written in the language RBI Master Direction on IT Governance, Risk, Controls and Assurance Practices (November 2023) inspectors expect — explicit clause mapping to Annex-1 of the RBI Cyber Security Framework circular DBS.CO.CSITE.BC.11/33.01.001/2015-16.",
      "Re-testing is built into the SoW, not sold as a follow-on. Every Critical and High finding is re-validated post-fix at no extra cost inside a 60-day remediation window. If the bank's release train slips, we hold the re-test slot — we do not raise a change-order. For tier-1 private banks we also embed a Macksofy detection-engineering analyst alongside the SOC for the last week of the engagement so that every exploitable finding ships with a paired Sigma/Splunk rule the SIEM team can deploy the same week.",
      "Mumbai BFSI procurement reality matters. Most engagements close through a CTO + Chief Risk Officer joint signoff, with the audit committee chair copied; a few cooperative banks still route through the GM-IT and the board-IT-committee secretary. We size proposals to match — a fixed-fee SoW with clear inclusion of re-testing, the empanelled-auditor letter, and the SAR/inspection-defence support that follows. Procurement at listed BFSI clients also wants the SOC 2 / ISO 27001 vendor-security questionnaire pre-answered; we attach the Macksofy ISMS pack to every Mumbai proposal so legal and infosec don't hold up the PO.",
      "Onsite cadence is dictated by Mumbai geography, not vendor convenience. BKC and Lower Parel are walk-in same-day; Andheri MIDC, Powai, Goregaon SEEPZ, Thane and Navi Mumbai (Airoli, Vashi, Ghansoli) are reachable inside four hours including a Western Express Highway buffer. We block the Mumbai monsoon window (mid-June to mid-September) for testing-only weeks where onsite is non-critical, and front-load kickoff/exit calls for the dry months so the audit committee schedule is never held up by a flooded approach road.",
      "For listed BFSI clients the engagement also produces the board-pack exhibits the audit committee needs at the next quarterly cyber review: a top-10 risks slide mapped to the bank's existing risk register, a trend-line vs the previous VAPT cycle, an EDR/SIEM coverage delta, and a one-page CEO note that the bank's Company Secretary can drop into the agenda pack without rewrite.",
    ],
    buyerConcerns: [
      "RBI Master Direction on IT Governance, Risk, Controls and Assurance (November 2023) closure",
      "SEBI CSCRF + SAR/CCI/CRMM scoring evidence for stockbrokers, AMCs and MIIs",
      "IRDAI Information & Cyber Security guidelines (April 2023) audit evidence",
      "Annual VAPT certificate aligned to CERT-In empanelment format",
      "Transaction-flow abuse + OTP/2FA bypass on net-banking, mobile and UPI apps",
      "Algorithmic-trading API and Refinitiv/Bloomberg market-data feed authorisation flaws",
      "SWIFT gateway and treasury-reconciliation segregation",
      "Re-testing turnaround inside the RBI/SEBI remediation window",
      "Board-pack exhibits for the audit committee's quarterly cyber review",
    ],
    differentiators: [
      "Headquarters and senior team physically located in BKC — onsite kickoff at any Mumbai BFSI office within the same business day, with a four-hour SLA across the MMR including Thane and Navi Mumbai.",
      "Reports formatted to RBI MD-ITGRC, SEBI CSCRF and IRDAI inspector expectations, including the cross-reference annexures inspectors typically request during follow-up examinations.",
      "Re-testing of every critical and high finding included in the base SoW — no separate purchase order required inside the 60-day remediation window even if the bank's release train slips.",
      "Detection-engineering analyst embedded with the SOC in the closing week — every exploitable finding ships with a paired Sigma/Splunk rule the SIEM team can deploy immediately.",
      "Money-movement-graph methodology rather than checklist scanning — abuse-case testing on velocity controls, beneficiary-add, OTP reuse and reconciliation-layer gaps tied to actual transaction value-at-risk.",
    ],
    seoDescription:
      "CERT-In empanelled VAPT services in Mumbai for BFSI, fintech and brokers. RBI / SEBI / IRDAI-aligned reports. BKC HQ, same-day onsite, re-testing included.",
    keywords: [
      "VAPT services Mumbai",
      "VAPT Mumbai BFSI",
      "CERT-In VAPT Mumbai",
      "RBI VAPT auditor Mumbai BKC",
      "SEBI CSCRF VAPT Mumbai",
      "net banking penetration testing Mumbai",
      "IRDAI cyber security audit Mumbai",
      "broker VAPT Mumbai",
      "Mumbai fintech VAPT",
    ],
    stats: [
      { value: "200+", label: "Mumbai BFSI engagements" },
      { value: "5 min", label: "From BKC Metro" },
      { value: "<4 hrs", label: "MMR onsite SLA" },
      { value: "92%", label: "First-pass regulator acceptance" },
    ],
    methodology: [
      {
        phase: "01 · Scope & RoE",
        activities: [
          "Money-movement graph mapping with the CTO and CRO together — IMPS/NEFT/RTGS/UPI rails, SWIFT edge and reconciliation layer",
          "RBI/SEBI/IRDAI circular crosswalk against the existing risk register so every clause has a target finding bucket",
          "Rules of engagement signed by CTO, CRO and the audit-committee secretary; SOC deconfliction channel on a private Signal/Teams thread",
          "Asset attestation cross-checked against the CMDB and the BKC/Andheri/Powai onsite walk-through",
        ],
      },
      {
        phase: "02 · Recon & Surface Map",
        activities: [
          "External attack surface mapping with Amass, Subfinder and the Macksofy passive-DNS feed against the bank's TLD set",
          "Authenticated and unauthenticated scans (Nessus Pro, Qualys VMDR, Nuclei) against staging and prod where RoE permits",
          "Broker-terminal, OMS gateway and SWIFT-edge inventory reconciliation with the IT-ops team",
          "Mobile-app reversing on the latest Play Store and App Store builds (Frida, MobSF, Objection)",
        ],
      },
      {
        phase: "03 · Manual Exploitation",
        activities: [
          "Burp Suite Pro abuse-case testing on net-banking transaction graph — velocity control, beneficiary-add race, OTP reuse, reconciliation drift",
          "Algo-API and market-data tampering tests on the OMS-to-NSE/BSE gateway",
          "ADCS ESC1-ESC8, Kerberoasting and BloodHound path analysis on the AD forest backing core banking",
          "Manual chained-exploit proofs — low + low = critical narratives tied to real money-movement impact",
        ],
      },
      {
        phase: "04 · Regulator Reporting",
        activities: [
          "Executive summary in RBI MD-ITGRC + SEBI CSCRF + IRDAI 2023 language, clause-mapped",
          "CVSS v3.1 plus Macksofy business-impact scoring calibrated to transaction value-at-risk",
          "Detection-engineering annex — paired Sigma/Splunk rules per exploitable finding",
          "Board-pack exhibits for the audit committee's quarterly cyber review",
        ],
      },
      {
        phase: "05 · Re-test & Closure",
        activities: [
          "60-day re-test window covering every Critical and High at no extra cost",
          "CERT-In empanelled closure letter and SAR/inspection-defence support",
          "Risk register update synced to the bank's GRC tool (Archer, MetricStream, ServiceNow IRM)",
          "Carry-forward backlog grooming for the next quarter's regression-VAPT slot",
        ],
      },
    ],
    industries: [
      {
        name: "Private banks (Mumbai-HQ)",
        blurb: "Net-banking, treasury, SWIFT edge and ATM-network VAPT with RBI MD-ITGRC + CSF Annex-1 closure binder.",
      },
      {
        name: "NBFCs & Housing Finance",
        blurb: "Loan-origination, partner-API and collections-app scopes; RBI Scale-Based Regulation cyber-resilience evidence.",
      },
      {
        name: "Stock brokers & AMCs",
        blurb: "Broker terminal, OMS-to-exchange gateway and market-data feed VAPT; SEBI CSCRF + SAR + CCI/CRMM scoring.",
      },
      {
        name: "Payment aggregators",
        blurb: "BKC/Lower Parel PA-PG licensees — payout, refund and settlement-reconciliation API abuse with RBI PA submission format.",
      },
      {
        name: "Life & general insurers",
        blurb: "Claims-fraud paths, KYC-impersonation portals and PAS authorisation; IRDAI 2023 cyber-security audit evidence.",
      },
      {
        name: "Listed manufacturing in MMR",
        blurb: "Powai and Andheri MIDC industrial HQs — IT-side VAPT plus segregation review against the plant OT network.",
      },
    ],
    deliverables: [
      "VAPT report in CERT-In empanelled submission format with RBI/SEBI/IRDAI clause crosswalk",
      "Manually-validated proof-of-exploit per High and Critical finding with CVSS v3.1 + business-impact score",
      "Detection-engineering annex — Sigma/Splunk rules paired to each exploitable finding",
      "Board-pack exhibits for the audit committee's quarterly cyber review",
      "Jira/ServiceNow-importable findings CSV with owner, severity, ETA and CWE",
      "Free re-test of every Critical and High inside a 60-day window",
      "CERT-In empanelled closure letter and SAR/RBI inspection-defence support",
      "Risk register update synced to the bank's GRC tool",
    ],
    caseStudy: {
      industry: "Mumbai-headquartered Private Bank (BKC corporate tower)",
      scope: "Annual VAPT — 38 internet-facing apps, net-banking + UPI + IMPS rails, OMS-to-NSE gateway, ADCS-backed AD forest; RBI MD-ITGRC + CSF Annex-1 closure",
      outcome: "14 Critical and 22 High findings closed inside 41 days; first-pass RBI CSITE Cell acceptance without a clarification request; one ADCS ESC4 path that would have allowed a junior-RM-to-domain-admin escalation, closed pre-disclosure.",
    },
    faqs: [
      {
        q: "Can you handle BKC HQ plus an Andheri MIDC data-centre walkthrough in one engagement?",
        a: "Yes. We routinely run BFSI engagements that touch the BKC corporate office, an Andheri MIDC or Mahape data-centre, and a Navi Mumbai BCP site in the same SoW. Onsite legs are sequenced inside the same week to keep travel overhead off the bill.",
      },
      {
        q: "Will your VAPT close both RBI MD-ITGRC and SEBI CSCRF for a bank that also runs a broker subsidiary?",
        a: "Yes — we crosswalk the same control evidence to both frameworks. The output is a single binder with parallel clause indices so the bank's RBI inspector and SEBI auditor each see the relevant slice without separate audits.",
      },
      {
        q: "Do you submit reports to RBI's CSITE Cell directly or via the bank?",
        a: "Submission is always via the bank — RBI does not accept third-party submissions. We provide the CERT-In empanelled letter, the inspection-defence brief and an on-call senior who joins the inspector's clarification calls if asked.",
      },
      {
        q: "Can you support a Mumbai cooperative bank that has never run a regulator-grade VAPT before?",
        a: "Yes. We have a starter SoW for first-time cooperative bank engagements — narrower asset count, plain-English executive summary and a 90-day pre-inspection rehearsal block that walks the GM-IT through the likely RBI Department of Supervision questions.",
      },
      {
        q: "Do you test the SWIFT gateway and treasury-reconciliation layer separately?",
        a: "Yes. SWIFT-edge testing is run under a separate, narrower RoE because the gateway is jointly governed with SWIFT's CSP self-attestation. The output is reconciled into the main VAPT binder but isolated for the bank's SWIFT relationship manager to share with the network's local user group.",
      },
      {
        q: "How do you handle Mumbai monsoon disruption to onsite work?",
        a: "We front-load BKC, Lower Parel and Powai kickoff or exit weeks into the November-to-May dry months. Testing weeks where onsite is non-critical are scheduled June-to-September so a flooded Eastern Express Highway never delays the audit committee timeline.",
      },
    ],
  },

  // 2 ─ Bengaluru · VAPT ────────────────────────────────────────────────
  {
    citySlug: "bengaluru",
    serviceSlug: "vapt",
    headline: "VAPT Services in Bengaluru · SaaS & Product",
    lead: "VAPT built for product-engineering teams in Koramangala, Indiranagar, ORR and Whitefield — fast cadence, developer-readable reports, SOC 2 / ISO mapped.",
    body: [
      "The Bengaluru VAPT buyer is rarely a compliance officer. It is the VP of Engineering at a Series-C SaaS in Embassy Tech Village, the Head of AppSec at a fintech off Sarjapur Road, or a platform-engineering lead at a Whitefield product company who has just been handed an enterprise customer's vendor-security questionnaire and a 30-day window to answer it. The conversation is microservice sprawl, multi-tenant isolation, OAuth scope creep, GraphQL authz and the half-dozen third-party SaaS integrations that quietly hold customer PII. We scope around that reality, not a 200-control checklist.",
      "Most of our Bengaluru engagements cluster along the Outer Ring Road corridor — Bellandur, Marathahalli, Mahadevapura — plus Koramangala, Indiranagar and the Whitefield product belt out toward Hoodi. Senior consultants travel from the Mumbai BKC bench for kickoff, threat-modelling whiteboards and exit reviews; the active testing runs against staging environments on AWS Mumbai (ap-south-1), Singapore (ap-southeast-1) or GCP asia-south1. Mobile builds get reverse-engineered against the latest Play Store and TestFlight artefacts using Frida, MobSF and a Macksofy-internal traffic-replay harness.",
      "Bengaluru SaaS scoping is opinionated. We always insist on a threat-model whiteboard session on day one because product teams almost universally underestimate two things: how many auth boundaries actually exist between their microservices, and how many third-party SaaS tools (Segment, Auth0, Stripe, Slack apps, internal admin panels behind Tailscale) sit inside the trust boundary. A typical SaaS engagement covers a public-facing web app, the API gateway behind it, two to four backend microservices on EKS, a GraphQL aggregator, an iOS and Android app, and the OAuth dance with at least one enterprise SSO IdP — usually Okta, Azure AD or Google Workspace.",
      "Manual abuse-case testing leans on Burp Suite Pro with the GraphQL Voyager and InQL extensions, Postman collections, the Macksofy fork of jwt_tool for token-substitution attacks, and BloodHound for any internal AD that creeps into scope. We run authorisation-matrix testing against every role pair (tenant-admin → tenant-user, tenant-admin → cross-tenant-admin, support-staff → tenant-data) — broken object-level authorisation (BOLA) is the single highest-frequency Critical we ship on Bengaluru SaaS reports. GraphQL-specific tests cover introspection abuse, batching/aliasing rate-limit bypass, and field-level authz drift between resolvers.",
      "Findings are written for engineers, not auditors. Repro steps are curl/Burp/Postman/HTTPie one-liners. Remediation is a pull-request-ready snippet — a corrected GraphQL resolver, a tightened OPA/Rego policy, a Helm values diff, a Terraform IAM-policy patch. The deliverable also ships as a Jira-importable CSV with severity, CWE, CVSS, affected service and a suggested epic-link so the AppSec team can drop it straight into the next sprint without re-typing. We map every finding to OWASP ASVS L2, OWASP API Security Top 10 (2023), SOC 2 CC6/CC7 controls and ISO 27001:2022 Annex A — same VAPT closes the next enterprise customer's questionnaire and the auditor's evidence ask.",
      "Procurement at Bengaluru product companies usually closes on the engineering side, not procurement. The CTO or VP Engineering signs off, AppSec sets the technical SoW, and finance attaches a fixed-fee PO. We size proposals around a 1-week threat-model + scoping block, 2-3 weeks of testing, and a 1-week re-test window — total elapsed 4-5 weeks. For Series-C and later companies shipping weekly we offer a continuous-testing retainer with monthly delta tests against new releases and a full-coverage quarterly cycle, which most ORR clients prefer to a once-a-year point-in-time scan.",
      "Bengaluru clients preparing for SOC 2 Type II or an enterprise customer's security review get a sanitised vendor-pack alongside the technical report — the same artefact answers the auditor and the customer's CISO without re-assembly. For Series-D-and-later SaaS preparing for a US or European enterprise sale, we include a TPRM-ready summary mapped to the SIG Lite and CAIQ Lite question sets, which compresses the typical 6-week procurement back-and-forth into something closer to two weeks.",
      "Where the engagement intersects the Bengaluru fintech ecosystem — a payments product, a wealth app, a lending platform with an RBI Account Aggregator integration — we layer in RBI Master Direction on IT Governance (November 2023) and PA-PG audit evidence so the same VAPT closes both the SaaS questionnaire flow and the regulator submission. Bengaluru fintech founders are almost always running a parallel Mumbai compliance track; we make sure the VAPT does not become a duplicate spend.",
    ],
    buyerConcerns: [
      "Multi-tenant data isolation in shared-DB SaaS architectures (Postgres RLS, row-key fences, KMS key separation)",
      "OAuth / OIDC scope and refresh-token misuse across Okta / Azure AD / Workspace integrations",
      "GraphQL introspection, batching/aliasing abuse and broken object-level authorisation across resolvers",
      "Kubernetes (EKS / GKE) RBAC, admission controllers and service-mesh authz between microservices",
      "SOC 2 Type II CC6/CC7 and ISO 27001:2022 Annex A evidence quality",
      "VAPT cadence that keeps up with fortnightly release trains, not annual point-in-time scans",
      "Reports developers will actually read and ship from, not 200-page PDFs that die in Confluence",
      "TPRM-ready vendor pack mapped to SIG Lite and CAIQ Lite for US/EU enterprise procurement",
      "RBI PA-PG and Account Aggregator overlay for Bengaluru fintechs running a parallel Mumbai compliance track",
    ],
    differentiators: [
      "Threat-modelling whiteboard kickoff onsite at Embassy Tech Village, ORR or the Koramangala/Indiranagar belt before any active testing — Bengaluru engineering leads consistently rate this the highest-ROI part of the engagement.",
      "Findings shipped as a Jira-importable CSV with PR-ready remediation snippets (resolver diffs, Helm values, Terraform IAM patches) — not a 200-page PDF that nobody opens after week two.",
      "Continuous-testing retainer aligned to fortnightly release trains with quarterly full-coverage runs and monthly delta tests against new releases.",
      "Sanitised TPRM vendor-pack mapped to SIG Lite + CAIQ Lite shipped alongside the technical report — compresses US/EU enterprise procurement from six weeks to two.",
      "Same senior consultant from Mumbai BKC for the entire engagement — no bait-and-switch staffing, no junior bench rotation after kickoff.",
    ],
    seoDescription:
      "VAPT services in Bengaluru for SaaS and product companies. OWASP ASVS, SOC 2 + ISO 27001 mapped, developer-readable reports, continuous-testing retainer option.",
    keywords: [
      "VAPT services Bengaluru",
      "VAPT Bangalore SaaS",
      "product VAPT Bengaluru",
      "SOC 2 VAPT Bangalore",
      "OWASP ASVS pentest Bengaluru",
      "API VAPT Bangalore",
      "GraphQL pentest Bengaluru",
      "continuous penetration testing Bangalore",
      "Bengaluru startup VAPT",
    ],
    stats: [
      { value: "80+", label: "Bengaluru SaaS engagements" },
      { value: "4-5 wks", label: "Avg engagement time" },
      { value: "Same-week", label: "ORR onsite arrival" },
      { value: "SIG / CAIQ", label: "TPRM pack included" },
    ],
    methodology: [
      {
        phase: "01 · Threat Model",
        activities: [
          "Onsite whiteboard at Embassy Tech Village / ORR / Koramangala — trust-boundary inventory across microservices",
          "Third-party SaaS-integration mapping (Auth0, Segment, Stripe, Slack apps, Tailscale-fronted admin panels)",
          "Authorisation-matrix definition — every role-pair the tester must exercise",
          "AWS Mumbai/Singapore or GCP asia-south1 staging-environment account access provisioning",
        ],
      },
      {
        phase: "02 · Surface & Recon",
        activities: [
          "External-asset enumeration (Amass, Subfinder) against the product TLDs",
          "Mobile-app reversing with Frida, MobSF and the Macksofy traffic-replay harness",
          "GraphQL schema dump via InQL or unauthenticated introspection where exposed",
          "EKS/GKE cluster inventory and service-mesh policy export",
        ],
      },
      {
        phase: "03 · Manual Exploitation",
        activities: [
          "Burp Pro abuse-case testing on REST and GraphQL — BOLA, mass-assignment, BFLA, batching-rate bypass",
          "OAuth/OIDC scope manipulation, refresh-token replay and IdP trust-chain abuse",
          "Tenant-isolation testing across IAM, KMS, network policy and noisy-neighbour vectors in shared EKS clusters",
          "JWT substitution, signature confusion and kid-header injection with the Macksofy jwt_tool fork",
        ],
      },
      {
        phase: "04 · Developer-Ready Reporting",
        activities: [
          "Findings as Jira-importable CSV with severity, CWE, CVSS, affected service and PR-ready remediation snippets",
          "OWASP ASVS L2 + API Top-10 + SOC 2 CC + ISO 27001:2022 Annex A crosswalk",
          "TPRM vendor pack — SIG Lite + CAIQ Lite answers pre-populated",
          "Engineering-lead readout in a standing weekly dev standup, not a 1-hour Zoom death march",
        ],
      },
      {
        phase: "05 · Re-test & Retainer",
        activities: [
          "Free re-test of Critical and High inside the same SoW",
          "Optional continuous-testing retainer — monthly delta tests + quarterly full-coverage",
          "GitHub/GitLab integration so each release flagging touches the retainer test backlog",
          "Quarterly trend report for the CTO / audit committee",
        ],
      },
    ],
    industries: [
      {
        name: "Vertical & horizontal SaaS",
        blurb: "Multi-tenant Postgres + EKS stacks across Embassy Tech Village and ORR — SOC 2 Type II and enterprise-buyer questionnaire focus.",
      },
      {
        name: "Bengaluru fintechs",
        blurb: "Payments, wealth, lending and AA integrations — RBI MD-ITGRC + PA-PG overlay folded into the SaaS VAPT cycle.",
      },
      {
        name: "Healthtech & medtech",
        blurb: "PHI-handling SaaS with HIPAA business-associate posture and DPDP child-data exposure where care-giver flows touch minors.",
      },
      {
        name: "Edtech",
        blurb: "Koramangala/Indiranagar consumer-scale edtech — content DRM, SDK security and DPDP child-data provisions.",
      },
      {
        name: "DevTools & infra SaaS",
        blurb: "API-first developer platforms — GitHub/GitLab OIDC trust, signed-artefact policy and secrets-management substrate.",
      },
      {
        name: "Bengaluru GCCs",
        blurb: "US/EU enterprise capability centres on ORR — parent-control-catalogue crosswalk to NIST 800-53 alongside CERT-In format.",
      },
    ],
    deliverables: [
      "Threat-model whiteboard artefact and authorisation-matrix worksheet",
      "Jira-importable findings CSV with PR-ready remediation snippets per finding",
      "OWASP ASVS L2 + API Top-10 + SOC 2 CC + ISO 27001:2022 Annex A crosswalk",
      "TPRM vendor pack — SIG Lite + CAIQ Lite pre-populated for enterprise procurement",
      "Engineering-readable PDF with curl/Burp/Postman repros per finding",
      "Free re-test of Critical and High inside the same SoW",
      "Optional continuous-testing retainer with monthly delta + quarterly full-coverage",
      "CERT-In empanelled letter and (where in scope) RBI PA-PG / AA submission pack",
    ],
    caseStudy: {
      industry: "Series-C SaaS on Outer Ring Road (Bellandur)",
      scope: "Web + REST + GraphQL + iOS + Android + EKS multi-tenant + Auth0 federation; 4-week engagement against AWS Mumbai staging mirror",
      outcome: "23 Critical and High closed in 38 days; SOC 2 Type II issued in same audit cycle; one cross-tenant BOLA path on the GraphQL aggregator that would have exposed every customer's invoice data, closed pre-production rollout; enterprise sales pipeline tripled in the following two quarters.",
    },
    faqs: [
      {
        q: "Can your VAPT close both SOC 2 Type II and an enterprise customer's CAIQ in one cycle?",
        a: "Yes. Every Bengaluru SaaS engagement ships with a TPRM vendor pack pre-populated against SIG Lite and CAIQ Lite, plus the SOC 2 CC6/CC7 evidence the auditor wants. The same artefact answers the auditor and the customer's CISO without a separate evidence build.",
      },
      {
        q: "Do you test against AWS Mumbai (ap-south-1) staging or production?",
        a: "Default is a production-mirror staging environment in the same region (ap-south-1 or ap-southeast-1). Production testing is allowed under a narrower RoE with rate-limit caps and a SOC-deconfliction channel; most Bengaluru SaaS clients prefer the staging-mirror approach for release-train cadence reasons.",
      },
      {
        q: "Can you align with our fortnightly release train rather than a once-a-year scan?",
        a: "Yes. The continuous-testing retainer maps quarterly full-coverage runs to your release calendar and runs monthly delta tests against the previous release's diff. Findings flow into the same Jira board your engineering team already uses.",
      },
      {
        q: "What is the senior-consultant model — do we get the same person across the engagement?",
        a: "Yes. The same OSCP/OSWE senior who runs the threat-model whiteboard writes the executive summary. We do not bait-and-switch onto junior consultants after kickoff. The Bengaluru bench is staffed from the Mumbai BKC team with quarterly rotations to keep depth fresh.",
      },
      {
        q: "Do you have experience with the GraphQL stack our product is built on?",
        a: "Yes — Apollo Federation, Hasura, AWS AppSync and Postgraphile are all common scopes. We bring the GraphQL-specific abuse playbook (introspection, batching/aliasing, field-level authz drift, persisted-query bypass) rather than treating GraphQL as REST under a new wrapper.",
      },
      {
        q: "Can a Bengaluru fintech client run RBI PA-PG and SOC 2 evidence off the same VAPT?",
        a: "Yes — and this is one of our highest-frequency scope shapes. The single engagement produces a SOC 2 CC + ISO 27001 + RBI PA-PG submission crosswalk, with the RBI exhibits formatted for Payment System Department submission rather than a generic CERT-In template.",
      },
    ],
  },

  // 3 ─ Gurugram · VAPT ────────────────────────────────────────────────
  {
    citySlug: "gurugram",
    serviceSlug: "vapt",
    headline: "VAPT Services in Gurugram · BFSI HQs & GCCs",
    lead: "CERT-In empanelled VAPT for private-bank HQs, insurer GCCs and IT-services delivery centres across Cyber City, Cyberhub and Udyog Vihar.",
    body: [
      "Gurugram is the corporate headquarters city for India's largest private banks, every major insurer, the biggest fintechs (Paytm, PolicyBazaar, MakeMyTrip-group), and more than six hundred global capability centres anchored in DLF Cyber City Phase 1-5, DLF Cyberhub, Udyog Vihar, Sohna Road and Golf Course Road. The VAPT buyer is almost always a CISO sitting in a DLF Cyber City Phase 3 tower or a Golf Course Road HQ, answering simultaneously to an Indian regulator and an overseas parent's group cyber-risk function. Scopes have to satisfy both audiences in one report cycle or the engagement gets re-run six months later.",
      "On private-bank HQ scopes we deliver VAPT on net-banking, treasury, payment-gateway, partner-API and core-banking estates with the same regulator-grade rigour we use in Mumbai BKC, plus parallel evidence packs aligned to NIST 800-53 rev 5, PCI-DSS v4.0.1, and the parent group's internal cyber-control catalogue (typically a derivative of ISO 27002 with the FFIEC Cyber Assessment Tool layered on top). RBI Master Direction on IT Governance (November 2023) and the RBI Cyber Security Framework Annex-1 close the regulator side; the parent group sees a NIST-CSF mapped crosswalk produced from the same evidence base.",
      "For insurer HQs on Sohna Road and in DLF Cyber City — life, general and health — IRDAI Information & Cyber Security guidelines (April 2023) drive scope: claims-fraud paths, KYC-impersonation portals, agent-onboarding flows, the PAS authorisation matrix and the bancassurance API edge that sits between the insurer and its private-bank partners. Most Gurugram insurers also operate a parent-mandated GRC stack (Archer or MetricStream) and expect evidence drops into that platform on a defined cadence; we ship findings as both a regulator binder and an Archer-importable CSV.",
      "For GCCs in Udyog Vihar, Sector 44, Sector 32 and Golf Course Road, scopes blend an internal-network pentest with a cloud-control review on the parent's AWS or Azure tenant. Most GCC production infrastructure sits offshore but the India-based engineering staff own build, release and break-glass admin access — so the privilege-path between Gurugram engineers and offshore production is the high-value attack surface. We test the BloodHound shortest-path from a Gurugram developer laptop to the parent's production AWS organisation, the ADCS template configuration (ESC1-ESC8) in the India-side AD, and the CI/CD trust chain (GitHub Actions OIDC, Azure DevOps service connections) between Gurugram repos and offshore deploy targets.",
      "Internal-network testing in Gurugram has to account for DLF Cyber City's multi-tenant office reality. 'Corporate LAN' frequently means a shared building backbone with cross-tenant L2 visibility that the bank's network team did not architect for. We run LLMNR/NBT-NS poisoning, IPv6 mitm6, SMB relay and ADCS-misconfig chains against the corporate segment, then explicitly document which findings sit inside the bank's perimeter and which are DLF-backbone artefacts the building-management contract has to resolve. That distinction matters because the audit committee will ask.",
      "Onsite kickoff in Gurugram is next-day from Mumbai BKC — the BOM-DEL morning flight plus the Aerocity-to-Cyber-City drive lands the senior consultant at the client by 11am. For engagements that run beyond two weeks we stage a Delhi-resident lead consultant for the duration so onsite cadence is tight and the bank does not pay flight overhead on every sprint review. Procurement at Gurugram private banks usually runs through the CISO, the CRO and a board-level Cyber Risk Sub-Committee; the audit committee chair signs off on the SoW. Fintechs close faster — CTO + CFO is typical.",
      "Most Gurugram private-bank engagements need stakeholder briefings across two time zones in the same week — the Indian board on Tuesday and the overseas parent's risk committee on Thursday. We build the engagement plan around that cadence and provide pre-read packs the CISO can forward without rework. The same VAPT also routinely feeds a TIBER-EU-style RFP cycle that the parent's group-cyber team is running for the next year's red team, so the evidence base is structured to be portable to that next engagement rather than locked in a one-off PDF.",
      "Where the bank or insurer operates a PCI-DSS scope (card-personalisation, payment-gateway, hosted card-network connectivity), we layer in scope-reduction testing — segmentation validation against the CDE, tokenisation-vault separation and the network controls that justify a SAQ-D-Service-Provider vs SAQ-D-Merchant differentiation. The output reduces the recurring assessment cost in subsequent years, which the CFO notices more than the CISO does.",
    ],
    buyerConcerns: [
      "RBI MD-ITGRC + IRDAI 2023 + parent-group control-catalogue evidence in one VAPT cycle",
      "PCI-DSS v4.0.1 scope reduction in payment-gateway and card-network testing",
      "Privilege paths from Gurugram GCC engineering staff to offshore production AWS/Azure tenants",
      "Partner-API, open-banking and bancassurance integration authorisation flaws",
      "Internal-network segmentation across DLF Cyber City multi-tenant office backbones",
      "ADCS ESC1-ESC8, Kerberos delegation and BloodHound shortest-path on the India-side AD",
      "Parallel mapping to RBI, NIST 800-53 rev 5 and the parent's NIST-CSF crosswalk",
      "Two-time-zone briefing cadence — Indian board on Tuesday, overseas parent committee on Thursday",
      "Archer / MetricStream evidence drop alongside the regulator binder",
    ],
    differentiators: [
      "Dual-framework reporting — single VAPT produces an RBI MD-ITGRC + IRDAI evidence binder and a NIST 800-53 rev 5 + parent-control-catalogue crosswalk in the same cycle, not as a billable rework.",
      "Internal-network testing tailored to multi-tenant DLF Cyber City and Cyberhub office layouts — explicit findings split between bank perimeter and DLF building backbone so the audit committee gets a clean picture.",
      "Same-day arrival from Mumbai BKC; Delhi-resident lead consultant staged for engagements beyond two weeks so the bank does not pay flight overhead on every sprint review.",
      "Two-time-zone engagement plan baked in — pre-read packs sized for the Indian audit committee and the overseas parent's group-cyber committee without the CISO rebuilding decks.",
      "PCI-DSS scope-reduction testing that compounds in CFO-visible savings on subsequent annual assessments.",
    ],
    seoDescription:
      "CERT-In empanelled VAPT services in Gurugram for private banks, insurer GCCs and Fortune-500 capability centres. RBI / NIST dual-framework reports. Cyber City onsite.",
    keywords: [
      "VAPT services Gurugram",
      "VAPT Gurgaon BFSI",
      "VAPT Cyber City Gurgaon",
      "CERT-In VAPT Gurugram",
      "GCC penetration testing Gurgaon",
      "private bank VAPT Gurugram",
      "Cyberhub VAPT Gurgaon",
      "RBI VAPT auditor Gurgaon",
      "insurer VAPT Gurugram",
    ],
    stats: [
      { value: "65+", label: "Gurugram engagements" },
      { value: "Next-day", label: "BOM-DEL onsite" },
      { value: "600+", label: "GCCs in coverage area" },
      { value: "Dual-fwk", label: "RBI + NIST binders" },
    ],
    methodology: [
      {
        phase: "01 · Dual-Framework Scope",
        activities: [
          "Crosswalk RBI MD-ITGRC / IRDAI / SEBI clauses against the parent's NIST 800-53 rev 5 control set",
          "Onsite kickoff at DLF Cyber City Phase 3 or Golf Course Road; two-time-zone stakeholder calendar locked",
          "PCI-DSS scope inventory if card-environment is in play — segmentation map and tokenisation-vault boundary",
          "Archer / MetricStream evidence-drop schema agreed with the bank's GRC team",
        ],
      },
      {
        phase: "02 · External & Recon",
        activities: [
          "External attack surface mapping against the bank's TLD set plus the parent group's vanity domains",
          "Credential-leak harvesting against the bank's known SSO domains and DLF Cyber City vendor footprint",
          "Public-cloud account fingerprinting (AWS Mumbai/Singapore, Azure India South/Central, GCP asia-south1)",
          "Mobile-app reversing on the latest Play Store and App Store consumer builds",
        ],
      },
      {
        phase: "03 · Internal & AD",
        activities: [
          "LLMNR/NBT-NS poisoning, mitm6 IPv6 takeover and SMB relay on the corporate segment",
          "ADCS ESC1-ESC8 template enumeration with Certipy; BloodHound shortest-path to Domain Admin",
          "Kerberoasting, AS-REP roasting and Kerberos delegation (RBCD, S4U2Self/S4U2Proxy) abuse",
          "Privilege-path testing from Gurugram engineer laptops to offshore production AWS/Azure tenants",
        ],
      },
      {
        phase: "04 · App, API & Partner Edge",
        activities: [
          "Net-banking, broker-terminal and PAS authorisation testing on the customer-facing edge",
          "Partner-API, open-banking and bancassurance authorisation matrix exercised role-by-role",
          "Payment-gateway and card-network connectivity testing if PCI-DSS is in scope",
          "CI/CD trust-chain abuse (GitHub Actions OIDC, Azure DevOps service connections)",
        ],
      },
      {
        phase: "05 · Dual Reporting",
        activities: [
          "RBI MD-ITGRC + IRDAI evidence binder formatted for the Indian regulator",
          "NIST 800-53 rev 5 + parent-control-catalogue crosswalk for the overseas group cyber committee",
          "Archer / MetricStream evidence drop and Jira-importable findings CSV",
          "Two-time-zone pre-read packs — Indian audit committee Tuesday, parent committee Thursday",
        ],
      },
    ],
    industries: [
      {
        name: "Private-bank HQs",
        blurb: "DLF Cyber City and Golf Course Road head offices — net-banking, treasury and partner-API VAPT with RBI + parent NIST crosswalk.",
      },
      {
        name: "Insurer HQs",
        blurb: "Life, general and health insurers on Sohna Road / DLF — IRDAI 2023 evidence plus parent-group control catalogue.",
      },
      {
        name: "Fortune-500 GCCs",
        blurb: "Udyog Vihar and Sector 44 GCCs — internal network + cloud-control review with privilege-path testing to offshore prod.",
      },
      {
        name: "Fintech & lending HQs",
        blurb: "Cyber City and Cyberhub fintechs — RBI PA-PG, loan-origination and partner-fintech API VAPT.",
      },
      {
        name: "Big-4 & consulting",
        blurb: "Gurugram consulting firms — DLF Cyber City delivery-centre VAPT with client-confidentiality control validation.",
      },
      {
        name: "Travel & e-commerce HQs",
        blurb: "MakeMyTrip-group, Goibibo and Cyber City e-commerce HQs — payment, loyalty and partner-merchant abuse paths.",
      },
    ],
    deliverables: [
      "VAPT report in CERT-In empanelled submission format with RBI/IRDAI clause crosswalk",
      "Parallel NIST 800-53 rev 5 + parent-control-catalogue crosswalk binder for the overseas group cyber committee",
      "PCI-DSS scope-reduction memo with segmentation validation evidence where card-environment is in play",
      "Archer / MetricStream evidence drop in the bank's GRC schema",
      "Jira / ServiceNow-importable findings CSV with severity, CWE, CVSS and ETA",
      "Two-time-zone pre-read packs sized for the Indian audit committee and the overseas parent committee",
      "Free re-test of every Critical and High inside a 60-day window",
      "CERT-In empanelled closure letter and RBI / IRDAI inspection-defence support",
    ],
    caseStudy: {
      industry: "Gurugram-headquartered Private Bank (DLF Cyber City Phase 3)",
      scope: "Annual VAPT on 28 internet-facing apps, treasury and SWIFT edge, AD forest with ADCS, partner-API estate; dual binder for RBI CSITE Cell and a London-based parent risk committee",
      outcome: "First-pass RBI acceptance; 9 Critical and 17 High closed in 52 days; one ADCS ESC4 path from a junior risk-analyst account to the fraud-rules engine, closed pre-disclosure; parent's group-cyber committee adopted the Macksofy detection-engineering annex as the new TIBER-style baseline for the next year's red team.",
    },
    faqs: [
      {
        q: "Can your VAPT satisfy both RBI MD-ITGRC and our London parent's NIST 800-53 control set in one cycle?",
        a: "Yes. Every Gurugram private-bank engagement ships parallel binders sourced from the same evidence base — an RBI MD-ITGRC + CSF Annex-1 closure binder for the Indian regulator and a NIST 800-53 rev 5 crosswalk for the parent's group-cyber committee. There is no rework or duplicate testing.",
      },
      {
        q: "Do you run internal-network tests across DLF Cyber City multi-tenant offices safely?",
        a: "Yes. We split findings into 'bank perimeter' and 'DLF building backbone' categories explicitly. The bank gets remediation on its own segment; the DLF facilities team gets a memo for the building-services contract. The audit committee gets a clean line.",
      },
      {
        q: "How do you handle the Tuesday-Indian-board / Thursday-parent-committee briefing cadence?",
        a: "Pre-read packs are built into the SoW. The Tuesday pack is sized for the audit committee chair and the Indian CRO. The Thursday pack is sized for the parent's group-cyber committee with NIST 800-53 references. The CISO does not have to rebuild slides.",
      },
      {
        q: "Can you test the privilege path from a Gurugram GCC laptop to our offshore production AWS organisation?",
        a: "Yes. This is one of the highest-frequency scopes we run for Cyberhub and Udyog Vihar GCCs. We test the BloodHound shortest-path from a developer laptop through the India-side AD to the CI/CD trust chain and into the parent's offshore AWS organisation, including ADCS template abuse and GitHub Actions OIDC misconfigurations.",
      },
      {
        q: "Will the same VAPT feed our parent's TIBER-style red-team RFP next year?",
        a: "Yes. We structure the evidence base to be portable to the next TIBER-style engagement — threat-intel pack, asset inventory and the detection-engineering annex are formatted so the next red-team vendor can run against the same baseline rather than starting from scratch.",
      },
      {
        q: "Do you support PCI-DSS v4.0.1 scope reduction alongside the VAPT?",
        a: "Yes. Where the card environment is in play we layer in segmentation validation against the CDE, tokenisation-vault separation testing and the segmentation controls that justify a SAQ-D-Service-Provider vs SAQ-D-Merchant differentiation. The annual PCI-DSS assessment cost typically drops in the following year.",
      },
    ],
  },

  // 4 ─ Hyderabad · VAPT ────────────────────────────────────────────────
  {
    citySlug: "hyderabad",
    serviceSlug: "vapt",
    headline: "VAPT Services in Hyderabad · Pharma & IT",
    lead: "CERT-In empanelled VAPT for HITEC City SaaS, Genome Valley pharma R&D and Telangana IT-services majors — built around regulated-data flows.",
    body: [
      "Hyderabad's cybersecurity demand splits cleanly along two axes and most generic 'VAPT vendors' miss the seam entirely. HITEC City, Gachibowli and Madhapur host the SaaS, fintech and IT-services majors. Genome Valley (Shameerpet, off the ORR exit to Karimnagar) and the broader Shamirpet–Patancheru pharma corridor host the R&D campuses and CROs that run clinical-trial data, GMP-validated lab systems and lab-instrument integrations. The same engagement template breaks against both: pharma scoping looks like a regulated-data-flow audit, SaaS scoping looks like a multi-tenant authz audit. Macksofy maintains two distinct playbooks and the senior consultant chooses which to pull off the shelf at kickoff.",
      "For pharma and CRO clients in Genome Valley and the Patancheru belt, we focus on regulated-data flows end-to-end: clinical-trial portals (eCRF, EDC), eTMF systems, lab-instrument integrations (Empower, LabSolutions, OpenLAB CDS), the LIMS and the segregation between R&D networks and corporate IT. Findings are mapped to 21 CFR Part 11 (electronic-records and electronic-signature controls), GxP data-integrity ALCOA+ principles, EU GMP Annex 11 (computerised systems) and the WHO TRS 1019 Annex 4 guidance on data integrity. The same VAPT closes the next FDA Pre-Approval Inspection or EMA mock-audit cycle, which the QA director cares about far more than the IT director.",
      "Lab-instrument testing is a Hyderabad specialty. Most pharma engagements include a walk-through of at least one QC lab — HPLC, GC, dissolution-tester and balance integrations into the LIMS or CDS. Common findings: shared local-admin credentials on the analytical workstation, USB-mass-storage policy gaps that allow raw-data exfiltration, audit-trail-disable paths on the chromatography software, and time-synchronisation drift between the instrument workstation and the LIMS server that breaks ALCOA+ contemporaneity. These do not appear in a Burp Suite report. We run them as guided walk-throughs with a QA witness and document the evidence in 21 CFR Part 11 §11.10(e) terms.",
      "For HITEC City and Gachibowli SaaS and IT-services clients in Cyber Towers, Mindspace, Raheja Mindspace, Hitech City Phase 2 and the Q City / Wave Rock belt, scopes look more like the Bengaluru pattern — multi-tenant SaaS authz, customer-data isolation, vendor-API trust chains — but with a strong overlay of US-healthcare and US-BFSI client-imposed control catalogues passed down from US/EU parents. Reports map to SOC 2 Type II CC controls, ISO 27001:2022 Annex A and (where US healthcare data is in scope) HIPAA Security Rule §164.308–312 administrative, physical and technical safeguards.",
      "Senior consultants fly from Mumbai BKC via the BOM-HYD morning flight; for Hyderabad-resident lead support we draw from the South India regional hub in HITEC City itself, which keeps onsite cadence inside two hours for any Madhapur, Gachibowli, Banjara Hills, Kondapur or Genome Valley location. Most pharma VAPTs run 4-5 weeks with at least two onsite plant or R&D-site visits; SaaS scopes complete in 3-4 weeks; full-suite pharma engagements that touch corporate IT plus R&D plus QC lab integrations stretch to 6-8 weeks. We re-test critical findings inside the remediation window at no extra cost.",
      "Hyderabad pharma procurement is unusual: the IT head proposes the SoW, the QA director approves it (because 21 CFR Part 11 and ALCOA+ live in QA's jurisdiction), and the head of plant operations signs off if any GMP-validated system is in scope. We size proposals around that triangle and write the executive summary in QA-readable language — not 'CVSS 7.4 SSRF in eTMF' but 'electronic-record integrity exposure on the eTMF audit-trail path; FDA inspection risk Category-1; remediation closes 21 CFR Part 11 §11.10(e)'. Every finding is dated against the next FDA / EMA / DCGI inspection on the QA calendar so the team knows which gaps must close before which inspection.",
      "For HITEC City SaaS and IT-services clients, procurement closes through the CTO and AppSec lead, sometimes with a US-headquartered parent's CISO copied for the larger GCCs. We sync the report to the next enterprise-procurement cycle and ship a sanitised vendor pack alongside the technical findings. Where the client also operates a parallel pharma-data scope (a CRO running a SaaS clinical-trial-management platform, for example), we shift methodology between SaaS-style and pharma-style scoping in the same engagement so the QA and AppSec functions get one report rather than two contradictory ones.",
      "Genome Valley clients almost universally now run a parallel DPDP Act readiness track on clinical-trial-participant data. We layer DPDP RoPA mapping and consent-flow testing into the pharma VAPT — informed-consent capture, withdrawal-of-consent propagation back through the eTMF, and the cross-border-transfer evidence that DPDP §16 now requires for sponsor-data flows back to the US or EU CRO parent.",
    ],
    buyerConcerns: [
      "21 CFR Part 11 §11.10(e) audit-trail and ALCOA+ contemporaneity evidence for clinical-trial and eTMF systems",
      "EU GMP Annex 11 and WHO TRS 1019 Annex 4 computerised-systems compliance",
      "Segregation between R&D networks, QC labs and corporate IT estates",
      "Lab-instrument and HPLC / LIMS / CDS integration auth flaws — shared local-admin, USB policy gaps, audit-trail disable paths",
      "Multi-tenant SaaS isolation for HITEC City and Gachibowli product companies",
      "SOC 2 Type II + ISO 27001:2022 Annex A evidence quality for IT-services client audits",
      "HIPAA Security Rule §164.308-312 safeguards for US-healthcare GCC scopes",
      "DPDP Act §16 cross-border transfer evidence for clinical-trial-participant data",
      "FDA / EMA / DCGI inspection-calendar synchronisation",
    ],
    differentiators: [
      "Two distinct methodology playbooks — pharma / CRO (21 CFR Part 11, ALCOA+, Annex 11) vs SaaS / IT-services (OWASP ASVS, SOC 2, ISO 27001:2022) — same firm, no template re-use.",
      "Lab-instrument and CDS walk-throughs (Empower, LabSolutions, OpenLAB) with QA witness and ALCOA+ documented evidence — not a generic web pentest relabelled.",
      "Hyderabad regional hub in HITEC City means two-hour onsite SLA across Madhapur, Gachibowli, Banjara Hills, Kondapur and the Genome Valley pharma belt.",
      "Findings dated against the next FDA / EMA / DCGI inspection on the QA calendar — remediation priorities mirror the inspection clock, not the IT change calendar.",
      "DPDP §16 cross-border-transfer overlay built into the pharma VAPT for sponsor-data flows back to US/EU CRO parents.",
    ],
    seoDescription:
      "CERT-In empanelled VAPT services in Hyderabad for pharma, CROs and HITEC City SaaS. 21 CFR Part 11, GxP and SOC 2 aligned reports. Genome Valley + Gachibowli onsite.",
    keywords: [
      "VAPT services Hyderabad",
      "VAPT HITEC City",
      "pharma VAPT Hyderabad",
      "21 CFR Part 11 VAPT Hyderabad",
      "Genome Valley cybersecurity",
      "Gachibowli VAPT",
      "SaaS VAPT Hyderabad",
      "CRO penetration testing Hyderabad",
      "CERT-In VAPT Hyderabad",
    ],
    stats: [
      { value: "70+", label: "South India engagements" },
      { value: "<2 hrs", label: "Onsite SLA in city" },
      { value: "Local hub", label: "HITEC City based" },
      { value: "QA + IT", label: "Dual-signoff playbook" },
    ],
    methodology: [
      {
        phase: "01 · QA-Aware Scoping",
        activities: [
          "Joint kickoff with IT head, QA director and (if GMP systems in scope) head of plant operations",
          "Inspection-calendar map — FDA / EMA / DCGI dates pinned against finding-closure milestones",
          "Pharma vs SaaS playbook selection — separate consultants and tool stacks where both are in play",
          "Genome Valley / Shamirpet / HITEC City onsite-visit schedule and QA-witness arrangement",
        ],
      },
      {
        phase: "02 · Regulated-Data Discovery",
        activities: [
          "Clinical-trial portal, eTMF and EDC inventory with electronic-record path mapping",
          "LIMS, CDS and lab-instrument integration enumeration with QA walk-through",
          "R&D / QC lab / corporate IT segregation review (network, AD, file-share, USB policy)",
          "Sponsor-data flow inventory for DPDP §16 cross-border-transfer evidence",
        ],
      },
      {
        phase: "03 · Application & Authz",
        activities: [
          "Multi-tenant SaaS authz testing for HITEC City product clients (Burp Pro, OWASP ASVS L2)",
          "21 CFR Part 11 audit-trail disable-path and ALCOA+ contemporaneity testing on eTMF and CDS",
          "HPLC / GC / dissolution-tester workstation review — shared local-admin, USB policy, time-sync drift",
          "PAS, EDC and eCRF role-based access control matrix exercised role-by-role",
        ],
      },
      {
        phase: "04 · Dual-Format Reporting",
        activities: [
          "QA-readable executive summary in 21 CFR Part 11 / GMP Annex 11 / ALCOA+ language",
          "AppSec-readable technical findings with Burp/curl repros and CWE references",
          "SOC 2 Type II + ISO 27001:2022 Annex A + (where applicable) HIPAA crosswalk for the IT-services side",
          "DPDP RoPA and §16 cross-border-transfer evidence pack for sponsor-data flows",
        ],
      },
      {
        phase: "05 · Inspection-Defence Re-test",
        activities: [
          "Re-test of every Critical and High inside the FDA / EMA inspection window",
          "Inspection-defence rehearsal — likely inspector questions per finding category",
          "CERT-In empanelled closure letter formatted for DCGI submission where required",
          "Sponsor-CRO data-flow memo for the parent's quality-and-cyber joint committee",
        ],
      },
    ],
    industries: [
      {
        name: "Pharma R&D & generics",
        blurb: "Top-5 generics with Shameerpet R&D, Patancheru API plants and Bachupally formulations — IT + lab + GMP-system VAPT.",
      },
      {
        name: "CROs & clinical-trial sites",
        blurb: "Genome Valley CROs — eTMF, EDC, sponsor-data flow and DPDP §16 cross-border-transfer evidence.",
      },
      {
        name: "HITEC City SaaS",
        blurb: "Cyber Towers and Mindspace product companies — multi-tenant authz with SOC 2 Type II + ISO 27001:2022 alignment.",
      },
      {
        name: "US-healthcare GCCs",
        blurb: "Gachibowli and Q City BPO/GCC operations on US PHI — HIPAA Security Rule and HITRUST-aligned VAPT.",
      },
      {
        name: "Telangana IT-services",
        blurb: "Hyderabad-headquartered IT-services majors — parent-control-catalogue crosswalk on top of CERT-In format.",
      },
      {
        name: "Banking GCCs",
        blurb: "Kondapur and Gachibowli BFSI captive ops — RBI VAPT clauses applied to India-side GCC infrastructure.",
      },
    ],
    deliverables: [
      "VAPT report in CERT-In empanelled format with 21 CFR Part 11 / GMP Annex 11 crosswalk for regulated systems",
      "ALCOA+ data-integrity evidence on eTMF, LIMS and CDS audit-trail paths",
      "Multi-tenant SaaS authz test results mapped to OWASP ASVS L2 and SOC 2 CC6/CC7",
      "HIPAA Security Rule §164.308-312 evidence pack for US-healthcare GCC scopes",
      "DPDP §16 cross-border-transfer evidence pack for sponsor-CRO data flows",
      "Lab-instrument walk-through memos signed off by QA witness",
      "Free re-test of every Critical and High inside the next FDA / EMA inspection window",
      "Inspection-defence rehearsal pack with likely inspector questions per finding category",
    ],
    caseStudy: {
      industry: "Top-5 Indian generics major (Shameerpet R&D + Bachupally formulations)",
      scope: "Pharma VAPT across eTMF, EDC, LIMS, three QC lab CDS workstations (Empower) and corporate IT; DPDP §16 cross-border-transfer evidence for US sponsor data; six-week engagement with two onsite legs",
      outcome: "Two ALCOA+ contemporaneity exposures on the LIMS-to-CDS time-sync path closed pre-FDA Pre-Approval Inspection; one shared local-admin credential set on three QC workstations rotated and bound to QA witness; zero non-conformities at the subsequent FDA PAI; DPDP §16 evidence pack accepted by the US sponsor's cyber-quality joint committee.",
    },
    faqs: [
      {
        q: "Can you test our Empower / LabSolutions / OpenLAB workstations safely without breaking GMP validation?",
        a: "Yes. Lab-instrument workstation reviews are run as guided walk-throughs with a QA witness, against documented test scripts that do not alter validated state. Findings are documented in 21 CFR Part 11 §11.10(e) terms with the QA witness signature so the evidence is itself part of the validation record.",
      },
      {
        q: "Will your VAPT close both the next FDA Pre-Approval Inspection and our SOC 2 Type II audit if we run a SaaS clinical-trial platform?",
        a: "Yes — this is one of our highest-frequency scope shapes for Hyderabad CRO and clinical-trial-SaaS clients. We run pharma and SaaS playbooks side by side and ship dual evidence packs: 21 CFR Part 11 / GMP Annex 11 / ALCOA+ for the FDA side, SOC 2 CC + ISO 27001:2022 for the SaaS-customer side.",
      },
      {
        q: "How quickly can you be onsite at our Shameerpet R&D site or our Genome Valley CRO?",
        a: "Inside two hours from our HITEC City regional hub. Genome Valley sites are typically a 40-minute drive from Madhapur. For Patancheru API plants we plan a half-day onsite block with the QA team in advance.",
      },
      {
        q: "Do you handle DPDP §16 cross-border-transfer evidence for our sponsor data going back to the US CRO parent?",
        a: "Yes. The pharma VAPT now layers DPDP RoPA and §16 cross-border-transfer evidence into the standard deliverable — consent capture, withdrawal-of-consent propagation through the eTMF and the contractual safeguards the sponsor needs to evidence at the next data-protection-officer review.",
      },
      {
        q: "Can you handle a HITEC City SaaS scope and a Genome Valley pharma scope in the same engagement?",
        a: "Yes — we run two consultants in parallel, one per playbook, with a single project lead so the executive summary reconciles findings across both. This is the cleanest path for Hyderabad clients that operate a SaaS arm out of HITEC City and a regulated-data R&D function out of Genome Valley.",
      },
      {
        q: "Do you submit the report to DCGI / FDA directly or via the client?",
        a: "Submission is always via the client — neither DCGI nor FDA accept third-party VAPT submissions. We provide the CERT-In empanelled letter, the inspection-defence rehearsal pack and an on-call senior who joins inspector or sponsor-audit clarification calls if asked.",
      },
    ],
  },

  // 5 ─ Noida · VAPT ────────────────────────────────────────────────
  {
    citySlug: "noida",
    serviceSlug: "vapt",
    headline: "VAPT Services in Noida · Fintech & IT",
    lead: "CERT-In empanelled VAPT for Noida and Greater Noida fintech, payment, edtech and IT-services clients across Sectors 18, 62, 125, 132 and the Yotta NM1 belt.",
    body: [
      "Noida's cybersecurity profile is unlike any other NCR metro. The Noida Expressway corridor (Sectors 125, 132, 142 and 150) hosts the newer fintech, payment-aggregator and IT-services HQs. Sector 62 and Sector 63 anchor the older IT campuses (HCL, TCS, Birlasoft, Coforge). Sector 18 is the consumer-facing edge — neo-banking, e-commerce ops and BPO call-centre back-offices. Greater Noida adds the Yotta NM1 hyperscale data-centre belt and the Jewar airport greenfield build-out which is generating a steady stream of clean-slate ISMS implementations. The VAPT buyer is typically a head-of-engineering or a first CISO who has just inherited an RBI Payment Aggregator / Payment Aggregator-Payment Gateway licence ambition and a 90-day audit clock.",
      "For fintech and payment-aggregator clients along the Noida Expressway, scope is defined by the actual money-movement flow rather than a generic checklist: merchant-onboarding and KYC document-upload portals, payout APIs, refund and chargeback flows, settlement reconciliation, the NPCI rails (UPI Switch, NACH, IMPS sub-member), and the sponsor-bank federation. Reports are formatted for RBI Payment Aggregator / PA-PG audit submission per the March 2020 PA-PG circular DPSS.CO.PD.No.1810/02.14.008/2019-20, not just a generic CERT-In closure letter. We attach the merchant-due-diligence evidence the RBI Payment System Department actually asks for during the in-principle-to-final-licence transition.",
      "Edtech and consumer-SaaS scopes on the Noida Expressway and in Sector 18 lean to multi-tenant authz, OAuth / SSO trust with school or enterprise IdPs, mobile-app SDK security (often a long tail of third-party analytics SDKs that quietly handle child-data), and content-DRM. We map findings to SOC 2 Type II, ISO 27001:2022, and — where parent-school or minor data is involved — DPDP Act §9 (processing of personal data of children), which most generic vendors skip entirely. DPDP §9 introduces explicit verifiable-parental-consent and tracking-restriction obligations that edtech VAPT scoping has to test against the SDK trust chain.",
      "IT-services scopes in Sector 62 and Sector 63 are dominated by parent-client control-catalogue compliance — Fortune-500 client questionnaires, US-bank vendor-security questionnaires, EU healthcare HITRUST overlays. The VAPT closes both the CERT-In annual cycle for the IT-services company itself and the parent-client's vendor-security ask in one engagement. The same report typically feeds three or four parallel client questionnaires; we structure the evidence base to be portable across them.",
      "Data-centre tenants at Yotta NM1 and the adjacent CtrlS Noida facility get a tenant-side VAPT plus a shared-responsibility-line memo that distinguishes what the tenant owns (compute, network policy, IAM, data, encryption keys, BCP) from what the colocation operator owns (physical, power, cooling, cross-connect, building access). The shared-responsibility memo is the artefact regulators ask for when a tenant points at the colocation operator's certifications and the auditor wants explicit gap-closure evidence on the tenant's side of the line.",
      "Procurement at Noida fintechs is unusual — CTO and CFO close the deal, often with the sponsor-bank's compliance team consulted because the sponsor's audit cycle is what drives the fintech's audit clock. RBI in-principle approval deadlines are short, and the engagement plan has to fit inside that window. We publish a phased findings stream during the test rather than holding everything for a final report, so engineering can start fixing on week two and the sponsor-bank's compliance team can see closure progress in real time. Closure exhibits are formatted for RBI Payment System Department submission and (where relevant) for NPCI on-boarding evidence on top.",
      "Onsite kickoff in Noida is next-day from Mumbai BKC — BOM-DEL morning flight plus a Yamuna Expressway or DND drive into the relevant sector. For multi-week engagements we share a Delhi-resident consultant with the Gurugram practice so NCR mobility is tight and we are not flying a fresh consultant in for every sprint review. Same consultant covers Noida and Gurugram in a combined NCR engagement at no double-mobilisation charge — most NCR-headquartered clients buy that combined coverage rather than treating the two cities as separate metros.",
      "The Jewar airport greenfield is generating a new buyer cluster — logistics, ground-handling and airport-tenant SaaS — that needs clean-slate ISMS implementations and CERT-In VAPT against pre-production estates. We have a starter SoW for these greenfield engagements that overlaps a Macksofy CISO-as-a-service partial-time engagement with the VAPT cycle so the airport-tenant CTO gets policy, technical testing and audit-readiness in a single contract rather than three sequential ones.",
    ],
    buyerConcerns: [
      "RBI Payment Aggregator / PA-PG audit submission format and merchant-due-diligence evidence",
      "Payout, refund and settlement-reconciliation API abuse paths and NPCI rail authz",
      "Merchant-onboarding KYC and OVD-upload portals — document-replay and impersonation paths",
      "DPDP Act §9 verifiable-parental-consent and SDK-trust-chain evidence for edtech",
      "Mobile-SDK and content-DRM weaknesses for consumer fintech and edtech",
      "SOC 2 Type II + ISO 27001:2022 evidence pack for parent-client vendor-security questionnaires",
      "Yotta NM1 / CtrlS Noida shared-responsibility-line memo for data-centre tenants",
      "Sponsor-bank audit-cycle synchronisation for RBI in-principle-to-final transitions",
      "NPCI on-boarding evidence alongside RBI PA-PG submission",
    ],
    differentiators: [
      "Reports formatted for RBI Payment System Department submission (PA-PG circular DPSS.CO.PD.No.1810/02.14.008/2019-20), not generic CERT-In closure letters.",
      "Phased findings stream during the test so engineering starts fixing on week two and the sponsor-bank's compliance team sees closure progress in real time before the final report lands.",
      "Edtech scoping that explicitly covers DPDP Act §9 verifiable-parental-consent and SDK trust-chain testing — most generic vendors miss this entirely.",
      "Shared-responsibility-line memo for Yotta NM1 / CtrlS Noida tenants — distinguishes tenant-owned controls from colocation-operator controls so regulators get a clean line.",
      "Combined NCR engagement covering Noida and Gurugram with a single Delhi-resident tech lead — no double mobilisation, single evidence pack, one closure letter.",
    ],
    seoDescription:
      "CERT-In empanelled VAPT services in Noida for fintech, payment, edtech and IT-services firms. RBI PA-PG aligned reports. Sector 18, 62, 125 and 132 onsite.",
    keywords: [
      "VAPT services Noida",
      "VAPT Noida fintech",
      "RBI PA-PG VAPT Noida",
      "payment aggregator VAPT Noida",
      "edtech VAPT Noida",
      "Sector 62 VAPT Noida",
      "CERT-In VAPT Noida",
      "Greater Noida VAPT",
      "Noida Expressway penetration testing",
    ],
    stats: [
      { value: "40+", label: "Noida engagements" },
      { value: "45-90 min", label: "From IGI to any sector" },
      { value: "Yotta NM1", label: "Data-centre coverage" },
      { value: "RBI PA-PG", label: "Submission format" },
    ],
    methodology: [
      {
        phase: "01 · Licence-Clock Scoping",
        activities: [
          "RBI PA-PG in-principle / final-licence deadline pinned against engagement phases",
          "Sponsor-bank compliance team looped in on closure-progress visibility",
          "Yotta NM1 / CtrlS Noida shared-responsibility-line definition where data-centre tenancy is in scope",
          "Combined NCR scope vs Noida-only scope decision with the Gurugram practice",
        ],
      },
      {
        phase: "02 · Money-Movement & KYC Recon",
        activities: [
          "Merchant-onboarding portal and OVD-upload flow inventory",
          "Payout, refund and settlement-reconciliation API surface mapping",
          "NPCI rail authz path enumeration (UPI Switch, NACH, IMPS sub-member)",
          "Mobile-app reversing with focus on third-party SDK trust chain",
        ],
      },
      {
        phase: "03 · Manual Exploitation",
        activities: [
          "Burp Pro abuse-case testing on payout and refund APIs — race conditions, idempotency violations, replay",
          "OVD-upload portal document-replay, impersonation and template-injection testing",
          "DPDP §9 verifiable-parental-consent flow testing on edtech and minor-data scopes",
          "Yotta NM1 tenant-side network policy, IAM and encryption-key custody review",
        ],
      },
      {
        phase: "04 · Phased Reporting",
        activities: [
          "Week-two phased findings stream to engineering and the sponsor-bank compliance team",
          "Final report in RBI Payment System Department submission format",
          "NPCI on-boarding evidence pack where relevant",
          "Parent-client SOC 2 / ISO 27001:2022 / HITRUST crosswalk for IT-services clients",
        ],
      },
      {
        phase: "05 · Re-test & Sponsor Handover",
        activities: [
          "Free re-test of Critical and High inside the RBI remediation window",
          "Sponsor-bank handover call with the fintech's CTO present",
          "CERT-In empanelled closure letter and PA-PG submission pack",
          "Greenfield CISO-as-a-service overlay where Jewar airport-tenant clients need it",
        ],
      },
    ],
    industries: [
      {
        name: "Payment aggregators",
        blurb: "Noida Expressway PA / PA-PG licensees — payout, refund, settlement and sponsor-bank federation VAPT.",
      },
      {
        name: "Lending fintechs",
        blurb: "Digital-lending and BNPL fintechs — loan origination, partner-bank API and FLDG-flow authorisation testing.",
      },
      {
        name: "Edtech",
        blurb: "Sector 18 and Noida Expressway consumer edtech — DPDP §9 minor-data and SDK trust-chain coverage.",
      },
      {
        name: "IT-services majors",
        blurb: "Sector 62 / 63 IT-services campuses — parent-client questionnaire and SOC 2 Type II evidence in one cycle.",
      },
      {
        name: "Data-centre tenants",
        blurb: "Yotta NM1 and CtrlS Noida tenants — tenant-side VAPT plus shared-responsibility-line memo.",
      },
      {
        name: "Jewar airport tenants",
        blurb: "Greenfield logistics, ground-handling and airport SaaS — clean-slate ISMS plus CERT-In VAPT bundle.",
      },
    ],
    deliverables: [
      "VAPT report in RBI Payment System Department PA-PG submission format",
      "Merchant-due-diligence evidence pack for the RBI in-principle-to-final transition",
      "Phased findings stream during the test for engineering and the sponsor-bank compliance team",
      "NPCI on-boarding evidence pack where relevant",
      "DPDP §9 verifiable-parental-consent and SDK trust-chain evidence for edtech",
      "Yotta NM1 / CtrlS Noida shared-responsibility-line memo for data-centre tenants",
      "Free re-test of every Critical and High inside the RBI remediation window",
      "CERT-In empanelled closure letter and combined NCR (Noida + Gurugram) coverage option",
    ],
    caseStudy: {
      industry: "Noida Expressway-headquartered Payment Aggregator (RBI in-principle holder)",
      scope: "VAPT on 50 internet-facing apps, payout/refund/settlement APIs, NPCI rail edge, merchant-onboarding KYC portal; PCI v4.0.1 SAQ-D readiness; DPDP RoPA across 11 systems; six-week engagement against the RBI in-principle-to-final transition window",
      outcome: "RBI Payment System Department submission accepted first read; 14 Highs and 26 Mediums closed in 39 days; one payout-API idempotency race that would have allowed refund-replay double-credit, closed pre-sponsor-bank-cutover; sponsor-bank compliance team adopted the Macksofy weekly findings stream as the new vendor baseline for subsequent fintechs in their portfolio.",
    },
    faqs: [
      {
        q: "Can you fit a VAPT inside our 90-day RBI in-principle-to-final-licence window?",
        a: "Yes. The standard Noida fintech engagement is sized at five to six weeks of testing plus a built-in re-test window. We publish a phased findings stream from week two so engineering starts fixing before the final report lands, which means closure can complete inside a 90-day in-principle clock.",
      },
      {
        q: "Will you submit our PA-PG report to the RBI Payment System Department directly?",
        a: "Submission is always via the fintech — RBI does not accept third-party submissions. We provide the report in RBI submission format, the CERT-In empanelled letter, the merchant-due-diligence evidence pack and an on-call senior who joins clarification calls if asked.",
      },
      {
        q: "Do you cover DPDP §9 minor-data obligations for our Noida edtech product?",
        a: "Yes. The edtech playbook explicitly tests the verifiable-parental-consent capture flow, the withdrawal-of-consent propagation, the tracking-restriction obligation under DPDP §9 and the third-party SDK trust chain that often quietly handles child-data.",
      },
      {
        q: "Can you handle our Yotta NM1 tenancy without scope conflicts with the colocation operator?",
        a: "Yes. We ship a shared-responsibility-line memo that explicitly distinguishes tenant-owned controls (compute, network policy, IAM, encryption keys, BCP) from colocation-operator controls (physical, power, cooling, cross-connect). Yotta's existing certifications cover the operator side; we close the tenant side without scope overlap.",
      },
      {
        q: "Can we combine Noida and Gurugram in one NCR engagement?",
        a: "Yes — most NCR-headquartered clients prefer this. A single Delhi-resident Macksofy lead manages both metros with one evidence pack and one closure letter. We do not double-charge mobilisation or report-writing.",
      },
      {
        q: "Do you support Jewar airport tenant greenfield ISMS plus VAPT?",
        a: "Yes — we have a starter SoW for Jewar airport-tenant greenfield clients that bundles a CISO-as-a-service partial-time engagement with the VAPT cycle so the tenant CTO gets policy framework, technical testing and audit-readiness in one contract.",
      },
    ],
  },

  // 6 ─ Pune · VAPT ────────────────────────────────────────────────
  {
    citySlug: "pune",
    serviceSlug: "vapt",
    headline: "VAPT Services in Pune · Auto, IT & OT",
    lead: "CERT-In empanelled VAPT for Hinjewadi IT majors, Chakan auto OEMs and Magarpatta GCCs — including IEC-62443-aligned OT/ICS scopes.",
    body: [
      "Pune VAPT splits across three distinct geographies and three distinct buyer profiles. Hinjewadi Phase I, II and III host the IT-services majors and the GCC delivery centres — Infosys, Tata Technologies, Cognizant, Wipro, Capgemini and a long tail of mid-size product companies. Magarpatta and Kharadi host the BPO / GCC ecosystem with a strong US and European parent footprint. The Chakan, Talegaon and Ranjangaon belt — and the older Pimpri-Chinchwad PCMC industrial corridor — hosts the auto OEMs, Tier-1 suppliers and the OT-heavy manufacturing scope that diverges hardest from the rest of Macksofy's India practice. Connected-vehicle telematics, OEM-to-Tier-1 supplier networks and live shopfloor OT exposure are real engagement scope here, not buzzwords.",
      "For auto OEMs in Chakan (Mercedes-Benz, Volkswagen, Mahindra, Tata Motors) and Tier-1 suppliers in Talegaon and Ranjangaon (Bosch, Magneti Marelli, Continental, Bharat Forge), we run IEC-62443 LSL-3 aligned OT segmentation reviews alongside the IT-side VAPT. The test boundary is explicit: business IT (corporate ERP, MES gateways, engineering EDA workstations), the IT-OT DMZ (Purdue Level 3.5), MES and SCADA at Purdue Levels 3 and 2, and PLC / DCS field devices at Levels 1 and 0. The supplier-VPN attack surface — the inbound connectivity Tier-1 and Tier-2 suppliers have into the OEM corporate segment — has become the favourite ransomware entry path for ALPHV/BlackCat, LockBit and Cl0p affiliates targeting the Indian auto industry; we test that path explicitly with attention to the legacy IPSec site-to-site tunnels still in production.",
      "Manual abuse-case testing on the OT side never runs against live PLCs without explicit HSE clearance. We use passive listening (Wireshark with the OT protocol dissectors — Modbus, EtherNet/IP, Profinet, OPC UA), Nessus Pro with OT-safe scan policies, the Macksofy fork of conpot for PLC fingerprinting in a staging environment, and BloodHound on the engineering-station AD forest. Findings on the OT side are categorised by remediation window — which can close in the next planned maintenance window (a Saturday changeover), which need a longer change-management cycle through the OEM's MES-validation process, and which require a Tier-1-supplier contract renegotiation because the exposure is contractual.",
      "For Hinjewadi IT-services and Magarpatta GCC clients, scopes look more like the Bengaluru SaaS pattern — multi-tenant authz, vendor APIs, SOC 2 Type II evidence — with a strong overlay of client-imposed cyber-control catalogues passed down from US automotive and EU automotive parents (Volkswagen Group's audit catalogue, BMW's information-security requirements, Mercedes-Benz's Group Information Security policy). The same VAPT produces a CERT-In format report plus a TISAX (Trusted Information Security Assessment Exchange) Level 2 or Level 3 readiness pack which is the parent-control-catalogue most German and EU OEMs actually require from their Pune partners.",
      "Senior consultants drive from Mumbai BKC — three hours on the Mumbai-Pune Expressway with same-day arrival the norm. OT scopes always include at least one full day onsite walking the shopfloor with the plant HSE manager and the IT-OT convergence lead. For Chakan, Talegaon and Ranjangaon plants we plan the onsite block around shift changeover so testing weeks do not collide with production peaks. Hinjewadi engagements are easier — onsite at the client campus same-day, remote testing through the rest of the engagement.",
      "Procurement at Pune auto OEMs is unusual: the plant IT head proposes the SoW, the head of QA validates against TISAX or VDA-ISA, and the head of plant operations or HSE signs off if any OT-touching work is in scope. Tier-1 suppliers add their OEM customer's compliance team to the loop because the supplier's audit cycle has to satisfy the OEM. We size proposals to match — fixed-fee SoW with explicit HSE blackout windows around critical production lines, no ad-hoc probes near live PLCs, no scans during shift changeover. The report calls out which findings can be remediated in the next maintenance window and which need a longer change-management cycle.",
      "Pune IT-services procurement closes through the delivery-centre head and the client-account lead, sometimes with the US/EU client's CISO copied for the larger accounts. We sync the VAPT report to the next client-questionnaire cycle and ship a sanitised vendor pack — typically SIG Lite, CAIQ Lite and (for automotive clients) TISAX Level 2 readiness — alongside the technical findings. Where the client also has an Indian regulator overlay (BFSI captive ops in Magarpatta, for example), we add an RBI MD-ITGRC crosswalk to the same evidence base.",
      "For listed Pune-headquartered manufacturers — auto-component listed entities and pharma R&D campuses — the engagement also produces SEBI listing-obligation cyber-security disclosure evidence that the company secretary needs for the next annual report. SEBI's Listing Obligations and Disclosure Requirements (LODR) Schedule II Part B now requires explicit board-level cyber oversight disclosure, and the VAPT report's executive summary is shaped to feed that disclosure rather than require a separate write-up.",
    ],
    buyerConcerns: [
      "IEC-62443 LSL-3 aligned OT/IT segmentation evidence for auto OEMs and Tier-1 suppliers",
      "Supplier-VPN and Tier-1 / Tier-2 network attack surface — favourite ALPHV/LockBit entry path",
      "Connected-vehicle telematics, OTA-update edge and OEM cloud-backend testing",
      "MES / SCADA / PLC exposure on shopfloor segments with Wi-Fi overlap",
      "SOC 2 Type II + ISO 27001:2022 evidence for Hinjewadi IT-services majors",
      "TISAX Level 2 / Level 3 and VDA-ISA parent-control-catalogue readiness",
      "Same-day onsite from Mumbai BKC for OT walk-throughs and HSE coordination",
      "SEBI LODR Schedule II cyber-oversight disclosure for listed Pune manufacturers",
      "Remediation-window classification — maintenance window vs longer change-management cycle",
    ],
    differentiators: [
      "Genuine OT-side experience — IEC-62443 LSL-3 segmentation reviews, passive OT protocol listening (Modbus, EtherNet/IP, Profinet, OPC UA) and shopfloor walk-throughs with HSE coordination, not IT-side VAPT relabelled.",
      "TISAX Level 2/3 and VDA-ISA crosswalks shipped alongside the CERT-In VAPT report — the parent-control-catalogue most German and EU automotive parents actually require from their Pune partners.",
      "Same-day drive from Mumbai BKC (3 hours on the Mumbai-Pune Expressway) for any Hinjewadi, Magarpatta, Kharadi, Chakan, Talegaon or Ranjangaon site — no flight overhead, no airport bench drag.",
      "Findings categorised by remediation window — next maintenance Saturday vs longer MES-validation cycle vs supplier-contract renegotiation — so the plant ops head can resource accordingly.",
      "SEBI LODR Schedule II cyber-oversight disclosure evidence built into the executive summary for listed Pune-headquartered manufacturers.",
    ],
    seoDescription:
      "CERT-In empanelled VAPT services in Pune for auto OEMs, OT/ICS, Hinjewadi IT and Magarpatta GCCs. IEC-62443 + TISAX aligned. Same-day from Mumbai BKC.",
    keywords: [
      "VAPT services Pune",
      "VAPT Hinjewadi",
      "OT VAPT Pune",
      "IEC 62443 audit Pune",
      "Chakan auto VAPT",
      "TISAX VAPT Pune",
      "Magarpatta VAPT",
      "CERT-In VAPT Pune",
      "Pune manufacturing cybersecurity",
    ],
    stats: [
      { value: "55+", label: "Pune engagements" },
      { value: "3 hr", label: "Drive from Mumbai BKC" },
      { value: "IEC-62443", label: "OT methodology" },
      { value: "TISAX L2/L3", label: "Auto-parent ready" },
    ],
    methodology: [
      {
        phase: "01 · HSE-Aware Scope",
        activities: [
          "Joint kickoff with plant IT head, QA director and head of plant operations or HSE",
          "Shift-changeover and critical-line blackout windows agreed and locked into the test schedule",
          "Purdue-level scope decision — IT-only, IT-OT DMZ, MES/SCADA, field-device or full-stack",
          "TISAX Level 2 / Level 3 or VDA-ISA crosswalk target confirmed with the OEM parent's audit team",
        ],
      },
      {
        phase: "02 · IT-Side & AD",
        activities: [
          "External attack surface mapping against the OEM / supplier TLD set",
          "ADCS template enumeration with Certipy, BloodHound shortest-path on the engineering-station AD forest",
          "Supplier-VPN inbound surface — IPSec site-to-site tunnel review, MFA enforcement on remote access",
          "Connected-vehicle telematics edge and OEM cloud-backend (AWS Mumbai / Azure India South) testing",
        ],
      },
      {
        phase: "03 · OT-Side Walk-Through",
        activities: [
          "Shopfloor walk-through with plant HSE manager and IT-OT convergence lead",
          "Passive OT protocol listening (Wireshark with Modbus, EtherNet/IP, Profinet, OPC UA dissectors)",
          "IEC-62443 LSL-3 zone-and-conduit boundary review at Purdue Level 3.5 (IT-OT DMZ)",
          "MES gateway and SCADA HMI authentication review without active PLC probing",
        ],
      },
      {
        phase: "04 · Dual Reporting",
        activities: [
          "CERT-In format VAPT report with IEC-62443 LSL-3 evidence annex",
          "TISAX Level 2 / Level 3 or VDA-ISA crosswalk for the German / EU automotive parent",
          "Remediation-window classification per finding — maintenance Saturday, longer MES-validation, supplier-contract",
          "SEBI LODR Schedule II cyber-oversight evidence for listed Pune-headquartered manufacturers",
        ],
      },
      {
        phase: "05 · Re-test & Plant Handover",
        activities: [
          "Free re-test of Critical and High inside the OEM's next maintenance window",
          "Plant-handover memo for the HSE manager and IT-OT convergence lead",
          "CERT-In empanelled closure letter formatted for the OEM's parent audit team",
          "Supplier-contract memo where exposures require Tier-1 / Tier-2 renegotiation",
        ],
      },
    ],
    industries: [
      {
        name: "Auto OEMs",
        blurb: "Chakan and PCMC OEMs — IT, IT-OT DMZ and shopfloor OT segmentation with TISAX Level 2/3 crosswalk.",
      },
      {
        name: "Tier-1 auto suppliers",
        blurb: "Talegaon, Ranjangaon and PCMC Tier-1s — supplier-VPN surface, MES gateway and VDA-ISA readiness.",
      },
      {
        name: "Hinjewadi IT-services",
        blurb: "Phase I / II / III IT-services campuses — parent-client questionnaire and SOC 2 Type II evidence.",
      },
      {
        name: "Magarpatta & Kharadi GCCs",
        blurb: "US / EU enterprise GCCs — parent-control-catalogue VAPT with privilege-path testing to offshore prod.",
      },
      {
        name: "Pharma R&D campuses",
        blurb: "Pune pharma R&D — limited GMP overlay layered on top of the IT-services VAPT methodology.",
      },
      {
        name: "Listed Pune manufacturers",
        blurb: "Auto-component and engineering listed entities — SEBI LODR Schedule II cyber-oversight disclosure evidence.",
      },
    ],
    deliverables: [
      "VAPT report in CERT-In empanelled format with IEC-62443 LSL-3 evidence annex",
      "TISAX Level 2 / Level 3 and VDA-ISA crosswalk for German / EU automotive parents",
      "Shopfloor walk-through memo with HSE-manager and IT-OT convergence-lead sign-off",
      "Supplier-VPN attack-surface memo with Tier-1 / Tier-2 contractual exposure callouts",
      "Remediation-window classification per finding — maintenance Saturday, MES-validation cycle, supplier-contract",
      "SEBI LODR Schedule II cyber-oversight disclosure evidence for listed manufacturers",
      "Free re-test of every Critical and High inside the OEM's next maintenance window",
      "CERT-In empanelled closure letter and OEM-parent-audit handover pack",
    ],
    caseStudy: {
      industry: "Pune-headquartered Tier-1 Auto Supplier (Talegaon + Ranjangaon plants)",
      scope: "ISO 27001:2022 implementation, DPDP RoPA, IT + IT-OT DMZ + MES gateway VAPT across three plants, TISAX Level 3 readiness for the German OEM parent; eight-week engagement with three onsite legs",
      outcome: "ISO 27001 certification issued in 18 weeks; TISAX Level 3 readiness pack accepted by the OEM parent at the next vendor-audit cycle; OT/IT zoning hardened to IEC-62443 LSL-3; one supplier-VPN exposure that mirrored the entry path used in the 2022 Bharat-auto ALPHV incident, closed pre-disclosure; supplier-contract memo accepted by the OEM's procurement function as the new template for incoming Tier-2 onboardings.",
    },
    faqs: [
      {
        q: "Can you test our Chakan plant OT segment without disrupting production?",
        a: "Yes. OT-side testing runs against passive listening (Wireshark with the OT protocol dissectors) and HSE-cleared zone-and-conduit reviews, never active PLC probing on live lines. The onsite block is planned around shift changeover and explicit blackout windows around critical production lines.",
      },
      {
        q: "Do you produce TISAX Level 2 / Level 3 readiness alongside the CERT-In VAPT?",
        a: "Yes — and for most Pune auto-supplier engagements TISAX readiness is the parent-control-catalogue that actually matters. We crosswalk the same evidence base to TISAX and (where the OEM parent uses it) VDA-ISA, shipped alongside the CERT-In format report.",
      },
      {
        q: "How quickly can you be onsite in Hinjewadi or Chakan?",
        a: "Same-day for kickoff if requested before noon. Senior consultants drive from Mumbai BKC on the Mumbai-Pune Expressway (three hours) and reach any Hinjewadi, Magarpatta, Kharadi, Chakan, Talegaon or Ranjangaon site by lunchtime. No flight overhead.",
      },
      {
        q: "Will your VAPT close the SEBI LODR Schedule II cyber-oversight disclosure for our listed Pune manufacturer?",
        a: "Yes. The executive summary is shaped to feed the SEBI LODR Schedule II board-cyber-oversight disclosure that the company secretary needs for the annual report, rather than requiring a separate write-up. The board pack and the regulator pack share the same evidence base.",
      },
      {
        q: "How do you handle our Tier-1 supplier-VPN attack surface without breaking commercial relationships?",
        a: "We document supplier-VPN exposures with explicit contractual-vs-technical classification. Findings that require a Tier-1 / Tier-2 contract renegotiation are flagged separately so the OEM's procurement function can resource the renegotiation, rather than the IT team trying to close a problem that is contractual at root.",
      },
      {
        q: "Do you support listed pharma R&D scopes in Pune alongside auto engagements?",
        a: "Yes — we layer a limited GMP overlay (21 CFR Part 11, GxP data-integrity) on top of the IT-services VAPT methodology for Pune pharma R&D clients. The Hyderabad pharma-playbook is heavier; the Pune R&D scope is usually narrower and folds cleanly into the IT-side VAPT cycle.",
      },
    ],
  },

  // 7 ─ Mumbai · Red Teaming ────────────────────────────────────────────────
  {
    citySlug: "mumbai",
    serviceSlug: "red-teaming",
    headline: "Red Team Operations in Mumbai · BFSI",
    lead: "Goal-based adversary simulations against Mumbai BFSI — net-banking, treasury, broker terminals and SWIFT-style scenarios — run from our BKC HQ.",
    body: [
      "Red teaming Mumbai BFSI is not a wider VAPT and the audit committee should not buy it as one. The board-level question is narrow and specific: can a determined attacker — funded, patient, willing to spend three months on initial access — reach money movement, market data or customer accounts inside the bank before the SOC notices, and what would the bank actually do when the first alert fires? Macksofy answers that question with goal-based, intelligence-led adversary simulations that combine OSINT, spear-phishing tuned to the BKC and Nariman Point exec calendar, physical pretexting against actual BFSI office buildings, and the technical exploitation chain that lands once initial access is established.",
      "Typical scenarios for a Mumbai private bank or large cooperative bank: SWIFT or treasury reach from a compromised back-office user in the Lower Parel ops centre; ATM-network compromise via a card-personalisation vendor laptop, FIN8/Hidden-Cobra TTPs explicitly modelled; market-data tampering on a broker desk by way of the Refinitiv/Bloomberg feed-handler; bulk customer-account access through the call-centre CRM at the Goregaon or Powai back-office; and ADCS abuse paths (ESC1, ESC4, ESC8) from a junior treasury-ops user to Domain Admin on the corporate forest backing core banking. Each scenario is mapped to TIBER-EU-style threat-intelligence and to the RBI Cyber Resilience expectations the board reports against — the November 2023 RBI Master Direction on IT Governance and the underlying Cyber Security Framework circular DBS.CO.CSITE.BC.11/33.01.001/2015-16.",
      "Engagements run six to ten weeks end-to-end. The first two weeks are intelligence prelude — OSINT against BKC, Lower Parel and Nariman Point exec teams, vendor mapping against the bank's known third-party ecosystem (Tata Communications, Sify, Wipro Infrastructure Services for managed-services trails; printer fleets, badge-system vendors and pantry contractors for physical pretexting), and credential-leak harvesting against the bank's exact TLDs using DeHashed, IntelX and our own dark-web monitoring feed. Initial-access campaigns then run a parallel split — spear-phish tuned to a recent regulatory deadline the bank is publicly known to be working against, plus optionally a vendor-laptop physical drop at a BKC tower lobby.",
      "Foothold and EDR evasion is genuine tradecraft, not a Cobalt Strike default profile. We run custom payloads with indirect-syscall execution, process hollowing into trusted binaries, AMSI patching tuned to the bank's actual EDR (CrowdStrike Falcon, SentinelOne Singularity, Microsoft Defender for Endpoint or, on some Mumbai cooperative banks, Trend Micro Apex One), and a Macksofy-internal C2 framework with rotating egress through Cloudflare Workers and AWS API Gateway. Persistence is established sparingly — exactly enough to survive a credential rotation, no more — because the audit committee does not want to find Macksofy beacons in the estate six months later.",
      "Lateral movement on a Mumbai BFSI estate follows a predictable shape: BloodHound the engineering-station OU, find the ADCS template misconfig (ESC1 through ESC8 — most Indian banks still ship at least one), pivot via Kerberos delegation (RBCD, S4U2Self) to a high-value service account, and reach the SWIFT gateway, the OMS, or the core-banking jump host. The goal varies by mandate — sometimes the audit committee wants a silent Domain Admin proof, sometimes a treasury-side money-movement simulation against the FIN8 ATM-network TTP playbook, sometimes a market-data tampering proof against the broker desk. Cobalt Strike, Sliver and Mythic are all in play; Brute Ratel runs only where RoE explicitly permits.",
      "Physical pretexting on Mumbai BFSI offices is rehearsed against actual building conventions, not generic playbooks. BKC towers (One BKC, Maker Maxity, Parinee Crescenzo) run distinct visitor-pass workflows and pantry-vendor schedules; Lower Parel mill compounds (Phoenix Mills, Kamala Mills) have different security postures than the Nariman Point heritage towers (Maker Chambers, Air India, Express Towers); the Andheri SEEPZ and MIDC ITES blocks have shared-building backbones that affect both physical and network paths. We rehearse pretexts that fit each conventon — not a US-bank social-engineering script translated into Hinglish.",
      "Engagements run under written rules of engagement signed by the CISO, head of operations and the regulator-facing audit committee chair. Real-time deconfliction with the in-house SOC is handled via a private Signal or encrypted Teams channel so a live IR call never gets confused with a red-team artefact. We split into a red cell and a purple-team review cell — the purple cell sits with the SOC at engagement close for a full week, walking every detection-gap, writing a concrete tuning backlog for SIEM, EDR and identity controls, and delivering paired Sigma/Splunk rules per missed event. The audit committee gets a board-grade narrative, an MITRE ATT&CK heatmap (TTPs used vs detected), and a forward-looking detection-engineering roadmap.",
      "Mumbai BFSI procurement on red team is unusual — the CISO proposes, the head of operations and the CRO co-sign, the audit committee chair gives explicit board-recorded approval. Some listed banks now run an annual red team as a board-mandated control rather than a project; we offer an annual retainer that runs one full engagement plus two narrower scope-restricted exercises (a phishing-only campaign and a physical-only exercise) so the annual budget covers three discrete board-reportable events rather than a single point-in-time test. Mumbai cooperative banks are starting to follow suit — the RBI Department of Supervision now asks about red-team posture in the larger urban-cooperative bank inspections.",
    ],
    buyerConcerns: [
      "Realistic attack path to SWIFT, treasury or settlement systems with FIN8-style ATM-network TTP modelling",
      "ATM-network and card-personalisation vendor entry vectors",
      "Broker-terminal and Refinitiv/Bloomberg market-data tampering scenarios",
      "Call-centre CRM and bulk-customer-data exfiltration from Goregaon / Powai back-offices",
      "ADCS ESC1-ESC8 abuse paths from junior treasury-ops users to Domain Admin",
      "SOC detection-gap evidence aligned to RBI Cyber Resilience board reporting (CSF Annex-1)",
      "Physical pretexting that fits BKC / Lower Parel / Nariman Point office building conventions",
      "Purple-team handover with paired Sigma/Splunk rules per missed event",
      "Annual board-mandated red-team posture for listed BFSI and large urban-cooperative banks",
    ],
    differentiators: [
      "Scenario library specific to Mumbai BFSI — SWIFT and treasury reach, ATM-network compromise modelled on FIN8/Hidden-Cobra TTPs, broker-desk Refinitiv/Bloomberg market-data tampering, call-centre CRM bulk exfil, ADCS ESC1-ESC8 paths — not US-bank templates translated into Hinglish.",
      "Physical pretexting rehearsed against actual BKC (One BKC, Maker Maxity, Parinee Crescenzo), Lower Parel (Phoenix Mills, Kamala Mills) and Nariman Point (Maker Chambers, Air India, Express Towers) office conventions and visitor-pass workflows.",
      "Built-in purple-team handover week that converts the red-team narrative into paired Sigma/Splunk rules and a SIEM / EDR / IAM tuning backlog the bank's SOC can execute the same week.",
      "Macksofy-internal C2 framework with rotating egress through Cloudflare Workers and AWS API Gateway plus indirect-syscall payloads tuned to the bank's actual EDR (CrowdStrike Falcon, SentinelOne Singularity, MDE) — no shared infrastructure, no off-the-shelf Cobalt Strike defaults.",
      "Annual retainer option that splits the budget across one full engagement plus a phishing-only campaign and a physical-only exercise — three board-reportable events for the audit committee per year.",
    ],
    seoDescription:
      "Goal-based red team operations in Mumbai for BFSI, NBFCs and brokers. SWIFT, treasury and broker-desk scenarios. RBI Cyber Resilience aligned. BKC HQ.",
    keywords: [
      "red team Mumbai",
      "red teaming Mumbai BFSI",
      "adversary simulation Mumbai",
      "SWIFT red team Mumbai",
      "treasury red team Mumbai",
      "broker red team Mumbai",
      "TIBER-like exercise India",
      "Mumbai bank red teaming",
      "purple team Mumbai",
    ],
    stats: [
      { value: "30+", label: "BFSI red teams" },
      { value: "6-10 wks", label: "Avg engagement" },
      { value: "BKC HQ", label: "Mumbai team base" },
      { value: "Annual", label: "Board-mandated retainer option" },
    ],
    methodology: [
      {
        phase: "01 · Mandate & RoE",
        activities: [
          "Audit-committee-chair signed mandate, CISO + head of operations + CRO co-sign",
          "Scenario selection — SWIFT reach, ATM-network FIN8, broker-desk market-data tamper, call-centre CRM exfil, ADCS-to-DA",
          "RBI Cyber Resilience board-reporting alignment — what the audit committee will see at the close-out",
          "SOC deconfliction channel on private Signal / encrypted Teams; white-cell appointment",
        ],
      },
      {
        phase: "02 · Intel Prelude",
        activities: [
          "OSINT against BKC, Lower Parel and Nariman Point exec calendar; vendor and third-party mapping",
          "Credential-leak harvesting against the bank's TLDs (DeHashed, IntelX, Macksofy dark-web feed)",
          "Physical-pretext rehearsal against the relevant tower (One BKC, Maker Maxity, Phoenix Mills, Maker Chambers)",
          "C2 infrastructure stand-up with rotating egress through Cloudflare Workers and AWS API Gateway",
        ],
      },
      {
        phase: "03 · Initial Access & EDR Bypass",
        activities: [
          "Spear-phish tuned to a recent regulatory deadline the bank is publicly working against",
          "Optional vendor-laptop physical drop or pretexted entry at the relevant tower",
          "Custom payloads with indirect-syscall execution and process hollowing tuned to the bank's EDR (Falcon, SentinelOne, MDE)",
          "Foothold persistence sized to survive credential rotation without over-staying",
        ],
      },
      {
        phase: "04 · Lateral & Objective",
        activities: [
          "BloodHound shortest-path on the engineering-station and treasury-ops AD forests",
          "ADCS ESC1-ESC8 template abuse with Certipy; Kerberos delegation (RBCD, S4U2Self) escalation",
          "Objective execution — SWIFT reach proof, ATM-network FIN8 simulation, OMS market-data tamper, CRM exfil",
          "MITRE ATT&CK heatmap construction in real time alongside the SOC's detected-event log",
        ],
      },
      {
        phase: "05 · Purple Handover",
        activities: [
          "Full week embedded with the SOC walking every missed detection event-by-event",
          "Paired Sigma / Splunk / Elastic rules per missed event delivered to the SIEM team",
          "Detection-engineering roadmap for the next two quarters",
          "Board-grade narrative and MITRE ATT&CK heatmap for the audit committee close-out",
        ],
      },
    ],
    industries: [
      {
        name: "Tier-1 private banks",
        blurb: "Mumbai-headquartered private banks — SWIFT, treasury, ADCS-to-DA and call-centre CRM scenarios.",
      },
      {
        name: "Public-sector banks",
        blurb: "Mumbai PSB HQs and large back-offices — RBI Department of Supervision-grade red team with conservative RoE.",
      },
      {
        name: "Large urban cooperative banks",
        blurb: "Mumbai UCBs newly under RBI red-team-posture scrutiny — phishing + physical + technical first-time engagements.",
      },
      {
        name: "Stock brokers & MIIs",
        blurb: "BKC brokers and Mumbai-headquartered MIIs — broker-desk and OMS-to-exchange tampering scenarios.",
      },
      {
        name: "Payment aggregators",
        blurb: "BKC / Lower Parel PA-PG licensees — payout-rail and merchant-impersonation scenarios.",
      },
      {
        name: "Listed insurers",
        blurb: "Mumbai-headquartered life and general insurers — claims-fraud and PAS-administrator scenarios.",
      },
    ],
    deliverables: [
      "Engagement narrative (attack timeline with day-by-day actions)",
      "MITRE ATT&CK heatmap of TTPs used vs detected by the bank's SOC",
      "Paired Sigma / Splunk / Elastic rules per missed detection event",
      "Detection-engineering roadmap for the next two quarters",
      "Audit-committee board-grade executive briefing tied to RBI Cyber Resilience reporting",
      "Physical-pretext lessons-learned memo for the bank's facilities and security teams",
      "Purple-team workshop transcript and follow-up playbook for the SOC",
      "Annual-retainer option (one full engagement + phishing-only + physical-only) where applicable",
    ],
    caseStudy: {
      industry: "Listed Mumbai Private Bank",
      scope: "Six-week goal-based red team — objective: reach the SWIFT gateway and the OMS broker-desk feed-handler without SOC detection by D+21; ADCS abuse on the corporate AD forest in scope",
      outcome: "Initial access via spear-phish against a treasury-ops user during the bank's known RBI inspection prep week; ADCS ESC4 path from the treasury user to a high-value service account on D+9; SWIFT-gateway jump host reached at D+14 without SOC detection; full purple-team handover with 11 missed alerts mapped to SIEM rule gaps; 4 detection use-cases written by Macksofy and adopted by the bank SOC; audit committee adopted the engagement as the new annual board-mandated baseline.",
    },
    faqs: [
      {
        q: "Can you bypass our CrowdStrike Falcon / SentinelOne / Microsoft Defender for Endpoint deployment?",
        a: "Yes — our Mumbai bench operates in environments protected by all three commercial EDRs and has documented bypass tradecraft per vendor. The report includes the exact tradecraft so the bank's SOC can build paired detections; we do not hold back IoCs after engagement close.",
      },
      {
        q: "Will the SOC know we are running a red team, and how does deconfliction work for a live IR call?",
        a: "The SOC is not informed in advance — that is the point. Deconfliction runs through a private Signal or encrypted Teams channel with the white cell (CISO + head of operations + audit committee chair). If a genuine live IR event begins during the engagement, the white cell pauses the red team and the SOC handles the real incident with no contamination.",
      },
      {
        q: "Can you model FIN8 / Hidden-Cobra ATM-network TTPs against our card-personalisation vendor estate?",
        a: "Yes — this is one of the highest-impact Mumbai BFSI scenarios we run. We model the published FIN8/Hidden-Cobra TTP set (sdbbot, FlawedAmmyy, ATM-payload deployment patterns) against the bank's actual card-personalisation vendor connectivity, with explicit RoE that stops short of live cash dispensing.",
      },
      {
        q: "Do you do physical pretexting in BKC towers and Lower Parel mill compounds safely?",
        a: "Yes. Physical pretexting is rehearsed against the actual visitor-pass workflows and pantry-vendor schedules of the tower in scope (One BKC, Maker Maxity, Parinee Crescenzo, Phoenix Mills, Kamala Mills, Maker Chambers). The RoE explicitly excludes any action that would cause physical safety risk or trigger building-evacuation procedures.",
      },
      {
        q: "How does the purple-team handover work — is it just a workshop?",
        a: "It is a full embedded week, not a workshop. A Macksofy detection-engineering analyst sits with the SOC for five working days, walking every missed event, writing paired Sigma / Splunk / Elastic rules, and tuning EDR and identity controls. The SOC ends the week with a deployed detection backlog, not just a slide deck.",
      },
      {
        q: "Can listed BFSI clients run this as an annual board-mandated control?",
        a: "Yes — we offer an annual retainer that splits the budget across one full red team, a narrower phishing-only campaign and a physical-only exercise. The audit committee gets three discrete board-reportable events per year, which is how several Mumbai listed banks now structure their cyber-resilience programme post the RBI MD-ITGRC update.",
      },
    ],
  },

  // 8 ─ Gurugram · Red Teaming ────────────────────────────────────────────────
  {
    citySlug: "gurugram",
    serviceSlug: "red-teaming",
    headline: "Red Team Operations in Gurugram · BFSI",
    lead: "Adversary-simulation engagements built around Gurugram private-bank HQs, NBFC lenders and high-growth fintechs across Cyber City and Golf Course Road.",
    body: [
      "Gurugram is the corporate HQ city for India's largest private banks, every major insurer, more than six hundred global capability centres, and a long list of digital-lending, BNPL and travel/payments fintechs. Red-team scopes here are written around the way these businesses actually make money — credit-line origination, instant-disbursement APIs, partner-fintech connections to the core lending engine, the customer-facing onboarding stack, and the bancassurance edge that ties Sohna Road insurers to their private-bank distribution partners. The board-level question is the same as Mumbai's but the attack surface is different: where Mumbai's high-value target is SWIFT and treasury, Gurugram's is the loan-origination pipeline and the fraud-rules engine that gatekeeps it.",
      "Typical scenarios for a Gurugram private bank or NBFC lender: end-to-end fraudulent loan origination via a compromised partner-fintech API key in the digital-lending stack; bulk customer-account access via the contact-centre at Udyog Vihar or Sector 44; lateral movement from a DLF Cyber City Phase 3 multi-tenant office network into the private-bank corporate domain, exploiting the shared building backbone that is the inherent weakness of Cyberhub-style multi-tenant towers; privilege escalation from a junior risk-analyst account to the fraud-rules engine that approves credit lines (a path that would let an attacker silently raise the auto-approve threshold rather than steal money directly); and an ALPHV/BlackCat-flavoured ransomware detonation simulation against the insurer estate on Sohna Road with realistic encryption-throttle and tamper-of-VSS-snapshots TTPs but no actual destructive payload.",
      "For multi-bank scopes — and Gurugram is where multi-bank-group scopes happen, because the parent group typically owns a bank, an insurer, an asset manager and a brokerage all headquartered within five kilometres of each other — we run cross-entity lateral movement explicitly. Can an attacker who lands at the insurer pivot to the bank? Can a junior agent at the brokerage reach the asset manager's order-management system? The cross-entity privilege graph is rarely tested by single-entity red teams and is one of the highest-value scopes Gurugram CISOs commission.",
      "Engagements run six to eight weeks with a strong intelligence prelude — open-source reconnaissance of DLF Cyber City, Cyberhub and Golf Course Road exec teams; vendor mapping against the bank's known third-party ecosystem (Genpact, EXL, WNS, KPMG GBS as common shared-services trails); credential-leak harvesting against the bank's exact TLDs using DeHashed, IntelX and our own dark-web monitoring feed; and a physical-recon pass at the Cyber City and Cyberhub building lobbies to inventory visitor-pass workflows, badge-system vendors and pantry contractors. Reports map to RBI Cyber Resilience and the November 2023 MD-ITGRC, the parent group's red-team control catalogue (typically a derivative of NIST 800-53 rev 5 with FFIEC CAT overlays), and the MITRE ATT&CK enterprise matrix.",
      "Foothold and EDR evasion follows the Mumbai playbook with one key Gurugram difference: most Gurugram BFSI estates run Microsoft Defender for Endpoint in a Defender for Cloud / Sentinel-fed configuration because the parent group has standardised on the Microsoft stack. We tune indirect-syscall payloads, AMSI patching and process hollowing specifically against MDE telemetry — which behaves differently to CrowdStrike Falcon or SentinelOne Singularity. Persistence is established conservatively, sized to survive credential rotation but not live in the estate beyond engagement close.",
      "An ALPHV-style ransomware detonation simulation is now a high-frequency Gurugram scope, especially for the insurers. The engagement models the published ALPHV/BlackCat TTPs — initial access via VPN credentials harvested from infostealer logs, lateral movement via PsExec/WMI/RDP, privilege escalation through Kerberoasting and ADCS abuse, VSS shadow-copy deletion, encryption-throttle to evade EDR file-rate detection — without any destructive payload. The output is a simulation transcript and a recovery-playbook validation: would the insurer's BCP plan actually have worked, how long would the RTO have been, where would the failure modes have surfaced. The CFO and the head of operations care about this output more than the CISO does.",
      "Cross-tenant DLF Cyber City Phase 3 lateral movement deserves explicit attention. Most multi-tenant office buildings in Cyber City and Cyberhub share an L2 backbone that the bank's network team did not architect for and which the building-management contract does not adequately address. We test the lateral path explicitly — LLMNR/NBT-NS poisoning, IPv6 mitm6 takeover, SMB relay from a co-tenant floor — and split findings into 'bank perimeter' versus 'DLF building backbone' categories. The bank gets remediation on its own segment; the DLF facilities team gets a separate memo for the building-services contract.",
      "Procurement at Gurugram private banks and insurers runs through the CISO, the CRO and a board-level Cyber Risk Sub-Committee, with the audit committee chair giving explicit board-recorded approval. Several Gurugram private banks have moved to a TIBER-style RFP cycle inherited from the parent group — threat-intelligence-led, scenario-mandated, separate threat-intel and red-team vendors so the test is independent. We can run the engagement against the parent's TIBER-style threat-intel pack if it exists; where it does not, we build it for the first engagement and hand it over so subsequent vendors run against the same baseline rather than re-doing intel work the bank already paid for.",
    ],
    buyerConcerns: [
      "Fraudulent loan origination via compromised partner-fintech API keys in the digital-lending stack",
      "Instant-disbursement, BNPL payout and FLDG-flow abuse paths",
      "Contact-centre and customer-onboarding bulk-data exfiltration from Udyog Vihar / Sector 44",
      "Multi-tenant DLF Cyber City Phase 3 / Cyberhub office-network lateral movement",
      "Privilege escalation paths into fraud-rules engines and underwriting decision systems",
      "Cross-entity lateral movement across bank / insurer / AMC / brokerage in the same group",
      "ALPHV/BlackCat-style ransomware detonation simulation on the insurer estate",
      "RBI Cyber Resilience + MITRE ATT&CK + parent-group control-catalogue board-grade evidence",
      "TIBER-style RFP alignment with parent-group threat-intelligence packs",
    ],
    differentiators: [
      "Scenario library built for Indian private-bank and NBFC stacks — loan origination, BNPL payout, FLDG-flow abuse and fraud-rules-engine escalation, not generic enterprise red-team scripts.",
      "Cross-entity lateral-movement testing across bank / insurer / AMC / brokerage in the same parent group — a scope shape uniquely suited to Gurugram's cluster geography and rarely tested elsewhere.",
      "Intelligence prelude with credential-leak harvesting against the client's exact TLDs and DLF Cyber City vendor mapping against the Genpact / EXL / WNS / KPMG GBS shared-services footprint.",
      "MDE-tuned EDR-bypass tradecraft — indirect-syscall payloads, AMSI patching and process hollowing tuned to Microsoft Defender for Endpoint / Defender for Cloud / Sentinel telemetry rather than the CrowdStrike-default playbook.",
      "ALPHV/BlackCat ransomware detonation simulation with realistic TTPs (VSS deletion, encryption-throttle, Kerberoasting-to-ADCS-to-DA chain) and a BCP / RTO validation output — no destructive payload, full simulation transcript.",
    ],
    seoDescription:
      "Red team operations in Gurugram for private banks, NBFCs and fintechs. Loan-origination, BNPL and contact-centre scenarios. RBI Cyber Resilience aligned.",
    keywords: [
      "red team Gurugram",
      "red teaming Gurgaon BFSI",
      "private bank red team India",
      "fintech adversary simulation Gurgaon",
      "Cyber City red team",
      "Cyberhub red teaming",
      "RBI Cyber Resilience red team",
      "NBFC red team Gurugram",
      "MITRE ATT&CK red team India",
    ],
    stats: [
      { value: "25+", label: "Gurugram red teams" },
      { value: "6-8 wks", label: "Avg engagement" },
      { value: "Cross-entity", label: "Bank/insurer/AMC scope" },
      { value: "TIBER-ready", label: "Parent-group RFP aligned" },
    ],
    methodology: [
      {
        phase: "01 · TIBER-Style Mandate",
        activities: [
          "Audit-committee-chair signed mandate aligned to the parent's TIBER-style threat-intel pack where it exists",
          "Cross-entity scope decision — bank-only, bank+insurer, full group (bank+insurer+AMC+brokerage)",
          "Scenario selection — loan-origination fraud, contact-centre exfil, DLF lateral, fraud-rules-engine escalation, ALPHV detonation",
          "SOC deconfliction channel; white cell at CISO + CRO + audit-committee chair level",
        ],
      },
      {
        phase: "02 · Intel Prelude",
        activities: [
          "OSINT against DLF Cyber City Phase 3, Cyberhub and Golf Course Road exec teams",
          "Vendor mapping against Genpact / EXL / WNS / KPMG GBS shared-services footprint",
          "Credential-leak harvesting against the client's exact TLDs (DeHashed, IntelX, Macksofy dark-web feed)",
          "Physical-recon pass at the relevant tower lobby — visitor-pass workflow inventory",
        ],
      },
      {
        phase: "03 · Initial Access & MDE Bypass",
        activities: [
          "Spear-phish tuned to a recent RBI / IRDAI deadline the client is publicly working against",
          "Optional partner-fintech API key impersonation if digital-lending stack in scope",
          "MDE-tuned indirect-syscall payloads, AMSI patching and process hollowing",
          "Foothold persistence sized to survive credential rotation",
        ],
      },
      {
        phase: "04 · Lateral, Cross-Entity & Objective",
        activities: [
          "BloodHound shortest-path on the engineering-station and risk-analyst AD forests",
          "Cross-entity lateral testing across bank / insurer / AMC / brokerage where the group spans multiple legal entities",
          "DLF Cyber City L2 lateral testing — LLMNR/NBT-NS poisoning, mitm6, SMB relay from co-tenant floors",
          "Objective execution — fraudulent loan origination, fraud-rules-engine escalation, ALPHV-style detonation simulation",
        ],
      },
      {
        phase: "05 · Purple Handover & Group Memo",
        activities: [
          "Embedded week with the SOC walking every missed event",
          "Paired Sigma / Splunk / Sentinel rules per missed event",
          "Cross-entity privilege-graph memo for the parent group's risk function",
          "ALPHV BCP / RTO validation memo for the CFO and the head of operations",
        ],
      },
    ],
    industries: [
      {
        name: "Private-bank HQs",
        blurb: "DLF Cyber City and Golf Course Road bank HQs — loan-origination and fraud-rules-engine scenarios.",
      },
      {
        name: "NBFC lenders",
        blurb: "Digital-lending and gold-loan NBFC HQs — partner-fintech API key and instant-disbursement abuse.",
      },
      {
        name: "Insurer HQs",
        blurb: "Life, general and health insurers on Sohna Road / DLF — ALPHV detonation and PAS-administrator scenarios.",
      },
      {
        name: "BNPL & travel-payments",
        blurb: "Cyber City and Cyberhub fintech HQs — payout-rail and merchant-impersonation scenarios.",
      },
      {
        name: "Big-4 / consulting GCCs",
        blurb: "Gurugram consulting and Big-4 GCCs — client-data lateral and shared-services-footprint scenarios.",
      },
      {
        name: "Multi-entity financial groups",
        blurb: "Group HQs with bank + insurer + AMC + brokerage co-located — cross-entity privilege-graph testing.",
      },
    ],
    deliverables: [
      "Engagement narrative (attack timeline with day-by-day actions)",
      "MITRE ATT&CK heatmap of TTPs used vs detected by the SOC",
      "Paired Sigma / Splunk / Microsoft Sentinel rules per missed detection event",
      "Cross-entity privilege-graph memo where multiple group entities are in scope",
      "ALPHV / BlackCat ransomware-simulation BCP and RTO validation memo for the CFO and head of operations",
      "DLF Cyber City / Cyberhub building-backbone vs bank-perimeter split-findings memo",
      "RBI Cyber Resilience + parent-group control-catalogue dual-framework board pack",
      "TIBER-style threat-intel pack (built for the first engagement, handed over for subsequent vendors)",
    ],
    caseStudy: {
      industry: "Gurugram-headquartered Private Bank (DLF Cyber City Phase 3)",
      scope: "Eight-week TIBER-style red team — objective: reach the fraud-rules engine that gatekeeps loan origination and reach a Domain Admin on the corporate forest, without SOC detection by D+21; companion ALPHV-style ransomware detonation simulation on the insurer subsidiary on Sohna Road",
      outcome: "Initial access via spear-phish against a treasury user during the bank's known RBI inspection prep week; ADCS ESC4 escalation to Domain Admin at D+9; lateral pivot to the insurer subsidiary at D+14 via a forgotten trust relationship that the cross-entity privilege-graph testing surfaced; ALPHV simulation revealed a 47-hour RTO gap that would have required board-level escalation; eleven missed alerts mapped to Sentinel rule gaps; four detection use-cases written by Macksofy and adopted by the bank SOC; the engagement became the bank's annual TIBER-style baseline.",
    },
    faqs: [
      {
        q: "Can you align the engagement with our parent group's TIBER-style threat-intel pack?",
        a: "Yes — and several Gurugram private-bank clients buy us specifically because we run against the parent's TIBER threat-intel pack rather than substituting our own. Where the parent does not have one we build it for the first engagement and hand it over so subsequent vendors run against the same baseline.",
      },
      {
        q: "Do you run cross-entity lateral movement across our bank, insurer, AMC and brokerage?",
        a: "Yes — and this is one of the highest-value scopes Gurugram offers because the cluster geography concentrates multiple group entities within a few kilometres of each other. We test whether an attacker who lands at the insurer can pivot to the bank, whether a brokerage agent can reach the AMC's OMS, and so on. The output is a cross-entity privilege-graph memo for the parent group's risk function.",
      },
      {
        q: "Can you simulate an ALPHV / BlackCat ransomware detonation safely on our insurer estate?",
        a: "Yes. The simulation models published ALPHV/BlackCat TTPs — credential-stealer initial access, VSS deletion, encryption-throttle, Kerberoasting-to-ADCS-to-DA chain — without any destructive payload. The deliverable is a simulation transcript and a BCP / RTO validation memo for the CFO and head of operations. We do not encrypt files; we prove the chain would have worked.",
      },
      {
        q: "How does your tradecraft handle our Microsoft Defender for Endpoint deployment?",
        a: "We tune indirect-syscall payloads, AMSI patching and process hollowing specifically against MDE telemetry, which behaves differently to CrowdStrike Falcon or SentinelOne Singularity. The Sentinel-fed configuration most Gurugram BFSI parents use is in our standard test matrix; the report includes the exact tradecraft so the SOC can build paired Sentinel detections.",
      },
      {
        q: "What happens with findings on the DLF Cyber City building backbone vs our own perimeter?",
        a: "We split findings into 'bank perimeter' and 'DLF building backbone' categories explicitly. The bank gets remediation on its own segment; the DLF facilities team gets a separate memo for the building-services contract. The audit committee gets a clean line and does not see contractual exposures muddled with technical ones.",
      },
      {
        q: "Can we run this engagement as a board-mandated annual control like the listed banks now do?",
        a: "Yes — we offer an annual retainer that splits the budget across one full red team plus a narrower phishing-only campaign and a physical-only exercise. Several Gurugram private banks and insurers now structure their cyber-resilience programme this way post the RBI MD-ITGRC and IRDAI 2023 updates.",
      },
    ],
  },

  // 9 ─ Bengaluru · Cloud Security ────────────────────────────────────────────────
  {
    citySlug: "bengaluru",
    serviceSlug: "cloud-security",
    headline: "Cloud Security Audit in Bengaluru · SaaS",
    lead: "Deep cloud-security review for AWS / GCP / Azure SaaS estates in Bengaluru — IAM, Kubernetes, service mesh and data-plane controls, mapped to SOC 2 and CIS.",
    body: [
      "Bengaluru is the densest cloud-native engineering market in India. Cloud-security audits here have to go several layers deeper than 'enable CloudTrail and turn on GuardDuty'. The Embassy Tech Village / Outer Ring Road belt and the Whitefield product corridor are full of multi-account AWS landing zones running production workloads on EKS, GCP project hierarchies running Anthos / GKE, and increasingly Azure tenants for the Microsoft-stack fintechs and enterprise SaaS. We review the IAM trust graph end-to-end, the Kubernetes RBAC and admission-control layer, the service-mesh authorisation policy (Istio is dominant on Bengaluru EKS, with Linkerd showing up at the smaller-scale clusters), and the data-plane key management that the customer's enterprise security team actually asks about during procurement.",
      "Most of our Bengaluru engagements cover a multi-account AWS landing zone with at least one production account, one staging account, one shared-services account and one security/audit account, plus a logging account that aggregates CloudTrail, Config and VPC Flow Logs. We use Prowler 4.x for CIS Benchmark gap analysis (AWS Foundations Benchmark (current CIS v3 series)), ScoutSuite for cross-cloud posture comparison, Pacu for active IAM privilege-escalation enumeration, and Wiz / Tenable Cloud Security (where the client already runs them) to validate against findings. The IAM trust-graph review uses Macksofy-internal tooling on top of the AWS Access Analyzer findings and a custom BloodHound-style graph view of the cross-account role-assumption paths — the same Cyber-Kill-Chain shortest-path analysis we use on AD forests, adapted to AWS STS.",
      "For product companies running multi-tenant SaaS — which is most of Bengaluru — we test tenant-isolation at four layers explicitly. IAM-role boundaries between tenants (does a customer-A service-role have any IAM transitive path to a customer-B resource?). KMS key separation (per-tenant CMKs, key policies, grants, and cross-account key-policy abuse paths). Network policy egress controls (can a tenant pod call out to another tenant's S3 prefix?). And noisy-neighbour exposure in shared EKS clusters (pod-security admission, resource quotas, taints/tolerations, and the not-uncommon mistake of running tenant workloads on the same node group as the cluster's logging or admin tooling). The output is a tenant-isolation matrix per tenant pair, which is the exact artefact enterprise procurement asks for in vendor-security questionnaires.",
      "Kubernetes review goes deep on the admission-control layer because that is where the modern attack surface actually lives. We exercise OPA Gatekeeper and Kyverno policy gaps, validating-vs-mutating-webhook trust paths, ServiceAccount token-mounting defaults (the long-standing Kubernetes default that quietly bound a JWT to every pod), and the IRSA / Workload Identity / Azure Workload Identity federation back to cloud IAM. Service-mesh testing covers Istio AuthorizationPolicy authz drift between resolvers (a frequent finding — devs add a new service and forget to add the AuthorizationPolicy), mTLS enforcement gaps in PERMISSIVE mode, and the East-West-vs-North-South policy split that almost every Bengaluru SaaS gets partially wrong on first deployment.",
      "The build-and-deploy plane is where attackers actually land on modern SaaS, and most generic cloud audits skip it entirely. We review GitHub Actions / GitLab runner privilege scopes, OIDC trust from CI to cloud IAM (a 2023-2024 trend — almost every Bengaluru SaaS has at least one GitHub OIDC trust with a wildcard subject claim), signed-artefact policy (cosign / Sigstore adoption), the secrets-management substrate (AWS Secrets Manager, HashiCorp Vault, GCP Secret Manager) and the Terraform / Pulumi state-file blast radius. These are the paths the LAPSUS$, Octo Tempest and Storm-0558-style adversaries use against modern SaaS — and a missed GitHub OIDC subject-claim wildcard has been the root cause of more than one Bengaluru SaaS breach in the last 24 months.",
      "Engagements run three to five weeks for a single-cloud single-product scope and five to seven weeks for a multi-cloud or multi-product scope. Kickoff is onsite at Embassy Tech Village, ORR or the Koramangala / Indiranagar startup belt — the threat-model whiteboard is non-negotiable because the team always under-estimates the trust graph going in. We map findings against the CIS Benchmarks for AWS / GCP / Azure, the CNCF Kubernetes Hardening Guide, OWASP Cloud-Native Security Top 10, SOC 2 CC controls (CC6, CC7), ISO 27017 cloud-services Annex A, and (for cloud-native SaaS that handles PII) DPDP Act §16 cross-border-transfer obligations. The same report typically closes both an AppSec audit ask and the next enterprise customer's vendor-security questionnaire.",
      "Reports include a Terraform / Helm-level remediation backlog rather than vague 'tighten IAM' bullet points. Every finding ships with a code-level fix snippet — a corrected IAM policy with explicit conditions and resource ARNs, a Kyverno policy that closes the admission-control gap, a Helm values diff that disables ServiceAccount token auto-mount on non-controller pods, a Terraform module patch that tightens KMS key-policy grants. The Jira-importable CSV maps each finding to severity, CIS control ID, OWASP CNS Top-10 mapping and a suggested epic-link so the platform team can drop it into the next sprint without re-typing.",
      "Bengaluru procurement on cloud-security closes through the CTO and the head of platform engineering, sometimes with the AppSec lead as the technical reviewer. For Series-C and later SaaS preparing for an enterprise customer's security review, we ship a sanitised vendor pack alongside the technical report — same artefact answers the auditor and the customer's CISO without re-assembly, with the SOC 2 CC6/CC7 evidence and ISO 27017 crosswalk pre-built. The continuous-testing retainer option — quarterly full-coverage cloud-posture review with monthly delta tests against new cloud-account onboardings — matches the cadence at which Bengaluru SaaS actually spawns AWS accounts.",
    ],
    buyerConcerns: [
      "IAM trust-graph privilege escalation across multi-account AWS landing zones with cross-account STS paths",
      "Kubernetes RBAC, admission controllers (OPA Gatekeeper, Kyverno) and pod-security-admission violations",
      "Service-mesh (Istio / Linkerd) authz drift between resolvers and mTLS-PERMISSIVE enforcement gaps",
      "Multi-tenant data-plane isolation at IAM, KMS, network policy and noisy-neighbour layers",
      "KMS key management — per-tenant CMK separation, key policies, grants and cross-account abuse paths",
      "GitHub Actions / GitLab OIDC trust to cloud IAM with wildcard subject-claim exposure",
      "Terraform / Pulumi state-file blast radius and secrets-management substrate hygiene",
      "SOC 2 CC6/CC7 + ISO 27017 + CIS Benchmark + CNCF K8s Hardening Guide evidence for enterprise audits",
      "DPDP Act §16 cross-border-transfer obligations for cloud-native SaaS handling Indian PII",
    ],
    differentiators: [
      "Audit goes to the Kubernetes RBAC, admission-control (OPA Gatekeeper, Kyverno) and service-mesh (Istio AuthorizationPolicy) authz layer — not just account-level IAM and CloudTrail toggles.",
      "Multi-tenant SaaS isolation tested at four explicit layers (IAM, KMS, network policy, noisy-neighbour) with a tenant-isolation matrix output that maps directly to enterprise-procurement vendor-security questions.",
      "Build-and-deploy-plane coverage — GitHub Actions / GitLab OIDC trust to cloud IAM, signed-artefact policy (cosign / Sigstore), secrets-management substrate and Terraform/Pulumi state-file blast radius. This is where modern attackers actually land.",
      "Findings shipped as Terraform module patches, Kyverno policies, Helm values diffs and IAM-policy diffs — not generic best-practice bullets that the platform team has to translate.",
      "Continuous-testing retainer aligned to cloud-account spawn cadence — quarterly full-coverage with monthly delta tests against new account onboardings, matched to the Bengaluru SaaS reality of multiple new AWS accounts per quarter.",
    ],
    seoDescription:
      "Cloud security audit in Bengaluru for AWS, GCP and Azure SaaS estates. IAM, Kubernetes, service-mesh and data-plane review. SOC 2, CIS and ISO 27017 aligned.",
    keywords: [
      "cloud security audit Bengaluru",
      "AWS security audit Bangalore",
      "GCP security audit Bengaluru",
      "Kubernetes security audit Bangalore",
      "SaaS cloud security Bengaluru",
      "CIS benchmark audit Bangalore",
      "service mesh security Bengaluru",
      "ISO 27017 audit Bangalore",
      "multi-tenant SaaS audit Bengaluru",
    ],
    stats: [
      { value: "60+", label: "Bengaluru cloud audits" },
      { value: "3-5 wks", label: "Single-cloud engagement" },
      { value: "AWS · GCP · Azure", label: "Cloud coverage" },
      { value: "Terraform-ready", label: "Remediation format" },
    ],
    methodology: [
      {
        phase: "01 · Trust-Graph Threat Model",
        activities: [
          "Onsite whiteboard at Embassy Tech Village / ORR / Whitefield — IAM trust graph, cross-account STS paths, multi-tenant boundary inventory",
          "Cloud-account inventory (AWS landing zone, GCP project hierarchy, Azure tenant structure)",
          "Kubernetes / service-mesh policy export — IRSA / Workload Identity federation mapping",
          "Build-and-deploy-plane inventory — GitHub Actions / GitLab OIDC, Terraform/Pulumi state location",
        ],
      },
      {
        phase: "02 · CIS Benchmark & Posture",
        activities: [
          "Prowler 4.x against AWS Foundations Benchmark (current CIS v3 series)",
          "ScoutSuite cross-cloud posture comparison; Wiz / Tenable Cloud Security validation where in use",
          "Macksofy-internal IAM trust-graph BloodHound-style shortest-path enumeration",
          "S3 / GCS / Azure Blob public-exposure inventory and pre-signed-URL leakage check",
        ],
      },
      {
        phase: "03 · IAM, Kubernetes & Mesh",
        activities: [
          "Pacu active IAM privilege-escalation enumeration; cross-account role-assumption abuse path testing",
          "Kubernetes admission-control review — OPA Gatekeeper, Kyverno, ValidatingAdmissionPolicy gaps",
          "Istio AuthorizationPolicy and Linkerd ServerAuthorization drift analysis",
          "IRSA / GKE Workload Identity / Azure Workload Identity federation abuse-path testing",
        ],
      },
      {
        phase: "04 · Multi-Tenant & Build-Plane",
        activities: [
          "Tenant-isolation matrix per tenant pair across IAM, KMS, network policy and noisy-neighbour layers",
          "GitHub Actions / GitLab OIDC subject-claim wildcard review; signed-artefact (cosign / Sigstore) policy",
          "Terraform / Pulumi state-file blast-radius and remote-state ACL review",
          "Secrets-management substrate review (Secrets Manager, Vault, GCP Secret Manager)",
        ],
      },
      {
        phase: "05 · Code-Level Remediation",
        activities: [
          "Terraform module patches and Helm values diffs per finding",
          "Kyverno / OPA Gatekeeper policies that close admission-control gaps",
          "Jira-importable findings CSV mapped to CIS / OWASP CNS Top-10 / SOC 2 CC / ISO 27017",
          "TPRM vendor pack with SIG Lite + CAIQ Lite pre-populated for enterprise procurement",
        ],
      },
    ],
    industries: [
      {
        name: "Vertical & horizontal SaaS",
        blurb: "Embassy Tech Village and ORR multi-tenant SaaS — tenant-isolation matrix and SOC 2 Type II evidence.",
      },
      {
        name: "Bengaluru fintechs",
        blurb: "Payments, wealth and lending fintechs — RBI cloud-adoption framework overlay alongside SOC 2 cloud audit.",
      },
      {
        name: "Healthtech & medtech",
        blurb: "PHI-handling SaaS — HIPAA Security Rule + DPDP §16 cross-border-transfer cloud evidence.",
      },
      {
        name: "Devtools & infra SaaS",
        blurb: "API-first developer platforms — GitHub OIDC trust, signed-artefact policy and secrets-substrate review.",
      },
      {
        name: "Whitefield product companies",
        blurb: "Enterprise SaaS on Azure / EKS — Microsoft-stack tenant-isolation and Defender for Cloud posture review.",
      },
      {
        name: "Bengaluru GCCs",
        blurb: "US/EU enterprise capability centres on ORR — parent-control-catalogue cloud crosswalk to NIST 800-53.",
      },
    ],
    deliverables: [
      "Cloud security posture report with CIS Benchmark gap analysis per cloud provider",
      "IAM trust-graph BloodHound-style shortest-path enumeration across multi-account landing zones",
      "Tenant-isolation matrix per tenant pair across IAM, KMS, network policy and noisy-neighbour layers",
      "Kubernetes admission-control and service-mesh authz findings with Kyverno / OPA Gatekeeper policy fixes",
      "Build-and-deploy-plane review — GitHub OIDC, signed-artefact policy, Terraform state, secrets substrate",
      "Code-level remediation — Terraform module patches, Helm values diffs, IAM-policy diffs per finding",
      "TPRM vendor pack — SIG Lite + CAIQ Lite pre-populated for enterprise procurement",
      "Continuous-testing retainer option — quarterly full-coverage with monthly delta tests on new account onboardings",
    ],
    caseStudy: {
      industry: "Series-D Bengaluru SaaS (Embassy Tech Village)",
      scope: "Multi-account AWS landing zone (12 accounts) plus EKS with Istio service mesh; multi-tenant data-plane isolation review; GitHub Actions OIDC trust review; four-week engagement",
      outcome: "23 Critical and High findings closed in 38 days; one GitHub Actions OIDC trust with a wildcard subject claim that would have allowed any forked PR to assume the production-deploy role, closed pre-disclosure; cross-tenant KMS grant abuse path on the per-tenant CMK structure remediated; SOC 2 Type II issued in same audit cycle; enterprise sales pipeline tripled in the following two quarters because the tenant-isolation matrix shipped directly into customer security reviews.",
    },
    faqs: [
      {
        q: "Do you go deeper than a CIS Benchmark scorecard against our AWS accounts?",
        a: "Yes. The CIS Benchmark is the starting point, not the finish line. We run active IAM privilege-escalation enumeration with Pacu, BloodHound-style shortest-path analysis across cross-account STS, Kubernetes admission-control review, service-mesh AuthorizationPolicy drift testing and the build-and-deploy-plane review that almost every generic cloud audit skips. The CIS scorecard is one section of a much deeper report.",
      },
      {
        q: "How do you test multi-tenant data-plane isolation in our shared EKS clusters?",
        a: "Across four explicit layers: IAM-role boundaries between tenants, KMS key separation (per-tenant CMK policies and grants), network policy egress controls, and noisy-neighbour exposure (pod-security-admission, resource quotas, taints/tolerations). The output is a tenant-isolation matrix per tenant pair, which maps directly to the vendor-security questions enterprise procurement actually asks.",
      },
      {
        q: "Can your audit close both SOC 2 Type II and an enterprise customer's cloud security questionnaire?",
        a: "Yes. Findings are mapped to SOC 2 CC6/CC7, ISO 27017 cloud-services Annex A, CIS Benchmarks and OWASP Cloud-Native Security Top 10 in the same artefact. The TPRM vendor pack ships pre-populated against SIG Lite and CAIQ Lite, compressing typical six-week enterprise procurement back-and-forth into two weeks.",
      },
      {
        q: "Do you test GitHub Actions / GitLab OIDC trust to our AWS / GCP IAM?",
        a: "Yes — this is one of the highest-frequency Critical findings we ship on Bengaluru SaaS reports. Wildcard subject-claim trust paths from CI to production-deploy roles are a 2023-2024 pattern that almost every Bengaluru SaaS has at least one of, and they have been the root cause of multiple recent breaches. We test every OIDC trust subject-claim explicitly.",
      },
      {
        q: "Can your remediation actually be shipped by our platform team without translation?",
        a: "Yes. Every finding ships with a code-level fix — a Terraform module patch, a Kyverno policy, a Helm values diff, an IAM-policy diff. The Jira-importable CSV maps to severity, CIS control ID and OWASP CNS Top-10 mapping. Platform engineers ship straight from the CSV; they do not have to translate vague best-practice bullets into code.",
      },
      {
        q: "Can a Bengaluru fintech client run RBI cloud-adoption-framework evidence off this audit too?",
        a: "Yes — we layer an RBI cloud-adoption framework crosswalk (mapped to the current Master Direction on IT Outsourcing of IT Services) on top of the standard SaaS cloud audit for Bengaluru fintechs running a parallel Mumbai compliance track. The same engagement produces SOC 2 + ISO 27017 evidence for the enterprise customer side and RBI cloud-adoption + PA-PG cloud-control evidence for the regulator side.",
      },
    ],
  },

// ─────────────────────────────────────────────────────────────────────
  // 1 · Mumbai × Cloud Security
  // ─────────────────────────────────────────────────────────────────────
  {
    citySlug: "mumbai",
    serviceSlug: "cloud-security",
    headline:
      "Cloud Security Audit in Mumbai · BFSI",
    lead:
      "Regulator-grade cloud-security audit for Mumbai BFSI on AWS Mumbai (ap-south-1), Azure Central India and OCI Mumbai — RBI cloud-adoption framework, SEBI CSCRF cloud annex, IRDAI outsourcing and CIS aligned.",
    body: [
      "Mumbai BFSI cloud adoption sits under the heaviest regulatory glass in India. RBI's April 2024 Master Direction on IT Outsourcing and the August 2023 Cloud Adoption Framework, SEBI's CSCRF cloud-control expectations and IRDAI's Information & Cyber Security Guidelines (2023) all demand explicit cloud-side evidence — and the data-localisation and BCP conditions narrow the architectural choices that are actually allowable for an RBI-regulated workload. A generic CIS scorecard is not what the inspector is asking to read.",
      "Our Mumbai cloud-security audits cover the AWS Mumbai (ap-south-1) primary region paired with Hyderabad (ap-south-2) as the regulatory-acceptable DR pair, Azure Central India / South India tenants, and OCI Mumbai estates where Tier-1 banks have moved their analytics fabric. We also audit the multi-account / multi-subscription landing-zone topology, the hybrid links back to on-prem core banking systems in BKC and Belapur, and the control-plane separation between the production org and the BCP region. Every finding is mapped against RBI cloud-adoption framework Annex-1 controls, SEBI CSCRF clauses, CIS AWS / Azure Foundations Benchmarks v2, ISO 27017 and the bank's existing internal cyber-control catalogue — one binder, one register, four-way crosswalk.",
      "We bring the actual cloud-attack toolset the BFSI threat-model demands. Prowler v3 and ScoutSuite for breadth, Pacu for AWS IAM privilege-path enumeration (the most common audit finding we close on Indian BFSI estates after the LAPSUS$-style supply-chain compromises of 2022-23), CloudFox for blast-radius mapping, and Wiz / Orca / CrowdStrike Falcon Cloud Security where the bank already owns a CNAPP. AWS Inspector and GuardDuty findings are reconciled, not just dumped — most Mumbai banks have months of unreviewed GuardDuty noise that we turn into an actual finding ledger during the audit.",
      "Critical scopes always cover: customer-data residency and the KMS / HSM key-custody arrangement (CloudHSM, Azure Dedicated HSM, on-prem nCipher integration); admin-console MFA, SCP boundaries and break-glass on the AWS Organisations payer account; CI/CD pipeline access to production accounts including the IAM-role chain from GitHub Actions / Bitbucket Pipelines / Jenkins runners; partner / fintech federation and the RBI Account Aggregator (NBFC-AA) integration where the bank is an FIU or FIP; and the SIEM telemetry pipeline (CloudTrail multi-region, Azure Activity + Defender, OCI Audit) feeding the SOC.",
      "BCP and DR are scrutinised separately. RBI's framework expects the bank to demonstrate that the DR-region control plane is independent of the primary region's compromise — meaning a CloudTrail / GuardDuty / IAM Identity Center hijack in ap-south-1 should not silently propagate to ap-south-2. We audit cross-region replication, regional service-control policy parity, KMS multi-region key inheritance and the actual failover privilege path the bank's IT team would walk through on a Sunday at 3am. Most Mumbai banks discover at this stage that their DR-region runbooks reference IAM users that were rotated out of the primary region a year ago.",
      "Engagements run 4-6 weeks for a single-cloud BFSI workload, 6-8 weeks for a multi-cloud landing zone, and 8-10 weeks for a full RBI cloud-resilience exercise covering the bank, the Account Aggregator integration and the partner-fintech federation surface. Kickoff is same-day onsite in BKC, Lower Parel, Powai or Belapur — most Mumbai BFSI clients prefer the cloud-architecture whiteboard be done in their own data-classification room rather than over video, because the data-flow diagrams contain customer-account-level joins they will not share off-prem.",
      "We coordinate directly with the bank's hyperscaler account team — AWS India PSA, Microsoft FSI specialist, OCI cloud architect — and the Indian-data-centre operator (CtrlS, NTT-Netmagic, Sify, Yotta) to evidence the controls that sit on their side of the shared-responsibility line. Without that joint evidence, the cloud-control catalogue always has gaps no internal audit can close on its own — particularly the under-the-rack physical-control and operator-personnel-screening evidence that RBI inspectors ask for during follow-up. The output is one binder that the regulator, the hyperscaler and the SBI / HDFC / Kotak / ICICI / Axis-scale internal audit team all recognise on the first read.",
      "Reports include the specific exhibits Mumbai BFSI inspectors actually ask for during follow-up examinations of the CSITE Cell — IAM Identity Center role inventory with last-used timestamps, KMS key rotation evidence with the customer-master-key vs data-key split called out, SCP / Azure Policy / OCI Compartment guardrail diff against the previous quarter, GuardDuty / Defender finding reconciliation with a closure ledger, and the third-party-attestation crosswalk (SOC 2 Type 2 of the hyperscaler, ISO 27017 / 27018, PCI-DSS DSS-on-cloud where relevant). Every critical and high finding is re-validated post-fix at no extra cost inside the regulator's remediation SLA.",
    ],
    buyerConcerns: [
      "RBI Cloud Adoption Framework Annex-1 evidence quality for the CSITE Cell",
      "SEBI CSCRF cloud-control clauses for AMCs, brokers and depositories",
      "IRDAI Information & Cyber Security Guidelines (2023) cloud overlay for insurers",
      "Customer-data residency in ap-south-1 + ap-south-2 paired-region BCP design",
      "KMS / CloudHSM key-custody, multi-region keys and break-glass procedure",
      "CI/CD pipeline IAM-role chain into production cloud accounts",
      "RBI Account Aggregator (NBFC-AA) federation and FIU / FIP integration security",
      "Hybrid links between AWS Mumbai / Azure India and on-prem core banking",
      "SIEM telemetry pipeline integrity (CloudTrail, Defender, OCI Audit) for the BFSI SOC",
    ],
    differentiators: [
      "Direct line-by-line mapping to RBI Cloud Adoption Framework Annex-1, SEBI CSCRF cloud clauses and IRDAI 2023 guidelines — not a CIS / NIST report relabelled at the cover page.",
      "Hybrid scope covers the cloud-to-core-banking on-prem link, including the ap-south-1 / ap-south-2 paired-region BCP design and the break-glass identity path that most internal audits leave untested.",
      "Pacu + ScoutSuite + Prowler + Wiz / CrowdStrike toolchain operated by OSCP / OSCE / AWS Security Specialist consultants, not a button-press through a CNAPP dashboard.",
      "Reports include the specific exhibits RBI CSITE Cell inspectors ask for during follow-up examinations — IAM last-used inventories, KMS rotation evidence, GuardDuty closure ledger, SCP diff.",
      "Onsite kickoff in BKC, Lower Parel, Powai or Belapur on the same business day, with senior consultants who can whiteboard the data-flow inside the bank's data-classification room rather than over video.",
    ],
    seoDescription:
      "Regulator-grade cloud security audit in Mumbai for BFSI on AWS Mumbai, Azure India and OCI — RBI Cloud Adoption Framework, SEBI CSCRF and CIS aligned. BKC HQ.",
    keywords: [
      "cloud security audit Mumbai",
      "RBI cloud adoption framework audit",
      "SEBI CSCRF cloud audit Mumbai",
      "AWS Mumbai BFSI cloud audit",
      "Azure Central India bank audit",
      "OCI Mumbai cloud security",
      "Prowler audit Mumbai bank",
      "Account Aggregator security audit",
      "CIS AWS Foundations BFSI Mumbai",
      "BCP cloud audit ap-south-2",
    ],
    stats: [
      { value: "40+", label: "Mumbai BFSI cloud audits delivered" },
      { value: "ap-south-1 + 2", label: "Paired-region BCP coverage" },
      { value: "4-6 wk", label: "Single-cloud audit cadence" },
      { value: "Same day", label: "BKC onsite kickoff" },
    ],
    methodology: [
      {
        phase: "01 · Cloud Threat Model + Scope",
        activities: [
          "Workload classification against RBI cloud-adoption framework — Material vs Non-material",
          "Data-flow whiteboard onsite in bank's data-classification room (BKC / Belapur)",
          "Hyperscaler account-team kickoff (AWS India PSA / Microsoft FSI / OCI architect)",
          "Define paired-region BCP scope and DR-region control-plane independence test",
        ],
      },
      {
        phase: "02 · Control-Plane + Identity Audit",
        activities: [
          "AWS Organisations / Azure Management Group / OCI Compartment hierarchy review",
          "IAM Identity Center / Entra ID role inventory with last-used timestamps",
          "Pacu IAM privilege-path enumeration + SCP / Azure Policy diff",
          "Break-glass procedure validation + KMS / CloudHSM key-custody review",
        ],
      },
      {
        phase: "03 · Workload + Data-Plane Audit",
        activities: [
          "Prowler v3 + ScoutSuite breadth scan with BFSI-tuned ruleset",
          "CIS AWS / Azure Foundations Benchmark v2 mapping per workload",
          "Customer-data residency evidence + cross-region replication review",
          "CI/CD pipeline IAM-role chain trace from VCS to production deploy",
        ],
      },
      {
        phase: "04 · Detection + Hybrid Edge",
        activities: [
          "CloudTrail multi-region + GuardDuty / Defender pipeline integrity",
          "SIEM telemetry reconciliation with BFSI SOC (Splunk / Sentinel / Chronicle)",
          "Hybrid link audit — Direct Connect / ExpressRoute into on-prem core banking",
          "Account Aggregator (NBFC-AA) federation review where in scope",
        ],
      },
      {
        phase: "05 · Regulator Pack + Re-test",
        activities: [
          "RBI / SEBI / IRDAI control crosswalk binder with evidence-per-clause",
          "Inspector-style exhibits — IAM inventories, KMS rotation, GuardDuty closure ledger",
          "Remediation playbook + 30-day re-test of all critical and high findings",
          "Board-pack executive summary for the audit committee cyber review",
        ],
      },
    ],
    industries: [
      {
        name: "Private + PSU banks",
        blurb:
          "AWS Mumbai primary + Hyderabad DR, hybrid into BKC / Belapur core banking under RBI cloud framework.",
      },
      {
        name: "NBFCs + Housing Finance",
        blurb:
          "Multi-tenant SaaS lending on Azure India with Account Aggregator (NBFC-AA) FIU / FIP integration.",
      },
      {
        name: "Payment aggregators + wallets",
        blurb:
          "PA / PG cloud workloads under RBI PA-PG guidelines plus PCI-DSS cloud overlay — Mumbai-heavy buyer cluster.",
      },
      {
        name: "Stock brokers + AMCs",
        blurb:
          "SEBI CSCRF cloud annex for broker terminals, OMS / RMS and CRA / KRA integrations in BKC and Worli.",
      },
      {
        name: "Insurers (life, general, health)",
        blurb:
          "IRDAI 2023 cloud overlay for policy admin, claims and TPA integrations across Powai and Andheri MIDC.",
      },
      {
        name: "Listed fintechs",
        blurb:
          "BSE / NSE listed fintech HQs in BKC + Lower Parel running multi-cloud with quarterly audit-committee reviews.",
      },
    ],
    deliverables: [
      "RBI Cloud Adoption Framework Annex-1 control crosswalk binder (per workload)",
      "SEBI CSCRF cloud annex + IRDAI 2023 cloud-overlay evidence pack",
      "CIS AWS / Azure / OCI Foundations Benchmark scorecard with closure ledger",
      "Pacu / ScoutSuite / Prowler raw artefacts with consultant-curated finding register",
      "KMS / CloudHSM key-custody evidence + multi-region key inheritance map",
      "IAM Identity Center role inventory with last-used timestamps and break-glass test result",
      "Paired-region (ap-south-1 / ap-south-2) BCP and DR control-plane independence report",
      "Board-pack executive summary + 30-day re-test report for all critical and high findings",
    ],
    caseStudy: {
      industry: "Mumbai-headquartered private bank (BKC) — AWS Mumbai primary, Hyderabad DR",
      scope:
        "RBI Cloud Adoption Framework audit across 6 AWS accounts + Account Aggregator NBFC-AA integration + hybrid Direct Connect into BKC core-banking switch",
      outcome:
        "84 findings closed in 6 weeks · 11 IAM privilege-escalation paths remediated (Pacu) · CSITE Cell follow-up cleared zero clarifications · DR-region break-glass runbook rebuilt and live-tested · GuardDuty closure ledger backfilled across 14 months.",
    },
    faqs: [
      {
        q: "Will the RBI CSITE Cell accept your audit report on the first read?",
        a: "Yes — our reports follow the exhibit-per-clause format the CSITE Cell asks for during follow-up examinations: IAM last-used inventories, KMS rotation evidence, GuardDuty / Defender closure ledgers and the SCP / Azure Policy diff against the previous quarter. We have closed RBI inspection cycles for BKC- and Lower Parel-headquartered banks with zero clarifications on the cloud-control evidence.",
      },
      {
        q: "Can you audit the ap-south-1 + ap-south-2 paired-region BCP design specifically?",
        a: "Yes — that is the part of the engagement we charge the most senior time on. We test control-plane independence between primary and DR regions, multi-region KMS key inheritance, SCP / Azure Policy parity, and the actual break-glass identity path the IT team would walk through during a Sunday-3am failover. Most banks discover at this stage that their DR-region runbooks reference IAM users rotated out of the primary region a year ago.",
      },
      {
        q: "Do you cover the Account Aggregator (NBFC-AA) federation?",
        a: "Yes — where the client is a Financial Information User (FIU) or Financial Information Provider (FIP). We audit the AA federation handshake, consent-artefact handling, the rate-limit and replay protection on the AA NBFC framework, and the data-fiduciary obligation under the DPDP Act overlay. This is in scope for most BKC and Worli private-bank engagements in 2026.",
      },
      {
        q: "What about CloudHSM versus on-prem nCipher key custody?",
        a: "We audit both, and the hybrid setup most Mumbai BFSI clients run — CloudHSM in ap-south-1 fronting AWS-side encryption, on-prem nCipher Thales for the core-banking HSM, and the BYOK / HYOK import path between them. The audit produces the inspector-grade key-custody evidence including ceremony logs, dual-control attestations and the destruction-on-revoke procedure.",
      },
      {
        q: "Will you coordinate with our AWS India PSA / Microsoft FSI specialist?",
        a: "Yes — that is required. We brief them on day one and pull the shared-responsibility evidence (SOC 2 Type 2 of the hyperscaler, ISO 27017 / 27018, regional physical-control attestations from CtrlS / NTT-Netmagic / Sify / Yotta where the hyperscaler co-locates) directly so the binder is complete. Without that, the cloud-control catalogue has gaps no internal audit can close.",
      },
      {
        q: "Is re-testing of critical findings included?",
        a: "Yes — every critical and high finding is re-validated post-fix at no extra cost within the regulator's remediation SLA. The closure ledger feeds directly into the next CSITE Cell submission or the audit committee's quarterly cyber review.",
      },
      {
        q: "How long does a typical Mumbai BFSI cloud audit take?",
        a: "Single-cloud BFSI workload: 4-6 weeks. Multi-cloud landing zone (AWS + Azure or AWS + OCI): 6-8 weeks. Full RBI cloud-resilience exercise covering the bank, AA integration and partner-fintech federation: 8-10 weeks. Kickoff is same-day onsite in BKC / Lower Parel / Powai / Belapur.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 2 · Delhi × Penetration Testing
  // ─────────────────────────────────────────────────────────────────────
  {
    citySlug: "delhi",
    serviceSlug: "penetration-testing",
    headline:
      "Penetration Testing in Delhi · Gov + PSU",
    lead:
      "CERT-In empanelled penetration testing for Delhi-headquartered ministries, PSUs, regulators and central agencies — STQC, NIC and GeM-compatible deliverables in regulator-readable format.",
    body: [
      "Delhi penetration testing is dominated by central-government, ministry, PSU and regulator buyers, with a long tail of public-sector banks, central PSEs and statutory bodies headquartered in Shastri Bhawan, Nirman Bhawan, Rail Bhawan, Krishi Bhawan, Sanchar Bhawan and the CGO Complex. Scopes typically cover citizen-facing portals built on the National Informatics Centre (NIC) stack, internal MPLS networks running on NICNET, regulator data-exchange APIs, the Aadhaar AUA / KUA integration where the ministry consumes UIDAI services, and the long tail of legacy on-prem applications that ministries still run on RHEL / WebLogic / Oracle. Procurement, contracting and reporting expectations are very different from a private-sector VAPT — and a vendor who has never read a GeM contract does not survive the first review.",
      "We deliver penetration testing on Delhi government and PSU estates in CERT-In empanelled format with STQC and NIC-friendly reporting structure — the explicit observation / risk / recommendation table format, traceable evidence per finding (with the screenshot, request / response and exploit witness numbered to the finding ID), and the empanelled-auditor letter required for the next regulator inspection or audit closure with the Comptroller and Auditor General (CAG). The report goes into the ministry's file-noting system, gets file-numbered, moves through the additional secretary's office and lands on the secretary's desk — and at every step a vendor-format Burp HTML export gets returned with objections. We ship in the format the ministry expects.",
      "Common scopes for ministries and central PSEs we have delivered against: citizen-services portal — e-Office (NIC), parivahan-style transport portals, e-Hospital, the long list of state-deployed Mission-mode-project (MMP) portals; internal MPLS / NICNET / SD-WAN segmentation review including the dial-back from NIC datacentre to ministry LAN; data-exchange API between the ministry and state implementations where the centre publishes a master record and states consume / write back; Active Directory and RBAC review on the central IT estate; Aadhaar AUA / KUA integration audit against UIDAI's published compliance checklist and the data-vault tokenisation expectation; and the dependency on shared NIC infrastructure (NIC-hosted virtual machines, NIC-managed firewalls, NIC SOC feeds) where the boundary between in-scope and out-of-scope blurs daily.",
      "Onsite kickoff in Delhi is next-day from Mumbai BKC — flights land at IGI Terminal 3 and consultants are at Shastri Bhawan, Rail Bhawan, Nirman Bhawan or the CGO Complex inside the morning, with badges arranged the previous evening through the ministry's security cell. For multi-week engagements we keep a Delhi-resident lead consultant onsite throughout the testing window — same person on the first kickoff and the final sign-off, no bait-and-switch staffing. The testing window itself routinely runs across weekends and government holidays because that is when the application owner can take portal downtime.",
      "Government engagement plans always assume the ministry's own IT cell, the NIC team supporting the deployment, and (where the system holds Aadhaar data) the UIDAI compliance representative will need to sit through portions of the test live. We schedule those joint-test sessions in advance, share a daily testing-log e-mail with the additional secretary's office, and provide read-out memos after each major milestone so file-noting and approvals do not stall while waiting for the final report. The CERT-In incident-reporting clock — six hours under the 28 April 2022 directive — is treated as a hard SLA inside the engagement, with a pre-defined escalation path to the CERT-In handle.",
      "Where the scope crosses state implementations of a centrally-sponsored scheme (CSS) — Ayushman Bharat, PMAY, e-Hospital state instances, agriculture extension portals — we coordinate with the state IT secretariat to evidence the boundary contract: what the centre owes (master record integrity, API contract enforcement, data-fiduciary obligations under the DPDP Act), what the state owes (instance hardening, regional language UI, state DPDP overlay), and where joint controls apply (Aadhaar masking, SDC hosting, BCP region). That avoids the most common audit gap on centre-state platforms and is the single most-asked-about clarification we have seen from CAG audit teams.",
      "Adversary modelling for ministry estates is not theoretical. We test against the actual TTPs that have hit Indian government systems in the last 24 months — credential-stuffing waves against e-Office and parivahan-style portals, SQL-injection chains in regional MMP deployments, JWT misuse and IDOR variants on Aadhaar-AUA wrappers, ransomware-affiliate footholds (LockBit, ALPHV, RansomHub) on PSU IT estates, and the supply-chain compromise pattern where a third-party application-vendor's CI/CD pipeline became the foothold (a recurring 2024-25 pattern). The report explicitly maps each finding to the TTP and the threat actor most likely to weaponise it.",
      "Procurement and commercial nuance is part of the engagement. Macksofy is GeM-listed (category 99 / cybersecurity audit services) and accepts direct purchase orders from central and state government buyers through the GeM portal; we also participate in CPPP and ministry-specific tenders. Our PAN, GST, MSME registration, CERT-In empanelment number and ISO 27001 / 9001 certification are kept current on the GeM dashboard so the procurement-cell verification on the bidder side completes in hours, not days. For ministries that procure through the National Informatics Centre Services Inc (NICSI) rate contract route, we deliver via NICSI's empanelment too.",
    ],
    buyerConcerns: [
      "CERT-In empanelled auditor letter accepted by CSITE / CAG for closure",
      "STQC / NIC observation-risk-recommendation reporting structure and evidence traceability",
      "Citizen-services portal abuse — authn bypass, IDOR, BOLA, SQLi, JWT misuse",
      "Internal MPLS / NICNET / SD-WAN segmentation across ministry estates",
      "Aadhaar AUA / KUA integration audit against UIDAI compliance checklist",
      "Active Directory / RBAC privilege paths in central-government IT",
      "Boundary clarity with shared NIC infrastructure (hosted VMs, managed firewalls)",
      "GeM / CPPP / NICSI procurement-route compatibility for the contract",
      "DPDP Act + IT Act incident reporting under CERT-In's 6-hour SLA",
    ],
    differentiators: [
      "Reports formatted to STQC / NIC expectations — observation / risk / recommendation tables, evidence numbered per finding ID, and the empanelled-auditor letter the additional secretary's office actually files — not a generic Burp HTML export.",
      "Experience with shared-infrastructure scoping where NIC-hosted segments, NICSI-managed firewalls and ministry-owned LAN have boundaries that shift mid-engagement — we negotiate them in writing up front.",
      "Delhi-resident lead consultant for the testing window plus same-day onsite from Mumbai BKC for kickoff — same person on kickoff and sign-off, no bait-and-switch.",
      "GeM-listed (category 99) and NICSI-route capable — procurement-cell verification completes inside hours, not the multi-week onboarding most vendors trigger.",
      "Adversary modelling against the actual TTPs that have hit Indian government estates in 2024-25 — LockBit / ALPHV affiliates, supply-chain compromise via application vendors, Aadhaar AUA wrapper abuse — not a generic OWASP checklist.",
    ],
    seoDescription:
      "CERT-In empanelled penetration testing in Delhi for ministries, PSUs, regulators and central agencies. STQC / NIC reports, GeM-listed, Aadhaar AUA / KUA audit-capable.",
    keywords: [
      "penetration testing Delhi",
      "CERT-In penetration testing Delhi",
      "government penetration testing Delhi",
      "PSU pentest Delhi NCR",
      "ministry penetration testing India",
      "STQC pentest Delhi",
      "NIC infrastructure pentest",
      "Aadhaar AUA KUA audit",
      "GeM cybersecurity audit vendor",
      "NICSI cybersecurity vendor",
    ],
    stats: [
      { value: "60+", label: "Delhi government engagements" },
      { value: "GeM Cat-99", label: "Listed cybersecurity vendor" },
      { value: "Next-day", label: "Onsite from Mumbai BKC" },
      { value: "6 hr SLA", label: "CERT-In incident-reporting clock" },
    ],
    methodology: [
      {
        phase: "01 · Pre-engagement + GeM Contract",
        activities: [
          "GeM / CPPP / NICSI procurement-route confirmation + contract drafting",
          "Ministry security-cell badge process + onsite-access clearance",
          "Scope definition with explicit NIC / NICSI boundary contract",
          "DPDP Act + Aadhaar Act applicability scoping where citizen-data in scope",
        ],
      },
      {
        phase: "02 · Threat Model + Recon",
        activities: [
          "Adversary modelling against 2024-25 ministry-targeting TTPs (LockBit, ALPHV, app-vendor supply chain)",
          "Application architecture review with ministry IT cell + NIC engineer",
          "External recon — citizen-portal surface, MMP-instance discovery, certificate / DNS hygiene",
          "Aadhaar AUA / KUA wrapper review against UIDAI compliance checklist",
        ],
      },
      {
        phase: "03 · Exploit + Lateral",
        activities: [
          "Citizen-portal abuse — authn bypass, IDOR, BOLA, SQLi, JWT misuse, file-upload chains",
          "Internal MPLS / NICNET / SD-WAN segmentation review with the ministry network team",
          "Active Directory / RBAC privilege-path enumeration (BloodHound, PingCastle)",
          "Centre-state data-exchange API authz and contract-enforcement tests",
        ],
      },
      {
        phase: "04 · Report + File-noting",
        activities: [
          "STQC / NIC observation-risk-recommendation report with finding-ID-numbered evidence",
          "Daily testing-log e-mail to additional secretary's office for file-noting parity",
          "CERT-In empanelled auditor letter + executive summary for secretary-level review",
          "Centre-state boundary contract clarification memo for CSS / CAG audit",
        ],
      },
      {
        phase: "05 · Closure + Re-test",
        activities: [
          "30-day re-test of all critical and high findings included in SoW",
          "Closure ledger filed with CSITE / CAG / regulator as required",
          "Joint sign-off meeting with ministry IT cell + NIC + (if applicable) UIDAI",
          "Optional continuous-monitoring retainer for subsequent quarterly reviews",
        ],
      },
    ],
    industries: [
      {
        name: "Central ministries",
        blurb:
          "Shastri Bhawan, Nirman Bhawan, Rail Bhawan, Krishi Bhawan portfolios on NIC + NICNET infrastructure.",
      },
      {
        name: "Public sector banks + PSEs",
        blurb:
          "Delhi-headquartered PSU banks, oil + power PSEs and central public-sector enterprises under CAG audit.",
      },
      {
        name: "Statutory regulators",
        blurb:
          "Sector regulators with Connaught Place / Janpath HQ — citizen-facing portal + data-exchange API scope.",
      },
      {
        name: "Aadhaar AUA / KUA consumers",
        blurb:
          "Ministries and PSEs consuming UIDAI Aadhaar services with the data-vault tokenisation obligation.",
      },
      {
        name: "Defence + aerospace PSUs",
        blurb:
          "PSU defence + aerospace estates with the additional layered-disclosure and segregation expectations.",
      },
      {
        name: "Centrally-sponsored schemes",
        blurb:
          "Centre-state CSS portals where boundary clarity between central master and state instance is the audit pain point.",
      },
    ],
    deliverables: [
      "STQC / NIC observation-risk-recommendation report with finding-ID-numbered evidence",
      "CERT-In empanelled auditor letter for ministry / PSU / CAG audit closure",
      "Aadhaar AUA / KUA compliance-checklist evidence pack against UIDAI requirements",
      "MPLS / NICNET segmentation review report with annotated network diagram",
      "Active Directory / RBAC privilege-path map (BloodHound + PingCastle artefacts)",
      "Centre-state boundary contract clarification memo for CSS programmes",
      "30-day re-test closure ledger + secretary-level executive summary",
      "GeM / NICSI-compatible deliverable bundle for file-noting and CAG submission",
    ],
    caseStudy: {
      industry: "Central ministry (Shastri Bhawan) — citizen-services portal + state implementations",
      scope:
        "CERT-In empanelled penetration test of central master + 9 state-instance deployments of a Mission-mode-project portal, including Aadhaar AUA wrapper review and NICNET segmentation",
      outcome:
        "47 findings closed in 5 weeks · 3 critical Aadhaar-wrapper data-leak paths remediated before file-noting reached the secretary · CERT-In letter accepted by CAG audit team first read · centre-state boundary contract clarified across 9 states with the state IT secretariat sign-off.",
    },
    faqs: [
      {
        q: "Are you on the GeM portal as a cybersecurity audit vendor?",
        a: "Yes — Macksofy is a GeM-listed cybersecurity services vendor under category 99 (cybersecurity audit + VAPT services). We accept direct purchase orders from central and state government buyers through GeM, and our PAN, GST, MSME, CERT-In empanelment and ISO 27001 / 9001 certification are kept current on the dashboard so procurement-cell verification completes inside hours.",
      },
      {
        q: "Will the CERT-In letter you issue be accepted by CAG / CSITE for closure?",
        a: "Yes — our empanelled-auditor letter is issued in the format CERT-In published with the 2024 empanelment-renewal guidance and has been filed without rework in CAG, CSITE-Cell and ministry internal-audit closure cycles. The supporting evidence pack follows STQC / NIC observation-risk-recommendation tabulation, which is what file-noting reviewers expect to read.",
      },
      {
        q: "Can you handle ministry estates that consume Aadhaar (AUA / KUA)?",
        a: "Yes — we audit the AUA / KUA wrapper against UIDAI's published compliance checklist, including the data-vault tokenisation requirement, the request-response signature flow and the device-registration handling. Findings on the Aadhaar wrapper are filed in parallel to UIDAI's compliance representative where required.",
      },
      {
        q: "How do you handle NIC / NICSI shared-infrastructure boundaries?",
        a: "By negotiating the boundary contract in writing up front. NIC-hosted VMs, NICSI-managed firewalls and the ministry-owned LAN have boundaries that shift daily, so we get the ministry IT cell + NIC engineer + (where applicable) NICSI lead on a kickoff call and produce a signed scope-boundary memo before testing starts. That memo is what we cite later when a finding crosses the line and a NIC change-request is needed.",
      },
      {
        q: "Do you handle centre-state CSS programmes where state instances are separately operated?",
        a: "Yes — we test the central master and a sample of state-instance deployments, then publish a boundary-clarification memo with the state IT secretariat sign-off so the CAG audit team has a clean record of what the centre owes versus what the state owes. This is the single most-asked-about clarification we see from CAG on CSS programmes.",
      },
      {
        q: "Will you adhere to the CERT-In 6-hour incident-reporting SLA during testing?",
        a: "Yes — that is treated as a hard SLA inside the engagement. We pre-define the escalation path to the CERT-In handle, the ministry security-cell number and the additional secretary's office, and any test-induced incident (or pre-existing compromise we discover) is reported inside the six-hour window per the 28 April 2022 CERT-In directive.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 3 · Chennai × Penetration Testing
  // ─────────────────────────────────────────────────────────────────────
  {
    citySlug: "chennai",
    serviceSlug: "penetration-testing",
    headline:
      "Penetration Testing in Chennai · BFSI & SaaS",
    lead:
      "CERT-In empanelled penetration testing for Chennai banks, gold-loan NBFCs, OMR / Tidel Park SaaS and Sholinganallur GCCs — RBI Cyber Resilience, SOC 2 and ISO 27001 mapped in one report.",
    body: [
      "Chennai's cybersecurity buyer profile splits across three distinct clusters that demand three distinct penetration-testing playbooks. The South-India BFSI HQs concentrated around Anna Salai, Mylapore and T. Nagar — Indian Bank, Indian Overseas Bank, City Union Bank, Karur Vysya Bank, the long tail of state co-operative banks under TNSCB, and the gold-loan NBFC majors (Manappuram Finance headquartered in Valapad, Muthoot regional HQ in Chennai) — bring an RBI Master Direction on IT Governance + Cyber Resilience scope with legacy core-banking edges. The OMR (Old Mahabalipuram Road) / Sholinganallur / Tidel Park SaaS belt, running from Tidel Park near Velachery down to the Sholinganallur ELCOT estate and onward to Siruseri SIPCOT-IT, brings a product-engineering scope tied to SOC 2 Type 2, ISO 27001 and the API Security Top 10. The Sriperumbudur / Oragadam / Ambattur manufacturing-IT belt brings the OT-adjacent scope tied to IEC-62443 and the Hindustan Lever / TVS / Hyundai / Renault-Nissan supply chains. Generic 'web pentest' SoWs do not survive the first technical kickoff in any of the three.",
      "For Chennai banks and NBFCs we run penetration tests aligned to RBI's Master Direction on IT Governance and the Cyber Resilience framework, with the SEBI CSCRF overlay for any depository-participant or AMC arm and the gold-loan-specific NBFC ML (Master Direction on Lending) controls where the NBFC operates the pledge-management portal and ATM-grade gold-loan disbursement kiosks across Tamil Nadu and Kerala. Reports are in CERT-In empanelled format with the empanelment letter the bank's IS auditor needs to file with RBI's CSITE Cell. We test the actual money-movement flow — net-banking, the legacy core-banking edge (Finacle / Flexcube / TCS BaNCS instances some Chennai banks still run on AIX), the gold-loan branch-tablet authentication chain, the ATM-switch / card-personalisation vendor integration, and the south-Indian co-operative-bank-specific NPCI sub-member sponsorship flow.",
      "For OMR / Sholinganallur SaaS and GCC clients the scope follows the product-engineering pattern that Bengaluru and Hyderabad SaaS share, with three Chennai-specific overlays. First, the long tail of US-healthcare and BFSI buyers means HIPAA / HITRUST and PCI-DSS DSS-on-cloud readiness sit on the same test plan as the OWASP ASVS / API Security Top 10 baseline. Second, the GraphQL-heavy stacks that the Tidel Park / Siruseri SaaS belt has standardised on demand explicit field-level and depth-limit authorisation testing, not just endpoint-level. Third, multi-tenant isolation testing is critical because the Chennai SaaS belt is unusually concentrated in shared-DB-tenant designs — separating tenants by row-level security in PostgreSQL is the dominant pattern and the dominant bug class we close.",
      "For Sriperumbudur / Oragadam / Ambattur manufacturing-IT and supply-chain partners (the Hindustan Lever, TVS, Hyundai, Renault-Nissan, Ashok Leyland orbits), the scope adds an OT-adjacent layer — the Manufacturing Execution System (MES) integration with the ERP, the dealer-management-system (DMS) portal where third-party showrooms log in, and the supplier-portal where Tier-1 / Tier-2 / Tier-3 suppliers exchange schedules and quality data. IEC-62443 aligned reviews are delivered alongside the IT-side penetration test where the customer demands the joint scope.",
      "Senior consultants fly from Mumbai BKC for kickoff and the onsite-testing days, with Hyderabad HITEC as an alternate hub for the south-Indian fortnightly cadence. Most engagements run 3-5 weeks with re-testing of critical and high findings included in the base SoW so RBI / customer remediation windows are not missed. For long-running Chennai BFSI programmes we keep a Chennai-resident lead consultant on the engagement throughout, with weekly onsite days at Anna Salai / Mylapore / T. Nagar branches and the data-centre site in Perungudi or the SIPCOT-IT corridor.",
      "Chennai banking and NBFC clients almost always have older core-banking integrations carrying weight that no modern API gateway is meant to bear — direct DB links from a third-party reconciliation tool, FTP/SFTP file drops between the bank and NPCI / NACH / RTGS vendors, legacy CICS / MQ bridges between a mainframe core and a JBoss-era web tier, and the long tail of MS Access front-ends that branch operations still run. We test those legacy edges directly rather than declaring them out of scope, because the regulator's audit team will not declare them out of scope when they come for the next inspection. The CERT-In format report includes a 'legacy edge inventory' annex specifically for this reason.",
      "For OMR SaaS clients shipping to US healthcare or BFSI buyers we add an HIPAA / HITRUST or PCI-DSS DSS-readiness overlay where it pays for itself in the next customer security review. The same test plan generates evidence acceptable to the SOC 2 Type 2 auditor, the ISO 27001 surveillance assessor, the customer's CISO questionnaire and (where the buyer is a US health system) the HITRUST-certified-vendor questionnaire. The Tidel Park and Siruseri SaaS belt has standardised on this dual-purpose evidence model and we deliver it as one engagement.",
      "Adversary modelling for Chennai-cluster engagements is regionally grounded. We test against the actual patterns hitting south-Indian banks and NBFCs — ATM-jackpotting attempts traceable to the FASTCash variant that affected south-Asian banks in 2024, gold-loan branch-tablet credential reuse leading to disbursement-fraud chains, NPCI sub-member sponsorship abuse where the parent scheduled bank's switch becomes the entry point, ALPHV / RansomHub affiliate footholds on Sriperumbudur supplier portals where a Tier-2 vendor's CI/CD pipeline becomes the path into the OEM's MES. Each finding is mapped to the TTP and the threat actor most likely to weaponise it, with the detection-engineering recommendation paired in.",
    ],
    buyerConcerns: [
      "RBI Master Direction IT Governance + Cyber Resilience evidence quality",
      "South-India co-operative bank + gold-loan NBFC operational nuances",
      "Legacy core-banking edge — Finacle / Flexcube / BaNCS on AIX with FTP / MQ bridges",
      "OMR SaaS multi-tenant isolation and row-level-security in shared-DB designs",
      "GraphQL field-level authz and depth-limit / batch-query abuse",
      "API Security Top 10 + OWASP ASVS L2 + HIPAA / HITRUST / PCI-DSS overlay",
      "Sriperumbudur / Oragadam manufacturing supply-chain portal testing (IEC-62443 adjacent)",
      "CERT-In empanelled auditor letter for next RBI / customer audit",
      "Re-testing inside RBI / customer remediation windows included in SoW",
    ],
    differentiators: [
      "Three distinct playbooks for the three Chennai clusters — South-India BFSI, OMR / Tidel Park SaaS and Sriperumbudur manufacturing — not the same web-app pentest relabelled.",
      "Legacy edge testing of Finacle / Flexcube / BaNCS on AIX, MQ / CICS bridges and FTP / NPCI vendor links — the bits most pentest vendors declare out of scope.",
      "Reports map simultaneously to RBI Cyber Resilience, SEBI CSCRF, SOC 2 Type 2, ISO 27001 and HIPAA / HITRUST in one document — useful for Chennai firms straddling regulated and SaaS revenue.",
      "Chennai-resident lead consultant on long-running BFSI programmes, plus senior fly-in from Mumbai BKC or Hyderabad HITEC for kickoff and exit.",
      "Re-testing of critical and high findings included in the SoW so RBI and customer remediation windows are never missed.",
    ],
    seoDescription:
      "CERT-In empanelled penetration testing in Chennai for South-India banks, gold-loan NBFCs, OMR / Tidel Park SaaS and Sriperumbudur manufacturing — RBI Cyber Resilience + SOC 2.",
    keywords: [
      "penetration testing Chennai",
      "CERT-In pentest Chennai",
      "OMR penetration testing",
      "Tidel Park pentest Chennai",
      "Chennai banking pentest",
      "gold loan NBFC pentest",
      "Sholinganallur SaaS pentest",
      "Sriperumbudur manufacturing pentest",
      "RBI Cyber Resilience Chennai",
      "Chennai SaaS HIPAA pentest",
    ],
    stats: [
      { value: "40+", label: "Chennai engagements delivered" },
      { value: "3 clusters", label: "BFSI · SaaS · manufacturing playbooks" },
      { value: "Same-week", label: "Onsite arrival (BKC / HYD)" },
      { value: "TNeGA", label: "Eligible state-government vendor" },
    ],
    methodology: [
      {
        phase: "01 · Cluster Scoping + Kickoff",
        activities: [
          "Cluster classification — BFSI / OMR SaaS / Sriperumbudur manufacturing — and corresponding playbook",
          "Onsite kickoff at Anna Salai / Mylapore / Tidel Park / Sholinganallur / Oragadam",
          "Legacy edge inventory — Finacle / Flexcube / BaNCS / MQ / FTP / NPCI vendor links",
          "Regulator + customer evidence-overlay agreement (RBI + SOC 2 + HIPAA / HITRUST as applicable)",
        ],
      },
      {
        phase: "02 · Threat Model + External Recon",
        activities: [
          "Regional adversary modelling — FASTCash variants, ALPHV / RansomHub supplier-portal footholds",
          "External attack-surface enumeration — subdomain, certificate, DNS, exposed S3 / blob",
          "Application architecture review with the engineering / IT team",
          "Aadhaar AUA / KUA wrapper review where in scope (gold-loan branch tablets etc.)",
        ],
      },
      {
        phase: "03 · Exploit + Lateral",
        activities: [
          "Web + API + mobile testing against OWASP ASVS L2 + API Security Top 10",
          "Multi-tenant isolation tests on shared-DB SaaS (row-level-security probing)",
          "GraphQL field-level authz, depth limits and batch-query abuse",
          "Legacy edge exploit chains — MQ / CICS / FTP / direct DB-link paths",
        ],
      },
      {
        phase: "04 · Report + Crosswalk",
        activities: [
          "CERT-In empanelled format report + STQC-style observation-risk-recommendation table",
          "Crosswalk per finding to RBI Cyber Resilience / SEBI CSCRF / SOC 2 / ISO 27001 / HIPAA",
          "Jira-importable CSV + private GitHub Issues handoff for SaaS clients",
          "Board-pack executive summary for BFSI audit committee",
        ],
      },
      {
        phase: "05 · Re-test + Closure",
        activities: [
          "30-day re-test of all critical and high findings included in SoW",
          "Closure ledger filed with RBI IS auditor / SOC 2 auditor / customer CISO",
          "Detection-engineering recommendations handed to client SOC for SIEM tuning",
          "Optional continuous-testing retainer for fortnightly OMR SaaS release trains",
        ],
      },
    ],
    industries: [
      {
        name: "South-India BFSI HQs",
        blurb:
          "Indian Bank, IOB, City Union, Karur Vysya and TN co-operative banks around Anna Salai / Mylapore / T. Nagar.",
      },
      {
        name: "Gold-loan NBFCs",
        blurb:
          "Manappuram + Muthoot regional HQs — pledge portals and branch-tablet auth across TN / Kerala / AP networks.",
      },
      {
        name: "OMR / Tidel Park SaaS",
        blurb:
          "B2B SaaS shipping to US healthcare + BFSI buyers — GraphQL-heavy stacks with HIPAA / HITRUST / SOC 2 needs.",
      },
      {
        name: "Sholinganallur / Siruseri GCCs",
        blurb:
          "US + UK enterprise GCCs in SIPCOT-IT — privilege paths between Chennai operators and offshore production.",
      },
      {
        name: "Sriperumbudur / Oragadam manufacturing",
        blurb:
          "Hyundai, Renault-Nissan, TVS, Hindustan Lever supply-chain portals — IEC-62443-adjacent supplier-portal scope.",
      },
      {
        name: "TN state government",
        blurb:
          "TNeGA-listed cybersecurity vendor for state-government portals and centrally-sponsored-scheme instances.",
      },
    ],
    deliverables: [
      "CERT-In empanelled format report with STQC-style observation-risk-recommendation tabulation",
      "Legacy edge inventory annex — Finacle / Flexcube / BaNCS / MQ / FTP / NPCI vendor link findings",
      "Multi-framework crosswalk (RBI / SEBI / SOC 2 / ISO 27001 / HIPAA / HITRUST / PCI-DSS)",
      "GraphQL + API Security Top 10 findings with field-level authz repros",
      "Multi-tenant isolation report with row-level-security probe results",
      "Jira-importable CSV + private GitHub Issues (SaaS clients) / board-pack executive summary (BFSI)",
      "30-day re-test closure ledger inside regulator and customer remediation windows",
      "Optional fortnightly continuous-testing retainer for OMR SaaS release trains",
    ],
    caseStudy: {
      industry: "Chennai-headquartered gold-loan NBFC — multi-state branch network",
      scope:
        "CERT-In empanelled penetration test of pledge-management portal, branch-tablet authentication chain, NACH / NPCI sub-member integration and core-banking edge — across 2,400 branches",
      outcome:
        "34 findings closed in 4 weeks · 6 critical disbursement-fraud paths remediated before RBI follow-up · branch-tablet credential rotation enforced across TN + Kerala + AP networks · re-test closure ledger filed with the IS auditor inside the 30-day window.",
    },
    faqs: [
      {
        q: "Do you understand south-Indian co-operative bank operational reality?",
        a: "Yes — we have delivered RBI Cyber Resilience-aligned tests for TNSCB-network co-operative banks, including the NPCI sub-member sponsorship path where the parent scheduled bank's switch is the entry point, the AIX-hosted core-banking edge and the branch-network MPLS topology that has not been redesigned since the 2008 CBS migration. Scoping factors all of this in.",
      },
      {
        q: "Can your same report close RBI, SOC 2 and HIPAA in one cycle?",
        a: "Yes — the crosswalk-per-finding model maps each issue to RBI Cyber Resilience / SEBI CSCRF, SOC 2 CC controls, ISO 27001 Annex A and HIPAA Security Rule + HITRUST CSF where applicable. Chennai SaaS firms straddling US-healthcare revenue and India-regulated arms use this to avoid running three separate penetration tests.",
      },
      {
        q: "Will you test the legacy Finacle / Flexcube / BaNCS edges, or declare them out of scope?",
        a: "We test them. Most vendors declare the MQ / CICS / FTP / direct-DB-link paths out of scope because they are awkward — but the regulator will not declare them out of scope when the inspection arrives, and that is where the actual money-movement abuse lives. Our reports include a 'legacy edge inventory' annex specifically for this.",
      },
      {
        q: "Do you handle the Sriperumbudur / Oragadam OEM supplier-portal scope?",
        a: "Yes — we deliver IEC-62443-adjacent reviews of supplier portals, dealer-management systems and MES-ERP integrations for the Hyundai, Renault-Nissan, TVS, Ashok Leyland and Hindustan Lever supply-chain ecosystems where the customer demands the joint IT + OT-adjacent scope. The OT side is air-gap-tested separately when relevant.",
      },
      {
        q: "Are you a TNeGA-empanelled state-government cybersecurity vendor?",
        a: "Yes — we participate in TN-eGA tenders and central GeM listings, and we handle Tamil-language documentation requirements where state-government engagements demand it. Centrally-sponsored-scheme state instances deployed in Tamil Nadu fall under this delivery model.",
      },
      {
        q: "What is the onsite cadence for a Chennai BFSI engagement?",
        a: "Senior consultants fly from Mumbai BKC for kickoff and onsite testing days, with Hyderabad HITEC as an alternate hub for the fortnightly cadence. For long-running Chennai BFSI programmes we keep a Chennai-resident lead consultant on the engagement throughout, with weekly onsite days at Anna Salai / Mylapore / T. Nagar branches and the data-centre site in Perungudi or the SIPCOT-IT corridor.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 4 · Gurugram × Managed SOC
  // ─────────────────────────────────────────────────────────────────────
  {
    citySlug: "gurugram",
    serviceSlug: "managed-soc",
    headline:
      "Managed SOC in Gurugram · BFSI & GCCs",
    lead:
      "24x7 co-managed SOC for Gurugram private-bank HQs, insurer HQs and Fortune-500 GCCs in DLF Cyber City, Udyog Vihar and Golf Course Road — CrowdStrike + Splunk / Sentinel, RBI / IRDAI / parent-group reporting in parallel.",
    body: [
      "Most Gurugram BFSI HQs and Fortune-500 GCCs already own a SIEM — Splunk Enterprise / Cloud, Microsoft Sentinel, Google Chronicle / SecOps or IBM QRadar — and a partial in-house team running a 9-to-9 shift with limited weekend coverage. What they need is not a black-box outsourced SOC running on a vendor-proprietary platform; it is a true 24x7 co-managed SOC that runs alongside the in-house shift pattern, owns L1 / L2 triage on the client's own stack, feeds the CISO's RBI Cyber Resilience / IRDAI Information & Cyber Security / parent-group monthly cadence, and leaves every detection rule, parser and playbook in the client's environment when the contract ends. The Gurugram private-bank, insurer-HQ and GCC market has explicitly rejected the lock-you-in MSSP model since the 2022-23 cycle of MSSP-platform incidents — and we built our delivery model around that rejection.",
      "Our Gurugram Managed SOC operates as a co-managed extension: shared playbooks on the client's Splunk / Sentinel / Chronicle / QRadar instance; CrowdStrike Falcon or SentinelOne or Microsoft Defender for Endpoint as the EDR layer (we operate against whatever the bank already runs — we do not require a CrowdStrike replatform); defined L1 / L2 / L3 handoff to the client team with a written runbook for each; a daily detection-engineering backlog reviewed jointly in a 30-minute morning stand-up; and a weekly threat-hunt cadence based on the bank's threat-intel feed and the CrowdStrike / Mandiant / Recorded Future advisories the client subscribes to. The Macksofy 24x7 analyst team operates from a SOC2-Type-2-attested facility with the in-shift bench redundancy DLF Cyber City CISOs verify on the procurement visit.",
      "Use cases we tune specifically for Gurugram BFSI: loan-origination fraud signals (synthetic-identity patterns, multi-loan velocity, address-cluster anomalies on the digital-lending stack); partner-fintech API abuse on the open-API and BBPS / NACH / NPCI rails; contact-centre bulk-customer-data access on the BPO-extended estate, including the Genpact-style multi-tenant CRM exposures; privileged-identity misuse on the Cyber City / Cyberhub / Golf Course Road multi-tenant office networks and the shared-WiFi environments private-bank exec teams use; parent-group-mandated detection coverage gaps where the global SOC's MITRE ATT&CK matrix is enforced as the audit baseline; and the LAPSUS$-style identity-provider compromise scenarios that hit Indian-BFSI parent groups in 2023-24. For Fortune-500 GCCs the priority shifts to the privilege-path between India-based operations / development staff and the offshore production tenants — typically a US / UK / EU mothership — where Just-in-Time access, session recording and ITSI-tracked privilege use are the audit baseline.",
      "Reporting is dual-track from one evidence base. On one side, the RBI Cyber Resilience / IRDAI Information & Cyber Security / SEBI CSCRF monthly board-grade pack — incident counts by severity, mean-time-to-detect (MTTD), mean-time-to-respond (MTTR), detection-engineering backlog status, named-threat coverage and the regulator-style SoC composition disclosure. On the other side, the parent group's global SOC reporting format — Group SOC dashboard ingest, ServiceNow ITSM integration with the parent's instance, parent-mandated KPI thresholds and the global-CISO escalation chain. The same incident generates both, and the evidence-quality consistency between the two is what audit teams check for first when the next examination arrives.",
      "Detection content is BFSI-tuned and Gurugram-specific. We layer the following on top of the CrowdStrike / Splunk SES / Sentinel content-pack baseline and the MITRE ATT&CK coverage: digital-lending fraud signals against the loan-origination platform (synthetic-identity correlation, GPS-spoof detection on the agent app, KYC-image-reuse detection); BBPS / NACH / NPCI rail anomaly detection (mandate-creation velocity, account-aggregator pull-velocity, partner-fintech API rate anomalies); contact-centre bulk-export detection on the call-centre CRM (volumetric query patterns, role-based misuse); privileged-identity-misuse detection on CyberArk / BeyondTrust / Delinea PAM systems; ADCS misconfiguration exploitation detection (the LAPSUS$ / private-bank-2023 pattern); and identity-provider compromise scenarios (Azure AD / Okta / PingFederate token theft, OAuth refresh-token replay).",
      "Incident response is built in — not an add-on, not a separate retainer with a separate team. The same engineers running L2 / L3 detection lead containment if an alert escalates to incident, so there is no warm-handover delay to a separate IR practice. The IR runbook is jointly maintained with the client's IT-security team, exercises against Gurugram BFSI scenarios are run every quarter (digital-lending fraud surge, BPO-extended estate data-exfiltration, parent-group identity-provider compromise, RaaS affiliate foothold on the ATM / card-personalisation vendor estate), and an annual board-level red-vs-blue review keeps the retainer honest. The IR call goes to people who already know which account is shared between three systems and which legacy box still has an open RDP.",
      "Onsite analyst hours at the client's DLF Cyber City / Udyog Vihar / Golf Course Road SOC are part of the engagement, not extra — most clients use them for handover during the in-house team's leave windows, for sensitive-incident-handling that needs to be physically inside the client SOC, and for the quarterly RBI Cyber Resilience supervisory visits where the regulator's inspection team wants the analyst present. The Gurugram-based analyst bench rotates from a SOC2-Type-2 facility with bench redundancy in Mumbai BKC, so single-point-of-failure questions during the procurement visit have a real answer.",
      "Commercial terms are designed around the Gurugram BFSI procurement pattern. Multi-year retainer with annual renewal, a fixed-EDR / fixed-SIEM ingestion footprint with banded upgrade pricing, transparent named-resource pricing for the analyst bench, and the standard insurer-mandated breach-notification clauses. The contract explicitly transfers detection-engineering IP — every rule, every parser, every playbook is the client's to keep at the end of the engagement. No vendor-proprietary content-pack lock-in, no exit-cost surprise on the renewal cycle. That is the model Gurugram CISOs ask for and that is the model we deliver against.",
    ],
    buyerConcerns: [
      "Co-managed model on the client's own Splunk / Sentinel / Chronicle / QRadar — no vendor-platform lock-in",
      "CrowdStrike / SentinelOne / Defender EDR operated as-is — no forced replatform",
      "Detection-engineering IP transfer — rules, parsers, playbooks stay with the client at contract end",
      "Digital-lending fraud signals + BBPS / NACH / NPCI rail anomaly detection",
      "BPO / contact-centre bulk-customer-data exfiltration detection",
      "Privileged-identity-misuse on Cyber City / Cyberhub multi-tenant office networks",
      "Privilege-path detection between India GCC operations and offshore production tenants",
      "RBI Cyber Resilience + IRDAI + SEBI CSCRF monthly board-grade reporting",
      "Parallel parent-group / global SOC reporting format from one evidence base",
    ],
    differentiators: [
      "True co-managed model — detection rules, parsers and playbooks live in the client's SIEM and stay with the client at contract end, contractually transferred IP.",
      "Detection backlog tuned specifically for Gurugram BFSI scenarios — digital-lending fraud, BBPS / NACH / NPCI abuse, BPO bulk-data exfiltration, ADCS misuse — not generic CIS / MITRE content packs.",
      "Dual-track monthly reporting that satisfies RBI / IRDAI / SEBI CSCRF and the overseas parent's global SOC format from one evidence base — no double-handling.",
      "Integrated IR retainer staffed by the same engineers running the SOC — no warm-handover delay between detection and containment.",
      "EDR-agnostic delivery — CrowdStrike, SentinelOne, Defender for Endpoint or whatever the bank already runs; we do not require a replatform to onboard.",
      "Quarterly tabletop exercises tuned to Gurugram BFSI scenarios + annual board-level red-vs-blue, with the IR runbook jointly maintained with the client.",
    ],
    seoDescription:
      "24x7 co-managed SOC in Gurugram for BFSI HQs, insurers and Fortune-500 GCCs — Splunk / Sentinel / CrowdStrike. RBI Cyber Resilience + IRDAI + parent-group reporting.",
    keywords: [
      "managed SOC Gurugram",
      "co-managed SOC Gurgaon BFSI",
      "MSSP Gurugram private bank",
      "24x7 SOC DLF Cyber City",
      "Splunk SOC Gurgaon",
      "Sentinel managed SOC Gurugram",
      "CrowdStrike Falcon Gurgaon SOC",
      "GCC managed SOC India",
      "RBI Cyber Resilience SOC Gurugram",
      "insurer managed SOC Gurgaon",
    ],
    stats: [
      { value: "24x7x365", label: "Analyst coverage from SOC2-attested facility" },
      { value: "Splunk · Sentinel · QRadar", label: "Co-managed on client's stack" },
      { value: "Dual-track", label: "RBI + parent-group reporting" },
      { value: "Quarterly", label: "Tabletops + annual red-vs-blue" },
    ],
    methodology: [
      {
        phase: "01 · Stack + Use-case Onboarding",
        activities: [
          "SIEM (Splunk / Sentinel / Chronicle / QRadar) ingestion baseline + parser audit",
          "EDR (CrowdStrike / SentinelOne / Defender) integration as-is — no replatform",
          "Use-case inventory — digital-lending fraud, BBPS / NACH abuse, BPO bulk-export, ADCS misuse",
          "L1 / L2 / L3 handoff runbook written jointly with in-house SOC team",
        ],
      },
      {
        phase: "02 · Detection Engineering",
        activities: [
          "BFSI-tuned detection-content pack deployed into client's SIEM (rules stay with client)",
          "MITRE ATT&CK + parent-group control catalogue coverage matrix baseline",
          "Threat-intel feed integration — Mandiant / Recorded Future / OEM-provided",
          "Daily detection-engineering backlog with the bank's AppSec / IT-Sec lead",
        ],
      },
      {
        phase: "03 · 24x7 Operations",
        activities: [
          "Macksofy 24x7 analyst bench from SOC2-Type-2 facility with Mumbai BKC redundancy",
          "L1 / L2 triage on client's stack — alerts, parsers and playbooks owned in client tenant",
          "Onsite analyst hours at DLF Cyber City / Udyog Vihar / Golf Course Road SOC",
          "Weekly threat-hunt cadence on bank's data, with hand-off memo to in-house team",
        ],
      },
      {
        phase: "04 · IR Integration",
        activities: [
          "Same engineers escalate from L3 detection to incident containment — no separate IR team",
          "Quarterly tabletops on Gurugram BFSI scenarios (lending fraud, BPO exfil, ADCS, IdP compromise)",
          "Annual board-level red-vs-blue exercise + IR runbook refresh",
          "DFIR-grade evidence preservation for any regulator-reportable incident",
        ],
      },
      {
        phase: "05 · Dual-track Reporting",
        activities: [
          "RBI / IRDAI / SEBI CSCRF monthly board-grade pack — MTTD, MTTR, backlog, named-threat coverage",
          "Parent-group / global SOC dashboard + ServiceNow ITSM integration",
          "Quarterly CISO + audit-committee review pack",
          "Annual independent third-party VAPT of the SOC + SIEM included in retainer",
        ],
      },
    ],
    industries: [
      {
        name: "Private-bank HQs",
        blurb:
          "DLF Cyber City / Golf Course Road HQs of top private banks — digital-lending fraud + BBPS abuse focus.",
      },
      {
        name: "Insurer HQs",
        blurb:
          "Top life, general and health insurer HQs in DLF + Udyog Vihar — IRDAI Information & Cyber Security cadence.",
      },
      {
        name: "Fintech + payments + lending",
        blurb:
          "Series-D / listed fintech HQs in Cyberhub + Sohna Road — RBI digital-lending guidelines + PCI-DSS overlay.",
      },
      {
        name: "Fortune-500 GCCs",
        blurb:
          "600+ GCCs (Deloitte, Accenture, KPMG, EY, Genpact) — India-GCC to offshore-prod privilege-path detection focus.",
      },
      {
        name: "Big-4 / professional services",
        blurb:
          "Consulting and professional-services HQs — client-confidentiality detection + insider-threat focus.",
      },
      {
        name: "Travel + e-commerce HQs",
        blurb:
          "MakeMyTrip-group + listed e-commerce HQs in Sector 21 / Sector 44 — partner-API abuse + bot-traffic focus.",
      },
    ],
    deliverables: [
      "24x7x365 SOC operations on client's own Splunk / Sentinel / Chronicle / QRadar stack",
      "BFSI-tuned detection-content pack deployed into client tenant (contractually transferred IP)",
      "Monthly RBI Cyber Resilience / IRDAI / SEBI CSCRF board-grade reporting pack",
      "Parent-group / global SOC dashboard + ServiceNow ITSM integration feed",
      "Integrated incident-response retainer with DFIR-grade evidence preservation",
      "Quarterly Gurugram BFSI tabletop exercises (4 / year) + annual board red-vs-blue",
      "Annual independent third-party VAPT of the SOC and SIEM included",
      "Detection-engineering backlog + monthly threat-hunt memos delivered to in-house team",
    ],
    caseStudy: {
      industry: "Gurugram-headquartered private bank — Splunk + CrowdStrike co-managed",
      scope:
        "24x7 co-managed SOC on existing Splunk Enterprise + CrowdStrike Falcon, IRDAI life-insurance subsidiary overlay, parent-group ServiceNow ingestion + quarterly RBI Cyber Resilience reporting",
      outcome:
        "MTTD reduced from 87 min to 14 min over 6 months · 9 detection-content additions adopted by parent-group global SOC · digital-lending fraud detection blocked INR 2.3 Cr of synthetic-identity disbursement in Q3 · RBI Cyber Resilience supervisory visit cleared with zero observations on SOC-side evidence.",
    },
    faqs: [
      {
        q: "Will the detection rules and playbooks stay with us at contract end?",
        a: "Yes — that is contractually transferred IP. Every rule, parser, playbook and runbook is deployed into your own SIEM tenant from day one and is yours to keep. There is no vendor-proprietary content pack hosted in our cloud, no portal-only access, no exit cost on the renewal cycle. That is the Gurugram BFSI / GCC market standard since the 2022-23 MSSP-platform incident cycle and we built our delivery model around it.",
      },
      {
        q: "Do we need to replatform from CrowdStrike to your preferred EDR?",
        a: "No — we are EDR-agnostic. We operate against CrowdStrike Falcon, SentinelOne, Microsoft Defender for Endpoint, Trend Vision One or whatever the bank already runs. No forced replatform, no licence-bundle pressure. The same applies to SIEM (Splunk, Sentinel, Chronicle, QRadar) and PAM (CyberArk, BeyondTrust, Delinea).",
      },
      {
        q: "Can you produce both RBI / IRDAI reporting and our parent-group's global SOC format?",
        a: "Yes — dual-track from one evidence base. The RBI Cyber Resilience / IRDAI Information & Cyber Security / SEBI CSCRF monthly pack on one side; the parent group's global SOC dashboard format and ServiceNow ITSM integration on the other. Same incidents, same MTTD / MTTR numbers, same detection-engineering backlog status — presented in the format each consumer expects.",
      },
      {
        q: "What is your IR response model — separate team or same engineers?",
        a: "Same engineers. The L2 / L3 detection team escalates to incident containment directly, so there is no warm-handover delay. The IR call goes to people who already know your environment — which account is shared between three systems, which legacy box still has an open RDP, which partner-API is the most fragile. We then bring in DFIR-grade evidence-preservation discipline from the same bench.",
      },
      {
        q: "Do you cover the BPO / contact-centre extended estate?",
        a: "Yes — the bulk-customer-data exfiltration pattern on Genpact-style multi-tenant CRMs, the role-based misuse detection on the BPO-extended call-centre estate and the volumetric-query-pattern detection are part of the Gurugram BFSI use-case baseline. We have closed real exfiltration events against this pattern in 2024-25.",
      },
      {
        q: "Is the SOC and SIEM itself audited?",
        a: "Yes — annual independent third-party VAPT of the SOC and SIEM is included in the multi-year retainer. The audit report goes to the bank's IS auditor and the parent group's global CISO directly.",
      },
      {
        q: "What about onsite analyst hours at our DLF Cyber City SOC?",
        a: "Built into the engagement, not extra. Most clients use the hours for handover during the in-house team's leave windows, for sensitive-incident-handling that has to be physically inside the client SOC, and for the quarterly RBI Cyber Resilience supervisory visits where the regulator's inspection team wants the analyst present.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 5 · Mumbai × Managed SOC
  // ─────────────────────────────────────────────────────────────────────
  {
    citySlug: "mumbai",
    serviceSlug: "managed-soc",
    headline:
      "Managed SOC in Mumbai · 24×7 BFSI",
    lead:
      "24x7 co-managed SOC for Mumbai banks, NBFCs, brokers, AMCs and insurers in BKC, Lower Parel, Andheri MIDC and Belapur — Splunk / Sentinel / Chronicle, BFSI-tuned detection, integrated IR.",
    body: [
      "Mumbai BFSI Managed SOC has to do three demanding things at once: meet the operational requirements of RBI's April 2024 Cyber Resilience and Master Direction on IT Governance; produce SEBI CSCRF and IRDAI Information & Cyber Security reporting on the same evidence base; and detect the specific attack patterns that hit Indian banks at the scale of SBI / HDFC / ICICI / Kotak / Axis — UPI mule-account mapping, treasury-workstation anomalies, broker-desk credential abuse, ATM-switch and card-personalisation vendor activity, contact-centre bulk-customer-data access, and SWIFT BIC-level transaction monitoring on the small subset of clients that operate cross-border. A SOC built for a generic enterprise customer cannot do this. The detection content has to be Indian-BFSI-native.",
      "Our Mumbai SOC operates as a co-managed extension to the client's SIEM — Splunk Enterprise / Cloud, Microsoft Sentinel, Google Chronicle / SecOps or IBM QRadar — with shared detection-engineering ownership. The bank's CISO retains control of every rule, every parser, every dashboard. We provide the 24x7 L1 / L2 analyst coverage, the threat-hunting cadence, and an integrated incident-response retainer staffed by the same engineers. The Macksofy analyst bench is split across Mumbai BKC (the primary location and the same building as our HQ) and a secondary site so single-point-of-failure questions during the procurement walk-through have a real answer. Onsite analyst hours at the client's BKC / Lower Parel / Andheri MIDC / Powai / Belapur SOC are part of the engagement, not extra.",
      "Detection content is explicitly BFSI-tuned and pattern-grounded in the actual fraud and intrusion patterns we have seen on Indian-bank estates between 2023 and 2026. The UPI layer: mule-account graph detection (multi-VPA fan-out, account-aggregator velocity, beneficiary-cluster anomalies), transaction-velocity outliers per-payee and per-payer, mandate-creation abuse on the AutoPay rail, and the UPI Lite / RuPay credit-on-UPI specific patterns that arrived with the 2024-25 NPCI guideline updates. The net-banking layer: transaction-flow tampering, OTP / 2FA bypass attempts, beneficiary-addition velocity, reconciliation-layer anomalies and the long tail of mobile-banking app re-packaging attacks. The treasury / SWIFT layer: anomalous workstation behaviour on the SWIFT-attached endpoints, MT103 / MT202 message-volume outliers, BIC-pair velocity anomalies, and the APT38-style banking-malware indicators that have hit south-Asian banks in the 2023-25 cycle. The broker / AMC layer: broker-terminal logon anomalies, OMS / RMS order-pattern oddities, algo-API authorisation-flow misuse, and the market-data-feed tampering paths SEBI CSCRF expects detected. The card layer: ATM-switch vendor activity anomalies, card-personalisation vendor command-and-control, and the FASTCash-variant detection that south-Asian banks need post-2024.",
      "We layer this Indian-BFSI-native content on top of the CrowdStrike Falcon / Splunk SES / Microsoft Sentinel content-pack baseline and the MITRE ATT&CK enterprise + cloud + ICS matrix coverage. Every detection is mapped to MITRE technique and sub-technique, the specific RBI Cyber Resilience clause it supports, and the SEBI CSCRF / IRDAI clause where applicable — so the monthly board-grade pack writes itself from the alert ledger. The threat-hunt cadence runs weekly against the bank's data and the named-threat advisories the bank's CISO subscribes to (Mandiant, Recorded Future, Group-IB, FS-ISAC / Indian-BFSI-ISAC equivalent, the OEM-provided feeds).",
      "Monthly reporting is in the format RBI / SEBI / IRDAI inspectors expect to read during the next supervisory visit — incident counts by severity, mean-time-to-detect (MTTD), mean-time-to-respond (MTTR), detection-engineering backlog status, named-threat coverage, top suppressed-alert classes with rationale, and the regulator-style SOC composition disclosure (analyst-bench size, shift redundancy, escalation chain). The CSITE Cell follow-up examination of a Mumbai bank typically reads exactly this format, and we ship that way deliberately. Annual third-party VAPT of the SOC itself, the SIEM and the EDR estate is included in the multi-year retainer.",
      "Integrated incident response is built in — the same engineers running L2 / L3 detection lead containment if an alert escalates to incident. No warm-handover, no separate IR practice with a separate retainer. The IR runbook is jointly maintained with the bank's IT-security team. Quarterly tabletop exercises against Mumbai BFSI scenarios — UPI mule wave, treasury-workstation compromise, broker-terminal credential theft, ATM-switch vendor compromise, contact-centre bulk-exfiltration, partner-fintech API abuse surge — are run for the bank's executive and operations teams. The annual red-vs-blue exercise pits our SOC analysts against Macksofy's red-team practice (run as a separate-team Chinese-wall engagement under purple-team rules) and the joint after-action review feeds the next year's detection-engineering backlog.",
      "Onsite analyst hours at the bank's BKC, Lower Parel, Andheri MIDC, Powai or Belapur SOC are part of the engagement footprint, not a separate line item. Most clients use them for handover during the in-house team's leave windows, for the sensitive-incident-handling that has to be physically inside the bank's SOC (typically when DFIR-grade evidence preservation is needed and the data cannot leave the bank's network), and for the quarterly RBI Cyber Resilience supervisory visits where the regulator's inspection team wants the SOC analyst present and reachable. The BKC-anchored bench means the onsite presence is hours, not days, to mobilise.",
      "Commercial terms align with the Mumbai BFSI procurement norm. Multi-year retainer, banded SIEM-ingestion footprint, transparent named-resource pricing for the analyst bench, the standard breach-notification clauses RBI / SEBI / IRDAI mandate, and the explicit detection-engineering IP-transfer clause so every rule, parser and playbook stays in the bank's tenant at the end of the engagement. No vendor-proprietary content-pack lock-in, no exit cost. The bank's CISO can lift-and-shift the SOC content into a different MSSP at any renewal — we design the engagement to be portable on purpose, and that is what keeps the retainer honest.",
    ],
    buyerConcerns: [
      "RBI Cyber Resilience operational SOC requirements + SOC composition disclosure",
      "SEBI CSCRF + IRDAI Information & Cyber Security monthly reporting cadence",
      "UPI mule-account graphs, AutoPay abuse and transaction-velocity anomalies",
      "SWIFT / treasury workstation behavioural detection + MT103 / MT202 outliers",
      "Broker-terminal credential abuse, OMS / RMS anomalies and market-data tampering",
      "ATM-switch / card-personalisation vendor activity + FASTCash-variant detection",
      "Contact-centre bulk-customer-data exfiltration on the BPO-extended estate",
      "Co-managed on the client's own Splunk / Sentinel / Chronicle SIEM — no lock-in",
      "Integrated IR retainer staffed by the same team running the SOC",
    ],
    differentiators: [
      "Indian-BFSI-native detection content — UPI mule graphs, MT103 / MT202 outliers, broker-terminal anomalies, FASTCash-variant detection — not generic CIS / MITRE content packs.",
      "BKC-anchored 24x7 analyst bench in the same building as our HQ — onsite mobilisation in hours, not days, to any Mumbai BFSI SOC.",
      "Co-managed on the client's own SIEM with detection-engineering ownership shared and IP contractually transferred — no vendor-portal lock-in.",
      "Integrated IR retainer staffed by the same engineers running the SOC — no warm-handover, no separate IR contract.",
      "Annual independent third-party VAPT of the SOC, SIEM and EDR estate included — the audit report goes directly to the bank's IS auditor.",
      "Annual red-vs-blue with the Macksofy red-team practice under Chinese-wall purple-team rules — the after-action review feeds detection-engineering directly.",
    ],
    seoDescription:
      "24x7 BKC-anchored Managed SOC in Mumbai for BFSI — banks, NBFCs, brokers, insurers. RBI Cyber Resilience, SEBI CSCRF and IRDAI aligned. Co-managed Splunk / Sentinel.",
    keywords: [
      "managed SOC Mumbai",
      "24x7 SOC Mumbai BFSI",
      "RBI Cyber Resilience SOC Mumbai",
      "SEBI CSCRF SOC Mumbai",
      "Splunk SOC Mumbai BKC",
      "Sentinel managed SOC Mumbai",
      "co-managed SOC Mumbai",
      "UPI fraud detection SOC",
      "SWIFT monitoring SOC Mumbai",
      "MSSP Mumbai BFSI BKC",
    ],
    stats: [
      { value: "24x7x365", label: "BKC-anchored analyst bench" },
      { value: "Hours", label: "Onsite mobilisation across MMR" },
      { value: "Indian-BFSI", label: "Native detection content" },
      { value: "Annual VAPT", label: "Of the SOC + SIEM + EDR (included)" },
    ],
    methodology: [
      {
        phase: "01 · Stack Onboarding + Use-case Inventory",
        activities: [
          "SIEM (Splunk / Sentinel / Chronicle / QRadar) ingestion + parser baseline",
          "EDR (CrowdStrike / SentinelOne / Defender) integration as-is",
          "Indian-BFSI use-case inventory — UPI, treasury, broker, card, BPO, partner-fintech",
          "L1 / L2 / L3 handoff runbook + RBI-style SOC composition disclosure draft",
        ],
      },
      {
        phase: "02 · BFSI Detection Engineering",
        activities: [
          "UPI mule-graph + AutoPay mandate-abuse + transaction-velocity rules",
          "SWIFT MT103 / MT202 + BIC-pair anomaly rules for treasury-attached endpoints",
          "Broker-terminal logon + OMS / RMS order-pattern + algo-API authz rules",
          "ATM-switch / card-personalisation vendor + FASTCash-variant detection",
        ],
      },
      {
        phase: "03 · 24x7 Operations",
        activities: [
          "BKC-anchored bench with secondary-site redundancy + onsite analyst hours included",
          "L1 / L2 triage on client's SIEM tenant — rules and parsers owned by the bank",
          "Weekly threat-hunt against bank's data + Mandiant / Recorded Future / FS-ISAC feeds",
          "Daily detection-engineering backlog stand-up with bank's AppSec / IT-Sec lead",
        ],
      },
      {
        phase: "04 · Integrated IR",
        activities: [
          "Same engineers escalate L3 → incident containment with DFIR-grade evidence preservation",
          "Quarterly Mumbai BFSI tabletop scenarios (UPI mule wave, treasury, broker, ATM, BPO)",
          "Annual red-vs-blue with Macksofy red-team under Chinese-wall purple-team rules",
          "Regulator-reportable incident handling with CERT-In 6-hour SLA pre-defined",
        ],
      },
      {
        phase: "05 · Regulator Reporting + Annual Audit",
        activities: [
          "Monthly RBI Cyber Resilience + SEBI CSCRF + IRDAI board-grade pack",
          "Quarterly CISO + audit-committee review pack with named-threat coverage",
          "Annual third-party VAPT of the SOC + SIEM + EDR included in retainer",
          "RBI CSITE Cell supervisory-visit support — analyst present onsite during inspection",
        ],
      },
    ],
    industries: [
      {
        name: "Private + PSU banks",
        blurb:
          "BKC / Worli / Belapur HQ banks — UPI, net-banking, treasury and SWIFT-attached endpoint monitoring focus.",
      },
      {
        name: "NBFCs + Housing Finance",
        blurb:
          "Multi-tenant SaaS-style lending platforms + branch-tablet auth + NPCI sub-member sponsorship paths.",
      },
      {
        name: "Stock brokers + DPs",
        blurb:
          "BSE / NSE / NSDL / CDSL connected broker terminals — OMS / RMS / algo-API anomaly detection under CSCRF.",
      },
      {
        name: "Asset Management Companies",
        blurb:
          "BKC + Worli AMCs — SEBI CSCRF reporting + investor-portal abuse + partner-distributor API monitoring.",
      },
      {
        name: "Insurers (life, general, health)",
        blurb:
          "Powai + Andheri MIDC insurer HQs — IRDAI Information & Cyber Security cadence + claims / TPA fraud detection.",
      },
      {
        name: "Listed fintechs + payment aggregators",
        blurb:
          "Lower Parel + BKC fintech HQs — RBI PA-PG guidelines + PCI-DSS overlay + partner-fintech API abuse focus.",
      },
    ],
    deliverables: [
      "24x7x365 BKC-anchored SOC operations on client's own SIEM stack",
      "Indian-BFSI-native detection content pack deployed to client tenant (transferred IP)",
      "Monthly RBI Cyber Resilience + SEBI CSCRF + IRDAI board-grade reporting pack",
      "Integrated IR retainer with DFIR-grade evidence preservation",
      "Quarterly Mumbai BFSI tabletop exercises + annual red-vs-blue with Macksofy red team",
      "Annual third-party VAPT of the SOC, SIEM and EDR estate (included)",
      "Onsite analyst hours at BKC / Lower Parel / Andheri MIDC / Powai / Belapur SOC",
      "RBI CSITE Cell supervisory-visit support with analyst present onsite during inspection",
    ],
    caseStudy: {
      industry: "Mumbai-headquartered private bank (BKC) — Splunk + CrowdStrike co-managed",
      scope:
        "24x7 co-managed SOC on existing Splunk Enterprise + CrowdStrike Falcon, BFSI detection content deployment, integrated IR retainer + quarterly RBI Cyber Resilience reporting cycle",
      outcome:
        "MTTD reduced from 102 min to 11 min over 9 months · UPI mule-graph detection identified INR 4.7 Cr of attempted fraud in Q4 · MT103 outlier detection caught APT38-style probe on treasury-attached endpoint inside 22 minutes · RBI CSITE Cell follow-up cleared SOC-side evidence with zero observations · annual SOC + SIEM VAPT closed with one medium-severity finding.",
    },
    faqs: [
      {
        q: "Is your SOC physically in Mumbai or is it remote-only?",
        a: "Both — the primary analyst bench is BKC-anchored in the same building as our HQ, with a secondary-site redundancy footprint. Onsite mobilisation to any Mumbai BFSI SOC is in hours, not days. Onsite analyst hours at the client's SOC are part of the engagement, not extra.",
      },
      {
        q: "Will the detection content stay with us at contract end?",
        a: "Yes — contractually transferred IP. Every rule, parser, playbook and runbook is deployed into your own SIEM tenant from day one and is yours to keep. The bank's CISO can lift-and-shift the SOC content to a different MSSP at any renewal. That portability is what keeps the retainer honest.",
      },
      {
        q: "Do you have detection content specifically for UPI, SWIFT and broker-terminal abuse?",
        a: "Yes — that is the entire point of the offering. UPI mule-graph detection, AutoPay mandate-abuse, transaction-velocity outliers, SWIFT MT103 / MT202 BIC-pair anomalies, broker-terminal logon + OMS / RMS order-pattern detection, ATM-switch / card-personalisation vendor activity rules, FASTCash-variant detection. All deployed into your SIEM tenant and yours to keep.",
      },
      {
        q: "How do you handle the RBI Cyber Resilience supervisory visit?",
        a: "We treat the supervisory visit as a planned event in the engagement, not a fire drill. The analyst is present onsite during the inspection, the monthly RBI-format reports are pre-organised in the format the CSITE Cell reads, the SOC composition disclosure is current, and the named-threat coverage matrix is reconciled against the supervisory team's expectations. We have closed Mumbai bank inspections with zero observations on SOC-side evidence.",
      },
      {
        q: "What is your IR response model?",
        a: "Same engineers — the L2 / L3 detection team escalates to incident containment directly with DFIR-grade evidence preservation. No warm-handover delay, no separate IR retainer, no different bench. The IR runbook is jointly maintained with the bank's IT-security team and exercised quarterly.",
      },
      {
        q: "Do you handle SEBI CSCRF + IRDAI alongside RBI in one engagement?",
        a: "Yes — most Mumbai BFSI clients straddle two or three regulators (the bank with its broker / AMC subsidiary, the insurer with its TPA arm). The monthly reporting pack covers RBI Cyber Resilience, SEBI CSCRF and IRDAI Information & Cyber Security from the same evidence base — no double-handling.",
      },
      {
        q: "Is the SOC itself audited?",
        a: "Yes — annual independent third-party VAPT of the SOC, the SIEM and the EDR estate is included in the multi-year retainer. The audit report goes directly to the bank's IS auditor and the audit committee.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 6 · Bengaluru × Web Application Security
  // ─────────────────────────────────────────────────────────────────────
  {
    citySlug: "bengaluru",
    serviceSlug: "web-application-security",
    headline:
      "Web App Security Testing in Bengaluru · SaaS",
    lead:
      "Manual-first web app security testing for Bengaluru SaaS, product and GCC teams in ORR, Embassy Tech Village, Koramangala and Whitefield — OWASP ASVS L2 / L3, API Security Top 10, GraphQL, SOC 2 + ISO 27001 mapped.",
    body: [
      "Bengaluru web-application security buyers are mostly product CTOs, AppSec leads, platform engineers and security champions embedded in engineering — not compliance officers, and not procurement. They want testing that catches the bugs auto-scanners miss, written in a form their engineers can act on without translation, delivered against a release cadence that does not assume the product team stops shipping for the duration of the engagement. They also want vendor consultants who have written code, can read the team's stack from a quick repo walk, and do not need a Burp-friendly target deployment built from scratch to test against. That is the bar the Bengaluru SaaS belt has set since the 2020-21 wave of unicorn-scale AppSec hires raised the floor — and that is the only bar we play to.",
      "Our testing baseline is OWASP ASVS Level 2 with Level 3 controls layered for product teams in regulated verticals (BFSI fintechs, healthtech, US-enterprise-target SaaS). API Security Top 10 (2023 edition) is treated as first-class scope, not an after-thought — most Bengaluru products are API-led with thin web front-ends, and the actual attack surface lives in the OpenAPI / GraphQL schema, the gateway authz layer and the partner-integration tokens. GraphQL gets explicit field-level authorisation, depth-limit and batch-query abuse testing because the dominant Bengaluru GraphQL anti-pattern is endpoint-level authz with object-level authz quietly delegated to the ORM. We also test gRPC + Connect-RPC stacks where the product has moved beyond REST.",
      "Beyond the schema, we test business-logic abuse — the bugs scanners cannot find. Multi-step workflow tampering, race conditions in payment / refund / subscription flows, IDOR variants on tenant-scoped resources, BOLA chains across the partner-integration surface, OAuth / OIDC scope misuse and refresh-token replay, SSO assertion injection (Okta / Azure AD / Google Workspace / PingFederate as IdPs), and multi-tenant data isolation on shared-database SaaS designs. The last is the single most common bug class we close on Bengaluru SaaS — tenant separation enforced by a where-clause that some new code path forgot to apply, and the auto-scanner happily reports zero issues because every endpoint returns 200. We probe row-level-security on PostgreSQL, partition keys on DynamoDB / Cosmos, and the index-template predicate on Elasticsearch / OpenSearch deployments. Most of these are invisible to scanners and to inexperienced manual testers, and they are the bugs the enterprise customer's CISO will find on the next vendor questionnaire if we do not.",
      "Reports are written for developers and consumed by engineers. Every finding ships with Burp / Postman / curl repro (depending on the team's tool of choice), a mapped CWE and OWASP ASVS reference, a remediation snippet in the project's language (TypeScript / Node / Python / Go / Java / Ruby — we match the stack), and a Jira-importable CSV that fits the team's existing field schema. For teams that prefer the GitHub workflow we file findings as private repository Issues with the security label and the SLA-class set, ready for the AppSec lead to triage. We do not deliver 200-page PDFs that go unread. The same evidence is mapped to OWASP ASVS, SOC 2 CC controls and ISO 27001 Annex A so a single engagement closes both the compliance and the AppSec asks at once.",
      "Kickoff is onsite at the client's office — Outer Ring Road (Bellandur / Marathahalli / Sarjapur), Embassy Tech Village, Koramangala, Indiranagar, Whitefield, Electronic City. Senior consultants travel from Mumbai BKC for kickoff, threat-modelling whiteboard and exit-review; the actual testing runs against staging environments hosted on AWS Mumbai, AWS Singapore or GCP asia-south1. Typical scope of one product takes 2-3 weeks plus a 1-week re-test, with critical and high findings re-validated post-fix at no extra cost. For larger products with web + mobile + multiple APIs + admin console + partner-integration surface we run a 5-6 week engagement with a phased deliverable cadence so the AppSec team is not blocked on a single final report.",
      "Continuous-testing retainers are available for product teams shipping weekly or fortnightly. The retainer model: a quarterly full-coverage run, a monthly delta test against new product surface (new endpoints, new auth flows, new partner integrations, new tenant boundaries), and a same-day Slack-bridge channel for the AppSec lead to flag bugs found in production for joint root-cause review. The retainer is priced against the actual code-velocity of the product, not against an arbitrary headcount, and the detection-engineering hand-off back to the team's security champion is the explicit deliverable of every quarter.",
      "We run a short developer brief at the end of every engagement — 60 minutes with the engineering team to walk through the highest-impact findings, the classes of bug behind them, and the secure-by-default patterns to put into the codebase so the next sprint stops introducing the same issues. Pre-commit hooks, eslint-plugin-security configurations, Semgrep rules tuned to the team's bug history, a tenant-scoping middleware contract, an authz-decorator pattern for the GraphQL resolver layer — whatever is the highest-ROI guardrail for the next quarter's code velocity. Most clients see findings drop by half on the second annual VAPT after that briefing, which is the explicit success metric of the engagement.",
      "For Bengaluru SaaS teams preparing for SOC 2 Type II, ISO 27001:2022 surveillance or an enterprise customer's pre-sales security review (the Fortune-500 buyer's CISO questionnaire that arrives in the back half of the sales cycle), we shape the VAPT report so the same artefact answers all three at once — the SOC 2 auditor reviewing CC7.1 / CC7.2, the ISO 27001 surveillance assessor reviewing Annex A 8.* controls, and the enterprise customer's CISO running through the vendor-pack. The OWASP ASVS L2 / L3 attestation, the sanitised executive summary, the remediation timeline and the MITRE ATT&CK mapping all live in the same document. No separate evidence pack to assemble later. For bug-bounty programmes (HackerOne, Bugcrowd, Intigriti) running in parallel, we calibrate the engagement scope against the bounty's existing coverage so the spend does not double up on what the crowd already finds.",
    ],
    buyerConcerns: [
      "Business-logic abuse missed by scanners (workflow tampering, race conditions, refund-flow exploits)",
      "IDOR / BOLA variants and broken object-level authorisation on partner-API surface",
      "OAuth / OIDC scope misuse, refresh-token replay and SSO assertion injection",
      "GraphQL field-level authz, depth-limit and batch-query abuse",
      "Multi-tenant data isolation on shared-DB SaaS — row-level-security probing",
      "API Security Top 10 (2023) coverage on REST + gRPC + Connect-RPC stacks",
      "OWASP ASVS L2 / L3 evidence for SOC 2 + ISO 27001 + enterprise vendor reviews",
      "Findings developers will actually action (Jira CSV / GitHub Issues, not 200-page PDFs)",
      "Continuous-testing retainer aligned to fortnightly release trains",
    ],
    differentiators: [
      "OWASP ASVS L2 / L3 testing with explicit business-logic abuse coverage — not scanner output with a manual sanity pass.",
      "API Security Top 10 + GraphQL + gRPC scope as first-class — most Bengaluru product attack surface lives there, not the web front-end.",
      "Findings delivered as Jira CSV or private GitHub Issues with language-specific remediation snippets in TypeScript / Node / Python / Go / Java / Ruby — pull-request-ready.",
      "60-minute developer brief at engagement close with secure-by-default patterns (Semgrep rules, authz decorators, tenant-scoping middleware) tuned to the team's bug history.",
      "Continuous-testing retainer priced against actual code velocity, with monthly delta tests against new product surface — not an arbitrary headcount.",
      "Single artefact answers SOC 2 Type II auditor + ISO 27001 surveillance assessor + enterprise CISO vendor pack — no separate evidence assembly later.",
    ],
    seoDescription:
      "Manual-first web app security testing in Bengaluru for SaaS, product and GCC teams — OWASP ASVS L2 / L3, API Security Top 10, GraphQL, SOC 2 + ISO 27001 mapped.",
    keywords: [
      "web application security testing Bengaluru",
      "web app pentest Bangalore",
      "OWASP ASVS testing Bengaluru",
      "API Security Top 10 pentest Bangalore",
      "GraphQL security testing Bengaluru",
      "SaaS web security audit Bangalore",
      "business logic pentest Bengaluru",
      "SOC 2 web app testing Bangalore",
      "multi-tenant SaaS pentest",
      "Bengaluru AppSec consultant",
    ],
    stats: [
      { value: "OWASP ASVS L2/L3", label: "Primary testing baseline" },
      { value: "2-3 weeks", label: "Typical engagement + 1 week re-test" },
      { value: "Half", label: "Findings drop on 2nd annual VAPT post-brief" },
      { value: "Jira + GitHub", label: "Native handoff formats" },
    ],
    methodology: [
      {
        phase: "01 · Threat Model + Scoping",
        activities: [
          "Onsite whiteboard at ORR / Embassy Tech Village / Koramangala / Whitefield",
          "Architecture review — auth, tenancy, partner integrations, payment / refund flows",
          "OpenAPI / GraphQL schema review + scope confirmation against API Security Top 10",
          "Test-data + tenant setup for multi-tenant isolation probing",
        ],
      },
      {
        phase: "02 · Manual-first Testing",
        activities: [
          "Business-logic abuse — workflow tampering, race conditions, refund / subscription flows",
          "IDOR / BOLA variants + OAuth scope misuse + refresh-token replay + SSO assertion injection",
          "GraphQL field-level authz + depth limits + batch-query abuse + introspection abuse",
          "Multi-tenant isolation — RLS probing, partition-key abuse, index-template predicate tests",
        ],
      },
      {
        phase: "03 · Developer-grade Reporting",
        activities: [
          "Burp / Postman / curl repro per finding mapped to CWE + OWASP ASVS + API Top 10",
          "Remediation snippet in project's language (TS / Node / Python / Go / Java / Ruby)",
          "Jira-importable CSV with team's existing field schema",
          "Optional private GitHub Issues with security label + SLA class",
        ],
      },
      {
        phase: "04 · Compliance Crosswalk",
        activities: [
          "Same evidence mapped to SOC 2 CC7.1 / CC7.2 + ISO 27001 Annex A 8.* controls",
          "Sanitised executive summary + MITRE ATT&CK mapping for enterprise vendor pack",
          "OWASP ASVS L2 / L3 attestation page for compliance auditor",
          "Bug-bounty calibration memo if HackerOne / Bugcrowd / Intigriti programme is live",
        ],
      },
      {
        phase: "05 · Brief + Re-test + Retainer",
        activities: [
          "60-minute developer brief with secure-by-default patterns + Semgrep / lint rules",
          "1-week re-test of all critical and high findings included in base SoW",
          "Optional continuous-testing retainer with monthly delta + quarterly full coverage",
          "Same-day Slack-bridge channel for AppSec lead during retainer period",
        ],
      },
    ],
    industries: [
      {
        name: "B2B SaaS",
        blurb:
          "Series-A through listed B2B SaaS in ORR + Koramangala — multi-tenant isolation + enterprise-CISO vendor-pack focus.",
      },
      {
        name: "Fintech + payments + lending",
        blurb:
          "RBI-regulated fintech HQs in Indiranagar + Koramangala — refund / chargeback / mandate flow abuse focus.",
      },
      {
        name: "Healthtech",
        blurb:
          "ABDM / Ayushman Bharat ecosystem players — DPDP Act + HIPAA-overlay scope for US-bound revenue.",
      },
      {
        name: "GCC product teams",
        blurb:
          "Fortune-500 GCC product teams in Embassy Tech Village + Whitefield — parent-mandated AppSec baseline.",
      },
      {
        name: "Edtech + creator economy",
        blurb:
          "Edtech / community / creator-tools SaaS in Koramangala + Indiranagar — partner-API + UGC moderation surface.",
      },
      {
        name: "Logistics + mobility tech",
        blurb:
          "Logistics / mobility / delivery platforms — partner-portal + driver-app + tenant-of-tenant authz surface.",
      },
    ],
    deliverables: [
      "OWASP ASVS L2 / L3 attestation page + finding-level ASVS mapping",
      "API Security Top 10 (2023) + GraphQL field-level authz finding pack",
      "Multi-tenant isolation report with RLS / partition-key / index-template probe results",
      "Burp / Postman / curl repro per finding with language-specific remediation snippet",
      "Jira-importable CSV + optional private GitHub Issues handoff",
      "SOC 2 CC7.1 / CC7.2 + ISO 27001 Annex A 8.* crosswalk in same artefact",
      "Sanitised executive summary + MITRE ATT&CK mapping for enterprise vendor pack",
      "60-minute developer brief slide deck + Semgrep / lint rule recommendations",
    ],
    caseStudy: {
      industry: "Bengaluru-headquartered Series-D B2B SaaS (Embassy Tech Village)",
      scope:
        "Full-coverage web + REST API + GraphQL + admin-console + partner-integration testing across 14 microservices, OWASP ASVS L2 with L3 layered for the regulated module + SOC 2 Type II evidence",
      outcome:
        "37 findings closed in 6 weeks · 4 critical multi-tenant isolation paths remediated before the next enterprise customer's vendor review · 11 GraphQL field-level authz fixes shipped as a single PR · SOC 2 Type II issued in same audit cycle · findings dropped 54% on the following year's engagement after the developer brief.",
    },
    faqs: [
      {
        q: "Do you test API Security Top 10 + GraphQL or just web?",
        a: "All three as first-class scope — most Bengaluru products are API-led with thin web front-ends, and the real attack surface lives in the OpenAPI / GraphQL schema. We test REST against API Security Top 10 (2023), GraphQL with field-level authz / depth-limit / batch-query / introspection abuse, and gRPC + Connect-RPC where the team has moved beyond REST. The web front-end gets a separate OWASP ASVS pass against the dynamic-rendering surface and the SPA / SSR specifics.",
      },
      {
        q: "How do you handle multi-tenant isolation on shared-DB SaaS?",
        a: "Active probing across the tenancy boundary. We provision multiple test tenants, probe row-level-security on PostgreSQL, partition keys on DynamoDB / Cosmos, index-template predicates on Elasticsearch / OpenSearch, the partition-by clause on the analytics warehouse (Snowflake / BigQuery / Redshift), and the where-clause coverage on every microservice's data-access layer. Tenant separation enforced by a where-clause that some new code path forgot to apply is the single most common bug class we close.",
      },
      {
        q: "Will the report be readable by my engineers, not just my compliance officer?",
        a: "Yes — that is the entire delivery model. Every finding has Burp / Postman / curl repro in the team's tool of choice, a CWE + ASVS reference, a remediation snippet in the project's language, and a Jira-importable CSV that matches the team's existing field schema. For teams on GitHub we file findings as private repo Issues with the security label set. The 60-minute developer brief at engagement close is built around the engineers, not the compliance officer.",
      },
      {
        q: "Can the same engagement close SOC 2 + ISO 27001 + enterprise vendor pack?",
        a: "Yes — single artefact, three audiences. SOC 2 Type II auditor reviewing CC7.1 / CC7.2, ISO 27001:2022 surveillance assessor reviewing Annex A 8.* controls, enterprise customer's CISO running through the vendor pack. OWASP ASVS L2 / L3 attestation page, sanitised executive summary, MITRE ATT&CK mapping, remediation timeline — all in the same document. No separate evidence assembly later.",
      },
      {
        q: "Do you run a continuous-testing retainer for our fortnightly release train?",
        a: "Yes — quarterly full-coverage run plus monthly delta test against new product surface (new endpoints, new auth flows, new partner integrations, new tenant boundaries), priced against actual code velocity rather than an arbitrary headcount. The same-day Slack-bridge channel is included so the AppSec lead can flag production bugs for joint root-cause review.",
      },
      {
        q: "Will you calibrate against our HackerOne / Bugcrowd / Intigriti programme?",
        a: "Yes — we ship a bug-bounty calibration memo at kickoff so the engagement scope does not duplicate what the crowd already finds. The bounty programme covers the wide attack surface; the engagement covers the deep business-logic and multi-tenant isolation paths the bounty rarely reaches. Both feed the same Semgrep rule pack at engagement close.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 7 · Dubai × VAPT
  // ─────────────────────────────────────────────────────────────────────
  {
    citySlug: "dubai",
    serviceSlug: "vapt",
    headline:
      "VAPT Services in Dubai · DIFC & Fintech",
    lead:
      "VAPT for Dubai banks, DIFC fintechs, JLT family offices and Business Bay payment institutions — mapped to UAE IAS (NESA), DFSA Technology Risk, DESC ISR, UAE Federal PDPL and CERT-In format.",
    body: [
      "Dubai's cyber regulatory map sits across multiple bodies, and every VAPT scope has to clear them in a single engagement. At the federal level there is the UAE Cybersecurity Council and the Telecommunications and Digital Government Regulatory Authority (TDRA) operating the UAE Information Assurance Standards (UAE IAS, the framework historically branded NESA) plus the Federal Personal Data Protection Law (PDPL 2021) under the UAE Data Office. Inside the Dubai International Financial Centre (DIFC) there is the Dubai Financial Services Authority (DFSA) Technology Risk module (GEN 5 / GEN 6) plus the DIFC Data Protection Law 2020 under the DIFC Commissioner of Data Protection. Inside Abu Dhabi Global Market (ADGM) — where many Dubai-related family offices and asset managers also licence — there is the Financial Services Regulatory Authority (FSRA) cyber expectations. For any Dubai-government or semi-government entity there is the Dubai Electronic Security Centre (DESC) Information Security Regulation (ISR) v2, with the registered-auditor pre-qualification and the prescribed audit cycle. A long shadow falls from the parent groups in London (PRA / FCA), Singapore (MAS TRM) and Mumbai (RBI / SEBI) for the BFSI subsidiaries we test in DIFC. The deliverable has to clear all of these on first read.",
      "We test Dubai BFSI estates — DIFC-regulated banks, payment institutions, broker-dealers and family offices in JLT (Jumeirah Lakes Towers), Business Bay and DIFC Gate Village — with scopes mapped to UAE IAS (NESA) Tier-1 / Tier-3 control profiles, DFSA Technology Risk GEN 5 / GEN 6, DESC ISR v2 (where the entity is Dubai-government-adjacent), DIFC Data Protection Law and UAE Federal PDPL where customer-data flows touch the federal layer. Reports include the CERT-In empanelment for groups with India-side parent regulatory reporting (SBI / HDFC / ICICI / Kotak / Axis Dubai branches, Indian fintech-group DIFC entities), alongside the UAE-side evidence. The control crosswalk is per-finding, not at the cover page — a finding on an unprotected admin endpoint cites GEN 6.1, UAE IAS T3.6, DESC ISR v2 §7.* and CWE-306 all on the same row.",
      "Common Dubai scope patterns we have delivered against: DIFC-regulated entity core banking + customer portal with the FAB / Emirates NBD / Mashreq / RAKBANK regional-bank integrations; payment-institution APIs (settlement, payout, FX, remittance corridors into India / Pakistan / Egypt / Philippines) under the Central Bank of UAE Retail Payment Services and Card Schemes Regulation; broker-dealer trading systems connecting to Nasdaq Dubai / DFM / ADX / international venues; family-office portal and document-vault platforms (typically Asset Vantage / Eton Solutions / FundCount style); the corporate IT estate at DIFC Gate Village, JLT cluster and Business Bay towers; and the embedded-finance / partner-API flows where DIFC Innovation Hub fintechs sit between a licensed bank and a customer-facing SaaS. For the family-office segment we additionally test the bilingual Arabic / English document-vault search authz and the cross-jurisdiction beneficial-owner data path.",
      "Senior consultants travel from Mumbai BKC — Emirates / IndiGo / Air India Express direct flights from BOM make next-day onsite kickoff routine in DIFC, JLT, Business Bay or Bur Dubai. For longer engagements we keep a UAE-resident lead consultant onsite throughout the testing window, holding a UAE work permit / freelance visa and an Emirates ID — the same person on kickoff, mid-engagement and final sign-off. Onsite testing days at the client's DIFC Gate Village, JLT cluster or Business Bay tower office are arranged with the building's tenant-services team in advance because most Dubai BFSI towers require pre-cleared visitor passes and contractor escort even for inside-tenant work. We have the working knowledge of the building-conventions across DIFC Gate Village 1-11, ICD Brookfield, Index Tower, Almas Tower, HDS Tower, JBC clusters in JLT and the Business Bay Bay Square / Bay Avenue / U-Bora towers.",
      "Engagement contracts and data-handling agreements are drafted under UAE law where the client operates as a DIFC / ADGM entity (with the DIFC Courts / ADGM Courts jurisdiction clause), with mirror clauses for India-side parent groups where applicable. Test data, evidence, working artefacts and report drafts stay inside UAE jurisdiction for the duration of the engagement — encrypted on consultant endpoints under UAE PDPL Article 22 cross-border transfer constraints, with the sign-off retention aligned to DFSA / FSRA / DESC record-keeping requirements (typically seven years for DFSA, five for DESC ISR). The data-processor / data-controller designation under DIFC DP-Law and UAE PDPL is explicit in the engagement letter, and the breach-notification chain (72 hours to DIFC Commissioner / UAE Data Office) is pre-wired.",
      "Adversary modelling for Dubai BFSI is regionally grounded. We test against the actual TTPs hitting Gulf-region financial-sector entities in the 2023-26 cycle — FIN8-style financial-actor footholds on payment-institution treasury endpoints, MuddyWater / APT34 phishing pretexts tuned for UAE business norms, LAPSUS$-style IdP-compromise scenarios on Azure AD / Okta / PingFederate tenants (the pattern that hit two Dubai banks in 2024-25), ALPHV / RansomHub affiliate footholds on third-party IT-services vendors with DIFC access, and the family-office-specific business-email-compromise and beneficial-owner-information-exfiltration patterns the regional CISO group has flagged repeatedly at the FS-ISAC MEA chapter. Each finding is mapped to the TTP, the threat actor most likely to weaponise it and the detection rule the bank's SOC should add — handed off as part of the engagement.",
      "Reporting is in the format each regulator reads. DFSA Technology Risk evidence is in the table layout the supervisor's risk-based-supervision template asks for; DESC ISR v2 evidence is in the audit-pack format the registered-auditor list expects (Macksofy is on the DESC registered-auditor route via our regional partner with name-listed senior consultants); UAE IAS evidence is in the UAE IAS Tier-3 control-profile pack; UAE Federal PDPL evidence is in the data-fiduciary register format the UAE Data Office reads; CERT-In evidence is in the empanelled-auditor letter for India-side parent reporting. One engagement, one evidence base, five regulator-readable artefacts. Re-testing of all critical and high findings is included in the base SoW with a 30-day window aligned to the strictest regulator's remediation SLA.",
      "Commercial nuance is local. Engagement billing is in AED with a 5% UAE VAT line, invoiced from our regional billing entity to keep the client's books clean against the FTA Tax Procedures Law. Payment terms align with the DIFC / ADGM tenant-services norm (net-30 from invoice, with the standard UAE late-payment escalation through the DIFC Courts small-claims pathway only as a last resort — which has not been needed). We coordinate with the client's UAE-resident company secretary or legal counsel on the engagement-letter execution to keep the DIFC Authority filing record consistent.",
    ],
    buyerConcerns: [
      "UAE IAS (NESA) Tier-1 / Tier-3 evidence quality for federal-level reporting",
      "DFSA Technology Risk module GEN 5 / GEN 6 compliance for DIFC entities",
      "DESC ISR v2 alignment for Dubai-government and semi-government clients",
      "DIFC Data Protection Law 2020 + UAE Federal PDPL 2021 data-flow evidence",
      "Payment-institution API abuse — settlement, payout, FX, remittance corridors",
      "DIFC Innovation Hub partner-API and embedded-finance flow security",
      "Family-office document-vault authz + bilingual Arabic / English search",
      "Parallel CERT-In empanelment for India-side parent reporting (SBI / HDFC / ICICI Dubai)",
      "Five regulator-readable artefacts from one engagement evidence base",
    ],
    differentiators: [
      "Single VAPT generates parallel evidence for UAE IAS (NESA), DFSA, FSRA, DESC ISR, DIFC DP-Law, UAE PDPL and CERT-In — not separate engagements per regulator.",
      "DIFC / JLT-resident lead consultant for longer engagements with UAE work permit + Emirates ID, plus direct Mumbai BKC fly-in for kickoff and exit review.",
      "Working knowledge of building-tenant conventions across DIFC Gate Village 1-11, ICD Brookfield, Index Tower, Almas Tower, HDS Tower, JBC and Bay Square / U-Bora.",
      "Embedded-finance + partner-API scoping built around DIFC Innovation Hub fintech architectures, not generic web-app pentest scope.",
      "Engagement letter under UAE law / DIFC Courts jurisdiction with UAE PDPL Article 22 cross-border data-handling discipline — evidence stays in UAE.",
      "Regional adversary modelling against MuddyWater / APT34 / FIN8 / LAPSUS$ / ALPHV TTPs that have hit Gulf-region financial-sector entities in 2023-26.",
    ],
    seoDescription:
      "VAPT in Dubai for DIFC banks, fintechs, broker-dealers and family offices — NESA / UAE IAS, DFSA, DESC ISR, UAE PDPL, DIFC DP-Law and CERT-In. UAE-resident leads.",
    keywords: [
      "VAPT services Dubai",
      "VAPT DIFC fintech",
      "Dubai bank penetration testing",
      "NESA UAE IAS VAPT",
      "DFSA technology risk audit",
      "DESC ISR VAPT Dubai",
      "JLT cybersecurity",
      "Business Bay VAPT",
      "family office VAPT Dubai",
      "DIFC Innovation Hub pentest",
    ],
    stats: [
      { value: "3 hr", label: "Mumbai BKC → DXB direct flight" },
      { value: "5 regulators", label: "Parallel artefacts from one engagement" },
      { value: "UAE-resident", label: "Lead consultant for long engagements" },
      { value: "AED + VAT", label: "Local billing entity" },
    ],
    methodology: [
      {
        phase: "01 · Regulator Mapping + Engagement Letter",
        activities: [
          "UAE IAS / DFSA / FSRA / DESC ISR / DIFC DP-Law / UAE PDPL applicability scoping",
          "CERT-In empanelment overlay for India-side parent reporting (where relevant)",
          "Engagement letter under UAE law + DIFC Courts jurisdiction + UAE PDPL Article 22 data-handling",
          "Onsite badge process across DIFC Gate Village / JLT / Business Bay tenant-services teams",
        ],
      },
      {
        phase: "02 · Threat Model + Scope",
        activities: [
          "Regional adversary modelling — MuddyWater / APT34 / FIN8 / LAPSUS$ / ALPHV TTPs",
          "Application architecture review — DIFC core-banking, payment APIs, family-office vault",
          "DIFC Innovation Hub partner-API + embedded-finance flow mapping",
          "Bilingual Arabic / English UI test-plan for family-office and Dubai-government scope",
        ],
      },
      {
        phase: "03 · Test Execution",
        activities: [
          "Net-banking / customer-portal / mobile-app testing on DIFC bank estate",
          "Payment-institution API testing — settlement, payout, FX, remittance corridor",
          "Broker-dealer OMS / RMS + venue-connectivity testing (Nasdaq Dubai / DFM / ADX)",
          "Family-office document-vault authz + beneficial-owner data-path testing",
        ],
      },
      {
        phase: "04 · Five-Regulator Reporting",
        activities: [
          "DFSA Technology Risk evidence in supervisor's risk-based-supervision template",
          "DESC ISR v2 audit pack in registered-auditor route format",
          "UAE IAS Tier-3 control-profile pack + UAE PDPL data-fiduciary register entries",
          "DIFC DP-Law DPIA + CERT-In empanelled letter for India-side parent reporting",
        ],
      },
      {
        phase: "05 · Re-test + Records Retention",
        activities: [
          "30-day re-test of critical / high findings aligned to strictest regulator SLA",
          "Records-retention sign-off (DFSA 7-year + DESC ISR 5-year + DIFC DP-Law)",
          "Detection-engineering hand-off to client SOC + SIEM tuning backlog",
          "Closure ledger filed with each regulator's preferred submission channel",
        ],
      },
    ],
    industries: [
      {
        name: "DIFC-licensed banks",
        blurb:
          "DIFC Gate Village + ICD Brookfield bank branches — DFSA Technology Risk + UAE PDPL cross-border focus.",
      },
      {
        name: "Payment institutions",
        blurb:
          "Business Bay + JLT licensed PIs — Central Bank Retail Payment Services + remittance-corridor abuse focus.",
      },
      {
        name: "DIFC Innovation Hub fintechs",
        blurb:
          "Embedded-finance + partner-API fintechs in DIFC Gate Village — bank-fintech federation testing scope.",
      },
      {
        name: "Family offices + asset managers",
        blurb:
          "JLT + DIFC family offices — bilingual document-vault authz + beneficial-owner data-path focus.",
      },
      {
        name: "Broker-dealers + market makers",
        blurb:
          "Nasdaq Dubai / DFM / ADX connected broker-dealers — OMS / RMS + venue-connectivity scope.",
      },
      {
        name: "MNC Dubai regional HQs",
        blurb:
          "Internet City / Media City / JLT regional HQs running MEA business — parent-group reporting overlay.",
      },
    ],
    deliverables: [
      "DFSA Technology Risk evidence pack in supervisor's risk-based-supervision template format",
      "DESC ISR v2 audit pack in registered-auditor route format (for Dubai-government-adjacent clients)",
      "UAE IAS (NESA) Tier-3 control-profile pack + closure recommendation",
      "DIFC Data Protection Law DPIA + UAE Federal PDPL data-fiduciary register entries",
      "CERT-In empanelled auditor letter for India-side parent reporting",
      "Per-finding crosswalk across all five regulators on one row (GEN 6 / UAE IAS / DESC ISR / CWE / CERT-In)",
      "30-day re-test closure ledger aligned to strictest regulator remediation SLA",
      "Detection-engineering recommendations + SIEM tuning backlog handed to client SOC",
    ],
    caseStudy: {
      industry: "DIFC-licensed payment institution (Gate Village) — settlement + FX + remittance corridor APIs",
      scope:
        "VAPT across customer portal, settlement API, FX engine, remittance-corridor partner APIs (India / Pakistan / Egypt / Philippines) + DFSA Technology Risk GEN 6 evidence + UAE PDPL data-fiduciary register + CERT-In letter for India-side parent",
      outcome:
        "29 findings closed in 5 weeks · 4 critical remittance-corridor authz paths remediated before next DFSA risk-based-supervision review · DFSA evidence pack accepted first read · DIFC DP-Law DPIA covering 11 processing activities + 3 cross-border transfer mechanisms · CERT-In letter filed with India parent without rework.",
    },
    faqs: [
      {
        q: "Do you understand DFSA Technology Risk GEN 5 / GEN 6 specifically?",
        a: "Yes — that is the table format the DFSA risk-based-supervision template asks for, and the evidence pack we ship is in that format. We have closed DFSA reviews for DIFC payment institutions and DIFC fintech entities with the supervisor accepting the evidence on first read. The crosswalk per finding cites the exact GEN 6 sub-clause alongside the technical detail.",
      },
      {
        q: "Can you handle DESC ISR v2 alongside DFSA in one engagement?",
        a: "Yes — where the entity is Dubai-government-adjacent and falls under both. The DESC ISR v2 audit pack is in the registered-auditor route format and we deliver it via the regional partner who carries the DESC registered-auditor listing, with our senior consultants name-listed on the engagement. Evidence is collected once, presented in each regulator's preferred format.",
      },
      {
        q: "Do you have UAE-resident consultants?",
        a: "Yes — for longer engagements we keep a UAE-resident lead consultant onsite throughout the testing window, holding a UAE work permit / freelance visa and an Emirates ID. The same person is on kickoff, mid-engagement and final sign-off. For shorter engagements senior consultants fly Mumbai BKC → DXB direct (3 hours) for kickoff and exit review with onsite testing days bracketed in between.",
      },
      {
        q: "How does the engagement letter handle UAE PDPL Article 22 cross-border data?",
        a: "The engagement letter is drafted under UAE law with DIFC Courts jurisdiction (or ADGM Courts where the client is ADGM-licensed), with explicit data-processor / data-controller designation under DIFC DP-Law and UAE PDPL. Test data, evidence, working artefacts and report drafts stay inside UAE jurisdiction for the engagement — encrypted on consultant endpoints — with the records-retention aligned to DFSA 7-year + DESC ISR 5-year + DIFC DP-Law requirements.",
      },
      {
        q: "Will you produce the CERT-In letter for our India-side parent?",
        a: "Yes — where the client is the Dubai branch / subsidiary of an Indian parent (SBI Dubai, HDFC Dubai, ICICI Dubai, Indian fintech-group DIFC entity), we ship the CERT-In empanelled auditor letter alongside the UAE-side artefacts so the India parent's RBI / SEBI reporting cycle picks up the engagement without rework. One evidence base, two-jurisdiction reporting.",
      },
      {
        q: "Do you handle family-office-specific scope?",
        a: "Yes — family-office portal authz, document-vault (Asset Vantage / Eton Solutions / FundCount style) testing, bilingual Arabic / English search and the beneficial-owner data-path testing across DIFC + JLT family-office estates. The business-email-compromise + beneficial-owner exfiltration patterns specific to the segment are part of the standard threat-model.",
      },
      {
        q: "Is the engagement billed in AED with UAE VAT?",
        a: "Yes — billed in AED with the 5% UAE VAT line, invoiced from our regional billing entity to keep the client's books consistent against the FTA Tax Procedures Law. Payment terms align with the DIFC / ADGM tenant-services norm (net-30 from invoice).",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 8 · Dubai × Red Teaming
  // ─────────────────────────────────────────────────────────────────────
  {
    citySlug: "dubai",
    serviceSlug: "red-teaming",
    headline:
      "Red Team Operations in Dubai · BFSI & Gov",
    lead:
      "Intelligence-led red team operations in Dubai — DIFC BFSI, Smart Dubai semi-government, DXB / DWC airline-airport estates — mapped to UAE IAS, DESC ISR, TIBER-style frameworks and DFSA supervisor expectations.",
    body: [
      "Dubai red-team buyers split across four distinct demand segments and each demands a different scenario library. DIFC-regulated BFSI (banks, payment institutions, broker-dealers, asset managers) wants intelligence-led adversary simulation against money-movement, settlement, FX and DIFC-regulated customer-data systems, mapped to UAE IAS (NESA), DFSA Technology Risk and the TIBER-style frameworks the parent group runs in London / Frankfurt / Singapore. Smart Dubai semi-government and Dubai-government entities want scenarios against citizen-services, DigitalDubai / UAE PASS integrations and the OT / smart-infrastructure boundary, mapped to DESC ISR v2 with pre-agreed rules-of-engagement filed with the Dubai Electronic Security Centre directly. The airline and airport estates (Emirates Group at Dubai International Airport DXB, dnata, Dubai Airports operating DXB and DWC) want scenarios against passenger systems, cargo / freight, ground operations and the airport-OT boundary, with the operational-safety constraints of an Annex 17 ICAO regulated environment. Regional HQs of multinationals running MEA business from JLT / Internet City / Business Bay want red-team exercises against MEA-mandate fraud and supply-chain compromise patterns, with the parent group's TIBER / CBEST / iCAST framework alignment carried through.",
      "For DIFC BFSI we run intelligence-led adversary simulations: open-source recon of DIFC Gate Village exec teams, their vendor ecosystem, public-disclosure leakage (DIFC Authority filings, DFSA approved-persons register, LinkedIn drift); spear-phishing pretexts tuned for regional norms (Eid timing, Ramadan working hours, the regional-board-meeting cadence, the DSF / GITEX / Future Investment Initiative event-window pretext); initial-access via the embedded-finance / partner-API surface or a third-party IT-services vendor compromise; lateral via Azure AD / Okta / PingFederate IdP-token theft and ADCS misuse (the LAPSUS$ pattern that hit two Dubai banks in 2024-25); exploitation chains targeting payment / settlement / FX, DIFC-regulated client-data, MT103 / MT202 SWIFT BIC traffic on the treasury-attached endpoints, and the family-office beneficial-owner-information stores. Scenarios are explicitly mapped to NESA UAE-IAS, DFSA Technology Risk and the parent group's TIBER / CBEST / iCAST control catalogue so the same engagement produces the regulator artefact, the parent-group artefact and the actionable detection-engineering backlog.",
      "For Smart Dubai and semi-government clients we model adversary access to citizen-services platforms (Dubai Now app and the upstream DigitalDubai service mesh), the UAE PASS digital-identity integration and the OT / smart-infrastructure boundary touching traffic (RTA), utilities (DEWA), smart-building (Emaar / Damac / Majid Al Futtaim portfolios), and the Dubai Police / Smart-Police digital-services adjacency. Rules-of-engagement are pre-agreed with DESC directly, with the white-cell composition disclosed and the audit-trail-of-every-adversary-action retention period set at five years in tamper-evident storage. This is not optional in Dubai — it is the difference between an authorised exercise and a regulatory incident, and DESC's enforcement disposition has hardened materially since the 2023 review of the ISR v2 framework.",
      "For airline and airport estates we run scenarios that respect the operational-safety constraints of an Annex 17 regulated environment. The Emirates Group estate includes passenger-services (booking, check-in, lounge access, the boarding-pass / e-ticket trust chain), cargo (Emirates SkyCargo, Cargo IS), crew systems, and the ground-handling adjacency with dnata. The Dubai Airports estate includes passenger-flow (PSCRM systems, e-gate biometrics, the EmaratechGo integration), baggage handling, ramp operations, and the airport-OT boundary including ground-radar, ramp-power-distribution and HVAC. Red-team scope inside these environments is strictly out-of-band on customer-impacting flows and pre-cleared with the airline / airport safety-and-security committee — adversary-action retention is in tamper-evident storage with the same disposition DESC expects, and CERT-In incident-reporting overlap is pre-wired where the airline group has Indian operations.",
      "Engagements run 6-10 weeks for a DIFC BFSI scenario, 8-12 weeks for a Smart Dubai semi-government scenario including the OT / smart-infrastructure boundary, and 10-14 weeks for an airline / airport scenario with the safety-and-security committee oversight. Onsite kickoff is in DIFC, Business Bay, Internet City or the airline / airport operations HQ depending on the client. We keep a UAE-resident lead consultant onsite throughout the operation, with senior support flying in from Mumbai BKC for the major reviews — the operational-planning review, the mid-operation pulse with the white cell, and the after-action review with the client board.",
      "Physical pretexting is rehearsed against actual Dubai building conventions, not US / European templates. Visitor passes at DIFC Gate Village run through the Gate Village Reception with tenant pre-clearance and Emirates ID scan; contractor escort policy varies across DIFC Gate Village 1-11, ICD Brookfield and Index Tower with different default service-tier expectations; out-of-hours access workflows in Business Bay towers vary by building manager (Bay Square versus U-Bora versus Bay Avenue have visibly different practices); JLT cluster reception varies across JBC clusters and HDS Tower. The pretext rehearsal explicitly covers regional norms — the working-week is Monday-Friday (Sunday is a workday only in some Dubai-government entities), the prayer-time pattern affects building-foot-traffic windows, the Eid and National Day calendar affects courier-and-vendor traffic, and the Arabic-English language defaults across reception staff vary across DIFC versus Business Bay versus Internet City.",
      "Reports are dual-language where required (English primary, Arabic for Dubai-government and federal handover) and dual-format for the regulator + parent-group consumers. DESC ISR v2 attestation, NESA UAE-IAS Tier-3 evidence, DFSA Technology Risk supervisor-template detail and the parent group's TIBER / CBEST / iCAST artefact — same operation, same evidence, four-way artefact. The detection-engineering backlog handed to the client SOC at engagement close is the actionable output the SOC team uses to close the detection gaps the operation surfaced — typically 20-40 SIEM rule additions, 5-10 EDR detection-tuning items and a small number of architecture-level guardrails the bank's enterprise architecture team adopts in the next quarter's release.",
      "Commercial nuance is local. Engagements are letter-of-authorisation-led — the client board issues a formal letter authorising the operation with the explicit scope, white-cell composition, rules-of-engagement and indemnity scope; we counter-sign and the letter is filed with the client's legal counsel for the operation's duration plus the five-year retention period DESC expects. Billing is in AED with the 5% UAE VAT line, invoiced from our regional billing entity. For Dubai-government-adjacent operations the engagement letter additionally references the DESC pre-notification record so any DESC-side inquiry during the operation is met with the pre-agreed white-cell escalation chain.",
    ],
    buyerConcerns: [
      "DIFC BFSI money-movement, settlement, FX and SWIFT BIC-traffic attack paths",
      "Smart Dubai citizen-services + UAE PASS digital-identity integration risk",
      "Airline / airport (DXB / DWC) passenger-services + cargo + ramp-OT boundary",
      "OT / smart-infrastructure boundary scenarios (RTA, DEWA, Emaar / Damac / MAF buildings)",
      "UAE IAS (NESA) Tier-3 + DESC ISR v2 + DFSA supervisor-template evidence",
      "Parent-group TIBER / CBEST / iCAST framework alignment with one operation",
      "Phishing pretext realism tuned for UAE business norms + Arabic-English bilingual",
      "Regulator-friendly purple-team handover with SIEM tuning backlog to client SOC",
      "Letter-of-authorisation with five-year DESC-aligned retention and indemnity scope",
    ],
    differentiators: [
      "Scenario library specific to Dubai's four demand segments — DIFC BFSI, Smart Dubai semi-government, DXB / DWC airline-airport, MEA regional HQ — not US-bank templates.",
      "UAE-resident lead consultant on the engagement throughout, with senior support from Mumbai BKC for board reviews — not a fly-in-fly-out red team.",
      "Single operation produces parallel artefacts for UAE IAS, DESC ISR v2, DFSA supervisor template and the parent group's TIBER / CBEST / iCAST control catalogue.",
      "Physical pretext rehearsal calibrated against DIFC Gate Village / ICD Brookfield / Bay Square / U-Bora / JBC / HDS building conventions, prayer-time patterns and the Eid / National Day calendar.",
      "DESC pre-notification + white-cell composition discipline for Dubai-government-adjacent operations — the difference between an authorised exercise and a regulatory incident.",
      "Annex 17 ICAO operational-safety constraint awareness for airline / airport scope — out-of-band on customer-impacting flows + safety-and-security committee oversight.",
    ],
    seoDescription:
      "Intelligence-led red team operations in Dubai for DIFC BFSI, Smart Dubai, DXB / DWC airline-airport and MEA regional HQs — UAE IAS, DESC ISR v2, DFSA + TIBER-style.",
    keywords: [
      "red team Dubai",
      "red teaming DIFC bank",
      "Smart Dubai red team",
      "DESC ISR v2 red team",
      "NESA UAE IAS red team",
      "adversary simulation Dubai",
      "DIFC fintech red team",
      "Dubai airport red team",
      "Emirates Group red team",
      "purple team Dubai SOC",
    ],
    stats: [
      { value: "4 segments", label: "DIFC · Smart Dubai · DXB-DWC · MEA HQ" },
      { value: "6-14 wk", label: "Operation duration by scope" },
      { value: "5 years", label: "DESC-aligned retention in tamper-evident storage" },
      { value: "20-40", label: "SIEM rule additions handed to client SOC" },
    ],
    methodology: [
      {
        phase: "01 · Letter of Authorisation + DESC Notification",
        activities: [
          "Board-issued letter of authorisation + white-cell composition disclosure",
          "DESC pre-notification record for Dubai-government-adjacent operations",
          "Rules-of-engagement + indemnity scope + tamper-evident retention setup",
          "Parent-group TIBER / CBEST / iCAST control-catalogue alignment confirmation",
        ],
      },
      {
        phase: "02 · Intelligence + Threat Model",
        activities: [
          "Open-source recon — DIFC Authority filings, DFSA register, LinkedIn drift, vendor mapping",
          "Regional adversary modelling — MuddyWater / APT34 / FIN8 / LAPSUS$ / ALPHV TTPs",
          "Pretext development tuned for UAE business norms + Arabic-English bilingual",
          "Building-convention reconnaissance — DIFC Gate Village / ICD Brookfield / Bay Square / JBC / HDS",
        ],
      },
      {
        phase: "03 · Initial Access + Lateral",
        activities: [
          "Spear-phishing + vishing + physical pretext per agreed rules-of-engagement",
          "Embedded-finance / partner-API / third-party-vendor compromise paths",
          "Azure AD / Okta / PingFederate IdP-token theft + ADCS misuse",
          "Lateral to money-movement / DIFC-customer-data / SWIFT-attached endpoints",
        ],
      },
      {
        phase: "04 · Objective + Operational Discipline",
        activities: [
          "Crown-jewel objective achievement under pre-agreed rules-of-engagement",
          "Adversary-action audit-trail in tamper-evident storage (DESC 5-year disposition)",
          "Safety-and-security committee touchpoint for airline / airport scope",
          "Out-of-band discipline on customer-impacting flows (Annex 17 / DFSA-sensitive systems)",
        ],
      },
      {
        phase: "05 · Purple Handover + Four-way Reporting",
        activities: [
          "Purple-team replay with client SOC + SIEM tuning backlog (20-40 rules typical)",
          "UAE IAS Tier-3 + DESC ISR v2 + DFSA supervisor template + TIBER artefact",
          "Bilingual English / Arabic report where required (Dubai-government + federal handover)",
          "Board-level after-action review with detection-engineering recommendations",
        ],
      },
    ],
    industries: [
      {
        name: "DIFC-regulated BFSI",
        blurb:
          "Banks, payment institutions, broker-dealers and asset managers — money-movement / FX / SWIFT BIC scenarios.",
      },
      {
        name: "DIFC Innovation Hub fintechs",
        blurb:
          "Embedded-finance + partner-API fintechs — bank-fintech federation compromise scenarios.",
      },
      {
        name: "Smart Dubai + semi-government",
        blurb:
          "Citizen-services + UAE PASS + DigitalDubai service mesh + Dubai Police adjacency under DESC ISR v2.",
      },
      {
        name: "Emirates Group + dnata",
        blurb:
          "Passenger-services + cargo + ground-handling under Annex 17 ICAO operational-safety constraints.",
      },
      {
        name: "Dubai Airports (DXB + DWC)",
        blurb:
          "Passenger-flow + baggage + ramp-OT scenarios with the airport safety-and-security committee oversight.",
      },
      {
        name: "MEA regional HQs",
        blurb:
          "JLT / Internet City / Business Bay HQs running MEA business — TIBER / CBEST / iCAST framework alignment.",
      },
    ],
    deliverables: [
      "Board-issued letter of authorisation + DESC pre-notification record (where applicable)",
      "UAE IAS (NESA) Tier-3 red-team evidence pack",
      "DESC ISR v2 attestation pack in registered-auditor route format",
      "DFSA Technology Risk supervisor-template detail for DIFC-regulated entities",
      "Parent-group TIBER / CBEST / iCAST artefact aligned to the parent's control catalogue",
      "Bilingual English / Arabic report where Dubai-government / federal handover required",
      "Purple-team SIEM tuning backlog handed to client SOC (20-40 rule additions typical)",
      "Adversary-action audit-trail in tamper-evident storage (DESC 5-year retention)",
    ],
    caseStudy: {
      industry: "DIFC-licensed bank (Gate Village) — TIBER-style operation with parent group in London",
      scope:
        "8-week intelligence-led red-team objective — reach SWIFT-attached treasury endpoint and MT103 issuance privileges without SOC detection, with DESC pre-notification + parent-group TIBER control-catalogue alignment + DFSA Technology Risk evidence overlay",
      outcome:
        "Initial access via spear-phish against MEA-corporate-banking lead during DSF event-window; lateral via Azure AD token theft + ADCS misconfiguration; MT103 issuance privilege reached at D+12 with 14 missed alerts mapped to SIEM rule gaps; 31 detection-engineering items handed to client SOC and parent-group global SOC; DESC ISR v2 evidence pack accepted first read; TIBER artefact filed with parent-group PRA reporting cycle.",
    },
    faqs: [
      {
        q: "Do you operate under DESC ISR v2 pre-notification discipline?",
        a: "Yes — for any Dubai-government-adjacent operation, DESC pre-notification is a hard pre-requisite. The white-cell composition is disclosed, the rules-of-engagement are filed, and the adversary-action audit-trail is retained in tamper-evident storage for the five-year disposition DESC expects. Operating outside this discipline in Dubai is the difference between an authorised exercise and a regulatory incident, and DESC's enforcement disposition has hardened materially since the 2023 ISR v2 review.",
      },
      {
        q: "Can a single operation generate the TIBER / CBEST / iCAST artefact for our parent group?",
        a: "Yes — alongside UAE IAS Tier-3, DESC ISR v2 attestation and DFSA Technology Risk supervisor-template evidence. Same operation, same evidence base, four-way artefact. We confirm the parent's specific framework (TIBER-EU, TIBER-DE, CBEST UK PRA, iCAST HKMA, ABS-RAFT, MAS AAP) at letter-of-authorisation stage and align the operational reporting accordingly.",
      },
      {
        q: "Do you have UAE-resident red-team consultants?",
        a: "Yes — for the duration of every operation we keep a UAE-resident lead consultant onsite, holding a UAE work permit / freelance visa and Emirates ID. Senior support flies from Mumbai BKC for the major reviews — operational-planning, mid-operation pulse with the white cell, and the board after-action review. Fly-in-fly-out red teams do not work in Dubai because the building-convention rehearsal and the pretext realism require continuous presence.",
      },
      {
        q: "How do you handle the Emirates Group / Dubai Airports operational-safety constraints?",
        a: "Annex 17 ICAO operational-safety constraint awareness is built in. Red-team scope inside the airline / airport estate is strictly out-of-band on customer-impacting flows (no actions that touch live booking, check-in, boarding-pass, baggage-handling or ramp operations), pre-cleared with the safety-and-security committee, and the operational-planning review explicitly excludes any scenario that could degrade flight-safety or passenger-throughput. Within those constraints, the cargo / freight, crew systems, ground-handling-adjacent IT and the corporate IT estate remain in scope.",
      },
      {
        q: "What does the bilingual reporting cover?",
        a: "English primary report with Arabic translation for Dubai-government and federal handover where required. Both versions are reviewed and signed by the same engagement lead so the technical detail and the regulator-readable summary stay consistent. For DIFC private-sector and MEA-regional-HQ clients the report is typically English-only; Arabic is added where the client board includes Emirati nationals or where the federal regulator (TDRA / UAE Cybersecurity Council) is in the recipient list.",
      },
      {
        q: "What is the purple-team handover model?",
        a: "Purple-team replay with the client SOC + SIEM tuning backlog. The 20-40 SIEM rule additions, 5-10 EDR detection-tuning items and architecture-level guardrails are walked through with the SOC team in a half-day session at engagement close. The detection-engineering backlog goes into the client's own tenant — the SOC owns the rules, not us — and the after-action review is filed with the board with the closure timeline committed.",
      },
      {
        q: "Is the engagement letter-of-authorisation-led?",
        a: "Yes — board-issued letter of authorisation with explicit scope, white-cell composition, rules-of-engagement, indemnity scope and (for Dubai-government-adjacent operations) DESC pre-notification reference. We counter-sign and the letter is filed with the client's legal counsel for the operation's duration plus the five-year retention period DESC expects. Operating without a current letter-of-authorisation is not negotiable.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 9 · UAE × Cloud Security
  // ─────────────────────────────────────────────────────────────────────
  {
    citySlug: "uae",
    serviceSlug: "cloud-security",
    headline:
      "Cloud Security Audit in the UAE · Federal",
    lead:
      "Cloud security audit across the UAE on AWS Bahrain / UAE, Azure UAE North / Central, OCI Abu Dhabi, Google Cloud Dammam and G42 sovereign cloud — UAE IAS, DESC ISR v2, ADHICS, DFSA / FSRA and Smart Dubai cloud-first policy aligned.",
    body: [
      "UAE cloud-security audits sit under a layered regulatory stack that no global Big-4 cloud-audit template handles cleanly. UAE IAS (NESA) at the federal level via the UAE Cybersecurity Council and TDRA, with the Critical Information Infrastructure Protection (CIIP) overlay for designated sectors. Dubai Electronic Security Centre (DESC) Information Security Regulation v2 for any Dubai-government and semi-government workload, with the Smart Dubai cloud-first policy directing public-sector workloads to approved cloud regions. Abu Dhabi Health Information and Cyber Security (ADHICS) for any healthcare workload in Abu Dhabi (DOH-regulated hospitals, clinics, payers and the Malaffi health-information exchange). SIA / TDRA cloud-policy for licensed telecom and digital-government operators. DFSA / FSRA technology-risk modules for free-zone BFSI in DIFC and ADGM respectively. UAE Federal PDPL 2021 for personal-data-processing workloads with the UAE Data Office cross-border-transfer overlay. Audits have to evidence the right controls per workload, not a single relabelled global template — and the inspector will not accept a CIS-only scorecard.",
      "We audit UAE cloud estates across the full set of regions that actually serve UAE workloads. AWS Bahrain (me-south-1) plus the AWS UAE Local Zone (Dubai) when available, with cross-region pairing to AWS Bahrain or AWS Frankfurt depending on the residency obligation; Microsoft Azure UAE North (Dubai) and UAE Central (Abu Dhabi) as the primary federal-residency-acceptable pairing; Oracle Cloud Infrastructure Abu Dhabi region used by several federal and semi-government workloads; Google Cloud Dammam (me-central-2) where UAE BFSI has chosen GCP as the analytics fabric and the Bahrain / KSA cross-region is the BCP design; and the G42 / Core42 sovereign-cloud regions (Khazna data centres, the Etisalat / e& enterprise cloud, the Bayanat-adjacent geospatial cloud) for the federal-ministry workloads that require sovereign hosting under the UAE Cybersecurity Council guidance. We also audit the hybrid links back to on-prem datacentres in Khazna (Abu Dhabi), Equinix DX1 / DX2 (Dubai), Etisalat / e&-operated colocation sites, and the operator-specific managed-services overlays.",
      "Findings are mapped per workload to UAE IAS Tier-1 / Tier-3 control profiles, DESC ISR v2 cloud-specific controls (the v2 update introduced cloud-operations-specific evidence requirements absent from v1), ADHICS Section 4 (technical controls) for healthcare workloads, DFSA Technology Risk GEN 6 cloud annex for DIFC BFSI, FSRA cloud-risk expectations for ADGM, SIA / TDRA cloud-policy for licensed operators, ISO 27017 / 27018 for the cloud-baseline crosswalk, and the CIS AWS / Azure / OCI / GCP Foundations Benchmarks for the technical scorecard layer. UAE Federal PDPL Article 22 cross-border-transfer evidence is recorded per workload with the UAE Data Office submission template where in scope. Data residency, sovereignty (the distinction matters under UAE law — residency-in-region is not the same as sovereign-control-of-operations), and KMS / HSM key-custody arrangements are evidenced explicitly per workload.",
      "Common scopes we deliver against: a federal-ministry workload on a G42 / Core42 sovereign-cloud region with the cross-region DR design and the UAE Cybersecurity Council CIIP applicability assessment; a Dubai-government / semi-government smart-services platform (the kind of workload that anchors Smart Dubai initiatives) with DigitalDubai / UAE PASS integration audit and the DESC ISR v2 cloud-controls pack; an ADHICS-regulated healthcare workload on Azure UAE North with the Malaffi HIE integration and the DOH-specific evidence; a DFSA-regulated BFSI workload in DIFC running on AWS Bahrain primary and Frankfurt DR with the GEN 6 cloud annex evidence; a FSRA-regulated ADGM asset-management workload on Azure UAE Central with the cross-region pairing to UAE North; a multinational regional-HQ workload spanning UAE and onward to KSA (SAMA CSF / NCA ECC-2 overlay), Egypt, Bahrain or Oman; and the federal-CIIP designated workload running across multiple emirates with the per-emirate audit reconciliation.",
      "Engagements run 4-6 weeks for a single-cloud single-workload audit, 6-8 weeks for a multi-cloud landing zone, 8-10 weeks for a federal-CIIP designated workload audit with cross-emirate reconciliation, and 10-12 weeks for the largest multi-cloud + sovereign-cloud hybrid estates. Onsite kickoff is in Dubai (DIFC / Business Bay / Internet City), Abu Dhabi (Al Maryah Island / ADGM / Khalifa City) or Sharjah depending on the client. A UAE-resident lead consultant remains onsite throughout the engagement, with Mumbai BKC senior support flying in for the board reviews and the major regulator-pack walkthroughs. We coordinate directly with the hyperscaler's UAE / KSA / Bahrain account team — AWS MENA / EMEA, Microsoft Gulf, Oracle Cloud Gulf, Google Cloud MENA — and the on-prem / sovereign-cloud operator (Khazna Data Centres, Etisalat / e&, Du, G42 / Core42, Equinix Gulf) to evidence the shared-responsibility controls in one binder.",
      "The technical audit toolset is the same regulator-grade set the Mumbai BFSI practice uses, with UAE-specific overlays. Prowler v3 + ScoutSuite + Pacu / CloudFox for AWS, with the Azure-equivalent (Azucar, PowerZure, Stormspotter) and OCI-equivalent (Cloud Guard policy review, IAM federation audit) and the GCP-equivalent (Forseti-style review, GCP IAM Recommender consumption). CrowdStrike Falcon Cloud Security or Wiz where the client already owns a CNAPP. UAE-specific add-ons: UAE PASS integration security review (OIDC / SAML federation, attribute-release minimisation, the federal-identity broker hop), DigitalDubai service-mesh attestation review, the Malaffi HIE integration audit for healthcare workloads, and the federal-CIIP applicability-determination workflow with the UAE Cybersecurity Council where the workload's CIIP status is unclear.",
      "Reports include a federal-versus-emirate control crosswalk so a single workload running across Dubai and Abu Dhabi tenants does not get audited twice with conflicting findings — the most common pain point we see on UAE multi-emirate cloud estates, and the one that most often surfaces in CAG-equivalent UAE federal-audit-board reviews. Sovereign-cloud workloads on G42 / Core42 / Khazna get a separate sovereign-control attestation pack because the shared-responsibility model is different — the operator carries the operational-control disposition the hyperscalers do not, and the audit evidence has to reflect that. Arabic-language deliverables are produced where a UAE federal-ministry or Dubai-government entity requires them; the senior consultant on the engagement is the same person who signs both the English and the Arabic version.",
      "Commercial terms are local. Billing in AED with the 5% UAE VAT line, invoiced from the regional billing entity. Engagement letter under UAE law (DIFC Courts jurisdiction for DIFC entities, ADGM Courts for ADGM, UAE federal courts otherwise) with explicit UAE PDPL Article 22 cross-border-transfer discipline for any evidence movement to consultant endpoints. Records-retention aligned to the strictest regulator on the engagement — typically DFSA 7 years for BFSI, DESC ISR v2 5 years for Dubai-government, ADHICS retention for healthcare, with the federal-CIIP retention overlaid where applicable. Re-testing of all critical and high findings is included in the base SoW with a 30-day window aligned to the strictest regulator's remediation SLA.",
    ],
    buyerConcerns: [
      "UAE IAS (NESA) Tier-1 / Tier-3 + CIIP applicability evidence per workload",
      "DESC ISR v2 cloud-controls pack for Dubai-government / semi-government workloads",
      "ADHICS Section 4 technical-controls evidence for Abu Dhabi healthcare cloud estates",
      "DFSA Technology Risk GEN 6 cloud annex + FSRA cloud-risk for free-zone BFSI",
      "UAE Federal PDPL Article 22 cross-border-transfer record per workload",
      "Data residency vs sovereign-control-of-operations distinction (key-custody, ops-personnel screening)",
      "G42 / Core42 / Khazna sovereign-cloud shared-responsibility attestation",
      "UAE PASS + DigitalDubai service-mesh + Malaffi HIE integration security",
      "Federal-versus-emirate control crosswalk to avoid conflicting findings on multi-emirate estates",
    ],
    differentiators: [
      "Per-workload mapping to UAE IAS, DESC ISR v2, ADHICS, DFSA, FSRA, SIA / TDRA, ISO 27017 / 27018 and CIS — not one global ISO / CIS report relabelled for the UAE.",
      "Coverage of G42 / Core42 sovereign-cloud regions, UAE PASS federation, Malaffi HIE and DigitalDubai service-mesh — the parts global Big-4 cloud audits routinely skip.",
      "UAE-resident lead consultant on the engagement throughout, with Mumbai BKC senior fly-in for board reviews — not a fly-in-fly-out model.",
      "Federal-versus-emirate control crosswalk to avoid conflicting-finding pain on multi-emirate cloud estates — the single most common UAE federal-audit-board observation.",
      "Arabic-language deliverables where the UAE federal-ministry or Dubai-government client requires them, signed by the same engagement lead as the English version.",
      "CIIP applicability-determination workflow run directly with the UAE Cybersecurity Council where the workload's CIIP status is unclear — most vendors skip this and the audit fails on first read.",
    ],
    seoDescription:
      "UAE cloud security audit for federal, Dubai, Abu Dhabi and free-zone workloads on AWS / Azure / OCI / GCP / G42 sovereign cloud — UAE IAS, DESC ISR v2, ADHICS, DFSA / FSRA.",
    keywords: [
      "cloud security audit UAE",
      "NESA UAE IAS cloud audit",
      "DESC ISR v2 cloud audit",
      "ADHICS cloud audit Abu Dhabi",
      "AWS Bahrain UAE security audit",
      "Azure UAE North audit",
      "G42 sovereign cloud audit",
      "UAE PASS integration security",
      "DFSA cloud security audit DIFC",
      "Smart Dubai cloud-first audit",
    ],
    stats: [
      { value: "8 regulators", label: "UAE IAS · DESC · ADHICS · DFSA · FSRA · SIA · TDRA · PDPL" },
      { value: "5 clouds", label: "AWS · Azure · OCI · GCP · G42 sovereign" },
      { value: "AR + EN", label: "Bilingual reporting where required" },
      { value: "4-12 wk", label: "Engagement duration by scope" },
    ],
    methodology: [
      {
        phase: "01 · Regulator + Cloud-Region Scoping",
        activities: [
          "Workload-by-workload regulator mapping (UAE IAS / DESC ISR v2 / ADHICS / DFSA / FSRA / SIA / PDPL)",
          "Cloud-region pairing under UAE residency + sovereignty obligation per workload",
          "CIIP applicability assessment with UAE Cybersecurity Council where status is unclear",
          "Engagement letter under UAE law + UAE PDPL Article 22 cross-border-transfer discipline",
        ],
      },
      {
        phase: "02 · Control-Plane + Identity Audit",
        activities: [
          "AWS Organisations / Azure Management Group / OCI Compartment / GCP Resource Hierarchy review",
          "IAM Identity Center / Entra ID / OCI IAM / GCP IAM role inventory with last-used timestamps",
          "Pacu + Azucar + PowerZure privilege-path enumeration + SCP / Policy diff",
          "UAE PASS / DigitalDubai / Malaffi HIE federation review per applicable workload",
        ],
      },
      {
        phase: "03 · Workload + Data-Plane Audit",
        activities: [
          "Prowler v3 + ScoutSuite + CNAPP (Wiz / CrowdStrike) breadth scan with UAE-tuned ruleset",
          "CIS AWS / Azure / OCI / GCP Foundations + ISO 27017 / 27018 mapping per workload",
          "Residency vs sovereignty evidence — region pairing, KMS / HSM key-custody, ops-personnel screening",
          "Sovereign-cloud (G42 / Core42 / Khazna) shared-responsibility attestation per workload",
        ],
      },
      {
        phase: "04 · Detection + Hybrid Edge",
        activities: [
          "CloudTrail / Defender / OCI Audit / GCP Audit Logs pipeline integrity",
          "SIEM telemetry reconciliation with client SOC (Splunk / Sentinel / Chronicle / QRadar)",
          "Hybrid link audit — Direct Connect / ExpressRoute / FastConnect into Khazna + Equinix DX",
          "G42 / Core42 sovereign-cloud monitoring integration where in scope",
        ],
      },
      {
        phase: "05 · Federal-Emirate Crosswalk + Arabic Pack",
        activities: [
          "Federal-versus-emirate control crosswalk to avoid conflicting findings on multi-emirate workloads",
          "UAE IAS Tier-3 + DESC ISR v2 + ADHICS + DFSA / FSRA + UAE PDPL artefact pack",
          "Arabic-language report where UAE federal-ministry / Dubai-government client requires it",
          "30-day re-test of critical / high findings + closure ledger filed with each regulator's channel",
        ],
      },
    ],
    industries: [
      {
        name: "Federal ministries + CIIP-designated entities",
        blurb:
          "Federal workloads on G42 / Core42 sovereign cloud + Khazna hybrid — UAE Cybersecurity Council CIIP overlay.",
      },
      {
        name: "Dubai-government + Smart Dubai",
        blurb:
          "Smart-services platforms with DigitalDubai / UAE PASS integration — DESC ISR v2 + Smart Dubai cloud-first policy.",
      },
      {
        name: "Abu Dhabi healthcare (DOH-regulated)",
        blurb:
          "ADHICS-regulated healthcare workloads on Azure UAE North with Malaffi HIE integration audit.",
      },
      {
        name: "DIFC + ADGM free-zone BFSI",
        blurb:
          "DFSA / FSRA regulated cloud estates on AWS Bahrain + Frankfurt or Azure UAE Central + UAE North pairing.",
      },
      {
        name: "Licensed telecom + digital-government operators",
        blurb:
          "Etisalat / e& / du / Du Pay / Bayanat-adjacent operators under SIA / TDRA cloud-policy + PDPL overlay.",
      },
      {
        name: "GCC-spread regional HQs",
        blurb:
          "Multinational HQs spanning UAE + KSA (SAMA / NCA) + Bahrain + Oman + Egypt with cross-emirate reconciliation.",
      },
    ],
    deliverables: [
      "UAE IAS (NESA) Tier-1 / Tier-3 + CIIP applicability evidence pack",
      "DESC ISR v2 cloud-controls pack in registered-auditor route format",
      "ADHICS Section 4 technical-controls evidence for healthcare workloads",
      "DFSA Technology Risk GEN 6 cloud annex + FSRA cloud-risk evidence for free-zone BFSI",
      "UAE Federal PDPL Article 22 cross-border-transfer record with UAE Data Office template",
      "G42 / Core42 sovereign-cloud shared-responsibility attestation per workload",
      "Federal-versus-emirate control crosswalk artefact for multi-emirate estates",
      "Bilingual English / Arabic report where federal-ministry / Dubai-government required + 30-day re-test ledger",
    ],
    caseStudy: {
      industry: "UAE federal ministry — multi-emirate workload on G42 sovereign cloud + Azure UAE North hybrid",
      scope:
        "Cloud security audit across G42 sovereign-cloud region + Azure UAE North + Khazna hybrid + UAE PASS integration; UAE IAS Tier-3 + DESC ISR v2 + UAE PDPL Article 22 + CIIP applicability assessment",
      outcome:
        "63 findings closed in 7 weeks · CIIP applicability determined with UAE Cybersecurity Council and codified · 12 sovereign-cloud shared-responsibility attestation gaps closed with G42 / Core42 operator counter-signature · UAE PASS attribute-release minimised across 8 service integrations · federal-emirate crosswalk filed with the federal-audit-board reconciling Dubai + Abu Dhabi tenants · bilingual English / Arabic report signed off in same engagement.",
    },
    faqs: [
      {
        q: "Do you audit G42 / Core42 sovereign cloud, or only AWS / Azure / OCI / GCP?",
        a: "All five. The sovereign-cloud shared-responsibility model is different — the operator (G42 / Core42 / Khazna for the federal-ministry workloads, Etisalat / e& for licensed-operator workloads) carries the operational-control disposition the global hyperscalers do not, and the audit evidence has to reflect that. We produce a separate sovereign-cloud shared-responsibility attestation pack alongside the hyperscaler evidence on hybrid estates.",
      },
      {
        q: "How do you handle the federal-versus-emirate control conflict on multi-emirate estates?",
        a: "Federal-versus-emirate control crosswalk artefact, produced per workload. A workload running across a Dubai-region tenant and an Abu Dhabi-region tenant — say, an ADHICS-regulated healthcare workload on Azure UAE North with a DESC ISR v2 overlay on the Dubai-clinic-facing surface — gets audited once with a single crosswalk that reconciles the two regulators' control catalogues against the same evidence. This is the single most common UAE federal-audit-board observation we close.",
      },
      {
        q: "Do you produce Arabic-language reports?",
        a: "Yes — where the UAE federal-ministry or Dubai-government client requires them. The same engagement lead signs both the English and Arabic version so the technical detail and the regulator-readable summary stay consistent. For free-zone BFSI (DIFC / ADGM) and MNC regional-HQ clients the report is typically English-only; Arabic is added where the federal regulator (TDRA / UAE Cybersecurity Council / UAE Data Office) is in the recipient list.",
      },
      {
        q: "What is the difference between data residency and sovereignty in your audit?",
        a: "Data residency means the data sits in a specified region — that is the AWS / Azure / OCI / GCP region-selection question. Sovereignty under UAE law goes further: it requires operational-control disposition (operator-personnel screening, key-custody under jurisdiction, supply-chain provenance, the absence of foreign-state legal access) on top of region. For federal-CIIP workloads and certain Smart Dubai workloads sovereignty is mandatory, and only the G42 / Core42 sovereign-cloud and Khazna-hosted hybrid estates clear the bar. We audit both dimensions explicitly per workload.",
      },
      {
        q: "Will you coordinate with our AWS / Azure / G42 account team?",
        a: "Yes — that is required. We brief the hyperscaler's UAE / KSA / Bahrain account team (AWS MENA, Microsoft Gulf, Oracle Cloud Gulf, Google Cloud MENA) and the sovereign-cloud / on-prem operator (G42 / Core42, Khazna, Etisalat / e&, du, Equinix Gulf) on day one and pull the shared-responsibility evidence — SOC 2 Type 2, ISO 27017 / 27018, regional physical-control attestations, operator-personnel-screening attestations — directly so the binder is complete on first read.",
      },
      {
        q: "Do you run the CIIP applicability determination for federal workloads?",
        a: "Yes — where the workload's Critical Information Infrastructure Protection status is unclear we run the applicability-determination workflow directly with the UAE Cybersecurity Council. Most vendors skip this step and the audit fails on first read because the inspector cannot reconcile the workload's protection posture against an undetermined CIIP status. The determination, once made, codifies the workload's UAE IAS Tier alignment for the next audit cycle.",
      },
      {
        q: "Is the engagement billed in AED with UAE VAT?",
        a: "Yes — billed in AED with the 5% UAE VAT line, invoiced from our regional billing entity. Engagement letter under UAE law (DIFC Courts jurisdiction for DIFC entities, ADGM Courts for ADGM, UAE federal courts otherwise). Records retention aligned to the strictest regulator on the engagement — DFSA 7 years for BFSI, DESC ISR v2 5 years for Dubai-government, ADHICS retention for healthcare.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 10 · Mumbai × Penetration Testing
  // ─────────────────────────────────────────────────────────────────────
  {
    citySlug: "mumbai",
    serviceSlug: "penetration-testing",
    headline: "Penetration Testing in Mumbai · Scenario-led, BFSI-grade",
    lead: "OSCP/OSEP-led objective-based pentests for Mumbai BFSI, fintech and listed enterprises — beyond the annual VAPT scope.",
    body: [
      "Mumbai BFSI clients increasingly draw a hard line between a CERT-In format annual VAPT (a regulator-driven scope) and a true penetration test (a scenario-led adversary engagement scoped against a defined business objective). Macksofy runs both — but the Mumbai penetration testing engagement is different in three concrete ways. First, the kickoff opens with a single objective written by the CISO and the audit-committee chair: 'reach the SWIFT gateway from a guest Wi-Fi position without SOC detection by D+10', or 'mint balance in a test customer's NEFT corridor without tripping the velocity engine'. Second, scope is asset-blind — we get the objective and the rules of engagement, not a fixed asset list. Third, the success metric is not a CVSS roll-up but whether the objective was met, by what path, in how many hours, with how many missed SOC alerts.",
      "The Macksofy Mumbai bench is OSCP and OSEP-credentialed end-to-end. Senior leads carry OSCE3 or OSEP plus at least one CRTO / Red Team Ops II. We work the BKC corridor, Lower Parel, Powai, Andheri MIDC, Goregaon SEEPZ and the Navi Mumbai BCP belt at Airoli / Ghansoli / Vashi the same way: physical assessment legs included in scope where the objective demands it (badge-clone testing in the BKC tower lobby, Wi-Fi war-walking the Lower Parel rooftop, USB-drop on the Powai cafeteria floor). Most engagements include at least one onsite leg with the white-cell coordinator in the room.",
      "Initial-access tradecraft on a Mumbai BFSI pentest typically lands on one of four vectors. Spear-phish against treasury and trade-finance functions is the highest-yield in our experience — the email lure is calibrated against BSE / NSE clearing-cycle news so the click rate is realistic for the audit committee. Watering-hole compromises against vendor-portal logins (Tata Communications, Sify, Tata Tele, Wipro DSP) are second. Physical access via tailgating a BKC tower lobby is third. Public-facing exploit chains — most often via a misconfigured Citrix NetScaler, Pulse Secure or Fortinet appliance — are the fourth lane. Every initial-access path is reproduced into a one-page narrative for the board pack with screenshot, timeline and the operator console reference for the SOC tabletop.",
      "Post-exploitation on a Mumbai bank is a domain-and-identity exercise. ADCS misconfiguration paths (ESC1, ESC4, ESC8) are the single most common privileged-escalation vector across our 2025 engagement set. Kerberoasting against legacy mainframe-RACF integration accounts is the second most common. Constrained-delegation abuse and SCCM relay-to-domain-admin are third. We pull BloodHound paths against the AD forest backing core banking, then map the shortest unauthenticated edge to the SWIFT gateway, the OMS, the RBI WSS connection or the treasury-management system as the objective demands. SOC deconfliction runs through a private bridge — every escalation tagged so the SOC's regression hunt is not noise.",
      "Detection-engineering is part of every Mumbai pentest deliverable, not a follow-on retainer. Every successful step in the kill chain is paired with the Sigma rule, the Splunk SPL or the Sentinel KQL that would have caught it, and a missed-alert reconciliation against the bank's SIEM. Most Mumbai engagements close with 6-12 fresh detection content items the SOC ships into production inside two weeks. For tier-1 private banks, a paired Macksofy detection-engineering analyst sits with the SOC for the closing week of the engagement.",
      "Mumbai listed enterprises (pharma in Powai, FMCG in Andheri, listed manufacturing) buy penetration testing for a different reason — quarterly board-pack assurance and pre-IPO / pre-M&A diligence. The same playbook applies but the executive summary lands as a quarterly trend on the audit committee deck, not a one-off binder. Pharma and IT-services parent-company control catalogues (US BSA / FCPA / SOX overlays) get crosswalked into the report so the parent's IA function has no rework.",
      "Procurement on a Mumbai pentest closes through the CISO and the audit-committee chair, with the General Counsel signing the rules-of-engagement letter for trespass-and-deception waivers, physical assessment indemnity and the safe-harbour clause that lets us touch production. Reports are encrypted, double-key delivered (Macksofy senior + CISO), and the master is destroyed inside 30 days of closure unless the bank requests retention. Mumbai counsel typically wants a Bombay High Court jurisdiction clause and an explicit no-data-exfiltration acknowledgement — both standard in our Mumbai engagement letter.",
      "Onsite cadence is dictated by Mumbai geography (BKC walk-in same day, Andheri MIDC and Powai inside four hours, Navi Mumbai inside six hours) and the bank's BCP site location (Mahape, Airoli, Ghansoli for most clients). Engagement length is typically 4-6 weeks — 1 week reconnaissance, 2-3 weeks active exploitation, 1 week reporting and SOC tabletop. We do not run the standard 2-week 'pentest' that other Mumbai vendors brand under the same name — it does not give the SOC enough time to react and learn.",
    ],
    buyerConcerns: [
      "Objective-based scoping with a single CISO-and-audit-chair-signed objective, not a fixed asset list",
      "OSCP / OSEP / OSCE3 / CRTO-credentialed senior consultants — no subcontracted juniors",
      "Initial access via spear-phish, watering-hole, physical tailgating and public exploit chains",
      "ADCS ESC1-ESC8, Kerberoasting, constrained-delegation and SCCM relay paths",
      "SWIFT, SWIFT CSP, treasury-management and OMS-to-exchange objective targeting",
      "SOC tabletop integration with missed-alert reconciliation and paired detection content",
      "Rules-of-engagement covering trespass-and-deception, physical assessment indemnity and production safe-harbour",
      "Audit-committee board-pack outputs vs technical AppSec deliverables",
      "Bombay High Court jurisdiction and Mumbai-specific counsel concerns in the engagement letter",
    ],
    differentiators: [
      "Single-objective scoping signed by the CISO and audit-committee chair — the engagement is graded against whether the objective was met, not a CVSS roll-up.",
      "Senior bench end-to-end OSCP/OSEP-credentialed; physical assessment legs (badge-clone, USB-drop, BKC tower tailgate) included in scope where the objective demands.",
      "Detection content shipped as a deliverable — every kill-chain step paired with a Sigma / Splunk SPL / Sentinel KQL the SOC adopts inside two weeks.",
      "Paired Macksofy detection-engineering analyst embedded with the bank SOC for the closing week — purple-team integration, not a one-shot dump.",
      "Mumbai geography baked into the SoW — BKC walk-in, MMR four-hour SLA, monsoon-window scheduling and Mahape/Airoli BCP-site coordination handled directly.",
    ],
    seoDescription:
      "OSCP / OSEP-led penetration testing in Mumbai for BFSI, fintech and listed enterprises. Objective-based scoping, SWIFT and treasury targeting, SOC tabletop integration, BKC HQ.",
    keywords: [
      "penetration testing Mumbai",
      "Mumbai pentest company",
      "OSCP pentest Mumbai BKC",
      "BFSI penetration testing Mumbai",
      "red team Mumbai bank",
      "SWIFT gateway pentest Mumbai",
      "OSEP penetration testing Mumbai",
      "Mumbai fintech pentest",
      "audit committee pentest Mumbai",
    ],
    stats: [
      { value: "OSCP / OSEP", label: "Senior bench credentials" },
      { value: "Objective-led", label: "Not checklist-led" },
      { value: "6-12 rules", label: "SIEM detections per engagement" },
      { value: "<4 hrs", label: "MMR onsite SLA" },
    ],
    methodology: [
      {
        phase: "01 · Objective & RoE",
        activities: [
          "CISO + audit-committee chair sign a single written objective (e.g. 'reach SWIFT without SOC detection by D+10')",
          "Rules-of-engagement letter — trespass-and-deception waiver, physical assessment indemnity, production safe-harbour, Bombay High Court jurisdiction",
          "SOC deconfliction bridge established on a private Signal/Teams channel with the bank's SOC lead",
          "White-cell sub-team identified (CISO + GC + audit-chair); operations team kept blind for realism",
        ],
      },
      {
        phase: "02 · Recon & Initial Access",
        activities: [
          "OSINT against treasury, trade-finance, dealing-room and IT-vendor staff (LinkedIn, Refinitiv, Bloomberg footprints)",
          "Email lure calibrated to BSE / NSE clearing-cycle news for realistic spear-phish click rate",
          "Vendor-portal watering-hole and Citrix NetScaler / Pulse / Fortinet edge enumeration",
          "Physical leg — BKC / Lower Parel / Powai tower lobby tailgate or USB-drop where in scope",
        ],
      },
      {
        phase: "03 · Privilege Escalation",
        activities: [
          "ADCS ESC1 / ESC4 / ESC8 enumeration and exploitation with Certify + Certipy",
          "Kerberoasting legacy mainframe-RACF integration accounts and constrained-delegation abuse",
          "SCCM relay-to-domain-admin chain on the bank's software-distribution forest",
          "BloodHound shortest-path-to-objective mapping with manual abuse-case validation",
        ],
      },
      {
        phase: "04 · Objective Execution",
        activities: [
          "Shortest path to SWIFT / OMS / RBI WSS / treasury-management system per the signed objective",
          "Step-by-step operator console capture with timestamps for the post-engagement SOC tabletop",
          "Missed-alert reconciliation against the bank's SIEM at each kill-chain step",
          "Controlled-stop at the objective boundary — no data exfiltration; objective evidenced via screenshot + hash",
        ],
      },
      {
        phase: "05 · SOC Tabletop & Detection Content",
        activities: [
          "Joint SOC tabletop with the bank's blue-team walking each kill-chain step in operator-console order",
          "Sigma / Splunk SPL / Sentinel KQL content authored per missed alert — 6-12 production-ready rules per engagement",
          "Embedded Macksofy detection-engineering analyst with the SOC for the closing week",
          "Encrypted, double-key board-pack delivery to CISO + audit-committee chair; master destroyed at D+30 unless retention requested",
        ],
      },
    ],
    industries: [
      {
        name: "Private banks (Mumbai-HQ)",
        blurb: "BKC corporate-office, Lower Parel treasury and Mahape BCP — objective-led pentest with SOC tabletop integration.",
      },
      {
        name: "Stock brokers & MIIs",
        blurb: "BKC / Lower Parel brokers — broker-terminal, OMS-to-exchange and Refinitiv/Bloomberg feed-handler objectives.",
      },
      {
        name: "Payment aggregators",
        blurb: "BKC PA-PG licensees — settlement, payout and reconciliation API objectives with RBI PA inspection-defence overlay.",
      },
      {
        name: "Listed pharma & FMCG",
        blurb: "Powai and Andheri MIDC HQs — quarterly board-pack pentest with US parent (SOX / FCPA) control-catalogue crosswalk.",
      },
      {
        name: "Fintech (Series-C+)",
        blurb: "BKC / Lower Parel fintechs — adversary emulation against fraud-stack and KYC-vendor integration objectives.",
      },
      {
        name: "Insurance majors",
        blurb: "Andheri / Worli insurer HQs — claims-fraud, PAS and KYC-impersonation objectives with IRDAI 2023 overlay.",
      },
    ],
    deliverables: [
      "Objective verdict (met / partially met / not met) with timestamped operator-console replay",
      "Kill-chain narrative as a one-page board-pack entry per phase with screenshot + timeline",
      "6-12 production-ready SIEM detection rules (Sigma / Splunk SPL / Sentinel KQL) per engagement",
      "Missed-alert reconciliation report mapped to the bank's current SIEM use-case catalogue",
      "ADCS / Kerberos / SCCM / AD-forest hardening playbook tailored to the bank's domain topology",
      "Jira / ServiceNow-importable findings CSV with severity, owner, ETA and CWE",
      "Encrypted double-key board-pack delivery to CISO + audit-committee chair",
      "Joint SOC tabletop session and follow-on retainer if requested",
    ],
    caseStudy: {
      industry: "Mumbai-headquartered Tier-1 Private Bank (BKC corporate tower)",
      scope: "Single-objective pentest — reach SWIFT-CSP-protected gateway from a guest Wi-Fi position by D+10 without SOC detection; 6-week engagement with one BKC and one Mahape onsite leg",
      outcome: "Objective met at D+7 via ADCS ESC4 path off a misconfigured vendor-portal landing; 11 missed alerts mapped to SIEM use-case gaps; 9 paired Sigma rules adopted by the SOC inside two weeks; one constrained-delegation path closed pre-disclosure that would have allowed dealing-desk-to-treasury-management-system traversal.",
    },
    faqs: [
      {
        q: "How is a Mumbai penetration test different from your VAPT?",
        a: "VAPT is regulator-required, scope-defined and checklist-driven against RBI MD-ITGRC and SEBI CSCRF. A penetration test is scenario-led against a single CISO-signed objective with no fixed asset list. Same firm, separate playbooks, distinct deliverables. Most Mumbai BFSI clients run both each year — VAPT for the regulator, pentest for the audit committee.",
      },
      {
        q: "Do you include physical assessment legs in Mumbai?",
        a: "Yes — where the objective demands. Badge-clone testing in the BKC tower lobby, Wi-Fi war-walking the Lower Parel rooftop and USB-drop on the Powai cafeteria floor are all in scope when the engagement letter covers them. We carry trespass-and-deception waivers and physical assessment indemnity in the master agreement.",
      },
      {
        q: "How do you handle SOC deconfliction without telling the operations team?",
        a: "A white-cell sub-team — CISO, General Counsel and audit-committee chair — knows the engagement is live. The operations SOC is kept blind for realism. A private deconfliction bridge with the SOC lead (not the analyst team) handles emergency stop or scope-bound clarification. Post-engagement, the full SOC joins the tabletop with the kill-chain replay.",
      },
      {
        q: "Can you target the SWIFT gateway or the treasury-management system safely?",
        a: "Yes. The objective is reaching the system, not exfiltrating data. Evidence is a screenshot plus a controlled-stop hash. SWIFT-CSP attestation requirements and treasury-management vendor (Calypso / Murex / FIS) safe-harbour are written into the rules-of-engagement letter before the test starts.",
      },
      {
        q: "Do you deliver the SOC tabletop on the same engagement or as a follow-on?",
        a: "Same engagement. The closing week is a paired SOC tabletop with the bank's blue-team walking each kill-chain step in operator-console order. A Macksofy detection-engineering analyst stays with the SOC the entire closing week to ship the 6-12 paired Sigma / SPL / KQL rules into production.",
      },
      {
        q: "Is the report shared with RBI or kept private?",
        a: "Private. Penetration test reports are not regulator submissions — they are audit-committee evidence. The encrypted double-key board pack goes to the CISO and the audit-committee chair only. The bank may extract a sanitised summary for the inspector if RBI asks during a thematic review; we provide a template for that.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 11 · Bengaluru × Penetration Testing
  // ─────────────────────────────────────────────────────────────────────
  {
    citySlug: "bengaluru",
    serviceSlug: "penetration-testing",
    headline: "Penetration Testing in Bengaluru · SaaS, Product & GCC",
    lead: "Manual-first pentests for Bengaluru SaaS, product and GCC clients — multi-tenant authz, cloud-native and SOC 2-aligned.",
    body: [
      "Bengaluru penetration testing is overwhelmingly a SaaS, product and global-capability-centre (GCC) buyer market — and the difference shows in scope, methodology and report format. The Bengaluru buyer is technical: an AppSec lead, a CTO or a Director of Product Security with one foot inside the engagement, not procurement reading from a checklist. They want manually-validated chained exploits, multi-tenant isolation evidence, IaC-misconfiguration narratives that survive a US-headquartered parent's procurement review, and a deliverable that drops cleanly into the next SOC 2 Type II audit window. Macksofy's Bengaluru bench is wired for exactly this profile.",
      "Manual-first is the headline. Automated scanners (Burp Pro, ZAP, Nuclei) run as supporting infrastructure, never as the deliverable. Every High and Critical finding carries a manually-validated proof-of-exploit with the curl reproduction, the Burp session export and the screenshot timeline. Multi-tenant authz testing exercises tenant-A-as-tenant-B impersonation at every role boundary (BOLA — Broken Object Level Authorisation — is OWASP API Top 10 #1 for a reason) and every tenant-bleed surface — shared file stores, shared search indices, shared inference endpoints, shared LLM context windows, shared queue topics. The methodology defaults to OWASP ASVS Level 3 for product clients and OWASP API Security Top 10 (2023) for API-first scopes.",
      "Cloud-native testing is the second pillar. Most Bengaluru SaaS clients run a hub-and-spoke AWS or GCP account topology, sometimes layered with Cloudflare Workers, Vercel edge functions, or a CDN-side WAF. We exercise IaC misconfiguration (Terraform state exposure, overly-broad IAM Pass Role, S3 bucket-policy ambiguity, KMS key-policy escalation, Lambda execution-role lateral movement), CI/CD pipeline takeover (GitHub Actions OIDC token theft, GitLab CI runner privilege, Buildkite agent compromise), and supply-chain risk (compromised NPM dependency, leaked PAT, an exposed Vault token). Bengaluru product CTOs particularly care about the CI/CD takeover lane because it is the single highest-leverage path into a SaaS estate.",
      "Identity is the third pillar. SAML, OIDC and OAuth 2.0 integration testing is in scope on every Bengaluru engagement — federation with Okta, Auth0, AWS Cognito, Microsoft Entra ID and Google Workspace. We test session-handling, refresh-token-rotation, PKCE enforcement, audience confusion attacks, JWT algorithm confusion, mTLS-bypass and the surprisingly common 'forgot the audience claim' pattern. For B2B SaaS with enterprise customer SCIM provisioning, we exercise SCIM impersonation paths and the directory-API lateral that always seems to exist.",
      "Bengaluru product clients increasingly buy AI / LLM application security inside the same engagement. Prompt-injection (direct + indirect via document RAG), tool-use abuse via injection into agent reasoning, training-data exfiltration via inference-API probing, and the OWASP Top 10 for LLM Applications (2025) cross-mapped to the application's threat model. Most B2B SaaS pentests in 2025 carry at least one LLM-specific finding worth shipping in the executive summary.",
      "The deliverable lands inside the next SOC 2 Type II audit window — that timing is non-negotiable for most Bengaluru buyers. The executive summary maps every finding to SOC 2 CC6, CC7 and CC8 control categories, ISO 27001:2022 Annex A clauses, and (where US healthcare data is in scope) HIPAA Security Rule §164.308-312. Reports are reviewed by AppSec leads line-by-line, so we treat every finding write-up like a code review and ship reproducible exploit code (Python / curl / Burp .req) so the engineering team does not need to translate. The same deliverable doubles as the enterprise-procurement vendor pack for the client's customer-security questionnaires.",
      "Procurement reality matters. Most Bengaluru product companies close the SoW through the CTO, the AppSec lead and the head of customer security in a single weekly sync. There is no formal RFP. Pricing transparency, the methodology document, the lead consultant's GitHub or HackerOne profile and an LOI from the parent company's CISO get the engagement moving inside the same quarter. For Bengaluru GCC clients of US-headquartered Fortune 500s, we work to the US parent's pentest standard (commonly a NIST SP 800-115 v2 derivative) and ship the report in the US parent's preferred template.",
      "Onsite cadence is light by design — Bengaluru engineering teams are async, distributed across Whitefield, ORR, Electronic City, Koramangala and Indiranagar, and weekly stand-ups on Slack or Linear are the actual integration surface. Senior consultants fly Mumbai → BLR for kickoff (often in Manyata, Outer Ring Road or Whitefield) and for the closing readout. The rest of the engagement runs remote with daily async stand-ups and a shared findings tracker (Linear, Jira or GitHub Issues). Most Bengaluru engagements complete in 3-4 weeks.",
    ],
    buyerConcerns: [
      "Multi-tenant authz and BOLA exposure across every role boundary",
      "IaC misconfiguration (Terraform / IAM / KMS / Lambda execution role) on AWS / GCP",
      "CI/CD pipeline takeover via GitHub Actions OIDC, GitLab runner or Buildkite agent",
      "Identity federation flaws — SAML, OIDC, OAuth 2.0, JWT confusion, SCIM impersonation",
      "OWASP Top 10 for LLM Applications (2025) for AI-feature surfaces",
      "Vendor pack quality for US / EU enterprise customer security questionnaires",
      "SOC 2 CC6 / CC7 / CC8 crosswalk inside the next audit window",
      "ISO 27001:2022 Annex A and HIPAA Security Rule mapping for healthtech and US-healthcare GCCs",
      "Reproducible exploit code (Python / curl / Burp .req) so engineering can re-run without translation",
    ],
    differentiators: [
      "Manual-first methodology defaulting to OWASP ASVS Level 3 / API Top 10 (2023) / LLM Top 10 (2025) — automated scanners as supporting infrastructure, never as the deliverable.",
      "Reproducible exploit code (Python / curl / Burp .req) shipped with every finding so the engineering team re-runs without translation.",
      "Findings mapped end-to-end to SOC 2 CC6/CC7/CC8 + ISO 27001:2022 Annex A inside the next SOC 2 Type II audit window.",
      "Cloud-native focus — IaC misconfiguration, CI/CD pipeline takeover and AWS / GCP IAM-and-KMS escalation paths covered on every engagement.",
      "LLM application security in-scope for AI surfaces — prompt-injection, tool-use abuse, training-data exfil and indirect-injection-via-RAG.",
    ],
    seoDescription:
      "Manual-first penetration testing in Bengaluru for SaaS, product and GCC clients. Multi-tenant authz, cloud-native, identity federation and LLM application security. SOC 2 + ISO 27001 aligned.",
    keywords: [
      "penetration testing Bengaluru",
      "Bengaluru pentest SaaS",
      "manual pentest Bengaluru",
      "OWASP API pentest Bengaluru",
      "AWS pentest Bengaluru",
      "GCP penetration testing Bengaluru",
      "LLM security testing Bengaluru",
      "OSCP penetration testing Bengaluru",
      "Bengaluru product security firm",
    ],
    stats: [
      { value: "Manual-first", label: "Scanner as substrate, not deliverable" },
      { value: "ASVS L3", label: "Default methodology" },
      { value: "AWS · GCP", label: "Cloud-native bench" },
      { value: "3-4 wks", label: "Typical engagement" },
    ],
    methodology: [
      {
        phase: "01 · Scoping & Threat Modeling",
        activities: [
          "Joint kickoff with CTO, AppSec lead and head of customer security — async stand-up cadence agreed on Slack / Linear",
          "Threat model drafted against the application's tenant model, identity provider, cloud topology and AI surfaces",
          "OWASP ASVS L3 + API Top 10 + LLM Top 10 + customer-questionnaire control catalogue selected as base",
          "US-parent pentest standard alignment for GCC engagements (NIST SP 800-115 v2 derivative or parent-specific)",
        ],
      },
      {
        phase: "02 · Recon & Surface Map",
        activities: [
          "Authenticated and unauthenticated surface map with Burp Pro, Caido and Nuclei against staging plus a controlled prod tenant",
          "AWS / GCP account-and-resource enumeration via the customer's read-only audit role",
          "Identity provider footprint enumeration — SAML metadata, OIDC discovery, OAuth scopes and JWT key set",
          "AI surface inventory — model endpoints, RAG document corpus, agent tool catalogue, prompt template repository",
        ],
      },
      {
        phase: "03 · Manual Exploitation",
        activities: [
          "BOLA, tenant-bleed and shared-store impersonation tests at every role boundary",
          "JWT algorithm confusion, audience-claim handling, refresh-token rotation and PKCE enforcement tests",
          "IaC misconfiguration replay — Terraform state exposure, IAM Pass Role, S3 bucket policy, KMS key policy",
          "CI/CD pipeline takeover — GitHub Actions OIDC, GitLab runner privilege, Buildkite agent compromise",
          "LLM application probes — direct + indirect injection, tool-use abuse, training-data exfil via inference-API",
        ],
      },
      {
        phase: "04 · Audit-Aligned Reporting",
        activities: [
          "Reproducible exploit code (Python / curl / Burp .req) attached to every High and Critical",
          "SOC 2 CC6/CC7/CC8 + ISO 27001:2022 Annex A + HIPAA §164.308-312 crosswalk per finding",
          "Vendor pack annex for US / EU enterprise customer security questionnaires",
          "LLM Top 10 finding write-ups in OWASP 2025 language for AI-product clients",
        ],
      },
      {
        phase: "05 · Closure & Re-test",
        activities: [
          "Free re-test of every Critical and High inside the next SOC 2 Type II audit window",
          "Joint readout with the engineering team in Whitefield / ORR / Electronic City / Koramangala / Indiranagar",
          "Findings exported to Linear / Jira / GitHub Issues with owner, severity, CWE and ETA",
          "Continuous-pentest add-on offered for monthly regression coverage if the product cadence demands it",
        ],
      },
    ],
    industries: [
      {
        name: "B2B SaaS (Series-A to D)",
        blurb: "Whitefield, ORR and Koramangala product companies — multi-tenant authz and BOLA depth on the API surface.",
      },
      {
        name: "Fintech & lending",
        blurb: "Indiranagar and Koramangala lending / payments / neo-banking apps — RBI overlay on the SaaS playbook.",
      },
      {
        name: "Healthtech & US-healthcare GCC",
        blurb: "Manyata and Bagmane Tech Park healthtech — HIPAA §164.308-312 evidence inside the SaaS pentest.",
      },
      {
        name: "AI / LLM product",
        blurb: "Indiranagar and Whitefield AI-product startups — OWASP LLM Top 10 (2025) coverage on every engagement.",
      },
      {
        name: "Logistics & mobility tech",
        blurb: "ORR mobility / supply-chain SaaS — partner-API trust chains, fleet-telematics and field-mobile pentest.",
      },
      {
        name: "Edtech",
        blurb: "Koramangala and HSR Layout edtech — student-data isolation, KYC / age-gating and DPDP §16 overlay.",
      },
    ],
    deliverables: [
      "Manual-first pentest report with reproducible exploit code per High and Critical",
      "Multi-tenant authz evidence pack — every role-boundary exercise documented",
      "Cloud-native IaC misconfiguration replay (Terraform / IAM / KMS / Lambda)",
      "CI/CD pipeline takeover narrative with the exact GitHub Actions / GitLab / Buildkite path",
      "Identity-federation findings (SAML, OIDC, OAuth, JWT, SCIM) with reproducible repros",
      "OWASP LLM Top 10 (2025) findings on AI surfaces where in scope",
      "SOC 2 CC + ISO 27001:2022 Annex A + HIPAA §164.308-312 crosswalk inside the next audit window",
      "Vendor pack annex for US / EU enterprise customer security questionnaires",
    ],
    caseStudy: {
      industry: "Bengaluru-headquartered Series-C B2B SaaS (Whitefield) with US-enterprise customer base",
      scope: "Manual-first pentest — 11 services in the platform, AWS hub-and-spoke topology, GitHub Actions CI/CD, Okta SCIM federation, RAG-backed AI assistant. 4-week engagement, two onsite legs (Whitefield kickoff + Whitefield readout)",
      outcome: "Two cross-tenant BOLA paths in the customer-API closed pre-disclosure; one GitHub Actions OIDC trust misconfiguration that would have allowed any forked PR to mint AWS credentials, closed at D+5; one indirect-injection-via-RAG path that allowed exfil of a competitor-tenant's prompt history, closed and the corpus-isolation control redesigned; report shipped into the SOC 2 Type II audit window with zero customer-security-questionnaire follow-ups for the quarter.",
    },
    faqs: [
      {
        q: "How does your manual-first methodology differ from automated scanner output?",
        a: "Burp Pro, Caido and Nuclei run as supporting infrastructure — they map surface and catch easy wins. Every High and Critical finding is then manually validated and chained, with reproducible exploit code attached. The deliverable is what a senior consultant proved by hand, not what a scanner flagged. Most Bengaluru AppSec leads have read enough scanner reports to know the difference inside the first page.",
      },
      {
        q: "Will the report drop cleanly into our next SOC 2 Type II audit?",
        a: "Yes — finding-to-control mapping uses SOC 2 CC6 / CC7 / CC8 by default. Where ISO 27001:2022 and HIPAA also apply, the crosswalk is on the same page. Bengaluru SOC 2 Type II auditors (Prescient, A-LIGN, Sensiba, Cobalt's audit partners, the IIA-certified India boutiques) accept the report as evidence without rework.",
      },
      {
        q: "Do you cover AI / LLM application security?",
        a: "Yes — OWASP Top 10 for LLM Applications (2025) is the default catalogue for any AI surface in scope. We test direct and indirect prompt injection, tool-use abuse on agent reasoning, training-data exfil via inference-API probing, and corpus-isolation in RAG systems. Most Bengaluru product pentests in 2025 carry at least one LLM-specific finding.",
      },
      {
        q: "What is your stance on production testing vs staging only?",
        a: "Production is preferred where the safe-harbour clause and a controlled tenant exist. Staging is acceptable for AppSec-level coverage but misses real-traffic cloud-native paths (CI/CD takeover, IaC drift, KMS escalation). Most Bengaluru engagements run staging for coverage and a controlled production tenant for cloud-native and identity verification.",
      },
      {
        q: "Can the same pentest serve as the vendor pack for our US enterprise customers?",
        a: "Yes — every Bengaluru engagement ships a vendor-pack annex written in customer-security-questionnaire language (CAIQ, SIG, Shared Assessments). Sanitised exec summary, methodology document, lead consultant credentials, control catalogue crosswalk and a sample finding. Bengaluru product clients typically attach this to enterprise procurement responses without redaction.",
      },
      {
        q: "Do you offer continuous pentest if our release cadence is weekly?",
        a: "Yes — Bengaluru SaaS clients with weekly release trains often graduate from annual pentest to a continuous-pentest retainer. A senior consultant assigned month-on-month, regression coverage on every release, monthly executive summary and quarterly board pack. It is a separate SoW; the annual deep pentest stays in the calendar.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 12 · Gurugram × Penetration Testing
  // ─────────────────────────────────────────────────────────────────────
  {
    citySlug: "gurugram",
    serviceSlug: "penetration-testing",
    headline: "Penetration Testing in Gurugram · BFSI HQ & GCC",
    lead: "Adversary-simulation pentests for Gurugram BFSI HQs, insurers and 600+ GCC operations — Cyber City to Sohna, board-pack outputs.",
    body: [
      "Gurugram penetration testing is shaped by two buyer realities that no other Indian metro matches at the same density. First, the BFSI head-office cluster — private-bank HQs in DLF Phase 3, insurer HQs in Udyog Vihar and Sushant Lok, fintech in DLF Phase 5 and the Sohna belt — runs annual adversary-simulation engagements alongside the regulator-format VAPT. Second, the global-capability-centre (GCC) layer — Deloitte, Accenture, KPMG, EY, Genpact, Concentrix, plus 600+ smaller captives — runs pentest engagements that must pass a US / UK / EU parent's procurement standard, not just an Indian regulator's. Macksofy delivers both, with separate playbooks and a single Gurugram-onsite cadence.",
      "BFSI HQ pentests in Gurugram differ from Mumbai in three ways. The platform mix is heavier on Temenos T24, TCS BaNCS, Finacle and Flexcube than on RBI legacy mainframe systems — so privilege-escalation paths often run through the application-server layer (WebLogic, WebSphere, JBoss) and the database-tier (Oracle EBS, Db2, SQL Server) rather than through the AD-and-mainframe-RACF combination. The identity story is hybrid — on-premises Active Directory federated to Azure AD via AD Connect, often with a third-party privileged-access management (BeyondTrust, CyberArk, Delinea) layer that itself becomes a target. The third difference is regulator overlap — Gurugram-HQ insurers face IRDAI plus DPDP plus US-customer-driven HIPAA expectations when the parent or the reinsurer is US-based.",
      "Adversary-simulation scoping at Gurugram BFSI HQs typically lands on one of four objective shapes. 'Silent domain admin by D+10' is the most common — the bank wants to know if its EDR and detection content catch the kill chain before a tier-0 asset is touched. 'Reach the SWIFT gateway with the parent-control-catalogue safe-harbour intact' is second. 'Compromise the privileged-access-management vault without rotating' is third. 'Move from a Gurugram desktop to a Mumbai BCP site jump host' is fourth (cross-metro engagements are surprisingly common — the bank wants to verify segmentation between the Gurugram HQ network and the Mumbai DR estate).",
      "EDR-and-SIEM evasion is a Gurugram speciality because almost every HQ bank runs a tier-1 EDR stack — CrowdStrike Falcon, SentinelOne, Microsoft Defender for Endpoint, Trellix — and a tier-1 SIEM (Splunk Enterprise Security, Sentinel, QRadar). Our Gurugram bench is calibrated to operate under modern EDR telemetry: AMSI patching, ETW patching, syscall direct invocation, in-process LDAP queries instead of remote AD lookups, and a deliberate slow-burn timing that gives the SOC's analytics fair warning. Every successful step is paired with the SIEM detection content the SOC would have needed to catch us.",
      "Privileged-access-management compromise is a specific Gurugram BFSI capability. BeyondTrust, CyberArk and Delinea deployments in Gurugram-HQ banks are universally complex — credential vaults, session-recording, just-in-time elevation and break-glass workflows all worth testing. We exercise the PAM admin path, the session-replay-and-credential-extraction path, the just-in-time-bypass via approval-workflow timing, and the break-glass abuse path. PAM-vendor support contracts get notified ahead of testing per the engagement letter.",
      "GCC pentests in Gurugram look very different. The scope is set by the US / UK / EU parent's information-security policy, not the Indian regulator's. Methodology defaults to NIST SP 800-115 v2 (US), CREST CHECK (UK) or TIBER-EU (EU) framework alignment. The report drops into the parent's third-party-risk-management tool (Archer, ServiceNow IRM, ProcessUnity) directly. Findings are written in the parent's preferred language — 'high' and 'critical' instead of 'red' and 'amber', NIST CSF references rather than RBI clauses. Most Gurugram GCCs run two pentests a year — one for the Indian regulator footprint and one for the parent's standard.",
      "Cyber City and DLF Phase 3 procurement is unusual. Most engagements close through a CISO-and-board-cyber-committee-chair signoff with the head of internal audit copied, and a separate GC-signed engagement letter that handles trespass-and-deception, physical assessment indemnity and the parent-company-information-sharing waiver. Gurugram engagement letters typically also include a Haryana cyber-cell incident-coordination clause — if the engagement encounters genuinely actionable threat-actor activity during testing, the protocol with Haryana cyber-cell is pre-agreed. We have only triggered this clause twice in the last 24 months, but it is a Gurugram-specific requirement worth noting.",
      "Onsite cadence is anchored from Mumbai BKC senior consultants who fly to IGI (Aerocity is the operating base for Macksofy in Delhi NCR) and drive to Gurugram in 45 minutes. Cyber City, Udyog Vihar and Golf Course Road are reachable within an hour of landing. DLF Phase 1-5, Sushant Lok and the Sohna fintech cluster are within 90 minutes. For multi-quarter engagements we maintain an embedded Gurugram lead consultant. Engagement length is typically 4-6 weeks with two onsite legs (kickoff and readout) and weekly remote stand-ups in between.",
    ],
    buyerConcerns: [
      "BFSI HQ adversary-simulation against EDR and SIEM stacks (CrowdStrike, SentinelOne, Splunk ES, Sentinel)",
      "Temenos T24 / TCS BaNCS / Finacle / Flexcube application-server and database-tier privilege paths",
      "Hybrid identity — on-premises AD federated to Azure AD via AD Connect with PAM-vault targeting",
      "BeyondTrust / CyberArk / Delinea compromise paths including session-replay and break-glass abuse",
      "Cross-metro segmentation testing (Gurugram HQ ↔ Mumbai BCP) where in scope",
      "GCC parent-policy alignment — NIST SP 800-115 v2 (US), CREST CHECK (UK), TIBER-EU",
      "Parent third-party-risk-management tool drop-in (Archer, ServiceNow IRM, ProcessUnity)",
      "Haryana cyber-cell incident-coordination clause in the engagement letter",
      "Board-cyber-committee-grade reporting with quarterly trend narrative",
    ],
    differentiators: [
      "Two distinct playbooks under one firm — BFSI HQ adversary simulation vs GCC parent-policy alignment — same senior bench, separate methodology selection at kickoff.",
      "EDR-aware tradecraft calibrated to CrowdStrike, SentinelOne and Defender for Endpoint telemetry — AMSI / ETW patching, direct syscall invocation and in-process LDAP queries documented per kill chain.",
      "PAM compromise capability — BeyondTrust, CyberArk and Delinea session-replay, just-in-time-bypass and break-glass abuse paths in scope with vendor-support pre-notification.",
      "GCC engagements drop directly into the parent's TPRM tool (Archer, ServiceNow IRM, ProcessUnity) in the parent's preferred report format — no rework at the parent end.",
      "Cyber City to Sohna onsite SLA inside two hours from IGI landing; embedded Gurugram lead consultant for multi-quarter programmes.",
    ],
    seoDescription:
      "Adversary-simulation penetration testing in Gurugram for BFSI HQs, insurers and GCCs. EDR-aware tradecraft, Cyber City to Sohna onsite, NIST / CREST / TIBER-EU aligned.",
    keywords: [
      "penetration testing Gurugram",
      "Gurugram pentest BFSI",
      "DLF Cyber City pentest",
      "red team Gurugram",
      "EDR evasion pentest Gurugram",
      "GCC penetration testing Gurugram",
      "OSCP pentest Gurugram",
      "CyberArk pentest Gurugram",
      "NIST 800-115 pentest Gurugram",
    ],
    stats: [
      { value: "600+", label: "GCCs served in NCR" },
      { value: "EDR-aware", label: "CrowdStrike / S1 / Defender" },
      { value: "<2 hrs", label: "Cyber City onsite SLA" },
      { value: "NIST · CREST · TIBER", label: "Parent-standard alignment" },
    ],
    methodology: [
      {
        phase: "01 · Objective & Playbook Selection",
        activities: [
          "Joint kickoff with CISO, internal-audit head and (for GCCs) the parent's regional CISO",
          "BFSI HQ vs GCC playbook selection — methodology defaults to RBI MD-ITGRC + adversary simulation for BFSI, NIST/CREST/TIBER for GCC",
          "Engagement letter — trespass-and-deception, physical assessment indemnity, Haryana cyber-cell incident-coordination clause",
          "PAM-vendor pre-notification (BeyondTrust / CyberArk / Delinea) per the agreed scope",
        ],
      },
      {
        phase: "02 · Recon & Initial Access",
        activities: [
          "OSINT against Gurugram BFSI HQ staff and GCC parent footprint (LinkedIn, Bloomberg, Refinitiv)",
          "Spear-phish lure calibrated to the bank or GCC parent's quarterly news cycle",
          "Cyber City / Udyog Vihar / DLF tower-lobby tailgate where physical assessment is in scope",
          "Public-facing exploit-chain enumeration against Citrix NetScaler / Pulse / Fortinet / GlobalProtect edge",
        ],
      },
      {
        phase: "03 · EDR-Aware Tradecraft",
        activities: [
          "AMSI and ETW patching on Windows endpoints under EDR telemetry",
          "Direct syscall invocation via Hell's Gate / Halo's Gate variants where SSDT hooking exists",
          "In-process LDAP queries with C2-side reconstruction (no remote AD MS-DRSR traffic)",
          "Slow-burn cadence calibrated to the bank's SIEM analytics window",
        ],
      },
      {
        phase: "04 · Privilege Escalation & PAM",
        activities: [
          "ADCS ESC1-ESC8 enumeration on the on-premises forest and AAD-Connect-side path",
          "Temenos T24 / TCS BaNCS / Finacle / Flexcube application-server and database-tier privilege paths",
          "BeyondTrust / CyberArk / Delinea session-replay, JIT-bypass and break-glass abuse paths",
          "Cross-metro Gurugram HQ ↔ Mumbai BCP segmentation testing where in scope",
        ],
      },
      {
        phase: "05 · Parent-Standard Reporting",
        activities: [
          "BFSI report in RBI MD-ITGRC + IRDAI 2023 language, board-cyber-committee format",
          "GCC report drop-in to parent TPRM tool (Archer / ServiceNow IRM / ProcessUnity) in parent template",
          "EDR + SIEM detection content shipped as a deliverable with paired Sigma / SPL / KQL rules",
          "Quarterly trend narrative for the board-cyber-committee deck",
        ],
      },
    ],
    industries: [
      {
        name: "Private bank HQs",
        blurb: "DLF Phase 3 + Cyber City BFSI HQs — adversary-simulation against EDR / SIEM with board-cyber-committee outputs.",
      },
      {
        name: "Insurance HQs",
        blurb: "Udyog Vihar + Sushant Lok insurer HQs — claims-fraud and PAS-and-policy-admin objectives with IRDAI 2023 overlay.",
      },
      {
        name: "Fintech & lending",
        blurb: "DLF Phase 5 + Sohna fintech belt — partner-API and KYC-vendor objectives with RBI PA / NBFC clauses.",
      },
      {
        name: "Consulting & Big-4",
        blurb: "Cyber City Big-4 audit / consulting practices — internal-pentest of the consulting estate plus IP-protection objectives.",
      },
      {
        name: "Global capability centres",
        blurb: "600+ Gurugram GCCs — parent-policy-aligned pentest dropping directly into the parent's TPRM tool.",
      },
      {
        name: "Travel & e-commerce HQs",
        blurb: "Golf Course Road travel / e-commerce HQs — payment-stack, fraud and customer-data-exfil objectives.",
      },
    ],
    deliverables: [
      "Adversary-simulation report with kill-chain narrative and EDR / SIEM detection content paired per step",
      "BFSI HQ board-cyber-committee one-pager with quarterly trend",
      "GCC report drop-in to Archer / ServiceNow IRM / ProcessUnity in parent template",
      "PAM compromise narrative (BeyondTrust / CyberArk / Delinea) where in scope",
      "Sigma / Splunk SPL / Sentinel KQL detection content — 6-12 rules per engagement",
      "Cross-metro segmentation memo for Gurugram HQ ↔ Mumbai BCP scopes",
      "Free re-test of every Critical and High inside a 60-day window",
      "Joint SOC tabletop and follow-on retainer offer",
    ],
    caseStudy: {
      industry: "Gurugram-headquartered Tier-1 Private Bank (DLF Phase 3 corporate tower)",
      scope: "Adversary-simulation engagement — silent domain admin objective on the on-premises forest plus PAM-vault compromise path on a CyberArk deployment; 8-week engagement with three onsite legs (DLF Phase 3 kickoff, Udyog Vihar mid-review, Mumbai BCP segmentation leg)",
      outcome: "Silent domain admin via ADCS ESC4 path closed pre-disclosure; CyberArk session-replay-and-credential-extraction path closed and the vault deployment hardened; 9 missed SIEM use-cases written into Splunk ES and adopted by the SOC inside two weeks; cross-metro segmentation memo flagged three legacy firewall rules between Gurugram HQ and Mumbai BCP that were retired in the next change window.",
    },
    faqs: [
      {
        q: "Can you operate cleanly under our CrowdStrike / SentinelOne / Defender for Endpoint stack?",
        a: "Yes — the Gurugram bench is calibrated to modern EDR telemetry. We document the tradecraft (AMSI / ETW patching, direct syscall invocation, in-process LDAP queries) per kill-chain step and pair each step with the EDR alert that would have caught it. The deliverable doubles as an EDR-tuning input for your detection-engineering team.",
      },
      {
        q: "Do you target PAM (BeyondTrust / CyberArk / Delinea) in scope?",
        a: "Yes — Gurugram BFSI HQ pentests routinely include PAM compromise as an objective. Session-replay-and-credential-extraction, JIT-bypass via approval-workflow timing, and break-glass abuse paths are all in scope. PAM vendor support is pre-notified per the engagement letter.",
      },
      {
        q: "Can a single engagement satisfy both our Indian regulator and our US / UK / EU parent's pentest standard?",
        a: "For tightly-coupled GCC engagements, yes — we run one engagement with two report variants (Indian regulator format and parent standard format, NIST / CREST / TIBER as the parent demands). For BFSI HQs with both a parent overlay and an RBI / IRDAI demand, the regulatory submission and the adversary-simulation pentest are typically run as separate but coordinated engagements.",
      },
      {
        q: "How quickly can you mobilise senior consultants to Gurugram?",
        a: "Mumbai → IGI flight (2 hours) + Aerocity → Gurugram drive (45 minutes). Senior bench reaches Cyber City, Udyog Vihar or Golf Course Road inside three hours of mobilisation. DLF Phase 1-5, Sushant Lok and the Sohna belt are within 90 minutes of IGI. For sustained programmes we embed a Gurugram-resident lead consultant.",
      },
      {
        q: "What is the Haryana cyber-cell incident-coordination clause about?",
        a: "Every Gurugram engagement letter includes a pre-agreed protocol for the case where adversary-simulation testing encounters genuinely actionable threat-actor activity. The protocol covers SOC notification, Haryana cyber-cell coordination, evidence preservation and engagement-pause procedure. We have only triggered it twice in 24 months but it is a Gurugram-specific requirement worth noting.",
      },
      {
        q: "Will the report drop into our parent's TPRM tool (Archer / ServiceNow IRM / ProcessUnity) directly?",
        a: "Yes for GCC engagements. We produce the report in the parent's preferred template, the finding-to-control mapping in NIST CSF / CIS Controls / parent-specific catalogue, and the upload format the parent's TPRM tool expects. The parent's third-party-risk function typically signs off the engagement inside the same quarter with no rework.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 13 · Delhi × VAPT
  // ─────────────────────────────────────────────────────────────────────
  {
    citySlug: "delhi",
    serviceSlug: "vapt",
    headline: "VAPT Services in Delhi · Government, PSU & Ministry",
    lead: "CERT-In empanelled VAPT for central government, PSUs, ministries and Delhi-NCR fintech — GeM-listed, submission-format reporting.",
    body: [
      "Delhi VAPT is overwhelmingly a government and PSU procurement story — and the Indian central-government cybersecurity buyer is a fundamentally different customer from a private-sector BFSI buyer. Tendering routes through GeM (Government e-Marketplace), the Central Public Procurement Portal (CPPP) or the Defence e-Procurement portal where applicable. The buyer asks for a CERT-In empanelled vendor letter, the latest empanelment certificate, a GeM-listed vendor seller-ID, the ISO 27001:2022 and ISO 9001:2015 certificates, and a list of comparable central-government and PSU engagement experience. Macksofy carries all of these and has delivered VAPT engagements to central-government departments, public-sector banks, defence-adjacent organisations and Aadhaar ecosystem actors.",
      "Central-government VAPT scoping has its own shape. The asset inventory typically includes a citizen-facing portal (often hosted at *.gov.in, sometimes at *.nic.in for NIC-hosted workloads), a Bhashini-translated regional-language frontend, a Bharat-Aadhaar-authentication layer (AUA / KUA for Aadhaar-enabled identity verification, DigiLocker integration, eKYC API consumption), an API-gateway-of-India (APIGW) layer for inter-ministry data exchange, and a back-office mainframe or commercial-banking platform behind it. We map each component to its specific MeitY / CERT-In control set and crosswalk to the National Cyber Security Coordinator (NCSC) office's expectations where applicable.",
      "The Bharat / Aadhaar / DigiLocker / API-gateway-of-India scope is unique to Delhi and a Macksofy strength. Aadhaar-AUA / KUA VAPT requires UIDAI-aligned testing methodology — biometric-replay resistance, e-KYC consent-flow integrity, virtual-ID handling, the authentication-API rate-limit and the audit-log evidence requirement under the Aadhaar Authentication Regulations 2016 (as amended 2024). DigiLocker integration testing checks the OAuth scope handling against MeitY's DigiLocker partner-onboarding checklist. APIGW-of-India testing checks the inter-ministry consent-and-purpose-binding layer that MeitY rolled out under the Digital India ecosystem.",
      "PSU bank VAPT in Delhi is a hybrid — RBI's regulatory expectations (Cyber Security Framework, MD-ITGRC) combined with the Department of Financial Services (DFS) circular cadence and the Comptroller and Auditor General of India (CAG) audit overlay. PSU banks are unusual because the IT estate is heterogeneous (Finacle and BaNCS coexisting, legacy mainframe-RACF still in production, branch-network spread across 4,000-15,000 nodes), the procurement cycle is long, and the audit-committee oversight is split between the bank's board and the DFS as the majority shareholder. We size proposals accordingly — fixed-fee SoW with explicit milestone-based payments tied to CAG audit cycles, and a separate inspection-defence retainer for the DFS / RBI thematic-review cycle.",
      "Defence-adjacent and ministry-adjacent VAPT engagements have additional handling requirements — sometimes a security-clearance-equivalent for senior consultants, sometimes a no-cloud-data-transfer clause, sometimes an Indian-passport-only consultant requirement, and almost always an Indian-soil-data-residency requirement that we honour by default. Macksofy maintains an Indian-soil-only delivery option (no foreign-soil data egress) for these engagements, with attestation that satisfies the procuring department's information-security policy.",
      "Delhi-NCR fintech VAPT is the second buyer segment — different methodology, same firm. Delhi-NCR (especially the Connaught Place / Karol Bagh / Saket / South Extension corridor and the parts of Gurugram and Noida that fall under 'Delhi' in informal procurement language) hosts a layer of fintech, lending, payments and BNPL operators that buy VAPT under RBI master directions. The methodology is the same as our Mumbai BFSI VAPT — the difference is procurement (faster, CTO-and-AppSec-lead signoff) and onsite cadence (Connaught Place walk-in, Karol Bagh / Saket inside two hours, Noida and Gurugram via the Yamuna Expressway or DND).",
      "GeM tendering reality matters. Most central-government engagements close via GeM's reverse auction or BoQ-based bidding. Pricing transparency, the GeM seller-ID, the empanelment certificate and the comparable engagement experience are the four levers that decide the L1 outcome. Macksofy maintains a Delhi-resident bid-desk for active GeM tender response within the portal's 7-21 day windows. Procurement on PSU engagements is slower (3-6 months from RFP to PO) but the engagement length is longer (12-18 months from initial VAPT to follow-on retest cycles) so the lifetime value of a PSU-bank or ministry relationship is high.",
      "Onsite cadence is dictated by Delhi geography. Connaught Place, ITO and the central-government secretariat belt are walk-in same day from Aerocity. Saket, South Extension and the ministry-adjacent zones inside the ring road are within 90 minutes. Noida (Sectors 16, 18, 62) and Greater Noida are via Yamuna Expressway in 60-90 minutes. Gurugram (Cyber City, DLF) is via NH-48 in 60-75 minutes. PSU bank head-office visits in Connaught Place or Bhavan-area secretariat addresses are walk-in. For multi-quarter ministry engagements we maintain a Delhi-resident lead consultant.",
    ],
    buyerConcerns: [
      "CERT-In empanelment certificate, GeM seller-ID and comparable central-government engagement experience",
      "MeitY / NCSC office submission-format VAPT reporting for ministries",
      "UIDAI-aligned Aadhaar AUA / KUA testing methodology and Aadhaar Authentication Regulations 2016 evidence",
      "DigiLocker partner-onboarding checklist coverage where DigiLocker integration is in scope",
      "API-gateway-of-India (APIGW) consent-and-purpose-binding layer testing",
      "PSU bank RBI CSF + DFS circular + CAG audit overlay reconciliation",
      "Indian-passport-only consultant and Indian-soil-data-residency attestation for defence-adjacent engagements",
      "GeM tender response inside the portal's 7-21 day window with bid-desk presence in Delhi",
      "PSU-grade milestone payments tied to CAG audit cycles",
    ],
    differentiators: [
      "CERT-In empanelled + GeM-listed + Delhi-resident bid-desk for active tender response inside GeM's 7-21 day window.",
      "UIDAI-aligned Aadhaar AUA / KUA testing methodology with biometric-replay, consent-flow integrity, virtual-ID and audit-log evidence under Aadhaar Authentication Regulations 2016.",
      "Indian-soil-only delivery option (no foreign-soil data egress) with attestation for defence-adjacent and ministry engagements.",
      "Bharat / DigiLocker / APIGW-of-India scope expertise — Digital India ecosystem testing not available from generic VAPT vendors.",
      "PSU-grade milestone payments aligned to CAG audit cycles and a separate inspection-defence retainer for DFS / RBI thematic-review cycles.",
    ],
    seoDescription:
      "CERT-In empanelled VAPT services in Delhi for central government, PSUs, ministries and Delhi-NCR fintech. GeM-listed, Aadhaar / DigiLocker / APIGW scope, Indian-soil delivery option.",
    keywords: [
      "VAPT Delhi",
      "government VAPT Delhi",
      "PSU bank VAPT Delhi",
      "CERT-In auditor Delhi",
      "GeM VAPT vendor Delhi",
      "Aadhaar AUA KUA VAPT",
      "DigiLocker VAPT",
      "ministry cybersecurity audit Delhi",
      "Delhi central government pentest",
    ],
    stats: [
      { value: "GeM listed", label: "Government procurement" },
      { value: "12+", label: "PSU / ministry engagements" },
      { value: "Indian-soil", label: "Delivery option available" },
      { value: "<2 hrs", label: "Central Delhi onsite SLA" },
    ],
    methodology: [
      {
        phase: "01 · Tender & Scope",
        activities: [
          "GeM / CPPP / Defence e-Procurement bid response with empanelment certificate, seller-ID and comparable engagement list",
          "Joint kickoff with the procuring department's IT secretary or DGS&D representative",
          "Indian-soil-only delivery attestation and Indian-passport-only consultant deployment where required",
          "MeitY / NCSC office submission-format reporting selected at kickoff",
        ],
      },
      {
        phase: "02 · Asset & Ecosystem Map",
        activities: [
          "Citizen-portal, regional-language frontend, Aadhaar AUA / KUA, DigiLocker and APIGW component inventory",
          "PSU bank Finacle / BaNCS / RACF inventory reconciliation with the bank's IT estate",
          "External attack-surface mapping limited to Indian-soil tooling (no foreign-soil data egress)",
          "MeitY / CERT-In / NCSC control crosswalk to the asset inventory",
        ],
      },
      {
        phase: "03 · Aadhaar / DigiLocker / APIGW Testing",
        activities: [
          "Biometric-replay resistance, eKYC consent-flow integrity and virtual-ID handling per UIDAI methodology",
          "Aadhaar authentication-API rate-limit and audit-log evidence under Authentication Regulations 2016",
          "DigiLocker OAuth scope handling against MeitY partner-onboarding checklist",
          "APIGW inter-ministry consent-and-purpose-binding layer testing with Digital India ecosystem mapping",
        ],
      },
      {
        phase: "04 · PSU / Ministry Reporting",
        activities: [
          "MeitY / NCSC submission-format report with control-by-control crosswalk",
          "PSU bank RBI CSF + DFS circular + CAG audit overlay reconciliation document",
          "Department-specific information-security-policy alignment annex",
          "Indian-soil-only delivery attestation signed by Macksofy authorised signatory",
        ],
      },
      {
        phase: "05 · Re-test & Inspection-Defence",
        activities: [
          "Re-test of every Critical and High inside the procurement-defined remediation window",
          "DFS / RBI thematic-review inspection-defence retainer for PSU banks",
          "CAG audit-cycle milestone payment release per the PO terms",
          "Ministry-side post-engagement risk-register sync where the department maintains one",
        ],
      },
    ],
    industries: [
      {
        name: "Central government departments",
        blurb: "Citizen-portal, regional-language frontend, Aadhaar AUA / KUA and APIGW scopes — MeitY / NCSC submission-format reporting.",
      },
      {
        name: "Public-sector banks",
        blurb: "PSU bank Finacle / BaNCS estates — RBI CSF + DFS circular + CAG audit overlay reconciliation.",
      },
      {
        name: "Defence-adjacent organisations",
        blurb: "Indian-soil-only delivery, Indian-passport-only consultants and security-clearance-equivalent senior bench.",
      },
      {
        name: "Aadhaar ecosystem actors",
        blurb: "AUA / KUA / Sub-AUA entities — UIDAI methodology, Authentication Regulations 2016 evidence, virtual-ID handling.",
      },
      {
        name: "Delhi-NCR fintech & lending",
        blurb: "Connaught Place / Karol Bagh / Saket fintech — RBI master direction VAPT with fast CTO-and-AppSec-lead signoff.",
      },
      {
        name: "State PSUs (Delhi Govt)",
        blurb: "Delhi Government IT department and DJB / DTC-adjacent IT estates — state-procurement-portal VAPT with MeitY format.",
      },
    ],
    deliverables: [
      "VAPT report in CERT-In empanelled + MeitY / NCSC submission format with department-specific control crosswalk",
      "Aadhaar AUA / KUA Authentication Regulations 2016 evidence pack where in scope",
      "DigiLocker partner-onboarding checklist coverage where DigiLocker integration is in scope",
      "APIGW consent-and-purpose-binding layer testing memo for Digital India ecosystem actors",
      "PSU bank RBI CSF + DFS + CAG overlay reconciliation document",
      "Indian-soil-only delivery attestation signed by Macksofy authorised signatory",
      "GeM-portal-compatible bid response and engagement closure documentation",
      "Free re-test of every Critical and High inside the procurement-defined remediation window",
    ],
    caseStudy: {
      industry: "Central Government Ministry (Citizen-Services Portal with Aadhaar AUA + DigiLocker Integration)",
      scope: "End-to-end VAPT — citizen-portal (Hindi + 8 regional-language Bhashini frontends), Aadhaar AUA / KUA layer, DigiLocker OAuth integration, APIGW-of-India inter-ministry consent layer; Indian-soil-only delivery; 8-week engagement",
      outcome: "Six Aadhaar AUA authentication-API rate-limit gaps closed pre-disclosure; two DigiLocker OAuth scope-handling issues closed in coordination with MeitY's DigiLocker team; one APIGW consent-and-purpose-binding bypass closed; report accepted by the ministry's IT secretary on first read and submitted to CERT-In without clarification request.",
    },
    faqs: [
      {
        q: "Are you GeM-listed and CERT-In empanelled for central-government tenders?",
        a: "Yes — Macksofy is a GeM-listed cybersecurity services vendor and a CERT-In empanelled auditor. We hold the seller-ID, the empanelment certificate (latest cycle), ISO 27001:2022 and ISO 9001:2015. We respond to GeM tenders within the portal's 7-21 day windows via our Delhi-resident bid-desk.",
      },
      {
        q: "Can you offer Indian-soil-only delivery (no foreign-soil data egress)?",
        a: "Yes — for defence-adjacent and ministry engagements that require it, we deploy Indian-passport-only senior consultants and run the engagement on Indian-soil tooling and storage only. We provide a signed attestation that satisfies the procuring department's information-security policy.",
      },
      {
        q: "Do you handle Aadhaar AUA / KUA scope per UIDAI methodology?",
        a: "Yes. The Aadhaar Authentication Regulations 2016 (as amended) define a specific methodology — biometric-replay resistance, eKYC consent-flow integrity, virtual-ID handling, authentication-API rate-limit and audit-log evidence. We deliver in that exact format with the evidence pack the UIDAI Authentication-Service-Operations team accepts.",
      },
      {
        q: "Will your VAPT close a PSU bank's RBI CSF, DFS circular and CAG audit overlay in one engagement?",
        a: "Yes — we crosswalk the same evidence to all three. The RBI CSITE Cell, the Department of Financial Services and the CAG each read the relevant slice without separate audits. Milestone payments are tied to CAG audit cycles per the PO terms.",
      },
      {
        q: "How do you handle MeitY / NCSC office submission format?",
        a: "MeitY and NCSC office expect VAPT reports in a specific format with control-by-control crosswalk to the department's information-security policy and a department-side risk-register sync. Our Delhi bench has shipped this format repeatedly; we maintain templates against the current MeitY guidelines for citizen-portal, APIGW and Aadhaar-integrated scopes.",
      },
      {
        q: "Can you serve Delhi-NCR fintech alongside central-government engagements?",
        a: "Yes — same firm, different bench. Delhi-NCR fintech (Connaught Place / Karol Bagh / Saket and the Noida / Gurugram corridors that fall under 'Delhi' in informal procurement language) gets the same RBI master direction VAPT methodology we run in Mumbai, with faster CTO-and-AppSec-lead signoff and same-day Connaught Place / Saket onsite cadence.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 14 · Bengaluru × Red Teaming
  // ─────────────────────────────────────────────────────────────────────
  {
    citySlug: "bengaluru",
    serviceSlug: "red-teaming",
    headline: "Red Teaming in Bengaluru · SaaS, Product & GCC",
    lead: "MITRE ATT&CK-aligned red-team engagements for Bengaluru SaaS, product and GCC clients — EDR evasion, purple-team integration.",
    body: [
      "Bengaluru red-teaming is driven by a single procurement reality: US and EU enterprise customers, parent boards and SOC 2 Type II auditors increasingly expect a recent red-team report alongside the annual pentest. The Bengaluru product CTO is not buying compliance theatre — they are buying an honest answer to 'if a motivated FIN-style or APT-style actor went after us today, how far would they get and would we notice?'. Macksofy's Bengaluru red-team bench is built for that question, with MITRE ATT&CK-aligned operations, EDR-evasion tradecraft current to 2026, and purple-team integration with the customer's SOC and detection-engineering function from day one.",
      "Threat-actor emulation is the starting point. Every Bengaluru red-team begins with a threat-model conversation: who would target this product, why, and what would they try first? The answer feeds a calibrated emulation plan. For a SaaS handling US healthcare PHI, that typically means a FIN-style ransomware actor (Conti / LockBit-2 / BlackCat lineage emulation). For a fintech, it means an APT-style state-adjacent actor (APT41 / Lazarus / FIN13 elements). For an AI-product startup, it increasingly means a customer-data-exfil actor with prompt-injection and supply-chain elements. The plan is signed by the CTO, the CISO and the head of customer security before the operations team is informed (or, in a blind engagement, kept blind).",
      "Initial-access vectors on a Bengaluru red-team typically run one of three lanes. Spear-phish against engineering and finance (the highest-yield in our 2025-2026 engagements) — the lure calibrated to the product's release cadence or the next funding announcement. Cloud-key compromise via a leaked secret (we usually find one via OSINT — a forgotten Pastebin, an accidentally-public Postman collection, a leaked CI environment variable). Vendor-portal compromise via a smaller SaaS the customer depends on (the third-party-trust-chain attack remains under-covered by most pentests). Initial access is documented as a one-page narrative for the board pack.",
      "Cloud post-exploitation is the operational core. Most Bengaluru SaaS estates live on AWS or GCP, with a hub-and-spoke account topology. We exercise IAM Pass Role escalation, S3 bucket-policy abuse, KMS key-policy escalation, Lambda execution-role lateral movement, Secrets Manager / KMS-encrypted-Parameter-Store extraction, and the CI/CD pipeline takeover lane (GitHub Actions OIDC token theft is the highest-leverage path into a modern SaaS estate). Every step is paired with the CloudTrail / GuardDuty / Security-Hub / Wiz / Lacework alert that would have caught us — that pairing is the deliverable.",
      "EDR evasion is current to 2026. Bengaluru product clients overwhelmingly run CrowdStrike Falcon, SentinelOne or Microsoft Defender for Endpoint. Our tradecraft is calibrated to each: AMSI patching, ETW patching, direct syscall invocation (Hell's Gate / Halo's Gate variants), in-process LDAP queries to avoid MS-DRSR telemetry, payload-staging via cloud-trusted CDNs (CloudFront / Cloud CDN / Fastly) and BYOVD where the engagement letter permits. Every evasion step is reconciled against the EDR sensor's actual telemetry post-engagement so the detection-engineering team has the artefacts to tune rules.",
      "Purple-team integration is the closing pillar. Bengaluru product clients are unusual in that their detection-engineering function is often a one-or-two-person team inside platform-engineering, and a six-week red-team without follow-up is wasted on them. Every Macksofy Bengaluru red-team includes a paired detection-engineering analyst embedded with the customer's blue-team for the closing week — joint SOC tabletop with kill-chain replay in operator-console order, 8-15 production-ready detection rules authored against the customer's SIEM (Splunk, Sentinel, Sumo Logic, Datadog Cloud SIEM, Panther), and a quarterly purple-team retainer offer if the engagement reveals enough detection-content debt.",
      "Procurement reality matters. Most Bengaluru product red-team engagements close through the CTO, the CISO and the head of customer security in a single weekly sync, plus a one-page engagement letter from General Counsel covering trespass-and-deception, cloud-provider safe-harbour and the parent-company-information-sharing waiver. AWS, GCP and Azure customer-portal acceptable-use clauses are reviewed pre-engagement and documented. For Bengaluru GCC clients of US-headquartered Fortune 500s, the engagement letter aligns to the US parent's red-team standard (TIBER-EU for European parents, CBEST or CREST STAR for UK parents, CISA / NIST 800-115 v2 derivative for US parents).",
      "Onsite cadence is light. Bengaluru engineering teams are async — weekly Slack stand-ups, Linear/Jira tickets, async PR reviews — and the closest analogue for a red-team is a daily async stand-up plus a midpoint and closing onsite. Senior consultants fly Mumbai → BLR for kickoff (Whitefield, Manyata or Outer Ring Road client offices), a mid-engagement readout, and a closing purple-team tabletop. The rest runs remote via the engagement's secure operations channel (Mattermost / Element / Signal). Engagement length is typically 5-7 weeks — 1 week threat-model and recon, 3-4 weeks active operations, 1-2 weeks reporting and purple-team integration.",
    ],
    buyerConcerns: [
      "Threat-actor emulation plan signed by CTO + CISO + head of customer security before operations begin",
      "MITRE ATT&CK-aligned operations with technique-by-technique reconciliation",
      "Cloud post-exploitation depth — IAM Pass Role, KMS escalation, Lambda lateral, Secrets Manager extraction, CI/CD takeover",
      "EDR evasion current to 2026 against CrowdStrike, SentinelOne and Defender for Endpoint",
      "Purple-team integration with paired detection-engineering analyst for the closing week",
      "8-15 production-ready detection rules per engagement against the customer's SIEM (Splunk / Sentinel / Sumo / Datadog / Panther)",
      "AWS / GCP / Azure customer-portal acceptable-use clause review pre-engagement",
      "Parent-company red-team standard alignment (TIBER-EU / CBEST / CREST STAR / NIST 800-115 v2)",
      "CISO and customer-security-questionnaire-grade executive summary for enterprise procurement",
    ],
    differentiators: [
      "Threat-actor emulation plan calibrated to the product's threat model — FIN-style for SaaS-PHI, APT-style for fintech, customer-data-exfil for AI product.",
      "Cloud-native post-exploitation depth — IAM Pass Role, KMS escalation, Lambda lateral, Secrets Manager extraction, CI/CD takeover paired with the CloudTrail / GuardDuty alert that would have caught us.",
      "EDR evasion tradecraft current to 2026 — AMSI / ETW patching, direct syscall invocation, in-process LDAP, payload-staging via trusted CDNs — reconciled post-engagement with the customer's EDR sensor telemetry.",
      "Purple-team integration as a deliverable — paired detection-engineering analyst with the blue-team for the closing week, 8-15 production-ready detection rules authored against the customer's SIEM.",
      "Parent-company standard alignment — TIBER-EU for European parents, CBEST / CREST STAR for UK, NIST 800-115 v2 for US — same operations team, deliverable format selected at kickoff.",
    ],
    seoDescription:
      "MITRE ATT&CK-aligned red-team engagements in Bengaluru for SaaS, product and GCC clients. EDR evasion, cloud post-exploitation, purple-team integration. TIBER-EU / CBEST / CREST aligned.",
    keywords: [
      "red team Bengaluru",
      "red teaming services Bengaluru",
      "adversary emulation Bengaluru",
      "MITRE ATT&CK red team Bengaluru",
      "cloud red team AWS Bengaluru",
      "EDR evasion Bengaluru",
      "purple team Bengaluru",
      "CRTO red team Bengaluru",
      "Bengaluru SaaS red team",
    ],
    stats: [
      { value: "MITRE ATT&CK", label: "Aligned operations" },
      { value: "8-15 rules", label: "Detection content per engagement" },
      { value: "AWS · GCP · Azure", label: "Cloud-native bench" },
      { value: "5-7 wks", label: "Typical engagement length" },
    ],
    methodology: [
      {
        phase: "01 · Threat Model & Plan",
        activities: [
          "Joint kickoff with CTO, CISO and head of customer security; emulation plan calibrated to product threat model",
          "Threat-actor selection — FIN / APT / customer-data-exfil profiles with technique-level emulation plan",
          "Rules-of-engagement letter — trespass-and-deception, cloud-provider safe-harbour, parent-information-sharing waiver",
          "Blind / informed mode selection — operations SOC blind for realism, white-cell sub-team informed",
        ],
      },
      {
        phase: "02 · Recon & Initial Access",
        activities: [
          "OSINT against engineering, finance and the product's customer-success function",
          "Leaked-secret enumeration (Pastebin, Postman, GitHub gists, leaked CI environment variables)",
          "Spear-phish lure calibrated to product release cadence or funding-announcement cycle",
          "Vendor-portal compromise via the customer's smaller SaaS dependencies (third-party-trust-chain)",
        ],
      },
      {
        phase: "03 · Cloud Post-Exploitation",
        activities: [
          "IAM Pass Role, S3 bucket-policy and KMS key-policy escalation paths",
          "Lambda execution-role lateral movement and Secrets Manager / Parameter Store extraction",
          "CI/CD pipeline takeover via GitHub Actions OIDC, GitLab runner privilege or Buildkite agent",
          "CloudTrail / GuardDuty / Wiz / Lacework alert pairing per kill-chain step",
        ],
      },
      {
        phase: "04 · EDR-Aware Endpoint Operations",
        activities: [
          "AMSI / ETW patching, direct syscall invocation, in-process LDAP queries against the customer's AD",
          "Payload-staging via trusted CDNs (CloudFront / Cloud CDN / Fastly) — engagement letter permitting",
          "BYOVD where the engagement letter permits and the customer's EDR baseline tolerates",
          "Post-engagement EDR-sensor-telemetry reconciliation for the detection-engineering team",
        ],
      },
      {
        phase: "05 · Purple-Team Integration & Reporting",
        activities: [
          "Joint SOC tabletop with kill-chain replay in operator-console order with the blue-team",
          "8-15 production-ready detection rules authored against the customer's SIEM",
          "Encrypted double-key board-pack delivery to CTO + CISO + audit-committee chair",
          "Quarterly purple-team retainer offer where detection-content debt is significant",
        ],
      },
    ],
    industries: [
      {
        name: "B2B SaaS (Series-C to public)",
        blurb: "Whitefield, ORR and Outer Ring Road product companies — full red-team with cloud post-exploitation depth.",
      },
      {
        name: "Fintech (RBI-regulated)",
        blurb: "Indiranagar / Koramangala fintech — APT-style emulation with RBI master direction overlay where applicable.",
      },
      {
        name: "Healthtech / US-PHI SaaS",
        blurb: "Manyata and Bagmane Tech Park healthtech — FIN-style ransomware emulation with HIPAA evidence pack.",
      },
      {
        name: "AI / LLM product",
        blurb: "Indiranagar AI startups — customer-data-exfil and prompt-injection / corpus-isolation emulation.",
      },
      {
        name: "Global capability centres",
        blurb: "Bengaluru GCCs — parent-standard red-team (TIBER-EU / CBEST / CREST STAR / NIST) with parent TPRM drop-in.",
      },
      {
        name: "Enterprise SaaS for US / EU buyers",
        blurb: "Bengaluru SaaS selling into US-Fortune-500 buyers — customer-security-questionnaire-grade exec summary.",
      },
    ],
    deliverables: [
      "Threat-actor emulation plan signed off at kickoff",
      "Kill-chain narrative with MITRE ATT&CK technique-by-technique reconciliation",
      "Cloud post-exploitation memo with CloudTrail / GuardDuty / Wiz alert pairing per step",
      "EDR-evasion tradecraft document with sensor-telemetry reconciliation for the detection-engineering team",
      "8-15 production-ready detection rules against the customer's SIEM (Splunk / Sentinel / Sumo / Datadog / Panther)",
      "Purple-team SOC tabletop session with operator-console kill-chain replay",
      "Parent-standard report variant where the engagement is for a GCC (TIBER-EU / CBEST / CREST / NIST)",
      "Customer-security-questionnaire-grade sanitised exec summary for enterprise procurement",
    ],
    caseStudy: {
      industry: "Bengaluru-headquartered Series-D B2B SaaS with US-Fortune-500 customer base (Whitefield HQ)",
      scope: "Six-week red-team — FIN-style threat-actor emulation; objective: silent reach of the customer-data warehouse without SOC detection by D+15; AWS hub-and-spoke topology, CrowdStrike Falcon endpoint, Datadog Cloud SIEM, GitHub Actions CI/CD; blind operations SOC, white-cell of CTO + CISO + customer-security head + GC",
      outcome: "Objective met at D+11 via GitHub Actions OIDC trust misconfiguration → IAM Pass Role escalation → Athena query against the customer warehouse; 12 missed Datadog Cloud SIEM use-cases reconciled; 11 paired detection rules adopted by the customer SOC inside two weeks; one CI/CD trust path closed pre-disclosure that would have allowed any forked PR to mint production AWS credentials; report shipped as the customer-security-questionnaire annex for the next 12 months of enterprise procurement.",
    },
    faqs: [
      {
        q: "How does a red-team differ from your manual pentest?",
        a: "A pentest is scoped against an asset list and graded by finding-coverage. A red-team is scoped against a single objective (reach the customer warehouse, mint balance, compromise the model repository) and graded by whether the objective was met, how, in what time, with what detection coverage. Most Bengaluru product clients in 2025-2026 buy both — annual pentest for AppSec depth, annual red-team for adversary realism and detection-content quality.",
      },
      {
        q: "Will your operations stay clean under our CrowdStrike / SentinelOne / Defender for Endpoint stack?",
        a: "Yes — the Bengaluru bench is calibrated to modern EDR telemetry. We document the tradecraft (AMSI / ETW patching, direct syscall invocation, in-process LDAP, trusted-CDN payload staging) per kill-chain step and reconcile post-engagement against the actual sensor telemetry so the detection-engineering team has the artefacts to tune rules.",
      },
      {
        q: "Can you align to a US / UK / EU parent's red-team standard?",
        a: "Yes — TIBER-EU for European parents, CBEST or CREST STAR for UK parents, CISA / NIST SP 800-115 v2 derivative for US parents. Operations are the same; the deliverable format and the technique-to-control mapping is selected at kickoff. The GCC engagement drops directly into the parent's TPRM tool with no rework.",
      },
      {
        q: "Do you cover AI / LLM red-team for AI-product startups?",
        a: "Yes — customer-data-exfil via prompt-injection (direct + indirect via RAG), training-data exfil via inference-API probing, agent-tool-use abuse and corpus-isolation testing are in scope for AI-product engagements. The OWASP Top 10 for LLM Applications (2025) is the default catalogue and findings map directly onto the customer's AI threat model.",
      },
      {
        q: "How long is a typical Bengaluru red-team and can we run it blind?",
        a: "5-7 weeks. Blind operations SOC mode is standard — only a white-cell sub-team (CTO + CISO + customer-security head + GC) knows the engagement is live. The operations SOC joins the purple-team tabletop in the closing week with the kill-chain replay so the learning is real, not theatrical.",
      },
      {
        q: "Do you offer a continuous purple-team retainer after the engagement?",
        a: "Yes for clients where the engagement reveals enough detection-content debt to justify it. The retainer ships monthly detection content into the customer's SIEM, runs a quarterly mini-red-team for regression, and a half-yearly tabletop for the engineering leadership team. It is a separate SoW; the annual deep red-team stays in the calendar.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 15 · Hyderabad × Managed SOC
  // ─────────────────────────────────────────────────────────────────────
  {
    citySlug: "hyderabad",
    serviceSlug: "managed-soc",
    headline: "Managed SOC in Hyderabad · Pharma, GCC & HITEC City",
    lead: "24×7 SIEM-led managed SOC for Hyderabad pharma, US-healthcare GCCs and HITEC City SaaS — GxP, HIPAA and DPDP-aware detection content.",
    body: [
      "Hyderabad's managed-SOC buyer is bimodal in a way no other Indian metro matches. Genome Valley and the Patancheru–Bachupally pharma corridor wants a SOC that understands GxP data integrity, eTMF audit-trail tamper detection and lab-instrument anomaly monitoring — generic 'log all the things' SIEM content fails the next FDA inspection. HITEC City and Gachibowli's SaaS, fintech and US-healthcare GCC layer wants a SOC that produces SOC 2 CC7 evidence on demand and ships HIPAA Security Rule §164.308–312 monitoring artefacts. Macksofy's Hyderabad managed-SOC is engineered around exactly this split — a single 24×7 operation, two pre-built detection-content libraries, regional senior bench rooted in HITEC City.",
      "The operating model is SIEM-led, EDR-aware and identity-grounded. The customer's existing SIEM (Splunk Enterprise Security, Microsoft Sentinel, IBM QRadar, Elastic Security, Sumo Logic Cloud SIEM) is the primary canvas and Macksofy ships custom detection content into it on day one. EDR (CrowdStrike Falcon, SentinelOne, Microsoft Defender for Endpoint, Trellix) and IDP (Okta, Microsoft Entra ID, Auth0, Google Workspace, AWS Cognito) telemetry feeds the SIEM. We do not insist on a Macksofy-proprietary SIEM — vendor lock-in is the buyer's risk to manage. We ship our detection-content library in vendor-native rule format (SPL for Splunk ES, KQL for Sentinel, ESQL for Elastic, AQL for QRadar) so the customer keeps full ownership.",
      "Pharma-specific detection content is the headline capability. Our Genome Valley library has 140+ pre-built use-cases — eTMF audit-trail disable attempts, ALCOA+ contemporaneity drift, LIMS data-export spike anomalies, CDS workstation (Empower / LabSolutions / OpenLAB) credential-share detection, HPLC time-sync drift correlated to instrument-workstation login, USB-mass-storage policy bypass on QC lab endpoints, and the regulated-data-egress paths that USFDA inspectors prioritise. Every use-case maps to 21 CFR Part 11 §11.10 clauses or EU GMP Annex 11 paragraphs so the QA director sees the evidence in the language they read.",
      "HITEC City SaaS and US-healthcare GCC content is the second library — built for SOC 2 Type II CC7 evidence and HIPAA Security Rule monitoring. Multi-tenant authz anomaly detection (tenant-A-accessing-tenant-B patterns), OAuth-and-SAML federation anomaly, JWT algorithm-confusion attempts, AWS / GCP IAM anomaly (assume-role spikes, Pass Role abuse, KMS key-policy modification), CI/CD pipeline anomaly (GitHub Actions OIDC token abuse, GitLab runner privilege spikes) and the customer-data-egress paths that SOC 2 auditors and US-healthcare procurement teams look for. Every use-case maps to SOC 2 CC6 / CC7 / CC8 + HIPAA §164.308–312 control IDs.",
      "Tier structure is calibrated to Hyderabad demand. Tier-1 (24×7 analyst) handles alert triage, false-positive suppression and the standard incident-response runbooks. Tier-2 (8×5 senior analyst) handles complex correlation, threat-hunting and the deeper investigative work. Tier-3 (on-call DFIR specialist) handles confirmed incidents, malware-reverse and the post-incident forensics. The Hyderabad regional hub at HITEC City means Tier-2 and Tier-3 are physically resident in the city — pharma plant or HITEC City office onsite arrival inside two hours, Genome Valley onsite inside 90 minutes. For US-healthcare GCC clients with US-parent reporting needs, we maintain a US-hour-aligned shift handover with the customer's US SOC counterpart.",
      "DPDP Act §16 cross-border-transfer monitoring is a 2026 differentiator. Pharma sponsors based in the US or EU now require their Indian CRO and pharma R&D partners to maintain monitoring evidence of where regulated personal data flows — explicit detection content for sponsor-data egress from the Indian estate, consent-flow integrity monitoring on eTMF withdrawals, and the cross-border-transfer-control evidence DPDP §16 demands. The Macksofy Hyderabad SOC ships this monitoring as part of the base detection-content library.",
      "Procurement reality matters. Hyderabad pharma engagements close through the IT head and the QA director (because anything touching eTMF or LIMS is QA-jurisdictional), often with the plant operations head copied if OT systems are in scope. HITEC City SaaS and US-healthcare GCC procurement closes through the CISO and the AppSec lead, sometimes with the US parent's regional CISO copied. We size the SoW to match — a fixed-fee monthly retainer with a clear bring-your-own-SIEM model, three tiered analyst layers, monthly executive summary, quarterly board pack and a half-yearly purple-team exercise.",
      "Onboarding cadence is structured. Day 0-7 — joint kickoff (HITEC City onsite for SaaS / GCC, plant-onsite for pharma), telemetry source inventory, SIEM access provisioning. Day 8-21 — detection-content shipment, baseline tuning, false-positive suppression. Day 22-30 — go-live, first executive summary, runbook review with the customer's IT and (for pharma) QA team. Steady-state — monthly executive summary, quarterly board pack, half-yearly purple-team exercise with the Macksofy red-team bench, and an annual SOC 2 Type II + HIPAA evidence-pack delivery for the customer's compliance team.",
    ],
    buyerConcerns: [
      "24×7 SIEM-led detection without vendor lock-in — bring-your-own Splunk ES / Sentinel / QRadar / Elastic / Sumo",
      "Pharma-specific detection content (140+ use-cases) — eTMF, ALCOA+, LIMS, CDS, HPLC anomaly",
      "SaaS and US-healthcare GCC content — SOC 2 CC + HIPAA §164.308–312 evidence on demand",
      "Multi-tenant authz anomaly, OAuth / SAML federation anomaly and IAM-spike detection",
      "DPDP Act §16 cross-border-transfer monitoring for sponsor-data egress",
      "Tiered analyst structure — T1 24×7, T2 8×5, T3 on-call DFIR with onsite SLA",
      "HITEC City Tier-2/3 residency for sub-two-hour onsite arrival",
      "US-hour shift-handover for US-parent reporting cadence",
      "Monthly exec summary, quarterly board pack, half-yearly purple-team and annual SOC 2 / HIPAA evidence pack",
    ],
    differentiators: [
      "Two pre-built detection-content libraries — 140+ pharma use-cases mapped to 21 CFR Part 11 / GMP Annex 11, and SaaS / HIPAA content mapped to SOC 2 CC + §164.308-312.",
      "Bring-your-own SIEM model — content shipped in vendor-native format (SPL / KQL / ESQL / AQL) so the customer keeps ownership and avoids lock-in.",
      "Tier-2 and Tier-3 analysts physically resident at HITEC City — sub-two-hour onsite SLA across Madhapur, Gachibowli, Banjara Hills, Kondapur and Genome Valley.",
      "DPDP Act §16 cross-border-transfer monitoring shipped in the base library — sponsor-data egress, consent-flow integrity and CBT-control evidence built in.",
      "Half-yearly purple-team exercise with the Macksofy red-team bench — detection content stays sharp, not stale.",
    ],
    seoDescription:
      "24×7 managed SOC in Hyderabad for pharma, US-healthcare GCC and HITEC City SaaS. Bring-your-own-SIEM, 140+ pharma use-cases, SOC 2 / HIPAA / DPDP-aware detection content.",
    keywords: [
      "managed SOC Hyderabad",
      "SOC services HITEC City",
      "pharma managed SOC Hyderabad",
      "SIEM monitoring Hyderabad",
      "Genome Valley SOC services",
      "HIPAA SOC Hyderabad",
      "DPDP managed SOC",
      "Splunk SOC Hyderabad",
      "24x7 cybersecurity monitoring Hyderabad",
    ],
    stats: [
      { value: "24×7", label: "Continuous monitoring" },
      { value: "140+", label: "Pharma use-cases shipped" },
      { value: "<2 hrs", label: "Onsite SLA from HITEC City" },
      { value: "BYO-SIEM", label: "No vendor lock-in" },
    ],
    methodology: [
      {
        phase: "01 · Kickoff & Library Selection",
        activities: [
          "Joint kickoff with IT head + QA director (pharma) or CISO + AppSec lead (SaaS / GCC)",
          "Detection-content library selection — pharma library, SaaS / HIPAA library or both",
          "SIEM platform confirmation (Splunk ES / Sentinel / QRadar / Elastic / Sumo) and access provisioning",
          "Tier structure agreement — T1 24×7, T2 8×5, T3 on-call DFIR; HITEC City onsite SLA codified",
        ],
      },
      {
        phase: "02 · Telemetry & Content Shipment",
        activities: [
          "Telemetry source inventory — endpoints (EDR), identity (IDP), cloud (CloudTrail / Azure Activity / GCP Audit), application logs",
          "Vendor-native detection content shipment (SPL / KQL / ESQL / AQL) into the customer's SIEM",
          "Pharma library — eTMF, ALCOA+, LIMS, CDS, HPLC, USB-policy, cross-border-transfer use-cases",
          "SaaS / HIPAA library — multi-tenant authz, OAuth / SAML, IAM spikes, CI/CD anomaly, customer-data egress",
        ],
      },
      {
        phase: "03 · Tuning & Go-Live",
        activities: [
          "Baseline tuning and false-positive suppression against the customer's actual traffic patterns",
          "Runbook review with the customer's IT and (for pharma) QA team",
          "Go-live cutover with paired Tier-2 senior analyst on-site for the first 72 hours",
          "First executive summary delivered at Day 30",
        ],
      },
      {
        phase: "04 · Steady-State Operation",
        activities: [
          "24×7 Tier-1 triage with documented SLA per severity tier",
          "Tier-2 threat-hunting and complex correlation 8×5 with HITEC City residency",
          "Tier-3 DFIR on-call with sub-two-hour onsite SLA across South India",
          "US-hour shift handover for US-parent reporting cadence where applicable",
        ],
      },
      {
        phase: "05 · Compliance & Purple-Team Cadence",
        activities: [
          "Monthly executive summary with use-case performance and incident retrospective",
          "Quarterly board pack with trend narrative and detection-content refresh",
          "Half-yearly purple-team exercise with the Macksofy red-team bench",
          "Annual SOC 2 Type II + HIPAA Security Rule evidence pack delivery for compliance team",
        ],
      },
    ],
    industries: [
      {
        name: "Pharma R&D & generics",
        blurb: "Top-5 generics with Shameerpet R&D, Patancheru API plants and Bachupally formulations — pharma library + GxP-aware monitoring.",
      },
      {
        name: "CROs & clinical-trial sites",
        blurb: "Genome Valley CROs — eTMF, EDC monitoring with DPDP §16 cross-border-transfer evidence for sponsor data.",
      },
      {
        name: "HITEC City SaaS",
        blurb: "Cyber Towers and Mindspace product companies — SaaS library with SOC 2 CC7 evidence on demand.",
      },
      {
        name: "US-healthcare GCCs",
        blurb: "Gachibowli and Q City BPO/GCC operations on US PHI — HIPAA Security Rule monitoring with US-hour shift handover.",
      },
      {
        name: "Banking GCCs",
        blurb: "Kondapur and Gachibowli BFSI captive ops — RBI master direction monitoring applied to India-side GCC infrastructure.",
      },
      {
        name: "Telangana state PSUs",
        blurb: "TSITS-affiliated entities — citizen-data monitoring with DPDP and IT Act 2000 §43A overlay.",
      },
    ],
    deliverables: [
      "24×7 SOC operation with documented SLA per severity tier",
      "Vendor-native detection content (SPL / KQL / ESQL / AQL) shipped into the customer's SIEM",
      "Pharma library — 140+ pre-built use-cases mapped to 21 CFR Part 11 / GMP Annex 11 clauses",
      "SaaS / HIPAA library — multi-tenant authz, IDP federation, IAM and customer-data-egress detection",
      "DPDP §16 cross-border-transfer monitoring memo for sponsor-data egress",
      "Monthly executive summary, quarterly board pack, half-yearly purple-team exercise",
      "Annual SOC 2 Type II + HIPAA Security Rule evidence-pack delivery for the customer's compliance team",
      "Onsite DFIR response inside two hours across HITEC City, Madhapur, Gachibowli and Genome Valley",
    ],
    caseStudy: {
      industry: "Top-5 Indian generics major (Shameerpet R&D + Bachupally formulations + Patancheru API plants)",
      scope: "24×7 managed SOC across Shameerpet R&D campus, two Bachupally formulation plants, three Patancheru API plants and the corporate IT estate at Madhapur; Splunk Enterprise Security platform; pharma detection-content library shipped; DPDP §16 monitoring for US sponsor data; QA-director-readable monthly executive summary",
      outcome: "Two LIMS-to-CDS time-sync drift events flagged and remediated pre-FDA Pre-Approval Inspection; one eTMF audit-trail tamper attempt traced to an offshore contractor with subsequent contract termination; three DPDP §16 cross-border-transfer policy violations remediated with the sponsor's US data-protection-officer; zero non-conformities on the subsequent USFDA inspection.",
    },
    faqs: [
      {
        q: "Do you require us to migrate to a Macksofy-proprietary SIEM?",
        a: "No — Macksofy is bring-your-own-SIEM. We ship detection content in vendor-native format (SPL for Splunk ES, KQL for Sentinel, ESQL for Elastic, AQL for QRadar, Sumo CSE rule format for Sumo). The customer keeps full ownership of the SIEM and the content library. If the SIEM changes in the future, we re-author content for the new platform — no platform lock-in.",
      },
      {
        q: "Will your pharma library actually map to the clauses my QA director cares about?",
        a: "Yes. Every use-case in the pharma library maps to a specific 21 CFR Part 11 §11.10 clause or EU GMP Annex 11 paragraph (or, where applicable, WHO TRS 1019 Annex 4 guidance). The monthly executive summary writes in QA language — 'electronic-record integrity event on the eTMF audit-trail path; FDA Category-1 inspection risk; remediation closes 21 CFR Part 11 §11.10(e)' rather than CVE numbers.",
      },
      {
        q: "How does your DPDP §16 monitoring work for sponsor data flowing back to a US CRO parent?",
        a: "Three monitoring streams — sponsor-data egress detection at the network and application boundary; consent-flow integrity monitoring on eTMF withdrawal-of-consent events; and cross-border-transfer-control evidence collection (SCC / DPA / contractual safeguard reference). Monthly memo to the customer's data protection officer plus the sponsor's US DPO if requested.",
      },
      {
        q: "Can you do US-hour shift handover for our US parent's SOC?",
        a: "Yes — we run a 24×7 operation and the Hyderabad afternoon overlaps with US morning. We codify a daily handover briefing with the US parent SOC's lead — open incidents, threat-hunt findings, anomaly trend. For deep collaboration the customer can join our Tier-2 desk during the overlap window.",
      },
      {
        q: "How fast can you be onsite at our Patancheru API plant or Shameerpet R&D site?",
        a: "Inside two hours from our HITEC City regional hub for Madhapur / Gachibowli / Banjara Hills / Kondapur. Genome Valley sites are typically 40 minutes from Madhapur. Patancheru and Bachupally are 90 minutes. For confirmed incidents the Tier-3 DFIR specialist mobilises immediately on receipt of escalation.",
      },
      {
        q: "What is the onboarding timeline from PO to go-live?",
        a: "30 days. Day 0-7 kickoff and telemetry inventory, Day 8-21 detection-content shipment and tuning, Day 22-30 go-live with paired Tier-2 senior on-site for 72 hours. First executive summary at Day 30. Steady-state monthly / quarterly / half-yearly / annual cadence from there.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 16 · Hyderabad × Cloud Security
  // ─────────────────────────────────────────────────────────────────────
  {
    citySlug: "hyderabad",
    serviceSlug: "cloud-security",
    headline: "Cloud Security in Hyderabad · AWS, Azure & GCP",
    lead: "Cloud security for Hyderabad pharma GxP-on-cloud, HITEC City SaaS and US-healthcare GCCs — CSPM, identity, IaC and shared-responsibility.",
    body: [
      "Hyderabad cloud-security demand has three sharply different buyer profiles and a generic 'cloud audit' template misses all three. Genome Valley pharma is moving GxP-validated workloads to qualified AWS / Azure references (Veeva-on-cloud, Benchling, Empower-on-AWS pilots) and needs validation-state preservation evidence the regulator will accept. HITEC City SaaS startups are running cloud-native multi-tenant architectures and need OWASP cloud-native security verification plus SOC 2 Type II evidence. US-healthcare GCCs in Gachibowli and Q City are running customer-data workloads under HIPAA Business Associate obligations and need monitoring + IAM-hygiene + Business Associate Agreement-compatible operational evidence. Macksofy serves all three from the HITEC City regional hub with separate playbooks.",
      "Pharma cloud-security in Hyderabad is the most specialised lane. The validation-state question dominates everything else — does the cloud workload preserve the GxP validation evidence the regulator inspected when the system was first qualified, and can the cloud provider's shared-responsibility model be evidenced in the format USFDA inspectors accept? We map the workload's Annex 11 / 21 CFR Part 11 control surface onto the AWS / Azure / GCP shared-responsibility matrix, identify where customer-managed encryption keys are required (KMS / Key Vault / Cloud KMS), and ship a validation-state-preserved-on-cloud evidence pack the customer's QA team can submit to inspectors. AWS Life Sciences references, Azure for FDA-regulated workloads and GCP's Healthcare APIs each carry distinct validation profiles we have implemented.",
      "HITEC City SaaS cloud-security follows the OWASP Cloud-Native Application Security Top 10 (2024) as the default catalogue. CSPM (Cloud Security Posture Management) integration with Wiz, Lacework, Prisma Cloud or the customer's native tooling (AWS Security Hub, Azure Defender for Cloud, GCP Security Command Center). IAM hygiene exercises — Pass Role discovery, role-assumption chain analysis, KMS key-policy review, Lambda-and-Cloud-Run execution-role audit, Service Account hygiene on GCP. IaC scanning (Checkov, tfsec, KICS, Snyk IaC) integrated into the customer's GitHub Actions or GitLab CI pipeline with policy-as-code (OPA / Conftest / Sentinel) for guardrails.",
      "Identity is the single most consequential cloud-security control surface and Hyderabad clients are systematically under-invested here. Most HITEC City SaaS startups run hybrid identity (Microsoft Entra ID federated with on-premises AD via AD Connect, or Okta as the central IDP with downstream cloud account federation). We exercise the federation trust path end-to-end — SCIM trust, SAML metadata signing, OIDC discovery integrity, Conditional Access bypass paths, MFA fatigue / push-bombing resistance, and the privileged-access path into the cloud root or management account that almost always exists. The deliverable is an identity-controls-improvement roadmap dated against the next SOC 2 Type II audit cycle.",
      "US-healthcare GCC cloud-security work is HIPAA-Business-Associate-flavoured. The customer's US-parent BAA imposes specific operational and monitoring controls — PHI encryption at rest and in transit, breach-notification-readiness, access-audit and customer-data-egress prevention. We map the cloud workload's controls onto HIPAA Security Rule §164.308 administrative safeguards, §164.310 physical safeguards (where the customer self-hosts on cloud) and §164.312 technical safeguards. The output is a Business Associate Agreement-compatible operational evidence pack the customer's US-parent compliance team accepts without rework.",
      "DPDP Act §16 and cross-border-transfer compliance is the 2026 overlay. Hyderabad pharma sponsor-data flows to US / EU parents, HITEC City SaaS customer-data flows to global customers, and US-healthcare GCC PHI flows back to US-parent. Each requires DPDP §16 cross-border-transfer evidence — contractual safeguards (SCC equivalents, EU-style DPAs), technical safeguards (encryption-in-transit + at-rest with customer-managed keys), and operational evidence (monitoring of egress, consent-flow integrity, withdrawal-propagation). The cloud-security engagement now ships this as a base deliverable.",
      "Procurement reality matters. Pharma engagements close through the IT head and the QA director with the validation manager copied. HITEC City SaaS closes through the CTO and the head of SRE / cloud-engineering. US-healthcare GCC closes through the Indian CISO with the US parent's regional CISO copied. We size the SoW to match — fixed-fee engagement for the initial cloud-security assessment, plus a monthly retainer for ongoing CSPM operation, IaC pipeline scanning and identity-hygiene reviews. For multi-account / multi-cloud topologies, we deploy a dedicated cloud-engineering lead for the duration.",
      "Onsite cadence is light. HITEC City SaaS engagements are predominantly remote — the customer's cloud is the artefact and SRE teams operate async. Senior consultants fly Mumbai → HYD for kickoff at Madhapur or Gachibowli, a mid-engagement readout, and a closing handover. Pharma engagements include onsite legs to Shameerpet, Patancheru or Bachupally for the validation-state evidence collection and inspection-defence preparation. US-healthcare GCC engagements typically include one onsite leg at Gachibowli or Q City for the US-parent compliance team's verification visit. Engagement length is typically 4-6 weeks for the initial assessment, then steady-state monthly retainer.",
    ],
    buyerConcerns: [
      "GxP validation-state preservation evidence for AWS / Azure / GCP cloud workloads",
      "AWS Life Sciences / Azure for FDA / GCP Healthcare API reference-architecture compliance",
      "OWASP Cloud-Native Application Security Top 10 (2024) coverage",
      "CSPM integration (Wiz / Lacework / Prisma Cloud / Security Hub / Defender for Cloud / SCC)",
      "Identity controls — federation trust, Conditional Access, MFA-fatigue resistance, privileged-access hygiene",
      "IaC scanning (Checkov / tfsec / KICS) integrated into GitHub Actions / GitLab CI",
      "HIPAA §164.308–312 Business Associate Agreement-compatible operational evidence pack",
      "DPDP §16 cross-border-transfer evidence for sponsor / customer / PHI data flows",
      "Customer-managed encryption keys (KMS / Key Vault / Cloud KMS) for regulated workloads",
    ],
    differentiators: [
      "Pharma validation-state preservation evidence pack — AWS Life Sciences / Azure for FDA / GCP Healthcare API reference-architecture compliance evidenced in USFDA-inspector-readable format.",
      "OWASP Cloud-Native Application Security Top 10 (2024) coverage for SaaS clients with CSPM integration into Wiz / Lacework / Prisma Cloud or native tooling.",
      "Identity-controls-improvement roadmap dated against the next SOC 2 Type II audit cycle — federation trust, Conditional Access, MFA-fatigue resistance, privileged-access path discovery.",
      "HIPAA Business Associate Agreement-compatible operational evidence pack for US-healthcare GCC clients — accepted by US-parent compliance without rework.",
      "IaC scanning + policy-as-code (OPA / Conftest / Sentinel) integrated into the customer's CI pipeline as guardrails, not as a one-off audit.",
    ],
    seoDescription:
      "Cloud security in Hyderabad for pharma GxP-on-cloud, HITEC City SaaS and US-healthcare GCCs. AWS / Azure / GCP, CSPM, identity, IaC, HIPAA + DPDP §16 evidence.",
    keywords: [
      "cloud security Hyderabad",
      "AWS security Hyderabad",
      "Azure security HITEC City",
      "GCP security Hyderabad",
      "CSPM Hyderabad",
      "pharma cloud security Hyderabad",
      "HIPAA cloud Hyderabad",
      "DPDP cloud Hyderabad",
      "Hyderabad cloud audit",
    ],
    stats: [
      { value: "AWS · Azure · GCP", label: "Multi-cloud bench" },
      { value: "OWASP CN Top 10", label: "Default catalogue" },
      { value: "Validation-state", label: "Pharma evidence pack" },
      { value: "HITEC City", label: "Regional hub" },
    ],
    methodology: [
      {
        phase: "01 · Scoping & Reference Selection",
        activities: [
          "Joint kickoff with IT head + QA director (pharma) or CTO + head of SRE (SaaS / GCC)",
          "Cloud topology inventory — accounts, projects, subscriptions, regions, service catalogue",
          "Reference architecture selection — AWS Life Sciences / Azure for FDA / GCP Healthcare API for pharma; OWASP CN Top 10 for SaaS",
          "BAA / DPDP / SCC contractual obligation inventory for HIPAA and cross-border-transfer scopes",
        ],
      },
      {
        phase: "02 · CSPM & Identity Discovery",
        activities: [
          "CSPM integration — Wiz / Lacework / Prisma Cloud or native (Security Hub / Defender for Cloud / SCC)",
          "IAM Pass Role discovery and role-assumption chain analysis",
          "KMS / Key Vault / Cloud KMS key-policy review and customer-managed-key inventory",
          "Identity federation trust path enumeration — SCIM, SAML, OIDC, Conditional Access, MFA configuration",
        ],
      },
      {
        phase: "03 · IaC & Pipeline Hardening",
        activities: [
          "IaC scanning integration — Checkov / tfsec / KICS / Snyk IaC into GitHub Actions / GitLab CI",
          "Policy-as-code guardrails — OPA / Conftest / Sentinel in the pipeline pre-merge",
          "Secrets-scanning baseline — Gitleaks / TruffleHog / GitHub secret scanning",
          "CI/CD trust path review — GitHub Actions OIDC, GitLab CI runner privilege, Buildkite agent",
        ],
      },
      {
        phase: "04 · Pharma Validation-State Evidence",
        activities: [
          "AWS Life Sciences / Azure for FDA / GCP Healthcare API reference-mapping per validated workload",
          "Shared-responsibility-matrix evidence collection in USFDA-inspector-readable format",
          "Customer-managed encryption keys for regulated workloads with QA-witness rotation evidence",
          "DPDP §16 cross-border-transfer-control evidence for sponsor-data egress",
        ],
      },
      {
        phase: "05 · Steady-State Retainer",
        activities: [
          "Monthly CSPM operation, IaC pipeline scanning and identity-hygiene reviews",
          "Quarterly board pack with cloud-security posture trend",
          "Annual SOC 2 Type II + HIPAA evidence-pack delivery for compliance team",
          "Inspection-defence support for FDA / EMA / DCGI cycles where pharma cloud is in scope",
        ],
      },
    ],
    industries: [
      {
        name: "Pharma GxP-on-cloud",
        blurb: "AWS Life Sciences / Azure for FDA / GCP Healthcare API references with validation-state preserved evidence.",
      },
      {
        name: "CROs & clinical-trial SaaS",
        blurb: "Genome Valley CROs running eTMF / EDC / clinical-trial-SaaS on cloud — DPDP §16 sponsor-data overlay.",
      },
      {
        name: "HITEC City SaaS",
        blurb: "Cyber Towers and Mindspace product companies — OWASP CN Top 10 + CSPM + SOC 2 evidence.",
      },
      {
        name: "US-healthcare GCCs",
        blurb: "Gachibowli and Q City BPO/GCC — HIPAA §164.308–312 BAA-compatible operational evidence pack.",
      },
      {
        name: "Banking GCCs",
        blurb: "Kondapur and Gachibowli BFSI captive ops — RBI cloud guidance overlay on the parent's cloud topology.",
      },
      {
        name: "AI / LLM product",
        blurb: "Indiranagar-adjacent and HITEC City AI startups — model-API isolation, prompt-injection-resistant architecture, training-data egress controls.",
      },
    ],
    deliverables: [
      "Cloud-security assessment report mapped to AWS / Azure / GCP reference architectures",
      "CSPM integration shipped — Wiz / Lacework / Prisma Cloud or native tooling configured",
      "Identity-controls-improvement roadmap dated against the next SOC 2 Type II audit cycle",
      "IaC scanning + policy-as-code guardrails in the customer's CI pipeline",
      "Pharma validation-state preservation evidence pack for USFDA inspection",
      "HIPAA §164.308–312 BAA-compatible operational evidence pack for US-healthcare GCC clients",
      "DPDP §16 cross-border-transfer-control evidence for sponsor / customer / PHI data flows",
      "Steady-state monthly CSPM + IaC + identity-hygiene retainer with quarterly board pack",
    ],
    caseStudy: {
      industry: "Top-5 Indian generics major (multi-account AWS Life Sciences + Azure for FDA hybrid)",
      scope: "Cloud-security assessment + validation-state-on-cloud evidence for two Veeva Vault workloads on AWS Life Sciences and one Empower-on-Azure pilot for a regulated CDS instance; identity-controls overhaul (Entra ID federated with on-premises AD); DPDP §16 evidence for sponsor-data egress to a US CRO partner; six-week engagement plus monthly retainer",
      outcome: "Three IAM Pass Role escalation paths closed pre-disclosure; Veeva Vault validation-state-on-cloud evidence pack accepted by QA without rework and submitted to the subsequent USFDA Pre-Approval Inspection; one Conditional Access bypass path closed via MFA-fatigue-resistant authenticator deployment; DPDP §16 evidence pack accepted by the US CRO sponsor's data-protection-officer.",
    },
    faqs: [
      {
        q: "Can you evidence validation-state preservation on AWS / Azure / GCP for our regulated workloads?",
        a: "Yes. AWS Life Sciences, Azure for FDA and GCP Healthcare API each carry reference architectures with documented validation profiles. We map your workload's Annex 11 / 21 CFR Part 11 control surface onto the cloud provider's shared-responsibility matrix and produce the USFDA-inspector-readable evidence pack. QA witnesses the key rotation and the audit-trail evidence collection.",
      },
      {
        q: "Which CSPM tools do you support — or do you require us to migrate to a Macksofy-proprietary platform?",
        a: "Bring-your-own-CSPM. We integrate Wiz, Lacework, Prisma Cloud, Snyk Cloud, Orca, AWS Security Hub, Azure Defender for Cloud, GCP Security Command Center and the native CIS-benchmark scanners. The detection-content and the remediation runbook ride on the customer's existing platform. We do not require migration.",
      },
      {
        q: "How do you handle our hybrid identity — Microsoft Entra ID federated with on-premises AD?",
        a: "Federation-trust-path-end-to-end is the engagement's largest single deliverable. SCIM trust, SAML metadata signing, OIDC discovery integrity, Conditional Access policy review, MFA-fatigue / push-bombing resistance test and privileged-access path discovery into the cloud root or management account. Findings are dated against the next SOC 2 Type II audit cycle.",
      },
      {
        q: "Will the engagement produce HIPAA Business Associate Agreement-compatible evidence for our US-parent compliance team?",
        a: "Yes. The HIPAA §164.308 administrative safeguards, §164.310 physical safeguards and §164.312 technical safeguards are each evidenced against the cloud workload's actual controls. The deliverable is the BAA-compatible operational evidence pack the US parent's compliance function accepts without rework — we have shipped this format repeatedly for Gachibowli and Q City GCC engagements.",
      },
      {
        q: "Do you handle DPDP §16 cross-border-transfer evidence as part of the cloud engagement?",
        a: "Yes — DPDP §16 is a base deliverable for any cross-border-data-flowing workload. Contractual safeguards inventory (SCC equivalents, DPA references), technical safeguards (encryption-in-transit + at-rest with customer-managed keys) and operational evidence (egress monitoring, consent-flow integrity, withdrawal-propagation) are documented as a single memo to the customer's DPO.",
      },
      {
        q: "What is the engagement structure — one-off assessment or ongoing retainer?",
        a: "Both. The initial 4-6 week assessment is a fixed-fee engagement that produces the cloud-security posture baseline, CSPM integration, IaC pipeline hardening, identity-controls roadmap and (where applicable) the validation-state / HIPAA / DPDP evidence packs. The steady-state monthly retainer keeps CSPM operating, IaC scanning in the pipeline and identity hygiene under continuous review, with quarterly board packs.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 17 · Pune × Managed SOC
  // ─────────────────────────────────────────────────────────────────────
  {
    citySlug: "pune",
    serviceSlug: "managed-soc",
    headline: "Managed SOC in Pune · IT Services, Auto OEM & GCC",
    lead: "24×7 SOC for Pune IT services GCCs, Hinjewadi SaaS, Chakan auto OEMs and Magarpatta BPOs — OT-aware, IEC-62443-aligned, US-parent-friendly.",
    body: [
      "Pune's managed-SOC buyer concentration is uniquely diversified — IT-services GCCs in Hinjewadi Phase II and III, SaaS and product startups in Magarpatta and Kharadi, auto OEMs and Tier-1 suppliers across the Chakan / Talegaon / Ranjangaon belt, edtech and BPO in Magarpatta City, and global pharma R&D centres in the Hinjewadi periphery. Most generic SOC offerings stretch to fit either an IT estate or a manufacturing estate but rarely both — and Pune clients increasingly need both because the auto OEM's IT-and-OT segregation is the highest-value risk on the board. Macksofy's Pune SOC is engineered for this combined estate from the Mumbai BKC anchor team with a Pune-resident lead consultant for multi-quarter programmes.",
      "The operating model is identical to our Hyderabad SOC at the platform level — bring-your-own SIEM (Splunk Enterprise Security, Microsoft Sentinel, IBM QRadar, Elastic Security, Sumo Logic Cloud SIEM), bring-your-own EDR (CrowdStrike Falcon, SentinelOne, Microsoft Defender for Endpoint, Trellix), three-tier analyst structure (T1 24×7, T2 8×5, T3 on-call DFIR), monthly executive summary, quarterly board pack, half-yearly purple-team exercise. What differs is the detection-content library — Pune's library is calibrated for the combined IT-and-OT estate that Pune buyers actually operate.",
      "OT-aware detection content is the Pune SOC's distinguishing capability. IEC-62443-aligned monitoring of the OT estate — purdue-model-Level-3 / Level-2 / Level-1 segmentation event detection, OPC UA / Modbus TCP / EtherNet/IP / PROFINET protocol anomaly, HMI / SCADA workstation authentication anomaly, engineering workstation USB-policy bypass detection, PLC firmware-upload event correlation, IT-to-OT lateral movement detection (the highest-leverage risk on every Pune auto OEM board). For Chakan and Talegaon auto OEMs we have shipped 80+ pre-built OT-aware use-cases mapped to IEC-62443-3-3 SR / SL requirements.",
      "IT-services GCC content is the second pillar. Hinjewadi Phase II / III hosts delivery centres for Infosys, TCS, Wipro, Cognizant, Capgemini, IBM India, Accenture, Deloitte and many smaller IT-services firms. The detection content here is calibrated to the IT-services delivery-centre estate — VDI-based developer workstation monitoring, shared-development-environment anomaly, OffSec-style red-team-tooling detection (because IT-services parents pen-test their own delivery centres), customer-IP egress detection from VDI sessions, and the US/EU customer-imposed control catalogues that pass down through the IT-services parent. Every use-case maps to the parent's preferred control framework (NIST CSF, CIS Controls or parent-specific catalogue).",
      "Auto OEM Tier-1 supplier content layers in additional capabilities. TISAX-aligned monitoring of customer-data flows (Volkswagen / BMW / Audi suppliers come under TISAX in 2026), supplier-portal authentication anomaly, connected-vehicle telemetry anomaly for OEMs running connected-car back-ends, and the ECU-bench / HIL-lab segregation that auto OEM R&D centres need to evidence to their European customer's procurement. We have shipped this content into Chakan, Talegaon and Ranjangaon auto OEM Tier-1 supplier SOCs that need to satisfy German automaker procurement.",
      "DPDP Act compliance overlay is built in. Most Pune GCC and BPO engagements process personal data of Indian or foreign data principals and now need DPDP-aligned monitoring — consent-flow integrity, withdrawal-propagation, DPDP §16 cross-border-transfer evidence for sponsor / customer / parent data flows. The base detection-content library ships these capabilities; the customer's data protection officer receives a monthly memo with consent-flow events, withdrawal-propagation success rate and cross-border-transfer trend.",
      "Tier structure is calibrated to Pune geography. Tier-1 (24×7 SIEM triage) operates from the Mumbai BKC SOC floor. Tier-2 (8×5 senior analyst and threat-hunter) operates from Mumbai BKC with a Pune-resident senior for the embedded lead role on multi-quarter programmes. Tier-3 (on-call DFIR specialist) mobilises from Mumbai BKC and drives to Pune in 3 hours via the Mumbai-Pune Expressway (or flies BOM → PNQ in 30 minutes). Onsite SLA at any Hinjewadi, Magarpatta, Kharadi or Chakan client site is 4 hours from escalation.",
      "Procurement reality matters. Pune auto OEM Tier-1 supplier engagements close through the IT head, the plant operations head and (for TISAX-scoped customers) the parent's German customer-security function. IT-services GCC engagements close through the Indian CISO and the US/EU parent's regional CISO. Magarpatta SaaS and edtech engagements close through the CTO and head of SRE in a single weekly sync. Engagement length is typically 12-24 months minimum for the SOC retainer with a 30-day onboarding window.",
    ],
    buyerConcerns: [
      "Combined IT-and-OT detection content with IEC-62443-3-3 alignment for auto OEMs",
      "TISAX-aligned monitoring for German-automaker-supplier Tier-1 OEMs in Chakan / Talegaon / Ranjangaon",
      "IT-services delivery-centre content — VDI, shared-dev-environment, customer-IP-egress detection",
      "US / EU parent-imposed control catalogue (NIST CSF / CIS / parent-specific) mapping",
      "Connected-vehicle telemetry anomaly for auto OEMs running connected-car back-ends",
      "Bring-your-own SIEM and EDR — no vendor lock-in",
      "Tier-3 DFIR mobilisation inside 3 hours via Mumbai-Pune Expressway",
      "DPDP §16 cross-border-transfer evidence for Pune GCC and BPO scopes",
      "Monthly exec summary, quarterly board pack, half-yearly purple-team",
    ],
    differentiators: [
      "OT-aware detection content for the auto OEM and Tier-1 supplier estate — IEC-62443-3-3 SR / SL mapping, OPC UA / Modbus / EtherNet/IP / PROFINET protocol anomaly, IT-to-OT lateral movement detection.",
      "TISAX-aligned monitoring content shipped for German-automaker Tier-1 suppliers in Chakan / Talegaon / Ranjangaon — accepted by German customer procurement.",
      "IT-services delivery-centre library — VDI, shared-dev-environment and customer-IP-egress content calibrated to Pune Hinjewadi Phase II / III delivery-centre estates.",
      "Bring-your-own SIEM + EDR model — content shipped in vendor-native format (SPL / KQL / ESQL / AQL) so the customer keeps ownership.",
      "Mumbai BKC anchor team with Pune-resident senior for multi-quarter programmes — 3-hour DFIR mobilisation via the Expressway.",
    ],
    seoDescription:
      "24×7 managed SOC in Pune for IT services GCCs, Hinjewadi SaaS, Chakan auto OEMs and Magarpatta BPOs. IT-and-OT-aware, IEC-62443 + TISAX-aligned, bring-your-own SIEM / EDR.",
    keywords: [
      "managed SOC Pune",
      "SOC services Hinjewadi",
      "OT SOC Pune",
      "auto OEM SOC Pune",
      "IEC 62443 SOC Pune",
      "TISAX monitoring Pune",
      "IT services SOC Pune",
      "24x7 cybersecurity monitoring Pune",
      "Splunk SOC Pune",
    ],
    stats: [
      { value: "24×7", label: "Continuous monitoring" },
      { value: "80+", label: "OT-aware use-cases shipped" },
      { value: "<4 hrs", label: "Pune onsite SLA" },
      { value: "IEC 62443", label: "OT framework alignment" },
    ],
    methodology: [
      {
        phase: "01 · Kickoff & Estate Map",
        activities: [
          "Joint kickoff with IT head, plant operations head and (for TISAX scopes) parent's German customer-security function",
          "Combined IT-and-OT asset inventory — Purdue-model-Level mapping for OT estate",
          "SIEM and EDR platform confirmation, telemetry source inventory",
          "Detection-content library selection — IT-services / OT / SaaS / BPO playbook combination",
        ],
      },
      {
        phase: "02 · Content Shipment & Tuning",
        activities: [
          "Vendor-native detection content shipment in SPL / KQL / ESQL / AQL",
          "OT-aware library — 80+ use-cases mapped to IEC-62443-3-3 SR / SL where auto OEM in scope",
          "TISAX-aligned monitoring content for German-automaker Tier-1 suppliers",
          "IT-services VDI / shared-dev / customer-IP-egress content for Hinjewadi delivery-centre estates",
        ],
      },
      {
        phase: "03 · Go-Live & Runbook",
        activities: [
          "Baseline tuning and false-positive suppression against the customer's actual traffic",
          "Runbook review with IT, plant operations and (where applicable) parent-customer-security",
          "Go-live cutover with paired Tier-2 senior on-site for the first 72 hours at Hinjewadi or Chakan",
          "First executive summary delivered at Day 30",
        ],
      },
      {
        phase: "04 · Steady-State Operation",
        activities: [
          "24×7 Tier-1 triage from Mumbai BKC SOC floor with documented per-severity SLA",
          "Tier-2 threat-hunting and complex correlation 8×5 with Pune-resident embedded lead",
          "Tier-3 DFIR on-call with 3-hour Mumbai-Pune mobilisation via the Expressway",
          "Connected-vehicle telemetry anomaly for OEMs running connected-car back-ends",
        ],
      },
      {
        phase: "05 · Compliance & Purple-Team Cadence",
        activities: [
          "Monthly executive summary in IT-and-OT language for combined-estate clients",
          "Quarterly board pack with trend narrative and detection-content refresh",
          "Half-yearly purple-team exercise with the Macksofy red-team bench",
          "Annual TISAX / SOC 2 / NIST CSF evidence pack delivery for compliance team",
        ],
      },
    ],
    industries: [
      {
        name: "Auto OEMs & Tier-1 suppliers",
        blurb: "Chakan / Talegaon / Ranjangaon auto OEMs — IT-and-OT combined SOC with IEC-62443 + TISAX coverage.",
      },
      {
        name: "IT services GCCs",
        blurb: "Hinjewadi Phase II / III delivery centres — VDI + shared-dev + customer-IP-egress content with parent control catalogue.",
      },
      {
        name: "Magarpatta SaaS & edtech",
        blurb: "Magarpatta and Kharadi product companies — SOC 2 CC + ISO 27001 + DPDP evidence on demand.",
      },
      {
        name: "Pharma R&D",
        blurb: "Hinjewadi periphery pharma R&D — GxP-aware detection content adapted from the Hyderabad pharma library.",
      },
      {
        name: "BPO & KPO",
        blurb: "Magarpatta and Kharadi BPO/KPO operations — customer-data monitoring with DPDP §16 cross-border-transfer evidence.",
      },
      {
        name: "Connected-vehicle OEMs",
        blurb: "Auto OEMs running connected-car back-ends — telematics platform anomaly, OTA-update integrity, fleet-data-egress monitoring.",
      },
    ],
    deliverables: [
      "24×7 SOC operation with documented SLA per severity tier",
      "Vendor-native detection content shipped into the customer's SIEM",
      "OT-aware library — 80+ pre-built use-cases mapped to IEC-62443-3-3 SR / SL clauses",
      "TISAX-aligned monitoring content for German-automaker Tier-1 supplier scope",
      "IT-services delivery-centre content — VDI, shared-dev-environment, customer-IP-egress detection",
      "Connected-vehicle telematics anomaly content where in scope",
      "Monthly executive summary, quarterly board pack, half-yearly purple-team exercise",
      "Annual TISAX / SOC 2 / NIST CSF evidence-pack delivery for compliance team",
    ],
    caseStudy: {
      industry: "Pune-headquartered Auto OEM Tier-1 Supplier (Chakan plant + Hinjewadi engineering centre + connected-vehicle back-end on AWS)",
      scope: "24×7 managed SOC across the Chakan plant OT estate (Purdue Level 0-3, four PLCs, two HMIs, one SCADA, eight engineering workstations), the Hinjewadi engineering centre IT estate (180 endpoints, 40 VDI sessions), and the AWS-hosted connected-vehicle telematics back-end; Splunk Enterprise Security platform; IEC-62443-3-3 + TISAX monitoring content shipped; quarterly German-customer-procurement evidence cycle",
      outcome: "Two IT-to-OT lateral movement attempts flagged and remediated pre-disclosure within the first quarter; one supplier-portal credential-stuffing campaign detected and blocked at the WAF edge; one connected-vehicle telematics anomaly traced to a misconfigured OTA-update endpoint and remediated before customer notification; TISAX surveillance cleared with zero non-conformities on first attempt; German customer procurement accepted the operational evidence pack without rework.",
    },
    faqs: [
      {
        q: "Can your SOC monitor both our IT estate and our Chakan plant OT estate from a single operation?",
        a: "Yes — that is the Pune SOC's defining capability. The detection-content library covers Purdue-Level-0 through Level-3 OT segmentation events, OPC UA / Modbus / EtherNet/IP / PROFINET protocol anomaly, HMI / SCADA workstation authentication anomaly, and the IT-to-OT lateral movement detection that is the single highest-leverage risk on every auto OEM board. Mapped to IEC-62443-3-3 SR / SL requirements.",
      },
      {
        q: "Do you ship TISAX-aligned monitoring content for our German-automaker procurement?",
        a: "Yes — TISAX-aligned monitoring content is shipped as part of the base library for German-automaker Tier-1 suppliers. The operational evidence pack is accepted by Volkswagen / BMW / Audi customer-security teams without rework. We have shipped this for Chakan, Talegaon and Ranjangaon-based Tier-1 suppliers under quarterly customer-procurement evidence cycles.",
      },
      {
        q: "How quickly can you mobilise DFIR to Hinjewadi or Chakan?",
        a: "Tier-3 DFIR specialist mobilises from Mumbai BKC and drives to Pune in 3 hours via the Mumbai-Pune Expressway (or flies BOM → PNQ in 30 minutes). Onsite SLA at any Hinjewadi, Magarpatta, Kharadi or Chakan client site is 4 hours from escalation. For multi-quarter programmes we maintain a Pune-resident embedded senior consultant.",
      },
      {
        q: "Will you require us to migrate to a Macksofy-proprietary SIEM or EDR?",
        a: "No — bring-your-own SIEM and EDR. We integrate Splunk Enterprise Security, Microsoft Sentinel, IBM QRadar, Elastic Security, Sumo Logic Cloud SIEM and CrowdStrike Falcon / SentinelOne / Microsoft Defender for Endpoint / Trellix. Detection content is shipped in vendor-native rule format so the customer keeps ownership.",
      },
      {
        q: "How does the SOC handle connected-vehicle telematics data for our connected-car back-end?",
        a: "Connected-vehicle telematics-platform anomaly content is shipped where in scope — telematics-API rate anomaly, OTA-update integrity events, fleet-data-egress monitoring and customer-vehicle-data-isolation. Most Pune connected-car back-ends run on AWS (sometimes Azure or GCP); content is calibrated to the cloud topology and integrates with the customer's existing CSPM and IAM control plane.",
      },
      {
        q: "What is the engagement length and exit clause?",
        a: "Standard engagement is 12 months with 60-day notice termination after the first 6 months. Multi-year engagements get preferred pricing and embedded Pune-resident senior. Exit clause includes a 30-day knowledge-transfer window — the customer retains the SIEM, the detection content (delivered in source-controlled format), the runbooks and the threat-intel-feed configuration.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 18 · Noida × Web Application Security
  // ─────────────────────────────────────────────────────────────────────
  {
    citySlug: "noida",
    serviceSlug: "web-application-security",
    headline: "Web Application Security in Noida · Fintech & Payments",
    lead: "Manual-first AppSec for Noida fintechs, payment aggregators, Sector 18 SaaS and IT-services majors — OWASP ASVS L3, RBI and DPDP-aligned.",
    body: [
      "Noida web-application-security work is dominated by the payment-aggregator-and-fintech cluster that has accumulated in Sectors 16, 18, 62 and 132 across the last five years — RBI PA-PG licensees, lending fintechs, neo-banks, BNPL operators and the back-office captives of foreign banks. The AppSec scope here is structurally different from Bengaluru SaaS because the regulator is RBI not just SOC 2, and structurally different from Mumbai BFSI because the buyer is a CTO + AppSec lead pair, not an audit-committee chair. Macksofy's Noida web-application-security practice runs against OWASP ASVS Level 3 by default with an RBI master direction overlay calibrated to the licensee category — PA, PG, NBFC, lending fintech or BNPL.",
      "Methodology is manual-first. Burp Suite Pro, Caido and Nuclei run as supporting infrastructure. Every High and Critical finding is manually validated with a reproducible exploit (curl, Burp .req, Python harness or proxy script) attached to the report. We default to OWASP ASVS L3 for fintech (the Noida regulator-licensee subset effectively requires it), OWASP API Security Top 10 (2023) for API-first scopes, and the OWASP Top 10 for LLM Applications (2025) for any AI surface in scope. The deliverable is a binder the customer's CTO can hand directly to engineering with no translation layer.",
      "Payment-aggregator scope has its own shape. The RBI PA-PG Master Direction (Payment Aggregators and Payment Gateways) imposes specific control expectations — escrow account integrity, settlement-and-payout reconciliation isolation, dispute-flow integrity, customer-data-encryption (PCI-DSS-aligned), and the cyber-resilience audit cadence that PA-PG licensees submit to the RBI Department of Payment and Settlement Systems. We run AppSec scopes that close these expectations alongside the technical depth — payment-flow abuse cases (token replay, refund-race, settlement-spoof, payout-amount tampering), partner-merchant-onboarding-API hygiene, KYC-vendor-integration trust chain, and the merchant-portal authorisation matrix.",
      "Lending fintech and BNPL scopes have a different abuse surface. Loan-origination flow abuse (KYC bypass, OVD-tamper, income-document-forgery, multi-account-stitching), partner-API trust chains (account aggregator integration, credit-bureau integration, lending-service-provider integration), collections-app abuse paths (skiptrace-data-egress, customer-impersonation through the collections agent app), and the BNPL-specific surface — merchant-side payment-intent tampering, deferred-payment-schedule manipulation, and the partner-bank settlement-reconciliation layer. We layer RBI's Digital Lending Guidelines (2022, as amended) clause expectations onto the technical scope.",
      "DPDP Act §16 cross-border-transfer and consent-flow integrity is the second overlay. Noida fintech customer data flows are complex — Aadhaar-enabled KYC (UIDAI), DigiLocker integration (MeitY), account aggregator integration (RBI / NSDL), credit-bureau queries (CIBIL / Experian / Equifax), and (for foreign-bank GCC scopes) cross-border-transfer to a US or UK parent. Every web-application-security engagement includes DPDP §16 cross-border-transfer evidence collection and consent-flow integrity testing — informed-consent capture, withdrawal-propagation through downstream systems, and the contractual-safeguard reference for cross-border data flows.",
      "AI/LLM surface coverage has become standard in 2026. Noida fintechs increasingly deploy LLM-based customer-service assistants, RAG-backed FAQ systems, and agent-orchestrated KYC-document-processing flows. Every Noida web-application-security engagement now includes the OWASP Top 10 for LLM Applications (2025) coverage by default — direct + indirect prompt-injection (via RAG document corpus or upstream customer-data), tool-use abuse on agent reasoning, training-data exfiltration via inference-API probing, and the BFSI-specific customer-impersonation paths that LLM applications expose.",
      "Yotta NM1 tenant clients are a specific Noida sub-segment. The hyperscale data centre at NM1 hosts a fast-growing fintech and SaaS tenancy plus several government-adjacent cloud workloads. AppSec scopes for NM1 tenants include shared-responsibility evidence collection between the tenant and Yotta (network, physical, hypervisor controls), management-plane isolation testing, and the tenant-data-isolation evidence the RBI inspector will ask for in the next thematic-review cycle. We have shipped this content into multiple Noida NM1 tenants.",
      "Procurement reality matters. Noida fintech AppSec procurement closes through the CTO and the AppSec lead in a single weekly sync; for foreign-bank GCC scopes the US/UK parent's regional CISO joins the close. Engagement letters cover trespass-and-deception waivers for KYC-vendor-integration testing, production safe-harbour for the live merchant-portal scope, and the RBI inspection-defence support clause that the licensee will draw on at the next CSITE Cell or Department of Payment and Settlement Systems thematic review. Onsite cadence — Mumbai BKC senior consultants fly Mumbai → Delhi and reach any Noida sector in 45-90 minutes via Yamuna or DND. Most engagements run 4-5 weeks with two onsite legs.",
    ],
    buyerConcerns: [
      "OWASP ASVS Level 3 + API Security Top 10 (2023) + LLM Top 10 (2025) coverage by default",
      "RBI PA-PG Master Direction clause closure for payment aggregator licensees",
      "RBI Digital Lending Guidelines (2022) clause closure for lending fintech scopes",
      "Payment-flow abuse — token replay, refund-race, settlement-spoof, payout-amount tampering",
      "Account aggregator / DigiLocker / Aadhaar AUA-KUA integration trust chains",
      "DPDP §16 cross-border-transfer evidence and consent-flow integrity testing",
      "LLM-application surface — prompt-injection, tool-use abuse, training-data exfil",
      "Yotta NM1 tenant shared-responsibility evidence collection",
      "RBI inspection-defence support for CSITE / DPSS thematic-review cycles",
    ],
    differentiators: [
      "RBI PA-PG + Digital Lending Guidelines clause closure built into the AppSec scope — not a separate compliance pass.",
      "Manual-first methodology defaulting to OWASP ASVS L3 + API Top 10 + LLM Top 10 — automated scanners as supporting infrastructure.",
      "Account aggregator / DigiLocker / Aadhaar AUA-KUA integration trust-chain testing for fintech-licensee scopes.",
      "Yotta NM1 tenant shared-responsibility evidence collection for hyperscale-data-centre-resident workloads.",
      "RBI inspection-defence support included for CSITE Cell and Department of Payment and Settlement Systems thematic-review cycles.",
    ],
    seoDescription:
      "Manual-first web application security in Noida for fintechs, payment aggregators and IT services. OWASP ASVS L3, RBI PA-PG + Digital Lending + DPDP §16 aligned reports.",
    keywords: [
      "web application security Noida",
      "Noida AppSec fintech",
      "OWASP ASVS Noida",
      "RBI PA-PG audit Noida",
      "API security Noida",
      "manual pentest Noida",
      "Sector 18 cybersecurity",
      "Yotta NM1 tenant security",
      "LLM security Noida",
    ],
    stats: [
      { value: "Manual-first", label: "Scanner as substrate" },
      { value: "ASVS L3", label: "Default methodology" },
      { value: "RBI PA-PG", label: "Licensee scope ready" },
      { value: "4-5 wks", label: "Typical engagement" },
    ],
    methodology: [
      {
        phase: "01 · Scoping & Catalogue Selection",
        activities: [
          "Joint kickoff with CTO, AppSec lead and (for foreign-bank GCCs) parent's regional CISO",
          "RBI licensee category confirmation — PA, PG, NBFC, lending fintech or BNPL — and master-direction crosswalk",
          "OWASP ASVS L3 + API Top 10 + LLM Top 10 default catalogue selection",
          "DPDP §16 + Aadhaar / DigiLocker / AA integration trust-chain scope confirmation",
        ],
      },
      {
        phase: "02 · Recon & Surface Map",
        activities: [
          "Authenticated and unauthenticated surface map against staging and controlled prod (Burp Pro, Caido, Nuclei)",
          "Payment-flow graph mapping (PA-PG) or loan-origination graph mapping (lending) end-to-end",
          "Partner-API inventory — KYC vendor, account aggregator, credit bureau, AA, DigiLocker, Aadhaar AUA / KUA",
          "AI surface inventory — RAG corpus, agent tool catalogue, model endpoints, prompt-template repository",
        ],
      },
      {
        phase: "03 · Manual Exploitation",
        activities: [
          "Payment-flow abuse cases — token replay, refund-race, settlement-spoof, payout-amount tampering",
          "Loan-origination abuse — KYC bypass, OVD-tamper, multi-account-stitching, partner-API trust-chain",
          "BOLA, tenant-bleed and partner-merchant-onboarding-API authorisation matrix tests",
          "LLM-application probes — direct + indirect prompt-injection, tool-use abuse, training-data exfil",
        ],
      },
      {
        phase: "04 · Regulator + Customer Reporting",
        activities: [
          "RBI PA-PG / Digital Lending Guidelines crosswalk per finding, in submission-format language",
          "DPDP §16 cross-border-transfer evidence pack with contractual-safeguard reference",
          "Yotta NM1 tenant shared-responsibility evidence where in scope",
          "Customer-procurement vendor-pack annex for foreign-bank GCC scopes",
        ],
      },
      {
        phase: "05 · Re-test & Inspection-Defence",
        activities: [
          "Free re-test of every Critical and High inside a 60-day window",
          "RBI inspection-defence support for CSITE Cell and DPSS thematic-review cycles",
          "Findings exported to Jira / Linear / GitHub Issues with owner, severity, CWE and ETA",
          "Continuous-AppSec retainer offer if the release cadence is weekly or daily",
        ],
      },
    ],
    industries: [
      {
        name: "Payment aggregators (RBI PA-PG)",
        blurb: "Sector 18 / 62 PA-PG licensees — payment-flow abuse, escrow integrity and DPSS-format reporting.",
      },
      {
        name: "Lending fintech & BNPL",
        blurb: "Noida lending fintechs — loan-origination abuse, RBI Digital Lending Guidelines + AA / credit-bureau integration depth.",
      },
      {
        name: "Foreign-bank GCC back-offices",
        blurb: "Sector 132 + Greater Noida foreign-bank captives — US / UK parent control-catalogue crosswalk on Indian scope.",
      },
      {
        name: "Sector 18 SaaS",
        blurb: "Sector 18 product companies — OWASP ASVS L3 + SOC 2 + DPDP §16 evidence on demand.",
      },
      {
        name: "Yotta NM1 tenants",
        blurb: "Hyperscale-data-centre-resident fintech and SaaS — shared-responsibility evidence collection with Yotta.",
      },
      {
        name: "Edtech & SaaS unicorns",
        blurb: "Sectors 16 / 62 edtech and SaaS — student-data isolation, KYC / age-gating and AI-assistant LLM surface coverage.",
      },
    ],
    deliverables: [
      "Manual-first AppSec report with reproducible exploit code per High and Critical",
      "OWASP ASVS L3 + API Top 10 + LLM Top 10 finding catalogue",
      "RBI PA-PG / Digital Lending Guidelines crosswalk per finding",
      "Payment-flow / loan-origination abuse-case evidence pack",
      "DPDP §16 cross-border-transfer evidence pack with contractual-safeguard reference",
      "Yotta NM1 tenant shared-responsibility evidence where in scope",
      "Customer-procurement vendor-pack annex for foreign-bank GCC scopes",
      "Free re-test of every Critical and High inside a 60-day window",
    ],
    caseStudy: {
      industry: "Noida-headquartered Payment Aggregator (RBI PA licensee, Sector 18, Yotta NM1 tenant)",
      scope: "Manual-first AppSec — merchant portal (44 endpoints), payout API, settlement API, dispute-flow API, KYC-vendor integration trust chain, account aggregator integration, AI-customer-service-assistant LLM surface; OWASP ASVS L3 + RBI PA-PG + DPDP §16 + Yotta NM1 shared-responsibility scope; 5-week engagement with two onsite legs",
      outcome: "Three High-severity payment-flow abuse paths closed pre-disclosure (refund-race, settlement-spoof, payout-amount tampering); one indirect-prompt-injection-via-RAG path on the LLM customer-service assistant that allowed cross-merchant FAQ leak, closed and the corpus-isolation control redesigned; RBI PA-PG inspection at the next DPSS thematic review cleared with zero clarification requests; Yotta NM1 shared-responsibility evidence pack accepted by the RBI inspector first read.",
    },
    faqs: [
      {
        q: "Will your AppSec close my RBI PA-PG or Digital Lending Guidelines audit obligation?",
        a: "Yes — the scope is built around the RBI master direction clauses for your licensee category. Every finding includes the specific PA-PG or Digital Lending Guidelines clause it closes, the evidence the inspector reads at the next CSITE Cell or DPSS thematic review, and the inspection-defence brief our senior delivers if the inspector asks clarification questions.",
      },
      {
        q: "Do you cover Aadhaar AUA / KUA, DigiLocker and account aggregator integration trust chains?",
        a: "Yes — every fintech AppSec engagement includes the partner-API trust-chain testing. Aadhaar AUA / KUA scoping uses UIDAI Authentication Regulations 2016 methodology, DigiLocker integration follows the MeitY partner-onboarding checklist, and account aggregator integration is tested against the NSDL / RBI Sahamati specification. The output is a trust-chain attestation alongside the technical findings.",
      },
      {
        q: "Can you test LLM applications — AI customer-service assistants, RAG-backed FAQ, agent KYC-document-processing?",
        a: "Yes — OWASP Top 10 for LLM Applications (2025) is the default catalogue for any AI surface in scope. Direct + indirect prompt-injection (via RAG corpus or upstream customer-data), tool-use abuse on agent reasoning, training-data exfiltration via inference-API probing, and BFSI-specific customer-impersonation paths. Most 2026 Noida fintech engagements carry at least one LLM-specific finding worth shipping in the executive summary.",
      },
      {
        q: "Do you handle Yotta NM1 tenant shared-responsibility evidence?",
        a: "Yes — Yotta NM1 tenant scopes include a shared-responsibility evidence collection step between the tenant and Yotta covering network controls, physical controls and hypervisor isolation. We have shipped this evidence pack into multiple Noida NM1 tenants. It satisfies the RBI inspector's question on data-centre-tenant control evidence at the next thematic review.",
      },
      {
        q: "What is the onsite cadence — same-day from Mumbai?",
        a: "Mumbai → Delhi flight (2 hours) + Aerocity → Noida drive (45-90 minutes via DND or Yamuna). Same-day kickoff onsite is feasible if mobilised before noon. We typically schedule two onsite legs in a 4-5 week engagement — one for kickoff (Sector 18 or 62) and one for the closing readout.",
      },
      {
        q: "Do you offer continuous-AppSec if our release cadence is daily or weekly?",
        a: "Yes — Noida fintechs with daily or weekly release trains often graduate from annual AppSec to continuous-AppSec. A senior consultant assigned month-on-month, regression coverage per release window, monthly executive summary and quarterly board pack. It is a separate SoW; the annual deep AppSec stays in the calendar for the regulator submission.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 19 · Ahmedabad × VAPT
  // ─────────────────────────────────────────────────────────────────────
  {
    citySlug: "ahmedabad",
    serviceSlug: "vapt",
    headline: "VAPT Services in Ahmedabad · GIFT IFSC, Pharma & Textiles",
    lead: "CERT-In empanelled VAPT for Ahmedabad and GIFT City — IFSCA-aligned for IFSC banking units plus pharma 21 CFR Part 11 for Zydus / Torrent / Cadila scopes.",
    body: [
      "Ahmedabad VAPT splits naturally into two engagement profiles that no other Indian metro combines: the GIFT City IFSC offshore-finance cluster regulated by IFSCA, and the Ahmedabad city pharma + textile + co-operative-banking estate regulated by RBI, USFDA, DCGI and DPDP. The GIFT City work involves IFSCA-format submission, cross-border operational-resilience expectations, and trading-system-specific scope. The Ahmedabad city work involves 21 CFR Part 11 audit-trail compliance, USFDA inspection-readiness, RBI Master Direction closure for co-operative banks and DPDP RoPA for retail. Macksofy delivers both from Mumbai BKC by senior consultants flying BOM → AMD in one hour and reaching GIFT City inside 90 minutes of landing.",
      "GIFT City IFSC VAPT is the headline capability. The International Financial Services Centres Authority (IFSCA) has built a cyber-security framework on RBI and SEBI baselines but with specific clauses for IFSC banking units, capital markets participants, reinsurance entities and aircraft-lessor operations. The scope includes the IFSC banking unit's IBU core platform, the foreign-currency trading-system (NSE IFSC, India INX, BSE INX participants), the IFSCA-licensed brokerage and AMC stack, and the data-residency-and-cross-border-transfer evidence the regulator demands. We maintain an IFSCA control register and submission template alongside our RBI and SEBI packs.",
      "IFSC banking unit (IBU) VAPT scoping is fundamentally different from a domestic Indian bank scope. The IBU operates in foreign currency, settles with foreign correspondent banks (often via the Mumbai parent), runs cross-border ECB / trade-finance / NRD account flows, and faces operational-resilience scrutiny that is unique to IFSC — settlement-and-clearing-cycle resilience, foreign-correspondent-bank connectivity continuity, and the IFSC-Mumbai-parent inter-relationship that IFSCA inspectors examine. We map the IBU's scope against IFSCA's cyber framework clause-by-clause and crosswalk to the Mumbai parent's RBI control register so the parent's risk-committee gets one unified view.",
      "Pharma VAPT in Ahmedabad is a top-five-generics-clean-room story. Zydus, Torrent, Cadila, Intas, Sun Ahmedabad sites — Pirana, Moraiya, Sarkhej, Changodar — host R&D campuses, API plants and formulation plants under USFDA / DCGI / EMA scrutiny. The scope mirrors our Hyderabad pharma playbook (21 CFR Part 11 audit-trail, GMP Annex 11 computerised-systems, ALCOA+ data-integrity, eTMF / EDC / LIMS / CDS lab-instrument integration) calibrated to the Ahmedabad cluster's specific operational reality — older legacy lab-instrument estates than Hyderabad, more API-plant-OT in scope, and more direct USFDA Pre-Approval Inspection cadence because the cluster ships to US generics tenders.",
      "Textile and apparel manufacturing — Ahmedabad / Surat textile belt — has a specific scope shape. Customer-data flows (retail e-commerce on Shopify / WooCommerce / Magento), supplier-network supply-chain attack surface, IoT-enabled production-line monitoring on the manufacturing floor, and the export-customer (Walmart / Amazon / Target supplier) procurement-audit-driven control catalogues that pass down to the supplier. Macksofy has delivered VAPT to several Ahmedabad apparel exporters with Walmart and Amazon procurement-audit-driven scopes.",
      "Co-operative bank VAPT is the third Ahmedabad lane. Gujarat hosts a high density of co-operative banks (UCBs and DCCBs) and Ahmedabad-headquartered NBFCs that operate under RBI Master Direction. The VAPT scope follows our Mumbai BFSI methodology — net-banking, IMPS / NEFT / RTGS rails, reconciliation-layer integrity — calibrated to the smaller-scale operations and the lower-cost-per-engagement reality these clients require. First-time co-operative bank engagements get our starter SoW with a 90-day pre-inspection rehearsal block.",
      "DPDP and USFDA cross-border-transfer evidence has become standard. Ahmedabad pharma sponsor-data flows to US partners, GIFT IFSC entities have cross-border-data flows by definition, and apparel exporters transfer customer order data to US retail customers. DPDP §16 cross-border-transfer-control evidence is collected as a base deliverable in every Ahmedabad VAPT. For pharma, the USFDA-bound cross-border-transfer to the US sponsor goes through a separate evidence collection step aligned with 21 CFR Part 11 §11.30 controls for open systems.",
      "Procurement reality matters. GIFT City IFSC entity procurement closes through the IBU CEO and the IFSC compliance officer with the IFSCA-registered DIE (Data Privacy Officer) copied. Pharma procurement closes through the IT head, the QA director and (for any GMP-validated system in scope) the head of plant operations. Co-operative bank procurement closes through the GM-IT and the board-IT-committee secretary. Onsite cadence — Mumbai → AMD flight (1 hour) + drive to GIFT City (30 minutes from airport) or to Pirana / Moraiya pharma sites (45-60 minutes). Engagement length is typically 4-8 weeks depending on scope breadth.",
    ],
    buyerConcerns: [
      "IFSCA cyber-security framework clause-by-clause submission for IBU, capital markets and reinsurance entities",
      "Cross-border operational-resilience expectations for GIFT City IFSC operations",
      "21 CFR Part 11 §11.10 and §11.30 audit-trail and open-system controls for Ahmedabad pharma",
      "GMP Annex 11 computerised-systems compliance for USFDA / EMA / DCGI submissions",
      "ALCOA+ data integrity for legacy lab-instrument estates (older than Hyderabad average)",
      "RBI Master Direction closure for Gujarat co-operative banks and NBFCs",
      "Walmart / Amazon / Target procurement-audit-driven control catalogues for apparel exporters",
      "DPDP §16 cross-border-transfer-control evidence for pharma sponsor and IFSC entity flows",
      "IFSCA-Mumbai-parent relationship reconciliation for IBU scopes",
    ],
    differentiators: [
      "IFSCA control register and submission template maintained alongside RBI / SEBI packs — IFSC-specific clauses not bolted onto a generic VAPT.",
      "Two pharma playbooks — one for legacy lab-instrument estates (more common in Ahmedabad than Hyderabad), one for cloud-enabled QC labs.",
      "IFSC-Mumbai-parent control register reconciliation — IFSCA inspector and Mumbai parent's RBI risk committee see one unified view.",
      "Procurement-audit-driven control-catalogue crosswalk for Walmart / Amazon / Target apparel-exporter scopes.",
      "Mumbai BOM → AMD one-hour flight enables same-day GIFT City or Pirana / Moraiya onsite arrival.",
    ],
    seoDescription:
      "CERT-In empanelled VAPT services in Ahmedabad and GIFT City. IFSCA-aligned for IFSC banking units, 21 CFR Part 11 for pharma, RBI for co-operative banks and DPDP §16 for cross-border flows.",
    keywords: [
      "VAPT Ahmedabad",
      "VAPT GIFT City",
      "IFSCA cyber audit",
      "GIFT IFSC VAPT",
      "Ahmedabad pharma VAPT",
      "21 CFR Part 11 audit Ahmedabad",
      "Zydus pharma cybersecurity",
      "co-operative bank VAPT Gujarat",
      "CERT-In auditor Ahmedabad",
    ],
    stats: [
      { value: "25+", label: "Ahmedabad + GIFT engagements" },
      { value: "1 hr", label: "BOM → AMD flight" },
      { value: "IFSCA", label: "Primary regulator (GIFT)" },
      { value: "USFDA", label: "Pharma inspection focus" },
    ],
    methodology: [
      {
        phase: "01 · Scope & Submission-Format Selection",
        activities: [
          "Joint kickoff with IBU CEO + IFSC compliance officer (GIFT) or IT head + QA director (pharma) or GM-IT (co-op bank)",
          "IFSCA submission format selected for IFSC scopes; CERT-In + USFDA inspection-readiness for pharma; RBI Master Direction for co-op banks",
          "Cross-border-data-flow inventory for DPDP §16 evidence collection",
          "Onsite leg schedule — GIFT City, Pirana / Moraiya pharma, or co-op bank head office",
        ],
      },
      {
        phase: "02 · Asset & Regulated-Data Map",
        activities: [
          "IFSC: IBU core, foreign-currency trading-system, capital markets participant stack, reinsurance settlement",
          "Pharma: eTMF, EDC, LIMS, CDS, lab-instrument inventory with QA walk-through (Pirana / Moraiya / Sarkhej)",
          "Apparel: customer-data e-commerce platform, supplier-portal, manufacturing-floor IoT inventory",
          "Co-op bank: net-banking, IMPS / NEFT / RTGS rails, branch-network and CMS / CBS estate",
        ],
      },
      {
        phase: "03 · Manual Exploitation",
        activities: [
          "IFSC: cross-border settlement-flow abuse, foreign-correspondent-bank-connectivity attack surface, trading-system authorisation",
          "Pharma: 21 CFR Part 11 audit-trail disable-path, ALCOA+ contemporaneity drift, CDS lab-instrument abuse",
          "Apparel: customer-order data egress, supplier-portal credential-stuffing, IoT-production-line authentication",
          "Co-op bank: net-banking transaction-graph abuse, IMPS velocity-control bypass, reconciliation-layer integrity",
        ],
      },
      {
        phase: "04 · Regulator-Format Reporting",
        activities: [
          "IFSCA submission pack with clause-by-clause crosswalk for IBU / capital markets / reinsurance scopes",
          "Pharma report in 21 CFR Part 11 / GMP Annex 11 / ALCOA+ language for the next USFDA inspection cycle",
          "RBI Master Direction submission pack for co-operative bank and NBFC scopes",
          "DPDP §16 cross-border-transfer evidence pack with contractual-safeguard reference",
        ],
      },
      {
        phase: "05 · Inspection-Defence & Re-test",
        activities: [
          "Re-test of every Critical and High inside the regulator-defined remediation window",
          "IFSCA inspection-defence support; USFDA Pre-Approval Inspection rehearsal pack for pharma",
          "Co-op bank RBI Department of Supervision inspection-defence rehearsal",
          "IFSC-Mumbai-parent risk committee reconciliation memo for IBU scopes",
        ],
      },
    ],
    industries: [
      {
        name: "GIFT IFSC banking units (IBU)",
        blurb: "IFSCA-aligned VAPT — IBU core platform, cross-border settlement, foreign-correspondent-bank connectivity.",
      },
      {
        name: "GIFT IFSC capital markets",
        blurb: "NSE IFSC / India INX / BSE INX participants — trading-system VAPT and IFSCA capital-markets clause closure.",
      },
      {
        name: "GIFT IFSC reinsurance",
        blurb: "IFSC reinsurance entities — bordereau-reporting platform VAPT, counterparty-data-flow review.",
      },
      {
        name: "Ahmedabad pharma (Zydus / Torrent / Cadila)",
        blurb: "Pirana / Moraiya / Sarkhej R&D, API and formulation plants — 21 CFR Part 11 + ALCOA+ VAPT.",
      },
      {
        name: "Apparel exporters (Ahmedabad / Surat)",
        blurb: "Customer-data e-commerce + supplier-portal + manufacturing-floor IoT VAPT with Walmart / Amazon procurement crosswalk.",
      },
      {
        name: "Gujarat co-operative banks & NBFCs",
        blurb: "UCBs / DCCBs and Ahmedabad-headquartered NBFCs — RBI Master Direction VAPT with first-time-engagement starter SoW.",
      },
    ],
    deliverables: [
      "VAPT report in CERT-In empanelled format with IFSCA / RBI / 21 CFR Part 11 crosswalk per scope",
      "IFSCA submission pack with clause-by-clause control mapping for IFSC scopes",
      "Pharma 21 CFR Part 11 + GMP Annex 11 + ALCOA+ evidence pack for the next USFDA inspection",
      "Co-operative bank RBI Master Direction submission pack with branch-network coverage memo",
      "Apparel exporter Walmart / Amazon / Target procurement-audit-driven control-catalogue crosswalk",
      "DPDP §16 cross-border-transfer evidence pack with contractual-safeguard reference",
      "IFSC-Mumbai-parent risk-committee reconciliation memo for IBU scopes",
      "Free re-test of every Critical and High inside the regulator-defined remediation window",
    ],
    caseStudy: {
      industry: "GIFT IFSC Banking Unit (Mumbai-parent group, IBU at GIFT City SEZ)",
      scope: "End-to-end IFSC VAPT — IBU core platform (4 internet-facing apps), foreign-currency trading system, two IFSC capital-markets-trading endpoints, ISO 27001 implementation cross-walked into IFSCA submission format, DPDP §16 cross-border-transfer evidence for IBU-to-Mumbai-parent flows; six-week engagement with three GIFT City onsite legs",
      outcome: "IFSCA cyber-resilience submission accepted on first read; ISO 27001 cert issued in 16 weeks; 23 Highs + 41 Mediums closed inside the regulator window; one cross-border settlement-flow abuse path closed pre-disclosure that would have allowed counterparty-bank impersonation; DPDP §16 evidence pack accepted by the Mumbai parent's risk committee; IFSC-Mumbai-parent control register reconciliation completed in the same cycle.",
    },
    faqs: [
      {
        q: "Do you understand IFSCA cyber expectations vs RBI / SEBI?",
        a: "Yes. The IFSC cyber framework is built on RBI + SEBI baselines but adds specific operational-resilience, cross-border data and trading-system clauses unique to IFSC operations. Macksofy maintains an IFSCA control register and submission template alongside our RBI and SEBI packs. Submission packs follow the format IFSCA inspectors accept on first read.",
      },
      {
        q: "Can you handle Ahmedabad pharma 21 CFR Part 11 audits for Zydus / Torrent / Cadila scopes?",
        a: "Yes — Ahmedabad pharma is one of our highest-volume engagement clusters. The scope mirrors our Hyderabad pharma playbook (21 CFR Part 11 audit-trail, GMP Annex 11 computerised-systems, ALCOA+ data-integrity, eTMF / EDC / LIMS / CDS) calibrated to the Ahmedabad operational reality. We have delivered into Pirana, Moraiya, Sarkhej and Changodar plant scopes.",
      },
      {
        q: "How do you reconcile an IFSC banking unit scope with the Mumbai parent's RBI control register?",
        a: "Single unified control register. The IBU scope's IFSCA clauses are mapped onto the Mumbai parent's RBI Master Direction clauses where they correspond, with explicit deltas where IFSC-specific operational-resilience or cross-border expectations diverge. The output is a single risk-committee-readable view that satisfies both regulators without forcing the parent to maintain two separate views.",
      },
      {
        q: "Do you serve Gujarat co-operative banks for RBI Master Direction VAPT?",
        a: "Yes. We have a starter SoW for first-time co-operative bank engagements — narrower asset count, plain-English executive summary, 90-day pre-inspection rehearsal block walking the GM-IT through likely RBI Department of Supervision questions. Engagement length is typically 4-5 weeks with two onsite legs at the head office and one branch sample.",
      },
      {
        q: "Can you handle Walmart / Amazon / Target procurement-audit-driven scopes for our apparel export business?",
        a: "Yes — we crosswalk the export customer's procurement-audit control catalogue (each customer has its own; Walmart's vendor-cybersecurity policy is the most rigorous in our experience) into the VAPT scope and produce a customer-readable evidence pack alongside the technical findings. Most Ahmedabad apparel exporter clients use this pack as their annual procurement-audit submission.",
      },
      {
        q: "How fast can you mobilise to GIFT City or to a Pirana / Moraiya pharma site?",
        a: "Mumbai → AMD flight (1 hour) + GIFT City drive (30 minutes from the airport) or Pirana / Moraiya drive (45-60 minutes). Same-day onsite kickoff is feasible if mobilised before noon. For multi-week pharma engagements with multiple site visits, we plan the visit sequence around plant shift schedules and the QA team's availability.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 20 · Dubai × Penetration Testing
  // ─────────────────────────────────────────────────────────────────────
  {
    citySlug: "dubai",
    serviceSlug: "penetration-testing",
    headline: "Penetration Testing in Dubai · DESC ISR, DIFC & DFSA",
    lead: "DESC ISR + DIFC + DFSA-aligned penetration testing for Dubai BFSI, hospitality, smart-city operators and free-zone fintech — Mumbai BKC senior bench.",
    body: [
      "Dubai penetration testing is unusual in the Middle East market because the regulator stack is unusually dense for one emirate. Every Dubai-domiciled entity faces the federal layer (NESA / UAE IA Standards from TDRA, federal PDPL 2021), the emirate layer (DESC Information Security Regulation v2 for Dubai-government-adjacent entities), and — for DIFC-licensed entities — the financial-free-zone layer (DFSA cyber-resilience expectations plus DIFC Data Protection Law). The pentest must produce evidence that closes the most-stringent regulator in the engagement scope. Macksofy delivers Dubai pentest engagements with all four submission formats pre-templated; the senior consultant selects the right one at kickoff based on the entity's regulator profile.",
      "DESC ISR v2 is the headline framework. The Dubai Electronic Security Centre's Information Security Regulation v2 (effective 2024, updated 2025) imposes a 14-domain control framework with annual audit submission for Dubai-government-adjacent entities. The pentest scope must produce evidence for ISR v2 domains 1-5 (governance, asset management, identity, access control, cryptography) and the operational-testing evidence for domains 6-14 (network security, applications, OT, supplier management, incident response, BCP, monitoring, vulnerability management, awareness). Macksofy maintains the DESC ISR v2 control register and submission template; pentest findings map directly to the control numbering DESC inspectors read.",
      "DIFC + DFSA scoping has its own profile. DIFC-licensed entities (Category 1-5 Authorised Firms, designated investment businesses, market intermediaries) face DFSA cyber-resilience expectations that the DFSA Authorised Officer reviews at the annual cyber-resilience self-assessment cycle. The pentest must produce the evidence that supports the self-assessment claims. Scoping covers the DIFC entity's customer-facing platform, the DFSA-supervised trading or asset-management platform, the DIFC Data Protection Law DPIA evidence, and (where the entity is part of a global parent) the parent's cyber-resilience standard. Macksofy maintains the DFSA cyber-resilience-self-assessment template and pre-fills it from pentest evidence.",
      "Adversary emulation is the default methodology. Dubai BFSI and hospitality clients run modern EDR (CrowdStrike Falcon, SentinelOne, Microsoft Defender for Endpoint, Trend Micro Vision One) and modern SIEM (Splunk Enterprise Security, Microsoft Sentinel, IBM QRadar, Securonix). Macksofy's Dubai pentest bench is calibrated to operate under this telemetry — AMSI / ETW patching, direct syscall invocation, in-process LDAP queries — with the post-engagement EDR-and-SIEM detection-content reconciliation that drives purple-team integration. Threat-actor emulation profiles are calibrated to the regional threat landscape (FIN8-style financial actors, MuddyWater / OilRig-style regional APTs targeting energy and government, Lazarus-adjacent groups targeting financial services).",
      "Smart Dubai operator scope is a specific Dubai capability. Smart Dubai initiatives, government-portal operators (UAE PASS digital-identity, Dubai Now app, DubaiNow integration partners) and smart-city back-end operators face DESC ISR plus NESA plus citizen-data-residency requirements. Pentest scopes for these operators cover citizen-portal AppSec depth, digital-identity integration trust paths, cross-tenant isolation evidence, and the citizen-data residency-and-encryption controls the Dubai Digital Authority expects. Macksofy has shipped this scope into Smart Dubai-adjacent operators.",
      "Hospitality and retail pentest scoping in Dubai is unique to the region. Emaar, Damac, Majid Al Futtaim, Jumeirah Group, Atlantis, Address Hotels — Dubai hospitality and large-format retail estates run complex IT-and-OT environments (PMS systems like Opera and OnQ, point-of-sale, kiosk networks, smart-room controls, restaurant-payment terminals, loyalty-platform integration). Pentest scopes here include PMS authentication-and-authorisation depth, POS-network segregation, smart-room control-plane integrity (the hotel-IoT angle that became a regulator priority after several regional smart-room compromise incidents), and loyalty-program data-isolation. Customer-data flows for foreign-tourist data trigger PDPL + DIFC DP Law + (where applicable) GDPR cross-border-transfer evidence collection.",
      "Procurement reality matters. Dubai BFSI and DIFC fintech procurement closes through the CISO and the Authorised Officer (the DFSA-mandated senior individual responsible for cyber). DESC-scoped Dubai-government-adjacent entity procurement closes through the head of IT and the entity's DESC Liaison Officer. Hospitality procurement closes through the CISO with the GM operations and the brand-parent's CISO copied. Engagement letters cover trespass-and-deception, physical assessment indemnity (which the hotel-pentest cases routinely use), and the production safe-harbour clause for live PMS / POS testing. UAE law applies with DIFC Courts jurisdiction for DIFC entities or UAE federal courts otherwise. Engagement billed in AED with 5% VAT line.",
      "Onsite cadence is anchored from Mumbai BKC. BOM → DXB flight is 3 hours; most Dubai client sites are 20-30 minutes from DXB. Senior consultants land Tuesday morning, kickoff Tuesday afternoon (DIFC, Business Bay, Internet City, JLT, Dubai South, Trade Centre) and run a 5-7 week engagement with two further onsite legs (mid-engagement and closing). For sustained multi-quarter programmes we maintain an embedded Dubai-resident tech lead with a local mobile and a DIFC visiting-base. Most engagements complete with a final DESC ISR / DFSA / DIFC DP Law evidence pack the client's regulator-liaison submits within the next reporting window.",
    ],
    buyerConcerns: [
      "DESC ISR v2 control-by-control evidence with the 14-domain framework crosswalk",
      "DFSA cyber-resilience self-assessment template pre-filling from pentest evidence",
      "DIFC Data Protection Law DPIA evidence collection for DIFC-licensed entities",
      "Federal PDPL 2021 cross-border-transfer evidence for foreign-tourist and customer data",
      "Regional threat-actor emulation — FIN8, MuddyWater / OilRig, Lazarus-adjacent profiles",
      "EDR / SIEM detection-content reconciliation post-engagement (CrowdStrike, Sentinel, Securonix)",
      "Smart Dubai citizen-data-residency-and-encryption controls for Dubai-government-adjacent operators",
      "Hospitality PMS / POS / smart-room / loyalty-platform scope coverage",
      "DIFC Courts jurisdiction engagement letter with AED + UAE VAT billing",
    ],
    differentiators: [
      "Four pre-templated regulator submissions — DESC ISR v2, DFSA cyber-resilience self-assessment, DIFC DP Law DPIA, NESA / UAE IA Standards — selected at kickoff per entity profile.",
      "DESC ISR v2 14-domain control register maintained against the current DESC release — submissions accepted on first read without rework.",
      "Regional threat-actor emulation calibrated to the Middle East threat landscape — FIN8, MuddyWater, OilRig, Lazarus-adjacent — not a US-template translated to the region.",
      "Hospitality and smart-city operator capability — PMS / POS / smart-room / loyalty-platform / citizen-portal scopes covered in-house, not subcontracted.",
      "Mumbai BKC senior bench at three-hour BOM → DXB flight distance — same-day onsite arrival; embedded Dubai-resident tech lead for multi-quarter programmes.",
    ],
    seoDescription:
      "DESC ISR + DIFC + DFSA-aligned penetration testing in Dubai for BFSI, hospitality, smart-city and free-zone fintech. Regional threat-actor emulation, EDR-aware tradecraft, Mumbai BKC senior bench.",
    keywords: [
      "penetration testing Dubai",
      "Dubai pentest BFSI",
      "DESC ISR pentest Dubai",
      "DIFC penetration testing",
      "DFSA cyber resilience Dubai",
      "Dubai red team",
      "JLT pentest",
      "Internet City pentest",
      "smart Dubai cybersecurity",
    ],
    stats: [
      { value: "DESC + DFSA + DIFC", label: "Regulator submission ready" },
      { value: "3 hr", label: "BOM → DXB flight" },
      { value: "5-7 wks", label: "Typical engagement" },
      { value: "Regional APT", label: "Threat-actor emulation" },
    ],
    methodology: [
      {
        phase: "01 · Regulator-Profile & Scope",
        activities: [
          "Joint kickoff with CISO + Authorised Officer (DFSA) / DESC Liaison (DESC-scoped) / GM + brand-CISO (hospitality)",
          "Submission format selection — DESC ISR v2, DFSA self-assessment, DIFC DP Law DPIA or NESA",
          "Engagement letter — UAE law, DIFC Courts jurisdiction for DIFC entities, AED billing with 5% VAT",
          "Threat-actor emulation profile — FIN8 / MuddyWater / OilRig / Lazarus-adjacent per entity threat model",
        ],
      },
      {
        phase: "02 · Recon & Initial Access",
        activities: [
          "OSINT against the entity's customer base, employee base and supplier-vendor ecosystem in the region",
          "Regional spear-phish lure calibration (Arabic + English bilingual lure, Ramadan / Eid / National Day timing)",
          "DESC ISR-domain-6 external attack-surface enumeration with the entity's DESC Liaison sign-off",
          "Physical assessment legs at DIFC / Business Bay / Internet City / JLT towers where the engagement letter permits",
        ],
      },
      {
        phase: "03 · Adversary Emulation",
        activities: [
          "EDR-aware tradecraft against CrowdStrike Falcon / Sentinel / SentinelOne / Trend Micro Vision One telemetry",
          "ADCS / Kerberos / SCCM / AAD-Connect privilege paths on the entity's identity estate",
          "Hospitality PMS / POS / smart-room control-plane / loyalty platform abuse cases where in scope",
          "Smart Dubai citizen-portal / digital-identity integration / cross-tenant isolation testing where in scope",
        ],
      },
      {
        phase: "04 · Regulator-Format Reporting",
        activities: [
          "DESC ISR v2 14-domain crosswalk per finding with submission-format pre-filling",
          "DFSA cyber-resilience-self-assessment evidence pre-fill for DIFC Authorised Firms",
          "DIFC Data Protection Law DPIA evidence collection and breach-notification-format pre-fill",
          "PDPL 2021 cross-border-transfer evidence pack with contractual-safeguard reference",
        ],
      },
      {
        phase: "05 · SOC Tabletop & Re-test",
        activities: [
          "Joint SOC tabletop with the entity's SOC / MSSP partner and kill-chain replay",
          "EDR + SIEM detection-content reconciliation — paired Sigma / SPL / KQL rules per missed alert",
          "Free re-test of every Critical and High inside the regulator-defined remediation window",
          "Embedded Dubai-resident tech lead handover for multi-quarter programme continuity",
        ],
      },
    ],
    industries: [
      {
        name: "DIFC-licensed BFSI",
        blurb: "DIFC Category 1-5 Authorised Firms — DFSA cyber-resilience self-assessment pre-fill + DIFC DP Law DPIA.",
      },
      {
        name: "Foreign-bank regional HQs",
        blurb: "JLT / DIFC / Business Bay foreign-bank regional HQs — parent-control-catalogue crosswalk on Dubai entity.",
      },
      {
        name: "Smart Dubai operators",
        blurb: "UAE PASS / Dubai Now / smart-city operators — DESC ISR + citizen-data-residency + cross-tenant isolation testing.",
      },
      {
        name: "Hospitality & retail majors",
        blurb: "Emaar / Damac / Majid Al Futtaim / Jumeirah / Atlantis / Address — PMS / POS / smart-room / loyalty platform scope.",
      },
      {
        name: "Free-zone fintech (DIFC / ADGM-adjacent)",
        blurb: "DIFC fintech and adjacent ADGM-licensed entities — DFSA / FSRA self-assessment + cyber-resilience evidence.",
      },
      {
        name: "Airlines & logistics",
        blurb: "Emirates / FlyDubai / DP World / Dubai Customs — booking-platform / cargo-platform / customs-clearance scope.",
      },
    ],
    deliverables: [
      "Pentest report with DESC ISR v2 / DFSA / DIFC DP Law / NESA submission-format pre-fill per entity scope",
      "Regional threat-actor emulation playbook with technique-by-technique reconciliation",
      "Hospitality / smart-city / DIFC fintech / Smart Dubai scope-specific finding catalogue",
      "EDR + SIEM detection-content (Sigma / SPL / KQL) shipped post-engagement",
      "DESC ISR v2 14-domain control register with submission-ready evidence collection",
      "DFSA cyber-resilience-self-assessment pre-filled template for DIFC Authorised Firms",
      "PDPL 2021 + DIFC DP Law cross-border-transfer evidence pack",
      "Free re-test of every Critical and High inside the regulator-defined remediation window",
    ],
    caseStudy: {
      industry: "DIFC-licensed Category-3 Asset Manager (Dubai HQ at DIFC Gate Village, US + EU institutional client base)",
      scope: "Adversary-emulation pentest — single objective: silent reach of the portfolio-management system from a guest Wi-Fi position by D+12 without SOC detection; CrowdStrike Falcon endpoint, Splunk Enterprise Security, Okta IDP; DFSA cyber-resilience self-assessment evidence; DIFC DP Law DPIA for institutional client data; 6-week engagement with three DIFC onsite legs",
      outcome: "Objective met at D+9 via a vendor-portal watering-hole compromise → Okta phish → assume-role to the portfolio-management system; 8 missed Splunk ES use-cases reconciled and 9 paired SPL rules adopted by the SOC inside two weeks; DFSA cyber-resilience self-assessment pre-fill accepted on first read; DIFC DP Law DPIA evidence pack accepted by the DIFC Data Protection Commissioner without rework; one ADCS ESC4 path closed pre-disclosure that would have allowed PMS-administrator escalation to the back-office GL.",
    },
    faqs: [
      {
        q: "Will your pentest evidence DESC ISR v2 control closure for our Dubai-government-adjacent entity?",
        a: "Yes — every Dubai pentest with a DESC-scoped entity maps findings against the DESC ISR v2 14-domain control framework. The submission pack is pre-filled from the engagement's evidence — DESC inspectors accept it on first read without rework. We maintain the DESC ISR v2 control register against the current DESC release cycle.",
      },
      {
        q: "Can you pre-fill the DFSA cyber-resilience self-assessment from pentest evidence?",
        a: "Yes — the DFSA cyber-resilience self-assessment is the highest-overhead annual cycle for DIFC Authorised Firms. Macksofy maintains the self-assessment template and pre-fills it from the pentest's evidence so the Authorised Officer only validates and signs, rather than authoring the whole submission from scratch. Most DIFC clients consider this the single largest time-saving in the engagement.",
      },
      {
        q: "Do you handle hospitality scopes — PMS / POS / smart-room / loyalty platform?",
        a: "Yes. Dubai hospitality and retail is a major sub-segment of our regional practice. The scope covers PMS authentication-and-authorisation (Opera, OnQ, Protel, smaller brand-specific platforms), POS-network segregation (Aloha, NCR, MICROS), smart-room control-plane integrity (the regulator-priority area after several regional smart-room compromise incidents), and loyalty-program data isolation. Foreign-tourist data triggers PDPL + DIFC DP Law + (where applicable) GDPR cross-border-transfer evidence collection.",
      },
      {
        q: "Which threat-actor profiles do you emulate for Middle East engagements?",
        a: "Regional calibration — FIN8-style financial actors for BFSI, MuddyWater / OilRig-style regional APTs for energy / government / smart-city, Lazarus-adjacent groups for financial services with cross-border exposure. Emulation profiles are signed off at kickoff with the entity's threat-intel feed input. The deliverable maps technique-by-technique to MITRE ATT&CK with regional sub-technique calibration.",
      },
      {
        q: "How is the engagement billed and what is the legal jurisdiction?",
        a: "Billed in AED with the 5% UAE VAT line, invoiced from our regional billing entity. Engagement letter under UAE law — DIFC Courts jurisdiction for DIFC-licensed entities, ADGM Courts for ADGM-licensed entities, UAE federal courts otherwise. Records retention aligned to the strictest regulator on the engagement — DFSA 7 years for BFSI, DESC ISR v2 5 years for Dubai-government, PDPL retention otherwise.",
      },
      {
        q: "How fast can senior consultants mobilise to a Dubai engagement?",
        a: "Mumbai BKC senior consultants fly Mumbai → DXB (3 hours) and reach DIFC, Business Bay, Internet City or JLT in 20-30 minutes from the airport. Same-day kickoff is feasible if mobilised Monday afternoon for a Tuesday morning onsite. For sustained multi-quarter programmes we embed a Dubai-resident tech lead with a local mobile and a DIFC visiting-base.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 21 · Chennai × Managed SOC
  // ─────────────────────────────────────────────────────────────────────
  {
    citySlug: "chennai",
    serviceSlug: "managed-soc",
    headline: "Managed SOC in Chennai · PSU Banks, Auto OEM & OMR SaaS",
    lead: "24×7 SOC for Chennai PSU banks, Sriperumbudur / Oragadam auto OEMs and OMR SaaS — RBI CSF Annex-2 + IEC-62443 + SOC 2 detection content.",
    body: [
      "Chennai's managed-SOC buyer concentration is uniquely vertical-diversified. PSU and private banks headquartered in Chennai (Indian Bank, Indian Overseas Bank, several cooperative banks) need RBI Cyber Security Framework Annex-2 monitoring evidence at the next CSITE Cell or Department of Financial Services thematic review. Auto OEMs and Tier-1 suppliers across the Sriperumbudur / Oragadam / Maraimalai Nagar belt need OT-aware monitoring aligned to IEC-62443 plus (for German / Japanese / Korean automaker customers) TISAX or equivalent. OMR (Old Mahabalipuram Road) SaaS unicorns and product companies need SOC 2 Type II CC7 evidence on demand. And the Tamil Nadu state-government IT estate (TNeGA-affiliated entities, Aavin / state PSUs) needs CERT-In + DPDP monitoring evidence. Macksofy's Chennai SOC operation is engineered for this diversity.",
      "The platform model is identical to Hyderabad and Pune — bring-your-own SIEM (Splunk Enterprise Security, Microsoft Sentinel, IBM QRadar, Elastic Security, Sumo Logic), bring-your-own EDR (CrowdStrike, SentinelOne, Microsoft Defender for Endpoint, Trellix), three-tier analyst structure (T1 24×7, T2 8×5, T3 on-call DFIR), and the standard cadence (monthly executive summary, quarterly board pack, half-yearly purple-team, annual SOC 2 / NIST / RBI evidence pack). What differs is the detection-content library — Chennai's library is calibrated for the combined BFSI-OT-SaaS-government estate that Chennai buyers operate.",
      "PSU bank detection content is the headline for the BFSI lane. The library covers RBI Cyber Security Framework Annex-2 monitoring requirements (continuous monitoring of the IT estate, the ATM-network, the branch-network and the payment-rail estate), Indian Banks' Association (IBA) framework-derived use-cases, and (for cooperative banks under RBI Department of Supervision oversight) the Department-specific monitoring expectations. PSU bank scope typically includes the Finacle / BaNCS / commercial-banking platform telemetry, the legacy mainframe-RACF telemetry, the ATM-network anomaly stream, the branch-network connectivity stream and the customer-portal-and-mobile-banking surface. We have shipped this content into Chennai PSU bank SOC operations.",
      "Auto OEM Tier-1 supplier content is the second pillar. The Sriperumbudur / Oragadam / Maraimalai Nagar auto belt hosts Hyundai's largest Indian plant, Ford's former Chennai plant (now Tata Passenger Vehicles), Renault-Nissan Alliance, BMW India, Daimler Trucks India, and a large supplier base feeding Volkswagen / Audi / Mercedes-Benz / Toyota / Honda procurement. The detection-content library mirrors our Pune SOC's OT library — IEC-62443-3-3 SR / SL mapping, Purdue-Level segmentation event detection, OPC UA / Modbus / EtherNet/IP / PROFINET protocol anomaly, IT-to-OT lateral movement detection — calibrated to the Chennai cluster's specific platforms (Hyundai's Korean platform stack differs from Pune's German-stack auto OEMs).",
      "OMR SaaS content layers in the SaaS / fintech / product playbook from our Hyderabad and Bengaluru libraries. Multi-tenant authz anomaly, OAuth / SAML federation anomaly, IAM-spike detection (Pass Role abuse, KMS key-policy modification, Lambda execution-role lateral), CI/CD pipeline anomaly (GitHub Actions OIDC abuse, GitLab runner privilege) and customer-data-egress detection. SOC 2 Type II CC7 evidence is produced on demand. OMR SaaS unicorns operating internationally also get DPDP §16 cross-border-transfer monitoring as a base deliverable.",
      "TNeGA and state-government scope adds a fourth playbook layer. Tamil Nadu e-Governance Authority (TNeGA), Aavin Dairy, Tamil Nadu state PSUs and adjacent state IT-services contractors face CERT-In + DPDP + Tamil-language data-handling requirements. Detection content for state-government scope covers citizen-portal anomaly, Tamil-language frontend abuse, Aadhaar AUA / KUA integration anomaly (for state-portal Aadhaar-enabled services), and the TNeGA-specific monitoring expectations. State-government SOC engagements typically include Tamil-language documentation deliverables alongside English.",
      "Tier structure is calibrated to Chennai geography. Tier-1 (24×7 SIEM triage) operates from Mumbai BKC and Hyderabad HITEC City SOC floors. Tier-2 (8×5 senior analyst) operates from Mumbai BKC with a Hyderabad senior overlap during South India working-hours plus a Chennai-resident senior for multi-quarter PSU bank programmes. Tier-3 (on-call DFIR specialist) mobilises from Mumbai or Hyderabad — Mumbai → MAA flight is 90 minutes, Hyderabad → MAA flight is 60 minutes, drive-time from MAA to OMR is 45 minutes and to Sriperumbudur is 90 minutes. Onsite SLA at any OMR, Tidel Park, Velachery, Sriperumbudur, Oragadam or Chennai central client site is 6 hours from escalation.",
      "Procurement reality matters. Chennai PSU bank SOC engagements close through the GM-IT, the CISO and the bank's board-IT-committee secretary, with milestone payments tied to CAG audit cycles per PSU procurement convention. Auto OEM Tier-1 supplier SOC closes through the IT head, the plant operations head and (for foreign-OEM-customer scopes) the customer's regional cyber-security function. OMR SaaS closes through the CTO and head of SRE / cloud-engineering in a single weekly sync. State-government engagements close through the procuring department's IT head with TN-eGA panel routing. Engagement length is typically 12-24 months for PSU bank SOC retainers and 12 months for the other lanes.",
    ],
    buyerConcerns: [
      "PSU bank RBI Cyber Security Framework Annex-2 continuous monitoring evidence for CSITE / DFS thematic reviews",
      "Auto OEM IEC-62443-3-3 + TISAX-equivalent monitoring for Sriperumbudur / Oragadam Tier-1 suppliers",
      "Hyundai / Renault-Nissan / BMW / Daimler Trucks customer-procurement-driven control catalogues",
      "OMR SaaS SOC 2 Type II CC7 evidence on demand with DPDP §16 overlay",
      "TNeGA + Aadhaar AUA / KUA + Tamil-language frontend monitoring for state-government scope",
      "Bring-your-own SIEM and EDR — no vendor lock-in",
      "Tier-3 DFIR mobilisation inside 6 hours from Mumbai or Hyderabad",
      "Cooperative bank starter SoW for first-time RBI Department of Supervision monitoring",
      "Tamil-language documentation deliverables for state-government scope",
    ],
    differentiators: [
      "Four pre-built detection-content libraries — PSU bank (RBI CSF Annex-2), auto OEM (IEC-62443 + TISAX-equivalent), OMR SaaS (SOC 2 CC + DPDP), state-government (TNeGA + Aadhaar) — selected per client estate at kickoff.",
      "Bring-your-own SIEM and EDR with content shipped in vendor-native format (SPL / KQL / ESQL / AQL) — no platform lock-in.",
      "Chennai-resident senior analyst for multi-quarter PSU bank SOC programmes; Tamil-language documentation for state-government scope.",
      "Tier-3 DFIR mobilisation in 6 hours from Mumbai or Hyderabad (60-90 min flight + 45-90 min drive) — onsite SLA inside the regulator-defined incident-response window.",
      "Korean / German / Japanese-OEM-platform-specific OT content calibration — not a Pune library translated to Chennai's auto OEM stack.",
    ],
    seoDescription:
      "24×7 managed SOC in Chennai for PSU banks, Sriperumbudur auto OEMs and OMR SaaS. RBI CSF Annex-2, IEC-62443, SOC 2 + DPDP detection content. Bring-your-own SIEM / EDR.",
    keywords: [
      "managed SOC Chennai",
      "SOC services OMR Chennai",
      "PSU bank SOC Chennai",
      "RBI CSF Annex 2 monitoring Chennai",
      "auto OEM SOC Sriperumbudur",
      "IEC 62443 SOC Chennai",
      "TNeGA SOC services",
      "Tamil Nadu cybersecurity SOC",
      "Chennai 24x7 cyber monitoring",
    ],
    stats: [
      { value: "24×7", label: "Continuous monitoring" },
      { value: "Four libraries", label: "BFSI / OT / SaaS / Govt" },
      { value: "<6 hrs", label: "Chennai DFIR onsite SLA" },
      { value: "BYO-SIEM", label: "No vendor lock-in" },
    ],
    methodology: [
      {
        phase: "01 · Kickoff & Library Selection",
        activities: [
          "Joint kickoff with GM-IT + CISO (PSU bank) / IT head + plant operations (auto OEM) / CTO + SRE head (SaaS) / IT head + TNeGA panel (govt)",
          "Detection-content library selection — one or more of PSU bank / auto OEM / OMR SaaS / state-government",
          "SIEM and EDR platform confirmation, telemetry source inventory",
          "Tier-3 DFIR onsite SLA codification (6 hours from Mumbai or Hyderabad)",
        ],
      },
      {
        phase: "02 · Content Shipment & Tuning",
        activities: [
          "Vendor-native detection content shipment in SPL / KQL / ESQL / AQL",
          "PSU bank: RBI CSF Annex-2 continuous-monitoring use-cases for IT / ATM / branch / payment-rail estate",
          "Auto OEM: IEC-62443-3-3 + Korean / German / Japanese-OEM-platform-specific OT content",
          "OMR SaaS: SOC 2 CC7 + DPDP §16 detection content with cloud-native AWS / GCP / Azure coverage",
          "State-government: TNeGA + Aadhaar AUA / KUA + Tamil-language frontend monitoring content",
        ],
      },
      {
        phase: "03 · Go-Live & Runbook",
        activities: [
          "Baseline tuning and false-positive suppression against the customer's actual traffic patterns",
          "Runbook review with the customer's IT and (where applicable) plant operations / TNeGA panel",
          "Go-live cutover with paired Tier-2 senior on-site for the first 72 hours at OMR / Sriperumbudur / central Chennai",
          "First executive summary delivered at Day 30",
        ],
      },
      {
        phase: "04 · Steady-State Operation",
        activities: [
          "24×7 Tier-1 triage from Mumbai BKC + Hyderabad HITEC City SOC floors",
          "Tier-2 threat-hunting and complex correlation 8×5 with Chennai-resident senior for PSU bank scope",
          "Tier-3 DFIR on-call with 6-hour Chennai mobilisation from Mumbai or Hyderabad",
          "TNeGA / state-government scope: Tamil-language daily handover briefing where required",
        ],
      },
      {
        phase: "05 · Compliance & Purple-Team Cadence",
        activities: [
          "Monthly executive summary in scope-appropriate language (PSU bank, OT, SaaS or government)",
          "Quarterly board pack with trend narrative and detection-content refresh",
          "Half-yearly purple-team exercise with the Macksofy red-team bench",
          "Annual RBI CSF Annex-2 / TISAX-equivalent / SOC 2 Type II / TNeGA-format evidence pack delivery",
        ],
      },
    ],
    industries: [
      {
        name: "Chennai PSU banks",
        blurb: "Indian Bank / IOB / cooperative banks — RBI CSF Annex-2 continuous monitoring with CAG-aligned milestone payments.",
      },
      {
        name: "Auto OEMs & Tier-1 suppliers",
        blurb: "Sriperumbudur / Oragadam / Maraimalai Nagar — Hyundai / Renault-Nissan / BMW / Daimler Trucks platforms with IEC-62443 + customer-driven catalogues.",
      },
      {
        name: "OMR SaaS unicorns",
        blurb: "OMR product companies — SOC 2 CC7 + DPDP §16 + AWS / GCP / Azure cloud-native detection content.",
      },
      {
        name: "TNeGA & state-government",
        blurb: "Tamil Nadu state IT estate — TNeGA + Aadhaar AUA / KUA + Tamil-language frontend monitoring.",
      },
      {
        name: "Healthcare & clinical research",
        blurb: "Chennai healthcare delivery + clinical-research operations — HIPAA + DPDP §16 evidence with QA / IT joint oversight.",
      },
      {
        name: "BPO / IT services delivery centres",
        blurb: "OMR / Tidel Park IT-services delivery centres — VDI + shared-dev + customer-IP-egress detection with parent-control overlay.",
      },
    ],
    deliverables: [
      "24×7 SOC operation with documented SLA per severity tier",
      "Vendor-native detection content shipped into the customer's SIEM",
      "PSU bank RBI CSF Annex-2 continuous-monitoring use-case library",
      "Auto OEM IEC-62443-3-3 + Korean / German / Japanese-platform-specific OT content",
      "OMR SaaS SOC 2 CC7 + DPDP §16 detection content with cloud-native coverage",
      "TNeGA + Aadhaar AUA / KUA + Tamil-language frontend monitoring content",
      "Monthly executive summary, quarterly board pack, half-yearly purple-team exercise",
      "Annual RBI CSF Annex-2 / TISAX-equivalent / SOC 2 Type II / TNeGA evidence-pack delivery",
    ],
    caseStudy: {
      industry: "Chennai-headquartered PSU Bank (head office Chennai central, 4,200+ branches across South India)",
      scope: "24×7 managed SOC across Finacle core, legacy mainframe-RACF, ATM-network (3,800+ ATMs), branch-network connectivity (4,200+ branches), customer-portal and mobile banking; Splunk Enterprise Security platform; RBI CSF Annex-2 continuous-monitoring content shipped; quarterly CSITE Cell-format evidence cycle plus annual CAG-aligned milestone reporting",
      outcome: "Two ATM-network anomaly events traced to attempted card-skimming injection attacks, blocked at the WAF and ATM-application boundary inside 6 minutes of first detection; one branch-network credential-stuffing campaign mitigated at the central authentication boundary; three legacy mainframe-RACF entitlement-creep events flagged and remediated under the bank's quarterly access review; RBI CSITE Cell thematic review cleared with zero clarifications on the monitoring evidence; CAG audit cycle milestone payment released on schedule.",
    },
    faqs: [
      {
        q: "Can your SOC produce RBI CSF Annex-2 continuous-monitoring evidence for our PSU bank's next CSITE Cell review?",
        a: "Yes — RBI CSF Annex-2 continuous-monitoring content is the headline library for our Chennai PSU bank scope. Continuous monitoring of the IT estate, the ATM-network, the branch-network and the payment-rail estate is shipped on day one in your SIEM-native rule format. Monthly executive summary in RBI-inspector-readable language; quarterly evidence pack for CSITE Cell or DFS thematic review.",
      },
      {
        q: "Do you handle Korean / German / Japanese-OEM-platform OT content for our auto OEM Tier-1 scope?",
        a: "Yes — Chennai's auto OEM stack differs from Pune's German-stack OEMs. Hyundai Korean platforms, Renault-Nissan Alliance French / Japanese stack, BMW German stack, Daimler Trucks German stack each have platform-specific telemetry calibration. The OT-aware detection-content library is calibrated to the specific platforms in your plant rather than being a Pune library translated to Chennai.",
      },
      {
        q: "Can you support Tamil-language documentation for our TNeGA / state-government scope?",
        a: "Yes — state-government SOC engagements typically include Tamil-language documentation deliverables alongside English. Daily handover briefings, monthly executive summary, runbooks and the annual TNeGA-format evidence pack are produced in both languages. Macksofy has Tamil-fluent senior consultants for the dual-language work.",
      },
      {
        q: "How fast can Tier-3 DFIR mobilise from Mumbai or Hyderabad to OMR or Sriperumbudur?",
        a: "Mumbai → MAA flight is 90 minutes; Hyderabad → MAA flight is 60 minutes; drive-time from MAA to OMR is 45 minutes and to Sriperumbudur is 90 minutes. Total mobilisation inside 6 hours from escalation to onsite at any Chennai client site. For sustained PSU bank programmes we maintain a Chennai-resident senior analyst with a local mobile.",
      },
      {
        q: "Will the engagement produce SOC 2 Type II CC7 evidence for our OMR SaaS audit?",
        a: "Yes — SOC 2 CC7 evidence on demand is the default for OMR SaaS scope. Use-case-performance reports, incident response evidence, vulnerability management evidence and the monthly executive summary together drop directly into the next SOC 2 Type II audit window. The Annual SOC 2 evidence pack is delivered as a structured artefact the auditor accepts without rework.",
      },
      {
        q: "What is the engagement length and exit clause?",
        a: "PSU bank SOC retainers are typically 12-24 months tied to CAG audit cycles with milestone payments. Other lanes (auto OEM, OMR SaaS, state-government) are standard 12-month engagements with 60-day notice termination after the first 6 months. Exit clause includes a 30-day knowledge-transfer window — the customer retains the SIEM, the detection content in source-controlled format, the runbooks and the threat-intel-feed configuration.",
      },
    ],
  },
];

export const getCombo = (
  city: string,
  service: string,
): CityServiceCombo | undefined =>
  COMBOS.find((c) => c.citySlug === city && c.serviceSlug === service);

export const COMBO_PAIRS = COMBOS.map((c) => ({
  city: c.citySlug,
  service: c.serviceSlug,
}));
