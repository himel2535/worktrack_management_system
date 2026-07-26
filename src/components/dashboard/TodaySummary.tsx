import { DonutChart } from "@/components/charts/DonutChart";
import { productivityData } from "@/lib/mock-data/timeline";
import { todaySummary } from "@/lib/mock-data/work-session";

export function TodaySummary() {
  return (
    <div className="rounded-2xl border border-slate-100/80 bg-white p-5 shadow-sm">
      <h3 className="mb-4 font-semibold text-slate-800">Today&apos;s Summary</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <p className="text-xs text-slate-500">Office Time</p>
            <p className="font-semibold text-slate-800">
              {todaySummary.officeTime}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Active Work Time</p>
            <p className="font-semibold text-emerald-600">
              {todaySummary.activeWorkTime}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Break Count</p>
            <p className="font-semibold text-slate-800">
              {todaySummary.breakCount}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Tasks Completed</p>
            <p className="font-semibold text-slate-800">
              {todaySummary.tasksCompleted}
            </p>
          </div>
        </div>
        <div>
          <DonutChart
            data={productivityData}
            centerValue={`${todaySummary.productiveTime}%`}
            centerLabel="Productive Time"
            showLegend
            legendPosition="bottom"
            height={160}
          />
        </div>
      </div>
    </div>
  );
}
