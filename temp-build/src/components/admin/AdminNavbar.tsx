"use client";

import { Bell, Search, User } from "lucide-react";

interface AdminNavbarProps {
  title: string;
}

export function AdminNavbar({ title }: AdminNavbarProps) {
  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
      <h1 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="h-9 pl-9 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 w-56" placeholder="Ara..." />
        </div>
        <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-sm font-bold">A</div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-slate-900 dark:text-white leading-none">Admin</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Süper Yönetici</p>
          </div>
        </div>
      </div>
    </header>
  );
}
