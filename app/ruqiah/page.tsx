"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Heart, Clock, Headphones, Star, Users, Zap, ArrowRight, BookOpen, MessageCircle } from "lucide-react";
import DisclaimerBanner from "@/components/DisclaimerBanner";

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Ruqyah Express",
    description: "Dikirim langsung ke rumah, langsung sembuh dari santet. Proses cepat dan efektif.",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Ruqyah Kilat",
    description: "Instant healing, efek langsung dalam hitungan jam. Cocok untuk darurat.",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Garansi Sembuh",
    description: "Gagal ruqyah? Doa kembali 200%. Kami yakin pasti sembuh (insyaallah).",
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: "Ustadz 24/7",
    description: "Konsultasi spiritual online kapan saja, di mana saja. Gratis untuk semua.",
  },
];

const testimonials = [
  {
    name: "Ahmad Fauzi",
    avatar: "AF",
    text: "Anak saya kesurupan, langsung pakai Ruqyah Express. 2 hari langsung sembuh! Alhamdulillah, sekarang rajin ngaji.",
    rating: 5,
  },
  {
    name: "Fatimah Azzahra",
    avatar: "FA",
    text: "Tetangga saya kena santet, saya rekomendasikan Ruqyah Online. Sekarang dia sehat walafiat dan sering traktir makan.",
    rating: 5,
  },
  {
    name: "Budi Setiawan",
    avatar: "BS",
    text: "Paket Ruqyah Kilat emang top! Baru bayar, 1 jam langsung efeknya. Santet yang nempel langsung cabut.",
    rating: 5,
  },
];

