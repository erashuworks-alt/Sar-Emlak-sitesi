"use client";

import { useCMSStore } from "@/store/cmsStore";
import { HomeSectionRenderer } from "@/components/home/HomeSectionRenderer";

export default function HomePage() {
  const { homeSections } = useCMSStore();

  // Sort and filter active sections (isActive check is also inside renderer, but good to filter here for performance)
  const activeSections = [...homeSections]
    .filter(s => s.isActive)
    .sort((a, b) => a.order - b.order);

  return (
    <main className="flex-1">
      {activeSections.map((section) => (
        <HomeSectionRenderer key={section.id} section={section} />
      ))}
    </main>
  );
}
