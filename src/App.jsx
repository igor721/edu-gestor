import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layout
import { Layout } from './components/layout/Layout';

// Páginas (Views)
import { LoginView } from './views/LoginView';
import { Dashboard } from './views/DashboardView';
import { GradesView } from './views/alunos/GradesView';
import { AttendanceView } from './views/alunos/AttendanceView';
import { ScheduleView } from './views/alunos/ScheduleView';
import { DiariesView } from './views/professor/DiariesView';
import { GradingView } from './views/professor/GradingView';

/**
 * Componente de Proteção de Rotas (Porteiro)
 * Verifica se o usuário está logado e se tem permissão para acessar a página
 */
const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  // Enquanto o AuthContext verifica o localStorage (evita flash de login no F5)
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <span className="ml-3 mt-4 text-gray-600 font-medium">Carregando sistema...</span>
        </div>
      </div>
    );
  }

  // Se não estiver logado, redireciona para a raiz (onde está o LoginView)
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Se a rota exige um cargo específico (PROFESSOR/ALUNO) e o usuário não tem
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Se passou em tudo, libera o acesso para o próximo nível (Layout ou Página)
  return <Outlet />;
};

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* ROTA RAIZ: 
        Se já estiver logado, envia para o dashboard automaticamente.
        Se não, exibe a tela de login.
      */}
      <Route 
        path="/" 
        element={user ? <Navigate to="/dashboard" replace /> : <LoginView />} 
      />

      {/* BLOCO PROTEGIDO: Todas as rotas abaixo exigem login */}
      <Route element={<ProtectedRoute />}>
        
        {/* LAYOUT: Sidebar e Topbar aparecem para todas as rotas internas */}
        <Route element={<Layout user={user} />}>
          
          {/* Dashboard é acessível para todos os logados */}
          <Route path="/dashboard" element={<Dashboard user={user} />} />

          {/* SUBGRUPO: Rotas exclusivas para PROFESSOR */}
          <Route element={<ProtectedRoute allowedRoles={['PROFESSOR']} />}>
            <Route path="/diaries" element={<DiariesView />} />
            <Route path="/grading" element={<GradingView />} />
          </Route>

          {/* SUBGRUPO: Rotas exclusivas para ALUNO */}
          <Route element={<ProtectedRoute allowedRoles={['ALUNO']} />}>
            <Route path="/grades" element={<GradesView user={user} />} />
            <Route path="/attendance" element={<AttendanceView user={user} />} />
            <Route path="/schedule" element={<ScheduleView user={user} />} />
          </Route>

        </Route>
      </Route>

      {/* Rota 404: Se o usuário digitar algo que não existe, volta para a base */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;