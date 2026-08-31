"use client";

import { motion } from "framer-motion";
import { BookOpen, Globe, Users, Sparkles, Info, MapPin, Calendar } from "lucide-react";

export default function TentangPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 dark:bg-accent/8 border border-accent/10 dark:border-accent/15 mb-4">
            <Info className="w-3 h-3 text-accent/60" />
            <span className="text-[11px] font-medium text-accent/60 uppercase tracking-wider">Tentang</span>
          </div>
          <h1 className="font-['Cinzel'] text-4xl md:text-5xl font-bold text-accent mb-3">
            Tentang Kami
          </h1>
          <p className="text-muted max-w-md mx-auto text-sm">
            Mengenal lebih dalam tentang SantetOnline dan sejarah santet di Indonesia
          </p>
        </motion.div>

        {/* Disclaimer box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-secondary/5 dark:bg-secondary/8 border border-secondary/15 dark:border-secondary/20 rounded-2xl p-5 mb-10"
        >
          <h3 className="text-sm font-semibold text-secondary/70 dark:text-secondary/80 mb-2">
            Disclaimer Penting
          </h3>
          <p className="text-[13px] text-muted leading-relaxed">
            Website ini adalah <strong>project kreatif dan humor</strong> yang dibuat untuk tujuan edukasi dan hiburan. <strong>Tidak ada bagian dari website ini yang mempromosikan</strong> atau mendukung praktik ilmu hitam. Semua konten bersifat fiksi dan satir.
          </p>
        </motion.div>

        {/* Content cards */}
        <div className="space-y-4">
          {/* Sejarah */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.1 }}
            className="card-base p-5"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-accent/8 dark:bg-accent/10 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-accent/70 dark:text-accent/80" />
              </div>
              <div>
                <h2 className="font-['Cinzel'] text-lg font-bold text-accent">
                  Sejarah Santet di Indonesia
                </h2>
                <p className="text-[10px] text-muted-light/40 uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Era Kerajaan Nusantara
                </p>
              </div>
            </div>
            <div className="space-y-3 text-[13px] text-muted leading-relaxed">
              <p>
                <strong className="text-foreground/70">Santet</strong> atau <em>guna-guna</em> (Jawa: <em>tenung, teluh</em>) adalah praktik ilmu hitam tradisional Indonesia yang melibatkan penggunaan kekuatan gaib untuk mencelakai atau mengganggu seseorang dari jarak jauh.
              </p>
              <p>
                Kepercayaan terhadap santet memiliki akar sejarah yang dalam, diperkirakan sudah mengakar sejak <strong className="text-foreground/70">masa berdirinya kerajaan-kerajaan kuno di Nusantara</strong>, termasuk Majapahit, Sriwijaya, serta kerajaan-kerajaan di Bali dan Jawa.
              </p>
              <p>
                Pada era tersebut, ilmu gaib tidak hanya diakui, tetapi juga dihormati sebagai kompetensi khusus. Keahlian ini umumnya dimiliki oleh kalangan elit spiritual seperti dukun, paranormal, atau tabib kerajaan.
              </p>
            </div>
          </motion.div>

          {/* Istilah Daerah */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.15 }}
            className="card-base p-5"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-accent/8 dark:bg-accent/10 flex items-center justify-center">
                <Globe className="w-4 h-4 text-accent/70 dark:text-accent/80" />
              </div>
              <div>
                <h2 className="font-['Cinzel'] text-lg font-bold text-accent">
                  Istilah di Berbagai Daerah
                </h2>
                <p className="text-[10px] text-muted-light/40 uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Nusantara
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {[
                { daerah: "Jawa", istilah: "Tenung / Teluh", desc: "Bagian dari ilmu kebatinan, dipercaya sebagai sarana proteksi diri sekaligus penyerangan" },
                { daerah: "Bali", istilah: "Leak", desc: "Karakteristik serupa santet, kekuatan gaib untuk menyakiti terutama di malam hari" },
                { daerah: "Sunda", istilah: "Guna-guna", desc: "Praktik sihir yang menggunakan mantra dan ritual khusus" },
                { daerah: "Umum", istilah: "Santet", desc: "Istilah paling umum digunakan di seluruh Indonesia" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-background/50 dark:bg-[#0a0a0f]/40 rounded-xl p-3.5 border border-border/50 dark:border-border group hover:border-accent/15 dark:hover:border-accent/20 transition-all duration-300"
                >
                  <h4 className="text-[13px] font-semibold text-accent/70 dark:text-accent/80 mb-1">
                    {item.daerah} &mdash; <em className="font-normal text-accent/50 dark:text-accent/60">{item.istilah}</em>
                  </h4>
                  <p className="text-[12px] text-muted/70 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Fenomena Digital */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.2 }}
            className="card-base p-5"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-accent/8 dark:bg-accent/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-accent/70 dark:text-accent/80" />
              </div>
              <div>
                <h2 className="font-['Cinzel'] text-lg font-bold text-accent">
                  Fenomena Santet Online
                </h2>
                <p className="text-[10px] text-muted-light/40 uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Era Digital 2024
                </p>
              </div>
            </div>
            <div className="space-y-3 text-[13px] text-muted leading-relaxed">
              <p>
                Pada tahun 2024, fenomena <strong className="text-foreground/70">santet online</strong> menjadi viral di media sosial Twitter/X. Orang-orang menawarkan jasa &quot;santet&quot; melalui internet dengan gaya yang unik dan kreatif.
              </p>
              <p>
                Film <strong className="text-foreground/70">&quot;Paket Santet&quot;</strong> yang tayang pada Agustus 2026 juga mengangkat fenomena kurir dan belanja online yang berubah menjadi horor mencekam. Kombinasi antara budaya mistis dan gaya hidup digital ini menciptakan tren baru.
              </p>
              <p>
                Website <strong className="text-accent/80 dark:text-accent/90">SantetOnline</strong> hadir sebagai respons kreatif terhadap fenomena ini. Kami mengambil inspirasi dari tren tersebut dan mengubahnya menjadi website humor yang edukatif sekaligus menghibur.
              </p>
            </div>
          </motion.div>

          {/* Tim */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.25 }}
            className="card-base p-5"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-accent/8 dark:bg-accent/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-accent/70 dark:text-accent/80" />
              </div>
              <div>
                <h2 className="font-['Cinzel'] text-lg font-bold text-accent">
                  Tim Kami
                </h2>
              </div>
            </div>
            <div className="space-y-2 text-[13px] text-muted leading-relaxed">
              <p>
                Website ini dibuat oleh developer yang terinspirasi dari fenomena &quot;santet online&quot;. Dibuat dengan <strong className="text-foreground/70">Next.js</strong>, <strong className="text-foreground/70">Tailwind CSS</strong>, dan <strong className="text-foreground/70">Framer Motion</strong>.
              </p>
              <p>
                Deploy di <strong className="text-foreground/70">Vercel</strong> dan penuh dengan humor satir. Semua konten dibuat untuk hiburan semata. Semoga website ini bisa membuat Anda tersenyum (atau ketawa).
              </p>
            </div>
          </motion.div>
        </div>

        {/* References */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-background/50 dark:bg-[#0a0a0f]/40 border border-border/50 dark:border-border rounded-2xl p-5"
        >
          <h3 className="font-['Cinzel'] text-sm font-bold text-accent/50 dark:text-accent/60 mb-3 uppercase tracking-wider">
            Sumber Referensi
          </h3>
          <ul className="space-y-1.5 text-[12px] text-muted-light/50">
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-accent/20 shrink-0 mt-1.5" />
              Sejarah santet di era kerajaan Nusantara (Majapahit, Sriwijaya)
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-accent/20 shrink-0 mt-1.5" />
              Fenomena santet online viral di Twitter/X (2024)
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-accent/20 shrink-0 mt-1.5" />
              Penelitian UGM tentang persepsi masyarakat terhadap santet
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-accent/20 shrink-0 mt-1.5" />
              Film &quot;Paket Santet&quot; (2026) - kombinasi mistis dan digital
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-accent/20 shrink-0 mt-1.5" />
              Penelitian Unikom tentang praktik santet melalui internet
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
