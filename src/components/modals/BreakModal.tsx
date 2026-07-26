"use client";

import React, { useState } from "react";
import { useWorkTrack } from "@/context/WorkTrackContext";
import { BreakType } from "@/lib/types";
import { X, Coffee, Utensils, Moon, HelpCircle } from "lucide-react";

export function BreakModal() {
  const { isBreakModalOpen, closeBreakModal, startBreak } = useWorkTrack();
  const [selectedType, setSelectedType] = useState<BreakType>("personal");
  const [reason, setReason] = useState("");

  if (!isBreakModalOpen) return null;

  const handleStart = () => {
    startBreak(selectedType, reason);
    setReason("");
    closeBreakModal();
  };

  const types = [
    { type: "personal" as BreakType, label: "Personal Break", icon: Coffee, desc: "Short coffee or rest break" },
    { type: "lunch" as BreakType, label: "Lunch Break", icon: Utensils, desc: "Meal and rest break" },
    { type: "prayer" as BreakType, label: "Prayer Break", icon: Moon, desc: "Prayer & spiritual time" },
    { type: "other" as BreakType, label: "Other Break", icon: HelpCircle, desc: "Custom reason" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl border border-amber-500/30 bg-[#0F172A] p-6 shadow-[0_0_50px_rgba(245,158,11,0.2)] text-white">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-amber-400">Start a Break</h2>
          <button
            onClick={closeBreakModal}
            className="rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <p className="text-xs font-semibold text-white/70">Select Break Type:</p>
          <div className="grid grid-cols-2 gap-2.5">
            {types.map((t) => {
              const Icon = t.icon;
              const isSelected = selectedType === t.type;
              return (
                <button
                  key={t.type}
                  type="button"
                  onClick={() => setSelectedType(t.type)}
                  className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "border-amber-500 bg-amber-500/15 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                      : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  <Icon className={`h-5 w-5 mb-1.5 ${isSelected ? "text-amber-400" : "text-white/60"}`} />
                  <span className="text-xs font-bold">{t.label}</span>
                  <span className="text-[10px] text-white/40 mt-0.5">{t.desc}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-3">
            <label className="block text-xs font-semibold text-white/70 mb-1">Reason / Note (Optional)</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Grabbing coffee..."
              className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-sm text-white placeholder-white/40 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-white/10">
            <button
              type="button"
              onClick={closeBreakModal}
              className="rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-white/70 hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleStart}
              className="rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 px-5 py-2 text-sm font-bold text-white shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:brightness-110 transition-all"
            >
              Start Break Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
