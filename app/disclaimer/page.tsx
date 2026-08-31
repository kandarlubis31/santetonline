"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Shield, Heart, BookOpen, Info } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    icon: <Heart className="w-5 h-5" />,
    num: "01",
    title: "Website Humor & Hiburan",
    content: "Website SantetOnline adalah website yang dibuat untuk tujuan humor dan hiburan semata. Semua konten adalah fiksi dan simulasi. Tidak ada niat untuk menyinggung atau menyakiti siapapun.",
    accent: false,
  },
  {
    icon: <Shield className="w-5 h-5" />,
    num: "02",
    title: "Tidak Ada Santet Nyata",
    content: "Tidak ada layanan santet yang sebenarnya di website ini. Semua paket santet hanyalah konten humor. Santet adalah bagian dari budaya tradisional Indonesia, tapi website ini hanya untuk hiburan.",
    accent: false,
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    num: "03",
    title: "Pembayaran Dummy/Simulasi",
    content: "Semua proses pembayaran di website ini adalah simulasi/dummy. QRIS yang ditampilkan adalah QR code dummy yang tidak terhubung ke payment gateway manapun. Tidak ada uang nyata yang dipotong.",
    accent: false,
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    num: "04",
    title: "Tujuan Edukasi",
    content: "Website ini juga bertujuan untuk mengedukasi masyarakat tentang sejarah dan budaya santet di Indonesia. Semua informasi sejarah bersifat edukatif dan dapat diverifikasi.",
    accent: false,
  },
  {
    icon: <Info className="w-5 h-5" />,
    num: "05",
    title: "Jangan Serius Ya!",
    content: "Website ini murni dibuat untuk hiburan dan humor. Jika Anda terhibur, share ke teman-teman ya! Ketawa bersama lebih baik daripada marah-marah sendiri.",
    accent: true,
  },
];

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-['Cinzel'] text-3xl md:text-4xl font-bold text-secondary mb-2">
            Disclaimer
          </h1>
          <p className="text-muted text-[15px]">
            Baca sebelum pakai website ini.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-3">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-2xl p-5 group ${
                section.accent
                  ? "bg-secondary/5 dark:bg-secondary/8 border border-secondary/15 dark:border-secondary/20"
                  : "card-base"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-mono text-accent/30 dark:text-accent/40 uppercase tracking-widest">
                  {section.num}
                </span>
                <div className={section.accent ? "text-secondary/60 dark:text-secondary/70" : "text-accent/60 dark:text-accent/70"}>
                  {section.icon}
                </div>
                <h2 className={`font-['Cinzel'] text-base font-bold ${
                  section.accent ? "text-secondary dark:text-secondary" : "text-accent/80 dark:text-accent/90"
                }`}>
                  {section.title}
                </h2>
              </div>
              <p className="text-[13px] text-muted leading-relaxed pl-9">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* QRIS info */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 card-base p-5 hover:transform-none"
        >
          <h3 className="font-['Cinzel'] text-sm font-bold text-accent/50 dark:text-accent/60 mb-2">
            Tentang QRIS di Website Ini
          </h3>
          <p className="text-[13px] text-muted/70 leading-relaxed">
            QRIS yang ditampilkan adalah <strong>QR code dummy/simulasi</strong>. QR code ini tidak terhubung ke payment gateway manapun. <strong>Tidak ada pembayaran nyata yang terjadi</strong>. Semua transaksi hanya simulasi untuk keperluan hiburan.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center space-y-4"
        >
          <p className="text-[13px] text-muted-light/50">
            Sudah baca disclaimer-nya? Sekarang saatnya have fun!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/katalog"
              className="px-6 py-2.5 btn-primary text-sm"
            >
              <span>Lihat Katalog</span>
            </Link>
            <Link
              href="/"
              className="px-6 py-2.5 border border-accent/15 dark:border-accent/20 text-accent font-semibold text-sm rounded-lg hover:bg-accent/5 dark:hover:bg-accent/6 transition-all duration-300"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
