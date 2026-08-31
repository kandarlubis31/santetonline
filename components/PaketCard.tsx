"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PaketSantet } from "@/lib/paketData";
import { Star, Clock, Zap, ArrowRight, Check } from "lucide-react";

interface PaketCardProps {
  paket: PaketSantet;
  index: number;
}

export default function PaketCard({ paket, index }: PaketCardProps) {
  const isPremium = paket.id === "premium";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={`relative card-base p-6 group overflow-hidden ${
        isPremium ? "ring-1 ring-accent/20 dark:ring-accent/30" : ""
      }`}
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

      {/* Badge */}
      {paket.badge && (
        <div className="absolute top-4 right-4 px-2.5 py-0.5 bg-accent/90 dark:bg-accent text-foreground text-[10px] font-bold rounded-full uppercase tracking-wider">
          {paket.badge}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-11 h-11 rounded-xl bg-accent/8 dark:bg-accent/10 border border-accent/12 dark:border-accent/15 flex items-center justify-center font-['Cinzel'] text-lg font-bold text-accent/70 dark:text-accent group-hover:scale-110 group-hover:border-accent/20 dark:group-hover:border-accent/30 transition-all duration-300 shrink-0">
          {paket.emoji}
        </div>
        <div className="min-w-0">
          <h3 className="font-['Cinzel'] text-lg font-bold text-accent mb-0.5">
            {paket.nama}
          </h3>
          <p className="text-[13px] text-muted">{paket.tagline}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-[13px] text-muted/70 mb-4 leading-relaxed">
        {paket.deskripsi}
      </p>

      {/* Effects */}
      <div className="mb-4">
        <p className="text-[10px] text-accent/50 dark:text-accent/50 font-semibold mb-2 uppercase tracking-wider">
          Efek yang Dirasakan
        </p>
        <ul className="space-y-1.5">
          {paket.efek.map((efek, i) => (
            <li key={i} className="text-[13px] text-muted/70 flex items-start gap-2">
              <Check className="w-3 h-3 text-green/60 dark:text-green/70 mt-0.5 shrink-0" />
              {efek}
            </li>
          ))}
        </ul>
      </div>

      {/* Meta info */}
      <div className="flex items-center justify-between text-[11px] text-muted-light mb-4">
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 text-accent/60 dark:text-accent/70 fill-accent/60 dark:fill-accent/70" />
          <span>{paket.rating}</span>
          <span>({paket.reviewCount})</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{paket.durasi}</span>
        </div>
      </div>

      {/* Price + CTA */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div>
          <span className="text-xl font-bold text-accent">
            {paket.hargaLabel}
          </span>
          <span className="text-[11px] text-muted-light/50 ml-1">/ paket</span>
        </div>
        <Link
          href={`/bayar/${paket.id}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 btn-primary text-[13px] group/btn"
        >
          <span>Pesan</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
