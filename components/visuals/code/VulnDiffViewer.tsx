"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Three findings as they appear in a Macksofy code-review report: file:line,
 * CWE, the vulnerable lines, and the patch we ship inline.
 *
 * Patterns are drawn from the anonymised engagements in content/services.ts
 * (Jackson polymorphic deserialization, second-order SQLi in an admin module,
 * SSRF in a PDF render path). Code is illustrative of the class, not a client's
 * source.
 */

type Line = { t: string; k?: "del" | "add" | "note" };

interface Finding {
  id: string;
  lang: string;
  cwe: string;
  severity: "Critical" | "High";
  title: string;
  file: string;
  why: string;
  vuln: Line[];
  fix: Line[];
}

const FINDINGS: Finding[] = [
  {
    id: "deser",
    lang: "Java · Spring Boot",
    cwe: "CWE-502",
    severity: "Critical",
    title: "Polymorphic deserialization to RCE",
    file: "api/src/main/java/…/IngestController.java:118",
    why: "Default typing lets the payload name its own class. A gadget on the classpath turns a JSON body into code execution — no authentication bypass required first.",
    vuln: [
      { t: "ObjectMapper mapper = new ObjectMapper();" },
      { t: "mapper.enableDefaultTyping();", k: "del" },
      { t: "Payload p = mapper.readValue(body, Payload.class);", k: "del" },
    ],
    fix: [
      { t: "ObjectMapper mapper = new ObjectMapper();" },
      { t: "mapper.deactivateDefaultTyping();", k: "add" },
      { t: "mapper.activateDefaultTyping(", k: "add" },
      { t: "    BasicPolymorphicTypeValidator.builder()", k: "add" },
      { t: "        .allowIfBaseType(Payload.class).build(),", k: "add" },
      { t: "    ObjectMapper.DefaultTyping.NON_FINAL);", k: "add" },
      { t: "Payload p = mapper.readValue(body, Payload.class);" },
    ],
  },
  {
    id: "sqli",
    lang: "Node.js · Express",
    cwe: "CWE-89",
    severity: "Critical",
    title: "Second-order SQL injection",
    file: "services/reports/adminReport.js:212",
    why: "The value is parameterised on the way in and concatenated on the way out. Tools that only trace request-to-sink miss it; a reviewer following the stored value does not.",
    vuln: [
      { t: "const label = await db.one(", k: "note" },
      { t: "  'SELECT label FROM saved_filters WHERE id = $1', [id]);" },
      { t: "const rows = await db.any(", k: "del" },
      { t: "  `SELECT * FROM txn WHERE tag = '${label}'`);", k: "del" },
    ],
    fix: [
      { t: "const label = await db.one(", k: "note" },
      { t: "  'SELECT label FROM saved_filters WHERE id = $1', [id]);" },
      { t: "const rows = await db.any(", k: "add" },
      { t: "  'SELECT * FROM txn WHERE tag = $1', [label]);", k: "add" },
    ],
  },
  {
    id: "ssrf",
    lang: "Python · FastAPI",
    cwe: "CWE-918",
    severity: "High",
    title: "SSRF in the PDF render path",
    file: "app/render/pdf_service.py:74",
    why: "A user-supplied URL is fetched server-side with no scheme or host restriction, which reaches link-local metadata and every internal service the pod can route to.",
    vuln: [
      { t: "async def render(url: str):" },
      { t: "    html = await client.get(url)", k: "del" },
      { t: "    return to_pdf(html.text)" },
    ],
    fix: [
      { t: "ALLOWED = {'https'}", k: "add" },
      { t: "async def render(url: str):" },
      { t: "    p = urlparse(url)", k: "add" },
      { t: "    if p.scheme not in ALLOWED or not is_public_host(p.hostname):", k: "add" },
      { t: "        raise HTTPException(400, 'url not permitted')", k: "add" },
      { t: "    html = await client.get(url, follow_redirects=False)", k: "add" },
      { t: "    return to_pdf(html.text)" },
    ],
  },
];

const SEV: Record<Finding["severity"], string> = {
  Critical: "bg-red-500/15 text-red-300 ring-red-400/40",
  High: "bg-orange-500/15 text-orange-300 ring-orange-400/40",
};

function CodeBlock({ lines, label, tone }: { lines: Line[]; label: string; tone: "vuln" | "fix" }) {
  return (
    <div className="min-w-0">
      <div
        className={`font-mono text-[10px] uppercase tracking-[0.16em] ${
          tone === "vuln" ? "text-red-300" : "text-emerald-300"
        }`}
      >
        {label}
      </div>
      <pre className="mt-2 overflow-x-auto rounded-xl bg-black/40 p-3 ring-1 ring-line/60">
        <code className="font-mono text-[11.5px] leading-relaxed">
          {lines.map((l, i) => (
            <div
              key={i}
              className={
                l.k === "del"
                  ? "bg-red-500/10 text-red-200"
                  : l.k === "add"
                    ? "bg-emerald-500/10 text-emerald-200"
                    : l.k === "note"
                      ? "text-fg-faint"
                      : "text-fg-muted"
              }
            >
              <span className="select-none pr-2 text-fg-faint">
                {l.k === "del" ? "-" : l.k === "add" ? "+" : " "}
              </span>
              {l.t}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

export function VulnDiffViewer() {
  const [active, setActive] = useState(FINDINGS[0].id);
  const f = FINDINGS.find((x) => x.id === active)!;

  return (
    <div className="rounded-2xl glass p-5 sm:p-7">
      <div className="flex flex-wrap gap-2">
        {FINDINGS.map((x) => (
          <button
            key={x.id}
            type="button"
            onClick={() => setActive(x.id)}
            aria-pressed={x.id === active}
            className={`rounded-lg px-3 py-1.5 font-mono text-[11px] tracking-wide ring-1 transition-colors ${
              x.id === active
                ? "bg-emerald-500/15 text-emerald-200 ring-emerald-400/40"
                : "bg-white/[0.03] text-fg-muted ring-line/60 hover:text-fg"
            }`}
          >
            {x.lang}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={f.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
          className="mt-5"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2 py-0.5 font-mono text-[10px] tracking-wider ring-1 ${SEV[f.severity]}`}>
              {f.severity}
            </span>
            <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] tracking-wider text-fg-faint">
              {f.cwe}
            </span>
          </div>

          <h3 className="mt-3 font-display text-lg font-bold text-fg leading-tight">{f.title}</h3>
          <div className="mt-1 break-all font-mono text-[11px] text-fg-faint">{f.file}</div>
          <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-fg-muted">{f.why}</p>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <CodeBlock lines={f.vuln} label="As found" tone="vuln" />
            <CodeBlock lines={f.fix} label="As shipped in the report" tone="fix" />
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="mt-5 border-t border-line/60 pt-4 text-[11px] leading-relaxed text-fg-faint">
        Every finding ships like this — file and line, CWE, exploitability, and a
        patch your developers can paste rather than pseudo-code they have to
        interpret.
      </p>
    </div>
  );
}
