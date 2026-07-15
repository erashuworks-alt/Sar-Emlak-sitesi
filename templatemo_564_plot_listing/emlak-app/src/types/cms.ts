export type NavLink = {
  id: string;
  title: string;
  href: string;
  order: number;
  isActive: boolean;
};

export type SocialLink = {
  id: string;
  platform: "facebook" | "twitter" | "instagram" | "linkedin" | "youtube";
  url: string;
  isActive: boolean;
};

export type HeaderSettings = {
  logoUrl?: string;
  logoText: string;
  navigation: NavLink[];
  ctaText: string;
  ctaLink: string;
  showCTA: boolean;
  showAnnouncement: boolean;
  announcementText?: string;
  announcementLink?: string;
  isSticky: boolean;
  isTransparent: boolean;
};

export type FooterSettings = {
  logoUrl?: string;
  description: string;
  backgroundColor: string;
  email: string;
  phone: string;
  address: string;
  socialLinks: SocialLink[];
  copyrightText: string;
  companyName: string;
  showCopyright: boolean;
  legalLinks: { title: string; href: string; isActive: boolean }[];
  quickLinks: NavLink[];
};

export type HeroSection = {
  title: string;
  subtitle: string;
  backgroundImage: string;
  searchPlaceholder: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  stats: { label: string; value: string }[];
};

export type HomepageContent = {
  hero: HeroSection;
  featured: {
    title: string;
    subtitle: string;
    limit: number;
    showTrending: boolean;
  };
  about: {
    title: string;
    description: string;
    imageUrl: string;
    stats: { label: string; value: string }[];
  };
  cta: {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
    backgroundImage: string;
    showCTA: boolean;
  };
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  icon: string;
  color: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
};

export type AboutPageContent = {
  heroTitle: string;
  heroDescription: string;
  companyStory: string;
  mission: string;
  vision: string;
  statistics: { label: string; value: string }[];
  teamMembers: { id: string; name: string; role: string; image: string }[];
  testimonials: { id: string; name: string; role: string; text: string }[];
  videoUrl?: string;
  images: string[];
};

export type ContactSettings = {
  address: string;
  phones: string[];
  emails: string[];
  mapEmbed: string;
  whatsapp: string;
  workingHours: string;
  socialLinks: SocialLink[];
};

export type ContactMessage = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  propertyId?: string;
  isRead: boolean;
  createdAt: string;
};

export type PopularRegion = {
  id: string;
  title: string;
  slug: string;
  image: string;
  description: string;
  seoContent: string;
  featuredListings?: string[]; // IDs
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  seoTitle?: string;
  seoDescription?: string;
  isPublished: boolean;
  createdAt: string;
};

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
};

export type HomeSectionType = 
  | "hero" 
  | "featured_properties" 
  | "services" 
  | "video_showcase" 
  | "popular_regions" 
  | "about" 
  | "testimonials" 
  | "statistics" 
  | "faq" 
  | "cta" 
  | "categories"
  | "blog";

export type HomeSection = {
  id: string;
  type: HomeSectionType;
  title: string;
  subtitle?: string;
  content?: string;
  imageUrl?: string;
  videoUrl?: string;
  buttonText?: string;
  buttonLink?: string;
  isActive: boolean;
  order: number;
  settings: {
    backgroundColor?: string;
    textColor?: string;
    padding?: "small" | "medium" | "large";
    animation?: "fade" | "slide" | "none";
    columns?: number;
    limit?: number;
  };
  items?: any[]; // For sections like services, stats, testimonials
};

export type BrandingSettings = {
  siteName: string;
  browserTitle: string;
  faviconUrl: string;
  appleIconUrl: string;
  seoTitle: string;
  seoDescription: string;
  updatedAt: string;
};
