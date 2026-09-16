"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import BayarFlow from "@/components/flow/BayarFlow";
import PaketNotFound from "@/components/flow/PaketNotFound";
import { getPaketById } from "@/lib/paketData";
import { generateQrisUrl, generateDummyRef } from "@/lib/qris";

export default function BayarPage() {
  const params = useParams();
  const paketId = params.paketId as string;
  const paket = getPaketById(paketId);

  // Stabil: resi & QR payload tidak di-generate ulang saat re-render,
  // dan QR memakai resi yang sama dengan yang ditampilkan
  const [dummyRef] = useState(() => generateDummyRef());
  const [paymentUrl] = useState(() => generateQrisUrl(paketId, paket?.harga ?? 0, dummyRef));

  if (!paket) {
    return (
      <PaketNotFound
        variant="santet"
        backHref="/katalog"
        description="Mungkin paket ini sudah dicancel sama dukunnya."
      />
    );
  }

  return (
    <BayarFlow
      variant="santet"
      paket={paket}
      backHref="/katalog"
      paymentUrl={paymentUrl}
      dummyRef={dummyRef}
      successHref={(ref, nama) =>
        `/success?paket=${paketId}&ref=${ref}&amount=${paket.harga}&nama=${encodeURIComponent(nama)}`
      }
    />
  );
}
