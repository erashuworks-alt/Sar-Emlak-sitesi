"use client";

import { useCMSStore } from "@/store/cmsStore";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, ChevronLeft, Share2, Link as LinkIcon } from "lucide-react";

// Social Icons SVGs
const Facebook = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const Twitter = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Button } from "@/components/ui/Button";

export default function BlogPostDetailPage() {
  const { slug } = useParams();
  const { blogPosts } = useCMSStore();
  const router = useRouter();

  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Yazı Bulunamadı</h1>
          <Button onClick={() => router.back()}>Geri Dön</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-32 pb-20">
      <article className="container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-brand-600 transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" /> Geri Dön
        </motion.button>

        <header className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="bg-brand-50 dark:bg-brand-900/30 text-brand-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
              <Calendar className="w-3.5 h-3.5" />
              {format(new Date(post.createdAt), "dd MMMM yyyy", { locale: tr })}
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-8"
          >
            {post.title}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative h-[300px] md:h-[500px] w-full rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
          </motion.div>
        </header>

        <div className="grid lg:grid-cols-[1fr_250px] gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-slate dark:prose-invert max-w-none"
          >
            <div className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed space-y-6">
              {/* Here we would normally render markdown/HTML */}
              {post.content.split("\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </motion.div>

          <aside className="space-y-8">
            <div className="sticky top-32 p-8 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-brand-600" /> Paylaş
              </h3>
              <div className="flex flex-col gap-3">
                <button className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-brand-500 transition-all group">
                  <Facebook className="w-5 h-5 text-slate-400 group-hover:text-[#1877F2]" />
                  <span className="text-sm font-medium">Facebook</span>
                </button>
                <button className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-brand-500 transition-all group">
                  <Twitter className="w-5 h-5 text-slate-400 group-hover:text-[#1DA1F2]" />
                  <span className="text-sm font-medium">Twitter</span>
                </button>
                <button className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-brand-500 transition-all group">
                  <LinkIcon className="w-5 h-5 text-slate-400 group-hover:text-brand-600" />
                  <span className="text-sm font-medium">Bağlantıyı Kopyala</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
