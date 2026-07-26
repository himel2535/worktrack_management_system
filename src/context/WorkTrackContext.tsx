"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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

import { tasks as initialTasks } from "@/lib/mock-data/tasks";
import { projects as initialProjects } from "@/lib/mock-data/projects";
import { breakRecords as initialBreaks } from "@/lib/mock-data/breaks";
import { hourlyUpdates as initialHourlyUpdates } from "@/lib/mock-data/hourly-updates";
import { activeWorkSession as initialWorkSession } from "@/lib/mock-data/work-session";
import { attendanceRecords as initialAttendance } from "@/lib/mock-data/attendance";
import { todayTimeline as initialTimeline } from "@/lib/mock-data/timeline";
import { currentUser as initialUser } from "@/lib/mock-data/user";

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
  // User & Settings
  user: User;
  updateUser: (user: Partial<User>) => void;
  todayNote: string;
  setTodayNote: (note: string) => void;

  // Work Session & Timer
  workSession: WorkSession;
  isWorkTimerRunning: boolean;
  activeWorkSeconds: number;
  startWorkSession: () => void;
  pauseWorkSession: () => void;
  stopWorkSession: () => void;

  // Attendance
  isClockedIn: boolean;
  clockInTime: string;
  attendanceRecords: AttendanceRecord[];
  clockIn: () => void;
  clockOut: () => void;

  // Breaks
  breaks: BreakRecord[];
  activeBreak: ActiveBreakState | null;
  activeBreakSeconds: number;
  startBreak: (type: BreakType, reason?: string) => void;
  endBreak: () => void;

  // Tasks
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "createdAt" | "progress">) => void;
  editTask: (id: string, updated: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;

  // Projects
  projects: Project[];
  addProject: (project: Omit<Project, "id" | "tasksCompleted" | "tasksTotal" | "progress">) => void;
  editProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Hourly Updates
  hourlyUpdates: HourlyUpdate[];
  submitHourlyUpdate: (title: string, description: string) => void;

  // Gamification Points & Timeline
  todayPoints: number;
  timeline: TimelineEvent[];

  // Modal Controls
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
}

const STORAGE_KEY = "worktrack_app_state_v2";

const WorkTrackContext = createContext<WorkTrackContextType | undefined>(undefined);

