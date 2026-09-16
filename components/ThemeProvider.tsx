"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

/**
 * Satu-satunya pemilik state tema (sebelumnya SplashProvider juga menulis
 * class `dark` dengan default berbeda -> flash light<->dark saat load).
 * Urutan resolusi: localStorage (divalidasi) -> prefers-color-scheme -> dark.
 */
function resolveTheme(): Theme {
  try {
    const saved = localStorage.getItem("santetonline_theme");
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch {
    return "dark";
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // Class `dark` di <html> sudah di-set oleh inline script di layout
    // sebelum first paint — di sini cukup sinkronkan state React.
    // setState dibungkus rAF agar tidak jalan sinkron di body effect.
    const raf = requestAnimationFrame(() => setTheme(resolveTheme()));
    return () => cancelAnimationFrame(raf);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("santetonline_theme", next);
      } catch {
        // storage penuh/diblokir — tema tetap berubah untuk sesi ini
      }
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
