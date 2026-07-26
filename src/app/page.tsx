import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/shared/StatCard";
import { CurrentWorkWidget } from "@/components/dashboard/CurrentWorkWidget";
import { TodaySummary } from "@/components/dashboard/TodaySummary";
import { OngoingProjects } from "@/components/dashboard/OngoingProjects";
import { TodayTimeline } from "@/components/dashboard/TodayTimeline";
import { MyTasksWidget } from "@/components/dashboard/MyTasksWidget";
import { dashboardStats } from "@/lib/mock-data/work-session";
import { Timer, Coffee, ClipboardCheck, Star, CalendarCheck } from "lucide-react";

const hourlyProgress = Math.round(
  (dashboardStats.hourlyUpdates.completed / dashboardStats.hourlyUpdates.total) * 100
);

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader />

      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard
          variant="dashboard"
          label="Active Work"
          value={dashboardStats.activeWork}
          subLabel="Total Working Time"
          icon={Timer}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          variant="dashboard"
          label="Total Break"
          value={dashboardStats.totalBreak}
          subLabel="Total Break Time"
          icon={Coffee}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
        />
        <StatCard
          variant="dashboard"
          label="Hourly Updates"
          value={`${dashboardStats.hourlyUpdates.completed} / ${dashboardStats.hourlyUpdates.total}`}
          subLabel="Completed / Expected"
          icon={ClipboardCheck}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          progress={hourlyProgress}
        />
        <StatCard
          variant="dashboard"
          label="Today's Points"
          value={`+${dashboardStats.todayPoints}`}
          subLabel="Net Points Earned"
          icon={Star}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          variant="dashboard"
          label="Status"
          value={dashboardStats.status}
          subLabel={`Present: ${dashboardStats.presentAt}`}
          icon={CalendarCheck}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          valueColor="text-emerald-600"
        />
      </div>

      <div className="mb-4 grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8">
          <CurrentWorkWidget />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <TodayTimeline />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 space-y-4 lg:col-span-8">
          <TodaySummary />
          <OngoingProjects />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <MyTasksWidget />
        </div>
      </div>
    </>
  );
}
