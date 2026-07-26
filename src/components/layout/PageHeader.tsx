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
    <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
      <div>
        {greeting && (
          <p className="mb-1 text-lg font-semibold text-white/80">{greeting}</p>
        )}
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-white/50">{subtitle}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {children}
        <TopBar showClock={showClock} dateLabel={dateLabel} />
        {actionLabel && (
          <Button
            onClick={onAction}
            className="gap-2 bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-900 hover:border-emerald-700/80 shadow-[inset_0_-2px_0_0_#059669]"
          >
            <Plus className="h-4 w-4" />
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
