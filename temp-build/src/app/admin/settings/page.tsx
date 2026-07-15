"use client";

import { useState } from "react";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { Settings, Save, Globe, Phone, Mail, Palette, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { motion, AnimatePresence } from "framer-motion";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { MediaUpload } from "@/components/admin/MediaUpload";
import { useCMSStore } from "@/store/cmsStore";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const { 
    header, updateHeader, 
    footer, updateFooter,
    updateContactSettings,
    isMaintenanceMode, setMaintenanceMode,
    maintenanceSettings, updateMaintenanceSettings,
    theme, updateTheme 
  } = useCMSStore();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col flex-1 overflow-auto bg-slate-100 dark:bg-slate-900">
      <AdminNavbar title="Site Ayarları" />
      <div className="p-6 space-y-6 max-w-4xl">
        <form onSubmit={handleSave} className="space-y-6">
          {/* General */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2"><Globe className="w-5 h-5 text-brand-500" />Genel Ayarlar</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Site Adı</label><Input defaultValue="Emlak Platform" /></div>
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Site Logosu</label>
                <ImageUpload 
                  value={header.logoUrl ? [header.logoUrl] : []}
                  onChange={(urls) => updateHeader({ logoUrl: urls[0] || undefined })}
                  onRemove={() => updateHeader({ logoUrl: undefined })}
                  maxFiles={1}
                  bucket="logos"
                />
              </div>
              <div className="md:col-span-2"><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Hero Başlığı</label><Input defaultValue="Hayalinizdeki Evi Keşfedin" /></div>
              <div className="md:col-span-2"><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Hero Açıklaması</label><textarea className="w-full h-24 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 outline-none resize-none" defaultValue="Türkiye'nin en seçkin ve modern gayrimenkul platformunda aradığınız mülkü hemen bulun."></textarea></div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2"><Phone className="w-5 h-5 text-brand-500" />İletişim Bilgileri</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">E-posta</label><Input defaultValue="info@emlakplatform.com" type="email" /></div>
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Telefon</label><Input defaultValue="+90 (212) 555 0123" /></div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2"><Globe className="w-5 h-5 text-brand-500" />Sosyal Medya Bağlantıları</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {["facebook", "twitter", "instagram", "linkedin", "youtube"].map(platform => {
                const link = footer.socialLinks?.find((s: any) => s.platform === platform) || { url: "" };
                return (
                  <div key={platform}>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 capitalize">{platform}</label>
                    <Input 
                      value={link.url}
                      onChange={e => {
                        const newLinks = [...(footer.socialLinks || [])];
                        const index = newLinks.findIndex((s: any) => s.platform === platform);
                        if (index >= 0) newLinks[index] = { ...newLinks[index], url: e.target.value };
                        else newLinks.push({ id: Date.now().toString(), platform: platform as any, url: e.target.value, isActive: true });
                        updateFooter({ socialLinks: newLinks });
                        updateContactSettings({ socialLinks: newLinks });
                      }}
                      placeholder={`https://${platform}.com/...`} 
                    />
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-slate-500">Bağlantısı boş olan sosyal medya ikonları sitede gizlenecektir.</p>
          </div>

          {/* Colors */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2"><Palette className="w-5 h-5 text-brand-500" />Renk Paleti</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Birincil Renk</label>
                <div className="flex gap-3 items-center">
                  <input 
                    type="color" 
                    value={theme.primaryColor} 
                    onChange={e => updateTheme({ primaryColor: e.target.value })}
                    className="h-12 w-16 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer bg-transparent" 
                  />
                  <Input 
                    value={theme.primaryColor} 
                    onChange={e => updateTheme({ primaryColor: e.target.value })}
                    className="flex-1" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">İkincil Renk</label>
                <div className="flex gap-3 items-center">
                  <input 
                    type="color" 
                    value={theme.secondaryColor} 
                    onChange={e => updateTheme({ secondaryColor: e.target.value })}
                    className="h-12 w-16 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer bg-transparent" 
                  />
                  <Input 
                    value={theme.secondaryColor} 
                    onChange={e => updateTheme({ secondaryColor: e.target.value })}
                    className="flex-1" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Maintenance */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20"><AlertTriangle className="w-6 h-6 text-amber-500" /></div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Bakım Modu</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Aktifleştirildiğinde site ziyaretçilere bakım sayfası gösterilir.</p>
                </div>
              </div>
              <button type="button" onClick={() => setMaintenanceMode(!isMaintenanceMode)} className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${isMaintenanceMode ? "bg-amber-500" : "bg-slate-200 dark:bg-slate-700"}`}>
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${isMaintenanceMode ? "translate-x-6" : "translate-x-1"}`}></span>
              </button>
            </div>
            
            <AnimatePresence>
              {isMaintenanceMode && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 ml-1">Bakım Başlığı</label>
                      <Input 
                        value={maintenanceSettings.title}
                        onChange={e => updateMaintenanceSettings({ title: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 ml-1">Tahmini Süre</label>
                      <Input 
                        value={maintenanceSettings.estimatedDuration}
                        onChange={e => updateMaintenanceSettings({ estimatedDuration: e.target.value })}
                        placeholder="Örn: 30 Dakika, 2 Saat"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 ml-1">Açıklama</label>
                    <textarea 
                      value={maintenanceSettings.description}
                      onChange={e => updateMaintenanceSettings({ description: e.target.value })}
                      className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 outline-none resize-none h-20"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Arkaplan Görseli</label>
                      <ImageUpload 
                        value={maintenanceSettings.backgroundImage ? [maintenanceSettings.backgroundImage] : []}
                        onChange={urls => updateMaintenanceSettings({ backgroundImage: urls[0] || "", backgroundVideo: "" })}
                        onRemove={() => updateMaintenanceSettings({ backgroundImage: "" })}
                        maxFiles={1}
                        bucket="system"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Arkaplan Videosu</label>
                      <MediaUpload 
                        value={maintenanceSettings.backgroundVideo ? [maintenanceSettings.backgroundVideo] : []}
                        onChange={urls => updateMaintenanceSettings({ backgroundVideo: urls[0] || "", backgroundImage: "" })}
                        onRemove={() => updateMaintenanceSettings({ backgroundVideo: "" })}
                        maxFiles={1}
                        bucket="system"
                        accept="video/*"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4">
            <Button className="rounded-xl px-8 h-11 flex items-center gap-2" type="submit">
              <Save className="w-4 h-4" /> Değişiklikleri Kaydet
            </Button>
            {saved && <span className="text-green-600 dark:text-green-400 font-medium text-sm">✓ Tüm değişiklikler kaydedildi!</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
