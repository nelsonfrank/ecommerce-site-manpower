import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export function Hero({
  title = "Good products. Less clutter.",
  subtitle = "Thoughtfully selected everyday goods with clear pricing, dependable quality, and a checkout that gets out of your way.",
  ctaText = "Shop all products",
  ctaHref = "/shop",
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        "rounded-2xl bg-ink text-surface p-7 md:p-10.5 mb-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 shadow-card",
        className
      )}
    >
      <div className="max-w-xl">
        <h1 className="font-display font-semibold text-[28px] xs:text-[32px] md:text-[40px] tracking-[-0.04em] leading-[1.1] text-surface mb-2">
          {title}
        </h1>
        <p className="font-sans text-sm md:text-[15px] leading-relaxed text-[#c7cbd3] max-w-[55ch]">
          {subtitle}
        </p>
        <div className="mt-5">
          <Link href={ctaHref} className="focus-ring inline-block rounded-sm">
            <Button
              variant="secondary"
              className="bg-surface text-ink hover:bg-mist/40 border-0"
            >
              {ctaText}
            </Button>
          </Link>
        </div>
      </div>

      <div
        className="text-6xl md:text-8xl leading-none opacity-90 select-none self-end md:self-center text-action-subtle"
        aria-hidden="true"
      >
        ✦
      </div>
    </section>
  );
}
