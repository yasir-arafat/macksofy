"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Item {
  code: string;
  name: string;
  detail: string;
  manual: number;
  scanner: number;
}

const ITEMS: Item[] = [
  { code: "API1", name: "BOLA", detail: "Object-level authz bypass via swapped IDs — cross-tenant data leaks", manual: 96, scanner: 12 },
  { code: "API2", name: "Broken Authentication", detail: "JWT alg=none, kid injection, weak token signing, OTP bypass", manual: 92, scanner: 28 },
  { code: "API3", name: "Object Property-Level Authz", detail: "Mass-assignment via PATCH/PUT — role + balance + status field elevation", manual: 90, scanner: 18 },
  { code: "API4", name: "Resource Consumption", detail: "Rate-limit bypass, quota exhaustion, billing flow abuse", manual: 80, scanner: 35 },
  { code: "API5", name: "Function-Level Authz (BFLA)", detail: "Admin endpoint hit from a normal user role", manual: 94, scanner: 22 },
  { code: "API6", name: "Business-Flow Abuse", detail: "Bulk-signup, OTP enumeration, voucher stacking, coupon-grinding", manual: 88, scanner: 8 },
  { code: "API7", name: "Server-Side Request Forgery", detail: "Internal network access via URL parameter, metadata-endpoint hits", manual: 85, scanner: 28 },
  { code: "API8", name: "Security Misconfiguration", detail: "Default creds, verbose errors, exposed admin / debug routes", manual: 65, scanner: 55 },
  { code: "API9", name: "Improper Inventory Management", detail: "Old v1/v2 endpoints still live, undocumented routes, shadow APIs", manual: 86, scanner: 30 },
  { code: "API10", name: "Unsafe Consumption of APIs", detail: "Trusting upstream provider data; chain attacks via integrated services", manual: 78, scanner: 12 },
];

export function OwaspApiMap() {
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
                    ? "ring-neon-purple/60 bg-bg-2 shadow-[0_0_28px_rgba(168,85,247,0.22)]"
                    : "ring-line/60 bg-bg-1/60 hover:ring-neon-purple/30 hover:bg-bg-2/60")
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
                      "radial-gradient(circle at 50% 100%, rgba(168,85,247,0.18), transparent 65%)",
                  }}
                />
                <div className="relative h-full flex flex-col items-center justify-center p-2 text-center">
                  <span
                    className={
                      "font-display font-black leading-none " +
                      (isActive ? "text-2xl gradient-text" : "text-xl text-fg-muted")
                    }
                  >
                    {it.code}
                  </span>
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
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl glass p-6 h-full"
        >
          <div className="flex items-baseline gap-3">
            <span className="font-display text-2xl font-black gradient-text leading-none">
              {item.code}
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-fg-faint">
              OWASP API Security Top 10 · 2023
            </span>
          </div>
          <h3 className="mt-3 font-display text-xl font-black text-fg leading-tight">
            {item.name}
          </h3>
          <p className="mt-3 text-sm text-fg-muted leading-relaxed">{item.detail}</p>

          <div className="mt-6 space-y-3">
            <Bar label="Manual coverage" pct={item.manual} color="purple" />
            <Bar label="Scanner coverage" pct={item.scanner} color="muted" />
          </div>

          <p className="mt-5 text-[11px] font-mono uppercase tracking-wider text-fg-faint leading-relaxed">
            Coverage % per Macksofy 2025 API engagement telemetry. The
            scanner-shop gap is the work humans do.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function Bar({
  label,
  pct,
  color,
}: {
  label: string;
  pct: number;
  color: "purple" | "muted";
}) {
  const barColor = color === "purple" ? "bg-neon-purple" : "bg-fg-faint";
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
