/**
 * Short-answer registry — definition-first 40–60-word answers rendered in the
 * <AnswerBox> under a page H1 for AEO/GEO (AI Overviews, Perplexity, ChatGPT,
 * featured snippets, voice).
 *
 * Keyed by `"<kind>:<slug>"` — kind ∈ service | audit | industry | city |
 * course | combo | blog. Templates look up their key and render the box only
 * when an entry exists, so coverage rolls out progressively without ever
 * shipping an empty box.
 *
 * Authoring rules (keep future entries consistent):
 *   • Lead with the definition ("X is …"), plain language, no marketing adjectives.
 *   • 40–60 words. One paragraph. Answerable/quotable standalone.
 *   • End with what Macksofy specifically does + India/UAE where it's true.
 *   • Never claim a capability or credential Macksofy doesn't have.
 */

export interface ShortAnswer {
  /** Question-phrased H2 rendered above the answer. */
  q: string;
  /** 40–60 word definition-first answer. */
  a: string;
}

export const SHORT_ANSWERS: Record<string, ShortAnswer> = {
  // ─────────────────────────── SERVICES (24) ───────────────────────────
  "service:penetration-testing": {
    q: "What is penetration testing?",
    a: "Penetration testing is an authorized, simulated cyberattack in which security engineers safely exploit vulnerabilities in your applications, network, or cloud to prove real business impact before criminals do. Macksofy delivers CERT-In-format penetration tests across India and the UAE, each with proof-of-concept exploits and a remediation retest included.",
  },
  "service:vapt": {
    q: "What is VAPT?",
    a: "VAPT (Vulnerability Assessment and Penetration Testing) combines automated scanning with manual, expert-led exploitation. The assessment finds weaknesses at breadth; the penetration test proves which are actually exploitable and how far an attacker could reach. Macksofy delivers CERT-In-empanelled VAPT for BFSI, fintech, and SaaS across India and the UAE.",
  },
  "service:managed-soc": {
    q: "What is a managed SOC?",
    a: "A managed SOC (Security Operations Center) is an outsourced team that monitors your logs, detects threats, and responds to incidents around the clock using a SIEM. Macksofy builds and runs SOCs on Wazuh, Microsoft Sentinel, and Splunk, with detection content mapped to RBI, SEBI, and MITRE ATT&CK.",
  },
  "service:web-application-security": {
    q: "What is web application penetration testing?",
    a: "Web application penetration testing manually probes your website or web app for exploitable flaws — injection, broken authentication, access-control gaps, and business-logic abuse — using the OWASP methodology. Macksofy delivers CERT-In-format web app pentests with working proof-of-concept exploits and developer-ready remediation across India and the UAE.",
  },
  "service:api-security": {
    q: "What is API security testing?",
    a: "API security testing manually assesses your REST, GraphQL, and mobile-backend APIs against the OWASP API Security Top 10 — BOLA/IDOR, broken authentication, mass assignment, and rate-limit abuse. Macksofy validates each finding with a working exploit and maps fixes to your framework, for fintech and SaaS across India and the UAE.",
  },
  "service:mobile-application-security": {
    q: "What is mobile application security testing?",
    a: "Mobile app penetration testing assesses your Android and iOS apps against the OWASP MASVS — insecure storage, certificate-pinning bypass, weak crypto, and API abuse — combining static and dynamic analysis on real devices. Macksofy delivers CERT-In-format mobile pentests for banking and fintech apps across India and the UAE.",
  },
  "service:cloud-security": {
    q: "What is a cloud security assessment?",
    a: "A cloud security assessment reviews your AWS, Azure, or GCP environment for misconfigurations, over-permissive IAM, exposed storage, and weak network controls, benchmarked against CIS and provider best practice. Macksofy combines CSPM tooling with manual review and maps findings to RBI, SEBI, and DPDP data-residency requirements.",
  },
  "service:red-teaming": {
    q: "What is red teaming?",
    a: "Red teaming is a goal-based, full-scope adversary simulation that tests people, process, and technology together — using phishing, physical, and assumed-breach entry to reach a defined objective such as domain admin or a payment system. Macksofy runs MITRE ATT&CK-aligned red teams for Indian BFSI and UAE banks.",
  },
  "service:digital-forensics-incident-response": {
    q: "What is DFIR?",
    a: "DFIR (Digital Forensics and Incident Response) is the discipline of containing a live cyberattack, investigating how it happened, and recovering safely — covering ransomware, business email compromise, and Active Directory compromise. Macksofy's GCFA/GREM/CHFI-certified team responds across India, preserves evidence, and files CERT-In incident reports.",
  },
  "service:malware-analysis": {
    q: "What is malware analysis?",
    a: "Malware analysis reverse-engineers a suspicious file to determine what it does, how it spreads, and how to detect and remove it — using static, dynamic, and sandbox techniques. Macksofy extracts indicators of compromise and YARA rules to harden your defences after an incident, for enterprises across India.",
  },
  "service:threat-intelligence": {
    q: "What is cyber threat intelligence?",
    a: "Cyber threat intelligence is curated, actionable knowledge about the attackers, tools, and techniques targeting your sector — turned into detections, blocklists, and risk decisions. Macksofy delivers finished intelligence mapped to MITRE ATT&CK and your attack surface, so your SOC hunts the threats that actually matter to Indian and UAE businesses.",
  },
  "service:iot-ot-security": {
    q: "What is IoT and OT security?",
    a: "IoT/OT security protects the connected devices and industrial control systems (ICS/SCADA) that run manufacturing, energy, and utilities — where a safety-first approach matters more than IT patching. Macksofy assesses OT networks against IEC 62443 and NCIIPC guidance, segmenting the Purdue model without tripping production.",
  },
  "service:source-code-review": {
    q: "What is secure code review?",
    a: "Secure code review manually inspects your application's source code to find vulnerabilities black-box testing misses — hardcoded secrets, injection sinks, broken authorization, and unsafe crypto. Macksofy combines expert manual review with SAST, mapping findings to OWASP ASVS and CWE risk, for BFSI and SaaS across India.",
  },
  "service:managed-security-services": {
    q: "What are managed security services (MSSP)?",
    a: "Managed security services outsource the day-to-day operation of your security controls — monitoring, detection, response, patching, and reporting — to a specialist provider. Macksofy runs MSSP engagements on your SIEM and endpoint stack, with SLAs and regulator-ready reporting for BFSI, fintech, and SaaS across India and the UAE.",
  },
  "service:annual-security-program": {
    q: "What is an annual security program?",
    a: "An annual security program bundles recurring VAPT, audits, and advisory into one governed calendar so security and compliance stay continuous rather than a yearly scramble. Macksofy structures programs around your regulator's cadence — RBI, SEBI, CERT-In, ISO 27001 — with quarterly testing and a named point of contact.",
  },
  "service:vciso": {
    q: "What is a vCISO?",
    a: "A vCISO (virtual CISO) is an on-demand senior security leader who sets strategy, owns your risk and compliance posture, and reports to the board — without a full-time hire. Macksofy provides CISSP/CISM-certified vCISOs who satisfy the RBI and SEBI requirement for a named, independent security head.",
  },
  "service:purple-teaming": {
    q: "What is purple teaming?",
    a: "Purple teaming runs offensive (red) and defensive (blue) teams together so every simulated attack immediately becomes a validated detection and response improvement. Macksofy executes MITRE ATT&CK techniques against your SOC, measures what your SIEM catches, and closes the gaps — turning red-team findings into lasting detection coverage.",
  },
  "service:network-pentesting": {
    q: "What is network penetration testing?",
    a: "Network penetration testing attacks your internal and external network infrastructure — servers, firewalls, VPNs, and Active Directory — to find and exploit the weaknesses an intruder would use to move laterally. Macksofy delivers CERT-In-format network pentests with segmentation validation for enterprises across India and the UAE.",
  },
  "service:wireless-pentesting": {
    q: "What is wireless penetration testing?",
    a: "Wireless penetration testing assesses your Wi-Fi networks for weak encryption, rogue access points, and guest-to-corporate bridging that let an attacker onto your internal network from the car park. Macksofy tests WPA2/WPA3, segmentation, and NAC controls, delivering a CERT-In-format report for offices across India.",
  },
  "service:ai-pentesting": {
    q: "What is AI and LLM penetration testing?",
    a: "AI penetration testing assesses applications built on large language models for prompt injection, insecure output handling, data leakage, and agent/tool abuse, following the OWASP Top 10 for LLM Applications. Macksofy tests RAG pipelines, chatbots, and MCP servers so AI features ship without opening a new attack surface.",
  },
  "service:staffing-service": {
    q: "What is cybersecurity staffing?",
    a: "Cybersecurity staffing places vetted, certified security professionals — SOC analysts, pentesters, and compliance specialists — into your team on contract or permanent terms. Macksofy draws on its training academy to supply OSCP/CEH/CySA+-certified talent to BFSI, MSSPs, and product security teams across India and the UAE.",
  },
  "service:identity-security-zero-trust": {
    q: "What is Zero Trust identity security?",
    a: "Zero Trust identity security replaces implicit network trust with continuous verification — strong authentication, least-privilege access, and segmentation so a stolen credential can't roam freely. Macksofy assesses and builds IAM, PAM, and Zero Trust architectures aligned to the RBI IT-Governance mandate for banks and enterprises across India.",
  },
  "service:network-security-architecture": {
    q: "What is network security architecture?",
    a: "Network security architecture designs how your networks are segmented, monitored, and defended — spanning firewalls, SASE/ZTNA, and OT zoning — so a breach in one area can't spread. Macksofy designs and reviews architectures to IEC 62443 and Zero Trust principles for enterprises and industrial operators across India.",
  },
  "service:phishing-simulation": {
    q: "What is a phishing simulation?",
    a: "A phishing simulation sends controlled, realistic phishing emails to your staff to measure who clicks, reports, or submits credentials — then trains them. Macksofy runs GoPhish-based campaigns with India-context lures and board-ready metrics, turning your people from the weakest link into an active detection layer.",
  },

  // ─────────────────────────── AUDITS (33) ───────────────────────────
  "audit:cybersecurity-audit": {
    q: "What is a cybersecurity audit?",
    a: "A cybersecurity audit systematically evaluates your security controls, policies, and technical posture against a defined standard, producing evidence of what's compliant and a prioritized remediation plan. Macksofy is a CERT-In empanelled auditor; our reports are accepted by RBI, SEBI, IRDAI, and other Indian regulators without rework.",
  },
  "audit:compliance-audit": {
    q: "What is a compliance audit?",
    a: "A compliance audit checks whether your organization meets the specific security and privacy obligations of a law or framework — CERT-In, RBI, SEBI, ISO 27001, or DPDP — and documents the gaps. Macksofy's CERT-In empanelled auditors deliver regulator-ready evidence packs for enterprises across India and the UAE.",
  },
  "audit:risk-assessment": {
    q: "What is a cybersecurity risk assessment?",
    a: "A risk assessment identifies your assets, the threats against them, and the likelihood and impact of each, so you can prioritize security spend where it matters most. Macksofy runs ISO 27005-based assessments that feed directly into RBI, SEBI, and ISO 27001 compliance for Indian enterprises.",
  },
  "audit:cert-in-empanelled-audit": {
    q: "What is a CERT-In empanelled audit?",
    a: "A CERT-In empanelled audit is a security assessment performed by an auditor formally empanelled by CERT-In (MeitY, Government of India), whose reports RBI, SEBI, UIDAI, and IRDAI accept without rework. Macksofy is CERT-In empanelled and delivers these audits — VAPT, application, and infrastructure — across India.",
  },
  "audit:rbi-csf": {
    q: "What is RBI Cyber Security Framework compliance?",
    a: "The RBI Cyber Security Framework mandates baseline and graded security controls for banks, NBFCs, and cooperative banks — covering governance, VAPT, SOC, and incident reporting. Macksofy audits and remediates against the framework, delivering the System Audit Report and evidence RBI inspectors expect, for BFSI across India.",
  },
  "audit:sebi-cscrf": {
    q: "What is SEBI CSCRF compliance?",
    a: "SEBI's Cyber Security and Cyber Resilience Framework (CSCRF) sets graded obligations for regulated entities and market infrastructure — VAPT, SOC, SBOM, and a Cyber Capability Index. Macksofy delivers CSCRF gap assessments, audits, and the ISO 27001 plus VAPT control stack SEBI requires.",
  },
  "audit:sebi-sar": {
    q: "What is a SEBI System Audit Report?",
    a: "A SEBI System Audit Report (SAR) is the periodic, auditor-signed assessment of a market intermediary's IT systems and cyber controls that SEBI mandates. Macksofy, as a CERT-In empanelled auditor, conducts the system audit and produces the SAR in SEBI's prescribed format.",
  },
  "audit:irdai-compliance": {
    q: "What is IRDAI cybersecurity compliance?",
    a: "IRDAI's information and cyber security guidelines require insurers to run VAPT, appoint a CISO, and report incidents. Macksofy audits insurers and insurtechs against the IRDAI framework, covering ISNP systems and policyholder data protection under DPDP, across India.",
  },
  "audit:dpdp-act": {
    q: "What is DPDP Act compliance?",
    a: "The Digital Personal Data Protection Act, 2023 governs how Indian businesses collect, process, and protect personal data — mandating consent, breach notification, and data-principal rights. Macksofy runs DPDP gap assessments, builds consent and RoPA frameworks, and prepares Significant Data Fiduciaries for audit.",
  },
  "audit:regulatory-vapt": {
    q: "What is regulatory VAPT?",
    a: "Regulatory VAPT is vulnerability assessment and penetration testing performed specifically to satisfy a regulator's mandate — RBI, SEBI, IRDAI, or PCI-DSS — in the format and cadence they require. Macksofy, a CERT-In empanelled auditor, delivers VAPT whose reports Indian regulators accept without rework.",
  },
  "audit:iso-27001": {
    q: "What is ISO 27001 certification?",
    a: "ISO/IEC 27001 is the international standard for an Information Security Management System (ISMS) — a governed set of policies, controls, and continuous improvement. Macksofy runs the full journey: gap assessment, risk treatment, control implementation, and internal audit to get you certification-ready, across India and the UAE.",
  },
  "audit:iso-27017": {
    q: "What is ISO 27017?",
    a: "ISO/IEC 27017 extends ISO 27001 with a code of practice for cloud security controls, clarifying responsibilities between cloud providers and their customers. Macksofy helps cloud-native and SaaS businesses implement and evidence 27017 controls alongside their existing ISMS.",
  },
  "audit:iso-27018": {
    q: "What is ISO 27018?",
    a: "ISO/IEC 27018 is the code of practice for protecting personally identifiable information (PII) in public clouds. Macksofy helps SaaS and data-processing businesses implement 27018 to demonstrate privacy assurance to customers and align with DPDP and GDPR obligations.",
  },
  "audit:iso-27701": {
    q: "What is ISO 27701?",
    a: "ISO/IEC 27701 extends ISO 27001 into a Privacy Information Management System (PIMS), operationalizing data-protection controls. Macksofy implements 27701 to help Indian businesses evidence DPDP and GDPR compliance on top of an existing ISMS.",
  },
  "audit:iso-42001": {
    q: "What is ISO 42001?",
    a: "ISO/IEC 42001 is the first management-system standard for artificial intelligence, governing how organizations develop and deploy AI responsibly. Macksofy helps AI-driven businesses implement 42001 controls for risk, transparency, and accountability across their model lifecycle.",
  },
  "audit:soc-2": {
    q: "What is SOC 2 compliance?",
    a: "SOC 2 is an independent attestation that a service organization's controls meet the Trust Services Criteria — security, availability, confidentiality, processing integrity, and privacy. Macksofy runs SOC 2 readiness, control implementation, and evidence collection so Indian SaaS companies can sell to US and global enterprises.",
  },
  "audit:nist-csf": {
    q: "What is the NIST Cybersecurity Framework?",
    a: "The NIST Cybersecurity Framework organizes security around six functions — Govern, Identify, Protect, Detect, Respond, Recover — as a flexible, risk-based benchmark. Macksofy assesses your maturity against CSF 2.0 and builds a prioritized roadmap, mapping it to your Indian regulatory requirements.",
  },
  "audit:pci-dss": {
    q: "What is PCI-DSS compliance?",
    a: "PCI-DSS is the mandatory security standard for any business that stores, processes, or transmits payment-card data, spanning network, encryption, and access controls. Macksofy runs PCI-DSS 4.0 gap assessments, segmentation validation, and the required penetration test for fintech and merchants across India and the UAE.",
  },
  "audit:hipaa": {
    q: "What is HIPAA compliance?",
    a: "HIPAA sets US requirements for protecting patient health information (PHI) — relevant to Indian healthcare BPOs and health-tech serving US clients. Macksofy assesses administrative, physical, and technical safeguards and remediates gaps so healthcare processors can evidence HIPAA compliance.",
  },
  "audit:gdpr": {
    q: "What is GDPR compliance?",
    a: "The EU General Data Protection Regulation governs how organizations handle EU residents' personal data, with strict consent, transfer, and breach rules and heavy fines. Macksofy helps Indian businesses serving EU customers map processing, implement controls, and align GDPR with DPDP obligations.",
  },
  "audit:rbi-digital-lending": {
    q: "What is RBI Digital Lending compliance?",
    a: "RBI's Digital Lending Guidelines govern how lending apps and their partners handle data, disclosures, and customer protection. Macksofy audits lending platforms and lending service providers against the guidelines, covering data localization, app security, and DPDP alignment for fintech across India.",
  },
  "audit:rbi-it-governance": {
    q: "What is the RBI IT Governance Master Direction?",
    a: "The RBI Master Direction on IT Governance, Risk, and Assurance mandates board-level IT oversight, a named CISO, and independent assurance for regulated entities. Macksofy runs readiness assessments and audits against the direction for banks and NBFCs across India.",
  },
  "audit:rbi-it-outsourcing": {
    q: "What is RBI IT outsourcing compliance?",
    a: "RBI's IT outsourcing directions require banks and NBFCs to govern and audit their IT and cloud service providers, retaining accountability for outsourced functions. Macksofy assesses your vendor-risk program and third-party controls against the RBI framework for BFSI across India.",
  },
  "audit:sebi-mii": {
    q: "What is SEBI MII compliance?",
    a: "SEBI Market Infrastructure Institutions — stock exchanges, depositories, and clearing corporations — face the highest tier of cyber obligations: a dedicated SOC, frequent VAPT, and system audits. Macksofy delivers CSCRF-aligned audits, VAPT, and SOC support for MIIs and qualified regulated entities.",
  },
  "audit:dpdp-sdf": {
    q: "What is a DPDP Significant Data Fiduciary?",
    a: "Under the DPDP Act, the government can designate high-volume or high-risk processors as Significant Data Fiduciaries, triggering extra duties — a Data Protection Officer, Data Protection Impact Assessments, and independent audits. Macksofy prepares SDFs for these obligations and conducts the required DPDP audit.",
  },
  "audit:uae-pdpl": {
    q: "What is UAE PDPL compliance?",
    a: "The UAE Personal Data Protection Law (Federal Decree-Law 45/2021) governs personal-data processing across the Emirates, with consent, transfer, and breach requirements. Macksofy runs PDPL gap assessments and control implementation for businesses operating in the UAE and wider GCC.",
  },
  "audit:nesa-uae-ias": {
    q: "What is NESA / UAE IAS compliance?",
    a: "The UAE Information Assurance Standards, issued by NESA/SIA, mandate security controls for entities in critical sectors across management and technical domains. Macksofy assesses and implements the UAE IAS controls for banks, government, and critical infrastructure in the UAE.",
  },
  "audit:adhics": {
    q: "What is ADHICS compliance?",
    a: "ADHICS (Abu Dhabi Healthcare Information and Cyber Security Standard) sets mandatory security controls for healthcare entities in the Emirate of Abu Dhabi. Macksofy audits hospitals, clinics, and health-tech against ADHICS, protecting patient data and clinical systems.",
  },
  "audit:desc-isr": {
    q: "What is DESC ISR compliance?",
    a: "The Dubai Electronic Security Center's Information Security Regulation (ISR) mandates security controls for Dubai government entities and their service partners. Macksofy assesses and implements DESC ISR controls for organizations operating with the Dubai government.",
  },
  "audit:sama-csf": {
    q: "What is SAMA CSF compliance?",
    a: "The Saudi Central Bank (SAMA) Cyber Security Framework mandates graded controls and maturity for banks, insurers, and financial firms in Saudi Arabia. Macksofy delivers SAMA CSF gap assessments and maturity uplift for financial institutions across the Kingdom.",
  },
  "audit:cbuae-cyber": {
    q: "What is CBUAE cybersecurity compliance?",
    a: "The Central Bank of the UAE mandates cybersecurity and operational-resilience controls for licensed financial institutions. Macksofy assesses banks, exchange houses, and fintechs against the CBUAE requirements, aligning them with NESA and UAE PDPL.",
  },
  "audit:nca-ecc-2": {
    q: "What are NCA Essential Cybersecurity Controls?",
    a: "Saudi Arabia's National Cybersecurity Authority Essential Cybersecurity Controls (ECC) are mandatory for government and critical-sector organizations, spanning governance, defence, resilience, and third-party domains. Macksofy runs ECC gap assessments and implementation for entities operating in Saudi Arabia.",
  },
  "audit:nciipc-cii-audit": {
    q: "What is an NCIIPC / CII audit?",
    a: "India's NCIIPC protects Critical Information Infrastructure — systems whose failure would impact national security or the economy. Under IT Act §70, CII operators must meet defined controls. Macksofy audits CII operators in power, telecom, and finance against NCIIPC guidance.",
  },
  "audit:cicra": {
    q: "What is a CICRA compliance audit?",
    a: "A CICRA audit is a structured review of an organisation's critical information systems, cyber risks, and control maturity, benchmarked to recognised frameworks such as the NIST CSF and CERT-In guidance. Macksofy runs CICRA-style assessments to help Indian enterprises measure, prioritise, and close their most material security gaps.",
  },
  "audit:wasa-audit": {
    q: "What is a WASA (Web Application Security Assessment)?",
    a: "A WASA (Web Application Security Assessment) is a structured security test of a web application against the OWASP Top 10 and ASVS, combining automated scanning with manual, expert-led exploitation. In India's ABDM digital-health ecosystem, a WASA report from a CERT-In empanelled auditor such as Macksofy is the evidence integrators file with the National Health Authority for M1/M2/M3 milestone sign-off.",
  },

  // ─────────────────────────── INDUSTRIES (7) ───────────────────────────
  "industry:bfsi": {
    q: "What is BFSI cybersecurity?",
    a: "BFSI cybersecurity protects banks, financial services, and insurers — the most-targeted, most-regulated sector — against fraud, ransomware, and data theft while meeting RBI, SEBI, and IRDAI mandates. Macksofy secures BFSI with CERT-In-format VAPT, managed SOC, and regulator-aligned audits across India and the UAE.",
  },
  "industry:healthcare": {
    q: "What is healthcare cybersecurity?",
    a: "Healthcare cybersecurity protects patient data, connected medical devices, and clinical systems from breaches and ransomware while meeting DPDP, HIPAA, and ADHICS obligations. Macksofy secures hospitals, diagnostics, and health-tech with VAPT, medical-device testing, and compliance audits across India and the UAE.",
  },
  "industry:saas-fintech": {
    q: "What is SaaS and fintech cybersecurity?",
    a: "SaaS and fintech cybersecurity secures multi-tenant platforms, APIs, and payment flows against account takeover, data leakage, and business-logic abuse — while evidencing SOC 2, PCI-DSS, and RBI compliance to enterprise buyers. Macksofy delivers app and API pentests, cloud security, and audits for high-growth SaaS and fintech.",
  },
  "industry:manufacturing-ot": {
    q: "What is manufacturing and OT cybersecurity?",
    a: "Manufacturing and OT cybersecurity protects factories and industrial control systems (ICS/SCADA) where uptime and safety outrank IT patching. Macksofy secures the Purdue-model network against IEC 62443, segments IT from OT, and meets NCIIPC obligations for manufacturers across India.",
  },
  "industry:government-psu": {
    q: "What is government and PSU cybersecurity?",
    a: "Government and PSU cybersecurity protects public-sector systems and citizen data under CERT-In directions and NCIIPC critical-infrastructure rules. Macksofy, a CERT-In empanelled auditor, delivers VAPT, audits, and incident response for government departments and public-sector undertakings across India.",
  },
  "industry:energy-utilities": {
    q: "What is energy and utilities cybersecurity?",
    a: "Energy and utilities cybersecurity defends power, grid, and utility control systems — critical infrastructure where a cyberattack can cause physical outages. Macksofy assesses OT/ICS against IEC 62443 and the CEA power-sector guidelines and meets NCIIPC §70A obligations for operators across India.",
  },
  "industry:insurance": {
    q: "What is insurance cybersecurity?",
    a: "Insurance cybersecurity protects policyholder data, ISNP platforms, and actuarial systems under IRDAI's information-security guidelines and DPDP. Macksofy secures insurers and insurtechs with VAPT, managed SOC, and IRDAI-aligned audits, covering health and financial data across India.",
  },

  // ─────────────────────────── CITIES (12) ───────────────────────────
  "city:mumbai": {
    q: "Why do Mumbai businesses need a cybersecurity partner?",
    a: "Mumbai is India's financial capital — home to the RBI, SEBI, the stock exchanges, and the densest concentration of banks and fintechs — making it the most-targeted and most-regulated city for cyberattacks. Macksofy, headquartered in BKC, delivers CERT-In-empanelled VAPT, managed SOC, and RBI/SEBI audits to Mumbai enterprises.",
  },
  "city:delhi": {
    q: "Why do Delhi NCR businesses need a cybersecurity partner?",
    a: "Delhi NCR concentrates government bodies, large enterprises, and public-sector undertakings whose systems face constant nation-state and criminal targeting under CERT-In and NCIIPC mandates. Macksofy delivers CERT-In-empanelled VAPT, red teaming, managed SOC, and compliance audits to Delhi, Gurugram, and Noida organizations.",
  },
  "city:bengaluru": {
    q: "Why do Bengaluru businesses need a cybersecurity partner?",
    a: "Bengaluru is India's product-and-SaaS capital, where fast-shipping engineering teams and cloud-native platforms create a large, fast-changing attack surface that outpaces security. Macksofy delivers application and API penetration testing, cloud security assessments, and SOC 2 readiness to Bengaluru startups and product companies.",
  },
  "city:hyderabad": {
    q: "Why do Hyderabad businesses need a cybersecurity partner?",
    a: "Hyderabad's economy spans IT services, pharma, and life sciences — sectors handling sensitive research, health, and financial data under DPDP and global compliance regimes. Macksofy runs a regional hub here, delivering VAPT, managed SOC, cloud security, and compliance audits to Hyderabad enterprises.",
  },
  "city:chennai": {
    q: "Why do Chennai businesses need a cybersecurity partner?",
    a: "Chennai combines automotive and industrial manufacturing with BFSI back-office and SaaS operations, spanning both IT and OT attack surfaces. Macksofy delivers penetration testing, OT/ICS security to IEC 62443, managed SOC, and CERT-In-format audits to Chennai manufacturers and service firms.",
  },
  "city:pune": {
    q: "Why do Pune businesses need a cybersecurity partner?",
    a: "Pune blends a large IT-services base with automotive and industrial manufacturing, exposing both enterprise IT and factory OT systems to attack. Macksofy delivers VAPT, OT/ICS security, cloud assessments, and compliance audits to Pune's technology and manufacturing companies.",
  },
  "city:noida": {
    q: "Why do Noida businesses need a cybersecurity partner?",
    a: "Noida and Greater Noida host dense IT/ITeS, BPO, and product-engineering operations that process large volumes of customer and financial data under DPDP and client-security mandates. Macksofy delivers application and API pentests, managed SOC, and compliance audits to Noida businesses.",
  },
  "city:gurugram": {
    q: "Why do Gurugram businesses need a cybersecurity partner?",
    a: "Gurugram is India's corporate and fintech hub, home to unicorns, insurers, and multinational headquarters handling high-value financial and personal data under RBI, IRDAI, and DPDP. Macksofy delivers VAPT, red teaming, managed SOC, and regulatory audits to Gurugram enterprises and startups.",
  },
  "city:ahmedabad": {
    q: "Why do Ahmedabad businesses need a cybersecurity partner?",
    a: "Ahmedabad's economy centers on manufacturing, pharma, textiles, and a strong cooperative-banking sector regulated by RBI's cyber framework. Macksofy delivers CERT-In-format VAPT, OT security, managed SOC, and RBI CSF audits to Ahmedabad and wider Gujarat businesses.",
  },
  "city:uae": {
    q: "Why do UAE businesses need a cybersecurity partner?",
    a: "UAE businesses operate under a layered regime — federal PDPL, the NESA/UAE Information Assurance Standards, and emirate rules like Dubai's DESC ISR and Abu Dhabi's ADHICS. Macksofy delivers VAPT, managed SOC, and compliance readiness across the UAE and wider GCC from its India base.",
  },
  "city:dubai": {
    q: "Why do Dubai businesses need a cybersecurity partner?",
    a: "Dubai's finance, trade, and technology sectors operate under UAE federal PDPL and the Dubai Electronic Security Center's ISR, with DIFC firms facing additional data-protection rules. Macksofy delivers VAPT, managed SOC, and DESC/PDPL compliance readiness to Dubai enterprises.",
  },
  "city:abu-dhabi": {
    q: "Why do Abu Dhabi businesses need a cybersecurity partner?",
    a: "Abu Dhabi's economy is anchored in government, energy, and healthcare — sectors governed by NESA/UAE IAS, ADHICS for health data, and critical-infrastructure obligations. Macksofy delivers VAPT, OT/ICS security, managed SOC, and ADHICS/NESA readiness to Abu Dhabi organizations.",
  },

  // ─────────────────────────── COURSES (21) ───────────────────────────
  "course:ceh": {
    q: "What is the CEH certification?",
    a: "The Certified Ethical Hacker (CEH v13, EC-Council) is a foundational credential that teaches you to think and act like an attacker across the five phases of hacking, now with an AI-driven track. As an EC-Council Accredited Training Center, Macksofy runs it as a classroom and live-online ethical hacking course in Mumbai, with hands-on labs.",
  },
  "course:ceh-practical": {
    q: "What is the CEH Practical exam?",
    a: "CEH Practical is EC-Council's hands-on, proctored exam where you demonstrate real attack skills against live targets in a lab — proving the CEH knowledge rather than just recalling it. Macksofy, an EC-Council Accredited Training Center, prepares you for CEH Practical with guided lab practice.",
  },
  "course:chfi": {
    q: "What is the CHFI certification?",
    a: "The Computer Hacking Forensic Investigator (CHFI, EC-Council) certifies your ability to detect and investigate cyberattacks and gather court-admissible digital evidence. As an EC-Council Accredited Training Center, Macksofy delivers CHFI with hands-on forensics labs in India.",
  },
  "course:ctia": {
    q: "What is the CTIA certification?",
    a: "The Certified Threat Intelligence Analyst (CTIA, EC-Council) teaches the structured process of collecting, analysing, and operationalizing cyber threat intelligence. As an EC-Council Accredited Training Center, Macksofy delivers CTIA to SOC analysts and threat-intel practitioners in India.",
  },
  "course:csa": {
    q: "What is the EC-Council CSA certification?",
    a: "The Certified SOC Analyst (CSA, EC-Council) is an entry-to-intermediate credential for Tier I–II Security Operations Center analysts, covering SIEM, log analysis, and incident triage. As an EC-Council Accredited Training Center, Macksofy delivers CSA with live-SOC lab practice in India.",
  },
  "course:cpent": {
    q: "What is the CPENT certification?",
    a: "The Certified Penetration Testing Professional (CPENT, EC-Council) is an advanced, fully hands-on pentesting credential covering enterprise networks, IoT, OT/SCADA, and binary exploitation on a live range. As an EC-Council Accredited Training Center, Macksofy delivers CPENT in India.",
  },
  "course:sec-100-cybercore": {
    q: "What is SEC-100 CyberCore?",
    a: "SEC-100 CyberCore (OffSec) is a foundational certification covering core security concepts, networking, and defensive basics — an entry point before OSCP-level training. Macksofy runs an exam-prep bootcamp for SEC-100 CyberCore with hands-on mentoring in India.",
  },
  "course:oscp": {
    q: "What is the OSCP certification?",
    a: "The Offensive Security Certified Professional (OSCP, OffSec) is the industry's benchmark hands-on penetration-testing certification, earned by compromising machines in a 24-hour proctored lab exam. Macksofy runs an intensive OSCP exam-prep bootcamp with 60+ hours of mentor-led labs in India.",
  },
  "course:osep": {
    q: "What is the OSEP certification?",
    a: "The Offensive Security Experienced Penetration Tester (OSEP, OffSec) is an advanced credential in evading defences, bypassing antivirus/EDR, and compromising hardened Active Directory environments. Macksofy runs an OSEP exam-prep bootcamp for experienced pentesters in India.",
  },
  "course:oswe": {
    q: "What is the OSWE certification?",
    a: "The Offensive Security Web Expert (OSWE, OffSec) is an advanced white-box web-application security certification focused on source-code review and chaining vulnerabilities into working exploits. Macksofy runs an OSWE exam-prep bootcamp with hands-on web-exploitation labs in India.",
  },
  "course:oswa": {
    q: "What is the OSWA certification?",
    a: "The Offensive Security Web Assessor (OSWA, OffSec) certifies black-box web-application assessment skills — finding and exploiting common web vulnerabilities without source access. Macksofy runs an OSWA exam-prep bootcamp with practical web-testing labs in India.",
  },
  "course:oswp": {
    q: "What is the OSWP certification?",
    a: "The Offensive Security Wireless Professional (OSWP, OffSec) certifies practical Wi-Fi attack skills — cracking WEP/WPA and attacking wireless infrastructure. Macksofy runs an OSWP exam-prep bootcamp with hands-on wireless labs in India.",
  },
  "course:osda": {
    q: "What is the OSDA certification?",
    a: "The Offensive Security Defense Analyst (OSDA, OffSec) certifies blue-team detection skills — using SIEM and telemetry to detect and analyse attacks across the kill chain. Macksofy runs an OSDA (SOC-200) exam-prep bootcamp with live detection labs in India.",
  },
  "course:osed": {
    q: "What is the OSED certification?",
    a: "The Offensive Security Exploit Developer (OSED, OffSec) certifies Windows exploit-development skills — stack overflows, bypassing mitigations, and writing custom shellcode. Macksofy runs an OSED exam-prep bootcamp for aspiring exploit developers in India.",
  },
  "course:osmr": {
    q: "What is the OSMR certification?",
    a: "The Offensive Security macOS Researcher (OSMR, OffSec) certifies advanced macOS exploitation and security-research skills. Macksofy runs an OSMR exam-prep bootcamp for experienced researchers targeting Apple platforms in India.",
  },
  "course:cysa-plus": {
    q: "What is the CompTIA CySA+ certification?",
    a: "CompTIA CySA+ (Cybersecurity Analyst) is an intermediate, hands-on credential focused on threat detection, behavioural analytics, and incident response for SOC roles. As a CompTIA Authorized Partner, Macksofy delivers CySA+ training with practical labs in India.",
  },
  "course:linux-plus": {
    q: "What is the CompTIA Linux+ certification?",
    a: "CompTIA Linux+ validates the Linux administration, scripting, and security skills that underpin most security and DevOps work. As a CompTIA Authorized Partner, Macksofy delivers Linux+ training with hands-on command-line labs in India.",
  },
  "course:server-plus": {
    q: "What is the CompTIA Server+ certification?",
    a: "CompTIA Server+ validates server hardware, administration, virtualization, and disaster-recovery skills for on-prem and hybrid environments. As a CompTIA Authorized Partner, Macksofy delivers Server+ training with practical labs in India.",
  },
  "course:soc-analyst": {
    q: "What is Macksofy's SOC Analyst program?",
    a: "A SOC Analyst monitors security telemetry, triages alerts, and responds to incidents in a Security Operations Center. Macksofy's SOC Analyst program is a job-focused, hands-on track on Wazuh, ELK, and Splunk with detection and triage labs, plus placement support, delivered in India.",
  },
  "course:web-application-security": {
    q: "What is web application security training?",
    a: "Web application security training teaches you to find and exploit the OWASP Top 10 and business-logic flaws in real web apps, hands-on. Macksofy's program takes learners from fundamentals to professional web-pentest skill with guided labs and mentoring in India.",
  },
  "course:corporate-training": {
    q: "What is corporate cybersecurity training?",
    a: "Corporate cybersecurity training upskills a company's employees or security team — from security awareness for all staff to hands-on technical training for engineers. Macksofy designs customized corporate programs (CEH, SOC, secure coding, awareness) delivered on-site or virtual across India and the UAE.",
  },

  // ─────────────────────────── BLOG (money-query posts) ───────────────────────────
  // Definition-first answers to each post's core query, for AI Overviews /
  // Perplexity / featured snippets. Keyed blog:<slug>.
  "blog:abdm-m1-wasa-audit-guide-2026": {
    q: "What is an ABDM M1 WASA audit?",
    a: "An ABDM M1 WASA audit is a Web Application Security Assessment of a digital-health application, performed by a CERT-In empanelled auditor, that an integrator submits to India's National Health Authority before receiving ABDM production access. It covers the ABHA, consent-manager and record-exchange flows alongside standard OWASP web and API security testing. Macksofy is CERT-In empanelled.",
  },
  "blog:penetration-testing-vapt-guide-india-2026": {
    q: "What is the difference between VAPT and penetration testing?",
    a: "VAPT bundles two activities: a vulnerability assessment scans broadly for known weaknesses, while penetration testing manually exploits them to prove real business impact. Penetration testing is the deeper, expert-led half. Indian regulators and CERT-In-format reports expect both. Macksofy delivers combined VAPT with proof-of-concept exploits and a free remediation retest across India.",
  },
  "blog:cert-in-empanelled-audit-guide-2026": {
    q: "What is a CERT-In empanelled audit?",
    a: "A CERT-In empanelled audit is a security assessment performed by an auditing organisation formally approved by India's national cyber agency, CERT-In. Regulators, tenders, and the 2022 directions frequently require one. Macksofy is a CERT-In empanelled auditor and delivers VAPT and compliance audits in the CERT-In report format across India.",
  },
  "blog:cyber-security-companies-in-mumbai-india-2026": {
    q: "How do you choose a cybersecurity company in Mumbai or India?",
    a: "Start by verifying CERT-In empanelment on the official cert-in.org.in list, then check sector experience (BFSI, fintech), the report format, and whether a remediation retest is included. Macksofy is a CERT-In empanelled firm delivering VAPT, managed SOC, and RBI/SEBI-aligned audits to Mumbai and pan-India enterprises.",
  },
  "blog:ceh-v13-ai-training-india-2026": {
    q: "What is CEH v13 and where can you train for it in India?",
    a: "CEH v13 is EC-Council's Certified Ethical Hacker certification, updated with an AI-driven track across the five phases of hacking. In India, cost varies by provider, delivery mode, and whether an exam voucher is bundled. Macksofy, an EC-Council Accredited Training Center, delivers CEH v13 with hands-on labs in India.",
  },
  "blog:oscp-training-in-mumbai-2026": {
    q: "What does OSCP training in Mumbai involve?",
    a: "OSCP is OffSec's benchmark hands-on penetration-testing certification, earned by compromising machines in a 24-hour proctored exam. Preparation combines the PEN-200 course with extensive lab practice. Macksofy runs an intensive OSCP exam-prep bootcamp in Mumbai and across India with 60+ hours of mentor-led labs.",
  },
  "blog:soc-analyst-training-india-2026": {
    q: "Which SOC analyst certification is best in India — CSA, SOC-200, or CySA+?",
    a: "There is no single best: EC-Council's CSA suits absolute beginners, OffSec's SOC-200 (OSDA) is the most hands-on detection credential, and CompTIA CySA+ is widely recognised by employers. The right pick depends on your experience and target role. Macksofy runs job-focused SOC analyst training on Wazuh, ELK, and Splunk in India.",
  },
  "blog:offsec-learn-one-india-pricing-roi-2026": {
    q: "Is OffSec Learn One worth it in India?",
    a: "OffSec Learn One is a one-year subscription bundling a course, exam attempts, and lab time — cost-effective if you certify within twelve months, since its ROI depends on finishing inside that window. Macksofy pairs OffSec pathways with mentor-led bootcamps in India to help learners complete the exam before the subscription lapses.",
  },
  "blog:red-team-certifications-india-2026": {
    q: "OSEP vs CRTO vs CRTP — which red team certification is best?",
    a: "CRTP teaches Active Directory attack fundamentals, CRTO focuses on modern command-and-control and evasion tradecraft, and OSEP is the most advanced, covering AV/EDR bypass and hardened AD. Beginners usually start with CRTP; experienced testers target OSEP. Macksofy runs red-team certification bootcamps aligned to MITRE ATT&CK in India.",
  },
  "blog:top-10-penetration-testing-tools-2026": {
    q: "What penetration testing tools should every pentester master?",
    a: "The core pentesting toolkit spans Nmap for discovery, Burp Suite for web testing, Metasploit for exploitation, BloodHound and Impacket for Active Directory, and Wireshark for traffic analysis — used within the OWASP and NIST SP 800-115 methodologies. Macksofy trains these tools hands-on in its ethical-hacking and OSCP bootcamps in India.",
  },
  "blog:best-laptops-cybersecurity-students-india-2026": {
    q: "What laptop specs do cybersecurity students need in India?",
    a: "For running virtual machines and security labs, target at least 16GB RAM (32GB preferred), a modern multi-core CPU with hardware virtualization, and a 512GB+ SSD; battery life and Linux compatibility matter for fieldwork. This guide ranks the best options across budgets in India for 2026.",
  },

  // ── Certification comparisons ──
  // Comparison posts lead with the differentiator rather than a definition:
  // the query being answered is "which one", so the extractable answer is a
  // verdict. Same pattern as blog:red-team-certifications-india-2026 above.
  // OffSec credentials are always described as exam-prep bootcamps — Macksofy
  // is not an OffSec partner or authorised training centre.
  "blog:oswe-vs-oscp": {
    q: "OSWE vs OSCP — which OffSec certification should you take?",
    a: "OSCP is the broad, benchmark hands-on penetration-testing certification covering networks and Active Directory; OSWE is a specialist white-box web-application exploitation certification that requires reading source code. Most candidates take OSCP first, then OSWE to specialise in appsec. Macksofy runs mentor-led OSCP and OSWE exam-prep bootcamps across India.",
  },
  "blog:osep-vs-oscp": {
    q: "OSEP vs OSCP — which should you take for a red team career?",
    a: "OSCP proves foundational hands-on exploitation and is the usual starting point; OSEP is the advanced follow-on covering antivirus and EDR evasion, phishing, and hardened Active Directory. OSEP assumes you already hold OSCP-level skills. Macksofy runs mentor-led OSCP and OSEP exam-prep bootcamps for red-team careers across India.",
  },
  "blog:crto-vs-oscp-honest-comparison-2026": {
    q: "CRTO vs OSCP — which should you take first?",
    a: "OSCP teaches broad hands-on exploitation and is the credential Indian job listings recognise most; CRTO focuses on modern command-and-control, evasion, and Active Directory tradecraft in an open-book lab exam. Most candidates take OSCP first. Macksofy runs mentor-led OSCP and red-team exam-prep bootcamps across India.",
  },
  "blog:cpts-vs-oscp-certification-comparison-india-2026": {
    q: "CPTS vs OSCP — which pentest certification should you take?",
    a: "OSCP is the certification Indian employers name most often in job listings; Hack The Box's CPTS is cheaper, longer, and widely considered more technically thorough, but carries less weight with HR filters. Choose OSCP for hiring signal, CPTS for depth. Macksofy runs mentor-led OSCP exam-prep bootcamps across India.",
  },
  "blog:crtp-vs-crte-certification-guide-india-2026": {
    q: "CRTP vs CRTE — which Active Directory certification comes first?",
    a: "CRTP teaches Active Directory attack fundamentals — enumeration, Kerberos abuse, and domain privilege escalation — and is the usual starting point; CRTE is the harder follow-on covering forest-level attacks and defence evasion across a larger lab. Take CRTP first. Macksofy runs Active Directory red-team bootcamps aligned to MITRE ATT&CK in India.",
  },
  "blog:oscp-plus-vs-oscp-2026": {
    q: "What is the difference between OSCP and OSCP+?",
    a: "OSCP+ is the same exam with a currency requirement: OffSec rebranded the credential in late 2024 so OSCP+ lapses after three years unless renewed through continuing education, while plain OSCP stays lifetime but undated. The exam itself expanded Active Directory and dropped buffer overflow. Macksofy runs OSCP exam-prep bootcamps in India.",
  },
  "blog:oscp-vs-ceh-india-2026": {
    q: "OSCP vs CEH — which certification should you take in India?",
    a: "CEH is a broad multiple-choice credential that clears HR filters and government eligibility criteria; OSCP is a 24-hour hands-on exam that proves practical exploitation skill and carries more weight with technical interviewers. Many Indian candidates take CEH first. Macksofy delivers CEH training and OSCP exam-prep bootcamps in India.",
  },
  "blog:ecih-vs-gcih-incident-handler-certification-2026": {
    q: "ECIH vs GCIH — which incident handler certification is better?",
    a: "GCIH, from SANS/GIAC, is the more respected and far more expensive incident-handling credential, while EC-Council's ECIH costs a fraction of it and is more accessible to early-career Indian candidates. Budget usually decides. Macksofy, an EC-Council Accredited Training Center, delivers ECIH with hands-on labs in India.",
  },
  "blog:osda-exam-tips-2026": {
    q: "How hard is the OSDA exam and how do you pass it?",
    a: "OSDA is OffSec's SOC-200 defensive certification, earned in a proctored exam where you detect and reconstruct attacker activity from logs rather than exploit systems. Passing turns on a disciplined query workflow in Splunk and ELK, and on documenting the full attack chain. Macksofy runs mentor-led SOC-200 exam-prep bootcamps in India.",
  },

  // ── Service and engagement comparisons ──
  "blog:red-team-vs-penetration-testing-2026": {
    q: "What is the difference between red teaming and penetration testing?",
    a: "A penetration test finds and exploits as many vulnerabilities as it can inside a defined scope over a fixed window; a red team is goal-based and stealthy, testing whether your detection and response actually work while reaching a single objective. Macksofy delivers both, scoped to CERT-In and RBI expectations across India.",
  },
  "blog:vapt-vs-red-team-2026": {
    q: "Should you buy VAPT or a red team engagement?",
    a: "Buy VAPT when you need coverage and an auditable finding list for CERT-In, RBI, or SEBI; buy a red team when you already patch reliably and need to test whether your SOC detects and responds. Maturity decides, not budget. Macksofy delivers both with CERT-In-format reporting for Indian BFSI procurement.",
  },
  "blog:mdr-vs-mssp-2026": {
    q: "What is the difference between MDR and MSSP?",
    a: "An MSSP manages and monitors your security tools and forwards alerts to you; MDR adds the outcome — a provider-run team that investigates, triages, and actively contains threats, usually on its own detection stack. MDR costs more and carries response SLAs. Macksofy builds and runs managed SOC services for Indian enterprises.",
  },
  "blog:cert-in-empanelled-vs-iso-27001-2026": {
    q: "CERT-In empanelled VAPT vs ISO 27001 — what does each prove?",
    a: "They prove different things. A CERT-In empanelled VAPT is a point-in-time technical test showing whether your systems can actually be exploited; ISO 27001 certifies that your information security management system is designed and operating. Most regulated Indian firms need both. Macksofy is CERT-In empanelled and delivers ISO 27001 readiness audits.",
  },
  "blog:cspm-vs-cnapp-india-2026": {
    q: "What is the difference between CSPM, CWPP, and CNAPP?",
    a: "CSPM finds misconfigurations in your cloud control plane, CWPP protects running workloads, and CIEM controls entitlements. CNAPP is the consolidated platform that combines all three and correlates their findings into one prioritised risk view. Start with CSPM. Macksofy delivers cloud security assessments across AWS, Azure, and GCP for Indian enterprises.",
  },
  "blog:vciso-buyers-guide-india-2026": {
    q: "What is a vCISO and when do you need one?",
    a: "A virtual CISO is an experienced security leader engaged part-time to own strategy, risk, and regulatory readiness without a full-time hire. It suits organisations facing RBI, SEBI, DPDP, or CERT-In expectations but lacking the volume of work to justify a permanent CISO. Macksofy provides vCISO engagements across India and the UAE.",
  },

  // ── Indian regulation and compliance ──
  "blog:cert-in-cyber-security-audit-policy-guidelines-2025": {
    q: "What are CERT-In's Cyber Security Audit Policy Guidelines?",
    a: "CERT-In's Comprehensive Cyber Security Audit Policy Guidelines, Version 1.0 of 25 July 2025, standardise how empanelled audits in India are scoped, scored, and reported, setting common expectations for auditors and auditees alike. Macksofy is a CERT-In empanelled auditor and delivers audits in the prescribed CERT-In report format across India.",
  },
  "blog:cert-in-12-hour-patch-mandate-ai-exploitation-2026": {
    q: "What is CERT-In's 12-hour patch mandate?",
    a: "CERT-In's May 2026 AI Threat Landscape guidance sets an indicative twelve-hour window to remediate actively exploited vulnerabilities on internet-facing systems, with longer tiers for lower-severity issues. It is guidance calibrated to AI-accelerated exploitation, not a binding rule. Macksofy is a CERT-In empanelled auditor supporting vulnerability management programmes in India.",
  },
  "blog:rbi-csf-vs-sebi-cscrf-2026": {
    q: "RBI CSF vs SEBI CSCRF — which framework applies to you?",
    a: "Your regulator decides. Banks, NBFCs, and other RBI-supervised entities follow the RBI Cyber Security Framework, while SEBI-regulated entities — brokers, AMCs, and market infrastructure institutions — follow CSCRF. Dual-regulated groups must satisfy both. Macksofy delivers RBI- and SEBI-aligned audits and VAPT for Indian BFSI.",
  },
  "blog:rbi-it-governance-readiness-checklist-2026": {
    q: "What does the RBI IT Governance Master Direction require?",
    a: "In force since April 2024, it requires RBI-regulated entities to run a board-level IT Strategy Committee, keep the CISO reporting line independent of IT operations, document patch and change management, test business continuity and disaster recovery, and commission periodic information systems audit. Macksofy delivers RBI-aligned IT governance readiness audits in India.",
  },
  "blog:sebi-cscrf-compliance-readiness-2026": {
    q: "What is the SEBI CSCRF and who must comply?",
    a: "The Cybersecurity and Cyber Resilience Framework is SEBI's consolidated security mandate for all Regulated Entities — brokers, AMCs, market infrastructure institutions, and more — applying graded obligations by entity size, with a Cyber Capability Index, SOC coverage, periodic VAPT, and SBOM requirements. Macksofy delivers SEBI CSCRF readiness audits and VAPT in India.",
  },
  "blog:zero-trust-indian-banks-rbi-itgf-2026": {
    q: "How does Zero Trust map to the RBI IT Governance Framework?",
    a: "Zero Trust is not named in the RBI IT Governance Framework, but its pillars map onto obligations the Framework already imposes — identity and access management, device hygiene, network segmentation, application control, and data protection. Banks can adopt it as one route to those controls. Macksofy delivers RBI-aligned security architecture reviews in India.",
  },
  "blog:ransomware-readiness-bfsi-india-2026": {
    q: "How should Indian banks prepare for ransomware?",
    a: "Ransomware readiness for Indian BFSI rests on four things: prevention through patching and privileged-access control, detection through monitored SOC coverage, a rehearsed response that meets CERT-In's six-hour reporting window, and offline, tested backups that survive domain compromise. Macksofy delivers ransomware readiness assessments and managed SOC for Indian BFSI.",
  },

  // ── Data protection ──
  "blog:dpdp-vs-gdpr-2026": {
    q: "What is the difference between India's DPDP Act and GDPR?",
    a: "Both regulate personal data, but DPDP is narrower: it covers only digital personal data, has no separate special-category regime, caps penalties in fixed rupee amounts rather than a share of global turnover, and restricts cross-border transfers by blocklist. Macksofy runs DPDP readiness assessments and data-protection audits for Indian fiduciaries.",
  },
  "blog:dpdp-cross-border-transfer-2026": {
    q: "What does DPDP §16 say about cross-border data transfers?",
    a: "Section 16 of India's DPDP Act permits transferring personal data outside India by default, but lets the Central Government restrict transfers to notified countries — a blocklist, not GDPR's adequacy allowlist. Sectoral rules still apply where stricter. Macksofy runs DPDP readiness assessments and data-residency reviews for Indian SaaS and BFSI.",
  },
  "blog:dpdp-significant-data-fiduciary-obligations-2026": {
    q: "What must a Significant Data Fiduciary do under the DPDP Act?",
    a: "A Significant Data Fiduciary is one the Central Government notifies by volume and sensitivity of data handled. On top of every Data Fiduciary duty, it must appoint a Data Protection Officer based in India and answerable to the board, commission an independent data auditor, and run periodic Data Protection Impact Assessments. Macksofy delivers DPDP readiness and data audits.",
  },
  "blog:uae-cybersecurity-compliance-pdpl-nesa-2026": {
    q: "What is the difference between PDPL and NESA in the UAE?",
    a: "They govern different things. The Federal PDPL 2021 is a personal-data privacy law covering consent, data-subject rights, and breach notification; NESA, the UAE Information Assurance Standards, is a security control framework for entities in critical sectors. Most UAE enterprises must satisfy both, plus emirate and free-zone regimes. Macksofy delivers UAE compliance assessments.",
  },

  // ── Cloud and OT ──
  "blog:cloud-misconfigurations-rbi-sebi-audit-2026": {
    q: "Which cloud misconfigurations fail RBI and SEBI audits?",
    a: "The recurring findings are publicly exposed storage, over-permissive IAM roles and unused privileged keys, logging that is disabled or retained too briefly to reconstruct an incident, unencrypted data at rest, and workloads placed outside India against data-residency expectations. Macksofy delivers RBI- and SEBI-aligned cloud audits in India.",
  },
  "blog:multi-cloud-security-bfsi-india-2026": {
    q: "How should Indian BFSI secure a multi-cloud estate?",
    a: "Standardise before you scale: enforce landing-zone guardrails so every new account starts compliant, keep regulated data in Indian regions to satisfy RBI and DPDP, contain identity blast radius so one compromised role cannot cross clouds, and monitor centrally. Macksofy delivers multi-cloud security assessments for Indian banks, NBFCs, and insurers.",
  },
  "blog:ot-ics-security-playbook-india-2026": {
    q: "What is the difference between IT security and OT security?",
    a: "IT security prioritises confidentiality of data; OT security prioritises safety and availability of a physical process, where an unplanned reboot can stop a turbine. That inverts the control set toward passive monitoring, strict segmentation by Purdue level, and change windows measured in months. Macksofy delivers OT and ICS assessments aligned to IEC 62443 in India.",
  },

  // ── Technical guides and references ──
  // No Macksofy line where a service claim would be a stretch — same call as
  // blog:best-laptops-cybersecurity-students-india-2026 above.
  "blog:active-directory-pentest-guide-india-2026": {
    q: "What does an Active Directory penetration test involve?",
    a: "An Active Directory penetration test assesses your domain the way an attacker would — enumerating users and permissions, harvesting credentials, abusing delegation and ACLs, and attempting domain-wide compromise from an assumed-breach position. Macksofy delivers CERT-In-format AD penetration tests for BFSI, government, and enterprise clients across India.",
  },
  "blog:ad-compromise-ir-playbook-indian-bfsi-2026": {
    q: "How should a bank respond to an Active Directory compromise?",
    a: "Treat every domain credential as burned. Contain by isolating domain controllers and cutting attacker access, eradicate by resetting the krbtgt account twice, then rebuild trust before recovery — all while meeting CERT-In's six-hour incident reporting clock. Macksofy provides digital forensics and incident response for Indian BFSI.",
  },
  "blog:mcp-server-security-how-hacked-2026": {
    q: "How do MCP servers get hacked?",
    a: "MCP (Model Context Protocol) servers expose tools to AI agents, and are attacked through tool poisoning, indirect prompt injection, over-broad credentials that let an agent exfiltrate secrets, and unsanitised tool parameters that reach a shell as command injection. This guide sets out the threat model and the controls that mitigate each.",
  },
  "blog:windows-ad-attack-cheatsheet-2026": {
    q: "What are the core Active Directory attack techniques?",
    a: "The standard Active Directory attack path runs from unauthenticated recon through Kerberoasting and AS-REP roasting for credentials, then ACL and delegation abuse for lateral movement, and DCSync for domain-wide credential extraction. This cheatsheet collects the working commands for each stage, with detection-evasion notes for authorized testing.",
  },
  "blog:burp-suite-for-beginners-2026": {
    q: "How do you start using Burp Suite as a beginner?",
    a: "Burp Suite is an intercepting proxy for web application testing: install its CA certificate, route browser traffic through the proxy, then use Repeater to modify single requests, Intruder to automate payloads, and Collaborator to catch out-of-band interactions. Macksofy teaches Burp hands-on in its ethical-hacking and OSCP bootcamps in India.",
  },
  "blog:nmap-cheatsheet-2026": {
    q: "Which Nmap flags do penetration testers actually use?",
    a: "The working set is small: -sS for a fast SYN scan, -sV and -O to fingerprint services and operating systems, -p- for full port coverage, --script for NSE checks, -T to tune timing, and -oA to save every output format at once. This reference collects the flags used on real engagements.",
  },
  "blog:cybersecurity-jobs-in-mumbai-2026": {
    q: "What do cybersecurity jobs in Mumbai pay in 2026?",
    a: "Mumbai salaries vary widely by role and credential: SOC analyst roles sit at the entry band, while penetration testers, cloud security engineers, and GRC leads command progressively more, with BFSI employers dominating demand. This guide breaks down the roles, salary bands, hiring companies, and the certification stack that closes interviews fastest.",
  },

  // ─────────────────────────── RESOURCES (18) ───────────────────────────
  // Whitepapers, checklists and cheat sheets under /resources/<slug>. These
  // render inside <PrintLayout>, so the template passes tone="print" — see
  // components/sections/AnswerBox.tsx. Each answers the document's core query
  // rather than describing the document.
  "resource:sebi-cscrf-playbook-2026": {
    q: "How do you prepare for SEBI CSCRF compliance?",
    a: "Preparing for SEBI's Cybersecurity and Cyber Resilience Framework means mapping each control family to the evidence a supervisor will actually ask for — governance records, SOC coverage, VAPT reports, and an SBOM — then closing gaps in priority order. Macksofy delivers SEBI CSCRF readiness audits and VAPT for Regulated Entities in India.",
  },
  "resource:ot-it-segmentation-india-manufacturers": {
    q: "How should manufacturers segment OT from IT networks?",
    a: "Segmentation separates plant control systems from corporate IT so an office compromise cannot reach a PLC — using Purdue-model zones, a screened conduit for traffic that genuinely must cross, and monitoring at the boundary. Macksofy delivers OT and ICS security assessments aligned to IEC 62443 for Indian manufacturers.",
  },
  "resource:mobile-app-security-bfsi-india": {
    q: "What does RBI expect from mobile banking app security?",
    a: "RBI expects mobile banking apps to be tested before release and periodically after, covering insecure local storage, certificate pinning, tamper and root detection, and the APIs behind the app — the OWASP Mobile Top 10 restated as control language. Macksofy delivers CERT-In-format mobile application penetration tests for Indian BFSI.",
  },
  "resource:india-ransomware-landscape-2026": {
    q: "How does ransomware reach Indian organisations?",
    a: "Ransomware reaches Indian organisations mainly through exposed remote access, unpatched internet-facing edge devices, and phishing that harvests a working credential — with manufacturing, healthcare, and BFSI absorbing the highest hit rates. This report sets out the active actors and a six-step preparedness checklist drawn from Macksofy DFIR cases.",
  },
  "resource:cert-in-incident-reporting-checklist": {
    q: "What must you report to CERT-In, and how quickly?",
    a: "CERT-In's 2022 directions require notification of specified cyber incidents within six hours of noticing them — including ransomware, data breaches, unauthorised access, and outages of critical systems — through the prescribed channel. This checklist gives incident commanders that path. Macksofy is a CERT-In empanelled auditor supporting incident reporting in India.",
  },
  "resource:rbi-csf-gap-check-2026": {
    q: "How do you self-assess against the RBI Cyber Security Framework?",
    a: "A gap check converts the RBI Cyber Security Framework circular into plain \"have we?\" questions an internal audit team can work through in a single sitting, covering governance, baseline controls, SOC coverage, incident response, and board reporting. Macksofy delivers RBI-aligned audits and readiness assessments for banks and NBFCs in India.",
  },
  "resource:bola-prevention-checklist": {
    q: "How do you prevent broken object level authorization (BOLA)?",
    a: "BOLA is prevented by anchoring every object lookup to the authenticated caller's ownership rather than trusting an identifier supplied in the request — enforcing the check in the data layer, using unguessable references, and testing every endpoint with a second account. Macksofy validates these controls in API penetration tests.",
  },
  "resource:jwt-pitfalls-cheat-sheet": {
    q: "What are the most common JWT security mistakes?",
    a: "The recurring JWT failures are trusting the token's own alg header, skipping signature verification entirely, not checking issuer, audience, and expiry, using weak or shared signing secrets, and treating unverified claims as authorization. Macksofy tests each of these in API and web application penetration tests.",
  },
  "resource:psexec-detection-cheat-sheet": {
    q: "How do you detect PsExec lateral movement?",
    a: "PsExec leaves a consistent trail — service creation on the target host, named-pipe activity, writes to admin shares, and the matching authentication events. Detection pairs those telemetry sources with rules tuned against the legitimate administrative use that produces most false positives. Macksofy builds detection content like this into the SOCs it runs.",
  },
  "resource:m365-hardening-checklist-india": {
    q: "How do you harden a Microsoft 365 tenant?",
    a: "Hardening Microsoft 365 follows an order of operations: enforce phishing-resistant multi-factor authentication through Conditional Access, disable legacy authentication, enable unified audit logging, tighten anti-phishing and external sharing, then review privileged roles. Macksofy delivers cloud and identity security assessments for Indian BFSI tenants.",
  },
  "resource:yara-rule-writing-cheat-sheet": {
    q: "How do you write an effective YARA rule?",
    a: "A good YARA rule pairs distinctive strings — text, hex, or regex — with a condition specific enough to avoid false positives and cheap enough to scan at volume, anchored on file structure rather than trivially mutable bytes. This cheat sheet covers rule anatomy, condition logic, and performance tuning.",
  },
  "resource:ioc-extraction-methodology": {
    q: "How do you extract indicators of compromise?",
    a: "IOC extraction works in layers: atomic indicators such as hashes and addresses, computed indicators derived from analysis, and behavioural patterns describing attacker technique. Prioritising by the Pyramid of Pain concentrates effort on the indicators costliest for an attacker to change. Macksofy applies this methodology in threat intelligence and DFIR work.",
  },
  "resource:malware-sandbox-detonation-guide-india": {
    q: "How do you analyse malware in a sandbox?",
    a: "Sandbox detonation runs a sample inside an instrumented, isolated environment and records its process, file, registry, and network behaviour using tools such as Cuckoo, CAPE, or ANY.RUN. The main obstacle is anti-analysis evasion, which demands a realistic host. Macksofy delivers malware analysis for Indian SOC and DFIR teams.",
  },
  "resource:ransomware-ir-runbook-india": {
    q: "What should you do in the first hours of a ransomware incident?",
    a: "The first hours decide the outcome: isolate affected systems without destroying volatile evidence, confirm scope and entry vector, preserve logs and disk images, then start CERT-In's six-hour reporting clock alongside any parallel RBI or SEBI obligation. Macksofy provides ransomware incident response across India.",
  },
  "resource:bec-incident-response-runbook": {
    q: "How do you respond to a business email compromise?",
    a: "BEC response starts by revoking sessions and OAuth tokens for the affected mailbox, then hunting malicious inbox rules and forwarding, triaging sign-in logs for the true entry point, and running the financial recall workflow in parallel. Macksofy provides incident response for Microsoft 365 and Google Workspace environments across India.",
  },
  "resource:active-directory-compromise-runbook": {
    q: "How do you recover from an Active Directory compromise?",
    a: "Recovery assumes every domain credential is compromised: contain attacker access, reset the KRBTGT account twice, hunt tier-0 persistence across ACLs, delegation, and certificate templates, then rebuild trust before restoring service. Macksofy provides Active Directory incident response and recovery for Indian organisations.",
  },
  "resource:cert-in-12-hour-patch-mandate": {
    q: "How do you meet CERT-In's 12-hour patching window?",
    a: "Meeting CERT-In's indicative twelve-hour remediation window for actively exploited internet-facing vulnerabilities takes three things in place beforehand: an accurate external attack-surface inventory, a standing emergency-change path, and a monitored feed of exploited-vulnerability advisories. Macksofy is a CERT-In empanelled auditor supporting vulnerability management programmes in India.",
  },
  "resource:cloud-security-india-2026": {
    q: "Who is responsible for security in the cloud?",
    a: "Cloud security is shared. The provider secures the underlying infrastructure, while you remain responsible for identity, configuration, data, and workloads — which is where nearly every breach actually originates, and multi-cloud estates multiply that surface. Macksofy delivers cloud security assessments across AWS, Azure, and GCP for Indian enterprises.",
  },

  // ─────────────────────────── PRODUCTS (2) ───────────────────────────
  // Macksofy's own two products under /products/<slug>. Both pages carry a
  // FAQPage node, so their faqSchema() call passes answerBox: true — keep the
  // flag in sync with this section or the speakable selector goes dead.
  "product:pentaudit": {
    q: "What is Pentaudit?",
    a: "Pentaudit is Macksofy's continuous penetration-testing and compliance platform. It runs on-demand VAPT across cloud, web, mobile and API surfaces — on commit, daily or ad hoc — while an always-on engine scores readiness against 12+ frameworks including ISO 27001, SOC 2, PCI-DSS, DPDP, RBI and CERT-In. Data stays resident in Mumbai, Hyderabad, the UAE or on-premises.",
  },
  "product:learn-to-exploit": {
    q: "What is LearnToExploit?",
    a: "LearnToExploit is Macksofy's browser-based cyber range: 360+ deliberately vulnerable labs spanning web, network, Active Directory, cloud, mobile, IoT and AI/LLM exploitation. Each lab is rebuilt from a real misconfiguration found on a paid engagement, with client detail scrubbed, and unlocks a walkthrough covering both the attacker path and the defender view.",
  },

  // ─────────────────────────── HUBS (8) ───────────────────────────
  // Index/hub routes. Deliberately NOT every hub — /privacy, /clients,
  // /awards, /press and /blog are navigational, and an AnswerBox there would
  // be filler. /contact is excluded on purpose too: it already earns
  // faq-question / faq-answer speakable hooks from its own visible FAQ grid
  // (see the 2026-07-30 speakable fix) and has no definitional question to
  // answer. /training/offsec stays out because it is an ItemList hub, not a
  // Course. Counts below are asserted against content/*.ts — re-check them if
  // a service, audit, industry, city or glossary term is added.
  "hub:services": {
    q: "What cybersecurity services does Macksofy provide?",
    a: "Macksofy provides 24 cybersecurity services spanning offensive, defensive and managed work — penetration testing, VAPT, red teaming and application security on the attack side; managed SOC, DFIR and threat intelligence on the defence side. Engagements are CERT-In empanelled and run by OSCP, OSWE and OSEP-certified consultants across India and the UAE.",
  },
  "hub:audit": {
    q: "What compliance audits does Macksofy perform?",
    a: "Macksofy performs 35 audit and compliance engagements as a CERT-In empanelled information security auditor under MeitY. Coverage spans Indian regulators (RBI CSF, SEBI CSCRF, IRDAI, UIDAI), GCC frameworks (UAE PDPL, NESA, ADHICS, DESC ISR) and international standards (ISO 27001, SOC 2, PCI-DSS, HIPAA, GDPR).",
  },
  "hub:training": {
    q: "What cybersecurity training does Macksofy offer?",
    a: "Macksofy offers five career tracks across India and the UAE: EC-Council certifications as an Accredited Training Centre (CEH v13, CHFI, CTIA), Offensive Security exam-prep bootcamps (OSCP, OSEP, OSWE), CompTIA courses, SOC analyst programmes and corporate training. Every track is lab-first, taught by working pen-testers and SOC engineers, with mentoring until you pass.",
  },
  "hub:glossary": {
    q: "What is the Macksofy cybersecurity glossary?",
    a: "The Macksofy glossary defines 111 cybersecurity terms in plain language across ten categories — offensive testing, application and API security, SOC and detection, DFIR, cloud, vulnerability management, OT/ICS, certifications, and India and GCC compliance. Each entry links to the service or audit it relates to, so a definition leads to the work behind it.",
  },
  "hub:industries": {
    q: "Which industries does Macksofy serve?",
    a: "Macksofy runs seven sector practices: BFSI, healthcare and life sciences, SaaS and fintech, manufacturing and OT, government and PSU, energy and utilities, and insurance. Each is staffed by consultants who have worked that vertical's regulators, so methodology and reporting match the audience — whether that is RBI, IRDAI, ADHICS, SOC 2, ISO 27001 or IEC 62443.",
  },
  "hub:locations": {
    q: "Where does Macksofy deliver cybersecurity services?",
    a: "Macksofy is headquartered at SRA Commercial Tower, Bandra Kurla Complex, Mumbai, with a regional hub in Hyderabad's HITEC City and delivery across every Indian metro plus the UAE. Twelve city pages cover the local regulators, industries and services for each location, from Delhi NCR and Bengaluru to Dubai and Abu Dhabi.",
  },
  "hub:case-studies": {
    q: "What are Macksofy's cybersecurity case studies?",
    a: "Macksofy's case studies are long-form, fully anonymised accounts of real engagements — penetration testing, red team, DFIR and cloud security — across BFSI, fintech, telecom, SaaS and manufacturing in India and the UAE. Every finding, timeline and metric comes from the engagement record; only client-identifying detail is removed.",
  },
  "hub:resources": {
    q: "What free cybersecurity resources does Macksofy publish?",
    a: "Macksofy publishes 18 free practitioner resources — 11 whitepapers, 4 checklists and 3 cheat sheets — pulled from real engagement playbooks, covering SEBI CSCRF and CERT-In readiness, ransomware response, OT/IT segmentation, CSPM and Active Directory. Every course brochure sits alongside them. No email gate; whitepapers open as print-ready pages.",
  },

  // ─────────────────────────── CASE STUDIES (8) ───────────────────────────
  // These break the definitional pattern used everywhere else, and that is
  // deliberate. A case study has no "what is X" to answer — the extractable
  // value is the TECHNIQUE, which is a real query ("how quickly can LockBit be
  // contained", "why is a wildcard IAM policy dangerous"). So each `q` asks the
  // generalisable question and each `a` answers it generally FIRST, then cites
  // this engagement as the worked example.
  //
  // ⚠️ ANONYMITY IS LOAD-BEARING. Every case study is published anonymised.
  // Never introduce a detail here that is not already in the entry's own
  // clientType / summary / metrics — no client names, no city-plus-sector
  // combinations narrow enough to identify one company. Figures below are
  // taken from each entry's `metrics` and `findings` arrays verbatim.
  "case-study:listed-fintech-bola-jwt-pentest": {
    q: "How can BOLA and a forged JWT be chained into full data access?",
    a: "Broken object-level authorization lets an attacker read another customer's record by changing an ID in the request; a gateway accepting JWT alg=none lets them forge the token that authorizes it. Chained, the two bypass identity entirely. Macksofy surfaced this in a listed Indian fintech in 4 days, remediated in 9, before its SEBI CSCRF filing.",
  },
  "case-study:gcc-telecom-mobile-app-takeover": {
    q: "How does an insecure deeplink lead to mobile account takeover?",
    a: "An API key left in cleartext shared preferences hands an attacker the credential, and an unvalidated deeplink gives them a way to invoke privileged actions from a link the victim taps. Chained, one SMS click silently takes over an account. Macksofy found this in a GCC telecom's app 2 weeks pre-launch; nothing shipped open.",
  },
  "case-study:listed-bank-red-team-edr-bypass": {
    q: "Can an attacker reach Domain Admin without the SOC raising a ticket?",
    a: "Often yes, which is precisely what a goal-based red team exists to measure. Against a tier-1 listed Indian bank, Macksofy phished in, bypassed EDR, moved laterally and reached Domain Admin in 4 hours 12 minutes with zero SOC tickets raised. 23 detections were then engineered, cutting time-to-detect to 11 minutes.",
  },
  "case-study:maharashtra-manufacturer-lockbit-dfir": {
    q: "How quickly can a LockBit ransomware attack be contained?",
    a: "Containment speed depends on preparation rather than luck. At a 1,400-employee Maharashtra manufacturer, Macksofy was on-site within hours of a 02:14 call and contained a LockBit variant at hour 11; 80% of production was restored from clean backups inside 72 hours. No ransom was paid and no exfiltration was confirmed.",
  },
  "case-study:bangalore-saas-aws-iam-cloud-audit": {
    q: "Why is a wildcard IAM policy on a Lambda role dangerous?",
    a: "A Lambda execution role carrying iam:* on Resource:* can grant itself any permission in the account, making it admin-equivalent however the function is invoked. Macksofy found exactly that during a Bangalore SaaS company's pre-Series-C AWS audit, closed it within the 8-day engagement, and added infrastructure-as-code guardrails so it could not recur.",
  },
  "case-study:bfsi-mnc-bkc-internal-ad-pentest": {
    q: "What is an assumed-breach internal Active Directory pentest?",
    a: "An assumed-breach test starts from one low-privilege user instead of the perimeter, measuring how far an attacker travels once already inside. In a BFSI multinational's Mumbai estate, Macksofy chained NoPac (CVE-2021-42278) with a kerberoastable tier-0 service account to reach Domain Admin in 4 hours during a 15-day engagement.",
  },
  "case-study:listed-bank-iam-zero-trust-mumbai": {
    q: "How do you reduce standing privilege before an RBI inspection?",
    a: "By finding the paths that actually confer privilege, then removing them. Ninety days before an RBI CSITE inspection, Macksofy mapped a Mumbai listed bank's directory with BloodHound and ROADrecon, closed six kerberoastable tier-0 service accounts and an ADCS ESC4 path, and cut standing privilege 78% within 60 days.",
  },
  "case-study:pharma-ransomware-dfir-india-2026": {
    q: "How do you meet CERT-In's 6-hour incident reporting deadline?",
    a: "CERT-In requires reporting within six hours of noticing an incident, so the evidence pipeline and escalation path have to exist beforehand. After an Ahmedabad pharma manufacturer detected ransomware at 03:42, Macksofy filed the CERT-In report in 5 hours 48 minutes, contained by hour 72, and produced a USFDA-inspection-ready evidence pack.",
  },
};

