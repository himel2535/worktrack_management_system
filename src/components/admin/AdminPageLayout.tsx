"use client";

import { ReactNode } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

interface AdminPageLayoutProps {
  title?: string;
  subtitle?: string;
  stats?: ReactNode;
  children: ReactNode;
}

export function AdminPageLayout({ title, subtitle, stats, children }: AdminPageLayoutProps) {
  return (
    <div className="page-stack">
      <DashboardHeader theme="glass" title={title} subtitle={subtitle} />
      {stats}
      {children}
    </div>
  );
}
