import { PerformanceCategory, PointHistory } from "@/lib/types";

export const performanceStats = {
  overallScore: 82,
  overallStatus: "Good",
  trend: "+8 points from last week",
  discipline: 91,
  workPerformance: 76,
  productivity: 78,
  timelyUpdates: 85,
};

export const performanceCategories: PerformanceCategory[] = [
  {
    id: "1",
    name: "Discipline",
    score: 91,
    weight: 35,
    status: "Excellent",
    description: "Attendance, punctuality, and break compliance",
    color: "#3B82F6",
  },
  {
    id: "2",
    name: "Work Performance",
    score: 76,
    weight: 35,
    status: "Good",
    description: "Task completion and quality of work",
    color: "#A855F7",
  },
  {
    id: "3",
    name: "Productivity",
    score: 78,
    weight: 20,
    status: "Good",
    description: "Active work time vs office time ratio",
    color: "#F97316",
  },
  {
    id: "4",
    name: "Timely Updates",
    score: 85,
    weight: 10,
    status: "Excellent",
    description: "Hourly update submission rate",
    color: "#22C55E",
  },
];

export const scoreBreakdownData = [
  { name: "Discipline", value: 35, score: 91, color: "#3B82F6" },
  { name: "Work Performance", value: 35, score: 76, color: "#A855F7" },
  { name: "Productivity", value: 20, score: 78, color: "#F97316" },
  { name: "Timely Updates", value: 10, score: 85, color: "#22C55E" },
];

export const performanceTrendData = [
  { day: "Mon", overall: 74, discipline: 88, workPerformance: 70 },
  { day: "Tue", overall: 76, discipline: 90, workPerformance: 72 },
  { day: "Wed", overall: 78, discipline: 89, workPerformance: 74 },
  { day: "Thu", overall: 80, discipline: 91, workPerformance: 75 },
  { day: "Fri", overall: 79, discipline: 90, workPerformance: 74 },
  { day: "Sat", overall: 82, discipline: 91, workPerformance: 76 },
  { day: "Sun", overall: 0, discipline: 0, workPerformance: 0 },
];

export const pointHistory: PointHistory[] = [
  { id: "1", time: "10:08 AM", description: "Hourly update on time", points: 1 },
  { id: "2", time: "11:08 AM", description: "Hourly update on time", points: 1 },
  { id: "3", time: "12:08 PM", description: "Missed hourly update", points: -1 },
  { id: "4", time: "9:04 AM", description: "Present on time", points: 1 },
  { id: "5", time: "Yesterday", description: "Late arrival penalty", points: -1 },
  { id: "6", time: "Yesterday", description: "Task completed", points: 2 },
];

export const weeklyOverview = {
  totalWorkTime: "42h 18m",
  activeWorkTime: "34h 25m",
  breakTime: "07h 53m",
  tasksCompleted: 18,
  hourlyUpdates: { completed: 23, total: 28 },
};
