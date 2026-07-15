"use client";

import { useEffect } from "react";
import { useCMSStore } from "@/store/cmsStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useCMSStore();

  useEffect(() => {
    const root = document.documentElement;
    
    // Primary Color (Brand)
    root.style.setProperty("--brand-50", `${theme.primaryColor}10`);
    root.style.setProperty("--brand-100", `${theme.primaryColor}20`);
    root.style.setProperty("--brand-200", `${theme.primaryColor}40`);
    root.style.setProperty("--brand-300", `${theme.primaryColor}60`);
    root.style.setProperty("--brand-400", `${theme.primaryColor}80`);
    root.style.setProperty("--brand-500", theme.primaryColor);
    root.style.setProperty("--brand-600", theme.primaryColor);
    root.style.setProperty("--brand-700", theme.primaryColor);
    root.style.setProperty("--brand-800", theme.primaryColor);
    root.style.setProperty("--brand-900", theme.primaryColor);
    
    // Secondary Color (Optional - can be mapped to something else)
    root.style.setProperty("--secondary-color", theme.secondaryColor);
    
  }, [theme]);

  return <>{children}</>;
}
