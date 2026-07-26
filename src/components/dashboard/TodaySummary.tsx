"use client";

import { DonutChart } from "@/components/charts/DonutChart";
import { PerformanceGraph } from "@/components/dashboard/PerformanceGraph";
import { useWorkTrack } from "@/context/WorkTrackContext";
import { cn } from "@/lib/utils";

function formatHMS(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

interface TodaySummaryProps {
  theme?: "light" | "glass";
}

export function TodaySummary({ theme = "glass" }: TodaySummaryProps) {
  const isGlass = theme === "glass";
  const { activeWorkSeconds, activeBreakSeconds, breaks, tasks, projects } = useWorkTrack();

  const totalBreakSecs = breaks.reduce((acc, b) => {
    const parts = b.duration.split(":").map(Number);
    if (parts.length === 3) return acc + parts[0] * 3600 + parts[1] * 60 + parts[2];
    return acc;
  }, 0) + activeBreakSeconds;

  const totalOfficeSecs = activeWorkSeconds + totalBreakSecs;
  const workPercent = totalOfficeSecs > 0 ? Math.round((activeWorkSeconds / totalOfficeSecs) * 100) : 100;

  const summaryRows = [
    { label: "Office Time", value: "09:00 AM - Present" },
    { label: "Total Office Time", value: formatHMS(totalOfficeSecs) },
    { label: "Active Work Time", value: formatHMS(activeWorkSeconds), highlight: true },
    { label: "Total Break Time", value: formatHMS(totalBreakSecs) },
    { label: "Break Count", value: breaks.length },
    { label: "Projects Worked", value: projects.length },
    { label: "Tasks Completed", value: tasks.filter((t) => t.status === "completed").length },
  ];

  const productivityChartData = [
    { name: "Active Work Time", value: Math.max(1, activeWorkSeconds), color: "#10B981" },
    { name: "Break Time", value: Math.max(0, totalBreakSecs), color: "#F59E0B" },
  ];

  return (
    <div className="panel-card">
      <h3 className={cn(isGlass ? "panel-title-glass" : "panel-title")}>
        Today&apos;s Summary
      </h3>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="space-y-1">
          {summaryRows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between py-0.5 text-sm"
            >
              <span className={isGlass ? "text-white/50" : "text-slate-500"}>
                {row.label}
              </span>
              <span
                className={cn(
                  row.highlight
                    ? isGlass
                      ? "font-semibold text-emerald-400"
                      : "font-semibold text-emerald-600"
                    : isGlass
                      ? "font-medium text-white"
                      : "font-medium text-slate-800"
                )}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
        <div className="flex w-full min-w-[200px] items-center justify-center">
          <DonutChart
            variant="productivity"
            theme={isGlass ? "dark" : "light"}
            data={productivityChartData}
            centerValue={`${workPercent}%`}
            centerLabel="Productive Time"
            showLegend
            height={210}
          />
        </div>
      </div>
      {isGlass && <PerformanceGraph />}
    </div>
  );
}
