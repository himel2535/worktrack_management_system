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
    <>
      <PageHeader
        title="My Work"
        subtitle="Manage your work sessions, updates and productivity."
        showClock
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <CurrentWorkWidget />

          <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">Today&apos;s Hourly Updates</h3>
              <span className="text-sm text-slate-500">
                {completed} of {hourlyUpdates.length} updates completed
              </span>
            </div>
            <div className="space-y-4">
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
                    ? "bg-slate-50 text-slate-400"
                    : "bg-emerald-50 text-emerald-600";

                return (
                  <div key={update.id} className="flex gap-3 rounded-lg border border-slate-50 p-4">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconColor}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-slate-800">{update.title}</span>
                          <StatusBadge status={update.status} />
                          <PointsIndicator points={update.points} />
                        </div>
                        <span className="text-xs text-slate-400">{update.time}</span>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">{update.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-4">
          <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 font-semibold text-slate-800">Work Session Info</h3>
            <div className="space-y-3">
              {[
                { icon: FolderKanban, label: "Project", value: activeWorkSession.projectName },
                { icon: CheckSquare, label: "Task", value: activeWorkSession.taskName },
                { icon: Play, label: "Session Start", value: activeWorkSession.startedAt },
                { icon: Timer, label: "Work Session", value: activeWorkSession.totalWorkTime },
                { icon: Coffee, label: "Break Taken", value: activeWorkSession.breakTaken, color: "text-orange-600" },
                { icon: FileText, label: "Last Update", value: activeWorkSession.lastUpdateAt },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 text-sm">
                  <item.icon className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-500">{item.label}</span>
                  <span className={`ml-auto font-medium ${item.color || "text-slate-800"}`}>
                    {item.value}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 text-slate-400" />
                <span className="text-slate-500">Next Update Due</span>
                <span className="ml-auto font-medium text-orange-600">{formatTime(countdown)}</span>
              </div>
            </div>
            <ProgressBar value={activeWorkSession.updateProgress} className="mt-4" />
            <Button variant="outline" className="mt-4 w-full gap-2">
              <History className="h-4 w-4" />
              Session History
            </Button>
          </div>

          <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 font-semibold text-slate-800">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-auto flex-col gap-1 bg-emerald-600 py-4 hover:bg-emerald-700">
                <Play className="h-5 w-5" />
                <span className="text-xs">Start Work</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-1 border-orange-300 py-4 text-orange-600 hover:bg-orange-50">
                <Coffee className="h-5 w-5" />
                <span className="text-xs">Take Break</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-1 border-blue-300 py-4 text-blue-600 hover:bg-blue-50">
                <Send className="h-5 w-5" />
                <span className="text-xs">Submit Update</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-1 border-red-300 py-4 text-red-600 hover:bg-red-50">
                <Square className="h-5 w-5" />
                <span className="text-xs">Stop Work</span>
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">Today&apos;s Note</h3>
              <button className="text-xs text-emerald-600 hover:underline">Edit Note</button>
            </div>
            <Textarea
              defaultValue={todayNote.content}
              className="min-h-[100px] resize-none text-sm"
              readOnly
            />
            <p className="mt-2 text-xs text-slate-400">Created at {todayNote.createdAt}</p>
          </div>
        </div>
      </div>
    </>
  );
}
