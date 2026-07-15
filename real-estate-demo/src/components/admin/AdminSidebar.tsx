"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, Users, Building2, BarChart3, Settings,
  Flag, Bell, LogOut, ChevronLeft, ChevronRight, Menu,
  Layers, FolderTree, MessageSquare, BookOpen, Map, HelpCircle, Info, Phone, Globe, Shield, Palette
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCMSStore } from "@/store/cmsStore";
import { supabase } from "@/lib/supabase";

const navItems = [
  { label: "Genel Bakış", href: "/admin", icon: LayoutDashboard },
  { label: "Anasayfa Tasarımcısı", href: "/admin/cms/homepage-builder", icon: Layers },
  { label: "Görsel Tasarım Editörü", href: "/admin/design-editor", icon: Palette },
  { label: "Mesajlar", href: "/admin/messages", icon: MessageSquare },
  { label: "İlanlar", href: "/admin/properties", icon: Building2 },
  { label: "Blog / Rehber", href: "/admin/blog", icon: BookOpen },
  { label: "Kategoriler", href: "/admin/categories", icon: Layers },
  { label: "Hakkımızda CMS", href: "/admin/cms/about", icon: Info },
  { label: "İletişim CMS", href: "/admin/cms/contact", icon: Phone },
  { label: "Bölgeler CMS", href: "/admin/cms/regions", icon: Map },
  { label: "SSS CMS", href: "/admin/cms/faq", icon: HelpCircle },
  { label: "Analizler", href: "/admin/analytics", icon: BarChart3 },
  { label: "Kullanıcılar", href: "/admin/users", icon: Users },
  { label: "Site Ayarları", href: "/admin/settings", icon: Settings },
  { label: "Güvenlik", href: "/admin/settings/security", icon: Shield },
  { label: "Marka & SEO", href: "/admin/settings/branding", icon: Globe },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { messages } = useCMSStore();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <aside className={cn(
      "sticky top-0 flex flex-col bg-slate-900 dark:bg-slate-950 border-r border-slate-800 h-screen transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-slate-800 flex-shrink-0">
        {!collapsed && (
          <Link href="/admin" className="text-lg font-bold text-white tracking-tight">
            Emlak <span className="text-brand-400">Admin</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn("p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors", collapsed ? "mx-auto" : "ml-auto")}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
          const unreadCount = label === "Mesajlar" ? messages.filter(m => !m.isRead).length : 0;
          
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative",
                active
                  ? "bg-brand-600 text-white shadow-lg shadow-brand-500/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="flex-1">{label}</span>}
              {!collapsed && unreadCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {unreadCount}
                </span>
              )}
              {collapsed && unreadCount > 0 && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-800 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
          title={collapsed ? "Siteye Dön" : undefined}
        >
          <Menu className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Siteye Dön</span>}
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
          title={collapsed ? "Çıkış Yap" : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Çıkış Yap</span>}
        </button>
      </div>
    </aside>
  );
}
