"use client";

import Link from "next/link";
import { Heart, Home, MessageCircle, Settings, LogOut, User } from "lucide-react";
import { PropertyCard } from "@/components/PropertyCard";

const favProperties = [
  { id: "1", title: "Modern Boğaz Manzaralı Villa", price: 15000000, city: "İstanbul", district: "Sarıyer", roomCount: "5+2", bathrooms: 4, squareMeters: 450, listingType: "Sale" as const, images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"] },
  { id: "2", title: "Denize Sıfır Yazlık", price: 8500000, city: "İzmir", district: "Çeşme", roomCount: "4+1", bathrooms: 3, squareMeters: 280, listingType: "Sale" as const, images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"] },
];

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 sticky top-28">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-4 text-brand-600"><User className="w-10 h-10" /></div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Ahmet Yılmaz</h2>
                <p className="text-slate-500 text-sm">ahmet@example.com</p>
              </div>
              <nav className="space-y-2">
                <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"><Home className="w-5 h-5" />İlanlarım</Link>
                <Link href="/dashboard/favorites" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 font-medium"><Heart className="w-5 h-5" />Favorilerim</Link>
                <Link href="/dashboard/messages" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"><MessageCircle className="w-5 h-5" />Mesajlar</Link>
                <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"><Settings className="w-5 h-5" />Ayarlar</Link>
              </nav>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
                <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"><LogOut className="w-5 h-5" />Çıkış Yap</Link>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Favorilerim ({favProperties.length})</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {favProperties.map(p => <PropertyCard key={p.id} property={p as any} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
