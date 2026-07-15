import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Property, PropertyFormData, PropertyStatus, PropertyFilters } from "@/types/property";

// ── Extensive seed data ─────────────────
const MOCK_PROPERTIES: Property[] = [
  {
    id: "prop-1", title: "Modern Boğaz Manzaralı Villa", description: "İstanbul'un en prestijli semtlerinden Yeniköy'de, muhteşem boğaz manzarasına sahip ultra lüks villa.", price: 15000000, city: "İstanbul", district: "Sarıyer", neighborhood: "Yeniköy", address: "Köybaşı Cad. No:123", roomCount: "5+2", bathrooms: 4, squareMeters: 450, grossSquareMeters: 500, floor: "Müstakil", totalFloors: 3, buildingAge: 5, listingType: "Sale", category: "villa", features: ["Boğaz Manzarası", "Havuz", "Akıllı Ev", "Otopark", "Güvenlik"], images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"], status: "published", isFeatured: true, views: 1240, uniqueVisitors: 850, lastViewedAt: new Date().toISOString(), createdAt: new Date(Date.now() - 7 * 86400000).toISOString(), updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(), ownerId: "admin-1", ownerName: "Acente Yönetimi", heatingType: "yerden", balcony: "var", balconyType: "acik", insideSite: false, usageStatus: "bos", titleDeedStatus: "kat_mulkiyetli", mortgageEligible: true, furnishedStatus: "esyasiz", parkingType: "kapali", siteParking: true, buildingParking: true,
  },
  {
    id: "prop-2", title: "Lüks Rezidans Dairesi", description: "Şişli'nin kalbinde, sosyal olanakları bünyesinde barındıran rezidansta yüksek katlı panoramik manzaralı daire.", price: 35000, city: "İstanbul", district: "Şişli", neighborhood: "Mecidiyeköy", roomCount: "2+1", bathrooms: 2, squareMeters: 120, grossSquareMeters: 135, floor: "18", totalFloors: 30, buildingAge: 3, listingType: "Rent", category: "apartment", features: ["Spor Salonu", "Havuz", "Otopark", "Güvenlik", "Konsiyerj"], images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"], status: "published", isFeatured: false, views: 856, uniqueVisitors: 620, lastViewedAt: new Date().toISOString(), createdAt: new Date(Date.now() - 14 * 86400000).toISOString(), updatedAt: new Date(Date.now() - 5 * 86400000).toISOString(), ownerId: "admin-1", ownerName: "Acente Yönetimi", heatingType: "kombi", balcony: "var", balconyType: "fransiz", insideSite: true, usageStatus: "bos", titleDeedStatus: "kat_mulkiyetli", mortgageEligible: true, furnishedStatus: "esyali", parkingType: "kapali", siteParking: true, buildingParking: true,
  },
  {
    id: "prop-3", title: "Bahçeli Müstakil Ev", description: "Büyük bahçesi ve geniş iç mekanıyla aile yaşamına uygun, sakin mahallede müstakil ev.", price: 5500000, city: "Ankara", district: "Çankaya", neighborhood: "Oran", roomCount: "4+1", bathrooms: 3, squareMeters: 280, grossSquareMeters: 310, floor: "Müstakil", totalFloors: 2, buildingAge: 12, listingType: "Sale", category: "house", features: ["Bahçe", "Garaj", "Bodrum Kat", "Teras"], images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"], status: "published", isFeatured: false, views: 420, uniqueVisitors: 310, lastViewedAt: new Date().toISOString(), createdAt: new Date(Date.now() - 30 * 86400000).toISOString(), updatedAt: new Date(Date.now() - 10 * 86400000).toISOString(), ownerId: "admin-1", ownerName: "Acente Yönetimi", heatingType: "merkezi", balcony: "var", balconyType: "acik", insideSite: false, usageStatus: "malik", titleDeedStatus: "kat_mulkiyetli", mortgageEligible: true, furnishedStatus: "esyasiz", parkingType: "acik", buildingParking: true,
  },
  {
    id: "prop-4", title: "A Sınıfı Plaza Ofisi", description: "Çankaya'da A sınıfı binada, modern donanımlı hazır ofis.", price: 45000, city: "Ankara", district: "Çankaya", neighborhood: "Kızılay", roomCount: "1", bathrooms: 1, squareMeters: 85, grossSquareMeters: 95, floor: "7", totalFloors: 15, buildingAge: 8, listingType: "Rent", category: "office", features: ["Asansör", "Güvenlik", "Otopark", "Klima"], images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"], status: "published", isFeatured: false, views: 312, uniqueVisitors: 240, lastViewedAt: new Date().toISOString(), createdAt: new Date(Date.now() - 20 * 86400000).toISOString(), updatedAt: new Date(Date.now() - 8 * 86400000).toISOString(), ownerId: "admin-1", ownerName: "Acente Yönetimi", heatingType: "klima", balcony: "yok", insideSite: true, usageStatus: "bos", titleDeedStatus: "kat_mulkiyetli", mortgageEligible: false, furnishedStatus: "esyali", parkingType: "kapali", siteParking: true, buildingParking: true,
  },
  {
    id: "prop-5", title: "Denize Sıfır Yazlık Daire", description: "Çeşme'de denize sıfır, muhteşem manzaralı yazlık daire.", price: 8500000, city: "İzmir", district: "Çeşme", neighborhood: "Alaçatı", roomCount: "3+1", bathrooms: 2, squareMeters: 180, grossSquareMeters: 200, floor: "2", totalFloors: 5, buildingAge: 2, listingType: "Sale", category: "apartment", features: ["Deniz Manzarası", "Havuz", "Otopark", "Güvenlik"], images: ["https://images.unsplash.com/photo-1571979434498-f5eb8bcbfb56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"], status: "published", isFeatured: true, views: 980, uniqueVisitors: 720, lastViewedAt: new Date().toISOString(), createdAt: new Date(Date.now() - 5 * 86400000).toISOString(), updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(), ownerId: "admin-1", ownerName: "Acente Yönetimi", heatingType: "kombi", balcony: "var", balconyType: "acik", insideSite: true, usageStatus: "bos", titleDeedStatus: "kat_mulkiyetli", mortgageEligible: true, furnishedStatus: "esyali", parkingType: "acik", siteParking: true, buildingParking: true,
  },
  {
    id: "prop-6", title: "Kiralık 3+1 Daire", description: "Kadıköy'de ulaşıma yakın, aile tipi 3+1 daire.", price: 28000, city: "İstanbul", district: "Kadıköy", neighborhood: "Moda", roomCount: "3+1", bathrooms: 2, squareMeters: 130, grossSquareMeters: 145, floor: "4", totalFloors: 8, buildingAge: 20, listingType: "Rent", category: "apartment", features: ["Balkon", "Asansör", "Otopark"], images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"], status: "published", isFeatured: false, views: 650, uniqueVisitors: 480, lastViewedAt: new Date().toISOString(), createdAt: new Date(Date.now() - 3 * 86400000).toISOString(), updatedAt: new Date(Date.now() - 3 * 86400000).toISOString(), ownerId: "user-3", ownerName: "Mert Demir", heatingType: "kombi", balcony: "var", balconyType: "acik", insideSite: false, usageStatus: "kiralik", titleDeedStatus: "kat_mulkiyetli", mortgageEligible: false, furnishedStatus: "esyasiz",
  },
  {
    id: "prop-7", title: "Satılık Arsa - Antalya Merkez", description: "Antalya merkezde imar durumu yüksek satılık arsa.", price: 3200000, city: "Antalya", district: "Muratpaşa", neighborhood: "Güzeloba", roomCount: "1", bathrooms: 0, squareMeters: 500, grossSquareMeters: 500, listingType: "Sale", category: "land", features: ["İmarlı", "Köşe Parsel"], images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"], status: "published", isFeatured: false, views: 234, uniqueVisitors: 180, lastViewedAt: new Date().toISOString(), createdAt: new Date(Date.now() - 45 * 86400000).toISOString(), updatedAt: new Date(Date.now() - 15 * 86400000).toISOString(), ownerId: "user-5", ownerName: "Burak Şahin", titleDeedStatus: "hisseli", mortgageEligible: false,
  },
  {
    id: "prop-8", title: "Bursa Nilüfer'de 2+1 Daire", description: "Nilüfer'de site içinde, bakımlı 2+1 daire.", price: 4800000, city: "Bursa", district: "Nilüfer", neighborhood: "Özlüce", roomCount: "2+1", bathrooms: 1, squareMeters: 95, grossSquareMeters: 110, floor: "3", totalFloors: 6, buildingAge: 10, listingType: "Sale", category: "apartment", features: ["Site İçi", "Güvenlik", "Otopark", "Çocuk Parkı"], images: ["https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"], status: "published", isFeatured: false, views: 445, uniqueVisitors: 320, lastViewedAt: new Date().toISOString(), createdAt: new Date(Date.now() - 12 * 86400000).toISOString(), updatedAt: new Date(Date.now() - 4 * 86400000).toISOString(), ownerId: "user-5", ownerName: "Burak Şahin", heatingType: "merkezi", balcony: "var", balconyType: "acik", insideSite: true, usageStatus: "bos", titleDeedStatus: "kat_mulkiyetli", mortgageEligible: true, furnishedStatus: "esyasiz",
  },
  {
    id: "prop-9", title: "Kadıköy'de Satılık 1+1", description: "Kadıköy'ün kalbinde, ulaşıma yakın şık 1+1 daire.", price: 3900000, city: "İstanbul", district: "Kadıköy", neighborhood: "Caferağa", roomCount: "1+1", bathrooms: 1, squareMeters: 65, grossSquareMeters: 75, floor: "2", totalFloors: 5, buildingAge: 30, listingType: "Sale", category: "apartment", features: ["Asansör", "Eşyalı"], images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"], status: "published", isFeatured: false, views: 780, uniqueVisitors: 540, lastViewedAt: new Date().toISOString(), createdAt: new Date(Date.now() - 2 * 86400000).toISOString(), updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(), ownerId: "user-1", ownerName: "Ahmet Yılmaz", heatingType: "kombi", balcony: "yok", insideSite: false, usageStatus: "bos", titleDeedStatus: "kat_mulkiyetli", mortgageEligible: true, furnishedStatus: "esyali",
  },
];

