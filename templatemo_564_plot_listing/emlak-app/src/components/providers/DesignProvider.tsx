"use client";

import { useEffect, useState } from "react";
import { useDesignStore } from "@/store/designStore";
import { useElementStore } from "@/store/elementStore";

export function DesignProvider({ children }: { children: React.ReactNode }) {
  const { design, fetchDesign } = useDesignStore();
  const { fetchStyles } = useElementStore();
  
  const [mounted, setMounted] = useState(false);
  const [liveDesign, setLiveDesign] = useState(design);

  useEffect(() => {
    fetchDesign();
    fetchStyles();
    setMounted(true);
    
    // Listen for live updates from admin editor iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'DESIGN_UPDATE') {
        setLiveDesign(event.data.payload);
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Keep liveDesign in sync with designStore
  useEffect(() => {
    setLiveDesign(design);
  }, [design]);

  // Determine active palette based on mode
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (liveDesign.mode === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else if (liveDesign.mode === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      // System mode
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [liveDesign.mode]);

  if (!mounted) {
    // Avoid FOUC during hydration by not rendering children immediately,
    // or you could render children without applying dynamic styles yet.
    // For a smoother experience, we render children. The default globals.css will apply.
    return <>{children}</>;
  }

  const palette = isDark ? liveDesign.colors.dark : liveDesign.colors.light;

  // Generate CSS variables string
  const cssVariables = `
    :root {
      /* Colors */
      --color-primary: ${palette.primary};
      --color-secondary: ${palette.secondary};
      --color-accent: ${palette.accent};
      --color-background: ${palette.background};
      --color-foreground: ${palette.foreground};
      --color-card: ${palette.card};
      --color-card-foreground: ${palette.cardForeground};
      --color-border: ${palette.border};
      --color-muted: ${palette.muted};
      --color-muted-foreground: ${palette.mutedForeground};

      /* Geometry */
      --radius-btn: ${liveDesign.geometry.buttonRadius};
      --radius-card: ${liveDesign.geometry.cardRadius};
      --spacing-card: ${liveDesign.geometry.cardSpacing};

      /* Effects */
      --shadow-btn: ${liveDesign.effects.buttonShadow};
      --shadow-card: ${liveDesign.effects.cardShadow};
      --glass-blur: ${liveDesign.effects.glassmorphismAmount};

      /* Header */
      --header-bg: ${liveDesign.layout.header.backgroundColor};
      --header-text: ${liveDesign.layout.header.textColor};
      --header-hover: ${liveDesign.layout.header.hoverColor};
      --header-btn: ${liveDesign.layout.header.buttonColor};
      --header-border: ${liveDesign.layout.header.borderColor};
      --header-mobile-bg: ${liveDesign.layout.header.mobileMenuColor};
      --header-sticky-bg: ${liveDesign.layout.header.stickyBackgroundColor};
      --header-blur: ${liveDesign.layout.header.blurAmount};

      /* Footer */
      --footer-bg: ${liveDesign.layout.footer.backgroundColor};
      --footer-text: ${liveDesign.layout.footer.textColor};
      --footer-title: ${liveDesign.layout.footer.titleColor};
      --footer-link-hover: ${liveDesign.layout.footer.linkHoverColor};
      --footer-border: ${liveDesign.layout.footer.borderColor};
      --footer-icon: ${liveDesign.layout.footer.socialIconColor};
      --footer-copyright: ${liveDesign.layout.footer.copyrightBackground};
      
      /* Typography */
      --font-base-size: ${liveDesign.typography.baseFontSize};
      --font-primary-family: ${liveDesign.typography.fontFamily === 'Outfit' ? 'var(--font-outfit)' : liveDesign.typography.fontFamily === 'Poppins' ? 'var(--font-poppins)' : liveDesign.typography.fontFamily === 'Inter' ? 'var(--font-inter)' : `"${liveDesign.typography.fontFamily}"`}, system-ui, sans-serif;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
      {/* We can inject Google Fonts here dynamically if needed */}
      <link 
        href={`https://fonts.googleapis.com/css2?family=${liveDesign.typography.fontFamily.replace(' ', '+')}:wght@300;400;500;600;700;800&display=swap`} 
        rel="stylesheet" 
      />
      {children}
    </>
  );
}
