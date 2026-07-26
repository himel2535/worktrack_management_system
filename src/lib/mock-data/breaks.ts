import { BreakRecord } from "@/lib/types";

export const breakRecords: BreakRecord[] = [
  {
    id: "1",
    startTime: "11:24 AM",
    type: "personal",
    duration: "00:07:48",
    projectName: "TapZio Website",
    taskName: "Subscription Management",
    reason: "Quick personal break",
    ongoing: true,
  },
  {
    id: "2",
    startTime: "12:00 PM",
    endTime: "12:30 PM",
    type: "lunch",
    duration: "00:30:00",
    reason: "Lunch break",
  },
  {
    id: "3",
    startTime: "01:15 PM",
    endTime: "01:20 PM",
    type: "prayer",
    duration: "00:05:00",
    reason: "Prayer time",
  },
  {
    id: "4",
    startTime: "09:45 AM",
    endTime: "09:52 AM",
    type: "personal",
    duration: "00:07:12",
    projectName: "TapZio Website",
    taskName: "Subscription Management",
    reason: "Coffee break",
  },
  {
    id: "5",
    startTime: "10:30 AM",
    endTime: "10:45 AM",
    type: "personal",
    duration: "00:15:30",
    reason: "Short walk",
  },
];

export const breakStats = {
  totalBreakTime: "00:38:12",
  breakCount: 4,
  longestBreak: "00:15:30",
  averageBreak: "00:09:33",
  breakTimePercent: 8.4,
};

export const currentBreak = {
  isActive: true,
  type: "personal" as const,
  label: "Personal Break",
  startTime: "11:24 AM",
  elapsed: "00:07:48",
  projectName: "TapZio Website",
  taskName: "Subscription Management",
};

export const breakSummaryData = [
  { name: "Personal", value: 61, color: "#22C55E" },
  { name: "Lunch", value: 26, color: "#F97316" },
  { name: "Prayer", value: 13, color: "#A855F7" },
  { name: "Other", value: 0, color: "#EF4444" },
];

export const monthlyBreakData = [
  { period: "1-7 Jul", hours: 8.5 },
  { period: "8-14 Jul", hours: 12.75 },
  { period: "15-21 Jul", hours: 9.2 },
  { period: "22-26 Jul", hours: 6.8 },
];

export const breakGuidelines = [
  "Click 'Start Break' when you step away from work",
  "Select the appropriate break type",
  "End break promptly when returning to work",
  "Excessive break time may affect your performance",
  "Break allowed: No Limit",
];
