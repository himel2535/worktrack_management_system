"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { apiFetch } from "@/lib/api/client";
import { Check, X } from "lucide-react";

interface LeaveRecord {
  _id: string;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  days: number;
  userId: { name: string; email: string };
}

export default function AdminLeavesPage() {
  const [leaves, setLeaves] = useState<LeaveRecord[]>([]);
  const [note, setNote] = useState("");

  const load = () => apiFetch<LeaveRecord[]>("/leaves").then(setLeaves).catch(console.error);
  useEffect(() => { load(); }, []);

  const handleAction = async (id: string, action: "approve" | "reject") => {
    await apiFetch(`/leaves/${id}/${action}`, { method: "PATCH", body: JSON.stringify({ note }) });
    setNote("");
    load();
  };

  return (
    <div className="page-stack">
      <PageHeader title="Leave Approvals" subtitle="Review and approve employee leave requests" showClock />
      <div className="space-y-3">
        {leaves.filter((l) => l.status === "pending").length === 0 && <p className="text-white/50 panel-card">No pending leave requests</p>}
        {leaves.filter((l) => l.status === "pending").map((l) => (
          <div key={l._id} className="panel-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-white">{l.userId?.name}</p>
                <p className="text-xs text-white/50 capitalize">{l.type} leave · {l.days} day(s) · {l.startDate} → {l.endDate}</p>
                <p className="mt-2 text-sm text-white/70">{l.reason}</p>
              </div>
            </div>
            <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Review note (optional)" className="mt-3 bg-white/5 border-white/10 text-white" />
            <div className="mt-3 flex gap-2">
              <Button size="sm" onClick={() => handleAction(l._id, "approve")} className="bg-emerald-600 hover:bg-emerald-700"><Check className="h-4 w-4 mr-1" /> Approve</Button>
              <Button size="sm" variant="destructive" onClick={() => handleAction(l._id, "reject")}><X className="h-4 w-4 mr-1" /> Reject</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
