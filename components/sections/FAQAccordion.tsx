"use client";

import { useId, useState } from "react";
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
  const base = useId();

  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        const panelId = `${base}-faq-panel-${i}`;
        const buttonId = `${base}-faq-button-${i}`;
        return (
          <div key={i}>
            <button
              id={buttonId}
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span
                data-speakable="faq-question"
                className="font-semibold text-fg text-base sm:text-lg pr-4"
              >
                {faq.q}
              </span>
              <ChevronDown
                className={cn(
                  "size-5 shrink-0 text-fg-muted transition-transform duration-300",
                  isOpen && "rotate-180 text-neon-cyan",
                )}
              />
            </button>
            {/*
              Every answer stays mounted.
              This was `{open === i && <motion.div …>}`, so only ONE answer per
              page ever reached the server HTML — 251 of 330 answers sitewide
              existed solely inside the FAQPage JSON-LD, readable by search
              engines but by no text-scraping AI crawler and by nobody with JS
              disabled. Collapsing with a grid-template-rows transition keeps
              the height animation without unmounting the content. Same fix
              shape as components/visuals/curriculum/Curriculum.tsx.
            */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div
                  data-speakable="faq-answer"
                  className="pb-5 text-fg-muted leading-relaxed"
                >
                  {faq.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
