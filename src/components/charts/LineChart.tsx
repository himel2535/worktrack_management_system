"use client";

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface LineChartProps {
  data: Record<string, string | number>[];
  lines: { key: string; color: string; name?: string }[];
  height?: number;
  theme?: "light" | "dark";
}

export function LineChart({
  data,
  lines,
  height = 200,
  theme = "dark",
}: LineChartProps) {
  const isDark = theme === "dark";
  const gridStroke = isDark ? "rgba(255,255,255,0.08)" : "#E2E8F0";
  const tickFill = isDark ? "rgba(255,255,255,0.45)" : "#64748B";

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
        <XAxis dataKey="day" tick={{ fontSize: 12, fill: tickFill }} />
        <YAxis tick={{ fontSize: 12, fill: tickFill }} />
        <Tooltip
          contentStyle={
            isDark
              ? {
                  backgroundColor: "rgba(15,23,42,0.9)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  color: "#fff",
                }
              : undefined
          }
        />
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(value) => (
            <span className={isDark ? "text-xs text-white/60" : "text-xs text-slate-600"}>
              {value}
            </span>
          )}
        />
        {lines.map((line) => (
          <Line
            key={line.key}
            type="monotone"
            dataKey={line.key}
            stroke={line.color}
            strokeWidth={2}
            dot={{ r: 3 }}
            name={line.name || line.key}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
