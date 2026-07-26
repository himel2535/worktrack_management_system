import {
  UserCheck,
  Play,
  FileText,
  Coffee,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { todayTimeline } from "@/lib/mock-data/timeline";
import { TimelineEvent } from "@/lib/types";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  present: UserCheck,
  work_start: Play,
  update: FileText,
  break_start: Coffee,
  break_end: Coffee,
  missed: AlertCircle,
  project: FileText,
};

const colorMap: Record<string, string> = {
  present: "bg-blue-50 text-blue-600",
  work_start: "bg-emerald-50 text-emerald-600",
  update: "bg-emerald-50 text-emerald-600",
  break_start: "bg-orange-50 text-orange-600",
  break_end: "bg-orange-50 text-orange-600",
  missed: "bg-red-50 text-red-600",
  project: "bg-purple-50 text-purple-600",
};

function PointPill({ points }: { points: number }) {
  const isPositive = points > 0;
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 text-xs font-semibold",
        isPositive
          ? "bg-emerald-50 text-emerald-600"
          : "bg-red-50 text-red-600"
      )}
    >
      {isPositive ? "+" : ""}
      {points} Point{Math.abs(points) !== 1 ? "s" : ""}
    </span>
  );
}

function TimelineEntry({ event }: { event: TimelineEvent }) {
  const Icon = iconMap[event.type] || FileText;
  const color = colorMap[event.type] || "bg-slate-50 text-slate-600";
  const isMissed = event.type === "missed";

  return (
    <div
      className={cn(
        "relative flex gap-3 rounded-lg pb-4 last:pb-0",
        isMissed && "bg-red-50/50 p-2 -mx-2"
      )}
    >
      <div className="relative z-10 flex flex-col items-center">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full",
            color
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div className="absolute top-8 h-full w-px bg-slate-200" />
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-medium text-slate-800">{event.title}</p>
            {event.points !== undefined && (
              <PointPill points={event.points} />
            )}
          </div>
          <span className="shrink-0 text-xs text-slate-400">{event.time}</span>
        </div>
        {event.description && (
          <p className="mt-0.5 text-xs text-slate-500">{event.description}</p>
        )}
      </div>
    </div>
  );
}

export function TodayTimeline() {
  return (
    <div className="h-full rounded-2xl border border-slate-100/80 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-slate-800">Today&apos;s Timeline</h3>
        <button className="flex items-center gap-0.5 text-xs text-emerald-600 hover:underline">
          View Full Timeline
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
      <div>
        {todayTimeline.map((event) => (
          <TimelineEntry key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
