"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { GuidelinesCard } from "@/components/shared/GuidelinesCard";
import { DonutChart } from "@/components/charts/DonutChart";
import { AreaChart } from "@/components/charts/AreaChart";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  breakRecords,
  breakStats,
  currentBreak,
  breakSummaryData,
  monthlyBreakData,
  breakGuidelines,
} from "@/lib/mock-data/breaks";
import { breakTypeLabels } from "@/lib/format";
import {
  Timer,
  Hash,
  TrendingUp,
  BarChart3,
  Percent,
  Coffee,
  Utensils,
  Heart,
  ChevronRight,
} from "lucide-react";

const breakTypeIcons: Record<string, React.ElementType> = {
  personal: Coffee,
  lunch: Utensils,
  prayer: Heart,
  other: Coffee,
};

function parseTime(time: string): number {
  const parts = time.split(":").map(Number);
  return parts[0] * 3600 + parts[1] * 60 + parts[2];
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

export default function BreaksPage() {
  const [elapsed, setElapsed] = useState(parseTime(currentBreak.elapsed));

  useEffect(() => {
    const interval = setInterval(() => setElapsed((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-stack">
      <PageHeader
        title="Breaks"
        subtitle="Track your breaks and stay balance."
        showClock
      />

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
        <StatCard label="Total Break Time" value={breakStats.totalBreakTime} icon={Timer} iconBg="bg-emerald-50" iconColor="text-emerald-600" />
        <StatCard label="Break Count" value={breakStats.breakCount} icon={Hash} iconBg="bg-blue-50" iconColor="text-blue-600" />
        <StatCard label="Longest Break" value={breakStats.longestBreak} icon={TrendingUp} iconBg="bg-orange-50" iconColor="text-orange-600" />
        <StatCard label="Average Break" value={breakStats.averageBreak} icon={BarChart3} iconBg="bg-purple-50" iconColor="text-purple-600" />
        <StatCard label="Break Time %" value={`${breakStats.breakTimePercent}%`} subLabel="Of total office time" icon={Percent} iconBg="bg-red-50" iconColor="text-red-600" />
      </div>

      <div className="page-grid lg:grid-cols-2">
        <div className="panel-card">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full border border-amber-500/30 bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-400">ON BREAK</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/20">
              <Coffee className="h-6 w-6 text-amber-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-white">{currentBreak.label}</h3>
              <span className="mt-0.5 inline-block rounded-md border border-emerald-500/30 bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400 capitalize">
                {currentBreak.type}
              </span>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-white/50">Start Time</p>
                  <p className="font-medium text-white">{currentBreak.startTime}</p>
                </div>
                <div>
                  <p className="text-white/50">Elapsed Time</p>
                  <p className="font-bold text-orange-500">{formatTime(elapsed)}</p>
                </div>
              </div>
              <p className="mt-1.5 text-sm text-white/50">
                {currentBreak.projectName} — {currentBreak.taskName}
              </p>
            </div>
          </div>
          <Button className="mt-3 w-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-900 hover:border-emerald-700/80 shadow-[inset_0_-2px_0_0_#059669]">End Break</Button>
        </div>

        <div className="panel-card">
          <h3 className="panel-title">Today&apos;s Break Summary</h3>
          <DonutChart
            data={breakSummaryData}
            centerValue={breakStats.totalBreakTime}
            centerLabel="Total Time"
            height={200}
          />
          <p className="mt-1.5 text-center text-xs text-white/50">Break allowed: No Limit</p>
        </div>
      </div>

      <div className="page-grid lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="panel-card">
            <div className="border-b border-white/10 px-3.5 py-2.5">
              <h3 className="text-sm font-semibold text-white">Today&apos;s Breaks</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Project / Task</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {breakRecords.map((record) => {
                  const Icon = breakTypeIcons[record.type] || Coffee;
                  return (
                    <TableRow key={record.id} className={record.ongoing ? "bg-emerald-950/60 border-l-2 border-l-emerald-500" : ""}>
                      <TableCell className="text-sm">{record.startTime}</TableCell>
                      <TableCell className="text-sm">
                        {record.ongoing ? (
                          <span className="font-medium text-emerald-600">(Ongoing)</span>
                        ) : (
                          record.endTime
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-white/40" />
                          <span className="text-sm capitalize">{breakTypeLabels[record.type]}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-medium">{record.duration}</TableCell>
                      <TableCell className="text-sm text-white/50">
                        {record.projectName ? `${record.projectName} / ${record.taskName}` : "—"}
                      </TableCell>
                      <TableCell className="text-sm text-white/50">{record.reason || "—"}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <div className="border-t border-white/10 px-3.5 py-2 text-sm">
              <span className="text-white/50">Total Break Time: </span>
              <span className="font-semibold text-emerald-600">{breakStats.totalBreakTime}</span>
            </div>
          </div>
        </div>

        <div className="page-col-stack lg:col-span-4">
          <GuidelinesCard title="Break Guidelines" items={breakGuidelines} />

          <div className="panel-card">
            <h3 className="panel-title">Monthly Break Overview</h3>
            <AreaChart data={monthlyBreakData} />
            <Button variant="glass" size="sm" className="mt-2 gap-1">
              View Full Report
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
