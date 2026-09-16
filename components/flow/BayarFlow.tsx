"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRISCode from "@/components/QRISCode";
import CountdownTimer from "@/components/CountdownTimer";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import { formatCurrency } from "@/lib/qris";
import { flowTheme, type FlowVariant, type PaketLite } from "./flowTheme";
import {
  ArrowLeft,
  CreditCard,
  CheckCircle,
  Loader2,
  Package,
  User,
  Clock,
  Hash,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface BayarFlowProps {
  variant: FlowVariant;
  paket: PaketLite;
  backHref: string;
  successHref: (ref: string, nama: string) => string;
  paymentUrl: string;
  dummyRef: string;
}

export default function BayarFlow({
  variant,
  paket,
  backHref,
  successHref,
  paymentUrl,
  dummyRef,
}: BayarFlowProps) {
  const router = useRouter();
  const t = flowTheme[variant];

  const [isSimulating, setIsSimulating] = useState(false);
  const [expired, setExpired] = useState(false);
  const [showNameForm, setShowNameForm] = useState(false);
  const [nama, setNama] = useState("");

  // Step aktif: 1 = Bayar (QR tampil), 2 = Selesai (form nama)
  const currentStep = showNameForm ? 2 : 1;

  const handleSimulatePayment = async () => {
    setIsSimulating(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsSimulating(false);
    setShowNameForm(true);
  };

  const handleSubmitNama = () => {
    if (!nama.trim()) return;
    router.push(successHref(dummyRef, nama.trim()));
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        {/* Back link */}
        <Link
          href={backHref}
          className={`inline-flex items-center gap-1.5 ${t.backLink} transition-colors mb-8 text-[13px]`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Kembali ke Katalog
        </Link>

        {/* Steps indicator */}
        <div className="flex items-center gap-0 mb-8">
          {["Paket", "Bayar", "Selesai"].map((step, i) => (
            <div key={i} className="flex items-center flex-1">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 transition-all duration-300 ${
                    i < currentStep
                      ? t.stepDone
                      : i === currentStep
                        ? t.stepActive
                        : "bg-muted-light/10 text-muted-light/40"
                  }`}
                >
                  {i < currentStep ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span
                  className={`text-[12px] font-medium hidden sm:block ${
                    i <= currentStep ? "text-foreground/70" : "text-muted-light/40"
                  }`}
                >
                  {step}
                </span>
              </div>
              {i < 2 && (
                <div
                  className={`flex-1 h-px mx-3 ${i < currentStep ? t.connectorActive : "bg-border"}`}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {showNameForm ? (
            /* Name Form */
            <motion.div
              key="nameform"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-base p-6"
            >
              <div className="text-center mb-6">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${t.formIconCircle} flex items-center justify-center`}>
                  <User className={`w-6 h-6 ${variant === "santet" ? "text-accent" : "text-green"}`} />
                </div>
                <h2 className={`font-['Cinzel'] text-lg font-bold ${t.heading} mb-1`}>
                  Siapa yang Pesan?
                </h2>
                <p className="text-[13px] text-muted">
                  Masukkan nama untuk resi pengiriman
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[11px] text-muted-light uppercase tracking-wider font-semibold mb-1.5 block">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmitNama()}
                    placeholder="Contoh: Budi Santoso"
                    className={`w-full bg-background/50 dark:bg-[#0a0a0f]/40 border border-border rounded-xl px-4 py-3 text-[14px] text-foreground/80 placeholder-muted-light/40 focus:outline-none ${t.inputFocus} transition-colors`}
                    autoFocus
                  />
                </div>

                <button
                  onClick={handleSubmitNama}
                  disabled={!nama.trim()}
                  className={t.confirmButton}
                >
                  <CheckCircle className={variant === "santet" ? "w-5 h-5 relative z-10" : "w-5 h-5"} />
                  <span className={variant === "santet" ? "relative z-10" : ""}>Konfirmasi Pesanan</span>
                </button>

                <p className="text-[11px] text-muted-light/40 text-center italic">
                  Nama akan muncul di resi
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Order Summary */}
              <div className="card-base p-5 mb-4 hover:transform-none">
                <h2 className={`font-['Cinzel'] text-base font-bold ${t.heading} mb-4 flex items-center gap-2`}>
                  <Package className="w-4 h-4" />
                  Ringkasan Pesanan
                </h2>

                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-11 h-11 rounded-xl ${t.iconBadge} flex items-center justify-center font-['Cinzel'] text-lg font-bold shrink-0`}>
                    {paket.nama.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm text-foreground/80">{paket.nama}</h3>
                    <p className="text-[13px] text-muted">{paket.tagline}</p>
                  </div>
                </div>

                <div className="border-t border-border pt-3 space-y-2">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-muted">Paket</span>
                    <span className="text-foreground/70">{paket.nama}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-muted flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Durasi
                    </span>
                    <span className="text-foreground/70">{paket.durasi}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-muted flex items-center gap-1">
                      <Hash className="w-3 h-3" /> Ref
                    </span>
                    <span className="text-foreground/70 font-mono text-xs" suppressHydrationWarning>
                      {dummyRef}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                    <span className={t.totalText}>Total</span>
                    <span className={t.totalText}>{formatCurrency(paket.harga)}</span>
                  </div>
                </div>
              </div>

              {/* QRIS Payment */}
              <div className="card-base p-5 mb-4 hover:transform-none">
                <h2 className={`font-['Cinzel'] text-base font-bold ${t.heading} mb-5 flex items-center gap-2`}>
                  <CreditCard className="w-4 h-4" />
                  Bayar dengan QRIS
                </h2>

                <div className="flex flex-col items-center">
                  <div className="mb-4">
                    <CountdownTimer initialMinutes={15} onExpire={() => setExpired(true)} />
                  </div>

                  <div className="mb-5 flex flex-col items-center">
                    <QRISCode value={paymentUrl} size={200} />
                    <p className="text-[11px] text-muted-light/50 text-center italic mt-5">
                      Scan QR-nya pake HP &mdash; langsung diarahkan ke halaman pembayaran sukses
                    </p>
                  </div>

                  {/* Steps */}
                  <div className="w-full space-y-2 text-[13px] text-muted mb-5">
                    {[
                      "Buka aplikasi mobile banking atau e-wallet Anda",
                      "Pilih menu QRIS / Scan QR",
                      "Scan QR code di atas",
                      "Konfirmasi pembayaran",
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <span className={`w-5 h-5 rounded-full ${t.stepNumber} flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5`}>
                          {i + 1}
                        </span>
                        <p>{step}</p>
                      </div>
                    ))}
                  </div>

                  {/* Simulate button */}
                  <button
                    onClick={() =>
                      expired ? router.push(backHref) : handleSimulatePayment()
                    }
                    disabled={isSimulating}
                    className={t.payButton}
                  >
                    {expired ? (
                      <>
                        <span className={variant === "santet" ? "relative z-10" : ""}>Waktu Habis — Buat Pesanan Baru</span>
                        <ArrowRight className={variant === "santet" ? "w-5 h-5 relative z-10" : "w-5 h-5"} />
                      </>
                    ) : isSimulating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Memproses Pembayaran...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>Simulasi Bayar (Dummy)</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-muted-light/50 mt-3 text-center italic">
                    Tombol ini hanya untuk simulasi. Tidak ada pembayaran nyata.
                  </p>
                </div>
              </div>

              <DisclaimerBanner />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
