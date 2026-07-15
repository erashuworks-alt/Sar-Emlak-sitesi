"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditPropertyRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="animate-pulse text-slate-400 font-medium">Yönlendiriliyorsunuz...</div>
    </div>
  );
}
