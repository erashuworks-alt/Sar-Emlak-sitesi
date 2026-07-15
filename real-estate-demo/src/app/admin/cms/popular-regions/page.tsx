"use client";

import { useCMSStore } from "@/store/cmsStore";
import { usePropertyStore } from "@/store/propertyStore";
import { useState } from "react";
import { Save, Plus, Trash2, MapPin, Search, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ImageUpload } from "@/components/admin/ImageUpload";

export default function AdminPopularRegionsCMS() {
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
    featuredListings: [] as string[]
  });

  const handleAdd = () => {
    addPopularRegion({
      ...newRegion,
      slug: newRegion.title.toLowerCase().replace(/\s+/g, "-"),
      isActive: true,
      sortOrder: popularRegions.length
    });
    setNewRegion({ title: "", slug: "", image: "", description: "", seoContent: "", featuredListings: [] });
    setIsAdding(false);
  };

  const selectedRegion = popularRegions.find((r: any) => r.id === selectedRegionId);

  return (
    <div className="p-6 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Popüler Bölgeler Yönetimi</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Öne çıkarmak istediğiniz bölgeleri ve bu bölgelerdeki ilanları yönetin.</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="rounded-xl px-6">
          <Plus className="w-4 h-4 mr-2" /> Yeni Bölge Ekle
        </Button>
      </div>

      <div className="flex-1 flex gap-8 overflow-hidden">
        {/* Regions List */}
        <div className="w-80 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Bölgeler ({popularRegions.length})</h2>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-700/50">
            {popularRegions.map((region: any) => (
              <button 
                key={region.id}
                onClick={() => setSelectedRegionId(region.id)}
                className={`w-full p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex items-center gap-4 ${selectedRegionId === region.id ? 'bg-brand-50 dark:bg-brand-900/10 border-r-4 border-brand-600' : ''}`}
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img src={region.image} alt={region.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{region.title}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-tighter">{(region.featuredListings?.length || 0)} İlan Seçildi</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Region Editor */}
        <div className="flex-1 bg-white dark:bg-slate-800 rounded-[3rem] border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col">
          {isAdding || selectedRegion ? (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isAdding ? "Yeni Bölge Ekle" : `${selectedRegion?.title} Düzenle`}
                </h2>
                <div className="flex items-center gap-2">
                  {!isAdding && (
                    <button onClick={() => deletePopularRegion(selectedRegion!.id)} className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                  <Button onClick={isAdding ? handleAdd : undefined} className="rounded-xl px-6">
                    <Save className="w-4 h-4 mr-2" /> {isAdding ? "Ekle" : "Değişiklikleri Kaydet"}
                  </Button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Bölge Adı</label>
                      <input 
                        value={isAdding ? newRegion.title : selectedRegion?.title}
                        onChange={e => isAdding ? setNewRegion({ ...newRegion, title: e.target.value }) : updatePopularRegion(selectedRegion!.id, { title: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Kısa Açıklama</label>
                      <textarea 
                        value={isAdding ? newRegion.description : selectedRegion?.description}
                        onChange={e => isAdding ? setNewRegion({ ...newRegion, description: e.target.value }) : updatePopularRegion(selectedRegion!.id, { description: e.target.value })}
                        className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                        rows={4}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Bölge Görseli</label>
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
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">SEO İçeriği (HTML Destekli)</label>
                  <textarea 
                    value={isAdding ? newRegion.seoContent : selectedRegion?.seoContent}
                    onChange={e => isAdding ? setNewRegion({ ...newRegion, seoContent: e.target.value }) : updatePopularRegion(selectedRegion!.id, { seoContent: e.target.value })}
                    className="w-full p-6 rounded-[2rem] border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500 font-mono"
                    rows={6}
                  />
                </div>

                {/* Featured Listings Selector */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Bu Bölgedeki Öne Çıkan İlanlar</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-64 overflow-y-auto p-1 border border-slate-100 dark:border-slate-800 rounded-2xl">
                    {properties.map((p: any) => {
                      const isSelected = isAdding ? newRegion.featuredListings.includes(p.id) : selectedRegion?.featuredListings?.includes(p.id);
                      return (
                        <button 
                          key={p.id}
                          onClick={() => {
                            if (isAdding) {
                              const next = isSelected ? newRegion.featuredListings.filter((id: string) => id !== p.id) : [...newRegion.featuredListings, p.id];
                              setNewRegion({ ...newRegion, featuredListings: next });
                            } else {
                              const cur = selectedRegion?.featuredListings || [];
                              const next = isSelected ? cur.filter((id: string) => id !== p.id) : [...cur, p.id];
                              updatePopularRegion(selectedRegion!.id, { featuredListings: next });
                            }
                          }}
                          className={`flex items-center gap-3 p-3 rounded-2xl border transition-all text-left ${isSelected ? 'bg-brand-50 dark:bg-brand-900/20 border-brand-200 dark:border-brand-800' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700'}`}
                        >
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100">
                            <img src={p.images[0]} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-slate-900 dark:text-white truncate">{p.title}</p>
                            <p className="text-[9px] text-slate-400 truncate">{p.district}, {p.city}</p>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-brand-600" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
              <MapPin className="w-16 h-16 mb-4 opacity-10" />
              <p>Görüntülemek veya yeni eklemek için bir bölge seçin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
