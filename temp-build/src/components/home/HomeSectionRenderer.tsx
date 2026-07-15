"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HomeSection } from "@/types/cms";
import { usePropertyStore } from "@/store/propertyStore";
import { useCMSStore } from "@/store/cmsStore";
import { PropertyCard } from "@/components/PropertyCard";
import { EditableElement } from "@/components/admin/design-editor/EditableElement";
import { MapPin, ArrowRight, Play, CheckCircle2, Star, Users, BarChart3, HelpCircle, Building2, Home, Warehouse, Briefcase, Map, Shield } from "lucide-react";

const renderCinematicTitle = (title: string = "", isHero: boolean = false) => {
  const words = title.trim().split(" ");
  const baseColor = isHero ? "text-white" : "text-slate-900 dark:text-white";
  
  if (words.length <= 1) return <span className={baseColor}>{title}</span>;
  if (words.length === 2) {
    return (
      <>
        <span className={`block ${baseColor} mb-2`}>{words[0]}</span>
        <span className="block bg-gradient-to-r from-[#D4AF37] via-[#F4E4A6] to-[#C9A227] bg-clip-text text-transparent">{words[1]}</span>
      </>
    );
  }
  if (words.length === 3) {
    return (
      <>
        <span className={`block ${baseColor} mb-2`}>{words[0]}</span>
        <span className="block bg-gradient-to-r from-[#D4AF37] via-[#F4E4A6] to-[#C9A227] bg-clip-text text-transparent mb-2">{words[1]}</span>
        <span className={`block ${baseColor}`}>{words[2]}</span>
      </>
    );
  }
  // 4 or more words
  const mid1 = Math.ceil(words.length / 3);
  const mid2 = Math.ceil((words.length * 2) / 3);
  const part1 = words.slice(0, mid1).join(" ");
  const part2 = words.slice(mid1, mid2).join(" ");
  const part3 = words.slice(mid2).join(" ");
  return (
    <>
      <span className={`block ${baseColor} mb-2`}>{part1}</span>
      <span className="block bg-gradient-to-r from-[#D4AF37] via-[#F4E4A6] to-[#C9A227] bg-clip-text text-transparent mb-2">{part2}</span>
      <span className={`block ${baseColor}`}>{part3}</span>
    </>
  );
};

interface Props {
  section: HomeSection;
}

