"use client";

import { useState } from "react";
import Link from "next/link";
import {
  UserCheck,
  Play,
  FileText,
  Coffee,
  AlertCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PointsIndicator } from "@/components/shared/PointsIndicator";
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
  present: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  work_start: "bg-sky-500/20 text-sky-400 border border-sky-500/30",
  update: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  break_start: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  break_end: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  missed: "bg-rose-500/20 text-rose-400 border border-rose-500/30",
  project: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
};

const filterMap: Record<string, TimelineEvent["type"][] | null> = {
  all: null,
  work: ["work_start"],
  updates: ["update", "missed"],
  breaks: ["break_start", "break_end"],
};

function TimelineEntry({
  event,
  isLast,
  isGlass,
}: {
  event: TimelineEvent;
  isLast?: boolean;
  isGlass?: boolean;
}) {
  const Icon = iconMap[event.type] || FileText;
  const color = colorMap[event.type] || "bg-slate-50 text-slate-600";
  const isMissed = event.type === "missed";

  return (
    <div
      className={cn(
        "relative grid grid-cols-[4.5rem_2rem_1fr_auto] items-start gap-x-2 py-2 last:border-0",
        isGlass ? "border-b border-white/10" : "border-b border-slate-100",
        isMissed && (isGlass ? "bg-red-500/10" : "bg-red-50/40")
      )}
    >
      <span
        className={cn(
          "pt-1 text-xs tabular-nums",
          isGlass ? "text-white/45" : "text-slate-500"
        )}
      >
        {event.time}
      </span>

      <div className="relative flex justify-center">
        {!isLast && (
          <div
            className={cn(
              "absolute top-7 left-1/2 h-[calc(100%+0.5rem)] w-px -translate-x-1/2",
              isGlass ? "bg-white/15" : "bg-slate-200"
            )}
          />
        )}
        <div
          className={cn(
            "relative z-10 flex h-7 w-7 items-center justify-center rounded-full",
            color
          )}
        >
          <Icon className="h-3.5 w-3.5" />
        </div>
      </div>

      <div className="min-w-0 pt-0.5">
        <p
          className={cn(
            "text-sm font-medium",
            isGlass ? "text-white" : "text-slate-800"
          )}
        >
          {event.title}
        </p>
        {event.description && (
          <p
            className={cn(
              "mt-0.5 text-xs",
              isGlass ? "text-white/50" : "text-slate-500"
            )}
          >
            {event.description}
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-start pt-0.5">
        {event.badge && (
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-xs font-medium",
              event.badgeVariant === "success"
                ? "bg-emerald-500/20 text-emerald-400"
                : isGlass
                  ? "bg-white/10 text-white/60"
                  : "bg-slate-100 text-slate-600"
            )}
          >
            {event.badge}
          </span>
        )}
        {event.points !== undefined && (
          <PointsIndicator points={event.points} compact />
        )}
      </div>
    </div>
  );
}

const TIMELINE_PREVIEW_COUNT = 6;

interface TodayTimelineProps {
  theme?: "light" | "glass";
}

export function TodayTimeline({ theme = "glass" }: TodayTimelineProps) {
  const isGlass = theme === "glass";
  const [filter, setFilter] = useState("all");

  return (
    <div className="relative overflow-hidden panel-card">
      {isGlass && (
        <div className="pointer-events-none absolute right-0 top-8 h-48 w-24 bg-gradient-to-b from-cyan-400/20 via-blue-500/10 to-transparent blur-2xl" />
      )}

      <div className="relative mb-2 flex items-center justify-between">
        <h3 className={cn(isGlass ? "panel-title-glass mb-0" : "panel-title mb-0")}>
          Today&apos;s Timeline
        </h3>
        <Select
          value={filter}
          onValueChange={(value) => setFilter(value ?? "all")}
        >
          <SelectTrigger
            className={cn(
              "h-7 w-[7.5rem] text-xs",
              isGlass && "border-white/10 bg-white/5 text-white"
            )}
          >
            <SelectValue placeholder="All Events" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="work">Work</SelectItem>
            <SelectItem value="updates">Updates</SelectItem>
            <SelectItem value="breaks">Breaks</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative">
        <TimelineList filter={filter} isGlass={isGlass} />
      </div>

      <div className="relative mt-2 text-center">
        <Link
          href="/hourly-updates"
          className="text-xs font-medium text-emerald-400 hover:underline"
        >
          View Full Timeline →
        </Link>
      </div>
    </div>
  );
}

function TimelineList({
  filter,
  isGlass,
}: {
  filter: string;
  isGlass?: boolean;
}) {
  const allowedTypes = filterMap[filter] ?? null;
  const filtered = allowedTypes
    ? todayTimeline.filter((e) => allowedTypes.includes(e.type))
    : todayTimeline;
  const previewEvents = filtered.slice(0, TIMELINE_PREVIEW_COUNT);

  return (
    <div>
      {previewEvents.map((event, index) => (
        <TimelineEntry
          key={event.id}
          event={event}
          isLast={index === previewEvents.length - 1}
          isGlass={isGlass}
        />
      ))}
    </div>
  );
}
