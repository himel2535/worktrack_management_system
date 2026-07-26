"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
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
import { formatMonthYear } from "@/lib/format";
import {
  attendanceStats,
  punctualityOverview,
  attendanceRules,
  july2026Calendar,
} from "@/lib/mock-data/attendance";
import {
  UserCheck,
  Clock,
  UserX,
  Percent,
  Star,
  Flame,
  Play,
  Square,
} from "lucide-react";
import { cn } from "@/lib/utils";

const statusDotColors: Record<string, string> = {
  present: "bg-emerald-500",
  late: "bg-orange-500",
  absent: "bg-red-500",
  weekly_off: "bg-slate-300",
  future: "bg-transparent",
};

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function AttendancePage() {
  const { isClockedIn, clockInTime, clockIn, clockOut, attendanceRecords } = useWorkTrack();
  const today = new Date(2026, 6, 26);
  const firstDayOfMonth = new Date(2026, 6, 1).getDay();
  const daysInMonth = 31;

  const calendarDays = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => {
      const day = july2026Calendar.find((d) => d.date === i + 1);
      return day || { date: i + 1, status: "future" as const };
    }),
  ];

  const punctualityData = punctualityOverview.map((item) => ({
    name: item.label,
    value: item.days,
    color: item.color,
  }));

  return (
    <div className="page-stack">
      <PageHeader
        title="Attendance"
        subtitle="Track your attendance and punctuality."
        showClock={false}
        dateLabel={formatMonthYear(today)}
      />

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
        <StatCard label="Present Days" value={attendanceStats.presentDays} subLabel="This Month" icon={UserCheck} iconBg="bg-emerald-50" iconColor="text-emerald-600" valueColor="text-emerald-400" />
        <StatCard label="Late Days" value={attendanceStats.lateDays} subLabel="This Month" icon={Clock} iconBg="bg-orange-50" iconColor="text-orange-600" valueColor="text-amber-400" />
        <StatCard label="Absent Days" value={attendanceStats.absentDays} subLabel="This Month" icon={UserX} iconBg="bg-red-50" iconColor="text-red-600" valueColor="text-rose-400" />
        <StatCard label="Attendance" value={`${attendanceStats.attendancePercent}%`} icon={Percent} iconBg="bg-blue-50" iconColor="text-blue-600" />
        <StatCard label="Late Penalty" value={`${attendanceStats.latePenalty} Points`} icon={Star} iconBg="bg-purple-50" iconColor="text-purple-600" valueColor="text-purple-400" />
      </div>

      <div className="panel-card border border-white/10 bg-[#0F172A] flex items-center justify-between p-4">
        <div>
          <h3 className="text-base font-bold text-white">Shift Control & Status</h3>
          <p className="text-xs text-white/50">
            {isClockedIn ? `Shift active since ${clockInTime}` : "Shift ended / Not clocked in"}
          </p>
        </div>
        <div>
          {isClockedIn ? (
            <Button
              onClick={clockOut}
              className="bg-rose-600 hover:bg-rose-500 text-white font-bold gap-2 rounded-xl py-2 px-5 shadow-[0_0_15px_rgba(244,63,94,0.3)]"
            >
              <Square className="h-4 w-4 fill-white" />
              Clock Out Shift
            </Button>
          ) : (
            <Button
              onClick={clockIn}
              className="bg-emerald-950/90 text-emerald-300 border border-emerald-800/70 hover:bg-emerald-900 hover:border-emerald-700 shadow-[inset_0_-2px_0_0_#059669] font-bold gap-2 rounded-xl py-2 px-5"
            >
              <Play className="h-4 w-4 fill-white" />
              Clock In Shift
            </Button>
          )}
        </div>
      </div>

      <div className="page-grid lg:grid-cols-12">
        <div className="page-col-stack lg:col-span-8">
          <div className="panel-card border border-white/10 bg-[#0F172A]">
            <h3 className="panel-title text-emerald-400">Attendance Calendar — July 2026</h3>
            <div className="grid grid-cols-7 gap-1 text-center">
              {weekDays.map((day) => (
                <div key={day} className="py-2 text-xs font-medium text-white/50">{day}</div>
              ))}
              {calendarDays.map((day, i) => (
                <div
                  key={i}
                  className={cn(
                    "relative flex flex-col items-center rounded-lg py-2",
                    day?.isToday && "bg-emerald-950/60 ring-2 ring-emerald-500"
                  )}
                >
                  {day && (
                    <>
                      <span className={cn("text-sm", day.isToday ? "font-bold text-emerald-400" : "text-white/80")}>
                        {day.date}
                      </span>
                      <span className={cn("mt-1 h-1.5 w-1.5 rounded-full", statusDotColors[day.status])} />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="panel-card border border-white/10 bg-[#0F172A]">
            <div className="flex items-center justify-between border-b border-white/10 px-3.5 py-2.5">
              <h3 className="text-sm font-semibold text-white">Attendance Records</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-white/70">Date</TableHead>
                  <TableHead className="text-white/70">Day</TableHead>
                  <TableHead className="text-white/70">In Time</TableHead>
                  <TableHead className="text-white/70">Out Time</TableHead>
                  <TableHead className="text-white/70">Work Time</TableHead>
                  <TableHead className="text-white/70">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceRecords.map((record) => (
                  <TableRow key={record.id} className="border-white/5 hover:bg-white/5">
                    <TableCell className="text-sm text-white">{record.date}</TableCell>
                    <TableCell className="text-sm text-white/60">{record.day}</TableCell>
                    <TableCell className="text-sm text-emerald-400 font-medium">{record.inTime}</TableCell>
                    <TableCell className="text-sm text-white/60">{record.outTime}</TableCell>
                    <TableCell className="text-sm text-white/80">{record.workTime}</TableCell>
                    <TableCell><StatusBadge status={record.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="page-col-stack lg:col-span-4">
          <div className="panel-card border border-white/10 bg-[#0F172A]">
            <h3 className="panel-title text-emerald-400">Punctuality Overview</h3>
            <DonutChart
              data={punctualityData}
              centerValue={`${attendanceStats.attendancePercent}%`}
              centerLabel="Punctuality"
              height={180}
            />
          </div>

          <GuidelinesCard title="Attendance Rules" guidelines={attendanceRules} />
        </div>
      </div>
    </div>
  );
}
