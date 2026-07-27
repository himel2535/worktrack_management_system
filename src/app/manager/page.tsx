"use client";

import { useEffect, useState } from "react";
import { AdminPageLayout } from "@/components/admin/AdminPageLayout";
import { AdminStatRow } from "@/components/admin/AdminStatRow";
import { StatCard } from "@/components/shared/StatCard";
import { TeamMetricsWidget } from "@/components/manager/TeamMetricsWidget";
import { TeamMemberWidget } from "@/components/manager/TeamMemberWidget";
import { TeamAlertsWidget } from "@/components/manager/TeamAlertsWidget";
import { ManagerQuickLinks } from "@/components/manager/ManagerQuickLinks";
import { apiFetch } from "@/lib/api/client";
import { Users, Briefcase, Coffee, ClipboardCheck, AlertTriangle } from "lucide-react";

interface Member {
  user: { id: string; name: string; email: string; designation?: string; avatar?: string };
  status: string;
  workTime: string;
  updatesSubmitted: number;
  updatesExpected: number;
  missedUpdates: number;
}

export default function ManagerDashboardPage() {
  const [data, setData] = useState<{ teamSize: number; members: Member[] } | null>(null);
  const [alerts, setAlerts] = useState<{ userId: string; name: string; missedCount: number }[]>([]);

  const load = () => {
    apiFetch<{ teamSize: number; members: Member[] }>("/manager/dashboard").then(setData).catch(console.error);
    apiFetch<typeof alerts>("/manager/alerts/missed-updates").then(setAlerts).catch(console.error);
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  const members = data?.members ?? [];
  const working = members.filter((m) => m.status === "working").length;
  const onBreak = members.filter((m) => m.status === "on_break").length;
  const onTrack = members.filter((m) => m.missedUpdates === 0).length;
  const totalMissed = members.reduce((s, m) => s + m.missedUpdates, 0);
  const teamSize = data?.teamSize ?? 0;
  const workingProgress = teamSize ? Math.round((working / teamSize) * 100) : 0;
  const trackPercent = teamSize ? Math.round((onTrack / teamSize) * 100) : 100;

  return (
    <AdminPageLayout
      title="Team Dashboard"
      subtitle="Your team's progress and status today"
      stats={
        <AdminStatRow>
          <StatCard variant="glass" label="Team Size" value={teamSize || "—"} subLabel="Active members" icon={Users} iconBg="bg-blue-50" />
          <StatCard variant="glass" label="Working Now" value={working} subLabel="Currently active" icon={Briefcase} iconBg="bg-emerald-50" progress={workingProgress} />
          <StatCard variant="glass" label="On Break" value={onBreak} subLabel="Break in progress" icon={Coffee} iconBg="bg-orange-50" valueColor={onBreak > 0 ? "text-amber-400" : "text-white"} />
          <StatCard variant="glass" label="On Track" value={`${onTrack}/${teamSize || 0}`} subLabel="No missed updates" icon={ClipboardCheck} iconBg="bg-emerald-50" progress={trackPercent} />
          <StatCard variant="glass" label="Missed Updates" value={totalMissed} subLabel={`${alerts.length} flagged`} icon={AlertTriangle} iconBg="bg-purple-50" valueColor={totalMissed > 0 ? "text-rose-400" : "text-emerald-400"} showGlobeDecoration />
        </AdminStatRow>
      }
    >
      <div className="grid grid-cols-12 items-start gap-3">
        <div className="page-col-stack col-span-12 lg:col-span-8">
          <TeamMetricsWidget members={members} />
          <TeamMemberWidget members={members} />
        </div>
        <div className="page-col-stack col-span-12 lg:col-span-4">
          <TeamAlertsWidget alerts={alerts} />
          <ManagerQuickLinks />
        </div>
      </div>
    </AdminPageLayout>
  );
}
