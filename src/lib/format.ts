import { format, parseISO } from "date-fns";

export function formatDate(date: string | Date, formatStr = "EEEE, d MMMM yyyy"): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, formatStr);
}

export function formatMonthYear(date: string | Date): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "MMMM yyyy");
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export function getCurrentTime(): string {
  return format(new Date(), "h:mm a");
}

export const statusColors = {
  todo: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
  in_progress: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200" },
  review: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
  completed: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200" },
  pending: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200" },
  present: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200" },
  late: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200" },
  absent: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
  on_time: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200" },
  missed: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
  upcoming: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
  submitted: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200" },
};

export const priorityColors = {
  high: { bg: "bg-red-50", text: "text-red-600" },
  medium: { bg: "bg-orange-50", text: "text-orange-600" },
  low: { bg: "bg-green-50", text: "text-green-600" },
};

export const statusLabels: Record<string, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  review: "Review",
  completed: "Completed",
  pending: "Pending",
  present: "Present",
  late: "Late",
  absent: "Absent",
  on_time: "On Time",
  missed: "Missed",
  upcoming: "Upcoming",
  submitted: "Submitted",
};

export const breakTypeLabels: Record<string, string> = {
  personal: "Personal",
  lunch: "Lunch",
  prayer: "Prayer",
  other: "Other",
};
