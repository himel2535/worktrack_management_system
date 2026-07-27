"use client";

import { useEffect, useState } from "react";
import { AdminPageLayout } from "@/components/admin/AdminPageLayout";
import { AdminStatRow } from "@/components/admin/AdminStatRow";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { StatCard } from "@/components/shared/StatCard";
import { apiFetch } from "@/lib/api/client";
import { AlertTriangle, Users, CheckCircle, XCircle } from "lucide-react";

export default function ManagerAlertsPage() {
  const [alerts, setAlerts] = useState<{ userId: string; name: string; missedCount: number }[]>([]);

  useEffect(() => {
    apiFetch<typeof alerts>("/manager/alerts/missed-updates").then(setAlerts).catch(console.error);
  }, []);

  const totalMissed = alerts.reduce((sum, a) => sum + a.missedCount, 0);

  return (
    <AdminPageLayout
      title="Team Alerts"
      subtitle="Team members who missed hourly updates today"
      stats={
        <AdminStatRow>
          <StatCard variant="glass" label="Flagged" value={alerts.length} subLabel="Team members" icon={Users} iconBg="bg-orange-50" valueColor={alerts.length > 0 ? "text-amber-400" : "text-white"} />
          <StatCard variant="glass" label="Total Missed" value={totalMissed} subLabel="Missed updates" icon={XCircle} iconBg="bg-purple-50" valueColor={totalMissed > 0 ? "text-rose-400" : "text-white"} />
          <StatCard variant="glass" label="Status" value={alerts.length === 0 ? "Clear" : "Review"} subLabel={alerts.length === 0 ? "Team on track" : "Needs attention"} icon={AlertTriangle} iconBg="bg-blue-50" valueColor={alerts.length === 0 ? "text-emerald-400" : "text-amber-400"} />
          <StatCard variant="glass" label="Avg Missed" value={alerts.length ? (totalMissed / alerts.length).toFixed(1) : "0"} subLabel="Per flagged member" icon={AlertTriangle} iconBg="bg-emerald-50" />
          <StatCard variant="glass" label="Health" value={alerts.length === 0 ? "100%" : `${Math.max(0, 100 - alerts.length * 10)}%`} subLabel="Team update health" icon={CheckCircle} iconBg="bg-emerald-50" showGlobeDecoration />
        </AdminStatRow>
      }
    >
      <AdminPanel title={`Team Alerts (${alerts.length})`}>
        {alerts.length === 0 ? (
          <AdminEmptyState icon={CheckCircle} message="All team members are on track today!" />
        ) : (
          <div className="space-y-2">
            {alerts.map((a) => (
              <div key={a.userId} className="flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-500/20 text-amber-400">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <p className="min-w-0 flex-1 font-medium text-white">{a.name}</p>
                <span className="text-lg font-bold text-amber-400">{a.missedCount} missed</span>
              </div>
            ))}
          </div>
        )}
      </AdminPanel>
    </AdminPageLayout>
  );
}
