import Link from "next/link";
import { Skull, ArrowLeft, Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/10 dark:bg-secondary/15 flex items-center justify-center animate-float">
          <Skull className="w-10 h-10 text-accent/70 dark:text-accent/80" />
        </div>

        <p className="font-['Cinzel'] text-7xl font-black text-accent/90 mb-2 tracking-wider">
          404
        </p>
        <h1 className="font-['Cinzel'] text-xl font-bold text-secondary mb-3">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-muted text-sm mb-2">
          Halaman yang kamu cari nggak ada atau sudah dipindah.
        </p>
        <p className="text-[12px] text-muted-light/50 italic mb-8">
          Rumor terakhir: dibawa kabur sama dukunnya.
        </p>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 btn-primary text-[13px]"
          >
            <ArrowLeft className="w-3.5 h-3.5 relative z-10" />
            <span className="relative z-10">Kembali ke Beranda</span>
          </Link>
          <Link
            href="/katalog"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 border border-accent/15 dark:border-accent/20 text-accent font-semibold text-[13px] rounded-xl hover:bg-accent/5 dark:hover:bg-accent/10 transition-all duration-300"
          >
            <Ghost className="w-3.5 h-3.5" />
            Lihat Katalog
          </Link>
        </div>

        <p className="text-[11px] text-muted-light/40 mt-8 italic">
          Error 404 &mdash; halaman ini mungkin dibawa kabur sama dukunnya.
        </p>
      </div>
    </div>
  );
}
