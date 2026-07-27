"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiFetch } from "@/lib/api/client";
import { useAuth } from "@/context/AuthContext";
import { Plus, Trash2 } from "lucide-react";

interface Holiday { _id: string; name: string; date: string; type: string; description?: string; }

export default function HolidaysPage() {
  const { user } = useAuth();
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", date: "", type: "government", description: "" });
  const isAdmin = user?.role === "admin";

  const load = () => apiFetch<Holiday[]>("/holidays").then(setHolidays).catch(console.error);
  useEffect(() => { load(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiFetch("/holidays", { method: "POST", body: JSON.stringify(form) });
    setShowForm(false);
    load();
  };

  const handleDelete = async (id: string) => {
    await apiFetch(`/holidays/${id}`, { method: "DELETE" });
    load();
  };

  const typeColor: Record<string, string> = {
    government: "text-blue-400", optional: "text-amber-400", company: "text-emerald-400",
  };

  return (
    <div className="page-stack">
      <PageHeader title="Holiday Calendar" subtitle="Company and government holidays" showClock />
      {isAdmin && (
        <div className="flex justify-end">
          <Button onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4 mr-1" /> Add Holiday</Button>
        </div>
      )}
      {showForm && (
        <form onSubmit={handleCreate} className="panel-card grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input placeholder="Holiday Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="bg-white/5 border-white/10 text-white" />
          <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required className="bg-white/5 border-white/10 text-white" />
          <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v ?? "government" })}>
            <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="government">Government</SelectItem>
              <SelectItem value="optional">Optional</SelectItem>
              <SelectItem value="company">Company</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit">Save Holiday</Button>
        </form>
      )}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {holidays.map((h) => (
          <div key={h._id} className="panel-card flex items-start justify-between">
            <div>
              <p className="font-medium text-white">{h.name}</p>
              <p className="text-sm text-white/50">{h.date}</p>
              <p className={`text-xs capitalize mt-1 ${typeColor[h.type]}`}>{h.type}</p>
            </div>
            {isAdmin && <button onClick={() => handleDelete(h._id)} className="text-red-400 hover:text-red-300"><Trash2 className="h-4 w-4" /></button>}
          </div>
        ))}
      </div>
    </div>
  );
}
