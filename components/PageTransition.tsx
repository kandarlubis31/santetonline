"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Fix: AnimatePresence mode="wait" tidak berfungsi di App Router (Next.js
 * me-unmount tree lama saat navigasi, exit animation tidak pernah jalan dan
 * malah menunda render halaman baru). Sekarang hanya enter animation
 * per-pathname — terasa instan dan bebas bug.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex-1"
    >
      {children}
    </motion.div>
  );
}
