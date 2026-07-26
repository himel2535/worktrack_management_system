import { TimelineEvent } from "@/lib/types";

export const todayTimeline: TimelineEvent[] = [
  {
    id: "1",
    time: "9:04 AM",
    title: "Present Marked",
    description: "Checked in at office",
    type: "present",
  },
  {
    id: "2",
    time: "10:08 AM",
    title: "Work Started",
    description: "Subscription Management - TapZio Website",
    type: "work_start",
  },
  {
    id: "3",
    time: "10:08 AM",
    title: "Hourly Update Submitted",
    description: "Started API integration work",
    type: "update",
    points: 1,
  },
  {
    id: "4",
    time: "11:08 AM",
    title: "Hourly Update Submitted",
    description: "Completed subscription table UI",
    type: "update",
    points: 1,
  },
  {
    id: "5",
    time: "11:24 AM",
    title: "Break Started",
    description: "Personal break",
    type: "break_start",
  },
  {
    id: "5b",
    time: "11:32 AM",
    title: "Break Ended",
    description: "Personal break - 7 min 48 sec",
    type: "break_end",
  },
  {
    id: "6",
    time: "12:08 PM",
    title: "Hourly Update Missed",
    description: "Update not submitted on time",
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
