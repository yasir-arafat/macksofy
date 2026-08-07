/**
 * Cybersecurity & compliance glossary — an entity hub.
 *
 * Rendered as a single `/glossary` page whose JSON-LD is one `DefinedTermSet`
 * containing every term as a `DefinedTerm` (anchored `@id`). Purpose:
 *   • Entity/GEO — co-locates Macksofy with the concepts LLMs already model,
 *     giving each a definition-first, citation-ready answer.
 *   • AEO — every entry answers a "what is X?" query in ≤55 words.
 *   • Internal linking — each term funnels to the relevant money page.
 *
 * Kept as a single hub (not 100 thin /glossary/[slug] URLs) deliberately: the
 * domain is still building crawl demand, so one strong page beats 100 near-
 * template URLs. Promote individual terms to their own pages later only if
 * indexing is healthy and a term has real standalone search demand.
 *
 * Definition rules (keep future entries consistent):
 *   • Lead with the definition ("X is …"). Plain language. 25–55 words.
 *   • Neutral/encyclopedic — not marketing. Quotable standalone.
 *   • `link` points at the single most relevant service/audit page.
 *   • `related` lists sibling term slugs for cross-linking.
 */

export interface GlossaryTerm {
  slug: string;
  term: string;
  /** Acronym expansion or short parenthetical, shown after the term. */
  abbr?: string;
  category: string;
  definition: string;
  related?: string[];
  link?: { label: string; href: string };
}

export const GLOSSARY_CATEGORIES = [
  "Testing & Offensive Security",
  "Application & API Security",
  "Detection, SOC & Response",
  "Digital Forensics & Malware",
  "Cloud & Infrastructure",
  "Vulnerability Management & Standards",
  "India Regulatory & Compliance",
  "International & GCC Compliance",
  "OT / ICS Security",
  "Certifications",
] as const;

