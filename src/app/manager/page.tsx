"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { apiFetch } from "@/lib/api/client";
import { Users } from "lucide-react";

interface Member {
  user: { id: string; name: string; email: string; designation?: string };
  status: string;
  workTime: string;
  updatesSubmitted: number;
  updatesExpected: number;
  missedUpdates: number;
}

export default function ManagerDashboardPage() {
  const [data, setData] = useState<{ teamSize: number; members: Member[] } | null>(null);

  useEffect(() => {
    apiFetch<{ teamSize: number; members: Member[] }>("/manager/dashboard").then(setData).catch(console.error);
    const interval = setInterval(() => {
      apiFetch<{ teamSize: number; members: Member[] }>("/manager/dashboard").then(setData).catch(console.error);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const statusColor: Record<string, string> = {
    working: "text-emerald-400", on_break: "text-amber-400", checked_in: "text-blue-400", not_started: "text-white/40",
  };

  return (
    <div className="page-stack">
      <PageHeader title="Team Dashboard" subtitle="Your team's progress today" showClock />
      <StatCard label="Team Size" value={data?.teamSize ?? "—"} icon={Users} variant="glass" className="max-w-xs" />
      <div className="panel-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-white/50 border-b border-white/10">
            <th className="py-2 text-left">Member</th><th className="py-2 text-left">Status</th>
            <th className="py-2 text-left">Work Time</th><th className="py-2 text-left">Updates</th><th className="py-2 text-left">Missed</th>
          </tr></thead>
          <tbody>
            {data?.members.map((m) => (
              <tr key={m.user.id} className="border-b border-white/5">
                <td className="py-2.5"><p className="text-white">{m.user.name}</p><p className="text-xs text-white/50">{m.user.designation}</p></td>
                <td className={`py-2.5 capitalize ${statusColor[m.status]}`}>{m.status.replace("_", " ")}</td>
                <td className="py-2.5 text-white/70">{m.workTime}</td>
                <td className="py-2.5 text-white/70">{m.updatesSubmitted}/{m.updatesExpected}</td>
                <td className="py-2.5">{m.missedUpdates > 0 ? <span className="text-red-400">{m.missedUpdates}</span> : <span className="text-emerald-400">0</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
