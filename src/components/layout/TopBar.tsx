"use client";

import { useEffect, useState } from "react";
import { Bell, Calendar, ChevronDown } from "lucide-react";
import { getCurrentTime, formatDate } from "@/lib/format";
import { currentUser } from "@/lib/mock-data/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TopBarProps {
  showClock?: boolean;
  dateLabel?: string;
}

export function TopBar({ showClock = true, dateLabel }: TopBarProps) {
  const [time, setTime] = useState("10:45 AM");

  useEffect(() => {
    setTime(getCurrentTime());
    const interval = setInterval(() => setTime(getCurrentTime()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <button className="glass-card-inner flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/80 hover:bg-white/10">
        <Calendar className="h-4 w-4 text-emerald-400" />
        {dateLabel || formatDate(new Date())}
        <ChevronDown className="h-4 w-4 text-white/40" />
      </button>

      <button className="glass-card-inner relative rounded-full p-2 hover:bg-white/10">
        <Bell className="h-5 w-5 text-white/70" />
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
          3
        </span>
      </button>

      {showClock && (
        <div className="glass-card-inner rounded-full px-3 py-2 text-sm font-medium text-emerald-400">
          {time}
        </div>
      )}

      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 border-2 border-white/20">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback>HH</AvatarFallback>
        </Avatar>
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-white">{currentUser.name}</p>
          <p className="text-xs text-white/50">{currentUser.role}</p>
        </div>
      </div>
    </div>
  );
}
