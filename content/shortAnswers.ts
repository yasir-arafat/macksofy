/**
 * Short-answer registry — definition-first 40–60-word answers rendered in the
 * <AnswerBox> under a page H1 for AEO/GEO (AI Overviews, Perplexity, ChatGPT,
 * featured snippets, voice).
 *
 * Keyed by `"<kind>:<slug>"` — kind ∈ service | audit | industry | city |
 * course | combo. Templates look up their key and render the box only when an
 * entry exists, so coverage rolls out progressively without ever shipping an
 * empty box.
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
    a: "The Certified Ethical Hacker (CEH v13, EC-Council) is a foundational credential that teaches you to think and act like an attacker across the five phases of hacking, now with an AI-driven track. As an EC-Council Accredited Training Center, Macksofy delivers CEH v13 with hands-on labs in India.",
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
