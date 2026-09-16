"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export default function SmokeEffect() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate di dalam rAF: Math.random() dipanggil di callback, bukan saat render
    const raf = requestAnimationFrame(() => {
      setParticles(
        Array.from({ length: 10 }, (_, i) => ({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 6,
          duration: 5 + Math.random() * 5,
          size: 30 + Math.random() * 60,
        }))
      );
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[#d4af37]/[0.03] animate-smoke"
          style={{
            left: `${p.left}%`,
            bottom: "-20px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            filter: "blur(24px)",
          }}
        />
      ))}
    </div>
  );
}
