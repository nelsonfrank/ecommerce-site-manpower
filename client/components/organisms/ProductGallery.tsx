"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface GalleryView {
  label: string;
  position: "center" | "top" | "bottom";
}

const DEFAULT_VIEWS: GalleryView[] = [
  { label: "Main", position: "center" },
  { label: "Detail", position: "top" },
  { label: "Angle", position: "bottom" },
];

export interface ProductGalleryProps {
  imageSrc: string;
  alt: string;
  className?: string;
}

export function ProductGallery({
  imageSrc,
  alt,
  className,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const currentView = DEFAULT_VIEWS[selectedIndex];

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-md border border-mist bg-[#f1f2f4] p-3 shadow-sm">
        <div className="relative h-full w-full">
          <Image
            src={imageSrc}
            alt={alt}
            fill
            priority
            sizes="(max-width: 820px) 100vw, 50vw"
            className={cn(
              "object-contain transition-all duration-300",
              currentView.position === "top" && "object-top",
              currentView.position === "bottom" && "object-bottom",
              currentView.position === "center" && "object-center"
            )}
          />
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1" role="tablist" aria-label="Product image angles">
        {DEFAULT_VIEWS.map((view, index) => {
          const isActive = selectedIndex === index;

          return (
            <button
              key={view.label}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`${alt} - ${view.label} view`}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "focus-ring relative h-[72px] w-[72px] shrink-0 rounded-sm border bg-surface p-1 transition-all cursor-pointer",
                isActive
                  ? "border-2 border-action shadow-xs"
                  : "border-mist hover:border-slate/40 opacity-80 hover:opacity-100"
              )}
            >
              <div className="relative h-full w-full">
                <Image
                  src={imageSrc}
                  alt={`${alt} ${view.label}`}
                  fill
                  sizes="72px"
                  className={cn(
                    "object-contain",
                    view.position === "top" && "object-top",
                    view.position === "bottom" && "object-bottom",
                    view.position === "center" && "object-center"
                  )}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
