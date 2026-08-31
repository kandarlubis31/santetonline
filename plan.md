# 🧙‍♂️ SantetOnline - Riset & Project Plan

## Apa itu Santet?

**Santet** (Jawa: *tenung*, *teluh*) adalah praktik ilmu hitam tradisional Indonesia yang melibatkan penggunaan kekuatan gaib untuk mencelakai, mengganggu, atau memengaruhi seseorang dari jarak jauh. Praktik ini sudah ada sejak era kerajaan-kerajaan kuno Nusantara (Majapahit, Sriwijaya) dan masih dipercaya hingga hari ini.

### Fakta Penting tentang Santet:
- **Asal-usul**: Berakar dari kepercayaan animisme sebelum masuknya agama-agama di Indonesia
- **Istilah daerah**: Jawa → *tenung/teluh*, Bali → *leak*, umum → *guna-guna*
- **Pelaku**: Dukun, paranormal, atau tabib kerajaan yang menguasai "ajian" atau mantra khusus
- **Motif**: Balas dendam, persaingan sosial, pencapaian aspirasi yang dianggap mustahil
- **Dipercaya**: Terutama di masyarakat pedesaan dan daerah dengan tradisi mistis kental

### Santet Online - Fenomena Digital (2024):
- Viral di Twitter/X pada November 2024
- Orang-orang menawarkan jasa "santet" melalui internet/media sosial
- Kombinasi budaya mistis Indonesia dengan gaya hidup digital
- Film "Paket Santet" (Agustus 2026) mengangkat fenomena kurir & belanja online jadi horor
- Penelitian dari UGM dan Unikom tentang persepsi masyarakat terhadap santet online
- Sudah ada riset tentang praktik bisnis santet melalui internet di Indonesia

---

## 🎯 Konsep Project: SanteOnline

**Tagline**: *"Santet Online? Siap Kirim ke Mana Aja!"*

Sebuah website interaktif/humor yang menggabungkan **budaya mistis Indonesia** dengan **estetika digital modern** — seperti layanan e-commerce untuk jasa santet. Bukan untuk mempromosikan praktik ilmu hitam, tapi sebagai **eksplorasi budaya digital** yang edukatif sekaligus menghibur.

### Nuansa:
- Dark/horror aesthetic dengan sentuhan tradisional Jawa
- Humor satir tentang fenomena "belanja online apa aja bisa"
- Konten edukatif tentang sejarah & budaya santet
- Interaktif — user bisa "pilih paket santet" sebagai fun experience

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **Next.js 14+ (App Router)** |
| Styling | **Tailwind CSS** + **shadcn/ui** |
| Animations | **Framer Motion** |
| Language | **TypeScript** |
| Deployment | **Vercel** |
| Hosting | Vercel (free tier) |

---

## 📐 Fitur & Halaman

### 1. Landing Page (`/`)
- Hero section dengan animasi horor/tradisional
- Background gelap dengan efek partikel asap/kabut
- Tagline utama dan CTA "Pesan Sekarang"
- Animasi entrance yang cinematic

### 2. Katalog Paket (`/katalog`)
- **Paket Ringan** — "Telfon Gaib" — Santet lewat telepon, target kesurupan WC
- **Paket Sedang** — "Santet Delivery" — Dikirim via kurir, target kena di rumah
- **Paket Berat** — "Santet Kilat" — Instant delivery, target langsung jatuh sakit
- **Paket Premium** — "Santet Unlimited" — Langganan bulanan, repeat order
- Setiap paket ada harga (dalam "dukun coins"), durasi, efek, dan rating
- Animasi hover dan card interaktif
- **Tombol "Pesan Sekarang" → redirect ke halaman pembayaran QRIS**

### 3. Cara Kerja (`/cara-kerja`)
- Timeline interaktif: Pilih Target → Tentukan Paket → Bayar → Tunggu Hasil
- Ilustrasi step-by-step dengan animasi
- Disclaimer lucu di setiap step

### 4. Testimoni (`/testimoni`)
- Fake testimonials dari "pengguna" dengan foto placeholder
- Rating bintang, review lucu
- Efek glitch/horor di testimonial

### 5. FAQ / Tanya Jawab (`/faq`)
- Accordion FAQ dengan pertanyaan-pertanyaan absurd tapi edukatif
- Contoh: "Apakah santet bisa dikirim via Gojek?", "Bisa bayar pakai QRIS gak?", "Efek sampingnya apa?"

### 6. About / Tentang Kami (`/tentang`)
- Penjelasan edukatif tentang sejarah santet
- Disclaimer bahwa ini hanyalah project kreatif/humor
- Sumber referensi budaya

### 7. QR Payment Page (`/bayar/[paketId]`)
- **QR Code Generated** — QRIS QR code dummy ditampilkan (menggunakan library `qrcode`)
- **Timer countdown** — "Bayar dalam 15 menit" dengan animasi countdown
- **Status checking** — Setelah user "bayar" (klik tombol simulasi), muncul loading spinner
- **Payment Success** — Halaman konfirmasi lucu dengan:
  - Animasi confetti/sukses
  - Pesan: "Santet berhasil dikirim! Target akan merasakan efek dalam 3-7 hari kerja"
  - "Resi pengiriman: SNT-XXXXX"
  - Disclaimer lucu: "*Efek samping mungkin termasuk: ngomong sendiri, kesurupan WC, atau tiba-tiba hafal sholawat"
