"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  CheckSquare,
  Clock,
  Coffee,
  CalendarCheck,
  TrendingUp,
  Settings,
  Timer,
  Star,
  ChevronRight,
  Headphones,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { todayPoints, weekPoints, monthPoints } from "@/lib/mock-data/user";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/my-work", label: "My Work", icon: Briefcase },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/hourly-updates", label: "Hourly Updates", icon: Clock },
  { href: "/breaks", label: "Breaks", icon: Coffee },
  { href: "/attendance", label: "Attendance", icon: CalendarCheck },
  { href: "/performance", label: "My Performance", icon: TrendingUp },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <>
      <div className="border-b border-white/10 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#10B981]">
            <Timer className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight">WorkTrack</h1>
            <p className="text-xs text-white/60">Work Smart, Every Hour.</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-sm"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-3 px-4 pb-4">
        <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
          <div className="mb-2 flex items-center gap-2 text-sm text-white/70">
            <Star className="h-4 w-4 text-[#10B981]" />
            Today&apos;s Points
          </div>
          <p className="text-2xl font-bold text-[#10B981]">+{todayPoints}</p>
          <p className="text-xs text-white/50">Total Points</p>
          <div className="mt-2 flex gap-3 text-xs text-white/60">
            <span>This Week: +{weekPoints}</span>
            <span>This Month: +{monthPoints}</span>
          </div>
          <button className="mt-2 flex items-center gap-1 text-xs text-[#10B981] hover:underline">
            View Details
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 px-3 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white">
          <Headphones className="h-4 w-4" />
          Need Help?
        </button>
      </div>
    </>
  );

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-50 bg-white lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col bg-[#004D2C] text-white transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
