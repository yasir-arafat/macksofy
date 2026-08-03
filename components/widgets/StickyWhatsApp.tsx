"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { SITE } from "@/lib/site";

export function StickyWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    const a = setTimeout(() => setVisible(true), 1500);
    const b = setTimeout(() => setBubble(true), 4500);
    const c = setTimeout(() => setBubble(false), 14000);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
      clearTimeout(c);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <AnimatePresence>
            {bubble && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                /* Out of flow on purpose: anchored to the button rather than
                   laid out beside it, so mounting/unmounting the bubble can
                   never resize the container and shift the button. */
                className="absolute bottom-0 right-full mr-3 w-[250px] rounded-2xl rounded-br-sm glass-strong p-4 text-sm text-fg shadow-2xl"
              >
                <button
                  onClick={() => setBubble(false)}
                  aria-label="Close"
                  className="absolute -top-2 -left-2 grid size-6 place-items-center rounded-full bg-bg ring-1 ring-line text-fg-muted hover:text-fg"
                >
                  <X className="size-3" />
                </button>
                <p className="font-semibold text-fg">Talk to a security consultant</p>
                <p className="mt-1 text-xs text-fg-muted">
                  We typically reply in under 5 minutes during business hours.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <a
            href={SITE.whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="group grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-105 transition-transform animate-[pulse-glow_3s_ease-in-out_infinite]"
            onClick={() => setBubble(false)}
          >
            <MessageCircle className="size-7" strokeWidth={2.5} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
