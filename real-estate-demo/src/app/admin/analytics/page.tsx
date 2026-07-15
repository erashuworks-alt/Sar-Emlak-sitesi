"use client";

import { useMemo, useState, useEffect } from "react";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { usePropertyStore } from "@/store/propertyStore";
import { useUserStore } from "@/store/userStore";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { 
  TrendingUp, Users, Home, Eye, Star, DollarSign, 
  ArrowUpRight, ArrowDownRight, Activity, Zap, 
  MousePointer2, Globe
} from "lucide-react";
import { motion } from "framer-motion";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

function StatCard({ label, value, icon: Icon, color, sub, trend }: { label: string; value: string | number; icon: any; color: string; sub?: string; trend?: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-bold ${trend > 0 ? "text-emerald-500" : "text-red-500"}`}>
            {trend > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="relative z-10">
        <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
      </div>
      {/* Decorative background shape */}
      <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-5 ${color}`}></div>
    </motion.div>
  );
}

export default function AdminAnalyticsPage() {
  const { properties, getTotalViews, getMostViewed, getTrendingProperties } = usePropertyStore();
  const { users } = useUserStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalViews = getTotalViews();
  const mostViewed = getMostViewed(5);
  const trending = getTrendingProperties(5);
  const publishedCount = properties.filter(p => p.status === "published").length;
  const activeUsers = users.filter(u => u.status === "active").length;
  const totalUniques = properties.reduce((sum, p) => sum + (p.uniqueVisitors || 0), 0);

  // ── Category distribution ─────────────────────────────────────────
  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {};
    properties.forEach(p => { counts[p.category] = (counts[p.category] ?? 0) + 1; });
    const labels: Record<string, string> = { apartment: "Daire", villa: "Villa", house: "Ev", office: "Ofis", land: "Arsa" };
    return Object.entries(counts).map(([key, value]) => ({ name: labels[key] ?? key, value }));
  }, [properties]);

  // ── Growth Data ───────────────────────────────────────────────────────────
  const growthData = useMemo(() => {
    const days: Record<string, { views: number; listings: number }> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toLocaleDateString("tr-TR", { day: "2-digit", month: "short" });
      days[key] = { views: 0, listings: 0 };
    }
    // Simulate daily views for the chart based on total
    const totalV = totalViews || 5000;
    Object.keys(days).forEach((key, idx) => {
      days[key].views = Math.floor((totalV / 7) * (0.8 + Math.random() * 0.4));
      days[key].listings = properties.filter(p => new Date(p.createdAt).toLocaleDateString("tr-TR", { day: "2-digit", month: "short" }) === key).length;
    });
    return Object.entries(days).map(([date, vals]) => ({ date, ...vals }));
  }, [properties, totalViews]);

  return (
    <div className="flex flex-col flex-1 overflow-auto bg-slate-100 dark:bg-slate-900">
      <AdminNavbar title="Analizler & Performans" />
      <div className="p-6 space-y-6">

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard label="Toplam Görüntülenme" value={mounted ? totalViews.toLocaleString("tr-TR") : "---"} icon={Eye} color="bg-brand-600" trend={12} />
          <StatCard label="Tekil Ziyaretçi" value={mounted ? totalUniques.toLocaleString("tr-TR") : "---"} icon={Users} color="bg-purple-600" trend={8} />
          <StatCard label="Yayındaki İlan" value={mounted ? publishedCount : "---"} icon={Home} color="bg-emerald-600" trend={5} />
          <StatCard label="Aktif Kullanıcı" value={mounted ? activeUsers : "---"} icon={Zap} color="bg-blue-600" trend={-2} />
          <StatCard label="Etkileşim Oranı" value={mounted ? "%4.8" : "---"} icon={Activity} color="bg-amber-600" sub="Tıklama / Görüntü" />
          <StatCard label="Global Sıralama" value={mounted ? "#124" : "---"} icon={Globe} color="bg-indigo-600" sub="Emlak Siteleri Arası" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 xl:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">İstatistiksel Görünüm</h3>
              <select className="bg-slate-50 dark:bg-slate-900 border-none text-xs font-medium rounded-lg px-3 py-1.5 focus:ring-0">
                <option>Son 7 Gün</option>
                <option>Son 30 Gün</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <Tooltip 
                  contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                  itemStyle={{ fontSize: "12px", fontWeight: "600" }}
                />
                <Area type="monotone" dataKey="views" name="Görüntülenme" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Category Dist */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Kategori Dağılımı</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie 
                  data={categoryData} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={60} 
                  outerRadius={80} 
                  paddingAngle={5}
                >
                  {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {categoryData.slice(0, 3).map((item, i) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-500">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                    {item.name}
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white">{item.value} ilan</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Most Viewed Listings */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">En Çok Görüntülenenler</h3>
              <MousePointer2 className="w-5 h-5 text-slate-400" />
            </div>
            <div className="space-y-4">
              {mostViewed.map((p, i) => (
                <div key={p.id} className="flex items-center gap-4 group cursor-pointer">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={p.images[0]} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 dark:text-white truncate">{p.title}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(p.views / mostViewed[0].views) * 100}%` }}
                          className="h-full bg-brand-500 rounded-full"
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-500">{(p.views || 0).toLocaleString("tr-TR")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Listings */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Trend İlanlar</h3>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="space-y-4">
              {trending.map((p) => (
                <div key={p.id} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 dark:text-white truncate">{p.title}</p>
                    <p className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> 
                      Hızlı Yükseliş · {p.city}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900 dark:text-white text-sm">%{Math.floor(Math.random() * 40 + 20)}</p>
                    <p className="text-[10px] text-slate-400">ilgi artışı</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
