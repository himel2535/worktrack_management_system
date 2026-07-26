import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface GuidelinesCardProps {
  title: string;
  items: string[];
  footer?: React.ReactNode;
  className?: string;
}

export function GuidelinesCard({
  title,
  items,
  footer,
  className,
}: GuidelinesCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-100 bg-white p-5 shadow-sm",
        className
      )}
    >
      <h3 className="mb-4 font-semibold text-slate-800">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            {item}
          </li>
        ))}
      </ul>
      {footer && <div className="mt-4 border-t border-slate-100 pt-4">{footer}</div>}
    </div>
  );
}
