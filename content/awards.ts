export type AwardCategory =
  | "Industry Award"
  | "Vendor Recognition"
  | "Government / Academic"
  | "Speaking / Engagement";

export interface Award {
  slug: string;
  title: string;
  body: string;
  year: number | string;
  category: AwardCategory;
  image: string; // /public path
  description?: string;
  /** True for the most recent / signature awards — surfaced in the featured strip */
  featured?: boolean;
}

export const AWARDS: Award[] = [
  // 2025 — flagship
  {
    slug: "csi-women-in-cyber-2025",
    title: "Women in Cyber Security Award",
    body: "CSI (Computer Society of India) Cyber Security Awards",
    year: 2025,
    category: "Industry Award",
    image: "/awards/wics-2025.jpg",
    description:
      "National recognition for measurable contribution to women's representation and leadership in Indian cybersecurity.",
    featured: true,
  },
  {
    slug: "csi-outstanding-training-2025",
    title: "Outstanding Cyber Security Training / Awareness Initiative",
    body: "CSI Cyber Security Awards",
    year: 2025,
    category: "Industry Award",
    image: "/awards/csi-2025.webp",
    description:
      "Awarded for delivering one of India's highest-impact cybersecurity training and awareness programs across BFSI, government and academia.",
    featured: true,
  },

  // Vendor recognitions
  {
    slug: "google-vrp",
    title: "Google Vulnerability Reward Program — Recognition",
    body: "Google",
    year: "Multiple",
    category: "Vendor Recognition",
    image: "/awards/google-vrp.webp",
    description:
      "Hall of Fame recognition for responsibly disclosed vulnerabilities (Open Redirect class) under Google's VRP.",
    featured: true,
  },
  {
    slug: "ec-council-cei-2021",
    title: "EC-Council CEI — Circle of Excellence",
    body: "EC-Council Global Awards",
    year: 2021,
    category: "Vendor Recognition",
    image: "/awards/ec-council-cei-2021.webp",
    description:
      "Global recognition for sustained instructional excellence as an EC-Council Certified Instructor.",
  },

  // 2017 cluster
  {
    slug: "startup-of-the-year-2017",
    title: "Start-up of the Year",
    body: "IT Innovation & Excellence Awards",
    year: 2017,
    category: "Industry Award",
    image: "/awards/startup-2017.webp",
    description:
      "Winner — recognized as the most promising cybersecurity start-up in India for the year.",
  },
  {
    slug: "niss-2017",
    title: "Certificate of Appreciation",
    body: "National Information Security Summit (NISS)",
    year: 2017,
    category: "Speaking / Engagement",
    image: "/awards/niss-2017.webp",
    description:
      "Speaker recognition at India's premier government + private-sector information security summit.",
  },
  {
    slug: "intel-2017",
    title: "Certificate of Appreciation",
    body: "Intel India Awards",
    year: 2017,
    category: "Vendor Recognition",
    image: "/awards/intel-2017.webp",
    description:
      "Recognition for technical contribution to Intel's India cybersecurity engagement program.",
  },
  {
    slug: "intel-2016",
    title: "Certificate of Appreciation",
    body: "Intel India Awards",
    year: 2016,
    category: "Vendor Recognition",
    image: "/awards/intel-2016.webp",
    description:
      "Recognition for sustained partnership and contribution to Intel's India cybersecurity initiatives.",
  },

  // Academic
  {
    slug: "chetana-college",
    title: "Recognition Award",
    body: "Chetana's H. S. College of Commerce & Economics",
    year: "Speaking",
    category: "Government / Academic",
    image: "/awards/chetana-college.webp",
    description:
      "Awarded for delivering cybersecurity awareness and training engagements to students and faculty.",
  },
];

export const getAwardBySlug = (slug: string) => AWARDS.find((a) => a.slug === slug);

export const featuredAwards = () => AWARDS.filter((a) => a.featured);

export const awardsByCategory = (cat: AwardCategory) =>
  AWARDS.filter((a) => a.category === cat);

export const AWARD_CATEGORIES: { key: AwardCategory; description: string }[] = [
  {
    key: "Industry Award",
    description:
      "National-level industry awards recognizing leadership and outcomes across cybersecurity training and consulting.",
  },
  {
    key: "Vendor Recognition",
    description:
      "Recognition by global vendors (Google, Intel, EC-Council) for technical contribution and instructional excellence.",
  },
  {
    key: "Government / Academic",
    description:
      "Awards and recognitions from government bodies and Indian academic institutions.",
  },
  {
    key: "Speaking / Engagement",
    description:
      "Speaker honours from national security summits and industry conferences.",
  },
];
