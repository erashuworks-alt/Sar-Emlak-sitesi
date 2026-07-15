"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal } from "lucide-react";
import { FilterSidebar } from "./FilterSidebar";
import type { PropertyFilters } from "@/types/property";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: PropertyFilters;
  setFilter: (key: keyof PropertyFilters, value: any) => void;
  clearAll: () => void;
  activeCount: number;
  resultCount: number;
}

export function FilterDrawer({ isOpen, onClose, filters, setFilter, clearAll, activeCount, resultCount }: FilterDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] lg:hidden" />
          <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "tween", duration: 0.3 }}
            className="fixed left-0 top-0 bottom-0 w-[320px] bg-slate-50 dark:bg-slate-900 z-[101] flex flex-col shadow-2xl lg:hidden overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-brand-600" />
                <span className="font-bold text-slate-900 dark:text-white">Filtreler</span>
                {activeCount > 0 && <span className="px-2 py-0.5 bg-brand-600 text-white text-xs rounded-full">{activeCount}</span>}
              </div>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              <FilterSidebar filters={filters} setFilter={setFilter} clearAll={clearAll} activeCount={activeCount} />
            </div>
            <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
              <button onClick={onClose}
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-2xl transition-colors">
                {resultCount} Sonucu Göster
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
