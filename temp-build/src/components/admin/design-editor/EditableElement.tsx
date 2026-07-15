"use client";

import React, { useEffect, useState } from "react";
import { useElementStore, ElementStyle } from "@/store/elementStore";

interface EditableElementProps {
  id: string; // Unique section_key (e.g. "hero-title")
  as?: React.ElementType; // e.g. "h1", "p", "div"
  children: React.ReactNode;
  className?: string; // Fallback Tailwind classes
  style?: React.CSSProperties; // Any extra static styles
}

export function EditableElement({ id, as: Component = "div", children, className = "", style = {} }: EditableElementProps) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setIsPreviewMode(params.get("preview") === "true");
    }
  }, []);
  
  const { styles, selectedElementId, setSelectedElement } = useElementStore();
  const [liveStyle, setLiveStyle] = useState<ElementStyle | null>(null);

  const isSelected = selectedElementId === id;

  // Sync with store
  useEffect(() => {
    setLiveStyle(styles[id] || null);
  }, [styles, id]);

  // Sync via postMessage (since the iframe needs to get real-time updates from the parent Admin UI)
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'ELEMENT_UPDATE' && e.data?.id === id) {
        setLiveStyle(prev => ({
          ...prev,
          ...e.data.style
        }));
      }
      if (e.data?.type === 'ELEMENT_SELECT') {
        setSelectedElement(e.data.id);
      }
    };
    
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [id, setSelectedElement]);

  const handleClick = (e: React.MouseEvent) => {
    if (!isPreviewMode) return;
    
    e.stopPropagation();
    setSelectedElement(id);
    
    // Notify parent window (Admin UI) that an element was selected
    window.parent.postMessage({ type: 'ELEMENT_SELECTED', id }, '*');
  };

  // Convert JSON styles to React CSSProperties
  const dynamicStyles: React.CSSProperties = {
    ...style,
    // Typography
    fontFamily: liveStyle?.typography?.fontFamily,
    fontSize: liveStyle?.typography?.fontSize,
    fontWeight: liveStyle?.typography?.fontWeight,
    color: liveStyle?.typography?.color,
    textAlign: liveStyle?.typography?.textAlign,
    letterSpacing: liveStyle?.typography?.letterSpacing,
    lineHeight: liveStyle?.typography?.lineHeight,
    textTransform: liveStyle?.typography?.textTransform,
    
    // Layout
    width: liveStyle?.layout?.width,
    height: liveStyle?.layout?.height,
    display: liveStyle?.layout?.display,
    justifyContent: liveStyle?.layout?.justifyContent,
    alignItems: liveStyle?.layout?.alignItems,
    
    // Spacing
    padding: liveStyle?.spacing?.padding,
    margin: liveStyle?.spacing?.margin,
  };

  // Clean undefined values
  Object.keys(dynamicStyles).forEach(key => {
    if (dynamicStyles[key as keyof React.CSSProperties] === undefined) {
      delete dynamicStyles[key as keyof React.CSSProperties];
    }
  });

  return (
    <Component
      className={`
        ${className} 
        ${isPreviewMode ? "transition-all duration-200 cursor-pointer hover:ring-2 hover:ring-brand-400/50" : ""} 
        ${isSelected && isPreviewMode ? "ring-2 ring-brand-500 ring-offset-2 relative z-10" : ""}
      `}
      style={dynamicStyles}
      onClick={handleClick}
    >
      {children}
    </Component>
  );
}
