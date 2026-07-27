"use client";

import { useEffect, useState } from "react";
import { AdminPageLayout } from "@/components/admin/AdminPageLayout";
import { AdminStatRow } from "@/components/admin/AdminStatRow";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { StatCard } from "@/components/shared/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { apiFetch } from "@/lib/api/client";
import { Users, UserCheck, UserCog, UserX, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserRecord {
  _id: string;
  id?: string;
  name: string;
  email: string;
  role: string;
  designation?: string;
  isActive: boolean;
  departmentId?: { name: string };
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [departments, setDepartments] = useState<{ _id: string; name: string }[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "password123", role: "employee", departmentId: "", designation: "" });

  const load = () => {
    apiFetch<UserRecord[]>("/admin/users").then(setUsers).catch(console.error);
    apiFetch<{ _id: string; name: string }[]>("/admin/departments").then(setDepartments).catch(console.error);
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiFetch("/admin/users", { method: "POST", body: JSON.stringify(form) });
    setShowForm(false);
    setForm({ name: "", email: "", password: "password123", role: "employee", departmentId: "", designation: "" });
    load();
  };

  const deactivate = async (id: string) => {
    await apiFetch(`/admin/users/${id}`, { method: "DELETE" });
    load();
  };

  const active = users.filter((u) => u.isActive).length;
  const employees = users.filter((u) => u.role === "employee").length;
  const managers = users.filter((u) => u.role === "manager").length;
  const inactive = users.filter((u) => !u.isActive).length;

  const roleBadge = (role: string) => {
    const styles: Record<string, string> = {
      admin: "bg-purple-500/15 text-purple-400 border-purple-500/30",
      manager: "bg-sky-500/15 text-sky-400 border-sky-500/30",
      employee: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    };
    return styles[role] ?? styles.employee;
  };

  return (
    <AdminPageLayout
      title="User Management"
      subtitle="Manage employees, roles and departments"
      stats={
        <AdminStatRow>
          <StatCard variant="glass" label="Total Users" value={users.length} subLabel="All accounts" icon={Users} iconBg="bg-blue-50" />
          <StatCard variant="glass" label="Active" value={active} subLabel="Enabled accounts" icon={UserCheck} iconBg="bg-emerald-50" />
          <StatCard variant="glass" label="Employees" value={employees} subLabel="Employee role" icon={Users} iconBg="bg-emerald-50" />
          <StatCard variant="glass" label="Managers" value={managers} subLabel="Manager role" icon={UserCog} iconBg="bg-orange-50" />
          <StatCard variant="glass" label="Inactive" value={inactive} subLabel="Deactivated" icon={UserX} iconBg="bg-purple-50" valueColor={inactive > 0 ? "text-rose-400" : "text-white"} />
        </AdminStatRow>
      }
    >
      <div className="grid grid-cols-12 items-start gap-3">
        <div className="col-span-12 lg:col-span-8">
          <AdminPanel title={`All Users (${users.length})`}>
            <div className="space-y-1">
              {users.map((u) => (
                <div
                  key={u._id}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5 transition-colors hover:border-white/10 hover:bg-white/[0.04]"
                >
                  <Avatar className="h-9 w-9 border border-white/10">
                    <AvatarFallback className="bg-emerald-950 text-emerald-400 text-xs">
                      {u.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">{u.name}</p>
                    <p className="truncate text-xs text-white/45">{u.email}</p>
                  </div>
                  <span className={cn("hidden rounded-full border px-2 py-0.5 text-xs capitalize sm:inline-flex", roleBadge(u.role))}>
                    {u.role}
                  </span>
                  <span className="hidden text-xs text-white/50 md:inline">{u.departmentId?.name || "—"}</span>
                  <span className={cn("text-xs font-medium", u.isActive ? "text-emerald-400" : "text-red-400")}>
                    {u.isActive ? "Active" : "Inactive"}
                  </span>
                  {u.isActive && u.role !== "admin" && (
                    <button onClick={() => deactivate(u._id)} className="text-red-400 hover:text-red-300">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </AdminPanel>
        </div>

        <div className="page-col-stack col-span-12 lg:col-span-4">
          <AdminPanel
            title="Add Employee"
            action={
              <Button variant="glass" size="sm" onClick={() => setShowForm(!showForm)}>
                <Plus className="h-4 w-4 mr-1" />
                {showForm ? "Cancel" : "New"}
              </Button>
            }
          >
            {showForm ? (
              <form onSubmit={handleCreate} className="space-y-3">
                <Input placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="bg-white/5 border-white/10 text-white" />
                <Input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="bg-white/5 border-white/10 text-white" />
                <Input placeholder="Designation" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} className="bg-white/5 border-white/10 text-white" />
                <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v ?? "employee" })}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={form.departmentId} onValueChange={(v) => setForm({ ...form, departmentId: v ?? "" })}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue placeholder="Department" /></SelectTrigger>
                  <SelectContent>
                    {departments.map((d) => <SelectItem key={d._id} value={d._id}>{d.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">Create User</Button>
              </form>
            ) : (
              <p className="text-sm text-white/50">Click New to add an employee, manager, or admin account.</p>
            )}
          </AdminPanel>

          <AdminPanel title="Departments">
            <div className="space-y-2">
              {departments.map((d) => (
                <div key={d._id} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
                  <span className="text-sm text-white">{d.name}</span>
                  <span className="text-xs text-white/45">
                    {users.filter((u) => u.departmentId?.name === d.name).length} users
                  </span>
                </div>
              ))}
            </div>
          </AdminPanel>
        </div>
      </div>
    </AdminPageLayout>
  );
}
