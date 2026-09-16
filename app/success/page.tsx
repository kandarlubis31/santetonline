"use client";

import { useState } from "react";
import SuccessFlow from "@/components/flow/SuccessFlow";
import { getPaketById } from "@/lib/paketData";

const funnyMessages = [
  "Target akan merasakan efek dalam 3-7 hari kerja",
  "Jangan kaget kalau target tiba-tiba hafal sholawat",
  "Efek samping mungkin termasuk: ngomong sendiri di kamar mandi",
  "Garansi: Kalau gagal, uang kembali 200% (bercanda)",
];

export default function SuccessPage() {
  // Diamankan sekali agar pesan tidak berubah saat re-render (mis. klik Copy)
  const [message] = useState(
    () => funnyMessages[Math.floor(Math.random() * funnyMessages.length)]
  );

  return (
    <SuccessFlow
      variant="santet"
      defaultPaketId="ringan"
      getPaketName={(id) => getPaketById(id)?.nama ?? id}
      refPrefix="SNT"
      heading="Pembayaran Berhasil!"
      subtitle="Santet kamu sedang dalam proses pengiriman"
      refLabel="Resi Pengiriman"
      statusText="Sedang Dikirim"
      message={message}
      trackingLabel="Status Pengiriman"
      trackingSteps={[
        { icon: "check", text: "Pembayaran diterima", time: "@now", active: true },
        { icon: "check", text: "Dukun mulai ritual", time: "Proses...", active: true },
        { icon: "truck", text: "Santet dalam perjalanan", time: "Menunggu", active: false },
        { icon: "package", text: "Santet sampai di target", time: "Estimasi 3-7 hari", active: false },
      ]}
      secondaryCta={{ href: "/ruqiah", label: "Ruqyah Online" }}
      footerNote="Semua transaksi adalah simulasi/dummy. Ini cuma humor."
    />
  );
}
