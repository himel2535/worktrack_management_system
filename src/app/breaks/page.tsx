"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { GuidelinesCard } from "@/components/shared/GuidelinesCard";
import { DonutChart } from "@/components/charts/DonutChart";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useWorkTrack } from "@/context/WorkTrackContext";
import { breakTypeLabels } from "@/lib/format";
import { breakGuidelines } from "@/lib/mock-data/breaks";
import {
  Timer,
  Hash,
  TrendingUp,
  BarChart3,
  Coffee,
  Utensils,
  Heart,
  Plus,
} from "lucide-react";

const breakTypeIcons: Record<string, React.ElementType> = {
  personal: Coffee,
  lunch: Utensils,
  prayer: Heart,
  other: Coffee,
};

function formatHMS(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

export default function BreaksPage() {
  const { breaks, activeBreak, activeBreakSeconds, endBreak, openBreakModal } = useWorkTrack();

  const totalBreakSecs = breaks.reduce((acc, b) => {
    const parts = b.duration.split(":").map(Number);
    if (parts.length === 3) return acc + parts[0] * 3600 + parts[1] * 60 + parts[2];
    return acc;
  }, 0) + (activeBreak ? activeBreakSeconds : 0);

  const totalBreakStr = formatHMS(totalBreakSecs);
  const breakCount = breaks.length + (activeBreak ? 1 : 0);

  const summaryData = [
    { name: "Personal", value: breaks.filter((b) => b.type === "personal").length || 1, color: "#10B981" },
    { name: "Lunch", value: breaks.filter((b) => b.type === "lunch").length || 0, color: "#F59E0B" },
    { name: "Prayer", value: breaks.filter((b) => b.type === "prayer").length || 0, color: "#3B82F6" },
  ];

  return (
    <div className="page-stack">
      <PageHeader
        title="Breaks"
        subtitle="Track your breaks and stay balanced."
        actionLabel="Take a Break"
        onActionClick={() => openBreakModal()}
        showClock
      />

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <StatCard label="Total Break Time" value={totalBreakStr} icon={Timer} iconBg="bg-emerald-50" iconColor="text-emerald-600" />
        <StatCard label="Break Count" value={breakCount} icon={Hash} iconBg="bg-blue-50" iconColor="text-blue-600" />
        <StatCard label="Longest Break" value="00:25:00" icon={TrendingUp} iconBg="bg-orange-50" iconColor="text-orange-600" />
        <StatCard label="Average Break" value="00:15:00" icon={BarChart3} iconBg="bg-purple-50" iconColor="text-purple-600" />
      </div>

      <div className="page-grid lg:grid-cols-2">
        <div className="panel-card border border-white/10 bg-[#0F172A]">
          {activeBreak ? (
            <>
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full border border-amber-500/30 bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 animate-pulse">
                  BREAK IN PROGRESS
                </span>
                <span className="text-xs text-white/50">Started: {activeBreak.startTime}</span>
              </div>
              <div className="flex items-center gap-4 py-2">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-500/40 bg-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                  <Coffee className="h-7 w-7 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white capitalize">{activeBreak.type} Break</h3>
                  <p className="text-3xl font-extrabold text-amber-400 tabular-nums my-1">
                    {formatHMS(activeBreakSeconds)}
                  </p>
                  <p className="text-xs text-white/50">{activeBreak.reason || "Taking a short rest..."}</p>
                </div>
              </div>
              <Button
                onClick={endBreak}
                className="mt-4 w-full bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-900 shadow-[0_0_20px_rgba(16,185,129,0.3)] font-bold py-3 rounded-xl"
              >
                End Break Now
              </Button>
            </>
          ) : (
            <div className="py-6 text-center space-y-3">
              <Coffee className="h-10 w-10 text-white/30 mx-auto" />
              <h3 className="text-base font-bold text-white">No Active Break</h3>
              <p className="text-xs text-white/50 max-w-xs mx-auto">
                Working hard? Remember to take short breaks to keep your productivity high.
              </p>
              <Button
                onClick={openBreakModal}
                className="bg-amber-600 hover:bg-amber-500 text-white font-bold gap-2 rounded-xl py-2 px-6 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
              >
                <Plus className="h-4 w-4" />
                Start a Break
              </Button>
            </div>
          )}
        </div>

        <div className="panel-card border border-white/10 bg-[#0F172A]">
          <h3 className="panel-title text-emerald-400 mb-2">Today&apos;s Break Summary</h3>
          <DonutChart
            data={summaryData}
            centerValue={totalBreakStr}
            centerLabel="Total Break"
            height={180}
          />
        </div>
      </div>

      <div className="page-grid lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="panel-card border border-white/10 bg-[#0F172A]">
            <div className="border-b border-white/10 px-3.5 py-2.5 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Today&apos;s Break Logs</h3>
              <Button onClick={openBreakModal} className="bg-amber-600 hover:bg-amber-500 text-white text-xs h-7 px-3 rounded-lg">
                + Take Break
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-white/70">Start Time</TableHead>
                  <TableHead className="text-white/70">End Time</TableHead>
                  <TableHead className="text-white/70">Type</TableHead>
                  <TableHead className="text-white/70">Duration</TableHead>
                  <TableHead className="text-white/70">Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeBreak && (
                  <TableRow className="bg-amber-950/60 border-l-2 border-l-amber-500">
                    <TableCell className="text-sm text-white">{activeBreak.startTime}</TableCell>
                    <TableCell className="text-sm text-amber-400 font-bold">(Ongoing)</TableCell>
                    <TableCell className="text-sm capitalize text-amber-300 font-medium">{activeBreak.type}</TableCell>
                    <TableCell className="text-sm font-bold text-amber-400">{formatHMS(activeBreakSeconds)}</TableCell>
                    <TableCell className="text-sm text-white/60">{activeBreak.reason || "-"}</TableCell>
                  </TableRow>
                )}
                {breaks.map((record) => {
                  const Icon = breakTypeIcons[record.type] || Coffee;
                  return (
                    <TableRow key={record.id} className="border-white/5 hover:bg-white/5">
                      <TableCell className="text-sm text-white/80">{record.startTime}</TableCell>
                      <TableCell className="text-sm text-white/80">{record.endTime || "-"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-amber-400" />
                          <span className="text-sm capitalize text-white/80">{breakTypeLabels[record.type] || record.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-semibold text-emerald-400">{record.duration}</TableCell>
                      <TableCell className="text-sm text-white/50">{record.reason || "-"}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="lg:col-span-4">
          <GuidelinesCard title="Break Guidelines" guidelines={breakGuidelines} />
        </div>
      </div>
    </div>
  );
}
