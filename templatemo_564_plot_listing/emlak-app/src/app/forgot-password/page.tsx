"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <Link href="/login" className="absolute top-8 left-8 flex items-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
        <ArrowLeft className="w-5 h-5 mr-2" /> Geri Dön
      </Link>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl p-10 shadow-xl border border-slate-100 dark:border-slate-700">
        {sent ? (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">E-posta Gönderildi!</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin.</p>
            <Link href="/login"><Button className="w-full rounded-xl h-12">Giriş Sayfasına Dön</Button></Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-brand-50 dark:bg-brand-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-brand-600 dark:text-brand-400">
                <Mail className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Şifreni Unuttun mu?</h1>
              <p className="text-slate-500 dark:text-slate-400">E-posta adresinizi girin, size sıfırlama bağlantısı gönderelim.</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">E-posta Adresi</label>
                <div className="relative"><Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><Input type="email" placeholder="ornek@email.com" className="pl-12" required /></div>
              </div>
              <Button className="w-full h-12 rounded-xl text-base" type="submit">Sıfırlama Bağlantısı Gönder</Button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}
