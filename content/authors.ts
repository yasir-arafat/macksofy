/**
 * Author registry — maps the `author` string used inside `content/blog.ts`
 * (and case studies) to a richer entity that the JSON-LD layer can render
 * as either a real `Person` or a sub-`Organization`.
 *
 * Why this exists: Google's helpful-content classifier and AI-search
 * engines (Perplexity, ChatGPT) rank named-human bylines materially
 * higher than `author: Organization` blobs. Today most Macksofy posts
 * are team-attributed ("Macksofy SOC Lead", "Macksofy Red Team", etc.),
 * so we emit those as sub-Organizations of the main brand with
 * credential-bearing `knowsAbout` arrays — honest schema that already
 * outperforms the previous flat Organization byline.
 *
 * When real bylined experts come in:
 *   1. Add a `type: "person"` entry with full name + sameAs LinkedIn URL.
 *   2. Change the post's `author:` field in `content/blog.ts` to the new key.
 * No other code change needed.
 *
 * NOTE (2026-05-26): Person entries deliberately empty. Adding Person
 * bylines without real expert names + verifiable LinkedIn URLs would
 * fabricate identity for SEO — counterproductive (Google checks `sameAs`
 * URLs) and unethical. Send real expert names / credentials / LinkedIn
 * URLs through the user and we'll wire them up here.
 */

import { SITE } from "@/lib/site";

export type AuthorType = "person" | "team";

export interface AuthorBase {
  /** Stable key — what `BlogPost.author` references. */
  key: string;
  /** Display name shown in bylines + emitted as schema `name`. */
  name: string;
  /** Short role line shown next to the byline. */
  role: string;
  /**
   * Topical-expertise tags. Becomes schema `knowsAbout` — feeds Google's
   * topical-authority graph and AI search entity expansion.
   */
  knowsAbout: string[];
  /** Optional URL on macksofy.com for a future /team/[slug] profile. */
  profileUrl?: string;
}

export interface PersonAuthor extends AuthorBase {
  type: "person";
  /** URL slug for the /team/<slug> profile page + schema @id. e.g. "priya-sharma". */
  slug: string;
  /** Job title (specific). Becomes schema `jobTitle` + shown in byline. */
  jobTitle?: string;
  /** Credentials (OSCP, CEH, CISSP…). Emitted as schema `hasCredential` + honorificSuffix. */
  credentials?: string[];
  /** Public profiles — LinkedIn, GitHub, X. Becomes schema `sameAs` (Google/LLMs verify these). */
  sameAs?: string[];
  /** One-paragraph bio (~50–80 words). Schema `description` + shown on the profile page. */
  bio?: string;
  /** Headshot in /public (e.g. "/team/priya-sharma.jpg"). Becomes schema `image`. */
  image?: string;
  /** Where they studied / trained (optional). Becomes schema `alumniOf`. */
  alumniOf?: string;
  /** Years of hands-on experience (optional). Surfaced on the profile for E-E-A-T. */
  yearsExperience?: number;
}

export interface TeamAuthor extends AuthorBase {
  type: "team";
  /** Editorial / operational unit description, surfaced in schema `description`. */
  description: string;
}

export type Author = PersonAuthor | TeamAuthor;

/**
 * Registry. Add Person entries here as real bylined experts come on board.
 * Keep `key` matching the string already used inside `content/blog.ts` so
 * existing posts wire up without per-post edits.
 */
