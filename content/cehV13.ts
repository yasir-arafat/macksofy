/**
 * Content data for the national CEH v13 training landing page
 * (`/ceh-v13-training`).
 *
 * WHY THIS PAGE EXISTS — and what it must not do.
 * GSC (28d to 2026-08-09) showed the CEH / ethical-hacking cluster is 101
 * queries / 774 impressions / 36 clicks, split three ways:
 *   • the HOMEPAGE absorbs 580 impressions across 84 queries at positions
 *     1.8–6.6 and converts ZERO of them — "ethical hacking course in mumbai"
 *     alone is 150 impr at pos 2.1. That is the defect this page targets.
 *   • /training/ceh earns 35 of the cluster's 36 clicks from
 *     "ceh training in mumbai" (62 impr, pos 4.1 = 56% CTR). It is the site's
 *     best-converting page. THIS PAGE MUST NOT COMPETE WITH IT — leave the
 *     Mumbai/transactional intent to it and link there for enrolment.
 *   • /blog/ceh-v13-ai-training-india-2026 owns syllabus intent
 *     ("ceh v13 syllabus", 68 impr, pos 7.6). This page summarises the
 *     curriculum and links there for the deep syllabus treatment rather than
 *     re-publishing it.
 *
 * FACT DISCIPLINE. Every certification figure below is EC-Council's own,
 * carried over from the verified pass in commit cc77cb9 (module names are
 * EC-Council's spelling — "Sniffing", "Denial-of-Service" — not the
 * "Network Sniffing" variants third-party syllabus lists use). CEH v13 has
 * NO standalone AI module: AI is threaded through all 20. Do not add pass
 * rates, placement percentages, student counts, salary figures, reviews or
 * ratings — none are substantiated. Macksofy's EC-Council Accredited Training
 * Center status and CERT-In empanelment are both genuine; the OffSec family is
 * exam-prep only (see feedback_macksofy_offsec_claims).
 */

export interface CehModule {
  n: string;
  title: string;
  covers: string;
  skills: string;
}

/** EC-Council's 20 CEH v13 modules, verbatim titles. */
export const CEH_MODULES: CehModule[] = [
  { n: "01", title: "Introduction to Ethical Hacking", covers: "Security fundamentals, the five phases of hacking, hacker and attack classes, the Cyber Kill Chain and MITRE ATT&CK, plus the compliance framing behind authorised testing.", skills: "Frame an engagement legally and map an attack to a recognised kill-chain stage." },
  { n: "02", title: "Footprinting and Reconnaissance", covers: "Passive and active intelligence gathering — WHOIS and DNS, search-engine and social-media OSINT, competitive intelligence, and AI-assisted reconnaissance.", skills: "Build an accurate external attack-surface picture before touching a target." },
  { n: "03", title: "Scanning Networks", covers: "Host discovery, port and service scanning, OS fingerprinting, and evading scan detection.", skills: "Run and interpret a scan rather than dumping raw tool output." },
  { n: "04", title: "Enumeration", covers: "Pulling usernames, shares and service detail via NetBIOS, SNMP, LDAP, NTP, SMTP and DNS.", skills: "Turn open ports into named users, shares and versions worth attacking." },
  { n: "05", title: "Vulnerability Analysis", covers: "Vulnerability classification, CVSS scoring and scanner operation — with emphasis on reading the output rather than forwarding it.", skills: "Separate a real finding from scanner noise and score it defensibly." },
  { n: "06", title: "System Hacking", covers: "Password attacks, privilege escalation, execution, hiding artefacts and clearing logs.", skills: "Chain a foothold into privileged access on Windows and Linux." },
  { n: "07", title: "Malware Threats", covers: "Trojans, viruses, worms, fileless malware, APT behaviour, and the basics of static and dynamic analysis.", skills: "Recognise malware behaviour and describe it in an incident context." },
  { n: "08", title: "Sniffing", covers: "Packet capture, ARP poisoning, MAC flooding and DNS spoofing — and how defenders detect each.", skills: "Capture and read traffic, and explain the detection that catches it." },
  { n: "09", title: "Social Engineering", covers: "Pretexting, phishing, impersonation, insider threat and human-layer countermeasures.", skills: "Design an authorised phishing test and brief the awareness fix." },
  { n: "10", title: "Denial-of-Service", covers: "DoS and DDoS techniques, botnets, amplification and mitigation approaches.", skills: "Explain availability risk without running destructive tests on live systems." },
  { n: "11", title: "Session Hijacking", covers: "Application and network-level hijacking, token theft, replay attacks and defences.", skills: "Identify weak session handling and prove impact safely." },
  { n: "12", title: "Evading IDS, Firewalls, and Honeypots", covers: "Detection-evasion techniques, and how defenders spot them being used.", skills: "Test whether monitoring actually fires — the purple-team half of CEH." },
  { n: "13", title: "Hacking Web Servers", covers: "Server misconfiguration, patch-management failure, and web-server attack methodology.", skills: "Assess the server layer beneath an application." },
  { n: "14", title: "Hacking Web Applications", covers: "The web application attack surface — authentication, authorisation, input handling and the OWASP-aligned flaw classes.", skills: "Work a web app methodically instead of scanning and hoping." },
  { n: "15", title: "SQL Injection", covers: "Injection types, detection, exploitation, and parameterisation as the real defence.", skills: "Find, prove and correctly remediate injection." },
  { n: "16", title: "Hacking Wireless Networks", covers: "Wi-Fi encryption weaknesses, rogue access points and wireless attack tooling.", skills: "Assess a corporate wireless deployment." },
  { n: "17", title: "Hacking Mobile Platforms", covers: "Android and iOS attack surface, mobile malware, MDM and application-layer flaws.", skills: "Reason about mobile risk beyond the app binary." },
  { n: "18", title: "IoT and OT Hacking", covers: "IoT and OT protocols and architecture, ICS/SCADA exposure, and the safety constraints that make OT testing different.", skills: "Understand why OT testing is not IT testing with different ports." },
  { n: "19", title: "Cloud Computing", covers: "Cloud service models, container and serverless concerns, misconfiguration and shared-responsibility boundaries.", skills: "Locate the customer's half of the shared-responsibility line." },
  { n: "20", title: "Cryptography", covers: "Algorithms, PKI, encryption in transit and at rest, cryptanalysis and crypto-attack classes.", skills: "Judge whether a control is genuinely protecting data." },
];

