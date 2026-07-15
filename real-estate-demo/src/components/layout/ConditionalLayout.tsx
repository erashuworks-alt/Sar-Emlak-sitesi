"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useCMSStore } from "@/store/cmsStore";
import { MaintenanceView } from "./MaintenanceView";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const { isMaintenanceMode } = useCMSStore();

  if (isAdmin) {
    return <>{children}</>;
  }

  if (isMaintenanceMode) {
    return <MaintenanceView />;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
