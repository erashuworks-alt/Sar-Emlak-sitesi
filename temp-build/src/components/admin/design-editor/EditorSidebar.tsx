import { useDesignStore } from "@/store/designStore";
import { useElementStore } from "@/store/elementStore";
import { Palette, Type, Layout, MousePointerClick, Box, Wand2 } from "lucide-react";
import { useState } from "react";

interface EditorSidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function EditorSidebar({ activeTab: externalTab, onTabChange }: EditorSidebarProps = {}) {
  const { design, updateDesign } = useDesignStore();
  const { selectedElementId, styles, updateElementStyle } = useElementStore();
  const [internalTab, setInternalTab] = useState<string>("colors");
  
  const activeTab = externalTab ?? internalTab;
  const setActiveTab = (tab: string) => {
    setInternalTab(tab);
    onTabChange?.(tab);
  };

  const tabs = [
    { id: "colors", label: "Renkler", icon: Palette },
    { id: "typography", label: "Tipografi", icon: Type },
    { id: "geometry", label: "Köşeler & Boşluk", icon: Box },
    { id: "effects", label: "Gölgeler", icon: Wand2 },
    { id: "element", label: "Eleman Düzenle", icon: MousePointerClick },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-300">
      <div className="flex overflow-x-auto custom-scrollbar border-b border-slate-800 p-2 shrink-0">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl min-w-[80px] gap-2 transition-colors ${
                isActive ? "bg-slate-800 text-white" : "hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {activeTab === "colors" && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Akıllı Renk Sistemi</h3>
            
            <div className="p-4 bg-brand-500/10 border border-brand-500/20 rounded-xl mb-4">
              <p className="text-xs text-brand-300 leading-relaxed">
                Sadece ana marka renginizi seçin. Sistem; karanlık mod, açık mod, arkaplanlar ve kontrast metin renklerini otomatik olarak mükemmel uyumla üretecektir.
              </p>
            </div>

            <div>
              <label className="text-xs font-medium block mb-2">Marka Ana Rengi (Primary Brand Color)</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={design.colors.light.primary}
                  onChange={async (e) => {
                    const newPrimary = e.target.value;
                    // Dynamically import colorUtils to avoid SSR issues or just import it at top.
                    // For now we assume we will add the import at the top of the file.
                    const { generateLightTheme, generateDarkTheme } = await import("@/lib/colorUtils");
                    
                    const newLight = generateLightTheme(newPrimary);
                    const newDark = generateDarkTheme(newPrimary);

                    updateDesign({ 
                      colors: { 
                        light: newLight, 
                        dark: newDark 
                      } 
                    });
                  }}
                  className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border-0 shrink-0"
                />
                <input 
                  type="text" 
                  value={design.colors.light.primary}
                  readOnly
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 text-sm focus:outline-none focus:border-brand-500 text-white"
                />
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-[10px] font-bold uppercase text-slate-500 mb-2">Otomatik Üretilen Renkler (Önizleme)</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-lg" style={{ backgroundColor: design.colors.light.background, color: design.colors.light.foreground }}>
                  <span className="text-[10px] font-semibold">Açık Arkaplan</span>
                </div>
                <div className="p-2 rounded-lg" style={{ backgroundColor: design.colors.dark.background, color: design.colors.dark.foreground }}>
                  <span className="text-[10px] font-semibold">Koyu Arkaplan</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "typography" && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Tipografi Ayarları</h3>
            
            <div>
              <label className="text-xs font-medium block mb-2">Google Font (Ana)</label>
              <select 
                value={design.typography.fontFamily}
                onChange={e => updateDesign({ typography: { ...design.typography, fontFamily: e.target.value } })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 h-10 text-sm focus:outline-none focus:border-brand-500 text-white"
              >
                <option value="Inter">Inter (Modern, Sade)</option>
                <option value="Outfit">Outfit (Geometrik, Şık)</option>
                <option value="Poppins">Poppins (Yuvarlak, Cana Yakın)</option>
                <option value="Playfair Display">Playfair Display (Klasik, Lüks)</option>
                <option value="Montserrat">Montserrat (Geniş, Kurumsal)</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === "geometry" && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Buton ve Kartlar</h3>
            
            <div>
              <label className="text-xs font-medium block mb-2">Buton Yuvarlaklığı (Border Radius)</label>
              <input 
                type="text" 
                value={design.geometry.buttonRadius}
                onChange={e => updateDesign({ geometry: { ...design.geometry, buttonRadius: e.target.value } })}
                placeholder="Örn: 0px, 8px, 999px"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 h-10 text-sm focus:outline-none focus:border-brand-500 text-white"
              />
            </div>
          </div>
        )}

        {activeTab === "effects" && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Gölgeler ve Efektler</h3>
            
            <div>
              <label className="text-xs font-medium block mb-2">Buton Gölgesi (Box Shadow)</label>
              <input 
                type="text" 
                value={design.effects.buttonShadow}
                onChange={e => updateDesign({ effects: { ...design.effects, buttonShadow: e.target.value } })}
                placeholder="Örn: 0 4px 6px rgba(0,0,0,0.1)"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 h-10 text-sm focus:outline-none focus:border-brand-500 text-white"
              />
            </div>

            <div>
              <label className="text-xs font-medium block mb-2">Kart Gölgesi (Box Shadow)</label>
              <input 
                type="text" 
                value={design.effects.cardShadow}
                onChange={e => updateDesign({ effects: { ...design.effects, cardShadow: e.target.value } })}
                placeholder="Örn: 0 10px 15px rgba(0,0,0,0.1)"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 h-10 text-sm focus:outline-none focus:border-brand-500 text-white"
              />
            </div>

            <div>
              <label className="text-xs font-medium block mb-2">Bulanıklık Miktarı (Glassmorphism Blur)</label>
              <input 
                type="text" 
                value={design.effects.glassmorphismAmount}
                onChange={e => updateDesign({ effects: { ...design.effects, glassmorphismAmount: e.target.value } })}
                placeholder="Örn: 12px"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 h-10 text-sm focus:outline-none focus:border-brand-500 text-white"
              />
            </div>
          </div>
        )}

