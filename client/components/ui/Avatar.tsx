import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  initials: string;
  size?: "sm" | "md" | "lg";
}

export function Avatar({
  initials,
  size = "md",
  className,
  ...props
}: AvatarProps) {
  const sizeStyles = {
    sm: "w-10 h-10 text-sm",
    md: "w-14 h-14 text-lg",
    lg: "w-16 h-16 text-xl",
  }[size];

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-action-subtle text-action font-display font-bold select-none shrink-0",
        sizeStyles,
        className
      )}
      {...props}
    >
      {initials}
    </div>
  );
}
