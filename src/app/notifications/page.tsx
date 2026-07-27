"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api/client";
import Link from "next/link";
import { Bell, CheckCheck } from "lucide-react";

interface Notification {
  _id: string; type: string; title: string; body: string; read: boolean; link?: string; createdAt: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const load = () => apiFetch<Notification[]>("/notifications").then(setNotifications).catch(console.error);
  useEffect(() => { load(); }, []);

  const markAllRead = async () => {
    await apiFetch("/notifications/read-all", { method: "PATCH" });
    load();
  };

  const markRead = async (id: string) => {
    await apiFetch(`/notifications/${id}/read`, { method: "PATCH" });
    load();
  };

  const typeIcon: Record<string, string> = {
    update_reminder: "⏰", leave_decision: "📋", missed_update: "⚠️", general: "ℹ️",
  };

  return (
    <div className="page-stack">
      <PageHeader title="Notifications" subtitle="Your alerts and reminders" showClock />
      <div className="flex justify-end">
        <Button variant="glass" size="sm" onClick={markAllRead}><CheckCheck className="h-4 w-4 mr-1" /> Mark All Read</Button>
      </div>
      <div className="space-y-2">
        {notifications.length === 0 && <p className="text-white/50 panel-card">No notifications yet</p>}
        {notifications.map((n) => (
          <div key={n._id} className={`panel-card flex items-start gap-3 ${!n.read ? "border-emerald-500/20 bg-emerald-500/5" : ""}`}
            onClick={() => !n.read && markRead(n._id)}>
            <span className="text-xl">{typeIcon[n.type] || "🔔"}</span>
            <div className="flex-1">
              <p className="font-medium text-white">{n.title}</p>
              <p className="text-sm text-white/60">{n.body}</p>
              <p className="text-xs text-white/40 mt-1">{new Date(n.createdAt).toLocaleString()}</p>
            </div>
            {!n.read && <Bell className="h-4 w-4 text-emerald-400 shrink-0" />}
            {n.link && <Link href={n.link} className="text-xs text-emerald-400 hover:underline shrink-0">View</Link>}
          </div>
        ))}
      </div>
    </div>
  );
}
