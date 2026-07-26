import { AttendanceRecord, CalendarDay } from "@/lib/types";

export const attendanceStats = {
  presentDays: 21,
  lateDays: 4,
  absentDays: 1,
  attendancePercent: 87.5,
  latePenalty: -5,
  totalDays: 26,
};

export const attendanceSummaryData = [
  { name: "Present", value: 21, color: "#22C55E" },
  { name: "Late", value: 4, color: "#F97316" },
  { name: "Absent", value: 1, color: "#EF4444" },
  { name: "Weekly Off", value: 2, color: "#94A3B8" },
];

export const streaks = {
  best: 9,
  current: 3,
};

export const punctualityOverview = [
  { label: "On Time (≤ 10 min)", days: 21, color: "#22C55E" },
  { label: "Late (11min - 30min)", days: 3, color: "#F97316" },
  { label: "Very Late (> 30 min)", days: 1, color: "#EF4444" },
];

export const attendanceRules = [
  "Office start time: 09:00 AM",
  "Grace time: 10 minutes",
  "Late arrival after grace period counts as late",
  "3 late days in a month = -5 points penalty",
  "Absent without notice = -2 points",
];

export const july2026Calendar: CalendarDay[] = [
  ...Array.from({ length: 2 }, (_, i) => ({ date: i + 1, status: "future" as const })),
  { date: 3, status: "present" },
  { date: 4, status: "present" },
  { date: 5, status: "late" },
  { date: 6, status: "present" },
  { date: 7, status: "weekly_off" },
  { date: 8, status: "weekly_off" },
  { date: 9, status: "present" },
  { date: 10, status: "present" },
  { date: 11, status: "late" },
  { date: 12, status: "present" },
  { date: 13, status: "present" },
  { date: 14, status: "present" },
  { date: 15, status: "late" },
  { date: 16, status: "present" },
  { date: 17, status: "present" },
  { date: 18, status: "absent" },
  { date: 19, status: "present" },
  { date: 20, status: "present" },
  { date: 21, status: "weekly_off" },
  { date: 22, status: "weekly_off" },
  { date: 23, status: "present" },
  { date: 24, status: "present" },
  { date: 25, status: "late" },
  { date: 26, status: "present", isToday: true },
];

export const attendanceRecords: AttendanceRecord[] = [
  { id: "1", date: "2026-07-26", day: "Saturday", inTime: "9:04 AM", outTime: "-", workTime: "04:32", status: "present", lateMinutes: 4, points: 0 },
  { id: "2", date: "2026-07-25", day: "Friday", inTime: "9:22 AM", outTime: "6:15 PM", workTime: "08:53", status: "late", lateMinutes: 22, points: -1 },
  { id: "3", date: "2026-07-24", day: "Thursday", inTime: "8:58 AM", outTime: "6:00 PM", workTime: "09:02", status: "present", lateMinutes: 0, points: 1 },
  { id: "4", date: "2026-07-23", day: "Wednesday", inTime: "9:05 AM", outTime: "6:10 PM", workTime: "09:05", status: "present", lateMinutes: 5, points: 0 },
  { id: "5", date: "2026-07-22", day: "Tuesday", inTime: "9:00 AM", outTime: "5:55 PM", workTime: "08:55", status: "present", lateMinutes: 0, points: 1 },
];
