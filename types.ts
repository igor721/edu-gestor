export enum Gender {
  Male = 'Masculino',
  Female = 'Feminino',
  Other = 'Outro'
}

export type UserRole = 'DIRETOR' | 'PROFESSOR' | 'ALUNO';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarInitials: string;
}

export interface Student {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  grade: string; // Turma/Série
  city: string;
  performanceScore: number; // 0-100
  attendance: number; // 0-100%
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  yearsExperience: number;
  email: string;
}

export interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  type: 'academic' | 'holiday' | 'exam';
}

export interface Stats {
  totalStudents: number;
  totalTeachers: number;
  avgPerformance: number;
  genderDistribution: { name: string; value: number }[];
  cityDistribution: { name: string; value: number }[];
  gradeDistribution: { name: string; value: number }[];
}