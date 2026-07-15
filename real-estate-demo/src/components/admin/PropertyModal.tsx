"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { usePropertyStore } from "@/store/propertyStore";
import { ImageUpload } from "./ImageUpload";
import type { Property, PropertyCategory, ListingType, PropertyStatus } from "@/types/property";

const schema = z.object({
  title: z.string().min(5, "Başlık en az 5 karakter"),
  description: z.string().min(10, "Açıklama en az 10 karakter"),
  price: z.coerce.number().min(1, "Fiyat giriniz"),
  city: z.string().min(2, "Şehir giriniz"),
  district: z.string().min(2, "İlçe giriniz"),
  neighborhood: z.string().optional(),
  address: z.string().optional(),
  listingType: z.enum(["Sale", "Rent"]),
  category: z.enum(["apartment", "villa", "office", "land", "house"]),
  roomCount: z.string().min(1),
  bathrooms: z.coerce.number().min(0),
  squareMeters: z.coerce.number().min(1),
  grossSquareMeters: z.coerce.number().optional(),
  floor: z.string().optional(),
  totalFloors: z.coerce.number().optional(),
  buildingAge: z.coerce.number().optional(),
  status: z.enum(["published", "draft", "pending"]),
  isFeatured: z.boolean().default(false),
  // Advanced
  heatingType: z.enum(["kombi", "merkezi", "yerden", "klima", "soba", "yok", ""]).optional(),
  balcony: z.enum(["var", "yok", ""]).optional(),
  balconyType: z.enum(["acik", "kapali", "fransiz", ""]).optional(),
  parkingType: z.enum(["acik", "kapali", "yok", ""]).optional(),
  siteParking: z.boolean().optional(),
  buildingParking: z.boolean().optional(),
  insideSite: z.boolean().optional(),
  usageStatus: z.enum(["bos", "kiralik", "malik", ""]).optional(),
  titleDeedStatus: z.enum(["kat_mulkiyetli", "kat_irtifakli", "hisseli", ""]).optional(),
  mortgageEligible: z.boolean().optional(),
  furnishedStatus: z.enum(["esyali", "esyasiz", ""]).optional(),
});

type FormData = z.infer<typeof schema>;

interface PropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProperty?: Property | null;
}

// Shared CSS
const selCls = "w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 outline-none";
const inputCls = "w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 outline-none";

// Accordion section inside modal
function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden">
      <button type="button" onClick={() => setOpen(v => !v)}
        className="flex items-center justify-between w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-200">
        {title}
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-4 py-4 space-y-3 bg-white dark:bg-slate-900">{children}</div>}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">{children}</label>;
}