// ── Filter engine ─────────────────────────────────────────────────────────────
export function applyFilters(properties: Property[], filters: PropertyFilters): Property[] {
  let result = [...properties];

  if (filters.q) {
    const q = filters.q.toLowerCase();
    result = result.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) ||
      p.district.toLowerCase().includes(q) ||
      (p.neighborhood?.toLowerCase().includes(q))
    );
  }
  if (filters.type) result = result.filter(p => p.listingType === filters.type);
  if (filters.category) result = result.filter(p => p.category === filters.category);
  if (filters.city) result = result.filter(p => p.city === filters.city);
  if (filters.district) result = result.filter(p => p.district === filters.district);
  if (filters.neighborhood) result = result.filter(p => p.neighborhood === filters.neighborhood);
  if (filters.minPrice) result = result.filter(p => p.price >= filters.minPrice!);
  if (filters.maxPrice) result = result.filter(p => p.price <= filters.maxPrice!);
  if (filters.minSqm) result = result.filter(p => p.squareMeters >= filters.minSqm!);
  if (filters.maxSqm) result = result.filter(p => p.squareMeters <= filters.maxSqm!);
  if (filters.rooms && filters.rooms.length > 0) result = result.filter(p => filters.rooms!.includes(p.roomCount));
  if (filters.bathrooms) result = result.filter(p => p.bathrooms >= Number(filters.bathrooms));
  if (filters.heatingType) result = result.filter(p => p.heatingType === filters.heatingType);
  if (filters.balcony) result = result.filter(p => p.balcony === filters.balcony);
  if (filters.balconyType) result = result.filter(p => p.balconyType === filters.balconyType);
  if (filters.insideSite === "evet") result = result.filter(p => p.insideSite === true);
  if (filters.insideSite === "hayir") result = result.filter(p => p.insideSite === false);
  if (filters.parkingType) result = result.filter(p => p.parkingType === filters.parkingType);
  if (filters.siteParking === "evet") result = result.filter(p => p.siteParking === true);
  if (filters.siteParking === "hayir") result = result.filter(p => p.siteParking === false);
  if (filters.buildingParking === "evet") result = result.filter(p => p.buildingParking === true);
  if (filters.buildingParking === "hayir") result = result.filter(p => p.buildingParking === false);
  if (filters.usageStatus) result = result.filter(p => p.usageStatus === filters.usageStatus);
  if (filters.titleDeedStatus) result = result.filter(p => p.titleDeedStatus === filters.titleDeedStatus);
  if (filters.mortgageEligible === "uygun") result = result.filter(p => p.mortgageEligible === true);
  if (filters.mortgageEligible === "uygun_degil") result = result.filter(p => p.mortgageEligible === false);
  if (filters.furnishedStatus) result = result.filter(p => p.furnishedStatus === filters.furnishedStatus);
  if (filters.listedBy) result = result.filter(p => p.listedBy === filters.listedBy);

  if (filters.listingDate) {
    const now = Date.now();
    const msMap: Record<string, number> = { "24h": 86400000, "7d": 7 * 86400000, "30d": 30 * 86400000 };
    const ms = msMap[filters.listingDate];
    if (ms) result = result.filter(p => now - new Date(p.createdAt).getTime() <= ms);
  }

  // Sort
  if (filters.sort === "newest") result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  else if (filters.sort === "price_asc") result.sort((a, b) => a.price - b.price);
  else if (filters.sort === "price_desc") result.sort((a, b) => b.price - a.price);
  else if (filters.sort === "most_viewed") result.sort((a, b) => b.views - a.views);
  else result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return result;
}

