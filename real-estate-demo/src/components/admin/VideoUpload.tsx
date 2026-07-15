"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, FileVideo } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface VideoUploadProps {
  value: string;
  onChange: (url: string) => void;
  onRemove: () => void;
  bucket?: string;
}

export function VideoUpload({
  value,
  onChange,
  onRemove,
  bucket = "videos"
}: VideoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const file = files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
      // Simulate if no Supabase URL
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
         const localUrl = URL.createObjectURL(file);
         onChange(localUrl);
      } else {
        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(filePath, file);

        if (error) {
          console.error("Upload error:", error);
          onChange(URL.createObjectURL(file));
        } else {
          const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(filePath);
          onChange(publicUrl);
        }
      }
    } catch (err) {
      console.error("Upload exception:", err);
    }

    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-4 w-full">
      {value ? (
        <div className="relative w-full max-w-sm aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 group shadow-sm bg-black">
          <video src={value} className="w-full h-full object-cover" controls />
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-full max-w-sm aspect-video rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center cursor-pointer hover:border-brand-500 hover:bg-brand-50/10 transition-all text-slate-400 hover:text-brand-500 group bg-slate-50 dark:bg-slate-900/50"
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
              <span className="text-xs font-medium text-slate-500">Video Yükleniyor...</span>
            </div>
          ) : (
            <>
              <FileVideo className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-brand-500">PC'den Video Yükle</span>
            </>
          )}
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        accept="video/*"
        className="hidden"
      />
      <p className="text-[10px] text-slate-400 font-medium">
        Desteklenen formatlar: MP4, WebM (Maks. 50MB)
      </p>
    </div>
  );
}
