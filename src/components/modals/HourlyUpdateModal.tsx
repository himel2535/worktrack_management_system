"use client";

import React, { useState } from "react";
import { useWorkTrack } from "@/context/WorkTrackContext";
import { X, Sparkles } from "lucide-react";

export function HourlyUpdateModal() {
  const { isHourlyUpdateModalOpen, closeHourlyUpdateModal, submitHourlyUpdate } = useWorkTrack();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!isHourlyUpdateModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    submitHourlyUpdate(title, description);
    setTitle("");
    setDescription("");
    closeHourlyUpdateModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl border border-sky-500/30 bg-[#0F172A] p-6 shadow-[0_0_50px_rgba(14,165,233,0.2)] text-white">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-sky-400" />
            <h2 className="text-lg font-bold text-sky-400">Submit Hourly Update</h2>
          </div>
          <button
            onClick={closeHourlyUpdateModal}
            className="rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="rounded-xl border border-sky-500/20 bg-sky-500/10 p-3 text-xs text-sky-300">
            🎁 Submitting on-time hourly updates earns you <strong className="text-white">+3 Points</strong> toward your daily performance score!
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1">Update Title / Summary</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Completed Subscription Table UI & styling"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-sm text-white placeholder-white/40 focus:border-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1">Detailed Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail what was accomplished during this hour..."
              className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-sm text-white placeholder-white/40 focus:border-sky-500 focus:outline-none"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-white/10">
            <button
              type="button"
              onClick={closeHourlyUpdateModal}
              className="rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-white/70 hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-emerald-950/90 text-emerald-300 border border-emerald-800/70 hover:bg-emerald-900 hover:border-emerald-700 shadow-[inset_0_-2px_0_0_#059669] px-5 py-2 text-sm font-bold transition-all"
            >
              Submit Update (+3 Pts)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
