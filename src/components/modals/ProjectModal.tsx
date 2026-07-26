"use client";

import React, { useState, useEffect } from "react";
import { useWorkTrack } from "@/context/WorkTrackContext";
import { ProjectStatus } from "@/lib/types";
import { X } from "lucide-react";

export function ProjectModal() {
  const { projectModalState, closeProjectModal, addProject, editProject } = useWorkTrack();
  const { isOpen, project } = projectModalState;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("in_progress");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    if (project) {
      setName(project.name);
      setCategory(project.category);
      setDescription(project.description);
      setStatus(project.status);
      setDeadline(project.deadline);
    } else {
      setName("");
      setCategory("Web Development");
      setDescription("");
      setStatus("in_progress");
      setDeadline(new Date().toISOString().split("T")[0]);
    }
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (project) {
      editProject(project.id, {
        name,
        category,
        description,
        status,
        deadline,
      });
    } else {
      addProject({
        name,
        category,
        description,
        status,
        deadline,
        lastWorked: "Just now",
        icon: "Layout",
      });
    }
    closeProjectModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl border border-emerald-500/30 bg-[#0F172A] p-6 shadow-[0_0_50px_rgba(5,150,105,0.2)] text-white">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-emerald-400">
            {project ? "Edit Project" : "Create New Project"}
          </h2>
          <button
            onClick={closeProjectModal}
            className="rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1">Project Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. TapZio Mobile App"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-sm text-white placeholder-white/40 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Web Development"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-sm text-white placeholder-white/40 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Project objective and scope..."
              className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-sm text-white placeholder-white/40 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                className="w-full rounded-xl border border-white/15 bg-[#111827] px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="in_progress">In Progress</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-[#111827] px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-white/10">
            <button
              type="button"
              onClick={closeProjectModal}
              className="rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-white/70 hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-emerald-950/90 text-emerald-300 border border-emerald-800/70 hover:bg-emerald-900 hover:border-emerald-700 shadow-[inset_0_-2px_0_0_#059669] px-5 py-2 text-sm font-bold transition-all"
            >
              {project ? "Save Changes" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
