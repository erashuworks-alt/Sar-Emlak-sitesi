"use client";

import { useCMSStore } from "@/store/cmsStore";
import { useState } from "react";
import { Mail, Search, Trash2, CheckCircle, Clock, Phone, User, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

export default function AdminMessagesPage() {
  const { messages, markMessageAsRead, deleteMessage } = useCMSStore();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = messages.filter(m => {
    const matchesSearch = m.fullName.toLowerCase().includes(search.toLowerCase()) || 
                         m.subject.toLowerCase().includes(search.toLowerCase()) || 
                         m.message.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" ? true : filter === "unread" ? !m.isRead : m.isRead;
    return matchesSearch && matchesFilter;
  });

  const selectedMessage = messages.find(m => m.id === selectedId);

  return (
    <div className="p-6 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Gelen Mesajlar</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Ziyaretçilerden gelen tüm iletişim talepleri.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-brand-50 dark:bg-brand-900/30 text-brand-600 text-xs font-bold rounded-full">
            {messages.filter(m => !m.isRead).length} Yeni Mesaj
          </span>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Inbox List */}
        <div className="w-96 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-700 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                placeholder="Mesajlarda ara..." 
                className="w-full h-10 pl-9 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs outline-none focus:ring-2 focus:ring-brand-500"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {["all", "unread", "read"].map((f) => (
                <button 
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg border transition-all ${filter === f ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white' : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-400'}`}
                >
                  {f === "all" ? "Tümü" : f === "unread" ? "Okunmamış" : "Okunmuş"}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-700/50">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm">Mesaj bulunamadı.</div>
            ) : (
              filtered.map(m => (
                <button 
                  key={m.id}
                  onClick={() => {
                    setSelectedId(m.id);
                    markMessageAsRead(m.id);
                  }}
                  className={`w-full p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors relative ${selectedId === m.id ? 'bg-brand-50 dark:bg-brand-900/10' : ''}`}
                >
                  {!m.isRead && <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-brand-600 rounded-full" />}
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-sm font-bold ${m.isRead ? 'text-slate-600 dark:text-slate-300' : 'text-slate-900 dark:text-white'}`}>
                      {m.fullName}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {format(new Date(m.createdAt), "HH:mm")}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mb-1 line-clamp-1">{m.subject}</div>
                  <div className="text-xs text-slate-400 line-clamp-2">{m.message}</div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="flex-1 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col">
          {selectedMessage ? (
            <>
              <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center text-white text-xl font-bold">
                    {selectedMessage.fullName[0]}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">{selectedMessage.fullName}</h2>
                    <p className="text-xs text-slate-500">{selectedMessage.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => deleteMessage(selectedMessage.id)} className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-6 mb-8 text-sm">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock className="w-4 h-4" />
                      {format(new Date(selectedMessage.createdAt), "dd MMMM yyyy, HH:mm", { locale: tr })}
                    </div>
                    {selectedMessage.phone && (
                      <div className="flex items-center gap-2 text-slate-500">
                        <Phone className="w-4 h-4" />
                        {selectedMessage.phone}
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Konu</h3>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">{selectedMessage.subject}</p>
                  </div>

                  {selectedMessage.propertyId && (
                    <div className="mb-8 p-4 bg-brand-50 dark:bg-brand-900/10 rounded-2xl border border-brand-100 dark:border-brand-900/20">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-4 h-4 text-brand-600" />
                        <span className="text-xs font-bold text-brand-700 dark:text-brand-400">
                          İlan No: {selectedMessage.propertyId} ile ilgili mesaj.
                        </span>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Mesaj</h3>
                    <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedMessage.message}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
              <Mail className="w-16 h-16 mb-4 opacity-10" />
              <p>Görüntülemek için bir mesaj seçin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
