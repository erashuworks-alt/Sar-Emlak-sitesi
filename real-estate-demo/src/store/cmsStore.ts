import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { 
  BlogPost, FAQItem, BrandingSettings, PopularRegion,
  HeaderSettings, FooterSettings, HomepageContent, HomeSection,
  Category, AboutPageContent, ContactSettings, ContactMessage
} from "@/types/cms";

interface CMSState {
  header: HeaderSettings;
  footer: FooterSettings;
  home: HomepageContent;
  homeSections: HomeSection[];
  categories: Category[];
  
  about: AboutPageContent;
  contactSettings: ContactSettings;
  messages: ContactMessage[];
  faqs: FAQItem[];
  blogPosts: BlogPost[];
  popularRegions: PopularRegion[];
  isMaintenanceMode: boolean;
  maintenanceSettings: {
    estimatedDuration: string;
    backgroundImage: string;
    backgroundVideo: string;
    title: string;
    description: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
  };
  branding: BrandingSettings;
  
  // Actions
  updateHeader: (settings: Partial<HeaderSettings>) => void;
  updateFooter: (settings: Partial<FooterSettings>) => void;
  updateHome: (content: Partial<HomepageContent>) => void;
  updateAbout: (content: Partial<AboutPageContent>) => void;
  updateContactSettings: (settings: Partial<ContactSettings>) => void;
  
  // Home Section Actions
  addHomeSection: (section: Omit<HomeSection, "id" | "order">) => void;
  updateHomeSection: (id: string, section: Partial<HomeSection>) => void;
  deleteHomeSection: (id: string) => void;
  reorderHomeSections: (sections: HomeSection[]) => void;
  
  // Message Actions
  addMessage: (message: Omit<ContactMessage, "id" | "createdAt" | "isRead">) => void;
  markMessageAsRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  
  // Popular Regions Actions
  addPopularRegion: (region: Omit<PopularRegion, "id" | "createdAt">) => void;
  updatePopularRegion: (id: string, region: Partial<PopularRegion>) => void;
  deletePopularRegion: (id: string) => void;
  
  // Blog Actions
  addBlogPost: (post: Omit<BlogPost, "id" | "createdAt">) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  
  // FAQ Actions
  addFAQ: (faq: Omit<FAQItem, "id">) => void;
  updateFAQ: (id: string, faq: Partial<FAQItem>) => void;
  deleteFAQ: (id: string) => void;
  reorderFAQs: (faqs: FAQItem[]) => void;
  
  // Category Actions
  addCategory: (category: Omit<Category, "id" | "createdAt">) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  reorderCategories: (categories: Category[]) => void;
  setMaintenanceMode: (isActive: boolean) => void;
  updateMaintenanceSettings: (settings: Partial<CMSState["maintenanceSettings"]>) => void;
  updateTheme: (theme: Partial<CMSState["theme"]>) => void;
  updateBranding: (branding: Partial<BrandingSettings>) => void;
}

const INITIAL_HEADER: HeaderSettings = {
  logoText: "LUXURY GOLD",
  navigation: [
    { id: "1", title: "Anasayfa", href: "/", order: 0, isActive: true },
    { id: "2", title: "Seçkin Portföy", href: "/properties", order: 1, isActive: true },
    { id: "3", title: "Prestijli Bölgeler", href: "/populer-bolgeler", order: 2, isActive: true },
    { id: "4", title: "Yatırım Rehberi", href: "/emlak-rehberi", order: 3, isActive: true },
    { id: "5", title: "Hakkımızda", href: "/about", order: 4, isActive: true },
    { id: "6", title: "Sıkça Sorulanlar", href: "/sss", order: 5, isActive: true },
    { id: "7", title: "İletişim", href: "/contact", order: 6, isActive: true },
  ],
  ctaText: "VIP İletişim",
  ctaLink: "/contact",
  showCTA: true,
  showAnnouncement: true,
  announcementText: "Dubai konseptli seçkin gayrimenkul portföyümüze hoş geldiniz.",
  announcementLink: "/contact",
  isSticky: true,
  isTransparent: true,
};

