"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminPanel } from "./AdminPanel";
import { AdminEmptyState } from "./AdminEmptyState";

interface AlertItem {
  userId?: string;
  name: string;
  missedCount: number;
  email?: string;
}

interface MissedAlertsWidgetProps {
  alerts: AlertItem[];
}

export function MissedAlertsWidget({ alerts }: MissedAlertsWidgetProps) {
  return (
    <AdminPanel
      title="Missed Update Alerts"
      action={
        <Link href="/admin/alerts">
          <Button variant="glass" size="sm">View All</Button>
        </Link>
      }
    >
      {alerts.length === 0 ? (
        <AdminEmptyState icon={AlertTriangle} message="No alerts today — great job!" />
      ) : (
        <div className="space-y-2">
          {alerts.slice(0, 5).map((a, i) => (
            <div
              key={a.userId ?? i}
              className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-3 py-2.5"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-red-400/30 bg-red-500/20 text-red-400">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{a.name}</p>
                {a.email && <p className="truncate text-xs text-white/45">{a.email}</p>}
              </div>
              <span className="shrink-0 text-sm font-bold text-red-400">{a.missedCount} missed</span>
            </div>
          ))}
        </div>
      )}
    </AdminPanel>
  );
}
