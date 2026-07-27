"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import {
  WorkTrackWorkTimerProvider,
  WorkTrackBreakTimerProvider,
  WorkTrackWorkTimerContextType,
  WorkTrackBreakTimerContextType,
} from "@/context/WorkTrackTimerContext";
import {
  Task,
  Project,
  BreakRecord,
  HourlyUpdate,
  WorkSession,
  AttendanceRecord,
  TimelineEvent,
  User,
  BreakType,
  TaskStatus,
  ProjectStatus,
} from "@/lib/types";
import { apiFetch } from "@/lib/api/client";
import { useAuth } from "@/context/AuthContext";

export interface ActiveBreakState {
  id: string;
  startTime: string;
  startTimestamp: number;
  type: BreakType;
  reason?: string;
  projectName?: string;
  taskName?: string;
}

export interface WorkTrackContextType {
  user: User;
  updateUser: (user: Partial<User>) => void;
  todayNote: string;
  setTodayNote: (note: string) => void;
  startWorkSession: (opts?: { startPhotoUrl?: string }) => void;
  pauseWorkSession: () => void;
  stopWorkSession: (opts?: { endPhotoUrl?: string }) => void;
  isClockedIn: boolean;
  clockInTime: string;
  attendanceRecords: AttendanceRecord[];
  clockIn: () => void;
  clockOut: () => void;
  breaks: BreakRecord[];
  activeBreak: ActiveBreakState | null;
  startBreak: (type: BreakType, reason?: string) => void;
  endBreak: () => void;
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "createdAt" | "progress">) => void;
  editTask: (id: string, updated: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  projects: Project[];
  addProject: (project: Omit<Project, "id" | "tasksCompleted" | "tasksTotal" | "progress">) => void;
  editProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  hourlyUpdates: HourlyUpdate[];
  submitHourlyUpdate: (title: string, description: string) => void;
  todayPoints: number;
  timeline: TimelineEvent[];
  canManageProjects: boolean;
  canManageTasks: boolean;
  refreshData: () => Promise<void>;
  taskModalState: { isOpen: boolean; task?: Task | null };
  openTaskModal: (task?: Task | null) => void;
  closeTaskModal: () => void;
  projectModalState: { isOpen: boolean; project?: Project | null };
  openProjectModal: (project?: Project | null) => void;
  closeProjectModal: () => void;
  isBreakModalOpen: boolean;
  openBreakModal: () => void;
  closeBreakModal: () => void;
  isHourlyUpdateModalOpen: boolean;
  openHourlyUpdateModal: () => void;
  closeHourlyUpdateModal: () => void;
  isSessionHistoryModalOpen: boolean;
  openSessionHistoryModal: () => void;
  closeSessionHistoryModal: () => void;
}

const WorkTrackContext = createContext<WorkTrackContextType | undefined>(undefined);

function mapDoc<T extends Record<string, unknown>>(doc: T): T & { id: string } {
  const id = (doc._id as string)?.toString?.() || (doc.id as string) || "";
  return { ...doc, id } as T & { id: string };
}

const defaultWorkSession: WorkSession = {
  isActive: false,
  projectId: "",
  projectName: "",
  taskId: "",
  taskName: "",
  startedAt: "",
  estimatedEnd: "",
  totalWorkTime: "00:00:00",
  nextUpdateDueIn: "60:00",
  updateProgress: 0,
  updateInterval: "60 min",
  lastUpdateAt: "",
  lastUpdateStatus: "upcoming",
  breakTaken: "0m",
};

