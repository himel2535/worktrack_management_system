"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { DonutChart } from "@/components/charts/DonutChart";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import {
  FolderKanban,
  Loader,
  Clock,
  CheckCircle2,
  Search,
  LayoutGrid,
  List,
  Globe,
  Box,
  Smartphone,
  Palette,
  Layout,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  globe: Globe,
  box: Box,
  smartphone: Smartphone,
  palette: Palette,
  layout: Layout,
};

export default function ProjectsPage() {
  const { projects, openProjectModal, deleteProject } = useWorkTrack();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const totalProjects = projects.length;
  const inProgressProjects = projects.filter((p) => p.status === "in_progress").length;
  const pendingProjects = projects.filter((p) => p.status === "pending").length;
  const completedProjects = projects.filter((p) => p.status === "completed").length;

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" ? true : p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const chartData = [
    { name: "In Progress", value: inProgressProjects || 1, color: "#10B981" },
    { name: "Pending", value: pendingProjects || 0, color: "#F59E0B" },
    { name: "Completed", value: completedProjects || 0, color: "#3B82F6" },
  ];

  return (
    <div className="page-stack">
      <PageHeader
        title="Projects"
        subtitle="Manage and track all your projects."
        actionLabel="New Project"
        onActionClick={() => openProjectModal()}
        showClock
      />

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <StatCard label="Total Projects" value={totalProjects} subLabel={`${completedProjects} Completed`} icon={FolderKanban} iconBg="bg-emerald-50" iconColor="text-emerald-600" />
        <StatCard label="In Progress" value={inProgressProjects} subLabel="Active Projects" icon={Loader} iconBg="bg-blue-50" iconColor="text-blue-600" />
        <StatCard label="Pending" value={pendingProjects} subLabel="Awaiting Review" icon={Clock} iconBg="bg-orange-50" iconColor="text-orange-600" />
        <StatCard label="Completed" value={completedProjects} subLabel="Done" icon={CheckCircle2} iconBg="bg-purple-50" iconColor="text-purple-600" />
      </div>

      <div className="page-grid lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="panel-card">
            <Tabs defaultValue="my-projects">
              <div className="border-b border-white/10 px-3.5 pb-2 pt-3 flex items-center justify-between">
                <TabsList variant="line" className="h-auto gap-2 p-0">
                  <TabsTrigger value="my-projects">All Projects ({projects.length})</TabsTrigger>
                </TabsList>
                <Button
                  onClick={() => openProjectModal()}
                  className="bg-emerald-950/90 text-emerald-300 border border-emerald-800/70 hover:bg-emerald-900 hover:border-emerald-700 shadow-[inset_0_-2px_0_0_#059669] text-xs gap-1 py-1 h-8 rounded-lg font-semibold"
                >
                  <Plus className="h-3.5 w-3.5" />
                  New Project
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-2 p-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <Input
                    placeholder="Search projects..."
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
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-1">
                  <Button variant={viewMode === "grid" ? "default" : "outline"} size="icon" onClick={() => setViewMode("grid")} className={viewMode === "grid" ? "bg-emerald-600" : ""}>
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button variant={viewMode === "list" ? "default" : "outline"} size="icon" onClick={() => setViewMode("list")} className={viewMode === "list" ? "bg-emerald-600" : ""}>
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <TabsContent value="my-projects" className="m-0">
                {viewMode === "list" ? (
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10 hover:bg-transparent">
                        <TableHead className="text-white/70">Project</TableHead>
                        <TableHead className="text-white/70">Progress</TableHead>
                        <TableHead className="text-white/70">Tasks</TableHead>
                        <TableHead className="text-white/70">Deadline</TableHead>
                        <TableHead className="text-white/70">Status</TableHead>
                        <TableHead className="text-right text-white/70">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProjects.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-white/40 py-8">
                            No projects found. Click &quot;New Project&quot; to create one!
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredProjects.map((project) => {
                          const Icon = iconMap[project.icon] || Globe;
                          return (
                            <TableRow key={project.id} className="border-white/5 hover:bg-white/5 transition-colors">
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                    <Icon className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-white">{project.name}</p>
                                    <p className="text-xs text-white/50">{project.category}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="w-[120px]">
                                <ProgressBar value={project.progress} showLabel />
                              </TableCell>
                              <TableCell className="text-sm text-white/60">
                                {project.tasksCompleted} / {project.tasksTotal}
                              </TableCell>
                              <TableCell className="text-sm text-white/60">{project.deadline}</TableCell>
                              <TableCell><StatusBadge status={project.status} /></TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => openProjectModal(project)}
                                    className="h-8 w-8 text-white/60 hover:text-white"
                                  >
                                    <Pencil className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => deleteProject(project.id)}
                                    className="h-8 w-8 text-rose-400 hover:text-rose-300"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    {filteredProjects.map((project) => (
                      <div key={project.id} className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-bold text-white text-base">{project.name}</h4>
                            <p className="text-xs text-white/50">{project.category}</p>
                          </div>
                          <StatusBadge status={project.status} />
                        </div>
                        <p className="text-xs text-white/60 line-clamp-2">{project.description}</p>
                        <ProgressBar value={project.progress} showLabel />
                        <div className="flex items-center justify-between text-xs text-white/50 pt-2 border-t border-white/10">
                          <span>Deadline: {project.deadline}</span>
                          <div className="flex gap-2">
                            <button onClick={() => openProjectModal(project)} className="text-emerald-400 hover:underline">Edit</button>
                            <button onClick={() => deleteProject(project.id)} className="text-rose-400 hover:underline">Delete</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="panel-card border border-white/10 bg-[#0F172A]">
            <h3 className="panel-title text-emerald-400 mb-3">Overall Progress</h3>
            <DonutChart data={chartData} centerLabel="Projects" centerValue={totalProjects.toString()} />
          </div>
        </div>
      </div>
    </div>
  );
}
