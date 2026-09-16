"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import BayarFlow from "@/components/flow/BayarFlow";
import PaketNotFound from "@/components/flow/PaketNotFound";
import { getRuqyahById } from "@/lib/ruqyahData";
import { generateDummyRef } from "@/lib/qris";

export default function BayarPage() {
  const params = useParams();
  const paketId = params.paketId as string;
  const paket = getRuqyahById(paketId);

  // Stabil: resi & QR payload tidak di-generate ulang saat re-render.
  // QR mengarah ke halaman success situs ini (bukan domain hardcode).
  const [dummyRef] = useState(() => generateDummyRef());
  const [paymentUrl] = useState(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return `${origin}/ruqiah/success?paket=${paketId}&ref=${dummyRef}&amount=${paket?.harga ?? 0}`;
  });

  if (!paket) {
    return (
      <PaketNotFound
        variant="ruqiah"
        backHref="/ruqiah/katalog"
        description="Paket ruqyah ini tidak ditemukan."
      />
    );
  }

  return (
    <BayarFlow
      variant="ruqiah"
      paket={paket}
      backHref="/ruqiah/katalog"
      paymentUrl={paymentUrl}
      dummyRef={dummyRef}
      successHref={(ref, nama) =>
        `/ruqiah/success?paket=${paketId}&ref=${ref}&amount=${paket.harga}&nama=${encodeURIComponent(nama)}`
      }
    />
  );
}
