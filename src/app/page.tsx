import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/shared/StatCard";
import { CurrentWorkWidget } from "@/components/dashboard/CurrentWorkWidget";
import dynamic from "next/dynamic";

const TodaySummary = dynamic(() => import("@/components/dashboard/TodaySummary").then((mod) => mod.TodaySummary));
const TodayTimeline = dynamic(() => import("@/components/dashboard/TodayTimeline").then((mod) => mod.TodayTimeline));
const MyTasksWidget = dynamic(() => import("@/components/dashboard/MyTasksWidget").then((mod) => mod.MyTasksWidget));
import { dashboardStats } from "@/lib/mock-data/work-session";
import { Timer, Coffee, ClipboardCheck, Star, CalendarCheck } from "lucide-react";

const hourlyProgress = Math.round(
  (dashboardStats.hourlyUpdates.completed / dashboardStats.hourlyUpdates.total) * 100
);

export default function DashboardPage() {
  return (
    <div className="page-stack">
      <DashboardHeader theme="glass" />

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard
          variant="glass"
          label="Active Work"
          value={dashboardStats.activeWork}
          subLabel="Total Working Time"
          icon={Timer}
          iconBg="bg-emerald-50"
        />
        <StatCard
          variant="glass"
          label="Total Break"
          value={dashboardStats.totalBreak}
          subLabel="Total Break Time"
          icon={Coffee}
          iconBg="bg-orange-50"
        />
        <StatCard
          variant="glass"
          label="Hourly Updates"
          value={`${dashboardStats.hourlyUpdates.completed} / ${dashboardStats.hourlyUpdates.total}`}
          subLabel="Completed / Expected"
          icon={ClipboardCheck}
          iconBg="bg-blue-50"
          progress={hourlyProgress}
        />
        <StatCard
          variant="glass"
          label="Today's Points"
          value={`+${dashboardStats.todayPoints}`}
          subLabel="Net Points Earned"
          icon={Star}
          iconBg="bg-purple-50"
        />
        <StatCard
          variant="glass"
          label="Status"
          value={dashboardStats.status}
          subLabel={`Present: ${dashboardStats.presentAt}`}
          icon={CalendarCheck}
          iconBg="bg-emerald-50"
          valueColor="text-emerald-400"
          showGlobeDecoration
        />
      </div>

      <div className="grid grid-cols-12 items-start gap-3">
        <div className="page-col-stack col-span-12 lg:col-span-8">
          <CurrentWorkWidget theme="glass" />
          <TodaySummary theme="glass" />
        </div>
        <div className="page-col-stack col-span-12 lg:col-span-4">
          <TodayTimeline theme="glass" />
          <MyTasksWidget theme="glass" />
        </div>
      </div>
    </div>
  );
}
