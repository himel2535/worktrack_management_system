"use client";

import { useEffect, useState } from "react";
import { Code, Send, Coffee, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { activeWorkSession } from "@/lib/mock-data/work-session";

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

export function CurrentWorkWidget() {
  const [workTime, setWorkTime] = useState(
    parseTime(activeWorkSession.totalWorkTime)
  );
  const [countdown, setCountdown] = useState(
    parseTime(activeWorkSession.nextUpdateDueIn)
  );

  const elapsedMinutes = Math.round(
    (activeWorkSession.updateProgress / 100) * 60
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setWorkTime((t) => t + 1);
      setCountdown((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-2xl border border-slate-100/80 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-800">Current Work</h3>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          <span className="text-sm font-medium text-emerald-600">Working</span>
        </div>
      </div>

      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
          <Code className="h-6 w-6 text-emerald-600" />
        </div>
        <div>
          <p className="font-semibold text-slate-800">
            {activeWorkSession.projectName}
          </p>
          <p className="text-sm text-slate-500">{activeWorkSession.taskName}</p>
        </div>
      </div>

      <div className="mb-6 text-center">
        <p className="text-5xl font-bold tracking-wider text-emerald-600">
          {formatTime(workTime)}
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Since {activeWorkSession.startedAt}
        </p>
      </div>

      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-slate-700">
            Next Update Due In{" "}
            <span className="text-orange-500">{formatTime(countdown)}</span>
          </span>
        </div>
        <ProgressBar value={activeWorkSession.updateProgress} />
        <p className="mt-1.5 text-xs text-slate-400">
          {elapsedMinutes} min elapsed of 60 min
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button className="flex-1 gap-2 bg-[#059669] py-5 text-white hover:bg-[#047857]">
          <Send className="h-4 w-4" />
          Submit Update
        </Button>
        <Button className="flex-1 gap-2 border border-amber-200 bg-amber-50 py-5 text-amber-700 hover:bg-amber-100">
          <Coffee className="h-4 w-4" />
          Take Break
        </Button>
        <Button
          variant="outline"
          className="flex-1 gap-2 border-red-300 bg-white py-5 text-red-600 hover:bg-red-50"
        >
          <Square className="h-4 w-4" />
          Stop Work
        </Button>
      </div>
    </div>
  );
}
