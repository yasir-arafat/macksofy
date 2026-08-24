"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Language coverage grid — which SAST engines set the baseline per language,
 * and what the reviewer goes after by hand once the baseline is in.
 *
 * The 30/70 split and the engine list both come from content/services.ts
 * (FAQ + toolStack). Nothing here is a performance claim.
 */

interface Lang {
  name: string;
  frameworks: string;
  engines: string[];
  manual: string;
}

const LANGS: Lang[] = [
  {
    name: "Java",
    frameworks: "Spring · Struts · JSP",
    engines: ["Semgrep", "CodeQL", "SonarQube"],
    manual: "Deserialization sinks, JWT handling, Spring Security filter chains",
  },
  {
    name: ".NET",
    frameworks: "Framework · Core",
    engines: ["Semgrep", "CodeQL", "Fortify"],
    manual: "Model binding / mass assignment, BinaryFormatter, auth attributes",
  },
  {
    name: "Node.js",
    frameworks: "Express · NestJS · Fastify",
    engines: ["Semgrep", "ESLint security", "Snyk Code"],
    manual: "Prototype pollution, second-order injection, middleware ordering",
  },
  {
    name: "Python",
    frameworks: "Django · Flask · FastAPI",
    engines: ["Bandit", "Semgrep", "CodeQL"],
    manual: "SSRF in fetch helpers, pickle usage, ORM raw-query escapes",
  },
  {
    name: "Go",
    frameworks: "net/http · Gin · Echo",
    engines: ["gosec", "Semgrep", "CodeQL"],
    manual: "Race conditions, context propagation, template auto-escaping gaps",
  },
  {
    name: "PHP",
    frameworks: "Laravel · Symfony · WP plugins",
    engines: ["Semgrep", "SonarQube"],
    manual: "Object injection, file-upload handling, nonce and capability checks",
  },
  {
    name: "Ruby",
    frameworks: "Rails",
    engines: ["Brakeman", "Semgrep"],
    manual: "Strong-params gaps, ERB injection, Active Record raw SQL",
  },
  {
    name: "Swift / Kotlin",
    frameworks: "iOS · Android",
    engines: ["Semgrep", "Snyk Code"],
    manual: "Keychain / Keystore use, cert pinning, IPC and deeplink surfaces",
  },
];

const ON_REQUEST = ["Scala", "Rust", "Elixir", "C / C++", "Kotlin (server)", "TypeScript (Deno)"];

export function LanguageCoverage() {
  return (
    <div className="rounded-2xl glass p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/60 pb-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
          Language coverage · engine + reviewer
        </div>
        <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint">
          Reviewers assigned by language, not from a generalist pool
        </div>
      </div>

      {/* effort split */}
      <div className="mt-5">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em]">
          <span className="text-cyan-300">~30% automated baseline</span>
          <span className="text-emerald-300">~70% manual deep-dive</span>
        </div>
        <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-white/5">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "30%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-cyan-400/60"
          />
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "70%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-emerald-400/60"
          />
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {LANGS.map((l, i) => (
          <Reveal as="div" y={10} delay={i * 0.05} duration={0.32} margin="-40px"
            key={l.name}
            className="rounded-xl bg-white/[0.02] p-4 ring-1 ring-line/60"
          >
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="font-display text-sm font-bold text-fg">{l.name}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-faint">
                {l.frameworks}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {l.engines.map((e) => (
                <span
                  key={e}
                  className="rounded-full bg-cyan-400/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-cyan-200/90 ring-1 ring-cyan-400/25"
                >
                  {e}
                </span>
              ))}
            </div>

            <p className="mt-3 flex gap-2 text-[12px] leading-relaxed text-fg-muted">
              <span className="mt-0.5 shrink-0 text-emerald-300/70">▸</span>
              <span>{l.manual}</span>
            </p>
          </Reveal>
        ))}
      </div>

      <div className="mt-5 border-t border-line/60 pt-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-faint">
          On request
        </span>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {ON_REQUEST.map((r) => (
            <span
              key={r}
              className="rounded-full bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] tracking-wider text-fg-muted ring-1 ring-line/60"
            >
              {r}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
