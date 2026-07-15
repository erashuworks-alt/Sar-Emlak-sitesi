"use client";

import { useState } from "react";
import { useCMSStore } from "@/store/cmsStore";
import { 
  Save, RotateCcw, Plus, Trash2, GripVertical, 
  Monitor, Smartphone, Eye, Layout, Type, MousePointer2,
  CheckCircle2, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { motion, AnimatePresence } from "framer-motion";

export default function HeaderCMSEditor() {
  const { header, updateHeader } = useCMSStore();
  const [localHeader, setLocalHeader] = useState(header);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  const handleSave = () => {
    setSaveStatus("saving");
    setTimeout(() => {
      updateHeader(localHeader);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 800);
  };

  const updateNavItem = (id: string, updates: any) => {
    setLocalHeader({
      ...localHeader,
      navigation: localHeader.navigation.map((n: { id: string; title: string; href: string; order: number; isActive: boolean }) => n.id === id ? { ...n, ...updates } : n)
    });
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Editor Panel */}
      <div className="w-full lg:w-[450px] border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto p-6 space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Header Ayarları</h1>
            <p className="text-xs text-slate-500">Üst menü ve logo ayarları</p>
          </div>
          <Button 
            onClick={handleSave} 
            disabled={saveStatus === "saving"}
            className="rounded-xl h-10 px-4"
          >
            {saveStatus === "saving" ? "..." : saveStatus === "success" ? <CheckCircle2 className="w-4 h-4" /> : "Kaydet"}
          </Button>
        </header>

        {/* Logo Section */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Layout className="w-3 h-3" /> Logo & Marka
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Logo Metni</label>
              <Input 
                value={localHeader.logoText} 
                onChange={e => setLocalHeader({...localHeader, logoText: e.target.value})}
                className="h-10 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-2">Logo Görseli</label>
              <ImageUpload 
                value={localHeader.logoUrl ? [localHeader.logoUrl] : []}
                onChange={(urls) => setLocalHeader({...localHeader, logoUrl: urls[0] || undefined})}
                onRemove={() => setLocalHeader({...localHeader, logoUrl: undefined})}
                maxFiles={1}
                bucket="logos"
              />
            </div>
          </div>
        </section>

        {/* Navigation Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <MenuIcon className="w-3 h-3" /> Navigasyon Menüsü
            </h3>
            <button className="text-[10px] font-bold text-brand-600 hover:underline flex items-center gap-1">
              <Plus className="w-3 h-3" /> Yeni Ekle
            </button>
          </div>
          <div className="space-y-2">
            {localHeader.navigation.sort((a: any, b: any) => a.order - b.order).map((item: { id: string; title: string; href: string; order: number; isActive: boolean }) => (
              <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-slate-300 cursor-grab" />
                  <input 
                    className="flex-1 bg-transparent border-none text-sm font-bold focus:ring-0 p-0" 
                    value={item.title}
                    onChange={e => updateNavItem(item.id, { title: e.target.value })}
                  />
                  <button className="text-slate-400 hover:text-red-50">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input 
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-[10px] font-mono" 
                  value={item.href}
                  onChange={e => updateNavItem(item.id, { href: e.target.value })}
                />
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <MousePointer2 className="w-3 h-3" /> Buton Ayarları (CTA)
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Buton Metni</label>
              <Input 
                value={localHeader.ctaText} 
                onChange={e => setLocalHeader({...localHeader, ctaText: e.target.value})}
                className="h-10 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Link</label>
              <Input 
                value={localHeader.ctaLink} 
                onChange={e => setLocalHeader({...localHeader, ctaLink: e.target.value})}
                className="h-10 text-sm"
              />
            </div>
          </div>
        </section>

        {/* Options */}
        <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
           <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Buton Göster (CTA)</span>
              <input 
                type="checkbox" 
                checked={localHeader.showCTA}
                onChange={e => setLocalHeader({...localHeader, showCTA: e.target.checked})}
                className="w-4 h-4 rounded text-brand-600"
              />
           </div>
           <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Sticky Header</span>
              <input 
                type="checkbox" 
                checked={localHeader.isSticky}
                onChange={e => setLocalHeader({...localHeader, isSticky: e.target.checked})}
                className="w-4 h-4 rounded text-brand-600"
              />
           </div>
           <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Duyuru Bandı</span>
              <input 
                type="checkbox" 
                checked={localHeader.showAnnouncement}
                onChange={e => setLocalHeader({...localHeader, showAnnouncement: e.target.checked})}
                className="w-4 h-4 rounded text-brand-600"
              />
           </div>
           {localHeader.showAnnouncement && (
             <Input 
               value={localHeader.announcementText || ""} 
               onChange={e => setLocalHeader({...localHeader, announcementText: e.target.value})}
               placeholder="Duyuru metni..."
               className="h-10 text-sm"
             />
           )}
        </section>
      </div>

      {/* Preview Panel */}
      <div className="flex-1 bg-slate-200 dark:bg-slate-950 p-8 flex flex-col items-center">
        <div className="flex items-center gap-4 mb-6 bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-sm">
          <button className="p-2 rounded-lg bg-brand-50 text-brand-600"><Monitor className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg text-slate-400"><Smartphone className="w-4 h-4" /></button>
          <div className="w-px h-4 bg-slate-200 mx-2" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <Eye className="w-3 h-3" /> Canlı Önizleme
          </span>
        </div>

        {/* The Actual Preview Frame */}
        <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 h-[600px] relative">
          
          {/* Announcement Bar Preview */}
          {localHeader.showAnnouncement && (
            <div className="bg-brand-600 text-white text-[10px] py-2 text-center font-bold tracking-wide">
              {localHeader.announcementText}
            </div>
          )}

          {/* Header Preview */}
          <div className="px-8 py-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-xs">P</div>
              <span className="font-bold text-xl text-slate-900 dark:text-white uppercase tracking-tighter">
                {localHeader.logoText}
              </span>
            </div>
            <nav className="flex items-center gap-8">
              {localHeader.navigation.map((n: { id: string; title: string; href: string; order: number; isActive: boolean }) => (
                <span key={n.id} className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-brand-600 cursor-pointer">
                  {n.title}
                </span>
              ))}
            </nav>
            <Button className="rounded-full px-6 text-sm">{localHeader.ctaText}</Button>
          </div>

          {/* Mock content below header */}
          <div className="p-12 space-y-6">
            <div className="h-10 w-2/3 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse" />
            <div className="h-4 w-1/2 bg-slate-50 dark:bg-slate-800/50 rounded-full animate-pulse" />
            <div className="grid grid-cols-3 gap-6 pt-12">
              {[1,2,3].map((i: number) => <div key={i} className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse" />)}
            </div>
          </div>

          <div className="absolute inset-0 pointer-events-none border-[12px] border-slate-900/5 dark:border-white/5 rounded-[inherit]" />
        </div>
      </div>
    </div>
  );
}

function MenuIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
