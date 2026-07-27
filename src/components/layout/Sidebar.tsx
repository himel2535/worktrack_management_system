"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Timer, Star, ChevronRight, Menu, X, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useWorkTrack } from "@/context/WorkTrackContext";
import { apiFetch } from "@/lib/api/client";
import { getSectionsForRole, isSectionActive } from "./sidebarNav";
import { SidebarSection } from "./SidebarSection";

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { todayPoints } = useWorkTrack();
  const [weekPoints, setWeekPoints] = useState(0);
  const [monthPoints, setMonthPoints] = useState(0);

  useEffect(() => {
    apiFetch<{ weekPoints: number; monthPoints: number }>("/performance/points/summary")
      .then((d) => {
        setWeekPoints(d.weekPoints);
        setMonthPoints(d.monthPoints);
      })
      .catch(() => {});
  }, [todayPoints]);

  const sections = getSectionsForRole(user?.role);

  const activeSectionId =
    sections.find((s) => isSectionActive(pathname, s))?.id ?? null;

  const [openSectionId, setOpenSectionId] = useState<string | null>(activeSectionId);

  useEffect(() => {
    if (activeSectionId) setOpenSectionId(activeSectionId);
  }, [activeSectionId]);

  const sidebarContent = (
    <>
      <div className="relative border-b border-white/10 px-4 py-4">
        <div className="glass-card-inner px-3 py-3 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-400/30">
              <Timer className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight text-white">WorkTrack</h1>
              <p className="text-xs text-white/50">Work Smart, Every Hour.</p>
            </div>
          </div>
          {user && (
            <p className="mt-2 text-xs capitalize text-emerald-400/80">
              {user.role} · {user.name}
            </p>
          )}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-3">
        {sections.map((section) => (
          <SidebarSection
            key={section.id}
            section={section}
            pathname={pathname}
            isOpen={openSectionId === section.id}
            onToggle={() =>
              setOpenSectionId((prev) => (prev === section.id ? null : section.id))
            }
            onNavigate={() => setMobileOpen(false)}
          />
        ))}
      </nav>

      <div className="space-y-3 px-4 pb-4">
        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
          <div className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-emerald-400/30 to-cyan-400/20 blur-2xl" />
          <div className="relative">
            <div className="mb-2 flex items-center gap-2 text-sm text-white/70">
              <Star className="h-4 w-4 text-emerald-400" />
              Today&apos;s Points
            </div>
            <p className="text-2xl font-bold text-emerald-400">+{todayPoints}</p>
            <div className="mt-2 flex gap-3 text-xs text-white/50">
              <span>Week: +{weekPoints}</span>
              <span>Month: +{monthPoints}</span>
            </div>
            <Link
              href="/performance"
              className="mt-2 flex items-center gap-1 text-xs text-emerald-400 hover:underline"
            >
              View Details <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
        <button
          onClick={() => logout()}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-sm text-white/70 backdrop-blur-sm transition-colors hover:bg-white/15"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-50 border-white/20 bg-white/10 text-white backdrop-blur-sm lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
      <aside
        className={cn(
          "glass-sidebar-dark fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-500/[0.04] via-transparent to-cyan-500/[0.03]" />
        <div className="relative flex h-full flex-col">{sidebarContent}</div>
      </aside>
    </>
  );
}
