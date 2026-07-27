"use client";

import React, { createContext, useContext } from "react";
import { WorkSession } from "@/lib/types";

export interface WorkTrackWorkTimerContextType {
  workSession: WorkSession;
  isWorkTimerRunning: boolean;
  activeWorkSeconds: number;
}

export interface WorkTrackBreakTimerContextType {
  activeBreakSeconds: number;
}

/** @deprecated Use useWorkTrackWorkTimer or useWorkTrackBreakTimer */
export interface WorkTrackTimerContextType
  extends WorkTrackWorkTimerContextType,
    WorkTrackBreakTimerContextType {}

const WorkTrackWorkTimerContext = createContext<
  WorkTrackWorkTimerContextType | undefined
>(undefined);

const WorkTrackBreakTimerContext = createContext<
  WorkTrackBreakTimerContextType | undefined
>(undefined);

export function WorkTrackWorkTimerProvider({
  value,
  children,
}: {
  value: WorkTrackWorkTimerContextType;
  children: React.ReactNode;
}) {
  return (
    <WorkTrackWorkTimerContext.Provider value={value}>
      {children}
    </WorkTrackWorkTimerContext.Provider>
  );
}

export function WorkTrackBreakTimerProvider({
  value,
  children,
}: {
  value: WorkTrackBreakTimerContextType;
  children: React.ReactNode;
}) {
  return (
    <WorkTrackBreakTimerContext.Provider value={value}>
      {children}
    </WorkTrackBreakTimerContext.Provider>
  );
}

export const useWorkTrackWorkTimer = () => {
  const context = useContext(WorkTrackWorkTimerContext);
  if (!context) {
    throw new Error("useWorkTrackWorkTimer must be used within a WorkTrackProvider");
  }
  return context;
};

export const useWorkTrackBreakTimer = () => {
  const context = useContext(WorkTrackBreakTimerContext);
  if (!context) {
    throw new Error("useWorkTrackBreakTimer must be used within a WorkTrackProvider");
  }
  return context;
};

/** Combined hook — prefer split hooks to avoid unnecessary re-renders. */
export const useWorkTrackTimer = (): WorkTrackTimerContextType => {
  const work = useWorkTrackWorkTimer();
  const brk = useWorkTrackBreakTimer();
  return { ...work, ...brk };
};
