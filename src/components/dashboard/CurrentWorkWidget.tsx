"use client";

import { useEffect, useState } from "react";
import { Monitor, Pencil, Coffee, Play, Pause, AlarmClock } from "lucide-react";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { useWorkTrack } from "@/context/WorkTrackContext";
import { useWorkTrackWorkTimer } from "@/context/WorkTrackTimerContext";
import { cn } from "@/lib/utils";

const actionButtonBase =
  "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5";

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
  const {
    startWorkSession,
    pauseWorkSession,
    openBreakModal,
    openHourlyUpdateModal,
    activeBreak,
  } = useWorkTrack();
  const { workSession, isWorkTimerRunning, activeWorkSeconds } = useWorkTrackWorkTimer();

  const [countdown, setCountdown] = useState(1338); // 22:18 countdown

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isWorkTimerRunning && !activeBreak) {
      interval = setInterval(() => {
        setCountdown((t) => (t > 0 ? t - 1 : 3600));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isWorkTimerRunning, activeBreak]);

  const elapsedMinutes = Math.floor((3600 - countdown) / 60);
  const updateProgress = Math.min(100, Math.round(((3600 - countdown) / 3600) * 100));

  return (
    <div className="panel-card">
      <div className="mb-2 flex items-center justify-between">
        <h3 className={cn(isGlass ? "panel-title-glass mb-0" : "panel-title mb-0")}>
          Current Work
        </h3>
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "h-2 w-2 rounded-full",
              activeBreak
                ? "bg-amber-400 animate-pulse"
                : isWorkTimerRunning
                ? "bg-emerald-500 animate-pulse"
                : "bg-slate-500"
            )}
          />
          <span
            className={cn(
              "text-sm font-medium",
              activeBreak
                ? "text-amber-400"
                : isWorkTimerRunning
                ? "text-emerald-400"
                : "text-slate-400"
            )}
          >
            {activeBreak ? "On Break" : isWorkTimerRunning ? "Working" : "Paused"}
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
              {workSession.projectName}
            </p>
            <p className="text-sm">
              <span className={isGlass ? "text-white/50" : "text-slate-500"}>
                Task:{" "}
              </span>
              <span className="font-semibold text-emerald-400">
                {workSession.taskName}
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
                  {workSession.startedAt}
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
                  {workSession.estimatedEnd}
                </p>
              </div>
            </div>
          </div>
        </div>

        <UiPreviewThumbnail />

        <div className="shrink-0 text-right">
          <p className="text-3xl font-bold tabular-nums text-emerald-400">
            {formatTime(activeWorkSeconds)}
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
            Since {workSession.startedAt}
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
              value={updateProgress}
              className="h-full w-full"
              trackClassName={isGlass ? "bg-white/10 ring-0" : undefined}
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
          onClick={openHourlyUpdateModal}
          className={`${actionButtonBase} bg-emerald-950/90 text-emerald-300 border-emerald-800/80 shadow-[inset_0_-2px_0_0_#059669] hover:bg-emerald-900 hover:border-emerald-700`}
        >
          <Pencil className="h-4 w-4 text-emerald-300" />
          Submit Update
        </button>
        <button
          type="button"
          onClick={openBreakModal}
          className={`${actionButtonBase} bg-amber-950/90 text-amber-300 border-amber-800/80 shadow-[inset_0_-2px_0_0_#D97706] hover:bg-amber-900 hover:border-amber-700`}
        >
          <Coffee className="h-4 w-4 text-amber-300" />
          Take Break
        </button>
        {isWorkTimerRunning ? (
          <button
            type="button"
            onClick={() => pauseWorkSession()}
            className={`${actionButtonBase} bg-red-950/90 text-red-300 border-red-800/80 shadow-[inset_0_-2px_0_0_#DC2626] hover:bg-red-900 hover:border-red-700`}
          >
            <Pause className="h-4 w-4 text-red-300" />
            Pause Work
          </button>
        ) : (
          <button
            type="button"
            onClick={() => startWorkSession()}
            className={`${actionButtonBase} bg-emerald-950/90 text-emerald-300 border-emerald-800/80 shadow-[inset_0_-2px_0_0_#059669] hover:bg-emerald-900 hover:border-emerald-700`}
          >
            <Play className="h-4 w-4 fill-emerald-300 text-emerald-300" />
            Resume Work
          </button>
        )}
      </div>
    </div>
  );
}
