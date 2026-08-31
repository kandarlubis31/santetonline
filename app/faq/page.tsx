"use client";

import { motion } from "framer-motion";
import FaqAccordion from "@/components/FaqAccordion";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import { HelpCircle, MessageCircle } from "lucide-react";
import Link from "next/link";

const faqItems = [
  {
    question: "Apakah santet bisa dikirim via Gojek/Grab?",
    answer: "Belum bisa. Tapi kami sedang dalam tahap negosiasi dengan pihak Gojek untuk layanan GoSantet. Stay tuned! Kalau sudah launching, ongkirnya gratis untuk 100 pengguna pertama.",
  },
  {
    question: "Bisa bayar pakai QRIS gak?",
    answer: "Bisa! Kami menerima pembayaran via QRIS dari semua bank dan e-wallet. Tapi ingat, ini semua simulasi/dummy ya! Jadi jangan kaget kalau saldo rekening Anda tidak berkurang.",
  },
  {
    question: "Efek sampingnya apa?",
    answer: "Efek samping mungkin termasuk: ngomong sendiri di kamar mandi, kesurupan WC, tiba-tiba hafal sholawat, atau malah jadi rajin sholat. Efek samping yang positif juga bisa terjadi, tapi itu bonus.",
  },
  {
    question: "Apakah santet ini nyata?",
    answer: "Tentu saja TIDAK! Ini cuma website humor/satir. Santet adalah bagian dari budaya dan kepercayaan tradisional Indonesia, tapi website ini hanya untuk hiburan. Jangan serius ya!",
  },
  {
    question: "Berapa lama efek santet bertahan?",
    answer: "Tergantung paket yang dipilih. Paket ringan biasanya bertahan 1-3 hari, paket kilat efeknya langsung tapi cuma beberapa jam, dan paket unlimited bisa seumur hidup (atau sampai bosan).",
  },
  {
    question: "Bisa santet ke luar negeri gak?",
    answer: "Bisa! Kami sudah support pengiriman internasional. Santet kami sudah terbang ke 190+ negara. Tapi ongkirnya mahal ya... pakai maskapai gaib. Untuk pengiriman ke Mars, silakan hubungi CS.",
  },
  {
    question: "Apakah ada garansi?",
    answer: "Ya! Kami garansi 200% uang kembali kalau santet gagal. Tapi karena uangnya juga dummy, jadi ya... garansinya juga dummy. Tetap worth it untuk vibes-nya.",
  },
  {
    question: "Bisa cancell pesanan gak?",
    answer: "Bisa, asalkan dukun belum mulai ritual. Kalau sudah terlanjur kirim, yaudah terima aja efeknya. Nanti juga hilang sendiri kok. Biasanya efek samping yang lucu malah jadi favorit.",
  },
  {
    question: "Apakah bisa pakai angsuran?",
    answer: "Belum tersedia. Tapi kami sedang konsultasi dengan bank gaib untuk program SantetCicil. Cicilan 0% selama 12 bulan! Tunggu update dari kami.",
  },
  {
    question: "Kenapa harganya murah banget?",
    answer: "Karena ini cuma simulasi, bro! Kalau serius mah jangan di sini. Harga cuma buat vibes aja. Murah meriah tapi kualitas tetap premium (dalam konteks humor).",
  },
  {
    question: "Apakah bisa pilih dukun sendiri?",
    answer: "Bisa! Kami punya beberapa dukun pilihan: Dukun Virtual, Dukun AI, Dukun Quantum, dan Dukun Meta. Masing-masing punya keahlian berbeda. Dukun AI paling populer karena responnya cepat.",
  },
  {
    question: "Ini website apa sih sebenernya?",
    answer: "Ini adalah project kreatif/humor yang mengangkat fenomena santet online di Indonesia. Semua konten bersifat fiksi dan hiburan. Dibuat dengan Next.js, Tailwind CSS, dan deploy di Vercel!",
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 dark:bg-accent/8 border border-accent/10 dark:border-accent/15 mb-4">
            <HelpCircle className="w-3 h-3 text-accent/60" />
            <span className="text-[11px] font-medium text-accent/60 uppercase tracking-wider">FAQ</span>
          </div>
          <h1 className="font-['Cinzel'] text-4xl md:text-5xl font-bold text-accent mb-3">
            FAQ
          </h1>
          <p className="text-muted max-w-md mx-auto text-sm">
            Pertanyaan yang sering ditanyakan (dan jawaban yang ngawur)
          </p>
        </motion.div>

        {/* Disclaimer */}
        <div className="mb-8">
          <DisclaimerBanner />
        </div>

        {/* FAQ items */}
        <FaqAccordion items={faqItems} />

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10"
        >
          <div className="card-base p-5 text-center">
            <MessageCircle className="w-5 h-5 text-accent/40 mx-auto mb-2" />
            <p className="text-[13px] text-muted mb-2">
              Masih ada pertanyaan? Hubungi customer service gaib kami
            </p>
            <p className="text-[12px] text-muted-light/50">
              WhatsApp: 0812-XXXX-XXXX (beneran dummy juga)
            </p>
          </div>
        </motion.div>

        {/* Ruqyah CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-6"
        >
          <Link
            href="/ruqiah/konsultasi"
            className="inline-flex items-center gap-2 text-green/60 hover:text-green transition-colors text-[13px] font-medium"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Atau konsultasi langsung dengan Ustadz Virtual
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