export default function RuqiahPage() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-green/5 dark:via-[#0a1a10] to-background" />
        <div className="absolute inset-0 batik-pattern opacity-30" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-green/5 dark:bg-[#2d8b4e]/6 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-accent/3 dark:bg-accent/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green/10 dark:bg-[#0a2e1a]/30 rounded-full blur-[160px]" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">


          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1, bounce: 0.3 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-green/15 dark:bg-green/20 blur-2xl rounded-full" />
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-green/10 dark:bg-green/15 border border-green/25 dark:border-green/30 flex items-center justify-center">
                <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-green" />
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
            <span className="text-green">RUQYAH</span>
            <span className="text-accent/60 dark:text-accent/70">ONLINE</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-2xl text-muted mb-3 font-light max-w-2xl mx-auto"
          >
            Lawan SantetOnline? Siap Sembuhkan Siapa Aja.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xs text-muted-light mb-12 italic"
          >
            *Disclaimer: Ini cuma humor satir, jangan serius ya
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mb-14"
          >
            {[
              { value: "15,000+", label: "Korban Sembuh" },
              { value: "5.0", label: "Rating Ustadz" },
              { value: "24/7", label: "Konsultasi Online" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-green">{stat.value}</div>
                <div className="text-[11px] text-muted-light mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/ruqiah/katalog"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green to-emerald-600 text-white font-semibold rounded-xl text-base transition-all duration-300 hover:shadow-[0_0_40px_rgba(45,139,78,0.3)] hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
            >
              <span className="relative z-10">Lihat Paket Ruqyah</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              href="/ruqiah/konsultasi"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-green/15 dark:border-green/20 text-green font-semibold rounded-xl text-base hover:bg-green/5 dark:hover:bg-green/6 transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              Konsultasi Ustadz
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="max-w-3xl mx-auto px-4 -mt-8 relative z-10 mb-20">
        <DisclaimerBanner />
      </div>

      {/* VS Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2 className="font-['Cinzel'] text-3xl md:text-4xl font-bold mb-8">
              <span className="text-secondary">SantetOnline</span>
              <span className="text-muted/20 mx-4 text-2xl">vs</span>
              <span className="text-green">RuqyahOnline</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
              {/* SantetOnline */}
              <div className="bg-secondary/5 dark:bg-secondary/[0.06] border border-secondary/10 dark:border-secondary/15 rounded-2xl p-6 text-left">
                <h3 className="font-['Cinzel'] text-base font-bold text-secondary mb-3">SantetOnline</h3>
                <ul className="space-y-2.5 text-[13px] text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary/40 mt-0.5">-</span>
                    Mengirim santet ke target
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary/40 mt-0.5">-</span>
                    Efek: kesurupan WC, ngomong sendiri
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary/40 mt-0.5">-</span>
                    Harga: Rp 15.000 - 199.000
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary/40 mt-0.5">-</span>
                    Garansi: uang kembali 200%
                  </li>
                </ul>
              </div>

              {/* RuqyahOnline */}
              <div className="bg-green/5 dark:bg-green/[0.06] border border-green/10 dark:border-green/15 rounded-2xl p-6 text-left">
                <h3 className="font-['Cinzel'] text-base font-bold text-green mb-3">RuqyahOnline</h3>
                <ul className="space-y-2.5 text-[13px] text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-green/40 mt-0.5">-</span>
                    Menyembuhkan dari santet
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green/40 mt-0.5">-</span>
                    Efek: rajin sholat, hafal Al-Qur&apos;an
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green/40 mt-0.5">-</span>
                    Harga: Rp 10.000 - 99.000
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green/40 mt-0.5">-</span>
                    Garansi: doa kembali 200%
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-[12px] text-muted-light/40 mt-5 italic">
              Keduanya sama-sama simulasi. Tapi kalau mau pilih yang mana, terserah Anda.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="section-divider max-w-3xl mx-auto" />

      {/* Features */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <h2 className="font-['Cinzel'] text-3xl md:text-4xl font-bold text-green mb-2">
              Kenapa Pilih RuqyahOnline?
            </h2>
            <p className="text-muted text-[15px]">
              Solusi spiritual terbaik untuk melawan santet dari SantetOnline
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08 }}
                className="card-base p-6 text-center group hover:border-green/15 dark:hover:border-green/20"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-green/8 dark:bg-green/10 rounded-xl flex items-center justify-center text-green/70 dark:text-green/80 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-['Cinzel'] text-base font-bold text-green mb-2">{feature.title}</h3>
                <p className="text-[13px] text-muted leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-green/5 dark:bg-[#111811]/40">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Users className="w-6 h-6" />, value: "15,000+", label: "Korban Sembuh" },
              { icon: <Star className="w-6 h-6" />, value: "5.0/5", label: "Rating Ustadz" },
              { icon: <Zap className="w-6 h-6" />, value: "30,000+", label: "Santet Dihancurkan" },
              { icon: <Clock className="w-6 h-6" />, value: "24/7", label: "Online Terus" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto mb-3 bg-green/5 dark:bg-green/6 rounded-full flex items-center justify-center text-green/60 dark:text-green/70">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-green mb-1">{stat.value}</div>
                <div className="text-[11px] text-muted-light uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <h2 className="font-['Cinzel'] text-3xl md:text-4xl font-bold text-green mb-2">
              Mereka yang Sudah Sembuh
            </h2>
            <p className="text-muted text-[15px]">
              Testimoni dari pasien yang berhasil lepas dari santet
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08 }}
                className="card-base p-6 hover:border-green/10 dark:hover:border-green/15"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green/10 dark:bg-green/15 border border-green/15 dark:border-green/20 flex items-center justify-center text-xs font-bold text-green/70 dark:text-green/80">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground/80">{t.name}</p>
                    <div className="flex gap-0.5 mt-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className={`w-3 h-3 ${j < t.rating ? "text-green fill-green" : "text-muted-light/20"}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[13px] text-muted italic leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/ruqiah/konsultasi"
              className="inline-flex items-center gap-1.5 text-green/60 hover:text-green transition-colors text-[13px] font-medium"
            >
              Konsultasi dengan Ustadz <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green/5 via-green/[0.03] to-green/5 dark:from-green/8 dark:via-green/[0.05] dark:to-green/8" />
        <div className="absolute inset-0 batik-pattern opacity-20" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2 className="font-['Cinzel'] text-3xl md:text-5xl font-bold text-green mb-5">
              Kena Santet? Ruqyah Aja!
            </h2>
            <p className="text-muted mb-8 max-w-md mx-auto text-sm">
              Jangan biarkan santet dari SantetOnline mengganggu hidup Anda. Sembuhkan sekarang dengan RuqyahOnline.
            </p>
            <Link
              href="/ruqiah/katalog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green to-emerald-600 text-white font-semibold rounded-xl text-base transition-all duration-300 hover:shadow-[0_0_40px_rgba(45,139,78,0.3)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Lihat Katalog Ruqyah
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
