"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SmokeEffect from "./SmokeEffect";
import { Skull, ArrowDown, Zap, Shield } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/30 to-background" />
      <div className="absolute inset-0 batik-pattern opacity-40" />
      <SmokeEffect />

      {/* Ambient orbs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-secondary/5 dark:bg-secondary/7 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-accent/4 dark:bg-accent/6 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 dark:bg-primary/40 rounded-full blur-[160px]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/15 dark:border-accent/20 bg-accent/4 dark:bg-accent/6 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
          <span className="text-[11px] font-medium text-accent/70 dark:text-accent/80 tracking-wider uppercase">
            Layanan Santet Online #1 di Indonesia
          </span>
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1, bounce: 0.3 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-accent/15 dark:bg-accent/20 blur-2xl rounded-full" />
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent/8 dark:bg-accent/10 border border-accent/20 dark:border-accent/30 flex items-center justify-center">
              <Skull className="w-10 h-10 md:w-12 md:h-12 text-accent" />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-['Cinzel'] text-5xl md:text-7xl lg:text-8xl font-black tracking-wider mb-5"
        >
          <span className="text-accent">SANTET</span>
          <span className="text-secondary">ONLINE</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-2xl text-muted mb-3 font-light max-w-2xl mx-auto"
        >
          Santet Online? Siap Kirim ke Mana Aja.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-xs text-muted-light mb-12 italic"
        >
          *Disclaimer: Ini cuma humor satir, jangan serius ya
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mb-14"
        >
          {[
            { value: "10,000+", label: "Korban Tertipu" },
            { value: "4.9", label: "Rating Dukun" },
            { value: "24/7", label: "CS Gaib Online" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent">
                {stat.value}
              </div>
              <div className="text-[11px] text-muted-light mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/katalog"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 btn-primary text-base"
          >
            <Zap className="w-4 h-4" />
            <span className="relative z-10">Lihat Paket Santet</span>
          </Link>
          <Link
            href="/cara-kerja"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-accent/15 dark:border-accent/20 text-accent font-semibold rounded-xl text-base hover:bg-accent/5 dark:hover:bg-accent/6 transition-all duration-300"
          >
            <Shield className="w-4 h-4" />
            Cara Kerja
          </Link>
        </motion.div>

        {/* Ruqyah CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-6"
        >
          <Link
            href="/ruqiah"
            className="inline-flex items-center gap-2 text-green/60 hover:text-green transition-colors text-[13px] font-medium"
          >
            <Shield className="w-3.5 h-3.5" />
            Terserang santet? Coba Ruqyah Online
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-accent/25 dark:text-accent/30 uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4 text-accent/25 dark:text-accent/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
