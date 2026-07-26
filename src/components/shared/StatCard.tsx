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
  variant?: "default" | "dashboard" | "glass";
  progress?: number;
  showGlobeDecoration?: boolean;
}

const glassIconStyles: Record<string, string> = {
  "bg-emerald-50": "bg-emerald-500/20 ring-emerald-400/30 text-emerald-400",
  "bg-orange-50": "bg-orange-500/20 ring-orange-400/30 text-orange-400",
  "bg-blue-50": "bg-blue-500/20 ring-blue-400/30 text-blue-400",
  "bg-purple-50": "bg-purple-500/20 ring-purple-400/30 text-purple-400",
};

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
  showGlobeDecoration,
}: StatCardProps) {
  if (variant === "glass") {
    const glassIcon =
      glassIconStyles[iconBg] ??
      "bg-emerald-500/20 ring-emerald-400/30 text-emerald-400";

    return (
      <div className={cn("glass-stat-card relative overflow-hidden", className)}>
        {showGlobeDecoration && (
          <div className="pointer-events-none absolute -right-2 top-1/2 h-14 w-14 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-400/30 to-cyan-300/10 blur-sm" />
        )}
        <div className="relative flex items-start gap-2.5">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1",
              glassIcon
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-white/80">{label}</p>
            <p
              className={cn(
                "text-2xl font-bold leading-tight text-white",
                valueColor ?? "text-white"
              )}
            >
              {value}
            </p>
            {progress !== undefined && (
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{
                    width: `${Math.min(100, Math.max(0, progress))}%`,
                  }}
                />
              </div>
            )}
            {subLabel && (
              <p className="mt-1 text-xs font-normal text-white/45">{subLabel}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "dashboard") {
    return (
      <div
        className={cn(
          "rounded-xl border border-slate-100/80 bg-white p-3.5 shadow-[0_2px_12px_rgba(15,23,42,0.06)]",
          className
        )}
      >
        <div className="flex items-start gap-2.5">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
              iconBg
            )}
          >
            <Icon className={cn("h-5 w-5", iconColor)} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-800">{label}</p>
            <p
              className={cn(
                "text-2xl font-bold leading-tight text-slate-900",
                valueColor
              )}
            >
              {value}
            </p>
            {progress !== undefined && (
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{
                    width: `${Math.min(100, Math.max(0, progress))}%`,
                  }}
                />
              </div>
            )}
            {subLabel && (
              <p className="mt-1 text-xs font-normal text-slate-400">
                {subLabel}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("glass-stat-card", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-bold text-white/80">{label}</p>
          <p className={cn("mt-1 text-2xl font-bold text-white", valueColor)}>
            {value}
          </p>
          {subLabel && (
            <p className="mt-0.5 text-xs text-white/45">{subLabel}</p>
          )}
        </div>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full ring-1",
            glassIconStyles[iconBg] ??
              "bg-emerald-500/20 ring-emerald-400/30 text-emerald-400"
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
