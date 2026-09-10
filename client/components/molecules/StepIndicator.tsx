import * as React from "react";
import { cn } from "@/lib/utils";

export interface StepIndicatorProps {
  steps: string[];
  currentStep: number; // 1-based index
  className?: string;
}

export function StepIndicator({
  steps,
  currentStep,
  className,
}: StepIndicatorProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 mb-7 overflow-x-auto py-1",
        className
      )}
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={steps.length}
    >
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isDone = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <React.Fragment key={step}>
            <div
              className={cn(
                "flex items-center gap-2 text-[13px] font-semibold whitespace-nowrap select-none",
                isDone && "text-success",
                isActive && "text-ink",
                !isDone && !isActive && "text-slate"
              )}
            >
              <span
                className={cn(
                  "inline-flex h-5 min-w-5 items-center justify-center rounded-full text-xs font-bold leading-none",
                  isDone && "bg-success-bg text-success",
                  isActive && "bg-ink text-surface",
                  !isDone && !isActive && "bg-mist text-slate"
                )}
              >
                {isDone ? "✓" : stepNumber}
              </span>
              <span>{step}</span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-[1px] flex-1 min-w-[20px] transition-colors",
                  stepNumber < currentStep ? "bg-success/50" : "bg-mist"
                )}
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
