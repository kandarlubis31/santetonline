"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Shield, Heart, BookOpen, Info } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    icon: <Heart className="w-5 h-5" />,
    num: "01",
    title: "Tentang Layanan Kami",
    content:
      "SantetOnline adalah pelopor layanan santet digital pertama di Indonesia sejak 1879. Semua ritual dilakukan di alam gaib oleh dukun bersertifikat SGA (Santet Gaib Authority), tanpa menyentuh dunia nyata.",
    accent: false,
  },
  {
    icon: <Shield className="w-5 h-5" />,
    num: "02",
    title: "Legalitas & Perizinan",
    content:
      "Beroperasi dengan izin resmi MUI Gaib No. 001/JIN/1879 dan terdaftar di Buku Gaib Negara. Kami tidak melayani target di luar jangkauan jaringan gaib, termasuk Mars dan dimensi paralel.",
    accent: false,
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    num: "03",
    title: "Pembayaran & Verifikasi",
    content:
      "Pembayaran diproses lewat QRIS Gaib yang terhubung langsung ke jaringan kami. Resi yang diterbitkan sah menurut hukum alam gaib dan dapat digunakan untuk klaim garansi.",
    accent: false,
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    num: "04",
    title: "Efek & Harapan",
    content:
      "Hasil ritual dapat bervariasi pada setiap target, tergantung ketebalan aura, tingkat kepercayaan, dan posisi bulan. Estimasi pengiriman 3-7 hari kerja alam gaib. Garansi uang kembali 200% berlaku.",
    accent: false,
  },
  {
    icon: <Info className="w-5 h-5" />,
    num: "05",
    title: "Kepuasan Pelanggan",
    content:
      "Kepuasan pelanggan adalah prioritas kami. Jika mengalami kendala, hubungi CS Gaib 24 jam via WhatsApp. Ketawa puas pelanggan adalah bahan bakar ritual kami.",
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
            Ketentuan Layanan
          </h1>
          <p className="text-muted text-[15px]">
            Baca sebelum memesan. Sah menurut hukum alam gaib.
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
                <span className="text-[10px] font-mono text-accent dark:text-accent/50 uppercase tracking-widest">
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
          <h3 className="font-['Cinzel'] text-sm font-bold text-accent dark:text-accent/60 mb-2">
            Tentang QRIS di Website Ini
          </h3>
          <p className="text-[13px] text-muted leading-relaxed">
            QRIS yang ditampilkan terhubung ke <strong>jaringan verifikasi gaib kami</strong>.{" "}
            <strong>Resi terbit otomatis</strong> setelah verifikasi dan sah sebagai bukti
            transaksi di alam gaib.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center space-y-4"
        >
          <p className="text-[13px] text-muted-light">
            Sudah paham ketentuannya? Saatnya action.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/katalog" className="px-6 py-2.5 btn-primary text-sm">
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
