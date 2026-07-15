"use client";

import { useState } from "react";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { Bell, Send, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const sentNotifications = [
  { id: 1, title: "Yeni Özellik: Harita Görünümü", target: "Tüm Kullanıcılar", sent: 12485, read: 9841, date: "15 Mayıs 2026" },
  { id: 2, title: "Bakım Duyurusu - Cumartesi 02:00", target: "Tüm Kullanıcılar", sent: 12485, read: 6200, date: "12 Mayıs 2026" },
  { id: 3, title: "Premium Üyelik Kampanyası", target: "Standart Kullanıcılar", sent: 9800, read: 5100, date: "10 Mayıs 2026" },
];

export default function AdminNotificationsPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState("all");
  const [sent, setSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setTitle(""); setMessage("");
  };

  return (
    <div className="flex flex-col flex-1 overflow-auto bg-slate-100 dark:bg-slate-900">
      <AdminNavbar title="Bildirim Merkezi" />
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Send Form */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Bell className="w-5 h-5 text-brand-500" /> Bildirim Gönder
          </h3>
          <form onSubmit={handleSend} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Başlık</label>
              <Input placeholder="Bildirim başlığı" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Mesaj</label>
              <textarea className="w-full h-28 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 outline-none resize-none" placeholder="Kullanıcılara iletmek istediğiniz mesajı yazın..." value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Hedef Kitle</label>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setTarget("all")} className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${target === "all" ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20 text-brand-600" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"}`}>
                  <Globe className="w-4 h-4" /> Tüm Kullanıcılar
                </button>
                <button type="button" onClick={() => setTarget("users")} className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${target === "users" ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20 text-brand-600" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"}`}>
                  <Users className="w-4 h-4" /> Standart Kullanıcılar
                </button>
              </div>
            </div>
            {sent ? (
              <div className="p-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl text-sm font-medium text-center">✓ Bildirim başarıyla gönderildi!</div>
            ) : (
              <Button className="w-full rounded-xl h-11 flex items-center gap-2" type="submit">
                <Send className="w-4 h-4" /> Bildirimi Gönder
              </Button>
            )}
          </form>
        </div>

        {/* History */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white">Gönderim Geçmişi</h3>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {sentNotifications.map((n) => (
              <div key={n.id} className="p-5 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-medium text-slate-900 dark:text-white text-sm">{n.title}</p>
                  <span className="text-xs text-slate-400 flex-shrink-0 ml-3">{n.date}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{n.target}</p>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>{n.sent.toLocaleString("tr-TR")} gönderildi</span>
                  <span className="text-emerald-600 dark:text-emerald-400">{n.read.toLocaleString("tr-TR")} okundu</span>
                  <span>%{Math.round((n.read / n.sent) * 100)} açılma oranı</span>
                </div>
                <div className="mt-2 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-500 rounded-full" style={{ width: `${Math.round((n.read / n.sent) * 100)}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
