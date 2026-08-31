"use client";

import { motion } from "framer-motion";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import { Star, MessageCircle, CheckCircle, Calendar } from "lucide-react";

const testimonials = [
  {
    name: "Budi Santoso",
    avatar: "BS",
    rating: 5,
    text: "Santet delivery-nya beneran nyampe di rumah target! Sekarang dia tiap malam ngomong sendiri di kamar mandi. Mantap!",
    paket: "Santet Delivery",
    date: "3 hari yang lalu",
    verified: true,
  },
  {
    name: "Siti Rahayu",
    avatar: "SR",
    rating: 5,
    text: "Baru pesan paket kilat, 2 jam langsung efeknya! Targetnya langsung kesurupan WC. Recommended banget!",
    paket: "Santet Kilat",
    date: "1 minggu yang lalu",
    verified: true,
  },
  {
    name: "Joko Widodo",
    avatar: "JW",
    rating: 4,
    text: "Langganan paket unlimited, worth it banget. Customer service-nya ramah, responsif pake WhatsApp gaib.",
    paket: "Santet Unlimited",
    date: "2 minggu yang lalu",
    verified: true,
  },
  {
    name: "Dewi Persik",
    avatar: "DP",
    rating: 5,
    text: "Gila sih, baru scan QRIS langsung proses! Dukunnya juga profesional, pakai ritual modern pake Spotify.",
    paket: "Santet Delivery",
    date: "4 hari yang lalu",
    verified: false,
  },
  {
    name: "Ricky Cuaca",
    avatar: "RC",
    rating: 5,
    text: "Paket telfon gaib bikin mantan gw tiba-tiba nelpon balik minta maaf. Ga tau efeknya gimana tapi works!",
    paket: "Telfon Gaib",
    date: "5 hari yang lalu",
    verified: true,
  },
  {
    name: "Mama Nurul",
    avatar: "MN",
    rating: 5,
    text: "Anak saya yang bandel sekarang jadi rajin sholat. Entah efek santet atau kebetulan, tapi terima kasih SantetOnline!",
    paket: "Santet Kilat",
    date: "1 minggu yang lalu",
    verified: true,
  },
  {
    name: "Pak Lurah",
    avatar: "PL",
    rating: 4,
    text: "Sebagai lurah, saya merekomendasikan SantetOnline untuk menyelesaikan masalah tetangga yang ribut. Efektif!",
    paket: "Santet Premium",
    date: "2 minggu yang lalu",
    verified: false,
  },
  {
    name: "Sarah Sekar",
    avatar: "SS",
    rating: 5,
    text: "CEO di kantor saya yang galak tiba-tiba good vibes terus. Mungkin efek santet atau dia lagi jatuh cinta.",
    paket: "Telfon Gaib",
    date: "3 hari yang lalu",
    verified: true,
  },
  {
    name: "Mas Bowo",
    avatar: "MB",
    rating: 5,
    text: "Paket unlimited bikin hidup saya berubah. Sekarang tetangga yang suka marah malah sering traktir makan. Ajaib!",
    paket: "Santet Unlimited",
    date: "1 minggu yang lalu",
    verified: true,
  },
];

export default function TestimoniPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-end gap-4 mb-3">
            <h1 className="font-['Cinzel'] text-3xl md:text-4xl font-bold text-accent">
              Testimoni
            </h1>
            <div className="hidden sm:flex items-center gap-2 pb-1">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
              <span className="text-sm font-bold text-accent">4.9</span>
              <span className="text-[12px] text-muted-light">dari 247 review</span>
            </div>
          </div>
          <p className="text-muted text-[15px]">
            Kata mereka yang sudah coba layanan kami
          </p>
        </motion.div>

        {/* Disclaimer */}
        <div className="max-w-2xl mx-auto mb-10">
          <DisclaimerBanner />
        </div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05 }}
              className="card-base p-5 group"
            >
              {/* User info */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-accent/10 dark:bg-accent/15 border border-accent/15 dark:border-accent/20 flex items-center justify-center text-[11px] font-bold text-accent/70 dark:text-accent/80 shrink-0">
                  {t.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[13px] font-semibold text-foreground/80">{t.name}</p>
                    {t.verified && (
                      <CheckCircle className="w-3 h-3 text-green/60 shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          className={`w-2.5 h-2.5 ${
                            j < t.rating
                              ? "text-accent fill-accent"
                              : "text-muted-light/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Review text */}
              <p className="text-[12px] text-muted italic leading-relaxed mb-3">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="px-2 py-0.5 bg-accent/5 dark:bg-accent/8 rounded-full text-[10px] text-accent/50 dark:text-accent/60 font-medium">
                  {t.paket}
                </span>
                <span className="text-[10px] text-muted-light/40 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {t.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-[13px] text-muted-light/50 italic">
            Semua testimoni di atas adalah fiksi dan dibuat untuk hiburan semata.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
