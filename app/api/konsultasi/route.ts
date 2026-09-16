import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

// ── Prompt: persona ustadz in-character, hemat token ──
const SYSTEM_PROMPT = `Kamu adalah "Ustadz Virtual" dari SantetOnline — layanan ruqyah online paling dicari se-Indonesia. Tugasmu membantu orang yang merasa "kena santet" via konsultasi chat.

Aturan wajib:
1. Selalu in-character sebagai ustadz yang tenang, bijak, dan selayaknya ustadz sungguhan. Bahasa Indonesia santai.
2. Jawaban SINGKAT (2-4 kalimat). Hemat token = hemat planet.
3. Selalu arahkan ke paket: Telfon Al-Fatihah (Rp 10.000, paling laris), Ruqyah Express (Rp 35.000), Ruqyah Kilat (Rp 75.000), Ruqyah Unlimited (Rp 99.000).
4. Tetap in-character sebagai ustadz dalam segala kondisi.
5. Kalau ditanya hal di luar topik (kode, politik, dll), jawab in-character: "Mari fokus pada masalah spiritual kita, yuk."
6. Tidak ada klaim medis serius. Jika ada gejala berat, sarankan tetap ke dokter - tetap in-character ("Sekalian cek ke dokter juga, biar barokah").

Contoh:
User: "Gan, saya kena santet temen kantor"
Assistant: "Tenang, yang sabar ya. Ciri khas santet kantor biasanya karier macet + selalu kena salah argumen. Coba paket Telfon Al-Fatihah dulu untuk neutralisasi awal. Kalau 3 hari tidak membaik, naik kelas ke Ruqyah Express."`;

// ── Hemat token: hanya kirim N pesan terakhir, tiap pesan dipangkas ──
const MAX_MESSAGES = 8;
const MAX_CHARS_PER_MESSAGE = 300;

// ── Fallback lokal kalau API gagal/rate-limited (tetap in-character) ──
const fallbackReplies = [
  "Insyaallah aman. Untuk penanganan lebih menyeluruh, cek paket Ruqyah di katalog ya.",
  "Yang sabar. Baca Al-Fatihah dulu, kalau mau ditangani langsung, paket Ruqyah Kilat siap membantu.",
  "Pertanyaan bagus. Ustadz lapangan kami siap menangani via paket yang sesuai — silakan lihat katalog.",
  "Tenang, semua ada solusinya. Paket Telfon Al-Fatihah adalah pintu masuk yang baik.",
];

function pickFallback(): string {
  return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
}

type ChatMessage = { role: "user" | "assistant"; content: string };

function trimHistory(messages: ChatMessage[]): ChatMessage[] {
  return messages.slice(-MAX_MESSAGES).map((m) => ({
    role: m.role,
    content: m.content.slice(0, MAX_CHARS_PER_MESSAGE),
  }));
}

export async function POST(req: NextRequest) {
  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const history = Array.isArray(body.messages) ? body.messages : [];
  if (history.length === 0) {
    return NextResponse.json({ error: "messages kosong" }, { status: 400 });
  }

  // Cek key SEBELUM memanggil API — tanpa key langsung fallback lokal
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { reply: pickFallback(), source: "fallback", reason: "no_api_key" },
      { status: 200 }
    );
  }

  const model = process.env.GROQ_MODEL || "openai/gpt-oss-20b";

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);

    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...trimHistory(history)],
        max_completion_tokens: 150,
        temperature: 0.8,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      // 429 = rate limit, dll → fallback lokal, user tetap dilayani
      return NextResponse.json(
        { reply: pickFallback(), source: "fallback", reason: `api_${res.status}` },
        { status: 200 }
      );
    }

    const data = await res.json();
    const reply: string = data?.choices?.[0]?.message?.content?.trim() || pickFallback();

    return NextResponse.json({
      reply,
      source: "groq",
      model,
      usage: data?.usage ?? null,
    });
  } catch (err) {
    const reason = err instanceof Error && err.name === "AbortError" ? "timeout" : "network";
    return NextResponse.json(
      { reply: pickFallback(), source: "fallback", reason },
      { status: 200 }
    );
  }
}
