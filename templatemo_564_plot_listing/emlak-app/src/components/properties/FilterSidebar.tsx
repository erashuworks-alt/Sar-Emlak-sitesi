"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import type { PropertyFilters } from "@/types/property";

const CITIES = ["İstanbul", "Ankara", "İzmir", "Antalya", "Bursa", "Adana", "Konya", "Gaziantep", "Mersin", "Kayseri"];
const ROOMS = ["Stüdyo", "1+0", "1+1", "2+1", "3+1", "3+2", "4+1", "4+2", "5+1", "5+2", "6+"];

interface AccordionProps { title: string; children: React.ReactNode; defaultOpen?: boolean; }
function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-100 dark:border-slate-700/60 last:border-0">
      <button onClick={() => setOpen(v => !v)}
        className="flex items-center justify-between w-full py-2.5 text-xs font-extrabold text-slate-900 dark:text-slate-200 uppercase tracking-wider hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
        {title}
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="pb-3 space-y-1.5">{children}</div>}
    </div>
  );
}

const selectCls = "w-full h-9 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-brand-500 outline-none shadow-sm";
const inputCls = "w-full h-9 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs outline-none focus:ring-2 focus:ring-brand-500 shadow-sm";

interface Opt { value: string; label: string; }
function Sel({ label, opts, value, onChange }: { label: string; opts: Opt[]; value?: string; onChange: (v: string | undefined) => void }) {
  return (
    <select value={value ?? ""} onChange={e => onChange(e.target.value || undefined)} className={selectCls}>
      <option value="">{label}</option>
      {opts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

interface FilterSidebarProps {
  filters: PropertyFilters;
  setFilter: (key: keyof PropertyFilters, value: any) => void;
  clearAll: () => void;
  activeCount: number;
}

export function FilterSidebar({ filters, setFilter, clearAll, activeCount }: FilterSidebarProps) {
  const toggleRoom = (room: string) => {
    const cur = filters.rooms ?? [];
    const next = cur.includes(room) ? cur.filter(r => r !== room) : [...cur, room];
    setFilter("rooms", next.length ? next : undefined);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700 flex-shrink-0">
        <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
          Filtreler
          {activeCount > 0 && <span className="px-1.5 py-0.5 bg-brand-600 text-white text-[10px] rounded-full leading-none">{activeCount}</span>}
        </span>
        {activeCount > 0 && (
          <button onClick={clearAll} className="flex items-center gap-1 text-[11px] text-red-500 hover:text-red-700 transition-colors font-medium">
            <X className="w-3 h-3" /> Temizle
          </button>
        )}
      </div>

      {/* Scrollable body */}
      <div className="overflow-y-auto flex-1 px-4 py-2 divide-y divide-slate-100 dark:divide-slate-700/60"
        style={{ scrollbarWidth: "thin" }}>

        {/* İşlem Tipi */}
        <Accordion title="İşlem Tipi" defaultOpen>
          <div className="grid grid-cols-3 gap-1">
            {[{ v: "", l: "Tümü" }, { v: "Sale", l: "Satılık" }, { v: "Rent", l: "Kiralık" }].map(({ v, l }) => (
              <button key={v} onClick={() => setFilter("type", v || undefined)}
                className={`py-1.5 text-[11px] rounded-lg border transition-all font-bold ${(filters.type ?? "") === v ? "bg-brand-600 text-white border-brand-600 shadow-sm" : "border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300 hover:border-brand-400 bg-slate-50 dark:bg-slate-800/50"}`}>
                {l}
              </button>
            ))}
          </div>
        </Accordion>

        {/* Emlak Tipi */}
        <Accordion title="Emlak Tipi" defaultOpen>
          <Sel label="Tüm tipler" value={filters.category} onChange={v => setFilter("category", v)}
            opts={[{ value: "apartment", label: "Daire" }, { value: "villa", label: "Villa" }, { value: "house", label: "Müstakil Ev" }, { value: "office", label: "Ofis" }, { value: "land", label: "Arsa" }]} />
        </Accordion>

        {/* Konum */}
        <Accordion title="Konum" defaultOpen>
          <Sel label="Şehir seçin..." value={filters.city} onChange={v => setFilter("city", v)}
            opts={CITIES.map(c => ({ value: c, label: c }))} />
          {filters.city && (
            <input value={filters.district ?? ""} onChange={e => setFilter("district", e.target.value || undefined)}
              placeholder="İlçe girin..." className={inputCls} />
          )}
          {filters.district && (
            <input value={filters.neighborhood ?? ""} onChange={e => setFilter("neighborhood", e.target.value || undefined)}
              placeholder="Mahalle girin..." className={inputCls} />
          )}
        </Accordion>

        {/* Fiyat */}
        <Accordion title="Fiyat (₺)" defaultOpen>
          <div className="flex items-center gap-1.5">
            <input type="number" value={filters.minPrice ?? ""} onChange={e => setFilter("minPrice", Number(e.target.value) || undefined)}
              placeholder="Min" className={inputCls} />
            <span className="text-slate-400 dark:text-slate-500 text-xs">—</span>
            <input type="number" value={filters.maxPrice ?? ""} onChange={e => setFilter("maxPrice", Number(e.target.value) || undefined)}
              placeholder="Max" className={inputCls} />
          </div>
        </Accordion>

        {/* Oda */}
        <Accordion title="Oda Sayısı">
          <div className="flex flex-wrap gap-1">
            {ROOMS.map(r => (
              <button key={r} onClick={() => toggleRoom(r)}
                className={`px-2.5 py-1 text-[11px] rounded-lg border transition-all font-bold ${(filters.rooms ?? []).includes(r) ? "bg-brand-600 text-white border-brand-600 shadow-sm" : "border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300 hover:border-brand-400 bg-slate-50 dark:bg-slate-800/50"}`}>
                {r}
              </button>
            ))}
          </div>
        </Accordion>

        {/* m² */}
        <Accordion title="Alan (m²)">
          <div className="flex items-center gap-1.5">
            <input type="number" value={filters.minSqm ?? ""} onChange={e => setFilter("minSqm", Number(e.target.value) || undefined)}
              placeholder="Min m²" className={inputCls} />
            <span className="text-slate-400 dark:text-slate-500 text-xs">—</span>
            <input type="number" value={filters.maxSqm ?? ""} onChange={e => setFilter("maxSqm", Number(e.target.value) || undefined)}
              placeholder="Max m²" className={inputCls} />
          </div>
        </Accordion>

        {/* Bina Özellikleri */}
        <Accordion title="Bina Özellikleri">
          <Sel label="Isıtma Tipi" value={filters.heatingType} onChange={v => setFilter("heatingType", v)}
            opts={[{ value: "kombi", label: "Kombi Doğalgaz" }, { value: "merkezi", label: "Merkezi Sistem" }, { value: "yerden", label: "Yerden Isıtma" }, { value: "klima", label: "Klima" }, { value: "soba", label: "Soba" }, { value: "yok", label: "Yok" }]} />
          <Sel label="Balkon" value={filters.balcony} onChange={v => setFilter("balcony", v)}
            opts={[{ value: "var", label: "Var" }, { value: "yok", label: "Yok" }]} />
          {filters.balcony === "var" && (
            <Sel label="Balkon Tipi" value={filters.balconyType} onChange={v => setFilter("balconyType", v)}
              opts={[{ value: "acik", label: "Açık" }, { value: "kapali", label: "Kapalı" }, { value: "fransiz", label: "Fransız" }]} />
          )}
          <Sel label="Site İçerisinde" value={filters.insideSite} onChange={v => setFilter("insideSite", v)}
            opts={[{ value: "evet", label: "Evet" }, { value: "hayir", label: "Hayır" }]} />
        </Accordion>

        {/* Otopark */}
        <Accordion title="Otopark">
          <Sel label="Otopark Durumu" value={filters.parkingType} onChange={v => setFilter("parkingType", v)}
            opts={[{ value: "acik", label: "Açık Otopark" }, { value: "kapali", label: "Kapalı Otopark" }, { value: "yok", label: "Otopark Yok" }]} />
          <Sel label="Site Otoparkı" value={filters.siteParking} onChange={v => setFilter("siteParking", v)}
            opts={[{ value: "evet", label: "Var" }, { value: "hayir", label: "Yok" }]} />
          <Sel label="Bina Otoparkı" value={filters.buildingParking} onChange={v => setFilter("buildingParking", v)}
            opts={[{ value: "evet", label: "Var" }, { value: "hayir", label: "Yok" }]} />
        </Accordion>

        {/* Mülk Durumu */}
        <Accordion title="Mülk Durumu">
          <div className="flex items-center gap-1.5 mb-2">
            <input type="number" value={filters.minBuildingAge ?? ""} onChange={e => setFilter("minBuildingAge", Number(e.target.value) || undefined)}
              placeholder="Min Yaş" className={inputCls} />
            <span className="text-slate-400 dark:text-slate-500 text-xs">—</span>
            <input type="number" value={filters.maxBuildingAge ?? ""} onChange={e => setFilter("maxBuildingAge", Number(e.target.value) || undefined)}
              placeholder="Max Yaş" className={inputCls} />
          </div>
          <Sel label="Kullanım Durumu" value={filters.usageStatus} onChange={v => setFilter("usageStatus", v)}
            opts={[{ value: "bos", label: "Boş" }, { value: "kiralik", label: "Kiracılı" }, { value: "malik", label: "Mülk Sahibi Oturuyor" }]} />
          <Sel label="Tapu Durumu" value={filters.titleDeedStatus} onChange={v => setFilter("titleDeedStatus", v)}
            opts={[{ value: "kat_mulkiyetli", label: "Kat Mülkiyetli" }, { value: "kat_irtifakli", label: "Kat İrtifaklı" }, { value: "hisseli", label: "Hisseli Tapu" }]} />
          <Sel label="Krediye Uygunluk" value={filters.mortgageEligible} onChange={v => setFilter("mortgageEligible", v)}
            opts={[{ value: "uygun", label: "Uygun" }, { value: "uygun_degil", label: "Uygun Değil" }]} />
          <Sel label="Eşya Durumu" value={filters.furnishedStatus} onChange={v => setFilter("furnishedStatus", v)}
            opts={[{ value: "esyali", label: "Eşyalı" }, { value: "esyasiz", label: "Eşyasız" }]} />
        </Accordion>

        {/* İlan Detayları */}
        <Accordion title="İlan Detayları">
          <Sel label="İlan Tarihi" value={filters.listingDate} onChange={v => setFilter("listingDate", v)}
            opts={[{ value: "24h", label: "Son 24 Saat" }, { value: "7d", label: "Son 7 Gün" }, { value: "30d", label: "Son 30 Gün" }]} />
        </Accordion>
      </div>
    </div>
  );
}
