import { Checkbox } from "@/components/ui/checkbox";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { tasks } from "@/lib/mock-data/tasks";
import { cn } from "@/lib/utils";

function DeadlineTag({
  deadline,
  deadlineLabel,
}: {
  deadline: string;
  deadlineLabel?: string;
}) {
  const isToday = deadlineLabel?.includes("Today");
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
        "shrink-0 rounded-md px-2 py-0.5 text-xs font-medium",
        isToday
          ? "bg-red-50 text-red-600"
          : "bg-slate-100 text-slate-600"
      )}
    >
      {label}
    </span>
  );
}

export function MyTasksWidget() {
  const myTasks = tasks.filter((t) => t.status !== "completed").slice(0, 4);

  return (
    <div className="h-full rounded-2xl border border-slate-100/80 bg-white p-5 shadow-sm">
      <h3 className="mb-4 font-semibold text-slate-800">My Tasks</h3>
      <div className="space-y-2">
        {myTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 rounded-lg border border-slate-50 p-3 hover:bg-slate-50/80"
          >
            <Checkbox />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-800">
                {task.title}
              </p>
              <p className="truncate text-xs text-slate-500">
                {task.projectName}
              </p>
            </div>
            <StatusBadge status={task.status} />
            <DeadlineTag
              deadline={task.deadline}
              deadlineLabel={task.deadlineLabel}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
