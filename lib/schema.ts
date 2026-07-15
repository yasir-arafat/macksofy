import { SITE, METROS } from "./site";
import type { Course } from "@/content/courses";
import type { Service } from "@/content/services";
import type { Audit } from "@/content/audits";
import type { CaseStudyHero } from "@/content/caseStudies";
import { AWARDS } from "@/content/awards";

const BASE = SITE.url;

/** Full areaServed array — used across Organization / LocalBusiness / Service / Audit / Course schemas. */
const AREA_SERVED = [
  ...METROS.map((m) => ({ "@type": "City", name: m.name })),
  { "@type": "AdministrativeArea", name: "Maharashtra" },
  { "@type": "AdministrativeArea", name: "Karnataka" },
  { "@type": "AdministrativeArea", name: "Telangana" },
  { "@type": "AdministrativeArea", name: "Tamil Nadu" },
  { "@type": "AdministrativeArea", name: "Delhi NCR" },
  { "@type": "Country", name: "India" },
  { "@type": "Country", name: "United Arab Emirates" },
];

function abs(path: string): string {
  if (path.startsWith("http")) return path;
  return `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationSchema() {
  // Awards block — pulled live from content/awards.ts so additions
  // there flow into the Organization graph node automatically. Each
  // entry is a CreativeWork representing the award itself.
  const awardEntries = AWARDS.map((a) => ({
    "@type": "CreativeWork",
    name: a.title,
    ...(typeof a.year === "number" && { dateCreated: `${a.year}` }),
  }));

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE}#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    alternateName: SITE.shortName,
    url: BASE,
    logo: {
      "@type": "ImageObject",
      url: `${BASE}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${BASE}/logo.png`,
    description: SITE.description,
    slogan: SITE.tagline,
    foundingDate: SITE.founded,
    foundingLocation: {
      "@type": "Place",
      name: `${SITE.hq.city}, ${SITE.hq.region}, ${SITE.hq.country}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.hq.city,
        addressRegion: SITE.hq.region,
        addressCountry: SITE.hq.country,
      },
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 50,
      maxValue: 200,
    },
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.hq.street,
      addressLocality: SITE.hq.city,
      addressRegion: SITE.hq.region,
      postalCode: SITE.hq.postalCode,
      addressCountry: SITE.hq.country,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: SITE.phone,
        email: SITE.email,
        areaServed: ["IN", "AE"],
        availableLanguage: ["en", "hi"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: SITE.email,
        areaServed: ["IN", "AE"],
        availableLanguage: ["en"],
      },
    ],
    sameAs: Object.values(SITE.social),
    areaServed: AREA_SERVED,
    award: awardEntries.map((a) => a.name),
    hasCredential: SITE.trustSignals.map((t) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Certification / Empanelment",
      name: t,
    })),
    knowsAbout: [
      "Penetration Testing",
      "VAPT",
      "Red Teaming",
      "CERT-In Audit",
      "ISO 27001 Implementation",
      "RBI Cyber Security Framework Audit",
      "SEBI CSCRF Audit",
      "IRDAI Cyber Security",
      "DPDPA Compliance",
      "NESA UAE",
      "ADHICS",
      "DESC ISR",
      "Digital Forensics",
      "Incident Response",
      "Threat Intelligence",
      "Managed SOC",
      "Wazuh SIEM",
      "Microsoft Sentinel",
      "OSCP Training",
      "CEH Training",
      "Cloud Security",
      "Mobile Application Security",
    ],
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService", "EducationalOrganization"],
    "@id": `${BASE}#localbusiness`,
    name: SITE.name,
    image: `${BASE}/logo.png`,
    url: BASE,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "₹₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.hq.street,
      addressLocality: SITE.hq.city,
      addressRegion: SITE.hq.region,
      postalCode: SITE.hq.postalCode,
      addressCountry: SITE.hq.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:30",
        closes: "18:30",
      },
    ],
    sameAs: Object.values(SITE.social),
    areaServed: AREA_SERVED,
    // aggregateRating intentionally omitted — Google's rich-result spam
    // policy requires AggregateRating to be backed by on-page Review nodes
    // sourced from real users. Re-add only when wired to a verified review
    // provider (Google Reviews / Trustpilot / G2) feed with count > 0.
  };
}

