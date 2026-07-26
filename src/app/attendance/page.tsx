import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { GuidelinesCard } from "@/components/shared/GuidelinesCard";
import { DonutChart } from "@/components/charts/DonutChart";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  attendanceStats,
  attendanceSummaryData,
  streaks,
  punctualityOverview,
  attendanceRules,
  july2026Calendar,
  attendanceRecords,
} from "@/lib/mock-data/attendance";
import { formatMonthYear } from "@/lib/format";
import {
  UserCheck,
  Clock,
  UserX,
  Percent,
  Star,
  Download,
  ChevronRight,
  Flame,
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
  const today = new Date(2026, 6, 26);
  const firstDayOfMonth = new Date(2026, 6, 1).getDay();
  const daysInMonth = 31;

  const calendarDays: (typeof july2026Calendar[0] | null)[] = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => {
      const day = july2026Calendar.find((d) => d.date === i + 1);
      return day || { date: i + 1, status: "future" as const };
    }),
  ];

  return (
    <>
      <PageHeader
        title="Attendance"
        subtitle="Track your attendance and punctuality."
        showClock={false}
        dateLabel={formatMonthYear(today)}
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Present Days" value={attendanceStats.presentDays} subLabel="This Month" icon={UserCheck} iconBg="bg-emerald-50" iconColor="text-emerald-600" valueColor="text-emerald-600" />
        <StatCard label="Late Days" value={attendanceStats.lateDays} subLabel="This Month" icon={Clock} iconBg="bg-orange-50" iconColor="text-orange-600" valueColor="text-orange-600" />
        <StatCard label="Absent Days" value={attendanceStats.absentDays} subLabel="This Month" icon={UserX} iconBg="bg-red-50" iconColor="text-red-600" valueColor="text-red-600" />
        <StatCard label="Attendance" value={`${attendanceStats.attendancePercent}%`} icon={Percent} iconBg="bg-blue-50" iconColor="text-blue-600" />
        <StatCard label="Late Penalty" value={`${attendanceStats.latePenalty} Points`} icon={Star} iconBg="bg-purple-50" iconColor="text-purple-600" valueColor="text-purple-600" />
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 font-semibold text-slate-800">Attendance Calendar — July 2026</h3>
            <div className="grid grid-cols-7 gap-1 text-center">
              {weekDays.map((day) => (
                <div key={day} className="py-2 text-xs font-medium text-slate-500">{day}</div>
              ))}
              {calendarDays.map((day, i) => (
                <div
                  key={i}
                  className={cn(
                    "relative flex flex-col items-center rounded-lg py-2",
                    day?.isToday && "bg-emerald-50 ring-2 ring-emerald-200"
                  )}
                >
                  {day && (
                    <>
                      <span className={cn("text-sm", day.isToday ? "font-bold text-emerald-700" : "text-slate-700")}>
                        {day.date}
                      </span>
                      <span className={cn("mt-1 h-1.5 w-1.5 rounded-full", statusDotColors[day.status])} />
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
              {[
                { color: "bg-emerald-500", label: "Present" },
                { color: "bg-orange-500", label: "Late" },
                { color: "bg-red-500", label: "Absent" },
                { color: "bg-slate-300", label: "Weekly Off" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <span className={cn("h-2 w-2 rounded-full", item.color)} />
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h3 className="font-semibold text-slate-800">Attendance Records</h3>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[120px]"><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Day</TableHead>
                  <TableHead>In Time</TableHead>
                  <TableHead>Out Time</TableHead>
                  <TableHead>Work Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Late (mins)</TableHead>
                  <TableHead>Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="text-sm">{record.date}</TableCell>
                    <TableCell className="text-sm">{record.day}</TableCell>
                    <TableCell className="text-sm">{record.inTime}</TableCell>
                    <TableCell className="text-sm">{record.outTime}</TableCell>
                    <TableCell className="text-sm">{record.workTime}</TableCell>
                    <TableCell><StatusBadge status={record.status} /></TableCell>
                    <TableCell className="text-sm">{record.lateMinutes}</TableCell>
                    <TableCell className={cn("text-sm font-medium", record.points >= 0 ? "text-emerald-600" : "text-red-500")}>
                      {record.points >= 0 ? "+" : ""}{record.points}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="border-t border-slate-100 px-5 py-3 text-sm text-slate-500">
              Showing 1 to {attendanceRecords.length} of 26 records
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-4">
          <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 font-semibold text-slate-800">Summary (July 2026)</h3>
            <DonutChart
              data={attendanceSummaryData}
              centerValue={attendanceStats.totalDays}
              centerLabel="Total Days"
              height={180}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm text-center">
              <Flame className="mx-auto mb-2 h-5 w-5 text-orange-500" />
              <p className="text-xs text-slate-500">Best Streak</p>
              <p className="text-xl font-bold text-slate-800">{streaks.best} Days</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm text-center">
              <Flame className="mx-auto mb-2 h-5 w-5 text-emerald-500" />
              <p className="text-xs text-slate-500">Current Streak</p>
              <p className="text-xl font-bold text-slate-800">{streaks.current} Days</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 font-semibold text-slate-800">Punctuality Overview</h3>
            <div className="space-y-3">
              {punctualityOverview.map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-600">{item.label}</span>
                  </div>
                  <span className="font-semibold text-slate-800">{item.days} Days</span>
                </div>
              ))}
            </div>
            <button className="mt-4 flex items-center gap-1 text-sm text-emerald-600 hover:underline">
              View Punctuality Report
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <GuidelinesCard
            title="Attendance Rules"
            items={attendanceRules}
            footer={
              <button className="flex items-center gap-1 text-sm text-emerald-600 hover:underline">
                View All Rules
                <ChevronRight className="h-4 w-4" />
              </button>
            }
          />
        </div>
      </div>
    </>
  );
}
