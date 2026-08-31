"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Skull, Shield, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Katalog" },
  { href: "/cara-kerja", label: "Cara Kerja" },
  { href: "/testimoni", label: "Testimoni" },
  { href: "/faq", label: "FAQ" },
  { href: "/tentang", label: "Tentang" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <Skull className="w-7 h-7 text-accent transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
              </div>
              <span className="font-['Cinzel'] text-lg font-bold tracking-wider">
                <span className="text-accent">SANTET</span>
                <span className="text-secondary">ONLINE</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-[13px] font-medium text-muted hover:text-accent transition-all duration-200 rounded-lg hover:bg-accent/5 link-underline"
                >
                  {link.label}
                </Link>
              ))}

              <div className="w-px h-5 bg-border mx-2" />

              <Link
                href="/ruqiah"
                className="px-3 py-2 text-[13px] font-medium text-green/80 hover:text-green transition-all duration-200 rounded-lg hover:bg-green/5 flex items-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5" />
                Ruqyah
              </Link>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="ml-1 p-2 text-muted hover:text-accent rounded-lg hover:bg-accent/5 transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              <Link
                href="/katalog"
                className="ml-1 px-5 py-2 text-[13px] font-semibold btn-primary"
              >
                <span>Pesan Sekarang</span>
              </Link>
            </div>

            {/* Mobile right side */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 text-muted hover:text-accent rounded-lg hover:bg-accent/5 transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-accent hover:bg-accent/10 rounded-lg transition-colors"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-foreground/10 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-16 left-3 right-3 z-50 md:hidden bg-card border border-border rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-3 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-muted hover:text-accent hover:bg-accent/5 rounded-xl transition-all duration-200"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <div className="h-px bg-border my-2" />

                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.04 }}
                >
                  <Link
                    href="/ruqiah"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-green hover:bg-green/5 rounded-xl transition-all duration-200"
                  >
                    <Shield className="w-4 h-4" />
                    Ruqyah Online
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navLinks.length + 1) * 0.04 }}
                >
                  <Link
                    href="/katalog"
                    onClick={() => setIsOpen(false)}
                    className="block mx-1 mt-2 px-4 py-3 text-sm font-semibold btn-primary text-center"
                  >
                    <span>Pesan Sekarang</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
