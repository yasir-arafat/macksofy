import { COURSES } from "@/content/courses";
import { SERVICES } from "@/content/services";
import { AUDITS } from "@/content/audits";
import { getPersonAuthors } from "@/content/authors";

/**
 * Server-computed navigation index (INP).
 *
 * The Header and Footer are Client Components, so anything they `import`
 * is bundled into the JavaScript that every single page ships, parses and
 * executes before it can respond to a tap. They used to import the three
 * full content modules directly:
 *
 *     content/services.ts   165 KB
 *     content/courses.ts    141 KB
 *     content/audits.ts     268 KB
 *                          ──────
 *                           575 KB of source
 *
 * ...to read roughly a dozen short fields per record (title, tagline,
 * category, icon name). Those modules carry the ENTIRE page body of every
 * service / course / framework — hero copy, curricula, FAQs, long-form
 * sections — none of which the nav uses. Because the arrays are consumed
 * wholesale (`SERVICES.map(...)`), the bundler cannot tree-shake the unused
 * fields, so all 575 KB shipped to the client on every route.
 *
 * This module runs on the SERVER (it is imported only by app/layout.tsx, a
 * Server Component) and projects that data down to the handful of fields the
 * nav actually renders. The result crosses the RSC boundary as plain data —
 * ~15 KB of JSON instead of ~575 KB of JavaScript that has to be parsed and
 * evaluated on the main thread.
 *
 * Icons cannot cross the RSC boundary (they are React components), so items
 * carry a stable `iconName` string that <NavIcon> resolves on the client from
 * a small explicit map. Keep NavIcon's map in sync with the `iconName` values
 * declared in content/services.ts and content/audits.ts.
 */

export type BadgeTone = "cyan" | "purple" | "amber" | "green";

export interface MegaItemData {
  slug: string;
  href: string;
  title: string;
  tagline: string;
  badge?: string;
  badgeTone?: BadgeTone;
  /** Resolved to a component by <NavIcon> on the client. */
  iconName: string;
  bullets?: string[];
  group?: string;
}

