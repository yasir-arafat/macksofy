export interface Partner {
  name: string;
  category: "Client" | "Accreditation" | "Technology";
  initials: string;
}

export const PARTNERS: Partner[] = [
  // Accreditations (most important — show first)
  { name: "CERT-In Empanelled", category: "Accreditation", initials: "CIN" },
  { name: "EC-Council ATC", category: "Accreditation", initials: "EC" },
  { name: "OffSec Partner", category: "Accreditation", initials: "OS" },
  { name: "CompTIA Authorized", category: "Accreditation", initials: "CT" },
  { name: "ISO 27001 Certified", category: "Accreditation", initials: "ISO" },
  { name: "Startup India", category: "Accreditation", initials: "SI" },

  // Clients (illustrative — anonymized as needed in reality)
  { name: "HSBC", category: "Client", initials: "HS" },
  { name: "PwC", category: "Client", initials: "PW" },
  { name: "Maharashtra Police", category: "Client", initials: "MP" },
  { name: "Tata Group", category: "Client", initials: "TT" },
  { name: "Reliance", category: "Client", initials: "RL" },
  { name: "Aditya Birla", category: "Client", initials: "AB" },
  { name: "ICICI Bank", category: "Client", initials: "IC" },
  { name: "Mahindra", category: "Client", initials: "MH" },

  // Tech partners
  { name: "AWS", category: "Technology", initials: "AW" },
  { name: "Microsoft Azure", category: "Technology", initials: "AZ" },
  { name: "Splunk", category: "Technology", initials: "SP" },
  { name: "Wazuh", category: "Technology", initials: "WZ" },
  { name: "Elastic", category: "Technology", initials: "EL" },
  { name: "PortSwigger", category: "Technology", initials: "PS" },
];

export const ACCREDITATIONS = PARTNERS.filter((p) => p.category === "Accreditation");
export const CLIENT_LOGOS = PARTNERS.filter((p) => p.category === "Client");
export const TECH_LOGOS = PARTNERS.filter((p) => p.category === "Technology");
