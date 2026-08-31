# SantetOnline

Layanan santet online pertama di Indonesia. Paket lengkap, harga bersahabat, hasil memuaskan.

> Disclaimer: Ini cuma humor satir. Jangan serius ya.

Website interaktif bernuansa horor tradisional Jawa dengan estetika digital — seperti "e-commerce untuk jasa santet" lengkap dengan QRIS dummy payment, katalog paket, dan testimoni fiktif.

## Preview

[SantetOnline Live Demo](https://santeonline.vercel.app)

## Fitur

- **Landing Page** cinematic dengan animasi glitch & ambient particles
- **Katalog Paket** — 4 tier: Telfon Gaib, Santet Delivery, Santet Kilat, Santet Unlimited
- **QRIS Dummy Payment** — scan QR, countdown timer 15 menit, simulasi bayar
- **Payment Success** — resi pengiriman + tracking status lucu
- **Cara Kerja** — timeline interaktif 5 langkah
- **Testimoni** — review fiktif dari "pengguna"
- **FAQ** — 12 pertanyaan absurd tapi edukatif
- **Tentang** — sejarah santet dari era kerajaan Nusantara
- **RuqyahOnline** — halaman lawan (hijau) dengan VS section, katalog ruqyah, konsultasi ustadz virtual
- **Splash Screen** cinematic dengan animasi fase
- **Dark/Light Mode** — toggle di navbar, preference di-persist
- **Page Transitions** — animasi smooth antar halaman
- **Responsive** — mobile-first design

## Tech Stack

| Tech | Purpose |
|------|---------|
| [Next.js 16](https://nextjs.org) | React framework (App Router) |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [Tailwind CSS 4](https://tailwindcss.com) | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion) | Animations & page transitions |
| [Lucide React](https://lucide.dev) | Icons |
| [qrcode](https://www.npmjs.com/package/qrcode) | QR code generation |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18+
- [pnpm](https://pnpm.io) (recommended)

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/santeonline.git
cd santeonline

# Install dependencies
pnpm install

# Run dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
pnpm build
```

### Deploy to Vercel

```bash
# Install Vercel CLI
pnpm i -g vercel

# Login
vercel login

# Deploy
vercel
```

Or connect your GitHub repo to [Vercel](https://vercel.com) for automatic deployments.

## Project Structure

```
.
├── app/
│   ├── bayar/[paketId]/page.tsx    # QR payment page
│   ├── cara-kerja/page.tsx         # How it works
│   ├── disclaimer/page.tsx         # Disclaimer
│   ├── faq/page.tsx                # FAQ
│   ├── katalog/page.tsx            # Package catalog
│   ├── ruqiah/                     # RuqyahOnline section
│   │   ├── bayar/[paketId]/page.tsx
│   │   ├── katalog/page.tsx
│   │   ├── konsultasi/page.tsx     # Virtual ustadz chat
│   │   ├── success/page.tsx
│   │   └── page.tsx                # Landing page
│   ├── success/page.tsx            # Payment success
│   ├── tentang/page.tsx            # About + history
│   ├── testimoni/page.tsx          # Testimonials
│   ├── globals.css                 # Global styles + CSS variables
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Landing page
├── components/
│   ├── CountdownTimer.tsx
│   ├── DisclaimerBanner.tsx
│   ├── FaqAccordion.tsx
│   ├── Footer.tsx
│   ├── GlitchText.tsx
│   ├── HeroSection.tsx
│   ├── Navbar.tsx
│   ├── PageTransition.tsx
│   ├── PaketCard.tsx
│   ├── QRISCode.tsx
│   ├── SmokeEffect.tsx
│   ├── SplashProvider.tsx
│   ├── SplashScreen.tsx
│   ├── TestimonialCard.tsx
│   └── ThemeProvider.tsx
├── lib/
│   ├── paketData.ts                # Santet packages data
│   ├── qris.ts                     # QRIS dummy config
│   └── ruqyahData.ts               # Ruqyah packages data
├── public/                         # Static assets
└── package.json
```

## Flow Pembayaran (Dummy)

```
Katalog → Pilih Paket → /bayar/[paketId]
  ↓
QRIS QR Code muncul + countdown 15 menit
  ↓
Klik "Simulasi Bayar (Dummy)"
  ↓
Loading 3 detik
  ↓
Redirect ke /success → Resi + Tracking Status
```

## Theming

### Dark Mode (Default)
Background hitam pekat, aksen gold + merah gelap, estetika horor tradisional.

### Light Mode
Warm cream background, gold lebih gelap, merah lebih bold — tetap cinematic.

Toggle tersedia di navbar (icon Sun/Moon).

### Splash Screen
Animasi cinematic ~4.5 detik: glow orb → skull icon materialize → brand text reveal → tagline. Hanya muncul 1x per sesi.

## License

[MIT](LICENSE)

## Disclaimer

Website ini adalah proyek humor satir. Semua layanan, paket, testimoni, dan fitur pembayaran bersifat fiktif. Tidak ada santet sungguhan yang dijual atau dikirim. Jangan serius ya.
