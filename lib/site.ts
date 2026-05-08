export const SITE = {
  name: "Macksofy Technologies",
  shortName: "Macksofy",
  legalName: "Macksofy Technologies Pvt Ltd",
  positioning: "Cybersecurity Consulting · CERT-In Empanelled Audits · Advanced Training",
  tagline: "Securing Businesses. Training Cyber Warriors.",
  description:
    "CERT-In empanelled cybersecurity consulting firm with an advanced training division. Penetration testing, VAPT, SOC engineering, red teaming and DFIR for enterprises across India and the UAE — plus career-grade ethical hacking, OSCP and SOC analyst training.",
  url: "https://www.macksofy.com",
  ogImage: "/og-default.png",
  founded: "2014",

  email: "services@macksofy.com",
  phone: "+919930824239",
  phoneDisplay: "+91 99308 24239",
  whatsapp: "919930824239",
  whatsappLink: (msg = "Hi Macksofy, I'd like to discuss a cybersecurity engagement."): string =>
    `https://wa.me/919930824239?text=${encodeURIComponent(msg)}`,

  hq: {
    street: "308, Building No. 11, SRA Commercial Tower, Besides Trade Center",
    locality: "Bandra Kurla Complex, Bandra East",
    city: "Mumbai",
    region: "Maharashtra",
    postalCode: "400051",
    country: "IN",
  },
  uae: {
    city: "Dubai",
    region: "Dubai",
    country: "UAE",
    note: "Service delivery across UAE and the wider GCC.",
  },
  geo: { lat: 19.062, lng: 72.868 },
  hours: "Mo-Sa 09:30-18:30 IST",

  social: {
    linkedin: "https://www.linkedin.com/company/macksofy-technologies-pvt-ltd/",
    twitter: "https://x.com/macksofyt",
    facebook: "https://www.facebook.com/macksofy/",
    instagram: "https://www.instagram.com/macksofy_technologies/",
  },

  stats: {
    yearsInBusiness: 11,
    enterpriseClients: 250,
    learnersTrained: 20000,
    certificationsDelivered: 16,
    countriesServed: 5,
  },

  trustSignals: [
    "CERT-In Empanelled Information Security Auditor",
    "EC-Council Accredited Training Center",
    "CompTIA Authorized Partner",
    "ISO 27001 Certified",
    "Startup India Recognized",
    "Engagements across India and UAE",
  ],

  /**
   * Search-engine verification codes. Replace empty strings with the values
   * Google Search Console / Bing Webmaster Tools / Yandex emit.
   */
  verification: {
    google: "",
    bing: "",
    yandex: "",
  },
} as const;

/**
 * The metros Macksofy actively serves and ranks for. Used in schema
 * `areaServed`, sitemap context, geo-metas and per-page keyword expansion.
 */
interface MetroEntry {
  name: string;
  state: string;
  lat: number;
  lng: number;
  primary: boolean;
}

export const METROS: readonly MetroEntry[] = [
  { name: "Mumbai",     state: "Maharashtra",   lat: 19.076,  lng: 72.877,  primary: true },
  { name: "Delhi",      state: "Delhi",         lat: 28.6139, lng: 77.209,  primary: false },
  { name: "Bengaluru",  state: "Karnataka",     lat: 12.9716, lng: 77.5946, primary: false },
  { name: "Hyderabad",  state: "Telangana",     lat: 17.385,  lng: 78.4867, primary: false },
  { name: "Chennai",    state: "Tamil Nadu",    lat: 13.0827, lng: 80.2707, primary: false },
  { name: "Kolkata",    state: "West Bengal",   lat: 22.5726, lng: 88.3639, primary: false },
  { name: "Pune",       state: "Maharashtra",   lat: 18.5204, lng: 73.8567, primary: false },
  { name: "Ahmedabad",  state: "Gujarat",       lat: 23.0225, lng: 72.5714, primary: false },
  { name: "Gurugram",   state: "Haryana",       lat: 28.4595, lng: 77.0266, primary: false },
  { name: "Noida",      state: "Uttar Pradesh", lat: 28.5355, lng: 77.391,  primary: false },
  { name: "Chandigarh", state: "Chandigarh",    lat: 30.7333, lng: 76.7794, primary: false },
  { name: "Jaipur",     state: "Rajasthan",     lat: 26.9124, lng: 75.7873, primary: false },
  { name: "Kochi",      state: "Kerala",        lat: 9.9312,  lng: 76.2673, primary: false },
];

export type Metro = MetroEntry;

/** Quick metro-name array for keyword interpolation. */
export const METRO_NAMES: readonly string[] = METROS.map((m) => m.name);

/**
 * Build keyword strings of the form "<service> in <Metro>" / "<service> <Metro>"
 * for per-page metadata expansion. Used by `seo.ts buildMetadata`.
 */
export function metroKeywords(seed: string): string[] {
  return METROS.flatMap((m) => [`${seed} in ${m.name}`, `${seed} ${m.name}`]);
}

export type SiteConfig = typeof SITE;
