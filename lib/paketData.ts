export interface PaketSantet {
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

export const paketList: PaketSantet[] = [
  {
    id: "ringan",
    nama: "Telfon Gaib",
    emoji: "T",
    tagline: "Santet lewat telepon, praktis!",
    deskripsi:
      "Cukup kasih nomor HP target, kami akan mengirim energi gaib lewat sinyal telepon. Target akan merasakan gangguan kecil yang mengganggu konsentrasi.",
    efek: [
      "Kesurupan WC mendadak",
      "Telepon berdering sendiri",
      "Bercermin jadi ngomong sendiri",
    ],
    durasi: "1-3 hari kerja",
    harga: 15000,
    hargaLabel: "Rp 15.000",
    rating: 4.2,
    reviewCount: 128,
    badge: "Paling Laris",
    color: "from-emerald-500/20 to-emerald-900/20",
  },
  {
    id: "sedang",
    nama: "Santet Delivery",
    emoji: "S",
    tagline: "Dikirim via kurir, sampai di rumah target!",
    deskripsi:
      "Paket santet fisik dikirim langsung ke alamat target menggunakan kurir terpercaya. Efek lebih kuat karena ada benda fisik yang menjadi media.",
    efek: [
      "Pintu gerbang berbunyi sendiri",
      "Tiba-tiba hafal sholawat",
      "Mimpi dikejar-kejar genderuwo",
    ],
    durasi: "3-5 hari kerja",
    harga: 35000,
    hargaLabel: "Rp 35.000",
    rating: 4.5,
    reviewCount: 89,
    badge: "Rekomendasi",
    color: "from-purple-500/20 to-purple-900/20",
  },
  {
    id: "berat",
    nama: "Santet Kilat",
    emoji: "K",
    tagline: "Instant delivery, efek langsung!",
    deskripsi:
      "Santet premium dengan efek instan. Dikirim menggunakan energi kilat supernatural. Target langsung merasakan dalam hitungan jam.",
    efek: [
      "Langsung pingsan",
      "Bisa lihat pocong di kamar mandi",
      "Tiba-tiba jago masak (efek samping langka)",
    ],
    durasi: "1-24 jam",
    harga: 75000,
    hargaLabel: "Rp 75.000",
    rating: 4.8,
    reviewCount: 56,
    badge: "Super Cepat",
    color: "from-amber-500/20 to-amber-900/20",
  },
  {
    id: "premium",
    nama: "Santet Unlimited",
    emoji: "U",
    tagline: "Langganan bulanan, repeat order!",
    deskripsi:
      "Paket langganan untuk yang butuh santet berkala. Includes free konsultasi dukun, garansi efek, dan customer service 24 jam via WhatsApp gaib.",
    efek: [
      "Semua efek paket sebelumnya",
      "Bonus: bisa baca pikiran tetangga",
      "VIP access ke alam gaib",
    ],
    durasi: "30 hari (unlimited)",
    harga: 199000,
    hargaLabel: "Rp 199.000",
    rating: 4.9,
    reviewCount: 34,
    badge: "Premium",
    color: "from-rose-500/20 to-rose-900/20",
  },
];

export function getPaketById(id: string): PaketSantet | undefined {
  return paketList.find((p) => p.id === id);
}
