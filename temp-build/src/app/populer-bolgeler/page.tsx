"use client";

import { useCMSStore } from "@/store/cmsStore";
import { usePropertyStore } from "@/store/propertyStore";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { PropertyCard } from "@/components/PropertyCard";

export default function PopularRegionsPage() {
  const { popularRegions } = useCMSStore();
  const { properties } = usePropertyStore();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Popüler Bölgeler
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 dark:text-slate-400"
          >
            Sizin için en çok tercih edilen ve değer kazanan bölgeleri bir araya getirdik.
          </motion.p>
        </div>

        {popularRegions.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-[3rem] border border-slate-100 dark:border-slate-700">
            <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">Henüz eklenmiş popüler bölge bulunmuyor.</p>
          </div>
        ) : (
          <div className="space-y-20">
            {popularRegions.map((region, i) => {
              const regionProperties = properties.filter(p => region.featuredListings?.includes(p.id)).slice(0, 3);
              
              return (
                <motion.div 
                  key={region.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className={`relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <Image src={region.image} alt={region.title} fill className="object-cover" />
                    </div>
                    <div className="space-y-6">
                      <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{region.title}</h2>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {region.description}
                      </p>
                      <div className="prose dark:prose-invert max-w-none text-sm text-slate-500 dark:text-slate-400">
                        <div dangerouslySetInnerHTML={{ __html: region.seoContent }} />
                      </div>
                      <Link 
                        href={`/properties?city=${region.title}`} 
                        className="inline-flex items-center gap-2 text-brand-600 font-bold hover:gap-3 transition-all"
                      >
                        Bölgedeki Tüm İlanları Gör <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>

                  {regionProperties.length > 0 && (
                    <div className="pt-8">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Öne Çıkan İlanlar</h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        {regionProperties.map(p => (
                          <PropertyCard 
                            key={p.id}
                            property={p}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
