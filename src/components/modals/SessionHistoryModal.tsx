"use client";

import React from "react";
import { useWorkTrack } from "@/context/WorkTrackContext";
import { useWorkTrackWorkTimer } from "@/context/WorkTrackTimerContext";
import { X, Clock, Coffee, FileText, Play, CheckCircle } from "lucide-react";

const eventIcons: Record<string, React.ElementType> = {
  present: CheckCircle,
  work_start: Play,
  update: FileText,
  break_start: Coffee,
  break_end: Coffee,
  missed: FileText,
};

export function SessionHistoryModal() {
  const { isSessionHistoryModalOpen, closeSessionHistoryModal, timeline, breaks } =
    useWorkTrack();
  const { workSession } = useWorkTrackWorkTimer();

  if (!isSessionHistoryModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="flex max-h-[85vh] w-full max-w-lg flex-col rounded-2xl border border-emerald-500/30 bg-[#0F172A] shadow-[0_0_50px_rgba(16,185,129,0.15)] text-white">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h2 className="text-lg font-bold text-emerald-400">Session History</h2>
          <button
            type="button"
            onClick={closeSessionHistoryModal}
            className="rounded-lg p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-4">
          <div className="mb-4 rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
              Current Session
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-white/50">Project</span>
                <p className="font-medium text-white">{workSession.projectName}</p>
              </div>
              <div>
                <span className="text-white/50">Task</span>
                <p className="font-medium text-white">{workSession.taskName}</p>
              </div>
              <div>
                <span className="text-white/50">Started</span>
                <p className="font-medium text-white">{workSession.startedAt}</p>
              </div>
              <div>
                <span className="text-white/50">Work Time</span>
                <p className="font-medium text-emerald-400">{workSession.totalWorkTime}</p>
              </div>
            </div>
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/50">
            Today&apos;s Timeline
          </p>
          <div className="space-y-2">
            {timeline.map((event) => {
              const Icon = eventIcons[event.type] || Clock;
              return (
                <div
                  key={event.id}
                  className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                    <Icon className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-white">{event.title}</p>
                      <span className="shrink-0 text-xs text-white/40">{event.time}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-white/50">{event.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {breaks.length > 0 && (
            <>
              <p className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wide text-white/50">
                Breaks Taken
              </p>
              <div className="space-y-1.5">
                {breaks.map((brk) => (
                  <div
                    key={brk.id}
                    className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2 text-sm"
                  >
                    <div>
                      <span className="font-medium capitalize text-white">{brk.type}</span>
                      {brk.reason && (
                        <span className="ml-2 text-white/40">{brk.reason}</span>
                      )}
                    </div>
                    <span className="text-white/50">{brk.duration}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="border-t border-white/10 px-6 py-3">
          <button
            type="button"
            onClick={closeSessionHistoryModal}
            className="w-full rounded-xl border border-white/15 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
