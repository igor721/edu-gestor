import { 
  LayoutDashboard, FileText, CheckCircle, Clock, BookOpen, Edit 
} from 'lucide-react';
import { PAGES } from '../types'; // Importando do types para manter o padrão

export const MENU_ITEMS = [
  { 
    page: PAGES.HOME, // Agora aponta para '/dashboard'
    icon: LayoutDashboard, 
    label: 'Início', 
    allowedRoles: ['DIRETOR', 'PROFESSOR', 'ALUNO'] 
  },

  // Rotas Exclusivas do Aluno
  { page: PAGES.GRADES, icon: FileText, label: 'Minhas Notas', allowedRoles: ['ALUNO'] },
  { page: PAGES.ATTENDANCE, icon: CheckCircle, label: 'Frequência', allowedRoles: ['ALUNO'] },
  { page: PAGES.SCHEDULE, icon: Clock, label: 'Horário de Aula', allowedRoles: ['ALUNO'] },
  
  // Rotas do Professor
  { page: PAGES.DIARIES, icon: BookOpen, label: 'Meus Diários', allowedRoles: ['PROFESSOR'] },
  { page: PAGES.GRADING, icon: Edit, label: 'Lançar Notas', allowedRoles: ['PROFESSOR'] },
];