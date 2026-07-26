"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { PriorityBadge } from "@/components/shared/PriorityBadge";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useWorkTrack } from "@/context/WorkTrackContext";
import { Task } from "@/lib/types";
import {
  CheckSquare,
  FileText,
  Loader,
  MessageSquare,
  CheckCircle2,
  Search,
  Filter,
  MoreVertical,
  Pencil,
  Trash2,
  Play,
  FolderKanban,
  Flag,
  Calendar,
  Clock,
  Plus,
} from "lucide-react";

export default function TasksPage() {
  const { tasks, openTaskModal, deleteTask, updateTaskStatus, startWorkSession } = useWorkTrack();
  const [selectedTask, setSelectedTask] = useState<Task | null>(tasks[0] || null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("my-tasks");

  // Dynamic stat counts
  const totalCount = tasks.length;
  const todoCount = tasks.filter((t) => t.status === "todo").length;
  const inProgressCount = tasks.filter((t) => t.status === "in_progress").length;
  const reviewCount = tasks.filter((t) => t.status === "review").length;
  const completedCount = tasks.filter((t) => t.status === "completed").length;

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    const matchesTab = activeTab === "completed" ? t.status === "completed" : t.status !== "completed";
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" ? true : t.status === statusFilter;
    return matchesTab && matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string) => {
    deleteTask(id);
    if (selectedTask?.id === id) {
      setSelectedTask(null);
    }
  };

  return (
    <div className="page-stack">
      <PageHeader
        title="Tasks"
        subtitle="Manage your tasks and track your progress."
        actionLabel="Add Task"
        onActionClick={() => openTaskModal()}
        showClock
      />

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
        <StatCard label="Total Tasks" value={totalCount} icon={CheckSquare} iconBg="bg-emerald-50" iconColor="text-emerald-600" />
        <StatCard label="To Do" value={todoCount} icon={FileText} iconBg="bg-blue-50" iconColor="text-blue-600" />
        <StatCard label="In Progress" value={inProgressCount} icon={Loader} iconBg="bg-orange-50" iconColor="text-orange-600" />
        <StatCard label="Review" value={reviewCount} icon={MessageSquare} iconBg="bg-purple-50" iconColor="text-purple-600" />
        <StatCard label="Completed" value={completedCount} icon={CheckCircle2} iconBg="bg-green-50" iconColor="text-green-600" />
      </div>

      <div className="page-grid lg:grid-cols-12">
        <div className={`${selectedTask ? "lg:col-span-8" : "lg:col-span-12"} transition-all`}>
          <div className="panel-card">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="border-b border-white/10 px-3.5 pb-2 pt-3 flex items-center justify-between">
                <TabsList variant="line" className="h-auto gap-2 p-0">
                  <TabsTrigger value="my-tasks">My Tasks ({tasks.filter((t) => t.status !== "completed").length})</TabsTrigger>
                  <TabsTrigger value="completed">Completed ({completedCount})</TabsTrigger>
                </TabsList>
                <Button
                  onClick={() => openTaskModal()}
                  className="bg-emerald-950/90 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-900 hover:border-emerald-700/80 shadow-[inset_0_-2px_0_0_#059669] text-xs gap-1 py-1 h-8 rounded-lg font-semibold"
                >
                  <Plus className="h-3.5 w-3.5" />
                  New Task
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-2 p-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-white/5 border-white/10 text-white placeholder-white/40"
                  />
                </div>
                <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val ?? "all")}>
                  <SelectTrigger className="w-[140px] bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <TabsContent value={activeTab} className="m-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead className="w-10"></TableHead>
                      <TableHead className="text-white/70">Task</TableHead>
                      <TableHead className="text-white/70">Project</TableHead>
                      <TableHead className="text-white/70">Priority</TableHead>
                      <TableHead className="text-white/70">Status</TableHead>
                      <TableHead className="text-white/70">Progress</TableHead>
                      <TableHead className="text-right text-white/70">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTasks.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-white/40 py-8">
                          No tasks found. Click &quot;Add Task&quot; to create one!
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTasks.map((task) => (
                        <TableRow
                          key={task.id}
                          className={`cursor-pointer transition-colors border-white/5 ${
                            selectedTask?.id === task.id
                              ? "bg-emerald-950/60 border-l-2 border-l-emerald-500"
                              : "hover:bg-white/5"
                          }`}
                          onClick={() => setSelectedTask(task)}
                        >
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <Checkbox
                              checked={task.status === "completed"}
                              onCheckedChange={(checked) =>
                                updateTaskStatus(task.id, checked ? "completed" : "in_progress")
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <p className="font-medium text-white">{task.title}</p>
                            <p className="text-xs text-white/50 line-clamp-1">{task.description}</p>
                          </TableCell>
                          <TableCell className="text-sm text-white/60">{task.projectName}</TableCell>
                          <TableCell><PriorityBadge priority={task.priority} /></TableCell>
                          <TableCell><StatusBadge status={task.status} /></TableCell>
                          <TableCell className="w-[100px]">
                            <ProgressBar value={task.progress} showLabel />
                          </TableCell>
                          <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openTaskModal(task)}
                                className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
                              >
                                <Pencil className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(task.id)}
                                className="h-8 w-8 text-rose-400 hover:text-rose-300 hover:bg-rose-500/20"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {selectedTask && (
          <div className="lg:col-span-4">
            <div className="sticky top-3 panel-card border border-white/10 bg-[#0F172A]">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="panel-title mb-0 text-emerald-400">Task Details</h3>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openTaskModal(selectedTask)}
                    className="h-8 w-8 text-white/60 hover:text-white"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(selectedTask.id)}
                    className="h-8 w-8 text-rose-400 hover:text-rose-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <h2 className="mb-2 text-xl font-bold text-white">{selectedTask.title}</h2>
              <div className="mb-4">
                <StatusBadge status={selectedTask.status} />
              </div>

              <p className="text-xs text-white/60 leading-relaxed mb-4">{selectedTask.description}</p>

              <div className="space-y-3 border-t border-white/10 pt-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50 flex items-center gap-1.5">
                    <FolderKanban className="h-3.5 w-3.5 text-emerald-400" /> Project:
                  </span>
                  <span className="font-semibold text-white">{selectedTask.projectName}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50 flex items-center gap-1.5">
                    <Flag className="h-3.5 w-3.5 text-amber-400" /> Priority:
                  </span>
                  <PriorityBadge priority={selectedTask.priority} />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-sky-400" /> Deadline:
                  </span>
                  <span className="text-white font-medium">{selectedTask.deadline}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-purple-400" /> Est. Time:
                  </span>
                  <span className="text-white font-medium">{selectedTask.estimatedTime}</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex gap-2">
                <Button
                  onClick={() => startWorkSession()}
                  className="w-full bg-emerald-950/90 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-900 hover:border-emerald-700/80 shadow-[inset_0_-2px_0_0_#059669] font-bold gap-2 rounded-xl py-2.5"
                >
                  <Play className="h-4 w-4 fill-emerald-300" />
                  Start Work on This Task
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
