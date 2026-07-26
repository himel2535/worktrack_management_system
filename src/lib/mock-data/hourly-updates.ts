import { HourlyUpdate } from "@/lib/types";

export const hourlyUpdates: HourlyUpdate[] = [
  {
    id: "1",
    time: "10:08 AM",
    dueTime: "10:08 AM",
    title: "Update Submitted",
    description: "Started working on subscription management API integration. Connected payment gateway endpoints.",
    status: "on_time",
    points: 1,
    attachments: ["screenshot-1.png"],
  },
  {
    id: "2",
    time: "11:08 AM",
    dueTime: "11:08 AM",
    title: "Update Submitted",
    description: "Completed subscription table UI design. Added filter and sort functionality.",
    status: "on_time",
    points: 1,
    attachments: ["screenshot-2.png", "screenshot-3.png"],
  },
  {
    id: "3",
    time: "12:08 PM",
    dueTime: "12:08 PM",
    title: "Update Missed",
    description: "Missed hourly update during lunch break.",
    status: "missed",
    points: -1,
  },
  {
    id: "4",
    time: "01:08 PM",
    dueTime: "01:08 PM",
    title: "Update Submitted",
    description: "Resumed work after break. Testing subscription API endpoints.",
    status: "on_time",
    points: 1,
  },
  {
    id: "5",
    time: "02:08 PM",
    dueTime: "02:08 PM",
    title: "Update Submitted",
    description: "Fixed subscription table pagination and added export feature.",
    status: "on_time",
    points: 1,
  },
  {
    id: "6",
    time: "03:08 PM",
    dueTime: "03:08 PM",
    title: "Upcoming Update",
    description: "Next update due in 22 minutes.",
    status: "upcoming",
    points: 0,
  },
];

export const hourlyUpdateStats = {
  expected: 6,
  submitted: 4,
  missed: 1,
  upcoming: 1,
  netPoints: 3,
  completionRate: 67,
  onTimeRate: 80,
};

export const dailyProgressData = [
  { day: "Mon", points: 2 },
  { day: "Tue", points: 4 },
  { day: "Wed", points: -1 },
  { day: "Thu", points: 3 },
  { day: "Fri", points: 5 },
  { day: "Sat", points: 3 },
  { day: "Sun", points: 0 },
];

export const updateGuidelines = [
  "Submit your update every 60 minutes while working",
  "Include a brief description of work completed",
  "Attach screenshots when applicable",
  "Missed update will deduct -1 point",
  "On-time update earns +1 point",
];

export const todayScoreData = [
  { name: "On Time", value: 4, color: "#22C55E" },
  { name: "Missed", value: 1, color: "#EF4444" },
];
