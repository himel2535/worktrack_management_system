"use client";

import { DonutChart } from "@/components/charts/DonutChart";
import { AdminPanel } from "@/components/admin/AdminPanel";

interface TeamMetricsWidgetProps {
  members: {
    status: string;
    updatesSubmitted: number;
    updatesExpected: number;
    missedUpdates: number;
    workTime: string;
  }[];
}

export function TeamMetricsWidget({ members }: TeamMetricsWidgetProps) {
  const working = members.filter((m) => m.status === "working").length;
  const onBreak = members.filter((m) => m.status === "on_break").length;
  const checkedIn = members.filter((m) => m.status === "checked_in").length;
  const notStarted = members.filter((m) => m.status === "not_started").length;
  const totalMissed = members.reduce((s, m) => s + m.missedUpdates, 0);
  const onTrack = members.filter((m) => m.missedUpdates === 0).length;
  const trackPercent = members.length ? Math.round((onTrack / members.length) * 100) : 100;

  const chartData = [
    { name: "Working", value: working, color: "#10B981" },
    { name: "On Break", value: onBreak, color: "#F59E0B" },
    { name: "Checked In", value: checkedIn, color: "#0EA5E9" },
    { name: "Not Started", value: notStarted, color: "#64748B" },
  ].filter((d) => d.value > 0);

  const flagged = members.filter((m) => m.missedUpdates > 0).length;

  const summaryRows = [
    { label: "Team Members", value: String(members.length) },
    { label: "Working Now", value: String(working), highlight: true },
    { label: "On Break", value: String(onBreak) },
    { label: "On Track", value: `${onTrack} members` },
    { label: "Total Missed Updates", value: String(totalMissed), highlight: totalMissed > 0 },
    { label: "Flagged Members", value: String(flagged), highlight: flagged > 0 },
  ];

  return (
    <AdminPanel title="Team Overview">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          {summaryRows.map((row) => (
            <div key={row.label} className="flex items-center justify-between border-b border-white/5 py-2 last:border-0">
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
          centerValue={`${trackPercent}%`}
          centerLabel="On Track"
          showLegend
          height={210}
        />
      </div>
    </AdminPanel>
  );
}
