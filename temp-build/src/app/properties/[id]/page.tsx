"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  BedDouble, Bath, Square, MapPin, Heart, Share2, Phone, 
  MessageCircle, ChevronLeft, ChevronRight, Check, Home, 
  Eye, Calendar, Loader2, Send, Clock, Award, ShieldCheck 
} from "lucide-react";
import { useCMSStore } from "@/store/cmsStore";
import { Button } from "@/components/ui/Button";
import { usePropertyStore } from "@/store/propertyStore";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { getPropertyById, incrementViews } = usePropertyStore();
  const { footer, contactSettings, addMessage } = useCMSStore();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const data = getPropertyById(id);
    if (data) {
      setProperty(data);
      
      // View tracking with session protection
      const sessionKey = `viewed_${id}`;
      const hasViewed = sessionStorage.getItem(sessionKey);
      
      if (!hasViewed) {
        // Check localStorage for unique visitor tracking (more persistent)
        const localKey = `v_u_${id}`;
        const isUnique = !localStorage.getItem(localKey);
        
        incrementViews(id, isUnique);
        sessionStorage.setItem(sessionKey, "true");
        if (isUnique) localStorage.setItem(localKey, "true");
      }
    }
    setLoading(false);
  }, [id, getPropertyById, incrementViews]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <Loader2 className="w-10 h-10 text-brand-600 animate-spin" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">İlan Bulunamadı</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 text-center">Aradığınız ilan silinmiş veya taşınmış olabilir.</p>
        <Button onClick={() => router.push("/properties")} size="lg">İlanlara Göz At</Button>
      </div>
    );
  }

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20">
      {/* Image Gallery */}
      <div className="relative h-[60vh] min-h-[500px] w-full bg-slate-900 group">
        <Image 
          src={property.images[currentImageIndex] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"} 
          alt={property.title} 
          fill 
          className="object-cover opacity-90 transition-opacity duration-500"
          priority
        />
        
        {/* Navigation Arrows */}
        {property.images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full glass hover:bg-white/90 transition-all opacity-0 group-hover:opacity-100 z-10">
              <ChevronLeft className="w-6 h-6 text-slate-900" />
            </button>
            <button onClick={nextImage} className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full glass hover:bg-white/90 transition-all opacity-0 group-hover:opacity-100 z-10">
              <ChevronRight className="w-6 h-6 text-slate-900" />
            </button>
          </>
        )}

        {/* Gallery Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full text-sm font-medium text-slate-900">
          {currentImageIndex + 1} / {property.images.length}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content */}
          <div className="flex-1 space-y-10">
            {/* Header Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 px-3 py-1 rounded-full text-sm font-semibold">
                  {property.listingType === "Sale" ? "Satılık" : "Kiralık"}
                </span>
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                  {property.category}
                </span>
                <div className="flex items-center gap-1.5 text-slate-400 text-sm ml-auto">
                  <Eye className="w-4 h-4" />
                  <span>{(property.views || 0).toLocaleString("tr-TR")} görüntülenme</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                {property.title}
              </h1>
              <div className="flex flex-wrap items-center gap-y-2 text-slate-500 dark:text-slate-400">
                <div className="flex items-center mr-6">
                  <MapPin className="w-5 h-5 mr-2 text-brand-500" />
                  {property.district}, {property.city}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-brand-500" />
                  {format(new Date(property.createdAt), "dd MMMM yyyy", { locale: tr })}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center shadow-sm">
                <BedDouble className="w-6 h-6 text-brand-500 mb-2" />
                <span className="text-slate-500 dark:text-slate-400 text-sm">Oda Sayısı</span>
                <span className="font-semibold text-slate-900 dark:text-white">{property.roomCount}</span>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center shadow-sm">
                <Bath className="w-6 h-6 text-brand-500 mb-2" />
                <span className="text-slate-500 dark:text-slate-400 text-sm">Banyo</span>
                <span className="font-semibold text-slate-900 dark:text-white">{property.bathrooms}</span>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center shadow-sm">
                <Square className="w-6 h-6 text-brand-500 mb-2" />
                <span className="text-slate-500 dark:text-slate-400 text-sm">Net Alan</span>
                <span className="font-semibold text-slate-900 dark:text-white">{property.squareMeters} m²</span>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center shadow-sm">
                <Home className="w-6 h-6 text-brand-500 mb-2" />
                <span className="text-slate-500 dark:text-slate-400 text-sm">Kat</span>
                <span className="font-semibold text-slate-900 dark:text-white">{property.floor}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Açıklama</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap mb-8">
                {property.description}
              </p>
            </div>

            {/* Detailed Info Table */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">İlan Bilgileri</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {[
                  { label: "İlan No", value: property.id.split("-")[1] || property.id },
                  { label: "İlan Tarihi", value: format(new Date(property.createdAt), "dd MMMM yyyy", { locale: tr }) },
                  { label: "Emlak Tipi", value: property.category === "apartment" ? "Daire" : property.category === "villa" ? "Villa" : property.category === "house" ? "Müstakil Ev" : property.category === "office" ? "Ofis" : "Arsa" },
                  { label: "m² (Brüt)", value: property.grossSquareMeters ? `${property.grossSquareMeters} m²` : "-" },
                  { label: "m² (Net)", value: `${property.squareMeters} m²` },
                  { label: "Oda Sayısı", value: property.roomCount },
                  { label: "Bina Yaşı", value: property.buildingAge ? `${property.buildingAge} yıl` : "0 (Yeni)" },
                  { label: "Bulunduğu Kat", value: property.floor || "-" },
                  { label: "Kat Sayısı", value: property.totalFloors || "-" },
                  { label: "Isıtma", value: property.heatingType ? (property.heatingType === "kombi" ? "Kombi (Doğalgaz)" : property.heatingType === "merkezi" ? "Merkezi" : property.heatingType === "yerden" ? "Yerden Isıtma" : property.heatingType === "klima" ? "Klima" : "Soba") : "-" },
                  { label: "Banyo Sayısı", value: property.bathrooms },
                  { label: "Balkon", value: property.balcony === "var" ? `Var (${property.balconyType === "acik" ? "Açık" : property.balconyType === "kapali" ? "Kapalı" : "Fransız"})` : "Yok" },
                  { label: "Eşyalı", value: property.furnishedStatus === "esyali" ? "Evet" : "Hayır" },
                  { label: "Kullanım Durumu", value: property.usageStatus === "bos" ? "Boş" : property.usageStatus === "kiralik" ? "Kiracılı" : "Mülk Sahibi" },
                  { label: "Site İçerisinde", value: property.insideSite ? "Evet" : "Hayır" },
                  { label: "Otopark", value: property.parkingType === "kapali" ? "Kapalı Otopark" : property.parkingType === "acik" ? "Açık Otopark" : "Yok" },
                  { label: "Site Otoparkı", value: property.siteParking ? "Var" : "Yok" },
                  { label: "Bina Otoparkı", value: property.buildingParking ? "Var" : "Yok" },
                  { label: "Krediye Uygun", value: property.mortgageEligible ? "Evet" : "Hayır" },
                  { label: "Tapu Durumu", value: property.titleDeedStatus === "kat_mulkiyetli" ? "Kat Mülkiyetli" : property.titleDeedStatus === "kat_irtifakli" ? "Kat İrtifaklı" : "Hisseli Tapu" },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{item.label}</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Özellikler</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <div className="bg-brand-50 dark:bg-brand-900/30 p-1 rounded-full">
                        <Check className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Konum</h2>
              <div className="w-full h-[400px] bg-slate-200 dark:bg-slate-800 rounded-3xl flex items-center justify-center border border-slate-200 dark:border-slate-700">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Harita Yükleniyor...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar / Contact Card */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-700 sticky top-28">
              <div className="text-3xl font-bold text-brand-600 dark:text-brand-400 mb-6 pb-6 border-b border-slate-100 dark:border-slate-700">
                {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(property.price)}
                {property.listingType === "Rent" && <span className="text-sm font-normal text-slate-400 ml-1">/ay</span>}
              </div>

              <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="w-16 h-16 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Kurumsal Danışmanlık</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" /> Yetkili Portföy
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <Button 
                  className="w-full rounded-xl h-12 font-bold text-base shadow-lg shadow-brand-500/20" 
                  size="lg"
                  onClick={() => window.open(`tel:${contactSettings.phones[0]}`)}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Müşteri Temsilcisini Ara
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full rounded-xl h-12 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white font-bold" 
                  size="lg"
                  onClick={() => window.open(`https://wa.me/${contactSettings.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`${property.title} (İlan No: ${property.id}) hakkında bilgi almak istiyorum.`)}`)}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp İle Sorun
                </Button>
                <Button variant="ghost" className="w-full rounded-xl h-12 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-2" size="lg">
                  <Calendar className="w-5 h-5" />
                  Randevu Talep Et
                </Button>
              </div>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/20 mb-6">
                 <div className="flex items-center gap-3 text-emerald-700 dark:text-emerald-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Hızlı Yanıt Süresi: ~15 dk</span>
                 </div>
              </div>

              <div className="space-y-4 mb-6">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Hızlı İletişim Formu</p>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  addMessage({
                    fullName: fd.get("name") as string,
                    email: fd.get("email") as string,
                    phone: fd.get("phone") as string,
                    subject: `İlan Hakkında Bilgi: ${property.title}`,
                    message: `${property.title} ilanı hakkında bilgi almak istiyorum.`,
                    propertyId: property.id
                  });
                  alert("Mesajınız başarıyla iletildi. Temsilcimiz en kısa sürede size dönecektir.");
                  (e.target as HTMLFormElement).reset();
                }} className="space-y-2">
                   <input name="name" required placeholder="Adınız Soyadınız" className="w-full h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500" />
                   <input name="phone" required placeholder="Telefon Numaranız" className="w-full h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500" />
                   <input name="email" type="email" placeholder="E-posta Adresiniz (Opsiyonel)" className="w-full h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500" />
                   <Button type="submit" className="w-full rounded-xl h-10 text-xs font-bold uppercase tracking-widest">
                      <Send className="w-3 h-3 mr-2" /> Bilgi Al
                   </Button>
                </form>
              </div>

              <div className="flex gap-3 pt-6 border-t border-slate-100 dark:border-slate-700">
                <Button variant="outline" className="flex-1 rounded-xl text-slate-600 dark:text-slate-300 hover:text-brand-600">
                  <Heart className="w-5 h-5 mr-2" /> Favori
                </Button>
                <Button variant="outline" className="flex-1 rounded-xl text-slate-600 dark:text-slate-300 hover:text-brand-600">
                  <Share2 className="w-5 h-5 mr-2" /> Paylaş
                </Button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
