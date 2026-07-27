import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AdminStatRowProps {
  children: ReactNode;
  className?: string;
}

export function AdminStatRow({ children, className }: AdminStatRowProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5", className)}>
      {children}
    </div>
  );
}
