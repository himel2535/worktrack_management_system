import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { PointsIndicator } from "@/components/shared/PointsIndicator";
import { GaugeChart } from "@/components/charts/GaugeChart";
import { DonutChart } from "@/components/charts/DonutChart";
import { LineChart } from "@/components/charts/LineChart";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  performanceStats,
  performanceCategories,
  scoreBreakdownData,
  performanceTrendData,
  pointHistory,
  weeklyOverview,
} from "@/lib/mock-data/performance";
import { weekPoints, monthPoints, allTimePoints } from "@/lib/mock-data/user";
import {
  Shield,
  Briefcase,
  Zap,
  Star,
  TrendingUp,
  Timer,
  Coffee,
  CheckSquare,
  ClipboardList,
  ChevronRight,
} from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  Discipline: Shield,
  "Work Performance": Briefcase,
  Productivity: Zap,
  "Timely Updates": Star,
};

export default function PerformancePage() {
  return (
    <>
      <PageHeader
        title="My Performance"
        subtitle="Track your performance and improve every day."
        showClock={false}
        dateLabel="20 July – 26 July 2026"
      />

      <div className="mb-6 grid gap-4 lg:grid-cols-12">
        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm lg:col-span-3">
          <h3 className="mb-2 text-sm font-medium text-slate-500">Overall Performance Score</h3>
          <div className="flex flex-col items-center">
            <GaugeChart score={performanceStats.overallScore} />
            <p className="mt-2 text-lg font-semibold text-slate-800">{performanceStats.overallStatus}</p>
            <p className="text-xs text-slate-500">Keep up the great work!</p>
            <div className="mt-2 flex items-center gap-1 text-sm text-emerald-600">
              <TrendingUp className="h-4 w-4" />
              {performanceStats.trend}
            </div>
          </div>
        </div>

        {performanceCategories.slice(0, 3).map((cat) => {
          const Icon = categoryIcons[cat.name] || Shield;
          return (
            <div key={cat.id} className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm lg:col-span-3">
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-full p-2" style={{ backgroundColor: `${cat.color}20` }}>
                  <Icon className="h-4 w-4" style={{ color: cat.color }} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">{cat.name}</p>
                  <p className="text-xl font-bold text-slate-800">{cat.score}/100</p>
                </div>
              </div>
              <p className="mb-2 text-xs font-medium" style={{ color: cat.color }}>{cat.status}</p>
              <ProgressBar value={cat.score} barClassName="" />
              <p className="mt-2 text-xs text-slate-500">{cat.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mb-6 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
        <h3 className="mb-4 font-semibold text-slate-800">Total Points</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-emerald-600">+{weekPoints}</p>
            <p className="text-sm text-slate-500">This Week</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-600">+{monthPoints}</p>
            <p className="text-sm text-slate-500">This Month</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-600">+{allTimePoints}</p>
            <p className="text-sm text-slate-500">All Time</p>
          </div>
        </div>
      </div>

      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Performance Trend</h3>
            <Select defaultValue="week">
              <SelectTrigger className="w-[130px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <LineChart
            data={performanceTrendData}
            lines={[
              { key: "overall", color: "#10B981", name: "Overall Score" },
              { key: "discipline", color: "#3B82F6", name: "Discipline" },
              { key: "workPerformance", color: "#A855F7", name: "Work Performance" },
            ]}
            height={220}
          />
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <h3 className="mb-4 font-semibold text-slate-800">Score Breakdown</h3>
          <DonutChart
            data={scoreBreakdownData.map((d) => ({ name: d.name, value: d.value, color: d.color }))}
            centerValue={performanceStats.overallScore}
            centerLabel="Overall"
            height={220}
          />
          <div className="mt-2 space-y-2">
            {scoreBreakdownData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600">{item.name} ({item.value}%)</span>
                </div>
                <span className="font-medium text-slate-800">{item.score}/100</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <h3 className="mb-4 font-semibold text-slate-800">Performance by Category</h3>
          <div className="space-y-4">
            {performanceCategories.map((cat) => {
              const Icon = categoryIcons[cat.name] || Shield;
              return (
                <div key={cat.id}>
                  <div className="mb-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" style={{ color: cat.color }} />
                      <span className="text-sm font-medium text-slate-800">{cat.name}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-800">{cat.score}/100</span>
                  </div>
                  <ProgressBar value={cat.score} />
                  <p className="mt-1 text-xs text-slate-500">{cat.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Points History</h3>
            <button className="text-xs text-emerald-600 hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {pointHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b border-slate-50 pb-3 last:border-0">
                <div>
                  <p className="text-sm text-slate-800">{item.description}</p>
                  <p className="text-xs text-slate-400">{item.time}</p>
                </div>
                <PointsIndicator points={item.points} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <h3 className="mb-4 font-semibold text-slate-800">Weekly Overview</h3>
          <div className="space-y-3">
            {[
              { icon: Timer, label: "Total Work Time", value: weeklyOverview.totalWorkTime },
              { icon: Zap, label: "Active Work Time", value: weeklyOverview.activeWorkTime },
              { icon: Coffee, label: "Break Time", value: weeklyOverview.breakTime },
              { icon: CheckSquare, label: "Tasks Completed", value: weeklyOverview.tasksCompleted },
              { icon: ClipboardList, label: "Hourly Updates", value: `${weeklyOverview.hourlyUpdates.completed} / ${weeklyOverview.hourlyUpdates.total}` },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 text-sm">
                <item.icon className="h-4 w-4 text-slate-400" />
                <span className="text-slate-500">{item.label}</span>
                <span className="ml-auto font-semibold text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-4 w-full gap-2">
            View Detailed Report
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
