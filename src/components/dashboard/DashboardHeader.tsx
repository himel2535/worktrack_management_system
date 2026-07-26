"use client";

import { useEffect, useState } from "react";
import { Bell, Calendar } from "lucide-react";
import { getCurrentTime, getGreeting, formatDate } from "@/lib/format";
import { currentUser } from "@/lib/mock-data/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DashboardHeader() {
  const [time, setTime] = useState("10:45 AM");

  useEffect(() => {
    setTime(getCurrentTime());
    const interval = setInterval(() => setTime(getCurrentTime()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold text-slate-800">
          {getGreeting()}, Himel 👋
        </h1>
        <p className="mt-0.5 text-sm text-slate-500">
          Let&apos;s make today productive!
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
          <Calendar className="h-4 w-4 text-slate-500" />
          <span className="text-sm text-slate-700">
            {formatDate(new Date())}
          </span>
          <span className="h-4 w-px bg-slate-200" />
          <span className="text-sm font-medium text-emerald-600">{time}</span>
        </div>

        <button className="relative rounded-full border border-slate-200 bg-white p-2.5 shadow-sm hover:bg-slate-50">
          <Bell className="h-5 w-5 text-slate-600" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            3
          </span>
        </button>

        <div className="flex items-center gap-2.5">
          <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>HH</AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-800">
              {currentUser.name}
            </p>
            <p className="text-xs text-slate-500">{currentUser.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
