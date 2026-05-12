/**
 * City landing-page data. Each city gets ~1,500 words of unique content
 * (industry context, regulators, hiring, case study, FAQ) so the pages
 * pass Google's thin-content filter and rank for "[city] cybersecurity"
 * queries.
 */

export type CityCategory =
  | "BFSI capital"
  | "Tech capital"
  | "Government / PSU hub"
  | "Industrial"
  | "Healthcare"
  | "Mixed";

export interface CityCaseStudy {
  industry: string;
  scope: string;
  outcome: string;
}

export interface CityFAQ {
  q: string;
  a: string;
}

export interface City {
  slug: string;
  name: string;
  state: string;
  category: CityCategory;
  primary?: boolean;
  hero: {
    eyebrow: string;
    headline: string;
    description: string;
  };
  /** A short 2-3 paragraph "city context" block. */
  cityContext: string[];
  /** Top regulators and frameworks active in this city. */
  regulators: string[];
  /** Industries Macksofy primarily serves in this city. */
  industries: string[];
  /** Top services Macksofy delivers in this metro (slug references). */
  topServices: string[];
  /** Top audits relevant to this metro (slug references). */
  topAudits: string[];
  /** Anonymised case study from this city. */
  caseStudy: CityCaseStudy;
  /** Quick stats for the city stat strip. */
  stats: { value: string; label: string }[];
  /** "How we deliver" narrative (1-2 paragraphs). */
  delivery: string;
  /** City-specific procurement / engagement FAQs. */
  faqs: CityFAQ[];
  /** SEO meta description override (≤160 chars ideally). */
  seoDescription: string;
  /** Extra long-tail keywords beyond the auto-generated metro × service pairs. */
  extraKeywords: string[];
  /** Lat/lng for JSON-LD GeoCoordinates. */
  geo: { lat: number; lng: number };
  /** Optional map embed query — defaults to city name. */
  mapQuery?: string;
}

