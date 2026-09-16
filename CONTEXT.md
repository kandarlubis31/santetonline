# SantetOnline - Project Context

## Overview
Website satir "e-commerce santet" — in-world sepenuhnya: QRIS palsu, resi gaib, konsultasi ustadz virtual (AI). Tanpa transaksi nyata. Deploy di Vercel.

## Tech Stack
- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS 4** (CSS variables, `@custom-variant dark` bound ke class `.dark`)
- **Framer Motion** (animasi, page transitions)
- **Lucide React** (icons)
- **qrcode** (QRIS generation)
- **pnpm** (package manager)

## Project Structure
```
app/
├ layout.tsx                  # Root layout + themeInitScript inline (anti flash tema)
├ page.tsx                    # Landing page (HeroSection + sections)
├ not-found.tsx               # 404 bertema (skull + CTA)
├ globals.css                 # CSS variables (:root + .dark), @custom-variant dark, utilities
├ katalog/page.tsx            # Katalog paket santet (4 paket)
├ bayar/[paketId]/page.tsx    # Wrapper tipis → components/flow/BayarFlow
├ success/page.tsx            # Wrapper tipis → components/flow/SuccessFlow
├ api/konsultasi/route.ts     # POST proxy Groq (server-side, key aman)
├ cara-kerja|testimoni|faq|tentang|disclaimer/page.tsx
└ ruqiah/                     # RuqyahOnline section (tema hijau)
    ├── page.tsx              # Landing + VS section
    ├── katalog/page.tsx
    ├── bayar/[paketId]/page.tsx   # → BayarFlow variant="ruqiah"
    ├── success/page.tsx           # → SuccessFlow variant="ruqiah"
    └── konsultasi/page.tsx   # Chat ustadz virtual (AI + fallback lokal)

components/
├ SplashProvider.tsx          # Orkestrator intro: AnimatePresence + context useIntroReady
├ SplashScreen.tsx            # Cinematic 3.8s → onExitStart (crossfade), tombol "Lewati"
├ ThemeProvider.tsx           # Single source of truth tema (localStorage → prefers-color-scheme → dark)
├ PageTransition.tsx          # Enter animation per-pathname (gated ke introReady)
├ HeroSection.tsx             # Hero variants+stagger (gated ke introReady)
├ Navbar.tsx                  # Glassmorphism on scroll, mobile menu (Escape+scroll-lock), lg breakpoint
├ Footer.tsx                  # 4-column layout
├ PaketCard.tsx               # Kartu paket santet
├ QRISCode.tsx                # QR canvas, regenerate saat toggle tema
├ CountdownTimer.tsx          # 15 menit, onExpire → redirect katalog
├ DisclaimerBanner.tsx        # Banner "Catatan Layanan"
├ SmokeEffect.tsx             # Ambient smoke (dipakai HeroSection)
└ flow/                       # Flow bayar/success BERSAMA (santet vs ruqiah via variant)
    ├── flowTheme.ts          # Semua perbedaan class antar-varian di 1 tempat
    ├── BayarFlow.tsx         # Steps, ringkasan, QR, countdown, form nama
    ├── SuccessFlow.tsx       # Confetti, resi, tracking (dengan Suspense)
    └── PaketNotFound.tsx     # 404 paket bertema

lib/
├ paketData.ts                # 4 paket santet
├ ruqyahData.ts               # 4 paket ruqyah
└ qris.ts                     # generateQrisUrl(ref), generateDummyRef, formatCurrency
```

## Intro Flow (arsitektur sekarang)
```
layout.tsx
└── ThemeProvider
    └── SplashProvider                     ← orkestrator + context
        ├── <AnimatePresence>
        │   └── SplashScreen (phase 0-4, 3.8s)
        │       └── onExitStart() @3.8s    ← BUKAN setelah fade selesai
        │           ├── setShowSplash(false)   → exit-fade 0.8s (crossfade)
        │           └── setIntroReady(true)    → konten reveal + animasi main
        └── children (aria-hidden + pointer-events-none selama intro)
```
- **Skip splash**: repeat visit (sessionStorage `santetonline_splash_seen`), `prefers-reduced-motion`, atau tombol "Lewati" → semua lewat jalur `onExitStart` yang sama
- **Gating**: `useIntroReady()` (context) — HeroSection & PageTransition baru mainkan entrance setelah intro selesai (dulu animasi jalan tersembunyi di balik splash)
- **FOUC**: pre-hydration konten disembunyikan sejak HTML (bukan tampil lalu ditutup splash)

