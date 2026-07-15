"use client";

import { useState } from "react";
import { useCMSStore } from "@/store/cmsStore";
import { 
  Save, Mail, Phone, MapPin, Share2, 
  Plus, Trash2, CheckCircle2, Layout,
  Monitor, Smartphone, Eye
} from "lucide-react";

import type { SocialLink } from "@/types/cms";

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
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { motion } from "framer-motion";

export default function FooterCMSEditor() {
  const { footer, updateFooter } = useCMSStore();
  const [localFooter, setLocalFooter] = useState(footer);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  const handleSave = () => {
    setSaveStatus("saving");
    setTimeout(() => {
      updateFooter(localFooter);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 800);
  };

  const updateSocial = (id: string, url: string) => {
    setLocalFooter({
      ...localFooter,
      socialLinks: localFooter.socialLinks.map((s: SocialLink) => s.id === id ? { ...s, url } : s)
    });
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Editor Panel */}
      <div className="w-full lg:w-[450px] border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto p-6 space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Footer Ayarları</h1>
            <p className="text-xs text-slate-500">Alt bilgi ve iletişim ayarları</p>
          </div>
          <Button 
            onClick={handleSave} 
            disabled={saveStatus === "saving"}
            className="rounded-xl h-10 px-4"
          >
            {saveStatus === "saving" ? "..." : saveStatus === "success" ? <CheckCircle2 className="w-4 h-4" /> : "Kaydet"}
          </Button>
        </header>

        {/* Info Section */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Layout className="w-3 h-3" /> Genel Bilgiler
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Şirket Adı</label>
              <Input 
                value={localFooter.companyName} 
                onChange={e => setLocalFooter({...localFooter, companyName: e.target.value})}
                className="h-10 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-2">Logo Görseli</label>
              <ImageUpload 
                value={localFooter.logoUrl ? [localFooter.logoUrl] : []}
                onChange={(urls) => setLocalFooter({...localFooter, logoUrl: urls[0] || undefined})}
                onRemove={() => setLocalFooter({...localFooter, logoUrl: undefined})}
                maxFiles={1}
                bucket="logos"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Açıklama Metni</label>
              <textarea 
                value={localFooter.description} 
                onChange={e => setLocalFooter({...localFooter, description: e.target.value})}
                className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 outline-none resize-none h-24"
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Mail className="w-3 h-3" /> İletişim Bilgileri
          </h3>
          <div className="space-y-3">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                value={localFooter.email} 
                onChange={e => setLocalFooter({...localFooter, email: e.target.value})}
                className="h-10 pl-10 text-sm"
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                value={localFooter.phone} 
                onChange={e => setLocalFooter({...localFooter, phone: e.target.value})}
                className="h-10 pl-10 text-sm"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                value={localFooter.address} 
                onChange={e => setLocalFooter({...localFooter, address: e.target.value})}
                className="h-10 pl-10 text-sm"
              />
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Share2 className="w-3 h-3" /> Sosyal Medya
          </h3>
          <div className="space-y-2">
            {localFooter.socialLinks.map((s: { id: string; platform: string; url: string; isActive: boolean }) => (
              <div key={s.id} className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                  {s.platform === 'facebook' && <Facebook className="w-4 h-4" />}
                  {s.platform === 'twitter' && <Twitter className="w-4 h-4" />}
                  {s.platform === 'instagram' && <Instagram className="w-4 h-4" />}
                  {s.platform === 'linkedin' && <Linkedin className="w-4 h-4" />}
                </div>
                <Input 
                  value={s.url} 
                  onChange={e => updateSocial(s.id, e.target.value)}
                  className="h-10 text-xs font-mono"
                  placeholder="URL..."
                />
              </div>
            ))}
          </div>
        </section>

        {/* Copyright Section */}
        <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Copyright Göster</span>
            <input 
              type="checkbox" 
              checked={localFooter.showCopyright}
              onChange={e => setLocalFooter({...localFooter, showCopyright: e.target.checked})}
              className="w-4 h-4 rounded text-brand-600"
            />
          </div>
          <Input 
            value={localFooter.copyrightText} 
            onChange={e => setLocalFooter({...localFooter, copyrightText: e.target.value})}
            className="h-10 text-sm"
          />
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
        <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 h-[600px] relative flex flex-col">
          <div className="flex-1 p-12">
             <div className="h-40 w-full bg-slate-50 dark:bg-slate-800 rounded-3xl animate-pulse" />
          </div>

          {/* Footer Preview */}
          <footer style={{ backgroundColor: localFooter.backgroundColor }} className="p-12 text-white">
            <div className="grid grid-cols-4 gap-8">
              <div className="col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-xs">P</div>
                  <span className="font-bold text-xl uppercase">{localFooter.companyName}</span>
                </div>
                <p className="text-white/60 text-sm max-w-xs">{localFooter.description}</p>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-sm">İletişim</h4>
                <div className="space-y-2 text-xs text-white/60">
                  <p className="flex items-center gap-2"><Mail className="w-3 h-3" /> {localFooter.email}</p>
                  <p className="flex items-center gap-2"><Phone className="w-3 h-3" /> {localFooter.phone}</p>
                  <p className="flex items-center gap-2"><MapPin className="w-3 h-3" /> {localFooter.address}</p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-sm">Sosyal Medya</h4>
                <div className="flex gap-3">
                  {localFooter.socialLinks.map((s: { id: string; platform: string; url: string; isActive: boolean }) => (
                    <div key={s.id} className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-brand-600 transition-colors cursor-pointer">
                      {s.platform === 'facebook' && <Facebook className="w-4 h-4" />}
                      {s.platform === 'twitter' && <Twitter className="w-4 h-4" />}
                      {s.platform === 'instagram' && <Instagram className="w-4 h-4" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {localFooter.showCopyright && (
              <div className="mt-12 pt-8 border-t border-white/10 text-xs text-white/40 flex justify-between">
                <p>{localFooter.copyrightText}</p>
                <div className="flex gap-4">
                  <span>Gizlilik</span>
                  <span>Şartlar</span>
                </div>
              </div>
            )}
          </footer>

          <div className="absolute inset-0 pointer-events-none border-[12px] border-slate-900/5 dark:border-white/5 rounded-[inherit]" />
        </div>
      </div>
    </div>
  );
}