/** Where AI legitimately assists an authorised tester. Not autonomous hacking. */
export const AI_WORKFLOW = [
  { stage: "Reconnaissance", body: "Summarise large OSINT and DNS datasets, cluster related assets, and surface the handful of hosts worth manual attention." },
  { stage: "Enumeration", body: "Normalise noisy service output across hundreds of hosts and flag version patterns a human would skim past." },
  { stage: "Analysis", body: "Cross-reference findings against known weakness classes and draft a first-pass severity rationale for the tester to accept or reject." },
  { stage: "Attack paths", body: "Propose plausible chains between findings so the tester can test the chain rather than reporting isolated issues." },
  { stage: "Testing", body: "Generate and adapt payload variations for authorised targets, and script repetitive verification steps." },
  { stage: "Reporting", body: "Draft finding descriptions and remediation wording, leaving evidence, proof and the final judgement with the tester." },
];

export const LEARNING_JOURNEY = [
  { step: "Learn", body: "Instructor-led sessions across the 20 modules, taught against how each technique appears in a real assessment." },
  { step: "Practice", body: "Guided exercises after each module so the technique is used, not just watched." },
  { step: "Lab", body: "Hands-on lab work in an isolated, authorised environment — the core of the course." },
  { step: "Assess", body: "Mock questions under exam conditions to expose weak modules while there is still time to fix them." },
  { step: "Certify", body: "Sit the CEH (312-50) knowledge exam; optionally continue to CEH Practical." },
  { step: "Apply", body: "Take the methodology into SOC, VAPT or security-analyst work — the point of the certificate." },
];

export const AUDIENCES = [
  { who: "Students and fresh graduates", gain: "A structured, vendor-recognised entry into security that HR filters actually screen for, plus lab hours you can talk about in an interview." },
  { who: "IT and system administrators", gain: "The attacker's view of the infrastructure you already run — usually the fastest route from IT into security." },
  { who: "Network engineers", gain: "Scanning, sniffing, evasion and wireless mapped onto the networks you design and defend." },
  { who: "SOC and security analysts", gain: "Offensive context for the alerts you triage; module 12 in particular explains what evasion looks like in your telemetry." },
  { who: "Aspiring penetration testers", gain: "The breadth layer and vocabulary that hands-on certifications assume you already have." },
  { who: "Developers and DevOps engineers", gain: "The web, SQL injection, cloud and cryptography modules, from the perspective of the person who will attack your build." },
  { who: "Career switchers", gain: "A defined syllabus and a recognised credential, with an honest view of the networking and Linux groundwork required first." },
  { who: "Compliance and audit professionals", gain: "Enough technical fluency to read a VAPT report critically and challenge a weak one." },
];

