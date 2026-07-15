"use client";

import { useCMSStore } from "@/store/cmsStore";
import { useState } from "react";
import { Save, Plus, Trash2, FileText, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ImageUpload } from "@/components/admin/ImageUpload";

export default function AdminBlogCMS() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useCMSStore();
  const [isAdding, setIsAdding] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    category: "Rehber",
    isPublished: false
  });

  const handleAdd = () => {
    addBlogPost({
      ...newPost,
      slug: newPost.title.toLowerCase().replace(/\s+/g, "-"),
    });
    setNewPost({ title: "", excerpt: "", content: "", featuredImage: "", category: "Rehber", isPublished: false });
    setIsAdding(false);
  };

  const selectedPost = blogPosts.find(p => p.id === selectedId);

  return (
    <div className="p-6 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Emlak Rehberi (Blog) Yönetimi</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Ziyaretçileriniz için bilgilendirici içerikler oluşturun.</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="rounded-xl px-6">
          <Plus className="w-4 h-4 mr-2" /> Yeni Yazı Ekle
        </Button>
      </div>

      <div className="flex-1 flex gap-8 overflow-hidden">
        {/* Posts List */}
        <div className="w-80 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Yazılar ({blogPosts.length})</h2>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-700/50">
            {blogPosts.map(post => (
              <button 
                key={post.id}
                onClick={() => setSelectedId(post.id)}
                className={`w-full p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex items-center gap-4 ${selectedId === post.id ? 'bg-brand-50 dark:bg-brand-900/10 border-r-4 border-brand-600' : ''}`}
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{post.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] font-bold text-brand-600 uppercase bg-brand-50 px-1.5 py-0.5 rounded-full">{post.category}</span>
                    {post.isPublished ? (
                      <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-0.5"><CheckCircle className="w-2.5 h-2.5" /> Yayında</span>
                    ) : (
                      <span className="text-[9px] font-bold text-slate-400 flex items-center gap-0.5"><XCircle className="w-2.5 h-2.5" /> Taslak</span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Post Editor */}
        <div className="flex-1 bg-white dark:bg-slate-800 rounded-[3rem] border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col">
          {isAdding || selectedPost ? (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isAdding ? "Yeni Yazı Ekle" : `${selectedPost?.title} Düzenle`}
                </h2>
                <div className="flex items-center gap-2">
                  {!isAdding && (
                    <button onClick={() => deleteBlogPost(selectedPost!.id)} className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                  <Button onClick={isAdding ? handleAdd : undefined} className="rounded-xl px-6">
                    <Save className="w-4 h-4 mr-2" /> {isAdding ? "Ekle" : "Kaydet"}
                  </Button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Yazı Başlığı</label>
                      <input 
                        value={isAdding ? newPost.title : selectedPost?.title}
                        onChange={e => isAdding ? setNewPost({ ...newPost, title: e.target.value }) : updateBlogPost(selectedPost!.id, { title: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Kategori</label>
                        <input 
                          value={isAdding ? newPost.category : selectedPost?.category}
                          onChange={e => isAdding ? setNewPost({ ...newPost, category: e.target.value }) : updateBlogPost(selectedPost!.id, { category: e.target.value })}
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Durum</label>
                        <select 
                          value={isAdding ? (newPost.isPublished ? "true" : "false") : (selectedPost?.isPublished ? "true" : "false")}
                          onChange={e => {
                            const val = e.target.value === "true";
                            isAdding ? setNewPost({ ...newPost, isPublished: val }) : updateBlogPost(selectedPost!.id, { isPublished: val });
                          }}
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none"
                        >
                          <option value="false">Taslak</option>
                          <option value="true">Yayında</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Öne Çıkan Görsel</label>
                    <ImageUpload 
                      value={isAdding ? (newPost.featuredImage ? [newPost.featuredImage] : []) : (selectedPost?.featuredImage ? [selectedPost.featuredImage] : [])}
                      onChange={urls => {
                        const url = urls[0] || "";
                        isAdding ? setNewPost({ ...newPost, featuredImage: url }) : updateBlogPost(selectedPost!.id, { featuredImage: url });
                      }}
                      onRemove={() => isAdding ? setNewPost({ ...newPost, featuredImage: "" }) : updateBlogPost(selectedPost!.id, { featuredImage: "" })}
                      maxFiles={1}
                      bucket="blog"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Kısa Özet (Liste Sayfası İçin)</label>
                  <textarea 
                    value={isAdding ? newPost.excerpt : selectedPost?.excerpt}
                    onChange={e => isAdding ? setNewPost({ ...newPost, excerpt: e.target.value }) : updateBlogPost(selectedPost!.id, { excerpt: e.target.value })}
                    className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Yazı İçeriği (Markdown veya HTML destekler)</label>
                  <textarea 
                    value={isAdding ? newPost.content : selectedPost?.content}
                    onChange={e => isAdding ? setNewPost({ ...newPost, content: e.target.value }) : updateBlogPost(selectedPost!.id, { content: e.target.value })}
                    className="w-full p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500 font-mono"
                    rows={12}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
              <FileText className="w-16 h-16 mb-4 opacity-10" />
              <p>Düzenlemek veya yeni eklemek için bir yazı seçin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
