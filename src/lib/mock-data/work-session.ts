import { WorkSession } from "@/lib/types";

export const activeWorkSession: WorkSession = {
  isActive: true,
  projectId: "1",
  projectName: "TapZio Website",
  taskId: "2",
  taskName: "Subscription Management",
  startedAt: "10:08 AM",
  estimatedEnd: "06:00 PM",
  totalWorkTime: "01:37:42",
  nextUpdateDueIn: "00:22:18",
  updateProgress: 63,
  updateInterval: "Every 60 min",
  lastUpdateAt: "10:08 AM",
  lastUpdateStatus: "on_time",
  breakTaken: "00:38:12",
};

export const dashboardStats = {
  activeWork: "04:32:18",
  totalBreak: "00:38:12",
  hourlyUpdates: { completed: 4, total: 6 },
  todayPoints: 3,
  status: "On Time",
  presentAt: "9:04 AM",
};

export const todaySummary = {
  officeTime: "04:32:18",
  activeWorkTime: "03:54:06",
  breakCount: 4,
  tasksCompleted: 2,
  productiveTime: 82,
};

export const todayNote = {
  content: "Will continue API integration and connect with backend team for subscription endpoints.",
  createdAt: "10:15 AM",
};
