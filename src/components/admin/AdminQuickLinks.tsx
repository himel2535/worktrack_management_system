"use client";

import Link from "next/link";
import { Users, AlertTriangle, CalendarDays, Settings, ChevronRight } from "lucide-react";
import { AdminPanel } from "./AdminPanel";

const links = [
  { href: "/admin/users", label: "User Management", icon: Users, desc: "Employees & roles" },
  { href: "/admin/alerts", label: "Missed Updates", icon: AlertTriangle, desc: "Hourly update alerts" },
  { href: "/admin/leaves", label: "Leave Approvals", icon: CalendarDays, desc: "Pending requests" },
  { href: "/admin/settings", label: "Company Settings", icon: Settings, desc: "Office hours & rules" },
];

export function AdminQuickLinks() {
  return (
    <AdminPanel title="Quick Links">
      <div className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5 transition-colors hover:border-emerald-500/20 hover:bg-emerald-500/5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-950/90 ring-1 ring-emerald-500/30 text-emerald-400">
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
