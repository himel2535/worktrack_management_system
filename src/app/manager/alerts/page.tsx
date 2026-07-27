"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { apiFetch } from "@/lib/api/client";
import { AlertTriangle } from "lucide-react";

export default function ManagerAlertsPage() {
  const [alerts, setAlerts] = useState<{ userId: string; name: string; missedCount: number }[]>([]);
  useEffect(() => { apiFetch<typeof alerts>("/manager/alerts/missed-updates").then(setAlerts).catch(console.error); }, []);

  return (
    <div className="page-stack">
      <PageHeader title="Team Alerts" subtitle="Team members who missed updates" showClock />
      <div className="panel-card space-y-3">
        {alerts.length === 0 ? <p className="text-white/50">All team members on track!</p> :
          alerts.map((a) => (
            <div key={a.userId} className="flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              <span className="text-white">{a.name}</span>
              <span className="ml-auto text-amber-400 font-bold">{a.missedCount} missed</span>
            </div>
          ))}
      </div>
    </div>
  );
}
