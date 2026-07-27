"use client";

import { useWorkTrackBreakTimer } from "@/context/WorkTrackTimerContext";
import { ActiveBreakState } from "@/context/WorkTrackContext";
import { Button } from "@/components/ui/button";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Coffee } from "lucide-react";

function formatHMS(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

interface ActiveBreakPanelProps {
  activeBreak: ActiveBreakState;
  onEndBreak: () => void;
}

export function ActiveBreakPanel({ activeBreak, onEndBreak }: ActiveBreakPanelProps) {
  const { activeBreakSeconds } = useWorkTrackBreakTimer();

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full border border-amber-500/30 bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 animate-pulse">
          BREAK IN PROGRESS
        </span>
        <span className="text-xs text-white/50">Started: {activeBreak.startTime}</span>
      </div>
      <div className="flex items-center gap-4 py-2">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-500/40 bg-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
          <Coffee className="h-7 w-7 text-amber-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white capitalize">{activeBreak.type} Break</h3>
          <p className="text-3xl font-extrabold text-amber-400 tabular-nums my-1">
            {formatHMS(activeBreakSeconds)}
          </p>
          <p className="text-xs text-white/50">{activeBreak.reason || "Taking a short rest..."}</p>
        </div>
      </div>
      <Button
        onClick={onEndBreak}
        className="mt-4 w-full bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-900 shadow-[0_0_20px_rgba(16,185,129,0.3)] font-bold py-3 rounded-xl"
      >
        End Break Now
      </Button>
    </>
  );
}

interface OngoingBreakRowProps {
  activeBreak: ActiveBreakState;
}

export function OngoingBreakRow({ activeBreak }: OngoingBreakRowProps) {
  const { activeBreakSeconds } = useWorkTrackBreakTimer();

  return (
    <TableRow className="bg-amber-950/60 border-l-2 border-l-amber-500">
      <TableCell className="text-sm text-white">{activeBreak.startTime}</TableCell>
      <TableCell className="text-sm text-amber-400 font-bold">(Ongoing)</TableCell>
      <TableCell className="text-sm capitalize text-amber-300 font-medium">{activeBreak.type}</TableCell>
      <TableCell className="text-sm font-bold text-amber-400">{formatHMS(activeBreakSeconds)}</TableCell>
      <TableCell className="text-sm text-white/60">{activeBreak.reason || "-"}</TableCell>
    </TableRow>
  );
}
