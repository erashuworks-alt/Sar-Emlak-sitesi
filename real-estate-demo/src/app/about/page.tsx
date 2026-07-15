"use client";

import { useCMSStore } from "@/store/cmsStore";
import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Users, Target, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  const { about } = useCMSStore();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-20">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <Image 
          src={about.images[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa"} 
          alt="About Hero" 
          fill 
          className="object-cover opacity-20 dark:opacity-10" 
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6"
          >
            {about.heroTitle}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            {about.heroDescription}
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Biz Kimiz?</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {about.companyStory}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-2">
                    <Target className="w-5 h-5 text-brand-600" /> Misyonumuz
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{about.mission}</p>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-2">
                    <Award className="w-5 h-5 text-brand-600" /> Vizyonumuz
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{about.vision}</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative h-[250px] sm:h-[400px] rounded-[3rem] overflow-hidden shadow-2xl">
              <Image src={about.images[0]} alt="Office" fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {about.statistics.map((stat: { label: string; value: string }, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-brand-600 mb-2">{stat.value}</div>
                <div className="text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Uzman Kadromuz</h2>
            <p className="text-slate-500 dark:text-slate-400">Hayallerinizdeki evi bulmanız için çalışan profesyonel ekibimiz.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {about.teamMembers.map((member: { id: string; name: string; role: string; image: string }, i: number) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-800 shadow-xl"
              >
                <div className="relative h-80 w-full overflow-hidden">
                  <Image src={member.image} alt={member.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-brand-600 font-medium text-sm">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