/** Look up a short answer by `"<kind>:<slug>"`. Returns undefined when absent. */
export function getShortAnswer(key: string): ShortAnswer | undefined {
  return SHORT_ANSWERS[key];
}

/**
 * Derive a combo (city × service) short answer from the parent service's
 * short answer. Rationale: the definition of a service is genuinely constant
 * everywhere — only the delivery framing is local — so deriving beats writing
 * 70 near-duplicate hand entries (which would read thinner, not richer). Takes
 * the first sentence of the service answer (its plain-language definition) and
 * appends a city-scoped, geography-neutral delivery line that reads correctly
 * for both Indian and UAE cities. Returns undefined if the service has no base
 * entry, so the combo template simply renders no box.
 */
export function comboShortAnswer(
  serviceSlug: string,
  serviceShortTitle: string,
  cityName: string
): ShortAnswer | undefined {
  const base = SHORT_ANSWERS[`service:${serviceSlug}`];
  if (!base) return undefined;
  const definition = base.a.split(/(?<=[.?])\s/)[0];
  return {
    q: `What is ${serviceShortTitle} in ${cityName}?`,
    a: `${definition} In ${cityName}, Macksofy scopes and delivers the engagement to local regulators, procurement, and timelines — with proof-of-concept findings, board-ready reporting, and a remediation retest.`,
  };
}
