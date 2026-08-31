"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, User } from "lucide-react";
import DisclaimerBanner from "@/components/DisclaimerBanner";

const autoReplies = [
  "Wa'alaikumussalam! Ada yang bisa saya bantu?",
  "Insyaallah, santet itu bisa diatasi dengan izin Allah. Paket Ruqyah kami siap membantu.",
  "Baca Al-Fatihah 7 kali sehari, insyaallah akan membaik.",
  "Untuk kasus santet tingkat berat, saya rekomendasikan paket Ruqyah Kilat.",
  "Jangan khawatir, Allah selalu bersama hamba-Nya yang sabar.",
  "Paket Ruqyah Express kami sudah termasuk air zam-zam dan doa-doa khusus.",
  "Alhamdulillah, sudah banyak pasien yang sembuh dengan paket kami.",
  "Untuk konsultasi lebih lanjut, bisa langsung pilih paket di katalog ya.",
];

export default function KonsultasiPage() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Assalamualaikum! Selamat datang di Konsultasi Ustadz Online. Ada yang bisa saya bantu hari ini?", isUser: false },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { text: input, isUser: true }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
      setMessages((prev) => [...prev, { text: reply, isUser: false }]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <h1 className="font-['Cinzel'] text-3xl md:text-4xl font-bold text-green mb-2">Konsultasi Ustadz Online</h1>
          <p className="text-muted text-sm">Chat dengan ustadz virtual kami (24/7, insyaallah)</p>
        </motion.div>
        <div className="mb-4"><DisclaimerBanner /></div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card-base overflow-hidden hover:transform-none">
          {/* Header */}
          <div className="bg-green/5 dark:bg-green/[0.08] px-5 py-3.5 flex items-center gap-3 border-b border-border">
            <div className="w-9 h-9 rounded-full bg-green/15 dark:bg-green/20 border border-green/10 dark:border-green/15 flex items-center justify-center">
              <User className="w-4 h-4 text-green" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground/80">Ustadz Virtual</p>
              <p className="text-[11px] text-green/70 dark:text-green/80 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                Online
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-4 py-2.5 text-[13px] leading-relaxed ${msg.isUser ? "bg-green text-white rounded-2xl rounded-br-md" : "bg-background/50 dark:bg-[#0a0a0f]/40 text-muted rounded-2xl rounded-bl-md"}`}>{msg.text}</div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="bg-background/50 dark:bg-[#0a0a0f]/40 px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green/30 dark:bg-green/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-green/30 dark:bg-green/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-green/30 dark:bg-green/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
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
                onClick={handleSend}
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-4 grid grid-cols-2 gap-2">
          {["Saya kena santet, bagaimana?", "Paket mana yang cocok?", "Berapa lama sembuhnya?", "Apakah ada garansi?"].map((q, i) => (
            <button
              key={i}
              onClick={() => setInput(q)}
              className="px-3 py-2.5 card-base text-[12px] text-muted/70 hover:border-green/15 dark:hover:border-green/20 hover:text-green/70 dark:hover:text-green/80 transition-all duration-200 text-left hover:transform-none"
            >
              <MessageCircle className="w-3 h-3 inline mr-1.5 opacity-40" />{q}
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
