"use client";

import React, { useState, useEffect } from "react";
import { useWorkTrack } from "@/context/WorkTrackContext";
import { TaskPriority, TaskStatus } from "@/lib/types";
import { X } from "lucide-react";

export function TaskModal() {
  const { taskModalState, closeTaskModal, addTask, editTask, projects } = useWorkTrack();
  const { isOpen, task } = taskModalState;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [deadline, setDeadline] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("4h");
  const [taskType, setTaskType] = useState("Development");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setProjectId(task.projectId);
      setPriority(task.priority);
      setStatus(task.status);
      setDeadline(task.deadline);
      setEstimatedTime(task.estimatedTime);
      setTaskType(task.taskType);
    } else {
      setTitle("");
      setDescription("");
      setProjectId(projects[0]?.id || "1");
      setPriority("medium");
      setStatus("todo");
      setDeadline(new Date().toISOString().split("T")[0]);
      setEstimatedTime("4h");
      setTaskType("Development");
    }
  }, [task, isOpen, projects]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const selectedProj = projects.find((p) => p.id === projectId) || projects[0];

    if (task) {
      editTask(task.id, {
        title,
        description,
        projectId: selectedProj.id,
        projectName: selectedProj.name,
        priority,
        status,
        deadline,
        estimatedTime,
        taskType,
      });
    } else {
      addTask({
        title,
        description,
        projectId: selectedProj.id,
        projectName: selectedProj.name,
        priority,
        status,
        deadline,
        estimatedTime,
        spentTime: "0h",
        taskType,
      });
    }
    closeTaskModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl border border-emerald-500/30 bg-[#0F172A] p-6 shadow-[0_0_50px_rgba(5,150,105,0.2)] text-white">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-emerald-400">
            {task ? "Edit Task" : "Create New Task"}
          </h2>
          <button
            onClick={closeTaskModal}
            className="rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1">Task Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Design Subscription Table UI"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-sm text-white placeholder-white/40 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a brief task summary..."
              className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-sm text-white placeholder-white/40 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">Project</label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-[#111827] px-3.5 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">Task Type</label>
              <select
                value={taskType}
                onChange={(e) => setTaskType(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-[#111827] px-3.5 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Testing">Testing</option>
                <option value="Research">Research</option>
                <option value="Documentation">Documentation</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full rounded-xl border border-white/15 bg-[#111827] px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full rounded-xl border border-white/15 bg-[#111827] px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="review">Review</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">Est. Time</label>
              <input
                type="text"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
                placeholder="4h"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-white/10">
            <button
              type="button"
              onClick={closeTaskModal}
              className="rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-white/70 hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-emerald-950/90 text-emerald-300 border border-emerald-800/70 hover:bg-emerald-900 hover:border-emerald-700 shadow-[inset_0_-2px_0_0_#059669] px-5 py-2 text-sm font-bold transition-all"
            >
              {task ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
