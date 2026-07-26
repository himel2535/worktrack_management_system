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
      <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
        <Calendar className="h-4 w-4" />
        {dateLabel || formatDate(new Date())}
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </button>

      <button className="relative rounded-lg border border-slate-200 bg-white p-2 hover:bg-slate-50">
        <Bell className="h-5 w-5 text-slate-600" />
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
          3
        </span>
      </button>

      {showClock && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
          {time}
        </div>
      )}

      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback>HH</AvatarFallback>
        </Avatar>
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-slate-800">{currentUser.name}</p>
          <p className="text-xs text-slate-500">{currentUser.role}</p>
        </div>
      </div>
    </div>
  );
}
