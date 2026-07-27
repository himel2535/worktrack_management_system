"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AdminPanel } from "@/components/admin/AdminPanel";

interface TeamMember {
  user: { id: string; name: string; email: string; designation?: string; avatar?: string };
  status: string;
  workTime: string;
  updatesSubmitted: number;
  updatesExpected: number;
  missedUpdates: number;
}

const statusStyles: Record<string, { bg: string; text: string; border: string; label: string }> = {
  working: { bg: "bg-emerald-500/15", text: "text-emerald-400", border: "border-emerald-500/30", label: "Working" },
  on_break: { bg: "bg-amber-500/15", text: "text-amber-400", border: "border-amber-500/30", label: "On Break" },
  checked_in: { bg: "bg-sky-500/15", text: "text-sky-400", border: "border-sky-500/30", label: "Checked In" },
  not_started: { bg: "bg-white/5", text: "text-white/40", border: "border-white/10", label: "Not Started" },
};

function StatusBadge({ status }: { status: string }) {
  const style = statusStyles[status] ?? statusStyles.not_started;
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", style.bg, style.text, style.border)}>
      {style.label}
    </span>
  );
}

interface TeamMemberWidgetProps {
  members: TeamMember[];
}

export function TeamMemberWidget({ members }: TeamMemberWidgetProps) {
  return (
    <AdminPanel title={`Team Members (${members.length})`}>
      {members.length === 0 ? (
        <p className="py-6 text-center text-sm text-white/40">No team members found</p>
      ) : (
        <div className="space-y-1">
          {members.map((m) => (
            <div
              key={m.user.id}
              className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5 transition-colors hover:border-white/10 hover:bg-white/[0.04]"
            >
              <Avatar className="h-9 w-9 border border-white/10">
                <AvatarImage src={m.user.avatar} alt={m.user.name} />
                <AvatarFallback className="bg-sky-950 text-sky-400 text-xs">
                  {m.user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{m.user.name}</p>
                <p className="truncate text-xs text-white/45">{m.user.designation || m.user.email}</p>
              </div>
              <StatusBadge status={m.status} />
              <div className="hidden shrink-0 text-right sm:block">
                <p className="text-xs font-medium text-white/70">{m.workTime}</p>
                <p className="text-xs text-white/50">
                  {m.updatesSubmitted}/{m.updatesExpected} updates
                </p>
              </div>
              <span className={cn("hidden text-sm font-bold md:block", m.missedUpdates > 0 ? "text-red-400" : "text-emerald-400")}>
                {m.missedUpdates > 0 ? `${m.missedUpdates} missed` : "OK"}
              </span>
            </div>
          ))}
        </div>
      )}
    </AdminPanel>
  );
}
