"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { cn } from "@/lib/utils";
import { Rocket, Sparkles } from "lucide-react";

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
    return "text-base sm:text-lg";
  }
  if (text.length > 4) {
    return "text-xl sm:text-2xl";
  }
  return "text-2xl sm:text-3xl";
}

function getCellColorGradient(color: string, index: number): string {
  const c = color.toLowerCase();
  if (c.includes("10b981") || c.includes("059669") || c.includes("34d399") || c.includes("green") || c.includes("emerald")) {
    return "url(#donutEmeraldGradient)";
  }
  if (c.includes("f59e0b") || c.includes("fbbf24") || c.includes("d97706") || c.includes("orange") || c.includes("amber") || c.includes("yellow")) {
    return "url(#donutAmberGradient)";
  }
  if (c.includes("0ea5e9") || c.includes("38bdf8") || c.includes("0284c7") || c.includes("blue") || c.includes("sky")) {
    return "url(#donutSkyGradient)";
  }
  if (c.includes("ef4444") || c.includes("fb7185") || c.includes("e11d48") || c.includes("rose") || c.includes("red")) {
    return "url(#donutRoseGradient)";
  }
  return index % 2 === 0 ? "url(#donutEmeraldGradient)" : "url(#donutAmberGradient)";
}

function getOrbStyle(color: string, index: number): string {
  const c = color.toLowerCase();
  if (c.includes("10b981") || c.includes("059669") || c.includes("34d399") || c.includes("green") || c.includes("emerald")) {
    return "bg-gradient-to-br from-emerald-950 via-emerald-600 to-emerald-400 shadow-[inset_-1.5px_-1.5px_3px_rgba(0,0,0,0.9),inset_1.5px_1.5px_3px_rgba(255,255,255,0.7),0_0_12px_rgba(5,150,105,0.8)]";
  }
  if (c.includes("f59e0b") || c.includes("fbbf24") || c.includes("d97706") || c.includes("orange") || c.includes("amber") || c.includes("yellow")) {
    return "bg-gradient-to-br from-amber-950 via-amber-600 to-amber-400 shadow-[inset_-1.5px_-1.5px_3px_rgba(0,0,0,0.9),inset_1.5px_1.5px_3px_rgba(255,255,255,0.7),0_0_12px_rgba(217,119,6,0.8)]";
  }
  if (c.includes("0ea5e9") || c.includes("38bdf8") || c.includes("0284c7") || c.includes("blue") || c.includes("sky")) {
    return "bg-gradient-to-br from-sky-950 via-sky-600 to-sky-400 shadow-[inset_-1.5px_-1.5px_3px_rgba(0,0,0,0.9),inset_1.5px_1.5px_3px_rgba(255,255,255,0.7),0_0_12px_rgba(14,165,233,0.8)]";
  }
  if (c.includes("ef4444") || c.includes("fb7185") || c.includes("e11d48") || c.includes("rose") || c.includes("red")) {
    return "bg-gradient-to-br from-rose-950 via-rose-600 to-rose-400 shadow-[inset_-1.5px_-1.5px_3px_rgba(0,0,0,0.9),inset_1.5px_1.5px_3px_rgba(255,255,255,0.7),0_0_12px_rgba(225,29,72,0.8)]";
  }
  return index % 2 === 0
    ? "bg-gradient-to-br from-emerald-950 via-emerald-600 to-emerald-400 shadow-[inset_-1.5px_-1.5px_3px_rgba(0,0,0,0.9),inset_1.5px_1.5px_3px_rgba(255,255,255,0.7),0_0_12px_rgba(5,150,105,0.8)]"
    : "bg-gradient-to-br from-amber-950 via-amber-600 to-amber-400 shadow-[inset_-1.5px_-1.5px_3px_rgba(0,0,0,0.9),inset_1.5px_1.5px_3px_rgba(255,255,255,0.7),0_0_12px_rgba(217,119,6,0.8)]";
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
  const chartHeight = variant === "productivity" ? 180 : Math.min(height, 180);
  const valueFontSize =
    centerValue !== undefined ? getCenterValueFontSize(centerValue) : "text-2xl";

  return (
    <div className="mx-auto flex w-full min-w-[210px] max-w-[250px] flex-col items-center">
      {/* SVG Gradient Defs for 3D Arc Tubes */}
      <svg className="absolute h-0 w-0 pointer-events-none">
        <defs>
          <linearGradient id="donutEmeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#022C22" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="donutAmberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#451A03" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="donutSkyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#082F49" />
            <stop offset="50%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
          <linearGradient id="donutRoseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4C0519" />
            <stop offset="50%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#FB7185" />
          </linearGradient>
        </defs>
      </svg>

      {/* 3D Outer Beveled Ring Container */}
      <div className="relative flex h-[180px] w-[180px] items-center justify-center p-1">
        {/* Image 2 Orbital Swoosh Speed Arcs */}
        <svg className="pointer-events-none absolute -inset-2.5 h-[200px] w-[200px]" viewBox="0 0 200 200">
          {/* Top-Right Concentric Swoosh Arcs */}
          <path d="M 130 22 A 80 80 0 0 1 180 80" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.8" />
          <path d="M 138 14 A 88 88 0 0 1 188 72" fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.55" />
          <path d="M 146 6 A 96 96 0 0 1 196 64" fill="none" stroke="#022C22" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.4" />

          {/* Bottom-Left Concentric Swoosh Arcs */}
          <path d="M 70 178 A 80 80 0 0 1 20 120" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.8" />
          <path d="M 62 186 A 88 88 0 0 1 12 128" fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.55" />
          <path d="M 54 194 A 96 96 0 0 1 4 136" fill="none" stroke="#022C22" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.4" />
        </svg>

        {/* Outer 3D Bevel & Ambient Neon Glow Circle */}
        <div className="pointer-events-none absolute inset-0 rounded-full border border-emerald-500/30 bg-slate-950/90 shadow-[inset_0_4px_10px_rgba(255,255,255,0.12),0_10px_28px_rgba(0,0,0,0.8),0_0_20px_rgba(5,150,105,0.3)]" />

        {/* Inner HUD Circular Tech Dash Ring */}
        <div className="pointer-events-none absolute inset-[15%] rounded-full border border-dashed border-emerald-400/25" />

        {/* Recharts Donut Pie */}
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={76}
              paddingAngle={5}
              stroke="rgba(0, 0, 0, 0.4)"
              strokeWidth={3}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getCellColorGradient(entry.color, index)}
                  className="transition-all duration-300 hover:opacity-90"
                  style={{
                    filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.5))",
                  }}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                borderColor: "rgba(255, 255, 255, 0.15)",
                borderRadius: "12px",
                color: "#fff",
                boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
                padding: "8px 12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Display with Icon & Value */}
        {centerValue !== undefined && (
          <div className="pointer-events-none absolute left-1/2 top-[calc(50%-8px)] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center">
            <Rocket className="mb-0.5 h-3.5 w-3.5 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
            <span
              className={cn(
                "font-extrabold tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]",
                valueFontSize,
                isDark ? "text-white" : "text-slate-900"
              )}
            >
              {centerValue}
            </span>
          </div>
        )}

        {/* Center Label Pill Badge */}
        {centerLabel && (
          <div className="pointer-events-none absolute left-1/2 top-[calc(50%+20px)] -translate-x-1/2 rounded-lg border border-white/20 bg-slate-900/95 px-2.5 py-0.5 text-center shadow-[0_4px_12px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.2)]">
            <span className="block text-[9px] font-bold uppercase tracking-wider text-white/80">
              {centerLabel}
            </span>
          </div>
        )}
      </div>

      {/* Futuristic 3D Glassmorphism Legend HUD Card */}
      {showLegend && (
        <div className="mt-3.5 flex w-full flex-col gap-2 rounded-xl border border-white/15 bg-slate-950/90 p-3 shadow-[0_8px_24px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.12)]">
          {data.map((entry, index) => (
            <div key={entry.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {/* 3D Glowing Sphere/Orb */}
                <span
                  className={cn(
                    "h-3.5 w-3.5 shrink-0 rounded-full",
                    getOrbStyle(entry.color, index)
                  )}
                />
                <span
                  className={cn(
                    "text-xs font-semibold tracking-wide",
                    isDark ? "text-white/90" : "text-slate-700"
                  )}
                >
                  {entry.name}
                </span>
              </div>
              <span className="text-xs font-bold text-white/60">
                ({entry.value}%)
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
