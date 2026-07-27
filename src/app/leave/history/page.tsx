"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { apiFetch } from "@/lib/api/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface LeaveRecord {
  _id: string; type: string; startDate: string; endDate: string; reason: string; status: string; days: number; reviewNote?: string;
}

const statusStyle: Record<string, string> = {
  pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  approved: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  rejected: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function LeaveHistoryPage() {
  const [leaves, setLeaves] = useState<LeaveRecord[]>([]);
  useEffect(() => { apiFetch<LeaveRecord[]>("/leaves").then(setLeaves).catch(console.error); }, []);

  return (
    <div className="page-stack">
      <PageHeader title="Leave History" subtitle="Your past and pending leave requests" showClock />
      <Link href="/leave"><Button variant="glass" size="sm">Apply New Leave</Button></Link>
      <div className="space-y-3">
        {leaves.length === 0 && <p className="text-white/50 panel-card">No leave history yet</p>}
        {leaves.map((l) => (
          <div key={l._id} className="panel-card flex items-start justify-between">
            <div>
              <p className="font-medium text-white capitalize">{l.type} Leave · {l.days} day(s)</p>
              <p className="text-xs text-white/50">{l.startDate} → {l.endDate}</p>
              <p className="mt-1 text-sm text-white/70">{l.reason}</p>
              {l.reviewNote && <p className="mt-1 text-xs text-white/50">Note: {l.reviewNote}</p>}
            </div>
            <span className={`rounded-lg border px-2 py-1 text-xs capitalize ${statusStyle[l.status]}`}>{l.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
