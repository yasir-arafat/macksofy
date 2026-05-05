export type CourseLevel = "Foundation" | "Intermediate" | "Professional";
export type CourseVendor = "EC-Council" | "OffSec" | "CompTIA" | "Mile2" | "Macksofy";

export interface Course {
  slug: string;
  code: string;
  title: string;
  shortTitle: string;
  level: CourseLevel;
  vendor: CourseVendor;
  /** Local path under /public, e.g. "/courses/CEH.jpg" */
  image: string;
  duration: string;
  format: string;
  priceINR?: number;
  originalPriceINR?: number;
  discountPercent?: number;
  popular?: boolean;
  hero: {
    eyebrow: string;
    tagline: string;
    description: string;
  };
  whoIsItFor: string[];
  prerequisites: string[];
  outcomes: string[];
  curriculum: { module: string; durationHours?: number; topics: string[] }[];
  toolsCovered: string[];
  careerRoles: { role: string; salaryINR: string; experience: string }[];
  placement: {
    summary: string;
    points: string[];
  };
  testimonials: { name: string; role: string; quote: string }[];
  faqs: { q: string; a: string }[];
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

// Default placement block reused by leaner course entries.
const STD_PLACEMENT = {
  summary:
    "Macksofy's placement desk works directly with 80+ hiring partners across India and the UAE. Resume coaching, mock interviews and direct intros included.",
  points: [
    "1:1 resume + LinkedIn rewrite with our hiring desk",
    "Mock interviews with active practitioners",
    "Direct intros to BFSI, fintech and Big-4 partners",
    "UAE placement support (Dubai, Abu Dhabi)",
  ],
};

export const COURSES: Course[] = [
  // ============================================================
  // EC-COUNCIL
  // ============================================================
  {
    slug: "ceh",
    code: "CEH v13",
    title: "Certified Ethical Hacker (CEH v13) — AI-Powered",
    shortTitle: "CEH",
    level: "Foundation",
    vendor: "EC-Council",
    image: "/courses/CEH.jpg",
    duration: "40 hours · 5 days intensive or 8 weekends",
    format: "Live instructor-led · Online + Mumbai BKC classroom",
    priceINR: 50000,
    popular: true,
    hero: {
      eyebrow: "EC-Council Authorized Training Center",
      tagline: "Learn to think like the attacker.",
      description:
        "CEH v13 is the world's most recognized ethical-hacking certification — and the first version to integrate AI across every attack domain. Macksofy delivers it through 100% practical labs in EC-Council's iLabs cyber range, with mentorship that continues until you clear the exam.",
    },
    whoIsItFor: [
      "Aspiring penetration testers and red-team operators",
      "SOC analysts who need offensive context to write better detections",
      "Network and system administrators moving into security",
      "Engineering students preparing for a cybersecurity career",
    ],
    prerequisites: [
      "Working knowledge of TCP/IP, OSI model, common protocols",
      "Comfort with Linux and Windows command lines",
      "No prior hacking experience required — we cover the basics",
    ],
    outcomes: [
      "Run end-to-end recon, scanning and enumeration on real targets",
      "Exploit OWASP Top 10 web vulnerabilities and modern privilege escalation",
      "Use AI-driven offense (LLMs, prompt injection, AI-assisted recon) covered in v13",
      "Pass the EC-Council CEH v13 (312-50) exam on the first attempt",
    ],
    // Aligned to official EC-Council CEH v13 syllabus — 20 modules.
    curriculum: [
      { module: "Module 01 · Introduction to Ethical Hacking", topics: ["Information security overview", "Cyber kill chain & MITRE ATT&CK", "Hacker classes, attack vectors, IoCs", "Information security laws — Indian IT Act 2000, UAE cyber law"] },
      { module: "Module 02 · Footprinting and Reconnaissance", topics: ["Active vs passive footprinting", "OSINT — theHarvester, Maltego, Shodan, Censys", "WHOIS, DNS, network footprinting", "Email, web, social-media footprinting"] },
      { module: "Module 03 · Scanning Networks", topics: ["Network scanning concepts", "Nmap deep-dive — NSE, scan timing, evasion", "Banner grabbing, OS fingerprinting", "Drawing network diagrams"] },
      { module: "Module 04 · Enumeration", topics: ["NetBIOS, SNMP, LDAP, SMTP enumeration", "DNS, NFS, NTP, IPv6 enumeration", "Active Directory enumeration basics"] },
      { module: "Module 05 · Vulnerability Analysis", topics: ["Vulnerability classification & CVSS 3.1", "Vulnerability assessment lifecycle", "Tools — Nessus, OpenVAS, Nikto, Qualys"] },
      { module: "Module 06 · System Hacking", topics: ["Password cracking — Hashcat, John the Ripper", "Privilege escalation (Linux + Windows)", "Maintaining access, covering tracks", "Steganography & rootkits"] },
      { module: "Module 07 · Malware Threats", topics: ["Malware concepts, APT, fileless malware", "Trojan / virus / worm / ransomware analysis", "Static + dynamic malware analysis basics", "Anti-malware countermeasures"] },
      { module: "Module 08 · Sniffing", topics: ["Packet sniffing — Wireshark, tcpdump", "MAC flooding, DHCP / ARP / DNS spoofing", "Bettercap MITM workflows", "Sniffing detection & countermeasures"] },
      { module: "Module 09 · Social Engineering", topics: ["Human-based, computer-based, mobile-based vectors", "Phishing simulation with GoPhish", "Insider threats & identity theft"] },
      { module: "Module 10 · Denial-of-Service", topics: ["Volumetric, protocol, application-layer DoS", "DDoS botnets and reflection attacks", "Mitigation strategies"] },
      { module: "Module 11 · Session Hijacking", topics: ["Application-layer (web) session hijacking", "Network-layer hijacking — TCP/IP, MITM", "Tools — Burp, ZAP — and detection"] },
      { module: "Module 12 · Evading IDS, Firewalls & Honeypots", topics: ["IDS / IPS evasion techniques", "Firewall bypass — fragmentation, tunneling", "Honeypot detection"] },
      { module: "Module 13 · Hacking Web Servers", topics: ["Web-server architecture and attack surface", "Misconfiguration, directory traversal, source-code disclosure", "Patch management and hardening"] },
      { module: "Module 14 · Hacking Web Applications", topics: ["OWASP Top 10 hands-on — XSS, IDOR, SSRF, XXE, deserialization", "Burp Suite Pro — proxy, repeater, intruder, extensions", "API testing (REST + GraphQL)", "Authentication / session-management attacks"] },
      { module: "Module 15 · SQL Injection", topics: ["In-band, blind, time-based, second-order SQLi", "sqlmap automation and manual exploitation", "WAF bypass techniques"] },
      { module: "Module 16 · Hacking Wireless Networks", topics: ["802.11 fundamentals", "WEP / WPA / WPA2 / WPA3 attacks", "Aircrack-ng suite + Hashcat handshake cracking", "Evil twin, KARMA, enterprise EAP attacks"] },
      { module: "Module 17 · Hacking Mobile Platforms", topics: ["Android architecture + reversing — Frida, Objection", "iOS attack surface", "OWASP MASVS basics", "Mobile device management bypass"] },
      { module: "Module 18 · IoT and OT Hacking", topics: ["IoT attack surface — firmware, BLE, ZigBee", "OT / SCADA introduction — Modbus, DNP3", "IoT firmware extraction (binwalk)"] },
      { module: "Module 19 · Cloud Computing", topics: ["AWS / Azure / GCP attack chains", "Container & K8s escapes", "Serverless attacks", "Cloud-native pentest tooling — Pacu, ScoutSuite"] },
      { module: "Module 20 · Cryptography + AI-Driven Offense (v13)", topics: ["Symmetric / asymmetric crypto attacks", "PKI, hashing, certificate pinning", "AI-assisted recon, prompt injection, LLM jailbreaks (NEW v13)", "Defensive AI controls"] },
      { module: "Capstone · Exam preparation + mock CEH (Macksofy)", durationHours: 6, topics: ["End-to-end engagement on a corporate-grade lab", "Mock CEH exam under timed conditions", "Reporting and documentation"] },
    ],
    toolsCovered: [
      "Nmap", "Burp Suite Pro", "Metasploit", "Hashcat", "John the Ripper",
      "BloodHound", "Frida", "Wireshark", "Bettercap", "Aircrack-ng",
      "Hydra", "Nikto", "GoPhish", "ScoutSuite", "Pacu", "Maltego",
      "Shodan", "Censys",
    ],
    careerRoles: [
      { role: "SOC Analyst (L1 / L2)", salaryINR: "₹4–7 LPA", experience: "0–2 years" },
      { role: "Junior Penetration Tester", salaryINR: "₹6–10 LPA", experience: "1–3 years" },
      { role: "Vulnerability Analyst", salaryINR: "₹6–9 LPA", experience: "1–2 years" },
      { role: "Cybersecurity Consultant", salaryINR: "₹8–12 LPA", experience: "2–4 years" },
    ],
    placement: {
      summary:
        "70%+ of CEH graduates progress into security roles within 6 months. Our placement cell connects you with 80+ hiring partners across India and UAE.",
      points: [
        "1:1 resume and LinkedIn rewrite with our hiring desk",
        "Mock interviews with senior pen-testers (technical + behavioural)",
        "Direct intros to hiring managers at our partner network",
        "Free retake of CEH if you score within 5% of cut score on first attempt",
      ],
    },
    testimonials: [
      { name: "Rohan M.", role: "SOC Analyst, BFSI MNC", quote: "Cleared CEH v13 on first attempt. Macksofy's labs were the difference — I'd already faced everything before exam day." },
      { name: "Priya S.", role: "Cybersecurity Engineer, Hyderabad", quote: "Came in with zero security background. 5 weeks later I was running Burp Suite and Metasploit confidently." },
    ],
    faqs: [
      { q: "Is Macksofy an authorized CEH v13 partner?", a: "Yes. Macksofy Technologies is an EC-Council Accredited Training Center (ATC). You receive official EC-Council courseware, iLabs access for 6 months, and one CEH v13 (312-50) exam voucher." },
      { q: "What is the CEH v13 fee in Mumbai / India?", a: "₹50,000 all-inclusive: training, official courseware, iLabs, exam voucher, and our placement support. EMI options are available." },
      { q: "How is v13 different from v12?", a: "v13 integrates AI throughout — including AI-assisted attack modules and defensive AI controls. The exam structure (125 MCQs, 4 hours) is unchanged." },
      { q: "Does Macksofy guarantee a job?", a: "We don't guarantee placement (no honest training company can), but we connect 70%+ of our graduates with security roles via our hiring network within 6 months." },
      { q: "Can I take the course online?", a: "Yes — every batch is delivered live online (with on-camera trainer interaction) and at our Mumbai BKC center. Recordings are available for revision." },
    ],
    seoTitle: "CEH v13 Training in Mumbai & India | EC-Council ATC | Macksofy",
    seoDescription: "Authorized CEH v13 training in Mumbai with AI-powered curriculum, 100% practical labs, exam voucher and placement support. Live online + classroom batches. ₹50,000.",
    keywords: ["CEH training Mumbai", "CEH v13 India", "ethical hacking course Mumbai", "EC-Council ATC India", "CEH certification India", "best ethical hacking institute India"],
  },

  {
    slug: "ceh-practical",
    code: "CEH Practical",
    title: "CEH Practical — 6-Hour Lab Exam (312-50)",
    shortTitle: "CEH Practical",
    level: "Foundation",
    vendor: "EC-Council",
    image: "/courses/CEH-Practical.jpg",
    duration: "24 hours · 3 days lab marathon",
    format: "Live instructor-led · iLabs cyber range",
    priceINR: 30000,
    hero: {
      eyebrow: "EC-Council Authorized Training Center",
      tagline: "Prove you can do — not just describe.",
      description:
        "CEH Practical is EC-Council's hands-on counterpart to CEH. A 6-hour live exam against 20 challenges in iLabs. Macksofy's 3-day lab marathon prepares you with realistic cyber-range scenarios.",
    },
    whoIsItFor: [
      "CEH-certified professionals chasing CEH Master designation",
      "Junior pen-testers building exam confidence",
      "Anyone who wants the practical credibility CEH theory alone doesn't deliver",
    ],
    prerequisites: ["CEH v12 or v13 certification", "Comfort with Kali Linux tooling"],
    outcomes: [
      "Solve real-world hacking challenges in a live cyber range",
      "Build muscle memory for hands-on assessments",
      "Earn the CEH Master designation when combined with CEH",
    ],
    // CEH Practical mirrors the 20 CEH v13 domains in lab form. 5 lab cycles map to 20 ATT&CK challenges.
    curriculum: [
      { module: "Lab Cycle 01 · Recon, Scanning, Enumeration", topics: ["OSINT challenge tasks", "Nmap NSE scripted enumeration", "SMB / NFS / SNMP / LDAP enumeration", "Vulnerability identification under time pressure"] },
      { module: "Lab Cycle 02 · System Hacking & Privilege Escalation", topics: ["Linux privesc — SUID, sudo, kernel exploits", "Windows privesc — services, scheduled tasks, tokens", "Password cracking with Hashcat & John", "Persistence mechanisms"] },
      { module: "Lab Cycle 03 · Web, SQLi & API Hacking", topics: ["OWASP Top 10 hands-on exploitation", "Manual + sqlmap SQLi workflow", "Burp Suite intruder & repeater drills", "REST API fuzzing"] },
      { module: "Lab Cycle 04 · Wireless, Mobile, IoT", topics: ["WPA2 4-way handshake capture & cracking", "Evil twin & WPS attacks", "Android (Frida / Objection) flag retrieval", "IoT firmware extraction with binwalk"] },
      { module: "Lab Cycle 05 · Cloud + Cryptography + Reporting", topics: ["AWS S3 / IAM misconfiguration challenges", "Cryptographic analysis tasks", "Evidence capture discipline", "Exam-grade documentation under 6-hour pressure"] },
      { module: "Macksofy 3-day lab marathon", topics: ["Two timed mock exams in EC-Council iLabs", "Mentor-driven walkthrough of each ATT&CK challenge", "Speed-drill on the 20 attack domains"] },
    ],
    toolsCovered: ["Nmap", "Burp Suite Pro", "Metasploit", "Hashcat", "Aircrack-ng", "Wireshark"],
    careerRoles: [
      { role: "Junior Pentester", salaryINR: "₹6–10 LPA", experience: "1–3 years" },
      { role: "Vulnerability Analyst", salaryINR: "₹6–9 LPA", experience: "1–2 years" },
    ],
    placement: STD_PLACEMENT,
    testimonials: [],
    faqs: [
      { q: "How is CEH Practical different from CEH?", a: "CEH is a 4-hour MCQ. CEH Practical is a 6-hour lab-based exam with 20 real targets you must compromise." },
      { q: "What is CEH Master?", a: "Passing both CEH and CEH Practical earns you the CEH Master designation, recognized as a stronger credential by employers." },
      { q: "Do you provide the exam voucher?", a: "Yes — fee is inclusive of one CEH Practical exam voucher and lab marathon access." },
    ],
    seoTitle: "CEH Practical Training in Mumbai | Hands-on Exam Prep | Macksofy",
    seoDescription: "Crack CEH Practical with Macksofy's hands-on lab marathon. EC-Council ATC, expert instructors, exam voucher included. ₹30,000.",
    keywords: ["CEH Practical Mumbai", "CEH Master training", "hands-on hacking lab Mumbai", "CEH 312-50 practical India"],
  },

  {
    slug: "chfi",
    code: "CHFI v11",
    title: "Computer Hacking Forensic Investigator (CHFI v11)",
    shortTitle: "CHFI",
    level: "Intermediate",
    vendor: "EC-Council",
    image: "/courses/CHFI.jpg",
    duration: "40 hours · 5 days",
    format: "Live instructor-led · Online + Mumbai BKC",
    priceINR: 30000,
    hero: {
      eyebrow: "EC-Council Authorized Training Center",
      tagline: "Investigate. Reconstruct. Testify.",
      description:
        "CHFI v11 covers digital forensics from disk and memory through mobile, cloud and malware. Macksofy delivers it with industry-standard tools (Autopsy, FTK, Volatility) on real case data — including India-context investigations we've worked on.",
    },
    whoIsItFor: [
      "Law enforcement and government investigators",
      "Corporate IR and DFIR teams",
      "E-discovery analysts and legal-tech professionals",
    ],
    prerequisites: ["IT / security background recommended", "Familiarity with Windows + Linux internals"],
    outcomes: [
      "Conduct forensically sound investigations on disk, memory and network",
      "Perform mobile device and cloud forensics",
      "Produce expert-witness-grade reports",
      "Pass the CHFI v11 (312-49) exam",
    ],
    // Aligned to official EC-Council CHFI v11 syllabus — 16 modules.
    curriculum: [
      { module: "Module 01 · Computer Forensics in Today's World", topics: ["Forensics readiness", "Cybercrime types & investigation roles", "Indian IT Act 2000 + Section 65B Evidence Act", "Forensics lifecycle"] },
      { module: "Module 02 · Computer Forensics Investigation Process", topics: ["Pre-investigation, investigation, post-investigation phases", "Chain of custody documentation", "Evidence collection & preservation"] },
      { module: "Module 03 · Hard Disks and File Systems", topics: ["HDD vs SSD architecture", "NTFS, FAT, ext, APFS, HFS+", "Boot sectors, partition tables", "Disk imaging fundamentals"] },
      { module: "Module 04 · Data Acquisition and Duplication", topics: ["Live vs static acquisition", "FTK Imager, Guymager, dd / dcfldd", "Hash verification (MD5, SHA-256)", "Hardware write-blockers"] },
      { module: "Module 05 · Defeating Anti-forensics Techniques", topics: ["Detecting data hiding (steganography, ADS)", "Recovering deleted / wiped files", "Encrypted volume analysis"] },
      { module: "Module 06 · Windows Forensics", topics: ["Windows Registry artifacts", "Event logs, prefetch, ShimCache, AmCache", "USB / external device forensics", "Browser & email artifact analysis"] },
      { module: "Module 07 · Linux and Mac Forensics", topics: ["Linux filesystem artifacts", "Bash history, syslog, journald", "macOS APFS, plist, FSEvents"] },
      { module: "Module 08 · Network Forensics", topics: ["PCAP analysis (Wireshark, NetworkMiner)", "Flow data analysis", "Detecting C2 traffic", "Packet carving"] },
      { module: "Module 09 · Investigating Web Attacks", topics: ["Web-server log forensics", "SQLi / XSS / file-upload incident analysis", "Apache, IIS, Nginx artifact review"] },
      { module: "Module 10 · Dark Web Forensics", topics: ["Tor architecture and tracing", "Hidden services & marketplaces", "Cryptocurrency tracing basics"] },
      { module: "Module 11 · Database Forensics", topics: ["MSSQL, MySQL, Oracle artifact analysis", "Transaction log examination", "Detection of unauthorized access"] },
      { module: "Module 12 · Cloud Forensics", topics: ["AWS / Azure / GCP forensic acquisition", "CloudTrail, Activity Log, Audit Log analysis", "S3 / Blob / GCS evidence collection"] },
      { module: "Module 13 · Investigating Email Crimes", topics: ["Email header analysis", "Phishing / spoofing / BEC investigation", "Server-side log review"] },
      { module: "Module 14 · Malware Forensics", topics: ["Static analysis with REMnux & PE-bear", "Dynamic analysis with Cuckoo / ANY.RUN", "IOC + YARA rule extraction"] },
      { module: "Module 15 · Mobile Forensics", topics: ["iOS & Android acquisition (logical, physical, cloud)", "Cellebrite UFED, MOBILedit basics", "App data + chat application forensics"] },
      { module: "Module 16 · IoT Forensics", topics: ["IoT device acquisition methodology", "Firmware extraction & analysis", "Smart-home, ICS, automotive forensics"] },
      { module: "Capstone · Court Testimony & Reporting (Macksofy)", topics: ["Expert-witness report writing", "Section 65B certificates", "Mock cross-examination practice"] },
    ],
    toolsCovered: ["Autopsy", "FTK Imager", "Volatility 3", "Plaso", "X-Ways", "REMnux", "Wireshark", "KAPE", "Velociraptor"],
    careerRoles: [
      { role: "Digital Forensic Investigator", salaryINR: "₹7–14 LPA", experience: "2–4 years" },
      { role: "DFIR Analyst", salaryINR: "₹10–18 LPA", experience: "3–5 years" },
      { role: "E-discovery Analyst", salaryINR: "₹6–11 LPA", experience: "1–3 years" },
    ],
    placement: STD_PLACEMENT,
    testimonials: [
      { name: "Inspector K.J.", role: "Cyber Cell, Maharashtra Police", quote: "Macksofy's CHFI for our cyber cell raised investigation quality measurably. India-context-aware and respectful of operational realities." },
    ],
    faqs: [
      { q: "Is CHFI accepted by Indian law enforcement?", a: "Yes — widely recognized by Indian police forces, CBI and corporate legal teams. Macksofy has trained Maharashtra Police on this curriculum." },
      { q: "What's the price in Mumbai?", a: "₹30,000 all-inclusive: training, official courseware, exam voucher and lab access." },
      { q: "How does CHFI map to ISO 27037?", a: "CHFI methodology aligns with ISO 27037 (digital evidence handling) and Section 65B of the Indian Evidence Act for court admissibility." },
    ],
    seoTitle: "CHFI Digital Forensics Training Mumbai | EC-Council ATC | Macksofy",
    seoDescription: "EC-Council CHFI v11 forensics training in Mumbai. Hands-on disk, memory, network, mobile and cloud forensics. ₹30,000 includes exam voucher.",
    keywords: ["CHFI training Mumbai", "digital forensics course India", "computer forensics Mumbai", "CHFI v11 India", "Autopsy training"],
  },

  {
    slug: "ctia",
    code: "CTIA",
    title: "Certified Threat Intelligence Analyst (CTIA)",
    shortTitle: "CTIA",
    level: "Intermediate",
    vendor: "EC-Council",
    image: "/courses/CTIA.jpg",
    duration: "24 hours · 3 days",
    format: "Live instructor-led · Online + Mumbai BKC",
    priceINR: 35000,
    hero: {
      eyebrow: "EC-Council Authorized Training Center",
      tagline: "Move from reactive defense to proactive hunting.",
      description:
        "CTIA teaches the full intelligence lifecycle — collection, processing, analysis, dissemination — so you can produce intel that actually changes how your SOC defends. Macksofy's lab includes MISP, OpenCTI and real-world threat feeds.",
    },
    whoIsItFor: [
      "SOC analysts moving into threat intel",
      "Threat hunters and intel analysts",
      "Security architects building TI programs",
    ],
    prerequisites: ["CSA or 1+ year of SOC/security experience", "Basic networking + log familiarity"],
    outcomes: [
      "Plan and execute a threat intelligence program",
      "Collect, analyze and disseminate actionable intel",
      "Use MISP, OpenCTI and commercial feeds effectively",
      "Pass the CTIA (312-85) exam",
    ],
    // Aligned to official EC-Council CTIA syllabus — 6 modules.
    curriculum: [
      { module: "Module 01 · Introduction to Threat Intelligence", topics: ["Cyber threat intelligence types — strategic, operational, tactical, technical", "Threat intelligence program lifecycle", "Maturity models (CTI-CMM)", "Stakeholder mapping"] },
      { module: "Module 02 · Cyber Threats and Kill Chain Methodology", topics: ["Cyber threats, attack vectors, threat actors", "Lockheed Martin Cyber Kill Chain", "MITRE ATT&CK framework deep-dive", "Diamond Model of Intrusion Analysis"] },
      { module: "Module 03 · Requirements, Planning, Direction & Review", topics: ["Defining intelligence requirements (PIR / SIR)", "Threat modeling for the enterprise", "Stakeholder priority intelligence requirements", "Program planning & governance"] },
      { module: "Module 04 · Data Collection and Processing", topics: ["OSINT collection — theHarvester, Maltego, Shodan, Censys", "HUMINT, SIGINT, TECHINT sources", "Dark-web monitoring", "MISP / OpenCTI / Yeti deployment", "STIX / TAXII format basics"] },
      { module: "Module 05 · Data Analysis", topics: ["Structured analytic techniques (ACH, Red Team, Devil's Advocate)", "Adversary attribution — cautious, evidence-based", "Confidence scoring & analytical confidence", "Pivoting on IOCs", "MITRE ATT&CK Navigator workflows"] },
      { module: "Module 06 · Intelligence Reporting and Dissemination", topics: ["Strategic, operational, tactical reporting formats", "TLP (Traffic Light Protocol) handling", "Briefing executives and SOC teams", "SIEM IOC integration & automation"] },
      { module: "Capstone · Build a Threat-Intel Program (Macksofy)", topics: ["End-to-end MISP deployment + IOC pipeline", "Real industry threat-actor profile", "Producing a quarterly intel report"] },
    ],
    toolsCovered: ["MISP", "OpenCTI", "Yeti", "VirusTotal Premium", "Shodan", "Censys", "Maltego", "ThreatConnect"],
    careerRoles: [
      { role: "Threat Intelligence Analyst", salaryINR: "₹10–18 LPA", experience: "2–4 years" },
      { role: "SOC Tier-3 / Threat Hunter", salaryINR: "₹15–25 LPA", experience: "4–6 years" },
    ],
    placement: STD_PLACEMENT,
    testimonials: [],
    faqs: [
      { q: "Is CTIA worth it for SOC analysts?", a: "Yes — CTIA is the standard cert for moving from SOC L1/L2 into a Threat Intel Analyst role, which typically pays 30–50% more." },
      { q: "What MISP version do you teach?", a: "Latest stable MISP (typically v2.4+). We deploy a multi-org MISP cluster for hands-on practice." },
    ],
    seoTitle: "CTIA Threat Intelligence Training Mumbai | EC-Council | Macksofy",
    seoDescription: "EC-Council Certified Threat Intelligence Analyst (CTIA) training in Mumbai. Hands-on labs with MISP, OpenCTI and live threat feeds. ₹35,000.",
    keywords: ["CTIA training Mumbai", "threat intelligence course India", "MISP training", "CTIA 312-85"],
  },

  {
    slug: "csa",
    code: "CSA",
    title: "Certified SOC Analyst (CSA)",
    shortTitle: "CSA (EC-Council)",
    level: "Foundation",
    vendor: "EC-Council",
    image: "/courses/CSA-Product-Cover-1.jpg",
    duration: "24 hours · 3 days",
    format: "Live instructor-led · Online + Mumbai BKC",
    priceINR: 30000,
    popular: true,
    hero: {
      eyebrow: "EC-Council Authorized Training Center",
      tagline: "Become the analyst that catches it first.",
      description:
        "EC-Council's Certified SOC Analyst is the entry-level credential for blue-team careers. Macksofy delivers it with hands-on labs on Splunk, ELK, and incident-response playbooks built from real engagements.",
    },
    whoIsItFor: [
      "Aspiring SOC analysts (Tier-1, Tier-2)",
      "Network admins moving into security operations",
      "MSSP staff seeking certification",
    ],
    prerequisites: ["Basic networking and OS knowledge"],
    outcomes: [
      "Operate a SIEM (Splunk / ELK) for log analysis and alerting",
      "Triage and escalate security incidents using MITRE ATT&CK",
      "Build threat intelligence pipelines",
      "Pass the EC-Council CSA (312-39) exam",
    ],
    // Aligned to official EC-Council CSA (312-39) syllabus — 6 modules.
    curriculum: [
      { module: "Module 01 · Security Operations and Management", topics: ["SOC structure (L1 / L2 / L3 / SOC Manager)", "SOC capabilities & maturity models", "SOC workflow, escalation matrix, SLA / OLA / KPI", "Compliance — RBI CSF, SEBI CSCRF, ISO 27001"] },
      { module: "Module 02 · Cyber Threats, IoCs, and Attack Methodology", topics: ["Threat actor profiles & motivations", "Cyber Kill Chain & MITRE ATT&CK", "IoCs — atomic, computed, behavioural", "Web app, network and host-level attacks"] },
      { module: "Module 03 · Incidents, Events and Logging", topics: ["Event vs alert vs incident", "Log sources — Windows, Linux, network, application, cloud", "Sysmon configuration (industry-standard ruleset)", "Log management lifecycle"] },
      { module: "Module 04 · Incident Detection with SIEM", topics: ["SIEM architecture & deployment", "Splunk SPL — searches, alerts, dashboards", "ELK pipeline — Logstash, Elasticsearch, Kibana", "Use-case development (auth bruteforce, lateral movement)"] },
      { module: "Module 05 · Enhanced Incident Detection with Threat Intelligence", topics: ["Integrating CTI feeds (MISP, commercial)", "IOC enrichment & contextualization", "Threat hunting hypotheses", "Sigma rule writing — cross-SIEM detection"] },
      { module: "Module 06 · Incident Response", topics: ["NIST IR lifecycle (Prepare → Detect → Contain → Eradicate → Recover → Lessons)", "TheHive + Cortex case management", "Phishing, ransomware, malware response playbooks", "CERT-In incident reporting (6-hour rule)"] },
      { module: "Capstone · 24-hour mock SOC shift (Macksofy)", topics: ["Real attack scenarios injected into Wazuh + ELK + Splunk lab", "End-to-end IR documentation", "Stakeholder briefing exercise"] },
    ],
    toolsCovered: ["Splunk", "Elastic Stack", "Wazuh", "Sysmon", "MITRE ATT&CK Navigator", "MISP", "TheHive"],
    careerRoles: [
      { role: "SOC Analyst Tier-1", salaryINR: "₹4–6 LPA", experience: "0–1 years" },
      { role: "SOC Analyst Tier-2", salaryINR: "₹7–11 LPA", experience: "1–3 years" },
    ],
    placement: STD_PLACEMENT,
    testimonials: [],
    faqs: [
      { q: "Do I need SOC experience to take CSA?", a: "No. CSA is designed for beginners. Networking fundamentals are enough." },
      { q: "What jobs can I get after CSA?", a: "SOC Analyst Tier-1, Security Operations Engineer, Incident Response Analyst at MSSPs, banks, and large enterprises." },
      { q: "How does this differ from Macksofy SOC Analyst track?", a: "EC-Council CSA gives you a recognized vendor credential. Macksofy SOC Analyst (separate course) is a longer career-track program with deeper hands-on Wazuh/ELK/Splunk + placement focus. Many students take both." },
    ],
    seoTitle: "Certified SOC Analyst (CSA) Training Mumbai | EC-Council | Macksofy",
    seoDescription: "EC-Council CSA training in Mumbai with hands-on Splunk and ELK labs. ₹30,000 includes courseware and exam voucher. Weekend batches available.",
    keywords: ["CSA training Mumbai", "EC-Council SOC analyst India", "CSA 312-39", "SOC L1 certification India"],
  },

  {
    slug: "cpent",
    code: "CPENT",
    title: "Certified Penetration Testing Professional (CPENT)",
    shortTitle: "CPENT",
    level: "Professional",
    vendor: "EC-Council",
    image: "/courses/CPENT.jpg",
    duration: "40 hours · 5 days bootcamp + 24-hour exam",
    format: "Live instructor-led · iLabs cyber range",
    priceINR: 40000,
    hero: {
      eyebrow: "EC-Council Authorized Training Center",
      tagline: "EC-Council's elite penetration testing credential.",
      description:
        "CPENT is EC-Council's flagship offensive certification — fully practical, with a 24-hour exam against a real corporate network. Macksofy's CPENT bootcamp is led by LPT-certified instructors with bug-bounty backgrounds.",
    },
    whoIsItFor: ["Penetration testers", "Red team operators", "Bug bounty hunters"],
    prerequisites: ["CEH or equivalent hands-on experience", "Comfort with Kali Linux + scripting"],
    outcomes: [
      "Pivot through segmented networks with VPN tunneling",
      "Exploit IoT, OT and binary-level vulnerabilities",
      "Write working binary exploits and bypass DEP/ASLR",
      "Earn CPENT (and LPT Master at 90%+)",
    ],
    // Aligned to official EC-Council CPENT (v2) syllabus — 14 modules.
    curriculum: [
      { module: "Module 01 · Introduction to Penetration Testing & Methodologies", topics: ["PTES, OSSTMM, NIST SP 800-115", "Pen-test vs vulnerability assessment", "Engagement types — black/grey/white-box"] },
      { module: "Module 02 · Penetration Testing Scoping and Engagement", topics: ["Scoping & rules of engagement", "Legal & contractual framework", "Reporting workflow & client communication"] },
      { module: "Module 03 · Open-Source Intelligence (OSINT)", topics: ["Domain & IP intelligence (whois, ASN)", "OSINT tools — theHarvester, Maltego, Shodan, Censys", "People & social-media OSINT", "Dark-web reconnaissance"] },
      { module: "Module 04 · Social Engineering Penetration Testing", topics: ["Phishing & spear-phishing campaigns (GoPhish)", "Vishing & smishing", "Physical social engineering", "Pretext development"] },
      { module: "Module 05 · Network Penetration Testing — External", topics: ["External recon & enumeration", "Public-facing service exploitation", "Initial access & VPN compromise"] },
      { module: "Module 06 · Network Penetration Testing — Internal", topics: ["Internal recon & enumeration", "Active Directory exploitation (BloodHound, Mimikatz, Rubeus)", "Lateral movement (PsExec, WMI, WinRM)", "Pivoting (Chisel, ligolo-ng, sshuttle)"] },
      { module: "Module 07 · Network Penetration Testing — Perimeter Devices", topics: ["Firewall, IDS/IPS testing", "Router & switch exploitation", "Bypassing network access control"] },
      { module: "Module 08 · Web Application Penetration Testing", topics: ["OWASP Top 10 & API Top 10", "Authentication & session attacks", "Server-side template injection, deserialization", "Burp Suite Pro mastery"] },
      { module: "Module 09 · Wireless Penetration Testing", topics: ["802.11 frame analysis", "WPA2 / WPA3 cracking (Aircrack-ng, Hashcat)", "Evil twin, KARMA, enterprise EAP"] },
      { module: "Module 10 · IoT Penetration Testing", topics: ["IoT firmware extraction (binwalk)", "Hardware interfaces — UART, JTAG, SWD", "BLE, ZigBee, LoRa attacks", "Companion mobile-app testing"] },
      { module: "Module 11 · OT / SCADA Penetration Testing", topics: ["IEC 62443 introduction", "Modbus, DNP3, S7 protocol attacks", "PLC / HMI exploitation in lab", "Safe testing methodology for production OT"] },
      { module: "Module 12 · Cloud Penetration Testing", topics: ["AWS / Azure / GCP attack chains", "IAM privilege escalation (Pacu, ScoutSuite)", "S3 / Blob / GCS misconfiguration", "Container & K8s RBAC abuse"] },
      { module: "Module 13 · Binary Analysis and Exploitation", topics: ["x86 / x64 assembly fundamentals", "Stack overflow exploitation", "Bypassing DEP/ASLR with ROP", "Custom shellcode creation"] },
      { module: "Module 14 · Report Writing and Post-Testing Actions", topics: ["Executive + technical reporting", "CVSS 3.1 scoring rationale", "Remediation guidance & retest workflow", "24-hour exam playbook (LPT Master path at 90%+)"] },
      { module: "Capstone · 24-hour CPENT mock (Macksofy)", topics: ["Full-scope mock exam in Macksofy lab", "Live mentor feedback", "Report deliverable per OffSec/EC-Council standards"] },
    ],
    toolsCovered: ["Nmap", "Burp Suite Pro", "Metasploit", "BloodHound", "Mimikatz", "Impacket", "Chisel", "ligolo-ng", "Pacu", "ScoutSuite"],
    careerRoles: [
      { role: "Penetration Tester", salaryINR: "₹12–20 LPA", experience: "2–4 years" },
      { role: "Senior Pentest Consultant", salaryINR: "₹20–30 LPA", experience: "4–6 years" },
    ],
    placement: STD_PLACEMENT,
    testimonials: [],
    faqs: [
      { q: "How does CPENT compare to OSCP?", a: "Both are practical pentest certs. OSCP focuses on classic enterprise pentesting with deep AD. CPENT goes broader (IoT, OT, binary) but has less industry brand weight than OSCP. Many of our students take both." },
      { q: "What's the LPT Master pathway?", a: "Score 90%+ on the CPENT exam to earn LPT Master designation — EC-Council's highest pen-tester credential." },
    ],
    seoTitle: "CPENT Training Mumbai | EC-Council Pen Test Certification | Macksofy",
    seoDescription: "Authorized EC-Council CPENT training in Mumbai by Macksofy. 24-hour live exam, LPT Master pathway, ₹40,000.",
    keywords: ["CPENT training Mumbai", "LPT Master India", "EC-Council penetration testing course", "CPENT certification India"],
  },

  // ============================================================
  // OFFSEC
  // ============================================================
  {
    slug: "sec-100-cybercore",
    code: "SEC-100",
    title: "OSCC — CyberCore Security Essentials (SEC-100)",
    shortTitle: "SEC-100 / OSCC",
    level: "Foundation",
    vendor: "OffSec",
    image: "/courses/OSCC.jpg",
    duration: "10 weeks · 80 hours including labs",
    format: "Live instructor-led · OffSec lab access",
    priceINR: 60000,
    hero: {
      eyebrow: "OffSec Authorized Training Partner",
      tagline: "OffSec's entry point into the cybersecurity career stack.",
      description:
        "SEC-100 (OSCC) is OffSec's foundational certification covering the core knowledge every cybersecurity professional needs. The natural starting point before specializing into OSCP, OSWE, OSDA or other tracks.",
    },
    whoIsItFor: [
      "Career switchers and complete beginners",
      "Engineering students preparing for cybersecurity careers",
      "IT professionals new to security",
    ],
    prerequisites: ["No prior security experience required", "Basic IT literacy + Linux familiarity helpful"],
    outcomes: [
      "Master networking, Linux, scripting and Windows fundamentals",
      "Understand offensive + defensive security pillars",
      "Be ready for OffSec specialization tracks (OSCP, OSWE, OSDA, etc.)",
      "Pass the OSCC certification exam",
    ],
    // Aligned to OffSec SEC-100 (OSCC) Learn Fundamentals subscription — 10 learning paths.
    curriculum: [
      { module: "Path 01 · Networking Foundations", topics: ["OSI & TCP/IP model", "Routing, switching, VLANs", "DNS, DHCP, NAT, firewalls", "Wireshark fundamentals"] },
      { module: "Path 02 · Linux Foundations", topics: ["Filesystem hierarchy & shell basics", "Users, permissions, sudo", "systemd & service management", "Networking & SSH on Linux"] },
      { module: "Path 03 · Windows Foundations", topics: ["Windows registry, services, GPO", "PowerShell basics", "Active Directory introduction", "Windows event logging"] },
      { module: "Path 04 · Programming and Scripting", topics: ["Bash scripting essentials", "Python for security automation", "Working with HTTP libraries", "Reading & modifying public exploits"] },
      { module: "Path 05 · Web Applications Foundations", topics: ["HTTP request / response anatomy", "Client-side vs server-side", "Burp Suite proxy & repeater", "Common vulnerability classes — XSS, SQLi, IDOR"] },
      { module: "Path 06 · Active Directory Foundations", topics: ["AD objects, OUs, GPOs", "Authentication & Kerberos basics", "Common AD enumeration", "AD attack-surface introduction"] },
      { module: "Path 07 · Security Operations Foundations", topics: ["SOC roles & lifecycle", "Logging fundamentals", "SIEM concepts", "Incident response basics"] },
      { module: "Path 08 · Cryptography", topics: ["Symmetric & asymmetric crypto", "Hashing — MD5, SHA family", "PKI & TLS overview", "Common crypto attack patterns"] },
      { module: "Path 09 · Vulnerability Management", topics: ["CVE / CVSS 3.1 scoring", "Scanner basics — Nessus, Nuclei", "Risk prioritization", "Patching workflow"] },
      { module: "Path 10 · Penetration Testing Methodology", topics: ["PTES phases", "Scoping & rules of engagement", "Note-taking discipline", "Mini end-to-end engagement"] },
      { module: "Capstone · OSCC certification exam (Macksofy mentor-led)", topics: ["Mock exam under timed conditions", "Concept mastery review", "Pathway planning to OSCP / OSDA / OSWA"] },
    ],
    toolsCovered: ["Kali Linux", "Nmap", "Wireshark", "Burp Suite", "Python", "Bash"],
    careerRoles: [
      { role: "SOC Analyst L1", salaryINR: "₹4–6 LPA", experience: "0–1 years" },
      { role: "Junior Cybersecurity Engineer", salaryINR: "₹4–7 LPA", experience: "0–2 years" },
    ],
    placement: STD_PLACEMENT,
    testimonials: [],
    faqs: [
      { q: "Is SEC-100 the same as Security+?", a: "Different vendor. SEC-100 (OSCC) is OffSec's foundation cert and is a stepping stone into the OffSec ecosystem (OSCP, OSWE, OSDA). Security+ is CompTIA's vendor-neutral equivalent." },
      { q: "Do I need SEC-100 before OSCP?", a: "Not strictly required, but strongly recommended for absolute beginners. SEC-100 covers the foundational gaps that OSCP assumes you have." },
    ],
    seoTitle: "OSCC / SEC-100 CyberCore Training Mumbai | OffSec | Macksofy",
    seoDescription: "OffSec SEC-100 (OSCC) CyberCore Security Essentials training in Mumbai. Foundation certification before OSCP. ₹60,000.",
    keywords: ["SEC-100 training India", "OSCC OffSec", "CyberCore Security Essentials", "OffSec foundation course"],
  },

  {
    slug: "oscp",
    code: "OSCP / PEN-200",
    title: "OSCP — Penetration Testing with Kali Linux (PEN-200)",
    shortTitle: "OSCP",
    level: "Professional",
    vendor: "OffSec",
    image: "/courses/OSCP.jpg",
    duration: "12-week bootcamp + 90-day OffSec lab + 24-hour exam",
    format: "Hybrid · Mentor-led with full OffSec lab access",
    priceINR: 145000,
    originalPriceINR: 170588,
    discountPercent: 15,
    popular: true,
    hero: {
      eyebrow: "OffSec Authorized Training Partner",
      tagline: "Try harder. Pass with proof.",
      description:
        "OSCP is the gold standard for hands-on penetration testing — a 24-hour live exam against a real network plus a professional report. Macksofy adds 60+ hours of instructor-led bootcamp on top of OffSec's official PEN-200 curriculum, with mentor support that continues until you pass.",
    },
    whoIsItFor: [
      "Working pen-testers ready to level up to elite credentials",
      "Bug bounty hunters who want methodology rigor",
      "Security engineers moving into red-team or AppSec roles",
      "CEH holders ready for the next challenge",
    ],
    prerequisites: [
      "Strong networking + Linux fundamentals",
      "Comfort with Bash and basic Python scripting",
      "CEH or 6+ months of hands-on pen-test practice strongly recommended",
    ],
    outcomes: [
      "Compromise standalone Windows, Linux and Active Directory machines under exam pressure",
      "Develop and modify public exploits, write Bash/Python tooling on the fly",
      "Pivot through segmented networks and execute lateral movement",
      "Write a 24-hour professional pen-test report that meets OffSec's standards",
      "Earn OSCP — the credential that opens senior pen-test doors in BFSI, Big Tech and consulting",
    ],
    // Aligned to official OffSec PEN-200 (OSCP) syllabus — 22 technical modules.
    curriculum: [
      { module: "Module 01 · Report Writing for Penetration Testers", topics: ["OffSec report standards", "Note-taking discipline", "Markdown / Pandoc workflow"] },
      { module: "Module 02 · Information Gathering", topics: ["Passive recon — DNS, WHOIS, certificate transparency", "Active recon — DNS brute, SMB / SMTP enumeration", "Service banner grabbing"] },
      { module: "Module 03 · Vulnerability Scanning", topics: ["Nessus essentials", "Nmap scripting engine for vuln checks", "Manual triage of scanner output"] },
      { module: "Module 04 · Introduction to Web Applications", topics: ["HTTP request / response", "Burp Suite proxy & repeater", "Common architectures"] },
      { module: "Module 05 · Common Web Application Attacks", topics: ["Directory traversal", "File inclusion (LFI / RFI)", "File-upload bypass", "Command injection"] },
      { module: "Module 06 · SQL Injection Attacks", topics: ["Manual in-band SQLi", "Blind & time-based SQLi", "sqlmap automation", "DB-specific syntax (MySQL, MSSQL, Postgres)"] },
      { module: "Module 07 · Client-Side Attacks", topics: ["Macro-enabled documents", "Microsoft Office attack vectors", "Browser-side payloads"] },
      { module: "Module 08 · Locating Public Exploits", topics: ["ExploitDB workflow", "GitHub research patterns", "Identifying applicable CVEs"] },
      { module: "Module 09 · Fixing Exploits", topics: ["Modifying public PoCs to fit target", "Recompiling binaries", "Cross-compiling Windows from Linux"] },
      { module: "Module 10 · Antivirus Evasion", topics: ["Static signature avoidance", "Encoders & packers", "Custom payloads with msfvenom variants"] },
      { module: "Module 11 · Password Attacks", topics: ["Hashcat & John the Ripper", "Kerbrute & password spraying", "SSH / RDP / WinRM brute-forcing", "Hash dumping (Mimikatz)"] },
      { module: "Module 12 · Windows Privilege Escalation", topics: ["Service / registry / scheduled-task abuse", "Token impersonation", "AlwaysInstallElevated, UAC bypass", "WinPEAS / PrivescCheck workflow"] },
      { module: "Module 13 · Linux Privilege Escalation", topics: ["SUID / SGID exploitation", "Sudo misconfigurations", "Cron-job abuse", "Kernel exploits (carefully)", "LinPEAS workflow"] },
      { module: "Module 14 · Port Redirection and SSH Tunneling", topics: ["Local & remote SSH tunneling", "Dynamic SOCKS proxying", "rinetd, socat"] },
      { module: "Module 15 · Tunneling Through Deep Packet Inspection", topics: ["Chisel HTTP tunneling", "ligolo-ng pivoting", "DNS tunneling concepts"] },
      { module: "Module 16 · The Metasploit Framework", topics: ["Module structure & search", "msfvenom payload generation", "Meterpreter sessions & post-modules"] },
      { module: "Module 17 · Active Directory Introduction & Enumeration", topics: ["AD objects, OUs, trusts", "BloodHound + PowerView mapping", "LDAP queries"] },
      { module: "Module 18 · Attacking AD Authentication", topics: ["AS-REP roasting", "Kerberoasting", "Password spraying with confidence", "NTLM relay / coercion (PetitPotam)"] },
      { module: "Module 19 · Lateral Movement in Active Directory", topics: ["Pass-the-hash / pass-the-ticket", "WinRM, WMI, PsExec, smbexec, dcomexec", "DCSync & golden / silver tickets"] },
      { module: "Module 20 · Enumerating AWS Cloud Infrastructure", topics: ["AWS CLI fundamentals", "IAM enumeration", "S3 / EC2 / Lambda discovery"] },
      { module: "Module 21 · Attacking AWS Cloud Infrastructure", topics: ["Pacu modules", "Privilege escalation paths", "Lambda & metadata-service abuse", "S3 misconfiguration exploitation"] },
      { module: "Module 22 · Assembling the Pieces (capstone)", topics: ["End-to-end engagement walkthrough", "Note-taking → exploitation → reporting"] },
      { module: "Macksofy bootcamp · Active Directory deep-dive (12h)", topics: ["RBCD & shadow credentials", "ADCS abuse (ESC1-ESC8)", "Custom AD lab walkthroughs"] },
      { module: "Macksofy bootcamp · Exam strategy + 2 mock exams (24h)", topics: ["Exam playbook & time allocation", "Two full 24-hour mock exams with mentor review", "Report deliverable rubric"] },
      { module: "OffSec PEN-200 self-study · 90-day PWK lab access", topics: ["Official PDF + video curriculum", "OffSec Discord community", "Challenge labs (OSCP A / B / C)"] },
    ],
    toolsCovered: ["Kali Linux", "Nmap (advanced)", "Burp Suite Pro", "Metasploit", "BloodHound", "PowerView", "Mimikatz", "Impacket suite", "Responder", "CrackMapExec", "Empire / Covenant", "PowerSploit", "WinPEAS / LinPEAS", "Hashcat", "Chisel", "ligolo-ng (pivoting)"],
    careerRoles: [
      { role: "Penetration Tester", salaryINR: "₹12–20 LPA", experience: "2–4 years" },
      { role: "Senior Pen-Test Consultant", salaryINR: "₹20–30 LPA", experience: "4–6 years" },
      { role: "Red Team Operator", salaryINR: "₹25–40 LPA", experience: "5+ years" },
      { role: "Application Security Engineer", salaryINR: "₹18–28 LPA", experience: "3–5 years" },
    ],
    placement: {
      summary: "OSCP-certified hires are in heavy demand. Our placement desk works with BFSI giants, Big-4 consulting and product companies who actively seek OSCP holders.",
      points: [
        "1:1 mentorship until you pass — including post-bootcamp lab guidance",
        "Mock interviews modeled on real BFSI / Big-4 hiring loops",
        "Direct intros to hiring partners (HSBC, PwC, EY, Mahindra, fintechs)",
        "Career coaching for Indian + UAE markets",
      ],
    },
    testimonials: [
      { name: "Vivek I.", role: "Senior Pen-Tester · BFSI MNC, Mumbai", quote: "Macksofy's bootcamp is the only reason I cleared OSCP on the first try. The AD module alone was worth the price." },
      { name: "Faisal R.", role: "Application Security Engineer, Dubai", quote: "Mentor support continued for weeks after the official course ended. They actually care if you pass." },
    ],
    faqs: [
      { q: "Is the price ₹1,45,000 inclusive of OffSec PEN-200 + lab + exam?", a: "Yes — ₹1,45,000 (15% off the standard ₹1,70,588) includes the official OffSec PEN-200 course, 90 days of PWK lab access, one OSCP exam voucher AND Macksofy's 60+ hour instructor-led bootcamp. EMI options available." },
      { q: "How long does it really take to clear OSCP?", a: "Realistically, 3–6 months of dedicated study after the bootcamp. We compress this for full-time learners with structured weekly milestones." },
      { q: "What is your OSCP pass rate?", a: "Across our 2024 cohorts, 78% of students who completed the bootcamp + lab schedule passed within their first attempt." },
      { q: "Do I get a free retake if I fail?", a: "OffSec's standard policy applies. Macksofy provides free post-fail mentorship and a guided remediation plan to ensure you pass on attempt #2." },
      { q: "Is OSCP recognized in the UAE?", a: "Absolutely. OSCP is the most recognized hands-on credential globally — our UAE alumni are placed at banks, fintechs and Big-4 consulting firms across Dubai and Abu Dhabi." },
    ],
    seoTitle: "OSCP Training in Mumbai & India | OffSec PEN-200 | Macksofy",
    seoDescription: "OffSec Authorized OSCP (PEN-200) training in Mumbai. ₹1,45,000 (15% OFF) includes course, 90-day labs, exam voucher and Macksofy bootcamp. Mentor until you pass.",
    keywords: ["OSCP training Mumbai", "OSCP India", "PEN-200 training India", "OffSec partner India", "OSCP bootcamp Mumbai", "best OSCP coaching India"],
  },

  {
    slug: "osep-pen-300",
    code: "OSEP / PEN-300",
    title: "OSEP — Evasion Techniques & Breaching Defenses (PEN-300)",
    shortTitle: "OSEP",
    level: "Professional",
    vendor: "OffSec",
    image: "/courses/OSEP.jpg",
    duration: "90-day OffSec lab + 48-hour exam",
    format: "Hybrid · Macksofy mentorship + OffSec course",
    priceINR: 145000,
    originalPriceINR: 170588,
    discountPercent: 15,
    hero: {
      eyebrow: "OffSec Authorized Training Partner",
      tagline: "Bypass EDRs. Breach modern defenses.",
      description:
        "OSEP is the natural step after OSCP for aspiring red-team operators. Process injection, custom shellcode, EDR bypass, advanced AD exploitation — Macksofy's bootcamp uses real CrowdStrike, SentinelOne and Defender environments.",
    },
    whoIsItFor: ["OSCP holders moving into red team", "Senior penetration testers", "Adversary emulation engineers"],
    prerequisites: ["OSCP or equivalent practical experience", "C# / PowerShell scripting comfort"],
    outcomes: [
      "Build custom payloads that bypass commercial EDRs",
      "Execute process injection, hollowing and reflective DLL loading",
      "Run advanced Active Directory attack chains (RBCD, Shadow Credentials)",
      "Pass the 48-hour OSEP exam",
    ],
    // Aligned to official OffSec PEN-300 (OSEP) syllabus — 16 modules.
    curriculum: [
      { module: "Module 01 · Operating System and Programming Theory", topics: ["Windows API & PE format internals", "x64 calling conventions", "Writing tooling in C# and PowerShell"] },
      { module: "Module 02 · Client-Side Code Execution with Office", topics: ["VBA macro payloads", "DDE attacks", "Excel 4.0 macros (XLM)"] },
      { module: "Module 03 · Client-Side Code Execution with Windows Script Host", topics: ["JScript / VBScript payloads", "HTA & WSF payload delivery", "ScriptControl abuse"] },
      { module: "Module 04 · Process Injection and Migration", topics: ["CreateRemoteThread + LoadLibrary", "Reflective DLL loading", "Process hollowing", "Thread-local-storage callbacks"] },
      { module: "Module 05 · Introduction to Antivirus Evasion", topics: ["Static signature analysis", "PE structure modification", "Custom packers"] },
      { module: "Module 06 · Advanced Antivirus Evasion", topics: ["Dynamic / behavioural evasion", "AMSI bypass techniques", "ETW patching"] },
      { module: "Module 07 · Application Whitelisting Bypass", topics: ["AppLocker bypass paths", "WDAC bypass", "Living-off-the-land binaries (LOLBINs)"] },
      { module: "Module 08 · Bypassing Network Filters", topics: ["Domain fronting concepts", "Proxy / outbound NTLM authentication", "DNS tunneling"] },
      { module: "Module 09 · Linux Post-Exploitation", topics: ["Persistence on Linux endpoints", "Loadable kernel module abuse (concept)", "Pivoting from Linux"] },
      { module: "Module 10 · Kiosk Breakouts", topics: ["Restricted desktop escapes", "Citrix / RDP breakouts", "Group-Policy enforcement bypass"] },
      { module: "Module 11 · Windows Credentials", topics: ["LSASS dumping techniques", "DPAPI secrets", "Credential Guard considerations", "Mimikatz advanced workflows"] },
      { module: "Module 12 · Windows Lateral Movement", topics: ["Pass-the-hash / pass-the-ticket", "Overpass-the-hash", "Token impersonation", "WMI, WinRM, PsExec, DCOM"] },
      { module: "Module 13 · Linux Lateral Movement", topics: ["SSH agent forwarding abuse", "Trust relationships on Linux", "Pivoting via misconfigured services"] },
      { module: "Module 14 · Microsoft SQL Attacks", topics: ["xp_cmdshell exploitation", "Linked-server attacks", "Trustworthy database abuse", "MSSQL Kerberos attacks"] },
      { module: "Module 15 · Active Directory Exploitation", topics: ["Kerberos delegation — unconstrained, constrained, RBCD", "Shadow Credentials (msDS-KeyCredentialLink)", "ADCS attacks (ESC1-ESC11)", "Forest & domain trust attacks"] },
      { module: "Module 16 · Combining the Pieces (capstone)", topics: ["End-to-end goal-based engagement", "EDR-bypass case studies", "MITRE ATT&CK mapping of TTPs"] },
      { module: "Macksofy bootcamp · EDR-bypass lab (CrowdStrike + SentinelOne + Defender)", topics: ["Live bypass walkthroughs", "Custom payloads in real EDR environments", "Detection-engineering handoff"] },
      { module: "Macksofy bootcamp · 48-hour mock exam + report rubric", topics: ["Two mock exams with mentor review", "Time-allocation playbook", "Professional report deliverable"] },
    ],
    toolsCovered: ["Cobalt Strike", "Sliver", "Mythic", "BloodHound", "Mimikatz", "Rubeus", "Impacket", "Custom C# / PowerShell tooling"],
    careerRoles: [
      { role: "Red Team Operator", salaryINR: "₹25–40 LPA", experience: "5+ years" },
      { role: "Adversary Emulation Engineer", salaryINR: "₹20–35 LPA", experience: "4+ years" },
    ],
    placement: STD_PLACEMENT,
    testimonials: [],
    faqs: [
      { q: "Is OSEP harder than OSCP?", a: "Yes — OSEP requires deep AD knowledge, custom tooling and EDR-bypass mindset. Most successful candidates have 1+ year of pen-test experience post-OSCP." },
      { q: "Do you cover Cobalt Strike / Sliver?", a: "Yes — OSEP curriculum + Macksofy bootcamp cover both Cobalt Strike (where licensable) and open-source Sliver as primary C2." },
    ],
    seoTitle: "OSEP PEN-300 Training Mumbai | OffSec Red Team | Macksofy",
    seoDescription: "OffSec OSEP (PEN-300) training in Mumbai. EDR bypass, advanced AD attacks, 48-hour exam. ₹1,45,000 (15% OFF).",
    keywords: ["OSEP training India", "PEN-300 Mumbai", "red team training India", "EDR bypass course", "OSEP bootcamp"],
  },

  {
    slug: "oswe-web-300",
    code: "OSWE / WEB-300",
    title: "OSWE — Advanced Web Attacks & Exploitation (WEB-300)",
    shortTitle: "OSWE",
    level: "Professional",
    vendor: "OffSec",
    image: "/courses/OSWE.jpg",
    duration: "90-day OffSec lab + 48-hour exam",
    format: "Hybrid · Macksofy mentorship + OffSec course",
    priceINR: 145000,
    originalPriceINR: 170588,
    discountPercent: 15,
    hero: {
      eyebrow: "OffSec Authorized Training Partner",
      tagline: "White-box web exploitation. Source-code-driven.",
      description:
        "OSWE is the elite web-application credential. You read source code (PHP, Java, Node.js, .NET) to find authentication bypasses, deserialization, type juggling — then chain them into RCEs. Macksofy's bootcamp covers OSWE-specific labs plus modern web research.",
    },
    whoIsItFor: ["Senior web pen-testers", "Bug bounty hunters", "Application security engineers"],
    prerequisites: ["Strong web fundamentals", "Read PHP / Java / Node.js source code"],
    outcomes: [
      "Read source code to find auth bypass, deserialization, RCE",
      "Chain logic vulnerabilities for full system compromise",
      "Pass the 48-hour OSWE exam",
    ],
    // Aligned to official OffSec WEB-300 (OSWE) syllabus — 13 case-study modules.
    curriculum: [
      { module: "Module 01 · Tools & Methodologies", topics: ["White-box source-review workflow", "Burp Suite Pro mastery", "Custom Burp extensions (Python via Jython, Java BApps)", "Note-taking & diffing patterns"] },
      { module: "Module 02 · ATutor Authentication Bypass and RCE", topics: ["PHP source review", "Logic-flaw discovery", "Chained authentication bypass", "Path to file-write RCE"] },
      { module: "Module 03 · ATutor LMS Type Juggling Vulnerability", topics: ["PHP loose comparison weaknesses", "Magic hash exploitation", "Fixed-point hash collisions"] },
      { module: "Module 04 · ManageEngine SQL Injection (AMUserResourcesSyncServlet)", topics: ["Java source-code review", "Blind boolean SQLi at scale", "Out-of-band exfiltration"] },
      { module: "Module 05 · Bassmaster NodeJS Arbitrary JS Injection", topics: ["JavaScript source review", "eval / Function() abuse", "Async exploit chains"] },
      { module: "Module 06 · DotNetNuke Cookie Deserialization RCE", topics: [".NET BinaryFormatter risks", "ysoserial.net gadget chains", "Cookie / session payload delivery"] },
      { module: "Module 07 · ERPNext Authentication Bypass and SSTI", topics: ["Python / Frappe source review", "Authentication-logic flaw chaining", "Server-Side Template Injection (Jinja2)"] },
      { module: "Module 08 · openCRX Authentication Bypass and RCE", topics: ["Java enterprise app review", "Privilege confusion exploitation", "Reaching RCE via post-auth functionality"] },
      { module: "Module 09 · openITCOCKPIT XSS and OS Command Injection (black-box)", topics: ["Black-box approach to OS command injection", "Stored XSS chaining", "Combining web flaws into RCE"] },
      { module: "Module 10 · Concord Authentication Bypass to RCE", topics: ["Spring / Java application review", "Authentication-logic exploitation", "Reaching shell via misconfigured serialization"] },
      { module: "Module 11 · Server-Side Request Forgery (SSRF)", topics: ["URL parser confusion", "Cloud-metadata SSRF (AWS/Azure)", "Blind SSRF detection patterns"] },
      { module: "Module 12 · Guacamole Lite Prototype Pollution", topics: ["Node.js prototype pollution discovery", "Property-pollution → RCE pivot", "Hardening recommendations"] },
      { module: "Module 13 · Conclusion & Exam Preparation", topics: ["48-hour exam strategy", "Note discipline & report deliverable", "Common pitfalls & how to recover"] },
      { module: "Macksofy bootcamp · Modern web extensions", topics: ["GraphQL deep introspection attacks", "Web-cache deception & poisoning", "HTTP request smuggling", "OAuth 2.0 / OIDC flow attacks"] },
    ],
    toolsCovered: ["Burp Suite Pro", "Caido", "JD-GUI / JADX", "Semgrep", "CodeQL", "Custom Burp extensions", "ffuf"],
    careerRoles: [
      { role: "Senior AppSec Engineer", salaryINR: "₹20–35 LPA", experience: "4+ years" },
      { role: "Web Pentest Lead", salaryINR: "₹18–30 LPA", experience: "3–6 years" },
    ],
    placement: STD_PLACEMENT,
    testimonials: [],
    faqs: [
      { q: "Is OSWE good for bug bounty?", a: "Yes — OSWE-trained hunters consistently report higher-impact findings (RCE, auth bypass) vs generic XSS/SQLi. ROI is excellent for serious bounty hunters." },
      { q: "Should I take OSWA before OSWE?", a: "Recommended. OSWA builds the methodology and foundations. OSWE assumes you can already do thorough web pentests." },
    ],
    seoTitle: "OSWE WEB-300 Training Mumbai | OffSec Web Exploitation | Macksofy",
    seoDescription: "OffSec OSWE (WEB-300) advanced web exploitation training. White-box source review, RCE chains, 48-hour exam. ₹1,45,000 (15% OFF).",
    keywords: ["OSWE training India", "WEB-300 Mumbai", "advanced web exploitation course", "white box web pentest", "OSWE bootcamp"],
  },

  {
    slug: "oswa-web-200",
    code: "OSWA / WEB-200",
    title: "OSWA — Foundational Web Application Assessments (WEB-200)",
    shortTitle: "OSWA",
    level: "Intermediate",
    vendor: "OffSec",
    image: "/courses/OSWA.jpg",
    duration: "60-day OffSec lab + 24-hour exam",
    format: "Hybrid · Macksofy mentorship + OffSec course",
    priceINR: 145000,
    originalPriceINR: 170588,
    discountPercent: 15,
    hero: {
      eyebrow: "OffSec Authorized Training Partner",
      tagline: "Foundational web pentest credential — black box.",
      description:
        "OSWA bridges the gap between CEH-level web knowledge and the elite OSWE. Black-box testing of realistic web apps with all major attack classes plus modern web vulnerabilities.",
    },
    whoIsItFor: ["Web pentesters", "Application security engineers", "Bug bounty beginners"],
    prerequisites: ["Basic web app fundamentals", "OWASP Top 10 conceptual familiarity"],
    outcomes: [
      "Conduct end-to-end web application assessments",
      "Exploit OWASP Top 10 plus SSRF, IDOR, JWT issues",
      "Pass the 24-hour OSWA exam",
    ],
    // Aligned to official OffSec WEB-200 (OSWA) syllabus — 13 modules.
    curriculum: [
      { module: "Module 01 · Tools for the Web Assessor", topics: ["Burp Suite Pro proxy & repeater", "ffuf, gobuster, sqlmap basics", "Browser DevTools workflows"] },
      { module: "Module 02 · Cross-Site Scripting — Introduction & Discovery", topics: ["Reflected, stored, DOM-based XSS", "Sources & sinks", "Auto-discovery techniques"] },
      { module: "Module 03 · Cross-Site Scripting — Exploitation & Case Study", topics: ["Cookie theft & session hijacking", "Bypassing Content Security Policy", "Real-world case study"] },
      { module: "Module 04 · Cross-Origin Attacks", topics: ["CORS misconfiguration exploitation", "CSRF (Cross-Site Request Forgery)", "SameSite cookie nuances", "Postmessage abuse"] },
      { module: "Module 05 · Introduction to SQL", topics: ["Database fundamentals", "Common SQL syntax across MySQL / MSSQL / Postgres", "Reading database schema"] },
      { module: "Module 06 · SQL Injection", topics: ["In-band, blind, time-based SQLi", "Second-order SQLi", "sqlmap automation", "WAF bypass patterns"] },
      { module: "Module 07 · Directory Traversal Attacks", topics: ["Linux & Windows path traversal", "URL encoding bypass", "Sensitive-file enumeration"] },
      { module: "Module 08 · XML External Entities (XXE)", topics: ["In-band & out-of-band XXE", "Blind XXE", "SSRF via XXE"] },
      { module: "Module 09 · Server-Side Template Injection (SSTI)", topics: ["Discovery techniques", "Jinja2, Twig, FreeMarker exploitation", "Sandboxing escapes"] },
      { module: "Module 10 · Command Injection", topics: ["OS command injection vectors", "Argument injection", "Time-based blind detection"] },
      { module: "Module 11 · Server-Side Request Forgery (SSRF)", topics: ["Internal-port discovery", "Cloud-metadata service abuse", "Filter bypass techniques"] },
      { module: "Module 12 · Insecure Direct Object Reference (IDOR / BOLA)", topics: ["IDOR discovery", "Mass-assignment patterns", "Authorization-logic flaws"] },
      { module: "Module 13 · Assembling the Pieces (capstone)", topics: ["End-to-end web assessment", "Reporting per OffSec standards", "24-hour exam preparation"] },
      { module: "Macksofy bootcamp · Modern API testing", topics: ["REST + GraphQL + gRPC fuzzing", "JWT alg-confusion attacks", "OAuth 2.0 / OIDC flow attacks"] },
    ],
    toolsCovered: ["Burp Suite Pro", "ffuf", "sqlmap", "JWT_tool", "Postman"],
    careerRoles: [
      { role: "Web Application Pen-Tester", salaryINR: "₹10–18 LPA", experience: "2–4 years" },
      { role: "Application Security Engineer", salaryINR: "₹15–25 LPA", experience: "3–5 years" },
    ],
    placement: STD_PLACEMENT,
    testimonials: [],
    faqs: [
      { q: "Is OSWA worth taking before OSWE?", a: "Highly recommended. OSWA builds the methodology and confidence you'll need for OSWE's source-code work." },
    ],
    seoTitle: "OSWA WEB-200 Training Mumbai | OffSec Web Pentest | Macksofy",
    seoDescription: "OffSec OSWA (WEB-200) web application assessment training in Mumbai. Black-box methodology, OWASP Top 10+, 24-hour exam. ₹1,45,000 (15% OFF).",
    keywords: ["OSWA training India", "WEB-200 Mumbai", "web pentest course India", "OSWA bootcamp"],
  },

  {
    slug: "oswp-pen-210",
    code: "OSWP / PEN-210",
    title: "OSWP — Foundational Wireless Network Attacks (PEN-210)",
    shortTitle: "OSWP",
    level: "Intermediate",
    vendor: "OffSec",
    image: "/courses/OSWP.jpg",
    duration: "30-day OffSec lab + 4-hour exam",
    format: "Hybrid · Macksofy mentorship + OffSec course",
    priceINR: 145000,
    originalPriceINR: 170588,
    discountPercent: 15,
    hero: {
      eyebrow: "OffSec Authorized Training Partner",
      tagline: "Master Wi-Fi attacks. Earn OSWP.",
      description:
        "PEN-210 / OSWP is the standard wireless-pentest credential. WPA2/3 cracking, evil twins, enterprise WPA-EAP attacks. Macksofy provides Alfa hardware kits for in-class students.",
    },
    whoIsItFor: ["Penetration testers", "Network security engineers", "Wireless infrastructure auditors"],
    prerequisites: ["Basic networking knowledge", "Wi-Fi adapter capable of monitor mode"],
    outcomes: [
      "Crack WEP, WPA, WPA2 and WPA3 networks",
      "Conduct evil-twin and enterprise WPA-EAP attacks",
      "Pass the 4-hour OSWP exam",
    ],
    // Aligned to official OffSec PEN-210 (OSWP) syllabus — 10 modules.
    curriculum: [
      { module: "Module 01 · IEEE 802.11", topics: ["Wireless networking standards", "Frequency bands & channels", "MIMO & 802.11ax (Wi-Fi 6) basics"] },
      { module: "Module 02 · Wireless Networks", topics: ["Authentication & association states", "WEP / WPA / WPA2 / WPA3", "Pre-shared keys vs Enterprise"] },
      { module: "Module 03 · Linux Wireless Tools, Drivers and Stacks", topics: ["Compatible Wi-Fi adapters (Alfa, etc.)", "Monitor mode setup", "iwconfig / iw / airmon-ng"] },
      { module: "Module 04 · Wireshark Essentials", topics: ["Capture filters for 802.11", "Display filters & dissection", "Decrypting WPA traffic"] },
      { module: "Module 05 · Frames and Network Interaction", topics: ["Management, control, data frames", "Beacon, probe, association exchanges", "Deauthentication frames"] },
      { module: "Module 06 · Aircrack-ng Essentials", topics: ["airodump-ng capture", "aireplay-ng injection", "aircrack-ng cracking workflow"] },
      { module: "Module 07 · Cracking Authentication Hashes", topics: ["WPA / WPA2 4-way handshake capture", "PMKID attack (no client required)", "Hashcat workflows for WPA hashes"] },
      { module: "Module 08 · Attacking WPS Networks", topics: ["WPS PIN brute-forcing (Reaver, Bully)", "Pixie-dust attack", "Mitigations"] },
      { module: "Module 09 · Rogue Access Points", topics: ["Evil twin AP setup (hostapd)", "Captive-portal phishing", "KARMA-style attacks"] },
      { module: "Module 10 · Attacking WPA Enterprise", topics: ["802.1X / RADIUS basics", "EAP-PEAP credential capture (hostapd-wpe)", "Hash cracking & abuse"] },
      { module: "Macksofy bootcamp · Hardware kit & exam playbook", topics: ["Alfa AWUS036ACH setup", "4-hour OSWP exam strategy", "Real-world wireless engagement walkthrough"] },
    ],
    toolsCovered: ["Aircrack-ng suite", "Hashcat", "Wireshark", "Bettercap", "hostapd-wpe"],
    careerRoles: [
      { role: "Wireless Penetration Tester", salaryINR: "₹8–15 LPA", experience: "1–3 years" },
    ],
    placement: STD_PLACEMENT,
    testimonials: [],
    faqs: [
      { q: "Do I need a Wi-Fi adapter for the OSWP exam?", a: "Yes — Alfa AWUS036ACH or similar. Macksofy can supply the adapter as part of in-class enrollment." },
    ],
    seoTitle: "PEN-210 / OSWP Wireless Training Mumbai | OffSec | Macksofy",
    seoDescription: "OffSec OSWP (PEN-210) wireless pentest training in Mumbai. WPA2/3 attacks, evil twins, hardware kit included. ₹1,45,000 (15% OFF).",
    keywords: ["OSWP training Mumbai", "PEN-210 India", "wireless pentest course", "OSWP bootcamp"],
  },

  {
    slug: "soc-200-osda",
    code: "SOC-200 / OSDA",
    title: "SOC-200 — Foundational Defensive Operations & Analysis (OSDA)",
    shortTitle: "SOC-200 / OSDA",
    level: "Intermediate",
    vendor: "OffSec",
    image: "/courses/CSA-Product-Cover-1.jpg",
    duration: "60-day OffSec lab + 24-hour exam",
    format: "Hybrid · Macksofy mentorship + OffSec course",
    priceINR: 145000,
    originalPriceINR: 170588,
    discountPercent: 15,
    hero: {
      eyebrow: "OffSec Authorized Training Partner",
      tagline: "OffSec's blue-team flagship.",
      description:
        "SOC-200 trains defenders the way OSCP trains attackers — fully hands-on, with a 24-hour practical exam. Macksofy's bootcamp covers Splunk, Elastic, Sysmon and EDR triage in real-world scenarios.",
    },
    whoIsItFor: ["SOC analysts (Tier-2/3)", "Threat hunters", "Incident responders"],
    prerequisites: ["Basic Windows/Linux administration", "Networking fundamentals"],
    outcomes: [
      "Detect attacker TTPs across Windows, Linux and AD",
      "Use EDRs and SIEMs to investigate live incidents",
      "Pass the 24-hour OSDA (SOC-200) exam",
    ],
    // Aligned to official OffSec SOC-200 (OSDA) syllabus — 18 modules.
    curriculum: [
      { module: "Module 01 · Attacker Methodology Introduction", topics: ["Cyber Kill Chain & MITRE ATT&CK alignment", "Pyramid of Pain", "Common attacker tradecraft overview"] },
      { module: "Module 02 · Windows Endpoint Introduction", topics: ["Windows architecture for defenders", "Sysmon configuration (industry-standard ruleset)", "Key event IDs (4624, 4625, 4688, 4720, 7045, 4732)"] },
      { module: "Module 03 · Windows Server-Side Attacks", topics: ["Detecting brute-force & password spraying", "RDP / SMB / WinRM abuse detection", "Service-creation indicators"] },
      { module: "Module 04 · Windows Client-Side Attacks", topics: ["Office macro detection", "PowerShell-based attack indicators", "ScriptBlock & Module logging"] },
      { module: "Module 05 · Windows Privilege Escalation", topics: ["Token-impersonation indicators", "Service-misconfiguration abuse signals", "UAC bypass detection"] },
      { module: "Module 06 · Windows Persistence", topics: ["Run-keys, scheduled tasks, services", "WMI subscriptions", "DLL search-order hijacking detection"] },
      { module: "Module 07 · Windows Credentials", topics: ["LSASS access detection", "Mimikatz indicators", "DPAPI / Credential Guard considerations"] },
      { module: "Module 08 · Windows Lateral Movement", topics: ["WinRM, WMI, PsExec, smbexec, dcomexec indicators", "Pass-the-hash detection", "Remote-service-creation signals"] },
      { module: "Module 09 · Active Directory Enumeration & Attacks", topics: ["BloodHound query indicators", "Kerberoast / AS-REP roast detection", "DCSync detection"] },
      { module: "Module 10 · Linux Endpoint Introduction", topics: ["auditd configuration", "syslog & journald analysis", "Bash-history forensics"] },
      { module: "Module 11 · Linux Server-Side Attacks", topics: ["SSH brute-force & key-abuse detection", "Web-app attack signals on Linux", "Container runtime indicators"] },
      { module: "Module 12 · Linux Privilege Escalation", topics: ["SUID / sudo abuse detection", "Cron-job tampering signals", "Kernel-exploit indicators"] },
      { module: "Module 13 · Network Detections", topics: ["IDS / IPS — Suricata & Zeek", "Network-flow analysis", "Beaconing detection"] },
      { module: "Module 14 · Antivirus Alerts and Evasion", topics: ["Triaging EDR alerts", "Detecting AMSI / ETW patching", "Custom-payload identification"] },
      { module: "Module 15 · Active Directory Persistence", topics: ["Golden / silver tickets", "DCShadow detection", "AdminSDHolder modifications"] },
      { module: "Module 16 · SIEM Part One — Intro to ELK", topics: ["Logstash filter writing", "Elasticsearch index design", "Kibana visualisation & dashboards"] },
      { module: "Module 17 · SIEM Part Two — Combining the Logs", topics: ["Cross-source correlation", "Sigma rule writing", "Alert tuning workflow"] },
      { module: "Module 18 · Trying Harder — The Labs", topics: ["End-to-end OSDA-style investigation", "24-hour exam strategy", "Reporting per OffSec defensive standards"] },
      { module: "Macksofy bootcamp · Real-world IR playbooks", topics: ["Phishing IR (Macksofy case)", "Ransomware IR (Macksofy case)", "Cloud incident IR (AWS / Azure)"] },
    ],
    toolsCovered: ["Splunk", "Elastic Stack", "Sysmon", "Sigma", "MITRE ATT&CK Navigator", "Velociraptor"],
    careerRoles: [
      { role: "SOC Analyst Tier-3", salaryINR: "₹15–22 LPA", experience: "3–5 years" },
      { role: "Detection Engineer", salaryINR: "₹15–25 LPA", experience: "3–5 years" },
      { role: "Threat Hunter", salaryINR: "₹18–28 LPA", experience: "4+ years" },
    ],
    placement: STD_PLACEMENT,
    testimonials: [],
    faqs: [
      { q: "Is SOC-200 the OffSec equivalent of CSA?", a: "SOC-200 is significantly more advanced than CSA. Think of CSA as a starter and SOC-200 as the elite blue-team cert (analogous to OSCP for offense)." },
    ],
    seoTitle: "SOC-200 / OSDA Training Mumbai | OffSec Blue Team | Macksofy",
    seoDescription: "OffSec SOC-200 (OSDA) defensive analysis training in Mumbai. Splunk, Sysmon, EDR triage, 24-hour exam. ₹1,45,000 (15% OFF).",
    keywords: ["SOC-200 training India", "OSDA Mumbai", "OffSec blue team course", "SOC-200 bootcamp"],
  },

  {
    slug: "exp-301-osed",
    code: "OSED / EXP-301",
    title: "OSED — Windows User Mode Exploit Development (EXP-301)",
    shortTitle: "OSED",
    level: "Professional",
    vendor: "OffSec",
    image: "/courses/OSED.jpg",
    duration: "90-day OffSec lab + 48-hour exam",
    format: "Hybrid · Macksofy mentorship + OffSec course",
    priceINR: 145000,
    originalPriceINR: 170588,
    discountPercent: 15,
    hero: {
      eyebrow: "OffSec Authorized Training Partner",
      tagline: "Develop your own Windows exploits.",
      description:
        "OSED is the entry point to OffSec's exploit-development track. Reverse engineer real Windows binaries, find vulnerabilities, build working exploits with custom shellcode and ROP chains.",
    },
    whoIsItFor: ["Exploit developers", "Vulnerability researchers", "Red team developers"],
    prerequisites: ["x86 / x64 assembly familiarity", "C / C++ basics"],
    outcomes: [
      "Reverse Windows binaries with IDA / x64dbg",
      "Identify exploitable bugs (BoF, format strings, UAF)",
      "Build custom shellcode and ROP chains",
      "Pass the 48-hour OSED exam",
    ],
    // Aligned to official OffSec EXP-301 (OSED) syllabus — 12 modules.
    curriculum: [
      { module: "Module 01 · WinDbg and x86 Architecture", topics: ["WinDbg essentials & commands", "x86 / x64 register conventions", "PE format basics", "Stack & heap layout"] },
      { module: "Module 02 · Exploiting Stack Overflows", topics: ["Vanilla EIP control", "Bad-character analysis", "Shellcode payload selection", "Return-address calculation"] },
      { module: "Module 03 · Exploiting SEH Overflows", topics: ["Structured Exception Handler chain", "POP-POP-RET technique", "SafeSEH considerations"] },
      { module: "Module 04 · Introduction to IDA Pro", topics: ["Static analysis workflow", "Function navigation & cross-references", "FLIRT signatures", "Hex-Rays decompiler basics"] },
      { module: "Module 05 · Overcoming Space Restrictions — Egghunters", topics: ["Egghunter algorithms", "Optimizing for limited buffers", "Choosing eggs that survive sanitization"] },
      { module: "Module 06 · Creating Custom Shellcode", topics: ["Writing assembly shellcode from scratch", "Position-independent code", "Encoder / decoder design"] },
      { module: "Module 07 · Reverse Engineering for Bugs", topics: ["Identifying vulnerable functions", "Tracing tainted input", "Recognizing common vulnerability patterns"] },
      { module: "Module 08 · Stack Overflows and DEP Bypass", topics: ["Data Execution Prevention (NX) introduction", "Return-Oriented Programming (ROP)", "Building ROP chains with mona.py"] },
      { module: "Module 09 · Stack Overflows and ASLR Bypass", topics: ["Address-Space Layout Randomization", "Information-leak vulnerabilities", "Partial / full address overwrite"] },
      { module: "Module 10 · Format String Specifier Attack — Part 1", topics: ["Format-string vulnerability theory", "Reading arbitrary memory", "Stack-frame disclosure"] },
      { module: "Module 11 · Format String Specifier Attack — Part 2", topics: ["Writing arbitrary memory with %n", "Achieving RCE via format strings"] },
      { module: "Module 12 · Trying Harder — The Labs (capstone)", topics: ["Three full exploit chains", "Reverse + exploit + payload chain", "48-hour exam preparation"] },
      { module: "Macksofy bootcamp · CTF practice & exploit walkthroughs", topics: ["Modern Windows targets", "Bypass-mitigation case studies", "Mock 48-hour exam"] },
    ],
    toolsCovered: ["IDA Pro", "Ghidra", "x64dbg", "WinDbg", "mona.py", "Python (exploit dev)"],
    careerRoles: [
      { role: "Exploit Developer", salaryINR: "₹20–40 LPA", experience: "3+ years" },
      { role: "Vulnerability Researcher", salaryINR: "₹25–50 LPA", experience: "4+ years" },
    ],
    placement: STD_PLACEMENT,
    testimonials: [],
    faqs: [
      { q: "How hard is OSED compared to OSCP?", a: "OSED is significantly harder for most students because it requires assembly fluency. Plan for 4-6 months of preparation." },
    ],
    seoTitle: "OSED EXP-301 Training Mumbai | Exploit Development | Macksofy",
    seoDescription: "OffSec OSED (EXP-301) Windows exploit development training. Reverse engineering, ROP, shellcode, 48-hour exam. ₹1,45,000 (15% OFF).",
    keywords: ["OSED training India", "EXP-301 Mumbai", "exploit development course India", "OSED bootcamp"],
  },

  {
    slug: "exp-312-osmr",
    code: "OSMR / EXP-312",
    title: "OSMR — Advanced macOS Control Bypasses (EXP-312)",
    shortTitle: "OSMR",
    level: "Professional",
    vendor: "OffSec",
    image: "/courses/OSMR.jpg",
    duration: "90-day OffSec lab + 48-hour exam",
    format: "Hybrid · Macksofy mentorship + OffSec course",
    priceINR: 145000,
    originalPriceINR: 170588,
    discountPercent: 15,
    hero: {
      eyebrow: "OffSec Authorized Training Partner",
      tagline: "macOS-specific exploitation tradecraft.",
      description:
        "OSMR is the only OffSec course dedicated to macOS. Covers TCC bypass, Gatekeeper evasion, kernel-level injection — niche but high-demand skills as macOS adoption grows in enterprise fleets.",
    },
    whoIsItFor: ["macOS security researchers", "Red team developers", "Enterprise security engineers managing Mac fleets"],
    prerequisites: ["Reverse engineering experience", "macOS internals familiarity"],
    outcomes: [
      "Bypass macOS security controls (TCC, Gatekeeper, XProtect)",
      "Develop macOS-specific payloads and persistence",
      "Pass the 48-hour OSMR exam",
    ],
    // Aligned to official OffSec EXP-312 (OSMR) syllabus — 14 modules.
    curriculum: [
      { module: "Module 01 · macOS Control Bypasses — Introduction", topics: ["macOS security model overview", "Apple silicon vs Intel considerations", "OffSec methodology for macOS"] },
      { module: "Module 02 · Virtualizing macOS for the OSMR Lab", topics: ["macOS VM setup (UTM / VMware)", "Snapshot & isolation discipline", "Lab tooling install"] },
      { module: "Module 03 · macOS Architecture", topics: ["XNU kernel basics", "Mach-O binary format", "Frameworks, dylibs, plists"] },
      { module: "Module 04 · Bypassing Quarantine", topics: ["com.apple.quarantine xattr", "First-launch user warnings", "Quarantine removal techniques"] },
      { module: "Module 05 · Bypassing Translocation Restrictions", topics: ["App-Translocation mechanism", "Detecting & escaping read-only mounts", "Persistence around translocation"] },
      { module: "Module 06 · Bypassing Code Signing", topics: ["Code-signature verification", "Symlink & resource modification attacks", "Third-party signing exploitation"] },
      { module: "Module 07 · Bypassing Gatekeeper", topics: ["Gatekeeper assessment workflow", "Bundle-structure attacks", "First-run bypass research"] },
      { module: "Module 08 · Bypassing Notarization", topics: ["Apple Notary Service overview", "Stapled tickets vs online checks", "Detection-bypass case studies"] },
      { module: "Module 09 · Manipulating App Transport Security", topics: ["ATS configuration plist", "Disabling for malicious bundles", "Network-payload delivery"] },
      { module: "Module 10 · Bypassing System Integrity Protection (SIP)", topics: ["SIP-protected paths & operations", "Boot-time bypass research", "Configuration weakness exploitation"] },
      { module: "Module 11 · Bypassing TCC", topics: ["Transparency, Consent, and Control", "User-prompt bypass", "Database manipulation techniques"] },
      { module: "Module 12 · Code Injection in macOS", topics: ["DYLD_INSERT_LIBRARIES", "Mach task-port hijacking", "Process-injection mitigations"] },
      { module: "Module 13 · Authentication & Authorization Attacks", topics: ["Authorization plug-ins", "Pluggable Authentication Modules (PAM)", "Privileged-helper exploitation"] },
      { module: "Module 14 · Custom Payloads + Sudo Exploitation + Trying Harder", topics: ["Building macOS-specific payloads", "Modern sudo CVE research", "48-hour exam preparation"] },
      { module: "Macksofy bootcamp · macOS enterprise fleet attack chains", topics: ["MDM-misconfiguration exploitation", "Real-world Mac fleet engagement walkthrough"] },
    ],
    toolsCovered: ["Hopper Disassembler", "lldb", "Xcode / Instruments", "Python", "Objective-C / Swift basics"],
    careerRoles: [
      { role: "macOS Security Researcher", salaryINR: "₹25–45 LPA", experience: "3+ years" },
      { role: "Mac-fleet Red Team Developer", salaryINR: "₹22–40 LPA", experience: "3+ years" },
    ],
    placement: STD_PLACEMENT,
    testimonials: [],
    faqs: [
      { q: "Why take OSMR?", a: "macOS in enterprise is exploding (developer fleets, finance). Specialists are rare and well-paid. OSMR is the credential of choice." },
    ],
    seoTitle: "OSMR EXP-312 macOS Exploitation Training | Macksofy India",
    seoDescription: "OffSec OSMR (EXP-312) advanced macOS control bypasses training. TCC, Gatekeeper, code injection, 48-hour exam. ₹1,45,000 (15% OFF).",
    keywords: ["OSMR training India", "EXP-312", "macOS security course", "OSMR bootcamp India"],
  },

  {
    slug: "exp-401-osee",
    code: "OSEE / EXP-401",
    title: "OSEE — Advanced Windows Exploitation (EXP-401)",
    shortTitle: "OSEE",
    level: "Professional",
    vendor: "OffSec",
    image: "/courses/OSEE.png",
    duration: "Live in-person training · 72-hour exam",
    format: "Live classroom (select global locations) · Macksofy facilitates enrollment",
    priceINR: 145000,
    originalPriceINR: 170588,
    discountPercent: 15,
    hero: {
      eyebrow: "OffSec Authorized Training Partner",
      tagline: "OffSec's hardest certification.",
      description:
        "OSEE (formerly AWE) is the pinnacle of Windows exploit development — kernel exploitation, sandbox escapes, modern mitigation bypass. Available as classroom-only training. Macksofy facilitates enrollment and pre-training mentorship.",
    },
    whoIsItFor: ["Vulnerability researchers", "Red team exploit developers", "Senior security engineers"],
    prerequisites: ["OSED required", "Strong assembly + Windows internals"],
    outcomes: [
      "Exploit kernel-mode vulnerabilities",
      "Bypass CFG, CET, ACG and other modern mitigations",
      "Pass the 72-hour OSEE exam",
    ],
    // Aligned to official OffSec EXP-401 (OSEE / AWE) syllabus — 12 advanced modules.
    curriculum: [
      { module: "Module 01 · Custom Function Hooking — User & Kernel Mode", topics: ["Inline hooks & detours", "IAT / EAT hooking", "Kernel callback abuse"] },
      { module: "Module 02 · Modern Microsoft Browser Exploitation — Use-After-Free", topics: ["JavaScript-engine internals", "UAF object-reuse strategy", "Heap-feng-shui in JIT"] },
      { module: "Module 03 · Hardening Bypass — Disabling CFG and ACG via Kernel Mode", topics: ["Control-Flow Guard architecture", "Arbitrary Code Guard internals", "Kernel-side bitmap manipulation"] },
      { module: "Module 04 · Sandbox Escape — Microsoft Edge", topics: ["Browser sandbox architecture", "Broker-process attacks", "IPC fuzzing approach"] },
      { module: "Module 05 · Kernel Driver Code Auditing", topics: ["IOCTL surface enumeration", "Driver-call-trace analysis", "Common driver-flaw classes"] },
      { module: "Module 06 · Reverse Engineering and Vulnerability Discovery", topics: ["Targeted RE workflow for kernel binaries", "Spotting exploitable patterns", "Documentation discipline"] },
      { module: "Module 07 · Stack Overflows", topics: ["Modern Windows stack-cookie behaviour", "Bypassing Stack Cookie / GS protection", "Building reliable kernel stack exploits"] },
      { module: "Module 08 · Use-After-Free", topics: ["Kernel UAF identification", "Object-relinquish primitives", "Type-confusion pivots"] },
      { module: "Module 09 · Pool Overflows", topics: ["Windows kernel pool internals", "Pool-feng-shui techniques", "Reliable pool-overflow exploitation"] },
      { module: "Module 10 · Race Conditions", topics: ["Kernel TOCTOU patterns", "Multi-thread exploit primitives", "Stabilizing racy exploits"] },
      { module: "Module 11 · Logical Vulnerabilities", topics: ["Privilege-confusion bugs", "Reference-counting & lifetime issues", "Permission misconfiguration in drivers"] },
      { module: "Module 12 · Custom Shellcode", topics: ["Kernel-mode shellcode design", "Token stealing & process elevation", "Restoring the kernel after exploitation"] },
      { module: "Macksofy facilitation · Pre-OSEE prep mentorship", topics: ["Self-study roadmap", "Exam logistics & travel coordination (classroom-only)", "1:1 mentor sessions before / after"] },
    ],
    toolsCovered: ["WinDbg", "IDA Pro", "Ghidra", "Custom kernel debugger setups"],
    careerRoles: [
      { role: "Senior Vulnerability Researcher", salaryINR: "₹40–80 LPA", experience: "5+ years" },
      { role: "Elite Exploit Developer", salaryINR: "₹50 LPA+", experience: "7+ years" },
    ],
    placement: STD_PLACEMENT,
    testimonials: [],
    faqs: [
      { q: "Is OSEE delivered in India?", a: "OSEE is currently classroom-only. Macksofy facilitates enrollment for the live training (typically held in select global locations) and provides 1:1 prep." },
    ],
    seoTitle: "OSEE EXP-401 Advanced Windows Exploitation | Macksofy India",
    seoDescription: "OffSec OSEE (EXP-401) advanced Windows exploitation. Macksofy India facilitates enrollment and prep mentorship. ₹1,45,000 (15% OFF).",
    keywords: ["OSEE training India", "EXP-401", "advanced Windows exploitation", "OSEE prep India"],
  },

  // ============================================================
  // COMPTIA
  // ============================================================
  {
    slug: "cysa-plus",
    code: "CySA+ (CS0-003)",
    title: "CompTIA Cybersecurity Analyst (CySA+)",
    shortTitle: "CySA+",
    level: "Intermediate",
    vendor: "CompTIA",
    image: "/courses/CSA-Product-Cover-1.jpg",
    duration: "40 hours · 5 days",
    format: "Live instructor-led · Online + Mumbai BKC",
    priceINR: 40000,
    hero: {
      eyebrow: "CompTIA Authorized Training Partner",
      tagline: "Vendor-neutral. Globally recognized. DoD compliant.",
      description:
        "CySA+ is CompTIA's intermediate cybersecurity analyst credential — heavily focused on threat hunting, SOC operations and software vulnerability management. DoD 8570/8140 compliant. Recognized worldwide.",
    },
    whoIsItFor: ["SOC analysts", "Vulnerability analysts", "DoD / government contractors"],
    prerequisites: ["Network+ and Security+ recommended"],
    outcomes: [
      "Apply behavioural analytics for threat detection",
      "Manage software vulnerabilities and patching",
      "Respond to security incidents",
      "Pass the CompTIA CySA+ exam (CS0-003)",
    ],
    // Aligned to official CompTIA CySA+ CS0-003 exam objectives — 4 domains.
    curriculum: [
      { module: "Domain 1 · Security Operations (33%)", topics: ["System & network architecture concepts", "Operating systems, infrastructure, network architecture", "Log ingestion & analysis", "Identity & access management", "Cryptography & PKI fundamentals", "Threat-intelligence sources & quality", "Threat-hunting concepts & methodology", "Process improvement & efficiency in SecOps"] },
      { module: "Domain 2 · Vulnerability Management (30%)", topics: ["Vulnerability scanning methods & concepts", "Common vulnerability classes (OWASP, CWE, CVE)", "CVSS 3.1 + business-context risk scoring", "Output analysis from Nessus / Qualys / Nuclei", "Compensating controls when patches aren't viable", "Inhibitor identification & vulnerability response prioritisation"] },
      { module: "Domain 3 · Incident Response & Management (20%)", topics: ["Attack methodologies — MITRE ATT&CK / Cyber Kill Chain / Diamond Model", "Incident response process (NIST SP 800-61)", "Detection, containment, eradication, recovery", "Forensic basics — disk, memory, network", "Post-incident lessons learned"] },
      { module: "Domain 4 · Reporting & Communication (17%)", topics: ["Vulnerability-management reporting", "Compliance reporting (PCI-DSS, HIPAA, GDPR)", "IR communication — executives, legal, customers, regulators", "Metrics & KPIs for SOC operations", "Stakeholder communication discipline"] },
      { module: "Macksofy bootcamp · Hands-on labs", topics: ["Splunk SPL & Enterprise Security walkthrough", "Wireshark + Zeek packet investigation", "Nessus + Qualys workflow practice", "End-to-end IR tabletop exercise"] },
      { module: "Capstone · CySA+ exam preparation", topics: ["Performance-based question (PBQ) practice", "Two full mock exams under timed conditions", "Cut-score analysis & weak-area drilling"] },
    ],
    toolsCovered: ["Splunk", "Wireshark", "Nessus", "Metasploit (defensive use)"],
    careerRoles: [
      { role: "Cybersecurity Analyst", salaryINR: "₹6–10 LPA", experience: "1–3 years" },
      { role: "SOC Analyst (DoD-compliant orgs)", salaryINR: "₹7–12 LPA", experience: "2–4 years" },
    ],
    placement: STD_PLACEMENT,
    testimonials: [],
    faqs: [
      { q: "Is CySA+ worth it in India?", a: "Yes — CySA+ is increasingly required by MNCs and DoD-adjacent contractors. It's also a strong CV item for global roles." },
    ],
    seoTitle: "CompTIA CySA+ Training Mumbai | Authorized Partner | Macksofy",
    seoDescription: "CompTIA CySA+ training in Mumbai by authorized partner Macksofy. Hands-on labs, exam voucher, ₹40,000.",
    keywords: ["CySA+ training Mumbai", "CompTIA CySA+ India", "CS0-003 training"],
  },

  {
    slug: "linux-plus",
    code: "Linux+ (XK0-005)",
    title: "CompTIA Linux+",
    shortTitle: "Linux+",
    level: "Foundation",
    vendor: "CompTIA",
    image: "/courses/CSA-Product-Cover-1.jpg",
    duration: "40 hours · 5 days",
    format: "Live instructor-led · Online + Mumbai BKC",
    priceINR: 40000,
    hero: {
      eyebrow: "CompTIA Authorized Training Partner",
      tagline: "Job-focused Linux administration + security.",
      description:
        "CompTIA Linux+ covers system management, security, scripting and troubleshooting — distribution-neutral. A strong foundation for security and DevOps careers in India + UAE.",
    },
    whoIsItFor: ["IT admins", "Aspiring DevOps engineers", "Security professionals needing Linux depth"],
    prerequisites: ["Basic IT literacy"],
    outcomes: [
      "Configure and manage Linux systems",
      "Apply Linux security best practices",
      "Troubleshoot and write shell scripts",
      "Pass the CompTIA Linux+ exam (XK0-005)",
    ],
    // Aligned to official CompTIA Linux+ XK0-005 exam objectives — 4 domains.
    curriculum: [
      { module: "Domain 1 · System Management (32%)", topics: ["Filesystem hierarchy & navigation", "Users, groups, file permissions, ACLs", "Package management — APT, DNF, RPM, Snap, Flatpak", "Storage — partitioning (parted, gdisk), LVM, RAID, filesystems (ext4, XFS, Btrfs, ZFS)", "Networking — IP, routing, NetworkManager, networkd, hostname, hosts file", "Services & systemd — units, targets, journalctl"] },
      { module: "Domain 2 · Security (21%)", topics: ["Authentication — PAM, sudo, SSH key management", "Authorization — file permissions, ACLs, capabilities", "Mandatory Access Control — SELinux & AppArmor policies", "Firewalls — iptables, nftables, firewalld, ufw", "Cryptography — GPG, OpenSSL, hashing fundamentals", "System hardening — kernel parameters, audit framework"] },
      { module: "Domain 3 · Scripting, Containers & Automation (19%)", topics: ["Bash scripting — variables, conditionals, loops, functions", "Regular expressions — grep, sed, awk", "Cron, anacron, systemd timers", "Containers — Docker, Podman fundamentals", "Container orchestration concepts — Kubernetes basics", "Configuration management — Ansible playbook basics"] },
      { module: "Domain 4 · Troubleshooting (28%)", topics: ["Storage problems — disk usage, mount issues, FS corruption", "Networking problems — DNS, routing, firewall, packet capture", "CPU / memory / IO — top, htop, iostat, vmstat, sar", "Boot & service failures — GRUB, systemd, journalctl", "User access issues — login, SSH, sudo, PAM debugging", "Performance tuning fundamentals"] },
      { module: "Macksofy bootcamp · Hands-on labs", topics: ["Multi-distro lab environment (Ubuntu, RHEL, Debian, Arch)", "Real production-style troubleshooting scenarios", "Capstone: deploy + harden + monitor a multi-service Linux server"] },
    ],
    toolsCovered: ["Bash", "systemd", "iptables / nftables", "SELinux / AppArmor", "Ansible"],
    careerRoles: [
      { role: "Linux System Administrator", salaryINR: "₹4–8 LPA", experience: "0–2 years" },
      { role: "Junior DevOps Engineer", salaryINR: "₹6–11 LPA", experience: "1–3 years" },
    ],
    placement: STD_PLACEMENT,
    testimonials: [],
    faqs: [
      { q: "Is Linux+ enough to get a sysadmin job?", a: "Yes for entry-level roles. For DevOps, pair with cloud (AWS/Azure) and a CI/CD tool." },
    ],
    seoTitle: "CompTIA Linux+ Training Mumbai | Macksofy",
    seoDescription: "CompTIA Linux+ XK0-005 training in Mumbai. Hands-on labs, ₹40,000 includes exam voucher.",
    keywords: ["Linux+ training Mumbai", "CompTIA Linux training India", "XK0-005"],
  },

  {
    slug: "server-plus",
    code: "Server+ (SK0-005)",
    title: "CompTIA Server+",
    shortTitle: "Server+",
    level: "Foundation",
    vendor: "CompTIA",
    image: "/courses/CSA-Product-Cover-1.jpg",
    duration: "40 hours · 5 days",
    format: "Live instructor-led · Online + Mumbai BKC",
    priceINR: 40000,
    hero: {
      eyebrow: "CompTIA Authorized Training Partner",
      tagline: "Hands-on server administration certification.",
      description:
        "Server+ is CompTIA's flagship server-admin certification covering hardware, virtualization, security and disaster recovery across physical, virtual and cloud servers.",
    },
    whoIsItFor: ["Server administrators", "Data center technicians", "IT generalists upskilling"],
    prerequisites: ["Network+ recommended"],
    outcomes: [
      "Install, configure and maintain servers",
      "Implement virtualization and storage",
      "Apply server security and DR plans",
      "Pass the CompTIA Server+ exam (SK0-005)",
    ],
    // Aligned to official CompTIA Server+ SK0-005 exam objectives — 4 domains.
    curriculum: [
      { module: "Domain 1 · Server Hardware Installation & Management (18%)", topics: ["Server form factors (rack, blade, tower)", "CPU, memory, storage architecture", "Storage technologies — RAID 0/1/5/6/10, SAS, SATA, NVMe, SAN, NAS", "Power & environmental considerations", "Server peripherals & connectivity"] },
      { module: "Domain 2 · Server Administration (30%)", topics: ["Operating system installation (Windows Server, RHEL, Ubuntu Server)", "Server roles & features", "Virtualization — VMware ESXi, Microsoft Hyper-V, KVM, Proxmox", "Cloud server deployment basics (AWS EC2, Azure VMs)", "Patch management & monitoring", "Identity & access management on servers"] },
      { module: "Domain 3 · Security & Disaster Recovery (24%)", topics: ["Physical security & access control", "Server hardening — CIS benchmarks", "Patching & vulnerability management", "Backup strategies — full, incremental, differential, synthetic", "Backup types — disk, tape, cloud, off-site", "Disaster Recovery planning — RTO, RPO, DR sites (cold/warm/hot)", "Encryption at rest & in transit"] },
      { module: "Domain 4 · Troubleshooting (28%)", topics: ["Hardware troubleshooting — POST codes, RAID rebuild, memory diagnostics", "OS & application troubleshooting", "Networking — connectivity, DNS, firewall", "Storage — performance, capacity, replication", "Security incidents — log analysis & forensic basics", "Methodology — CompTIA troubleshooting framework"] },
      { module: "Macksofy bootcamp · Hands-on labs", topics: ["Multi-hypervisor lab (ESXi + Hyper-V + KVM)", "RAID build, monitoring & rebuild simulation", "Backup + DR exercise (Veeam + native tools)", "Capstone: deploy a 3-tier server estate from bare metal to monitoring"] },
    ],
    toolsCovered: ["VMware ESXi", "Hyper-V", "KVM", "Backup software (Veeam basics)"],
    careerRoles: [
      { role: "Server Administrator", salaryINR: "₹4–8 LPA", experience: "0–2 years" },
      { role: "Data Center Technician", salaryINR: "₹4–7 LPA", experience: "0–2 years" },
    ],
    placement: STD_PLACEMENT,
    testimonials: [],
    faqs: [
      { q: "How is Server+ different from MCSA?", a: "Server+ is vendor-neutral, MCSA is Microsoft-specific. Server+ is broader and travels better between job environments." },
    ],
    seoTitle: "CompTIA Server+ Training Mumbai | Macksofy",
    seoDescription: "CompTIA Server+ SK0-005 training in Mumbai by authorized partner Macksofy. Hands-on labs, ₹40,000.",
    keywords: ["Server+ training Mumbai", "CompTIA Server training India", "SK0-005"],
  },

  // ============================================================
  // MACKSOFY CAREER TRACKS (custom programs)
  // ============================================================
  {
    slug: "soc-analyst",
    code: "SOC-A (Macksofy)",
    title: "Macksofy SOC Analyst — Career Track (8 weeks)",
    shortTitle: "SOC Analyst Track",
    level: "Foundation",
    vendor: "Macksofy",
    image: "/courses/CSA-Product-Cover-1.jpg",
    duration: "8 weeks · 80 hours including labs",
    format: "Hybrid · Live online + Mumbai BKC classroom",
    priceINR: 45000,
    popular: true,
    hero: {
      eyebrow: "Macksofy Career Track · Blue Team",
      tagline: "Detect what attackers hope you'll miss.",
      description:
        "Macksofy's career-grade SOC Analyst track. Job-ready in 8 weeks with hands-on Wazuh + ELK + Splunk, MITRE ATT&CK detection engineering, real incident response playbooks built from our own engagements. Many students take this alongside CSA / SOC-200 for credentialing.",
    },
    whoIsItFor: [
      "IT / network admins moving into security operations",
      "Cybersecurity students and freshers targeting SOC roles",
      "DevOps engineers wanting blue-team depth",
      "CEH holders wanting the defensive flip-side",
    ],
    prerequisites: [
      "Networking fundamentals (TCP/IP, common protocols)",
      "Basic Linux + Windows administration",
      "No prior security experience needed",
    ],
    outcomes: [
      "Operate a SIEM (Wazuh, ELK, Splunk) end-to-end",
      "Write Sigma detection rules mapped to MITRE ATT&CK",
      "Triage incidents using the SANS / NIST IR lifecycle",
      "Conduct basic threat hunting with hypothesis-driven searches",
      "Be ready for SOC L1/L2 interviews at MSSPs, banks, large enterprises",
    ],
    curriculum: [
      { module: "Module 1 · SOC Fundamentals", durationHours: 6, topics: ["SOC tiers (L1/L2/L3)", "MITRE ATT&CK framework", "NIST CSF & incident response lifecycle"] },
      { module: "Module 2 · Logging Foundations", durationHours: 8, topics: ["Sysmon configuration (industry-standard ruleset)", "Windows event log essentials (4624, 4625, 4688, 4720)", "Linux audit logs, rsyslog, journald"] },
      { module: "Module 3 · Wazuh + ELK Stack (Macksofy lab)", durationHours: 12, topics: ["Wazuh manager + agent deployment", "ELK pipeline: Logstash filters, Elasticsearch index design", "Kibana dashboards for SOC metrics", "Custom rule development in Wazuh"] },
      { module: "Module 4 · Splunk Foundations", durationHours: 8, topics: ["SPL essentials, time ranges, indexes", "Saved searches and alerts", "Splunk Enterprise Security overview"] },
      { module: "Module 5 · Detection Engineering", durationHours: 10, topics: ["Sigma rule writing (cross-SIEM portable)", "Detection coverage mapping to MITRE ATT&CK", "False positive tuning workflows"] },
      { module: "Module 6 · Threat Intelligence", durationHours: 6, topics: ["MISP & OpenCTI for IOC management", "Threat feed integration into SIEM", "Indicator pivoting and enrichment"] },
      { module: "Module 7 · Incident Response", durationHours: 12, topics: ["TheHive + Cortex case management", "Phishing IR playbook", "Ransomware IR playbook", "Cloud incident playbooks"] },
      { module: "Module 8 · Capstone — Live SOC Simulation", durationHours: 18, topics: ["48-hour simulated SOC shift", "Real attack scenarios injected", "End-to-end IR documentation"] },
    ],
    toolsCovered: ["Wazuh", "Elastic Stack (ELK)", "Splunk", "Sysmon", "Sigma", "MITRE ATT&CK Navigator", "MISP", "OpenCTI", "TheHive", "Cortex", "Velociraptor", "Suricata", "Zeek", "Wireshark"],
    careerRoles: [
      { role: "SOC Analyst L1", salaryINR: "₹4–6 LPA", experience: "0–1 years" },
      { role: "SOC Analyst L2", salaryINR: "₹7–11 LPA", experience: "1–3 years" },
      { role: "Threat Hunter", salaryINR: "₹12–18 LPA", experience: "3–5 years" },
      { role: "Detection Engineer", salaryINR: "₹15–22 LPA", experience: "3–5 years" },
    ],
    placement: {
      summary: "SOC roles are the fastest-growing entry-point in Indian cybersecurity. Our placement desk works directly with MSSPs and BFSI SOCs in Mumbai, Bangalore, Pune and Hyderabad.",
      points: [
        "Real-world SOC ticket triage practice on our internal platform",
        "Mock interviews with active SOC L3 / managers",
        "Direct intros to hiring partners",
        "UAE placement support (Dubai, Abu Dhabi MSSPs hire heavily)",
      ],
    },
    testimonials: [
      { name: "Sneha K.", role: "SOC Analyst L1, Mumbai BFSI", quote: "Joined a top private bank's SOC 2 weeks after completing the course. The Wazuh labs were exactly what they tested me on." },
    ],
    faqs: [
      { q: "Do you cover Splunk or only Wazuh?", a: "Both. Wazuh + ELK is our hands-on lab (free, open source, extremely employable in India). We also cover Splunk SPL and Enterprise Security so you can interview confidently for either stack." },
      { q: "What's the placement timeline?", a: "Most students secure SOC L1 roles within 4–8 weeks of completing the course, given the volume of openings." },
      { q: "How does this differ from EC-Council CSA?", a: "Our SOC Analyst track is a longer, deeper career program with more hands-on lab time and direct placement focus. EC-Council CSA gives you a recognized vendor credential. Many students take both." },
    ],
    seoTitle: "SOC Analyst Training in Mumbai & India | Wazuh + ELK + Splunk | Macksofy",
    seoDescription: "Become a job-ready SOC analyst in 8 weeks. Hands-on Wazuh, ELK, Splunk + MITRE ATT&CK. ₹45,000 with placement support. Live online + Mumbai classroom.",
    keywords: ["SOC analyst training Mumbai", "SOC analyst course India", "Wazuh training", "Splunk training Mumbai", "blue team training India", "SOC L1 training"],
  },

  {
    slug: "web-application-security",
    code: "WAS-PRO (Macksofy)",
    title: "Web Application Security Specialist — Career Track",
    shortTitle: "Web App Security Track",
    level: "Intermediate",
    vendor: "Macksofy",
    image: "/courses/OSWE.jpg",
    duration: "10 weeks · 100 hours including PortSwigger labs",
    format: "Live online with Macksofy mentor + 200+ Burp Suite Academy labs",
    priceINR: 65000,
    hero: {
      eyebrow: "Macksofy Career Track · AppSec",
      tagline: "Break web apps. Help builders fix them.",
      description:
        "Become a senior-grade web pen-tester. We go beyond CEH-level OWASP into business-logic flaws, authentication patterns, modern SPAs, GraphQL, OAuth attacks and source-code review — all the work that pays AppSec engineers the highest salaries in Indian cybersecurity. Pairs naturally with OSWA / OSWE for credentialing.",
    },
    whoIsItFor: [
      "Pen-testers who want to specialize in web/API security",
      "Bug bounty hunters serious about higher-payout findings",
      "Application security engineers at product companies",
      "CEH-or-equivalent holders ready to specialize",
    ],
    prerequisites: ["OWASP Top 10 conceptual familiarity", "Comfort with HTTP, sessions, JWT basics", "Bash + light Python scripting"],
    outcomes: [
      "Discover and exploit BOLA, IDOR, mass-assignment and access-control flaws",
      "Pwn modern stacks: SPAs, GraphQL, gRPC, OAuth2/OIDC flows",
      "Read source code (Java, Node, PHP) to find vulnerabilities white-box",
      "Write developer-friendly remediation that engineering teams actually accept",
      "Be ready for Web App Pen-Tester / AppSec Engineer roles (₹15-25 LPA range)",
    ],
    curriculum: [
      { module: "Module 1 · HTTP & Web Fundamentals (deep)", durationHours: 6, topics: ["HTTP/1.1 vs HTTP/2 vs HTTP/3 attack surfaces", "Cookies, sessions, CSRF, SameSite", "CORS, Origin, CSP"] },
      { module: "Module 2 · Burp Suite Pro Mastery", durationHours: 8, topics: ["Proxy / Repeater / Intruder / Comparer", "Custom extensions (Python via Jython, Burp BApps)", "Active scan tuning"] },
      { module: "Module 3 · Injection Family", durationHours: 10, topics: ["SQLi: in-band, blind, time-based, second-order", "NoSQL injection (MongoDB)", "Command injection, SSRF, server-side template injection (SSTI)", "XXE in modern stacks"] },
      { module: "Module 4 · Auth & Access Control", durationHours: 10, topics: ["Session/token attacks: JWT (alg confusion, kid injection)", "OAuth 2.0 / OIDC flaws", "Password reset / account recovery flaws", "BOLA / IDOR / mass-assignment patterns"] },
      { module: "Module 5 · Modern Web Attacks", durationHours: 10, topics: ["Prototype pollution (Node.js)", "DOM XSS in SPAs (React, Vue)", "Web cache deception, web cache poisoning", "HTTP request smuggling"] },
      { module: "Module 6 · API Security", durationHours: 10, topics: ["REST API testing (OWASP API Top 10)", "GraphQL: introspection, depth attacks, batching", "gRPC and Protocol Buffers fuzzing"] },
      { module: "Module 7 · Source Code Review", durationHours: 10, topics: ["Reading PHP, Java, Node.js for vuln patterns", "Semgrep custom rule writing", "Common sink/source analysis"] },
      { module: "Module 8 · Capstone CTF + Real App Audit", durationHours: 30, topics: ["5-day audit of a deliberately vulnerable production-like app", "Full report deliverable"] },
    ],
    toolsCovered: ["Burp Suite Pro", "OWASP ZAP", "Caido", "ffuf", "Wfuzz", "sqlmap", "Nuclei", "Postman", "Insomnia", "GraphQL Voyager / InQL", "Semgrep", "CodeQL", "JD-GUI / JADX", "Frida (web hooks)"],
    careerRoles: [
      { role: "Web Application Pen-Tester", salaryINR: "₹10–18 LPA", experience: "2–4 years" },
      { role: "Application Security Engineer", salaryINR: "₹15–28 LPA", experience: "3–6 years" },
      { role: "Bug Bounty Hunter (full-time)", salaryINR: "₹15–60 LPA*", experience: "Variable" },
    ],
    placement: {
      summary: "AppSec is the highest-paid sub-discipline in Indian cybersecurity. Strong product companies (fintechs, SaaS) and BFSI hire heavily.",
      points: [
        "Bug bounty mentorship — we'll review your first 5 reports",
        "Direct intros to AppSec hiring at product companies",
        "Resume + interview prep tailored to AppSec hiring loops",
      ],
    },
    testimonials: [
      { name: "Aisha K.", role: "AppSec Engineer · Listed Fintech", quote: "The business-logic and access-control modules unlocked findings I'd been missing for a year. Salary went up 60% within 6 months of completing." },
    ],
    faqs: [
      { q: "Do I need OSCP first?", a: "Not necessarily. OSCP and Web App Security cover overlapping but different ground. Many students take this course before OSCP if AppSec is the career goal." },
      { q: "Is bug bounty income realistic?", a: "Yes — but it takes consistency. Several Macksofy alumni earn ₹2–10 lakhs/month from bounties as a side income while holding a full-time AppSec role." },
      { q: "How does this differ from OSWE?", a: "Our track is broader (covers REST + GraphQL + gRPC + modern frameworks) and more career-focused. OSWE is a deeper white-box source-review specialist credential. Pair them for the strongest CV." },
    ],
    seoTitle: "Web Application Security Training in Mumbai & India | Macksofy",
    seoDescription: "Become a senior web app / API pen-tester in 10 weeks. OWASP API Top 10, OAuth attacks, GraphQL, source review. ₹65,000 with mentor + 200+ Burp Suite labs.",
    keywords: ["web application security training", "web app pentest course India", "AppSec training Mumbai", "API security training India", "Burp Suite training"],
  },

  {
    slug: "corporate-training",
    code: "CORP",
    title: "Corporate Cybersecurity Training (Customized)",
    shortTitle: "Corporate Training",
    level: "Foundation",
    vendor: "Macksofy",
    image: "/courses/OSCC.jpg",
    duration: "Customized · typical engagements 2–10 days",
    format: "On-site or virtual · India + UAE",
    hero: {
      eyebrow: "For Engineering Teams, IT, Boards & Specialist Squads",
      tagline: "Cybersecurity training built around your stack and threats.",
      description:
        "Off-the-shelf training doesn't move the needle for security teams that already work in production. Macksofy designs corporate programs around your tech stack, your threat model and your maturity level — delivered by working pen-testers, not academic instructors.",
    },
    whoIsItFor: [
      "Engineering teams adopting secure-coding practices",
      "IT / SOC teams onboarding new analysts",
      "Boards & C-suite needing cyber-resilience briefings",
      "Specialist squads (red team, AppSec, cloud security)",
    ],
    prerequisites: ["Customized — we do a needs assessment first"],
    outcomes: [
      "Customized curriculum mapped to your threat model and tech stack",
      "Hands-on labs in your real environment (or Macksofy's cyber range)",
      "Pre / post assessments to measurably move the needle",
      "Recorded sessions and lab artifacts for ongoing use",
    ],
    curriculum: [
      { module: "Track A · Secure Coding for Developers", topics: ["OWASP Top 10 for your specific stack (Java/Spring, Node, .NET, Python/Django, Go)", "Threat modeling workshops", "Hands-on lab in a deliberately vulnerable app", "Code review workflow + Semgrep customization"] },
      { module: "Track B · DevSecOps & CI/CD Security", topics: ["SAST / DAST / SCA pipeline integration", "Secrets scanning, IaC security", "Container & K8s security (Trivy, kube-bench, kube-hunter)"] },
      { module: "Track C · SOC Onboarding", topics: ["SIEM-specific training (Splunk / Sentinel / Wazuh / Elastic)", "Real ticket triage practice", "MITRE ATT&CK detection engineering"] },
      { module: "Track D · Executive Cyber Resilience", topics: ["Boardroom-level threat briefings", "Indian + UAE regulatory landscape (CERT-In, RBI, SEBI, NESA, DESC)", "Crisis simulation exercises"] },
      { module: "Track E · Specialist Squads", topics: ["Red team operator training (Cobalt Strike, Sliver, Mythic)", "Cloud security deep-dive (AWS / Azure / GCP)", "Mobile app security (iOS + Android)"] },
    ],
    toolsCovered: ["Customized to client stack", "Common: Burp Suite, Semgrep, Trivy, Wazuh, Splunk, Sentinel, Cobalt Strike, BloodHound"],
    careerRoles: [
      { role: "Outcome focused", salaryINR: "Team capability uplift, not individual placement", experience: "—" },
    ],
    placement: {
      summary: "Corporate engagements focus on team capability, not individual placement.",
      points: [
        "On-site delivery anywhere in India (Mumbai, Pune, Bangalore, Hyderabad, NCR)",
        "On-site delivery across UAE (Dubai, Abu Dhabi, Sharjah)",
        "Virtual delivery for distributed teams",
        "Recordings, labs and slide decks for internal reuse",
      ],
    },
    testimonials: [
      { name: "CISO, Listed Indian Bank", role: "(Reference available on request)", quote: "Macksofy's pentest team trained 40 of our developers over 4 weeks. Critical findings dropped 60% in the next quarter's audit." },
    ],
    faqs: [
      { q: "What's a typical engagement size?", a: "From a 2-day developer secure-coding workshop (10–20 people) to a multi-month engineering program. We scope on a discovery call." },
      { q: "Do you deliver in UAE?", a: "Yes. We have regional partners in Dubai and have delivered on-site engagements with banks, telcos and government across the UAE." },
      { q: "Can you align training to ISO 27001 / SOC 2 awareness requirements?", a: "Yes. We can structure training to satisfy specific compliance evidence needs." },
    ],
    seoTitle: "Corporate Cybersecurity Training in India & UAE | Macksofy",
    seoDescription: "Customized cybersecurity training for engineering teams, SOCs, boards and specialist squads. On-site India + UAE. Built by working pen-testers.",
    keywords: ["corporate cybersecurity training India", "corporate cybersecurity training UAE", "secure coding workshop Mumbai", "DevSecOps training India", "cyber resilience training"],
  },
];

export const getCourseBySlug = (slug: string) => COURSES.find((c) => c.slug === slug);
