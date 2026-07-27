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
  Users,
  Shield,
  AlertTriangle,
  CalendarDays,
  Bell,
  FileText,
  Trophy,
  Palmtree,
  UserCircle,
  LucideIcon,
} from "lucide-react";
import type { UserRole } from "@/lib/api/client";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  iconColor?: string;
};

export type NavSection = {
  id: string;
  label: string;
  icon: LucideIcon;
  iconColor?: string;
  roles?: UserRole[];
  items: NavItem[];
};

export const SIDEBAR_SECTIONS: NavSection[] = [
  {
    id: "administration",
    label: "Administration",
    icon: Shield,
    iconColor: "text-violet-400",
    roles: ["admin"],
    items: [
      { href: "/admin", label: "Admin Dashboard", icon: Shield, iconColor: "text-violet-400" },
      { href: "/admin/users", label: "User Management", icon: Users, iconColor: "text-sky-400" },
      { href: "/admin/alerts", label: "Missed Updates", icon: AlertTriangle, iconColor: "text-amber-400" },
      { href: "/admin/leaves", label: "Leave Approvals", icon: Palmtree, iconColor: "text-green-400" },
      { href: "/admin/settings", label: "Company Settings", icon: Settings, iconColor: "text-zinc-400" },
    ],
  },
  {
    id: "team-management",
    label: "Team Management",
    icon: Users,
    iconColor: "text-sky-400",
    roles: ["admin", "manager"],
    items: [
      { href: "/manager", label: "Team Dashboard", icon: LayoutDashboard, iconColor: "text-cyan-400" },
      { href: "/manager/alerts", label: "Team Alerts", icon: AlertTriangle, iconColor: "text-amber-400" },
      { href: "/manager/leaves", label: "Team Leaves", icon: Palmtree, iconColor: "text-green-400" },
    ],
  },
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
    iconColor: "text-cyan-400",
    items: [
      { href: "/", label: "Dashboard", icon: LayoutDashboard, iconColor: "text-cyan-400" },
      { href: "/my-work", label: "My Work", icon: Briefcase, iconColor: "text-indigo-400" },
    ],
  },
  {
    id: "project-management",
    label: "Project Management",
    icon: FolderKanban,
    iconColor: "text-blue-400",
    items: [
      { href: "/projects", label: "Projects", icon: FolderKanban, iconColor: "text-blue-400" },
      { href: "/tasks", label: "Tasks", icon: CheckSquare, iconColor: "text-lime-400" },
    ],
  },
  {
    id: "time-attendance",
    label: "Time & Attendance",
    icon: Clock,
    iconColor: "text-teal-400",
    items: [
      { href: "/hourly-updates", label: "Hourly Updates", icon: Clock, iconColor: "text-teal-400" },
      { href: "/breaks", label: "Breaks", icon: Coffee, iconColor: "text-amber-400" },
      { href: "/attendance", label: "Attendance", icon: CalendarCheck, iconColor: "text-rose-400" },
    ],
  },
  {
    id: "performance-reports",
    label: "Performance & Reports",
    icon: TrendingUp,
    iconColor: "text-emerald-400",
    items: [
      { href: "/performance", label: "My Performance", icon: TrendingUp, iconColor: "text-emerald-400" },
      { href: "/leaderboard", label: "Leaderboard", icon: Trophy, iconColor: "text-yellow-400" },
      { href: "/reports", label: "Reports", icon: FileText, iconColor: "text-slate-300" },
    ],
  },
  {
    id: "people-calendar",
    label: "People & Calendar",
    icon: CalendarDays,
    iconColor: "text-orange-400",
    items: [
      { href: "/leave", label: "Leave", icon: Palmtree, iconColor: "text-green-400" },
      { href: "/team", label: "Team", icon: Users, iconColor: "text-sky-400" },
      { href: "/holidays", label: "Holidays", icon: CalendarDays, iconColor: "text-orange-400" },
    ],
  },
  {
    id: "account",
    label: "Account",
    icon: UserCircle,
    iconColor: "text-purple-400",
    items: [
      { href: "/notifications", label: "Notifications", icon: Bell, iconColor: "text-pink-400" },
      { href: "/settings", label: "Settings", icon: Settings, iconColor: "text-zinc-400" },
    ],
  },
];

export function getSectionsForRole(role: UserRole | undefined): NavSection[] {
  if (!role) return SIDEBAR_SECTIONS.filter((s) => !s.roles);
  return SIDEBAR_SECTIONS.filter((section) => {
    if (!section.roles) return true;
    return section.roles.includes(role);
  });
}

export function isNavItemActive(
  pathname: string,
  href: string,
  sectionItems?: { href: string }[]
): boolean {
  if (href === "/") return pathname === "/";
  if (pathname === href) return true;

  if (!pathname.startsWith(`${href}/`)) return false;

  if (sectionItems) {
    const moreSpecificSibling = sectionItems.some(
      (item) =>
        item.href !== href &&
        item.href.startsWith(`${href}/`) &&
        (pathname === item.href || pathname.startsWith(`${item.href}/`))
    );
    if (moreSpecificSibling) return false;
  }

  return true;
}

export function isSectionActive(pathname: string, section: NavSection): boolean {
  return section.items.some((item) => isNavItemActive(pathname, item.href, section.items));
}
