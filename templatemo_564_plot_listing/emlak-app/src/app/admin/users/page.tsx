"use client";

import { useState } from "react";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { UserModal } from "@/components/admin/UserModal";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { useUserStore, type AppUser } from "@/store/userStore";
import { Search, Plus, Pencil, Trash2, Ban, Shield, UserCheck } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const ROLE_STYLES: Record<string, string> = {
  admin: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
  moderator: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
  user: "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300",
};

const STATUS_STYLES: Record<string, string> = {
  active: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
  banned: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
  inactive: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
};

const STATUS_LABELS: Record<string, string> = { active: "Aktif", banned: "Banlı", inactive: "Pasif" };

export default function AdminUsersPage() {
  const { users, deleteUser, toggleBan, setRole } = useUserStore();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AppUser | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const deleteTargetUser = users.find((u) => u.id === deleteTarget);

  const openAdd = () => { setEditingUser(null); setModalOpen(true); };
  const openEdit = (user: AppUser) => { setEditingUser(user); setModalOpen(true); };

  return (
    <div className="flex flex-col flex-1 overflow-auto bg-slate-100 dark:bg-slate-900">
      <AdminNavbar title="Kullanıcı Yönetimi" />
      <div className="p-6">

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Toplam", value: users.length, color: "text-slate-900 dark:text-white" },
            { label: "Aktif", value: users.filter(u => u.status === "active").length, color: "text-emerald-600" },
            { label: "Moderatör", value: users.filter(u => u.role === "moderator").length, color: "text-purple-600" },
            { label: "Banlı", value: users.filter(u => u.status === "banned").length, color: "text-red-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{s.label} Kullanıcı</p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input placeholder="İsim veya e-posta ara..." className="pl-11" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}
            className="h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-brand-500 outline-none">
            <option value="all">Tüm Roller</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderatör</option>
            <option value="user">Kullanıcı</option>
          </select>
          <Button onClick={openAdd} className="rounded-xl h-12 flex items-center gap-2 flex-shrink-0">
            <Plus className="w-4 h-4" /> Kullanıcı Ekle
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                  {["Kullanıcı", "Rol", "Durum", "İlan", "Katılım", ""].map((h) => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-5 py-4 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold text-sm flex-shrink-0">
                          {user.avatarInitial}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{user.name}</p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                          {user.phone && <p className="text-xs text-slate-400">{user.phone}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <select value={user.role} onChange={(e) => setRole(user.id, e.target.value as any)}
                        className={`text-xs font-medium px-2.5 py-1 rounded-full border-none outline-none cursor-pointer ${ROLE_STYLES[user.role]}`}>
                        <option value="user">user</option>
                        <option value="moderator">moderator</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[user.status]}`}>
                        {STATUS_LABELS[user.status]}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{user.listingCount}</td>
                    <td className="px-5 py-4 text-slate-500 dark:text-slate-400 text-xs">
                      {new Date(user.joinedAt).toLocaleDateString("tr-TR")}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 justify-end">
                        <button onClick={() => openEdit(user)} title="Düzenle"
                          className="p-2 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-900/20 text-slate-400 hover:text-brand-600 transition-colors">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => toggleBan(user.id)} title={user.status === "banned" ? "Banı Kaldır" : "Banla"}
                          className={`p-2 rounded-lg transition-colors ${user.status === "banned" ? "text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20" : "text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20"}`}>
                          {user.status === "banned" ? <UserCheck className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                        </button>
                        <button onClick={() => setDeleteTarget(user.id)} title="Sil"
                          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                      Aramanıza uygun kullanıcı bulunamadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-700 text-sm text-slate-500">
            {filtered.length} kullanıcı gösteriliyor
          </div>
        </div>
      </div>

      <UserModal isOpen={modalOpen} onClose={() => setModalOpen(false)} editingUser={editingUser} />

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => { if (deleteTarget) deleteUser(deleteTarget); }}
        title="Kullanıcıyı Sil"
        message={`"${deleteTargetUser?.name}" kullanıcısını kalıcı olarak silmek istiyor musunuz? Bu kullanıcıya ait tüm veriler silinecektir.`}
        confirmLabel="Evet, Sil"
        confirmVariant="danger"
      />
    </div>
  );
}
