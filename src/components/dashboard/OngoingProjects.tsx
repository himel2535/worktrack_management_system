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
    <div className="rounded-2xl border border-slate-100/80 bg-white p-5 shadow-sm">
      <h3 className="mb-4 font-semibold text-slate-800">My Ongoing Projects</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ongoing.map((project) => {
          const Icon = iconMap[project.icon] || Globe;
          return (
            <div
              key={project.id}
              className="rounded-xl border border-slate-100 p-4 transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                  <Icon className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {project.name}
                  </p>
                  <p className="text-xs text-slate-500">{project.category}</p>
                </div>
              </div>
              <ProgressBar
                value={project.progress}
                showLabel
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-slate-500">
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
