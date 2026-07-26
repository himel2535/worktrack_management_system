import { DonutChart } from "@/components/charts/DonutChart";
import { PerformanceGraph } from "@/components/dashboard/PerformanceGraph";
import { productivityData } from "@/lib/mock-data/timeline";
import { todaySummary } from "@/lib/mock-data/work-session";
import { cn } from "@/lib/utils";

const summaryRows = [
  { label: "Office Time", value: todaySummary.officeTimeRange },
  { label: "Total Office Time", value: todaySummary.totalOfficeTime },
  {
    label: "Active Work Time",
    value: todaySummary.activeWorkTime,
    highlight: true,
  },
  { label: "Total Break Time", value: todaySummary.totalBreakTime },
  { label: "Break Count", value: todaySummary.breakCount },
  { label: "Projects Worked", value: todaySummary.projectsWorked },
  { label: "Tasks Completed", value: todaySummary.tasksCompleted },
];

interface TodaySummaryProps {
  theme?: "light" | "glass";
}

export function TodaySummary({ theme = "glass" }: TodaySummaryProps) {
  const isGlass = theme === "glass";

  return (
    <div className={cn("panel-card", isGlass && "p-1")}>
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
            data={productivityData}
            centerValue={`${todaySummary.productiveTime}%`}
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
