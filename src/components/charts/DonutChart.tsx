"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface DonutChartProps {
  data: { name: string; value: number; color: string }[];
  centerLabel?: string;
  centerValue?: string | number;
  showLegend?: boolean;
  legendPosition?: "right" | "bottom";
  height?: number;
}

export function DonutChart({
  data,
  centerLabel,
  centerValue,
  showLegend = true,
  legendPosition = "right",
  height = 200,
}: DonutChartProps) {
  const isBottomLegend = legendPosition === "bottom";

  return (
    <div className="relative" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx={isBottomLegend ? "50%" : "40%"}
            cy={isBottomLegend ? "45%" : "50%"}
            innerRadius={isBottomLegend ? "55%" : "60%"}
            outerRadius={isBottomLegend ? "75%" : "80%"}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          {showLegend && (
            <Legend
              verticalAlign={isBottomLegend ? "bottom" : "middle"}
              align={isBottomLegend ? "center" : "right"}
              layout={isBottomLegend ? "horizontal" : "vertical"}
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-xs text-slate-600">{value}</span>
              )}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
      {(centerLabel || centerValue) && (
        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
          style={isBottomLegend ? { paddingBottom: 24 } : undefined}
        >
          {centerValue && (
            <span className="text-2xl font-bold text-slate-800">
              {centerValue}
            </span>
          )}
          {centerLabel && (
            <span className="text-xs text-slate-500">{centerLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
