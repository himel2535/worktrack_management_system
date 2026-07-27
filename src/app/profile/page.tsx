"use client";

import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { getRoleLabel } from "@/lib/demoUsers";
import { Mail, Shield, Briefcase, Settings, User } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="page-stack">
      <PageHeader title="My Profile" subtitle="Your account details and role information." showClock />

      <div className="max-w-2xl">
        <div className="panel-card overflow-hidden border border-white/10 bg-[#0F172A]">
          <div className="relative border-b border-white/10 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/5 px-6 py-8">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end">
              <Avatar className="h-24 w-24 border-4 border-white/20 shadow-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl">{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                <p className="mt-1 text-sm text-white/50">{user.email}</p>
                <span className="mt-2 inline-block rounded-md bg-emerald-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-400">
                  {getRoleLabel(user.role)}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-white/40">
                  <User className="h-3.5 w-3.5" />
                  Full Name
                </div>
                <p className="text-sm font-medium text-white">{user.name}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-white/40">
                  <Mail className="h-3.5 w-3.5" />
                  Email
                </div>
                <p className="text-sm font-medium text-white">{user.email}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-white/40">
                  <Shield className="h-3.5 w-3.5" />
                  System Role
                </div>
                <p className="text-sm font-medium capitalize text-white">{user.role}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-white/40">
                  <Briefcase className="h-3.5 w-3.5" />
                  Designation
                </div>
                <p className="text-sm font-medium text-white">{user.designation || "—"}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 border-t border-white/10 pt-4">
              <Link href="/settings" className="inline-flex items-center gap-2 rounded-full bg-emerald-950/90 px-4 py-2 text-sm font-bold text-emerald-300 border border-emerald-800/70 shadow-[inset_0_-2px_0_0_#059669] hover:bg-emerald-900">
                <Settings className="h-4 w-4" />
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
