"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useWorkTrack } from "@/context/WorkTrackContext";
import { useTheme } from "next-themes";
import { apiFetch } from "@/lib/api/client";
import { User, Save, CheckCircle2, Shield, Bell, Palette, Sun, Moon } from "lucide-react";

export default function SettingsPage() {
  const { user, updateUser, todayNote, setTodayNote } = useWorkTrack();
  const { theme, setTheme } = useTheme();
  const [name, setName] = useState(user.name);
  const [designation, setDesignation] = useState(user.designation || user.role);
  const [email, setEmail] = useState(user.email);
  const [note, setNote] = useState(todayNote);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser({ name, designation, role: designation, email });
    await setTodayNote(note);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiFetch("/auth/password", { method: "PATCH", body: JSON.stringify({ currentPassword, newPassword }) });
      setPasswordMsg("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setPasswordMsg(err instanceof Error ? err.message : "Failed to update password");
    }
  };

  return (
    <div className="page-stack">
      <PageHeader title="Settings" subtitle="Manage your profile, preferences and daily work notes." showClock />

      <div className="max-w-4xl space-y-6">
        <form onSubmit={handleSave} className="panel-card border border-white/10 bg-[#0F172A] space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Profile Information</h3>
                <p className="text-xs text-white/50">Update your account details and daily notes</p>
              </div>
            </div>
            {savedSuccess && (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="h-4 w-4" /> Saved!
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/70">Full Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} className="bg-white/5 border-white/10 text-white" required />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/70">Job Designation</label>
              <Input value={designation} onChange={(e) => setDesignation(e.target.value)} className="bg-white/5 border-white/10 text-white" required />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-medium text-white/70">Email Address</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white/5 border-white/10 text-white" required />
            </div>
          </div>
          <div className="border-t border-white/10 pt-4 space-y-2">
            <label className="text-xs font-medium text-white/70">Daily Note / Focus Goal</label>
            <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="What are your key goals for today?" className="bg-white/5 border-white/10 text-white min-h-[100px]" />
          </div>
          <div className="flex justify-end pt-2">
            <Button type="submit" className="gap-2"><Save className="h-4 w-4" /> Save Changes</Button>
          </div>
        </form>

        <form onSubmit={handlePasswordChange} className="panel-card space-y-4">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <Shield className="h-5 w-5 text-emerald-400" />
            <h3 className="font-bold text-white">Change Password</h3>
          </div>
          <Input type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="bg-white/5 border-white/10 text-white" required />
          <Input type="password" placeholder="New Password (min 6 chars)" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="bg-white/5 border-white/10 text-white" required minLength={6} />
          {passwordMsg && <p className="text-sm text-emerald-400">{passwordMsg}</p>}
          <Button type="submit">Update Password</Button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="panel-card p-4 space-y-3">
            <div className="flex items-center gap-2"><Bell className="h-5 w-5 text-sky-400" /><h4 className="font-bold text-white text-sm">Notifications</h4></div>
            <p className="text-xs text-white/50">Hourly update reminders are sent 10 minutes before due time.</p>
          </div>
          <div className="panel-card p-4 space-y-3">
            <div className="flex items-center gap-2"><Palette className="h-5 w-5 text-purple-400" /><h4 className="font-bold text-white text-sm">Theme</h4></div>
            <div className="flex gap-2">
              <Button variant={theme === "dark" ? "default" : "glass"} size="sm" onClick={() => setTheme("dark")}><Moon className="h-4 w-4 mr-1" /> Dark</Button>
              <Button variant={theme === "light" ? "default" : "glass"} size="sm" onClick={() => setTheme("light")}><Sun className="h-4 w-4 mr-1" /> Light</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
