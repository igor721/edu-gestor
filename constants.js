import { Gender } from './src/types'; // Ajustado para o caminho correto

// Usuários para teste de Login
export const MOCK_USERS = [
  {
    id: 'U-01',
    name: 'Luan Diretor',
    email: 'diretor@escola.com',
    password: '123',
    role: 'DIRETOR',
    avatarInitials: 'LD'
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

// Helpers para geração de dados aleatórios
const firstNames = ['Ana', 'Bruno', 'Carlos', 'Daniela', 'Eduardo', 'Fernanda', 'Gabriel', 'Helena', 'Igor', 'Julia', 'Lucas', 'Mariana', 'Nicolas', 'Olivia', 'Pedro'];
const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Almeida', 'Costa', 'Gomes', 'Martins'];
const cities = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'Porto Alegre'];
const grades = ['1º Ano A', '1º Ano B', '9º A', '2º Ano A', '2º Ano B', '3º Ano A'];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
// Função para gerar nota decimal (ex: 7.5)
const getRandomGrade = (min, max) => parseFloat((Math.random() * (max - min) + min).toFixed(1));

export const generateStudents = (count) => {
  return Array.from({ length: count }, (_, i) => {
    const gender = Math.random() > 0.5 ? Gender.Female : Gender.Male;
    return {
      id: `STU-${1000 + i}`,
      name: `${getRandom(firstNames)} ${getRandom(lastNames)}`,
      age: getRandomInt(14, 18),
      gender: gender,
      grade: getRandom(grades),
      city: getRandom(cities),
      // Ajustado: Agora gera notas de 0 a 10 (Média 7 para passar)
      performanceScore: getRandomGrade(4, 10), 
      attendance: getRandomInt(80, 100),
      email: i === 0 ? 'aluno@escola.com' : `aluno${1000 + i}@escola.com` 
    };
  });
};

export const MOCK_STUDENTS = generateStudents(120);

export const MOCK_TEACHERS = [
  { id: 'T-01', name: 'Roberto Campos', subject: 'Matemática', email: 'roberto@escola.com' },
  { id: 'T-02', name: 'Claudia Mendes', subject: 'Português', email: 'claudia@escola.com' },
  { id: 'T-03', name: 'Fernando Lima', subject: 'História', email: 'fernando@escola.com' },
  { id: 'T-04', name: 'Patricia Alves', subject: 'Geografia', email: 'patricia@escola.com' },
];

export const MOCK_EVENTS = [
  { id: 'E-01', title: 'Início do Bimestre', type: 'academic' },
  { id: 'E-03', title: 'Semana de Provas', type: 'exam' },
  { id: 'E-06', title: 'Reunião de Pais', type: 'academic' },
];