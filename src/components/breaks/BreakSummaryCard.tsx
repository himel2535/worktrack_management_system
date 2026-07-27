"use client";

import { memo, useMemo } from "react";
import { DonutChart } from "@/components/charts/DonutChart";
import { useWorkTrackBreakTimer } from "@/context/WorkTrackTimerContext";
import { ActiveBreakState } from "@/context/WorkTrackContext";
import { BreakRecord } from "@/lib/types";

function formatHMS(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

interface BreakSummaryCardProps {
  breaks: BreakRecord[];
  activeBreak: ActiveBreakState | null;
}

export const BreakSummaryCard = memo(function BreakSummaryCard({
  breaks,
  activeBreak,
}: BreakSummaryCardProps) {
  const { activeBreakSeconds } = useWorkTrackBreakTimer();

  const totalBreakSecs = useMemo(() => {
    const logged = breaks.reduce((acc, b) => {
      const parts = b.duration.split(":").map(Number);
      if (parts.length === 3) return acc + parts[0] * 3600 + parts[1] * 60 + parts[2];
      return acc;
    }, 0);
    return logged + (activeBreak ? activeBreakSeconds : 0);
  }, [breaks, activeBreak, activeBreakSeconds]);

  const summaryData = useMemo(() => {
    const personal = breaks.filter((b) => b.type === "personal").length;
    const lunch = breaks.filter((b) => b.type === "lunch").length;
    const prayer = breaks.filter((b) => b.type === "prayer").length;
    const total = Math.max(1, personal + lunch + prayer);

    return [
      { name: "Personal", value: Math.round((personal / total) * 100) || 1, color: "#10B981" },
      { name: "Lunch", value: Math.round((lunch / total) * 100), color: "#F59E0B" },
      { name: "Prayer", value: Math.round((prayer / total) * 100), color: "#3B82F6" },
    ];
  }, [breaks]);

  return (
    <div className="panel-card border border-white/10 bg-[#0F172A]">
      <h3 className="panel-title text-emerald-400 mb-2">Today&apos;s Break Summary</h3>
      <DonutChart
        data={summaryData}
        centerValue={formatHMS(totalBreakSecs)}
        centerLabel="Total Break"
        height={180}
      />
    </div>
  );
});
