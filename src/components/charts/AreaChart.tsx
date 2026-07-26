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
}

export function AreaChart({
  data,
  height = 180,
  color = "#10B981",
}: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsAreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey="period" tick={{ fontSize: 11, fill: "#64748B" }} />
        <YAxis tick={{ fontSize: 11, fill: "#64748B" }} unit="h" />
        <Tooltip formatter={(value) => [`${value}h`, "Break Time"]} />
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