export const GLOSSARY: GlossaryTerm[] = [
  // ───────────── Testing & Offensive Security ─────────────
  {
    slug: "vapt",
    term: "VAPT",
    abbr: "Vulnerability Assessment & Penetration Testing",
    category: "Testing & Offensive Security",
    definition:
      "VAPT combines a vulnerability assessment — automated scanning that finds weaknesses at breadth — with a penetration test that manually exploits them to prove real impact. Together they show both what is wrong and what an attacker could actually do.",
    related: ["penetration-testing", "vulnerability-assessment", "cvss"],
    link: { label: "VAPT services", href: "/services/vapt" },
  },
  {
    slug: "penetration-testing",
    term: "Penetration Testing",
    category: "Testing & Offensive Security",
    definition:
      "Penetration testing is an authorized, simulated cyberattack in which testers safely exploit vulnerabilities in applications, networks, or cloud to demonstrate real business impact before criminals do. It is deeper and more manual than a vulnerability scan.",
    related: ["vapt", "red-teaming", "vulnerability-assessment"],
    link: { label: "Penetration testing", href: "/services/penetration-testing" },
  },
  {
    slug: "vulnerability-assessment",
    term: "Vulnerability Assessment",
    category: "Testing & Offensive Security",
    definition:
      "A vulnerability assessment systematically identifies and ranks security weaknesses across systems using automated scanners and manual review. It prioritizes breadth of coverage over exploitation — it finds and rates issues but does not prove they are exploitable.",
    related: ["vapt", "penetration-testing", "cvss"],
  },
  {
    slug: "red-teaming",
    term: "Red Team",
    category: "Testing & Offensive Security",
    definition:
      "A red team is a goal-based, full-scope adversary simulation testing people, process, and technology together — using phishing, physical, and assumed-breach entry to reach an objective such as domain admin. It measures detection and response, not just vulnerabilities.",
    related: ["purple-teaming", "assumed-breach", "mitre-attack", "penetration-testing"],
    link: { label: "Red team assessment", href: "/services/red-teaming" },
  },
  {
    slug: "purple-teaming",
    term: "Purple Team",
    category: "Testing & Offensive Security",
    definition:
      "Purple teaming runs offensive (red) and defensive (blue) teams together so each simulated attack immediately becomes a validated detection improvement. It measures which techniques the SOC catches and closes the gaps, turning attack findings into lasting detection coverage.",
    related: ["red-teaming", "detection-engineering", "mitre-attack"],
    link: { label: "Purple teaming", href: "/services/purple-teaming" },
  },
  {
    slug: "assumed-breach",
    term: "Assumed Breach",
    category: "Testing & Offensive Security",
    definition:
      "Assumed breach is a testing model that starts from the premise an attacker is already inside — for example with a standard user account — and measures how far they can escalate and move. It tests internal controls rather than only the perimeter.",
    related: ["red-teaming", "lateral-movement", "privilege-escalation"],
  },
  {
    slug: "privilege-escalation",
    term: "Privilege Escalation",
    category: "Testing & Offensive Security",
    definition:
      "Privilege escalation is the act of gaining higher permissions than initially granted — from a normal user to administrator or root. Vertical escalation raises privilege level; horizontal escalation takes over another account at the same level.",
    related: ["lateral-movement", "active-directory", "assumed-breach"],
  },
  {
    slug: "lateral-movement",
    term: "Lateral Movement",
    category: "Testing & Offensive Security",
    definition:
      "Lateral movement is how an attacker pivots from one compromised system to others across a network — reusing credentials, exploiting trust, or abusing remote-access tools — to reach high-value targets after an initial foothold.",
    related: ["privilege-escalation", "active-directory", "kerberoasting"],
  },
  {
    slug: "active-directory",
    term: "Active Directory",
    abbr: "AD",
    category: "Testing & Offensive Security",
    definition:
      "Active Directory is Microsoft's identity and access directory service for Windows networks, managing users, computers, and permissions. Because it centralizes authentication, compromising it — often the goal of a red team — usually means controlling the entire domain.",
    related: ["kerberoasting", "privilege-escalation", "lateral-movement"],
    link: { label: "Network penetration testing", href: "/services/network-pentesting" },
  },
  {
    slug: "kerberoasting",
    term: "Kerberoasting",
    category: "Testing & Offensive Security",
    definition:
      "Kerberoasting is an Active Directory attack that requests Kerberos service tickets and cracks them offline to recover the plaintext passwords of service accounts. It needs only a valid domain user and is a common path to privilege escalation.",
    related: ["active-directory", "privilege-escalation"],
  },
  {
    slug: "social-engineering",
    term: "Social Engineering",
    category: "Testing & Offensive Security",
    definition:
      "Social engineering manipulates people into revealing information or performing actions that weaken security — through phishing, pretexting, or impersonation. It targets human trust rather than technical flaws and is a leading cause of breaches.",
    related: ["phishing", "red-teaming"],
    link: { label: "Phishing simulation", href: "/services/phishing-simulation" },
  },
  {
    slug: "phishing",
    term: "Phishing",
    category: "Testing & Offensive Security",
    definition:
      "Phishing is a social-engineering attack that uses fraudulent emails, messages, or sites to trick victims into revealing credentials or installing malware. Spear phishing targets specific individuals; a phishing simulation safely tests staff resilience.",
    related: ["social-engineering", "business-email-compromise"],
    link: { label: "Phishing simulation", href: "/services/phishing-simulation" },
  },
  {
    slug: "bug-bounty",
    term: "Bug Bounty",
    category: "Testing & Offensive Security",
    definition:
      "A bug bounty is a program that pays independent security researchers to responsibly report vulnerabilities they find in an organization's assets. It provides continuous, crowd-sourced testing but is unscoped and unscheduled, unlike a structured penetration test.",
    related: ["penetration-testing", "responsible-disclosure"],
  },
  {
    slug: "c2",
    term: "Command and Control",
    abbr: "C2",
    category: "Testing & Offensive Security",
    definition:
      "Command and control (C2) is the infrastructure and channel an attacker uses to remotely manage compromised machines — issuing commands, moving data, and staging further attacks. Detecting C2 traffic is a core objective of a SOC.",
    related: ["mitre-attack", "lateral-movement"],
  },

  // ───────────── Application & API Security ─────────────
  {
    slug: "owasp-top-10",
    term: "OWASP Top 10",
    category: "Application & API Security",
    definition:
      "The OWASP Top 10 is a widely adopted awareness list of the most critical web application security risks — such as broken access control, injection, and cryptographic failures — published by the Open Worldwide Application Security Project. It anchors most web pentest scopes.",
    related: ["owasp-api-top-10", "sql-injection", "xss", "broken-access-control"],
    link: { label: "Web app security testing", href: "/services/web-application-security" },
  },
  {
    slug: "owasp-api-top-10",
    term: "OWASP API Security Top 10",
    category: "Application & API Security",
    definition:
      "The OWASP API Security Top 10 lists the most critical risks specific to APIs — led by broken object-level authorization (BOLA), broken authentication, and excessive data exposure. APIs need their own testing focus beyond the web Top 10.",
    related: ["owasp-top-10", "bola", "api-security"],
    link: { label: "API security testing", href: "/services/api-security" },
  },
  {
    slug: "api-security",
    term: "API Security",
    category: "Application & API Security",
    definition:
      "API security protects the application programming interfaces that connect apps, mobile clients, and services from abuse — authorization flaws, authentication bypass, and data leakage. As APIs carry most modern traffic, they are a primary attack surface.",
    related: ["owasp-api-top-10", "bola", "jwt"],
    link: { label: "API security testing", href: "/services/api-security" },
  },
  {
    slug: "bola",
    term: "BOLA / IDOR",
    abbr: "Broken Object-Level Authorization",
    category: "Application & API Security",
    definition:
      "BOLA (also called IDOR) is a flaw where an API or app lets a user access another user's data by changing an object identifier — because it checks authentication but not whether the requester owns that object. It is the top API security risk.",
    related: ["owasp-api-top-10", "broken-access-control", "api-security"],
  },
  {
    slug: "ssrf",
    term: "SSRF",
    abbr: "Server-Side Request Forgery",
    category: "Application & API Security",
    definition:
      "SSRF is a vulnerability where an attacker makes a server send requests to unintended destinations — often internal services or cloud metadata endpoints — turning the trusted server into a proxy. In cloud apps it can lead to credential theft and full compromise.",
    related: ["cloud-security", "owasp-top-10"],
  },
  {
    slug: "xss",
    term: "Cross-Site Scripting",
    abbr: "XSS",
    category: "Application & API Security",
    definition:
      "Cross-site scripting (XSS) injects malicious scripts into web pages viewed by other users, running in their browser to steal sessions, credentials, or perform actions as them. Types include stored, reflected, and DOM-based XSS.",
    related: ["owasp-top-10", "csrf"],
  },
  {
    slug: "sql-injection",
    term: "SQL Injection",
    abbr: "SQLi",
    category: "Application & API Security",
    definition:
      "SQL injection inserts malicious SQL through unsanitized input so an attacker can read, modify, or delete database data — and sometimes execute commands. A classic, high-impact flaw prevented by parameterized queries.",
    related: ["owasp-top-10", "secure-code-review"],
  },
  {
    slug: "csrf",
    term: "CSRF",
    abbr: "Cross-Site Request Forgery",
    category: "Application & API Security",
    definition:
      "CSRF tricks a logged-in user's browser into sending an unwanted authenticated request — for example transferring funds — by exploiting the browser's automatic inclusion of session cookies. Anti-CSRF tokens and SameSite cookies defend against it.",
    related: ["xss", "owasp-top-10"],
  },
  {
    slug: "broken-access-control",
    term: "Broken Access Control",
    category: "Application & API Security",
    definition:
      "Broken access control means users can act outside their intended permissions — viewing others' data, reaching admin functions, or bypassing checks. It is the OWASP Top 10's number-one web risk and the root of BOLA/IDOR.",
    related: ["bola", "owasp-top-10"],
  },
  {
    slug: "jwt",
    term: "JWT",
    abbr: "JSON Web Token",
    category: "Application & API Security",
    definition:
      "A JSON Web Token is a signed, compact token that carries identity and claims between client and server for stateless authentication. Insecure signature verification, weak keys, or the 'none' algorithm are common JWT vulnerabilities in APIs.",
    related: ["api-security", "oauth"],
  },
  {
    slug: "oauth",
    term: "OAuth 2.0",
    category: "Application & API Security",
    definition:
      "OAuth 2.0 is an authorization framework that lets an application access resources on a user's behalf without sharing their password, issuing scoped access tokens. Misconfigured redirect URIs and scopes are frequent sources of account-takeover flaws.",
    related: ["jwt", "saml", "identity-security"],
  },
  {
    slug: "saml",
    term: "SAML",
    abbr: "Security Assertion Markup Language",
    category: "Application & API Security",
    definition:
      "SAML is an XML-based standard for exchanging authentication and authorization data between an identity provider and a service, enabling single sign-on (SSO) for enterprises. Signature-wrapping and misconfiguration attacks can bypass it.",
    related: ["oauth", "identity-security"],
  },
  {
    slug: "secure-code-review",
    term: "Secure Code Review",
    category: "Application & API Security",
    definition:
      "Secure code review manually inspects source code to find vulnerabilities black-box testing misses — hardcoded secrets, injection sinks, broken authorization, and unsafe crypto — often combined with SAST. It examines the code, not just the running app.",
    related: ["sast", "dast", "owasp-asvs"],
    link: { label: "Secure code review", href: "/services/source-code-review" },
  },
  {
    slug: "sast",
    term: "SAST",
    abbr: "Static Application Security Testing",
    category: "Application & API Security",
    definition:
      "SAST analyzes an application's source code, bytecode, or binaries without running it, flagging insecure patterns early in development. It offers wide coverage but produces false positives and cannot see runtime behavior.",
    related: ["dast", "iast", "secure-code-review"],
  },
  {
    slug: "dast",
    term: "DAST",
    abbr: "Dynamic Application Security Testing",
    category: "Application & API Security",
    definition:
      "DAST tests a running application from the outside, sending inputs to find vulnerabilities visible at runtime — like injection and misconfiguration — without access to source code. It complements SAST's code-level view.",
    related: ["sast", "iast", "penetration-testing"],
  },
  {
    slug: "iast",
    term: "IAST",
    abbr: "Interactive Application Security Testing",
    category: "Application & API Security",
    definition:
      "IAST instruments a running application to analyze code and data flow from the inside during testing, combining SAST's code visibility with DAST's runtime accuracy for fewer false positives. It runs within the app under test.",
    related: ["sast", "dast"],
  },
  {
    slug: "owasp-asvs",
    term: "OWASP ASVS",
    abbr: "Application Security Verification Standard",
    category: "Application & API Security",
    definition:
      "The OWASP ASVS is a detailed catalog of application security requirements and verification levels used to define scope and measure the rigor of an application security test. It turns 'is this app secure?' into checkable controls.",
    related: ["owasp-top-10", "secure-code-review"],
  },
  {
    slug: "masvs",
    term: "OWASP MASVS",
    abbr: "Mobile Application Security Verification Standard",
    category: "Application & API Security",
    definition:
      "The OWASP MASVS defines security requirements for mobile apps — covering storage, cryptography, authentication, and platform interaction — and anchors mobile penetration test scopes for Android and iOS.",
    related: ["owasp-asvs"],
    link: { label: "Mobile app security", href: "/services/mobile-application-security" },
  },
  {
    slug: "prompt-injection",
    term: "Prompt Injection",
    category: "Application & API Security",
    definition:
      "Prompt injection manipulates a large language model with crafted input so it ignores its instructions or performs unintended actions — leaking data or misusing connected tools. It is the top risk in the OWASP Top 10 for LLM Applications.",
    related: ["ai-security", "owasp-top-10"],
    link: { label: "AI/LLM penetration testing", href: "/services/ai-pentesting" },
  },
  {
    slug: "ai-security",
    term: "AI Security",
    category: "Application & API Security",
    definition:
      "AI security protects applications built on machine-learning and large-language models from risks like prompt injection, insecure output handling, data leakage, and agent/tool abuse, following the OWASP Top 10 for LLM Applications.",
    related: ["prompt-injection"],
    link: { label: "AI/LLM penetration testing", href: "/services/ai-pentesting" },
  },

  // ───────────── Detection, SOC & Response ─────────────
  {
    slug: "soc",
    term: "SOC",
    abbr: "Security Operations Center",
    category: "Detection, SOC & Response",
    definition:
      "A Security Operations Center is the team and facility that monitors an organization's security telemetry around the clock, detecting, investigating, and responding to threats — typically built around a SIEM and staffed by tiered analysts.",
    related: ["siem", "mdr", "detection-engineering", "threat-hunting"],
    link: { label: "Managed SOC", href: "/services/managed-soc" },
  },
  {
    slug: "siem",
    term: "SIEM",
    abbr: "Security Information & Event Management",
    category: "Detection, SOC & Response",
    definition:
      "A SIEM collects, normalizes, and correlates logs and events from across an environment to detect threats, alert analysts, and support investigation and compliance. Wazuh, Microsoft Sentinel, and Splunk are common platforms.",
    related: ["soc", "soar", "detection-engineering"],
    link: { label: "Managed SOC", href: "/services/managed-soc" },
  },
  {
    slug: "soar",
    term: "SOAR",
    abbr: "Security Orchestration, Automation & Response",
    category: "Detection, SOC & Response",
    definition:
      "SOAR platforms automate and orchestrate repetitive SOC tasks through playbooks — enriching alerts, containing hosts, and coordinating response — to cut mean time to respond and reduce analyst fatigue.",
    related: ["siem", "soc", "incident-response"],
  },
  {
    slug: "edr",
    term: "EDR",
    abbr: "Endpoint Detection & Response",
    category: "Detection, SOC & Response",
    definition:
      "EDR is software on endpoints that continuously records activity, detects malicious behavior, and enables investigation and remote response — going beyond signature antivirus to catch fileless and behavioral attacks.",
    related: ["xdr", "mdr", "siem"],
  },
  {
    slug: "xdr",
    term: "XDR",
    abbr: "Extended Detection & Response",
    category: "Detection, SOC & Response",
    definition:
      "XDR unifies detection and response across endpoints, network, cloud, email, and identity into one correlated platform, giving analysts a single view instead of siloed tools. It extends EDR beyond the endpoint.",
    related: ["edr", "mdr", "ndr"],
  },
  {
    slug: "mdr",
    term: "MDR",
    abbr: "Managed Detection & Response",
    category: "Detection, SOC & Response",
    definition:
      "MDR is a service that delivers 24×7 threat detection, investigation, and active response using a provider's technology and analysts. Unlike a traditional MSSP, MDR emphasizes hands-on response, not just alerting.",
    related: ["mssp", "soc", "managed-security-services"],
    link: { label: "Managed security services", href: "/services/managed-security-services" },
  },
  {
    slug: "mssp",
    term: "MSSP",
    abbr: "Managed Security Service Provider",
    category: "Detection, SOC & Response",
    definition:
      "An MSSP outsources the operation of security controls — monitoring, device management, patching, and reporting — under SLAs. It provides broad coverage and alerting; MDR adds deeper, active threat response.",
    related: ["mdr", "soc", "managed-security-services"],
    link: { label: "Managed security services", href: "/services/managed-security-services" },
  },
  {
    slug: "threat-hunting",
    term: "Threat Hunting",
    category: "Detection, SOC & Response",
    definition:
      "Threat hunting is the proactive search through telemetry for attackers who evaded automated detection, driven by hypotheses about adversary behavior. It finds threats before alerts fire and feeds new detections back to the SOC.",
    related: ["detection-engineering", "threat-intelligence", "mitre-attack"],
  },
  {
    slug: "detection-engineering",
    term: "Detection Engineering",
    category: "Detection, SOC & Response",
    definition:
      "Detection engineering is the discipline of building, testing, and maintaining the rules and analytics a SOC uses to spot attacks — mapping coverage to frameworks like MITRE ATT&CK and tuning to cut false positives.",
    related: ["siem", "mitre-attack", "threat-hunting", "purple-teaming"],
  },
  {
    slug: "mitre-attack",
    term: "MITRE ATT&CK",
    category: "Detection, SOC & Response",
    definition:
      "MITRE ATT&CK is a globally used knowledge base of real-world adversary tactics and techniques, organized by attack stage. Teams use it to plan red-team operations, measure detection coverage, and communicate threats in a common language.",
    related: ["detection-engineering", "red-teaming", "threat-intelligence"],
  },
  {
    slug: "threat-intelligence",
    term: "Threat Intelligence",
    abbr: "CTI",
    category: "Detection, SOC & Response",
    definition:
      "Cyber threat intelligence is curated, actionable knowledge about the attackers, tools, and techniques targeting an organization or sector — turned into detections, blocklists, and risk decisions so defenders focus on relevant threats.",
    related: ["ioc", "mitre-attack", "threat-hunting"],
    link: { label: "Threat intelligence", href: "/services/threat-intelligence" },
  },
  {
    slug: "ioc",
    term: "IOC / IOA",
    abbr: "Indicators of Compromise / Attack",
    category: "Detection, SOC & Response",
    definition:
      "Indicators of compromise (IOCs) are forensic artifacts — hashes, IPs, domains — showing a breach occurred; indicators of attack (IOAs) describe attacker behavior in progress. IOCs are reactive; IOAs enable earlier detection.",
    related: ["threat-intelligence", "threat-hunting"],
  },
  {
    slug: "zero-trust",
    term: "Zero Trust",
    category: "Detection, SOC & Response",
    definition:
      "Zero Trust is a security model that never assumes trust based on network location, instead continuously verifying every user, device, and request with least-privilege access and segmentation — so a stolen credential cannot roam freely.",
    related: ["identity-security", "network-security-architecture"],
    link: { label: "Zero Trust & identity security", href: "/services/identity-security-zero-trust" },
  },
  {
    slug: "identity-security",
    term: "IAM / PAM",
    abbr: "Identity & Privileged Access Management",
    category: "Detection, SOC & Response",
    definition:
      "IAM governs who can access what across an organization; PAM specifically secures and monitors privileged (admin) accounts, the highest-value targets. Together they enforce least privilege and are foundational to Zero Trust.",
    related: ["zero-trust", "oauth"],
    link: { label: "Zero Trust & identity security", href: "/services/identity-security-zero-trust" },
  },

  // ───────────── Digital Forensics & Malware ─────────────
  {
    slug: "dfir",
    term: "DFIR",
    abbr: "Digital Forensics & Incident Response",
    category: "Digital Forensics & Malware",
    definition:
      "DFIR combines incident response — containing and recovering from an active attack — with digital forensics, the investigation of what happened using preserved evidence. It covers ransomware, business email compromise, and Active Directory compromise.",
    related: ["incident-response", "ransomware", "chain-of-custody", "malware-analysis"],
    link: { label: "DFIR services", href: "/services/digital-forensics-incident-response" },
  },
  {
    slug: "incident-response",
    term: "Incident Response",
    abbr: "IR",
    category: "Digital Forensics & Malware",
    definition:
      "Incident response is the structured process of preparing for, detecting, containing, eradicating, and recovering from a cyberattack, followed by lessons learned. A retainer gives an organization on-call responders before an incident hits.",
    related: ["dfir", "ransomware", "business-email-compromise"],
    link: { label: "DFIR services", href: "/services/digital-forensics-incident-response" },
  },
  {
    slug: "ransomware",
    term: "Ransomware",
    category: "Digital Forensics & Malware",
    definition:
      "Ransomware is malware that encrypts an organization's data and demands payment for decryption, often also stealing data to extort with the threat of leaking it (double extortion). It is among the most damaging and common enterprise threats.",
    related: ["incident-response", "dfir", "malware-analysis"],
    link: { label: "DFIR services", href: "/services/digital-forensics-incident-response" },
  },
  {
    slug: "business-email-compromise",
    term: "Business Email Compromise",
    abbr: "BEC",
    category: "Digital Forensics & Malware",
    definition:
      "Business email compromise is a fraud in which attackers impersonate executives or vendors — often via a compromised or spoofed mailbox — to trick staff into transferring funds or data. It relies on social engineering, not malware.",
    related: ["phishing", "incident-response"],
  },
  {
    slug: "malware-analysis",
    term: "Malware Analysis",
    category: "Digital Forensics & Malware",
    definition:
      "Malware analysis reverse-engineers a suspicious file to determine what it does, how it spreads, and how to detect and remove it — using static, dynamic, and sandbox techniques — producing indicators of compromise and detection rules.",
    related: ["yara", "sandbox", "ioc"],
    link: { label: "Malware analysis", href: "/services/malware-analysis" },
  },
  {
    slug: "yara",
    term: "YARA",
    category: "Digital Forensics & Malware",
    definition:
      "YARA is a pattern-matching tool and rule language used to identify and classify malware by textual or binary signatures. Analysts write YARA rules to detect malware families across files and memory.",
    related: ["malware-analysis", "ioc"],
  },
  {
    slug: "sandbox",
    term: "Sandbox",
    category: "Digital Forensics & Malware",
    definition:
      "A sandbox is an isolated, instrumented environment where suspicious files are detonated and observed safely, revealing their behavior without risking production systems. It underpins dynamic malware analysis.",
    related: ["malware-analysis", "yara"],
  },
  {
    slug: "chain-of-custody",
    term: "Chain of Custody",
    category: "Digital Forensics & Malware",
    definition:
      "Chain of custody is the documented, unbroken record of who handled digital evidence, when, and how — preserving its integrity so it is admissible and defensible. It is essential to forensic investigations and regulatory reporting.",
    related: ["dfir", "incident-response"],
  },
  {
    slug: "memory-forensics",
    term: "Memory Forensics",
    category: "Digital Forensics & Malware",
    definition:
      "Memory forensics analyzes a system's RAM to recover running processes, injected code, credentials, and network connections that never touch disk. It is vital for investigating fileless malware and live intrusions, using tools like Volatility.",
    related: ["dfir", "malware-analysis"],
  },

  // ───────────── Cloud & Infrastructure ─────────────
  {
    slug: "cloud-security",
    term: "Cloud Security",
    category: "Cloud & Infrastructure",
    definition:
      "Cloud security protects workloads, data, and identities in AWS, Azure, and GCP against misconfiguration, over-permissive access, and exposure. Under the shared responsibility model the provider secures the cloud, and the customer secures what they run in it.",
    related: ["cspm", "cnapp", "shared-responsibility", "iam"],
    link: { label: "Cloud security assessment", href: "/services/cloud-security" },
  },
  {
    slug: "cspm",
    term: "CSPM",
    abbr: "Cloud Security Posture Management",
    category: "Cloud & Infrastructure",
    definition:
      "CSPM continuously scans cloud accounts for misconfigurations and compliance drift — public storage, weak IAM, open ports — and reports or remediates them. It answers 'is our cloud configured securely?' at scale.",
    related: ["cnapp", "cwpp", "cloud-security"],
  },
  {
    slug: "cnapp",
    term: "CNAPP",
    abbr: "Cloud-Native Application Protection Platform",
    category: "Cloud & Infrastructure",
    definition:
      "A CNAPP unifies cloud security capabilities — posture management, workload protection, and entitlement management — into a single platform spanning code to runtime. It consolidates CSPM, CWPP, and CIEM.",
    related: ["cspm", "cwpp", "ciem"],
  },
  {
    slug: "cwpp",
    term: "CWPP",
    abbr: "Cloud Workload Protection Platform",
    category: "Cloud & Infrastructure",
    definition:
      "A CWPP secures the running workloads themselves — virtual machines, containers, and serverless functions — with vulnerability scanning, hardening, and runtime threat detection across hybrid and multi-cloud environments.",
    related: ["cnapp", "cspm", "kubernetes-security"],
  },
  {
    slug: "ciem",
    term: "CIEM",
    abbr: "Cloud Infrastructure Entitlement Management",
    category: "Cloud & Infrastructure",
    definition:
      "CIEM manages and right-sizes cloud identities and permissions, finding excessive or unused entitlements that widen the blast radius of a compromised account. It enforces least privilege across cloud IAM.",
    related: ["cnapp", "iam", "cloud-security"],
  },
  {
    slug: "kubernetes-security",
    term: "Kubernetes Security",
    abbr: "K8s",
    category: "Cloud & Infrastructure",
    definition:
      "Kubernetes security hardens container orchestration — RBAC, network policies, admission control, and image scanning — against misconfiguration and container escape. Default-open settings make it a frequent source of cloud breaches.",
    related: ["cwpp", "cloud-security"],
  },
  {
    slug: "shared-responsibility",
    term: "Shared Responsibility Model",
    category: "Cloud & Infrastructure",
    definition:
      "The shared responsibility model divides security duties between cloud provider and customer: the provider secures the underlying infrastructure, while the customer secures their data, identities, and configurations. Misunderstanding the line causes many cloud breaches.",
    related: ["cloud-security", "cspm"],
  },
  {
    slug: "network-security-architecture",
    term: "Network Segmentation",
    category: "Cloud & Infrastructure",
    definition:
      "Network segmentation divides a network into isolated zones so a breach in one cannot spread freely to others, enforced by firewalls, VLANs, and Zero Trust controls. It contains blast radius and is required by standards like PCI-DSS.",
    related: ["zero-trust", "purdue-model"],
    link: { label: "Network security architecture", href: "/services/network-security-architecture" },
  },

  // ───────────── Vulnerability Management & Standards ─────────────
  {
    slug: "cve",
    term: "CVE",
    abbr: "Common Vulnerabilities & Exposures",
    category: "Vulnerability Management & Standards",
    definition:
      "A CVE is a unique public identifier (e.g. CVE-2024-12345) assigned to a specific disclosed vulnerability, giving everyone a common reference. The CVE list is the backbone of vulnerability tracking and advisories.",
    related: ["cvss", "cwe", "kev", "epss"],
  },
  {
    slug: "cvss",
    term: "CVSS",
    abbr: "Common Vulnerability Scoring System",
    category: "Vulnerability Management & Standards",
    definition:
      "CVSS is an open standard that scores a vulnerability's severity from 0 to 10 based on exploitability and impact, producing ratings from Low to Critical. It standardizes how findings are prioritized in reports.",
    related: ["cve", "epss", "cwe"],
  },
  {
    slug: "cwe",
    term: "CWE",
    abbr: "Common Weakness Enumeration",
    category: "Vulnerability Management & Standards",
    definition:
      "CWE is a community catalog of software and hardware weakness types — such as SQL injection or buffer overflow — that describe the root cause of vulnerabilities. Where a CVE is a specific instance, a CWE is the underlying class.",
    related: ["cve", "capec", "owasp-top-10"],
  },
  {
    slug: "capec",
    term: "CAPEC",
    abbr: "Common Attack Pattern Enumeration",
    category: "Vulnerability Management & Standards",
    definition:
      "CAPEC is a catalog of common attack patterns describing how adversaries exploit weaknesses, complementing CWE's list of the weaknesses themselves. It helps model and defend against known attack techniques.",
    related: ["cwe", "mitre-attack"],
  },
  {
    slug: "cpe",
    term: "CPE",
    abbr: "Common Platform Enumeration",
    category: "Vulnerability Management & Standards",
    definition:
      "CPE is a standardized naming scheme for IT products, systems, and packages, used to match assets to the vulnerabilities (CVEs) that affect them. It underpins automated vulnerability correlation in scanners.",
    related: ["cve", "cvss"],
  },
  {
    slug: "kev",
    term: "KEV",
    abbr: "Known Exploited Vulnerabilities",
    category: "Vulnerability Management & Standards",
    definition:
      "The KEV catalog, maintained by the US CISA, lists vulnerabilities confirmed to be actively exploited in the wild. Prioritizing KEV entries focuses remediation on real, present risk rather than theoretical severity.",
    related: ["cve", "epss", "patch-management"],
  },
  {
    slug: "epss",
    term: "EPSS",
    abbr: "Exploit Prediction Scoring System",
    category: "Vulnerability Management & Standards",
    definition:
      "EPSS estimates the probability that a vulnerability will be exploited in the near term, expressed as a percentage. Combined with CVSS severity, it helps teams prioritize the vulnerabilities most likely to actually be attacked.",
    related: ["cvss", "kev", "cve"],
  },
  {
    slug: "sbom",
    term: "SBOM",
    abbr: "Software Bill of Materials",
    category: "Vulnerability Management & Standards",
    definition:
      "An SBOM is a formal inventory of all components and dependencies in a piece of software, enabling rapid identification of which products are affected when a new vulnerability appears. SEBI CSCRF and other frameworks now mandate it.",
    related: ["sebi-cscrf", "supply-chain"],
  },
  {
    slug: "zero-day",
    term: "Zero-Day",
    category: "Vulnerability Management & Standards",
    definition:
      "A zero-day is a vulnerability unknown to the vendor and without a patch, giving defenders zero days to prepare before it can be exploited. Zero-day exploits are highly valuable and dangerous until a fix ships.",
    related: ["cve", "patch-management"],
  },
  {
    slug: "patch-management",
    term: "Patch Management",
    category: "Vulnerability Management & Standards",
    definition:
      "Patch management is the process of identifying, testing, and deploying software updates that fix vulnerabilities within defined timelines. CERT-In mandates rapid patching of known-exploited flaws for Indian organizations.",
    related: ["kev", "cert-in", "zero-day"],
  },
  {
    slug: "supply-chain",
    term: "Supply Chain Attack",
    category: "Vulnerability Management & Standards",
    definition:
      "A supply chain attack compromises an organization by first breaching a trusted third party — a software vendor, dependency, or service provider — then reaching downstream victims. SBOMs and vendor risk management reduce this exposure.",
    related: ["sbom", "vendor-risk"],
  },
  {
    slug: "vendor-risk",
    term: "Third-Party / Vendor Risk",
    category: "Vulnerability Management & Standards",
    definition:
      "Third-party risk management assesses and monitors the security of vendors, cloud providers, and partners who can affect an organization's data or operations. RBI and SEBI require regulated entities to govern and audit their outsourced providers.",
    related: ["supply-chain", "rbi-it-outsourcing"],
  },

  // ───────────── India Regulatory & Compliance ─────────────
  {
    slug: "cert-in",
    term: "CERT-In",
    abbr: "Indian Computer Emergency Response Team",
    category: "India Regulatory & Compliance",
    definition:
      "CERT-In is India's national nodal agency for cybersecurity incidents, under MeitY. It issues directions — including mandatory incident reporting and audit requirements — and empanels security auditors whose reports regulators accept.",
    related: ["cert-in-empanelment", "patch-management"],
    link: { label: "CERT-In empanelled audit", href: "/audit/cert-in-empanelled-audit" },
  },
  {
    slug: "cert-in-empanelment",
    term: "CERT-In Empanelment",
    category: "India Regulatory & Compliance",
    definition:
      "CERT-In empanelment is formal recognition of a security auditor by CERT-In, allowing its assessments to be accepted by RBI, SEBI, UIDAI, IRDAI, and other regulators without rework. Macksofy is a CERT-In empanelled auditor.",
    related: ["cert-in", "cert-in-empanelled-audit"],
    link: { label: "CERT-In empanelled audit", href: "/audit/cert-in-empanelled-audit" },
  },
  {
    slug: "cert-in-empanelled-audit",
    term: "CERT-In Empanelled Audit",
    category: "India Regulatory & Compliance",
    definition:
      "A CERT-In empanelled audit is a security assessment performed by a CERT-In-empanelled auditor in the format regulators expect. Its reports are accepted across Indian regulators, making it the baseline for regulated-sector compliance.",
    related: ["cert-in", "cert-in-empanelment", "rbi-csf", "sebi-cscrf"],
    link: { label: "CERT-In empanelled audit", href: "/audit/cert-in-empanelled-audit" },
  },
  {
    slug: "rbi-csf",
    term: "RBI Cyber Security Framework",
    abbr: "RBI CSF",
    category: "India Regulatory & Compliance",
    definition:
      "The RBI Cyber Security Framework mandates baseline and graded security controls for banks, NBFCs, and cooperative banks — covering governance, VAPT, SOC, and incident reporting — with periodic audits and a System Audit Report.",
    related: ["sebi-cscrf", "rbi-it-governance", "cert-in-empanelled-audit"],
    link: { label: "RBI CSF compliance", href: "/audit/rbi-csf" },
  },
  {
    slug: "sebi-cscrf",
    term: "SEBI CSCRF",
    abbr: "Cyber Security & Cyber Resilience Framework",
    category: "India Regulatory & Compliance",
    definition:
      "SEBI's CSCRF sets graded cyber obligations for regulated entities and market infrastructure — VAPT, SOC, SBOM, and a Cyber Capability Index — to strengthen resilience across India's capital markets.",
    related: ["rbi-csf", "sbom", "cert-in-empanelled-audit"],
    link: { label: "SEBI CSCRF compliance", href: "/audit/sebi-cscrf" },
  },
  {
    slug: "rbi-it-governance",
    term: "RBI IT Governance Master Direction",
    category: "India Regulatory & Compliance",
    definition:
      "The RBI Master Direction on IT Governance, Risk, and Assurance mandates board-level IT oversight, a named CISO, and independent assurance for regulated entities, formalizing how banks and NBFCs govern technology risk.",
    related: ["rbi-csf", "vendor-risk"],
    link: { label: "RBI IT Governance", href: "/audit/rbi-it-governance" },
  },
  {
    slug: "dpdp",
    term: "DPDP Act",
    abbr: "Digital Personal Data Protection Act, 2023",
    category: "India Regulatory & Compliance",
    definition:
      "The DPDP Act is India's data-protection law governing how businesses collect and process personal data, mandating consent, breach notification, and data-principal rights. It applies to any organization handling Indian residents' personal data.",
    related: ["data-fiduciary", "sdf", "gdpr"],
    link: { label: "DPDP Act compliance", href: "/audit/dpdp-act" },
  },
  {
    slug: "data-fiduciary",
    term: "Data Fiduciary",
    category: "India Regulatory & Compliance",
    definition:
      "Under the DPDP Act, a data fiduciary is any entity that determines the purpose and means of processing personal data — the equivalent of a controller under GDPR. It bears primary responsibility for protecting that data.",
    related: ["dpdp", "sdf"],
    link: { label: "DPDP Act compliance", href: "/audit/dpdp-act" },
  },
  {
    slug: "sdf",
    term: "Significant Data Fiduciary",
    abbr: "SDF",
    category: "India Regulatory & Compliance",
    definition:
      "A Significant Data Fiduciary is a data fiduciary designated by the government as high-volume or high-risk under the DPDP Act, triggering extra duties — a Data Protection Officer, Data Protection Impact Assessments, and independent audits.",
    related: ["dpdp", "data-fiduciary"],
    link: { label: "DPDP SDF obligations", href: "/audit/dpdp-sdf" },
  },
  {
    slug: "nciipc",
    term: "NCIIPC / CII",
    abbr: "National Critical Information Infrastructure Protection Centre",
    category: "India Regulatory & Compliance",
    definition:
      "NCIIPC protects India's Critical Information Infrastructure — systems whose failure would impact national security or the economy. Under IT Act §70, designated CII operators must meet defined security controls and audits.",
    related: ["cert-in", "iec-62443"],
    link: { label: "NCIIPC / CII audit", href: "/audit/nciipc-cii-audit" },
  },
  {
    slug: "irdai",
    term: "IRDAI Cyber Security Guidelines",
    category: "India Regulatory & Compliance",
    definition:
      "The IRDAI information and cyber security guidelines require insurers to run VAPT, appoint a CISO, and report incidents, protecting policyholder data and insurance systems under India's insurance regulator.",
    related: ["rbi-csf", "sebi-cscrf"],
    link: { label: "IRDAI compliance", href: "/audit/irdai-compliance" },
  },

  // ───────────── International & GCC Compliance ─────────────
  {
    slug: "iso-27001",
    term: "ISO/IEC 27001",
    category: "International & GCC Compliance",
    definition:
      "ISO/IEC 27001 is the international standard for an Information Security Management System — a governed framework of policies, risk treatment, and controls with continuous improvement. Certification is a widely recognized proof of security maturity.",
    related: ["soc-2", "iso-27701", "nist-csf"],
    link: { label: "ISO 27001 certification", href: "/audit/iso-27001" },
  },
  {
    slug: "iso-27701",
    term: "ISO/IEC 27701",
    category: "International & GCC Compliance",
    definition:
      "ISO/IEC 27701 extends ISO 27001 into a Privacy Information Management System, operationalizing data-protection controls. It helps organizations evidence DPDP and GDPR compliance on top of an existing ISMS.",
    related: ["iso-27001", "dpdp", "gdpr"],
    link: { label: "ISO 27701", href: "/audit/iso-27701" },
  },
  {
    slug: "soc-2",
    term: "SOC 2",
    category: "International & GCC Compliance",
    definition:
      "SOC 2 is an independent attestation that a service organization's controls meet the Trust Services Criteria — security, availability, confidentiality, processing integrity, and privacy. It is often required by US and global enterprise buyers.",
    related: ["iso-27001", "pci-dss"],
    link: { label: "SOC 2 compliance", href: "/audit/soc-2" },
  },
  {
    slug: "pci-dss",
    term: "PCI-DSS",
    abbr: "Payment Card Industry Data Security Standard",
    category: "International & GCC Compliance",
    definition:
      "PCI-DSS is the mandatory security standard for any business that stores, processes, or transmits payment-card data, spanning network, encryption, access control, and testing. Version 4.0 introduced a flexible customized approach.",
    related: ["network-security-architecture", "iso-27001"],
    link: { label: "PCI-DSS compliance", href: "/audit/pci-dss" },
  },
  {
    slug: "hipaa",
    term: "HIPAA",
    category: "International & GCC Compliance",
    definition:
      "HIPAA is the US law setting requirements for protecting patient health information (PHI), relevant to Indian healthcare BPOs and health-tech serving US clients through administrative, physical, and technical safeguards.",
    related: ["gdpr", "adhics"],
    link: { label: "HIPAA compliance", href: "/audit/hipaa" },
  },
  {
    slug: "gdpr",
    term: "GDPR",
    abbr: "General Data Protection Regulation",
    category: "International & GCC Compliance",
    definition:
      "GDPR is the EU regulation governing how organizations handle EU residents' personal data, with strict consent, transfer, and breach rules and heavy fines. Indian businesses serving EU customers must comply.",
    related: ["dpdp", "iso-27701"],
    link: { label: "GDPR compliance", href: "/audit/gdpr" },
  },
  {
    slug: "nist-csf",
    term: "NIST CSF",
    abbr: "NIST Cybersecurity Framework",
    category: "International & GCC Compliance",
    definition:
      "The NIST Cybersecurity Framework organizes security around six functions — Govern, Identify, Protect, Detect, Respond, Recover — as a flexible, risk-based benchmark used worldwide to assess and improve security maturity.",
    related: ["iso-27001", "mitre-attack"],
    link: { label: "NIST CSF", href: "/audit/nist-csf" },
  },
  {
    slug: "nesa",
    term: "NESA / UAE IAS",
    abbr: "UAE Information Assurance Standards",
    category: "International & GCC Compliance",
    definition:
      "The UAE Information Assurance Standards, issued by NESA/SIA, mandate security controls for entities in critical sectors across management and technical domains. They are a baseline compliance requirement for UAE organizations.",
    related: ["adhics", "desc-isr", "pdpl"],
    link: { label: "NESA / UAE IAS", href: "/audit/nesa-uae-ias" },
  },
  {
    slug: "adhics",
    term: "ADHICS",
    abbr: "Abu Dhabi Healthcare Information & Cyber Security Standard",
    category: "International & GCC Compliance",
    definition:
      "ADHICS sets mandatory security controls for healthcare entities in the Emirate of Abu Dhabi, protecting patient data and clinical systems. Hospitals, clinics, and health-tech operating there must comply.",
    related: ["nesa", "desc-isr", "hipaa"],
    link: { label: "ADHICS compliance", href: "/audit/adhics" },
  },
  {
    slug: "desc-isr",
    term: "DESC ISR",
    abbr: "Dubai Electronic Security Center — Information Security Regulation",
    category: "International & GCC Compliance",
    definition:
      "The DESC Information Security Regulation mandates security controls for Dubai government entities and their partners. Organizations working with the Dubai government must meet its requirements.",
    related: ["nesa", "adhics", "pdpl"],
    link: { label: "DESC ISR compliance", href: "/audit/desc-isr" },
  },
  {
    slug: "pdpl",
    term: "UAE PDPL",
    abbr: "Personal Data Protection Law",
    category: "International & GCC Compliance",
    definition:
      "The UAE PDPL (Federal Decree-Law 45/2021) governs personal-data processing across the Emirates, with consent, transfer, and breach requirements — the UAE's federal equivalent of GDPR and India's DPDP.",
    related: ["gdpr", "dpdp", "nesa"],
    link: { label: "UAE PDPL compliance", href: "/audit/uae-pdpl" },
  },
  {
    slug: "sama-csf",
    term: "SAMA CSF",
    abbr: "Saudi Central Bank Cyber Security Framework",
    category: "International & GCC Compliance",
    definition:
      "The SAMA Cyber Security Framework mandates graded controls and maturity for banks, insurers, and financial firms regulated by the Saudi Central Bank. It is a core compliance requirement for Saudi financial institutions.",
    related: ["nca-ecc", "rbi-csf"],
    link: { label: "SAMA CSF compliance", href: "/audit/sama-csf" },
  },
  {
    slug: "nca-ecc",
    term: "NCA ECC",
    abbr: "Essential Cybersecurity Controls",
    category: "International & GCC Compliance",
    definition:
      "Saudi Arabia's National Cybersecurity Authority Essential Cybersecurity Controls (ECC) are mandatory for government and critical-sector organizations, spanning governance, defence, resilience, and third-party domains.",
    related: ["sama-csf", "nesa"],
    link: { label: "NCA ECC compliance", href: "/audit/nca-ecc-2" },
  },

  // ───────────── OT / ICS Security ─────────────
  {
    slug: "ot-security",
    term: "OT Security",
    abbr: "Operational Technology",
    category: "OT / ICS Security",
    definition:
      "OT security protects the operational technology — the hardware and software that monitors and controls physical processes in factories, energy, and utilities. Unlike IT, it prioritizes safety and availability over patching, so testing must avoid disrupting live processes.",
    related: ["ics-scada", "iec-62443", "purdue-model"],
    link: { label: "IoT / OT security", href: "/services/iot-ot-security" },
  },
  {
    slug: "ics-scada",
    term: "ICS / SCADA",
    abbr: "Industrial Control Systems / Supervisory Control & Data Acquisition",
    category: "OT / ICS Security",
    definition:
      "ICS are the control systems that run industrial processes; SCADA is a type of ICS for remote monitoring and control across distributed sites. Both were built for reliability, not security, making them high-value targets for attackers.",
    related: ["ot-security", "iec-62443", "purdue-model"],
    link: { label: "IoT / OT security", href: "/services/iot-ot-security" },
  },
  {
    slug: "iec-62443",
    term: "IEC 62443",
    category: "OT / ICS Security",
    definition:
      "IEC 62443 is the leading international standard for industrial automation and control-system security, defining security levels, zones, and conduits to segment and protect OT environments. It anchors most OT security programs.",
    related: ["ot-security", "ics-scada", "purdue-model"],
    link: { label: "IoT / OT security", href: "/services/iot-ot-security" },
  },
  {
    slug: "purdue-model",
    term: "Purdue Model",
    category: "OT / ICS Security",
    definition:
      "The Purdue model is a reference architecture that layers industrial networks into levels — from physical process up to enterprise IT — to guide segmentation between OT and IT. Enforcing its boundaries limits how far an attack can spread.",
    related: ["iec-62443", "ot-security", "network-security-architecture"],
  },

  // ───────────── Certifications ─────────────
  {
    slug: "oscp",
    term: "OSCP",
    abbr: "Offensive Security Certified Professional",
    category: "Certifications",
    definition:
      "The OSCP is the industry's benchmark hands-on penetration-testing certification from OffSec, earned by compromising machines in a 24-hour proctored lab exam. It proves practical exploitation skill rather than multiple-choice knowledge.",
    related: ["ceh", "penetration-testing"],
    link: { label: "OSCP exam-prep bootcamp", href: "/training/oscp" },
  },
  {
    slug: "ceh",
    term: "CEH",
    abbr: "Certified Ethical Hacker",
    category: "Certifications",
    definition:
      "The CEH (EC-Council) is a foundational certification teaching the five phases of ethical hacking across a broad range of attack techniques, now with an AI track. It is widely requested in Indian job postings as an entry credential.",
    related: ["oscp", "chfi"],
    link: { label: "CEH v13 ethical hacking course in Mumbai", href: "/training/ceh" },
  },
  {
    slug: "chfi",
    term: "CHFI",
    abbr: "Computer Hacking Forensic Investigator",
    category: "Certifications",
    definition:
      "The CHFI (EC-Council) certifies the ability to detect and investigate cyberattacks and gather court-admissible digital evidence, covering the forensic process end to end. It suits DFIR and investigation roles.",
    related: ["dfir", "chain-of-custody"],
    link: { label: "CHFI training", href: "/training/chfi" },
  },
  {
    slug: "cissp",
    term: "CISSP",
    abbr: "Certified Information Systems Security Professional",
    category: "Certifications",
    definition:
      "The CISSP (ISC²) is a senior, management-oriented certification covering eight security domains, widely regarded as a benchmark for experienced security professionals and CISOs. It requires several years of relevant experience.",
    related: ["cism", "cisa"],
  },
  {
    slug: "cisa",
    term: "CISA",
    abbr: "Certified Information Systems Auditor",
    category: "Certifications",
    definition:
      "The CISA (ISACA) certifies expertise in auditing, control, and assurance of information systems, held by many lead auditors on ISO 27001, RBI, and SEBI engagements. It is a standard credential for compliance-audit roles.",
    related: ["cism", "iso-27001"],
  },
  {
    slug: "cism",
    term: "CISM",
    abbr: "Certified Information Security Manager",
    category: "Certifications",
    definition:
      "The CISM (ISACA) certifies information-security management and governance skills, aimed at those who design and oversee an enterprise security program. It is common among CISOs and vCISOs.",
    related: ["cissp", "cisa"],
    link: { label: "vCISO advisory", href: "/services/vciso" },
  },
];

