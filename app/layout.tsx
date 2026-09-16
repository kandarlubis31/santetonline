import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplashProvider from "@/components/SplashProvider";
import ThemeProvider from "@/components/ThemeProvider";
import PageTransition from "@/components/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Dijalankan sebelum first paint agar tidak ada flash tema salah.
// Harus sinkron dengan resolveTheme() di ThemeProvider.
const themeInitScript = `(function(){try{var t=localStorage.getItem("santetonline_theme");if(t!=="dark"&&t!=="light"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.classList.toggle("dark",t==="dark")}catch(e){}})()`;

export const metadata: Metadata = {
  title: "SantetOnline - Santet Online? Siap Kirim ke Mana Aja!",
  description:
    "Layanan santet online pertama di Indonesia. Paket lengkap, harga bersahabat, hasil memuaskan. Disclaimer: Ini cuma humor satir, jangan serius ya.",
  keywords: ["santet", "santet online", "ilmu hitam", "dukun", "humor", "satir"],
  openGraph: {
    title: "SantetOnline - Santet Online? Siap Kirim ke Mana Aja!",
    description: "Layanan santet online pertama di Indonesia. Paket lengkap, harga bersahabat.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground theme-transition">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeProvider>
          <SplashProvider>
            <Navbar />
            <main className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </SplashProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
