export type PropertyStatus = "published" | "draft" | "pending";
export type ListingType = "Sale" | "Rent";
export type PropertyCategory = "apartment" | "villa" | "office" | "land" | "house";

export type HeatingType = "kombi" | "merkezi" | "yerden" | "klima" | "soba" | "yok";
export type BalconyStatus = "var" | "yok";
export type BalconyType = "acik" | "kapali" | "fransiz";
export type TitleDeedStatus = "kat_mulkiyetli" | "kat_irtifakli" | "hisseli";
export type FurnishedStatus = "esyali" | "esyasiz";
export type ListedBy = "sahibinden" | "emlak_ofisi" | "insaat_firmasi";
export type ParkingType = "acik" | "kapali" | "yok";
export type UsageStatus = "bos" | "kiralik" | "malik";

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  city: string;
  district: string;
  neighborhood?: string;
  address?: string;
  roomCount: string;
  bathrooms: number;
  squareMeters: number;
  grossSquareMeters?: number;
  floor?: string;
  totalFloors?: number;
  buildingAge?: number;
  listingType: ListingType;
  category: PropertyCategory;
  features: string[];
  images: string[];
  status: PropertyStatus;
  isFeatured: boolean;
  views: number;
  uniqueVisitors: number;
  lastViewedAt?: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  ownerName: string;
  // Advanced fields
  heatingType?: HeatingType;
  balcony?: BalconyStatus;
  balconyType?: BalconyType;
  insideSite?: boolean;
  usageStatus?: UsageStatus;
  titleDeedStatus?: TitleDeedStatus;
  mortgageEligible?: boolean;
  furnishedStatus?: FurnishedStatus;
  parkingType?: ParkingType;
  siteParking?: boolean;
  buildingParking?: boolean;
  latitude?: number;
  longitude?: number;
  listedBy?: ListedBy;
  buildingStatus?: string;
}

export type PropertyFormData = Omit<
  Property,
  "id" | "views" | "uniqueVisitors" | "createdAt" | "updatedAt" | "ownerId" | "ownerName" | "isFeatured"
>;

// ── Filter types ─────────────────────────────────────────────────────────────
export interface PropertyFilters {
  q?: string;
  type?: string;          // Sale | Rent
  category?: string;
  city?: string;
  district?: string;
  neighborhood?: string;
  minPrice?: number;
  maxPrice?: number;
  minSqm?: number;
  maxSqm?: number;
  rooms?: string[];
  bathrooms?: string;
  minBuildingAge?: number;
  maxBuildingAge?: number;
  floor?: string;
  totalFloors?: string;
  heatingType?: string;
  balcony?: string;
  balconyType?: string;
  insideSite?: string;
  buildingStatus?: string;
  usageStatus?: string;
  titleDeedStatus?: string;
  mortgageEligible?: string;
  furnishedStatus?: string;
  parkingType?: string;
  siteParking?: string;
  buildingParking?: string;
  listedBy?: string;
  listingDate?: string;   // 24h | 7d | 30d
  sort?: string;          // newest | price_asc | price_desc | most_viewed
}
