"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Skull } from "lucide-react";

/**
 * Kontrak baru: SplashProvider yang membungkus dengan AnimatePresence.
 * onExitStart dipanggil saat choreography selesai (3.8s) — konten di belakang
 * langsung reveal, splash sendiri exit-fade 0.8s → efek crossfade tanpa jeda
 * blank. (Sebelumnya konten baru muncul SETELAH fade selesai → splash pudar
 * ke halaman kosong dulu.)
 */
export default function SplashScreen({
  onExitStart,
}: {
  onExitStart: () => void;
}) {
  const [phase, setPhase] = useState(0);
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; delay: number; duration: number; drift: number }[]
  >([]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(3), 1800),
      setTimeout(() => setPhase(4), 2600),
      // MULAI exit di 3.8s (bukan selesai dulu baru reveal konten di 4.6s)
      setTimeout(() => onExitStart(), 3800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onExitStart]);

  useEffect(() => {
    // Generate di dalam rAF: Math.random() dipanggil di callback, bukan saat render
    const raf = requestAnimationFrame(() => {
      setParticles(
        Array.from({ length: 30 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 1 + Math.random() * 2,
          delay: Math.random() * 3,
          duration: 3 + Math.random() * 4,
          drift: 40 + Math.random() * 60,
        }))
      );
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    // Exit animation dieksekusi oleh AnimatePresence di SplashProvider
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--splash-bg)" }}
    >
      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay opacity-30" />

      {/* Ambient particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.4, 0],
            y: [0, -p.drift],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: "var(--splash-particle)",
            filter: "blur(0.5px)",
          }}
        />
      ))}

      {/* Central glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={
          phase >= 1
            ? {
                opacity: [0, 0.6, 0.3],
                scale: [0.5, 1.2, 1],
              }
            : {}
        }
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute"
      >
        <div
          className="w-[400px] h-[400px] rounded-full blur-[100px]"
          style={{ backgroundColor: "var(--splash-gold-glow-strong)" }}
        />
      </motion.div>

      {/* Red glow accent */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={phase >= 1 ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute"
      >
        <div
          className="w-[300px] h-[300px] rounded-full blur-[80px] -translate-x-20 translate-y-10"
          style={{ backgroundColor: "var(--splash-red-glow)" }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Skull Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={
            phase >= 2
              ? {
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }
              : {}
          }
          transition={{
            type: "spring",
            duration: 1.2,
            bounce: 0.2,
          }}
          className="mb-8"
        >
          <div className="relative">
            <div
              className="absolute inset-0 blur-2xl rounded-full scale-150"
              style={{ backgroundColor: "var(--splash-icon-shadow)" }}
            />
            <Skull
              className="relative w-16 h-16 md:w-20 md:h-20"
              style={{ color: "var(--splash-gold)" }}
            />
          </div>
        </motion.div>

        {/* Brand Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={phase >= 3 ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="overflow-hidden"
        >
          <motion.div
            initial={{ y: 40 }}
            animate={phase >= 3 ? { y: 0 } : {}}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <h1 className="font-['Cinzel'] text-4xl md:text-6xl font-black tracking-wider text-center">
              <motion.span
                initial={{ opacity: 0 }}
                animate={phase >= 3 ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ color: "var(--splash-gold)" }}
              >
                SANTET
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={phase >= 3 ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ color: "var(--splash-red)" }}
              >
                ONLINE
              </motion.span>
            </h1>
          </motion.div>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={phase >= 3 ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
          className="w-24 h-px mt-4 mb-5"
          style={{
            background: `linear-gradient(90deg, transparent, var(--splash-gold-glow-strong), transparent)`,
          }}
        />

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p
            className="text-sm font-light tracking-wide"
            style={{ color: "var(--splash-text-muted)" }}
          >
            Santet Online? Siap Kirim ke Mana Aja.
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={phase >= 4 ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-[10px] mt-3 italic"
            style={{ color: "var(--splash-text-ghost)" }}
          >
            *Sertifikat Gaib No. 001/JIN/1879
          </motion.p>
        </motion.div>
      </div>

      {/* Corner decorations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={phase >= 2 ? { opacity: 0.3 } : {}}
        transition={{ duration: 1 }}
        className="absolute top-8 left-8"
      >
        <div
          className="w-12 h-12 border-l border-t"
          style={{ borderColor: "var(--splash-border)" }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={phase >= 2 ? { opacity: 0.3 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-8 right-8"
      >
        <div
          className="w-12 h-12 border-r border-b"
          style={{ borderColor: "var(--splash-border)" }}
        />
      </motion.div>

      {/* Skip button — dipanggil onExitStart: konten langsung reveal,
          splash exit-fade via provider (aman walau timer juga sempat firing) */}
      <motion.button
        type="button"
        onClick={onExitStart}
        initial={{ opacity: 0 }}
        animate={phase >= 2 ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        aria-label="Lewati intro dan masuk ke situs"
        className="absolute bottom-6 right-6 z-10 px-3 py-2 text-[11px] uppercase tracking-widest cursor-pointer transition-colors hover:opacity-100 focus-visible:opacity-100"
        style={{ color: "var(--splash-text-ghost)" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--splash-text-muted)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--splash-text-ghost)")
        }
      >
        Lewati &rarr;
      </motion.button>
    </motion.div>
  );
}
