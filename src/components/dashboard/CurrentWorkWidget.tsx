"use client";

import { useEffect, useState } from "react";
import { Monitor, Pencil, Coffee, Square, AlarmClock } from "lucide-react";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { activeWorkSession } from "@/lib/mock-data/work-session";
import { cn } from "@/lib/utils";

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

function UiPreviewThumbnail() {
  return (
    <div className="hidden shrink-0 rotate-3 rounded-lg border border-white/20 bg-white/10 p-2 shadow-lg sm:block">
      <div className="space-y-1.5">
        <div className="h-1.5 w-16 rounded bg-white/30" />
        <div className="h-1 w-12 rounded bg-emerald-400/50" />
        <div className="h-1 w-14 rounded bg-white/20" />
        <div className="mt-2 grid grid-cols-3 gap-1">
          <div className="h-4 rounded bg-white/10" />
          <div className="h-4 rounded bg-white/10" />
          <div className="h-4 rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}

interface CurrentWorkWidgetProps {
  theme?: "light" | "glass";
}

export function CurrentWorkWidget({ theme = "glass" }: CurrentWorkWidgetProps) {
  const isGlass = theme === "glass";
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
    <div className={cn("panel-card", isGlass && "p-1")}>
      <div className="mb-2 flex items-center justify-between">
        <h3 className={cn(isGlass ? "panel-title-glass mb-0" : "panel-title mb-0")}>
          Current Work
        </h3>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span
            className={cn(
              "text-sm font-medium",
              isGlass ? "text-emerald-400" : "text-emerald-600"
            )}
          >
            Working
          </span>
        </div>
      </div>

      <div
        className={cn(
          "mb-2 flex items-center justify-between gap-3 rounded-xl px-3 py-3",
          isGlass
            ? "glass-card-inner bg-emerald-500/10"
            : "bg-emerald-50/80"
        )}
      >
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#004D2C]">
            <Monitor className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0">
            <p
              className={cn(
                "text-base font-semibold",
                isGlass ? "text-white" : "text-slate-900"
              )}
            >
              {activeWorkSession.projectName}
            </p>
            <p className="text-sm">
              <span className={isGlass ? "text-white/50" : "text-slate-500"}>
                Task:{" "}
              </span>
              <span className="font-semibold text-emerald-400">
                {activeWorkSession.taskName}
              </span>
            </p>
            <div
              className={cn(
                "mt-2 flex gap-4 border-t pt-2",
                isGlass ? "border-white/10" : "border-emerald-100/80"
              )}
            >
              <div>
                <p className={cn("text-[11px]", isGlass ? "text-white/50" : "text-slate-500")}>
                  Started at:
                </p>
                <p
                  className={cn(
                    "text-sm font-semibold",
                    isGlass ? "text-white" : "text-slate-800"
                  )}
                >
                  {activeWorkSession.startedAt}
                </p>
              </div>
              <div
                className={cn(
                  "w-px",
                  isGlass ? "bg-white/20" : "bg-emerald-200"
                )}
              />
              <div>
                <p className={cn("text-[11px]", isGlass ? "text-white/50" : "text-slate-500")}>
                  Estimated End:
                </p>
                <p
                  className={cn(
                    "text-sm font-semibold",
                    isGlass ? "text-white" : "text-slate-800"
                  )}
                >
                  {activeWorkSession.estimatedEnd}
                </p>
              </div>
            </div>
          </div>
        </div>

        <UiPreviewThumbnail />

        <div className="shrink-0 text-right">
          <p className="text-3xl font-bold tabular-nums text-emerald-400">
            {formatTime(workTime)}
          </p>
          <p className={cn("text-xs", isGlass ? "text-white/50" : "text-slate-500")}>
            Working Time
          </p>
          <span
            className={cn(
              "mt-0.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
              isGlass
                ? "bg-white/10 text-emerald-300"
                : "bg-white/70 text-emerald-700"
            )}
          >
            Since {activeWorkSession.startedAt}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "mb-2 flex items-center justify-between gap-4 rounded-xl px-3 py-2.5",
          isGlass ? "glass-card-inner" : "bg-slate-50"
        )}
      >
        <div className="flex items-center gap-2.5">
          <AlarmClock className="h-4 w-4 shrink-0 text-emerald-400" />
          <div>
            <p className={cn("text-sm", isGlass ? "text-white/60" : "text-slate-600")}>
              Next Update Due In
            </p>
            <p className="text-xl font-bold tabular-nums text-emerald-400">
              {formatTime(countdown)}
            </p>
          </div>
        </div>

        <div className="max-w-[220px] flex-1">
          <div className="h-2">
            <ProgressBar
              value={activeWorkSession.updateProgress}
              className="h-full w-full"
              barClassName="bg-[#059669]"
              trackClassName={isGlass ? "bg-white/10" : undefined}
            />
          </div>
          <p
            className={cn(
              "mt-1 text-right text-[11px]",
              isGlass ? "text-white/45" : "text-slate-500"
            )}
          >
            {elapsedMinutes} min elapsed of 60 min
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#059669] py-2.5 text-sm font-medium text-white hover:bg-[#047857]"
        >
          <Pencil className="h-4 w-4" />
          Submit Update
        </button>
        <button
          type="button"
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-lg border border-orange-300 py-2.5 text-sm font-medium text-orange-400 hover:bg-orange-500/10",
            isGlass ? "bg-transparent" : "bg-white hover:bg-orange-50"
          )}
        >
          <Coffee className="h-4 w-4" />
          Take Break
        </button>
        <button
          type="button"
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-300 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10",
            isGlass ? "bg-transparent" : "bg-white hover:bg-red-50"
          )}
        >
          <Square className="h-4 w-4" />
          Stop Work
        </button>
      </div>
    </div>
  );
}
