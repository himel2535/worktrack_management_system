import { Project, ActivityItem } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "1",
    name: "TapZio Website",
    category: "Web Development",
    description: "Subscription management and payment integration",
    progress: 62,
    tasksCompleted: 8,
    tasksTotal: 13,
    deadline: "Aug 15",
    status: "in_progress",
    lastWorked: "2 hours ago",
    icon: "globe",
  },
  {
    id: "2",
    name: "ERP System",
    category: "Enterprise",
    description: "Internal ERP dashboard and modules",
    progress: 35,
    tasksCompleted: 5,
    tasksTotal: 12,
    deadline: "Sep 01",
    status: "in_progress",
    lastWorked: "Yesterday",
    icon: "box",
  },
  {
    id: "3",
    name: "Mobile App UI",
    category: "Mobile Design",
    description: "iOS and Android app interface design",
    progress: 88,
    tasksCompleted: 7,
    tasksTotal: 8,
    deadline: "2026-07-30",
    status: "in_progress",
    lastWorked: "3 days ago",
    icon: "smartphone",
  },
  {
    id: "4",
    name: "Brand Identity",
    category: "Design",
    description: "Logo and brand guidelines",
    progress: 20,
    tasksCompleted: 2,
    tasksTotal: 10,
    deadline: "2026-08-20",
    status: "pending",
    lastWorked: "1 week ago",
    icon: "palette",
  },
  {
    id: "5",
    name: "Landing Page",
    category: "Marketing",
    description: "Product launch landing page",
    progress: 100,
    tasksCompleted: 6,
    tasksTotal: 6,
    deadline: "2026-07-10",
    status: "completed",
    lastWorked: "2 weeks ago",
    icon: "layout",
  },
];

export const projectStats = {
  total: 5,
  inProgress: 3,
  pending: 1,
  completed: 1,
  avgProgress: 59,
};

export const recentActivity: ActivityItem[] = [
  {
    id: "1",
    title: "You submitted an update",
    description: "TapZio Website - Subscription Management",
    time: "10:08 AM",
    type: "update",
  },
  {
    id: "2",
    title: "Break ended",
    description: "Personal break - 7 min 48 sec",
    time: "11:32 AM",
    type: "break",
  },
  {
    id: "3",
    title: "Started working on task",
    description: "Subscription Management",
    time: "10:08 AM",
    type: "work",
  },
  {
    id: "4",
    title: "Project created",
    description: "Mobile App UI project added",
    time: "Yesterday",
    type: "project",
  },
];

export const overallProgressData = [
  { name: "In Progress", value: 60, color: "#22C55E" },
  { name: "Pending", value: 20, color: "#F97316" },
  { name: "Completed", value: 20, color: "#A855F7" },
];
