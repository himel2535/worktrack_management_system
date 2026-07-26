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
    <>
      <PageHeader
        title="Breaks"
        subtitle="Track your breaks and stay balance."
        showClock
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Total Break Time" value={breakStats.totalBreakTime} icon={Timer} iconBg="bg-emerald-50" iconColor="text-emerald-600" />
        <StatCard label="Break Count" value={breakStats.breakCount} icon={Hash} iconBg="bg-blue-50" iconColor="text-blue-600" />
        <StatCard label="Longest Break" value={breakStats.longestBreak} icon={TrendingUp} iconBg="bg-orange-50" iconColor="text-orange-600" />
        <StatCard label="Average Break" value={breakStats.averageBreak} icon={BarChart3} iconBg="bg-purple-50" iconColor="text-purple-600" />
        <StatCard label="Break Time %" value={`${breakStats.breakTimePercent}%`} subLabel="Of total office time" icon={Percent} iconBg="bg-red-50" iconColor="text-red-600" />
      </div>

      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">ON BREAK</span>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50">
              <Coffee className="h-8 w-8 text-orange-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-800">{currentBreak.label}</h3>
              <span className="mt-1 inline-block rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600 capitalize">
                {currentBreak.type}
              </span>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-slate-500">Start Time</p>
                  <p className="font-medium text-slate-800">{currentBreak.startTime}</p>
                </div>
                <div>
                  <p className="text-slate-500">Elapsed Time</p>
                  <p className="font-bold text-orange-500">{formatTime(elapsed)}</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-500">
                {currentBreak.projectName} — {currentBreak.taskName}
              </p>
            </div>
          </div>
          <Button className="mt-6 w-full bg-[#059669] hover:bg-[#047857]">End Break</Button>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <h3 className="mb-2 font-semibold text-slate-800">Today&apos;s Break Summary</h3>
          <DonutChart
            data={breakSummaryData}
            centerValue={breakStats.totalBreakTime}
            centerLabel="Total Time"
            height={200}
          />
          <p className="mt-2 text-center text-xs text-slate-500">Break allowed: No Limit</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="rounded-xl border border-slate-100 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h3 className="font-semibold text-slate-800">Today&apos;s Breaks</h3>
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
                    <TableRow key={record.id} className={record.ongoing ? "bg-emerald-50/30" : ""}>
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
                          <Icon className="h-4 w-4 text-slate-400" />
                          <span className="text-sm capitalize">{breakTypeLabels[record.type]}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-medium">{record.duration}</TableCell>
                      <TableCell className="text-sm text-slate-500">
                        {record.projectName ? `${record.projectName} / ${record.taskName}` : "—"}
                      </TableCell>
                      <TableCell className="text-sm text-slate-500">{record.reason || "—"}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <div className="border-t border-slate-100 px-5 py-3 text-sm">
              <span className="text-slate-500">Total Break Time: </span>
              <span className="font-semibold text-emerald-600">{breakStats.totalBreakTime}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-4">
          <GuidelinesCard title="Break Guidelines" items={breakGuidelines} />

          <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 font-semibold text-slate-800">Monthly Break Overview</h3>
            <AreaChart data={monthlyBreakData} />
            <button className="mt-3 flex items-center gap-1 text-sm text-emerald-600 hover:underline">
              View Full Report
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