/** CEH v12 -> v13: only differences EC-Council itself positions. */
export const V12_VS_V13 = [
  { area: "AI in the curriculum", v12: "Not positioned as an AI-integrated course.", v13: "AI is threaded through all 20 modules as an assistive skill — there is no standalone AI module." },
  { area: "Module count", v12: "20 modules.", v13: "20 modules — the structure is retained, the content within it is refreshed." },
  { area: "Hands-on scope", v12: "Lab-heavy, delivered through EC-Council's lab environment.", v13: "221 labs, 550 attack techniques and exposure to 4,000+ hacking and security tools." },
  { area: "Attack surfaces", v12: "Cloud, IoT/OT, mobile and web already present.", v13: "Same surfaces, with contemporary techniques and tooling refreshed throughout." },
  { area: "Exam format", v12: "312-50 knowledge exam, plus the separate CEH Practical.", v13: "Unchanged — 125 multiple-choice questions over 4 hours, with CEH Practical still separate." },
];

export const CERT_COMPARISON = [
  { cert: "CEH v13", learner: "Breadth-first entrants and defenders", depth: "Wide coverage, guided labs", exam: "125 MCQ, 4 hours", use: "Recognised on Indian and Gulf job filters; the standard first security certificate." },
  { cert: "CompTIA Security+", learner: "Absolute beginners and compliance-adjacent roles", depth: "Foundational, vendor-neutral concepts", exam: "Multiple choice and performance-based", use: "Broader security fundamentals with less offensive focus than CEH." },
  { cert: "eJPT", learner: "Beginners who want hands-on immediately", depth: "Practical, entry-level penetration testing", exam: "Fully hands-on", use: "Cheaper and more practical, with far less HR recognition in India." },
  { cert: "CompTIA PenTest+", learner: "Testers who want a vendor-neutral practical option", depth: "Testing lifecycle including scoping and reporting", exam: "Multiple choice and performance-based", use: "Sits between CEH and OSCP in practical demand." },
  { cert: "OSCP", learner: "Working or aspiring penetration testers", depth: "Deep, unguided, exploitation-focused", exam: "24-hour hands-on plus a report", use: "The credential hiring managers trust for pen-test roles; assumes CEH-level breadth already." },
];

export const CAREER_ROLES = [
  { role: "SOC Analyst (L1/L2)", body: "Triage and investigate alerts. CEH's attacker context is directly useful — you are looking at the other half of what you learned." },
  { role: "Cybersecurity Analyst", body: "Vulnerability management, security reviews and control validation across an organisation's estate." },
  { role: "Vulnerability Assessment Analyst", body: "Run and interpret assessments, prioritise findings and track remediation to closure." },
  { role: "Junior Penetration Tester", body: "Execute scoped tests under supervision. CEH is a common entry filter; the hands-on depth comes after." },
  { role: "Security Engineer", body: "Build and harden controls, using attack knowledge to decide what actually needs defending." },
  { role: "Security Consultant", body: "Advise clients on risk and remediation — where the breadth CEH gives you pays off most." },
];

/** Original, defensible teaching content — the information-gain sections. */
export const PRACTITIONER_NOTES = [
  {
    title: "Learn these before day one",
    body: "The candidates who struggle are almost never short on enthusiasm — they are short on networking. Before the course starts, be comfortable with the TCP/IP model, what a three-way handshake looks like in a packet capture, subnetting, DNS resolution order, and HTTP request and response structure. Add basic Linux: navigating a filesystem, permissions, processes, and reading a log with grep. A fortnight on those makes the difference between following module 3 and copying it.",
  },
  {
    title: "The mistakes we see most often",
    body: "Three recur. Memorising tool flags instead of the methodology — the exam and the job both reward knowing why you scan before you enumerate. Skipping the labs because the slides feel clear; the technique only becomes yours once you have run it and had it fail. And treating scanner output as findings: an unvalidated scanner result is a hypothesis, and the whole value of a tester is separating the two.",
  },
  {
    title: "Build practical depth alongside the certificate",
    body: "CEH gives breadth. Depth comes from repetition on your own. Keep a home lab of two or three virtual machines, work through deliberately vulnerable applications, and write a short report for every box you finish — findings, evidence, impact, fix. That reporting habit is what separates a candidate who has passed an exam from one who can be put in front of a client.",
  },
  {
    title: "What CEH covers, and what real testing adds",
    body: "CEH teaches the technique catalogue. A real engagement adds everything around it: agreeing scope and rules of engagement, working within a change window, deciding not to run a test because the system is fragile, evidencing a finding so a developer can reproduce it, and defending a severity rating to someone who would rather it were lower. Expect the certificate to open the door and the first year of supervised work to teach the judgement.",
  },
];

