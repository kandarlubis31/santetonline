export interface PaketRuqyah {
  id: string;
  nama: string;
  emoji: string;
  tagline: string;
  deskripsi: string;
  efek: string[];
  durasi: string;
  harga: number;
  hargaLabel: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  color: string;
}

export const ruqyahList: PaketRuqyah[] = [
  {
    id: "telfon-fatihah",
    nama: "Telfon Al-Fatihah",
    emoji: "F",
    tagline: "Ruqyah lewat telepon, praktis!",
    deskripsi:
      "Cukup kasih nomor HP target, kami akan mengirim energi ruqyah lewat sinyal telepon. Target akan merasakan kesembuhan yang mendalam.",
    efek: [
      "Tenang dan damai",
      "Rajin sholat",
      "Hafal surat pendek",
    ],
    durasi: "1-3 hari kerja",
    harga: 10000,
    hargaLabel: "Rp 10.000",
    rating: 4.8,
    reviewCount: 256,
    badge: "Paling Laris",
    color: "from-emerald-500/20 to-emerald-900/20",
  },
  {
    id: "ruqyah-express",
    nama: "Ruqyah Express",
    emoji: "R",
    tagline: "Dikirim langsung ke rumah, langsung sembuh!",
    deskripsi:
      "Paket ruqyah fisik dikirim langsung ke alamat target menggunakan kurir terpercaya. Efek lebih kuat karena ada benda fisik yang menjadi media.",
    efek: [
      "Sembuh dari santet",
      "Lingkungan menjadi tenang",
      "Rukun dengan tetangga",
    ],
    durasi: "3-5 hari kerja",
    harga: 35000,
    hargaLabel: "Rp 35.000",
    rating: 4.9,
    reviewCount: 189,
    badge: "Rekomendasi",
    color: "from-green-500/20 to-green-900/20",
  },
  {
    id: "ruqyah-kilat",
    nama: "Ruqyah Kilat",
    emoji: "K",
    tagline: "Instant healing, efek langsung!",
    deskripsi:
      "Ruqyah premium dengan efek instan. Dikirim menggunakan energi spiritual kilat. Target langsung merasakan dalam hitungan jam.",
    efek: [
      "Langsung sembuh",
      "Bisa lihat malaikat di kamar mandi",
      "Tiba-tiba jadi hafiz Quran (efek samping langka)",
    ],
    durasi: "1-24 jam",
    harga: 75000,
    hargaLabel: "Rp 75.000",
    rating: 5.0,
    reviewCount: 98,
    badge: "Super Cepat",
    color: "from-teal-500/20 to-teal-900/20",
  },
  {
    id: "ruqyah-unlimited",
    nama: "Ruqyah Unlimited",
    emoji: "U",
    tagline: "Langganan bulanan, repeat order!",
    deskripsi:
      "Paket langganan untuk yang butuh ruqyah berkala. Includes free konsultasi ustadz, garansi kesembuhan, dan customer service 24 jam.",
    efek: [
      "Semua efek paket sebelumnya",
      "Bonus: bisa baca pikiran positif tetangga",
      "VIP access ke alam barzah",
    ],
    durasi: "30 hari (unlimited)",
    harga: 99000,
    hargaLabel: "Rp 99.000",
    rating: 5.0,
    reviewCount: 67,
    badge: "Premium",
    color: "from-cyan-500/20 to-cyan-900/20",
  },
];

export function getRuqyahById(id: string): PaketRuqyah | undefined {
  return ruqyahList.find((r) => r.id === id);
}
