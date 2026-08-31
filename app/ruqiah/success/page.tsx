"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { getRuqyahById as getPaketById } from "@/lib/ruqyahData";
import { formatCurrency } from "@/lib/qris";
import { CheckCircle, Package, ArrowRight, Copy, User, Calendar, Hash, Shield } from "lucide-react";
import { useState, Suspense, useEffect } from "react";

function Confetti() {
  const [particles, setParticles] = useState<{ id: number; x: number; delay: number; color: string; size: number }[]>([]);

  useEffect(() => {
    const colors = ["#2d8b4e", "#166534", "#d4af37", "#4ade80", "#e8e0d0"];
    const p = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 4 + Math.random() * 6,
    }));
    setParticles(p);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: "110vh", opacity: 0, rotate: 360 + Math.random() * 360 }}
          transition={{ duration: 3 + Math.random() * 2, delay: p.delay, ease: "linear" }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const paketId = searchParams.get("paket") || "telfon";
  const ref = searchParams.get("ref") || "RQY-UNKNOWN";
  const amount = Number(searchParams.get("amount")) || 0;
  const nama = searchParams.get("nama") || "Anonim";

  const paket = getPaketById(paketId);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ref);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const now = new Date();
  const dateStr = now.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  const timeStr = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  const trackingSteps = [
    { icon: <CheckCircle className="w-4 h-4" />, text: "Pembayaran diterima", time: timeStr, active: true },
    { icon: <CheckCircle className="w-4 h-4" />, text: "Ustadz mulai ruqyah", time: "Proses...", active: true },
    { icon: <Shield className="w-4 h-4" />, text: "Ruqyah sedang berlangsung", time: "Menunggu", active: false },
    { icon: <CheckCircle className="w-4 h-4" />, text: "Ruqyah selesai", time: "Estimasi 1-3 hari", active: false },
  ];

  return (
    <>
      <Confetti />
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-base p-7 text-center"
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

            <h1 className="font-['Cinzel'] text-2xl font-bold text-green mb-1.5">
              Pembayaran Berhasil!
            </h1>
            <p className="text-muted text-[13px] mb-5">
              Ruqyah kamu sedang dalam proses
            </p>

            {/* Receipt */}
            <div className="bg-background/50 dark:bg-[#0a0a0f]/60 rounded-xl p-4 mb-5 text-left">
              <div className="text-center pb-3 mb-3 border-b border-border border-dashed">
                <p className="text-[11px] text-muted-light/50 uppercase tracking-wider mb-1">Nomor Resi</p>
                <code className="text-green font-mono text-base tracking-wider font-bold">{ref}</code>
                <button
                  onClick={handleCopy}
                  className="ml-2 p-1 hover:bg-green/10 rounded transition-colors inline-flex align-middle"
                >
                  <Copy className="w-3.5 h-3.5 text-green/40" />
                </button>
                {copied && (
                  <span className="text-[11px] text-green ml-2">Disalin!</span>
                )}
              </div>

              <div className="space-y-2">
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
                    <Calendar className="w-3.5 h-3.5" /> Tanggal
                  </span>
                  <span className="text-foreground/70 font-medium">{dateStr}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-muted flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5" /> Status
                  </span>
                  <span className="text-green font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                    Sedang Diproses
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-border">
                  <span className="text-green">Total</span>
                  <span className="text-green">{amount > 0 ? formatCurrency(amount) : "Rp 0"}</span>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="bg-green/5 dark:bg-green/[0.06] border border-green/10 dark:border-green/15 rounded-xl p-3 mb-5">
              <p className="text-[12px] text-muted italic">
                Insyaallah ruqyah akan selesai dalam 1-3 hari. Semoga lekas sembuh.
              </p>
            </div>

            {/* Tracking */}
            <div className="text-left mb-5">
              <p className="text-[10px] text-green/50 font-semibold uppercase tracking-wider mb-3">Status Ruqyah</p>
              <div className="space-y-0">
                {trackingSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          step.active
                            ? "bg-green/10 text-green/70"
                            : "bg-muted-light/10 text-muted-light/20"
                        }`}
                      >
                        {step.icon}
                      </div>
                      {i < trackingSteps.length - 1 && (
                        <div className={`w-px h-5 ${step.active ? "bg-green/20" : "bg-muted-light/10"}`} />
                      )}
                    </div>
                    <div className="pb-4 min-w-0">
                      <p className={`text-[12px] ${step.active ? "text-foreground/70" : "text-muted-light/30"}`}>
                        {step.text}
                      </p>
                      <p className="text-[10px] text-muted-light/40 mt-0.5">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <Link
                href="/"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 btn-primary text-[13px]"
              >
                <span>Kembali ke Beranda</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/ruqiah"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 border border-green/15 dark:border-green/20 text-green font-semibold text-[13px] rounded-xl hover:bg-green/5 dark:hover:bg-green/6 transition-all duration-300"
              >
                <Shield className="w-3.5 h-3.5" />
                Ruqyah Online
              </Link>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-center text-[11px] text-muted-light/40 mt-5 italic"
          >
            Semua transaksi adalah simulasi/dummy. Ini cuma humor.
          </motion.p>
        </div>
      </div>
    </>
  );
}

export default function RuqiahSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="text-green/50 animate-pulse text-sm">Memuat...</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