export function HomeSectionRenderer({ section }: Props) {
  const { properties } = usePropertyStore();
  const { popularRegions } = useCMSStore();

  if (!section.isActive) return null;

  const customStyle = {
    backgroundColor: section.settings?.backgroundColor || undefined,
    color: section.settings?.textColor || undefined,
  };

  switch (section.type) {
    case "hero":
      return (
        <section style={customStyle} className="relative min-h-[95vh] flex items-center overflow-hidden py-20">
          <div className="absolute inset-0">
            <img src={section.imageUrl} className="w-full h-full object-cover scale-105 animate-[pulse_10s_infinite_alternate]" alt={section.title} />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-transparent" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-slate-950/80" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 40 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-8 max-w-4xl"
              >
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#D4AF37]/15 backdrop-blur-md border border-[#D4AF37]/40 text-[#F4E4A6] text-xs font-bold uppercase tracking-[0.25em] mb-8 shadow-[0_4px_25px_rgba(212,175,55,0.25)]">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                  PRESTİJLİ GAYRİMENKUL PORTFÖYÜ
                </div>
                
                <EditableElement id="home-hero-title" as="h1" className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.08]">
                  {renderCinematicTitle(section.title, true)}
                </EditableElement>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <EditableElement id="home-hero-subtitle" as="p" className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl font-light leading-relaxed border-l-2 border-[#D4AF37] pl-6 py-1 bg-gradient-to-r from-white/5 to-transparent backdrop-blur-xs rounded-r-2xl">
                    {section.subtitle}
                  </EditableElement>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex flex-wrap gap-5 items-center"
                >
                  <Link href={section.buttonLink || "/properties"}>
                    <button className="h-16 px-10 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#C9A227] to-[#8B6B15] text-[#050816] font-extrabold uppercase tracking-widest text-sm hover:from-[#F4E4A6] hover:via-[#D4AF37] hover:to-[#C9A227] transition-all flex items-center gap-3 shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_40px_rgba(244,228,166,0.6)] hover:gap-4 transform hover:-translate-y-1">
                      {section.buttonText} <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                  <Link href="/contact" className="h-16 px-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/20 transition-all flex items-center justify-center shadow-lg hover:border-[#D4AF37]/50">
                    VIP İLETİŞİM
                  </Link>
                </motion.div>
              </motion.div>
              
              {/* Asymmetrical Floating Stats Card */}
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-4"
              >
                <div className="bg-slate-950/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-[#D4AF37]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#D4AF37]/20 transition-colors" />
                  <div className="space-y-8 relative z-10">
                    <div className="border-b border-[#D4AF37]/20 pb-6">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] block mb-1">DÜNYA STANDARTLARI</span>
                      <h3 className="text-xl font-bold text-white tracking-tight">Rakamlarla Luxury Gold</h3>
                    </div>
                    {section.items?.map((stat, i) => (
                      <div key={i} className="flex items-baseline justify-between border-b border-white/10 last:border-0 pb-6 last:pb-0">
                        <p className="text-sm font-medium text-slate-400 tracking-wider uppercase">{stat.label}</p>
                        <p className="text-3xl sm:text-4xl font-extrabold text-[#F4E4A6] tracking-tight bg-gradient-to-r from-[#D4AF37] via-[#F4E4A6] to-[#C9A227] bg-clip-text text-transparent">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      );

    case "featured_properties":
      const featured = properties.slice(0, section.settings.limit || 6);
      return (
        <section style={customStyle} className="py-32 bg-white dark:bg-[#050816] border-b border-slate-100 dark:border-[#D4AF37]/20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 dark:bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-brand-600 dark:text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em] mb-6 shadow-[0_4px_20px_rgba(212,175,55,0.15)]">
                  SEÇKİN PORTFÖY
                </div>
                <EditableElement id={`section-${section.id}-title`} as="h2" className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
                  {renderCinematicTitle(section.title)}
                </EditableElement>
                <EditableElement id={`section-${section.id}-subtitle`} as="p" className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-2xl">
                  {section.subtitle}
                </EditableElement>
              </div>
              <Link href="/properties" className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-900 dark:bg-[#D4AF37]/10 hover:dark:bg-[#D4AF37]/20 text-white dark:text-[#F4E4A6] font-bold uppercase tracking-widest text-xs transition-all border border-transparent dark:border-[#D4AF37]/30 hover:gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_20px_rgba(212,175,55,0.15)] self-start lg:self-auto">
                TÜM PORTFÖYÜ İNCELE <ArrowRight className="w-4 h-4 text-brand-600 dark:text-[#D4AF37]" />
              </Link>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-${section.settings.columns || 3} gap-10`}>
              {featured.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.8 }}>
                  <PropertyCard property={p} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      );

    case "popular_regions":
      return (
        <section style={customStyle} className="py-32 bg-slate-50 dark:bg-[#0B1120] border-b border-slate-100 dark:border-[#D4AF37]/20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 dark:bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-brand-600 dark:text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em] mb-6 shadow-[0_4px_20px_rgba(212,175,55,0.15)]">
                  PRESTİJLİ KONUMLAR
                </div>
                <EditableElement id={`section-${section.id}-title`} as="h2" className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
                  {renderCinematicTitle(section.title)}
                </EditableElement>
                <EditableElement id={`section-${section.id}-subtitle`} as="p" className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-2xl">
                  {section.subtitle}
                </EditableElement>
              </div>
              <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#D4AF37]/30 shadow-lg self-start lg:self-auto">
                <MapPin className="w-5 h-5 text-brand-600 dark:text-[#D4AF37]" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">{popularRegions.length} AKTİF BÖLGE</span>
              </div>
            </div>
            
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${section.settings.columns || 4} gap-10`}>
              {popularRegions.filter(r => r.isActive !== false).map((region, i) => {
                const count = properties.filter(p => 
                  p.city.toLowerCase() === region.title.toLowerCase() || 
                  p.district.toLowerCase() === region.title.toLowerCase() ||
                  region.title.toLowerCase().includes(p.city.toLowerCase()) ||
                  region.title.toLowerCase().includes(p.district.toLowerCase())
                ).length;

                return (
                  <motion.div 
                    key={region.id} 
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    className="group"
                  >
                    <Link href={`/properties?city=${region.title}`} className="relative block aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200 dark:shadow-none border dark:border-[#D4AF37]/20">
                      <img src={region.image || "https://images.unsplash.com/photo-1500382017468-9049fed747ef"} alt={region.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />

                      <div className="absolute inset-x-0 bottom-0 p-8 transform group-hover:-translate-y-2 transition-transform duration-500">
                        <div className="bg-slate-900/90 backdrop-blur-md p-8 rounded-[2rem] border border-[#D4AF37]/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-bold text-white tracking-tight">{region.title}</h3>
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#C9A227] to-[#8B6B15] text-[#050816] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_4px_15px_rgba(212,175,55,0.4)]">
                              <ArrowRight className="w-5 h-5" />
                            </div>
                          </div>
                          <p className="text-slate-300 text-sm line-clamp-2 mb-6 font-light leading-relaxed group-hover:text-white transition-colors">
                            {region.description || "Bu bölgedeki en özel gayrimenkul fırsatlarını keşfedin."}
                          </p>
                          <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#050816] bg-gradient-to-r from-[#D4AF37] via-[#C9A227] to-[#8B6B15] px-3.5 py-1.5 rounded-xl shadow-[0_2px_10px_rgba(212,175,55,0.4)] border border-[#F4E4A6]/30">
                              {count} İLAN
                            </span>
                            <span className="text-[10px] font-bold text-[#F4E4A6] uppercase tracking-widest group-hover:text-white transition-colors flex items-center gap-1">İncele &rarr;</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      );

    case "about":
      return (
        <section style={customStyle} className="py-32 bg-white dark:bg-[#050816] overflow-hidden border-b border-slate-100 dark:border-[#D4AF37]/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-6 relative">
                <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden border dark:border-[#D4AF37]/20 shadow-2xl dark:shadow-[0_0_50px_rgba(212,175,55,0.15)] relative z-10">
                  <img src={section.imageUrl} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" alt={section.title} />
                </div>
                <div className="absolute -bottom-10 -right-10 bg-gradient-to-r from-[#D4AF37] via-[#C9A227] to-[#8B6B15] text-[#050816] p-12 rounded-[3rem] hidden md:block shadow-[0_20px_50px_rgba(212,175,55,0.4)] border border-[#F4E4A6]/30 z-20">
                  <p className="text-6xl font-black mb-2 tracking-tight">20+</p>
                  <p className="text-xs font-extrabold opacity-95 uppercase tracking-widest">YILLIK TECRÜBE</p>
                </div>
                <div className="absolute -top-6 -left-6 w-48 h-48 bg-[#D4AF37]/10 rounded-[3rem] border border-[#D4AF37]/30 -z-10 hidden md:block" />
              </div>
              <div className="lg:col-span-6 space-y-8 lg:pl-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 dark:bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-brand-600 dark:text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em] shadow-[0_4px_20px_rgba(212,175,55,0.15)]">
                  KURUMSAL VİZYON
                </div>
                <EditableElement id={`section-${section.id}-title`} as="h2" className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                  {renderCinematicTitle(section.title)}
                </EditableElement>
                <EditableElement id={`section-${section.id}-subtitle`} as="p" className="text-xl font-medium text-brand-600 dark:text-[#D4AF37] leading-relaxed border-l-2 border-[#D4AF37] pl-6 py-1 bg-gradient-to-r from-brand-50/50 dark:from-white/5 to-transparent rounded-r-2xl">
                  {section.subtitle}
                </EditableElement>
                <EditableElement id={`section-${section.id}-content`} as="p" className="text-lg text-slate-500 dark:text-slate-300 font-light leading-relaxed max-w-2xl">
                  {section.content}
                </EditableElement>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-slate-100 dark:border-[#D4AF37]/20">
                  {section.items?.map((item, i) => (
                    <div key={i} className="flex items-center gap-5 p-6 rounded-3xl bg-slate-50 dark:bg-[#111827] border border-slate-100 dark:border-[#D4AF37]/20 shadow-sm">
                      <div className="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-[#D4AF37]/20 flex items-center justify-center border dark:border-[#D4AF37]/30 shadow-[0_4px_20px_rgba(212,175,55,0.15)] shrink-0">
                        <CheckCircle2 className="w-7 h-7 text-brand-600 dark:text-[#D4AF37]" />
                      </div>
                      <div>
                        <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">{item.value}</p>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{item.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case "statistics":
      return (
        <section style={customStyle} className="py-32 bg-gradient-to-r from-[#111827] via-[#172033] to-[#111827] dark:from-[#0B1120] dark:via-[#111827] dark:to-[#0B1120] text-white relative overflow-hidden border-b border-[#D4AF37]/20 shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d')] opacity-10 bg-cover bg-center mix-blend-overlay" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial-gradient from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            {section.title && (
              <div className="text-center mb-24 max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F4E4A6] text-xs font-bold uppercase tracking-[0.25em] mb-6 shadow-[0_4px_20px_rgba(212,175,55,0.2)]">
                  KÜRESEL BAŞARI
                </div>
                <EditableElement id={`section-${section.id}-title`} as="h2" className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                  {renderCinematicTitle(section.title, true)}
                </EditableElement>
                {section.subtitle && <EditableElement id={`section-${section.id}-subtitle`} as="p" className="text-xl text-[#F4E4A6] font-light leading-relaxed max-w-2xl mx-auto">{section.subtitle}</EditableElement>}
              </div>
            )}
            
            <div className={`grid grid-cols-2 md:grid-cols-${section.settings?.columns || 4} gap-10 md:gap-16`}>
              {section.items?.map((stat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 40 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="text-center group p-8 rounded-[2.5rem] bg-slate-900/50 backdrop-blur-md border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all hover:shadow-[0_20px_50px_rgba(212,175,55,0.2)]"
                >
                  <div className="w-24 h-24 mx-auto rounded-[2rem] bg-[#D4AF37]/15 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform backdrop-blur-md border border-[#D4AF37]/40 shadow-[0_0_30px_rgba(212,175,55,0.25)]">
                    <BarChart3 className="w-12 h-12 text-[#D4AF37]" />
                  </div>
                  <div className="flex items-baseline justify-center gap-1 mb-3">
                    <span className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white bg-gradient-to-r from-[#D4AF37] via-[#F4E4A6] to-[#C9A227] bg-clip-text text-transparent">{stat.value}</span>
                    {stat.suffix && <span className="text-3xl sm:text-4xl font-extrabold text-[#D4AF37]">{stat.suffix}</span>}
                  </div>
                  <p className="text-xs sm:text-sm font-extrabold text-[#F4E4A6] uppercase tracking-[0.2em]">{stat.label || stat.title}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      );

    case "cta":
      return (
        <section style={customStyle} className="py-24 bg-white dark:bg-[#050816] overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="relative rounded-[4rem] overflow-hidden p-16 md:p-32 text-center border border-[#D4AF37]/40 shadow-[0_20px_60px_rgba(212,175,55,0.3)]">
              <img src={section.imageUrl} className="absolute inset-0 w-full h-full object-cover scale-105 animate-[pulse_10s_infinite_alternate]" alt="" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/95 via-[#050816]/85 to-[#050816]/95 backdrop-blur-sm" />
              <div className="relative z-10 max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F4E4A6] text-xs font-bold uppercase tracking-[0.25em] mb-8 shadow-[0_0_20px_rgba(212,175,55,0.25)]">
                  BİZİMLE İLETİŞİME GEÇİN
                </div>
                <EditableElement id={`section-${section.id}-title`} as="h2" className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-8 leading-[1.08] tracking-tight">
                  {renderCinematicTitle(section.title, true)}
                </EditableElement>
                <EditableElement id={`section-${section.id}-subtitle`} as="p" className="text-xl md:text-2xl text-[#F4E4A6] mb-12 font-light leading-relaxed max-w-3xl mx-auto">
                  {section.subtitle}
                </EditableElement>
                <Link href={section.buttonLink || "/contact"}>
                  <button className="h-18 px-12 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#C9A227] to-[#8B6B15] text-[#050816] font-extrabold uppercase tracking-widest text-base hover:from-[#F4E4A6] hover:via-[#D4AF37] hover:to-[#C9A227] transition-all shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_40px_rgba(244,228,166,0.6)] transform hover:-translate-y-1">
                    {section.buttonText}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      );

    case "video_showcase":
      const isYouTube = section.videoUrl?.includes("youtube.com") || section.videoUrl?.includes("youtu.be");
      const videoId = isYouTube ? (section.videoUrl?.includes("v=") ? section.videoUrl.split("v=")[1].split("&")[0] : section.videoUrl?.split("/").pop()) : null;

      return (
        <section style={customStyle} className="py-32 bg-[#0B1120] text-white overflow-hidden border-b border-[#D4AF37]/20 shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-6 space-y-8">
                <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F4E4A6] text-xs font-bold uppercase tracking-[0.25em] mb-6 shadow-[0_0_20px_rgba(212,175,55,0.25)]">
                    <Play className="w-3 h-3 fill-current" /> SİNEMATİK TANITIM
                  </div>
                  <EditableElement id={`section-${section.id}-title`} as="h2" className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
                    {renderCinematicTitle(section.title, true)}
                  </EditableElement>
                  <EditableElement id={`section-${section.id}-subtitle`} as="p" className="text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-10 max-w-2xl border-l-2 border-[#D4AF37] pl-6 py-1 bg-gradient-to-r from-white/5 to-transparent rounded-r-2xl">
                    {section.subtitle || section.content}
                  </EditableElement>
                  <div className="space-y-5 pt-6 border-t border-white/10">
                    {section.items?.map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#D4AF37]/30 transition-colors">
                        <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center border border-[#D4AF37]/40 shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                          <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                        </div>
                        <span className="text-base font-medium text-slate-200 tracking-wide">{item.label || item.title}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
              <div className="lg:col-span-6 relative">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="relative aspect-video rounded-[3.5rem] overflow-hidden group shadow-[0_20px_60px_rgba(212,175,55,0.3)] border border-[#D4AF37]/40">
                  {section.videoUrl ? (
                    isYouTube ? (
                      <iframe 
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&mute=0`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video 
                        src={section.videoUrl} 
                        className="w-full h-full object-cover"
                        controls
                        poster={section.imageUrl}
                      />
                    )
                  ) : (
                    <>
                      <img src={section.imageUrl || "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
                      <div className="absolute inset-0 bg-[#050816]/60 group-hover:bg-[#050816]/40 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-28 h-28 rounded-full bg-[#D4AF37]/30 backdrop-blur-xl border border-[#D4AF37]/60 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_50px_rgba(212,175,55,0.6)]">
                          <Play className="w-12 h-12 text-white fill-current ml-2" />
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      );

    case "categories":
      const CATEGORY_MAP: Record<string, { label: string; icon: any; color: string }> = {
        apartment: { label: "Daire", icon: Building2, color: "blue" },
        villa: { label: "Villa", icon: Home, color: "emerald" },
        house: { label: "Müstakil Ev", icon: Warehouse, color: "amber" },
        office: { label: "Ofis", icon: Briefcase, color: "indigo" },
        land: { label: "Arsa", icon: Map, color: "orange" },
      };

      return (
        <section style={customStyle} className="py-32 bg-white dark:bg-[#050816] border-b border-slate-100 dark:border-[#D4AF37]/20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 dark:bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-brand-600 dark:text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em] mb-6 shadow-[0_4px_20px_rgba(212,175,55,0.15)]">
                  YAŞAM TARZI
                </div>
                <EditableElement id={`section-${section.id}-title`} as="h2" className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
                  {renderCinematicTitle(section.title)}
                </EditableElement>
                <EditableElement id={`section-${section.id}-subtitle`} as="p" className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-2xl">
                  {section.subtitle}
                </EditableElement>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {Object.entries(CATEGORY_MAP).map(([key, info], i) => {
                const count = properties.filter(p => p.category === key && p.status === "published").length;
                const Icon = info.icon;
                
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                  >
                    <Link 
                      href={`/properties?category=${key}`}
                      className="group flex flex-col items-center p-12 rounded-[3rem] bg-slate-50 dark:bg-[#111827] border border-slate-100 dark:border-[#D4AF37]/25 hover:border-[#D4AF37] hover:bg-white dark:hover:bg-[#172033] transition-all duration-500 shadow-sm hover:shadow-[0_20px_40px_rgba(212,175,55,0.25)] shadow-slate-200 dark:shadow-none"
                    >
                      <div className="w-24 h-24 rounded-[2.5rem] bg-[#D4AF37]/10 text-brand-600 dark:text-[#D4AF37] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-[0_0_20px_rgba(212,175,55,0.15)] border border-[#D4AF37]/20">
                        <Icon className="w-12 h-12" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-[#F4E4A6] transition-colors tracking-tight">{info.label}</h3>
                      <div className="flex items-center gap-2 pt-4 border-t border-slate-200 dark:border-slate-800 w-full justify-center">
                        <span className="text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{count} İLAN</span>
                        <ArrowRight className="w-4 h-4 text-brand-600 dark:text-[#D4AF37] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      );

    case "services":
      return (
        <section style={customStyle} className="py-32 bg-white dark:bg-[#0B1120] border-b border-slate-100 dark:border-[#D4AF37]/20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-24">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 dark:bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-brand-600 dark:text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em] mb-6 shadow-[0_4px_20px_rgba(212,175,55,0.15)]">
                AYRICALIKLI HİZMETLER
              </div>
              <EditableElement id={`section-${section.id}-title`} as="h2" className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:!text-white mb-6 leading-[1.1]">
                {renderCinematicTitle(section.title)}
              </EditableElement>
              <EditableElement id={`section-${section.id}-subtitle`} as="p" className="text-lg md:text-xl text-slate-500 dark:!text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
                {section.subtitle}
              </EditableElement>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
              {section.items?.map((service, i) => (
                <div key={i} className="p-12 rounded-[3rem] bg-slate-50 dark:bg-[#111827] border border-slate-100 dark:border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all duration-500 group hover:shadow-[0_20px_50px_rgba(212,175,55,0.25)] flex flex-col justify-between">
                  <div>
                    <div className="w-20 h-20 rounded-[2.5rem] bg-gradient-to-r from-[#D4AF37] via-[#C9A227] to-[#8B6B15] text-[#050816] flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-[0_10px_30px_rgba(212,175,55,0.4)] border border-[#F4E4A6]/30">
                      {i === 0 ? <Users className="w-10 h-10" /> : i === 1 ? <BarChart3 className="w-10 h-10" /> : <Shield className="w-10 h-10" />}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight group-hover:text-brand-600 dark:group-hover:text-[#F4E4A6] transition-colors">{service.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-light mb-8">{service.description}</p>
                  </div>
                  <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-600 dark:text-[#D4AF37] group-hover:gap-4 transition-all">
                    <span>Hizmeti İncele</span> <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    default:
      return null;
  }
}
