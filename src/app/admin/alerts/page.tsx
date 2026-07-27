"use client";

import { useEffect, useState } from "react";
import { AdminPageLayout } from "@/components/admin/AdminPageLayout";
import { AdminStatRow } from "@/components/admin/AdminStatRow";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { StatCard } from "@/components/shared/StatCard";
import { apiFetch } from "@/lib/api/client";
import { AlertTriangle, Users, CheckCircle, XCircle } from "lucide-react";

export default function AdminAlertsPage() {
  const [alerts, setAlerts] = useState<{ userId: string; name: string; email: string; missedCount: number; submittedCount: number }[]>([]);

  useEffect(() => {
    apiFetch<typeof alerts>("/admin/alerts/missed-updates").then(setAlerts).catch(console.error);
  }, []);

  const totalMissed = alerts.reduce((sum, a) => sum + a.missedCount, 0);

  return (
    <AdminPageLayout
      title="Missed Update Alerts"
      subtitle="Employees who missed hourly updates today"
      stats={
        <AdminStatRow>
          <StatCard variant="glass" label="Flagged" value={alerts.length} subLabel="Employees with alerts" icon={Users} iconBg="bg-orange-50" valueColor={alerts.length > 0 ? "text-amber-400" : "text-white"} />
          <StatCard variant="glass" label="Total Missed" value={totalMissed} subLabel="Missed updates today" icon={XCircle} iconBg="bg-purple-50" valueColor={totalMissed > 0 ? "text-rose-400" : "text-white"} />
          <StatCard variant="glass" label="Submitted" value={alerts.reduce((s, a) => s + a.submittedCount, 0)} subLabel="Updates submitted" icon={CheckCircle} iconBg="bg-emerald-50" />
          <StatCard variant="glass" label="Alert Rate" value={alerts.length ? `${Math.round((alerts.length / (alerts.length + 1)) * 100)}%` : "0%"} subLabel="Team flagged" icon={AlertTriangle} iconBg="bg-blue-50" />
          <StatCard variant="glass" label="Status" value={alerts.length === 0 ? "Clear" : "Review"} subLabel={alerts.length === 0 ? "All on track" : "Action needed"} icon={AlertTriangle} iconBg="bg-emerald-50" valueColor={alerts.length === 0 ? "text-emerald-400" : "text-amber-400"} showGlobeDecoration />
        </AdminStatRow>
      }
    >
      <AdminPanel title={`Alerts (${alerts.length})`}>
        {alerts.length === 0 ? (
          <AdminEmptyState icon={CheckCircle} message="No red flags today — everyone is on track!" />
        ) : (
          <div className="space-y-2">
            {alerts.map((a) => (
              <div
                key={a.userId}
                className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-400/30 bg-red-500/20 text-red-400">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-white">{a.name}</p>
                  <p className="text-xs text-white/50">{a.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-red-400">{a.missedCount}</p>
                  <p className="text-xs text-white/45">missed · {a.submittedCount} submitted</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminPanel>
    </AdminPageLayout>
  );
}
