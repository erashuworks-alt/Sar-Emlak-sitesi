"use client";

import { useState } from "react";
import { useCMSStore } from "@/store/cmsStore";
import { 
  Save, Layout, Image as ImageIcon, Type, 
  MousePointer2, BarChart, Sparkles, CheckCircle2,
  ChevronDown, ChevronUp, Monitor, Smartphone, Eye,
  Building2, Info, Rocket
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { motion, AnimatePresence } from "framer-motion";

export default function HomepageCMSEditor() {
  const { home, updateHome } = useCMSStore();
  const [localHome, setLocalHome] = useState(home);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success">("idle");

  const handleSave = () => {
    setSaveStatus("saving");
    setTimeout(() => {
      updateHome(localHome);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 800);
  };

  const sections = [
    { id: "hero", title: "Hero Bölümü", icon: Rocket, color: "text-blue-500" },
    { id: "featured", title: "Öne Çıkanlar", icon: Sparkles, color: "text-amber-500" },
    { id: "about", title: "Hakkımızda", icon: Info, color: "text-emerald-500" },
    { id: "cta", title: "Harekete Geçir (CTA)", icon: MousePointer2, color: "text-purple-500" },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Sidebar Navigation */}
      <div className="w-full lg:w-72 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
        <header className="p-6 border-b border-slate-100 dark:border-slate-800">
           <h1 className="text-xl font-bold text-slate-900 dark:text-white">Anasayfa CMS</h1>
           <p className="text-xs text-slate-500">Bölüm bazlı içerik yönetimi</p>
        </header>
        <nav className="flex-1 p-4 space-y-1">
           {sections.map((s) => (
             <button
               key={s.id}
               onClick={() => setActiveSection(s.id)}
               className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                 activeSection === s.id 
                 ? "bg-brand-50 dark:bg-brand-900/20 text-brand-600 shadow-sm" 
                 : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50"
               }`}
             >
               <s.icon className={`w-5 h-5 ${activeSection === s.id ? s.color : "text-slate-400"}`} />
               {s.title}
             </button>
           ))}
        </nav>
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
           <Button onClick={handleSave} className="w-full rounded-2xl h-12 flex items-center gap-2 justify-center">
             {saveStatus === "saving" ? "..." : saveStatus === "success" ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
             {saveStatus === "success" ? "Kaydedildi" : "Tümünü Kaydet"}
           </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="w-full lg:w-[480px] border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto p-8 space-y-8">
        <AnimatePresence mode="wait">
          {activeSection === "hero" && (
            <motion.div key="hero" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
              <div className="pb-6 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Hero Bölümü</h2>
                <p className="text-sm text-slate-500">Ana başlık ve karşılama alanı</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Ana Başlık</label>
                  <textarea 
                    value={localHome.hero.title}
                    onChange={e => setLocalHome({...localHome, hero: {...localHome.hero, title: e.target.value}})}
                    className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-lg font-bold bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-brand-500 outline-none resize-none h-32"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Alt Başlık</label>
                  <Input 
                    value={localHome.hero.subtitle}
                    onChange={e => setLocalHome({...localHome, hero: {...localHome.hero, subtitle: e.target.value}})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Arkaplan Görseli</label>
                  <ImageUpload 
                    value={localHome.hero.backgroundImage ? [localHome.hero.backgroundImage] : []}
                    onChange={(urls) => setLocalHome({...localHome, hero: {...localHome.hero, backgroundImage: urls[0] || ""}})}
                    onRemove={() => setLocalHome({...localHome, hero: {...localHome.hero, backgroundImage: ""}})}
                    maxFiles={1}
                    bucket="homepage"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-4">İstatistikler (Hero Stats)</label>
                  <div className="space-y-3">
                    {localHome.hero.stats.map((stat: { label: string; value: string }, index: number) => (
                      <div key={index} className="grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 mb-1">Değer (Örn: 10k+)</label>
                          <Input 
                            value={stat.value}
                            onChange={e => {
                              const newStats = [...localHome.hero.stats];
                              newStats[index] = { ...stat, value: e.target.value };
                              setLocalHome({ ...localHome, hero: { ...localHome.hero, stats: newStats } });
                            }}
                            className="h-9 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 mb-1">Etiket (Örn: Mutlu Müşteri)</label>
                          <Input 
                            value={stat.label}
                            onChange={e => {
                              const newStats = [...localHome.hero.stats];
                              newStats[index] = { ...stat, label: e.target.value };
                              setLocalHome({ ...localHome, hero: { ...localHome.hero, stats: newStats } });
                            }}
                            className="h-9 text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            </motion.div>
          )}

          {activeSection === "featured" && (
             <motion.div key="featured" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                <div className="pb-6 border-b border-slate-100 dark:border-slate-800">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Öne Çıkanlar</h2>
                  <p className="text-sm text-slate-500">İlan vitrini ve listeleme ayarları</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Bölüm Başlığı</label>
                    <Input 
                      value={localHome.featured.title}
                      onChange={e => setLocalHome({...localHome, featured: {...localHome.featured, title: e.target.value}})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Alt Başlık</label>
                    <Input 
                      value={localHome.featured.subtitle}
                      onChange={e => setLocalHome({...localHome, featured: {...localHome.featured, subtitle: e.target.value}})}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                     <span className="text-sm font-medium">Trend İlanları Göster</span>
                     <input 
                       type="checkbox" 
                       checked={localHome.featured.showTrending}
                       onChange={e => setLocalHome({...localHome, featured: {...localHome.featured, showTrending: e.target.checked}})}
                       className="w-5 h-5 rounded text-brand-600"
                     />
                  </div>
                </div>
             </motion.div>
          )}

          {activeSection === "cta" && (
             <motion.div key="cta" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                <div className="pb-6 border-b border-slate-100 dark:border-slate-800">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">CTA Bölümü</h2>
                  <p className="text-sm text-slate-500">Kullanıcıyı harekete geçirme alanı</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                     <span className="text-sm font-medium">Bölümü Göster</span>
                     <input 
                       type="checkbox" 
                       checked={localHome.cta.showCTA}
                       onChange={e => setLocalHome({...localHome, cta: {...localHome.cta, showCTA: e.target.checked}})}
                       className="w-5 h-5 rounded text-brand-600"
                     />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Başlık</label>
                    <textarea 
                      value={localHome.cta.title}
                      onChange={e => setLocalHome({...localHome, cta: {...localHome.cta, title: e.target.value}})}
                      className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-lg font-bold bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-brand-500 outline-none resize-none h-24"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Alt Başlık</label>
                    <Input 
                      value={localHome.cta.subtitle}
                      onChange={e => setLocalHome({...localHome, cta: {...localHome.cta, subtitle: e.target.value}})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Arkaplan Görseli</label>
                    <ImageUpload 
                      value={localHome.cta.backgroundImage ? [localHome.cta.backgroundImage] : []}
                      onChange={(urls) => setLocalHome({...localHome, cta: {...localHome.cta, backgroundImage: urls[0] || ""}})}
                      onRemove={() => setLocalHome({...localHome, cta: {...localHome.cta, backgroundImage: ""}})}
                      maxFiles={1}
                      bucket="homepage"
                    />
                  </div>
                </div>
             </motion.div>
          )}
                  {activeSection === "about" && (
                    <motion.div key="about" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                      <div className="pb-6 border-b border-slate-100 dark:border-slate-800">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Hakkımızda</h2>
                        <p className="text-sm text-slate-500">Şirket tanıtım ve istatistik alanı</p>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Başlık</label>
                          <Input 
                            value={localHome.about.title}
                            onChange={e => setLocalHome({...localHome, about: {...localHome.about, title: e.target.value}})}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Açıklama</label>
                          <textarea 
                            value={localHome.about.description}
                            onChange={e => setLocalHome({...localHome, about: {...localHome.about, description: e.target.value}})}
                            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-sm bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-brand-500 outline-none resize-none h-32"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Tanıtım Görseli</label>
                          <ImageUpload 
                            value={localHome.about.imageUrl ? [localHome.about.imageUrl] : []}
                            onChange={(urls) => setLocalHome({...localHome, about: {...localHome.about, imageUrl: urls[0] || ""}})}
                            onRemove={() => setLocalHome({...localHome, about: {...localHome.about, imageUrl: ""}})}
                            maxFiles={1}
                            bucket="about"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
              </AnimatePresence>
      </div>

      {/* Live Preview Panel */}
      <div className="flex-1 bg-slate-200 dark:bg-slate-950 p-8 flex flex-col items-center">
        <div className="flex items-center gap-4 mb-6 bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-sm">
          <button className="p-2 rounded-lg bg-brand-50 text-brand-600"><Monitor className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg text-slate-400"><Smartphone className="w-4 h-4" /></button>
          <div className="w-px h-4 bg-slate-200 mx-2" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <Eye className="w-3 h-3" /> Canlı Önizleme
          </span>
        </div>

        {/* The Actual Preview Frame */}
        <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-y-auto border border-slate-200 dark:border-slate-800 h-full relative">
          
          {/* Hero Preview */}
          <section className="relative h-[400px] flex items-center justify-center text-center px-6 overflow-hidden">
             <img src={localHome.hero.backgroundImage} className="absolute inset-0 w-full h-full object-cover brightness-[0.4]" />
             <div className="relative z-10 max-w-2xl">
               <h1 className="text-4xl font-bold text-white mb-4">{localHome.hero.title}</h1>
               <p className="text-lg text-white/80 mb-8">{localHome.hero.subtitle}</p>
               <div className="flex items-center justify-center gap-8 mb-8 text-white">
                 {localHome.hero.stats.map((s: { label: string; value: string }, i: number) => (
                   <div key={i}>
                     <div className="text-2xl font-bold">{s.value}</div>
                     <div className="text-[10px] uppercase tracking-wider opacity-60">{s.label}</div>
                   </div>
                 ))}
               </div>
               <Button className="rounded-full px-8 h-12 text-lg">{localHome.hero.primaryCtaText}</Button>
             </div>
          </section>

          {/* Featured Preview */}
          <section className="py-16 px-12 bg-white dark:bg-slate-900">
             <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-2">{localHome.featured.title}</h2>
             <p className="text-slate-500 text-center mb-12">{localHome.featured.subtitle}</p>
             <div className="grid grid-cols-3 gap-6">
                {[1,2,3].map((i: number) => (
                  <div key={i} className="rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                     <div className="aspect-video bg-slate-100 dark:bg-slate-800 animate-pulse" />
                     <div className="p-4 space-y-3">
                        <div className="h-4 w-3/4 bg-slate-100 dark:bg-slate-800 rounded-full" />
                        <div className="h-3 w-1/2 bg-slate-50 dark:bg-slate-800/50 rounded-full" />
                     </div>
                  </div>
                ))}
             </div>
          </section>

          {/* CTA Preview */}
          <section className="m-8 rounded-[3rem] relative py-20 flex items-center justify-center text-center px-6 overflow-hidden">
             <img src={localHome.cta.backgroundImage} className="absolute inset-0 w-full h-full object-cover brightness-[0.4]" />
             <div className="relative z-10 max-w-xl">
               <h2 className="text-3xl font-bold text-white mb-4">{localHome.cta.title}</h2>
               <p className="text-lg text-white/80 mb-8">{localHome.cta.subtitle}</p>
               <Button className="rounded-full px-8 h-12 bg-white text-brand-600 hover:bg-slate-100">{localHome.cta.buttonText}</Button>
             </div>
          </section>

          <div className="absolute inset-0 pointer-events-none border-[12px] border-slate-900/5 dark:border-white/5 rounded-[inherit]" />
        </div>
      </div>
    </div>
  );
}
