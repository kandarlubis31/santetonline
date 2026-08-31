# SantetOnline - Project Context

## Overview
Website humor/satir "e-commerce santet" — konsep: belanja online pakai QRIS dummy, bayar pakai QR, dapat resi lucu. Deploy di Vercel.

## Tech Stack
- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS 4** (CSS variables untuk theming)
- **Framer Motion** (animasi, page transitions)
- **Lucide React** (icons)
- **qrcode** (QRIS dummy generation)
- **pnpm** (package manager)

## Project Structure
```
app/
├ page.tsx                    # Landing page
├ layout.tsx                  # Root layout (ThemeProvider > SplashProvider > Navbar > children > Footer)
├ globals.css                 # CSS variables, utility classes (.card-base, .btn-primary, .section-padding)
├ katalog/page.tsx            # Katalog paket santet (4 paket)
├ bayar/[paketId]/page.tsx    # QRIS payment + name form
├ success/page.tsx            # Receipt + tracking
├ cara-kerja/page.tsx         # 5 steps timeline
├ testimoni/page.tsx          # 9 testimonials
├ faq/page.tsx                # 12 FAQ items
├ tentang/page.tsx            # Sejarah santet
├ disclaimer/page.tsx         # Disclaimer
└ ruqiah/                     # RuqyahOnline section (hijau theme)
    ├── page.tsx              # Landing + VS section
    ├── katalog/page.tsx      # 4 paket ruqyah
    ├── bayar/[paketId]/page.tsx
    ├── success/page.tsx
    └── konsultasi/page.tsx   # Chat ustadz virtual (auto-reply)

components/
├ Navbar.tsx                  # Glassmorphism on scroll, mobile menu, dark/light toggle
├ Footer.tsx                  # 4-column layout
├ HeroSection.tsx             # Animated hero (SantetOnline)
├ PaketCard.tsx               # Package card with hover effects
├ SplashScreen.tsx            # Cinematic splash (~4.5s, 1x per session)
├ SplashProvider.tsx          # Client wrapper + sessionStorage check
├ ThemeProvider.tsx            # React context + localStorage persistence
├ PageTransition.tsx          # Framer Motion AnimatePresence route transitions
├ QRISCode.tsx                # QR code generator
├ CountdownTimer.tsx          # 15-minute countdown
├ DisclaimerBanner.tsx        # Warning banner
├ FaqAccordion.tsx            # Animated accordion
├ TestimonialCard.tsx         # Testimonial card
├ GlitchText.tsx              # Glitch effect text
└ SmokeEffect.tsx             # Ambient smoke particles

lib/
├ paketData.ts                # 4 paket santet (ringan, sedang, berat, premium)
├ ruqyahData.ts               # 4 paket ruqyah
└ qris.ts                     # QRIS URL generator, dummy ref, formatCurrency
```

## Theming
- **Dark mode (default)**: Background #0a0a0f, accent gold #d4af37, secondary red #8b0000
- **Light mode**: Background #f5f2eb, accent #b8860b, secondary #dc2626
- CSS variables di `globals.css` (`:root` + `.dark`)
- Toggle via Sun/Moon icon di Navbar, persist di localStorage (`santetonline_theme`)
- Classes: `.card-base`, `.btn-primary`, `.section-padding`, `.glass`, `.glow-red/gold/green`

## Key Features
1. **Splash Screen**: Cinematic animation, phases (glow → icon → text → tagline → exit), sessionStorage key `santetonline_splash_seen`
2. **Page Transitions**: Framer Motion AnimatePresence + usePathname, blur + fade + slide
3. **QRIS Payment Flow**: Katalog → Bayar (QR + countdown) → Name Form → Success (receipt + tracking)
4. **RuqyahOnline**: Separate section with green theme, VS comparison, virtual ustadz chat

## Payment Flow (Dummy)
```
/bayar/[paketId] → QRIS code + countdown → "Simulasi Bayar" → loading 3s → Name Form → /success?paket=X&ref=Y&amount=Z&nama=N
```

## Color Scheme
| Token | Dark | Light |
|-------|------|-------|
| background | #0a0a0f | #f5f2eb |
| accent | #d4af37 | #b8860b |
| secondary | #8b0000 | #dc2626 |
| green | #2d8b4e | #166534 |
| card | #111118 | #ffffff |
| muted | #a09a94 | #6b6570 |

## Conventions
- All pages are `"use client"` (Framer Motion)
- Typography: Cinzel (headings), Inter (body)
- Animations: whileInView for sections, spring for icons
- No lorem ipsum — all content is real Indonesian humor/satir
- Mobile-first responsive design
- CSS variables for theme colors, Tailwind dark: variants

## Deployment
- Vercel (auto-deploy from GitHub)
- No env variables needed (all dummy/simulated)
- Build: `pnpm build` → 15 pages, 0 errors
