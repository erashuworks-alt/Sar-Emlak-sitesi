"use client";

import Link from "next/link";
import { 
  Layout, Type, Image as ImageIcon, MousePointer2, 
  Menu as MenuIcon, Share2, Info, MessageSquare, 
  ChevronRight, ArrowRight, Settings2, Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

const cmsSections = [
  {
    id: "header",
    title: "Üst Menü (Header)",
    description: "Logo, navigasyon menüleri ve duyuru bandı ayarları.",
    icon: MenuIcon,
    href: "/admin/cms/header",
    color: "bg-blue-500",
  },
  {
    id: "homepage",
    title: "Anasayfa Bölümleri",
    description: "Hero, öne çıkanlar, hakkımızda ve CTA alanlarını düzenleyin.",
    icon: Layout,
    href: "/admin/cms/homepage",
    color: "bg-purple-500",
  },
  {
    id: "footer",
    title: "Alt Bilgi (Footer)",
    description: "İletişim bilgileri, sosyal medya ve yasal metinler.",
    icon: Share2,
    href: "/admin/cms/footer",
    color: "bg-slate-800",
  },
  {
    id: "categories",
    title: "Kategori Kartları",
    description: "Anasayfadaki kategori ikonları ve görselleri.",
    icon: ImageIcon,
    href: "/admin/categories",
    color: "bg-emerald-500",
  }
];

export default function AdminCMSPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">İçerik Yönetim Sistemi</h1>
        </div>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          Web sitenizin tüm dinamik alanlarını kod yazmadan buradan yönetebilirsiniz.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cmsSections.map((section, idx) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link 
              href={section.href}
              className="group block p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-500 transition-all shadow-sm hover:shadow-xl hover:shadow-brand-500/5 relative overflow-hidden"
            >
              <div className="flex items-start justify-between relative z-10">
                <div className={`w-14 h-14 rounded-2xl ${section.color} flex items-center justify-center mb-6 shadow-lg shadow-inherit/20`}>
                  <section.icon className="w-7 h-7 text-white" />
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-600 transition-colors">
                  {section.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  {section.description}
                </p>
              </div>
              
              {/* Decorative background circle */}
              <div className={`absolute -right-10 -bottom-10 w-40 h-40 rounded-full ${section.color} opacity-0 group-hover:opacity-[0.03] transition-opacity`} />
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-brand-50 dark:bg-brand-900/10 rounded-[2.5rem] border border-brand-100 dark:border-brand-900/30 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h4 className="text-xl font-bold text-brand-900 dark:text-brand-400 mb-2">Canlı Önizleme Sistemi</h4>
          <p className="text-brand-700/70 dark:text-brand-400/60">
            Değişikliklerinizi yaparken sağ panelde canlı olarak nasıl görüneceğini görebilirsiniz. Taslaklarınızı yayınlamadan önce kontrol etmeyi unutmayın.
          </p>
        </div>
        <div className="flex-shrink-0">
          <div className="flex -space-x-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-900 bg-slate-200 overflow-hidden">
                <img src={`https://i.pravatar.cc/100?u=${i}`} alt="" />
              </div>
            ))}
            <div className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-900 bg-brand-600 flex items-center justify-center text-white text-xs font-bold">
              +12
            </div>
          </div>
          <p className="text-xs text-center mt-2 text-brand-600 font-bold">Şu an 3 kişi düzenliyor</p>
        </div>
      </div>
    </div>
  );
}
