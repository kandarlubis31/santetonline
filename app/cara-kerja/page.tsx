"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Package, CreditCard, Truck, CheckCircle, ArrowRight, Zap } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "Pilih Target",
    description: "Tentukan siapa yang mau disantet. Bisa tetangga yang ribut, mantan yang galak, atau bos yang pelit.",
    tip: "Tips: Jangan santet mantan, nanti dia malah makin cantik atau cakep",
  },
  {
    icon: <Package className="w-6 h-6" />,
    title: "Pilih Paket",
    description: "Pilih paket santet yang sesuai kebutuhan. Mulai dari Ringan sampai Unlimited. Setiap paket punya efek berbeda.",
    tip: "Rekomendasi: Paket Santet Delivery paling laris dan efeknya paling terasa",
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Bayar via QRIS",
    description: "Scan QRIS, bayar dalam 15 menit. Bisa pakai GoPay, OVO, DANA, ShopeePay, atau mobile banking.",
    tip: "Pembayaran 100% simulasi. Tidak ada uang yang dipotong dari rekening Anda",
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Tunggu Pengiriman",
    description: "Dukun kami akan melakukan ritual dan mengirim santet ke target. Proses biasanya 1-7 hari kerja.",
    tip: "Estimasi pengiriman tergantung cuaca gaib dan kondisi spiritual target",
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Target Merasakan!",
    description: "Target akan mulai merasakan efek santet. Efek bervariasi tergantung paket yang dipilih.",
    tip: "Efek samping mungkin termasuk: kesurupan WC atau tiba-tiba jago masak",
  },
];

export default function CaraKerjaPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 dark:bg-accent/8 border border-accent/10 dark:border-accent/15 mb-4">
            <Zap className="w-3 h-3 text-accent/60" />
            <span className="text-[11px] font-medium text-accent/60 uppercase tracking-wider">5 Langkah</span>
          </div>
          <h1 className="font-['Cinzel'] text-4xl md:text-5xl font-bold text-accent mb-3">
            Cara Kerja
          </h1>
          <p className="text-muted max-w-md mx-auto text-sm">
            Hanya 5 langkah mudah untuk mengirim santet ke siapa saja. Gampang, cepat, dan efektif.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[29px] top-0 bottom-0 w-px bg-gradient-to-b from-accent/30 via-secondary/20 to-accent/5" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-[72px]"
              >
                {/* Step icon */}
                <div className="absolute left-0 w-[58px] h-[58px] card-base rounded-full flex items-center justify-center text-accent/70 dark:text-accent/80 z-10">
                  {step.icon}
                </div>

                {/* Step content */}
                <div className="card-base p-5">
                  <span className="text-[10px] text-accent/35 dark:text-accent/40 font-mono uppercase tracking-widest">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-['Cinzel'] text-lg font-bold text-accent mt-1 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-muted leading-relaxed mb-3">
                    {step.description}
                  </p>
                  <div className="bg-secondary/5 dark:bg-secondary/[0.06] border border-secondary/10 dark:border-secondary/15 rounded-lg px-4 py-2.5">
                    <p className="text-[12px] text-muted/70 italic">{step.tip}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-14"
        >
          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 px-8 py-4 btn-primary text-base"
          >
            <span>Mulai Sekarang</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
