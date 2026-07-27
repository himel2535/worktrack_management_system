"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiFetch } from "@/lib/api/client";
import { Plus, Trash2 } from "lucide-react";

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

  return (
    <div className="page-stack">
      <PageHeader title="User Management" subtitle="Manage employees, roles and departments" showClock />
      <div className="flex justify-end">
        <Button onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4 mr-1" /> Add Employee</Button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="panel-card grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <Button type="submit">Create User</Button>
        </form>
      )}

      <div className="panel-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-white/50 border-b border-white/10">
            <th className="py-2 text-left">Name</th><th className="py-2 text-left">Email</th>
            <th className="py-2 text-left">Role</th><th className="py-2 text-left">Department</th>
            <th className="py-2 text-left">Status</th><th className="py-2"></th>
          </tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b border-white/5">
                <td className="py-2.5 text-white">{u.name}</td>
                <td className="py-2.5 text-white/70">{u.email}</td>
                <td className="py-2.5 capitalize text-white/70">{u.role}</td>
                <td className="py-2.5 text-white/70">{u.departmentId?.name || "—"}</td>
                <td className="py-2.5"><span className={u.isActive ? "text-emerald-400" : "text-red-400"}>{u.isActive ? "Active" : "Inactive"}</span></td>
                <td className="py-2.5">{u.isActive && u.role !== "admin" && (
                  <button onClick={() => deactivate(u._id)} className="text-red-400 hover:text-red-300"><Trash2 className="h-4 w-4" /></button>
                )}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