export const CEH_FAQS = [
  { q: "What is CEH v13?", a: "CEH v13 is version 13 of EC-Council's Certified Ethical Hacker certification. It covers 20 modules of offensive security technique — reconnaissance through cloud, IoT/OT and cryptography — taught with hands-on labs, and is positioned around using AI as an assistive tool inside an authorised testing workflow." },
  { q: "What is new in CEH v13 compared with CEH v12?", a: "The headline change is AI positioning: CEH v13 threads AI-assisted working through the existing curriculum rather than adding a separate AI module. The 20-module structure is retained, content and tooling are refreshed across the modern attack surfaces, and the knowledge exam format is unchanged." },
  { q: "Does CEH v13 include AI?", a: "Yes, but not as a standalone module. AI is presented as an assistive capability across the existing 20 modules — helping with reconnaissance at scale, normalising enumeration output, drafting analysis and speeding up reporting. The certification does not teach or endorse autonomous attacks." },
  { q: "How many modules are in CEH v13?", a: "Twenty. They run in order from Introduction to Ethical Hacking through Footprinting, Scanning, Enumeration, Vulnerability Analysis, System Hacking, Malware, Sniffing, Social Engineering, Denial-of-Service, Session Hijacking, Evasion, Web Servers, Web Applications, SQL Injection, Wireless, Mobile, IoT and OT, Cloud Computing and Cryptography." },
  { q: "Does CEH v13 include practical labs?", a: "Yes. EC-Council publishes 221 hands-on labs, coverage of 550 attack techniques and exposure to more than 4,000 hacking and security tools. All lab work is performed in isolated, authorised training environments, never against systems you do not own or have permission to test." },
  { q: "Is CEH v13 good for beginners?", a: "It is a foundation-level certification, but not a first-ever IT course. You will get far more from it with working knowledge of TCP/IP, subnetting, DNS, HTTP and basic Linux. Complete beginners should spend a few weeks on networking and Linux fundamentals first." },
  { q: "Does CEH require programming?", a: "No. You can complete CEH without writing code. Being able to read a shell command, a simple Python script or a SQL statement makes several modules easier, and scripting becomes genuinely important later if you move toward penetration testing." },
  { q: "What is the CEH exam format?", a: "The CEH knowledge exam (312-50) is 125 multiple-choice questions over 4 hours. EC-Council calibrates the pass mark per exam form, so there is no single fixed pass percentage published across all versions. CEH Practical is a separate, hands-on examination of 20 challenges over 6 hours." },
  { q: "What is CEH Practical, and how is it different?", a: "CEH Practical is a separate hands-on exam — 20 challenges over 6 hours in a live range — that tests whether you can perform the techniques rather than recognise them. It is optional, sat after the knowledge exam, and is what most employers mean when they ask whether your CEH is 'practical'." },
  { q: "What is CEH Master?", a: "CEH Master is the designation awarded to candidates who hold both the CEH knowledge certification and CEH Practical. It exists to distinguish holders who have demonstrated the techniques in a live range from those who have passed the multiple-choice exam alone." },
  { q: "Who issues the CEH certification?", a: "EC-Council, an international cybersecurity certification body. Training can be delivered by an EC-Council Accredited Training Center (ATC), which supplies official courseware and lab access. Macksofy Technologies is an EC-Council ATC." },
  { q: "How long does CEH v13 training take?", a: "Macksofy delivers 40 hours of instructor-led training, either as five intensive days or across eight weekends for working professionals. Most candidates then spend an additional four to eight weeks on lab practice and revision before sitting the exam, depending on their starting point." },
  { q: "Can I do CEH training online in India?", a: "Yes. Macksofy runs live instructor-led online cohorts nationwide, so learners in Delhi, Bengaluru, Hyderabad, Pune, Chennai, Kolkata, Ahmedabad, Gurugram and Noida attend the same sessions as Mumbai. Classroom delivery is available at our Mumbai BKC training facility." },
  { q: "Is CEH v13 worth it in India?", a: "It is worth it if your goal is a first security role or a move into security from IT — CEH is one of the credentials Indian and Gulf employers screen for by name, particularly in BFSI and consulting. It is not the right choice if you already work in security and need to prove hands-on exploitation depth; that is what OSCP or CEH Practical are for." },
  { q: "CEH or OSCP — which should I choose?", a: "They answer different questions. CEH proves breadth across the whole attack surface and clears HR filters; OSCP proves you can compromise machines unaided in a 24-hour exam. If you are entering security, CEH first is the conventional order. If you are already testing and need credibility with hiring managers for a pen-test role, go to OSCP." },
  { q: "Is CEH useful for penetration testing?", a: "As a foundation, yes — it gives you the methodology, vocabulary and surface coverage a tester is assumed to have. It is not sufficient on its own for a penetration-testing role. Most testers pair CEH breadth with a hands-on credential and substantial independent lab time." },
  { q: "What jobs can I apply for after CEH?", a: "Common destinations are SOC Analyst, Cybersecurity Analyst, Vulnerability Assessment Analyst, Junior Penetration Tester, Security Engineer and Security Consultant. CEH is most often used as a screening credential for these roles rather than as proof of hands-on depth." },
  { q: "How should I prepare for the CEH v13 exam?", a: "Work the modules in order, do every lab rather than reading it, and keep notes in your own words per module. Sit timed mock questions early to find weak modules while there is still time. In the final fortnight, revise tooling and terminology rather than attempting new material." },
  { q: "Can college students take CEH?", a: "Yes, and many do while completing a degree. The practical advice is to build networking and Linux fundamentals first, then use the lab hours seriously — a student with a documented home lab and lab notes interviews far better than one with only a certificate number." },
  { q: "What does CEH v13 training cost at Macksofy?", a: "The CEH v13 programme is ₹50,000 and includes official EC-Council courseware, lab access through our Accredited Training Center status, and the 312-50 exam voucher. Speak to an advisor for current batch dates, EMI options and corporate pricing." },
  { q: "Do you offer corporate or batch CEH training?", a: "Yes. Macksofy runs corporate cohorts on-site and online for security, IT and development teams, with the syllabus weighted toward the surfaces that matter to your estate. Contact us with team size and target dates for a scoped proposal." },
];

