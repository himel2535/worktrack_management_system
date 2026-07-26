import { TimelineEvent } from "@/lib/types";

export const todayTimeline: TimelineEvent[] = [
  {
    id: "1",
    time: "09:04 AM",
    title: "Present Marked",
    description: "You were present",
    type: "present",
    badge: "On Time",
    badgeVariant: "success",
  },
  {
    id: "2",
    time: "09:08 AM",
    title: "Work Started",
    description: "TapZio Website - Subscription Module",
    type: "work_start",
  },
  {
    id: "3",
    time: "10:08 AM",
    title: "Hourly Update Submitted",
    description: "Subscription table UI completed...",
    type: "update",
    points: 1,
  },
  {
    id: "4",
    time: "11:08 AM",
    title: "Hourly Update Submitted",
    description: "Filter and pagination completed...",
    type: "update",
    points: 1,
  },
  {
    id: "5",
    time: "11:24 AM",
    title: "Break Started",
    description: "Personal Break",
    type: "break_start",
  },
  {
    id: "5b",
    time: "11:39 AM",
    title: "Break Ended",
    description: "Break Duration: 15m",
    type: "break_end",
  },
  {
    id: "6",
    time: "12:39 PM",
    title: "Hourly Update Missed",
    description: "Update was not submitted in time",
    type: "missed",
    points: -1,
  },
  {
    id: "7",
    time: "01:08 PM",
    title: "Hourly Update Submitted",
    description: "Resumed API testing",
    type: "update",
    points: 1,
  },
];

export const productivityData = [
  { name: "Active Work", value: 82, color: "#22C55E" },
  { name: "Break Time", value: 18, color: "#F97316" },
];
