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
import {
  projects,
  projectStats,
  recentActivity,
  overallProgressData,
} from "@/lib/mock-data/projects";
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
  MoreVertical,
  FileText,
  Coffee,
  Play,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  globe: Globe,
  box: Box,
  smartphone: Smartphone,
  palette: Palette,
  layout: Layout,
};

const activityIcons: Record<string, React.ElementType> = {
  update: FileText,
  break: Coffee,
  work: Play,
  project: FolderKanban,
};

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  return (
    <div className="page-stack">
      <PageHeader
        title="Projects"
        subtitle="Manage and track all your projects."
        actionLabel="New Project"
        showClock
      />

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <StatCard label="Total Projects" value={projectStats.total} subLabel={`${projectStats.completed} Completed`} icon={FolderKanban} iconBg="bg-emerald-50" iconColor="text-emerald-600" />
        <StatCard label="In Progress" value={projectStats.inProgress} subLabel="60% Avg Progress" icon={Loader} iconBg="bg-blue-50" iconColor="text-blue-600" />
        <StatCard label="Pending" value={projectStats.pending} subLabel="20% Avg Progress" icon={Clock} iconBg="bg-orange-50" iconColor="text-orange-600" />
        <StatCard label="Completed" value={projectStats.completed} subLabel="100% Avg Progress" icon={CheckCircle2} iconBg="bg-purple-50" iconColor="text-purple-600" />
      </div>

      <div className="page-grid lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="panel-card">
            <Tabs defaultValue="my-projects">
              <div className="border-b border-white/10 px-3.5 pb-2 pt-3">
                <TabsList variant="line" className="h-auto gap-2 p-0">
                  <TabsTrigger value="my-projects">My Projects</TabsTrigger>
                  <TabsTrigger value="archived">Archived Projects</TabsTrigger>
                </TabsList>
              </div>

              <div className="flex flex-wrap items-center gap-2 p-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <Input placeholder="Search projects..." className="pl-9" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="recent">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Sort: Recent</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                    <SelectItem value="progress">Progress</SelectItem>
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
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Tasks</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Worked</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => {
                      const Icon = iconMap[project.icon] || Globe;
                      return (
                        <TableRow key={project.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                                <Icon className="h-4 w-4 text-emerald-600" />
                              </div>
                              <div>
                                <p className="font-medium text-white">{project.name}</p>
                                <p className="text-xs text-white/50">{project.category}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="w-[140px]">
                            <ProgressBar value={project.progress} showLabel />
                          </TableCell>
                          <TableCell className="text-sm text-white/60">
                            {project.tasksCompleted}/{project.tasksTotal}
                          </TableCell>
                          <TableCell>
                            <p className="text-sm text-white">{project.deadline}</p>
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={project.status} />
                          </TableCell>
                          <TableCell className="text-sm text-white/50">{project.lastWorked}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                <div className="flex items-center justify-between border-t border-white/10 px-3 py-2 text-sm text-white/50">
                  <span>Showing 1 to {projects.length} of {projects.length} projects</span>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="page-col-stack lg:col-span-4">
          <div className="panel-card">
            <h3 className="panel-title">Overall Progress</h3>
            <DonutChart
              data={overallProgressData}
              centerValue={`${projectStats.avgProgress}%`}
              centerLabel="Avg Progress"
              height={180}
            />
          </div>

          <div className="panel-card">
            <h3 className="panel-title">Recent Activity</h3>
            <div className="space-y-2">
              {recentActivity.map((item) => {
                const Icon = activityIcons[item.type] || FileText;
                return (
                  <div key={item.id} className="flex gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                      <Icon className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{item.title}</p>
                      <p className="text-xs text-white/50">{item.description}</p>
                      <p className="text-xs text-white/40">{item.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Button variant="glass" className="mt-2 w-full">View All Activity</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
