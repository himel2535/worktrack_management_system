"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { DONUT_CHART_ANIMATION_DURATION } from "@/hooks/useChartAnimationOnce";

export const progressBarFillClass =
  "h-full rounded-full bg-gradient-to-r from-[#022C22] via-[#059669] to-[#34D399] shadow-[0_0_12px_rgba(52,211,153,0.45),inset_0_1px_0_rgba(255,255,255,0.18)]";

export const progressBarTrackClass = "h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.08] ring-1 ring-white/[0.06]";

interface ProgressBarProps {
  value: number;
  className?: string;
  barClassName?: string;
  trackClassName?: string;
  showLabel?: boolean;
  animate?: boolean;
}

export function ProgressBar({
  value,
  className,
  barClassName,
  trackClassName,
  showLabel = false,
  animate = true,
}: ProgressBarProps) {
  const target = Math.min(100, Math.max(0, value));
  const [width, setWidth] = useState(animate ? 0 : target);
  const hasEntered = useRef(false);

  useEffect(() => {
    if (!animate) {
      setWidth(target);
      return;
    }

    const frame = requestAnimationFrame(() => {
      setWidth(target);
    });

    const timer = setTimeout(() => {
      hasEntered.current = true;
    }, DONUT_CHART_ANIMATION_DURATION);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [target, animate]);

  const transitionMs = hasEntered.current ? 400 : DONUT_CHART_ANIMATION_DURATION;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showLabel && (
        <span className="w-8 text-xs font-medium text-white/60">{Math.round(width)}%</span>
      )}
      <div className={cn(progressBarTrackClass, trackClassName)}>
        <div
          className={cn(progressBarFillClass, barClassName)}
          style={{
            width: `${width}%`,
            transition: animate ? `width ${transitionMs}ms ease-in-out` : undefined,
          }}
        />
      </div>
    </div>
  );
}