/**
 * Per-city LocalBusiness schema for /locations/[city] pages. Inherits
 * Macksofy's brand identity but pins addressLocality + geo to the city
 * so each metro page is its own LocalBusiness entity in Google's eyes.
 */
export function cityLocalBusinessSchema(city: {
  slug: string;
  name: string;
  state: string;
  geo: { lat: number; lng: number };
  mapQuery?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${BASE}/locations/${city.slug}#localbusiness`,
    name: `${SITE.name} — ${city.name}`,
    image: `${BASE}/logo.png`,
    url: `${BASE}/locations/${city.slug}`,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "₹₹₹",
    parentOrganization: { "@id": `${BASE}#organization` },
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.state,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: city.geo.lat,
      longitude: city.geo.lng,
    },
    areaServed: {
      "@type": "City",
      name: city.name,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:30",
        closes: "18:30",
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}#website`,
    url: BASE,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": `${BASE}#organization` },
    inLanguage: ["en-IN", "en-AE"],
    // SearchAction — makes the site eligible for Google's sitelinks
    // search box. The search URL points to /blog?q={query} which is
    // the site's blog search; if a dedicated /search route ships
    // later, update target accordingly. urlTemplate must use the
    // EntryPoint shape and the SearchTerms placeholder exactly.
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function courseSchema(course: Course) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${BASE}/training/${course.slug}#course`,
    name: course.title,
    description: course.hero.description,
    url: `${BASE}/training/${course.slug}`,
    image: course.image.startsWith("http") ? course.image : `${BASE}${course.image}`,
    // Reference the canonical Organization node (defined site-wide in the
    // root layout) by @id. Its real name/url/logo/sameAs live there; do
    // NOT re-declare a bare `sameAs: <own homepage>` here — sameAs is for
    // external authoritative profiles, and self-referencing it is invalid.
    provider: {
      "@type": "Organization",
      "@id": `${BASE}#organization`,
      name: SITE.name,
      url: BASE,
      logo: `${BASE}/logo.png`,
    },
    educationalCredentialAwarded: course.code,
    courseCode: course.code,
    educationalLevel: course.level,
    inLanguage: "en-IN",
    teaches: course.outcomes,
    coursePrerequisites: course.prerequisites.join(". "),
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: course.whoIsItFor.join("; "),
    },
    occupationalCredentialAwarded: course.code,
    timeRequired: course.duration,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Blended",
      courseWorkload: course.duration,
      instructor: {
        "@type": "Person",
        name: "Macksofy Mentor Team",
        affiliation: { "@type": "Organization", name: SITE.name },
      },
      location: {
        "@type": "Place",
        name: "Macksofy BKC, Mumbai",
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.hq.street,
          addressLocality: SITE.hq.city,
          addressRegion: SITE.hq.region,
          postalCode: SITE.hq.postalCode,
          addressCountry: SITE.hq.country,
        },
      },
    },
    ...(course.priceINR && {
      offers: {
        "@type": "Offer",
        price: course.priceINR,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: `${BASE}/training/${course.slug}`,
        category: "Paid",
        validFrom: SITE.founded,
        ...(course.originalPriceINR && {
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: course.priceINR,
            priceCurrency: "INR",
            valueAddedTaxIncluded: true,
            referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitText: "course" },
          },
        }),
      },
    }),
  };
}

/**
 * Product schema for a training course. Course schema (above) covers
 * the educational-entity surface; Product schema covers the commerce
 * surface — Google can show course pricing in shopping/SERPs from
 * either, and emitting both is valid (different @id, same canonical
 * provider). Mirrors the offer block from courseSchema so price stays
 * one source of truth.
 */
