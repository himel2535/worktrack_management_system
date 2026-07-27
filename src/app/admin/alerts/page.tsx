"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { apiFetch } from "@/lib/api/client";
import { AlertTriangle } from "lucide-react";

export default function AdminAlertsPage() {
  const [alerts, setAlerts] = useState<{ userId: string; name: string; email: string; missedCount: number; submittedCount: number }[]>([]);

  useEffect(() => {
    apiFetch<typeof alerts>("/admin/alerts/missed-updates").then(setAlerts).catch(console.error);
  }, []);

  return (
    <div className="page-stack">
      <PageHeader title="Missed Update Alerts" subtitle="Employees who missed hourly updates today" showClock />
      <div className="panel-card space-y-3">
        {alerts.length === 0 ? <p className="text-white/50">No red flags today 🎉</p> :
          alerts.map((a) => (
            <div key={a.userId} className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
              <AlertTriangle className="h-5 w-5 text-red-400 shrink-0" />
              <div>
                <p className="font-medium text-white">{a.name}</p>
                <p className="text-xs text-white/50">{a.email}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-red-400 font-bold">{a.missedCount} missed</p>
                <p className="text-xs text-white/50">{a.submittedCount} submitted</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
