"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { CurrentWorkWidget } from "@/components/dashboard/CurrentWorkWidget";
import { GuidelinesCard } from "@/components/shared/GuidelinesCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { PointsIndicator } from "@/components/shared/PointsIndicator";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { activeWorkSession, todayNote } from "@/lib/mock-data/work-session";
import { hourlyUpdates } from "@/lib/mock-data/hourly-updates";
import {
  FolderKanban,
  CheckSquare,
  Clock,
  Timer,
  Coffee,
  FileText,
  Play,
  Send,
  Square,
  History,
} from "lucide-react";
import { FileText as FileIcon, AlertCircle, Clock3 } from "lucide-react";

function parseTime(time: string): number {
  const parts = time.split(":").map(Number);
  return parts[0] * 3600 + parts[1] * 60 + parts[2];
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

const quickActionTones = {
  emerald:
    "border-emerald-400/35 bg-emerald-400/30 hover:bg-emerald-600/55 hover:border-emerald-400/50",
  amber:
    "border-amber-400/35 bg-amber-400/30 hover:bg-amber-600/55 hover:border-amber-400/50",
  sky: "border-sky-400/35 bg-sky-400/30 hover:bg-blue-600/55 hover:border-sky-400/50",
  rose: "border-rose-400/35 bg-rose-400/30 hover:bg-red-600/55 hover:border-rose-400/50",
} as const;

const quickActions = [
  { label: "Start Work", icon: Play, tone: "emerald" as const },
  { label: "Take Break", icon: Coffee, tone: "amber" as const },
  { label: "Submit Update", icon: Send, tone: "sky" as const },
  { label: "Stop Work", icon: Square, tone: "rose" as const },
];

export default function MyWorkPage() {
  const [countdown, setCountdown] = useState(parseTime(activeWorkSession.nextUpdateDueIn));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const completed = hourlyUpdates.filter((u) => u.status === "on_time").length;

  return (
    <div className="page-stack">
      <PageHeader
        title="My Work"
        subtitle="Manage your work sessions, updates and productivity."
        showClock
      />

      <div className="page-grid lg:grid-cols-12">
        <div className="page-col-stack lg:col-span-8">
          <CurrentWorkWidget />

          <div className="panel-card">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="panel-title mb-0">Today&apos;s Hourly Updates</h3>
              <span className="text-sm text-white/50">
                {completed} of {hourlyUpdates.length} updates completed
              </span>
            </div>
            <div className="space-y-2">
              {hourlyUpdates.map((update) => {
                const Icon =
                  update.status === "missed"
                    ? AlertCircle
                    : update.status === "upcoming"
                    ? Clock3
                    : FileIcon;
                const iconColor =
                  update.status === "missed"
                    ? "bg-red-50 text-red-600"
                    : update.status === "upcoming"
                    ? "bg-white/5 text-white/40"
                    : "bg-emerald-50 text-emerald-600";

                return (
                  <div key={update.id} className="flex gap-2 rounded-lg border border-white/10 p-3">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconColor}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white">{update.title}</span>
                          <StatusBadge status={update.status} />
                          <PointsIndicator points={update.points} />
                        </div>
                        <span className="text-xs text-white/40">{update.time}</span>
                      </div>
                      <p className="mt-0.5 text-sm text-white/50">{update.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="page-col-stack lg:col-span-4">
          <div className="panel-card">
            <h3 className="panel-title">Work Session Info</h3>
            <div className="space-y-2">
              {[
                { icon: FolderKanban, label: "Project", value: activeWorkSession.projectName },
                { icon: CheckSquare, label: "Task", value: activeWorkSession.taskName },
                { icon: Play, label: "Session Start", value: activeWorkSession.startedAt },
                { icon: Timer, label: "Work Session", value: activeWorkSession.totalWorkTime },
                { icon: Coffee, label: "Break Taken", value: activeWorkSession.breakTaken, color: "text-orange-600" },
                { icon: FileText, label: "Last Update", value: activeWorkSession.lastUpdateAt },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm">
                  <item.icon className="h-4 w-4 text-white/40" />
                  <span className="text-white/50">{item.label}</span>
                  <span className={`ml-auto font-medium ${item.color || "text-white"}`}>
                    {item.value}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-white/40" />
                <span className="text-white/50">Next Update Due</span>
                <span className="ml-auto font-medium text-orange-600">{formatTime(countdown)}</span>
              </div>
            </div>
            <ProgressBar value={activeWorkSession.updateProgress} className="mt-2" />
            <Button variant="glass" className="mt-2 w-full gap-2">
              <History className="h-4 w-4" />
              Session History
            </Button>
          </div>

          <div className="panel-card">
            <h3 className="panel-title">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map(({ label, icon: Icon, tone }) => (
                <Button
                  key={label}
                  className={`h-auto flex-col gap-1 rounded-2xl border py-3 text-white transition-colors hover:text-white focus-visible:ring-white/20 ${quickActionTones[tone]}`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs">{label}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="panel-card">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="panel-title mb-0">Today&apos;s Note</h3>
              <button className="text-xs text-emerald-600 hover:underline">Edit Note</button>
            </div>
            <Textarea
              defaultValue={todayNote.content}
              className="min-h-[80px] resize-none text-sm"
              readOnly
            />
            <p className="mt-1.5 text-xs text-white/40">Created at {todayNote.createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
