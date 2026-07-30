/**
 * Authoritative references / standards — outbound-citation library.
 *
 * Purpose (master audit G-4): service and audit pages cite the primary
 * standards and regulator sources they work to — OWASP, MITRE, NIST, CISA,
 * CERT-In, RBI/SEBI, ISO, GCC regulators. Linking out to the entities LLMs and
 * Google already trust is a first-order E-E-A-T / GEO signal: it co-locates
 * Macksofy with the source of truth and gives AI engines a verifiable trail.
 *
 * Two layers:
 *   • REFS — a deduped library of authoritative sources (label + URL + issuer).
 *     URLs are canonical/top-level where a deep link would be fragile — the
 *     co-citation value is in the authoritative DOMAIN, not a brittle path.
 *   • PAGE_REFS — maps `"<kind>:<slug>"` to the ref keys relevant to that page.
 *
 * `referencesFor()` returns [] when a page isn't mapped, so the <References>
 * block renders nothing there (progressive, safe on every template).
 *
 * Keep entries HONEST: only cite a standard the service/audit genuinely works
 * to. Never invent a URL — use the issuer's real domain.
 */

export interface Reference {
  label: string;
  url: string;
  issuer: string;
}

export const REFS: Record<string, Reference> = {
  // OWASP
  "owasp-top-10": { label: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/", issuer: "OWASP" },
  "owasp-api": { label: "OWASP API Security Top 10", url: "https://owasp.org/www-project-api-security/", issuer: "OWASP" },
  "owasp-masvs": { label: "OWASP MASVS (Mobile)", url: "https://mas.owasp.org/MASVS/", issuer: "OWASP" },
  "owasp-asvs": { label: "OWASP ASVS", url: "https://owasp.org/www-project-application-security-verification-standard/", issuer: "OWASP" },
  "owasp-wstg": { label: "OWASP Web Security Testing Guide", url: "https://owasp.org/www-project-web-security-testing-guide/", issuer: "OWASP" },
  "owasp-llm": { label: "OWASP Top 10 for LLM Applications", url: "https://genai.owasp.org/llm-top-10/", issuer: "OWASP" },
  // MITRE
  "mitre-attack": { label: "MITRE ATT&CK", url: "https://attack.mitre.org/", issuer: "MITRE" },
  "mitre-cwe": { label: "MITRE CWE", url: "https://cwe.mitre.org/", issuer: "MITRE" },
  "mitre-capec": { label: "MITRE CAPEC", url: "https://capec.mitre.org/", issuer: "MITRE" },
  // NIST
  "nist-csf": { label: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", issuer: "NIST" },
  "nist-800-115": { label: "NIST SP 800-115 (Security Testing)", url: "https://csrc.nist.gov/pubs/sp/800/115/final", issuer: "NIST" },
  "nist-800-61": { label: "NIST SP 800-61 (Incident Handling)", url: "https://csrc.nist.gov/pubs/sp/800/61/r2/final", issuer: "NIST" },
  "nist-800-53": { label: "NIST SP 800-53 (Controls)", url: "https://csrc.nist.gov/pubs/sp/800/53/r5/final", issuer: "NIST" },
  "nist-800-207": { label: "NIST SP 800-207 (Zero Trust)", url: "https://csrc.nist.gov/pubs/sp/800/207/final", issuer: "NIST" },
  "nvd": { label: "NIST National Vulnerability Database", url: "https://nvd.nist.gov/", issuer: "NIST" },
  // FIRST
  "cvss": { label: "CVSS (Scoring System)", url: "https://www.first.org/cvss/", issuer: "FIRST" },
  "epss": { label: "EPSS (Exploit Prediction)", url: "https://www.first.org/epss/", issuer: "FIRST" },
  // CISA / CIS
  "cisa-kev": { label: "CISA Known Exploited Vulnerabilities", url: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog", issuer: "CISA" },
  "cis-controls": { label: "CIS Critical Security Controls", url: "https://www.cisecurity.org/controls", issuer: "CIS" },
  // India regulators
  "cert-in": { label: "CERT-In", url: "https://www.cert-in.org.in/", issuer: "CERT-In · MeitY" },
  "rbi": { label: "RBI Master Directions", url: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx", issuer: "Reserve Bank of India" },
  "sebi": { label: "SEBI", url: "https://www.sebi.gov.in/", issuer: "SEBI" },
  "irdai": { label: "IRDAI", url: "https://irdai.gov.in/", issuer: "IRDAI" },
  "meity-dpdp": { label: "DPDP Act 2023 (MeitY)", url: "https://www.meity.gov.in/", issuer: "MeitY, Govt. of India" },
  "nciipc": { label: "NCIIPC", url: "https://nciipc.gov.in/", issuer: "NCIIPC" },
  // International standards
  "iso-27001": { label: "ISO/IEC 27001", url: "https://www.iso.org/standard/27001", issuer: "ISO/IEC" },
  "iso-27017": { label: "ISO/IEC 27017 (Cloud)", url: "https://www.iso.org/standard/43757.html", issuer: "ISO/IEC" },
  "iso-27018": { label: "ISO/IEC 27018 (Cloud PII)", url: "https://www.iso.org/standard/76559.html", issuer: "ISO/IEC" },
  "iso-27701": { label: "ISO/IEC 27701 (Privacy)", url: "https://www.iso.org/standard/71670.html", issuer: "ISO/IEC" },
  "iso-42001": { label: "ISO/IEC 42001 (AI)", url: "https://www.iso.org/standard/81230.html", issuer: "ISO/IEC" },
  "soc2-aicpa": { label: "SOC 2 (AICPA)", url: "https://www.aicpa-cima.com/", issuer: "AICPA" },
  "pci-dss": { label: "PCI DSS", url: "https://www.pcisecuritystandards.org/", issuer: "PCI SSC" },
  "hipaa": { label: "HIPAA (HHS)", url: "https://www.hhs.gov/hipaa/index.html", issuer: "US HHS" },
  "gdpr": { label: "GDPR (EUR-Lex)", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj", issuer: "European Union" },
  "iec-62443": { label: "ISA/IEC 62443 (OT)", url: "https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards", issuer: "ISA / IEC" },
  // GCC regulators
  "sia-uae": { label: "UAE Information Assurance Standards (SIA)", url: "https://sia.gov.ae/", issuer: "UAE SIA (ex-NESA)" },
  "doh-adhics": { label: "ADHICS (Abu Dhabi DoH)", url: "https://www.doh.gov.ae/en/", issuer: "Department of Health, Abu Dhabi" },
  "desc": { label: "DESC (Dubai)", url: "https://www.desc.gov.ae/", issuer: "Dubai Electronic Security Center" },
  "uae-pdpl": { label: "UAE Personal Data Protection Law", url: "https://u.ae/en/about-the-uae/digital-uae/data/data-protection-laws", issuer: "UAE Government" },
  "cbuae": { label: "Central Bank of the UAE", url: "https://www.centralbank.ae/", issuer: "CBUAE" },
  "sama": { label: "SAMA (Saudi Central Bank)", url: "https://www.sama.gov.sa/en-us/Pages/default.aspx", issuer: "SAMA" },
  "nca-saudi": { label: "Saudi National Cybersecurity Authority", url: "https://nca.gov.sa/", issuer: "NCA (KSA)" },
  // Training / certification bodies (cited on training + certification-guide pages)
  "ec-council": { label: "EC-Council (CEH · CHFI · CPENT)", url: "https://www.eccouncil.org/", issuer: "EC-Council" },
  "offsec": { label: "OffSec (OSCP · OSEP · OSWE)", url: "https://www.offsec.com/", issuer: "OffSec" },
  "comptia": { label: "CompTIA Certifications", url: "https://www.comptia.org/en-us/certifications/", issuer: "CompTIA" },
};

/** Which references apply to each money page. Keys: `"<kind>:<slug>"`. */
export const PAGE_REFS: Record<string, string[]> = {
  // ── Services ──
  "service:penetration-testing": ["nist-800-115", "owasp-wstg", "cvss", "cert-in"],
  "service:vapt": ["owasp-top-10", "nist-800-115", "cvss", "cert-in"],
  "service:managed-soc": ["mitre-attack", "nist-csf", "cisa-kev"],
  "service:web-application-security": ["owasp-top-10", "owasp-wstg", "owasp-asvs", "cvss"],
  "service:api-security": ["owasp-api", "owasp-asvs", "cvss"],
  "service:mobile-application-security": ["owasp-masvs", "owasp-top-10", "cvss"],
  "service:cloud-security": ["cis-controls", "nist-csf", "owasp-top-10"],
  "service:red-teaming": ["mitre-attack", "nist-800-115", "cisa-kev"],
  "service:digital-forensics-incident-response": ["nist-800-61", "cert-in", "mitre-attack"],
  "service:malware-analysis": ["mitre-attack", "nvd", "cisa-kev"],
  "service:threat-intelligence": ["mitre-attack", "mitre-capec", "cisa-kev"],
  "service:iot-ot-security": ["iec-62443", "nist-csf", "nciipc"],
  "service:source-code-review": ["owasp-asvs", "mitre-cwe", "owasp-top-10"],
  "service:managed-security-services": ["nist-csf", "mitre-attack", "cisa-kev"],
  "service:vciso": ["nist-csf", "iso-27001", "rbi"],
  "service:purple-teaming": ["mitre-attack", "nist-800-115"],
  "service:network-pentesting": ["nist-800-115", "cvss", "cert-in"],
  "service:wireless-pentesting": ["nist-800-115", "owasp-wstg"],
  "service:ai-pentesting": ["owasp-llm", "owasp-top-10", "mitre-attack"],
  "service:identity-security-zero-trust": ["nist-800-207", "nist-csf", "cis-controls"],
  "service:network-security-architecture": ["nist-800-207", "iec-62443", "cis-controls"],
  "service:phishing-simulation": ["mitre-attack", "nist-csf", "cisa-kev"],
  "service:annual-security-program": ["nist-csf", "iso-27001", "cert-in"],
  // ── Audits ──
  "audit:cybersecurity-audit": ["cert-in", "iso-27001", "nist-csf"],
  "audit:compliance-audit": ["iso-27001", "cert-in", "nist-csf"],
  "audit:risk-assessment": ["iso-27001", "nist-csf", "nist-800-53"],
  "audit:cert-in-empanelled-audit": ["cert-in", "cvss", "owasp-top-10"],
  "audit:rbi-csf": ["rbi", "cert-in", "iso-27001"],
  "audit:sebi-cscrf": ["sebi", "cert-in", "iso-27001"],
  "audit:sebi-sar": ["sebi", "cert-in"],
  "audit:irdai-compliance": ["irdai", "cert-in"],
  "audit:dpdp-act": ["meity-dpdp", "iso-27701"],
  "audit:cicra": ["nist-csf", "cert-in"],
  "audit:regulatory-vapt": ["cert-in", "owasp-top-10", "cvss"],
  "audit:iso-27001": ["iso-27001"],
  "audit:iso-27017": ["iso-27017", "iso-27001"],
  "audit:iso-27018": ["iso-27018", "iso-27001"],
  "audit:iso-27701": ["iso-27701", "iso-27001"],
  "audit:iso-42001": ["iso-42001", "iso-27001"],
  "audit:soc-2": ["soc2-aicpa", "iso-27001"],
  "audit:nist-csf": ["nist-csf", "nist-800-53"],
  "audit:pci-dss": ["pci-dss"],
  "audit:hipaa": ["hipaa"],
  "audit:gdpr": ["gdpr", "iso-27701"],
  "audit:rbi-digital-lending": ["rbi", "cert-in"],
  "audit:rbi-it-governance": ["rbi"],
  "audit:rbi-it-outsourcing": ["rbi"],
  "audit:sebi-mii": ["sebi"],
  "audit:dpdp-sdf": ["meity-dpdp"],
  "audit:uae-pdpl": ["uae-pdpl"],
  "audit:nesa-uae-ias": ["sia-uae"],
  "audit:adhics": ["doh-adhics", "sia-uae"],
  "audit:desc-isr": ["desc"],
  "audit:sama-csf": ["sama"],
  "audit:cbuae-cyber": ["cbuae", "sia-uae"],
  "audit:nca-ecc-2": ["nca-saudi"],
  "audit:wasa-audit": ["owasp-wstg", "owasp-top-10"],
  "audit:nciipc-cii-audit": ["nciipc", "cert-in", "iec-62443"],
  // ── Training / courses (cite the exam body + the standards the course content works to) ──
  "course:ceh": ["ec-council", "owasp-top-10", "mitre-attack"],
  "course:ceh-practical": ["ec-council", "owasp-top-10"],
  "course:chfi": ["ec-council", "nist-800-61"],
  "course:ctia": ["ec-council", "mitre-attack"],
  "course:csa": ["ec-council", "mitre-attack", "nist-csf"],
  "course:cpent": ["ec-council", "nist-800-115", "mitre-attack"],
  "course:sec-100-cybercore": ["offsec", "nist-csf"],
  "course:oscp": ["offsec", "nist-800-115", "owasp-top-10"],
  "course:osep": ["offsec", "mitre-attack"],
  "course:oswe": ["offsec", "owasp-top-10", "owasp-asvs"],
  "course:oswa": ["offsec", "owasp-wstg", "owasp-top-10"],
  "course:oswp": ["offsec", "nist-800-115"],
  "course:osda": ["offsec", "mitre-attack", "nist-csf"],
  "course:osed": ["offsec", "mitre-cwe"],
  "course:osmr": ["offsec"],
  "course:cysa-plus": ["comptia", "mitre-attack", "nist-csf"],
  "course:linux-plus": ["comptia"],
  "course:server-plus": ["comptia"],
  "course:soc-analyst": ["mitre-attack", "nist-csf", "cisa-kev"],
  "course:web-application-security": ["owasp-top-10", "owasp-wstg", "owasp-asvs"],
  "course:corporate-training": ["nist-csf", "owasp-top-10"],
  // ── Blog (money-query posts co-cite the primary sources they discuss) ──
  "blog:penetration-testing-vapt-guide-india-2026": ["nist-800-115", "owasp-top-10", "cvss", "cert-in"],
  "blog:cert-in-empanelled-audit-guide-2026": ["cert-in", "cvss", "owasp-top-10"],
  "blog:cyber-security-companies-in-mumbai-india-2026": ["cert-in", "iso-27001"],
  "blog:ceh-v13-ai-training-india-2026": ["ec-council", "owasp-top-10"],
  "blog:oscp-training-in-mumbai-2026": ["offsec", "nist-800-115"],
  "blog:soc-analyst-training-india-2026": ["mitre-attack", "nist-csf", "ec-council"],
  "blog:offsec-learn-one-india-pricing-roi-2026": ["offsec"],
  "blog:red-team-certifications-india-2026": ["offsec", "mitre-attack"],
  "blog:top-10-penetration-testing-tools-2026": ["owasp-wstg", "nist-800-115", "mitre-attack"],
};

/** Authoritative references for a money page. Returns [] when unmapped. */
export function referencesFor(key: string): Reference[] {
  return (PAGE_REFS[key] ?? []).map((k) => REFS[k]).filter(Boolean);
}
