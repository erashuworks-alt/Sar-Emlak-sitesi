"use client";

import { useState } from "react";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { Flag, CheckCircle, XCircle } from "lucide-react";

const mockReports = [
  { id: 1, property: "Modern Boğaz Manzaralı Villa", reporter: "Ali Veli", reason: "Yanıltıcı fiyat bilgisi", status: "pending", date: "16 Mayıs 2026" },
  { id: 2, property: "Lüks Rezidans Dairesi", reporter: "Fatma Yıldız", reason: "Sahte fotoğraflar kullanıldı", status: "reviewed", date: "15 Mayıs 2026" },
  { id: 3, property: "Denize Sıfır Yazlık", reporter: "Kemal Doğan", reason: "İletişim bilgileri yanlış", status: "resolved", date: "14 Mayıs 2026" },
  { id: 4, property: "A Sınıfı Ofis", reporter: "Nergis Ay", reason: "Konum bilgisi hatalı", status: "pending", date: "13 Mayıs 2026" },
];

const statusConfig: Record<string, { label: string; style: string }> = {
  pending: { label: "Bekliyor", style: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400" },
  reviewed: { label: "İncelendi", style: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" },
  resolved: { label: "Çözüldü", style: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" },
};

export default function AdminReportsPage() {
  const [reports, setReports] = useState(mockReports);
  const updateStatus = (id: number, status: string) => setReports(r => r.map(rep => rep.id === id ? { ...rep, status } : rep));

  return (
    <div className="flex flex-col flex-1 overflow-auto bg-slate-100 dark:bg-slate-900">
      <AdminNavbar title="Şikayet Yönetimi" />
      <div className="p-6">
        <div className="grid grid-cols-3 gap-5 mb-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 text-center shadow-sm">
            <p className="text-3xl font-bold text-amber-600 mb-1">{reports.filter(r => r.status === "pending").length}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Bekleyen Şikayet</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 text-center shadow-sm">
            <p className="text-3xl font-bold text-blue-600 mb-1">{reports.filter(r => r.status === "reviewed").length}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">İncelenen</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 text-center shadow-sm">
            <p className="text-3xl font-bold text-green-600 mb-1">{reports.filter(r => r.status === "resolved").length}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Çözülen</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                  <th className="text-left text-xs font-semibold text-slate-500 px-6 py-4 uppercase">İlan</th>
                  <th className="text-left text-xs font-semibold text-slate-500 px-6 py-4 uppercase">Şikayet Eden</th>
                  <th className="text-left text-xs font-semibold text-slate-500 px-6 py-4 uppercase">Sebep</th>
                  <th className="text-left text-xs font-semibold text-slate-500 px-6 py-4 uppercase">Durum</th>
                  <th className="text-left text-xs font-semibold text-slate-500 px-6 py-4 uppercase">Tarih</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{report.property}</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{report.reporter}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300 max-w-[200px] truncate">{report.reason}</td>
                    <td className="px-6 py-4"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusConfig[report.status].style}`}>{statusConfig[report.status].label}</span></td>
                    <td className="px-6 py-4 text-xs text-slate-400">{report.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1 justify-end">
                        <button onClick={() => updateStatus(report.id, "reviewed")} title="İncele" className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-400 hover:text-blue-600 transition-colors"><Flag className="w-4 h-4" /></button>
                        <button onClick={() => updateStatus(report.id, "resolved")} title="Çözüldü Olarak İşaretle" className="p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 text-slate-400 hover:text-green-600 transition-colors"><CheckCircle className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
