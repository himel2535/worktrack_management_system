"use client";

import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useWorkTrack } from "@/context/WorkTrackContext";
import { Task } from "@/lib/types";
import { cn } from "@/lib/utils";

const glassIconStyles = {
  green: "bg-emerald-500/20 text-emerald-400 border-emerald-400/30",
  orange: "bg-orange-500/20 text-orange-400 border-orange-400/30",
  blue: "bg-blue-500/20 text-blue-400 border-blue-400/30",
} as const;

function TaskIcon({
  color,
}: {
  color: Task["iconColor"];
}) {
  const style = glassIconStyles[color ?? "green"];
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
}: {
  deadline: string;
  deadlineLabel?: string;
}) {
  const isToday = deadlineLabel?.toLowerCase().includes("today");
  let label = "Today";
  if (!isToday) {
    if (deadlineLabel) {
      label = deadlineLabel;
    } else {
      label = deadline;
    }
  }

  return (
    <span
      className={cn(
        "shrink-0 text-xs font-medium",
        isToday ? "text-red-400" : "text-white/45"
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
  const { tasks, openTaskModal } = useWorkTrack();
  const myTasks = tasks.filter((t) => t.status !== "completed").slice(0, 4);

  return (
    <div className="panel-card">
      <div className="mb-2 flex items-center justify-between">
        <h3 className={cn(isGlass ? "panel-title-glass mb-0" : "panel-title mb-0")}>
          My Tasks ({myTasks.length})
        </h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => openTaskModal()}
            className="flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Task
          </button>
          <Link
            href="/tasks"
            className="text-xs font-medium text-white/50 hover:text-white"
          >
            View All
          </Link>
        </div>
      </div>
      <div>
        {myTasks.length === 0 ? (
          <p className="py-4 text-center text-xs text-white/40">No pending tasks!</p>
        ) : (
          myTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-2.5 py-2 border-b border-white/10 last:border-0"
            >
              <TaskIcon color={task.iconColor} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">
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
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
