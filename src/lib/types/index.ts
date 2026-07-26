export type TaskStatus = "todo" | "in_progress" | "review" | "completed";
export type TaskPriority = "high" | "medium" | "low";
export type ProjectStatus = "in_progress" | "pending" | "completed";
export type UpdateStatus = "on_time" | "missed" | "upcoming" | "submitted";
export type BreakType = "personal" | "lunch" | "prayer" | "other";
export type AttendanceStatus = "present" | "late" | "absent" | "weekly_off";

export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  progress: number;
  tasksCompleted: number;
  tasksTotal: number;
  deadline: string;
  status: ProjectStatus;
  lastWorked: string;
  icon: string;
  archived?: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  projectName: string;
  priority: TaskPriority;
  status: TaskStatus;
  deadline: string;
  deadlineLabel?: string;
  progress: number;
  createdAt: string;
  taskType: string;
  estimatedTime: string;
  spentTime: string;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
}

export interface WorkSession {
  isActive: boolean;
  projectId: string;
  projectName: string;
  taskId: string;
  taskName: string;
  startedAt: string;
  estimatedEnd: string;
  totalWorkTime: string;
  nextUpdateDueIn: string;
  updateProgress: number;
  updateInterval: string;
  lastUpdateAt: string;
  lastUpdateStatus: UpdateStatus;
  breakTaken: string;
}

export interface HourlyUpdate {
  id: string;
  time: string;
  dueTime?: string;
  title: string;
  description: string;
  status: UpdateStatus;
  points: number;
  attachments?: string[];
}

export interface BreakRecord {
  id: string;
  startTime: string;
  endTime?: string;
  type: BreakType;
  duration: string;
  projectName?: string;
  taskName?: string;
  reason?: string;
  ongoing?: boolean;
}

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description?: string;
  type: "present" | "work_start" | "update" | "break_start" | "break_end" | "missed" | "project";
  points?: number;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  day: string;
  inTime: string;
  outTime: string;
  workTime: string;
  status: AttendanceStatus;
  lateMinutes: number;
  points: number;
}

export interface CalendarDay {
  date: number;
  status: AttendanceStatus | "future";
  isToday?: boolean;
}

export interface PerformanceCategory {
  id: string;
  name: string;
  score: number;
  weight: number;
  status: string;
  description: string;
  color: string;
}

export interface PointHistory {
  id: string;
  time: string;
  description: string;
  points: number;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: string;
}
