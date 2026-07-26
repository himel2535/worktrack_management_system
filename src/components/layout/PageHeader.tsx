import { ReactNode } from "react";
import { TopBar } from "./TopBar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  greeting?: string;
  actionLabel?: string;
  onAction?: () => void;
  showClock?: boolean;
  dateLabel?: string;
  children?: ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  greeting,
  actionLabel,
  onAction,
  showClock = true,
  dateLabel,
  children,
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        {greeting && (
          <p className="mb-1 text-lg font-semibold text-slate-800">{greeting}</p>
        )}
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {children}
        <TopBar showClock={showClock} dateLabel={dateLabel} />
        {actionLabel && (
          <Button
            onClick={onAction}
            className="bg-[#059669] hover:bg-[#047857] text-white gap-2"
          >
            <Plus className="h-4 w-4" />
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
