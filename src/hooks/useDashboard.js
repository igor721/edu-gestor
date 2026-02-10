import { useMemo } from 'react';
import { MOCK_STUDENTS, MOCK_TEACHERS } from '../../constants';
import { Gender } from '../types';

export const useDashboard = (user) => {
  
  const stats = useMemo(() => {
    // --- LÓGICA DO ALUNO ---
    const student = MOCK_STUDENTS.find(s => s.email === user.email) || MOCK_STUDENTS[0];
    const limiteFaltas = 50;
    const faltasAtuais = Math.round((100 - student.attendance) * 0.5);
    const faltasRestantes = Math.max(0, limiteFaltas - faltasAtuais);
    const nivelRiscoFalta = student.attendance < 78 ? 'alto' : student.attendance < 85 ? 'medio' : 'baixo';


    
    // --- LÓGICA DO PROFESSOR (Turmas específicas) ---
    const myClasses = ['1º Ano A', '1º Ano B'];
    const myStudents = MOCK_STUDENTS.filter(s => myClasses.includes(s.grade));
    
    const performanceData = myClasses.map(turma => ({
      turma,
      media: Math.round(myStudents.filter(s => s.grade === turma).reduce((acc, s) => acc + s.performanceScore, 0) / (myStudents.filter(s => s.grade === turma).length || 1)),
      meta: 70 
    }));

    const genderData = [
      { name: 'Meninos', value: myStudents.filter(s => s.gender === Gender.Male).length },
      { name: 'Meninas', value: myStudents.filter(s => s.gender === Gender.Female).length },
    ];

    return {
      // Retorno do Aluno
      student,
      faltasAtuais,
      faltasRestantes,
      nivelRiscoFalta,
      
      // Retorno do Professor
      performanceData,
      genderData
    };
  }, [user]);

  return stats;
};