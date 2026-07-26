import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface GuidelinesCardProps {
  title: string;
  items?: string[];
  guidelines?: string[];
  footer?: React.ReactNode;
  className?: string;
}

export function GuidelinesCard({
  title,
  items,
  guidelines,
  footer,
  className,
}: GuidelinesCardProps) {
  const list = items || guidelines || [];

  return (
    <div className={cn("panel-card", className)}>
      <h3 className="panel-title">{title}</h3>
      <ul className="space-y-2">
        {list.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-white/60">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            {item}
          </li>
        ))}
      </ul>
      {footer && (
        <div className="mt-2 border-t border-white/10 pt-2">{footer}</div>
      )}
    </div>
  );
}
