import { cn } from "@/lib/utils";
import { priorityColors } from "@/lib/format";
import { TaskPriority } from "@/lib/types";

interface PriorityBadgeProps {
  priority: TaskPriority;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const colors = priorityColors[priority];
  const label = priority.charAt(0).toUpperCase() + priority.slice(1);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        colors.bg,
        colors.text,
        className
      )}
    >
      {label}
    </span>
  );
}
