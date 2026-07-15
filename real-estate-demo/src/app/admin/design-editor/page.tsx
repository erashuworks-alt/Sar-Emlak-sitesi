"use client";

import { useEffect, useState, useRef } from "react";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { useDesignStore } from "@/store/designStore";
import { useElementStore } from "@/store/elementStore";
import { Save, Undo2, Monitor, Tablet, Smartphone, Settings2, MousePointerClick } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EditorSidebar } from "@/components/admin/design-editor/EditorSidebar";

export default function DesignEditorPage() {
  const { design, fetchDesign, updateDesign, resetToDefault, isLoading } = useDesignStore();
  const { setSelectedElement } = useElementStore();
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeSidebarTab, setActiveSidebarTab] = useState<string>("colors");
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  useEffect(() => {
    fetchDesign();
  }, []);

  // Listen for element selection from the preview iframe
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'ELEMENT_SELECTED') {
        setSelectedElement(e.data.id);
        setSelectedLabel(e.data.id);
        setActiveSidebarTab('element'); // auto-switch sidebar
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [setSelectedElement]);

  // Send real-time updates to iframe
  useEffect(() => {
    const iframe = document.getElementById("preview-iframe") as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'DESIGN_UPDATE', payload: design }, '*');
    }
  }, [design]);

  const handleSave = async () => {
    await updateDesign(design);
    alert("Tasarım başarıyla kaydedildi!");
  };

  const getViewportWidth = () => {
    switch(viewport) {
      case "mobile": return "375px";
      case "tablet": return "768px";
      case "desktop": return "100%";
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-950">
      {/* Topbar */}
      <div className="h-16 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-6 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
            <Settings2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white">Görsel Tasarım Editörü</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">{design.name}</p>
          </div>
        </div>

        {/* Viewport Controls */}
        <div className="flex items-center gap-1 bg-slate-800/50 p-1 rounded-xl border border-slate-700/50">
          <button 
            onClick={() => setViewport("desktop")}
            className={`p-2 rounded-lg transition-colors ${viewport === "desktop" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"}`}
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setViewport("tablet")}
            className={`p-2 rounded-lg transition-colors ${viewport === "tablet" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"}`}
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setViewport("mobile")}
            className={`p-2 rounded-lg transition-colors ${viewport === "mobile" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"}`}
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={resetToDefault} className="text-slate-300 hover:bg-slate-800 hover:text-white">
            <Undo2 className="w-4 h-4 mr-2" /> Varsayılana Dön
          </Button>
          <Button size="sm" onClick={handleSave} disabled={isLoading} className="bg-brand-600 hover:bg-brand-500 text-white">
            <Save className="w-4 h-4 mr-2" /> {isLoading ? "Kaydediliyor..." : "Taslağı Kaydet"}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Controls */}
        <div className="w-[340px] border-r border-slate-800 bg-slate-900 flex flex-col overflow-y-auto custom-scrollbar shrink-0">
          {selectedLabel && (
            <div className="px-4 py-2 bg-brand-600/10 border-b border-brand-600/20 flex items-center gap-2 shrink-0">
              <MousePointerClick className="w-3.5 h-3.5 text-brand-400 shrink-0" />
              <span className="text-[10px] text-brand-300 font-mono truncate">{selectedLabel}</span>
              <button 
                onClick={() => { setSelectedElement(null); setSelectedLabel(null); setActiveSidebarTab('colors'); }}
                className="ml-auto text-slate-500 hover:text-slate-300 text-[10px]"
              >✕</button>
            </div>
          )}
          <EditorSidebar activeTab={activeSidebarTab} onTabChange={setActiveSidebarTab} />
        </div>

        {/* Preview Canvas */}
        <div className="flex-1 bg-slate-950 flex flex-col items-center overflow-y-auto p-4 custom-scrollbar">
          <div className="text-xs text-slate-500 mb-2 font-mono uppercase tracking-widest">{viewport} önizleme</div>
          <div 
            className="flex-1 w-full bg-white transition-all duration-300 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-slate-800 mx-auto relative"
            style={{ 
              maxWidth: getViewportWidth(), 
              height: "calc(100vh - 120px)",
              minHeight: "600px" 
            }}
          >
            {/* The iframe points to the public site homepage. 
                Because the DesignProvider wraps the whole app, it will read the designStore state.
                Since designStore is shared in the browser window (localStorage/IndexedDB via persist usually, or we can use postMessage for instant updates if they are in different windows.
                Wait, if it's an iframe on the same origin, we can pass state, or since they share local storage/Supabase, it might not be INSTANT unless we inject a postMessage.
                For now, let's assume they share the Zustand store because they are same-origin, but actually iframes have their own JS context.
                We will implement postMessage to send live design updates to the iframe!
            */}
            <iframe 
              id="preview-iframe"
              src="/?preview=true" 
              className="w-full h-full border-none"
              title="Canlı Önizleme"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