export const AUTHORS: Record<string, Author> = {
  "Macksofy SOC Lead": {
    type: "team",
    key: "Macksofy SOC Lead",
    name: "Macksofy SOC Lead",
    role: "Blue-team operations · OSCP / GCDA / GCFA-certified consultants",
    description:
      "The SOC engineering & detection-content team behind Macksofy's managed-SOC and Wazuh + ELK + Sentinel deployments. Operates 24×7 across BFSI, fintech and SaaS clients in India and the UAE. Consultants hold GCDA, GCFA, OSCP, GMON and CySA+ certifications.",
    knowsAbout: [
      "SOC Operations",
      "SIEM Engineering",
      "Wazuh",
      "Microsoft Sentinel",
      "Splunk",
      "Threat Hunting",
      "Detection Engineering",
      "Incident Response",
    ],
  },
  "Macksofy Red Team": {
    type: "team",
    key: "Macksofy Red Team",
    name: "Macksofy Red Team",
    role: "Offensive operations",
    description:
      "Macksofy's full-spectrum red team — OSCP / OSEP / OSWE certified consultants delivering adversary-emulation, social engineering, physical and assumed-breach engagements for Indian BFSI and UAE banks.",
    knowsAbout: [
      "Red Teaming",
      "Adversary Emulation",
      "Active Directory Attacks",
      "Social Engineering",
      "C2 Frameworks",
      "Phishing Simulation",
      "Assumed Breach",
      "MITRE ATT&CK",
    ],
  },
  "Macksofy Pentest Team": {
    type: "team",
    key: "Macksofy Pentest Team",
    name: "Macksofy Pentest Team",
    role: "Offensive operations",
    description:
      "Macksofy's web, API and mobile pentest practice — OSWE / OSEP certified consultants delivering CERT-In format engagements across BFSI, healthcare, SaaS and fintech.",
    knowsAbout: [
      "Penetration Testing",
      "Web Application Security",
      "API Security",
      "Mobile Application Security",
      "OWASP Top 10",
      "Burp Suite",
      "Bug Bounty Methodology",
    ],
  },
  "Macksofy Editorial": {
    type: "team",
    key: "Macksofy Editorial",
    name: "Macksofy Editorial",
    role: "Cybersecurity research & editorial",
    description:
      "Macksofy's research-and-editorial unit — synthesises field intelligence from the SOC, red team, audit floor and DFIR engagements into the long-form posts published on this blog.",
    knowsAbout: [
      "Cybersecurity Research",
      "Threat Intelligence",
      "Regulatory Analysis",
      "Industry Reporting",
    ],
  },
  "Macksofy Placements": {
    type: "team",
    key: "Macksofy Placements",
    name: "Macksofy Placements",
    role: "Career services",
    description:
      "Macksofy's placement team — places certified analysts and pentesters into BFSI SOCs, MSSPs, product-company security teams and UAE banks across India and the GCC.",
    knowsAbout: [
      "Cybersecurity Hiring",
      "Career Coaching",
      "Salary Benchmarking",
      "Resume Review",
    ],
  },
  "Macksofy DFIR Team": {
    type: "team",
    key: "Macksofy DFIR Team",
    name: "Macksofy DFIR Team",
    role: "Digital forensics & incident response · GCFA / GREM / CHFI-certified",
    description:
      "Macksofy's Digital Forensics and Incident Response practice — first-responders on ransomware, BEC and AD-compromise engagements across Indian BFSI, manufacturing and SaaS. Consultants hold GCFA, GREM, CHFI and EnCEP certifications. CERT-In empanelled audit team operates the same DFIR workflow under inspection mandates.",
    knowsAbout: [
      "Digital Forensics",
      "Incident Response",
      "Memory Forensics",
      "Malware Analysis",
      "Active Directory Forensics",
      "Ransomware Recovery",
      "Business Email Compromise",
      "CERT-In Incident Reporting",
      "Volatility 3",
      "KAPE",
      "Velociraptor",
    ],
  },
  "Macksofy Audit Team": {
    type: "team",
    key: "Macksofy Audit Team",
    name: "Macksofy Audit Team",
    role: "Compliance & regulatory audit · ISO 27001 LA / ISO 22301 LA / CISA",
    description:
      "Macksofy's compliance audit practice — CERT-In empanelled auditors delivering ISO 27001, SOC 2, RBI CSF, SEBI CSCRF, NCIIPC CII, PCI-DSS, DPDP, NESA, ADHICS and PDPL engagements across India and the UAE. Lead auditors hold ISO 27001 LA / 22301 LA / 27701 LA, CISA, CISM, CRISC and CDPSE certifications.",
    knowsAbout: [
      "ISO 27001 Audit",
      "SOC 2 Audit",
      "RBI Cyber Security Framework",
      "SEBI CSCRF",
      "NCIIPC Critical Information Infrastructure",
      "PCI-DSS QSA Coordination",
      "DPDP Act Compliance",
      "CERT-In Audit Scope",
      "NESA Audit",
      "ADHICS Audit",
      "UAE PDPL",
      "Risk Assessment",
    ],
  },
  "Macksofy Advisory Team": {
    type: "team",
    key: "Macksofy Advisory Team",
    name: "Macksofy Advisory Team",
    role: "Security leadership & vCISO advisory · CISSP / CISM / CRISC",
    description:
      "Macksofy's advisory practice — vCISO, security-program design and board-level governance for Indian BFSI, fintech and SaaS enterprises. Advisors hold CISSP, CISM, CRISC and CGEIT and map programs to RBI IT-Governance, SEBI CSCRF and ISO 27001.",
    knowsAbout: [
      "Virtual CISO",
      "Security Governance",
      "Risk Management",
      "Security Strategy",
      "Board Reporting",
      "RBI IT Governance",
      "SEBI CSCRF",
      "Vendor Risk Management",
    ],
  },
  "AI Security": {
    type: "team",
    key: "AI Security",
    name: "Macksofy AI Security Team",
    role: "AI / LLM application security",
    description:
      "Macksofy's AI-security research unit — LLM application, RAG, agent and MCP-server security testing. Focuses on prompt injection, insecure output handling, model/agent abuse and the OWASP Top 10 for LLM Applications.",
    knowsAbout: [
      "AI Security",
      "LLM Security",
      "Prompt Injection",
      "MCP Server Security",
      "RAG Security",
      "OWASP LLM Top 10",
      "Model Abuse",
      "AI Red Teaming",
    ],
  },
  "AppSec": {
    type: "team",
    key: "AppSec",
    name: "Macksofy AppSec Team",
    role: "Application security · OSWE / eWPTX certified",
    description:
      "Macksofy's application-security practice — web, API and mobile penetration testing plus secure code review. OSWE / eWPTX certified consultants working to OWASP ASVS, API Top 10 and MASVS across BFSI, fintech and SaaS.",
    knowsAbout: [
      "Web Application Security",
      "API Security",
      "Mobile Application Security",
      "Secure Code Review",
      "OWASP ASVS",
      "OWASP API Top 10",
      "Burp Suite",
      "Business Logic Testing",
    ],
  },
  "Audit Practice": {
    type: "team",
    key: "Audit Practice",
    name: "Macksofy Audit Practice",
    role: "Compliance & regulatory audit · ISO 27001 LA / CISA",
    description:
      "Macksofy's CERT-In empanelled audit practice — ISO 27001, SOC 2, RBI CSF, SEBI CSCRF, PCI-DSS and DPDP engagements across India and the UAE. Lead auditors hold ISO 27001 LA, CISA, CISM and CRISC.",
    knowsAbout: [
      "CERT-In Audit",
      "ISO 27001 Audit",
      "SOC 2 Audit",
      "RBI Cyber Security Framework",
      "SEBI CSCRF",
      "PCI-DSS",
      "DPDP Act Compliance",
      "Gap Assessment",
    ],
  },
  "Cloud Security Team": {
    type: "team",
    key: "Cloud Security Team",
    name: "Macksofy Cloud Security Team",
    role: "Cloud & container security",
    description:
      "Macksofy's cloud-security practice — AWS, Azure and GCP security assessment, CSPM/CNAPP, IAM and Kubernetes hardening for BFSI and SaaS. Maps cloud posture to RBI, SEBI and DPDP data-residency requirements.",
    knowsAbout: [
      "Cloud Security",
      "AWS Security",
      "Azure Security",
      "GCP Security",
      "CSPM",
      "CNAPP",
      "Kubernetes Security",
      "Cloud IAM",
      "Multi-Cloud Security",
    ],
  },
  "Compliance": {
    type: "team",
    key: "Compliance",
    name: "Macksofy Compliance Team",
    role: "Regulatory compliance · India & GCC",
    description:
      "Macksofy's regulatory-compliance analysts — RBI CSF, SEBI CSCRF, IRDAI, DPDP Act, ISO 27001, SOC 2 and UAE/GCC frameworks (NESA, ADHICS, PDPL, SAMA CSF). Translates regulator text into implementable control programs.",
    knowsAbout: [
      "RBI Cyber Security Framework",
      "SEBI CSCRF",
      "IRDAI Cyber Security",
      "DPDP Act Compliance",
      "ISO 27001",
      "NESA UAE",
      "ADHICS",
      "SAMA CSF",
      "Regulatory Analysis",
    ],
  },
  "Network Team": {
    type: "team",
    key: "Network Team",
    name: "Macksofy Network Security Team",
    role: "Network & infrastructure security",
    description:
      "Macksofy's network and infrastructure security practice — internal/external network penetration testing, segmentation review, wireless assessment and secure network architecture (SASE / ZTNA / IEC 62443).",
    knowsAbout: [
      "Network Penetration Testing",
      "Infrastructure Security",
      "Network Segmentation",
      "Wireless Security",
      "Firewall Review",
      "Zero Trust Network Access",
      "Nmap",
      "Active Directory Security",
    ],
  },
  "OT Security Team": {
    type: "team",
    key: "OT Security Team",
    name: "Macksofy OT Security Team",
    role: "OT / ICS / SCADA security · IEC 62443",
    description:
      "Macksofy's operational-technology security practice — ICS/SCADA assessment, Purdue-model segmentation and IEC 62443 zoning for manufacturing, energy and critical infrastructure. Aligned to NCIIPC §70A and CEA power-sector cyber guidelines.",
    knowsAbout: [
      "OT Security",
      "ICS Security",
      "SCADA Security",
      "IEC 62443",
      "Purdue Model",
      "Critical Infrastructure Protection",
      "NCIIPC",
      "Network Segmentation",
    ],
  },
};

