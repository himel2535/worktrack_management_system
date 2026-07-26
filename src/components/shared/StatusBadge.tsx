import { cn } from "@/lib/utils";
import { statusColors, statusLabels } from "@/lib/format";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const colors = statusColors[status as keyof typeof statusColors] || statusColors.todo;
  const label = statusLabels[status] || status;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        colors.bg,
        colors.text,
        colors.border,
        className
      )}
    >
      {label}
    </span>
  );
}
