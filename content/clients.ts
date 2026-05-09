export type ClientCategory =
  | "Enterprise & Multinational"
  | "Government & Defence"
  | "Cooperative Banking & BFSI"
  | "Education"
  | "Industrial & Manufacturing"
  | "Tech, Media & Startups";

export interface Client {
  name: string;
  logo: string; // path under /public, e.g. "/clients/HSBC.png"
  category: ClientCategory;
}

export const CLIENTS: Client[] = [
  // -----------------------------------------------
  // Enterprise & Multinational
  // -----------------------------------------------
  { name: "HSBC", logo: "/clients/HSBC.png", category: "Enterprise & Multinational" },
  { name: "PwC", logo: "/clients/PWC.png", category: "Enterprise & Multinational" },
  { name: "Verizon", logo: "/clients/Verizon.png", category: "Enterprise & Multinational" },
  { name: "Allegion", logo: "/clients/Allegion.png", category: "Enterprise & Multinational" },
  { name: "Forvis Mazars", logo: "/clients/Forvis-mazars.png", category: "Enterprise & Multinational" },
  { name: "Viacom 18", logo: "/clients/Viacom-18.png", category: "Tech, Media & Startups" },

  // -----------------------------------------------
  // Government & Defence
  // -----------------------------------------------
  { name: "Maharashtra DES", logo: "/clients/Maha-DES.png", category: "Government & Defence" },
  { name: "Abu Dhabi", logo: "/clients/Abu-Dabi.png", category: "Government & Defence" },
  { name: "Naval Dockyard Co-Op Bank", logo: "/clients/The-Naval-Dockyard-Co-Op-Bank-Ltd.png", category: "Government & Defence" },

  // -----------------------------------------------
  // Education
  // -----------------------------------------------
  { name: "NMIMS", logo: "/clients/NMIMS.png", category: "Education" },
  { name: "NCSS", logo: "/clients/NCSS.png", category: "Education" },
  { name: "SIES", logo: "/clients/SIES.png", category: "Education" },
  { name: "Vidyalankar", logo: "/clients/Vidyalankar.png", category: "Education" },

  // -----------------------------------------------
  // Industrial & Manufacturing
  // -----------------------------------------------
  { name: "Ashida", logo: "/clients/Ashida.png", category: "Industrial & Manufacturing" },
  { name: "Presidential Valves Products", logo: "/clients/Presidential-Valves-Products.png", category: "Industrial & Manufacturing" },
  { name: "Mustafa International", logo: "/clients/Mustafa-International.png", category: "Industrial & Manufacturing" },

  // -----------------------------------------------
  // Tech, Media & Startups
  // -----------------------------------------------
  { name: "RPS", logo: "/clients/RPS.png", category: "Tech, Media & Startups" },
  { name: "QLC", logo: "/clients/QLC.png", category: "Tech, Media & Startups" },
  { name: "My Plan 8", logo: "/clients/My-Plan-8.png", category: "Tech, Media & Startups" },
  { name: "Rupifi Technology Solutions", logo: "/clients/RUPIFI-TECHNOLOGY-SOLUTIONS-PVT-LTD.png", category: "Tech, Media & Startups" },

  // -----------------------------------------------
  // Cooperative Banking & BFSI (alphabetised)
  // -----------------------------------------------
  { name: "Abasaheb Patil Rendal Sahakari Bank", logo: "/clients/Abasaheb-Patil-Rendal-Sahakari-Bank-Ltd.png", category: "Cooperative Banking & BFSI" },
  { name: "Abhinandan Urban Co-operative Bank", logo: "/clients/Abhinandan-Urban-Co-operative-Bank-Ltd.png", category: "Cooperative Banking & BFSI" },
  { name: "Priyadarshni Nagari Sahakari Bank", logo: "/clients/Priyadarshni-Nagari-sahakari-Bank-Maryadit.png", category: "Cooperative Banking & BFSI" },
  { name: "Pusad Urban Co-operative Bank", logo: "/clients/Pusad-Urban-Co-operative-Bank-Limited-Pusad.png", category: "Cooperative Banking & BFSI" },
  { name: "Rajashri Shahu Sahakari Bank", logo: "/clients/Rajashri-Shahu-Sahakari-Bank-Ltd.png", category: "Cooperative Banking & BFSI" },
  { name: "Raje Vikramsinh Ghatge Co-op Bank", logo: "/clients/Raje-Vikramsinh-Ghatge-Co-op.-Bank-Ltd.png", category: "Cooperative Banking & BFSI" },
  { name: "Rajgurunagar Sahakari Bank", logo: "/clients/Rajgurunagar-sahakari-Bank-Ltd.png", category: "Cooperative Banking & BFSI" },
  { name: "Sant Sopankaka Sahakari Bank", logo: "/clients/Sant-Sopankaka-Sahakari-Bank-Ltd-Saswad.png", category: "Cooperative Banking & BFSI" },
  { name: "Shri Basveshwar Sahakari Bank", logo: "/clients/Shri-Basveshwar-Sahakari-Bank-Nyt.png", category: "Cooperative Banking & BFSI" },
  { name: "Sindhudurg District Central Co-Op Bank", logo: "/clients/Sindhudurg-District-Central-Co-Op-Bank-Ltd.png", category: "Cooperative Banking & BFSI" },
  { name: "The Abhinav Sahakari Bank", logo: "/clients/The-Abhinav-Sahakari-Bank-Ltd.png", category: "Cooperative Banking & BFSI" },
  { name: "The Ajara Urban Co-Operative Bank", logo: "/clients/The-Ajara-Urban-Co-Operative-Bank-Ltd-Ajara.png", category: "Cooperative Banking & BFSI" },
  { name: "The Akola Janata Co-Op Bank", logo: "/clients/The-akola-Jatana-Co-Op-Bank-Ltd.png", category: "Cooperative Banking & BFSI" },
  { name: "The Akola Urban Co-Op Banks", logo: "/clients/The-Akola-Urban-Co-Op-Banks-Ltd-Akola.png", category: "Cooperative Banking & BFSI" },
  { name: "The Devgad Urban Co-Operative Bank", logo: "/clients/The-Devgad-Urban-Co-Operative-Bank-Ltd.png", category: "Cooperative Banking & BFSI" },
  { name: "The Ichalkaranji Merchant Co-Op Bank", logo: "/clients/The-Ichalkaranji-Merchant-Co-Op-Bank-Ltd.png", category: "Cooperative Banking & BFSI" },
  { name: "The Jawahar Urban Co-Op Bank", logo: "/clients/The-Jawahar-Urban-Co-Op-Bank-Ltd.png", category: "Cooperative Banking & BFSI" },
  { name: "The Kurla Nagrik Sahakari Bank", logo: "/clients/The-Kurla-Nagrik-Sahakari-Bank.png", category: "Cooperative Banking & BFSI" },
  { name: "The Mogaveera Co-Operative Bank", logo: "/clients/The-Mogaveera-Co-Operative-Bank-Ltd.png", category: "Cooperative Banking & BFSI" },
  { name: "The Nasik Merchants Co-op Bank", logo: "/clients/The-Nasik-Merchants-Co-op-Bank-Ltd.png", category: "Cooperative Banking & BFSI" },
  { name: "The Nasik Road Deolali Vyapari Bank", logo: "/clients/The-Nasik-Road-Deolali-Vyapad-haka-Bank-Ltd.png", category: "Cooperative Banking & BFSI" },
  { name: "The Pune Merchant Co-Op Bank", logo: "/clients/The-Pune-Merchant-Co-Op-Bank-Ltd.png", category: "Cooperative Banking & BFSI" },
  { name: "The Rayat Sevak Co-Op Bank", logo: "/clients/The-Rayat-Sevak-Co-Op-Bank-Ltd.png", category: "Cooperative Banking & BFSI" },
  { name: "The Sangli District Central Co-Op Bank", logo: "/clients/The-Sangli-District-Central-Co-Op-Bank-Ltd-logo.png", category: "Cooperative Banking & BFSI" },
  { name: "The Vaidyanath Urban Co-Op Bank", logo: "/clients/The-Vaidyanath-urban-Co-Op-Bank-Ltd.png", category: "Cooperative Banking & BFSI" },
  { name: "The Vishweshwar Co-Op Bank", logo: "/clients/The-Vishweshwar-Co-Op-Bank-Ltd.png", category: "Cooperative Banking & BFSI" },
  { name: "The Yavatmal Urban Co-Op Bank", logo: "/clients/The-Yavatmal-Urban-Co-Op-Bank-Ltd.png", category: "Cooperative Banking & BFSI" },
  { name: "The Zorastrian Co-Op Bank, Mumbai", logo: "/clients/The-Zorastrain-Co-Op-Bank-Ltd-Mumbai.png", category: "Cooperative Banking & BFSI" },
  { name: "Vishwas Co-Op", logo: "/clients/Vishwas-Co-Op.png", category: "Cooperative Banking & BFSI" },
];

export const CLIENT_CATEGORIES: { key: ClientCategory; description: string }[] = [
  {
    key: "Enterprise & Multinational",
    description:
      "Listed multinationals and Big-4 consulting firms across BFSI, telecom and professional services.",
  },
  {
    key: "Government & Defence",
    description:
      "State and union-government departments, naval cooperatives and Gulf government engagements.",
  },
  {
    key: "Cooperative Banking & BFSI",
    description:
      "30+ RBI-regulated cooperative and urban banks across Maharashtra. Annual System Audit Reports, VAPT and CERT-In format compliance.",
  },
  {
    key: "Education",
    description:
      "Top Indian educational institutions for cybersecurity training programs and infrastructure audits.",
  },
  {
    key: "Industrial & Manufacturing",
    description:
      "OT / ICS-aware engagements for manufacturers, energy and industrial groups.",
  },
  {
    key: "Tech, Media & Startups",
    description:
      "Fintechs, SaaS, D2C brands and broadcast media — pentesting, AppSec and cloud security.",
  },
];

export const clientsByCategory = (cat: ClientCategory): Client[] =>
  CLIENTS.filter((c) => c.category === cat);
