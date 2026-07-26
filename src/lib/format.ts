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
  todo: { bg: "bg-sky-500/15", text: "text-sky-400", border: "border-sky-500/30" },
  in_progress: { bg: "bg-amber-500/15", text: "text-amber-400", border: "border-amber-500/30" },
  review: { bg: "bg-purple-500/15", text: "text-purple-400", border: "border-purple-500/30" },
  completed: { bg: "bg-emerald-500/15", text: "text-emerald-400", border: "border-emerald-500/30" },
  pending: { bg: "bg-amber-500/15", text: "text-amber-400", border: "border-amber-500/30" },
  present: { bg: "bg-emerald-500/15", text: "text-emerald-400", border: "border-emerald-500/30" },
  late: { bg: "bg-amber-500/15", text: "text-amber-400", border: "border-amber-500/30" },
  absent: { bg: "bg-rose-500/15", text: "text-rose-400", border: "border-rose-500/30" },
  on_time: { bg: "bg-emerald-500/15", text: "text-emerald-400", border: "border-emerald-500/30" },
  missed: { bg: "bg-rose-500/15", text: "text-rose-400", border: "border-rose-500/30" },
  upcoming: { bg: "bg-sky-500/15", text: "text-sky-400", border: "border-sky-500/30" },
  submitted: { bg: "bg-emerald-500/15", text: "text-emerald-400", border: "border-emerald-500/30" },
};

export const priorityColors = {
  high: { bg: "bg-rose-500/15", text: "text-rose-400", border: "border-rose-500/30" },
  medium: { bg: "bg-amber-500/15", text: "text-amber-400", border: "border-amber-500/30" },
  low: { bg: "bg-emerald-500/15", text: "text-emerald-400", border: "border-emerald-500/30" },
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
