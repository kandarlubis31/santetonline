"use client";

import Link from "next/link";
import { Skull, Shield, Heart } from "lucide-react";

const santetLinks = [
  { href: "/katalog", label: "Katalog Paket" },
  { href: "/cara-kerja", label: "Cara Kerja" },
  { href: "/testimoni", label: "Testimoni" },
  { href: "/faq", label: "FAQ" },
];

const ruqyahLinks = [
  { href: "/ruqiah", label: "Beranda" },
  { href: "/ruqiah/katalog", label: "Katalog Ruqyah" },
  { href: "/ruqiah/konsultasi", label: "Konsultasi Ustadz" },
];

const infoLinks = [
  { href: "/tentang", label: "Tentang Kami" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10 dark:to-[#111118]/50" />

      <div className="relative max-w-6xl mx-auto px-4 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Skull className="w-6 h-6 text-accent" />
              <span className="font-['Cinzel'] text-base font-bold tracking-wider">
                <span className="text-accent">SANTET</span>
                <span className="text-secondary">ONLINE</span>
              </span>
            </Link>
            <p className="text-[12px] text-muted leading-relaxed mb-4">
              Layanan santet online pertama di Indonesia. Paket lengkap, harga bersahabat, hasil memuaskan.
            </p>
            <Link
              href="/ruqiah"
              className="inline-flex items-center gap-1.5 text-[12px] text-green/60 hover:text-green transition-colors"
            >
              <Shield className="w-3 h-3" />
              Tersedia juga: RuqyahOnline
            </Link>
          </div>

          {/* SantetOnline */}
          <div>
            <h4 className="text-[11px] font-semibold text-muted-light uppercase tracking-wider mb-4">
              SantetOnline
            </h4>
            <ul className="space-y-2.5">
              {santetLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RuqyahOnline */}
          <div>
            <h4 className="text-[11px] font-semibold text-muted-light uppercase tracking-wider mb-4">
              RuqyahOnline
            </h4>
            <ul className="space-y-2.5">
              {ruqyahLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-muted hover:text-green transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-[11px] font-semibold text-muted-light uppercase tracking-wider mb-4">
              Informasi
            </h4>
            <ul className="space-y-2.5">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="section-divider mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-muted-light/50">
            &copy; {new Date().getFullYear()} SantetOnline. Semua hak dilindungi (oleh makhluk gaib).
          </p>
          <p className="text-[11px] text-muted-light/40 italic flex items-center gap-1">
            Dibuat dengan <Heart className="w-3 h-3 text-secondary/40" /> dan sedikit ilmu gaib
          </p>
        </div>
      </div>
    </footer>
  );
}
