import {LayoutDashboard, FileText, CheckCircle, Users, GraduationCap, Calendar, BarChart, Clock, BookOpen, Edit, BarChart2} from 'lucide-react';

export const MENU_ITEMS = [
  { page: '/', icon: LayoutDashboard, label: 'Início', allowedRoles: ['DIRETOR', 'PROFESSOR', 'ALUNO'] },

  // Rotas Exclusivas do Aluno
  { page: '/grades', icon: FileText, label: 'Minhas Notas', allowedRoles: ['ALUNO'] },
  { page: '/attendance', icon: CheckCircle, label: 'Frequência', allowedRoles: ['ALUNO'] },
  { page: '/schedule', icon: Clock, label: 'Horário de Aula', allowedRoles: ['ALUNO'] },
  
  // Rotas do Professor
  { page: '/diaries', icon: BookOpen, label: 'Meus Diários', allowedRoles: ['PROFESSOR'] },
  { page: '/grading', icon: Edit, label: 'Lançar Notas', allowedRoles: ['PROFESSOR'] },
];