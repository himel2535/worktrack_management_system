import { Globe, Box } from "lucide-react";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { projects } from "@/lib/mock-data/projects";

const iconMap: Record<string, React.ElementType> = {
  globe: Globe,
  box: Box,
};

export function OngoingProjects() {
  const ongoing = projects
    .filter((p) => p.status === "in_progress")
    .slice(0, 2);

  return (
    <div className="panel-card">
      <h3 className="panel-title">My Ongoing Projects</h3>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {ongoing.map((project) => {
          const Icon = iconMap[project.icon] || Globe;
          return (
            <div
              key={project.id}
              className="glass-card-inner rounded-xl p-3 transition-shadow hover:shadow-md"
            >
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20">
                  <Icon className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{project.name}</p>
                  <p className="text-xs text-white/50">{project.category}</p>
                </div>
              </div>
              <ProgressBar
                value={project.progress}
                showLabel
                className="mb-1.5"
                trackClassName="bg-white/10"
              />
              <div className="flex justify-between text-xs text-white/50">
                <span>
                  {project.tasksCompleted}/{project.tasksTotal} tasks
                </span>
                <span>{project.deadline}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
