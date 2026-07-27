import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProgressBar } from "@/components/shared/ProgressBar";

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
  "bg-emerald-50": "bg-emerald-950/90 ring-emerald-500/40 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.25)]",
  "bg-orange-50": "bg-amber-950/90 ring-amber-500/40 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.25)]",
  "bg-blue-50": "bg-sky-950/90 ring-sky-500/40 text-sky-400 shadow-[0_0_12px_rgba(14,165,233,0.25)]",
  "bg-purple-50": "bg-purple-950/90 ring-purple-500/40 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.25)]",
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
      "bg-emerald-950/90 ring-emerald-500/40 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.25)]";

    return (
      <div className={cn("glass-stat-card relative overflow-hidden p-5", className)}>
        {showGlobeDecoration && (
          <div className="pointer-events-none absolute -right-2 top-1/2 h-14 w-14 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-300/10 blur-sm" />
        )}
        <div className="relative flex items-center gap-5 min-h-[76px]">
          {/* Left Side: Icon (Left padding of card = 20px, Gap to text = 20px) */}
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 self-center items-center justify-center rounded-2xl ring-1 backdrop-blur-md transition-all duration-300 hover:scale-105",
              glassIcon
            )}
          >
            <Icon className="h-5 w-5" />
          </div>

          {/* Right Side: Label top, Number middle, Sublabel bottom */}
          <div className="min-w-0 flex-1 flex flex-col justify-center">
            <p className="text-xs font-semibold text-white/70 tracking-wide">{label}</p>
            <p
              className={cn(
                "my-0.5 text-2xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]",
                valueColor ?? "text-white"
              )}
            >
              {value}
            </p>
            {progress !== undefined && (
              <ProgressBar value={progress} className="my-1 w-full" />
            )}
            {subLabel && (
              <p className="text-[11px] font-normal text-white/50 truncate">{subLabel}</p>
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
          "rounded-xl border border-slate-100/80 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.06)]",
          className
        )}
      >
        <div className="flex items-center gap-5">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 self-center items-center justify-center rounded-full",
              iconBg
            )}
          >
            <Icon className={cn("h-5 w-5", iconColor)} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500">{label}</p>
            <p
              className={cn(
                "my-0.5 text-2xl font-bold leading-tight text-slate-900",
                valueColor
              )}
            >
              {value}
            </p>
            {progress !== undefined && (
              <ProgressBar
                value={progress}
                className="my-1 w-full"
                trackClassName="bg-slate-100 ring-0"
                barClassName="from-emerald-700 via-emerald-600 to-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.35)]"
              />
            )}
            {subLabel && (
              <p className="text-xs font-normal text-slate-400 truncate">
                {subLabel}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("glass-stat-card p-5", className)}>
      <div className="flex items-center gap-5 min-h-[76px]">
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 self-center items-center justify-center rounded-2xl ring-1 backdrop-blur-md transition-all duration-300 hover:scale-105",
            glassIconStyles[iconBg] ??
              "bg-emerald-950/90 ring-emerald-500/40 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.25)]"
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1 flex flex-col justify-center">
          <p className="text-xs font-semibold text-white/70 tracking-wide">{label}</p>
          <p className={cn("my-0.5 text-2xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]", valueColor)}>
            {value}
          </p>
          {subLabel && (
            <p className="text-[11px] text-white/50 truncate">{subLabel}</p>
          )}
        </div>
      </div>
    </div>
  );
}
