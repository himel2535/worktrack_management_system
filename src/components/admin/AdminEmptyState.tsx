"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminEmptyStateProps {
  icon: LucideIcon;
  message: string;
  className?: string;
}

export function AdminEmptyState({ icon: Icon, message, className }: AdminEmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-10 text-center", className)}>
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
        <Icon className="h-6 w-6 text-white/40" />
      </div>
      <p className="text-sm text-white/50">{message}</p>
    </div>
  );
}