export function courseProductSchema(course: Course) {
  const url = `${BASE}/training/${course.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: course.title,
    description: course.hero.description,
    url,
    image: course.image.startsWith("http") ? course.image : `${BASE}${course.image}`,
    sku: course.code,
    mpn: course.code,
    category: "Cybersecurity Training",
    brand: {
      "@type": "Brand",
      name: SITE.name,
    },
    isRelatedTo: { "@id": `${url}#course` },
    ...(course.priceINR && {
      offers: {
        "@type": "Offer",
        price: course.priceINR,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        url,
        seller: { "@id": `${BASE}#organization` },
        validFrom: SITE.founded,
      },
    }),
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE}/services/${service.slug}#service`,
    name: service.title,
    description: service.hero.description,
    provider: { "@id": `${BASE}#organization` },
    serviceType: service.category,
    areaServed: AREA_SERVED,
    url: `${BASE}/services/${service.slug}`,
  };
}

export function auditSchema(audit: Audit) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE}/audit/${audit.slug}#service`,
    name: audit.title,
    description: audit.hero.description,
    provider: { "@id": `${BASE}#organization` },
    serviceType: "Information Security Audit",
    areaServed: AREA_SERVED,
    url: `${BASE}/audit/${audit.slug}`,
  };
}

/**
 * Emit HowTo schema for a service / audit methodology. Each phase
 * becomes a `HowToStep` whose `itemListElement` carries the activity
 * sub-steps. Eligible for Google's HowTo rich result (where still
 * supported) and consumed by AI search engines as a structured
 * walkthrough.
 *
 * Pass `subjectLabel` so the HowTo `name` reads naturally — e.g.
 * "How Macksofy delivers a Penetration Testing engagement" rather
 * than a bare service title.
 */
export function methodologyHowToSchema(args: {
  subjectLabel: string;
  url: string;
  phases: { phase: string; activities: string[] }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How Macksofy delivers a ${args.subjectLabel} engagement`,
    description: `Phased delivery methodology Macksofy follows for ${args.subjectLabel} engagements — every step documented for CERT-In, ISO 27001 and SOC 2 evidence packs.`,
    url: args.url,
    inLanguage: "en-IN",
    step: args.phases.map((p, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: p.phase,
      itemListElement: p.activities.map((a, j) => ({
        "@type": "HowToDirection",
        position: j + 1,
        text: a,
      })),
    })),
  };
}

export function caseStudySchema(cs: CaseStudyHero) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${BASE}/case-studies/${cs.slug}#article`,
    headline: cs.headline,
    description: cs.summary,
    url: `${BASE}/case-studies/${cs.slug}`,
    image: `${BASE}${SITE.ogImage}`,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${BASE}#website` },
    publisher: { "@id": `${BASE}#organization` },
    author: { "@id": `${BASE}#organization` },
    datePublished: `${cs.year}-01-01`,
    dateModified: `${cs.year}-12-31`,
    keywords: cs.keywords.join(", "),
    about: cs.tags.map((t) => ({ "@type": "Thing", name: t })),
    mentions: [
      { "@type": "Service", name: cs.engagement, url: `${BASE}/services/${cs.serviceSlug}` },
      { "@type": "Organization", name: cs.clientType },
    ],
    articleSection: "Case Study",
  };
}

export function caseStudyCollectionSchema(items: CaseStudyHero[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${BASE}/case-studies#list`,
    name: "Macksofy Cybersecurity Case Studies",
    description:
      "Anonymised, long-form case studies from Macksofy's pentest, red team, DFIR and cloud-security engagements across India and the UAE.",
    itemListElement: items.map((cs, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE}/case-studies/${cs.slug}`,
      name: cs.headline,
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.url),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
    // Speakable points at the FAQ accordion's real DOM nodes. The accordion
    // (components/sections/FAQAccordion.tsx) renders every question with
    // data-speakable="faq-question" (always in the DOM) and the open answer
    // with data-speakable="faq-answer". The previous itemprop selectors
    // matched nothing — the accordion emits no microdata — so the speakable
    // promise was dead. Mirrors the blog's data-speakable="lead" convention.
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["[data-speakable='faq-question']", "[data-speakable='faq-answer']"],
    },
  };
}

/**
 * Helper: emit a comma-separated list of metros that we explicitly serve.
 * Used for service / audit copy and SEO body text.
 */
export const SERVED_METROS_LIST = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Gurugram",
  "Noida",
  "Chandigarh",
  "Jaipur",
  "Kochi",
];
