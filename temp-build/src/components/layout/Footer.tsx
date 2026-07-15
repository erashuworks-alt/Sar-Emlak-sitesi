"use client";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { useCMSStore } from "@/store/cmsStore";
import { useState, useEffect } from "react";
import { EditableElement } from "@/components/admin/design-editor/EditableElement";

// Social Icons SVGs
const Facebook = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const Twitter = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const Instagram = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const Linkedin = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
const Youtube = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.46-5.58z"/><polyline points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
);

// ── SEO Keywords Section ─────────────────────────────────────────────────────
const SEO_KEYWORDS = [
  {
    group: "Satılık",
    items: [
      { label: "Satılık Daire", href: "/properties?type=Sale&category=apartment" },
      { label: "Satılık Villa", href: "/properties?type=Sale&category=villa" },
      { label: "Satılık Arsa", href: "/properties?type=Sale&category=land" },
      { label: "Satılık Ofis", href: "/properties?type=Sale&category=office" },
      { label: "Satılık Müstakil Ev", href: "/properties?type=Sale&category=house" },
    ],
  },
  {
    group: "Kiralık",
    items: [
      { label: "Kiralık Daire", href: "/properties?type=Rent&category=apartment" },
      { label: "Kiralık Villa", href: "/properties?type=Rent&category=villa" },
      { label: "Kiralık Ofis", href: "/properties?type=Rent&category=office" },
      { label: "Kiralık Residence", href: "/properties?type=Rent&category=apartment&q=residence" },
    ],
  },
  {
    group: "Şehirler",
    items: [
      { label: "İstanbul Satılık Daire", href: "/properties?type=Sale&category=apartment&city=İstanbul" },
      { label: "Ankara Satılık Ev", href: "/properties?type=Sale&city=Ankara" },
      { label: "İzmir Kiralık Daire", href: "/properties?type=Rent&category=apartment&city=İzmir" },
      { label: "Bursa Satılık Villa", href: "/properties?type=Sale&category=villa&city=Bursa" },
    ],
  },
];

function SeoKeywords() {
  return (
    <section className="bg-slate-50 dark:bg-[#0B1120] border-t border-slate-100 dark:border-[#D4AF37]/25 py-10">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-sm font-semibold text-slate-500 dark:text-[#D4AF37] uppercase tracking-widest mb-6">
          Sık Aranan Kelimeler
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {SEO_KEYWORDS.map((group) => (
            <div key={group.group}>
              <p className="text-xs font-bold text-slate-400 dark:text-[#F4E4A6] uppercase tracking-wider mb-3">
                {group.group}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="px-3 py-1.5 text-sm text-slate-600 dark:text-slate-300 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#D4AF37]/30 rounded-full hover:border-brand-400 hover:text-brand-600 dark:hover:text-[#F4E4A6] hover:bg-brand-50 dark:hover:bg-[#D4AF37]/10 transition-all duration-200 hover:-translate-y-0.5 shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { footer } = useCMSStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const SocialIcon = ({ platform, className }: { platform: string; className?: string }) => {
    switch (platform) {
      case "facebook": return <Facebook className={className} />;
      case "twitter": return <Twitter className={className} />;
      case "instagram": return <Instagram className={className} />;
      case "linkedin": return <Linkedin className={className} />;
      case "youtube": return <Youtube className={className} />;
      default: return null;
    }
  };
  return (
    <>
      <SeoKeywords />
      <footer className="bg-white dark:bg-[#050816] border-t border-slate-200 dark:border-[#D4AF37]/25 pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand & About */}
            <div>
              <Link href="/" className="text-2xl font-bold tracking-tighter text-brand-600 dark:text-[#D4AF37] mb-4 inline-block">
                {footer.logoUrl ? (
                  <img src={footer.logoUrl} alt={footer.companyName} className="h-10 object-contain" />
                ) : (
                  <EditableElement id="footer-brand-name" as="span">EmlakPlatform</EditableElement>
                )}
              </Link>
              <EditableElement id="footer-description" as="p" className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                {footer.description}
              </EditableElement>
              <div className="flex gap-4">
                {footer.socialLinks.filter((s: any) => s.isActive).map((social: any) => (
                  <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" 
                    className="p-2 rounded-full glass hover:bg-slate-100 dark:hover:bg-[#111827] transition-colors text-slate-600 dark:text-[#D4AF37] border dark:border-[#D4AF37]/30 shadow-[0_4px_15px_rgba(212,175,55,0.15)]">
                    <SocialIcon platform={social.platform} className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <EditableElement id="footer-quicklinks-title" as="h4" className="text-lg font-semibold text-slate-900 dark:text-[#D4AF37] mb-6">Hızlı Linkler</EditableElement>
              <ul className="flex flex-col gap-3">
                {footer.quickLinks.filter((l: any) => l.isActive).map((link: any) => (
                  <li key={link.id}>
                    <Link href={link.href} className="text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-[#F4E4A6] transition-colors">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Property Types */}
            <div>
              <EditableElement id="footer-categories-title" as="h4" className="text-lg font-semibold text-slate-900 dark:text-[#D4AF37] mb-6">Kategoriler</EditableElement>
              <ul className="flex flex-col gap-3">
                <li><Link href="/properties?category=apartment" className="text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-[#F4E4A6] transition-colors">Daire</Link></li>
                <li><Link href="/properties?category=villa" className="text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-[#F4E4A6] transition-colors">Villa</Link></li>
                <li><Link href="/properties?category=office" className="text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-[#F4E4A6] transition-colors">Ofis</Link></li>
                <li><Link href="/properties?category=land" className="text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-[#F4E4A6] transition-colors">Arsa</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <EditableElement id="footer-contact-title" as="h4" className="text-lg font-semibold text-slate-900 dark:text-[#D4AF37] mb-6">İletişim</EditableElement>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3 text-slate-500 dark:text-slate-400">
                  <MapPin className="w-5 h-5 mt-0.5 text-brand-600 dark:text-[#D4AF37]" />
                  <span>{footer.address}</span>
                </li>
                <li className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                  <Phone className="w-5 h-5 text-brand-600 dark:text-[#D4AF37]" />
                  <span>{footer.phone}</span>
                </li>
                <li className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                  <Mail className="w-5 h-5 text-brand-600 dark:text-[#D4AF37]" />
                  <span>{footer.email}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 dark:border-[#D4AF37]/25 flex flex-col md:flex-row items-center justify-between gap-4">
            {footer.showCopyright && (
              <EditableElement id="footer-copyright" as="p" className="text-slate-500 dark:text-slate-400 text-sm">
                © {new Date().getFullYear()} {footer.copyrightText}
              </EditableElement>
            )}
            <div className="flex gap-4 text-sm">
              {footer.legalLinks.filter((l: any) => l.isActive).map((link: any) => (
                <Link key={link.title} href={link.href} className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  {link.title}
                </Link>
              ))}
              <Link href="/admin/login" className="text-slate-400 hover:text-slate-600 dark:text-slate-600 dark:hover:text-slate-400 transition-colors">Admin</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
