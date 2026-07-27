"use client";

import { useEffect, useState } from "react";
import { AdminPageLayout } from "@/components/admin/AdminPageLayout";
import { AdminStatRow } from "@/components/admin/AdminStatRow";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { apiFetch } from "@/lib/api/client";
import { CalendarDays, Clock, CheckCircle, XCircle, FileText } from "lucide-react";

interface LeaveRecord {
  _id: string;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  days: number;
  userId: { name: string; email?: string };
}

export default function ManagerLeavesPage() {
  const [leaves, setLeaves] = useState<LeaveRecord[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const load = () => apiFetch<LeaveRecord[]>("/leaves").then(setLeaves).catch(console.error);
  useEffect(() => { load(); }, []);

  const handleAction = async (id: string, action: "approve" | "reject") => {
    await apiFetch(`/leaves/${id}/${action}`, { method: "PATCH", body: JSON.stringify({ note: notes[id] ?? "" }) });
    setNotes((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    load();
  };

  const pending = leaves.filter((l) => l.status === "pending");
  const approved = leaves.filter((l) => l.status === "approved");
  const rejected = leaves.filter((l) => l.status === "rejected");

  return (
    <AdminPageLayout
      title="Team Leave Requests"
      subtitle="Approve or reject team leave applications"
      stats={
        <AdminStatRow>
          <StatCard variant="glass" label="Pending" value={pending.length} subLabel="Awaiting review" icon={Clock} iconBg="bg-orange-50" valueColor={pending.length > 0 ? "text-amber-400" : "text-white"} />
          <StatCard variant="glass" label="Approved" value={approved.length} subLabel="Approved requests" icon={CheckCircle} iconBg="bg-emerald-50" />
          <StatCard variant="glass" label="Rejected" value={rejected.length} subLabel="Rejected requests" icon={XCircle} iconBg="bg-purple-50" />
          <StatCard variant="glass" label="Total" value={leaves.length} subLabel="All requests" icon={CalendarDays} iconBg="bg-blue-50" />
          <StatCard variant="glass" label="Action" value={pending.length > 0 ? "Review" : "Clear"} subLabel={pending.length > 0 ? `${pending.length} pending` : "No pending"} icon={FileText} iconBg="bg-emerald-50" valueColor={pending.length > 0 ? "text-amber-400" : "text-emerald-400"} showGlobeDecoration />
        </AdminStatRow>
      }
    >
      <div className="grid grid-cols-12 items-start gap-3">
        <div className="page-col-stack col-span-12 lg:col-span-8">
          {pending.length === 0 ? (
            <AdminPanel title="Pending Requests">
              <AdminEmptyState icon={CheckCircle} message="No pending leave requests from your team" />
            </AdminPanel>
          ) : (
            pending.map((l) => (
              <AdminPanel key={l._id} title={l.userId?.name ?? "Team Member"}>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <StatusBadge status="pending" />
                  <span className="text-xs capitalize text-white/50">{l.type} · {l.days} days</span>
                  <span className="text-xs text-white/50">{l.startDate} → {l.endDate}</span>
                </div>
                <p className="mb-3 text-sm text-white/70">{l.reason}</p>
                <Textarea
                  value={notes[l._id] ?? ""}
                  onChange={(e) => setNotes((prev) => ({ ...prev, [l._id]: e.target.value }))}
                  placeholder="Review note (optional)"
                  className="mb-3 bg-white/5 border-white/10 text-white"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleAction(l._id, "approve")} className="bg-emerald-600 hover:bg-emerald-700">
                    <CheckCircle className="h-4 w-4 mr-1" /> Approve
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleAction(l._id, "reject")}>
                    <XCircle className="h-4 w-4 mr-1" /> Reject
                  </Button>
                </div>
              </AdminPanel>
            ))
          )}
        </div>
        <div className="col-span-12 lg:col-span-4">
          <AdminPanel title="Summary">
            <div className="space-y-1.5">
              <div className="flex justify-between rounded-lg border border-white/5 px-3 py-2"><span className="text-sm text-white/60">Pending</span><span className="font-medium text-amber-400">{pending.length}</span></div>
              <div className="flex justify-between rounded-lg border border-white/5 px-3 py-2"><span className="text-sm text-white/60">Approved</span><span className="font-medium text-emerald-400">{approved.length}</span></div>
              <div className="flex justify-between rounded-lg border border-white/5 px-3 py-2"><span className="text-sm text-white/60">Rejected</span><span className="font-medium text-rose-400">{rejected.length}</span></div>
            </div>
          </AdminPanel>
        </div>
      </div>
    </AdminPageLayout>
  );
}
