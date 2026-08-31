"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

interface QRISCodeProps {
  value: string;
  size?: number;
}

export default function QRISCode({ value, size = 200 }: QRISCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, value, {
      width: size,
      margin: 2,
      color: {
        dark: "#e8e0d0",
        light: "#0a0a0f",
      },
      errorCorrectionLevel: "M",
    }).then(() => setLoaded(true));
  }, [value, size]);

  return (
    <div className="relative inline-block">
      {/* Outer frame */}
      <div className="p-4 bg-[#0a0a0f] rounded-2xl border border-[#d4af37]/20 shadow-[0_0_30px_rgba(212,175,55,0.08)]">
        <canvas ref={canvasRef} className={`transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`} />
        {!loaded && (
          <div style={{ width: size, height: size }} className="flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-[#d4af37]/30 border-t-[#d4af37] rounded-full animate-spin" />
          </div>
        )}
      </div>
      {/* Label */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#0a0a0f] border border-[#d4af37]/15 rounded-full">
        <span className="text-[10px] font-medium text-[#d4af37]/60 uppercase tracking-wider">QRIS</span>
      </div>
    </div>
  );
}
