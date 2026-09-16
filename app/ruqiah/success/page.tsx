"use client";

import SuccessFlow from "@/components/flow/SuccessFlow";
import { getRuqyahById } from "@/lib/ruqyahData";

export default function RuqiahSuccessPage() {
  return (
    <SuccessFlow
      variant="ruqiah"
      defaultPaketId="telfon-fatihah"
      getPaketName={(id) => getRuqyahById(id)?.nama ?? id}
      refPrefix="RQY"
      heading="Pembayaran Berhasil!"
      subtitle="Ruqyah kamu sedang dalam proses"
      refLabel="Nomor Resi"
      statusText="Sedang Diproses"
      message="Insyaallah ruqyah akan selesai dalam 1-3 hari. Semoga lekas sembuh."
      trackingLabel="Status Ruqyah"
      trackingSteps={[
        { icon: "check", text: "Pembayaran diterima", time: "@now", active: true },
        { icon: "check", text: "Ustadz mulai ruqyah", time: "Proses...", active: true },
        { icon: "shield", text: "Ruqyah sedang berlangsung", time: "Menunggu", active: false },
        { icon: "check", text: "Ruqyah selesai", time: "Estimasi 1-3 hari", active: false },
      ]}
      secondaryCta={{ href: "/ruqiah", label: "Ruqyah Online" }}
      footerNote="Semua transaksi adalah simulasi/dummy. Ini cuma humor."
    />
  );
}
