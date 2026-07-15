"use client";

import { useMemo } from "react";
import { usePropertyStore } from "@/store/propertyStore";
import { useUserStore } from "@/store/userStore";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Home, Users, Eye, TrendingUp, Star, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import Link from "next/link";

function StatCard({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${bg}`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const { properties } = usePropertyStore();
  const { users } = useUserStore();

  const totalViews = properties.reduce((sum, p) => sum + p.views, 0);
  const publishedCount = properties.filter(p => p.status === "published").length;
  const pendingCount = properties.filter(p => p.status === "pending").length;

  // Recent listings (last 5)
  const recentProperties = [...properties].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
  const recentUsers = [...users].sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime()).slice(0, 5);

  // City bar chart data
  const cityData = useMemo(() => {
    const counts: Record<string, number> = {};
    properties.forEach(p => { counts[p.city] = (counts[p.city] ?? 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([city, count]) => ({ city, count }));
  }, [properties]);

  // Growth area chart (last 7 days)
  const growthData = useMemo(() => {
    const days: Record<string, { ilanlar: number; kullanicilar: number }> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toLocaleDateString("tr-TR", { day: "2-digit", month: "short" });
      days[key] = { ilanlar: 0, kullanicilar: 0 };
    }
    properties.forEach(p => {
      const key = new Date(p.createdAt).toLocaleDateString("tr-TR", { day: "2-digit", month: "short" });
      if (days[key]) days[key].ilanlar += 1;
    });
    users.forEach(u => {
      const key = new Date(u.joinedAt).toLocaleDateString("tr-TR", { day: "2-digit", month: "short" });
      if (days[key]) days[key].kullanicilar += 1;
    });
    return Object.entries(days).map(([date, vals]) => ({ date, ...vals }));
  }, [properties, users]);

  return (
    <div className="flex flex-col flex-1 overflow-auto bg-slate-100 dark:bg-slate-900">
      <AdminNavbar title="Dashboard" />
      <div className="p-6 space-y-6">

        {/* KPI */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="Toplam İlan" value={properties.length} icon={Home} color="text-brand-600 dark:text-brand-400" bg="bg-brand-100 dark:bg-brand-900/30" />
          <StatCard label="Yayında" value={publishedCount} icon={CheckCircle} color="text-emerald-600 dark:text-emerald-400" bg="bg-emerald-100 dark:bg-emerald-900/30" />
          <StatCard label="Toplam Kullanıcı" value={users.length} icon={Users} color="text-purple-600 dark:text-purple-400" bg="bg-purple-100 dark:bg-purple-900/30" />
          <StatCard label="Toplam Görüntülenme" value={totalViews.toLocaleString("tr-TR")} icon={Eye} color="text-amber-600 dark:text-amber-400" bg="bg-amber-100 dark:bg-amber-900/30" />
        </div>

        {/* Pending alert */}
        {pendingCount > 0 && (
          <Link href="/admin/properties" className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">{pendingCount} ilan onay bekliyor</span>
            <span className="ml-auto text-sm underline">İncele →</span>
          </Link>
        )}

        {/* Charts row */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-5">Son 7 Gün Büyüme</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
                <Area type="monotone" dataKey="ilanlar" name="İlan" stroke="#3b82f6" fill="url(#g1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-5">Şehirlere Göre İlanlar</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={cityData} barCategoryGap="35%">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="city" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
                <Bar dataKey="count" name="İlan" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Data Tables */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Recent Properties */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white">Son İlanlar</h3>
              <Link href="/admin/properties" className="text-sm text-brand-600 dark:text-brand-400 hover:underline">Tümü →</Link>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {recentProperties.map((p) => (
                <div key={p.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{p.title}</p>
                    <p className="text-xs text-slate-400">{p.city} · {p.ownerName}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                    p.status === "published" ? "bg-emerald-100 text-emerald-700" : p.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"
                  }`}>
                    {p.status === "published" ? "Yayında" : p.status === "pending" ? "Bekliyor" : "Taslak"}
                  </span>
                </div>
              ))}
              {recentProperties.length === 0 && <p className="text-center text-slate-400 text-sm py-6">Henüz ilan yok.</p>}
            </div>
          </div>

          {/* Recent Users */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white">Son Kullanıcılar</h3>
              <Link href="/admin/users" className="text-sm text-brand-600 dark:text-brand-400 hover:underline">Tümü →</Link>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {recentUsers.map((u) => (
                <div key={u.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="w-9 h-9 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold text-sm flex-shrink-0">
                    {u.avatarInitial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{u.name}</p>
                    <p className="text-xs text-slate-400">{u.email}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                    u.role === "admin" ? "bg-red-100 text-red-700" : u.role === "moderator" ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-600"
                  }`}>
                    {u.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
