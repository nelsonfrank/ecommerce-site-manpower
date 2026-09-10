import * as React from "react";
import { cn } from "@/lib/utils";

export interface RadioCardProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  selected?: boolean;
  titleText: React.ReactNode;
  description?: React.ReactNode;
}

export const RadioCard = React.forwardRef<HTMLInputElement, RadioCardProps>(
  (
    {
      className,
      selected,
      titleText,
      description,
      id,
      name,
      value,
      checked,
      disabled,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const isSelected = selected ?? checked;

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "focus-ring relative flex items-start gap-3 rounded-sm border p-3.5 transition-all duration-150 cursor-pointer select-none",
          isSelected
            ? "border-action bg-action-subtle text-ink"
            : "border-mist bg-surface text-ink hover:border-slate/40",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <input
          ref={ref}
          type="radio"
          id={inputId}
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className="focus-ring mt-0.5 h-4 w-4 shrink-0 text-action accent-action cursor-pointer"
          {...props}
        />
        <div className="flex-1 text-sm">
          <div className="font-semibold leading-tight text-ink">{titleText}</div>
          {description && (
            <div className="mt-1 text-[13px] font-normal text-slate leading-relaxed">
              {description}
            </div>
          )}
        </div>
      </label>
    );
  }
);

RadioCard.displayName = "RadioCard";
