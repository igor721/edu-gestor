import React, { createContext, useContext, useMemo } from "react";
import { students } from "../data/students.js";

const StudentContext = createContext({ students: [] });

export function StudentProvider({ children }) {
  const value = useMemo(() => ({ students }), []);
  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}

export function useStudents() {
  return useContext(StudentContext);
}
