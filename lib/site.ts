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
  phoneAlt: "+912226509887",
  phoneAltDisplay: "022 2650 9887",
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
    linkedin: "https://www.linkedin.com/company/macksofy-technologies",
    twitter: "https://twitter.com/macksofy",
    facebook: "https://www.facebook.com/macksofytechnologies",
    instagram: "https://www.instagram.com/macksofytechnologies",
    youtube: "https://www.youtube.com/@macksofy",
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
    "OffSec Authorized Training Partner",
    "CompTIA Authorized Partner",
    "ISO 27001 Certified",
    "Startup India Recognized",
    "Engagements across India and UAE",
  ],
} as const;

export type SiteConfig = typeof SITE;
