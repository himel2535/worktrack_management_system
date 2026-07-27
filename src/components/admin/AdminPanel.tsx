"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AdminPanelProps {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function AdminPanel({ title, action, children, className }: AdminPanelProps) {
  return (
    <div className={cn("panel-card", className)}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="panel-title-glass mb-0">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}
