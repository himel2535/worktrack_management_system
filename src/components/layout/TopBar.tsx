"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, Calendar, ChevronDown } from "lucide-react";
import { getCurrentTime, formatDate } from "@/lib/format";
import { apiFetch } from "@/lib/api/client";
import { UserMenu } from "./UserMenu";

interface TopBarProps {
  showClock?: boolean;
  dateLabel?: string;
}

export function TopBar({ showClock = true, dateLabel }: TopBarProps) {
  const [time, setTime] = useState("10:45 AM");
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setTime(getCurrentTime());
    const interval = setInterval(() => setTime(getCurrentTime()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    apiFetch<{ count: number }>("/notifications/unread-count")
      .then((d) => setUnreadCount(d.count))
      .catch(() => {});
    const interval = setInterval(() => {
      apiFetch<{ count: number }>("/notifications/unread-count")
        .then((d) => setUnreadCount(d.count))
        .catch(() => {});
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <button className="glass-card-inner flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/80 hover:bg-white/10">
        <Calendar className="h-4 w-4 text-emerald-400" />
        {dateLabel || formatDate(new Date())}
        <ChevronDown className="h-4 w-4 text-white/40" />
      </button>

      <Link href="/notifications" className="glass-card-inner relative rounded-full p-2 hover:bg-white/10">
        <Bell className="h-5 w-5 text-white/70" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Link>

      {showClock && (
        <div className="glass-card-inner rounded-full px-3 py-2 text-sm font-medium text-emerald-400">{time}</div>
      )}

      <UserMenu theme="glass" />
    </div>
  );
}