export const CITIES: City[] = [
  // ===================================================================
  // 1. MUMBAI — HQ
  // ===================================================================
  {
    slug: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    category: "BFSI capital",
    primary: true,
    hero: {
      eyebrow: "Cybersecurity in Mumbai · Macksofy HQ · BKC",
      headline: "Mumbai's regulator-grade cybersecurity firm.",
      description:
        "Macksofy Technologies is headquartered at SRA Commercial Tower, Bandra Kurla Complex (BKC), Mumbai. CERT-In empanelled. Trusted by RBI-regulated banks, SEBI-regulated brokers, IRDAI-regulated insurers, listed BFSI giants and fast-growing fintechs across Mumbai, Thane, Navi Mumbai and the wider MMR.",
    },
    cityContext: [
      "Mumbai is India's BFSI capital, home to RBI's central office, the Bombay Stock Exchange, the National Stock Exchange and India's biggest banks, NBFCs, payment aggregators, mutual funds and insurance majors. Cybersecurity here isn't a tick-box exercise — it's a regulatory, financial and reputational must.",
      "Macksofy was founded in Mumbai in 2014 and chose Bandra Kurla Complex (BKC) for its global headquarters because it sits five minutes from the BKC Metro and the heart of India's financial regulatory infrastructure. We deliver onsite engagements anywhere in the MMR — BKC, Lower Parel, Andheri MIDC, Powai, Thane, Navi Mumbai — and remote engagements pan-India.",
      "What makes our Mumbai practice unique: every senior consultant is OSCP / OSWE / OSEP certified, 60% of our engagements are with RBI- or SEBI-regulated entities, and our reports are accepted by RBI inspectors, SEBI auditors and CERT-In on the first read.",
    ],
    regulators: [
      "Reserve Bank of India (RBI) — banks, NBFCs, payment aggregators, prepaid wallets",
      "Securities and Exchange Board of India (SEBI) — brokers, mutual funds, AMCs",
      "Insurance Regulatory and Development Authority of India (IRDAI) — insurers, brokers, TPAs",
      "Cyber Cell, Maharashtra Police — cyber-incident coordination",
      "MeitY · CERT-In — empanelment, incident reporting, audit framework",
    ],
    industries: [
      "Banks (private, public, cooperative)",
      "NBFCs and Housing Finance",
      "Stock Brokers and Depository Participants",
      "Asset Management Companies (AMCs)",
      "Payment Aggregators / Gateways",
      "Insurance majors (life, general, health)",
      "Fintech (lending, payments, neo-banking)",
      "Listed manufacturing + pharma majors",
    ],
    topServices: [
      "penetration-testing",
      "vapt",
      "managed-soc",
      "red-teaming",
      "digital-forensics-incident-response",
    ],
    topAudits: [
      "cert-in-empanelled-audit",
      "rbi-csf",
      "sebi-cscrf",
      "sebi-sar",
      "iso-27001",
      "soc-2",
      "pci-dss",
      "dpdp-act",
    ],
    caseStudy: {
      industry: "Mumbai-based Mid-size Stock Broker (BKC)",
      scope:
        "Annual SEBI System Audit Report (SAR) + CSCRF transition + RBI client-money compliance overlay",
      outcome:
        "SAR submitted within 12 working days · CCI score 78/100 · zero SEBI inspection clarifications · cleared CSCRF transition 8 months ahead of mandate.",
    },
    stats: [
      { value: "200+", label: "Mumbai engagements" },
      { value: "30+", label: "RBI / SEBI clients" },
      { value: "5 min", label: "From BKC Metro" },
      { value: "<4 hrs", label: "Onsite SLA" },
    ],
    delivery:
      "Macksofy's BKC headquarters means we can be onsite at any Mumbai client within 4 hours — Powai, Lower Parel, Andheri, Worli, Thane, Navi Mumbai. Most regulator audits start with a same-day kickoff at the client office, followed by remote VAPT and reporting from our BKC team. We have running engagement relationships with cooperative banks across the MMR, listed pharma in Powai, and fintechs in BKC + Lower Parel — references available on request.",
    faqs: [
      {
        q: "Do you have an office in BKC, Mumbai?",
        a: "Yes — Macksofy's global headquarters is at 308, Building 11, SRA Commercial Tower, BKC, Bandra East. We're 5 minutes walking distance from the BKC Metro station. Onsite client visits across Mumbai average a 4-hour response time.",
      },
      {
        q: "Can you handle RBI System Audit Reports for Mumbai banks?",
        a: "Yes — we deliver SARs annually for cooperative banks, NBFCs, payment aggregators and prepaid wallet operators across the MMR. Macksofy is CERT-In empanelled, which means our SARs are accepted by RBI's CSITE Cell and Department of Supervision without rework.",
      },
      {
        q: "Do you support SEBI brokers based in Mumbai?",
        a: "Yes. Most of our SEBI work is with brokers and depository participants in BKC, Worli and Andheri. We deliver CSCRF audits, SAR submissions, and CCI / CRMM scoring under SEBI's 2024 framework.",
      },
    ],
    seoDescription:
      "CERT-In empanelled cybersecurity company in Mumbai. Headquartered at BKC. Penetration testing, VAPT, RBI / SEBI / IRDAI audits and OSCP / CEH training for Mumbai BFSI, fintech and government clients.",
    extraKeywords: [
      "cybersecurity Mumbai BKC",
      "VAPT services Mumbai",
      "CERT-In empanelled Mumbai",
      "RBI SAR auditor Mumbai",
      "SEBI CSCRF auditor Mumbai",
      "Mumbai pentest company",
      "ethical hacking institute Mumbai",
      "OSCP training BKC",
    ],
    geo: { lat: 19.062, lng: 72.868 },
    mapQuery: "Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051",
  },

  // ===================================================================
  // 2. DELHI / NCR
  // ===================================================================
  {
    slug: "delhi",
    name: "Delhi NCR",
    state: "Delhi",
    category: "Government / PSU hub",
    hero: {
      eyebrow: "Cybersecurity in Delhi NCR · Government · BFSI · IT",
      headline: "Delhi NCR cybersecurity, regulator-format.",
      description:
        "Macksofy delivers CERT-In empanelled audits, regulator-grade pentests and EC-Council ATC training plus hands-on OSCP / OSEP / OSWE exam-prep bootcamps for Delhi NCR's government bodies, public sector banks, fintechs in Gurugram and Noida, and IT services majors. Senior consultants travel from Mumbai BKC for onsite engagements; most ongoing programs run remotely.",
    },
    cityContext: [
      "Delhi NCR — Delhi, Gurugram, Noida, Faridabad, Ghaziabad — is India's government, defence and policy capital, with a fast-growing fintech and SaaS scene in Gurugram and Noida. Cybersecurity demand here splits cleanly: government and PSU bodies need CERT-In compliance + DPDP readiness, while private fintechs in DLF Cyber City (Gurugram) and Sector 62 (Noida) need RBI / SEBI / PCI-DSS depth.",
      "Macksofy's Delhi NCR practice serves both sides. We've delivered CERT-In audits to public sector banks and ministries, VAPT engagements for unicorn fintechs in Gurugram, and corporate CEH / OSCP cohorts to IT majors in Noida.",
      "Our consultants are flown in from Mumbai BKC for kick-off and major reviews; the bulk of testing and reporting runs remotely with a hand-off cadence Indian PSUs and corporates expect.",
    ],
    regulators: [
      "MeitY · CERT-In — government compliance, incident reporting",
      "RBI — for NCR-headquartered banks and NBFCs",
      "Telecom Regulatory Authority of India (TRAI) — for telecom-adjacent entities",
      "Comptroller and Auditor General of India (CAG) — PSU audits",
      "DPDP Board (forthcoming) — privacy",
    ],
    industries: [
      "Public sector banks + PSUs",
      "Central government departments",
      "Fintech (Gurugram, Noida)",
      "IT services + GCCs",
      "Aerospace + defence",
      "Healthcare + pharma",
    ],
    topServices: [
      "vapt",
      "penetration-testing",
      "managed-soc",
      "cloud-security",
    ],
    topAudits: [
      "cert-in-empanelled-audit",
      "rbi-csf",
      "iso-27001",
      "soc-2",
      "dpdp-act",
      "pci-dss",
    ],
    caseStudy: {
      industry: "Gurugram-headquartered Series-D Fintech",
      scope:
        "Combined RBI Master Direction audit + PCI-DSS v4.0 readiness + ISO 27001 surveillance",
      outcome:
        "All three submissions cleared in same quarter · CCI rating Tier-2 → Tier-3 · enterprise sales pipeline doubled within 6 months.",
    },
    stats: [
      { value: "60+", label: "NCR engagements" },
      { value: "12", label: "PSU / govt clients" },
      { value: "Same-week", label: "Onsite arrival" },
      { value: "Pan-NCR", label: "Delhi · Gurugram · Noida" },
    ],
    delivery:
      "We schedule a kick-off onsite visit (Mumbai → Delhi same-day flight; consultants land Tuesday morning) and run the bulk of VAPT, audit and remediation remotely from Mumbai BKC. For multi-week PSU engagements we maintain a Delhi-based lead consultant for the duration. Reporting handoffs follow PSU expectations — formal submissions, signed deliverables, and on-site sign-off meetings.",
    faqs: [
      {
        q: "Can you deliver onsite engagements in Delhi or Gurugram?",
        a: "Yes — senior consultants fly in from Mumbai BKC for kickoff, mid-engagement reviews and final sign-offs. The bulk of VAPT and reporting runs remotely; this delivers the same regulator-grade output at lower cost than NCR-resident vendors.",
      },
      {
        q: "Do you serve government / PSU clients in Delhi?",
        a: "Yes. Macksofy is CERT-In empanelled and has delivered audits to central government departments, public sector banks and PSU IT systems. We can support tendering processes (GeM, CPPP) and submission formats expected by CAG and CERT-In.",
      },
      {
        q: "Are you on the GeM portal?",
        a: "Yes — Macksofy is a GeM-listed cybersecurity services vendor. We can take direct purchase orders from central and state government buyers via GeM.",
      },
    ],
    seoDescription:
      "CERT-In empanelled cybersecurity services in Delhi, Gurugram and Noida. VAPT, audits, RBI / SEBI / DPDP compliance, PCI-DSS, ISO 27001 — for government, PSU, fintech and IT services clients across Delhi NCR.",
    extraKeywords: [
      "cybersecurity Delhi NCR",
      "VAPT Gurugram",
      "VAPT Noida",
      "CERT-In auditor Delhi",
      "PSU cybersecurity Delhi",
      "fintech security Gurugram",
      "GeM cybersecurity vendor",
    ],
    geo: { lat: 28.6139, lng: 77.209 },
    mapQuery: "Connaught Place, New Delhi",
  },

  // ===================================================================
  // 3. BENGALURU
  // ===================================================================
  {
    slug: "bengaluru",
    name: "Bengaluru",
    state: "Karnataka",
    category: "Tech capital",
    hero: {
      eyebrow: "Cybersecurity in Bengaluru · Tech · SaaS · GCC",
      headline: "Bengaluru cybersecurity for product, SaaS and GCC.",
      description:
        "Macksofy serves Bengaluru's product, SaaS and global capability centre (GCC) ecosystem with manual-first VAPT, OSCP/OSWE-level pentesting, ISO 27001 / SOC 2 implementations and OSCP / CRTO training cohorts. CERT-In empanelled. Same-week onsite via senior consultants from Mumbai.",
    },
    cityContext: [
      "Bengaluru is India's tech capital and the largest cluster of SaaS, fintech, GCC and product companies in Asia. The cybersecurity buyer here is technical, hands-on and ROI-focused — they shortlist vendors who publish methodology, transparent pricing and OSCP-grade consultant credentials.",
      "Macksofy's Bengaluru practice is purpose-built for this audience. Our reports are reviewed by AppSec leads, not procurement teams. We've delivered web + mobile + API pentests to Series-A through Series-D SaaS companies, ISO 27001 + SOC 2 dual implementations to product companies entering enterprise sales, and CRTP / OSCP corporate cohorts to engineering teams at unicorn fintechs.",
      "While we don't have a Bengaluru office (yet), the senior consultant who runs your engagement is the same person who flies in for kickoff and reports back to your CTO. No bait-and-switch staffing.",
    ],
    regulators: [
      "MeitY · CERT-In — empanelment, breach reporting",
      "RBI — for Bengaluru-headquartered fintechs",
      "DPDP Board — privacy compliance",
      "Karnataka State IT Department",
    ],
    industries: [
      "B2B SaaS",
      "Fintech (lending, payments, neo-banking)",
      "Healthtech",
      "GCC (US + EU enterprise)",
      "Logistics / mobility tech",
      "Edtech",
    ],
    topServices: [
      "web-application-security",
      "penetration-testing",
      "cloud-security",
      "red-teaming",
      "vapt",
    ],
    topAudits: [
      "iso-27001",
      "soc-2",
      "iso-27017",
      "iso-27018",
      "iso-27701",
      "pci-dss",
      "gdpr",
      "dpdp-act",
    ],
    caseStudy: {
      industry: "Bengaluru-headquartered Series-C SaaS",
      scope:
        "Full-stack manual VAPT (web + API + mobile + AWS) + ISO 27001:2022 + SOC 2 Type 2 dual-track",
      outcome:
        "23 critical findings closed in 60 days · ISO 27001 + SOC 2 Type 2 issued in same audit cycle · enterprise sales pipeline tripled in 6 months.",
    },
    stats: [
      { value: "80+", label: "Bengaluru engagements" },
      { value: "40", label: "SaaS / product clients" },
      { value: "AWS · GCP", label: "Cloud-first stack" },
      { value: "Same-week", label: "Onsite arrival" },
    ],
    delivery:
      "Engagement kickoff and final review onsite at the client's Bengaluru office (Whitefield, ORR, Electronic City, Koramangala, Indiranagar). Most VAPT runs remotely — clients prefer this since their engineering teams are already async and async testing matches their workflow. SOC 2 and ISO 27001 implementations include monthly onsite reviews + weekly remote sync.",
    faqs: [
      {
        q: "Do you have a Bengaluru office?",
        a: "Not yet — but our senior consultants travel from Mumbai BKC for every Bengaluru kickoff, mid-engagement review and final sign-off. Bulk testing and reporting runs remotely; clients consistently rate this lower-cost-and-equivalent-quality vs Bengaluru-resident boutiques.",
      },
      {
        q: "Can you handle SOC 2 + ISO 27001 simultaneously for our SaaS?",
        a: "Yes — about 60% of our Bengaluru SaaS clients run SOC 2 + ISO 27001 dual-track. We share evidence across both frameworks, saving 30-40% of effort vs sequential audits.",
      },
      {
        q: "Are your pentests acceptable to enterprise procurement (US / EU buyers)?",
        a: "Yes. Our reports include sanitized executive summaries, MITRE ATT&CK mappings and remediation timelines that meet US-enterprise security questionnaire expectations. We also provide a 'sanitized vendor-pack' you can attach to RFPs.",
      },
    ],
    seoDescription:
      "CERT-In empanelled cybersecurity services for Bengaluru SaaS, fintech and GCC clients. Manual VAPT, ISO 27001, SOC 2, AppSec, cloud security. OSCP / OSWE-led consultants. Same-week onsite, remote-friendly delivery.",
    extraKeywords: [
      "cybersecurity Bengaluru",
      "AppSec Bengaluru",
      "SaaS pentest Bengaluru",
      "ISO 27001 consultant Bengaluru",
      "SOC 2 Bengaluru India",
      "Bengaluru ethical hacking institute",
      "VAPT Bengaluru SaaS",
    ],
    geo: { lat: 12.9716, lng: 77.5946 },
    mapQuery: "MG Road, Bengaluru, Karnataka",
  },

  // ===================================================================
  // 4. HYDERABAD
  // ===================================================================
  {
    slug: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    category: "Mixed",
    hero: {
      eyebrow: "Cybersecurity in Hyderabad · Macksofy Regional Hub · HITEC City",
      headline: "South India cybersecurity, anchored in Hyderabad.",
      description:
        "Macksofy's Hyderabad regional hub serves South India — Telangana, Andhra Pradesh, Karnataka, Tamil Nadu and Kerala — from HITEC City. CERT-In empanelled. Pharma, BFSI, GCC and government engagements with onsite consultants and Mumbai-supported reporting.",
    },
    cityContext: [
      "Hyderabad is unique in India's cybersecurity map — it combines a strong pharma cluster (top-5 generics globally), a fast-growing fintech and SaaS scene, and a deep government / defence presence (NIC, ISRO, DRDL). Cybersecurity buyers here demand both regulatory rigor (CERT-In, DPDP) and tech depth (cloud, AppSec).",
      "Macksofy's Hyderabad regional hub at HITEC City serves these audiences end to end. We deliver CERT-In and DPDP audits to pharma and government, AppSec and cloud security to SaaS and fintech, and corporate CEH / OSCP cohorts to GCC engineering teams. Our hub also anchors delivery for Vijayawada, Visakhapatnam, Bengaluru-overflow, Chennai-overflow and Kochi engagements.",
      "We have local senior consultants who can be onsite at any HITEC City, Madhapur, Gachibowli, Banjara Hills or Kondapur location within hours.",
    ],
    regulators: [
      "MeitY · CERT-In — empanelment, breach reporting",
      "Telangana ITE&C — state IT compliance",
      "DCGI / DGFT — pharma compliance overlap",
      "RBI — for Hyderabad-headquartered banks and NBFCs",
      "DPDP Board — privacy compliance",
    ],
    industries: [
      "Pharma + biotech",
      "B2B SaaS + fintech",
      "GCC (US healthcare, BFSI)",
      "Government (Telangana, Andhra Pradesh)",
      "Aerospace + defence research",
      "Healthcare delivery",
    ],
    topServices: [
      "vapt",
      "penetration-testing",
      "managed-soc",
      "cloud-security",
      "digital-forensics-incident-response",
    ],
    topAudits: [
      "cert-in-empanelled-audit",
      "iso-27001",
      "iso-27701",
      "hipaa",
      "soc-2",
      "dpdp-act",
    ],
    caseStudy: {
      industry: "Top-5 Hyderabad Pharma Major",
      scope:
        "DPDP readiness + ISO 27001 surveillance + HIPAA gap-analysis (US clinical-trial data)",
      outcome:
        "DPDP RoPA mapped across 4 plants and 7 R&D sites · HIPAA business-associate posture validated · zero non-conformities at ISO surveillance.",
    },
    stats: [
      { value: "Local hub", label: "HITEC City based" },
      { value: "70+", label: "South India engagements" },
      { value: "<2 hrs", label: "Onsite SLA in city" },
      { value: "5 states", label: "South India coverage" },
    ],
    delivery:
      "Hyderabad-resident senior consultants run kickoff, on-site sessions and inspector defence. Reporting and validation runs from a Mumbai + Hyderabad pair so clients get pan-India regulatory expertise without losing local proximity. Pharma engagements typically include onsite plant + R&D site visits across multiple geographies — we handle the travel.",
    faqs: [
      {
        q: "Do you have a Hyderabad office?",
        a: "Yes — Macksofy's South India regional hub is at HITEC City, Madhapur. We have local senior consultants who can be onsite within 2 hours anywhere in the city.",
      },
      {
        q: "Do you serve Andhra Pradesh + Telangana government?",
        a: "Yes. We've delivered CERT-In audits to Telangana state IT bodies and select AP government departments. We support tendering on Telangana's e-procurement portal and central GeM.",
      },
      {
        q: "Can you handle Hyderabad pharma's HIPAA / DPDP overlap?",
        a: "Yes — our pharma practice maps DPDP RoPA, HIPAA business-associate obligations and ISO 27001 controls into a single program. Most pharma clients run all three on the same audit cycle.",
      },
    ],
    seoDescription:
      "CERT-In empanelled cybersecurity services in Hyderabad. South India regional hub at HITEC City. VAPT, ISO 27001, DPDP, HIPAA, SOC 2 for pharma, SaaS, fintech, GCC and government clients across Telangana, AP and beyond.",
    extraKeywords: [
      "cybersecurity Hyderabad",
      "VAPT Hyderabad HITEC City",
      "CERT-In auditor Hyderabad",
      "Hyderabad pharma compliance",
      "DPDP Hyderabad",
      "Hyderabad SaaS pentest",
      "OSCP training Hyderabad",
    ],
    geo: { lat: 17.4486, lng: 78.3908 },
    mapQuery: "HITEC City, Madhapur, Hyderabad, Telangana",
  },

  // ===================================================================
  // 5. CHENNAI
  // ===================================================================
  {
    slug: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    category: "Mixed",
    hero: {
      eyebrow: "Cybersecurity in Chennai · BFSI · Manufacturing · IT",
      headline: "Chennai cybersecurity for BFSI, auto and IT services.",
      description:
        "Macksofy delivers regulator-grade VAPT, audits and training to Chennai's BFSI majors, automotive manufacturers, IT services giants and SaaS unicorns. CERT-In empanelled. Senior consultants travel from Mumbai BKC and Hyderabad HITEC for onsite engagements.",
    },
    cityContext: [
      "Chennai blends India's largest auto + heavy-engineering manufacturing belt with a top-tier BFSI cluster (Indian Bank, IOB, several PSU banks) and a maturing tech / SaaS scene in OMR, Velachery and Tidel Park. Cybersecurity buyers here span the spectrum — from PSU bank CERT-In audits to global SaaS SOC 2 Type 2.",
      "Macksofy's Chennai work is anchored from our Hyderabad regional hub for proximity and our Mumbai HQ for regulatory depth. We've delivered RBI / CERT-In audits to PSU banks, ISO 27001 + DPDP to manufacturing majors, and SOC 2 + cloud security to OMR-based SaaS unicorns.",
      "Tamil Nadu's e-governance push (TN-eGA) and the Chennai e-Governance Authority have driven steady demand for state-government cybersecurity audits — Macksofy is positioned as a CERT-In empanelled vendor for these programs.",
    ],
    regulators: [
      "MeitY · CERT-In",
      "RBI — for Chennai PSU banks",
      "Tamil Nadu e-Governance Agency (TNeGA)",
      "DPDP Board",
      "Securities Exchange Board of India (SEBI)",
    ],
    industries: [
      "PSU + private banks",
      "Auto + heavy engineering",
      "B2B SaaS + product",
      "Healthcare + clinical research",
      "IT services + BPO",
      "Government (Tamil Nadu)",
    ],
    topServices: [
      "vapt",
      "penetration-testing",
      "web-application-security",
      "managed-soc",
      "cloud-security",
    ],
    topAudits: [
      "cert-in-empanelled-audit",
      "rbi-csf",
      "iso-27001",
      "soc-2",
      "dpdp-act",
      "pci-dss",
      "hipaa",
    ],
    caseStudy: {
      industry: "Chennai-headquartered PSU Bank",
      scope:
        "Annual RBI Cyber Security Framework audit + ATM environment VAPT + branch-network segmentation review",
      outcome:
        "RBI inspection cleared with zero major findings · 12 ATMs hardened · network segmentation validated across 4,200 branches.",
    },
    stats: [
      { value: "40+", label: "Chennai engagements" },
      { value: "Mfg + BFSI", label: "Mixed verticals" },
      { value: "Same-week", label: "Onsite arrival" },
      { value: "TNeGA", label: "Eligible vendor" },
    ],
    delivery:
      "Senior consultants travel from Mumbai or Hyderabad for kickoff, onsite VAPT and final reviews. Reporting and follow-on closure runs remotely. For long-running PSU programs we keep a dedicated lead consultant who flies in fortnightly. We handle Tamil-language documentation requirements where state government engagements demand it.",
    faqs: [
      {
        q: "Can you serve Chennai banks under RBI's Cyber Security Framework?",
        a: "Yes — we've delivered RBI CSF audits to multiple PSU and private banks headquartered in Chennai. Macksofy is CERT-In empanelled, so our SARs are accepted by RBI's CSITE Cell on the first read.",
      },
      {
        q: "Do you support Tamil Nadu government engagements (TNeGA)?",
        a: "Yes. We participate in TN-eGA tenders and central GeM listings. Our state-government engagements include CERT-In audits, DPDP readiness and incident-response retainers.",
      },
      {
        q: "Do you handle Chennai's auto / heavy engineering manufacturing OT / ICS audits?",
        a: "Yes — we have OT-aware cybersecurity engagements with auto, electronics and heavy-engineering manufacturers across the Sriperumbudur and Oragadam belts. We deliver IEC-62443-aligned reviews alongside IT security audits.",
      },
    ],
    seoDescription:
      "CERT-In empanelled cybersecurity services in Chennai. VAPT, RBI / SEBI audits, ISO 27001, SOC 2, OT/ICS reviews for Chennai BFSI, manufacturing, IT services and government clients across Tamil Nadu.",
    extraKeywords: [
      "cybersecurity Chennai",
      "VAPT Chennai OMR",
      "CERT-In auditor Chennai",
      "Chennai PSU bank audit",
      "TN-eGA cybersecurity vendor",
      "Chennai manufacturing OT security",
      "SOC 2 Chennai SaaS",
    ],
    geo: { lat: 13.0827, lng: 80.2707 },
    mapQuery: "OMR, Old Mahabalipuram Road, Chennai, Tamil Nadu",
  },

  // ===================================================================
  // 6. PUNE
  // ===================================================================
  {
    slug: "pune",
    name: "Pune",
    state: "Maharashtra",
    category: "Mixed",
    hero: {
      eyebrow: "Cybersecurity in Pune · IT services · Manufacturing · Education",
      headline: "Pune cybersecurity for tech, auto and manufacturing.",
      description:
        "Macksofy's Pune practice is anchored from our Mumbai BKC headquarters — 3 hours by road. We deliver CERT-In empanelled VAPT, audits and training across Pune's IT services majors, manufacturing belt, edtech and BPO ecosystem.",
    },
    cityContext: [
      "Pune is Mumbai's strongest tech and manufacturing satellite — Hinjewadi IT cluster, Talegaon and Chakan auto belts, and a deep BPO / GCC presence in Magarpatta and Kharadi. Cybersecurity buyers here are typically IT-services GCCs, captive-pharma R&D and auto OEMs needing both regulatory compliance and OT security depth.",
      "Macksofy's Pune work is delivered from Mumbai BKC by senior consultants who drive over for kickoff and major reviews — Pune is a 3-hour drive from BKC, which means same-day onsite arrival is normal. Most VAPT and audit work then runs remotely, with reporting handoffs that match the client's IT-services delivery cadence.",
      "We have running engagement relationships with auto OEMs in Chakan, IT services majors in Hinjewadi Phase II/III and edtech unicorns in Magarpatta.",
    ],
    regulators: [
      "MeitY · CERT-In",
      "Maharashtra cyber wing",
      "DPDP Board",
      "Sectoral overlays — RBI, SEBI, IRDAI for Pune-headquartered fintech / insurance",
    ],
    industries: [
      "IT services + GCC",
      "Auto OEMs + Tier-1 suppliers",
      "Education + edtech",
      "Pharma R&D + biotech",
      "BPO / KPO",
      "Engineering services",
    ],
    topServices: [
      "vapt",
      "penetration-testing",
      "cloud-security",
      "web-application-security",
      "managed-soc",
    ],
    topAudits: [
      "cert-in-empanelled-audit",
      "iso-27001",
      "soc-2",
      "iso-27701",
      "dpdp-act",
      "pci-dss",
    ],
    caseStudy: {
      industry: "Pune-headquartered Auto Tier-1 Supplier",
      scope:
        "ISO 27001:2022 implementation + DPDP RoPA + connected-vehicle / OT segmentation review",
      outcome:
        "ISO 27001 cert issued in 18 weeks · DPDP RoPA mapped for 3 plants · OT/IT zoning hardened to IEC-62443 LSL-3.",
    },
    stats: [
      { value: "55+", label: "Pune engagements" },
      { value: "3 hr", label: "Drive from Mumbai BKC" },
      { value: "Hinjewadi", label: "IT focus" },
      { value: "Chakan", label: "Auto focus" },
    ],
    delivery:
      "Mumbai BKC → Pune is a 3-hour drive (or 30-minute Pune flight). Senior consultants drive over for kickoff and onsite testing days, return same-evening, and run remote VAPT + reporting through the week. For multi-week programs we maintain a Pune-based lead consultant.",
    faqs: [
      {
        q: "How quickly can you be onsite in Hinjewadi or Magarpatta?",
        a: "Same-day for kickoff if requested before noon. We drive from Mumbai BKC (3 hours) and can be in any Hinjewadi, Magarpatta, Kharadi or Chakan client site by lunchtime.",
      },
      {
        q: "Do you handle Pune auto-industry OT/ICS reviews?",
        a: "Yes — IEC-62443-aligned OT segmentation reviews, supplier-network attack-surface assessments and OT-specific incident response. We work alongside auto OEMs and Tier-1 suppliers across Chakan, Talegaon and Ranjangaon.",
      },
      {
        q: "Can you train Pune-based corporate cohorts?",
        a: "Yes. Macksofy delivers corporate CEH, OSCP and SOC Analyst cohorts onsite at client offices in Hinjewadi and Magarpatta. We've trained engineering teams at IT services majors and product companies across the city.",
      },
    ],
    seoDescription:
      "CERT-In empanelled cybersecurity services in Pune. VAPT, ISO 27001, SOC 2, OT/ICS audits and corporate training for Pune IT, auto, edtech and BPO clients. Mumbai BKC-anchored team, same-day onsite.",
    extraKeywords: [
      "cybersecurity Pune",
      "VAPT Hinjewadi",
      "Pune OT security Chakan",
      "CERT-In auditor Pune",
      "ISO 27001 consultant Pune",
      "Pune corporate cybersecurity training",
      "edtech security Pune",
    ],
    geo: { lat: 18.5204, lng: 73.8567 },
    mapQuery: "Hinjewadi, Pune, Maharashtra",
  },

  // ==================================================================
  // TIER-2 INDIA METROS — added to close Kratikal's NCR + GIFT lead
  // ==================================================================
  {
    slug: "noida",
    name: "Noida",
    state: "Uttar Pradesh",
    category: "Tech capital",
    hero: {
      eyebrow: "Cybersecurity in Noida · NCR tech belt · BFSI ops · Government adjacent",
      headline: "Noida cybersecurity for the NCR tech and BFSI belt.",
      description:
        "Macksofy delivers CERT-In empanelled VAPT, regulator-format audits and corporate training to Noida and Greater Noida — from Sector 18 fintechs and the Yotta data centre cluster to NCR\u2019s largest IT-services GCCs.",
    },
    cityContext: [
      "Noida + Greater Noida sits at the centre of India\u2019s most concentrated cybersecurity buyer market: IT-services majors with delivery centres, fintech and BFSI back-offices, captive banking ops for foreign-bank GCCs, the Yotta NM1 hyperscale data centre, the Jewar airport build-out, and a fast-growing edtech and SaaS cluster across Sectors 16 and 62.",
      "Buyers here are sophisticated — most run their own SOC and Risk teams and ask for CERT-In format VAPT, ISO 27001 + SOC 2 dual audits, and DPDP readiness in the same engagement. Greenfield work (Jewar logistics, Yotta tenants, new fintech licences) generates a steady stream of clean-slate ISMS implementations.",
      "Macksofy services Noida through senior consultants who fly Mumbai \u2192 Delhi and drive over from IGI / Aerocity, or operate from our partner Gurugram coordination point. Same-day onsite is normal for kickoff and exit calls.",
    ],
    regulators: [
      "MeitY · CERT-In",
      "RBI (NBFC, payment-aggregator and PA-PG licensees)",
      "SEBI (Noida-headquartered AMCs and brokers)",
      "UIDAI (Aadhaar AUA/KUA in Noida BPOs)",
      "DPDP Board",
    ],
    industries: [
      "IT services + GCCs",
      "Fintech + lending",
      "Banking & captive operations",
      "Data-centre operators",
      "E-commerce + D2C",
      "Edtech + SaaS",
    ],
    topServices: [
      "vapt",
      "penetration-testing",
      "cloud-security",
      "managed-soc",
      "web-application-security",
      "red-teaming",
    ],
    topAudits: [
      "cert-in-empanelled-audit",
      "iso-27001",
      "soc-2",
      "rbi-csf",
      "dpdp-act",
      "pci-dss",
    ],
    caseStudy: {
      industry: "Noida-headquartered Payment Aggregator (RBI licensee)",
      scope:
        "RBI PA-PG audit + CERT-In VAPT (50 internet-facing apps) + DPDP RoPA + PCI-DSS SAQ-D readiness",
      outcome:
        "RBI PA-PG submission accepted first read; 14 highs + 26 mediums closed in 6 weeks; DPDP RoPA covering 11 systems; PCI v4.0 SAQ-D readiness pack delivered.",
    },
    stats: [
      { value: "40+", label: "Noida engagements" },
      { value: "Mumbai BKC", label: "Anchor team" },
      { value: "Sec 18 / 62", label: "Buyer concentration" },
      { value: "Yotta NM1", label: "Data-centre presence" },
    ],
    delivery:
      "Senior consultants fly Mumbai \u2192 Delhi (2 hr) and reach any Noida sector in 45-90 minutes via Yamuna or DND. We maintain a Gurugram \u2194 Noida coordination cadence so multi-site NCR engagements share a single tech lead. Standard onsite + remote split: 30% / 70%.",
    faqs: [
      {
        q: "Can you cover Noida + Gurugram in one NCR engagement?",
        a: "Yes \u2014 most of our NCR-headquartered clients buy NCR-wide coverage. A single Macksofy tech lead manages both metros with shared evidence and a single audit pack. We do not double-charge mobilisation.",
      },
      {
        q: "Do you support Yotta NM1 or other Noida data-centre tenants?",
        a: "Yes. We deliver tenant-side VAPT and shared-responsibility audits for clients colocated in Yotta NM1 and the adjacent CtrlS Noida facility, including data-centre interconnect and management-plane reviews.",
      },
      {
        q: "How quickly can you mobilise for a critical Noida incident?",
        a: "Senior IR consultant on the next Mumbai \u2192 Delhi flight (within 4-6 hours). Remote triage starts immediately via secure bridge. Most Noida clients use Macksofy as their preferred IR retainer.",
      },
    ],
    seoDescription:
      "CERT-In empanelled cybersecurity services in Noida + Greater Noida. VAPT, ISO 27001, SOC 2, RBI PA-PG, DPDP and PCI-DSS audits for Noida fintechs, IT services and data-centre tenants.",
    extraKeywords: [
      "cybersecurity Noida",
      "VAPT Noida Sector 62",
      "CERT-In auditor Noida",
      "ISO 27001 consultant Noida",
      "RBI PA-PG audit Noida",
      "Greater Noida penetration testing",
      "Yotta tenant security audit",
      "cybersecurity Sector 18 Noida",
    ],
    geo: { lat: 28.5355, lng: 77.3910 },
    mapQuery: "Sector 18, Noida, Uttar Pradesh",
  },

  {
    slug: "gurugram",
    name: "Gurugram",
    state: "Haryana",
    category: "BFSI capital",
    hero: {
      eyebrow: "Cybersecurity in Gurugram · Cyber City · BFSI HQs · GCCs",
      headline: "Gurugram cybersecurity for the BFSI and GCC corridor.",
      description:
        "Cyber City, Udyog Vihar, Golf Course Road, Sohna and DLF Phases 1\u20135 \u2014 Macksofy delivers CERT-In empanelled VAPT, RBI / IRDAI audits and adversary simulation engagements for the densest BFSI and global-capability-centre cluster in NCR.",
    },
    cityContext: [
      "Gurugram is India\u2019s second BFSI capital after Mumbai \u2014 head offices for top private banks, every major insurer, the largest fintechs (Paytm, PolicyBazaar, MakeMyTrip group), and over 600 global capability centres (Deloitte, Accenture, KPMG, EY, Genpact). Cybersecurity spend per buyer is among the highest in India.",
      "Buying intent is sophisticated: CERT-In + RBI CSF + ISO 27001 + SOC 2 + PCI-DSS in one composite audit, red-team-style adversary simulation against EDR, and DPDP Act readiness across customer + employee data flows. Many Gurugram CISOs sit on board sub-committees and demand evidence-grade reports.",
      "Macksofy\u2019s Gurugram delivery is anchored from Mumbai BKC senior consultants who fly in for kickoff, sprint reviews and major findings. Remote VAPT runs through the week. For multi-quarter engagements we maintain an embedded Gurugram tech lead.",
    ],
    regulators: [
      "MeitY · CERT-In",
      "RBI (private-bank HQs + NBFCs + fintech)",
      "IRDAI (top insurer HQs in DLF + Udyog Vihar)",
      "SEBI (Gurugram-headquartered AMCs and brokers)",
      "Haryana State Cyber Cell",
      "DPDP Board",
    ],
    industries: [
      "Private banking + NBFC HQs",
      "Insurance HQs",
      "Fintech + payments + lending",
      "Global capability centres",
      "Consulting + Big-4 / professional services",
      "Travel + e-commerce HQs",
    ],
    topServices: [
      "red-teaming",
      "penetration-testing",
      "vapt",
      "managed-soc",
      "cloud-security",
      "digital-forensics-incident-response",
    ],
    topAudits: [
      "cert-in-empanelled-audit",
      "rbi-csf",
      "iso-27001",
      "soc-2",
      "irdai-compliance",
      "pci-dss",
      "dpdp-act",
    ],
    caseStudy: {
      industry: "Gurugram-headquartered Private Bank",
      scope:
        "8-week red-team engagement \u2014 objective: reach core banking jump host without SOC detection by D+5; companion CERT-In VAPT scoping 6 internet-facing apps + AD forest.",
      outcome:
        "Initial access via spear-phish against treasury; lateral via ADCS misconfiguration; jump-host compromise at D+7. 11 missed alerts mapped to SIEM rule gaps; 4 detection use-cases written by Macksofy and adopted by bank SOC.",
    },
    stats: [
      { value: "65+", label: "Gurugram engagements" },
      { value: "DLF Cyber City", label: "BFSI concentration" },
      { value: "600+", label: "GCCs in city" },
      { value: "Mumbai BKC", label: "Anchor team" },
    ],
    delivery:
      "Mumbai \u2192 Delhi flight + Aerocity \u2192 Gurugram drive (45 min total time on a good day). Senior tech leads onsite for kickoff, mid-engagement reviews, exit calls and major findings. Most VAPT, code-review and audit-evidence work runs remote through the week.",
    faqs: [
      {
        q: "Do you have experience with the Gurugram private-bank red-team standard?",
        a: "Yes \u2014 we have delivered multi-week TIBER-style red teams for two Gurugram-headquartered private banks, with objectives ranging from silent domain admin to crown-jewel exfil simulation. Engagements are scoped against the bank\u2019s threat-intel feed.",
      },
      {
        q: "Can you handle joint RBI + PCI + ISO 27001 + SOC 2 in one engagement?",
        a: "Yes \u2014 most Gurugram private banks and fintechs we work with run all four together. Macksofy uses one unified control register that satisfies each regulator\u2019s clause IDs, so evidence collection happens once and gets re-presented per framework.",
      },
      {
        q: "Do you support 24x7 IR retainers for Gurugram BFSI clients?",
        a: "Yes. Macksofy maintains IR retainers for several Gurugram BFSI clients with SLA-bound response (next flight or remote-first triage) plus quarterly tabletop exercises and an annual cyber-crisis drill.",
      },
    ],
    seoDescription:
      "CERT-In empanelled cybersecurity services in Gurugram. RBI / IRDAI / PCI / SOC 2 audits and red-team engagements for Gurugram BFSI HQs, GCCs and Cyber City fintech.",
    extraKeywords: [
      "cybersecurity Gurugram",
      "VAPT Cyber City Gurgaon",
      "RBI audit Gurugram",
      "red team services Gurugram",
      "CERT-In auditor Gurugram",
      "fintech security Gurgaon",
      "GCC penetration testing Gurugram",
      "DLF Phase 3 cybersecurity",
    ],
    geo: { lat: 28.4595, lng: 77.0266 },
    mapQuery: "DLF Cyber City, Gurugram, Haryana",
  },

  {
    slug: "ahmedabad",
    name: "Ahmedabad",
    state: "Gujarat",
    category: "BFSI capital",
    hero: {
      eyebrow: "Cybersecurity in Ahmedabad · GIFT City IFSC · Pharma · Textiles",
      headline: "Ahmedabad + GIFT City cybersecurity for IFSC-licensed BFSI.",
      description:
        "Macksofy services Ahmedabad and GIFT City Gandhinagar \u2014 India\u2019s only operational International Financial Services Centre \u2014 with CERT-In empanelled VAPT, IFSCA-aligned cyber audits and DPDP readiness for India\u2019s fastest-growing offshore finance and reinsurance cluster.",
    },
    cityContext: [
      "GIFT City (Gujarat International Finance Tec-City) is the single most active greenfield BFSI build in India \u2014 IFSCA-regulated international banking units, NSE IFSC and India INX exchanges, foreign-currency derivatives, aircraft leasing, reinsurance and fintech sandboxes. Every IFSC banking unit, brokerage and reinsurer needs an IFSCA-aligned cyber-security and operational-resilience programme.",
      "Outside GIFT, Ahmedabad city itself is a top-5 Indian pharma cluster (Zydus, Torrent, Cadila, Intas), textile manufacturing, large-format retail (D-Mart HQ), and a fast-growing fintech corridor along SG Highway and Bopal. Each segment has its own cyber-risk profile.",
      "Macksofy delivers Ahmedabad through senior consultants flying Mumbai \u2192 Ahmedabad (1 hour) for kickoff and major reviews \u2014 GIFT City sites are 30 minutes from the airport. Pharma plant OT reviews are scheduled around shift changes and run through the week.",
    ],
    regulators: [
      "IFSCA (International Financial Services Centres Authority \u2014 IBU, IFSC capital markets, reinsurance)",
      "MeitY · CERT-In",
      "RBI (Ahmedabad-headquartered NBFCs and co-operative banks)",
      "SEBI (NSE IFSC, India INX participants)",
      "DPDP Board",
      "USFDA + CDSCO (for pharma 21 CFR Part 11)",
    ],
    industries: [
      "GIFT IFSC banking units",
      "GIFT IFSC capital markets",
      "Reinsurance + offshore insurance",
      "Pharma + life sciences",
      "Textile + apparel manufacturing",
      "Co-operative banks + NBFCs",
    ],
    topServices: [
      "vapt",
      "penetration-testing",
      "cloud-security",
      "managed-soc",
      "web-application-security",
      "digital-forensics-incident-response",
    ],
    topAudits: [
      "cert-in-empanelled-audit",
      "iso-27001",
      "rbi-csf",
      "soc-2",
      "dpdp-act",
      "pci-dss",
      "hipaa",
    ],
    caseStudy: {
      industry: "GIFT IFSC Banking Unit (IBU)",
      scope:
        "IFSCA cyber-resilience audit + CERT-In VAPT (4 internet-facing apps + 2 IFSC trading systems) + ISO 27001 implementation + DR drill",
      outcome:
        "IFSCA cyber-resilience report accepted on first read; ISO 27001 cert issued in 16 weeks; 23 highs + 41 mediums closed; live IFSC failover-DR drill at RTO of 27 min vs target 60 min.",
    },
    stats: [
      { value: "25+", label: "Ahmedabad + GIFT engagements" },
      { value: "1 hr", label: "Flight from Mumbai" },
      { value: "GIFT IFSC", label: "Offshore finance focus" },
      { value: "IFSCA", label: "Primary regulator" },
    ],
    delivery:
      "Mumbai \u2192 Ahmedabad is a 1-hour flight. Senior consultants reach GIFT City sites within 90 minutes of landing. For GIFT IFSC banks we coordinate quarterly onsite cycles aligned with the IBU\u2019s board cyber-committee cadence; pharma OT work runs around plant shift schedules.",
    faqs: [
      {
        q: "Do you understand IFSCA cyber expectations vs RBI / SEBI?",
        a: "Yes. The IFSC cyber framework is built on RBI + SEBI baselines but adds specific operational-resilience, cross-border data and trading-system clauses unique to IFSC operations. Macksofy maintains a separate IFSCA control register and submission template alongside our RBI and SEBI packs.",
      },
      {
        q: "Can you support GIFT IFSC reinsurance entities?",
        a: "Yes \u2014 we have engagement experience with IFSC reinsurers and their bordereau-reporting platforms. Audit scope typically covers reinsurance settlement systems, counterparty-data flows and policyholder-data residency under IFSCA + DPDP overlays.",
      },
      {
        q: "Do you cover pharma 21 CFR Part 11 audits in Ahmedabad?",
        a: "Yes \u2014 audit-trail integrity, electronic signatures, access controls and validation for GxP systems in Ahmedabad pharma majors. We work alongside the client\u2019s QA / Validation team and produce USFDA-inspector-format evidence packs.",
      },
    ],
    seoDescription:
      "CERT-In empanelled cybersecurity services in Ahmedabad + GIFT City. IFSCA cyber audits, VAPT, ISO 27001, SOC 2 and DPDP for IFSC banking units, pharma and BFSI.",
    extraKeywords: [
      "cybersecurity Ahmedabad",
      "VAPT GIFT City",
      "IFSCA cyber audit",
      "GIFT IFSC banking cyber security",
      "CERT-In auditor Ahmedabad",
      "pharma 21 CFR Part 11 audit Ahmedabad",
      "Gandhinagar cybersecurity",
      "ISO 27001 consultant Gujarat",
    ],
    geo: { lat: 23.0225, lng: 72.5714 },
    mapQuery: "GIFT City, Gandhinagar, Gujarat",
  },

  // ==================================================================
  // UAE — country umbrella + Dubai emirate (closes Help AG\u2019s lead)
  // ==================================================================
  {
    slug: "uae",
    name: "UAE",
    state: "United Arab Emirates",
    category: "Mixed",
    hero: {
      eyebrow: "Cybersecurity in UAE \u00b7 NESA \u00b7 ADHICS \u00b7 ISR \u00b7 SAMA-adjacent",
      headline: "UAE cybersecurity \u2014 federal + Dubai + Abu Dhabi regulator coverage.",
      description:
        "Macksofy delivers cybersecurity audits, VAPT and DPDP / UAE PDPL programmes across the Emirates \u2014 UAE Information Assurance (IA) framework, ADHICS healthcare, Dubai DESC ISR and Federal PDPL. CERT-In + ISO 27001 lead-auditor heritage adapted to UAE regulator format.",
    },
    cityContext: [
      "The UAE\u2019s cybersecurity regulatory stack is layered: a Federal Personal Data Protection Law (PDPL 2021) plus emirate-level frameworks \u2014 NESA / UAE IA Standards at the federal level, the Dubai Electronic Security Centre\u2019s ISR Standard for any Dubai government entity, and the Abu Dhabi Health Information and Cyber Security (ADHICS) standard for healthcare. Adjacent KSA (SAMA CSF + NCA ECC-2) often appears in the same engagement scope for GCC-spread enterprises.",
      "Macksofy has built UAE-format submission packs for BFSI, healthcare, government-adjacent and SaaS clients across Dubai, Abu Dhabi and Sharjah. Our delivery model anchors from Mumbai BKC with senior consultants flying Mumbai \u2192 Dubai (3 hours) for kickoff, key reviews and exit briefings. For multi-quarter UAE engagements we maintain an embedded UAE lead consultant.",
      "The UAE market values evidence quality and regulator-format outputs over volume \u2014 audits run leaner and longer than India equivalents, and the relationship between auditor and the regulator (DESC, TDRA, DHA, ADDA) matters. Macksofy operates in this style.",
    ],
    regulators: [
      "TDRA \u00b7 NESA / UAE Information Assurance Standards",
      "Federal PDPL 2021 \u00b7 UAE Data Office",
      "Dubai Electronic Security Centre (DESC) \u00b7 ISR Standard",
      "ADHICS (Abu Dhabi Department of Health) for healthcare",
      "Central Bank of UAE (CBUAE) cyber expectations for banks",
      "Adjacent KSA \u2014 SAMA CSF, NCA ECC-2 (for GCC-spread enterprises)",
    ],
    industries: [
      "Banking + Islamic finance",
      "Insurance + takaful",
      "Healthcare + hospitals (ADHICS scope)",
      "Government + smart-city / Smart Dubai",
      "Oil & gas + petrochemical (OT)",
      "Hospitality + retail",
      "SaaS + fintech (DIFC, ADGM)",
    ],
    topServices: [
      "vapt",
      "penetration-testing",
      "red-teaming",
      "cloud-security",
      "managed-soc",
      "web-application-security",
      "digital-forensics-incident-response",
    ],
    topAudits: [
      "cert-in-empanelled-audit",
      "iso-27001",
      "iso-27017",
      "iso-27018",
      "iso-27701",
      "soc-2",
      "pci-dss",
      "hipaa",
      "gdpr",
    ],
    caseStudy: {
      industry: "UAE-based Insurance Group (Dubai + Abu Dhabi presence)",
      scope:
        "NESA UAE IA Standards alignment + DESC ISR pack for Dubai entity + ADHICS gap analysis for medical-claims platform + DPDP / UAE PDPL RoPA",
      outcome:
        "NESA Tier-3 control posture evidenced across 7 systems; Dubai ISR submission accepted on first read; ADHICS gap closure roadmap delivered; PDPL RoPA covering 11 processing activities and 4 cross-border transfers.",
    },
    stats: [
      { value: "18+", label: "UAE engagements" },
      { value: "3 hr", label: "Flight Mumbai \u2192 Dubai" },
      { value: "NESA / ADHICS / DESC", label: "Frameworks covered" },
      { value: "DIFC / ADGM", label: "Free-zone experience" },
    ],
    delivery:
      "Mumbai BKC senior consultants fly Mumbai \u2192 Dubai (3 hours) for kickoff, sprint reviews and major findings. Quarterly onsite cadence works for most UAE BFSI and healthcare clients; VAPT, audit-evidence and reporting run remote through the week. For multi-year programmes we embed a UAE-resident lead consultant.",
    faqs: [
      {
        q: "Can you deliver NESA / UAE IA Standards audits?",
        a: "Yes. We map controls against the NESA / UAE IA Standards (TDRA published framework) for both critical-information-infrastructure scope and the broader government / financial-sector applicability. Submission packs follow the regulator\u2019s preferred format.",
      },
      {
        q: "Do you support Dubai DESC ISR submissions?",
        a: "Yes \u2014 Macksofy has supported Dubai-government-adjacent entities through the Information Security Regulation (ISR) audit lifecycle, from gap assessment to evidence pack to DESC submission and post-submission Q&A.",
      },
      {
        q: "How does UAE PDPL compare to DPDP and GDPR?",
        a: "UAE Federal PDPL borrows from GDPR (lawful-basis, subject rights, breach notification) but with specific UAE-context provisions \u2014 cross-border transfer mechanisms, sectoral data offices, and Arabic-language notice obligations. Macksofy treats PDPL + DPDP + GDPR as one unified register where possible.",
      },
      {
        q: "Do you cover Saudi (SAMA CSF / NCA ECC-2) alongside UAE engagements?",
        a: "Yes for GCC-spread enterprises. We deliver SAMA CSF audits for KSA-headquartered banks and NCA ECC-2 assessments for entities under Saudi NCA scope. Most GCC-wide engagements consolidate UAE + KSA + Bahrain controls into one composite audit.",
      },
    ],
    seoDescription:
      "Cybersecurity services in the UAE \u2014 NESA, DESC ISR, ADHICS and Federal PDPL audits, VAPT and red-team engagements for Dubai, Abu Dhabi and Sharjah BFSI, healthcare and government.",
    extraKeywords: [
      "cybersecurity UAE",
      "NESA audit UAE",
      "UAE PDPL compliance",
      "DESC ISR Dubai audit",
      "ADHICS audit Abu Dhabi",
      "VAPT services UAE",
      "ISO 27001 consultant UAE",
      "SAMA CSF KSA audit",
      "DIFC ADGM cybersecurity",
      "Dubai red team",
    ],
    geo: { lat: 25.2048, lng: 55.2708 },
    mapQuery: "Dubai, United Arab Emirates",
  },

  {
    slug: "dubai",
    name: "Dubai",
    state: "United Arab Emirates",
    category: "BFSI capital",
    hero: {
      eyebrow: "Cybersecurity in Dubai \u00b7 DESC ISR \u00b7 DIFC \u00b7 Smart Dubai",
      headline: "Dubai cybersecurity \u2014 DESC ISR + DIFC + free-zone aligned.",
      description:
        "Macksofy services Dubai with DESC ISR-aligned audits, DIFC Data Protection Law programmes, NESA-format VAPT and red-team engagements \u2014 across BFSI, hospitality, smart-city operators and SaaS clients in Internet City, JLT, DIFC and Business Bay.",
    },
    cityContext: [
      "Dubai is the highest-density cybersecurity buyer in the Middle East \u2014 most foreign-bank regional HQs, the DIFC financial free zone with its own Data Protection Law and DFSA regulator, the world\u2019s biggest IT services + consulting cluster outside the US (Internet City, Dubai Media City, JLT), and government-adjacent Smart Dubai initiatives. Every Dubai-domiciled entity also falls under the federal layer (NESA, PDPL) and the emirate layer (DESC ISR).",
      "Buyer intent is sophisticated and audit-quality-conscious \u2014 evidence packs are read line-by-line; relationships with the regulator (DESC, TDRA, DFSA) matter; report format must follow the emirate\u2019s preferred template. Most Dubai-based clients run quarterly onsite cadences plus an annual deep-dive.",
      "Macksofy delivers Dubai through senior consultants flying Mumbai BKC \u2192 DXB (3 hours) for kickoff and major reviews \u2014 most Dubai client sites are 20-30 minutes from DXB. For multi-quarter Dubai programmes we maintain an embedded Dubai-resident tech lead with a local mobile and visiting-base in DIFC.",
    ],
    regulators: [
      "Dubai Electronic Security Centre (DESC) \u00b7 ISR Standard",
      "TDRA \u00b7 NESA / UAE IA Standards",
      "DIFC Data Protection Law + DFSA cyber expectations",
      "Federal PDPL 2021 \u00b7 UAE Data Office",
      "Smart Dubai / Dubai Digital Authority guidelines",
      "Central Bank of UAE \u2014 banking cyber expectations",
    ],
    industries: [
      "Foreign-bank regional HQs",
      "DIFC + free-zone fintech",
      "Insurance + takaful",
      "Hospitality + retail (Emaar, Damac, Majid Al Futtaim)",
      "Government / Smart Dubai operators",
      "SaaS + cloud-native scale-ups",
      "Airlines + logistics",
    ],
    topServices: [
      "vapt",
      "penetration-testing",
      "red-teaming",
      "cloud-security",
      "managed-soc",
      "web-application-security",
      "digital-forensics-incident-response",
    ],
    topAudits: [
      "cert-in-empanelled-audit",
      "iso-27001",
      "iso-27017",
      "iso-27018",
      "iso-27701",
      "soc-2",
      "pci-dss",
      "gdpr",
    ],
    caseStudy: {
      industry: "DIFC-licensed Fintech (Dubai-headquartered)",
      scope:
        "DESC ISR submission pack + DIFC Data Protection Law DPIA + DFSA cyber-resilience self-assessment + CERT-In format VAPT for 7 internet-facing apps and 1 partner-integration API",
      outcome:
        "DESC ISR submission accepted first read; DIFC DP-Law DPIA covering 14 processing activities; DFSA cyber self-assessment evidence pack delivered; 12 highs + 28 mediums closed in 8 weeks.",
    },
    stats: [
      { value: "Mumbai \u2192 DXB", label: "3-hour flight" },
      { value: "DIFC + JLT", label: "BFSI density" },
      { value: "DESC ISR", label: "Primary emirate audit" },
      { value: "Internet City", label: "Tech-buyer cluster" },
    ],
    delivery:
      "Mumbai \u2192 DXB is a 3-hour flight. Senior consultants reach DIFC, Business Bay or Internet City in 20-30 minutes from the airport. Quarterly onsite cycles work for most Dubai BFSI and fintech clients; remote VAPT and audit-evidence work runs through the week. For sustained programmes we maintain an embedded Dubai-resident tech lead.",
    faqs: [
      {
        q: "Do you understand DESC ISR submission format?",
        a: "Yes \u2014 Macksofy has delivered DESC Information Security Regulation (ISR) audits and submission packs for Dubai-government-adjacent and BFSI clients. We maintain the latest ISR control mapping and submission templates so evidence collection happens in the format DESC reads.",
      },
      {
        q: "Can you cover DIFC Data Protection Law alongside Federal PDPL?",
        a: "Yes. DIFC Data Protection Law and UAE Federal PDPL overlap but the DIFC regime has its own commissioner, registration regime and breach-notification format. We maintain a unified register that satisfies both \u2014 evidence collected once, presented in each format.",
      },
      {
        q: "Do you run red-team engagements in Dubai?",
        a: "Yes. We deliver Dubai-scope red-team engagements with objectives aligned to threat actors active in the region (FIN8-style financial actors, regional APTs targeting energy / government). Scope and rules-of-engagement are agreed with the client white-cell ahead of every engagement.",
      },
      {
        q: "Do you support Dubai\u2019s smart-city operator ecosystem?",
        a: "Yes \u2014 Smart Dubai initiatives, government-portal operators and digital-identity (UAE PASS) integrators. We deliver NESA / DESC-aligned cyber audits for these operators with attention to citizen-data residency and cross-tenant isolation.",
      },
    ],
    seoDescription:
      "CERT-In empanelled cybersecurity services in Dubai. DESC ISR audits, DIFC Data Protection Law, NESA-format VAPT and red-team engagements for Dubai BFSI, fintech and government.",
    extraKeywords: [
      "cybersecurity Dubai",
      "DESC ISR audit Dubai",
      "DIFC data protection law audit",
      "VAPT services Dubai",
      "Dubai red team",
      "NESA audit Dubai",
      "DFSA cyber resilience",
      "Internet City cybersecurity",
      "JLT cybersecurity firm",
      "Business Bay cybersecurity audit",
    ],
    geo: { lat: 25.2048, lng: 55.2708 },
    mapQuery: "DIFC, Dubai, United Arab Emirates",
  },
];

export const getCityBySlug = (slug: string) =>
  CITIES.find((c) => c.slug === slug);
