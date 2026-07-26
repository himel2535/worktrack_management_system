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
}

export function LineChart({ data, lines, height = 200 }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#64748B" }} />
        <YAxis tick={{ fontSize: 12, fill: "#64748B" }} />
        <Tooltip />
        <Legend iconType="circle" iconSize={8} />
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
