export interface ThemePalette {
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

// Convert HEX to HSL
function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 0, s: 0, l: 0 };

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

// Convert HSL to HEX
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// Generate the full Light Theme palette from one primary color
export function generateLightTheme(primaryHex: string): ThemePalette {
  const { h, s, l } = hexToHSL(primaryHex);

  // We want the primary color to be vivid, but background should be very light tinted with primary hue
  const background = hslToHex(h, s * 0.2, 98); // Tinted white
  const foreground = hslToHex(h, s * 0.2, 10); // Very dark slate/primary
  
  const card = "#ffffff";
  const cardForeground = foreground;
  
  const border = hslToHex(h, s * 0.3, 90); // Light border
  const muted = hslToHex(h, s * 0.2, 96);
  const mutedForeground = hslToHex(h, s * 0.1, 45); // Gray text

  // Secondary/Accent (Monochromatic shift for elegance)
  // Shift hue by 15 degrees for secondary, and lighten for accent
  const secondary = hslToHex((h + 15) % 360, s * 0.8, Math.max(10, l - 20)); 
  const accent = hslToHex(h, s, Math.min(90, l + 20));

  return {
    primary: primaryHex,
    secondary,
    accent,
    background,
    foreground,
    card,
    cardForeground,
    border,
    muted,
    mutedForeground,
  };
}

// Generate the full Dark Theme palette from one primary color
export function generateDarkTheme(primaryHex: string): ThemePalette {
  const { h, s, l } = hexToHSL(primaryHex);

  // Ensure primary color is visible on dark mode (lighten it if it's too dark)
  const safePrimaryLightness = Math.max(l, 50);
  const safePrimary = hslToHex(h, s, safePrimaryLightness);

  // Deep dark backgrounds tinted with the primary hue
  const background = hslToHex(h, s * 0.15, 6); // Very dark slate
  const foreground = hslToHex(h, s * 0.1, 96); // Tinted white
  
  const card = hslToHex(h, s * 0.15, 10); // Slightly lighter than background
  const cardForeground = foreground;
  
  const border = hslToHex(h, s * 0.2, 18); // Subtle dark border
  const muted = hslToHex(h, s * 0.15, 12);
  const mutedForeground = hslToHex(h, s * 0.1, 65); // Muted gray text

  const secondary = hslToHex((h - 15 + 360) % 360, s * 0.8, Math.min(90, safePrimaryLightness + 15)); 
  const accent = hslToHex(h, s, Math.max(10, safePrimaryLightness - 20));

  return {
    primary: safePrimary,
    secondary,
    accent,
    background,
    foreground,
    card,
    cardForeground,
    border,
    muted,
    mutedForeground,
  };
}
