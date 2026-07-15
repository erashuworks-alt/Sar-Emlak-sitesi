"use client";

import Link from "next/link";
import { Heart, Home, MessageCircle, Settings, LogOut, User, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const mockMessages = [
  { id: 1, from: "Selin Arslan", property: "Modern Boğaz Manzaralı Villa", message: "Merhaba, mülkü ne zaman görebiliriz?", time: "14:32", unread: true },
  { id: 2, from: "Mert Demir", property: "Lüks Rezidans Dairesi", message: "Fiyat için pazarlık yapılabilir mi?", time: "11:05", unread: false },
  { id: 3, from: "Elif Kaya", property: "Denize Sıfır Yazlık", message: "Bilgiler için teşekkürler, düşüneceğim.", time: "Dün", unread: false },
];

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 sticky top-28">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-4 text-brand-600"><User className="w-10 h-10" /></div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Ahmet Yılmaz</h2>
              </div>
              <nav className="space-y-2">
                <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"><Home className="w-5 h-5" />İlanlarım</Link>
                <Link href="/dashboard/favorites" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"><Heart className="w-5 h-5" />Favorilerim</Link>
                <Link href="/dashboard/messages" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 font-medium"><MessageCircle className="w-5 h-5" />Mesajlar</Link>
                <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"><Settings className="w-5 h-5" />Ayarlar</Link>
              </nav>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
                <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"><LogOut className="w-5 h-5" />Çıkış Yap</Link>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Mesajlar</h1>
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden">
              {mockMessages.map((msg, i) => (
                <div key={msg.id} className={`flex items-start gap-4 p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${i < mockMessages.length - 1 ? "border-b border-slate-100 dark:border-slate-700" : ""}`}>
                  <div className="w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 font-bold flex-shrink-0">{msg.from[0]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-slate-900 dark:text-white">{msg.from}</span>
                      <span className="text-xs text-slate-400 flex-shrink-0 ml-2">{msg.time}</span>
                    </div>
                    <p className="text-xs text-brand-600 dark:text-brand-400 mb-1">{msg.property}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{msg.message}</p>
                  </div>
                  {msg.unread && <div className="w-2.5 h-2.5 bg-brand-500 rounded-full flex-shrink-0 mt-1"></div>}
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              <Input placeholder="Mesajınızı yazın..." className="flex-1" />
              <Button className="rounded-xl px-6 flex items-center gap-2"><Send className="w-4 h-4" />Gönder</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
