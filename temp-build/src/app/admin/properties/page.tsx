"use client";

import { useState, useMemo, useEffect } from "react";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { PropertyModal } from "@/components/admin/PropertyModal";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { usePropertyStore } from "@/store/propertyStore";
import type { Property } from "@/types/property";
import {
  Search, Star, CheckCircle, XCircle, Trash2, Eye, EyeOff, Plus, Pencil,
  TrendingUp, Users, BarChart3, ArrowUpDown, RefreshCw
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function AdminPropertiesPage() {
  const { properties, deleteProperty, togglePublish, toggleFeatured, setStatus, getTotalViews, resetData } = usePropertyStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState<keyof Property>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalViews = getTotalViews();
  const avgViews = properties.length > 0 ? Math.round(totalViews / properties.length) : 0;
  const totalUniques = properties.reduce((sum, p) => sum + (p.uniqueVisitors || 0), 0);

  const filtered = useMemo(() => {
    return properties
      .filter((p) => {
        const matchSearch =
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.city.toLowerCase().includes(search.toLowerCase()) ||
          p.ownerName.toLowerCase().includes(search.toLowerCase());
        const matchStatus = 
          statusFilter === "all" ? true :
          statusFilter === "featured" ? p.isFeatured :
          p.status === statusFilter;
        return matchSearch && matchStatus;
      })
      .sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (valA === undefined || valB === undefined) return 0;
        if (sortOrder === "asc") return valA > valB ? 1 : -1;
        return valA < valB ? 1 : -1;
      });
  }, [properties, search, statusFilter, sortField, sortOrder]);

  const targetProperty = properties.find((p) => p.id === deleteTarget);

  const toggleSort = (field: keyof Property) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const openAdd = () => { setEditingProperty(null); setModalOpen(true); };
  const openEdit = (p: Property) => { setEditingProperty(p); setModalOpen(true); };

  return (
    <div className="flex flex-col flex-1 overflow-auto bg-slate-100 dark:bg-slate-900">
      <AdminNavbar title="İlan Yönetimi" />
      <div className="p-6">

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {[
            { label: "Toplam İlan", value: properties.length, icon: BarChart3, color: "text-slate-600", bg: "bg-slate-100" },
            { label: "Toplam İzlenme", value: totalViews.toLocaleString("tr-TR"), icon: Eye, color: "text-brand-600", bg: "bg-brand-100" },
            { label: "Tekil Ziyaretçi", value: totalUniques.toLocaleString("tr-TR"), icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
            { label: "Ort. İzlenme", value: avgViews, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-100" },
            { label: "Onay Bekleyen", value: properties.filter(p => p.status === "pending").length, icon: Star, color: "text-amber-600", bg: "bg-amber-100" },
          ].map((s) => (
            <div key={s.label} className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.bg} dark:bg-slate-700 flex-shrink-0`}>
                <s.icon className={`w-5 h-5 ${s.color} dark:text-white`} />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  {mounted ? s.value : "---"}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input placeholder="İlan başlığı, şehir veya kullanıcı ara..." className="pl-11" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-brand-500 outline-none">
            <option value="all">Tüm Durumlar (Hepsi)</option>
            <option value="published">Sadece Yayındakiler</option>
            <option value="featured">Sadece Öne Çıkanlar ⭐</option>
            <option value="pending">Onay Bekleyenler</option>
            <option value="draft">Taslaklar</option>
          </select>
          <div className="flex gap-2">
            <Button onClick={resetData} variant="outline" className="rounded-xl h-12 flex items-center gap-2 border-slate-200 text-slate-600">
              <RefreshCw className="w-4 h-4" /> Verileri Sıfırla
            </Button>
            <Button onClick={openAdd} className="rounded-xl h-12 flex items-center gap-2 flex-shrink-0">
              <Plus className="w-4 h-4" /> Yeni İlan Ekle
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-5 py-4 uppercase tracking-wider">İlan</th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-5 py-4 uppercase tracking-wider">Kategori / Tür</th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-5 py-4 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort("city")}>
                    <div className="flex items-center gap-1">Konum <ArrowUpDown className="w-3 h-3" /></div>
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-5 py-4 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort("price")}>
                    <div className="flex items-center gap-1">Fiyat <ArrowUpDown className="w-3 h-3" /></div>
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-5 py-4 uppercase tracking-wider">Durum</th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-5 py-4 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort("views")}>
                    <div className="flex items-center gap-1 text-brand-600">İstatistik <ArrowUpDown className="w-3 h-3" /></div>
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-5 py-4 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort("createdAt")}>
                    <div className="flex items-center gap-1">Tarih <ArrowUpDown className="w-3 h-3" /></div>
                  </th>
                  <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 px-5 py-4 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {mounted && filtered.map((p) => {
                  const isTrending = p.views > avgViews * 1.5;
                  const categoryLabels: Record<string, string> = { apartment: "Daire", villa: "Villa", house: "Müstakil", office: "Ofis", land: "Arsa" };
                  return (
                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="px-5 py-4 max-w-[240px]">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-slate-900 dark:text-white truncate flex items-center gap-1.5">
                              {p.title}
                            </p>
                            <p className="text-xs text-slate-400">{p.ownerName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-col">
                          <span className="text-slate-900 dark:text-white font-medium capitalize">{categoryLabels[p.category] || p.category}</span>
                          <span className="text-xs text-slate-500">{p.listingType === "Sale" ? "Satılık" : "Kiralık"}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-col">
                          <span className="text-slate-900 dark:text-white">{p.city}</span>
                          <span className="text-xs text-slate-500">{p.district}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                        {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(p.price)}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          p.status === "published" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                          : p.status === "pending" ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                          : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                        }`}>
                          {p.status === "published" ? "Yayında" : p.status === "pending" ? "Bekliyor" : "Taslak"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 dark:text-white">{(p.views || 0).toLocaleString("tr-TR")}</span>
                          <span className="text-[10px] text-slate-400">{(p.uniqueVisitors || 0).toLocaleString("tr-TR")} tekil</span>
                          {isTrending && (
                            <span className="flex items-center gap-0.5 text-[10px] text-emerald-500 font-bold mt-0.5">
                              <TrendingUp className="w-3 h-3" /> TREND
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-500">
                        {new Date(p.createdAt).toLocaleDateString("tr-TR")}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1 justify-end flex-nowrap">
                          <button onClick={() => toggleFeatured(p.id)} title={p.isFeatured ? "Öne çıkarmayı kaldır" : "Öne çıkar"}
                            className={`p-2 rounded-lg transition-colors ${p.isFeatured ? "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20" : "text-slate-400 hover:bg-slate-100"}`}>
                            <Star className={`w-4 h-4 ${p.isFeatured ? "fill-yellow-500" : ""}`} />
                          </button>
                          {p.status === "pending" && (
                            <button onClick={() => setStatus(p.id, "published")} title="Onayla"
                              className="p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-slate-400 hover:text-emerald-600 transition-colors">
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button onClick={() => openEdit(p)} title="Düzenle"
                            className="p-2 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-900/20 text-slate-400 hover:text-brand-600 transition-colors">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => togglePublish(p.id)} title={p.status === "published" ? "Yayından Kaldır" : "Yayınla"}
                            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-brand-600 transition-colors">
                            {p.status === "published" ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button onClick={() => setDeleteTarget(p.id)} title="Sil"
                            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-700 text-sm text-slate-500">
            {filtered.length} / {properties.length} ilan gösteriliyor
          </div>
        </div>
      </div>

      <PropertyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} editingProperty={editingProperty} />

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => { if (deleteTarget) deleteProperty(deleteTarget); }}
        title="İlanı Sil"
        message={`"${targetProperty?.title}" ilanını kalıcı olarak silmek istiyor musunuz?`}
        confirmLabel="Evet, Sil"
        confirmVariant="danger"
      />
    </div>
  );
}
