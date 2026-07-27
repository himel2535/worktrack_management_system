"use client";

import React from "react";
import { TaskModal } from "./TaskModal";
import { ProjectModal } from "./ProjectModal";
import { BreakModal } from "./BreakModal";
import { HourlyUpdateModal } from "./HourlyUpdateModal";
import { SessionHistoryModal } from "./SessionHistoryModal";

export function GlobalModals() {
  return (
    <>
      <TaskModal />
      <ProjectModal />
      <BreakModal />
      <HourlyUpdateModal />
      <SessionHistoryModal />
    </>
  );
}
