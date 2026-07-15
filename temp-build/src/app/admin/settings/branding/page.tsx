"use client";

import { useState, useEffect } from "react";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { Globe, Save, Layout, Search, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useCMSStore } from "@/store/cmsStore";

export default function BrandingSettingsPage() {
  const { branding, updateBranding } = useCMSStore();
  const [localBranding, setLocalBranding] = useState(branding);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success">("idle");

  // Store'dan gelen verileri senkronize et (hydration sonrası için önemli)
  useEffect(() => {
    setLocalBranding(branding);
  }, [branding]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("saving");
    
    // Aslında updateBranding zaten state'i güncelliyor ama 
    // yerel state kullanarak daha performanslı bir düzenleme sağlıyoruz.
    updateBranding(localBranding);
    
    setTimeout(() => {
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }, 800);
  };

  return (
    <div className="flex flex-col flex-1 overflow-auto bg-slate-100 dark:bg-slate-900">
      <AdminNavbar title="Marka & SEO Ayarları" />
      
      <div className="p-6 max-w-4xl space-y-6">
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Site Identity */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Layout className="w-5 h-5 text-brand-500" /> Site Kimliği
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Site Adı</label>
                <Input 
                  value={localBranding.siteName} 
                  onChange={e => setLocalBranding({ ...localBranding, siteName: e.target.value })}
                  placeholder="Örn: Emlak Platform"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tarayıcı Sekme Başlığı</label>
                <Input 
                  value={localBranding.browserTitle} 
                  onChange={e => setLocalBranding({ ...localBranding, browserTitle: e.target.value })}
                  placeholder="Sekmede görünecek metin"
                />
              </div>
            </div>
          </div>

          {/* Icons */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-brand-500" /> İkonlar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Favicon (32x32)</label>
                <p className="text-xs text-slate-500 mb-4">Tarayıcı sekmesinde görünen küçük ikon.</p>
                <ImageUpload 
                  value={localBranding.faviconUrl ? [localBranding.faviconUrl] : []}
                  onChange={urls => setLocalBranding({ ...localBranding, faviconUrl: urls[0] || "" })}
                  onRemove={() => setLocalBranding({ ...localBranding, faviconUrl: "" })}
                  maxFiles={1}
                  bucket="system"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Apple Touch Icon (180x180)</label>
                <p className="text-xs text-slate-500 mb-4">Mobil cihazlarda "Ana Ekrana Ekle" ikonu.</p>
                <ImageUpload 
                  value={localBranding.appleIconUrl ? [localBranding.appleIconUrl] : []}
                  onChange={urls => setLocalBranding({ ...localBranding, appleIconUrl: urls[0] || "" })}
                  onRemove={() => setLocalBranding({ ...localBranding, appleIconUrl: "" })}
                  maxFiles={1}
                  bucket="system"
                />
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Search className="w-5 h-5 text-brand-500" /> Arama Motoru Optimizasyonu (SEO)
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Varsayılan SEO Başlığı</label>
                <Input 
                  value={localBranding.seoTitle} 
                  onChange={e => setLocalBranding({ ...localBranding, seoTitle: e.target.value })}
                  placeholder="Google sonuçlarında görünecek başlık"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Meta Açıklaması</label>
                <textarea 
                  value={localBranding.seoDescription} 
                  onChange={e => setLocalBranding({ ...localBranding, seoDescription: e.target.value })}
                  className="w-full h-32 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 outline-none resize-none"
                  placeholder="Sitenizi özetleyen 150-160 karakterlik metin."
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              type="submit" 
              className="rounded-xl px-8 h-12 flex items-center gap-2"
              disabled={saveStatus === "saving"}
            >
              <Save className="w-4 h-4" /> 
              {saveStatus === "saving" ? "Kaydediliyor..." : "Ayarları Kaydet"}
            </Button>
            {saveStatus === "success" && (
              <span className="text-green-600 dark:text-green-400 font-medium text-sm flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Tüm değişiklikler kaydedildi!
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
