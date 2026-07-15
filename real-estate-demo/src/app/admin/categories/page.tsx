"use client";

import { useState } from "react";
import { useCMSStore } from "@/store/cmsStore";
import { 
  Plus, Pencil, Trash2, GripVertical, CheckCircle, XCircle, 
  Search, Filter, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { motion, AnimatePresence } from "framer-motion";
import type { Category } from "@/types/cms";

export default function AdminCategoriesPage() {
  const { categories, deleteCategory, updateCategory } = useCMSStore();
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = categories.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.slug.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id: string, current: boolean) => {
    updateCategory(id, { isActive: !current });
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Kategori Yönetimi</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">İlan kategorilerini ekleyin, düzenleyin veya sıralayın.</p>
          </div>
          <Button className="rounded-2xl h-12 px-6 flex items-center gap-2 shadow-lg shadow-brand-500/20">
            <Plus className="w-5 h-5" /> Yeni Kategori Ekle
          </Button>
        </div>

        {/* Stats & Search */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Toplam Kategori</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{categories.length}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Aktif</p>
            <p className="text-2xl font-bold text-emerald-500 mt-1">{categories.filter(c => c.isActive).length}</p>
          </div>
          <div className="md:col-span-2 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Kategori ara..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-full pl-12 pr-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-brand-500 outline-none" 
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Kategori</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Slug</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase text-center">İlan Sayısı</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Durum</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                <AnimatePresence mode="popLayout">
                  {filtered.map((cat) => (
                    <motion.tr 
                      key={cat.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="group hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-500" style={{ color: cat.color }}>
                            {/* In a real app we'd map the string to a Lucide icon component */}
                            <span className="text-xl">🏠</span>
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">{cat.name}</p>
                            <p className="text-xs text-slate-500">{cat.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-mono">
                        /{cat.slug}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300">
                          124 İlan
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => toggleStatus(cat.id, cat.isActive)} className="focus:outline-none">
                          {cat.isActive ? (
                            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-full">
                              <CheckCircle className="w-3.5 h-3.5" /> Aktif
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                              <XCircle className="w-3.5 h-3.5" /> Pasif
                            </span>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 transition-colors">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => setDeleteTarget(cat.id)}
                            className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmModal 
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => { if (deleteTarget) deleteCategory(deleteTarget); }}
        title="Kategoriyi Sil"
        message="Bu kategoriyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
      />
    </div>
  );
}
