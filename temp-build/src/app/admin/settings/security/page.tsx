"use client";

import { useState } from "react";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { Shield, Lock, Key, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { supabase } from "@/lib/supabase";

export default function AdminSecuritySettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setSaveStatus("error");
      setErrorMessage("Yeni şifreler eşleşmiyor.");
      return;
    }
    if (newPassword.length < 8) {
      setSaveStatus("error");
      setErrorMessage("Şifre en az 8 karakter olmalıdır.");
      return;
    }

    setLoading(true);
    setSaveStatus("idle");

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        setSaveStatus("error");
        setErrorMessage(error.message);
      } else {
        setSaveStatus("success");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setSaveStatus("idle"), 5000);
      }
    } catch (err: any) {
      setSaveStatus("error");
      setErrorMessage("Beklenmedik bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-auto bg-slate-100 dark:bg-slate-900">
      <AdminNavbar title="Güvenlik Ayarları" />
      
      <div className="p-6 max-w-4xl space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-xl flex items-center justify-center">
                <Lock className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Şifre Değiştir</h3>
                <p className="text-xs text-slate-500">Hesabınızın güvenliği için düzenli aralıklarla şifrenizi güncelleyin.</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <form onSubmit={handleUpdatePassword} className="max-w-md space-y-6">
              <div className="space-y-4">
                {/* 
                  Note: Supabase updatePassword doesn't strictly require current password 
                  if user is already logged in, but it's good for UX/Security context.
                */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Yeni Şifre</label>
                  <div className="relative">
                    <Input 
                      type={showPasswords ? "text" : "password"} 
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 pr-12 h-12 rounded-xl"
                      required
                    />
                    <button type="button" onClick={() => setShowPasswords(!showPasswords)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-500 transition-colors">
                      {showPasswords ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Yeni Şifre Onay</label>
                  <Input 
                    type={showPasswords ? "text" : "password"} 
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 h-12 rounded-xl"
                    required
                  />
                </div>
              </div>

              {saveStatus === "success" && (
                <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">Şifreniz başarıyla güncellendi!</p>
                </div>
              )}

              {saveStatus === "error" && (
                <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl text-red-600 dark:text-red-400">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">{errorMessage}</p>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 rounded-xl flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Key className="w-4 h-4" /> Şifreyi Güncelle
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Two-Factor Auth Placeholder */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 opacity-60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-slate-500" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">İki Faktörlü Doğrulama (2FA)</h3>
                <p className="text-xs text-slate-500">Hesabınıza ek bir güvenlik katmanı ekleyin.</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-[10px] font-bold text-slate-500 uppercase rounded-full">Yakında</span>
          </div>
        </div>
      </div>
    </div>
  );
}