/**
 * Resolve a blog/case-study `author` field to a registry entry. Falls
 * back to a generic Editorial team entry — never throws, so a typo in
 * `content/blog.ts` won't 500 the build.
 */
export function getAuthor(authorString: string): Author {
  return AUTHORS[authorString] ?? AUTHORS["Macksofy Editorial"];
}

/**
 * Emit a schema-org-shaped author block for a given author key.
 *
 * - Person → `@type: Person` with sameAs[] and knowsAbout[]. Eligible
 *   for Google's Person entity graph and AI search citation.
 * - Team   → `@type: Organization` with `parentOrganization` linked to
 *   the main Macksofy brand id. Honest fallback that ranks better than
 *   a flat Organization byline because it carries `description` +
 *   `knowsAbout`.
 *
 * Used by blog and case-study pages.
 */
export function authorSchema(author: Author): Record<string, unknown> {
  if (author.type === "person") {
    const url = `${SITE.url}/team/${author.slug}`;
    return {
      "@type": "Person",
      "@id": `${url}#person`,
      name: author.name,
      url,
      ...(author.jobTitle && { jobTitle: author.jobTitle }),
      ...(author.bio && { description: author.bio }),
      ...(author.image && {
        image: author.image.startsWith("http")
          ? author.image
          : `${SITE.url}${author.image}`,
      }),
      // Credentials as first-class entities (Google Person entity + AI citation).
      ...(author.credentials &&
        author.credentials.length > 0 && {
          honorificSuffix: author.credentials.join(", "),
          hasCredential: author.credentials.map((c) => ({
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "certification",
            name: c,
          })),
        }),
      ...(author.alumniOf && { alumniOf: author.alumniOf }),
      worksFor: { "@id": `${SITE.url}#organization` },
      knowsAbout: author.knowsAbout,
      // sameAs is the verification anchor — Google and LLMs cross-check these
      // real public profiles before treating the Person as an authority.
      ...(author.sameAs && author.sameAs.length > 0 && { sameAs: author.sameAs }),
    };
  }
  return {
    "@type": "Organization",
    name: author.name,
    description: author.description,
    parentOrganization: { "@id": `${SITE.url}#organization` },
    knowsAbout: author.knowsAbout,
    ...(author.profileUrl && { url: `${SITE.url}${author.profileUrl}` }),
    // Honest verification anchor — the parent Macksofy LinkedIn page
    // exists and surfaces every sub-team's work. Better than emitting no
    // sameAs at all on Team authors.
    sameAs: [SITE.social.linkedin],
  };
}

