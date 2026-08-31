"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRISCode from "@/components/QRISCode";
import CountdownTimer from "@/components/CountdownTimer";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import { getPaketById } from "@/lib/paketData";
import { generateQrisUrl, generateDummyRef, formatCurrency } from "@/lib/qris";
import {
  ArrowLeft,
  CreditCard,
  CheckCircle,
  Loader2,
  Package,
  User,
} from "lucide-react";
import Link from "next/link";

export default function BayarPage() {
  const params = useParams();
  const router = useRouter();
  const paketId = params.paketId as string;

  const paket = getPaketById(paketId);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showNameForm, setShowNameForm] = useState(false);
  const [nama, setNama] = useState("");
  const dummyRef = generateDummyRef();

  if (!paket) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 dark:bg-secondary/15 flex items-center justify-center">
            <Package className="w-8 h-8 text-secondary/50" />
          </div>
          <h1 className="font-['Cinzel'] text-3xl font-bold text-secondary mb-3">
            404 &mdash; Paket Tidak Ditemukan
          </h1>
          <p className="text-muted mb-6 text-sm">
            Mungkin paket ini sudah dicancel sama dukunnya.
          </p>
          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 px-5 py-2.5 btn-primary text-sm"
          >
            <span><ArrowLeft className="w-4 h-4 inline mr-1" />Kembali ke Katalog</span>
          </Link>
        </div>
      </div>
    );
  }

  const paymentUrl = generateQrisUrl(paketId, paket.harga);

  const handleSimulatePayment = async () => {
    setIsSimulating(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsSimulating(false);
    setShowNameForm(true);
  };

  const handleSubmitNama = () => {
    if (!nama.trim()) return;
    router.push(
      `/success?paket=${paketId}&ref=${dummyRef}&amount=${paket.harga}&nama=${encodeURIComponent(nama.trim())}`
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        {/* Back link */}
        <Link
          href="/katalog"
          className="inline-flex items-center gap-1.5 text-accent/50 hover:text-accent transition-colors mb-8 text-[13px]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Kembali ke Katalog
        </Link>

        {/* Steps indicator */}
        <div className="flex items-center gap-3 mb-8">
          {["Paket", "Bayar", "Selesai"].map((step, i) => (
            <div key={i} className="flex items-center gap-3 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                showNameForm
                  ? "bg-green/15 text-green dark:bg-green/20"
                  : i === 0
                  ? "bg-accent/15 text-accent dark:bg-accent/20"
                  : "bg-muted-light/10 text-muted-light/40"
              }`}>
                {showNameForm && i < 2 ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  i + 1
                )}
              </div>
              <span className={`text-[12px] font-medium hidden sm:block ${
                i === 0 || (showNameForm && i < 3)
                  ? "text-foreground/70"
                  : "text-muted-light/40"
              }`}>
                {step}
              </span>
              {i < 2 && <div className="flex-1 h-px bg-border" />}
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
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent/10 dark:bg-accent/15 flex items-center justify-center">
                  <User className="w-6 h-6 text-accent" />
                </div>
                <h2 className="font-['Cinzel'] text-lg font-bold text-accent mb-1">
                  Siapa yang Pesan?
                </h2>
                <p className="text-[13px] text-muted">
                  Masukkan nama untuk resi pengiriman santet
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
                    className="w-full bg-background/50 dark:bg-[#0a0a0f]/40 border border-border rounded-xl px-4 py-3 text-[14px] text-foreground/80 placeholder-muted-light/40 focus:outline-none focus:border-accent/25 dark:focus:border-accent/30 transition-colors"
                    autoFocus
                  />
                </div>

                <button
                  onClick={handleSubmitNama}
                  disabled={!nama.trim()}
                  className="w-full px-6 py-3.5 btn-primary text-base disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Konfirmasi Pesanan</span>
                </button>

                <p className="text-[11px] text-muted-light/40 text-center italic">
                  Nama akan muncul di resi pengiriman
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
              <div className="card-base p-6 mb-5">
                <h2 className="font-['Cinzel'] text-base font-bold text-accent mb-4 flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Ringkasan Pesanan
                </h2>

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-accent/8 dark:bg-accent/10 border border-accent/12 dark:border-accent/15 flex items-center justify-center font-['Cinzel'] text-lg font-bold text-accent/70 dark:text-accent/80 shrink-0">
                    {paket.nama.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground/80">{paket.nama}</h3>
                    <p className="text-[13px] text-muted">{paket.tagline}</p>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-2.5">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-muted">Paket</span>
                    <span className="text-foreground/70">{paket.nama}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-muted">Durasi</span>
                    <span className="text-foreground/70">{paket.durasi}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-muted">Ref</span>
                    <span className="text-foreground/70 font-mono text-xs">{dummyRef}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2.5 border-t border-border">
                    <span className="text-accent">Total</span>
                    <span className="text-accent">{formatCurrency(paket.harga)}</span>
                  </div>
                </div>
              </div>

              {/* QRIS Payment */}
              <div className="card-base p-6 mb-5">
                <h2 className="font-['Cinzel'] text-base font-bold text-accent mb-6 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Bayar dengan QRIS
                </h2>

                <div className="flex flex-col items-center">
                  <div className="mb-5">
                    <CountdownTimer initialMinutes={15} />
                  </div>

                  <div className="mb-6">
                    <QRISCode value={paymentUrl} size={200} />
                  </div>

                  {/* Steps */}
                  <div className="w-full space-y-2 text-[13px] text-muted mb-6">
                    {[
                      "Buka aplikasi mobile banking atau e-wallet Anda",
                      "Pilih menu QRIS / Scan QR",
                      "Scan QR code di atas",
                      "Konfirmasi pembayaran",
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-accent/8 dark:bg-accent/10 flex items-center justify-center text-accent/60 dark:text-accent/70 text-[10px] font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <p>{step}</p>
                      </div>
                    ))}
                  </div>

                  {/* Simulate button */}
                  <button
                    onClick={handleSimulatePayment}
                    disabled={isSimulating}
                    className="w-full px-6 py-4 btn-primary text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSimulating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin relative z-10" />
                        <span className="relative z-10">Memproses Pembayaran...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">Simulasi Bayar (Dummy)</span>
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