const INITIAL_FOOTER: FooterSettings = {
  description: "Dubai standartlarında premium gayrimenkul ve lüks yaşam alanları. Eşsiz portföyümüzle ayrıcalıklı bir dünyaya adım atın.",
  backgroundColor: "#050816",
  email: "vip@luxurygold.com",
  phone: "+90 (212) 555 0123",
  address: "Zorlu Center, Levazım Mah. Koru Sok. No:2, Beşiktaş, İstanbul",
  socialLinks: [
    { id: "1", platform: "facebook", url: "https://facebook.com", isActive: true },
    { id: "2", platform: "twitter", url: "https://twitter.com", isActive: true },
    { id: "3", platform: "instagram", url: "https://instagram.com", isActive: true },
    { id: "4", platform: "linkedin", url: "https://linkedin.com", isActive: true },
  ],
  copyrightText: "Luxury Gold Real Estate. Tüm hakları saklıdır.",
  companyName: "Luxury Gold Real Estate",
  showCopyright: true,
  legalLinks: [
    { title: "Gizlilik Politikası", href: "/privacy", isActive: true },
    { title: "Kullanım Şartları", href: "/terms", isActive: true },
  ],
  quickLinks: [
    { id: "1", title: "Prestijli Bölgeler", href: "/populer-bolgeler", order: 0, isActive: true },
    { id: "2", title: "Yatırım Rehberi", href: "/emlak-rehberi", order: 1, isActive: true },
    { id: "3", title: "Sıkça Sorulanlar", href: "/sss", order: 2, isActive: true },
  ],
};

const INITIAL_HOME: HomepageContent = {
  hero: {
    title: "Lüksün Yeni Tanımıyla Tanışın",
    subtitle: "Dubai konseptli eşsiz mimari ve seçkin yatırım fırsatlarını keşfedin.",
    backgroundImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    searchPlaceholder: "Prestijli bölge, lüks villa veya rezidans ara...",
    primaryCtaText: "Seçkin Portföyü Gör",
    primaryCtaLink: "/properties",
    stats: [
      { label: "Seçkin İlan", value: "2.5k+" },
      { label: "VIP Yatırımcı", value: "10k+" },
      { label: "Uzman Danışman", value: "150+" },
    ],
  },
  featured: {
    title: "Seçkin Portföyümüz",
    subtitle: "Sizin için özenle seçilen, yüksek getiri potansiyelli lüks gayrimenkuller.",
    limit: 6,
    showTrending: true,
  },
  about: {
    title: "Neden Luxury Gold?",
    description: "20 yılı aşkın uluslararası lüks gayrimenkul tecrübemizle ayrıcalıklı bir hizmet sunuyoruz. Teknolojiyi ve VIP danışmanlığı birleştirerek en iyi yatırım fırsatlarını sunuyoruz.",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    stats: [
      { label: "Yıllık İşlem", value: "5000+" },
      { label: "Memnuniyet Oranı", value: "%100" },
    ],
  },
  cta: {
    title: "Mülkünüzü Prestijli Ağımızda Değerlendirelim",
    subtitle: "Uluslararası yatırımcı ağımız ve VIP pazarlama stratejilerimizle mülkünüzü gerçek değerinde sonuca ulaştıralım.",
    buttonText: "VIP Ekspertiz Talebi",
    buttonLink: "/contact",
    backgroundImage: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    showCTA: true,
  },
};
const INITIAL_HOME_SECTIONS: HomeSection[] = [
  {
    id: "hero-1",
    type: "hero",
    title: "Lüksün Yeni Tanımıyla Tanışın",
    subtitle: "Dubai konseptli eşsiz mimari ve seçkin yatırım fırsatlarını keşfedin.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    buttonText: "Seçkin Portföyü Gör",
    buttonLink: "/properties",
    isActive: true,
    order: 0,
    settings: { padding: "large" },
    items: [
      { label: "Seçkin İlan", value: "2.5k+" },
      { label: "VIP Yatırımcı", value: "10k+" },
      { label: "Uzman Danışman", value: "150+" },
    ]
  },
  {
    id: "featured-1",
    type: "featured_properties",
    title: "Seçkin Portföyümüz",
    subtitle: "Sizin için özenle seçilen, yüksek getiri potansiyelli lüks gayrimenkuller.",
    isActive: true,
    order: 1,
    settings: { limit: 6, columns: 3 }
  },
  {
    id: "categories-1",
    type: "categories",
    title: "Lüks Yaşam Seçenekleri",
    subtitle: "Ayrıcalıklı yaşam tarzınıza en uygun gayrimenkul türünü seçerek keşfetmeye başlayın.",
    isActive: true,
    order: 1.5,
    settings: {}
  },
  {
    id: "regions-1",
    type: "popular_regions",
    title: "Prestijli Konumlar",
    subtitle: "Dünya standartlarındaki en seçkin bölgelerdeki lüks portföyümüzü keşfedin.",
    isActive: true,
    order: 2,
    settings: { columns: 4 }
  },
  {
    id: "about-1",
    type: "about",
    title: "Neden Luxury Gold?",
    subtitle: "20 yılı aşkın uluslararası lüks gayrimenkul tecrübemizle ayrıcalıklı bir hizmet sunuyoruz.",
    content: "Teknolojiyi ve VIP danışmanlığı birleştirerek en iyi yatırım fırsatlarını sunuyoruz.",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
    isActive: true,
    order: 3,
    settings: { backgroundColor: "#050816" },
    items: [
      { label: "Yıllık İşlem", value: "5000+" },
      { label: "Memnuniyet Oranı", value: "%100" },
    ]
  },
  {
    id: "cta-1",
    type: "cta",
    title: "Mülkünüzü Prestijli Ağımızda Değerlendirelim",
    subtitle: "Uluslararası yatırımcı ağımız ve VIP pazarlama stratejilerimizle mülkünüzü gerçek değerinde sonuca ulaştıralım.",
    buttonText: "VIP Ekspertiz Talebi",
    buttonLink: "/contact",
    imageUrl: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11",
    isActive: true,
    order: 4,
    settings: {}
  }
];