export function PropertyModal({ isOpen, onClose, editingProperty }: PropertyModalProps) {
  const { addProperty, updateProperty } = usePropertyStore();
  const isEdit = !!editingProperty;

  const p = editingProperty;
  const [images, setImages] = useState<string[]>(p?.images || []);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: p ? {
      title: p.title, description: p.description, price: p.price,
      city: p.city, district: p.district, neighborhood: p.neighborhood ?? "",
      address: p.address ?? "", listingType: p.listingType, category: p.category,
      roomCount: p.roomCount, bathrooms: p.bathrooms, squareMeters: p.squareMeters,
      grossSquareMeters: p.grossSquareMeters, floor: p.floor ?? "",
      totalFloors: p.totalFloors, buildingAge: p.buildingAge,
      status: p.status === "pending" ? "pending" : p.status,
      heatingType: (p.heatingType ?? "") as any,
      balcony: (p.balcony ?? "") as any,
      balconyType: (p.balconyType ?? "") as any,
      insideSite: p.insideSite,
      parkingType: (p.parkingType ?? "") as any,
      siteParking: p.siteParking,
      buildingParking: p.buildingParking,
      usageStatus: (p.usageStatus ?? "") as any,
      titleDeedStatus: (p.titleDeedStatus ?? "") as any,
      mortgageEligible: p.mortgageEligible,
      furnishedStatus: (p.furnishedStatus ?? "") as any,
      isFeatured: p.isFeatured || false,
    } : {
      listingType: "Sale", category: "apartment", status: "published",
      bathrooms: 1, roomCount: "2+1", isFeatured: false,
    },
  });

  const watchedBalcony = watch("balcony");

  const onSubmit = (data: FormData) => {
    const clean = {
      ...data,
      listingType: data.listingType as ListingType,
      category: data.category as PropertyCategory,
      status: data.status as PropertyStatus,
      heatingType: (data.heatingType || undefined) as any,
      balcony: (data.balcony || undefined) as any,
      balconyType: (data.balconyType || undefined) as any,
      parkingType: (data.parkingType || undefined) as any,
      usageStatus: (data.usageStatus || undefined) as any,
      titleDeedStatus: (data.titleDeedStatus || undefined) as any,
      furnishedStatus: (data.furnishedStatus || undefined) as any,
      features: isEdit ? (p?.features ?? []) : [],
      images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
    };

    if (isEdit && p) updateProperty(p.id, clean);
    else addProperty(clean);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh]">
            {/* Sticky header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex-shrink-0">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {isEdit ? "İlanı Düzenle" : "Yeni İlan Ekle"}
              </h3>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Scrollable form */}
            <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto flex-1 px-6 py-4 space-y-4">

              {/* ── Temel Bilgiler ── */}
              <Section title="📋 Temel Bilgiler">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>İlan Tipi</Label>
                    <select {...register("listingType")} className={selCls}>
                      <option value="Sale">Satılık</option>
                      <option value="Rent">Kiralık</option>
                    </select>
                  </div>
                  <div>
                    <Label>Kategori</Label>
                    <select {...register("category")} className={selCls}>
                      <option value="apartment">Daire</option>
                      <option value="villa">Villa</option>
                      <option value="house">Müstakil Ev</option>
                      <option value="office">Ofis</option>
                      <option value="land">Arsa</option>
                    </select>
                  </div>
                </div>
                <div>
                  <Label>Başlık</Label>
                  <Input {...register("title")} placeholder="İlan başlığı" className="h-9 text-sm" />
                  {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                </div>
                <div>
                  <Label>Açıklama</Label>
                  <textarea {...register("description")} rows={3}
                    className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 outline-none resize-none"
                    placeholder="Mülk açıklaması..." />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>
                <div>
                  <Label>Durum</Label>
                  <select {...register("status")} className={selCls}>
                    <option value="published">Yayında</option>
                    <option value="pending">Onay Bekliyor</option>
                    <option value="draft">Taslak</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <input type="checkbox" id="isFeatured" {...register("isFeatured")} 
                    className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                  <label htmlFor="isFeatured" className="text-sm font-medium text-slate-700 dark:text-slate-200 cursor-pointer">
                    Öne Çıkan İlan Olarak İşaretle (Anasayfada Üstte Görünür)
                  </label>
                </div>
              </Section>

              {/* ── Konum ── */}
              <Section title="📍 Konum">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Şehir</Label>
                    <select {...register("city")} className={selCls}>
                      <option value="">Seçin...</option>
                      {["İstanbul","Ankara","İzmir","Antalya","Bursa","Adana","Konya","Gaziantep","Mersin","Kayseri"].map(c =>
                        <option key={c} value={c}>{c}</option>)}
                    </select>
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                  </div>
                  <div>
                    <Label>İlçe</Label>
                    <input {...register("district")} placeholder="İlçe" className={inputCls} />
                    {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district.message}</p>}
                  </div>
                  <div>
                    <Label>Mahalle</Label>
                    <input {...register("neighborhood")} placeholder="Mahalle" className={inputCls} />
                  </div>
                  <div>
                    <Label>Adres</Label>
                    <input {...register("address")} placeholder="Cadde, No..." className={inputCls} />
                  </div>
                </div>
              </Section>

              {/* ── Görseller ── */}
              <Section title="🖼️ İlan Görselleri">
                <ImageUpload 
                  value={images} 
                  onChange={(urls) => setImages(urls)}
                  onRemove={(url) => setImages(images.filter(i => i !== url))}
                  maxFiles={10}
                  bucket="properties"
                />
              </Section>

              {/* ── Fiyat & Teknik ── */}
              <Section title="💰 Fiyat & Teknik Detaylar">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Fiyat (₺)</Label>
                    <input type="number" {...register("price")} placeholder="5000000" className={inputCls} />
                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                  </div>
                  <div>
                    <Label>Oda Sayısı</Label>
                    <select {...register("roomCount")} className={selCls}>
                      {["Stüdyo","1+0","1+1","2+1","3+1","3+2","4+1","4+2","5+1","5+2","6+","Müstakil"].map(r =>
                        <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <Label>Net m²</Label>
                    <input type="number" {...register("squareMeters")} placeholder="120" className={inputCls} />
                  </div>
                  <div>
                    <Label>Brüt m²</Label>
                    <input type="number" {...register("grossSquareMeters")} placeholder="135" className={inputCls} />
                  </div>
                  <div>
                    <Label>Banyo Sayısı</Label>
                    <input type="number" {...register("bathrooms")} min="0" placeholder="2" className={inputCls} />
                  </div>
                  <div>
                    <Label>Bina Yaşı</Label>
                    <input type="number" {...register("buildingAge")} min="0" placeholder="0" className={inputCls} />
                  </div>
                  <div>
                    <Label>Bulunduğu Kat</Label>
                    <input {...register("floor")} placeholder="3 veya Müstakil" className={inputCls} />
                  </div>
                  <div>
                    <Label>Toplam Kat</Label>
                    <input type="number" {...register("totalFloors")} placeholder="8" className={inputCls} />
                  </div>
                </div>
              </Section>

              {/* ── Bina Özellikleri ── */}
              <Section title="🏗️ Bina Özellikleri" defaultOpen={false}>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Isıtma Tipi</Label>
                    <select {...register("heatingType")} className={selCls}>
                      <option value="">Seçin...</option>
                      <option value="kombi">Kombi Doğalgaz</option>
                      <option value="merkezi">Merkezi Sistem</option>
                      <option value="yerden">Yerden Isıtma</option>
                      <option value="klima">Klima</option>
                      <option value="soba">Soba</option>
                      <option value="yok">Yok</option>
                    </select>
                  </div>
                  <div>
                    <Label>Balkon</Label>
                    <select {...register("balcony")} className={selCls}>
                      <option value="">Seçin...</option>
                      <option value="var">Var</option>
                      <option value="yok">Yok</option>
                    </select>
                  </div>
                  {watchedBalcony === "var" && (
                    <div>
                      <Label>Balkon Tipi</Label>
                      <select {...register("balconyType")} className={selCls}>
                        <option value="">Seçin...</option>
                        <option value="acik">Açık Balkon</option>
                        <option value="kapali">Kapalı Balkon</option>
                        <option value="fransiz">Fransız Balkon</option>
                      </select>
                    </div>
                  )}
                  <div>
                    <Label>Site İçerisinde</Label>
                    <select {...register("insideSite", { setValueAs: v => v === "true" })} className={selCls}>
                      <option value="">Seçin...</option>
                      <option value="true">Evet</option>
                      <option value="false">Hayır</option>
                    </select>
                  </div>
                </div>
              </Section>

              {/* ── Mülk Durumu ── */}
              <Section title="📄 Mülk Durumu" defaultOpen={false}>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Kullanım Durumu</Label>
                    <select {...register("usageStatus")} className={selCls}>
                      <option value="">Seçin...</option>
                      <option value="bos">Boş</option>
                      <option value="kiralik">Kiracılı</option>
                      <option value="malik">Mülk Sahibi Oturuyor</option>
                    </select>
                  </div>
                  <div>
                    <Label>Tapu Durumu</Label>
                    <select {...register("titleDeedStatus")} className={selCls}>
                      <option value="">Seçin...</option>
                      <option value="kat_mulkiyetli">Kat Mülkiyetli</option>
                      <option value="kat_irtifakli">Kat İrtifaklı</option>
                      <option value="hisseli">Hisseli Tapu</option>
                    </select>
                  </div>
                  <div>
                    <Label>Krediye Uygunluk</Label>
                    <select {...register("mortgageEligible", { setValueAs: v => v === "true" })} className={selCls}>
                      <option value="">Seçin...</option>
                      <option value="true">Uygun</option>
                      <option value="false">Uygun Değil</option>
                    </select>
                  </div>
                  <div>
                    <Label>Eşya Durumu</Label>
                    <select {...register("furnishedStatus")} className={selCls}>
                      <option value="">Seçin...</option>
                      <option value="esyali">Eşyalı</option>
                      <option value="esyasiz">Eşyasız</option>
                    </select>
                  </div>
                </div>
              </Section>

              {/* ── Otopark ── */}
              <Section title="🚗 Otopark" defaultOpen={false}>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Otopark Tipi</Label>
                    <select {...register("parkingType")} className={selCls}>
                      <option value="">Seçin...</option>
                      <option value="acik">Açık Otopark</option>
                      <option value="kapali">Kapalı Otopark</option>
                      <option value="yok">Otopark Yok</option>
                    </select>
                  </div>
                  <div>
                    <Label>Site Otoparkı</Label>
                    <select {...register("siteParking", { setValueAs: v => v === "true" })} className={selCls}>
                      <option value="">Seçin...</option>
                      <option value="true">Var</option>
                      <option value="false">Yok</option>
                    </select>
                  </div>
                  <div>
                    <Label>Bina Otoparkı</Label>
                    <select {...register("buildingParking", { setValueAs: v => v === "true" })} className={selCls}>
                      <option value="">Seçin...</option>
                      <option value="true">Var</option>
                      <option value="false">Yok</option>
                    </select>
                  </div>
                </div>
              </Section>
            </form>

            {/* Sticky footer */}
            <div className="flex gap-3 px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex-shrink-0">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-xl h-10">İptal</Button>
              <Button type="submit" form="prop-form" className="flex-1 rounded-xl h-10"
                onClick={handleSubmit(onSubmit)}>
                {isEdit ? "✓ Güncelle" : "+ İlan Ekle"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