/**
 * All named-human authors (type "person"). Empty until real experts are added.
 * Drives the /team profile routes, the sitemap, and the nav "Team" entry —
 * every one of which stays dormant while this returns [].
 */
export function getPersonAuthors(): PersonAuthor[] {
  return Object.values(AUTHORS).filter(
    (a): a is PersonAuthor => a.type === "person"
  );
}

/** Resolve a Person by profile slug (for /team/[slug]). */
export function getPersonBySlug(slug: string): PersonAuthor | undefined {
  return getPersonAuthors().find((p) => p.slug === slug);
}

/* ───────────────────────────────────────────────────────────────────────────
 * HOW TO ADD A REAL NAMED EXPERT (E-E-A-T / GEO — the top off-page-adjacent
 * lever from the master audit). Do NOT invent people: Google and LLMs verify
 * the `sameAs` LinkedIn/GitHub URLs, so a fabricated identity backfires.
 *
 * When Yasir supplies a real expert, copy this block into AUTHORS above,
 * keyed by the exact byline string used in content/blog.ts:
 *
 *   "Priya Sharma": {
 *     type: "person",
 *     key: "Priya Sharma",              // must equal the blog `author` string
 *     slug: "priya-sharma",             // -> /team/priya-sharma
 *     name: "Priya Sharma",
 *     jobTitle: "Principal Security Consultant",
 *     role: "Red team & Active Directory · OSCP, OSEP, CRTO",
 *     credentials: ["OSCP", "OSEP", "CRTO"],
 *     sameAs: ["https://www.linkedin.com/in/<real-handle>/"],  // REQUIRED, real
 *     image: "/team/priya-sharma.jpg",  // optional headshot in /public/team/
 *     bio: "50–80 words, first-person-credible, what they actually do + years.",
 *     yearsExperience: 9,
 *     alumniOf: "IIT Bombay",           // optional
 *     knowsAbout: ["Red Teaming", "Active Directory Attacks", "OSEP"],
 *   },
 *
 * Then set the matching post's `author:` in content/blog.ts to "Priya Sharma"
 * (and optionally `reviewer:` on other posts). Everything else is automatic:
 * the /team/priya-sharma profile page builds, enters the sitemap, appears in
 * the nav, and the BlogPosting `author` JSON-LD upgrades from Organization to
 * a verified Person. Intake form: /root/macksofy-new-seo/named-experts-intake.md
 * ─────────────────────────────────────────────────────────────────────────── */