        {activeTab === "element" && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Eleman Düzenleyici</h3>
            
            {!selectedElementId ? (
              <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl text-center">
                <MousePointerClick className="w-8 h-8 mx-auto text-slate-500 mb-2" />
                <p className="text-xs text-slate-400">
                  Önizleme ekranından düzenlemek istediğiniz bir metne tıklayın.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-3 bg-brand-500/10 border border-brand-500/30 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-medium text-brand-300">Seçili Alan:</span>
                  <span className="text-[10px] font-mono bg-brand-500/20 px-2 py-1 rounded text-brand-200">{selectedElementId}</span>
                </div>

                {/* Typography Controls */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase">Tipografi</h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] block mb-1 text-slate-400">Yazı Boyutu</label>
                      <input 
                        type="text" 
                        value={styles[selectedElementId]?.typography?.fontSize || ""}
                        onChange={e => updateElementStyle(selectedElementId, { typography: { fontSize: e.target.value } })}
                        placeholder="Örn: 24px"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 h-8 text-xs focus:outline-none focus:border-brand-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] block mb-1 text-slate-400">Kalınlık (Weight)</label>
                      <select 
                        value={styles[selectedElementId]?.typography?.fontWeight || ""}
                        onChange={e => updateElementStyle(selectedElementId, { typography: { fontWeight: e.target.value } })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 h-8 text-xs focus:outline-none focus:border-brand-500 text-white"
                      >
                        <option value="">Varsayılan</option>
                        <option value="400">Normal (400)</option>
                        <option value="500">Medium (500)</option>
                        <option value="600">Semi Bold (600)</option>
                        <option value="700">Bold (700)</option>
                        <option value="800">Extra Bold (800)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] block mb-1 text-slate-400">Hizalama</label>
                    <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
                      {["left", "center", "right", "justify"].map(align => (
                        <button
                          key={align}
                          onClick={() => updateElementStyle(selectedElementId, { typography: { textAlign: align as any } })}
                          className={`flex-1 text-[10px] py-1.5 rounded-md transition-colors ${styles[selectedElementId]?.typography?.textAlign === align ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"}`}
                        >
                          {align.charAt(0).toUpperCase() + align.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] block mb-1 text-slate-400">Özel Renk</label>
                    <div className="flex gap-2">
                      <input 
                        type="color" 
                        value={styles[selectedElementId]?.typography?.color || "#ffffff"}
                        onChange={e => updateElementStyle(selectedElementId, { typography: { color: e.target.value } })}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 shrink-0"
                      />
                      <input 
                        type="text" 
                        value={styles[selectedElementId]?.typography?.color || ""}
                        onChange={e => updateElementStyle(selectedElementId, { typography: { color: e.target.value } })}
                        placeholder="Varsayılan"
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-2 h-8 text-xs focus:outline-none focus:border-brand-500 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Spacing Controls */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase">Boşluklar (Spacing)</h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] block mb-1 text-slate-400">Dış Boşluk (Margin)</label>
                      <input 
                        type="text" 
                        value={styles[selectedElementId]?.spacing?.margin || ""}
                        onChange={e => updateElementStyle(selectedElementId, { spacing: { margin: e.target.value } })}
                        placeholder="Örn: 10px 0"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 h-8 text-xs focus:outline-none focus:border-brand-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] block mb-1 text-slate-400">İç Boşluk (Padding)</label>
                      <input 
                        type="text" 
                        value={styles[selectedElementId]?.spacing?.padding || ""}
                        onChange={e => updateElementStyle(selectedElementId, { spacing: { padding: e.target.value } })}
                        placeholder="Örn: 20px"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 h-8 text-xs focus:outline-none focus:border-brand-500 text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
