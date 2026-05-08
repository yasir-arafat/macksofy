export interface Location {
  key: string;
  city: string;
  country: string;
  countryCode: string;
  flag: string;
  role: string;
  primary?: boolean;
  address: string;
  area: string;
  lat: number;
  lng: number;
  zoom: number;
  phone?: string;
  phoneDisplay?: string;
  email?: string;
  hours: string;
  tz: "Asia/Kolkata" | "Asia/Dubai" | "Asia/Muscat" | "America/Toronto";
  badges: string[];
  // Schematic SVG coordinates (in 1000x500 viewBox covering India + UAE region).
  pin?: { x: number; y: number };
}

export const LOCATIONS: Location[] = [
  {
    key: "mumbai",
    city: "Mumbai",
    country: "India",
    countryCode: "IN",
    flag: "🇮🇳",
    role: "Global Headquarters",
    primary: true,
    address: "308, Building No. 11, SRA Commercial Tower, BKC, Bandra East",
    area: "Bandra Kurla Complex · 5 min from BKC Metro · Maharashtra 400051",
    lat: 19.062,
    lng: 72.868,
    zoom: 16,
    phone: "+919930824239",
    phoneDisplay: "+91 99308 24239",
    email: "services@macksofy.com",
    hours: "Mon–Sat · 9:30–18:30",
    tz: "Asia/Kolkata",
    badges: [
      "CERT-In Empanelled",
      "EC-Council ATC",
      "ISO 27001",
    ],
    pin: { x: 460, y: 270 },
  },
  {
    key: "dubai",
    city: "Dubai",
    country: "UAE",
    countryCode: "AE",
    flag: "🇦🇪",
    role: "Regional Hub · GCC",
    address: "Business Bay, Sheikh Zayed Road",
    area: "BFSI · government · enterprise across UAE — Dubai, Abu Dhabi, Sharjah",
    lat: 25.1872,
    lng: 55.2741,
    zoom: 14,
    phone: "+919930824239",
    phoneDisplay: "+91 99308 24239",
    email: "services@macksofy.com",
    hours: "Sun–Thu · 9:00–18:00",
    tz: "Asia/Dubai",
    badges: ["UAE NESA", "DESC", "ADHICS aware"],
    pin: { x: 280, y: 240 },
  },
  {
    key: "hyderabad",
    city: "Hyderabad",
    country: "India",
    countryCode: "IN",
    flag: "🇮🇳",
    role: "Regional Hub · South India",
    address: "HITEC City, Madhapur",
    area: "Telangana · Andhra Pradesh · Karnataka · Tamil Nadu · Kerala delivery",
    lat: 17.4486,
    lng: 78.3908,
    zoom: 14,
    hours: "Mon–Sat · 9:30–18:30",
    tz: "Asia/Kolkata",
    badges: ["South India delivery"],
    pin: { x: 540, y: 305 },
  },
  {
    key: "muscat",
    city: "Muscat",
    country: "Oman",
    countryCode: "OM",
    flag: "🇴🇲",
    role: "Engagement Site",
    address: "Ruwi · Government and enterprise delivery",
    area: "Cybersecurity training and consulting engagements",
    lat: 23.588,
    lng: 58.385,
    zoom: 12,
    hours: "Sun–Thu · 9:00–18:00",
    tz: "Asia/Muscat",
    badges: ["Government engagements", "BFSI consulting"],
    pin: { x: 320, y: 280 },
  },
  {
    key: "toronto",
    city: "Toronto",
    country: "Canada",
    countryCode: "CA",
    flag: "🇨🇦",
    role: "Engagement Site",
    address: "North America consulting + pen-testing partnerships",
    area: "Cross-border consulting and pentest engagements",
    lat: 43.6532,
    lng: -79.3832,
    zoom: 10,
    hours: "Mon–Fri · 9:00–17:00",
    tz: "America/Toronto",
    badges: ["Cross-border", "Strategic delivery"],
    pin: { x: 90, y: 180 },
  },
];
