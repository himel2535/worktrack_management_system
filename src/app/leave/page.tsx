"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiFetch } from "@/lib/api/client";
import Link from "next/link";

interface LeaveBalance {
  sick: { entitled: number; used: number };
  casual: { entitled: number; used: number };
  earned: { entitled: number; used: number };
}

export default function LeavePage() {
  const [balance, setBalance] = useState<LeaveBalance | null>(null);
  const [form, setForm] = useState({ type: "casual", startDate: "", endDate: "", reason: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    apiFetch<LeaveBalance>("/leaves/balance").then(setBalance).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiFetch("/leaves", { method: "POST", body: JSON.stringify(form) });
    setSubmitted(true);
    setForm({ type: "casual", startDate: "", endDate: "", reason: "" });
    apiFetch<LeaveBalance>("/leaves/balance").then(setBalance).catch(console.error);
  };

  return (
    <div className="page-stack">
      <PageHeader title="Apply for Leave" subtitle="Submit a leave request for manager approval" showClock />

      {balance && (
        <div className="grid grid-cols-3 gap-3">
          {(["sick", "casual", "earned"] as const).map((type) => (
            <div key={type} className="panel-card text-center">
              <p className="text-xs text-white/50 capitalize">{type} Leave</p>
              <p className="text-2xl font-bold text-emerald-400">{balance[type].entitled - balance[type].used}</p>
              <p className="text-xs text-white/40">of {balance[type].entitled} remaining</p>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="panel-card max-w-lg space-y-4">
        <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v ?? "casual" })}>
          <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="sick">Sick Leave</SelectItem>
            <SelectItem value="casual">Casual Leave</SelectItem>
            <SelectItem value="earned">Earned Leave</SelectItem>
          </SelectContent>
        </Select>
        <div className="grid grid-cols-2 gap-3">
          <Input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} required className="bg-white/5 border-white/10 text-white" />
          <Input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} required className="bg-white/5 border-white/10 text-white" />
        </div>
        <Textarea value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} placeholder="Reason for leave" required className="bg-white/5 border-white/10 text-white" />
        <div className="flex gap-3">
          <Button type="submit">Submit Request</Button>
          <Link href="/leave/history"><Button variant="glass" type="button">View History</Button></Link>
        </div>
        {submitted && <p className="text-emerald-400 text-sm">Leave request submitted successfully!</p>}
      </form>
    </div>
  );
}
