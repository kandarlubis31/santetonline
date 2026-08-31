"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FaqItem { question: string; answer: string; }
interface FaqAccordionProps { items: FaqItem[]; }

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className={`bg-card dark:bg-[#111118]/80 border rounded-xl overflow-hidden transition-all duration-300 ${openIndex === i ? "border-accent/15 dark:border-accent/20" : "border-card-border dark:border-accent/6 hover:border-accent/8 dark:hover:border-accent/12"}`}>
          <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
            <span className={`text-[13px] font-medium pr-4 transition-colors duration-200 ${openIndex === i ? "text-accent" : "text-foreground/60"}`}>{item.question}</span>
            <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
              <ChevronDown className={`w-4 h-4 transition-colors duration-200 ${openIndex === i ? "text-accent" : "text-muted-light/40"}`} />
            </motion.div>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }}>
                <div className="px-5 pb-4 pt-0">
                  <p className="text-[13px] text-muted leading-relaxed">{item.answer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
