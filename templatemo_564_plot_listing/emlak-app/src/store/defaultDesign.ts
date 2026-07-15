import { DesignSystem } from "@/types/design";

export const DEFAULT_DESIGN: DesignSystem = {
  name: "Premium Gold Luxury",
  mode: "dark",
  typography: {
    fontFamily: "Outfit",
    baseFontSize: "16px",
  },
  colors: {
    light: {
      primary: "#D4AF37",     // PRIMARY GOLD
      secondary: "#8B6B15",   // DARK GOLD
      accent: "#C9A227",      // SECONDARY GOLD
      background: "#0B1120",  // Premium dark theme background
      foreground: "#F9FAFB",
      card: "#111827",
      cardForeground: "#F9FAFB",
      border: "rgba(212, 175, 55, 0.25)",
      muted: "#172033",
      mutedForeground: "#D1D5DB",
    },
    dark: {
      primary: "#D4AF37",     // PRIMARY GOLD
      secondary: "#C9A227",   // SECONDARY GOLD
      accent: "#F4E4A6",      // LIGHT GOLD
      background: "#050816",  // Deep luxury night background
      foreground: "#F9FAFB",
      card: "#111827",
      cardForeground: "#F9FAFB",
      border: "rgba(212, 175, 55, 0.25)",
      muted: "#172033",
      mutedForeground: "#D1D5DB",
    }
  },
  geometry: {
    buttonRadius: "1rem", // 16px (rounded-2xl)
    cardRadius: "1.5rem", // 24px (rounded-3xl)
    cardSpacing: "2rem",
  },
  effects: {
    buttonShadow: "0 0 15px rgba(212, 175, 55, 0.3)",
    cardShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(212, 175, 55, 0.15)",
    glassmorphismAmount: "16px",
  },
  animation: {
    preset: "smooth",
    speedMultiplier: 1,
  },
  layout: {
    header: {
      backgroundColor: "rgba(5, 8, 22, 0.85)", // Dark transparent luxury navbar
      textColor: "#F9FAFB",
      hoverColor: "#D4AF37", // Gold hover effects
      buttonColor: "#D4AF37",
      borderColor: "rgba(212, 175, 55, 0.25)",
      mobileMenuColor: "#0B1120",
      stickyBackgroundColor: "rgba(5, 8, 22, 0.95)",
      transparentOnTop: true,
      blurAmount: "20px",
    },
    footer: {
      backgroundColor: "#050816", // Dark luxury footer
      textColor: "#D1D5DB",
      titleColor: "#D4AF37", // Gold titles
      linkHoverColor: "#F4E4A6",
      borderColor: "rgba(212, 175, 55, 0.25)",
      socialIconColor: "#D4AF37",
      copyrightBackground: "#03050e",
    }
  }
};
