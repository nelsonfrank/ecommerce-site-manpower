import * as React from "react";
import { cn } from "@/lib/utils";

export interface TimelineStepProps {
  title: string;
  description?: string;
  isDone?: boolean;
  isLast?: boolean;
  className?: string;
}

export function TimelineStep({
  title,
  description,
  isDone = false,
  isLast = false,
  className,
}: TimelineStepProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-[28px_1fr] gap-3 min-h-[58px]",
        className
      )}
    >
      <div className="relative flex flex-col items-center">
        <span
          className={cn(
            "mt-1 h-3 w-3 rounded-full transition-colors",
            isDone ? "bg-success" : "bg-mist"
          )}
          aria-hidden="true"
        />
        {!isLast && (
          <span
            className={cn(
              "w-0.5 flex-1 min-h-[44px] transition-colors",
              isDone ? "bg-success/40" : "bg-mist"
            )}
            aria-hidden="true"
          />
        )}
      </div>

      <div className="pb-4">
        <strong className="block text-sm font-semibold text-ink leading-tight">
          {title}
        </strong>
        {description && (
          <span className="block text-xs text-slate mt-0.5 leading-snug">
            {description}
          </span>
        )}
      </div>
    </div>
  );
}
