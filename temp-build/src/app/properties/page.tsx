"use client";

import { Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, Grid, List, X, ArrowUpDown } from "lucide-react";
import { PropertyCard } from "@/components/PropertyCard";
import { FilterSidebar } from "@/components/properties/FilterSidebar";
import { FilterDrawer } from "@/components/properties/FilterDrawer";
import { usePropertyStore, applyFilters } from "@/store/propertyStore";
import { usePropertyFilters } from "@/hooks/usePropertyFilters";
import type { PropertyFilters } from "@/types/property";

const FILTER_BADGE_LABELS: Record<string, Record<string, string>> = {
  type: { Sale: "Satılık", Rent: "Kiralık" },
  category: { apartment: "Daire", villa: "Villa", house: "Ev", office: "Ofis", land: "Arsa" },
  heatingType: { kombi: "Kombi", merkezi: "Merkezi", yerden: "Yerden Isıtma", klima: "Klima", soba: "Soba" },
  balcony: { var: "Balkon Var", yok: "Balkon Yok" },
  balconyType: { acik: "Açık Balkon", kapali: "Kapalı Balkon", fransiz: "Fransız Balkon" },
  insideSite: { evet: "Site İçi", hayir: "Site Dışı" },
  buildingStatus: { sifir: "Sıfır", ikinci_el: "2. El", insaat: "İnşaat" },
  usageStatus: { bos: "Boş", kiralik: "Kiracılı", malik: "Malik Oturuyor" },
  titleDeedStatus: { kat_mulkiyetli: "Kat Mülkiyetli", kat_irtifakli: "Kat İrtifaklı", hisseli: "Hisseli" },
  mortgageEligible: { uygun: "Krediye Uygun", uygun_degil: "Kredisiz" },
  furnishedStatus: { esyali: "Eşyalı", esyasiz: "Eşyasız" },
  listedBy: { sahibinden: "Sahibinden", emlak_ofisi: "Emlak Ofisi", insaat_firmasi: "İnşaat Firması" },
  listingDate: { "24h": "Son 24 Saat", "7d": "Son 7 Gün", "30d": "Son 30 Gün" },
};

