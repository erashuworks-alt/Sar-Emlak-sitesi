"use client";

import { useState } from "react";
import { useCMSStore } from "@/store/cmsStore";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { HomeSection, HomeSectionType } from "@/types/cms";
import { 
  GripVertical, Eye, EyeOff, Edit3, Trash2, Plus, 
  ChevronUp, ChevronDown, Layout, Play, Users, 
  Star, BarChart3, HelpCircle, MapPin, MousePointer2,
  Image as ImageIcon, Video, Layers, Check
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HomeSectionModal } from "@/components/admin/HomeSectionModal";
import { motion, Reorder } from "framer-motion";

const SECTION_ICONS: Record<HomeSectionType, any> = {
  hero: Layout,
  featured_properties: ImageIcon,
  services: Users,
  video_showcase: Play,
  popular_regions: MapPin,
  about: Star,
  testimonials: MessageSquare,
  statistics: BarChart3,
  faq: HelpCircle,
  cta: MousePointer2,
  blog: Layers,
  categories: Layers
};

import { MessageSquare } from "lucide-react";

export default function AdminHomepageBuilder() {
  const { homeSections, reorderHomeSections, updateHomeSection, deleteHomeSection } = useCMSStore();
  const [editingSection, setEditingSection] = useState<HomeSection | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReorder = (newSections: HomeSection[]) => {
    reorderHomeSections(newSections.map((s: HomeSection, i: number) => ({ ...s, order: i })));
  };

  const toggleVisibility = (id: string, current: boolean) => {
    updateHomeSection(id, { isActive: !current });
  };

  const openEdit = (section: HomeSection) => {
    setEditingSection(section);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-slate-50 dark:bg-slate-900">
      <AdminNavbar title="Sayfa Oluşturucu (Homepage Builder)" />
      
      <div className="p-8 h-full flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Anasayfa Bölümleri</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Bölümleri sürükleyerek sıralayın veya özelliklerini düzenleyin.</p>
          </div>
          <Button onClick={() => { setEditingSection(null); setIsModalOpen(true); }} className="rounded-2xl px-6">
            <Plus className="w-4 h-4 mr-2" /> Yeni Bölre Ekle
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto pr-4 pb-20">
          <Reorder.Group axis="y" values={homeSections} onReorder={handleReorder} className="space-y-4">
            {homeSections.map((section: HomeSection) => {
              const Icon = SECTION_ICONS[section.type] || Layout;
              return (
                <Reorder.Item 
                  key={section.id} 
                  value={section}
                  className={`bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-sm flex items-center gap-6 transition-all ${!section.isActive ? 'opacity-60 bg-slate-50 dark:bg-slate-900/50' : ''}`}
                >
                  <div className="cursor-grab active:cursor-grabbing p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors">
                    <GripVertical className="w-5 h-5 text-slate-400" />
                  </div>

                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${!section.isActive ? 'bg-slate-200 text-slate-400' : 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400'}`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-bold text-slate-900 dark:text-white truncate">{section.title}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        {section.type.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{section.subtitle || section.content || "Açıklama girilmemiş"}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => toggleVisibility(section.id, section.isActive)}
                      className={`p-3 rounded-2xl transition-all ${section.isActive ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'text-slate-400 bg-slate-100 dark:bg-slate-700'}`}
                      title={section.isActive ? "Gizle" : "Göster"}
                    >
                      {section.isActive ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                    <button 
                      onClick={() => openEdit(section)}
                      className="p-3 rounded-2xl text-brand-600 bg-brand-50 dark:bg-brand-900/20 hover:scale-105 transition-all"
                      title="Düzenle"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => deleteHomeSection(section.id)}
                      className="p-3 rounded-2xl text-red-500 bg-red-50 dark:bg-red-900/20 hover:scale-105 transition-all"
                      title="Sil"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
        </div>
      </div>

      <HomeSectionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        section={editingSection} 
      />
    </div>
  );
}
