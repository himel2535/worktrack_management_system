"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useWorkTrack } from "@/context/WorkTrackContext";
import { User, Save, CheckCircle2, Shield, Bell, Palette } from "lucide-react";

export default function SettingsPage() {
  const { user, updateUser, todayNote, setTodayNote } = useWorkTrack();
  const [name, setName] = useState(user.name);
  const [designation, setDesignation] = useState(user.designation || user.role);
  const [email, setEmail] = useState(user.email);
  const [note, setNote] = useState(todayNote);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, designation, role: designation, email });
    setTodayNote(note);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="page-stack">
      <PageHeader
        title="Settings"
        subtitle="Manage your profile, preferences and daily work notes."
        showClock
      />

      <div className="max-w-4xl space-y-6">
        <form onSubmit={handleSave} className="panel-card border border-white/10 bg-[#0F172A] space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Profile Information</h3>
                <p className="text-xs text-white/50">Update your account details and public display info</p>
              </div>
            </div>
            {savedSuccess && (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5 rounded-lg animate-pulse">
                <CheckCircle2 className="h-4 w-4" />
                Saved Successfully!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/70">Full Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder-white/40"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/70">Job Designation</label>
              <Input
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder-white/40"
                required
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-medium text-white/70">Email Address</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder-white/40"
                required
              />
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 space-y-2">
            <label className="text-xs font-medium text-white/70">Daily Note / Focus Goal</label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What are your key goals for today?"
              className="bg-white/5 border-white/10 text-white placeholder-white/40 min-h-[100px]"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              className="bg-emerald-950/90 text-emerald-300 border border-emerald-800/70 hover:bg-emerald-900 hover:border-emerald-700 shadow-[inset_0_-2px_0_0_#059669] font-bold gap-2 rounded-xl py-2 px-6"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="panel-card border border-white/10 bg-[#0F172A] p-4 space-y-2">
            <Shield className="h-6 w-6 text-emerald-400" />
            <h4 className="font-bold text-white text-sm">Security & Privacy</h4>
            <p className="text-xs text-white/50">Local data storage active with end-to-end browser encryption.</p>
          </div>
          <div className="panel-card border border-white/10 bg-[#0F172A] p-4 space-y-2">
            <Bell className="h-6 w-6 text-sky-400" />
            <h4 className="font-bold text-white text-sm">Notifications</h4>
            <p className="text-xs text-white/50">Hourly update reminders enabled for maximum productivity.</p>
          </div>
          <div className="panel-card border border-white/10 bg-[#0F172A] p-4 space-y-2">
            <Palette className="h-6 w-6 text-purple-400" />
            <h4 className="font-bold text-white text-sm">Theme & Aesthetic</h4>
            <p className="text-xs text-white/50">Dark glassmorphism theme with Emerald accent active.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
