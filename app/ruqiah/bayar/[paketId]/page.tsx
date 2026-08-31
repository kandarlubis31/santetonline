"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRISCode from "@/components/QRISCode";
import CountdownTimer from "@/components/CountdownTimer";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import { getRuqyahById as getPaketById } from "@/lib/ruqyahData";
import { generateDummyRef, formatCurrency } from "@/lib/qris";
import {
  ArrowLeft,
  CreditCard,
  CheckCircle,
  Loader2,
  Package,
  User,
  Clock,
  Hash,
  Shield,
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
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green/10 dark:bg-green/15 flex items-center justify-center">
            <Package className="w-8 h-8 text-green/50" />
          </div>
          <h1 className="font-['Cinzel'] text-3xl font-bold text-green mb-3">
            404 &mdash; Paket Tidak Ditemukan
          </h1>
          <p className="text-muted mb-6 text-sm">
            Paket ruqyah ini tidak ditemukan.
          </p>
          <Link
            href="/ruqiah/katalog"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green text-white font-semibold rounded-xl text-sm hover:opacity-90 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog</span>
          </Link>
        </div>
      </div>
    );
  }

  const paymentUrl = `https://santetonline.app/ruqyah/${paketId}`;

  const handleSimulatePayment = async () => {
    setIsSimulating(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsSimulating(false);
    setShowNameForm(true);
  };

  const handleSubmitNama = () => {
    if (!nama.trim()) return;
    router.push(
      `/ruqiah/success?paket=${paketId}&ref=${dummyRef}&amount=${paket.harga}&nama=${encodeURIComponent(nama.trim())}`
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        {/* Back link */}
        <Link
          href="/ruqiah/katalog"
          className="inline-flex items-center gap-1.5 text-green/50 hover:text-green transition-colors mb-8 text-[13px]"
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
                    showNameForm
                      ? "bg-green/15 text-green dark:bg-green/20"
                      : i === 0
                      ? "bg-green/15 text-green dark:bg-green/20"
                      : "bg-muted-light/10 text-muted-light/40"
                  }`}
                >
                  {showNameForm && i < 2 ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={`text-[12px] font-medium hidden sm:block ${
                    i === 0 || (showNameForm && i < 3)
                      ? "text-foreground/70"
                      : "text-muted-light/40"
                  }`}
                >
                  {step}
                </span>
              </div>
              {i < 2 && (
                <div
                  className={`flex-1 h-px mx-3 ${
                    showNameForm || i === 0 ? "bg-green/20" : "bg-border"
                  }`}
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
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green/10 dark:bg-green/15 flex items-center justify-center">
                  <User className="w-6 h-6 text-green" />
                </div>
                <h2 className="font-['Cinzel'] text-lg font-bold text-green mb-1">
                  Siapa yang Pesan?
                </h2>
                <p className="text-[13px] text-muted">
                  Masukkan nama untuk resi ruqyah
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
                    className="w-full bg-background/50 dark:bg-[#0a0a0f]/40 border border-border rounded-xl px-4 py-3 text-[14px] text-foreground/80 placeholder-muted-light/40 focus:outline-none focus:border-green/25 dark:focus:border-green/30 transition-colors"
                    autoFocus
                  />
                </div>

                <button
                  onClick={handleSubmitNama}
                  disabled={!nama.trim()}
                  className="w-full px-6 py-3.5 bg-green text-white font-semibold rounded-xl text-base disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Konfirmasi Pesanan</span>
                </button>

                <p className="text-[11px] text-muted-light/40 text-center italic">
                  Nama akan muncul di resi ruqyah
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
                <h2 className="font-['Cinzel'] text-base font-bold text-green mb-4 flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Ringkasan Pesanan
                </h2>

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-green/8 dark:bg-green/10 border border-green/12 dark:border-green/15 flex items-center justify-center font-['Cinzel'] text-lg font-bold text-green/70 dark:text-green/80 shrink-0">
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
                    <span className="text-foreground/70 font-mono text-xs">{dummyRef}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                    <span className="text-green">Total</span>
                    <span className="text-green">{formatCurrency(paket.harga)}</span>
                  </div>
                </div>
              </div>

              {/* QRIS Payment */}
              <div className="card-base p-5 mb-4 hover:transform-none">
                <h2 className="font-['Cinzel'] text-base font-bold text-green mb-5 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Bayar dengan QRIS
                </h2>

                <div className="flex flex-col items-center">
                  <div className="mb-4">
                    <CountdownTimer initialMinutes={15} />
                  </div>

                  <div className="mb-5">
                    <QRISCode value={paymentUrl} size={200} />
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
                        <span className="w-5 h-5 rounded-full bg-green/8 dark:bg-green/10 flex items-center justify-center text-green/60 dark:text-green/70 text-[10px] font-bold shrink-0 mt-0.5">
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
                    className="w-full px-6 py-4 bg-green text-white font-semibold rounded-xl text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                  >
                    {isSimulating ? (
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
