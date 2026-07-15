"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Layout, Settings, Image as ImageIcon, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useCMSStore } from "@/store/cmsStore";
import { HomeSection, HomeSectionType } from "@/types/cms";
import { ImageUpload } from "./ImageUpload";
import { VideoUpload } from "./VideoUpload";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  section: HomeSection | null;
}

const SECTION_TYPES: { label: string; value: HomeSectionType }[] = [
  { label: "Hero (Giriş)", value: "hero" },
  { label: "Öne Çıkan İlanlar", value: "featured_properties" },
  { label: "Hizmetler", value: "services" },
  { label: "Video Tanıtım", value: "video_showcase" },
  { label: "Popüler Bölgeler", value: "popular_regions" },
  { label: "Hakkımızda Özeti", value: "about" },
  { label: "İstatistikler", value: "statistics" },
  { label: "Kategoriler", value: "categories" },
  { label: "CTA Banner", value: "cta" },
];

export function HomeSectionModal({ isOpen, onClose, section }: Props) {
  const { updateHomeSection, addHomeSection } = useCMSStore();
  const [formData, setFormData] = useState<Partial<HomeSection>>({
    type: "hero",
    title: "",
    subtitle: "",
    content: "",
    imageUrl: "",
    videoUrl: "",
    buttonText: "",
    buttonLink: "",
    isActive: true,
    settings: {},
    items: []
  });

  useEffect(() => {
    if (section) {
      setFormData(section);
    } else {
      setFormData({
        type: "hero",
        title: "",
        subtitle: "",
        content: "",
        imageUrl: "",
        videoUrl: "",
        buttonText: "",
        buttonLink: "",
        isActive: true,
        settings: {},
        items: []
      });
    }
  }, [section, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (section) {
      updateHomeSection(section.id, formData);
    } else {
      addHomeSection(formData as any);
    }
    onClose();
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...(formData.items || []), { label: "", value: "", title: "", description: "" }]
    });
  };

  const removeItem = (index: number) => {
    setFormData({
      ...formData,
      items: (formData.items || []).filter((_, i) => i !== index)
    });
  };

  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...(formData.items || [])];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
            
            <div className="flex items-center justify-between p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-brand-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-brand-500/20">
                  <Layout className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {section ? "Bölümü Düzenle" : "Yeni Bölüm Ekle"}
                  </h3>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Anasayfa Yapılandırıcı</p>
                </div>
              </div>
              <button onClick={onClose} className="p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-10 space-y-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Bölge Tipi</label>
                    <select 
                      value={formData.type}
                      onChange={e => setFormData({ ...formData, type: e.target.value as HomeSectionType })}
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      {SECTION_TYPES.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Başlık</label>
                    <Input 
                      value={formData.title || ""}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Ana başlık..."
                      className="h-12 bg-slate-50 dark:bg-slate-950 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Alt Başlık</label>
                    <Input 
                      value={formData.subtitle || ""}
                      onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                      placeholder="Kısa açıklama veya spot metin..."
                      className="h-12 bg-slate-50 dark:bg-slate-950 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Arkaplan / Kapak Görseli</label>
                  <ImageUpload 
                    value={formData.imageUrl ? [formData.imageUrl] : []}
                    onChange={urls => setFormData({ ...formData, imageUrl: urls[0] || "" })}
                    onRemove={() => setFormData({ ...formData, imageUrl: "" })}
                    maxFiles={1}
                    bucket="sections"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">İçerik Metni (Bazı bölümler için)</label>
                <textarea 
                  value={formData.content || ""}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Bölüm içeriği..."
                  rows={4}
                  className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              {/* Custom Colors */}
              <div className="grid md:grid-cols-2 gap-6 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Özel Arkaplan Rengi</label>
                  <div className="flex gap-3 items-center">
                    <input 
                      type="color" 
                      value={formData.settings?.backgroundColor || "#ffffff"} 
                      onChange={e => setFormData({ ...formData, settings: { ...formData.settings, backgroundColor: e.target.value }})}
                      className="h-12 w-16 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer bg-transparent" 
                    />
                    <Input 
                      value={formData.settings?.backgroundColor || ""} 
                      onChange={e => setFormData({ ...formData, settings: { ...formData.settings, backgroundColor: e.target.value }})}
                      placeholder="#ffffff (Boş bırakılabilir)"
                      className="h-12 bg-white dark:bg-slate-950 rounded-xl flex-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Özel Metin Rengi</label>
                  <div className="flex gap-3 items-center">
                    <input 
                      type="color" 
                      value={formData.settings?.textColor || "#0f172a"} 
                      onChange={e => setFormData({ ...formData, settings: { ...formData.settings, textColor: e.target.value }})}
                      className="h-12 w-16 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer bg-transparent" 
                    />
                    <Input 
                      value={formData.settings?.textColor || ""} 
                      onChange={e => setFormData({ ...formData, settings: { ...formData.settings, textColor: e.target.value }})}
                      placeholder="#0f172a (Boş bırakılabilir)"
                      className="h-12 bg-white dark:bg-slate-950 rounded-xl flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Buton Metni</label>
                  <Input 
                    value={formData.buttonText || ""}
                    onChange={e => setFormData({ ...formData, buttonText: e.target.value })}
                    className="h-12 bg-slate-50 dark:bg-slate-950 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Buton Linki</label>
                  <Input 
                    value={formData.buttonLink || ""}
                    onChange={e => setFormData({ ...formData, buttonLink: e.target.value })}
                    className="h-12 bg-slate-50 dark:bg-slate-950 rounded-xl"
                  />
                </div>
              </div>
              {formData.type === "video_showcase" && (
                <div className="p-8 bg-brand-50 dark:bg-brand-900/10 rounded-[2rem] border border-brand-100 dark:border-brand-800/50">
                  <h4 className="text-sm font-bold text-brand-700 dark:text-brand-300 mb-6">Video Kaynağı (URL veya Dosya)</h4>
                  
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Video URL (YouTube / Vimeo)</label>
                      <Input 
                        value={formData.videoUrl || ""}
                        onChange={e => setFormData({ ...formData, videoUrl: e.target.value })}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="h-12 bg-white dark:bg-slate-950 rounded-xl border-brand-200 dark:border-brand-800"
                      />
                      <p className="mt-2 text-[10px] text-slate-500 italic ml-1">
                        URL eklerseniz, yüklenen video yerine URL öncelikli olur.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Veya PC'den Yükle</label>
                      <VideoUpload 
                        value={(!formData.videoUrl?.includes("youtube") && !formData.videoUrl?.includes("vimeo")) ? (formData.videoUrl || "") : ""}
                        onChange={url => setFormData({ ...formData, videoUrl: url })}
                        onRemove={() => setFormData({ ...formData, videoUrl: "" })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Items (Stats, Services, etc.) */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Öğeler (İstatistikler / Hizmetler)</label>
                  <Button type="button" onClick={addItem} variant="outline" size="sm" className="rounded-xl">
                    <Plus className="w-4 h-4 mr-2" /> Öğe Ekle
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {formData.items?.map((item, i) => (
                    <div key={i} className="p-6 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 relative group">
                      <button onClick={() => removeItem(i)} className="absolute top-4 right-4 p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="grid grid-cols-2 gap-4">
                        <Input 
                          placeholder="Etiket / Başlık (Örn: Mutlu Müşteri)" 
                          value={item.label || item.title || ""} 
                          onChange={e => updateItem(i, item.label !== undefined ? "label" : "title", e.target.value)}
                          className="bg-white dark:bg-slate-900 border-none rounded-xl h-10 text-xs"
                        />
                        <div className="flex gap-2">
                          <Input 
                            placeholder="Değer (Örn: 250)" 
                            value={item.value || item.description || ""} 
                            onChange={e => updateItem(i, item.value !== undefined ? "value" : "description", e.target.value)}
                            className="bg-white dark:bg-slate-900 border-none rounded-xl h-10 text-xs flex-1"
                          />
                          {formData.type === "statistics" && (
                            <Input 
                              placeholder="Ek (Örn: +)" 
                              value={item.suffix || ""} 
                              onChange={e => updateItem(i, "suffix", e.target.value)}
                              className="bg-white dark:bg-slate-900 border-none rounded-xl h-10 text-xs w-16 text-center"
                              maxLength={3}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </form>

            <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={onClose} className="rounded-2xl px-8">İptal</Button>
              <Button onClick={handleSubmit} className="rounded-2xl px-12 bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-500/20">
                <Save className="w-4 h-4 mr-2" /> Değişiklikleri Kaydet
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
