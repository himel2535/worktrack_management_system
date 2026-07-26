"use client";

import { useEffect, useState } from "react";
import { Bell, Calendar } from "lucide-react";
import { getCurrentTime, getGreeting, formatDate } from "@/lib/format";
import { currentUser } from "@/lib/mock-data/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  theme?: "light" | "glass";
}

export function DashboardHeader({ theme = "light" }: DashboardHeaderProps) {
  const [time, setTime] = useState("10:45 AM");
  const isGlass = theme === "glass";

  useEffect(() => {
    setTime(getCurrentTime());
    const interval = setInterval(() => setTime(getCurrentTime()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1
          className={cn(
            "text-xl font-semibold sm:text-2xl sm:font-bold",
            isGlass ? "text-white" : "text-slate-800"
          )}
        >
          {getGreeting()}, Himel 👋
        </h1>
        <p
          className={cn(
            "mt-0.5 text-sm",
            isGlass ? "text-white/60" : "text-slate-500"
          )}
        >
          Let&apos;s make today productive!
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div
          className={cn(
            "flex items-center gap-3 rounded-full px-4 py-2",
            isGlass
              ? "glass-card-inner border-white/10"
              : "border border-slate-200 bg-white shadow-sm"
          )}
        >
          <Calendar
            className={cn(
              "h-4 w-4",
              isGlass ? "text-emerald-400" : "text-slate-500"
            )}
          />
          <span
            className={cn(
              "text-sm",
              isGlass ? "text-white/80" : "text-slate-700"
            )}
          >
            {formatDate(new Date())}
          </span>
          <span
            className={cn(
              "h-4 w-px",
              isGlass ? "bg-white/20" : "bg-slate-200"
            )}
          />
          <span className="text-sm font-medium text-emerald-400">{time}</span>
        </div>

        <button
          className={cn(
            "relative rounded-full p-2.5",
            isGlass
              ? "glass-card-inner border-white/10 hover:bg-white/10"
              : "border border-slate-200 bg-white shadow-sm hover:bg-slate-50"
          )}
        >
          <Bell
            className={cn(
              "h-5 w-5",
              isGlass ? "text-white/70" : "text-slate-600"
            )}
          />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            3
          </span>
        </button>

        <div className="flex items-center gap-2.5">
          <Avatar
            className={cn(
              "h-9 w-9 border-2 shadow-sm",
              isGlass ? "border-white/20" : "border-white"
            )}
          >
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>HH</AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p
              className={cn(
                "text-sm font-medium",
                isGlass ? "text-white" : "text-slate-800"
              )}
            >
              {currentUser.name}
            </p>
            <p
              className={cn(
                "text-xs",
                isGlass ? "text-white/50" : "text-slate-500"
              )}
            >
              {currentUser.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
