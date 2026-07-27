"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { apiFetch } from "@/lib/api/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TeamMember {
  _id: string; name: string; email: string; role: string; designation?: string; phone?: string; avatar?: string;
  departmentId?: { name: string; slug: string };
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  useEffect(() => { apiFetch<TeamMember[]>("/team").then(setMembers).catch(console.error); }, []);

  const departments = [...new Set(members.map((m) => m.departmentId?.name || "Other"))];

  return (
    <div className="page-stack">
      <PageHeader title="Team Directory" subtitle="All colleagues across departments" showClock />
      <Tabs defaultValue="all">
        <TabsList className="bg-white/5">
          <TabsTrigger value="all">All</TabsTrigger>
          {departments.map((d) => <TabsTrigger key={d} value={d}>{d}</TabsTrigger>)}
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <MemberGrid members={members} />
        </TabsContent>
        {departments.map((d) => (
          <TabsContent key={d} value={d} className="mt-4">
            <MemberGrid members={members.filter((m) => (m.departmentId?.name || "Other") === d)} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function MemberGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((m) => (
        <div key={m._id} className="panel-card flex items-center gap-3">
          <Avatar className="h-12 w-12 border border-white/10">
            <AvatarImage src={m.avatar} />
            <AvatarFallback>{m.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-white">{m.name}</p>
            <p className="text-xs text-white/50">{m.designation || m.role}</p>
            <p className="text-xs text-emerald-400/70">{m.departmentId?.name}</p>
            <p className="text-xs text-white/40">{m.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
