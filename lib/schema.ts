import { SITE, METROS } from "./site";
import { CITY_ISO_REGION } from "@/content/cities";
import { COURSE_DURATION_ISO } from "@/content/courses";
import type { Course } from "@/content/courses";
import type { Service } from "@/content/services";
import type { Audit } from "@/content/audits";
import type { CaseStudyHero } from "@/content/caseStudies";
import { AWARDS } from "@/content/awards";
import type { GlossaryTerm } from "@/content/glossary";

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
  // Derive country/region/hours from the city rather than hardcoding India.
  // UAE location pages (Dubai, Abu Dhabi, UAE) must emit addressCountry "AE"
  // and the Gulf Mon–Fri work week — hardcoding "IN"/Mon–Sat mislabeled them
  // to Google + AI engines as being in India.
  const iso = CITY_ISO_REGION[city.slug] ?? "";
  const uae = iso.startsWith("AE") || city.state.toLowerCase().includes("united arab");
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${BASE}/locations/${city.slug}#localbusiness`,
    name: `${SITE.name} — ${city.name}`,
    image: `${BASE}/logo.png`,
    url: `${BASE}/locations/${city.slug}`,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: uae ? "$$$" : "₹₹₹",
    parentOrganization: { "@id": `${BASE}#organization` },
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.state,
      addressCountry: uae ? "AE" : "IN",
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
        dayOfWeek: uae
          ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
          : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
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
    // ISO 8601 Duration for the taught hours (Google ignores free-text). Only
    // emitted where a defensible instructional-hours figure exists; the human
    // string stays in `course.duration` for on-page display.
    ...(COURSE_DURATION_ISO[course.slug] && {
      timeRequired: COURSE_DURATION_ISO[course.slug],
    }),
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Blended",
      // Rolling monthly cohorts — a schedule signal (without inventing a
      // specific start date) so the instance qualifies beyond a bare Course.
      courseSchedule: {
        "@type": "Schedule",
        repeatFrequency: "P1M",
      },
      ...(COURSE_DURATION_ISO[course.slug] && {
        courseWorkload: COURSE_DURATION_ISO[course.slug],
      }),
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
        // Where the listed price is the vendor course/lab/voucher bundle only, the
        // Offer must say so — otherwise the paired hero description (which talks about
        // Macksofy's bootcamp) reads as though the bootcamp is what the price buys.
        // Derived from priceNote so the disclosure can never drift from the page copy.
        ...(course.priceNote && { description: course.priceNote }),
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
        ...(course.priceNote && { description: course.priceNote }),
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

/**
 * Google ignores an Article `headline` longer than 110 characters. Clamp on a
 * word boundary for the schema value only — the visible H1 keeps the full
 * headline, and the untruncated text is preserved in `alternativeHeadline`.
 */
const HEADLINE_LIMIT = 110;

function clampHeadline(input: string): string {
  const t = input.trim();
  if (t.length <= HEADLINE_LIMIT) return t;
  const cut = t.lastIndexOf(" ", HEADLINE_LIMIT - 1);
  return (cut > 0 ? t.slice(0, cut) : t.slice(0, HEADLINE_LIMIT)).replace(
    /[\s—–\-·|,;:]+$/,
    "",
  );
}

/**
 * `answerBox` mirrors the flag on faqSchema(): only claim the speakable
 * selector when the page actually renders an AnswerBox. A case study with no
 * shortAnswers entry has no `[data-speakable='answer']` node, and declaring one
 * anyway is exactly the dead-selector defect this codebase has already hit
 * twice. Default false so a new case study never over-promises by accident.
 */
export function caseStudySchema(
  cs: CaseStudyHero,
  opts?: { answerBox?: boolean }
) {
  const headline = clampHeadline(cs.headline);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${BASE}/case-studies/${cs.slug}#article`,
    headline,
    ...(headline !== cs.headline && { alternativeHeadline: cs.headline }),
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
    ...(opts?.answerBox && {
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "[data-speakable='answer']"],
      },
    }),
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

/**
 * Options describing which speakable-bearing blocks the calling page actually
 * renders. A `cssSelector` that matches nothing is a dead promise — the same
 * defect class as the old `[itemprop=...]` selectors — so every selector below
 * is opt-out rather than assumed.
 *
 * Defaults are `true` because the overwhelming majority of FAQPage-emitting
 * templates (services, audits, industries, cities, combos, courses) render both
 * blocks. Pages that render only one — or neither — must say so.
 */
type FaqSpeakableOptions = {
  /** Page renders <FAQAccordion> (or equivalent data-speakable="faq-*" markup). */
  accordion?: boolean;
  /** Page renders <AnswerBox> (data-speakable="answer"). */
  answerBox?: boolean;
};

export function faqSchema(
  faqs: { q: string; a: string }[],
  { accordion = true, answerBox = true }: FaqSpeakableOptions = {},
) {
  // Speakable points at real DOM nodes only. The accordion
  // (components/sections/FAQAccordion.tsx) renders every question with
  // data-speakable="faq-question" (always in the DOM) and the open answer with
  // data-speakable="faq-answer"; AnswerBox (components/sections/AnswerBox.tsx)
  // renders data-speakable="answer". Mirrors the blog's data-speakable="lead"
  // convention.
  const cssSelector = [
    ...(accordion
      ? ["[data-speakable='faq-question']", "[data-speakable='faq-answer']"]
      : []),
    ...(answerBox ? ["[data-speakable='answer']"] : []),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
    // Omit the property entirely rather than emit an empty selector list.
    ...(cssSelector.length > 0 && {
      speakable: { "@type": "SpeakableSpecification", cssSelector },
    }),
  };
}

/**
 * DefinedTermSet for the /glossary hub. Every glossary entry becomes a
 * `DefinedTerm` with an anchored `@id` (`/glossary#<slug>`) so search and AI
 * engines can resolve, quote, and cite each definition individually while the
 * set node ties them to one authoritative page. This is the entity-hub schema.
 */
export function definedTermSetSchema(terms: GlossaryTerm[]) {
  const url = `${BASE}/glossary`;
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${url}#termset`,
    name: "Macksofy Cybersecurity Glossary",
    description:
      "Plain-language definitions of cybersecurity, VAPT, SOC, cloud, DFIR, and India/GCC compliance terms — CERT-In, RBI CSF, SEBI CSCRF, DPDP, ISO 27001, NESA and more.",
    url,
    inLanguage: "en-IN",
    publisher: { "@id": `${BASE}#organization` },
    // Each glossary definition renders with data-speakable="definition"
    // (app/glossary/page.tsx) — declare it so the definitions are TTS/voice
    // eligible, matching the FAQ/blog speakable convention.
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["[data-speakable='definition']"],
    },
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      "@id": `${url}#${t.slug}`,
      name: t.term,
      ...(t.abbr && { alternateName: t.abbr }),
      description: t.definition,
      inDefinedTermSet: { "@id": `${url}#termset` },
      url: `${url}#${t.slug}`,
    })),
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
