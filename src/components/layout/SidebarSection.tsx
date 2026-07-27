"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavSection, isNavItemActive } from "./sidebarNav";

interface SidebarSectionProps {
  section: NavSection;
  pathname: string;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
}

export function SidebarSection({
  section,
  pathname,
  isOpen,
  onToggle,
  onNavigate,
}: SidebarSectionProps) {
  const SectionIcon = section.icon;

  return (
    <div className="mb-2 rounded-xl border border-white/5 bg-white/[0.02] p-1.5 backdrop-blur-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-white/5 outline-none focus-visible:ring-1 focus-visible:ring-white/20"
        aria-expanded={isOpen}
      >
        <span className="flex min-w-0 flex-1 items-center gap-2">
          <SectionIcon className={cn("h-4 w-4 shrink-0", section.iconColor ?? "text-white/50")} />
          <span className="glass-sidebar-section-header">{section.label}</span>
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-white/40 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="mt-1 space-y-0.5 border-l border-white/10 pl-2 ml-1">
          {section.items.map((item) => {
            const isActive = isNavItemActive(pathname, item.href, section.items);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-normal outline-none focus-visible:ring-1 focus-visible:ring-emerald-400/40",
                  isActive ? "glass-sidebar-nav-active" : "glass-sidebar-nav-item"
                )}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                )}
                <Icon
                  className={cn(
                    "h-3.5 w-3.5 shrink-0",
                    item.iconColor ?? "text-white/50",
                    isActive && "drop-shadow-[0_0_6px_currentColor]"
                  )}
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
