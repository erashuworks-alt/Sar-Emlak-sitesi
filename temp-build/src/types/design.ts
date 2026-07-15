export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  border: string;
  muted: string;
  mutedForeground: string;
}

export interface HeaderDesignSettings {
  backgroundColor: string;
  textColor: string;
  hoverColor: string;
  buttonColor: string;
  borderColor: string;
  mobileMenuColor: string;
  stickyBackgroundColor: string;
  transparentOnTop: boolean;
  blurAmount: string; // e.g. '8px'
}

export interface FooterDesignSettings {
  backgroundColor: string;
  textColor: string;
  titleColor: string;
  linkHoverColor: string;
  borderColor: string;
  socialIconColor: string;
  copyrightBackground: string;
}

export interface DesignSystem {
  id?: string;
  name: string; // "Default", "Modern Blue", etc.
  mode: "system" | "light" | "dark";
  typography: {
    fontFamily: string;
    headingFontFamily?: string;
    baseFontSize: string; // "16px"
  };
  colors: {
    light: ColorPalette;
    dark: ColorPalette;
  };
  geometry: {
    buttonRadius: string;
    cardRadius: string;
    cardSpacing: string;
  };
  effects: {
    buttonShadow: string;
    cardShadow: string;
    glassmorphismAmount: string;
  };
  animation: {
    preset: "minimal" | "smooth" | "premium" | "disabled";
    speedMultiplier: number;
  };
  layout: {
    header: HeaderDesignSettings;
    footer: FooterDesignSettings;
  };
  updatedAt?: string;
}
