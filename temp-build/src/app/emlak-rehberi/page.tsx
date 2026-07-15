"use client";

import { useCMSStore } from "@/store/cmsStore";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Calendar, ArrowRight, Search } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

export default function RealEstateGuidePage() {
  const { blogPosts } = useCMSStore();
  const publishedPosts = blogPosts.filter(p => p.isPublished);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Emlak Rehberi
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 dark:text-slate-400"
          >
            Gayrimenkul dünyasına dair ipuçları, rehberler ve sektörden en güncel haberler.
          </motion.p>
        </div>

        {publishedPosts.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-[3rem] border border-slate-100 dark:border-slate-700">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">Henüz yayınlanmış rehber bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedPosts.map((post, i) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 dark:border-slate-700 flex flex-col"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <Image src={post.featuredImage} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-brand-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-4">
                    <Calendar className="w-3.5 h-3.5" />
                    {format(new Date(post.createdAt), "dd MMMM yyyy", { locale: tr })}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-brand-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                  <Link 
                    href={`/emlak-rehberi/${post.slug}`}
                    className="mt-auto inline-flex items-center gap-2 text-brand-600 font-bold text-sm"
                  >
                    Devamını Oku <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
