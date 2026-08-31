"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, User, ArrowRight } from "lucide-react";
import DisclaimerBanner from "@/components/DisclaimerBanner";

/* ── smarter auto-replies with keyword matching ── */
const fallbackReplies = [
  "Wa'alaikumussalam! Ada yang bisa saya bantu?",
  "Insyaallah, santet itu bisa diatasi dengan izin Allah. Paket Ruqyah kami siap membantu.",
  "Baca Al-Fatihah 7 kali sehari, insyaallah akan membaik.",
  "Untuk kasus santet tingkat berat, saya rekomendasikan paket Ruqyah Kilat.",
  "Jangan khawatir, Allah selalu bersama hamba-Nya yang sabar.",
  "Paket Ruqyah Express kami sudah termasuk air zam-zam dan doa-doa khusus.",
  "Alhamdulillah, sudah banyak pasien yang sembuh dengan paket kami.",
  "Untuk konsultasi lebih lanjut, bisa langsung pilih paket di katalog ya.",
  "Sabar ya, ujian itu tanda Allah sayang. Mari kita atasi dengan ruqyah yang tepat.",
  "Kalau sudah parah, lebih baik langsung ambil paket Ruqyah Kilat biar cepat selesai.",
];

const keywordReplies: [string[], string][] = [
  [
    ["santet", "terkena", "kena santet", "kena", "terkena santet"],
    "Wah, santet memang merepotkan. Tapi tenang, kami punya solusinya. Coba cek paket Ruqyah kami, ada yang cocok untuk kondisi Anda.",
  ],
  [
    ["paket", "harga", "berapa", "mahal", "murah", "biaya"],
    "Kami punya 4 paket: Telfon Al-Fatihah (paling ringan), Ruqyah Express, Ruqyah Kilat, dan Ruqyah Unlimited (paling lengkap). Silakan cek di katalog!",
  ],
  [
    ["garansi", "jaminan", "pasti", "berhasil", "sembuh"],
    "Alhamdulillah, tingkat keberhasilan kami sangat tinggi. Kalau paket tidak berhasil, bisa konsultasi ulang gratis.",
  ],
  [
    ["lama", "berapa lama", "waktu", "cepat", "kilat"],
    "Untuk Ruqyah Kilat, biasanya dalam 3-7 hari sudah mulai terasa perubahan. Untuk kasus ringan, bisa lebih cepat lagi.",
  ],
  [
    ["cara", "bagaimana", "gimana", "proses", "langkah"],
    "Caranya gampang: pilih paket, lakukan pembayaran via QRIS, lalu kami akan proses ruqyah dari jarak jauh. Tunggu hasilnya!",
  ],
  [
    ["konsultasi", "tanya", "curhat", "bicara"],
    "Silakan tanya apa saja, insyaallah saya bantu jawab sebisanya. Kalau butuh penanganan serius, bisa langsung pilih paket.",
  ],
  [
    ["siapa", "anda siapa", "ustadz", "nama"],
    "Saya Ustadz Virtual, asisten konsultasi online. Untuk penanganan langsung, akan dikoordinasikan dengan ustadz lapangan kami.",
  ],
  [
    ["terima kasih", "makasih", "thanks", "alhamdulillah"],
    "Sama-sama! Semoga lekas sembuh ya. Kalau ada pertanyaan lagi, jangan ragu tanya.",
  ],
];

function getReply(input: string): string {
  const lower = input.toLowerCase();
  for (const [keywords, reply] of keywordReplies) {
    if (keywords.some((k) => lower.includes(k))) {
      return reply;
    }
  }
  return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
}

function formatTime(): string {
  return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

const quickQuestions = [
  "Saya kena santet, gimana?",
  "Paket mana yang cocok?",
  "Berapa lama sembuhnya?",
  "Apakah ada garansi?",
  "Cara ordernya gimana?",
  "Siapa ustadz-nya?",
];

/* ── single bubble component ── */
function ChatBubble({ isUser, text, time }: { isUser: boolean; text: string; time: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {/* ustadz avatar */}
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-green/10 dark:bg-green/15 border border-green/10 dark:border-green/15 flex items-center justify-center shrink-0 mb-0.5">
          <User className="w-3.5 h-3.5 text-green" />
        </div>
      )}

      <div className={`max-w-[78%] ${isUser ? "order-1" : ""}`}>
        <div
          className={`px-4 py-2.5 text-[13px] leading-relaxed ${
            isUser
              ? "bg-green text-white rounded-2xl rounded-br-md"
              : "bg-background/50 dark:bg-[#0a0a0f]/40 text-foreground/80 rounded-2xl rounded-bl-md border border-border"
          }`}
        >
          {text}
        </div>
        <p
          className={`text-[10px] text-muted/40 mt-1 ${
            isUser ? "text-right" : "text-left"
          }`}
        >
          {time}
        </p>
      </div>

      {/* user avatar */}
      {isUser && (
        <div className="w-7 h-7 rounded-full bg-green/15 dark:bg-green/20 flex items-center justify-center shrink-0 mb-0.5">
          <span className="text-[11px] font-semibold text-green">U</span>
        </div>
      )}
    </motion.div>
  );
}

