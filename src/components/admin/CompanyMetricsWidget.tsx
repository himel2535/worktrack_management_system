"use client";

import { DonutChart } from "@/components/charts/DonutChart";
import { AdminPanel } from "./AdminPanel";

interface CompanyMetricsWidgetProps {
  working: number;
  onBreak: number;
  absent: number;
  notStarted: number;
  totalEmployees: number;
  attendancePercent: number;
  punctuality: number;
}

export function CompanyMetricsWidget({
  working,
  onBreak,
  absent,
  notStarted,
  totalEmployees,
  attendancePercent,
  punctuality,
}: CompanyMetricsWidgetProps) {
  const checkedIn = Math.max(0, totalEmployees - absent);
  const chartData = [
    { name: "Working", value: Math.max(working, 0), color: "#10B981" },
    { name: "On Break", value: Math.max(onBreak, 0), color: "#F59E0B" },
    { name: "Checked In", value: Math.max(checkedIn - working - onBreak, 0), color: "#0EA5E9" },
    { name: "Absent", value: Math.max(absent, 0), color: "#F43F5E" },
    { name: "Not Started", value: Math.max(notStarted, 0), color: "#64748B" },
  ].filter((d) => d.value > 0);

  const summaryRows = [
    { label: "Total Employees", value: String(totalEmployees) },
    { label: "Checked In Today", value: String(checkedIn) },
    { label: "Attendance Rate", value: `${attendancePercent}%`, highlight: true },
    { label: "Punctuality", value: `${punctuality}%`, highlight: true },
    { label: "Working Now", value: String(working) },
    { label: "On Break", value: String(onBreak) },
  ];

  return (
    <AdminPanel title="Company Overview">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          {summaryRows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between border-b border-white/5 py-2 last:border-0"
            >
              <span className="text-sm text-white/60">{row.label}</span>
              <span className={row.highlight ? "text-sm font-semibold text-emerald-400" : "text-sm font-medium text-white"}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
        <DonutChart
          variant="productivity"
          theme="dark"
          data={chartData.length > 0 ? chartData : [{ name: "No Data", value: 1, color: "#64748B" }]}
          centerValue={`${attendancePercent}%`}
          centerLabel="Attendance"
          showLegend
          height={210}
        />
      </div>
    </AdminPanel>
  );
}
