"use client";

import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { dashboardOfficePointsData } from "@/lib/mock-data/performance";

export function PerformanceGraph() {
  return (
    <div className="mt-4 border-t border-white/10 pt-4">
      <div className="mb-2">
        <h4 className="text-sm font-bold text-white">Performance graph</h4>
        <p className="text-xs text-white/45">
          Office Points vs Historical Benchmarks
        </p>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <RechartsAreaChart
          data={dashboardOfficePointsData}
          margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="officeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22C55E" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#818CF8" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#818CF8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: "rgba(255,255,255,0.45)" }}
          />
          <YAxis tick={{ fontSize: 11, fill: "rgba(255,255,255,0.45)" }} />
          <Tooltip
            cursor={{ stroke: "rgba(255,255,255,0.2)", strokeWidth: 1, strokeDasharray: "4 4" }}
            contentStyle={{
              backgroundColor: "rgba(15,23,42,0.95)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8,
              color: "#fff",
            }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span className="text-xs text-white/60">{value}</span>
            )}
          />
          <Area
            type="monotone"
            dataKey="officePoints"
            stroke="#22C55E"
            strokeWidth={2}
            fill="url(#officeGradient)"
            name="Office Points"
          />
          <Area
            type="monotone"
            dataKey="benchmark"
            stroke="#818CF8"
            strokeWidth={2}
            fill="url(#benchmarkGradient)"
            name="Benchmark"
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
