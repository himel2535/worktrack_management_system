"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { apiFetch } from "@/lib/api/client";
import { Users, Briefcase, Coffee, UserX, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface DashboardData {
  totalEmployees: number;
  working: number;
  onBreak: number;
  absent: number;
  attendancePercent: number;
  punctuality: number;
}

interface LiveStatus {
  user: { id: string; name: string; email: string; designation?: string };
  status: string;
  updatesSubmitted: number;
  checkInTime?: string;
}

export default function AdminDashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [liveStatus, setLiveStatus] = useState<LiveStatus[]>([]);
  const [alerts, setAlerts] = useState<{ name: string; missedCount: number }[]>([]);

  const load = () => {
    apiFetch<DashboardData>("/admin/dashboard").then(setDashboard).catch(console.error);
    apiFetch<LiveStatus[]>("/admin/live-status").then(setLiveStatus).catch(console.error);
    apiFetch<{ name: string; missedCount: number }[]>("/admin/alerts/missed-updates").then(setAlerts).catch(console.error);
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  const statusColor: Record<string, string> = {
    working: "text-emerald-400",
    on_break: "text-amber-400",
    checked_in: "text-blue-400",
    not_started: "text-white/40",
  };

  return (
    <div className="page-stack">
      <PageHeader title="Admin Dashboard" subtitle="Company-wide live status and overview" showClock />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Total Employees" value={dashboard?.totalEmployees ?? "—"} icon={Users} variant="glass" />
        <StatCard label="Working Now" value={dashboard?.working ?? "—"} icon={Briefcase} variant="glass" />
        <StatCard label="On Break" value={dashboard?.onBreak ?? "—"} icon={Coffee} variant="glass" />
        <StatCard label="Absent Today" value={dashboard?.absent ?? "—"} icon={UserX} variant="glass" />
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="panel-card">
          <h3 className="panel-title">Company Metrics</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div><p className="text-3xl font-bold text-emerald-400">{dashboard?.attendancePercent ?? 0}%</p><p className="text-sm text-white/50">Attendance</p></div>
            <div><p className="text-3xl font-bold text-emerald-400">{dashboard?.punctuality ?? 0}%</p><p className="text-sm text-white/50">Punctuality</p></div>
          </div>
        </div>
        <div className="panel-card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="panel-title mb-0">Missed Update Alerts</h3>
            <Link href="/admin/alerts"><Button variant="glass" size="sm">View All</Button></Link>
          </div>
          {alerts.length === 0 ? <p className="text-sm text-white/50">No alerts today</p> :
            alerts.slice(0, 3).map((a, i) => (
              <div key={i} className="flex items-center gap-2 py-2 border-b border-white/5 last:border-0">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span className="text-sm text-white">{a.name}</span>
                <span className="ml-auto text-xs text-red-400">{a.missedCount} missed</span>
              </div>
            ))}
        </div>
      </div>

      <div className="panel-card">
        <h3 className="panel-title">Live Employee Status</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-white/50 border-b border-white/10">
              <th className="py-2 text-left">Name</th><th className="py-2 text-left">Status</th>
              <th className="py-2 text-left">Check In</th><th className="py-2 text-left">Updates</th>
            </tr></thead>
            <tbody>
              {liveStatus.map((s) => (
                <tr key={s.user.id} className="border-b border-white/5">
                  <td className="py-2.5 text-white">{s.user.name}</td>
                  <td className={`py-2.5 capitalize ${statusColor[s.status] || "text-white/50"}`}>{s.status.replace("_", " ")}</td>
                  <td className="py-2.5 text-white/70">{s.checkInTime || "—"}</td>
                  <td className="py-2.5 text-white/70">{s.updatesSubmitted}/8</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
