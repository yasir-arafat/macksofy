"use client";

import { motion } from "framer-motion";
import { ArrowRight, AlertCircle, Check } from "lucide-react";

export function RequestInspector() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* REQUEST */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl ring-1 ring-line bg-bg/80 overflow-hidden font-mono text-[12px] leading-relaxed"
      >
        <div className="flex items-center justify-between px-4 py-2 border-b border-line bg-bg-1/80">
          <span className="text-[10px] uppercase tracking-[0.2em] text-neon-cyan">request</span>
          <span className="text-[10px] uppercase tracking-wider text-fg-faint">burp · attacker-tab</span>
        </div>
        <div className="p-4 space-y-1">
          <div>
            <span className="text-amber-300">GET</span>{" "}
            <span className="text-fg">/api/v1/orders/</span>
            <motion.span
              initial={{ backgroundColor: "rgba(248,113,113,0)" }}
              whileInView={{ backgroundColor: ["rgba(248,113,113,0)", "rgba(248,113,113,0.35)", "rgba(248,113,113,0.15)"] }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: 0.4 }}
              className="text-red-300 font-bold rounded px-1"
            >
              4815
            </motion.span>
            <span className="text-fg"> HTTP/1.1</span>
          </div>
          <div className="text-fg-muted">Host: <span className="text-fg">api.target.com</span></div>
          <div className="text-fg-muted">
            Authorization:{" "}
            <span className="text-emerald-300">Bearer eyJhbGciOiJIUzI1NiJ9…</span>
          </div>
          <div className="text-fg-muted">
            X-User-Id: <span className="text-fg">2911</span>
            <span className="text-fg-faint"> ← attacker</span>
          </div>
          <div className="text-fg-muted">Accept: application/json</div>
          <div className="text-fg-muted">Cookie: session=…</div>
        </div>
        <div className="px-4 py-2 border-t border-line bg-amber-500/10 text-[10px] flex items-center gap-2 text-amber-300">
          <AlertCircle className="size-3.5" />
          attacker requesting another user's order
        </div>
      </motion.div>

      {/* RESPONSE */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="rounded-2xl ring-1 ring-red-400/40 bg-bg/80 overflow-hidden font-mono text-[12px] leading-relaxed shadow-[0_0_40px_rgba(248,113,113,0.15)]"
      >
        <div className="flex items-center justify-between px-4 py-2 border-b border-red-400/30 bg-red-500/10">
          <span className="text-[10px] uppercase tracking-[0.2em] text-red-300">response</span>
          <span className="font-mono text-[10px] text-red-300 font-bold">200 OK</span>
        </div>
        <div className="p-4 space-y-1">
          <div className="text-fg-muted">{"{"}</div>
          <div className="pl-4">
            <span className="text-neon-cyan">"order_id"</span>:{" "}
            <span className="text-amber-300">4815</span>,
          </div>
          <div className="pl-4">
            <span className="text-neon-cyan">"customer_id"</span>:{" "}
            <span className="text-red-300 font-bold">2911</span>
            <span className="text-fg-faint"> ← belongs to OTHER user</span>
          </div>
          <div className="pl-4">
            <span className="text-neon-cyan">"amount"</span>:{" "}
            <span className="text-amber-300">"₹ 4,82,000"</span>,
          </div>
          <div className="pl-4">
            <span className="text-neon-cyan">"pii"</span>:{" "}
            <span className="text-fg">{"{ name, addr, pan, phone }"}</span>
          </div>
          <div className="text-fg-muted">{"}"}</div>
        </div>
        <div className="px-4 py-2 border-t border-line bg-red-500/10 text-[10px] flex items-center gap-2 text-red-300">
          <Check className="size-3.5" />
          BOLA confirmed · CVSS 9.1 · CWE-639
        </div>
      </motion.div>

      <div className="lg:col-span-2 flex items-center justify-center gap-3 py-2 text-[10px] font-mono uppercase tracking-[0.22em] text-fg-faint">
        <span>request</span>
        <ArrowRight className="size-3.5 text-fg-faint" />
        <span className="text-amber-300">attacker substitutes ID</span>
        <ArrowRight className="size-3.5 text-fg-faint" />
        <span className="text-red-300 font-bold">cross-tenant data leak</span>
      </div>
    </div>
  );
}
