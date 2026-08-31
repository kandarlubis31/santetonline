"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  initialMinutes?: number;
}

export default function CountdownTimer({ initialMinutes = 15 }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isUrgent = timeLeft < 120;

  return (
    <motion.div
      animate={isUrgent ? { scale: [1, 1.02, 1] } : {}}
      transition={{ repeat: Infinity, duration: 1 }}
      className={`text-center ${isUrgent ? "text-[#8b0000]" : ""}`}
    >
      <p className={`text-xs mb-2 uppercase tracking-wider font-medium ${
        isUrgent ? "text-[#8b0000]/80" : "text-[#e8e0d0]/40"
      }`}>
        {isUrgent ? "Waktu hampir habis" : "Batas waktu pembayaran"}
      </p>
      <div className={`font-mono text-4xl font-bold tracking-wider ${
        isUrgent ? "text-[#8b0000]" : "text-[#d4af37]"
      }`}>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
    </motion.div>
  );
}
