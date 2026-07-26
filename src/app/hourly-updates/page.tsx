"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { PointsIndicator } from "@/components/shared/PointsIndicator";
import { GuidelinesCard } from "@/components/shared/GuidelinesCard";
import { DonutChart } from "@/components/charts/DonutChart";
import { LineChart } from "@/components/charts/LineChart";
import { Button } from "@/components/ui/button";
import { useWorkTrack } from "@/context/WorkTrackContext";
import {
  dailyProgressData,
  updateGuidelines,
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
  Plus,
} from "lucide-react";

export default function HourlyUpdatesPage() {
  const { hourlyUpdates, todayPoints, openHourlyUpdateModal } = useWorkTrack();

  const submittedCount = hourlyUpdates.length;
  const expectedCount = 6;
  const missedCount = 0;
  const upcomingCount = Math.max(0, expectedCount - submittedCount);

  const todayScoreData = [
    { name: "Earned", value: todayPoints, color: "#10B981" },
    { name: "Target", value: Math.max(0, 18 - todayPoints), color: "#3B82F6" },
  ];

  return (
    <div className="page-stack">
      <PageHeader
        title="Hourly Updates"
        subtitle="Track your hourly progress and updates."
        actionLabel="Submit Update"
        onActionClick={() => openHourlyUpdateModal()}
        showClock
      />

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
        <StatCard variant="glass" label="Expected Updates" value={expectedCount} icon={ClipboardList} iconBg="bg-white/5" iconColor="text-white/60" />
        <StatCard variant="glass" label="Submitted" value={submittedCount} subLabel="On Time" icon={CheckCircle2} iconBg="bg-emerald-50" iconColor="text-emerald-600" />
        <StatCard variant="glass" label="Missed" value={missedCount} subLabel="Missed" icon={XCircle} iconBg="bg-red-50" iconColor="text-red-600" />
        <StatCard variant="glass" label="Upcoming" value={upcomingCount} subLabel="Due Today" icon={Clock} iconBg="bg-blue-50" iconColor="text-blue-600" />
        <StatCard variant="glass" label="Net Points" value={`+${todayPoints}`} subLabel="Today" icon={Star} iconBg="bg-yellow-50" iconColor="text-yellow-600" valueColor="text-emerald-400" />
      </div>

      <div className="page-grid lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="panel-card border border-white/10 bg-[#0F172A]">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="panel-title mb-0 text-emerald-400">Today&apos;s Hourly Updates</h3>
              <Button
                onClick={openHourlyUpdateModal}
                className="bg-emerald-950/90 text-emerald-300 border border-emerald-800/70 hover:bg-emerald-900 hover:border-emerald-700 shadow-[inset_0_-2px_0_0_#059669] font-semibold text-xs gap-1.5 h-8 rounded-lg"
              >
                <Plus className="h-3.5 w-3.5" />
                Submit Update (+3 Pts)
              </Button>
            </div>

            <div className="relative space-y-3">
              {hourlyUpdates.length === 0 ? (
                <div className="py-8 text-center text-white/40">
                  No hourly updates submitted today yet. Click &quot;Submit Update&quot; above!
                </div>
              ) : (
                hourlyUpdates.map((update, index) => {
                  const Icon = update.status === "missed" ? AlertCircle : update.status === "upcoming" ? Clock : FileText;
                  const iconColor =
                    update.status === "missed"
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : update.status === "upcoming"
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";

                  return (
                    <div key={update.id} className="relative flex gap-3 pb-3 last:pb-0">
                      {index < hourlyUpdates.length - 1 && (
                        <div className="absolute left-[18px] top-10 h-full w-px bg-white/15" />
                      )}
                      <div className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconColor}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 rounded-xl border border-white/10 bg-white/5 p-3.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold text-white">{update.time}</span>
                          <StatusBadge status={update.status} />
                          <PointsIndicator points={update.points} />
                        </div>
                        <p className="mt-1 font-bold text-white text-base">{update.title}</p>
                        <p className="mt-1 text-xs text-white/60 leading-relaxed">{update.description}</p>
                        {update.attachments && update.attachments.length > 0 && (
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
                })
              )}
            </div>
          </div>
        </div>

        <div className="page-col-stack lg:col-span-4">
          <div className="panel-card border border-white/10 bg-[#0F172A]">
            <h3 className="panel-title text-emerald-400">Today&apos;s Score</h3>
            <DonutChart
              data={todayScoreData}
              centerValue={`+${todayPoints}`}
              centerLabel="Net Points"
              height={180}
            />
          </div>

          <div className="panel-card border border-white/10 bg-[#0F172A]">
            <h3 className="panel-title text-emerald-400">Daily Progress</h3>
            <LineChart
              data={dailyProgressData}
              lines={[{ key: "points", color: "#10B981", name: "Points" }]}
              height={160}
            />
          </div>

          <GuidelinesCard
            title="Update Guidelines"
            items={updateGuidelines}
          />
        </div>
      </div>
    </div>
  );
}
