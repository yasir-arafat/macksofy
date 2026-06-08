"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ShieldCheck } from "lucide-react";

const STORAGE_KEY = "mks_lead_magnet_seen";

export function LeadMagnetPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const onScroll = () => {
      if (window.scrollY > 600 && !sessionStorage.getItem(STORAGE_KEY)) {
        setOpen(true);
        sessionStorage.setItem(STORAGE_KEY, "1");
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = setTimeout(() => {
      if (!sessionStorage.getItem(STORAGE_KEY)) {
        setOpen(true);
        sessionStorage.setItem(STORAGE_KEY, "1");
      }
    }, 25000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    // Fire-and-forget POST to /api/lead-magnet
    fetch("/api/lead-magnet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, magnet: "cyber-resilience-guide-2026" }),
    }).catch(() => {});
    setSubmitted(true);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
            className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl glass-strong p-6 sm:p-8 shadow-2xl glow-blend"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 grid size-9 place-items-center rounded-lg text-fg-muted hover:text-fg hover:bg-white/5"
            >
              <X className="size-4" />
            </button>

            {!submitted ? (
              <>
                <div className="inline-flex items-center gap-2 rounded-full bg-neon-cyan/10 ring-1 ring-neon-cyan/30 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-neon-cyan">
                  <Download className="size-3" /> Free Download · PDF
                </div>
                <h3 className="mt-4 font-display text-2xl font-black text-fg leading-tight">
                  The 2026 Cyber Resilience Guide for Indian Boards
                </h3>
                <p className="mt-2 text-sm text-fg-muted">
                  Sample audit report, RBI / SEBI compliance checklist and the 12-month
                  roadmap our consultants use with new BFSI clients.
                </p>
                <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-lg bg-bg-1 border border-line px-4 py-3 text-fg placeholder:text-fg-faint focus:outline-none focus:border-neon-cyan"
                  />
                  <button
                    type="submit"
                    className="btn-shine w-full rounded-lg bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple px-4 py-3 text-sm font-bold text-white"
                  >
                    Send me the guide
                  </button>
                </form>
                <p className="mt-3 text-[11px] text-fg-faint">
                  We never spam. Unsubscribe anytime. You&rsquo;ll be added to our monthly
                  threat-intel digest (skippable).
                </p>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="grid size-14 place-items-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/40 mx-auto">
                  <ShieldCheck className="size-7 text-emerald-400" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-black text-fg">
                  Your guide is ready.
                </h3>
                <p className="mt-2 text-sm text-fg-muted">
                  Download your copy below. A Macksofy consultant may reach out —
                  reply any time if you would like a follow-up call.
                </p>
                <a
                  href="/cyber-resilience-guide-2026.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-neon-cyan px-5 py-2.5 text-sm font-bold text-bg hover:bg-neon-cyan/90 transition-colors"
                >
                  <Download className="size-4" />
                  Download the guide (PDF)
                </a>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-4 block w-full text-sm font-semibold text-fg-muted hover:text-fg"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
