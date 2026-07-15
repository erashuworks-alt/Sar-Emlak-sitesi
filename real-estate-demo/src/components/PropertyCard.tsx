"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BedDouble, Bath, Square, MapPin, Heart, ArrowRight } from "lucide-react";

import type { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const {
    id,
    title,
    price,
    city,
    district,
    roomCount,
    bathrooms,
    squareMeters,
    listingType,
    images,
    isFeatured,
  } = property;

  const imageUrl = images?.[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa";
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-[#111827] border border-slate-100 dark:border-[#D4AF37]/25 shadow-lg hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] dark:hover:shadow-[0_0_30px_rgba(212,175,55,0.35)] transition-all duration-500 flex flex-col"
    >
      {/* Image Area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        <div className="absolute top-5 left-5 flex flex-wrap gap-2 z-10">
          <span className="bg-slate-900/90 dark:bg-[#050816]/90 backdrop-blur-md px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-xl text-[#D4AF37] border border-[#D4AF37]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            {listingType === "Sale" ? "Satılık" : "Kiralık"}
          </span>
          {isFeatured && (
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4E4A6] to-[#C9A227] text-[#050816] px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-xl shadow-[0_4px_20px_rgba(212,175,55,0.4)] border border-[#F4E4A6]/50">
              Seçkin Portföy
            </span>
          )}
        </div>
        <button className="absolute top-5 right-5 p-3 rounded-2xl bg-white/80 dark:bg-[#050816]/80 backdrop-blur-md hover:bg-white dark:hover:bg-[#172033] transition-colors border border-slate-200 dark:border-[#D4AF37]/30 shadow-[0_4px_20px_rgba(0,0,0,0.3)] group/btn">
          <Heart className="w-5 h-5 text-slate-600 dark:text-[#D4AF37] group-hover/btn:scale-110 transition-transform" />
        </button>
      </div>

      {/* Content Area */}
      <div className="p-8 flex-1 flex flex-col justify-between bg-white dark:bg-[#111827]">
        <div>
          <div className="flex items-center text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 mb-3 uppercase">
            <MapPin className="w-4 h-4 mr-1.5 text-brand-600 dark:text-[#D4AF37]" />
            {district}, {city}
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white line-clamp-1 mb-6 group-hover:text-brand-600 dark:group-hover:text-[#F4E4A6] transition-colors">
            {title}
          </h3>

          <div className="grid grid-cols-3 gap-1 py-3 px-2 xs:px-4 rounded-2xl bg-slate-50 dark:bg-[#0B1120] border border-slate-100 dark:border-[#D4AF37]/20 mb-8 text-[11px] xs:text-xs font-bold text-slate-700 dark:text-slate-300 shadow-inner">
            <div className="flex items-center justify-center gap-1.5 border-r border-slate-200 dark:border-slate-800/80">
              <BedDouble className="w-3.5 h-3.5 text-brand-600 dark:text-[#D4AF37] shrink-0" />
              <span className="truncate">{roomCount}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 border-r border-slate-200 dark:border-slate-800/80">
              <Bath className="w-3.5 h-3.5 text-brand-600 dark:text-[#D4AF37] shrink-0" />
              <span className="truncate">{bathrooms}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Square className="w-3.5 h-3.5 text-brand-600 dark:text-[#D4AF37] shrink-0" />
              <span className="truncate">{squareMeters} m²</span>
            </div>
          </div>
        </div>

        <div className="mt-auto flex flex-col xs:flex-row xs:items-end justify-between gap-4 pt-6 border-t border-slate-100 dark:border-[#D4AF37]/20">
          <div className="min-w-0">
            <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Başlayan Fiyatlarla</span>
            <div className="text-xl xs:text-2xl md:text-3xl font-extrabold tracking-tight text-brand-600 dark:text-[#D4AF37] bg-gradient-to-r dark:from-[#D4AF37] dark:via-[#F4E4A6] dark:to-[#C9A227] dark:bg-clip-text dark:text-transparent truncate">
              {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(price)}
            </div>
          </div>
          <Link
            href={`/properties/${id}`}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 dark:bg-[#D4AF37]/10 hover:dark:bg-[#D4AF37]/20 text-white dark:text-[#F4E4A6] text-xs font-bold uppercase tracking-wider transition-all border border-transparent dark:border-[#D4AF37]/30 hover:gap-3 shadow-[0_4px_15px_rgba(0,0,0,0.2)] dark:shadow-[0_4px_15px_rgba(212,175,55,0.15)] w-full xs:w-auto"
          >
            Detaylar <ArrowRight className="w-4 h-4 text-brand-600 dark:text-[#D4AF37]" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
