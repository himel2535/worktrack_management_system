import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
  barClassName?: string;
  trackClassName?: string;
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  className,
  barClassName,
  trackClassName,
  showLabel = false,
}: ProgressBarProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showLabel && (
        <span className="w-8 text-xs font-medium text-white/60">{value}%</span>
      )}
      <div
        className={cn(
          "h-1.5 flex-1 overflow-hidden rounded-full bg-white/10",
          trackClassName
        )}
      >
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-500 shadow-[0_0_8px_rgba(5,150,105,0.4)] transition-all",
            barClassName
          )}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}
