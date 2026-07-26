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
    <div className="page-stack">
      <PageHeader
        title="Hourly Updates"
        subtitle="Track your hourly progress and updates."
        showClock
      />

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
        <StatCard variant="glass" label="Expected Updates" value={hourlyUpdateStats.expected} icon={ClipboardList} iconBg="bg-white/5" iconColor="text-white/60" />
        <StatCard variant="glass" label="Submitted" value={hourlyUpdateStats.submitted} subLabel="On Time" icon={CheckCircle2} iconBg="bg-emerald-50" iconColor="text-emerald-600" />
        <StatCard variant="glass" label="Missed" value={hourlyUpdateStats.missed} subLabel="Missed" icon={XCircle} iconBg="bg-red-50" iconColor="text-red-600" />
        <StatCard variant="glass" label="Upcoming" value={hourlyUpdateStats.upcoming} subLabel="Due Today" icon={Clock} iconBg="bg-blue-50" iconColor="text-blue-600" />
        <StatCard variant="glass" label="Net Points" value={`+${hourlyUpdateStats.netPoints}`} subLabel="Today" icon={Star} iconBg="bg-yellow-50" iconColor="text-yellow-600" valueColor="text-emerald-600" />
      </div>

      <div className="page-grid lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="panel-card">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="panel-title mb-0">Today&apos;s Hourly Updates</h3>
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
                  <div key={update.id} className="relative flex gap-2 pb-4 last:pb-0">
                    {index < hourlyUpdates.length - 1 && (
                      <div className="absolute left-[18px] top-10 h-full w-px bg-white/15" />
                    )}
                    <div className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconColor}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 rounded-lg border border-white/10 p-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-white">{update.time}</span>
                        {update.dueTime && update.status !== "upcoming" && (
                          <span className="text-xs text-white/40">Due: {update.dueTime}</span>
                        )}
                        <StatusBadge status={update.status} />
                        <PointsIndicator points={update.points} />
                      </div>
                      <p className="mt-1 font-medium text-white/80">{update.title}</p>
                      <p className="mt-1 text-sm text-white/50">{update.description}</p>
                      {update.attachments && (
                        <div className="mt-2 flex gap-2">
                          {update.attachments.map((file) => (
                            <span key={file} className="flex items-center gap-1 rounded bg-white/10 px-2 py-1 text-xs text-white/60">
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

            <div className="mt-3 text-center">
              <Button variant="outline" className="gap-2">
                View Tomorrow&apos;s Schedule
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="page-col-stack lg:col-span-4">
          <div className="panel-card">
            <h3 className="panel-title">Today&apos;s Score</h3>
            <DonutChart
              data={todayScoreData}
              centerValue={`+${hourlyUpdateStats.netPoints}`}
              centerLabel="Net Points"
              height={160}
            />
            <div className="mt-2 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-lg bg-white/5 p-2">
                <p className="text-lg font-bold text-white">{hourlyUpdateStats.completionRate}%</p>
                <p className="text-xs text-white/50">Completion Rate</p>
              </div>
              <div className="rounded-lg bg-white/5 p-2">
                <p className="text-lg font-bold text-white">{hourlyUpdateStats.onTimeRate}%</p>
                <p className="text-xs text-white/50">On Time Rate</p>
              </div>
            </div>
          </div>

          <div className="panel-card">
            <h3 className="panel-title">Daily Progress</h3>
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
                <span className="text-sm text-white/50">Need Help?</span>
                <Button variant="outline" size="sm">View Help Center</Button>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}
