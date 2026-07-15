"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (resetError) {
        setError(resetError.message);
      } else {
        setSuccess(true);
      }
    } catch (err: any) {
      setError("Beklenmedik bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-brand-600/20 border border-brand-500/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-brand-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Şifremi Unuttum</h1>
          <p className="text-slate-400">Şifrenizi sıfırlamak için e-posta adresinizi girin.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {success ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Bağlantı Gönderildi!</h2>
              <p className="text-slate-400 mb-8">
                Şifre sıfırlama bağlantısı <strong>{email}</strong> adresine gönderildi. Lütfen e-postanızı kontrol edin.
              </p>
              <Link href="/admin/login">
                <Button className="w-full h-12 rounded-xl bg-slate-800 hover:bg-slate-700">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Giriş Sayfasına Dön
                </Button>
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">E-posta Adresi</label>
                <Input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@example.com" 
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-brand-500 h-12" 
                  required 
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm bg-red-900/30 px-4 py-3 rounded-xl border border-red-800">
                  {error}
                </p>
              )}

              <Button 
                className="w-full h-12 rounded-xl text-base bg-brand-600 hover:bg-brand-700 disabled:opacity-50" 
                type="submit"
                disabled={loading || !email}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" /> Bağlantı Gönder
                  </>
                )}
              </Button>

              <Link href="/admin/login" className="flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" /> Giriş Sayfasına Dön
              </Link>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
