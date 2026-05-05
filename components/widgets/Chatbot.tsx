"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send } from "lucide-react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

interface Message {
  role: "bot" | "user";
  text: string;
}

const PRESETS = [
  { label: "I need a CERT-In audit", interest: "CERT-In Audit" },
  { label: "Pricing for OSCP training", interest: "OSCP Training" },
  { label: "VAPT for our fintech", interest: "VAPT Services" },
  { label: "Talk to a human", interest: "Sales conversation" },
];

const INTRO: Message[] = [
  {
    role: "bot",
    text: "Hi 👋 I'm Macksofy's assistant. How can I help — pentest, audit, or training?",
  },
];

/**
 * Lightweight floating assistant. Pure UI demo — clicking a preset
 * routes the visitor to /contact with the interest pre-filled, or to
 * WhatsApp with a prefilled message. No external bot backend required.
 */
export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INTRO);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    setMessages((m) => [
      ...m,
      { role: "user", text },
      {
        role: "bot",
        text: "Got it — connecting you with the right Macksofy expert. Continue on WhatsApp for the fastest response, or use the form on the contact page.",
      },
    ]);
    setInput("");
  };

  return (
    <>
      {/* Trigger */}
      <motion.button
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
        onClick={() => setOpen(true)}
        aria-label="Open assistant"
        className={cn(
          "fixed bottom-6 right-24 z-40 grid size-14 place-items-center rounded-full",
          "bg-gradient-to-br from-neon-cyan via-neon-blue to-neon-purple text-white",
          "shadow-2xl hover:scale-105 transition-transform",
          open && "hidden"
        )}
      >
        <Bot className="size-6" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            className="fixed bottom-6 right-6 z-40 flex h-[500px] w-[360px] max-w-[calc(100vw-2rem)] flex-col rounded-2xl glass-strong shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-line bg-bg-2 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple">
                  <Bot className="size-4 text-bg" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-fg">Macksofy Assistant</div>
                  <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                    <span className="inline-block size-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />
                    Online
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="grid size-8 place-items-center rounded-lg text-fg-muted hover:text-fg hover:bg-white/5"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-snug",
                      m.role === "bot"
                        ? "bg-white/5 text-fg rounded-bl-sm"
                        : "bg-gradient-to-r from-neon-cyan to-neon-blue text-bg rounded-br-sm font-medium"
                    )}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}

              <div className="pt-2 space-y-1.5">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => send(p.label)}
                    className="w-full text-left rounded-lg border border-line bg-bg-1 px-3 py-2 text-xs text-fg-muted hover:text-neon-cyan hover:border-neon-cyan/40 transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
                <a
                  href={SITE.whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center rounded-lg bg-emerald-500 text-white px-3 py-2 text-xs font-bold hover:bg-emerald-600"
                >
                  Continue on WhatsApp →
                </a>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (input.trim()) send(input.trim());
              }}
              className="border-t border-line bg-bg-2 p-3 flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 rounded-lg bg-bg-1 border border-line px-3 py-2 text-sm text-fg placeholder:text-fg-faint focus:outline-none focus:border-neon-cyan"
              />
              <button
                type="submit"
                aria-label="Send"
                className="grid size-9 place-items-center rounded-lg bg-gradient-to-r from-neon-cyan to-neon-purple text-white hover:scale-105 transition-transform"
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