const INITIAL_CATEGORIES: Category[] = [
  { id: "cat-1", name: "Daire", slug: "apartment", icon: "Home", color: "#D4AF37", isActive: true, sortOrder: 0, createdAt: new Date().toISOString() },
  { id: "cat-2", name: "Villa", slug: "villa", icon: "Castle", color: "#C9A227", isActive: true, sortOrder: 1, createdAt: new Date().toISOString() },
  { id: "cat-3", name: "Müstakil Ev", slug: "house", icon: "Tent", color: "#F4E4A6", isActive: true, sortOrder: 2, createdAt: new Date().toISOString() },
  { id: "cat-4", name: "Ofis", slug: "office", icon: "Building2", color: "#8B6B15", isActive: true, sortOrder: 3, createdAt: new Date().toISOString() },
  { id: "cat-5", name: "Arsa", slug: "land", icon: "Map", color: "#D4AF37", isActive: true, sortOrder: 4, createdAt: new Date().toISOString() },
];

const INITIAL_ABOUT: AboutPageContent = {
  heroTitle: "Profesyonel Gayrimenkul Çözümleri",
  heroDescription: "20 yılı aşkın tecrübemizle hayallerinizi gerçeğe dönüştürüyoruz.",
  companyStory: "1998 yılında kurulan şirketimiz, güven ve şeffaflık ilkeleriyle büyüyerek Türkiye'nin lider gayrimenkul danışmanlık firmalarından biri haline gelmiştir.",
  mission: "Müşterilerimize en doğru yatırım fırsatlarını sunarak hayat kalitelerini artırmak.",
  vision: "Global standartlarda hizmet veren, sektörün en güvenilir markası olmak.",
  statistics: [
    { label: "Yıllık Tecrübe", value: "25+" },
    { label: "Mutlu Müşteri", value: "10.000+" },
    { label: "Satılan Mülk", value: "5.000+" },
  ],
  teamMembers: [
    { id: "1", name: "Ahmet Yılmaz", role: "Kurucu & CEO", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a" },
    { id: "2", name: "Selin Kaya", role: "Satış Direktörü", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2" },
  ],
  testimonials: [
    { id: "1", name: "Caner Öz", role: "İş Adamı", text: "Profesyonel yaklaşımları sayesinde tam istediğim evi buldum." },
  ],
  images: ["https://images.unsplash.com/photo-1560518883-ce09059eeffa"],
};

const INITIAL_CONTACT: ContactSettings = {
  address: "Zorlu Center, Levazım Mah. Koru Sok. No:2, Beşiktaş, İstanbul",
  phones: ["+90 212 555 0123", "+90 532 555 0123"],
  emails: ["vip@luxurygold.com", "satis@luxurygold.com"],
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.8286954201!2d29.0116!3d41.0847",
  whatsapp: "+905325550123",
  workingHours: "Pazartesi - Cumartesi: 09:00 - 19:00",
  socialLinks: [
    { id: "1", platform: "instagram", url: "https://instagram.com/luxurygold", isActive: true },
    { id: "2", platform: "linkedin", url: "https://linkedin.com/company/luxurygold", isActive: true },
  ],
};

export const useCMSStore = create<CMSState>()(
  persist(
    (set) => ({
      header: INITIAL_HEADER,
      footer: INITIAL_FOOTER,
      home: INITIAL_HOME,
      homeSections: INITIAL_HOME_SECTIONS,
      categories: INITIAL_CATEGORIES,
      about: INITIAL_ABOUT,
      contactSettings: INITIAL_CONTACT,
      messages: [],
      popularRegions: [
        { 
          id: "reg-1", 
          title: "Sarıyer, İstanbul", 
          slug: "sariyer-istanbul", 
          image: "https://images.unsplash.com/photo-1549144866-1c05d761660d",
          description: "Lüks villaları ve eşsiz boğaz manzarasıyla İstanbul'un en prestijli bölgesi.",
          featuredListings: ["prop-1"],
          seoContent: "Sarıyer gayrimenkul ve lüks villa rehberi.",
          isActive: true,
          sortOrder: 0,
          createdAt: new Date().toISOString()
        }
      ],
      blogPosts: [
        {
          id: "post-1",
          title: "Lüks Gayrimenkul Alırken Dikkat Edilmesi Gereken 10 Altın Kural",
          slug: "luks-gayrimenkul-alirken-dikkat-edilmesi-gerekenler",
          excerpt: "Premium gayrimenkul yatırımı yapmadan önce mutlaka bilmeniz gereken kritik noktalar.",
          content: "Lüks gayrimenkul alırken dikkat edilmesi gerekenler...",
          featuredImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
          category: "Rehber",
          isPublished: true,
          createdAt: new Date().toISOString()
        }
      ],
      faqs: [
        { id: "faq-1", question: "VIP Yatırım Danışmanlığı süreci nasıl işliyor?", answer: "Özel portföy yöneticimiz taleplerinizi dinleyerek size en uygun gizli ve açık portföyleri sunar.", category: "Yatırım & Danışmanlık", sortOrder: 0 }
      ],
      isMaintenanceMode: false,
      maintenanceSettings: {
        estimatedDuration: "30 Dakika",
        backgroundImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
        backgroundVideo: "",
        title: "Bakım Aşamasındayız",
        description: "Sizlere daha iyi bir deneyim sunabilmek için sitemizi güncelliyoruz."
      },
      theme: {
        primaryColor: "#D4AF37", // PRIMARY GOLD
        secondaryColor: "#050816", // Deep Luxury Dark
      },
      branding: {
        siteName: "Luxury Gold Real Estate",
        browserTitle: "Luxury Gold Real Estate – Premium Dubai Konsept Gayrimenkul",
        faviconUrl: "/favicon.ico",
        appleIconUrl: "/apple-touch-icon.png",
        seoTitle: "Luxury Gold Real Estate",
        seoDescription: "Dubai standartlarında premium gayrimenkul ve lüks yaşam alanları.",
        updatedAt: new Date().toISOString()
      },

      updateHeader: (settings) => set((state) => ({ header: { ...state.header, ...settings } })),
      updateFooter: (settings) => set((state) => ({ footer: { ...state.footer, ...settings } })),
      updateHome: (content) => set((state) => ({ home: { ...state.home, ...content } })),
      updateAbout: (content) => set((state) => ({ about: { ...state.about, ...content } })),
      updateContactSettings: (settings) => set((state) => ({ contactSettings: { ...state.contactSettings, ...settings } })),
      
      addHomeSection: (section) => set((state) => ({
        homeSections: [...state.homeSections, { 
          ...section, 
          id: `sec-${Date.now()}`, 
          order: state.homeSections.length 
        }].sort((a, b) => a.order - b.order)
      })),
      updateHomeSection: (id, section) => set((state) => ({
        homeSections: state.homeSections.map(s => s.id === id ? { ...s, ...section } : s)
      })),
      deleteHomeSection: (id) => set((state) => ({
        homeSections: state.homeSections.filter(s => s.id !== id)
      })),
      reorderHomeSections: (sections) => set({ homeSections: sections }),

      addMessage: (message) => set((state) => ({
        messages: [{ ...message, id: `msg-${Date.now()}`, createdAt: new Date().toISOString(), isRead: false }, ...state.messages]
      })),
      markMessageAsRead: (id) => set((state) => ({
        messages: state.messages.map(m => m.id === id ? { ...m, isRead: true } : m)
      })),
      deleteMessage: (id) => set((state) => ({
        messages: state.messages.filter(m => m.id !== id)
      })),

      addPopularRegion: (region) => set((state) => ({
        popularRegions: [{ ...region, id: `reg-${Date.now()}`, createdAt: new Date().toISOString() }, ...state.popularRegions]
      })),
      updatePopularRegion: (id, region) => set((state) => ({
        popularRegions: state.popularRegions.map(r => r.id === id ? { ...r, ...region } : r)
      })),
      deletePopularRegion: (id) => set((state) => ({
        popularRegions: state.popularRegions.filter(r => r.id !== id)
      })),

      addBlogPost: (post) => set((state) => ({
        blogPosts: [{ ...post, id: `post-${Date.now()}`, createdAt: new Date().toISOString() }, ...state.blogPosts]
      })),
      updateBlogPost: (id, post) => set((state) => ({
        blogPosts: state.blogPosts.map(p => p.id === id ? { ...p, ...post } : p)
      })),
      deleteBlogPost: (id) => set((state) => ({
        blogPosts: state.blogPosts.filter(p => p.id !== id)
      })),

      addFAQ: (faq) => set((state) => ({
        faqs: [...state.faqs, { ...faq, id: `faq-${Date.now()}` }]
      })),
      updateFAQ: (id, faq) => set((state) => ({
        faqs: state.faqs.map(f => f.id === id ? { ...f, ...faq } : f)
      })),
      deleteFAQ: (id) => set((state) => ({
        faqs: state.faqs.filter(f => f.id !== id)
      })),
      reorderFAQs: (faqs) => set({ faqs }),

      addCategory: (category) => set((state) => ({
        categories: [...state.categories, { 
          ...category, 
          id: `cat-${Date.now()}`, 
          createdAt: new Date().toISOString() 
        }]
      })),

      updateCategory: (id, category) => set((state) => ({
        categories: state.categories.map((c) => c.id === id ? { ...c, ...category } : c)
      })),

      deleteCategory: (id) => set((state) => ({
        categories: state.categories.filter((c) => c.id !== id)
      })),

      reorderCategories: (categories) => set({ categories }),
      setMaintenanceMode: (isActive) => set({ isMaintenanceMode: isActive }),
      updateMaintenanceSettings: (settings) => set((state) => ({ 
        maintenanceSettings: { ...state.maintenanceSettings, ...settings } 
      })),
      updateTheme: (theme) => set((state) => ({ 
        theme: { ...state.theme, ...theme } 
      })),
      updateBranding: (branding) => set((state) => ({ 
        branding: { ...state.branding, ...branding, updatedAt: new Date().toISOString() } 
      })),
    }),
    { 
      name: "emlak-cms-store",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
