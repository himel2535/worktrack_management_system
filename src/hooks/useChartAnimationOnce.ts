"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const CHART_ANIMATION_DURATION = 700;
export const DONUT_CHART_ANIMATION_DURATION = 1500;

/** Animate chart on first mount only — prevents stutter from timer re-renders. */
export function useChartAnimationOnce(duration = CHART_ANIMATION_DURATION) {
  const [isAnimationActive, setIsAnimationActive] = useState(true);
  const finishedRef = useRef(false);

  const onAnimationEnd = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setIsAnimationActive(false);
  }, []);

  useEffect(() => {
    const fallback = setTimeout(onAnimationEnd, duration + 100);
    return () => clearTimeout(fallback);
  }, [duration, onAnimationEnd]);

  return { isAnimationActive, onAnimationEnd, animationDuration: duration };
}
