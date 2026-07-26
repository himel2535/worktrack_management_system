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
import { tasks, taskStats } from "@/lib/mock-data/tasks";
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
  Download,
  Play,
  FolderKanban,
  Flag,
  Calendar,
  Clock,
} from "lucide-react";

export default function TasksPage() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(tasks[0]);

  return (
    <div className="page-stack">
      <PageHeader
        title="Tasks"
        subtitle="Manage your tasks and track your progress."
        actionLabel="Add Task"
        showClock
      />

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
        <StatCard label="Total Tasks" value={taskStats.total} icon={CheckSquare} iconBg="bg-emerald-50" iconColor="text-emerald-600" />
        <StatCard label="To Do" value={taskStats.todo} icon={FileText} iconBg="bg-blue-50" iconColor="text-blue-600" />
        <StatCard label="In Progress" value={taskStats.inProgress} icon={Loader} iconBg="bg-orange-50" iconColor="text-orange-600" />
        <StatCard label="Review" value={taskStats.review} icon={MessageSquare} iconBg="bg-purple-50" iconColor="text-purple-600" />
        <StatCard label="Completed" value={taskStats.completed} icon={CheckCircle2} iconBg="bg-green-50" iconColor="text-green-600" />
      </div>

      <div className="page-grid lg:grid-cols-12">
        <div className={`${selectedTask ? "lg:col-span-8" : "lg:col-span-12"} transition-all`}>
          <div className="panel-card">
            <Tabs defaultValue="my-tasks">
              <div className="border-b border-white/10 px-3.5 pb-2 pt-3">
                <TabsList variant="line" className="h-auto gap-2 p-0">
                  <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
                  <TabsTrigger value="completed">Completed Tasks</TabsTrigger>
                </TabsList>
              </div>

              <div className="flex flex-wrap items-center gap-2 p-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <Input placeholder="Search tasks..." className="pl-9" />
                </div>
                <Select defaultValue="all-projects">
                  <SelectTrigger className="w-[150px]"><SelectValue placeholder="All Projects" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-projects">All Projects</SelectItem>
                    <SelectItem value="tapzio">TapZio Website</SelectItem>
                    <SelectItem value="erp">ERP System</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all-status">
                  <SelectTrigger className="w-[130px]"><SelectValue placeholder="All Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-status">All Status</SelectItem>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="priority">
                  <SelectTrigger className="w-[150px]"><SelectValue placeholder="Sort" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="priority">Sort: Priority</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="glass" size="icon"><Filter className="h-4 w-4" /></Button>
              </div>

              <TabsContent value="my-tasks" className="m-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10"></TableHead>
                      <TableHead>Task</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.filter((t) => t.status !== "completed").map((task) => (
                      <TableRow
                        key={task.id}
                        className={`cursor-pointer ${selectedTask?.id === task.id ? "bg-emerald-50/50" : ""}`}
                        onClick={() => setSelectedTask(task)}
                      >
                        <TableCell><Checkbox /></TableCell>
                        <TableCell>
                          <p className="font-medium text-white">{task.title}</p>
                          <p className="text-xs text-white/50 line-clamp-1">{task.description}</p>
                        </TableCell>
                        <TableCell className="text-sm text-white/60">{task.projectName}</TableCell>
                        <TableCell><PriorityBadge priority={task.priority} /></TableCell>
                        <TableCell><StatusBadge status={task.status} /></TableCell>
                        <TableCell>
                          <span className={`text-sm ${task.deadlineLabel?.includes("Today") ? "text-red-600 font-medium" : "text-white/60"}`}>
                            {task.deadlineLabel || task.deadline}
                          </span>
                        </TableCell>
                        <TableCell className="w-[100px]">
                          <ProgressBar value={task.progress} showLabel />
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {selectedTask && (
          <div className="lg:col-span-4">
            <div className="sticky top-3 panel-card">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="panel-title mb-0">Task Details</h3>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                </div>
              </div>

              <h2 className="mb-2 text-xl font-bold text-white">{selectedTask.title}</h2>
              <StatusBadge status={selectedTask.status} />

              <div className="mt-3 space-y-2">
                {[
                  { icon: FolderKanban, label: "Project", value: selectedTask.projectName },
                  { icon: Flag, label: "Priority", value: selectedTask.priority, badge: true },
                  { icon: Calendar, label: "Deadline", value: selectedTask.deadlineLabel || selectedTask.deadline },
                  { icon: Calendar, label: "Created", value: selectedTask.createdAt },
                  { icon: FileText, label: "Task Type", value: selectedTask.taskType },
                  { icon: Clock, label: "Estimated Time", value: selectedTask.estimatedTime },
                  { icon: Clock, label: "Spent Time", value: selectedTask.spentTime },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 text-sm">
                    <item.icon className="h-4 w-4 text-white/40" />
                    <span className="text-white/50">{item.label}</span>
                    <span className="ml-auto font-medium capitalize text-white">
                      {item.badge ? <PriorityBadge priority={selectedTask.priority} /> : item.value}
                    </span>
                  </div>
                ))}
                <div className="flex items-center gap-3 text-sm">
                  <Loader className="h-4 w-4 text-white/40" />
                  <span className="text-white/50">Progress</span>
                  <div className="ml-auto w-24"><ProgressBar value={selectedTask.progress} showLabel /></div>
                </div>
              </div>

              <div className="mt-3">
                <h4 className="mb-1.5 text-sm font-medium text-white/80">Description</h4>
                <p className="text-sm text-white/60">{selectedTask.description}</p>
              </div>

              {selectedTask.attachments && selectedTask.attachments.length > 0 && (
                <div className="mt-3">
                  <h4 className="mb-1.5 text-sm font-medium text-white/80">Attachments</h4>
                  {selectedTask.attachments.map((file) => (
                    <div key={file.id} className="flex items-center justify-between rounded-lg border border-white/10 p-2">
                      <div>
                        <p className="text-sm font-medium text-white">{file.name}</p>
                        <p className="text-xs text-white/50">{file.size}</p>
                      </div>
                      <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                    </div>
                  ))}
                </div>
              )}

              <Button className="mt-3 w-full gap-2 bg-[#059669] hover:bg-[#047857]">
                <Play className="h-4 w-4" />
                Start Work
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
