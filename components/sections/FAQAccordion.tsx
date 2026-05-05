"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  q: string;
  a: string;
}

export function FAQAccordion({
  faqs,
  className,
}: {
  faqs: FAQItem[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-4 py-5 text-left"
          >
            <span className="font-semibold text-fg text-base sm:text-lg pr-4">
              {faq.q}
            </span>
            <ChevronDown
              className={cn(
                "size-5 shrink-0 text-fg-muted transition-transform duration-300",
                open === i && "rotate-180 text-neon-cyan"
              )}
            />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pb-5 text-fg-muted leading-relaxed">{faq.a}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
