import type { Metadata } from "next";
import { PrintLayout } from "@/components/print/PrintLayout";

export const metadata: Metadata = {
  title: "Sample CERT-In Audit Report — Macksofy Technologies",
  description:
    "Macksofy sample CERT-In format audit report — RBI / SEBI / UIDAI submission structure, control attestation, findings register, regulator-format compliance statement.",
  robots: { index: false, follow: false },
};

export default function SampleCertInAuditReport() {
  return (
    <PrintLayout
      eyebrow="Sample · CERT-In Format Audit Report"
      title="Information Security Audit Report — CERT-In Format"
      subtitle="A representative anonymised Macksofy CERT-In format audit report. Demonstrates structure, control attestation table, regulator submission package and auditor statement that we deliver on real engagements."
      refNo="MKS-CERTIN-SAMPLE-2026"
      backHref="/audit/cert-in-empanelled-audit"
      classification="Public sample · Anonymised"
    >
      {/* Section 1 */}
      <section className="print-section mb-12">
        <h2>1. Auditor and Empanelment</h2>
        <p>
          This information security audit was conducted by{" "}
          <strong>Macksofy Technologies Pvt Ltd</strong>, an Information
          Security Auditor empanelled by the Indian Computer Emergency Response
          Team (CERT-In) under the Ministry of Electronics and Information
          Technology, Government of India.
        </p>
        <table className="not-prose w-full text-sm border border-slate-300 border-collapse">
          <tbody>
            {[
              ["Auditor", "Macksofy Technologies Pvt Ltd"],
              ["Empanelment", "CERT-In Empanelled Information Security Auditor (sample)"],
              ["Auditor address", "308, Building No. 11, SRA Commercial Tower, BKC, Mumbai 400051"],
              ["Engagement Lead", "Senior Consultant — OSCP / OSWE certified"],
              ["Lead Auditor signature", "Digitally signed copy attached separately"],
              ["Audit period", "10 working days · April 2026"],
              ["Report date", "April 2026"],
            ].map(([k, v]) => (
              <tr key={k} className="border-b border-slate-200">
                <td className="bg-slate-50 px-3 py-2 font-mono text-[10px] uppercase tracking-wider font-bold w-44 align-top">
                  {k}
                </td>
                <td className="px-3 py-2 align-top">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Section 2 - Auditee */}
      <section className="print-section mb-12">
        <h2>2. Auditee Organisation</h2>
        <table className="not-prose w-full text-sm border border-slate-300 border-collapse">
          <tbody>
            {[
              ["Auditee", "Acme Cooperative Bank Ltd (anonymised)"],
              ["Sector", "Cooperative Bank · Tier-2 (RBI 4-Tier Framework)"],
              ["Regulator", "Reserve Bank of India (RBI)"],
              ["Audit objective", "Annual cybersecurity audit per RBI Cyber Security Framework + System Audit Report submission"],
              ["Branches in scope", "47 branches · Western Maharashtra"],
              ["Critical systems", "Core Banking System · ATM switch · Internet Banking · Mobile Banking · NEFT/RTGS"],
            ].map(([k, v]) => (
              <tr key={k} className="border-b border-slate-200">
                <td className="bg-slate-50 px-3 py-2 font-mono text-[10px] uppercase tracking-wider font-bold w-44 align-top">
                  {k}
                </td>
                <td className="px-3 py-2 align-top">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Section 3 - Scope */}
      <section className="print-section mb-12">
        <h2>3. Audit Scope &amp; Methodology</h2>
        <h3>3.1 In-scope domains</h3>
        <ul>
          <li>Information Security Governance and Policies</li>
          <li>Risk Management and Asset Inventory</li>
          <li>Access Control and Identity Management</li>
          <li>Network Security (perimeter, internal, segmentation)</li>
          <li>Application Security (Internet Banking + Mobile Banking)</li>
          <li>Endpoint Security and ATM Environment</li>
          <li>Logging, Monitoring and Incident Response</li>
          <li>Third-party Risk Management</li>
          <li>Business Continuity and Disaster Recovery</li>
          <li>Customer Awareness and Anti-Phishing</li>
        </ul>
        <h3>3.2 Methodology</h3>
        <p>
          Audit conducted in line with{" "}
          <strong>RBI Cyber Security Framework (June 2016, updated)</strong>,{" "}
          <strong>RBI Master Direction on IT Governance, Risk, Controls and Assurance Practices (2023)</strong>{" "}
          and <strong>CERT-In Information Security Audit Scope</strong>. Includes
          documentary review, interviews with key personnel, configuration
          inspection on a sample of in-scope systems, technical Vulnerability
          Assessment and Penetration Testing of internet-facing assets, and
          walk-through of incident response runbooks.
        </p>
      </section>

      {/* Section 4 - Control Attestation */}
      <section className="print-section mb-12">
        <h2>4. Control Attestation Summary</h2>
        <p>
          Compliance status against the eight high-level control domains under
          the RBI Cyber Security Framework. Detailed sub-control evidence is
          provided in <strong>Annexure A</strong> of the full report.
        </p>
        <table className="not-prose w-full text-sm border border-slate-300 border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="px-3 py-2 text-left font-mono text-[10px] uppercase tracking-wider">
                Domain
              </th>
              <th className="px-3 py-2 text-center font-mono text-[10px] uppercase tracking-wider">
                Sub-controls
              </th>
              <th className="px-3 py-2 text-center font-mono text-[10px] uppercase tracking-wider">
                Compliant
              </th>
              <th className="px-3 py-2 text-center font-mono text-[10px] uppercase tracking-wider">
                Partial
              </th>
              <th className="px-3 py-2 text-center font-mono text-[10px] uppercase tracking-wider">
                Non-compliant
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Governance and policy", 12, 11, 1, 0],
              ["Risk management", 8, 6, 2, 0],
              ["Access control", 14, 11, 2, 1],
              ["Network security", 18, 14, 3, 1],
              ["Application security", 11, 7, 3, 1],
              ["Endpoint + ATM", 9, 7, 1, 1],
              ["Monitoring + IR", 10, 8, 2, 0],
              ["BCP / DR", 7, 6, 1, 0],
            ].map((row) => (
              <tr key={row[0] as string} className="border-b border-slate-200">
                <td className="px-3 py-2 text-sm">{row[0]}</td>
                <td className="px-3 py-2 text-center text-sm tabular-nums">{row[1]}</td>
                <td className="px-3 py-2 text-center text-sm tabular-nums text-emerald-700 font-bold">
                  {row[2]}
                </td>
                <td className="px-3 py-2 text-center text-sm tabular-nums text-amber-700 font-bold">
                  {row[3]}
                </td>
                <td className="px-3 py-2 text-center text-sm tabular-nums text-rose-700 font-bold">
                  {row[4]}
                </td>
              </tr>
            ))}
            <tr className="bg-slate-50 font-bold">
              <td className="px-3 py-2 text-sm">Total</td>
              <td className="px-3 py-2 text-center text-sm tabular-nums">89</td>
              <td className="px-3 py-2 text-center text-sm tabular-nums text-emerald-700">70</td>
              <td className="px-3 py-2 text-center text-sm tabular-nums text-amber-700">15</td>
              <td className="px-3 py-2 text-center text-sm tabular-nums text-rose-700">4</td>
            </tr>
          </tbody>
        </table>

        <p className="mt-4 text-sm">
          <strong>Overall posture:</strong> 78.6% compliant — strong baseline
          with localised gaps in application security and ATM-network
          segmentation. None of the four non-compliant findings are deemed
          material to systemic stability; all are remediable within a 90-day
          window.
        </p>
      </section>

      {/* Section 5 - Findings Register */}
      <section className="print-section mb-12">
        <h2>5. Findings Register (Material)</h2>
        <table className="not-prose w-full text-sm border border-slate-300 border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="px-3 py-2 text-left">Ref</th>
              <th className="px-3 py-2 text-left">Finding</th>
              <th className="px-3 py-2 text-center">Severity</th>
              <th className="px-3 py-2 text-left">Target close</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["F-001", "ATM management network not segmented from branch LAN", "Critical", "30 days"],
              ["F-002", "Mobile banking app missing certificate-pinning", "Critical", "30 days"],
              ["F-003", "Privileged Active Directory accounts without smartcard / hardware MFA", "Critical", "60 days"],
              ["F-004", "Wi-Fi at 3 branches uses WPA2-PSK with shared password", "Critical", "30 days"],
              ["F-005", "DR site replication lag exceeds RPO target during peak hours", "High", "60 days"],
              ["F-006", "Internet banking session timeout 30min — exceeds RBI guideline", "High", "30 days"],
              ["F-007", "Vendor remote-access uses shared service account", "High", "60 days"],
              ["F-008", "SOC alert volume — false-positive rate ~62% on top use-case", "High", "60 days"],
            ].map((r) => {
              const sev = r[2] as string;
              const sevColor = sev === "Critical"
                ? "text-rose-700 font-bold"
                : "text-orange-700 font-bold";
              return (
                <tr key={r[0]} className="border-b border-slate-200">
                  <td className="px-3 py-2 font-mono text-xs">{r[0]}</td>
                  <td className="px-3 py-2 text-sm">{r[1]}</td>
                  <td className={`px-3 py-2 text-center text-xs ${sevColor}`}>{sev}</td>
                  <td className="px-3 py-2 text-sm">{r[3]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="text-sm text-slate-600 italic mt-3">
          Eight material findings shown for sample. Full report contains the
          complete register with proof-of-concept evidence, recommended fix and
          management response per finding.
        </p>
      </section>

      {/* Section 6 - Submission package */}
      <section className="print-section mb-12">
        <h2>6. Regulator Submission Package</h2>
        <p>
          Macksofy delivers the following artefacts as part of every CERT-In
          format engagement, structured for direct submission to RBI / SEBI /
          UIDAI / IRDAI inspections:
        </p>
        <ol>
          <li>This signed audit report (Section 1–8)</li>
          <li>Annexure A — full sub-control evidence register (89 controls)</li>
          <li>Annexure B — VAPT findings + proof-of-concept evidence</li>
          <li>Annexure C — interview transcripts and personnel attestations</li>
          <li>Annexure D — network diagrams + asset register snapshot</li>
          <li>Annexure E — incident-response runbook walkthrough notes</li>
          <li>Annexure F — third-party / vendor risk register</li>
          <li>Annexure G — BCP / DR test report</li>
          <li>Macksofy CERT-In empanelment letter (separate cover)</li>
          <li>Auditor digital signature certificate</li>
        </ol>
      </section>

      {/* Section 7 - Statement */}
      <section className="print-section mb-12">
        <h2>7. Auditor Statement</h2>
        <p>
          Based on the procedures performed and evidence reviewed during the
          audit period, in our professional opinion the auditee organisation
          maintains an information security control environment that is{" "}
          <strong>broadly compliant</strong> with the RBI Cyber Security
          Framework, with localised exceptions captured in Section 5. The
          identified critical and high-severity findings are addressable within
          the indicated timelines and Macksofy has agreed to perform a
          complimentary retest within 30 days of remediation closure.
        </p>
        <p>
          This audit was performed in good faith based on the documents and
          systems made available during the audit window. No assurance is
          provided regarding controls or systems outside the agreed scope.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-12 max-w-3xl">
          <div>
            <div className="border-b border-slate-400 pb-1">&nbsp;</div>
            <div className="mt-2 text-xs text-slate-600">
              <div className="font-bold text-slate-900">Lead Auditor</div>
              <div>OSCP · OSWE · ISO 27001 LA</div>
              <div>Macksofy Technologies, BKC Mumbai</div>
            </div>
          </div>
          <div>
            <div className="border-b border-slate-400 pb-1">&nbsp;</div>
            <div className="mt-2 text-xs text-slate-600">
              <div className="font-bold text-slate-900">Director — Audits</div>
              <div>CERT-In Empanelment Holder</div>
              <div>Macksofy Technologies, BKC Mumbai</div>
            </div>
          </div>
        </div>
      </section>
    </PrintLayout>
  );
}
