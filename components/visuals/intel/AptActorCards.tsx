"use client";

import { Reveal } from "@/components/motion/Reveal";

const ACTORS = [
  {
    code: "APT41",
    name: "Wicked Panda",
    origin: "CN",
    targets: "Healthcare · Telecom · Gaming",
    ttps: ["Spear-phish", "DLL side-load", "Web-shell"],
    intent: "Espionage + financial",
    accent: "from-red-500/20 to-red-500/0 ring-red-400/30 text-red-300",
  },
  {
    code: "Lazarus",
    name: "Hidden Cobra",
    origin: "KP",
    targets: "BFSI · Crypto · Defense",
    ttps: ["Watering hole", "MagicRAT", "MATA framework"],
    intent: "Financial crime + sabotage",
    accent: "from-violet-500/20 to-violet-500/0 ring-violet-400/30 text-violet-300",
  },
  {
    code: "SideWinder",
    name: "Rattlesnake",
    origin: "IN-relevant",
    targets: "Pakistan · Sri Lanka · Indian gov",
    ttps: ["LNK files", "DotNet stagers", "Cloud C2"],
    intent: "Espionage (Indian sub-continent)",
    accent: "from-amber-500/20 to-amber-500/0 ring-amber-400/30 text-amber-300",
  },
  {
    code: "TA453",
    name: "Charming Kitten",
    origin: "IR",
    targets: "Academia · Journalists · Diplomatic",
    ttps: ["Credential phishing", "OAuth abuse", "MFA fatigue"],
    intent: "Espionage",
    accent: "from-pink-500/20 to-pink-500/0 ring-pink-400/30 text-pink-300",
  },
  {
    code: "FIN7",
    name: "Carbanak",
    origin: "Crimeware",
    targets: "Retail · Hospitality · BFSI",
    ttps: ["Phishing", "Carbanak backdoor", "POS malware"],
    intent: "Financial theft",
    accent: "from-orange-500/20 to-orange-500/0 ring-orange-400/30 text-orange-300",
  },
  {
    code: "BlackCat",
    name: "ALPHV",
    origin: "RaaS",
    targets: "Manufacturing · Healthcare · Mid-market",
    ttps: ["Initial access broker", "Rust binary", "Triple extortion"],
    intent: "Ransomware revenue",
    accent: "from-emerald-500/20 to-emerald-500/0 ring-emerald-400/30 text-emerald-300",
  },
];

export function AptActorCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ACTORS.map((a, i) => (
        <Reveal as="div" y={16} delay={i * 0.08} duration={0.45}
          key={a.code}
          className={`relative rounded-2xl bg-gradient-to-br ${a.accent} ring-1 p-5 lift overflow-hidden`}
        >
          {/* watermark */}
          <div
            aria-hidden
            className="absolute -top-6 -right-6 font-display font-black text-7xl opacity-10 tracking-tight"
          >
            {a.code}
          </div>

          <div className="relative">
            <div className="flex items-baseline justify-between gap-3">
              <span className={`font-display text-xl font-black ${a.accent.split(" ").find((c) => c.startsWith("text-"))}`}>
                {a.code}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-fg-faint ring-1 ring-line/50 px-2 py-0.5 rounded">
                {a.origin}
              </span>
            </div>
            <div className="mt-1 font-display text-sm font-semibold text-fg">
              aka {a.name}
            </div>

            <div className="mt-4 space-y-2.5 text-xs">
              <div>
                <div className="font-mono text-[9px] uppercase tracking-wider text-fg-faint mb-0.5">
                  Targets
                </div>
                <div className="text-fg-muted leading-snug">{a.targets}</div>
              </div>
              <div>
                <div className="font-mono text-[9px] uppercase tracking-wider text-fg-faint mb-0.5">
                  Tradecraft
                </div>
                <div className="flex flex-wrap gap-1">
                  {a.ttps.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] ring-1 ring-line/40 bg-bg/40 px-1.5 py-0.5 rounded text-fg-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-mono text-[9px] uppercase tracking-wider text-fg-faint mb-0.5">
                  Intent
                </div>
                <div className="text-fg-muted">{a.intent}</div>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
