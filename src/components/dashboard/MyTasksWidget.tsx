import Link from "next/link";
import { Check } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { tasks } from "@/lib/mock-data/tasks";
import { Task } from "@/lib/types";
import { cn } from "@/lib/utils";

const iconStyles = {
  green: "bg-emerald-50 text-emerald-600 border-emerald-200",
  orange: "bg-orange-50 text-orange-600 border-orange-200",
  blue: "bg-blue-50 text-blue-600 border-blue-200",
} as const;

const glassIconStyles = {
  green: "bg-emerald-500/20 text-emerald-400 border-emerald-400/30",
  orange: "bg-orange-500/20 text-orange-400 border-orange-400/30",
  blue: "bg-blue-500/20 text-blue-400 border-blue-400/30",
} as const;

function TaskIcon({
  color,
  isGlass,
}: {
  color: Task["iconColor"];
  isGlass?: boolean;
}) {
  const styles = isGlass ? glassIconStyles : iconStyles;
  const style = styles[color ?? "green"];
  return (
    <div
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border",
        style
      )}
    >
      <Check className="h-4 w-4" />
    </div>
  );
}

function DeadlineText({
  deadline,
  deadlineLabel,
  isGlass,
}: {
  deadline: string;
  deadlineLabel?: string;
  isGlass?: boolean;
}) {
  const isToday = deadlineLabel?.toLowerCase().includes("today");
  let label = "Today";
  if (!isToday) {
    if (deadlineLabel) {
      label = deadlineLabel;
    } else {
      const d = new Date(deadline);
      label = d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    }
  }

  return (
    <span
      className={cn(
        "shrink-0 text-xs font-medium",
        isToday
          ? "text-red-400"
          : isGlass
            ? "text-white/45"
            : "text-slate-500"
      )}
    >
      {label}
    </span>
  );
}

interface MyTasksWidgetProps {
  theme?: "light" | "glass";
}

export function MyTasksWidget({ theme = "glass" }: MyTasksWidgetProps) {
  const isGlass = theme === "glass";
  const myTasks = tasks.filter((t) => t.status !== "completed").slice(0, 3);

  return (
    <div className="panel-card">
      <div className="mb-2 flex items-center justify-between">
        <h3 className={cn(isGlass ? "panel-title-glass mb-0" : "panel-title mb-0")}>
          My Tasks
        </h3>
        <Link
          href="/tasks"
          className="text-xs font-medium text-emerald-400 hover:underline"
        >
          View All
        </Link>
      </div>
      <div>
        {myTasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "flex items-center gap-2.5 py-2 last:border-0",
              isGlass ? "border-b border-white/10" : "border-b border-slate-100"
            )}
          >
            <TaskIcon color={task.iconColor} isGlass={isGlass} />
            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  "truncate text-sm font-medium",
                  isGlass ? "text-white" : "text-slate-800"
                )}
              >
                {task.title}
              </p>
              <p className="truncate text-xs text-emerald-400">
                {task.projectName}
              </p>
            </div>
            <StatusBadge status={task.status} />
            <DeadlineText
              deadline={task.deadline}
              deadlineLabel={task.deadlineLabel}
              isGlass={isGlass}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
