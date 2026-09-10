import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";

export interface ProfileHeaderProps {
  name: string;
  email: string;
  memberSince?: string;
  initials?: string;
  onEdit?: () => void;
  className?: string;
}

export function ProfileHeader({
  name,
  email,
  memberSince = "Member since Jan 2025",
  initials,
  onEdit,
  className,
}: ProfileHeaderProps) {
  const derivedInitials =
    initials ||
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3.5 pb-5 border-b border-mist",
        className
      )}
    >
      <Avatar initials={derivedInitials} />

      <div className="flex-1 min-w-[200px]">
        <h2 className="font-display font-semibold text-xl md:text-2xl text-ink tracking-tight">
          {name}
        </h2>
        <p className="font-sans text-[13px] text-slate font-normal mt-1">
          {email} · {memberSince}
        </p>
      </div>

      <Button variant="secondary" size="sm" onClick={onEdit} className="ml-auto">
        Edit
      </Button>
    </div>
  );
}
