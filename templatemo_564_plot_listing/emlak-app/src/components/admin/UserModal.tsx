"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Phone, Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useUserStore, type AppUser, type UserRole } from "@/store/userStore";

const schema = z.object({
  name: z.string().min(3, "Ad en az 3 karakter olmalı"),
  email: z.string().email("Geçerli e-posta giriniz"),
  phone: z.string().optional(),
  role: z.enum(["admin", "moderator", "user"]),
  status: z.enum(["active", "banned", "inactive"]),
  password: z.string().min(6, "Şifre en az 6 karakter olmalı").optional().or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingUser?: AppUser | null;
}

export function UserModal({ isOpen, onClose, editingUser }: UserModalProps) {
  const { addUser, updateUser } = useUserStore();
  const isEdit = !!editingUser;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: editingUser
      ? { name: editingUser.name, email: editingUser.email, phone: editingUser.phone ?? "", role: editingUser.role, status: editingUser.status }
      : { role: "user", status: "active" },
  });

  const onSubmit = (data: FormData) => {
    if (isEdit && editingUser) {
      updateUser(editingUser.id, data);
    } else {
      addUser(data);
    }
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {isEdit ? "Kullanıcıyı Düzenle" : "Yeni Kullanıcı Ekle"}
              </h3>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Ad Soyad</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <Input {...register("name")} placeholder="Ad Soyad" className="pl-11" />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">E-posta</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <Input {...register("email")} type="email" placeholder="ornek@email.com" className="pl-11" />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Telefon (İsteğe Bağlı)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <Input {...register("phone")} placeholder="+90 5xx xxx xxxx" className="pl-11" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Rol</label>
                  <div className="relative">
                    <Shield className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select {...register("role")} className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 outline-none">
                      <option value="user">Kullanıcı</option>
                      <option value="moderator">Moderatör</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Durum</label>
                  <select {...register("status")} className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 outline-none">
                    <option value="active">Aktif</option>
                    <option value="banned">Banlı</option>
                    <option value="inactive">Pasif</option>
                  </select>
                </div>
              </div>
              {!isEdit && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Şifre</label>
                  <div className="relative">
                    <Shield className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input {...register("password")} type="password" placeholder="••••••••" className="pl-11" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Yeni kullanıcının giriş yapabilmesi için bir şifre belirleyin.</p>
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-xl">İptal</Button>
                <Button type="submit" className="flex-1 rounded-xl">{isEdit ? "Güncelle" : "Kullanıcı Ekle"}</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
