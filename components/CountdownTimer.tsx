"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  initialMinutes?: number;
  onExpire?: () => void;
}

export default function CountdownTimer({ initialMinutes = 15, onExpire }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    // Fix: interval jalan terus, berhenti saat mencapai 0
    // (sebelumnya setInterval di-recreate tiap tick)
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) onExpire?.();
  }, [timeLeft, onExpire]);

  const expired = timeLeft <= 0;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isUrgent = timeLeft < 120 && !expired;

  return (
    <motion.div
      animate={isUrgent ? { scale: [1, 1.02, 1] } : {}}
      transition={{ repeat: Infinity, duration: 1 }}
      className="text-center"
      role="timer"
      aria-live={expired ? "assertive" : "off"}
    >
      <p
        className={`text-xs mb-2 uppercase tracking-wider font-medium ${
          expired
            ? "text-[#8b0000] font-bold"
            : isUrgent
              ? "text-[#8b0000]/80"
              : "text-[#e8e0d0]/40"
        }`}
      >
        {expired ? "Waktu pembayaran habis" : isUrgent ? "Waktu hampir habis" : "Batas waktu pembayaran"}
      </p>
      <div
        className={`font-mono text-4xl font-bold tracking-wider ${
          expired || isUrgent ? "text-[#8b0000]" : "text-[#d4af37]"
        } ${expired ? "opacity-60" : ""}`}
      >
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
      {expired && (
        <p className="text-[11px] text-muted mt-1.5 italic">
          Silakan buat pesanan baru dari katalog.
        </p>
      )}
    </motion.div>
  );
}
