"use client";

import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  useSyncExternalStore,
} from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "./SplashScreen";

const SPLASH_KEY = "santetonline_splash_seen";

// Context: halaman & hero menunggu `introReady` sebelum memainkan entrance
// animation. (Sebelumnya choreography hero jalan tersembunyi di balik splash —
// pas splash hilang semuanya sudah selesai & diam, animasinya nggak terlihat.)
const SplashContext = createContext(true);

/** true = splash selesai (atau di-skip), entrance animation boleh main */
export function useIntroReady() {
  return useContext(SplashContext);
}

// Snapshot konstan — cuma buat mendeteksi sisi server vs client
const emptySubscribe = () => () => {};

export default function SplashProvider({ children }: { children: React.ReactNode }) {
  // false saat SSR & render client pertama, true setelahnya — tanpa setState di effect
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [showSplash, setShowSplash] = useState(true);
  const [introReady, setIntroReady] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      // Skip splash: repeat visit ATAU user prefers-reduced-motion
      // (animasi 4.6 detik justru menyakitkan buat mereka)
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (sessionStorage.getItem(SPLASH_KEY) || reduced) {
        setShowSplash(false);
        setIntroReady(true);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Dipanggil saat splash MULAI exit — bukan setelah selesai. Konten langsung
  // reveal di bawahnya, jadi exit-fade splash 0.8s bertindak sebagai crossfade.
  // (Sebelumnya konten baru reveal ±800ms SETELAH splash mulai pudar → user
  // melihat splash pudar ke halaman kosong, lalu konten pop-in.)
  const handleExitStart = useCallback(() => {
    sessionStorage.setItem(SPLASH_KEY, "1");
    setShowSplash(false);
    setIntroReady(true);
  }, []);

  // Pre-hydration (SSR + render client pertama): konten disembunyikan — sama
  // seperti state splash aktif. (Sebelumnya konten tampil terbuka sesaat di
  // HTML sebelum JS hidup, lalu splash menutupinya → flash of content.)
  if (!mounted) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "var(--splash-bg)" }}>
        <div aria-hidden className="pointer-events-none select-none opacity-0">
          {children}
        </div>
      </div>
    );
  }

  return (
    <SplashContext.Provider value={introReady}>
      <AnimatePresence>
        {showSplash && <SplashScreen onExitStart={handleExitStart} />}
      </AnimatePresence>
      {/* Saat splash tampil, konten di belakang non-interaktif; saat splash
          exit-fade, konten langsung tampil (crossfade, tanpa delay tambahan) */}
      <div
        aria-hidden={!introReady}
        className={
          introReady ? undefined : "pointer-events-none select-none opacity-0"
        }
      >
        {children}
      </div>
    </SplashContext.Provider>
  );
}
