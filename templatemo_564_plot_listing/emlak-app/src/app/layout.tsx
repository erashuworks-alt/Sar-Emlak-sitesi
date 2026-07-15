import type { Metadata } from "next";
import { Inter, Outfit, Poppins } from "next/font/google";
import "./globals.css";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import { DesignProvider } from "@/components/providers/DesignProvider";
import { BrandingManager } from "@/components/providers/BrandingManager";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Emlak Platform – Türkiye'nin Modern Gayrimenkul Platformu",
    template: "%s | Emlak Platform",
  },
  description: "Türkiye'nin en seçkin ve modern gayrimenkul platformunda hayalinizdeki mülkü bulun.",
  keywords: ["emlak", "gayrimenkul", "satılık daire", "kiralık daire", "villa", "arsa"],
  openGraph: {
    title: "Emlak Platform",
    description: "Hayalinizdeki evi bulmanın en modern ve güvenli yolu.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${inter.variable} ${outfit.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body
        className="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased"
        suppressHydrationWarning
      >
        <DesignProvider>
          <BrandingManager />
          <ConditionalLayout>{children}</ConditionalLayout>
        </DesignProvider>
      </body>
    </html>
  );
}
