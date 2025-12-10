import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import { StudentProvider } from "./context/StudentContext.jsx";
import { TeacherProvider } from "./context/TeacherContext.jsx";
import { SettingsProvider } from "./context/SettingsContext.jsx";

import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import StudentsPage from "./pages/Students/StudentsPage.jsx";
import TeachersPage from "./pages/Teachers/TeachersPage.jsx";
import ReportsPage from "./pages/Reports/ReportsPage.jsx";
import CalendarPage from "./pages/AcademicCalendar/CalendarPage.jsx";

export default function App() {
  return (
    <SettingsProvider>
      <StudentProvider>
        <TeacherProvider>
          <BrowserRouter>
            <MainLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/alunos" element={<StudentsPage />} />
                <Route path="/professores" element={<TeachersPage />} />
                <Route path="/relatorios" element={<ReportsPage />} />
                <Route path="/calendario" element={<CalendarPage />} />
              </Routes>
            </MainLayout>
          </BrowserRouter>
        </TeacherProvider>
      </StudentProvider>
    </SettingsProvider>
  );
}