/** Quick-facts strip under the hero. Every value verifiable on this site. */
export const COURSE_FACTS = [
  { label: "Certification", value: "Certified Ethical Hacker (CEH v13)" },
  { label: "Awarding body", value: "EC-Council" },
  { label: "Modules", value: "20, with 221 hands-on labs" },
  { label: "Training hours", value: "40 hours — 5 days or 8 weekends" },
  { label: "Delivery", value: "Live online across India · classroom in Mumbai" },
  { label: "Knowledge exam", value: "312-50 — 125 questions, 4 hours" },
  { label: "Level", value: "Foundation — networking basics assumed" },
  { label: "Training provider", value: "Macksofy Technologies · EC-Council ATC" },
];

export const TOC = [
  { id: "what-is-ceh-v13", label: "What is CEH v13?" },
  { id: "whats-new", label: "What's new in v13" },
  { id: "ceh-and-ai", label: "CEH v13 and AI" },
  { id: "curriculum", label: "Curriculum — all 20 modules" },
  { id: "labs", label: "Hands-on labs" },
  { id: "journey", label: "Your learning journey" },
  { id: "who-should-attend", label: "Who should attend" },
  { id: "prerequisites", label: "Prerequisites" },
  { id: "exam", label: "Exam and certification" },
  { id: "training-in-india", label: "Training across India" },
  { id: "why-macksofy", label: "Why train with Macksofy" },
  { id: "practitioner-notes", label: "Practitioner notes" },
  { id: "comparison", label: "CEH vs other certifications" },
  { id: "careers", label: "Careers after CEH" },
  { id: "faq", label: "FAQs" },
];
