"use client";

import { useCMSStore } from "@/store/cmsStore";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, HelpCircle, Search } from "lucide-react";

function FAQItem({ item }: { item: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
      >
        <span className="font-bold text-slate-900 dark:text-white md:text-lg">{item.question}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-8 pb-8 text-slate-600 dark:text-slate-400 leading-relaxed">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const { faqs } = useCMSStore();
  const [search, setSearch] = useState("");

  const filteredFaqs = faqs.filter(f => 
    f.question.toLowerCase().includes(search.toLowerCase()) || 
    f.answer.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(new Set(faqs.map(f => f.category)));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Sıkça Sorulanlar
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 dark:text-slate-400 mb-8"
          >
            Aklınıza takılan soruların yanıtlarını burada bulabilirsiniz.
          </motion.p>

          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Sorularınızda arayın..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 pl-12 pr-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-brand-500 shadow-lg shadow-slate-200/50 dark:shadow-none"
            />
          </div>
        </div>

        {faqs.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-[3rem] border border-slate-100 dark:border-slate-700">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">Henüz soru eklenmemiş.</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-12">
            {categories.map(cat => {
              const catFaqs = filteredFaqs.filter(f => f.category === cat);
              if (catFaqs.length === 0) return null;

              return (
                <div key={cat} className="space-y-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white px-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-brand-600 rounded-full" /> {cat}
                  </h2>
                  <div className="space-y-4">
                    {catFaqs.map(item => (
                      <FAQItem key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
