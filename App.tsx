import React, { useState } from 'react';
import { LayoutDashboard, Users, GraduationCap, Calendar, FileText, Menu, School, LogOut } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { StudentsView } from './components/StudentsView';
import { TeachersView } from './components/TeachersView';
import { CalendarView } from './components/CalendarView';
import { ReportsView } from './components/ReportsView';
import { LoginView } from './components/LoginView';
import { User, UserRole } from './types';

type Page = '/' | '/students' | '/teachers' | '/calendar' | '/reports';

interface MenuItem {
  page: Page;
  icon: any;
  label: string;
  allowedRoles: UserRole[];
}

// Configuração do Menu e Permissões
const MENU_ITEMS: MenuItem[] = [
  { 
    page: '/', 
    icon: LayoutDashboard, 
    label: 'Dashboard', 
    allowedRoles: ['DIRETOR', 'PROFESSOR', 'ALUNO'] 
  },
  { 
    page: '/students', 
    icon: Users, 
    label: 'Alunos', 
    allowedRoles: ['DIRETOR', 'PROFESSOR'] 
  },
  { 
    page: '/teachers', 
    icon: GraduationCap, 
    label: 'Professores', 
    allowedRoles: ['DIRETOR'] 
  },
  { 
    page: '/calendar', 
    icon: Calendar, 
    label: 'Calendário', 
    allowedRoles: ['DIRETOR', 'PROFESSOR', 'ALUNO'] 
  },
  { 
    page: '/reports', 
    icon: FileText, 
    label: 'Relatórios', 
    // Atualizado para permitir ALUNO (para imprimir boletim)
    allowedRoles: ['DIRETOR', 'PROFESSOR', 'ALUNO'] 
  },
];

const SidebarItem = ({ 
  item, 
  currentPage, 
  onNavigate 
}: { 
  item: MenuItem;
  currentPage: Page;
  onNavigate: (p: Page) => void;
}) => {
  const Icon = item.icon;
  const isActive = currentPage === item.page;
  
  return (
    <button
      onClick={() => onNavigate(item.page)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive 
          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30' 
          : 'text-gray-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{item.label}</span>
    </button>
  );
};

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (p: Page) => void;
  user: User;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate, user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const availableItems = MENU_ITEMS.filter(item => item.allowedRoles.includes(user.role));

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-200 ease-in-out flex flex-col
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-indigo-500 p-2 rounded-lg">
            <School className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">EduManager</h1>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          {availableItems.map(item => (
            <SidebarItem 
              key={item.page}
              item={item} 
              currentPage={currentPage} 
              onNavigate={(p) => {
                onNavigate(p);
                setIsMobileMenuOpen(false);
              }} 
            />
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800 bg-slate-900">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900/50">
                <span className="font-bold text-white text-sm">{user.avatarInitials}</span>
             </div>
             <div className="overflow-hidden">
               <p className="text-sm font-medium text-white truncate">{user.name}</p>
               <p className="text-xs text-slate-400 capitalize">{user.role.toLowerCase()}</p>
             </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border border-slate-700"
          >
            <LogOut className="w-3 h-3" />
            Sair do Sistema
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-semibold text-gray-700">EduManager Pro</span>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('/');

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage('/'); // Reset to dashboard on login
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('/');
  };

  // Se não estiver logado, mostra tela de Login
  if (!user) {
    return <LoginView onLogin={handleLogin} />;
  }

  const renderPage = () => {
    // Verificação de Segurança de Rota
    const currentMenuItem = MENU_ITEMS.find(item => item.page === currentPage);
    if (currentMenuItem && !currentMenuItem.allowedRoles.includes(user.role)) {
       return (
         <div className="flex flex-col items-center justify-center h-full text-center">
           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
             <School className="w-8 h-8 text-red-500" />
           </div>
           <h2 className="text-2xl font-bold text-gray-800 mb-2">Acesso Restrito</h2>
           <p className="text-gray-500">Seu perfil de usuário não tem permissão para acessar esta página.</p>
           <button 
             onClick={() => setCurrentPage('/')}
             className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
           >
             Voltar ao Dashboard
           </button>
         </div>
       );
    }

    switch (currentPage) {
      case '/':
        return <Dashboard />;
      case '/students':
        return <StudentsView user={user} />;
      case '/teachers':
        return <TeachersView user={user} />;
      case '/calendar':
        return <CalendarView />;
      case '/reports':
        return <ReportsView user={user} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout 
      currentPage={currentPage} 
      onNavigate={setCurrentPage} 
      user={user}
      onLogout={handleLogout}
    >
      {renderPage()}
    </Layout>
  );
}