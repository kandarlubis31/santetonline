"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import { useRef } from "react";
import {
  Truck,
  Shield,
  Clock,
  Headphones,
  Star,
  Zap,
  ArrowRight,
  Skull,
} from "lucide-react";

const features = [
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Santet Delivery",
    description: "Dikirim langsung ke rumah target via kurir gaib. Tracking real-time sampai santet sampai.",
    color: "accent",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Santet Kilat",
    description: "Instant delivery, efek langsung dalam hitungan jam. Cocok untuk yang butuh hasil cepat.",
    color: "secondary",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Garansi Puas",
    description: "Gagal santet? Uang kembali 200%. Kami yakin efeknya pasti terasa (atau tidak).",
    color: "green",
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: "CS 24/7",
    description: "Customer service gaib standby kapan saja. Chat via WhatsApp spiritual kami.",
    color: "accent",
  },
];

const testimonials = [
  {
    name: "Budi Santoso",
    avatar: "BS",
    text: "Santet delivery-nya beneran nyampe di rumah target. Sekarang dia tiap malam ngomong sendiri di kamar mandi.",
    rating: 5,
    paket: "Santet Delivery",
  },
  {
    name: "Siti Rahayu",
    avatar: "SR",
    text: "Baru pesan paket kilat, 2 jam langsung efeknya. Targetnya langsung kesurupan WC. Recommended!",
    rating: 5,
    paket: "Santet Kilat",
  },
  {
    name: "Joko Widodo",
    avatar: "JW",
    text: "Langganan paket unlimited, worth it banget. CS-nya ramah, responsif pake WhatsApp gaib.",
    rating: 4,
    paket: "Santet Unlimited",
  },
];

const howItWorks = [
  { step: "01", title: "Pilih Target", desc: "Tentukan siapa yang mau disantet" },
  { step: "02", title: "Pilih Paket", desc: "Mulai dari Ringan sampai Ultimate" },
  { step: "03", title: "Bayar QRIS", desc: "Scan QR, bayar dalam 15 menit" },
  { step: "04", title: "Tunggu Hasil", desc: "Efek muncul dalam 3-7 hari kerja" },
];

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-bold text-accent mb-1">{value}</div>
      <div className="text-[11px] text-muted-light uppercase tracking-wider">{label}</div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />

      {/* Disclaimer */}
      <div className="max-w-3xl mx-auto px-4 -mt-8 relative z-10 mb-20">
        <DisclaimerBanner />
      </div>

      {/* Features */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 dark:bg-accent/8 border border-accent/10 dark:border-accent/15 mb-4">
              <Skull className="w-3 h-3 text-accent/60" />
              <span className="text-[11px] font-medium text-accent/60 uppercase tracking-wider">Fitur Unggulan</span>
            </div>
            <h2 className="font-['Cinzel'] text-3xl md:text-4xl font-bold text-accent mb-3">
              Kenapa Pilih Kami?
            </h2>
            <p className="text-muted max-w-md mx-auto text-sm">
              SantetOnline hadir dengan layanan terbaik untuk kebutuhan santet
              Anda
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
                className="card-base p-6 text-center group"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-accent/8 dark:bg-accent/10 rounded-xl flex items-center justify-center text-accent/70 dark:text-accent/80 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-['Cinzel'] text-base font-bold text-accent mb-2">
                  {feature.title}
                </h3>
                <p className="text-[13px] text-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary/20 dark:bg-[#111118]/40">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedCounter value="10,000+" label="Korban Tertipu" />
            <AnimatedCounter value="4.9/5" label="Rating Dukun" />
            <AnimatedCounter value="50,000+" label="Santet Terkirim" />
            <AnimatedCounter value="24/7" label="Online Terus" />
          </div>
        </div>
      </section>

      {/* How it works mini */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/5 dark:bg-secondary/8 border border-secondary/10 dark:border-secondary/15 mb-4">
              <Zap className="w-3 h-3 text-secondary/60" />
              <span className="text-[11px] font-medium text-secondary/60 uppercase tracking-wider">Cara Kerja</span>
            </div>
            <h2 className="font-['Cinzel'] text-3xl md:text-4xl font-bold text-accent mb-3">
              4 Langkah Mudah
            </h2>
            <p className="text-muted text-sm max-w-md mx-auto">
              Prosesnya gampang, hasilnya dijamin memuaskan (atau tidak)
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {howItWorks.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="card-base p-5 text-center h-full">
                  <div className="text-3xl font-bold text-accent/15 dark:text-accent/20 font-['Cinzel'] mb-2">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-sm text-foreground/80 mb-1">{item.title}</h3>
                  <p className="text-[12px] text-muted leading-relaxed">{item.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-accent/20" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/cara-kerja"
              className="inline-flex items-center gap-1.5 text-accent/50 hover:text-accent transition-colors text-[13px] font-medium"
            >
              Lihat Detail <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-primary/10 dark:bg-[#111118]/30">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 dark:bg-accent/8 border border-accent/10 dark:border-accent/15 mb-4">
              <Star className="w-3 h-3 text-accent/60" />
              <span className="text-[11px] font-medium text-accent/60 uppercase tracking-wider">Testimoni</span>
            </div>
            <h2 className="font-['Cinzel'] text-3xl md:text-4xl font-bold text-accent mb-3">
              Kata Mereka yang Sudah Coba
            </h2>
            <p className="text-muted text-sm">
              Review dari &quot;korban&quot; yang puas dengan layanan kami
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
                className="card-base p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 dark:bg-accent/15 border border-accent/15 dark:border-accent/20 flex items-center justify-center text-xs font-bold text-accent/70 dark:text-accent/80">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground/80">{t.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star
                            key={j}
                            className={`w-3 h-3 ${
                              j < t.rating
                                ? "text-accent fill-accent"
                                : "text-muted-light/30"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-muted-light/50">{t.paket}</span>
                    </div>
                  </div>
                </div>
                <p className="text-[13px] text-muted italic leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/testimoni"
              className="inline-flex items-center gap-1.5 text-accent/50 hover:text-accent transition-colors text-[13px] font-medium"
            >
              Lihat Semua Testimoni <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-primary/15 to-secondary/5 dark:from-secondary/8 dark:via-primary/30 dark:to-secondary/8" />
        <div className="absolute inset-0 batik-pattern opacity-20" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2 className="font-['Cinzel'] text-3xl md:text-5xl font-bold text-accent mb-5">
              Siap Kirim Santet?
            </h2>
            <p className="text-muted mb-8 max-w-md mx-auto text-sm">
              Pilih paket yang sesuai kebutuhan Anda. Harga mulai dari Rp
              15.000 saja.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/katalog"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 btn-primary text-base"
              >
                <span>Lihat Katalog Sekarang</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/ruqiah"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-green/15 dark:border-green/20 text-green font-semibold rounded-xl text-base hover:bg-green/5 dark:hover:bg-green/6 transition-all duration-300"
              >
                <Shield className="w-4 h-4" />
                Ruqyah Online
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