## Theming
- **Dark (default)**: bg #0a0a0f, accent #d4af37, secondary #8b0000
- **Light**: bg #f5f2eb, accent #b8860b, secondary #dc2626
- `themeInitScript` di layout set class `.dark` sebelum first paint; urutan resolve: localStorage `santetonline_theme` → `prefers-color-scheme` → dark
- **KRITIS**: `@custom-variant dark (&:where(.dark, .dark *));` di globals.css — tanpa ini variant `dark:` Tailwind v4 ngikutin OS, bukan class → overlay near-black bocor ke light mode

## API Konsultasi (/api/konsultasi)
- Proxy POST ke Groq (`openai/gpt-oss-20b`), key HANYA server-side
- Persona "Ustadz Virtual" in-character, **tahan prompt-injection** (pesan user = cerita pelanggan, bukan instruksi; injection dijawab in-character)
- **Hemat token**: `reasoning_effort: "low"`, `reasoning_format: "hidden"`, `max_completion_tokens: 600`, riwayat 8 pesan terakhir, trim 300 char/pesan
- `sanitizeReply()`: strip markdown (`**`, `*`, `_`, backtick, heading, bullet) + blok `<think>` — bubble chat render plain text
- **Rate limit per IP** (in-memory): 10 req/menit + 60 req/jam, jalan SEBELUM fetch Groq (request diblokir = 0 token); respons 429 tetap in-character + header `Retry-After`
- Fallback lokal (keyword match) kalau API gagal/timeout/rate-limited — chat tidak pernah mati

## Env
| Var | Isi | Catatan |
|-----|-----|---------|
| `GROQ_API_KEY` | key Groq (`gsk_...`) | Vercel Production Secret + `.env.local` |
| `GROQ_MODEL` | `openai/gpt-oss-20b` | default kalau kosong |

`.env.local` di-gitignore; `.env.example` ke-commit sebagai dokumentasi.

## Payment Flow (Dummy, 100% tanpa transaksi nyata)
```
/katalog → /bayar/[paketId] (QR + countdown 15m) → "Bayar" (loading 3s)
→ form nama → /success?paket=X&ref=Y&amount=Z&nama=N
```
- QR berisi URL absolut ke halaman success **dengan resi yang sama** yang tampil di UI — scan QR pakai HP langsung kebuka halaman "Pembayaran Berhasil"
- Countdown habis → tombol berubah jadi "Buat Pesanan Baru" → redirect katalog
- Halaman bayar & success dibungkus Suspense (pakai `useSearchParams`)

## Conventions
- Semua halaman `"use client"` (Framer Motion); metadata hanya di root layout
- Typography: Cinzel (headings), Inter (body)
- **Mobile-first**: judul besar mulai `text-4xl` di <sm (Cinzel lebar), `min-h-svh` bukan `min-h-screen` (address bar mobile), input ≥16px di mobile (iOS auto-zoom), CTA full-width di mobile
- Aksesibilitas: `:focus-visible` ring emas, `prefers-reduced-motion` mematikan animasi CSS, aria-expanded di accordion & hamburger, Escape tutup menu mobile
- Class bersama: `.card-base`, `.btn-primary`, `.section-padding` (dibungkus `@layer components`)

## Deployment
- Vercel (auto-deploy from GitHub, project `santetonline`)
- Build: `pnpm build` → 16 routes (15 halaman + 1 API), lint 0/0
- Catatan Windows: `pnpm lint` & `pnpm build` kadang crash native (OOM) kalau jalan barengan — jalankan terpisah
