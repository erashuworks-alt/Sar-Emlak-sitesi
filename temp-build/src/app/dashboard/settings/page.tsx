"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Home, MessageCircle, Settings, LogOut, User, Camera } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

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
                <Link href="/dashboard/messages" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"><MessageCircle className="w-5 h-5" />Mesajlar</Link>
                <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 font-medium"><Settings className="w-5 h-5" />Ayarlar</Link>
              </nav>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
                <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"><LogOut className="w-5 h-5" />Çıkış Yap</Link>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Hesap Ayarları</h1>
            {/* Avatar */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Profil Fotoğrafı</h2>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 relative">
                  <User className="w-12 h-12" />
                  <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center text-white shadow"><Camera className="w-4 h-4" /></button>
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white mb-1">Fotoğrafı Değiştir</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">JPG, PNG, max 5MB</p>
                </div>
              </div>
            </div>
            {/* Personal Info */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Kişisel Bilgiler</h2>
              <form onSubmit={(e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 3000); }} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Ad Soyad</label><Input defaultValue="Ahmet Yılmaz" /></div>
                  <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Telefon</label><Input defaultValue="+90 532 111 2233" type="tel" /></div>
                </div>
                <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">E-posta</label><Input defaultValue="ahmet@example.com" type="email" /></div>
                <div className="flex items-center gap-4">
                  <Button className="rounded-xl px-8" type="submit">Kaydet</Button>
                  {saved && <span className="text-green-600 dark:text-green-400 font-medium text-sm">✓ Değişiklikler kaydedildi!</span>}
                </div>
              </form>
            </div>
            {/* Password */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Şifre Değiştir</h2>
              <div className="space-y-4">
                <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Mevcut Şifre</label><Input type="password" placeholder="••••••••" /></div>
                <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Yeni Şifre</label><Input type="password" placeholder="••••••••" /></div>
                <Button variant="outline" className="rounded-xl px-8">Şifreyi Güncelle</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
