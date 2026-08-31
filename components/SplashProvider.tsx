"use client";

import { useState, useEffect, useCallback } from "react";
import SplashScreen from "./SplashScreen";

const SPLASH_KEY = "santetonline_splash_seen";
const THEME_KEY = "santetonline_theme";

export default function SplashProvider({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setMounted(true);

    // Detect theme from localStorage before splash renders
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = saved ? saved === "dark" : prefersDark;
    setIsDark(dark);

    // Apply theme class immediately so CSS vars resolve correctly
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const seen = sessionStorage.getItem(SPLASH_KEY);
    if (seen) {
      setShowSplash(false);
    }
  }, []);

  const handleComplete = useCallback(() => {
    sessionStorage.setItem(SPLASH_KEY, "1");
    setShowSplash(false);
  }, []);

  // Prevent flash of content before hydration
  if (!mounted) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "var(--splash-bg)" }}>
        {children}
      </div>
    );
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleComplete} isDark={isDark} />}
      <div className={showSplash ? "opacity-0" : "opacity-100 transition-opacity duration-500"}>
        {children}
      </div>
    </>
  );
}