// ── Store Interface ───────────────────────────────────────────────────────────
interface PropertyState {
  properties: Property[];
  addProperty: (data: PropertyFormData) => Property;
  updateProperty: (id: string, data: Partial<PropertyFormData>) => void;
  deleteProperty: (id: string) => void;
  togglePublish: (id: string) => void;
  toggleFeatured: (id: string) => void;
  setStatus: (id: string, status: PropertyStatus) => void;
  incrementViews: (id: string, isUnique?: boolean) => void;
  resetData: () => void;
  getPropertyById: (id: string) => Property | undefined;
  getUserProperties: (userId: string) => Property[];
  getTrendingProperties: (limit?: number) => Property[];
  getMostViewed: (limit?: number) => Property[];
  getTotalViews: () => number;
}

export const usePropertyStore = create<PropertyState>()(
  persist(
    (set, get) => ({
      properties: MOCK_PROPERTIES,

      addProperty: (data) => {
        const newProperty: Property = {
          ...data,
          id: `prop-${Date.now()}`,
          isFeatured: false,
          views: 0,
          uniqueVisitors: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ownerId: "admin-1",
          ownerName: "Acente Yönetimi",
        };
        set((state) => ({ properties: [newProperty, ...state.properties] }));
        return newProperty;
      },

      updateProperty: (id, data) => {
        set((state) => ({
          properties: state.properties.map((p) =>
            p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p
          ),
        }));
      },

      deleteProperty: (id) => {
        set((state) => ({ properties: state.properties.filter((p) => p.id !== id) }));
      },

      togglePublish: (id) => {
        set((state) => ({
          properties: state.properties.map((p) =>
            p.id === id
              ? { ...p, status: p.status === "published" ? "draft" : "published", updatedAt: new Date().toISOString() }
              : p
          ),
        }));
      },

      toggleFeatured: (id) => {
        set((state) => ({
          properties: state.properties.map((p) =>
            p.id === id ? { ...p, isFeatured: !p.isFeatured } : p
          ),
        }));
      },

      setStatus: (id, status) => {
        set((state) => ({
          properties: state.properties.map((p) =>
            p.id === id ? { ...p, status, updatedAt: new Date().toISOString() } : p
          ),
        }));
      },

      incrementViews: (id, isUnique = false) => {
        set((state) => ({
          properties: state.properties.map((p) =>
            p.id === id ? { 
              ...p, 
              views: p.views + 1,
              uniqueVisitors: isUnique ? p.uniqueVisitors + 1 : p.uniqueVisitors,
              lastViewedAt: new Date().toISOString()
            } : p
          ),
        }));
      },

      getPropertyById: (id) => get().properties.find((p) => p.id === id),
      getUserProperties: (userId) => get().properties.filter((p) => p.ownerId === userId),
      getTrendingProperties: (limit = 5) => {
        return [...get().properties]
          .sort((a, b) => (b.views / (Date.now() - new Date(b.createdAt).getTime())) - (a.views / (Date.now() - new Date(a.createdAt).getTime())))
          .slice(0, limit);
      },
      getMostViewed: (limit = 5) => {
        return [...get().properties].sort((a, b) => b.views - a.views).slice(0, limit);
      },
      getTotalViews: () => {
        return get().properties.reduce((sum, p) => sum + p.views, 0);
      },
      resetData: () => {
        set({ properties: MOCK_PROPERTIES });
      }
    }),
    { name: "emlak-property-store" }
  )
);
