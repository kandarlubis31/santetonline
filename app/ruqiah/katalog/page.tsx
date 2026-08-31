"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import { ruqyahList } from "@/lib/ruqyahData";
import { Package, Shield, Star, Clock, Check, ArrowRight } from "lucide-react";

export default function RuqyahKatalogPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green/5 dark:bg-green/8 border border-green/10 dark:border-green/15 mb-4">
            <Package className="w-3 h-3 text-green/60" />
            <span className="text-[11px] font-medium text-green/60 uppercase tracking-wider">Pilih Paket</span>
          </div>
          <h1 className="font-['Cinzel'] text-4xl md:text-5xl font-bold text-green mb-3">
            Katalog Ruqyah
          </h1>
          <p className="text-muted max-w-md mx-auto text-sm">
            Pilih paket ruqyah yang sesuai dengan kebutuhan Anda. Semua paket
            sudah termasuk garansi kesembuhan.
          </p>
        </motion.div>

        {/* Disclaimer */}
        <div className="max-w-2xl mx-auto mb-10">
          <DisclaimerBanner />
        </div>

        {/* Paket Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ruqyahList.map((paket, i) => (
            <motion.div
              key={paket.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="card-base p-6 group overflow-hidden hover:border-green/15 dark:hover:border-green/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              {paket.badge && (
                <div className="absolute top-4 right-4 px-2.5 py-0.5 bg-green/90 dark:bg-green text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                  {paket.badge}
                </div>
              )}

              <div className="flex items-start gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-green/8 dark:bg-green/10 border border-green/12 dark:border-green/15 flex items-center justify-center font-['Cinzel'] text-lg font-bold text-green/70 dark:text-green/80 group-hover:scale-110 transition-all duration-300 shrink-0">
                  {paket.emoji}
                </div>
                <div className="min-w-0">
                  <h3 className="font-['Cinzel'] text-lg font-bold text-green mb-0.5">{paket.nama}</h3>
                  <p className="text-[13px] text-muted">{paket.tagline}</p>
                </div>
              </div>

              <p className="text-[13px] text-muted/70 mb-4 leading-relaxed">{paket.deskripsi}</p>

              <div className="mb-4">
                <p className="text-[10px] text-green/50 dark:text-green/50 font-semibold mb-2 uppercase tracking-wider">
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

              <div className="flex items-center justify-between text-[11px] text-muted-light mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-green/60 dark:text-green/70 fill-green/60 dark:fill-green/70" />
                  <span>{paket.rating}</span>
                  <span>({paket.reviewCount})</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{paket.durasi}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <span className="text-xl font-bold text-green">{paket.hargaLabel}</span>
                  <span className="text-[11px] text-muted-light/50 ml-1">/ paket</span>
                </div>
                <Link
                  href={`/ruqiah/bayar/${paket.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-green to-emerald-600 text-white text-[13px] font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(45,139,78,0.3)] transition-all duration-300 group/btn"
                >
                  <span>Pesan</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <div className="bg-green/5 dark:bg-[#111811]/60 border border-green/10 dark:border-green/15 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <Shield className="w-4 h-4 text-green/50 mt-0.5 shrink-0" />
              <div>
                <p className="text-[13px] text-muted mb-1">
                  <strong className="text-foreground/70">Tips:</strong> Untuk pengalaman terbaik, kami rekomendasikan
                  paket &quot;Ruqyah Express&quot; karena efeknya paling terasa.
                </p>
                <p className="text-[11px] text-muted-light/60 italic">
                  Harga belum termasuk sedekah gaib (PPN 11%)
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Santet CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 text-secondary/60 hover:text-secondary transition-colors text-[13px] font-medium"
          >
            Mau santet instead? Lihat paket SantetOnline
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
