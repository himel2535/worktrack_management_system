"use client";

import { useEffect, useState } from "react";
import { AdminPageLayout } from "@/components/admin/AdminPageLayout";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api/client";
import { Save, Clock, Shield, AlertCircle } from "lucide-react";

interface Settings {
  defaultOfficeStart: string;
  defaultOfficeEnd: string;
  graceMinutes: number;
  updateIntervalMin: number;
  latePenaltyAfterDays: number;
  latePenaltyPoints: number;
  absentPenaltyPoints: number;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    apiFetch<Settings>("/admin/settings").then(setSettings).catch(console.error);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    await apiFetch("/admin/settings", { method: "PATCH", body: JSON.stringify(settings) });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!settings) return null;

  const summaryRows = [
    { label: "Office Hours", value: `${settings.defaultOfficeStart} – ${settings.defaultOfficeEnd}` },
    { label: "Grace Period", value: `${settings.graceMinutes} minutes` },
    { label: "Update Interval", value: `${settings.updateIntervalMin} minutes` },
    { label: "Late Penalty After", value: `${settings.latePenaltyAfterDays} days` },
    { label: "Late Penalty Points", value: String(settings.latePenaltyPoints) },
    { label: "Absent Penalty Points", value: String(settings.absentPenaltyPoints) },
  ];

  return (
    <AdminPageLayout
      title="Company Settings"
      subtitle="Office hours, grace time, and penalty rules"
    >
      <div className="grid grid-cols-12 items-start gap-3">
        <div className="col-span-12 lg:col-span-8">
          <AdminPanel title="Office & Attendance Rules">
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-white/70">Office Start</label>
                  <Input value={settings.defaultOfficeStart} onChange={(e) => setSettings({ ...settings, defaultOfficeStart: e.target.value })} className="mt-1 bg-white/5 border-white/10 text-white" />
                </div>
                <div>
                  <label className="text-xs font-medium text-white/70">Office End</label>
                  <Input value={settings.defaultOfficeEnd} onChange={(e) => setSettings({ ...settings, defaultOfficeEnd: e.target.value })} className="mt-1 bg-white/5 border-white/10 text-white" />
                </div>
                <div>
                  <label className="text-xs font-medium text-white/70">Grace Minutes</label>
                  <Input type="number" value={settings.graceMinutes} onChange={(e) => setSettings({ ...settings, graceMinutes: +e.target.value })} className="mt-1 bg-white/5 border-white/10 text-white" />
                </div>
                <div>
                  <label className="text-xs font-medium text-white/70">Update Interval (min)</label>
                  <Input type="number" value={settings.updateIntervalMin} onChange={(e) => setSettings({ ...settings, updateIntervalMin: +e.target.value })} className="mt-1 bg-white/5 border-white/10 text-white" />
                </div>
                <div>
                  <label className="text-xs font-medium text-white/70">Late Penalty After Days</label>
                  <Input type="number" value={settings.latePenaltyAfterDays} onChange={(e) => setSettings({ ...settings, latePenaltyAfterDays: +e.target.value })} className="mt-1 bg-white/5 border-white/10 text-white" />
                </div>
                <div>
                  <label className="text-xs font-medium text-white/70">Late Penalty Points</label>
                  <Input type="number" value={settings.latePenaltyPoints} onChange={(e) => setSettings({ ...settings, latePenaltyPoints: +e.target.value })} className="mt-1 bg-white/5 border-white/10 text-white" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-white/70">Absent Penalty Points</label>
                  <Input type="number" value={settings.absentPenaltyPoints} onChange={(e) => setSettings({ ...settings, absentPenaltyPoints: +e.target.value })} className="mt-1 bg-white/5 border-white/10 text-white" />
                </div>
              </div>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                <Save className="h-4 w-4 mr-1" /> {saved ? "Saved!" : "Save Settings"}
              </Button>
            </form>
          </AdminPanel>
        </div>

        <div className="page-col-stack col-span-12 lg:col-span-4">
          <AdminPanel title="Current Policy Summary">
            <div className="space-y-1">
              {summaryRows.map((row) => (
                <div key={row.label} className="flex items-center justify-between border-b border-white/5 py-2.5 last:border-0">
                  <span className="text-sm text-white/60">{row.label}</span>
                  <span className="text-sm font-medium text-emerald-400">{row.value}</span>
                </div>
              ))}
            </div>
          </AdminPanel>

          <AdminPanel title="Policy Notes">
            <div className="space-y-3 text-sm text-white/55">
              <div className="flex gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <p>Grace minutes allow check-in without marking late.</p>
              </div>
              <div className="flex gap-2">
                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                <p>Update interval controls hourly update reminders for employees.</p>
              </div>
              <div className="flex gap-2">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <p>Penalty points apply after the configured late threshold.</p>
              </div>
            </div>
          </AdminPanel>
        </div>
      </div>
    </AdminPageLayout>
  );
}
