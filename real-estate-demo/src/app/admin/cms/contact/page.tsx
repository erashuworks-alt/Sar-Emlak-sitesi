"use client";

import { useCMSStore } from "@/store/cmsStore";
import { useState } from "react";
import { Save, MapPin, Phone, Mail, Clock, MessageCircle, Share2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminContactCMS() {
  const { contactSettings, updateContactSettings } = useCMSStore();
  const [formData, setFormData] = useState(contactSettings);

  const handleSave = () => {
    updateContactSettings(formData);
    alert("İletişim ayarları güncellendi.");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">İletişim Ayarları</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">İletişim sayfası ve global iletişim bilgilerini yönetin.</p>
        </div>
        <Button onClick={handleSave} className="rounded-xl px-6">
          <Save className="w-4 h-4 mr-2" /> Kaydet
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Core Info */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-600" /> Genel Bilgiler
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Ofis Adresi</label>
                <textarea 
                  value={formData.address}
                  onChange={e => setFormData({ 
                    ...formData, 
                    address: e.target.value,
                    mapEmbed: `https://www.google.com/maps?q=${encodeURIComponent(e.target.value)}&output=embed`
                  })}
                  className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Google Harita Embed (iframe src)</label>
                <input 
                  value={formData.mapEmbed}
                  onChange={e => setFormData({ ...formData, mapEmbed: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Çalışma Saatleri</label>
                <input 
                  value={formData.workingHours}
                  onChange={e => setFormData({ ...formData, workingHours: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-brand-600" /> WhatsApp & Hızlı Destek
            </h2>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">WhatsApp Numarası</label>
              <input 
                value={formData.whatsapp}
                onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500"
              />
              <p className="text-[10px] text-slate-400 mt-2 px-1">Örn: +90 532 555 0123</p>
            </div>
          </div>
        </div>

        {/* Dynamic Lists */}
        <div className="space-y-6">
          {/* Phones */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2"><Phone className="w-5 h-5 text-brand-600" /> Telefonlar</div>
              <button onClick={() => setFormData({ ...formData, phones: [...formData.phones, ""] })} className="p-1.5 rounded-lg bg-brand-50 dark:bg-brand-900/30 text-brand-600">
                <Plus className="w-4 h-4" />
              </button>
            </h2>
            <div className="space-y-3">
              {formData.phones.map((phone: string, idx: number) => (
                <div key={idx} className="flex gap-2">
                  <input 
                    value={phone}
                    onChange={e => {
                      const next = [...formData.phones];
                      next[idx] = e.target.value;
                      setFormData({ ...formData, phones: next });
                    }}
                    className="flex-1 h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <button onClick={() => setFormData({ ...formData, phones: formData.phones.filter((_: any, i: number) => i !== idx) })} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Emails */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2"><Mail className="w-5 h-5 text-brand-600" /> E-postalar</div>
              <button onClick={() => setFormData({ ...formData, emails: [...formData.emails, ""] })} className="p-1.5 rounded-lg bg-brand-50 dark:bg-brand-900/30 text-brand-600">
                <Plus className="w-4 h-4" />
              </button>
            </h2>
            <div className="space-y-3">
              {formData.emails.map((email: string, idx: number) => (
                <div key={idx} className="flex gap-2">
                  <input 
                    value={email}
                    onChange={e => {
                      const next = [...formData.emails];
                      next[idx] = e.target.value;
                      setFormData({ ...formData, emails: next });
                    }}
                    className="flex-1 h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <button onClick={() => setFormData({ ...formData, emails: formData.emails.filter((_: any, i: number) => i !== idx) })} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2"><Share2 className="w-5 h-5 text-brand-600" /> Sosyal Medya</div>
            </h2>
            <div className="space-y-4">
              {formData.socialLinks.map((link: { id: string; platform: string; url: string; isActive: boolean }, idx: number) => (
                <div key={link.id} className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1 capitalize">{link.platform}</label>
                  <input 
                    value={link.url}
                    onChange={e => {
                      const next = [...formData.socialLinks];
                      next[idx] = { ...next[idx], url: e.target.value };
                      setFormData({ ...formData, socialLinks: next });
                    }}
                    placeholder="URL girin..."
                    className="w-full h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
