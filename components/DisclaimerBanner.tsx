"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function DisclaimerBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-secondary/5 dark:bg-secondary/10 border border-secondary/15 dark:border-secondary/20 rounded-xl px-5 py-4 flex items-start gap-3"
    >
      <AlertTriangle className="w-4 h-4 text-secondary/60 dark:text-secondary/70 shrink-0 mt-0.5" />
      <div className="text-[13px] text-muted leading-relaxed">
        <span className="font-semibold text-secondary/70 dark:text-secondary/80">Disclaimer</span>{" "}
        Website ini dibuat untuk <strong>hiburan dan humor</strong> saja. Tidak
        ada layanan santet yang sebenarnya. Semua transaksi adalah{" "}
        <strong>dummy/simulasi</strong>.
      </div>
    </motion.div>
  );
}
