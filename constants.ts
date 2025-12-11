import { Student, Teacher, CalendarEvent, Gender, User } from './types';

// Usuários para teste de Login
export const MOCK_USERS: (User & { password: string })[] = [
  {
    id: 'U-01',
    name: 'Carlos Diretor',
    email: 'diretor@escola.com',
    password: '123',
    role: 'DIRETOR',
    avatarInitials: 'CD'
  },
  {
    id: 'U-02',
    name: 'Ana Professora',
    email: 'prof@escola.com',
    password: '123',
    role: 'PROFESSOR',
    avatarInitials: 'AP'
  },
  {
    id: 'U-03',
    name: 'João Aluno',
    email: 'aluno@escola.com',
    password: '123',
    role: 'ALUNO',
    avatarInitials: 'JA'
  }
];

// Helper to generate random data
const firstNames = ['Ana', 'Bruno', 'Carlos', 'Daniela', 'Eduardo', 'Fernanda', 'Gabriel', 'Helena', 'Igor', 'Julia', 'Lucas', 'Mariana', 'Nicolas', 'Olivia', 'Pedro'];
const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Almeida', 'Costa', 'Gomes', 'Martins'];
const cities = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'Porto Alegre'];
const grades = ['1º Ano A', '1º Ano B', '2º Ano A', '2º Ano B', '3º Ano A'];

const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateStudents = (count: number): Student[] => {
  return Array.from({ length: count }, (_, i) => {
    const gender = Math.random() > 0.5 ? Gender.Female : Gender.Male;
    return {
      id: `STU-${1000 + i}`,
      name: `${getRandom(firstNames)} ${getRandom(lastNames)}`,
      age: getRandomInt(14, 18),
      gender: gender,
      grade: getRandom(grades),
      city: getRandom(cities),
      performanceScore: getRandomInt(60, 100),
      attendance: getRandomInt(80, 100),
    };
  });
};

export const MOCK_STUDENTS = generateStudents(120);

export const MOCK_TEACHERS: Teacher[] = [
  { id: 'T-01', name: 'Roberto Campos', subject: 'Matemática', yearsExperience: 10, email: 'roberto@escola.com' },
  { id: 'T-02', name: 'Claudia Mendes', subject: 'Português', yearsExperience: 8, email: 'claudia@escola.com' },
  { id: 'T-03', name: 'Fernando Lima', subject: 'História', yearsExperience: 5, email: 'fernando@escola.com' },
  { id: 'T-04', name: 'Patricia Alves', subject: 'Geografia', yearsExperience: 12, email: 'patricia@escola.com' },
  { id: 'T-05', name: 'Ricardo Souza', subject: 'Física', yearsExperience: 6, email: 'ricardo@escola.com' },
  { id: 'T-06', name: 'Elena Torres', subject: 'Química', yearsExperience: 15, email: 'elena@escola.com' },
  { id: 'T-07', name: 'Marcos Vinicius', subject: 'Educação Física', yearsExperience: 3, email: 'marcos@escola.com' },
  { id: 'T-08', name: 'Sofia Rocha', subject: 'Artes', yearsExperience: 20, email: 'sofia@escola.com' },
];

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();

export const MOCK_EVENTS: CalendarEvent[] = [
  { id: 'E-01', date: new Date(currentYear, currentMonth, 5), title: 'Início do Bimestre', type: 'academic' },
  { id: 'E-02', date: new Date(currentYear, currentMonth, 12), title: 'Feriado Nacional', type: 'holiday' },
  { id: 'E-03', date: new Date(currentYear, currentMonth, 20), title: 'Semana de Provas', type: 'exam' },
  { id: 'E-04', date: new Date(currentYear, currentMonth, 21), title: 'Prova de Matemática', type: 'exam' },
  { id: 'E-05', date: new Date(currentYear, currentMonth, 22), title: 'Prova de Português', type: 'exam' },
  { id: 'E-06', date: new Date(currentYear, currentMonth, 28), title: 'Reunião de Pais', type: 'academic' },
];