function ActiveBadges({ filters, setFilter }: { filters: PropertyFilters; setFilter: any }) {
  const badges: { key: keyof PropertyFilters; label: string }[] = [];

  if (filters.q) badges.push({ key: "q", label: `"${filters.q}"` });
  if (filters.city) badges.push({ key: "city", label: filters.city });
  if (filters.district) badges.push({ key: "district", label: filters.district });
  if (filters.type) badges.push({ key: "type", label: FILTER_BADGE_LABELS.type[filters.type] ?? filters.type });
  if (filters.category) badges.push({ key: "category", label: FILTER_BADGE_LABELS.category[filters.category] ?? filters.category });
  if (filters.minPrice) badges.push({ key: "minPrice", label: `Min ${filters.minPrice.toLocaleString("tr-TR")} ₺` });
  if (filters.maxPrice) badges.push({ key: "maxPrice", label: `Max ${filters.maxPrice.toLocaleString("tr-TR")} ₺` });
  if (filters.minSqm) badges.push({ key: "minSqm", label: `Min ${filters.minSqm} m²` });
  if (filters.maxSqm) badges.push({ key: "maxSqm", label: `Max ${filters.maxSqm} m²` });
  if (filters.rooms?.length) badges.push({ key: "rooms", label: filters.rooms.join(", ") });
  if (filters.heatingType) badges.push({ key: "heatingType", label: FILTER_BADGE_LABELS.heatingType[filters.heatingType] ?? filters.heatingType });
  if (filters.balcony) badges.push({ key: "balcony", label: FILTER_BADGE_LABELS.balcony[filters.balcony] });
  if (filters.insideSite) badges.push({ key: "insideSite", label: FILTER_BADGE_LABELS.insideSite[filters.insideSite] });
  if (filters.buildingStatus) badges.push({ key: "buildingStatus", label: FILTER_BADGE_LABELS.buildingStatus[filters.buildingStatus] });
  if (filters.usageStatus) badges.push({ key: "usageStatus", label: FILTER_BADGE_LABELS.usageStatus[filters.usageStatus] });
  if (filters.titleDeedStatus) badges.push({ key: "titleDeedStatus", label: FILTER_BADGE_LABELS.titleDeedStatus[filters.titleDeedStatus] });
  if (filters.mortgageEligible) badges.push({ key: "mortgageEligible", label: FILTER_BADGE_LABELS.mortgageEligible[filters.mortgageEligible] });
  if (filters.furnishedStatus) badges.push({ key: "furnishedStatus", label: FILTER_BADGE_LABELS.furnishedStatus[filters.furnishedStatus] });
  if (filters.listedBy) badges.push({ key: "listedBy", label: FILTER_BADGE_LABELS.listedBy[filters.listedBy] });
  if (filters.listingDate) badges.push({ key: "listingDate", label: FILTER_BADGE_LABELS.listingDate[filters.listingDate] });

  if (badges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {badges.map(({ key, label }) => (
        <motion.button key={key} layout initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={() => setFilter(key, undefined)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400 text-xs font-medium rounded-full border border-brand-200 dark:border-brand-800 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 hover:border-red-200 transition-all">
          {label} <X className="w-3 h-3" />
        </motion.button>
      ))}
    </div>
  );
}

function PropertiesContent() {
  const { properties } = usePropertyStore();
  const { filters, setFilter, clearAll, activeCount } = usePropertyFilters();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = applyFilters(
    properties.filter(p => p.status === "published"),
    filters
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {filters.city ? `${filters.city} İlanları` : "Tüm İlanlar"}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
              <span className="font-semibold text-brand-600">{filtered.length}</span> ilan bulundu
              {filters.city && ` · ${filters.city}`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Sort */}
            <div className="relative">
              <select value={filters.sort ?? "newest"} onChange={e => setFilter("sort", e.target.value)}
              className="h-10 pl-9 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 outline-none appearance-none">
                <option value="newest">En Yeni</option>
                <option value="price_asc">Fiyat: Düşükten Yükseğe</option>
                <option value="price_desc">Fiyat: Yüksekten Düşüğe</option>
                <option value="most_viewed">En Çok Görüntülenen</option>
              </select>
              <ArrowUpDown className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
            {/* View Mode */}
            <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm border border-slate-200 dark:border-slate-700">
              <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-brand-50 dark:bg-brand-900/30 text-brand-600" : "text-slate-500 dark:text-slate-400"}`}>
                <Grid className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-brand-50 dark:bg-brand-900/30 text-brand-600" : "text-slate-500 dark:text-slate-400"}`}>
                <List className="w-4 h-4" />
              </button>
            </div>
            {/* Mobile filter button */}
            <button onClick={() => setDrawerOpen(true)}
              className="lg:hidden flex items-center gap-2 h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300">
              <SlidersHorizontal className="w-4 h-4" />
              Filtrele
              {activeCount > 0 && <span className="px-1.5 py-0.5 bg-brand-600 text-white text-xs rounded-full">{activeCount}</span>}
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24" style={{ height: "calc(100vh - 7rem)" }}>
              <FilterSidebar filters={filters} setFilter={setFilter} clearAll={clearAll} activeCount={activeCount} />
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <ActiveBadges filters={filters} setFilter={setFilter} />

            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
                  <p className="text-4xl mb-4">🏠</p>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Sonuç bulunamadı</h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-6">Filtrelerinizi genişletmeyi deneyin.</p>
                  <button onClick={clearAll} className="px-6 py-2.5 bg-brand-600 text-white rounded-xl font-medium hover:bg-brand-700 transition-colors">
                    Filtreleri Temizle
                  </button>
                </motion.div>
              ) : (
                <motion.div key="results" layout
                  className={`grid gap-5 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
                  <AnimatePresence>
                    {filtered.map((property, i) => (
                      <motion.div key={property.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: Math.min(i * 0.05, 0.3) }}>
                        <PropertyCard property={property} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <FilterDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}
        filters={filters} setFilter={setFilter} clearAll={clearAll}
        activeCount={activeCount} resultCount={filtered.length} />
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 flex items-center justify-center"><div className="text-slate-400">Yükleniyor...</div></div>}>
      <PropertiesContent />
    </Suspense>
  );
}
