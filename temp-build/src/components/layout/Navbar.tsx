"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, User, ChevronDown, Building2, Megaphone, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useCMSStore } from "@/store/cmsStore";
import { EditableElement } from "@/components/admin/design-editor/EditableElement";

const navLinks = [
  { label: "Ana Sayfa", href: "/" },
  {
    label: "İlanlar", href: "/properties",
    dropdown: [
      { label: "Satılık", href: "/properties?type=sale" },
      { label: "Kiralık", href: "/properties?type=rent" },
      { label: "Villa", href: "/properties?category=villa" },
      { label: "Arsa", href: "/properties?category=land" },
      { label: "Ofis", href: "/properties?category=office" },
    ]
  },
  { label: "Danışmanlar", href: "/agents" },
  { label: "Hakkımızda", href: "/about" },
  { label: "İletişim", href: "/contact" },
];

export function Navbar() {
  const { header } = useCMSStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initial check for dark mode
    setIsDark(document.documentElement.classList.contains("dark"));
    
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("dark");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      setIsDark(true);
    }
  };

  if (!mounted) return null;

  return (
    <>
      {header.showAnnouncement && (
        <div className="bg-gradient-to-r from-[#F4E4A6] via-[#D4AF37] to-[#C9A227] text-[#050816] py-2.5 text-center text-xs font-black tracking-widest relative z-[60] shadow-[0_4px_25px_rgba(212,175,55,0.6)] border-b border-[#F4E4A6]/60">
          <Link href={header.announcementLink || "#"} className="flex items-center justify-center gap-2 hover:underline hover:scale-105 transition-transform duration-200">
            <Megaphone className="w-4 h-4 animate-bounce" /> {header.announcementText}
          </Link>
        </div>
      )}
      <header className={`fixed ${header.showAnnouncement ? "top-9" : "top-0"} left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "glass-nav py-3" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tighter text-[#D4AF37] hover:text-[#F4E4A6] transition-all duration-300 drop-shadow-[0_2px_15px_rgba(212,175,55,0.6)] group">
              {header.logoUrl ? (
                <img src={header.logoUrl} alt={header.logoText} className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" />
              ) : (
                <Building2 className="w-8 h-8 text-[#D4AF37] group-hover:text-[#F4E4A6] group-hover:rotate-6 transition-all duration-300" />
              )}
              <EditableElement id="header-logo-text" as="span" className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4A6] bg-clip-text text-transparent group-hover:from-[#F4E4A6] group-hover:to-[#D4AF37] transition-all duration-300">
                {header.logoText}
              </EditableElement>
            </Link>

          {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1.5">
              {header.navigation.filter((l: any) => l.isActive).sort((a: any, b: any) => a.order - b.order).map((link: any) => (
                <Link key={link.id} href={link.href}
                  className="px-4 py-2.5 text-sm font-bold text-slate-800 dark:text-[#F9FAFB] hover:text-[#D4AF37] dark:hover:text-[#F4E4A6] transition-all duration-300 rounded-xl hover:bg-[#D4AF37]/15 dark:hover:bg-[#D4AF37]/20 hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:-translate-y-0.5">
                  <EditableElement id={`header-nav-${link.id}`} as="span">
                    {link.title}
                  </EditableElement>
                </Link>
              ))}
            </nav>

          {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={toggleDarkMode}
                className="p-2.5 rounded-xl bg-[#D4AF37]/10 dark:bg-[#D4AF37]/15 text-[#D4AF37] hover:bg-[#D4AF37]/25 dark:hover:bg-[#D4AF37]/30 transition-all duration-300 shadow-[0_4px_15px_rgba(212,175,55,0.3)] border border-[#D4AF37]/40 hover:scale-110 hover:rotate-12"
                aria-label="Toggle Dark Mode"
              >
                {isDark ? <Sun className="w-5 h-5 text-[#F4E4A6]" /> : <Moon className="w-5 h-5 text-[#D4AF37]" />}
              </button>

              {header.showCTA && (
                <Link href={header.ctaLink}>
                  <Button className="rounded-xl px-8 py-3 font-extrabold bg-gradient-to-r from-[#D4AF37] via-[#C9A227] to-[#D4AF37] text-[#050816] hover:from-[#F4E4A6] hover:via-[#D4AF37] hover:to-[#C9A227] transition-all duration-500 shadow-[0_6px_25px_rgba(212,175,55,0.6)] hover:shadow-[0_8px_35px_rgba(212,175,55,0.8)] hover:scale-105 border border-[#F4E4A6]/50 tracking-wide">
                    <EditableElement id="header-cta-text" as="span">
                      {header.ctaText}
                    </EditableElement>
                  </Button>
                </Link>
              )}
            </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2.5 rounded-xl bg-[#D4AF37]/10 dark:bg-[#D4AF37]/15 text-[#D4AF37] hover:bg-[#D4AF37]/25 dark:hover:bg-[#D4AF37]/30 transition-all duration-300 border border-[#D4AF37]/40 shadow-[0_4px_15px_rgba(212,175,55,0.3)] hover:scale-105"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-xl border-t border-[#D4AF37]/40 shadow-[0_20px_50px_rgba(212,175,55,0.35)]">
            <div className="px-6 py-6 flex flex-col gap-2">
              {header.navigation.filter((l: any) => l.isActive).sort((a: any, b: any) => a.order - b.order).map((link: any) => (
                <Link key={link.id} href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-bold py-3.5 px-5 rounded-xl hover:bg-[#D4AF37]/15 dark:hover:bg-[#D4AF37]/20 text-slate-800 dark:text-[#F9FAFB] hover:text-[#D4AF37] dark:hover:text-[#F4E4A6] transition-all duration-200 hover:translate-x-1">
                  {link.title}
                </Link>
              ))}
              <div className="flex flex-col gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-[#D4AF37]/30">
                <button 
                  onClick={() => {
                    toggleDarkMode();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-3 p-3.5 rounded-xl bg-[#D4AF37]/10 dark:bg-[#D4AF37]/15 text-slate-800 dark:text-[#D4AF37] font-bold border border-[#D4AF37]/40 shadow-[0_4px_15px_rgba(212,175,55,0.25)] hover:bg-[#D4AF37]/20 transition-all duration-200"
                >
                  {isDark ? <><Sun className="w-5 h-5 text-[#F4E4A6]" /> Açık Mod</> : <><Moon className="w-5 h-5 text-[#D4AF37]" /> Koyu Mod</>}
                </button>
                {header.showCTA && (
                  <Link href={header.ctaLink} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full rounded-xl h-14 text-base font-extrabold bg-gradient-to-r from-[#D4AF37] via-[#C9A227] to-[#D4AF37] text-[#050816] hover:from-[#F4E4A6] hover:via-[#D4AF37] hover:to-[#C9A227] transition-all duration-500 shadow-[0_6px_25px_rgba(212,175,55,0.6)] border border-[#F4E4A6]/50 tracking-wide">{header.ctaText}</Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  );
}
