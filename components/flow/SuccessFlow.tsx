"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { formatCurrency } from "@/lib/qris";
import { flowTheme, CONFETTI, type FlowVariant } from "./flowTheme";
import { CheckCircle, Package, Truck, Shield, ArrowRight, Copy, User, Calendar, Hash } from "lucide-react";
import { useState, Suspense, useEffect } from "react";

function Confetti({ variant }: { variant: FlowVariant }) {
  const [particles, setParticles] = useState<
    { id: number; x: number; delay: number; color: string; size: number; rotate: number; duration: number; round: boolean }[]
  >([]);

  useEffect(() => {
    // Generate di dalam rAF: Math.random() dipanggil di callback, bukan saat render
    const raf = requestAnimationFrame(() => {
      const { colors, count } = CONFETTI[variant];
      setParticles(
        Array.from({ length: count }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 4 + Math.random() * 6,
          rotate: 360 + Math.random() * 360,
          duration: 3 + Math.random() * 2,
          round: Math.random() > 0.5,
        }))
      );
    });
    return () => cancelAnimationFrame(raf);
  }, [variant]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: "110vh", opacity: 0, rotate: p.rotate }}
          transition={{ duration: p.duration, delay: p.delay, ease: "linear" }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.round ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}

interface SuccessFlowProps {
  variant: FlowVariant;
  /** Fallback paketId kalau query `paket` tidak ada / tidak valid */
  defaultPaketId: string;
  /** Resolver nama paket dari id — wrapper inject getter dari lib data masing-masing */
  getPaketName?: (id: string) => string;
  /** Ref prefix kalau query `ref` kosong, mis. "SNT" / "RQY" */
  refPrefix: string;
  heading: string;
  subtitle: string;
  refLabel: string;
  statusText: string;
  message: string;
  trackingLabel: string;
  /** time "@now" diganti jam pembayaran otomatis */
  trackingSteps: { icon: "check" | "truck" | "shield" | "package"; text: string; time: string; active: boolean }[];
  secondaryCta: { href: string; label: string };
  footerNote: string;
}

function SuccessContent(props: SuccessFlowProps) {
  const {
    variant,
    defaultPaketId,
    getPaketName,
    refPrefix,
    heading,
    subtitle,
    refLabel,
    statusText,
    message,
    trackingLabel,
    trackingSteps,
    secondaryCta,
    footerNote,
  } = props;
  const t = flowTheme[variant];

  const searchParams = useSearchParams();
  const paketId = searchParams.get("paket") || defaultPaketId;
  const ref = searchParams.get("ref") || `${refPrefix}-UNKNOWN`;
  const amount = Number(searchParams.get("amount")) || 0;
  const nama = searchParams.get("nama") || "Anonim";

  // Nama paket di-resolve lewat getter dari wrapper; id tak dikenal tampil apa adanya
  const paketName = getPaketName?.(paketId) ?? paketId;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ref);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Diamankan sekali agar tanggal/jam di resi tidak berubah saat re-render
  const [now] = useState(() => new Date());
  const dateStr = now.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  const timeStr = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  const stepIcons = {
    check: <CheckCircle className="w-4 h-4" />,
    truck: <Truck className="w-4 h-4" />,
    shield: <Shield className="w-4 h-4" />,
    package: <Package className="w-4 h-4" />,
  };
  // Token "@now" -> jam pembayaran (diisi di receipt header yang sama)
  const resolveTime = (time: string) => (time === "@now" ? timeStr : time);

  return (
    <>
      <Confetti variant={variant} />
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
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${variant === "santet" ? "bg-green/15 dark:bg-green/20" : "bg-green/15 dark:bg-green/20"} flex items-center justify-center`}>
                <CheckCircle className="w-8 h-8 text-green" />
              </div>
            </motion.div>

            <h1 className={`font-['Cinzel'] text-2xl font-bold ${t.heading} mb-1.5`}>
              {heading}
            </h1>
            <p className="text-muted text-[13px] mb-5">{subtitle}</p>

            {/* Receipt */}
            <div className="bg-background/50 dark:bg-[#0a0a0f]/60 rounded-xl p-4 mb-5 text-left">
              {/* Receipt header */}
              <div className="text-center pb-3 mb-3 border-b border-border border-dashed">
                <p className="text-[11px] text-muted-light/50 uppercase tracking-wider mb-1">{refLabel}</p>
                <code className={`${t.refText} font-mono text-base tracking-wider font-bold`}>{ref}</code>
                <button
                  onClick={handleCopy}
                  className={`ml-2 p-1 ${t.copyHover} rounded transition-colors inline-flex align-middle`}
                  aria-label="Salin nomor resi"
                >
                  <Copy className={`w-3.5 h-3.5 ${t.copyIcon}`} />
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
                  <span className="text-foreground/70 font-medium">{paketName}</span>
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
                    {statusText}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2.5 border-t border-border">
                  <span className={t.totalText}>Total</span>
                  <span className={t.totalText}>{amount > 0 ? formatCurrency(amount) : "Rp 0"}</span>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className={`${t.messageBox} rounded-xl p-3 mb-5`}>
              <p className="text-[12px] text-muted italic">{message}</p>
            </div>

            {/* Tracking */}
            <div className="text-left mb-5">
              <p className={`text-[10px] ${t.sectionLabel} font-semibold uppercase tracking-wider mb-3`}>{trackingLabel}</p>
              <div className="space-y-0">
                {trackingSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          step.active ? t.trackingActiveIcon : "bg-muted-light/10 text-muted-light/20"
                        }`}
                      >
                        {stepIcons[step.icon]}
                      </div>
                      {i < trackingSteps.length - 1 && (
                        <div className={`w-px h-5 ${step.active ? t.trackingActiveLine : "bg-muted-light/10"}`} />
                      )}
                    </div>
                    <div className="pb-4 min-w-0">
                      <p className={`text-[12px] ${step.active ? "text-foreground/70" : "text-muted-light/30"}`}>
                        {step.text}
                      </p>
                      <p className="text-[10px] text-muted-light/40 mt-0.5">{resolveTime(step.time)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <Link
                href="/"
                className={`flex-1 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-[13px] ${t.ctaPrimary}`}
              >
                <span>Kembali ke Beranda</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={secondaryCta.href}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 border border-green/15 dark:border-green/20 text-green font-semibold text-[13px] rounded-xl hover:bg-green/5 dark:hover:bg-green/6 transition-all duration-300"
              >
                <Shield className="w-3.5 h-3.5" />
                {secondaryCta.label}
              </Link>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-center text-[11px] text-muted-light/40 mt-5 italic"
          >
            {footerNote}
          </motion.p>
        </div>
      </div>
    </>
  );
}

export default function SuccessFlow(props: SuccessFlowProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className={`animate-pulse text-sm ${flowTheme[props.variant].suspenseText}`}>Memuat...</div>
        </div>
      }
    >
      <SuccessContent {...props} />
    </Suspense>
  );
}
