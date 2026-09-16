"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useIntroReady } from "./SplashProvider";

/**
 * Enter animation per-pathname (pola AnimatePresence mode="wait" rusak di App
 * Router — lihat riwayat). Sekarang juga di-gate ke introReady: saat splash
 * masih tampil, konten tidak dianimasikan; animasi antar-navigasi jalan
 * normal setelah intro selesai.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const introReady = useIntroReady();

  return (
    <motion.div
      key={pathname}
      initial={introReady ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex-1"
    >
      {children}
    </motion.div>
  );
}
