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
  /** Credentials (OSCP, CEH, CISSP…) — shown in byline + included in schema description. */
  credentials?: string[];
  /** Public profiles — LinkedIn, GitHub, X, Mastodon. Becomes schema `sameAs`. */
  sameAs?: string[];
  /** One-paragraph bio used in /team/[slug] and schema `description`. */
  bio?: string;
  /** Job title (specific). */
  jobTitle?: string;
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
    role: "Blue-team operations",
    description:
      "The SOC engineering & detection-content team behind Macksofy's managed-SOC and Wazuh + ELK + Sentinel deployments. Operates 24×7 across BFSI, fintech and SaaS clients in India and the UAE.",
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
    return {
      "@type": "Person",
      name: author.name,
      ...(author.jobTitle && { jobTitle: author.jobTitle }),
      ...(author.bio && { description: author.bio }),
      ...(author.profileUrl && { url: `${SITE.url}${author.profileUrl}` }),
      worksFor: { "@id": `${SITE.url}#organization` },
      knowsAbout: author.knowsAbout,
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
  };
}
