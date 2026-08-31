"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { getPaketById } from "@/lib/paketData";
import { formatCurrency } from "@/lib/qris";
import { CheckCircle, Package, Truck, ArrowRight, Copy, Shield, User } from "lucide-react";
import { useState, Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const paketId = searchParams.get("paket") || "ringan";
  const ref = searchParams.get("ref") || "SNT-UNKNOWN";
  const amount = Number(searchParams.get("amount")) || 0;
  const nama = searchParams.get("nama") || "Anonim";

  const paket = getPaketById(paketId);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ref);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const funnyMessages = [
    "Target akan merasakan efek dalam 3-7 hari kerja",
    "Jangan kaget kalau target tiba-tiba hafal sholawat",
    "Efek samping mungkin termasuk: ngomong sendiri di kamar mandi",
    "Garansi: Kalau gagal, uang kembali 200% (bercanda)",
  ];

  const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];

  const trackingSteps = [
    { icon: <CheckCircle className="w-4 h-4" />, text: "Pembayaran diterima", active: true },
    { icon: <CheckCircle className="w-4 h-4" />, text: "Dukun mulai ritual", active: true },
    { icon: <Truck className="w-4 h-4" />, text: "Santet dalam perjalanan", active: true },
    { icon: <Package className="w-4 h-4" />, text: "Santet sampai di target", active: false },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-base p-8 text-center"
        >
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green/15 dark:bg-green/20 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green" />
            </div>
          </motion.div>

          <h1 className="font-['Cinzel'] text-2xl font-bold text-accent mb-2">
            Pembayaran Berhasil!
          </h1>
          <p className="text-muted text-sm mb-6">
            Santet kamu sedang dalam proses pengiriman.
          </p>

          {/* Receipt */}
          <div className="bg-background/50 dark:bg-[#0a0a0f]/60 rounded-xl p-4 mb-5 text-left">
            <div className="space-y-2.5">
              <div className="flex justify-between text-[13px]">
                <span className="text-muted flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Pemesan
                </span>
                <span className="text-foreground/70 font-medium">{nama}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-muted flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5" /> Paket
                </span>
                <span className="text-foreground/70 font-medium">{paket?.nama || paketId}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-muted flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" /> Status
                </span>
                <span className="text-green font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                  Sedang Dikirim
                </span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-muted">Total Bayar</span>
                <span className="text-accent font-bold">{amount > 0 ? formatCurrency(amount) : "Rp 0"}</span>
              </div>
            </div>

            {/* Ref number */}
            <div className="border-t border-border mt-3 pt-3">
              <p className="text-[10px] text-muted-light mb-1.5 uppercase tracking-wider">Resi Pengiriman</p>
              <div className="flex items-center justify-center gap-2">
                <code className="text-accent font-mono text-base tracking-wider">{ref}</code>
                <button
                  onClick={handleCopy}
                  className="p-1 hover:bg-accent/10 rounded transition-colors"
                >
                  <Copy className="w-3.5 h-3.5 text-accent/40" />
                </button>
              </div>
              {copied && (
                <p className="text-[11px] text-green mt-1">Disalin!</p>
              )}
            </div>
          </div>

          {/* Funny message */}
          <div className="bg-secondary/5 dark:bg-secondary/[0.06] border border-secondary/10 dark:border-secondary/15 rounded-xl p-3 mb-5">
            <p className="text-[13px] text-muted italic">{randomMessage}</p>
          </div>

          {/* Tracking */}
          <div className="text-left mb-6">
            <p className="text-[10px] text-accent/50 font-semibold uppercase tracking-wider mb-3">Status Pengiriman</p>
            <div className="space-y-2">
              {trackingSteps.map((step, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2.5 text-[13px] ${
                    step.active ? "text-foreground/70" : "text-muted-light/30"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      step.active
                        ? "bg-accent/10 text-accent/70"
                        : "bg-muted-light/10 text-muted-light/20"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span>{step.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 btn-primary text-sm"
            >
              <span>Kembali ke Beranda</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/ruqiah"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 border border-green/15 dark:border-green/20 text-green font-semibold text-sm rounded-lg hover:bg-green/5 dark:hover:bg-green/6 transition-all duration-300"
            >
              <Shield className="w-3.5 h-3.5" />
              Ruqyah Online
            </Link>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-[11px] text-muted-light/40 mt-5 italic"
        >
          Semua transaksi adalah simulasi/dummy. Ini cuma humor.
        </motion.p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="text-accent/50 animate-pulse text-sm">Memuat...</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
