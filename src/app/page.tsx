"use client";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/shared/StatCard";
import { CurrentWorkWidget } from "@/components/dashboard/CurrentWorkWidget";
import dynamic from "next/dynamic";
import { useWorkTrack } from "@/context/WorkTrackContext";
import { Timer, Coffee, ClipboardCheck, Star, CalendarCheck } from "lucide-react";

const TodaySummary = dynamic(() => import("@/components/dashboard/TodaySummary").then((mod) => mod.TodaySummary));
const TodayTimeline = dynamic(() => import("@/components/dashboard/TodayTimeline").then((mod) => mod.TodayTimeline));
const MyTasksWidget = dynamic(() => import("@/components/dashboard/MyTasksWidget").then((mod) => mod.MyTasksWidget));

export default function DashboardPage() {
  const {
    workSession,
    breaks,
    activeBreak,
    activeBreakSeconds,
    hourlyUpdates,
    todayPoints,
    isClockedIn,
    clockInTime,
  } = useWorkTrack();

  // Calculate total break duration string
  const totalBreakSeconds = breaks.reduce((acc, b) => {
    const parts = b.duration.split(":").map(Number);
    if (parts.length === 3) return acc + parts[0] * 3600 + parts[1] * 60 + parts[2];
    return acc;
  }, 0) + (activeBreak ? activeBreakSeconds : 0);

  const formatHMS = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return [h, m, s].map((v) => (v < 10 ? `0${v}` : `${v}`)).join(":");
  };

  const totalBreakStr = formatHMS(totalBreakSeconds);
  const completedUpdates = hourlyUpdates.length;
  const expectedUpdates = 6;
  const hourlyProgress = Math.min(100, Math.round((completedUpdates / expectedUpdates) * 100));

  return (
    <div className="page-stack">
      <DashboardHeader theme="glass" />

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard
          variant="glass"
          label="Active Work"
          value={workSession.totalWorkTime}
          subLabel="Total Working Time"
          icon={Timer}
          iconBg="bg-emerald-50"
        />
        <StatCard
          variant="glass"
          label="Total Break"
          value={totalBreakStr}
          subLabel={activeBreak ? "Break Active..." : "Total Break Time"}
          icon={Coffee}
          iconBg="bg-orange-50"
          valueColor={activeBreak ? "text-amber-400" : "text-white"}
        />
        <StatCard
          variant="glass"
          label="Hourly Updates"
          value={`${completedUpdates} / ${expectedUpdates}`}
          subLabel="Completed / Expected"
          icon={ClipboardCheck}
          iconBg="bg-blue-50"
          progress={hourlyProgress}
        />
        <StatCard
          variant="glass"
          label="Today's Points"
          value={`+${todayPoints}`}
          subLabel="Net Points Earned"
          icon={Star}
          iconBg="bg-purple-50"
        />
        <StatCard
          variant="glass"
          label="Status"
          value={isClockedIn ? "On Time" : "Clocked Out"}
          subLabel={`Present: ${clockInTime}`}
          icon={CalendarCheck}
          iconBg="bg-emerald-50"
          valueColor={isClockedIn ? "text-emerald-400" : "text-slate-400"}
          showGlobeDecoration
        />
      </div>

      <div className="grid grid-cols-12 items-start gap-3">
        <div className="page-col-stack col-span-12 lg:col-span-8">
          <CurrentWorkWidget theme="glass" />
          <TodaySummary theme="glass" />
        </div>
        <div className="page-col-stack col-span-12 lg:col-span-4">
          <TodayTimeline theme="glass" />
          <MyTasksWidget theme="glass" />
        </div>
      </div>
    </div>
  );
}
