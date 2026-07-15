"use client";

import { useCMSStore } from "@/store/cmsStore";
import { useState } from "react";
import { Save, Plus, Trash2, GripVertical, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminFAQCMS() {
  const { faqs, addFAQ, updateFAQ, deleteFAQ, reorderFAQs } = useCMSStore();
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [newCategory, setNewCategory] = useState("Genel");

  const handleAdd = () => {
    if (!newQuestion || !newAnswer) return;
    addFAQ({
      question: newQuestion,
      answer: newAnswer,
      category: newCategory,
      sortOrder: faqs.length
    });
    setNewQuestion("");
    setNewAnswer("");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Sıkça Sorulanlar (SSS) Yönetimi</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Ziyaretçilerin merak ettiği soruları ve cevapları yönetin.</p>
      </div>

      {/* Add New FAQ */}
      <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <Plus className="w-5 h-5 text-brand-600" /> Yeni Soru Ekle
        </h2>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Soru</label>
              <input 
                value={newQuestion}
                onChange={e => setNewQuestion(e.target.value)}
                placeholder="Örn: Satış süreci nasıl işler?"
                className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Kategori</label>
              <input 
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                placeholder="Örn: Satış, Kiralama, Genel"
                className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Cevap</label>
            <textarea 
              value={newAnswer}
              onChange={e => setNewAnswer(e.target.value)}
              placeholder="Sorunun detaylı cevabını yazın..."
              className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500 resize-none"
              rows={3}
            />
          </div>
          <Button onClick={handleAdd} className="w-full rounded-xl h-11 font-bold">
            <Plus className="w-4 h-4 mr-2" /> Ekle
          </Button>
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-2">Mevcut Sorular ({faqs.length})</h2>
        {faqs.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 text-slate-400">
            <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-10" />
            <p>Henüz soru eklenmedi.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm group">
                <div className="flex items-start gap-4">
                  <div className="mt-1 cursor-move text-slate-300">
                    <GripVertical className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <input 
                        value={faq.question}
                        onChange={e => updateFAQ(faq.id, { question: e.target.value })}
                        className="flex-1 font-bold text-slate-900 dark:text-white bg-transparent border-none p-0 outline-none focus:ring-0"
                      />
                      <button onClick={() => deleteFAQ(faq.id)} className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-xl">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <textarea 
                      value={faq.answer}
                      onChange={e => updateFAQ(faq.id, { answer: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                      rows={2}
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kategori:</span>
                      <input 
                        value={faq.category}
                        onChange={e => updateFAQ(faq.id, { category: e.target.value })}
                        className="text-[10px] font-bold text-brand-600 bg-brand-50 dark:bg-brand-900/30 px-2 py-0.5 rounded-full outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