/* ── main page ── */
export default function KonsultasiPage() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; time: string }[]>([
    {
      text: "Assalamualaikum! Selamat datang di Konsultasi Ustadz Online. Ada yang bisa saya bantu hari ini?",
      isUser: false,
      time: formatTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    setMessages((prev) => [...prev, { text: msg, isUser: true, time: formatTime() }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getReply(msg);
      setMessages((prev) => [...prev, { text: reply, isUser: false, time: formatTime() }]);
      setIsTyping(false);
    }, 1200 + Math.random() * 1200);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="font-['Cinzel'] text-3xl md:text-4xl font-bold text-green mb-2">
            Konsultasi Ustadz Online
          </h1>
          <p className="text-muted text-sm">Chat dengan ustadz virtual kami (24/7, insyaallah)</p>
        </motion.div>

        <div className="mb-4">
          <DisclaimerBanner />
        </div>

        {/* Chat Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="card-base overflow-hidden hover:transform-none"
        >
          {/* Chat Header */}
          <div className="bg-green/5 dark:bg-green/[0.08] px-5 py-3.5 flex items-center gap-3 border-b border-border">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-green/15 dark:bg-green/20 border border-green/10 dark:border-green/15 flex items-center justify-center">
                <User className="w-4 h-4 text-green" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green rounded-full border-2 border-card" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground/80">Ustadz Virtual</p>
              <p className="text-[11px] text-green/70 dark:text-green/80">Online sekarang</p>
            </div>
            <div className="text-[10px] text-muted/40 bg-background/50 dark:bg-[#0a0a0f]/30 px-2.5 py-1 rounded-full">
              Gratis
            </div>
          </div>

          {/* Date divider */}
          <div className="flex items-center gap-3 px-4 py-2.5 bg-background/30">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[10px] text-muted/40 uppercase tracking-wider">Hari ini</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Messages */}
          <div
            ref={containerRef}
            className="h-[420px] overflow-y-auto px-4 py-3 space-y-4"
          >
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <ChatBubble key={i} isUser={msg.isUser} text={msg.text} time={msg.time} />
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="flex items-end gap-2"
                >
                  <div className="w-7 h-7 rounded-full bg-green/10 dark:bg-green/15 border border-green/10 dark:border-green/15 flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5 text-green" />
                  </div>
                  <div className="bg-background/50 dark:bg-[#0a0a0f]/40 px-4 py-3 rounded-2xl rounded-bl-md border border-border">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-green/40 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-green/40 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-green/40 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                      <span className="text-[11px] text-muted/50">mengetik...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input */}
          <div className="border-t border-border p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ketik pertanyaan Anda..."
                className="flex-1 bg-background/50 dark:bg-[#0a0a0f]/40 border border-border rounded-xl px-4 py-2.5 text-[13px] text-foreground/80 placeholder-muted-light/40 focus:outline-none focus:border-green/25 dark:focus:border-green/30 transition-colors"
              />
              <button
                onClick={() => handleSend()}
                disabled={isTyping || !input.trim()}
                className="px-4 py-2.5 bg-green text-white rounded-xl hover:opacity-90 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-muted-light/30 mt-2 text-center italic">
              Ustadz virtual ini adalah simulasi. Jawaban otomatis.
            </p>
          </div>
        </motion.div>

        {/* Quick questions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2"
        >
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              disabled={isTyping}
              className="group px-3 py-2.5 card-base text-[12px] text-muted/70 hover:border-green/15 dark:hover:border-green/20 hover:text-green/70 dark:hover:text-green/80 transition-all duration-200 text-left hover:transform-none disabled:opacity-40"
            >
              {q}
              <ArrowRight className="w-3 h-3 inline ml-1 opacity-0 group-hover:opacity-50 transition-opacity" />
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
