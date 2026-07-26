import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  subLabel?: string;
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  valueColor?: string;
  className?: string;
  variant?: "default" | "dashboard";
  progress?: number;
}

export function StatCard({
  label,
  value,
  subLabel,
  icon: Icon,
  iconBg = "bg-emerald-50",
  iconColor = "text-emerald-600",
  valueColor,
  className,
  variant = "default",
  progress,
}: StatCardProps) {
  if (variant === "dashboard") {
    return (
      <div
        className={cn(
          "rounded-xl border border-gray-100 bg-white p-4 shadow-sm",
          className
        )}
      >
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
              iconBg
            )}
          >
            <Icon className={cn("h-5 w-5", iconColor)} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm text-slate-600">{label}</p>
            <p
              className={cn(
                "text-xl font-bold text-slate-900",
                valueColor
              )}
            >
              {value}
            </p>
            {subLabel && (
              <p className="mt-0.5 text-xs text-slate-400">{subLabel}</p>
            )}
            {progress !== undefined && (
              <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-600 transition-all"
                  style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-slate-100 bg-white p-4 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className={cn("mt-1 text-2xl font-bold text-slate-900", valueColor)}>
            {value}
          </p>
          {subLabel && (
            <p className="mt-0.5 text-xs text-slate-400">{subLabel}</p>
          )}
        </div>
        <div className={cn("rounded-full p-2.5", iconBg)}>
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>
      </div>
    </div>
  );
}
