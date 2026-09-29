export interface TopicHub {
  slug: string;
  name: string;
  title: string;
  seoTitle: string;
  description: string;
  answerQuestion: string;
  answer: string;
  intro: string[];
  outcomes: string[];
  keywords: string[];
  primaryService: {
    href: string;
    label: string;
    description: string;
  };
  postSlugs: string[];
  updated: string;
}

export const TOPIC_HUBS: TopicHub[] = [
  {
    slug: "penetration-testing-vapt",
    name: "VAPT & Penetration Testing",
    title: "VAPT and Penetration Testing Guides",
    seoTitle: "VAPT & Penetration Testing Guides India",
    description:
      "Buyer guides, methods and practical references for VAPT and penetration testing in India, from provider selection and scoping to exploitation evidence and retesting.",
    answerQuestion: "What is the difference between VAPT and penetration testing?",
    answer:
      "VAPT combines broad vulnerability discovery with manual validation and is commonly used for recurring assurance. Penetration testing goes deeper into exploitation and attack chains to prove business impact. This hub helps Indian buyers choose the right engagement, scope it consistently, evaluate providers and use the findings to close risk.",
    intro: [
      "Use this hub when you are deciding what to test, writing a request for proposal, comparing providers or preparing engineering teams for an assessment. It separates coverage-driven VAPT from goal-oriented penetration testing so the scope and price comparisons stay meaningful.",
      "The articles move from buying decisions into execution detail: methodology, Active Directory attack paths, common tooling, report evidence and the boundary between penetration testing and red teaming. Every guide points back to a definitive service page rather than creating another commercial URL for the same intent.",
    ],
    outcomes: [
      "Choose between VAPT, a focused penetration test and a red-team exercise",
      "Write a comparable scope across applications, APIs, networks, cloud and identity",
      "Evaluate manual testing depth, evidence quality and retest terms",
      "Translate findings into developer-ready remediation and closure evidence",
    ],
    keywords: [
      "VAPT guides India",
      "penetration testing guides India",
      "VAPT provider selection",
      "penetration testing methodology",
      "VAPT scope checklist",
    ],
    primaryService: {
      href: "/services/vapt",
      label: "Review VAPT services",
      description:
        "See the assessment scope, manual validation method, deliverables and retest model for a commercial VAPT engagement.",
    },
    postSlugs: [
      "top-vapt-companies-india-2026",
      "penetration-testing-vapt-guide-india-2026",
      "active-directory-pentest-guide-india-2026",
      "red-team-vs-penetration-testing-2026",
      "vapt-vs-red-team-2026",
      "top-10-penetration-testing-tools-2026",
      "windows-ad-attack-cheatsheet-2026",
      "nmap-cheatsheet-2026",
      "burp-suite-for-beginners-2026",
    ],
    updated: "2026-09-29",
  },
  {
    slug: "managed-soc",
    name: "Managed SOC",
    title: "Managed SOC, Detection and Incident Response Guides",
    seoTitle: "Managed SOC & Detection Engineering Guides",
    description:
      "Guides for selecting and operating a managed SOC in India, covering SIEM onboarding, detection engineering, incident response, ransomware readiness and measurable SLAs.",
    answerQuestion: "What should a managed SOC deliver?",
    answer:
      "A managed SOC should keep required telemetry healthy, detect relevant attacker behaviour, investigate alerts with evidence, escalate clear decisions and perform agreed response actions around the clock. This hub helps buyers compare providers, define measurable SLAs, prepare incident workflows and connect SOC operations to identity, cloud and ransomware risk.",
    intro: [
      "A dashboard, a SIEM licence and a 24×7 label do not prove that a security operations service will improve an incident outcome. Buyers need to examine telemetry health, detection logic, analyst investigation, response authority, continuity, data handling and the evidence behind reported service levels.",
      "These guides connect procurement to operations. Start with the provider scorecard, then work through ransomware readiness, Active Directory response, DFIR selection, cloud visibility and identity controls that determine whether a SOC can see and contain an attack.",
    ],
    outcomes: [
      "Choose between a SOC build, co-managed SOC, managed SOC and MDR",
      "Define detection, investigation and response SLAs without ambiguous clocks",
      "Evaluate telemetry coverage, analyst evidence and operational resilience",
      "Prepare response playbooks for ransomware, identity and cloud incidents",
    ],
    keywords: [
      "managed SOC guides India",
      "SOC as a service India",
      "SIEM detection engineering",
      "SOC provider selection",
      "managed detection response India",
    ],
    primaryService: {
      href: "/services/managed-soc",
      label: "Review managed SOC services",
      description:
        "See the SIEM onboarding, detection engineering, investigation, response and reporting model for managed SOC delivery.",
    },
    postSlugs: [
      "top-managed-soc-providers-india-2026",
      "ransomware-readiness-bfsi-india-2026",
      "ad-compromise-ir-playbook-indian-bfsi-2026",
      "dfir-services-how-to-choose-india-2026",
      "zero-trust-indian-banks-rbi-itgf-2026",
      "cloud-misconfigurations-rbi-sebi-audit-2026",
      "multi-cloud-security-bfsi-india-2026",
      "telecom-cyber-security-rules-2024-india-compliance",
    ],
    updated: "2026-09-29",
  },
  {
    slug: "red-teaming",
    name: "Red Teaming",
    title: "Red Teaming and Adversary Simulation Guides",
    seoTitle: "Red Teaming & Adversary Simulation Guides",
    description:
      "Guides for buying and running red-team engagements in India, from objective and rules-of-engagement design to Active Directory tradecraft and purple-team transfer.",
    answerQuestion: "What is red teaming?",
    answer:
      "Red teaming is a goal-based adversary simulation that tests whether people, process and technology can prevent, detect and respond to a realistic attack. This hub helps Indian security leaders decide when a red team is appropriate, compare providers, define safe objectives and turn the campaign into measurable detection improvements.",
    intro: [
      "A red team is not simply a longer penetration test. It pursues a defined business objective across multiple controls while measuring what defenders prevent, observe, investigate and miss. That requires stronger governance, an authorized white cell and a deliberate plan for safety and deconfliction.",
      "The cluster starts with procurement and engagement selection, then moves into Active Directory attack paths, adversary techniques and the practitioner knowledge useful when assessing an operator's proposed approach. Certification comparisons are included as background, not as substitutes for delivery evidence.",
    ],
    outcomes: [
      "Decide whether to buy a red team, penetration test or purple-team exercise",
      "Write measurable objectives, rules of engagement and stop conditions",
      "Evaluate assigned operators, threat realism and detection reconciliation",
      "Convert campaign evidence into a prioritized detection and response backlog",
    ],
    keywords: [
      "red teaming guides India",
      "adversary simulation India",
      "red team provider selection",
      "red team rules of engagement",
      "MITRE ATT&CK red team",
    ],
    primaryService: {
      href: "/services/red-teaming",
      label: "Review red team services",
      description:
        "See how a goal-based adversary simulation is scoped, governed, executed and converted into a purple-team improvement plan.",
    },
    postSlugs: [
      "top-red-teaming-companies-india-2026",
      "red-team-vs-penetration-testing-2026",
      "vapt-vs-red-team-2026",
      "active-directory-pentest-guide-india-2026",
      "windows-ad-attack-cheatsheet-2026",
      "red-team-certifications-india-2026",
      "crtp-vs-crto-comparison-india-2026",
      "crto-vs-oscp-honest-comparison-2026",
      "osep-vs-oscp",
    ],
    updated: "2026-09-29",
  },
  {
    slug: "ai-security",
    name: "AI Security",
    title: "AI, LLM and Agentic Security Guides",
    seoTitle: "AI, LLM & Agentic Security Guides",
    description:
      "Practical AI security guides for LLM, RAG, MCP and agentic systems, covering provider selection, prompt injection, tool abuse, identity, memory and regression testing.",
    answerQuestion: "What does AI application security include?",
    answer:
      "AI application security protects the complete system around a model: instructions, retrieval, data, tools, APIs, identity, authorization, memory, approvals and operations. This hub helps teams model that attack surface, test prompt and tool abuse, evaluate assessment providers and turn findings into repeatable security regression tests.",
    intro: [
      "AI risk is rarely contained inside the chat window. A hostile document can influence retrieval, a model can call a permitted tool with unsafe arguments, or a shared service identity can cross a tenant boundary. The security boundary extends to the furthest system the AI can influence.",
      "Use this cluster to inventory the action chain, understand MCP and agent-specific failure modes, and compare assessment providers on end-to-end impact rather than jailbreak counts. The guides use current OWASP, MITRE and NIST concepts while keeping the testing plan specific to the application being shipped.",
    ],
    outcomes: [
      "Inventory model, RAG, tool, identity, memory and operational trust boundaries",
      "Test direct and indirect injection through to unauthorized data or action",
      "Evaluate AI security providers on impact evidence and remediation depth",
      "Build versioned regression tests for high-risk abuse cases",
    ],
    keywords: [
      "AI security guides India",
      "LLM penetration testing",
      "agentic AI security",
      "RAG security testing",
      "MCP security guide",
    ],
    primaryService: {
      href: "/services/ai-pentesting",
      label: "Review AI security testing",
      description:
        "See how prompts, RAG, tools, APIs, identity, memory, approvals and downstream actions are assessed together.",
    },
    postSlugs: [
      "top-ai-security-assessment-companies-india-2026",
      "agentic-ai-security-testing-checklist-2026",
      "mcp-server-security-how-hacked-2026",
      "ceh-v13-ai-training-india-2026",
    ],
    updated: "2026-09-29",
  },
  {
    slug: "cert-in-compliance",
    name: "CERT-In & Compliance",
    title: "CERT-In Audit and India Cyber Compliance Guides",
    seoTitle: "CERT-In Audit & Cyber Compliance Guides",
    description:
      "Guides for CERT-In empanelled audits and India cyber compliance, covering auditor selection, VAPT evidence, audit policy, RBI, SEBI and sector-specific readiness.",
    answerQuestion: "What is a CERT-In empanelled audit?",
    answer:
      "A CERT-In empanelled audit is a security assessment delivered under the governance of an auditing organisation currently listed by CERT-In. The exact technical scope and report depend on the relying regulator or customer. This hub helps buyers verify eligibility, define evidence, compare providers and prepare for India-specific compliance reviews.",
    intro: [
      "Start with the party that will rely on the report. A regulator, bank, tender, certification body and enterprise customer may each expect a different scope, cadence and closure artifact even when all use the phrase CERT-In audit. The provider must translate that requirement into testable assets, controls and evidence.",
      "This cluster covers the official empanelment process, audit-provider selection, security-audit policy, VAPT versus management-system assurance, and practical readiness for RBI, SEBI and telecom obligations. Official sources are linked from each article so current status and requirements can be verified directly.",
    ],
    outcomes: [
      "Verify current provider status against the official CERT-In panel",
      "Translate regulator language into technical scope and evidence",
      "Compare audit providers on delivery depth, independence and closure terms",
      "Prepare VAPT, governance, SOC and incident evidence before fieldwork",
    ],
    keywords: [
      "CERT-In audit guides",
      "CERT-In empanelled auditor India",
      "cybersecurity compliance India",
      "CERT-In VAPT",
      "RBI SEBI cyber compliance",
    ],
    primaryService: {
      href: "/audit/cert-in-empanelled-audit",
      label: "Review CERT-In audit scope",
      description:
        "See how the relying requirement, asset scope, technical testing, evidence, sign-off and closure process fit together.",
    },
    postSlugs: [
      "top-cert-in-empanelled-audit-providers-india-2026",
      "cert-in-empanelment-process-2026",
      "cert-in-empanelled-audit-guide-2026",
      "cert-in-cyber-security-audit-policy-guidelines-2025",
      "cert-in-empanelled-vs-iso-27001-2026",
      "cyber-security-companies-in-mumbai-india-2026",
      "rbi-csf-vs-sebi-cscrf-2026",
      "rbi-it-governance-readiness-checklist-2026",
      "sebi-cscrf-compliance-readiness-2026",
      "telecom-cyber-security-rules-2024-india-compliance",
    ],
    updated: "2026-09-29",
  },
];

export const getTopicHubBySlug = (slug: string) =>
  TOPIC_HUBS.find((hub) => hub.slug === slug);

export const topicHubForPost = (postSlug: string) =>
  TOPIC_HUBS.find((hub) => hub.postSlugs.includes(postSlug));
