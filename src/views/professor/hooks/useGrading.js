import { useState, useMemo } from 'react';
import { MOCK_STUDENTS } from '../../../../constants';

export const useGrading = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedBimestre, setSelectedBimestre] = useState(1);

  // Estrutura organizada por turnos
  const turmasPorTurno = [
    { turno: 'Manhã', salas: ['1º Ano A', '1º Ano B'] },
    { turno: 'Tarde', salas: ['1º Ano C', '1º Ano D'] },
    { turno: 'Noite', salas: ['1º Ano E', '1º Ano F'] }
  ];

  const bimestres = [1, 2, 3, 4];

  const students = useMemo(() => {
    return MOCK_STUDENTS.filter(s => s.grade === selectedClass);
  }, [selectedClass]);

  return {
    selectedClass,
    setSelectedClass,
    selectedBimestre,
    setSelectedBimestre,
    turmasPorTurno,
    bimestres,
    students
  };
};