export interface SearchEntry {
  label: string;
  href: string;
  group: string;
  keywords?: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface NavIndex {
  mega: {
    services: MegaItemData[];
    training: MegaItemData[];
    audit: MegaItemData[];
  };
  counts: { services: number; courses: number; audits: number };
  search: SearchEntry[];
  footer: {
    services: FooterLink[];
    courses: FooterLink[];
    audits: FooterLink[];
  };
  /** "Our Experts" nav entry only appears once real named experts exist. */
  hasNamedExperts: boolean;
}

/* ── mega-menu ordering (was inline in Header.tsx) ──────────────────── */

const SERVICE_CATEGORY_RANK: Record<string, number> = {
  Offensive: 0,
  "Managed Services": 1,
  Defensive: 2,
  "Compliance Adjacent": 3,
};

const COURSE_VENDOR_RANK: Record<string, number> = {
  OffSec: 0,
  "EC-Council": 1,
  CompTIA: 2,
  Macksofy: 3,
};

const AUDIT_CATEGORY_RANK: Record<string, number> = {
  Foundational: 0,
  "Indian Regulatory": 1,
  "International Standard": 2,
  "Industry & Privacy": 3,
  "GCC Regulatory": 4,
};

const vendorTone = (vendor: string): BadgeTone =>
  vendor === "OffSec"
    ? "purple"
    : vendor === "EC-Council"
    ? "cyan"
    : vendor === "CompTIA"
    ? "amber"
    : "green";

/** The whole index, computed once per server render. */
export function buildNavIndex(): NavIndex {
  const services: MegaItemData[] = [...SERVICES]
    .sort(
      (a, b) =>
        (SERVICE_CATEGORY_RANK[a.category] ?? 9) -
        (SERVICE_CATEGORY_RANK[b.category] ?? 9)
    )
    .map((s) => ({
      slug: s.slug,
      href: `/services/${s.slug}`,
      title: s.shortTitle,
      tagline: s.hero.tagline,
      ...(s.popular ? { badge: "Popular", badgeTone: "cyan" as const } : {}),
      iconName: s.iconName,
      bullets: s.businessImpact?.slice(0, 3),
      group: s.category,
    }));

  const training: MegaItemData[] = [...COURSES]
    .sort((a, b) => {
      const ra = COURSE_VENDOR_RANK[a.vendor] ?? 99;
      const rb = COURSE_VENDOR_RANK[b.vendor] ?? 99;
      if (ra !== rb) return ra - rb;
      if (a.popular !== b.popular) return a.popular ? -1 : 1;
      return 0;
    })
    .map((c) => ({
      slug: c.slug,
      href: `/training/${c.slug}`,
      title: c.shortTitle,
      tagline: c.hero.tagline,
      badge: c.vendor,
      badgeTone: vendorTone(c.vendor),
      iconName: "GraduationCap",
      bullets: c.outcomes?.slice(0, 3),
      group: c.vendor,
    }));

  const audit: MegaItemData[] = [...AUDITS]
    .sort(
      (a, b) =>
        (AUDIT_CATEGORY_RANK[a.category] ?? 99) -
        (AUDIT_CATEGORY_RANK[b.category] ?? 99)
    )
    .map((a) => ({
      slug: a.slug,
      href: `/audit/${a.slug}`,
      title: a.shortTitle,
      tagline: a.hero.tagline,
      ...(a.authority ? { badge: "Authority", badgeTone: "amber" as const } : {}),
      iconName: a.iconName,
      bullets: a.applicability?.slice(0, 3),
      group: a.category,
    }));

  const search: SearchEntry[] = [
    { label: "Home", href: "/", group: "Pages" },
    { label: "About Us", href: "/about", group: "Pages" },
    {
      label: "Industries",
      href: "/industries",
      group: "Pages",
      keywords:
        "bfsi banking healthcare fintech saas manufacturing ot government psu energy insurance verticals",
    },
    { label: "Our Clients", href: "/clients", group: "Pages" },
    {
      label: "Case Studies",
      href: "/case-studies",
      group: "Pages",
      keywords: "engagements references pentest red team dfir",
    },
    {
      label: "Resources",
      href: "/resources",
      group: "Pages",
      keywords: "whitepaper checklist cheat sheet brochure cscrf rbi cert-in",
    },
    {
      label: "Awards & Recognition",
      href: "/awards",
      group: "Pages",
      keywords: "csi google ec-council",
    },
    { label: "Blog", href: "/blog", group: "Pages" },
    {
      label: "Glossary",
      href: "/glossary",
      group: "Pages",
      keywords:
        "definitions terms vapt cert-in soc siem cvss dpdp rbi csf meaning what is",
    },
    {
      label: "Pentaudit",
      href: "/products/pentaudit",
      group: "Products",
      keywords:
        "continuous pentest AI compliance ISO SOC2 PCI HIPAA GDPR DPDP CERT-In readiness platform vapt cloud web mobile",
    },
    {
      label: "LearnToExploit",
      href: "/products/learn-to-exploit",
      group: "Products",
      keywords: "cyber range vulnerable labs ctf pwn hands-on",
    },
    { label: "Contact", href: "/contact", group: "Pages" },
    { label: "All Services", href: "/services", group: "Services" },
    { label: "All Training", href: "/training", group: "Training" },
    { label: "All Audit & Compliance", href: "/audit", group: "Audit" },
    ...SERVICES.map((s) => ({
      label: s.shortTitle,
      href: `/services/${s.slug}`,
      group: "Services",
      keywords: s.title,
    })),
    ...COURSES.map((c) => ({
      label: c.shortTitle,
      href: `/training/${c.slug}`,
      group: "Training",
      keywords: `${c.title} ${c.code} ${c.vendor}`,
    })),
    ...AUDITS.map((a) => ({
      label: a.shortTitle,
      href: `/audit/${a.slug}`,
      group: "Audit",
      keywords: a.title,
    })),
  ];

  // Footer link columns — the same shortlists the Footer used to derive by
  // filtering the full content arrays client-side.
  const FOOTER_AUDIT_SLUGS = [
    "cert-in-empanelled-audit",
    "iso-27001",
    "soc-2",
    "rbi-csf",
    "sebi-cscrf",
    "pci-dss",
    "dpdp-act",
    "hipaa",
    "uae-pdpl",
  ];

  return {
    mega: { services, training, audit },
    counts: {
      services: SERVICES.length,
      courses: COURSES.length,
      audits: AUDITS.length,
    },
    search,
    footer: {
      services: SERVICES.filter((s) => s.popular)
        .slice(0, 6)
        .map((s) => ({ label: s.shortTitle, href: `/services/${s.slug}` })),
      courses: COURSES.filter((c) => c.popular)
        .slice(0, 6)
        .map((c) => ({ label: c.shortTitle, href: `/training/${c.slug}` })),
      audits: FOOTER_AUDIT_SLUGS.map((slug) =>
        AUDITS.find((a) => a.slug === slug)
      )
        .filter((a): a is (typeof AUDITS)[number] => Boolean(a))
        .map((a) => ({ label: a.shortTitle, href: `/audit/${a.slug}` })),
    },
    hasNamedExperts: getPersonAuthors().length > 0,
  };
}