- **Flow user:** Pilih Paket → `/bayar/paket-id` → Scan QRIS → (Dummy) Pembayaran Diproses → Success Page
- Semua payment processing adalah **dummy/simulasi**, tidak ada integrasi payment gateway nyata

### 8. Disclaimer Page (`/disclaimer`)
- Penjelasan bahwa website ini adalah project kreatif
- Bukan promosi praktik ilmu hitam
- Edukasi tentang pentingnya berpikir kritis
- **QRIS di halaman ini juga dummy** — semua pembayaran hanya simulasi

---

## 🎨 Design System

### Warna:
- **Primary**: Deep Purple (#1a0a2e)
- **Secondary**: Dark Red (#8b0000)
- **Accent**: Gold (#d4af37)
- **Text**: Off-white (#e8e0d0)
- **Background**: Near-black (#0a0a0f)

### Typography:
- Heading: **Cinzel** (serif, tradisional)
- Body: **Inter** atau **Poppins**

### Elemen Visual:
- Efek asap/kabut (CSS particles)
- Border ornamen tradisional Jawa
- Animasi glitch untuk elemen digital
- Ikon berbasis emoji/unicode untuk santet items
- Background pattern batik subtle

---

## 📁 Struktur Project

```
santeonline/
├── app/
│   ├── layout.tsx              # Root layout dengan font & metadata
│   ├── page.tsx                # Landing page
│   ├── katalog/
│   │   └── page.tsx            # Katalog paket
│   ├── bayar/
│   │   └── [paketId]/
│   │       └── page.tsx        # QR Payment page (QRIS dummy)
│   ├── success/
│   │   └── page.tsx            # Payment success page
│   ├── cara-kerja/
│   │   └── page.tsx            # Cara kerja
│   ├── testimoni/
│   │   └── page.tsx            # Testimoni
│   ├── faq/
│   │   └── page.tsx            # FAQ
│   ├── tentang/
│   │   └── page.tsx            # About
│   └── disclaimer/
│       └── page.tsx            # Disclaimer
├── components/
│   ├── Navbar.tsx               # Navigation
│   ├── Footer.tsx               # Footer
│   ├── HeroSection.tsx          # Hero animated section
│   ├── PaketCard.tsx            # Card untuk katalog
│   ├── SmokeEffect.tsx          # Efek asap/kabut
│   ├── GlitchText.tsx           # Text dengan efek glitch
│   ├── TestimonialCard.tsx      # Card testimoni
│   ├── FaqAccordion.tsx         # FAQ accordion
│   ├── DisclaimerBanner.tsx     # Banner disclaimer
│   ├── QRISCode.tsx             # QR Code generator (dummy)
│   └── CountdownTimer.tsx       # Timer countdown pembayaran
├── lib/
│   ├── paketData.ts             # Data paket santet
│   └── qris.ts                  # QRIS generation utility
├── public/
│   └── ...                      # Assets
├── styles/
│   └── globals.css              # Global styles & Tailwind
├── tailwind.config.ts
├── next.config.js
├── package.json
├── tsconfig.json
└── plan.md
```

---

## 📋 Implementation Steps

### Phase 1: Setup & Foundation
- [ ] Inisialisasi Next.js project dengan pnpm + TypeScript
- [ ] Setup Tailwind CSS + konfigurasi warna
- [ ] Install dependencies (framer-motion, lucide-react, qrcode)
- [ ] Buat root layout dengan font & metadata
- [ ] Buat global CSS dengan tema gelap

### Phase 2: Core Components
- [ ] Buat Navbar dengan navigasi
- [ ] Buat Footer
- [ ] Buat SmokeEffect component
- [ ] Buat GlitchText component
- [ ] Buat DisclaimerBanner component
- [ ] Buat CountdownTimer component

### Phase 3: Landing Page
- [ ] Hero section dengan animasi
- [ ] Features overview section
- [ ] CTA section

### Phase 4: Katalog & QR Payment
- [ ] Data paket santet (paketData.ts)
- [ ] PaketCard component
- [ ] Katalog page dengan grid layout
- [ ] QRIS Code generator (dummy)
- [ ] QR Payment page (`/bayar/[paketId]`)
- [ ] Payment success page (`/success`)

### Phase 5: Supporting Pages
- [ ] Cara Kerja page
- [ ] Testimoni page
- [ ] FAQ page
- [ ] Tentang Kami page
- [ ] Disclaimer page

### Phase 6: Polish & Deploy
- [ ] Responsive design check
- [ ] Animations & transitions polish
- [ ] SEO metadata
- [ ] Deploy ke Vercel

---

## ⚠️ Disclaimer

Website ini dibuat sebagai **project kreatif dan edukatif** tentang budaya Indonesia. Tidak ada bagian dari website ini yang mempromosikan atau mendukung praktik ilmu hitam atau aktivitas merugikan lainnya. Semua konten bersifat fiksi dan hiburan.

---

## 🔗 Sumber Referensi
- Sejarah santet di era kerajaan Nusantara (Majapahit, Sriwijaya)
- Fenomena santet online viral di Twitter/X (2024)
- Penelitian UGM tentang persepsi masyarakat terhadap santet
- Film "Paket Santet" (2026) - kombinasi mistis & digital
- Penelitian Unikom tentang praktik santet melalui internet
