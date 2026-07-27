"use client";

import { useEffect, useState } from "react";
import { StatCard } from "@/components/shared/StatCard";
import { AdminPageLayout } from "@/components/admin/AdminPageLayout";
import { AdminStatRow } from "@/components/admin/AdminStatRow";
import { CompanyMetricsWidget } from "@/components/admin/CompanyMetricsWidget";
import { LiveStatusWidget } from "@/components/admin/LiveStatusWidget";
import { MissedAlertsWidget } from "@/components/admin/MissedAlertsWidget";
import { AdminQuickLinks } from "@/components/admin/AdminQuickLinks";
import { apiFetch } from "@/lib/api/client";
import { Users, Briefcase, Coffee, UserX, CalendarCheck } from "lucide-react";

interface DashboardData {
  totalEmployees: number;
  working: number;
  onBreak: number;
  absent: number;
  notStarted: number;
  attendancePercent: number;
  punctuality: number;
}

interface LiveStatus {
  user: { id: string; name: string; email: string; designation?: string; avatar?: string };
  status: string;
  updatesSubmitted: number;
  checkInTime?: string;
}

export default function AdminDashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [liveStatus, setLiveStatus] = useState<LiveStatus[]>([]);
  const [alerts, setAlerts] = useState<{ userId: string; name: string; email: string; missedCount: number }[]>([]);

  const load = () => {
    apiFetch<DashboardData>("/admin/dashboard").then(setDashboard).catch(console.error);
    apiFetch<LiveStatus[]>("/admin/live-status").then(setLiveStatus).catch(console.error);
    apiFetch<typeof alerts>("/admin/alerts/missed-updates").then(setAlerts).catch(console.error);
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  const total = dashboard?.totalEmployees ?? 0;
  const workingProgress = total ? Math.round(((dashboard?.working ?? 0) / total) * 100) : 0;

  return (
    <AdminPageLayout
      stats={
        <AdminStatRow>
          <StatCard
            variant="glass"
            label="Total Employees"
            value={dashboard?.totalEmployees ?? "—"}
            subLabel="Active workforce"
            icon={Users}
            iconBg="bg-blue-50"
          />
          <StatCard
            variant="glass"
            label="Working Now"
            value={dashboard?.working ?? "—"}
            subLabel="Currently active"
            icon={Briefcase}
            iconBg="bg-emerald-50"
            progress={workingProgress}
          />
          <StatCard
            variant="glass"
            label="On Break"
            value={dashboard?.onBreak ?? "—"}
            subLabel="Break in progress"
            icon={Coffee}
            iconBg="bg-orange-50"
            valueColor={(dashboard?.onBreak ?? 0) > 0 ? "text-amber-400" : "text-white"}
          />
          <StatCard
            variant="glass"
            label="Absent Today"
            value={dashboard?.absent ?? "—"}
            subLabel="Not checked in"
            icon={UserX}
            iconBg="bg-purple-50"
            valueColor={(dashboard?.absent ?? 0) > 0 ? "text-rose-400" : "text-white"}
          />
          <StatCard
            variant="glass"
            label="Attendance"
            value={`${dashboard?.attendancePercent ?? 0}%`}
            subLabel={`Punctuality ${dashboard?.punctuality ?? 0}%`}
            icon={CalendarCheck}
            iconBg="bg-emerald-50"
            progress={dashboard?.attendancePercent ?? 0}
            showGlobeDecoration
          />
        </AdminStatRow>
      }
    >
      <div className="grid grid-cols-12 items-start gap-3">
        <div className="page-col-stack col-span-12 lg:col-span-8">
          <CompanyMetricsWidget
            working={dashboard?.working ?? 0}
            onBreak={dashboard?.onBreak ?? 0}
            absent={dashboard?.absent ?? 0}
            notStarted={dashboard?.notStarted ?? 0}
            totalEmployees={dashboard?.totalEmployees ?? 0}
            attendancePercent={dashboard?.attendancePercent ?? 0}
            punctuality={dashboard?.punctuality ?? 0}
          />
          <LiveStatusWidget items={liveStatus} />
        </div>
        <div className="page-col-stack col-span-12 lg:col-span-4">
          <MissedAlertsWidget alerts={alerts} />
          <AdminQuickLinks />
        </div>
      </div>
    </AdminPageLayout>
  );
}
