import { create } from "zustand";
import { supabase } from "@/lib/supabase";

export interface ElementStyle {
  typography?: {
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
    color?: string;
    textAlign?: "left" | "center" | "right" | "justify";
    letterSpacing?: string;
    lineHeight?: string;
    textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
  };
  layout?: {
    width?: string;
    height?: string;
    display?: string;
    justifyContent?: string;
    alignItems?: string;
  };
  spacing?: {
    padding?: string;
    margin?: string;
  };
}

interface ElementStore {
  styles: Record<string, ElementStyle>;
  selectedElementId: string | null;
  setSelectedElement: (id: string | null) => void;
  updateElementStyle: (id: string, style: ElementStyle) => void;
  fetchStyles: () => Promise<void>;
}

export const useElementStore = create<ElementStore>((set, get) => ({
  styles: {},
  selectedElementId: null,

  setSelectedElement: (id) => set({ selectedElementId: id }),

  updateElementStyle: async (id, newStyle) => {
    // 1. Optimistic Update (Instantly reflects in UI)
    set((state) => {
      const currentStyle = state.styles[id] || {};
      return {
        styles: {
          ...state.styles,
          [id]: {
            ...currentStyle,
            typography: { ...currentStyle.typography, ...newStyle.typography },
            layout: { ...currentStyle.layout, ...newStyle.layout },
            spacing: { ...currentStyle.spacing, ...newStyle.spacing },
          }
        }
      };
    });

    // 2. Persist to Supabase
    try {
      const state = get();
      const mergedStyle = state.styles[id];

      const { error } = await supabase
        .from("section_styles")
        .upsert({
          section_key: id,
          typography_json: mergedStyle.typography || {},
          layout_json: mergedStyle.layout || {},
          spacing_json: mergedStyle.spacing || {},
          updated_at: new Date().toISOString()
        }, { onConflict: 'section_key' });

      if (error) throw error;
    } catch (err) {
      console.error(`Supabase kaydı başarısız. Sadece bellekte tutuluyor: ${id}`);
    }
  },

  fetchStyles: async () => {
    try {
      const { data, error } = await supabase
        .from("section_styles")
        .select("*");

      if (error) throw error;

      if (data) {
        const stylesMap: Record<string, ElementStyle> = {};
        data.forEach(row => {
          stylesMap[row.section_key] = {
            typography: row.typography_json,
            layout: row.layout_json,
            spacing: row.spacing_json,
          };
        });
        set({ styles: stylesMap });
      }
    } catch (err) {
      console.warn("Element stilleri yüklenemedi (DB eksik olabilir).");
    }
  }
}));