export const WorkTrackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State Initialization
  const [user, setUser] = useState<User>(initialUser);
  const [todayNote, setTodayNoteState] = useState<string>(
    "Will continue API integration and connect with backend team for subscription endpoints."
  );

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [breaks, setBreaks] = useState<BreakRecord[]>(initialBreaks);
  const [hourlyUpdates, setHourlyUpdates] = useState<HourlyUpdate[]>(initialHourlyUpdates);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(initialAttendance);
  const [timeline, setTimeline] = useState<TimelineEvent[]>(initialTimeline);
  const [todayPoints, setTodayPoints] = useState<number>(3);

  // Work Timer State
  const [workSession, setWorkSession] = useState<WorkSession>(initialWorkSession);
  const [isWorkTimerRunning, setIsWorkTimerRunning] = useState<boolean>(true);
  const [activeWorkSeconds, setActiveWorkSeconds] = useState<number>(16338); // ~04:32:18

  // Attendance State
  const [isClockedIn, setIsClockedIn] = useState<boolean>(true);
  const [clockInTime, setClockInTime] = useState<string>("09:04 AM");

  // Active Break State
  const [activeBreak, setActiveBreak] = useState<ActiveBreakState | null>(null);
  const [activeBreakSeconds, setActiveBreakSeconds] = useState<number>(0);

  // Modals
  const [taskModalState, setTaskModalState] = useState<{ isOpen: boolean; task?: Task | null }>({
    isOpen: false,
    task: null,
  });
  const [projectModalState, setProjectModalState] = useState<{ isOpen: boolean; project?: Project | null }>({
    isOpen: false,
    project: null,
  });
  const [isBreakModalOpen, setIsBreakModalOpen] = useState<boolean>(false);
  const [isHourlyUpdateModalOpen, setIsHourlyUpdateModalOpen] = useState<boolean>(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.tasks) setTasks(parsed.tasks);
        if (parsed.projects) setProjects(parsed.projects);
        if (parsed.breaks) setBreaks(parsed.breaks);
        if (parsed.hourlyUpdates) setHourlyUpdates(parsed.hourlyUpdates);
        if (parsed.attendanceRecords) setAttendanceRecords(parsed.attendanceRecords);
        if (parsed.timeline) setTimeline(parsed.timeline);
        if (parsed.todayPoints !== undefined) setTodayPoints(parsed.todayPoints);
        if (parsed.user) setUser(parsed.user);
        if (parsed.todayNote) setTodayNoteState(parsed.todayNote);
        if (parsed.activeWorkSeconds) setActiveWorkSeconds(parsed.activeWorkSeconds);
        if (parsed.isWorkTimerRunning !== undefined) setIsWorkTimerRunning(parsed.isWorkTimerRunning);
        if (parsed.isClockedIn !== undefined) setIsClockedIn(parsed.isClockedIn);
        if (parsed.clockInTime) setClockInTime(parsed.clockInTime);
        if (parsed.activeBreak) setActiveBreak(parsed.activeBreak);
      }
    } catch (e) {
      console.error("Failed to parse stored worktrack state", e);
    }
  }, []);

  // Sync state to localStorage
  useEffect(() => {
    try {
      const stateToSave = {
        tasks,
        projects,
        breaks,
        hourlyUpdates,
        attendanceRecords,
        timeline,
        todayPoints,
        user,
        todayNote,
        activeWorkSeconds,
        isWorkTimerRunning,
        isClockedIn,
        clockInTime,
        activeBreak,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error("Failed to save worktrack state", e);
    }
  }, [
    tasks,
    projects,
    breaks,
    hourlyUpdates,
    attendanceRecords,
    timeline,
    todayPoints,
    user,
    todayNote,
    activeWorkSeconds,
    isWorkTimerRunning,
    isClockedIn,
    clockInTime,
    activeBreak,
  ]);

  // Live Work Timer Ticker
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isWorkTimerRunning && isClockedIn && !activeBreak) {
      interval = setInterval(() => {
        setActiveWorkSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isWorkTimerRunning, isClockedIn, activeBreak]);

  // Live Active Break Ticker
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (activeBreak) {
      interval = setInterval(() => {
        setActiveBreakSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setActiveBreakSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeBreak]);

  // Format seconds helper
  const formatSecondsToHMS = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? `0${v}` : `${v}`))
      .join(":");
  };

  // Sync formatted time strings back to activeWorkSession object
  useEffect(() => {
    setWorkSession((prev) => ({
      ...prev,
      isActive: isWorkTimerRunning && !activeBreak,
      totalWorkTime: formatSecondsToHMS(activeWorkSeconds),
    }));
  }, [activeWorkSeconds, isWorkTimerRunning, activeBreak]);

  // User Actions
  const updateUser = (updated: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  const setTodayNote = (note: string) => {
    setTodayNoteState(note);
  };

  // Timer Actions
  const startWorkSession = () => {
    if (!isClockedIn) {
      clockIn();
    }
    setIsWorkTimerRunning(true);
    if (activeBreak) {
      endBreak();
    }
  };

  const pauseWorkSession = () => {
    setIsWorkTimerRunning(false);
  };

  const stopWorkSession = () => {
    setIsWorkTimerRunning(false);
  };

  // Attendance Actions
  const clockIn = () => {
    const nowStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setIsClockedIn(true);
    setClockInTime(nowStr);
    setIsWorkTimerRunning(true);

    const newEvent: TimelineEvent = {
      id: Date.now().toString(),
      time: nowStr,
      title: "Clocked In",
      description: "Started office shift",
      type: "present",
      badge: "On Time",
      badgeVariant: "success",
    };
    setTimeline((prev) => [newEvent, ...prev]);
  };

  const clockOut = () => {
    const nowStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setIsClockedIn(false);
    setIsWorkTimerRunning(false);
    if (activeBreak) {
      endBreak();
    }

    const newEvent: TimelineEvent = {
      id: Date.now().toString(),
      time: nowStr,
      title: "Clocked Out",
      description: "Finished office shift",
      type: "work_start",
    };
    setTimeline((prev) => [newEvent, ...prev]);
  };

  // Break Actions
  const startBreak = (type: BreakType, reason?: string) => {
    const now = new Date();
    const nowStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newActiveBreak: ActiveBreakState = {
      id: Date.now().toString(),
      startTime: nowStr,
      startTimestamp: now.getTime(),
      type,
      reason,
      projectName: workSession.projectName,
      taskName: workSession.taskName,
    };

    setActiveBreak(newActiveBreak);
    setIsWorkTimerRunning(false);

    // Add to timeline
    const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);
    const newEvent: TimelineEvent = {
      id: Date.now().toString(),
      time: nowStr,
      title: `Break Started (${typeLabel})`,
      description: reason || "Taking a short break",
      type: "break_start",
    };
    setTimeline((prev) => [newEvent, ...prev]);
  };

  const endBreak = () => {
    if (!activeBreak) return;
    const nowStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const formattedDuration = formatSecondsToHMS(activeBreakSeconds);

    const newBreakRecord: BreakRecord = {
      id: activeBreak.id,
      startTime: activeBreak.startTime,
      endTime: nowStr,
      type: activeBreak.type,
      duration: formattedDuration,
      projectName: activeBreak.projectName,
      taskName: activeBreak.taskName,
      reason: activeBreak.reason,
      ongoing: false,
    };

    setBreaks((prev) => [newBreakRecord, ...prev]);
    setActiveBreak(null);
    setIsWorkTimerRunning(true);

    const newEvent: TimelineEvent = {
      id: Date.now().toString(),
      time: nowStr,
      title: "Break Ended",
      description: `Resumed work (${formattedDuration})`,
      type: "break_end",
    };
    setTimeline((prev) => [newEvent, ...prev]);
  };

  // Task Actions
  const addTask = (newTaskData: Omit<Task, "id" | "createdAt" | "progress">) => {
    const newTask: Task = {
      ...newTaskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
      progress: newTaskData.status === "completed" ? 100 : 0,
    };
    setTasks((prev) => [newTask, ...prev]);

    // Recalculate project tasks total
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === newTask.projectId || proj.name === newTask.projectName) {
          const total = proj.tasksTotal + 1;
          const completed = newTask.status === "completed" ? proj.tasksCompleted + 1 : proj.tasksCompleted;
          return {
            ...proj,
            tasksTotal: total,
            tasksCompleted: completed,
            progress: Math.round((completed / total) * 100),
          };
        }
        return proj;
      })
    );
  };

  const editTask = (id: string, updated: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          return { ...task, ...updated };
        }
        return task;
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const newProgress = status === "completed" ? 100 : status === "in_progress" ? 50 : 0;
          return { ...task, status, progress: newProgress };
        }
        return task;
      })
    );
  };

  // Project Actions
  const addProject = (
    newProjData: Omit<Project, "id" | "tasksCompleted" | "tasksTotal" | "progress">
  ) => {
    const newProject: Project = {
      ...newProjData,
      id: Date.now().toString(),
      tasksCompleted: 0,
      tasksTotal: 0,
      progress: 0,
    };
    setProjects((prev) => [newProject, ...prev]);
  };

  const editProject = (id: string, updated: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === id) {
          return { ...proj, ...updated };
        }
        return proj;
      })
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Hourly Update Actions
  const submitHourlyUpdate = (title: string, description: string) => {
    const nowStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newUpdate: HourlyUpdate = {
      id: Date.now().toString(),
      time: nowStr,
      title,
      description,
      status: "on_time",
      points: 3,
    };

    setHourlyUpdates((prev) => [newUpdate, ...prev]);
    setTodayPoints((prev) => prev + 3);

    const newEvent: TimelineEvent = {
      id: Date.now().toString(),
      time: nowStr,
      title: `Update Submitted: ${title}`,
      description,
      type: "update",
      points: 3,
      badge: "+3 Pts",
      badgeVariant: "success",
    };
    setTimeline((prev) => [newEvent, ...prev]);
  };

  // Modal handlers
  const openTaskModal = (task: Task | null = null) => {
    setTaskModalState({ isOpen: true, task });
  };
  const closeTaskModal = () => {
    setTaskModalState({ isOpen: false, task: null });
  };

  const openProjectModal = (project: Project | null = null) => {
    setProjectModalState({ isOpen: true, project });
  };
  const closeProjectModal = () => {
    setProjectModalState({ isOpen: false, project: null });
  };

  const openBreakModal = () => setIsBreakModalOpen(true);
  const closeBreakModal = () => setIsBreakModalOpen(false);

  const openHourlyUpdateModal = () => setIsHourlyUpdateModalOpen(true);
  const closeHourlyUpdateModal = () => setIsHourlyUpdateModalOpen(false);

  return (
    <WorkTrackContext.Provider
      value={{
        user,
        updateUser,
        todayNote,
        setTodayNote,
        workSession,
        isWorkTimerRunning,
        activeWorkSeconds,
        startWorkSession,
        pauseWorkSession,
        stopWorkSession,
        isClockedIn,
        clockInTime,
        attendanceRecords,
        clockIn,
        clockOut,
        breaks,
        activeBreak,
        activeBreakSeconds,
        startBreak,
        endBreak,
        tasks,
        addTask,
        editTask,
        deleteTask,
        updateTaskStatus,
        projects,
        addProject,
        editProject,
        deleteProject,
        hourlyUpdates,
        submitHourlyUpdate,
        todayPoints,
        timeline,
        taskModalState,
        openTaskModal,
        closeTaskModal,
        projectModalState,
        openProjectModal,
        closeProjectModal,
        isBreakModalOpen,
        openBreakModal,
        closeBreakModal,
        isHourlyUpdateModalOpen,
        openHourlyUpdateModal,
        closeHourlyUpdateModal,
      }}
    >
      {children}
    </WorkTrackContext.Provider>
  );
};

export const useWorkTrack = () => {
  const context = useContext(WorkTrackContext);
  if (!context) {
    throw new Error("useWorkTrack must be used within a WorkTrackProvider");
  }
  return context;
};
