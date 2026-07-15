"use client";

import { useCMSStore } from "@/store/cmsStore";
import { useState } from "react";
import { Save, Info, Target, Award, Users, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ImageUpload } from "@/components/admin/ImageUpload";

export default function AdminAboutCMS() {
  const { about, updateAbout } = useCMSStore();
  const [formData, setFormData] = useState(about);

  const handleSave = () => {
    updateAbout(formData);
    alert("Hakkımızda sayfası güncellendi.");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Hakkımızda Sayfası Yönetimi</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Şirket hikayesi, vizyon, misyon ve ekip bilgilerini yönetin.</p>
        </div>
        <Button onClick={handleSave} className="rounded-xl px-6">
          <Save className="w-4 h-4 mr-2" /> Kaydet
        </Button>
      </div>

      {/* Hero Section */}
      <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <Info className="w-5 h-5 text-brand-600" /> Hero Bölümü
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Hero Başlığı</label>
              <input 
                value={formData.heroTitle}
                onChange={e => setFormData({ ...formData, heroTitle: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Hero Açıklaması</label>
              <textarea 
                value={formData.heroDescription}
                onChange={e => setFormData({ ...formData, heroDescription: e.target.value })}
                className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                rows={3}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Hero Görseli</label>
            <ImageUpload 
              value={formData.images[0] ? [formData.images[0]] : []}
              onChange={urls => {
                const next = [...formData.images];
                next[0] = urls[0] || "";
                setFormData({ ...formData, images: next });
              }}
              onRemove={() => {
                const next = [...formData.images];
                next[0] = "";
                setFormData({ ...formData, images: next });
              }}
              maxFiles={1}
              bucket="about"
            />
          </div>
        </div>
      </div>

      {/* Story, Mission, Vision */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            Hikayemiz
          </h2>
          <textarea 
            value={formData.companyStory}
            onChange={e => setFormData({ ...formData, companyStory: e.target.value })}
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500 resize-none"
            rows={8}
          />
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-brand-600" /> Misyonumuz
          </h2>
          <textarea 
            value={formData.mission}
            onChange={e => setFormData({ ...formData, mission: e.target.value })}
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500 resize-none"
            rows={8}
          />
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-brand-600" /> Vizyonumuz
          </h2>
          <textarea 
            value={formData.vision}
            onChange={e => setFormData({ ...formData, vision: e.target.value })}
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500 resize-none"
            rows={8}
          />
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-600" /> Ekip Üyeleri
          </h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setFormData({ 
              ...formData, 
              teamMembers: [...formData.teamMembers, { id: Date.now().toString(), name: "", role: "", image: "" }] 
            })}
            className="rounded-xl"
          >
            <Plus className="w-4 h-4 mr-2" /> Üye Ekle
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formData.teamMembers.map((member: { id: string; name: string; role: string; image: string }, idx: number) => (
            <div key={member.id} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 relative group">
              <button 
                onClick={() => setFormData({ ...formData, teamMembers: formData.teamMembers.filter((m: { id: string }) => m.id !== member.id) })}
                className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Profil Fotoğrafı</label>
                  <ImageUpload 
                    value={member.image ? [member.image] : []}
                    onChange={urls => {
                      const next = [...formData.teamMembers];
                      next[idx].image = urls[0] || "";
                      setFormData({ ...formData, teamMembers: next });
                    }}
                    onRemove={() => {
                      const next = [...formData.teamMembers];
                      next[idx].image = "";
                      setFormData({ ...formData, teamMembers: next });
                    }}
                    maxFiles={1}
                    bucket="team"
                  />
                </div>
                <input 
                  placeholder="İsim Soyisim"
                  value={member.name}
                  onChange={e => {
                    const next = [...formData.teamMembers];
                    next[idx].name = e.target.value;
                    setFormData({ ...formData, teamMembers: next });
                  }}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
                <input 
                  placeholder="Ünvan / Rol"
                  value={member.role}
                  onChange={e => {
                    const next = [...formData.teamMembers];
                    next[idx].role = e.target.value;
                    setFormData({ ...formData, teamMembers: next });
                  }}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
