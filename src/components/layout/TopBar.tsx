"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, Calendar, ChevronDown } from "lucide-react";
import { getCurrentTime, formatDate } from "@/lib/format";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api/client";

interface TopBarProps {
  showClock?: boolean;
  dateLabel?: string;
}

export function TopBar({ showClock = true, dateLabel }: TopBarProps) {
  const [time, setTime] = useState("10:45 AM");
  const { user } = useAuth();
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

      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 border-2 border-white/20">
          <AvatarImage src={user?.avatar} alt={user?.name} />
          <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-white">{user?.name}</p>
          <p className="text-xs text-white/50 capitalize">{user?.designation || user?.role}</p>
        </div>
      </div>
    </div>
  );
}
