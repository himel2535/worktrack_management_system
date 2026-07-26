import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
  barClassName?: string;
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  className,
  barClassName,
  showLabel = false,
}: ProgressBarProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showLabel && (
        <span className="text-xs font-medium text-slate-600 w-8">{value}%</span>
      )}
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn("h-full rounded-full bg-[#10B981] transition-all", barClassName)}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}
