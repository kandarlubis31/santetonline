"use client";

import { motion } from "framer-motion";
import PaketCard from "@/components/PaketCard";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import { paketList } from "@/lib/paketData";
import { Package, Shield } from "lucide-react";
import Link from "next/link";

export default function KatalogPage() {
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
            <Package className="w-3 h-3 text-accent/60" />
            <span className="text-[11px] font-medium text-accent/60 uppercase tracking-wider">Pilih Paket</span>
          </div>
          <h1 className="font-['Cinzel'] text-4xl md:text-5xl font-bold text-accent mb-3">
            Katalog Paket
          </h1>
          <p className="text-muted max-w-md mx-auto text-sm">
            Pilih paket santet yang sesuai dengan kebutuhan Anda. Semua paket
            sudah termasuk garansi kepuasan.
          </p>
        </motion.div>

        {/* Disclaimer */}
        <div className="max-w-2xl mx-auto mb-10">
          <DisclaimerBanner />
        </div>

        {/* Paket Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {paketList.map((paket, i) => (
            <PaketCard key={paket.id} paket={paket} index={i} />
          ))}
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <div className="bg-primary/20 dark:bg-[#111118]/60 border border-border/50 dark:border-border rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <Shield className="w-4 h-4 text-accent/50 mt-0.5 shrink-0" />
              <div>
                <p className="text-[13px] text-muted mb-1">
                  <strong className="text-foreground/70">Tips:</strong> Untuk pengalaman terbaik, kami rekomendasikan
                  paket &quot;Santet Delivery&quot; karena efeknya paling terasa.
                </p>
                <p className="text-[11px] text-muted-light/60 italic">
                  Harga belum termasuk pajak gaib (PPN 11%)
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ruqyah CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <Link
            href="/ruqiah/katalog"
            className="inline-flex items-center gap-2 text-green/60 hover:text-green transition-colors text-[13px] font-medium"
          >
            <Shield className="w-3.5 h-3.5" />
            Terserang santet? Lihat paket Ruqyah
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
