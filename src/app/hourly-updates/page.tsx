import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { PointsIndicator } from "@/components/shared/PointsIndicator";
import { GuidelinesCard } from "@/components/shared/GuidelinesCard";
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
  hourlyUpdates,
  hourlyUpdateStats,
  dailyProgressData,
  updateGuidelines,
  todayScoreData,
} from "@/lib/mock-data/hourly-updates";
import {
  ClipboardList,
  CheckCircle2,
  XCircle,
  Clock,
  Star,
  FileText,
  AlertCircle,
  Paperclip,
  ChevronRight,
} from "lucide-react";

export default function HourlyUpdatesPage() {
  return (
    <>
      <PageHeader
        title="Hourly Updates"
        subtitle="Track your hourly progress and updates."
        showClock
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Expected Updates" value={hourlyUpdateStats.expected} icon={ClipboardList} iconBg="bg-slate-50" iconColor="text-slate-600" />
        <StatCard label="Submitted" value={hourlyUpdateStats.submitted} subLabel="On Time" icon={CheckCircle2} iconBg="bg-emerald-50" iconColor="text-emerald-600" />
        <StatCard label="Missed" value={hourlyUpdateStats.missed} subLabel="Missed" icon={XCircle} iconBg="bg-red-50" iconColor="text-red-600" />
        <StatCard label="Upcoming" value={hourlyUpdateStats.upcoming} subLabel="Due Today" icon={Clock} iconBg="bg-blue-50" iconColor="text-blue-600" />
        <StatCard label="Net Points" value={`+${hourlyUpdateStats.netPoints}`} subLabel="Today" icon={Star} iconBg="bg-yellow-50" iconColor="text-yellow-600" valueColor="text-emerald-600" />
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">Today&apos;s Hourly Updates</h3>
              <Select defaultValue="all">
                <SelectTrigger className="w-[130px]"><SelectValue placeholder="All Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="on_time">On Time</SelectItem>
                  <SelectItem value="missed">Missed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative space-y-0">
              {hourlyUpdates.map((update, index) => {
                const Icon = update.status === "missed" ? AlertCircle : update.status === "upcoming" ? Clock : FileText;
                const iconColor =
                  update.status === "missed" ? "bg-red-50 text-red-600"
                  : update.status === "upcoming" ? "bg-blue-50 text-blue-600"
                  : "bg-emerald-50 text-emerald-600";

                return (
                  <div key={update.id} className="relative flex gap-4 pb-8 last:pb-0">
                    {index < hourlyUpdates.length - 1 && (
                      <div className="absolute left-[18px] top-10 h-full w-px bg-slate-200" />
                    )}
                    <div className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconColor}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 rounded-lg border border-slate-50 p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-slate-800">{update.time}</span>
                        {update.dueTime && update.status !== "upcoming" && (
                          <span className="text-xs text-slate-400">Due: {update.dueTime}</span>
                        )}
                        <StatusBadge status={update.status} />
                        <PointsIndicator points={update.points} />
                      </div>
                      <p className="mt-1 font-medium text-slate-700">{update.title}</p>
                      <p className="mt-1 text-sm text-slate-500">{update.description}</p>
                      {update.attachments && (
                        <div className="mt-2 flex gap-2">
                          {update.attachments.map((file) => (
                            <span key={file} className="flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">
                              <Paperclip className="h-3 w-3" />
                              {file}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 text-center">
              <Button variant="outline" className="gap-2">
                View Tomorrow&apos;s Schedule
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-4">
          <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 font-semibold text-slate-800">Today&apos;s Score</h3>
            <DonutChart
              data={todayScoreData}
              centerValue={`+${hourlyUpdateStats.netPoints}`}
              centerLabel="Net Points"
              height={160}
            />
            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-lg font-bold text-slate-800">{hourlyUpdateStats.completionRate}%</p>
                <p className="text-xs text-slate-500">Completion Rate</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-lg font-bold text-slate-800">{hourlyUpdateStats.onTimeRate}%</p>
                <p className="text-xs text-slate-500">On Time Rate</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 font-semibold text-slate-800">Daily Progress</h3>
            <LineChart
              data={dailyProgressData}
              lines={[{ key: "points", color: "#10B981", name: "Points" }]}
              height={160}
            />
          </div>

          <GuidelinesCard
            title="Update Guidelines"
            items={updateGuidelines}
            footer={
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Need Help?</span>
                <Button variant="outline" size="sm">View Help Center</Button>
              </div>
            }
          />
        </div>
      </div>
    </>
  );
}
