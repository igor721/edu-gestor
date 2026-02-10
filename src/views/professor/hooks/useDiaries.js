import { useState, useEffect, useMemo } from 'react';
import { apiClient } from '../../../services/apiClient';

export const useDiaries = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedBimestre, setSelectedBimestre] = useState(1);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Estrutura de turnos para sua tabela Turma
  const turmasPorTurno = [
    { turno: 'Manhã', salas: ['1º Ano A', '1º Ano B'] },
    { turno: 'Tarde', salas: ['1º Ano C', '1º Ano D'] },
    { turno: 'Noite', salas: ['1º Ano E', '1º Ano F'] }
  ];

  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedClass) return;
      try {
        setLoading(true);
        const data = await apiClient(`/alunos/turma/${selectedClass}`);
        setStudents(data || []);
      } catch (err) {
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [selectedClass]);

  return {
    selectedClass, setSelectedClass,
    selectedBimestre, setSelectedBimestre,
    turmasPorTurno, students,
    bimestres: [1, 2, 3, 4],
    loading
  };
};