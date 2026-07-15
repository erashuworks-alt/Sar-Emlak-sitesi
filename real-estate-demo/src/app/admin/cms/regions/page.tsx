"use client";

import { useCMSStore } from "@/store/cmsStore";
import { usePropertyStore } from "@/store/propertyStore";
import { useState } from "react";
import { Save, Plus, Trash2, MapPin, Search, Check, Eye, EyeOff, MoveUp, MoveDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { AdminNavbar } from "@/components/admin/AdminNavbar";

export default function AdminRegionsCMS() {
  const { popularRegions, addPopularRegion, updatePopularRegion, deletePopularRegion } = useCMSStore();
  const { properties } = usePropertyStore();
  const [isAdding, setIsAdding] = useState(false);
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);

  const [newRegion, setNewRegion] = useState({
    title: "",
    slug: "",
    image: "",
    description: "",
    seoContent: "",
    featuredListings: [] as string[],
    isActive: true,
    sortOrder: 0
  });

  const handleAdd = () => {
    addPopularRegion({
      ...newRegion,
      slug: newRegion.title.toLowerCase().replace(/\s+/g, "-")
    });
    setNewRegion({ title: "", slug: "", image: "", description: "", seoContent: "", featuredListings: [], isActive: true, sortOrder: 0 });
    setIsAdding(false);
  };

  const selectedRegion = popularRegions.find(r => r.id === selectedRegionId);

  return (
    <div className="flex flex-col flex-1 h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      <AdminNavbar title="Bölge Yönetimi" />
      
      <div className="p-8 h-full flex flex-col overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Hizmet Bölgeleri</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Bölgeleri yönetin ve ana sayfadaki görünürlüklerini ayarlayın.</p>
          </div>
          <Button onClick={() => setIsAdding(true)} className="rounded-2xl px-8 shadow-lg shadow-brand-500/20">
            <Plus className="w-4 h-4 mr-2" /> Yeni Bölge Ekle
          </Button>
        </div>

        <div className="flex-1 flex gap-8 overflow-hidden">
          {/* List */}
          <div className="w-96 bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Kayıtlı Bölgeler ({popularRegions.length})</h3>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-700/50">
              {popularRegions.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)).map(region => (
                <button 
                  key={region.id}
                  onClick={() => { setSelectedRegionId(region.id); setIsAdding(false); }}
                  className={`w-full p-5 text-left transition-all flex items-center gap-4 group ${selectedRegionId === region.id ? 'bg-brand-50 dark:bg-brand-900/10 border-r-4 border-brand-600' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                >
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 shadow-sm">
                    <img src={region.image || "https://images.unsplash.com/photo-1500382017468-9049fed747ef"} alt={region.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{region.title}</p>
                      {region.isActive === false && <EyeOff className="w-3 h-3 text-slate-400" />}
                    </div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{(region.featuredListings?.length || 0)} İlan</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 bg-white dark:bg-slate-800 rounded-[3rem] border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col shadow-xl">
            {isAdding || selectedRegion ? (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-8 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        {isAdding ? "Yeni Bölge Oluştur" : `${selectedRegion?.title} Düzenle`}
                      </h2>
                      <p className="text-xs text-slate-500">Bölge detaylarını ve SEO ayarlarını yapılandırın.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {!isAdding && (
                      <>
                        <button 
                          onClick={() => updatePopularRegion(selectedRegion!.id, { isActive: !selectedRegion?.isActive })}
                          className={`p-3 rounded-2xl transition-all ${selectedRegion?.isActive !== false ? 'text-emerald-500 bg-emerald-50' : 'text-slate-400 bg-slate-100'}`}
                          title={selectedRegion?.isActive !== false ? "Aktif" : "Pasif"}
                        >
                          {selectedRegion?.isActive !== false ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </button>
                        <button onClick={() => deletePopularRegion(selectedRegion!.id)} className="p-3 rounded-2xl text-red-500 bg-red-50 hover:scale-105 transition-all">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    <Button onClick={isAdding ? handleAdd : undefined} className="rounded-2xl px-10 h-12 shadow-lg shadow-brand-500/20">
                      <Save className="w-4 h-4 mr-2" /> {isAdding ? "Bölgeyi Kaydet" : "Değişiklikleri Kaydet"}
                    </Button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-10 space-y-10">
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Bölge Adı</label>
                        <input 
                          value={isAdding ? newRegion.title : selectedRegion?.title}
                          onChange={e => isAdding ? setNewRegion({ ...newRegion, title: e.target.value }) : updatePopularRegion(selectedRegion!.id, { title: e.target.value })}
                          placeholder="Örn: Beşiktaş, İstanbul"
                          className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Kısa Açıklama</label>
                        <textarea 
                          value={isAdding ? newRegion.description : selectedRegion?.description}
                          onChange={e => isAdding ? setNewRegion({ ...newRegion, description: e.target.value }) : updatePopularRegion(selectedRegion!.id, { description: e.target.value })}
                          placeholder="Bölge hakkında kısa bir tanıtım yazısı..."
                          className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                          rows={4}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Kapak Görseli</label>
                      <ImageUpload 
                        value={isAdding ? (newRegion.image ? [newRegion.image] : []) : (selectedRegion?.image ? [selectedRegion.image] : [])}
                        onChange={urls => {
                          const url = urls[0] || "";
                          isAdding ? setNewRegion({ ...newRegion, image: url }) : updatePopularRegion(selectedRegion!.id, { image: url });
                        }}
                        onRemove={() => isAdding ? setNewRegion({ ...newRegion, image: "" }) : updatePopularRegion(selectedRegion!.id, { image: "" })}
                        maxFiles={1}
                        bucket="regions"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">SEO İçeriği (HTML Destekli)</label>
                    <textarea 
                      value={isAdding ? newRegion.seoContent : selectedRegion?.seoContent}
                      onChange={e => isAdding ? setNewRegion({ ...newRegion, seoContent: e.target.value }) : updatePopularRegion(selectedRegion!.id, { seoContent: e.target.value })}
                      placeholder="Bölge sayfasına özel SEO metni..."
                      className="w-full p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500 font-mono"
                      rows={6}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-50/30 dark:bg-slate-900/30">
                <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center mb-6 shadow-xl shadow-slate-200/50 dark:shadow-none">
                  <MapPin className="w-10 h-10 opacity-20" />
                </div>
                <p className="font-medium">Düzenlemek veya yeni eklemek için bir bölge seçin.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
