"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { supabase } from "@/lib/supabase";

import { useUserStore } from "@/store/userStore";

export default function AdminLoginPage() {
  const router = useRouter();
  const { users } = useUserStore();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const isPlaceholder = supabaseUrl.includes("placeholder") || !supabaseUrl;

    if (isPlaceholder) {
      // 1. Check master bypass
      const isMaster = email === "admin@admin.com" && password === "admin123";
      
      // 2. Check userStore for created admins/mods
      const storeUser = users.find(u => u.email === email && u.password === password);
      const isAuthorizedStoreUser = storeUser && (storeUser.role === "admin" || storeUser.role === "moderator");

      if (isMaster || isAuthorizedStoreUser) {
        document.cookie = "admin_token=dev_bypass_token; path=/";
        router.push("/admin");
        router.refresh();
      } else {
        setError("Geçersiz e-posta veya şifre. (Geliştirme modunda sadece eklediğiniz admin/mod hesapları girebilir)");
        setLoading(false);
      }
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError("Giriş yapılamadı: " + authError.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        // Check if user is admin/moderator
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();

        if (profileError || !profile || (profile.role !== "admin" && profile.role !== "moderator")) {
          await supabase.auth.signOut();
          setError("Yetkisiz erişim. Yönetici hesabıyla giriş yapın.");
          setLoading(false);
          return;
        }

        router.push("/admin");
        router.refresh();
      }
    } catch (err: any) {
      setError("Bağlantı hatası: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-brand-600/20 border border-brand-500/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-brand-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Girişi</h1>
          <p className="text-slate-400">Yönetim paneline erişmek için giriş yapın.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">E-posta</label>
              <Input 
                name="email" 
                type="email" 
                placeholder="admin@example.com" 
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-brand-500" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Şifre</label>
              <div className="relative">
                <Input 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 pr-12 focus-visible:ring-brand-500" 
                  required 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex justify-end mt-1">
                <Link href="/admin/forgot-password" className="text-xs text-brand-400 hover:text-brand-300 transition-colors">
                  Şifremi Unuttum?
                </Link>
              </div>
            </div>
            
            {error && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-red-400 text-sm bg-red-900/30 px-4 py-3 rounded-xl border border-red-800"
              >
                {error}
              </motion.p>
            )}

            <Button 
              className="w-full h-12 rounded-xl text-base bg-brand-600 hover:bg-brand-700 disabled:opacity-50" 
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" /> Giriş Yap
                </>
              )}
            </Button>
          </form>
        </div>
        <p className="text-center mt-6 text-slate-500 text-sm">
          <Link href="/" className="text-brand-400 hover:text-brand-300 transition-colors">← Siteye Dön</Link>
        </p>
      </motion.div>
    </div>
  );
}
