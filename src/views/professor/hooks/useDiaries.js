import { useState, useMemo } from 'react';
import { MOCK_STUDENTS } from '../../../../constants';

export const useDiaries = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [attendance, setAttendance] = useState({});
  const [qtdAulas, setQtdAulas] = useState(1); // Controla se é aula simples, dupla, etc.

  const turmasPorTurno = [
    { turno: 'Manhã', salas: ['1º Ano A', '1º Ano B'] },
    { turno: 'Tarde', salas: ['1º Ano C', '1º Ano D'] },
    { turno: 'Noite', salas: ['1º Ano E', '1º Ano F'] }
  ];

  const classStudents = useMemo(() => {
    return MOCK_STUDENTS.filter(s => s.grade === selectedClass);
  }, [selectedClass]);

  const toggleAttendance = (studentId) => {
    setAttendance(prev => ({ 
      ...prev, 
      // Se já tinha falta, zera. Se não, aplica a quantidade de aulas do dia.
      [studentId]: prev[studentId] ? 0 : qtdAulas 
    }));
  };

  return {
    selectedClass,
    setSelectedClass,
    attendance,
    setAttendance,
    toggleAttendance,
    turmasPorTurno,
    classStudents,
    qtdAulas,
    setQtdAulas
  };
};