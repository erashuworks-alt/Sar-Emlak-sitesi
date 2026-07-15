"use client";

import { useEffect } from "react";
import { useCMSStore } from "@/store/cmsStore";

export function BrandingManager() {
  const { branding } = useCMSStore();

  useEffect(() => {
    // Update Document Title
    if (branding.browserTitle) {
      document.title = branding.browserTitle;
    }

    // Update Favicon
    if (branding.faviconUrl) {
      const iconLinks = document.querySelectorAll("link[rel*='icon']");
      if (iconLinks.length > 0) {
        iconLinks.forEach(link => {
          (link as HTMLLinkElement).href = branding.faviconUrl;
        });
      } else {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = branding.faviconUrl;
        document.getElementsByTagName('head')[0].appendChild(link);
      }
    }

    // Update Apple Icon
    if (branding.appleIconUrl) {
      let appleLink = document.querySelector("link[rel='apple-touch-icon']") as HTMLLinkElement;
      if (!appleLink) {
        appleLink = document.createElement('link');
        appleLink.rel = 'apple-touch-icon';
        document.getElementsByTagName('head')[0].appendChild(appleLink);
      }
      appleLink.href = branding.appleIconUrl;
    }

    // Update Meta Description
    if (branding.seoDescription) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.getElementsByTagName('head')[0].appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', branding.seoDescription);
    }
  }, [branding]);

  return null;
}
