import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { LoginView } from './views/LoginView';

// Importações das Páginas
import { Dashboard } from './views/DashboardView';
import { GradesView } from './views/alunos/GradesView';
import { AttendanceView } from './views/alunos/AttendanceView';
import { ScheduleView } from './views/alunos/ScheduleView';
import { DiariesView } from './views/professor/DiariesView';
import { GradingView } from './views/professor/GradingView';

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      {!user ? (
        <Routes>
          {/* Se não houver usuário, qualquer rota renderiza o Login */}
          <Route path="*" element={<LoginView onLogin={setUser} />} />
        </Routes>
      ) : (
        <Layout user={user} onLogout={() => setUser(null)}>
          <Routes>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/grades" element={<GradesView user={user} />} />
            <Route path="/attendance" element={<AttendanceView user={user} />} />
            <Route path="/schedule" element={<ScheduleView />} />
            <Route path="/diaries" element={<DiariesView />} />
            <Route path="/grading" element={<GradingView />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      )}
    </BrowserRouter>
  );
}