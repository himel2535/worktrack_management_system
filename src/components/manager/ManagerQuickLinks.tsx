"use client";

import Link from "next/link";
import { AlertTriangle, CalendarDays, Users, ChevronRight } from "lucide-react";
import { AdminPanel } from "@/components/admin/AdminPanel";

const links = [
  { href: "/manager/alerts", label: "Team Alerts", icon: AlertTriangle, desc: "Missed hourly updates" },
  { href: "/manager/leaves", label: "Team Leaves", icon: CalendarDays, desc: "Pending leave requests" },
  { href: "/team", label: "Team Directory", icon: Users, desc: "All team members" },
];

export function ManagerQuickLinks() {
  return (
    <AdminPanel title="Quick Links">
      <div className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5 transition-colors hover:border-sky-500/20 hover:bg-sky-500/5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-950/90 ring-1 ring-sky-500/30 text-sky-400">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">{link.label}</p>
                <p className="text-xs text-white/45">{link.desc}</p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-white/30" />
            </Link>
          );
        })}
      </div>
    </AdminPanel>
  );
}
