"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { useTheme } from "./ThemeProvider";

interface QRISCodeProps {
  value: string;
  size?: number;
}

export default function QRISCode({ value, size = 200 }: QRISCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  // Fix: QR sebelumnya dirender sekali dengan warna tema saat itu —
  // toggle tema tidak me-render ulang QR (warna basi/terbalik).
  const { theme } = useTheme();

  useEffect(() => {
    if (!canvasRef.current) return;
    const isDark = document.documentElement.classList.contains("dark");
    setLoaded(false);
    QRCode.toCanvas(canvasRef.current, value, {
      width: size,
      margin: 2,
      color: {
        dark: isDark ? "#e8e0d0" : "#1a1520",
        light: isDark ? "#0a0a0f" : "#f5f2eb",
      },
      errorCorrectionLevel: "M",
    })
      .then(() => setLoaded(true))
      .catch(() => {
        // Gagal render (mis. value kosong) — jangan biarkan spinner selamanya
        setLoaded(true);
      });
  }, [value, size, theme]);

  return (
    <div className="relative inline-block">
      {/* Outer frame */}
      <div className="p-4 bg-card border border-border rounded-2xl">
        <canvas ref={canvasRef} className={`transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`} />
        {!loaded && (
          <div style={{ width: size, height: size }} className="flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          </div>
        )}
      </div>
      {/* Label */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-card border border-border rounded-full">
        <span className="text-[10px] font-medium text-accent/90 uppercase tracking-wider">QRIS</span>
      </div>
    </div>
  );
}
