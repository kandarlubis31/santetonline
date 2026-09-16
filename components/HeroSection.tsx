"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import SmokeEffect from "./SmokeEffect";
import { useIntroReady } from "./SplashProvider";
import { Skull, ArrowDown, Zap, Shield } from "lucide-react";

// Choreography hero di-gate ke introReady dari SplashProvider: saat splash
// masih tampil container diam di "hidden", begitu intro selesai sequence main
// terlihat. (Sebelumnya animasi jalan tersembunyi di balik splash — pas splash
// hilang semuanya sudah selesai & diam, animasi masuknya nggak pernah terlihat.)
const heroContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const heroIcon: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", duration: 1, bounce: 0.3 },
  },
};

export default function HeroSection() {
  const introReady = useIntroReady();

  return (
    // min-h-svh (bukan 100vh): di mobile Safari/Chrome address bar bikin 100vh
    // lebih tinggi dari viewport terlihat → CTA bawah terpotong.
    <section className="relative min-h-svh flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/30 to-background" />
      <div className="absolute inset-0 batik-pattern opacity-40" />
      <SmokeEffect />

      {/* Ambient orbs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-secondary/5 dark:bg-secondary/7 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-accent/4 dark:bg-accent/6 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 dark:bg-primary/40 rounded-full blur-[160px]" />

      {/* Content — pt-24 menjaga jarak dari navbar (h-16); sebelumnya icon
          mepet ke navbar karena pt-16 = tinggi navbar persis */}
      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate={introReady ? "show" : "hidden"}
        className="relative z-10 text-center px-4 pt-24 pb-24 md:pt-28 md:pb-24 max-w-5xl mx-auto"
      >
        {/* Icon */}
        <motion.div variants={heroIcon} className="mb-6 md:mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-accent/15 dark:bg-accent/20 blur-2xl rounded-full" />
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent/8 dark:bg-accent/10 border border-accent/20 dark:border-accent/30 flex items-center justify-center">
              <Skull className="w-10 h-10 md:w-12 md:h-12 text-accent" />
            </div>
          </div>
        </motion.div>

        {/* Title — text-4xl di <sm: text-5xl Cinzel × 12 huruf kelebaran dari
            layar 320–375px → judul terpotong dua sisi */}
        <motion.h1
          variants={heroItem}
          className="font-['Cinzel'] text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-wider mb-4 md:mb-5"
        >
          <span className="text-accent">SANTET</span>
          <span className="text-secondary">ONLINE</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={heroItem}
          className="text-base sm:text-lg md:text-2xl text-muted mb-3 font-light max-w-2xl mx-auto"
        >
          Santet Online? Siap Kirim ke Mana Aja.
        </motion.p>

        <motion.p
          variants={heroItem}
          className="text-xs text-muted-light mb-10 md:mb-12 italic"
        >
          *Melayani se-Indonesia sejak 1879
        </motion.p>

        {/* Stats row */}
        <motion.div
          variants={heroItem}
          className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-16 mb-10 md:mb-14"
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

        {/* CTA buttons — w-full di mobile biar jadi tap target penuh */}
        <motion.div
          variants={heroItem}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/katalog"
            className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 btn-primary text-base"
          >
            <Zap className="w-4 h-4" />
            <span className="relative z-10">Lihat Paket Santet</span>
          </Link>
          <Link
            href="/cara-kerja"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 border border-accent/15 dark:border-accent/20 text-accent font-semibold rounded-xl text-base hover:bg-accent/5 dark:hover:bg-accent/6 transition-all duration-300"
          >
            <Shield className="w-4 h-4" />
            Cara Kerja
          </Link>
        </motion.div>

        {/* Ruqyah CTA */}
        <motion.div variants={heroItem} className="mt-6">
          <Link
            href="/ruqiah"
            className="inline-flex items-center gap-2 text-green/60 hover:text-green transition-colors text-[13px] font-medium"
          >
            <Shield className="w-3.5 h-3.5" />
            Terserang santet? Coba Ruqyah Online
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — desktop besar saja (xl): di mobile & layar pendek
          dia nimpa CTA bawah karena absolute bottom + konten yang tinggi */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={introReady ? { opacity: 1 } : {}}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden xl:flex"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-muted dark:text-accent/50 uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4 text-muted/80 dark:text-accent/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
