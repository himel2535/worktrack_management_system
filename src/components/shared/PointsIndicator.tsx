import { cn } from "@/lib/utils";

interface PointsIndicatorProps {
  points: number;
  className?: string;
  compact?: boolean;
}

export function PointsIndicator({ points, className, compact }: PointsIndicatorProps) {
  if (points === 0) return null;
  const isPositive = points > 0;
  return (
    <span
      className={cn(
        "text-xs font-semibold",
        isPositive ? "text-emerald-600" : "text-red-500",
        className
      )}
    >
      {isPositive ? "+" : ""}
      {points}
      {!compact && ` Point${Math.abs(points) !== 1 ? "s" : ""}`}
    </span>
  );
}
