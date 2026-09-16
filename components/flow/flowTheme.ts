// Tema bersama untuk flow Bayar & Success (santet = emas/merah, ruqiah = hijau).
// Semua class yang beda antar-varian dikumpulkan di sini biar komponen flow netral.

export type FlowVariant = "santet" | "ruqiah";

// Bentuk minimal paket — PaketSantet & PaketRuqyah keduanya memenuhi ini.
export interface PaketLite {
  nama: string;
  tagline: string;
  durasi: string;
  harga: number;
}

export const flowTheme: Record<
  FlowVariant,
  {
    backLink: string;
    stepDone: string;
    stepActive: string;
    connectorActive: string;
    heading: string;
    iconBadge: string;
    stepNumber: string;
    formIconCircle: string;
    inputFocus: string;
    confirmButton: string;
    payButton: string;
    totalText: string;
    ctaPrimary: string;
    refText: string;
    copyIcon: string;
    copyHover: string;
    sectionLabel: string;
    trackingActiveIcon: string;
    trackingActiveLine: string;
    messageBox: string;
    suspenseText: string;
    notFound: {
      iconWrap: string;
      iconText: string;
      title: string;
      cta: string;
    };
  }
> = {
  santet: {
    backLink: "text-accent/50 hover:text-accent",
    stepDone: "bg-green/15 text-green dark:bg-green/20",
    stepActive: "bg-accent/15 text-accent dark:bg-accent/20",
    connectorActive: "bg-accent/20",
    heading: "text-accent",
    iconBadge:
      "bg-accent/8 dark:bg-accent/10 border border-accent/12 dark:border-accent/15 text-accent/70 dark:text-accent/80",
    stepNumber: "bg-accent/8 dark:bg-accent/10 text-accent/60 dark:text-accent/70",
    formIconCircle: "bg-accent/10 dark:bg-accent/15",
    inputFocus: "focus:border-accent/25 dark:focus:border-accent/30",
    confirmButton:
      "w-full px-6 py-3.5 btn-primary text-base disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2",
    payButton:
      "w-full px-6 py-4 btn-primary text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
    totalText: "text-accent",
    ctaPrimary: "btn-primary",
    refText: "text-accent",
    copyIcon: "text-accent/40",
    copyHover: "hover:bg-accent/10",
    sectionLabel: "text-accent/50",
    trackingActiveIcon: "bg-accent/10 text-accent/70",
    trackingActiveLine: "bg-accent/20",
    messageBox: "bg-secondary/5 dark:bg-secondary/[0.06] border border-secondary/10 dark:border-secondary/15",
    suspenseText: "text-accent/50",
    notFound: {
      iconWrap: "bg-secondary/10 dark:bg-secondary/15",
      iconText: "text-secondary/50",
      title: "text-secondary",
      cta: "inline-flex items-center gap-2 px-5 py-2.5 btn-primary text-sm",
    },
  },
  ruqiah: {
    backLink: "text-green/50 hover:text-green",
    stepDone: "bg-green/15 text-green dark:bg-green/20",
    stepActive: "bg-green/15 text-green dark:bg-green/20",
    connectorActive: "bg-green/20",
    heading: "text-green",
    iconBadge:
      "bg-green/8 dark:bg-green/10 border border-green/12 dark:border-green/15 text-green/70 dark:text-green/80",
    stepNumber: "bg-green/8 dark:bg-green/10 text-green/60 dark:text-green/70",
    formIconCircle: "bg-green/10 dark:bg-green/15",
    inputFocus: "focus:border-green/25 dark:focus:border-green/30",
    confirmButton:
      "w-full px-6 py-3.5 bg-green text-white font-semibold rounded-xl text-base disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:opacity-90 transition-all",
    payButton:
      "w-full px-6 py-4 bg-green text-white font-semibold rounded-xl text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:opacity-90 transition-all",
    totalText: "text-green",
    ctaPrimary: "bg-green text-white font-semibold rounded-xl hover:opacity-90 transition-all duration-300",
    refText: "text-green",
    copyIcon: "text-green/40",
    copyHover: "hover:bg-green/10",
    sectionLabel: "text-green/50",
    trackingActiveIcon: "bg-green/10 text-green/70",
    trackingActiveLine: "bg-green/20",
    messageBox: "bg-green/5 dark:bg-green/[0.06] border border-green/10 dark:border-green/15",
    suspenseText: "text-green/50",
    notFound: {
      iconWrap: "bg-green/10 dark:bg-green/15",
      iconText: "text-green/50",
      title: "text-green",
      cta: "inline-flex items-center gap-2 px-5 py-2.5 bg-green text-white font-semibold rounded-xl text-sm hover:opacity-90 transition-all",
    },
  },
};

export const CONFETTI: Record<FlowVariant, { colors: string[]; count: number }> = {
  santet: { colors: ["#d4af37", "#dc2626", "#2d8b4e", "#b8860b", "#e8e0d0"], count: 30 },
  ruqiah: { colors: ["#2d8b4e", "#166534", "#d4af37", "#4ade80", "#e8e0d0"], count: 25 },
};
