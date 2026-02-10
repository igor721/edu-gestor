import { useMemo } from 'react';

export const useSchedule = () => {
  const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
  const horarios = ['07:00', '07:50', '08:40', '09:50', '10:40'];
  
  const disciplinasExemplo = [
    'Português', 'Matemática', 'História', 'Geografia', 'Ciências', 
    'Educação Física', 'Inglês', 'Artes', 'Física', 'Química'
  ];

  // Gera a grade de horários fixa para evitar mudanças ao re-renderizar
  const gradeHoraria = useMemo(() => {
    return horarios.map(hora => {
      const aulasDoDia = {};
      dias.forEach(dia => {
        aulasDoDia[dia] = {
          materia: disciplinasExemplo[Math.floor(Math.random() * disciplinasExemplo.length)],
          sala: 'Sala 05'
        };
      });
      return { hora, aulasDoDia };
    });
  }, []);

  return {
    dias,
    gradeHoraria
  };
};