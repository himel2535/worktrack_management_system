"use client";

import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AreaChartProps {
  data: { period: string; hours: number }[];
  height?: number;
  color?: string;
  theme?: "light" | "dark";
}

export function AreaChart({
  data,
  height = 180,
  color = "#10B981",
  theme = "dark",
}: AreaChartProps) {
  const isDark = theme === "dark";
  const gridStroke = isDark ? "rgba(255,255,255,0.08)" : "#E2E8F0";
  const tickFill = isDark ? "rgba(255,255,255,0.45)" : "#64748B";

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsAreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
        <XAxis dataKey="period" tick={{ fontSize: 11, fill: tickFill }} />
        <YAxis tick={{ fontSize: 11, fill: tickFill }} unit="h" />
        <Tooltip
          cursor={{ stroke: "rgba(255,255,255,0.2)", strokeWidth: 1, strokeDasharray: "4 4" }}
          formatter={(value) => [`${value}h`, "Break Time"]}
          contentStyle={
            isDark
              ? {
                  backgroundColor: "rgba(15,23,42,0.95)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 8,
                  color: "#fff",
                }
              : undefined
          }
        />
        <Area
          type="monotone"
          dataKey="hours"
          stroke={color}
          strokeWidth={2}
          fill="url(#areaGradient)"
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
