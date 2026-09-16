"use client";

import Link from "next/link";
import { Package, ArrowLeft } from "lucide-react";
import { flowTheme, type FlowVariant } from "./flowTheme";

interface PaketNotFoundProps {
  variant: FlowVariant;
  backHref: string;
  description: string;
}

export default function PaketNotFound({ variant, backHref, description }: PaketNotFoundProps) {
  const t = flowTheme[variant].notFound;

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="text-center px-4">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${t.iconWrap} flex items-center justify-center`}>
          <Package className={`w-8 h-8 ${t.iconText}`} />
        </div>
        <h1 className={`font-['Cinzel'] text-3xl font-bold ${t.title} mb-3`}>
          404 &mdash; Paket Tidak Ditemukan
        </h1>
        <p className="text-muted mb-6 text-sm">{description}</p>
        <Link href={backHref} className={t.cta}>
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog</span>
        </Link>
      </div>
    </div>
  );
}