export const WorkTrackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user: authUser } = useAuth();

  const user: User = useMemo(
    () => ({
      id: authUser?.id || "",
      name: authUser?.name || "",
      role: authUser?.designation || authUser?.role || "",
      email: authUser?.email || "",
      avatar: authUser?.avatar || "",
      designation: authUser?.designation,
    }),
    [authUser]
  );

  const canManageProjects = authUser?.role === "admin" || authUser?.role === "manager";
  const canManageTasks = authUser?.role === "admin" || authUser?.role === "manager";

  const [todayNote, setTodayNoteState] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [breaks, setBreaks] = useState<BreakRecord[]>([]);
  const [hourlyUpdates, setHourlyUpdates] = useState<HourlyUpdate[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [todayPoints, setTodayPoints] = useState(0);

  const [workSession, setWorkSession] = useState<WorkSession>(defaultWorkSession);
  const [isWorkTimerRunning, setIsWorkTimerRunning] = useState(false);
  const [activeWorkSeconds, setActiveWorkSeconds] = useState(0);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState("");
  const [activeBreak, setActiveBreak] = useState<ActiveBreakState | null>(null);
  const [activeBreakSeconds, setActiveBreakSeconds] = useState(0);

  const [taskModalState, setTaskModalState] = useState<{ isOpen: boolean; task?: Task | null }>({ isOpen: false, task: null });
  const [projectModalState, setProjectModalState] = useState<{ isOpen: boolean; project?: Project | null }>({ isOpen: false, project: null });
  const [isBreakModalOpen, setIsBreakModalOpen] = useState(false);
  const [isHourlyUpdateModalOpen, setIsHourlyUpdateModalOpen] = useState(false);
  const [isSessionHistoryModalOpen, setIsSessionHistoryModalOpen] = useState(false);

  const refreshData = useCallback(async () => {
    if (!authUser) return;
    try {
      const [tasksData, projectsData, breaksData, updatesData, attendanceData, timelineData, pointsData, noteData, sessionData] =
        await Promise.all([
          apiFetch<Record<string, unknown>[]>("/tasks").catch(() => []),
          apiFetch<Record<string, unknown>[]>("/projects").catch(() => []),
          apiFetch<Record<string, unknown>[]>("/breaks").catch(() => []),
          apiFetch<Record<string, unknown>[]>("/hourly-updates").catch(() => []),
          apiFetch<Record<string, unknown>[]>("/attendance").catch(() => []),
          apiFetch<Record<string, unknown>[]>("/performance/timeline").catch(() => []),
          apiFetch<{ todayPoints: number }>("/performance/points/summary").catch(() => ({ todayPoints: 0 })),
          apiFetch<{ note: string }>("/performance/note").catch(() => ({ note: "" })),
          apiFetch<{ session: Record<string, unknown> | null; activeBreak: Record<string, unknown> | null }>("/work-sessions/current").catch(() => ({ session: null, activeBreak: null })),
        ]);

      setTasks(tasksData.map((t) => mapDoc(t)) as unknown as Task[]);
      setProjects(projectsData.map((p) => mapDoc(p)) as unknown as Project[]);
      setBreaks(breaksData.map((b) => mapDoc(b)) as unknown as BreakRecord[]);
      setHourlyUpdates(updatesData.map((u) => mapDoc(u)) as unknown as HourlyUpdate[]);
      setAttendanceRecords(attendanceData.map((a) => mapDoc(a)) as unknown as AttendanceRecord[]);
      setTimeline(timelineData.map((e) => mapDoc(e)) as unknown as TimelineEvent[]);
      setTodayPoints(pointsData.todayPoints);
      setTodayNoteState(noteData.note || "");

      const att = await apiFetch<{ inTime?: string } | { isClockedIn: boolean }>("/attendance/today").catch(() => null);
      if (att && "inTime" in att && att.inTime) {
        setIsClockedIn(true);
        setClockInTime(att.inTime);
      }

      if (sessionData.session) {
        const s = sessionData.session;
        setIsWorkTimerRunning(!!s.isActive);
        setActiveWorkSeconds((s.totalWorkSeconds as number) || 0);
        setWorkSession({
          ...defaultWorkSession,
          isActive: !!s.isActive,
          projectName: (s.projectName as string) || "",
          taskName: (s.taskName as string) || "",
          totalWorkTime: formatSecondsToHMS((s.totalWorkSeconds as number) || 0),
        });
      }

      if (sessionData.activeBreak) {
        const b = sessionData.activeBreak;
        setActiveBreak({
          id: (b._id as string)?.toString?.() || "",
          startTime: b.startTime as string,
          startTimestamp: Date.now(),
          type: b.type as BreakType,
          reason: b.reason as string,
        });
      }
    } catch (e) {
      console.error("Failed to load data", e);
    }
  }, [authUser]);

  useEffect(() => {
    if (authUser) refreshData();
  }, [authUser, refreshData]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isWorkTimerRunning && isClockedIn && !activeBreak) {
      interval = setInterval(() => setActiveWorkSeconds((p) => p + 1), 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isWorkTimerRunning, isClockedIn, activeBreak]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (activeBreak) {
      interval = setInterval(() => setActiveBreakSeconds((p) => p + 1), 1000);
    } else {
      setActiveBreakSeconds(0);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [activeBreak]);

  const formatSecondsToHMS = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return [h, m, s].map((v) => (v < 10 ? `0${v}` : `${v}`)).join(":");
  };

  useEffect(() => {
    setWorkSession((prev) => ({
      ...prev,
      isActive: isWorkTimerRunning && !activeBreak,
      totalWorkTime: formatSecondsToHMS(activeWorkSeconds),
    }));
  }, [activeWorkSeconds, isWorkTimerRunning, activeBreak]);

  const updateUser = async (updated: Partial<User>) => {
    await refreshData();
  };

  const setTodayNote = async (note: string) => {
    setTodayNoteState(note);
    await apiFetch("/performance/note", { method: "PUT", body: JSON.stringify({ note }) });
  };

  const startWorkSession = async (opts?: { startPhotoUrl?: string }) => {
    if (!isClockedIn) await clockIn();
    await apiFetch("/work-sessions/start", { method: "POST", body: JSON.stringify({ startPhotoUrl: opts?.startPhotoUrl }) });
    setIsWorkTimerRunning(true);
    if (activeBreak) await endBreak();
    await refreshData();
  };

  const pauseWorkSession = async () => {
    await apiFetch("/work-sessions/pause", { method: "POST" });
    setIsWorkTimerRunning(false);
  };

  const stopWorkSession = async (opts?: { endPhotoUrl?: string }) => {
    await apiFetch("/work-sessions/stop", { method: "POST", body: JSON.stringify({ endPhotoUrl: opts?.endPhotoUrl }) });
    setIsWorkTimerRunning(false);
    await refreshData();
  };

  const clockIn = async () => {
    const data = await apiFetch<{ inTime: string }>("/attendance/check-in", { method: "POST" });
    setIsClockedIn(true);
    setClockInTime(data.inTime);
    setIsWorkTimerRunning(true);
    await refreshData();
  };

  const clockOut = async () => {
    await apiFetch("/attendance/check-out", { method: "POST" });
    setIsClockedIn(false);
    setIsWorkTimerRunning(false);
    if (activeBreak) await endBreak();
    await refreshData();
  };

  const startBreak = async (type: BreakType, reason?: string) => {
    const defaults: Record<BreakType, string> = {
      personal: "Personal break",
      lunch: "Lunch break",
      prayer: "Prayer break",
      other: "",
    };
    const breakReason = reason?.trim() || defaults[type];
    await apiFetch("/breaks/start", { method: "POST", body: JSON.stringify({ type, reason: breakReason }) });
    setIsWorkTimerRunning(false);
    await refreshData();
  };

  const endBreak = async () => {
    await apiFetch("/breaks/end", { method: "POST" });
    setActiveBreak(null);
    setIsWorkTimerRunning(true);
    await refreshData();
  };

  const addTask = async (data: Omit<Task, "id" | "createdAt" | "progress">) => {
    await apiFetch("/tasks", { method: "POST", body: JSON.stringify(data) });
    await refreshData();
  };

  const editTask = async (id: string, updated: Partial<Task>) => {
    await apiFetch(`/tasks/${id}`, { method: "PATCH", body: JSON.stringify(updated) });
    await refreshData();
  };

  const deleteTask = async (id: string) => {
    await apiFetch(`/tasks/${id}`, { method: "DELETE" });
    await refreshData();
  };

  const updateTaskStatus = async (id: string, status: TaskStatus) => {
    await apiFetch(`/tasks/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
    await refreshData();
  };

  const addProject = async (data: Omit<Project, "id" | "tasksCompleted" | "tasksTotal" | "progress">) => {
    await apiFetch("/projects", { method: "POST", body: JSON.stringify(data) });
    await refreshData();
  };

  const editProject = async (id: string, updated: Partial<Project>) => {
    await apiFetch(`/projects/${id}`, { method: "PATCH", body: JSON.stringify(updated) });
    await refreshData();
  };

  const deleteProject = async (id: string) => {
    await apiFetch(`/projects/${id}`, { method: "DELETE" });
    await refreshData();
  };

  const submitHourlyUpdate = async (title: string, description: string) => {
    await apiFetch("/hourly-updates", { method: "POST", body: JSON.stringify({ title, description }) });
    await refreshData();
  };

  const openTaskModal = (task: Task | null = null) => setTaskModalState({ isOpen: true, task });
  const closeTaskModal = () => setTaskModalState({ isOpen: false, task: null });
  const openProjectModal = (project: Project | null = null) => setProjectModalState({ isOpen: true, project });
  const closeProjectModal = () => setProjectModalState({ isOpen: false, project: null });
  const openBreakModal = () => setIsBreakModalOpen(true);
  const closeBreakModal = () => setIsBreakModalOpen(false);
  const openHourlyUpdateModal = () => setIsHourlyUpdateModalOpen(true);
  const closeHourlyUpdateModal = () => setIsHourlyUpdateModalOpen(false);
  const openSessionHistoryModal = () => setIsSessionHistoryModalOpen(true);
  const closeSessionHistoryModal = () => setIsSessionHistoryModalOpen(false);

  const workTimerContextValue = useMemo<WorkTrackWorkTimerContextType>(
    () => ({ workSession, isWorkTimerRunning, activeWorkSeconds }),
    [workSession, isWorkTimerRunning, activeWorkSeconds]
  );

  const breakTimerContextValue = useMemo<WorkTrackBreakTimerContextType>(
    () => ({ activeBreakSeconds }),
    [activeBreakSeconds]
  );

  const mainContextValue = useMemo<WorkTrackContextType>(
    () => ({
      user, updateUser, todayNote, setTodayNote,
      startWorkSession, pauseWorkSession, stopWorkSession,
      isClockedIn, clockInTime, attendanceRecords, clockIn, clockOut,
      breaks, activeBreak, startBreak, endBreak,
      tasks, addTask, editTask, deleteTask, updateTaskStatus,
      projects, addProject, editProject, deleteProject,
      hourlyUpdates, submitHourlyUpdate, todayPoints, timeline,
      canManageProjects, canManageTasks, refreshData,
      taskModalState, openTaskModal, closeTaskModal,
      projectModalState, openProjectModal, closeProjectModal,
      isBreakModalOpen, openBreakModal, closeBreakModal,
      isHourlyUpdateModalOpen, openHourlyUpdateModal, closeHourlyUpdateModal,
      isSessionHistoryModalOpen, openSessionHistoryModal, closeSessionHistoryModal,
    }),
    [user, todayNote, isClockedIn, clockInTime, attendanceRecords, breaks, activeBreak,
      tasks, projects, hourlyUpdates, todayPoints, timeline, canManageProjects, canManageTasks,
      taskModalState, projectModalState, isBreakModalOpen, isHourlyUpdateModalOpen, isSessionHistoryModalOpen, refreshData]
  );

  return (
    <WorkTrackContext.Provider value={mainContextValue}>
      <WorkTrackWorkTimerProvider value={workTimerContextValue}>
        <WorkTrackBreakTimerProvider value={breakTimerContextValue}>
          {children}
        </WorkTrackBreakTimerProvider>
      </WorkTrackWorkTimerProvider>
    </WorkTrackContext.Provider>
  );
};

export const useWorkTrack = () => {
  const context = useContext(WorkTrackContext);
  if (!context) throw new Error("useWorkTrack must be used within a WorkTrackProvider");
  return context;
};
