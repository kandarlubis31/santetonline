"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import { HelpCircle, MessageCircle, Search, ChevronDown } from "lucide-react";
import Link from "next/link";

const faqItems = [
  {
    category: "Pesanan",
    question: "Apakah santet bisa dikirim via Gojek/Grab?",
    answer: "Belum bisa. Tapi kami sedang dalam tahap negosiasi dengan pihak Gojek untuk layanan GoSantet. Stay tuned! Kalau sudah launching, ongkirnya gratis untuk 100 pengguna pertama.",
  },
  {
    category: "Pembayaran",
    question: "Bisa bayar pakai QRIS gak?",
    answer: "Bisa! Kami menerima pembayaran via QRIS dari semua bank dan e-wallet. Tapi ingat, ini semua simulasi/dummy ya! Jadi jangan kaget kalau saldo rekening Anda tidak berkurang.",
  },
  {
    category: "Efek",
    question: "Efek sampingnya apa?",
    answer: "Efek samping mungkin termasuk: ngomong sendiri di kamar mandi, kesurupan WC, tiba-tiba hafal sholawat, atau malah jadi rajin sholat. Efek samping yang positif juga bisa terjadi, tapi itu bonus.",
  },
  {
    category: "Umum",
    question: "Apakah santet ini nyata?",
    answer: "Tentu saja TIDAK! Ini cuma website humor/satir. Santet adalah bagian dari budaya dan kepercayaan tradisional Indonesia, tapi website ini hanya untuk hiburan. Jangan serius ya!",
  },
  {
    category: "Efek",
    question: "Berapa lama efek santet bertahan?",
    answer: "Tergantung paket yang dipilih. Paket ringan biasanya bertahan 1-3 hari, paket kilat efeknya langsung tapi cuma beberapa jam, dan paket unlimited bisa seumur hidup (atau sampai bosan).",
  },
  {
    category: "Pesanan",
    question: "Bisa santet ke luar negeri gak?",
    answer: "Bisa! Kami sudah support pengiriman internasional. Santet kami sudah terbang ke 190+ negara. Tapi ongkirnya mahal ya... pakai maskapai gaib. Untuk pengiriman ke Mars, silakan hubungi CS.",
  },
  {
    category: "Pembayaran",
    question: "Apakah ada garansi?",
    answer: "Ya! Kami garansi 200% uang kembali kalau santet gagal. Tapi karena uangnya juga dummy, jadi ya... garansinya juga dummy. Tetap worth it untuk vibes-nya.",
  },
  {
    category: "Pesanan",
    question: "Bisa cancell pesanan gak?",
    answer: "Bisa, asalkan dukun belum mulai ritual. Kalau sudah terlanjur kirim, yaudah terima aja efeknya. Nanti juga hilang sendiri kok. Biasanya efek samping yang lucu malah jadi favorit.",
  },
  {
    category: "Pembayaran",
    question: "Apakah bisa pakai angsuran?",
    answer: "Belum tersedia. Tapi kami sedang konsultasi dengan bank gaib untuk program SantetCicil. Cicilan 0% selama 12 bulan! Tunggu update dari kami.",
  },
  {
    category: "Umum",
    question: "Kenapa harganya murah banget?",
    answer: "Karena ini cuma simulasi, bro! Kalau serius mah jangan di sini. Harga cuma buat vibes aja. Murah meriah tapi kualitas tetap premium (dalam konteks humor).",
  },
  {
    category: "Umum",
    question: "Apakah bisa pilih dukun sendiri?",
    answer: "Bisa! Kami punya beberapa dukun pilihan: Dukun Virtual, Dukun AI, Dukun Quantum, dan Dukun Meta. Masing-masing punya keahlian berbeda. Dukun AI paling populer karena responnya cepat.",
  },
  {
    category: "Umum",
    question: "Ini website apa sih sebenernya?",
    answer: "Ini adalah project kreatif/humor yang mengangkat fenomena santet online di Indonesia. Semua konten bersifat fiksi dan hiburan. Dibuat dengan Next.js, Tailwind CSS, dan deploy di Vercel!",
  },
];

const categories = ["Semua", "Umum", "Pesanan", "Pembayaran", "Efek"];

function FaqItem({ item, index }: { item: typeof faqItems[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="card-base overflow-hidden hover:transform-none"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start gap-3 p-4 text-left group"
      >
        <div className="w-6 h-6 rounded-lg bg-accent/8 dark:bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
          <HelpCircle className="w-3.5 h-3.5 text-accent/60 dark:text-accent/70" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-foreground/80 pr-6 group-hover:text-accent transition-colors">
            {item.question}
          </p>
          <span className="text-[10px] text-accent/40 uppercase tracking-wider">{item.category}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-muted-light/40 shrink-0 mt-1 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-accent/60" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 pb-4 pl-[52px]">
              <p className="text-[13px] text-muted leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filtered = faqItems.filter((item) => {
    const matchCategory = activeCategory === "Semua" || item.category === activeCategory;
    const matchSearch =
      !search ||
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

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
        <div className="mb-6">
          <DisclaimerBanner />
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-light/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari pertanyaan..."
              className="w-full bg-card dark:bg-surface border border-border rounded-xl pl-10 pr-4 py-2.5 text-[13px] text-foreground/80 placeholder-muted-light/40 focus:outline-none focus:border-accent/25 dark:focus:border-accent/30 transition-colors"
            />
          </div>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar pb-1"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-accent/15 text-accent dark:bg-accent/20"
                  : "bg-background/50 dark:bg-[#0a0a0f]/40 text-muted hover:text-foreground/70 border border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <FaqItem key={item.question} item={item} index={i} />
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-8 h-8 text-muted-light/20 mx-auto mb-3" />
              <p className="text-[13px] text-muted-light/50">
                Tidak ada pertanyaan yang cocok dengan pencarian Anda
              </p>
            </div>
          )}
        </div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          <div className="card-base p-5 text-center hover:transform-none">
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
          transition={{ delay: 0.4 }}
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
