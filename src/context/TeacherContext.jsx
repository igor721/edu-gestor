import React, { createContext, useContext, useMemo } from "react";
import { teachers } from "../data/teachers.js";

const TeacherContext = createContext({ teachers: [] });

export function TeacherProvider({ children }) {
  const value = useMemo(() => ({ teachers }), []);
  return <TeacherContext.Provider value={value}>{children}</TeacherContext.Provider>;
}

export function useTeachers() {
  return useContext(TeacherContext);
}
