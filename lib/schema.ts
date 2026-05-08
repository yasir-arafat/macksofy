import { SITE, METROS } from "./site";
import type { Course } from "@/content/courses";
import type { Service } from "@/content/services";
import type { Audit } from "@/content/audits";

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
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE}#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    alternateName: SITE.shortName,
    url: BASE,
    logo: `${BASE}/logo.png`,
    description: SITE.description,
    foundingDate: SITE.founded,
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
    sameAs: Object.values(SITE.social),
    areaServed: AREA_SERVED,
    knowsAbout: [
      "Penetration Testing",
      "VAPT",
      "Red Teaming",
      "CERT-In Audit",
      "ISO 27001 Implementation",
      "RBI Cyber Security Framework Audit",
      "SEBI CSCRF Audit",
      "Digital Forensics",
      "Incident Response",
      "Threat Intelligence",
      "OSCP Training",
      "CEH Training",
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "612",
      bestRating: "5",
      worstRating: "1",
    },
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
    inLanguage: "en-IN",
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
    provider: {
      "@type": "Organization",
      "@id": `${BASE}#organization`,
      name: SITE.name,
      url: BASE,
      logo: `${BASE}/logo.png`,
      sameAs: BASE,
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "612",
      bestRating: "5",
      worstRating: "1",
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

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
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
    name: audit.title,
    description: audit.hero.description,
    provider: { "@id": `${BASE}#organization` },
    serviceType: "Information Security Audit",
    areaServed: AREA_SERVED,
    url: `${BASE}/audit/${audit.slug}`,
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
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["[itemprop='name']", "[itemprop='text']"],
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
