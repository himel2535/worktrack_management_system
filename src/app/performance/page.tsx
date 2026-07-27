"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { GaugeChart } from "@/components/charts/GaugeChart";
import { DonutChart } from "@/components/charts/DonutChart";
import { Button } from "@/components/ui/button";
import { apiFetch, apiDownload } from "@/lib/api/client";
import { Shield, Briefcase, Zap, Star, Timer, Coffee, CheckSquare, Download } from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  Discipline: Shield,
  "Work Performance": Briefcase,
  Productivity: Zap,
  "Timely Updates": Star,
};

interface PerfData {
  overall: number;
  categories: { id: string; name: string; score: number; weight: number; color: string; description?: string; status?: string }[];
  points: { todayPoints: number; weekPoints: number; monthPoints: number; allTimePoints: number };
}

interface PointHistoryItem {
  _id: string; time: string; description: string; points: number; date: string;
}

export default function PerformancePage() {
  const [perf, setPerf] = useState<PerfData | null>(null);
  const [history, setHistory] = useState<PointHistoryItem[]>([]);

  useEffect(() => {
    apiFetch<PerfData>("/performance/me").then(setPerf).catch(console.error);
    apiFetch<PointHistoryItem[]>("/performance/points/history").then(setHistory).catch(console.error);
  }, []);

  const categories = perf?.categories.map((c) => ({
    ...c,
    status: c.score >= 80 ? "Excellent" : c.score >= 60 ? "Good" : "Needs Improvement",
    description: c.id === "discipline" ? "Attendance, punctuality, and break compliance"
      : c.id === "work" ? "Task completion and quality of work"
      : c.id === "productivity" ? "Active work time vs office time ratio"
      : "Hourly update submission rate",
  })) || [];

  const scoreBreakdown = categories.map((c) => ({ name: c.name, value: c.weight, color: c.color }));
  const points = perf?.points;

  return (
    <div className="page-stack">
      <PageHeader title="My Performance" subtitle="Track your performance and improve every day." showClock={false} />

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
        <div className="panel-card lg:col-span-4 flex flex-col items-center justify-center py-6">
          <GaugeChart score={perf?.overall ?? 0} />
          <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
            <div><p className="font-bold text-emerald-400">+{points?.todayPoints ?? 0}</p><p className="text-white/50">Today</p></div>
            <div><p className="font-bold text-emerald-400">+{points?.weekPoints ?? 0}</p><p className="text-white/50">Week</p></div>
            <div><p className="font-bold text-emerald-400">+{points?.monthPoints ?? 0}</p><p className="text-white/50">Month</p></div>
          </div>
        </div>

        {categories.slice(0, 4).map((cat) => {
          const Icon = categoryIcons[cat.name] || Star;
          return (
            <div key={cat.id} className="panel-card lg:col-span-2">
              <div className="mb-2 flex items-center gap-2">
                <div className="rounded-full p-2" style={{ backgroundColor: `${cat.color}20` }}>
                  <Icon className="h-4 w-4" style={{ color: cat.color }} />
                </div>
                <div>
                  <p className="text-sm text-white/50">{cat.name}</p>
                  <p className="text-xl font-bold text-white">{cat.score}/100</p>
                </div>
              </div>
              <p className="mb-1.5 text-xs font-medium" style={{ color: cat.color }}>{cat.status}</p>
              <ProgressBar value={cat.score} trackClassName="bg-white/10" />
              <p className="mt-1.5 text-xs text-white/50">{cat.description}</p>
            </div>
          );
        })}
      </div>

      <div className="panel-card">
        <h3 className="panel-title">Total Points</h3>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div><p className="text-2xl font-black text-emerald-400">+{points?.weekPoints ?? 0}</p><p className="text-sm text-white/50">This Week</p></div>
          <div><p className="text-2xl font-black text-emerald-400">+{points?.monthPoints ?? 0}</p><p className="text-sm text-white/50">This Month</p></div>
          <div><p className="text-2xl font-black text-emerald-400">+{points?.allTimePoints ?? 0}</p><p className="text-sm text-white/50">All Time</p></div>
        </div>
      </div>

      <div className="page-grid lg:grid-cols-2">
        <div className="panel-card">
          <h3 className="panel-title">Score Breakdown</h3>
          <DonutChart data={scoreBreakdown} centerLabel="Overall" centerValue={perf?.overall ?? 0} />
        </div>
        <div className="panel-card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="panel-title mb-0">Points History</h3>
            <Button variant="glass" size="sm" onClick={() => apiDownload("/reports/performance?format=xlsx", "performance.xlsx")}>
              <Download className="h-4 w-4 mr-1" /> Export
            </Button>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {history.map((h) => (
              <div key={h._id} className="flex items-center justify-between py-2 border-b border-white/5">
                <div>
                  <p className="text-sm text-white">{h.description}</p>
                  <p className="text-xs text-white/50">{h.date} · {h.time}</p>
                </div>
                <span className={`font-bold ${h.points >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {h.points >= 0 ? "+" : ""}{h.points}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
