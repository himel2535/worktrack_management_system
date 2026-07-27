"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api/client";
import { Save } from "lucide-react";

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

  return (
    <div className="page-stack">
      <PageHeader title="Company Settings" subtitle="Office hours, grace time, and penalty rules" showClock />
      <form onSubmit={handleSave} className="panel-card max-w-2xl space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div><label className="text-xs text-white/70">Office Start</label>
            <Input value={settings.defaultOfficeStart} onChange={(e) => setSettings({ ...settings, defaultOfficeStart: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
          <div><label className="text-xs text-white/70">Office End</label>
            <Input value={settings.defaultOfficeEnd} onChange={(e) => setSettings({ ...settings, defaultOfficeEnd: e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
          <div><label className="text-xs text-white/70">Grace Minutes</label>
            <Input type="number" value={settings.graceMinutes} onChange={(e) => setSettings({ ...settings, graceMinutes: +e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
          <div><label className="text-xs text-white/70">Update Interval (min)</label>
            <Input type="number" value={settings.updateIntervalMin} onChange={(e) => setSettings({ ...settings, updateIntervalMin: +e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
          <div><label className="text-xs text-white/70">Late Penalty After Days</label>
            <Input type="number" value={settings.latePenaltyAfterDays} onChange={(e) => setSettings({ ...settings, latePenaltyAfterDays: +e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
          <div><label className="text-xs text-white/70">Late Penalty Points</label>
            <Input type="number" value={settings.latePenaltyPoints} onChange={(e) => setSettings({ ...settings, latePenaltyPoints: +e.target.value })} className="bg-white/5 border-white/10 text-white mt-1" /></div>
        </div>
        <Button type="submit"><Save className="h-4 w-4 mr-1" /> {saved ? "Saved!" : "Save Settings"}</Button>
      </form>
    </div>
  );
}
