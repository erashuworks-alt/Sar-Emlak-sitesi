"use client";

import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-red-500/10">
          <ShieldAlert className="w-12 h-12 text-red-600 dark:text-red-500" />
        </div>
        
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Yetkisiz Erişim</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
          Bu sayfaya erişmek için gerekli izinlere sahip değilsiniz. Lütfen yönetici hesabınızla giriş yaptığınızdan emin olun.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/admin/login">
            <Button variant="outline" className="w-full sm:w-auto rounded-2xl h-12 px-8 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Giriş Sayfasına Dön
            </Button>
          </Link>
          <Link href="/">
            <Button className="w-full sm:w-auto rounded-2xl h-12 px-8 flex items-center gap-2">
              <Home className="w-4 h-4" /> Anasayfaya Git
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
