"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import SplashScreen from "./SplashScreen";

const SPLASH_KEY = "santetonline_splash_seen";

// Snapshot konstan — cuma buat mendeteksi sisi server vs client
const emptySubscribe = () => () => {};

export default function SplashProvider({ children }: { children: React.ReactNode }) {
  // false saat SSR & render client pertama, true setelahnya — tanpa setState di effect
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (sessionStorage.getItem(SPLASH_KEY)) {
        setShowSplash(false);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleComplete = useCallback(() => {
    sessionStorage.setItem(SPLASH_KEY, "1");
    setShowSplash(false);
  }, []);

  // Prevent flash of content before hydration
  if (!mounted) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "var(--splash-bg)" }}>
        {children}
      </div>
    );
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleComplete} />}
      {/* Saat splash tampil, konten di belakang harus non-interaktif
          (sebelumnya hanya opacity-0 — link/tombol tetap bisa diklik tak terlihat) */}
      <div
        aria-hidden={showSplash}
        className={
          showSplash
            ? "pointer-events-none select-none opacity-0"
            : "opacity-100 transition-opacity duration-500"
        }
      >
        {children}
      </div>
    </>
  );
}
