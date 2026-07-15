"use client";

import { useState, useRef } from "react";
import { Upload, X, ImageIcon, Loader2, Video } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";

interface MediaUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  onRemove: (url: string) => void;
  maxFiles?: number;
  bucket?: string;
  accept?: "image/*" | "video/*" | "image/*,video/*";
}

export function MediaUpload({
  value = [],
  onChange,
  onRemove,
  maxFiles = 5,
  bucket = "properties",
  accept = "image/*"
}: MediaUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newUrls: string[] = [...value];

    for (let i = 0; i < files.length; i++) {
      if (newUrls.length >= maxFiles) break;

      const file = files[i];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      try {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || 
            process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
           const localUrl = URL.createObjectURL(file);
           newUrls.push(localUrl);
           continue;
        }

        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(filePath, file);

        if (error) {
          console.error("Upload error:", error);
          newUrls.push(URL.createObjectURL(file));
        } else {
          const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(filePath);
          newUrls.push(publicUrl);
        }
      } catch (err) {
        console.error("Upload exception:", err);
      }
    }

    onChange(newUrls);
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const isVideo = (url: string) => {
    return url.includes(".mp4") || url.includes(".webm") || url.includes(".ogg") || url.startsWith("blob:");
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-wrap gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-32 h-32 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 group shadow-sm bg-slate-100 dark:bg-slate-900">
            {isVideo(url) ? (
              <video src={url} className="w-full h-full object-cover" muted />
            ) : (
              <img src={url} alt="Uploaded" className="w-full h-full object-cover" />
            )}
            <button
              onClick={() => onRemove(url)}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
            >
              <X className="w-3 h-3" />
            </button>
            {isVideo(url) && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Video className="w-6 h-6 text-white opacity-50" />
              </div>
            )}
          </div>
        ))}
        {value.length < maxFiles && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-32 h-32 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center cursor-pointer hover:border-brand-500 hover:bg-brand-50/10 transition-all text-slate-400 hover:text-brand-500 group bg-slate-50 dark:bg-slate-900/50"
          >
            {isUploading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <Upload className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Yükle</span>
              </>
            )}
          </div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        multiple={maxFiles > 1}
        accept={accept}
        className="hidden"
      />
      <p className="text-[10px] text-slate-400 font-medium">
        En fazla {maxFiles} dosya ekleyebilirsiniz. {accept.includes("video") ? "(JPG, PNG, MP4)" : "(JPG, PNG)"}
      </p>
    </div>
  );
}