/** All terms in a category, in definition order. */
export function glossaryByCategory(category: string): GlossaryTerm[] {
  return GLOSSARY.filter((t) => t.category === category);
}

/** Resolve a related-term slug to its display term (for cross-links). */
export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY.find((t) => t.slug === slug);
}

/**
 * Reciprocal linking: the glossary terms most relevant to a money page.
 * Inverts each term's `link` (term → page) to build page → terms, then
 * expands via each primary term's `related` graph so a page gets a small,
 * topically-tight set (not just the one term that names it). Returns [] when
 * nothing maps, so the <GlossaryLinks> block simply doesn't render.
 *
 * Powers the hub-and-spoke: /glossary links down to money pages; money pages
 * link back to /glossary#<term> anchors.
 */
export function glossaryTermsFor(
  href: string,
  max = 6
): { slug: string; term: string }[] {
  const seen = new Set<string>();
  const out: GlossaryTerm[] = [];
  const add = (t?: GlossaryTerm) => {
    if (t && !seen.has(t.slug)) {
      seen.add(t.slug);
      out.push(t);
    }
  };
  const primary = GLOSSARY.filter((t) => t.link?.href === href);
  primary.forEach((t) => {
    add(t);
    (t.related ?? []).forEach((r) => add(getGlossaryTerm(r)));
  });
  return out.slice(0, max).map((t) => ({ slug: t.slug, term: t.term }));
}
