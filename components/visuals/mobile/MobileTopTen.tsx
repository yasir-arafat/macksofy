"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface Item {
  code: string;
  name: string;
  detail: string;
  android: number;
  ios: number;
  /** Optional icon image rendered in the grid tile instead of the code text. */
  image?: string;
}

const ITEMS: Item[] = [
  {
    code: "M1",
    name: "Improper Credential Usage",
    detail: "Hard-coded API keys, secrets in resources.arsc / plist, weak credential reuse",
    android: 90,
    ios: 85,
    image: "/owasp-mobile/m1-improper-credential-usage.webp",
  },
  {
    code: "M2",
    name: "Inadequate Supply Chain",
    detail: "Vulnerable SDKs, transitive CVEs, unsigned 3rd-party native libs",
    android: 80,
    ios: 70,
    image: "/owasp-mobile/m2-inadequate-supply-chain.webp",
  },
  {
    code: "M3",
    name: "Insecure Auth / Authz",
    detail: "Biometric bypass, session-token replay, BOLA across mobile flows",
    android: 92,
    ios: 90,
    image: "/owasp-mobile/m3-insecure-authentication-authorization.webp",
  },
  {
    code: "M4",
    name: "Insufficient I/O Validation",
    detail: "Deep-link / intent-redirect, WebView XSS, JS-bridge abuse",
    android: 88,
    ios: 65,
    image: "/owasp-mobile/m4-insufficient-io-validation.webp",
  },
  {
    code: "M5",
    name: "Insecure Communication",
    detail: "TLS pinning bypass, cleartext fallback, custom-CA acceptance",
    android: 75,
    ios: 78,
    image: "/owasp-mobile/m5-insecure-communication.webp",
  },
  {
    code: "M6",
    name: "Inadequate Privacy Controls",
    detail: "Over-broad permissions, background data leakage, PII in logs",
    android: 85,
    ios: 75,
    image: "/owasp-mobile/m6-inadequate-privacy-controls.webp",
  },
  {
    code: "M7",
    name: "Insufficient Binary Protection",
    detail: "No root/jailbreak detection, missing anti-debug, weak obfuscation",
    android: 70,
    ios: 60,
    image: "/owasp-mobile/m7-insufficient-binary-protection.webp",
  },
  {
    code: "M8",
    name: "Security Misconfiguration",
    detail: "Debuggable=true in release, exported components, dev endpoints",
    android: 82,
    ios: 55,
    image: "/owasp-mobile/m8-security-misconfiguration.webp",
  },
  {
    code: "M9",
    name: "Insecure Data Storage",
    detail: "SharedPreferences / NSUserDefaults secrets, world-readable SQLite",
    android: 90,
    ios: 80,
    image: "/owasp-mobile/m9-insecure-data-storage.webp",
  },
  {
    code: "M10",
    name: "Insufficient Cryptography",
    detail: "ECB mode, hard-coded IVs, custom crypto, key derivation flaws",
    android: 78,
    ios: 72,
    image: "/owasp-mobile/m10-insufficient-cryptography.webp",
  },
];

export function MobileTopTen() {
  const [active, setActive] = useState(0);
  const item = ITEMS[active];

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* CATEGORY GRID */}
      <div className="lg:col-span-7">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {ITEMS.map((it, i) => {
            const isActive = i === active;
            return (
              <button
                key={it.code}
                onClick={() => setActive(i)}
                className={
                  "group relative aspect-square rounded-xl ring-1 transition-all overflow-hidden " +
                  (isActive
                    ? "ring-neon-cyan/60 bg-bg-2 shadow-[0_0_28px_rgba(0,229,255,0.18)]"
                    : "ring-line/60 bg-bg-1/60 hover:ring-neon-cyan/30 hover:bg-bg-2/60")
                }
                aria-pressed={isActive}
              >
                <div
                  aria-hidden
                  className={
                    "absolute inset-0 transition-opacity " +
                    (isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40")
                  }
                  style={{
                    background:
                      "radial-gradient(circle at 50% 100%, rgba(0,229,255,0.18), transparent 65%)",
                  }}
                />
                <div className="relative h-full flex flex-col items-center justify-center p-2 text-center">
                  {it.image ? (
                    <Image
                      src={it.image}
                      alt={`${it.code} icon`}
                      width={56}
                      height={56}
                      className="size-12 sm:size-14 object-contain"
                    />
                  ) : (
                    <span
                      className={
                        "font-display text-2xl font-black leading-none " +
                        (isActive ? "gradient-text" : "text-fg-muted")
                      }
                    >
                      {it.code}
                    </span>
                  )}
                  <span className="mt-2 text-[10px] uppercase tracking-wider text-fg-faint leading-tight line-clamp-2">
                    {it.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* DETAIL PANEL */}
      <div className="lg:col-span-5">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl glass p-6 h-full"
        >
          <div className="flex items-baseline gap-3">
            <span className="font-display text-3xl font-black gradient-text leading-none">
              {item.code}
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-fg-faint">
              OWASP Mobile Top 10 · 2024
            </span>
          </div>
          <h3 className="mt-3 font-display text-xl font-black text-fg leading-tight">
            {item.name}
          </h3>
          <p className="mt-3 text-sm text-fg-muted leading-relaxed">{item.detail}</p>

          <div className="mt-6 space-y-3">
            <PlatformBar label="Android impact" pct={item.android} color="emerald" />
            <PlatformBar label="iOS impact" pct={item.ios} color="cyan" />
          </div>

          <p className="mt-5 text-[11px] font-mono uppercase tracking-wider text-fg-faint leading-relaxed">
            Real-world prevalence per Macksofy 2025 mobile engagement
            telemetry across {ITEMS.length}× categories. Higher = more
            likely to surface as a High/Critical in your app.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function PlatformBar({
  label,
  pct,
  color,
}: {
  label: string;
  pct: number;
  color: "emerald" | "cyan";
}) {
  const barColor = color === "emerald" ? "bg-emerald-400" : "bg-neon-cyan";
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider">
        <span className="text-fg-muted">{label}</span>
        <span className="text-fg tabular-nums">{pct}%</span>
      </div>
      <div className="mt-1.5 h-1.5 rounded-full bg-bg-1 ring-1 ring-line/40 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full ${barColor}`}
        />
      </div>
    </div>
  );
}
