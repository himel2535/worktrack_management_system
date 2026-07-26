"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { cn } from "@/lib/utils";

interface DonutChartProps {
  data: { name: string; value: number; color: string }[];
  centerLabel?: string;
  centerValue?: string | number;
  showLegend?: boolean;
  legendPosition?: "right" | "bottom";
  height?: number;
  variant?: "default" | "productivity";
  theme?: "light" | "dark";
}

function getCenterValueFontSize(value: string | number): string {
  const text = String(value);
  if (text.length > 6 || text.includes(":")) {
    return "text-lg";
  }
  if (text.length > 4) {
    return "text-xl";
  }
  return "text-[28px]";
}

function CenterLabelPill({
  label,
  isDark,
}: {
  label: string;
  isDark: boolean;
}) {
  const words = label.split(" ");

  return (
    <div
      className={cn(
        "pointer-events-none absolute left-1/2 top-[calc(50%+20px)] -translate-x-1/2 rounded-full px-2.5 py-0.5 text-center",
        isDark ? "border border-white/20 bg-white/5" : "bg-slate-50/80"
      )}
    >
      {words.length >= 2 ? (
        words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className={cn(
              "block text-[9px] font-medium leading-[1.15]",
              isDark ? "text-white/60" : "text-slate-500"
            )}
          >
            {word}
          </span>
        ))
      ) : (
        <span
          className={cn(
            "block text-[9px] font-medium leading-[1.15]",
            isDark ? "text-white/60" : "text-slate-500"
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}

export function DonutChart({
  data,
  centerLabel,
  centerValue,
  showLegend = true,
  height = 200,
  variant = "default",
  theme = "dark",
}: DonutChartProps) {
  const isDark = theme === "dark";
  const chartHeight = variant === "productivity" ? 170 : Math.min(height, 170);
  const valueFontSize =
    centerValue !== undefined ? getCenterValueFontSize(centerValue) : "text-[28px]";

  return (
    <div className="mx-auto flex w-full min-w-[200px] max-w-[220px] flex-col items-center">
      <div className="relative w-full" style={{ height: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={180}>
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={82}
              paddingAngle={4}
              stroke={isDark ? "rgba(255,255,255,0.1)" : "#fff"}
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        {centerValue !== undefined && (
          <span
            className={cn(
              "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold leading-none",
              valueFontSize,
              isDark ? "text-white" : "text-slate-900"
            )}
          >
            {centerValue}
          </span>
        )}
        {centerLabel && <CenterLabelPill label={centerLabel} isDark={isDark} />}
      </div>
      {showLegend && (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span
                className={cn(
                  "text-xs",
                  isDark ? "text-white/70" : "text-slate-600"
                )}
              >
                {entry.name} ({entry.value}%)
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
