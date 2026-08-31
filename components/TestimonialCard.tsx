"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial { name: string; avatar: string; rating: number; text: string; paket: string; date: string; }
interface TestimonialCardProps { testimonial: Testimonial; index: number; }

export default function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.06 }}
      className="bg-card dark:bg-[#111118]/80 border border-card-border dark:border-accent/6 rounded-2xl p-5 hover:border-accent/10 dark:hover:border-accent/15 transition-all duration-300 group">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-secondary/15 dark:bg-secondary/20 border border-accent/8 dark:border-accent/10 flex items-center justify-center text-xs font-bold text-accent/70 dark:text-accent/80">{testimonial.avatar}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground/70 truncate">{testimonial.name}</p>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className={`w-3 h-3 ${j < testimonial.rating ? "text-accent fill-accent" : "text-muted-light/20"}`} />)}</div>
            <span className="text-[10px] text-muted-light/50">{testimonial.date}</span>
          </div>
        </div>
      </div>
      <p className="text-[13px] text-muted italic leading-relaxed mb-3">&ldquo;{testimonial.text}&rdquo;</p>
      <div className="pt-3 border-t border-border/50">
        <span className="text-[10px] text-accent/40 font-medium uppercase tracking-wider">{testimonial.paket}</span>
      </div>
    </motion.div>
  );
}
