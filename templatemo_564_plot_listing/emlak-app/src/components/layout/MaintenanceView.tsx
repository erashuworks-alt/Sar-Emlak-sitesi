"use client";

import { motion } from "framer-motion";
import { Settings, Hammer, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCMSStore } from "@/store/cmsStore";

export function MaintenanceView() {
  const { maintenanceSettings } = useCMSStore();

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden">
      {/* Background Media with Overlay */}
      {maintenanceSettings.backgroundVideo ? (
        <div className="absolute inset-0 z-0">
          <video 
            src={maintenanceSettings.backgroundVideo} 
            className="w-full h-full object-cover"
            autoPlay 
            loop 
            muted 
            playsInline
          />
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]" />
        </div>
      ) : maintenanceSettings.backgroundImage ? (
        <div className="absolute inset-0 z-0">
          <img 
            src={maintenanceSettings.backgroundImage} 
            alt="Maintenance" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 z-0" />
      )}

      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 bg-brand-600 rounded-[2.5rem] mx-auto flex items-center justify-center shadow-2xl shadow-brand-500/30"
        >
          <Settings className="w-12 h-12 text-white" />
        </motion.div>

        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white"
          >
            {maintenanceSettings.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 dark:text-slate-300"
          >
            {maintenanceSettings.description}
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] flex flex-col items-center gap-2">
            <Hammer className="w-6 h-6 text-brand-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Durum</span>
            <span className="text-xs font-bold text-white">Sistem Çalışması</span>
          </div>
          <div className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] flex flex-col items-center gap-2">
            <Clock className="w-6 h-6 text-amber-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Tahmini Süre</span>
            <span className="text-xs font-bold text-white">~{maintenanceSettings.estimatedDuration}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="pt-8"
        >
          <Button 
            className="rounded-2xl px-10 h-12 text-base shadow-xl shadow-brand-500/20"
            onClick={() => window.location.reload()}
          >
            Sayfayı Yenile
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
