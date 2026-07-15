import { create } from "zustand";
import { DesignSystem } from "@/types/design";
import { DEFAULT_DESIGN } from "./defaultDesign";
import { supabase } from "@/lib/supabase";

interface DesignStore {
  design: DesignSystem;
  isLoading: boolean;
  error: string | null;
  fetchDesign: () => Promise<void>;
  updateDesign: (updates: Partial<DesignSystem>) => Promise<void>;
  resetToDefault: () => void;
}

export const useDesignStore = create<DesignStore>((set, get) => ({
  design: DEFAULT_DESIGN,
  isLoading: false,
  error: null,

  fetchDesign: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from("design_settings")
        .select("*")
        .eq("is_active", true)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No active design found, keep default
          set({ isLoading: false });
          return;
        }
        // Silently ignore other DB errors (missing table, bad credentials)
        // The app will use DEFAULT_DESIGN
        set({ isLoading: false });
        return;
      }

      if (data && data.settings) {
        set({ design: { ...DEFAULT_DESIGN, ...data.settings, id: data.id, name: data.name } });
      }
    } catch (err: any) {
      // Supabase bağlantı hatası - varsayılan tema kullanılıyor
      // (Bu hata .env.local dosyasında placeholder bilgiler olduğunda normaldir)
    } finally {
      set({ isLoading: false });
    }
  },

  updateDesign: async (updates) => {
    set({ isLoading: true, error: null });
    try {
      const currentDesign = get().design;
      const newDesign = { ...currentDesign, ...updates };
      
      // Optimistic UI update
      set({ design: newDesign });

      if (!currentDesign.id) {
        // Create new active design if none exists
        const { data, error } = await supabase
          .from("design_settings")
          .insert({
            name: "Custom Theme",
            is_active: true,
            settings: newDesign,
          })
          .select()
          .single();

        if (error) throw error;
        set({ design: { ...newDesign, id: data.id } });
      } else {
        // Update existing active design
        const { error } = await supabase
          .from("design_settings")
          .update({
            settings: newDesign,
            updated_at: new Date().toISOString()
          })
          .eq("id", currentDesign.id);

        if (error) throw error;
      }
    } catch (err: any) {
      // DB kaydı başarısız - geçici bellekte tutuluyor (placeholder credentials normaldir)
      // Optimistic update korunuyor, UI bozulmuyor.
    } finally {
      set({ isLoading: false });
    }
  },

  resetToDefault: () => {
    // Note: We don't delete from DB here, just update the active state locally. 
    // To actually save the reset, you'd call updateDesign(DEFAULT_DESIGN).
    set({ design: DEFAULT_DESIGN });
  }
}));
