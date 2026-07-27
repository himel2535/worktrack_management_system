"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";

interface TeamAlert {
  userId: string;
  name: string;
  missedCount: number;
}

interface TeamAlertsWidgetProps {
  alerts: TeamAlert[];
}

export function TeamAlertsWidget({ alerts }: TeamAlertsWidgetProps) {
  return (
    <AdminPanel
      title="Team Alerts"
      action={
        <Link href="/manager/alerts">
          <Button variant="glass" size="sm">View All</Button>
        </Link>
      }
    >
      {alerts.length === 0 ? (
        <AdminEmptyState icon={AlertTriangle} message="All team members on track!" />
      ) : (
        <div className="space-y-2">
          {alerts.slice(0, 5).map((a) => (
            <div
              key={a.userId}
              className="flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 px-3 py-2.5"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-amber-400/30 bg-amber-500/20 text-amber-400">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <p className="min-w-0 flex-1 truncate text-sm font-medium text-white">{a.name}</p>
              <span className="shrink-0 text-sm font-bold text-amber-400">{a.missedCount} missed</span>
            </div>
          ))}
        </div>
      )}
    </AdminPanel>
  );
}
