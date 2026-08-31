"use client";

import { motion } from "framer-motion";
import TestimonialCard from "@/components/TestimonialCard";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import { Star, MessageCircle } from "lucide-react";

const testimonials = [
  {
    name: "Budi Santoso",
    avatar: "BS",
    rating: 5,
    text: "Santet delivery-nya beneran nyampe di rumah target! Sekarang dia tiap malam ngomong sendiri di kamar mandi. Mantap!",
    paket: "Santet Delivery",
    date: "3 hari yang lalu",
  },
  {
    name: "Siti Rahayu",
    avatar: "SR",
    rating: 5,
    text: "Baru pesan paket kilat, 2 jam langsung efeknya! Targetnya langsung kesurupan WC. Recommended banget!",
    paket: "Santet Kilat",
    date: "1 minggu yang lalu",
  },
  {
    name: "Joko Widodo",
    avatar: "JW",
    rating: 4,
    text: "Langganan paket unlimited, worth it banget. Customer service-nya ramah, responsif pake WhatsApp gaib.",
    paket: "Santet Unlimited",
    date: "2 minggu yang lalu",
  },
  {
    name: "Dewi Persik",
    avatar: "DP",
    rating: 5,
    text: "Gila sih, baru scan QRIS langsung proses! Dukunnya juga profesional, pakai ritual modern pake Spotify.",
    paket: "Santet Delivery",
    date: "4 hari yang lalu",
  },
  {
    name: "Ricky Cuaca",
    avatar: "RC",
    rating: 5,
    text: "Paket telfon gaib bikin mantan gw tiba-tiba nelpon balik minta maaf. Ga tau efeknya gimana tapi works!",
    paket: "Telfon Gaib",
    date: "5 hari yang lalu",
  },
  {
    name: "Mama Nurul",
    avatar: "MN",
    rating: 5,
    text: "Anak saya yang bandel sekarang jadi rajin sholat. Entah efek santet atau kebetulan, tapi terima kasih SantetOnline!",
    paket: "Santet Kilat",
    date: "1 minggu yang lalu",
  },
  {
    name: "Pak Lurah",
    avatar: "PL",
    rating: 4,
    text: "Sebagai lurah, saya merekomendasikan SantetOnline untuk menyelesaikan masalah tetangga yang ribut. Efektif!",
    paket: "Santet Premium",
    date: "2 minggu yang lalu",
  },
  {
    name: "Sarah Sekar",
    avatar: "SS",
    rating: 5,
    text: "CEO di kantor saya yang galak tiba-tiba good vibes terus. Mungkin efek santet atau dia lagi jatuh cinta.",
    paket: "Telfon Gaib",
    date: "3 hari yang lalu",
  },
  {
    name: "Mas Bowo",
    avatar: "MB",
    rating: 5,
    text: "Paket unlimited bikin hidup saya berubah. Sekarang tetangga yang suka marah malah sering traktir makan. Ajaib!",
    paket: "Santet Unlimited",
    date: "1 minggu yang lalu",
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
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 dark:bg-accent/8 border border-accent/10 dark:border-accent/15 mb-4">
            <MessageCircle className="w-3 h-3 text-accent/60" />
            <span className="text-[11px] font-medium text-accent/60 uppercase tracking-wider">Testimoni</span>
          </div>
          <h1 className="font-['Cinzel'] text-4xl md:text-5xl font-bold text-accent mb-3">
            Testimoni
          </h1>
          <p className="text-muted max-w-md mx-auto text-sm mb-6">
            Kata mereka yang sudah coba layanan kami
          </p>

          {/* Rating badge */}
          <div className="inline-flex items-center gap-3 card-base px-5 py-2.5">
            <span className="text-2xl font-bold text-accent">4.9</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-accent fill-accent" />
              ))}
            </div>
            <span className="text-[13px] text-muted-light">dari 247 review</span>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <div className="max-w-2xl mx-auto mb-10">
          <DisclaimerBanner />
        </div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} index={i} />
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
