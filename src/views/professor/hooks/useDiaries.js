import { useState, useEffect } from 'react';
import { apiClient } from '../../../services/apiClient';

export const useDiaries = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedBimestre, setSelectedBimestre] = useState(1);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({}); // Inicializado como objeto vazio
  const [qtdAulas, setQtdAulas] = useState(1);
  const [loading, setLoading] = useState(false);

  const turmasPorTurno = [
    { turno: 'Manhã', salas: [{ id: 1, nome: '1º Ano A' }, { id: 2, nome: '1º Ano B' }] },
    { turno: 'Tarde', salas: [] },
    { turno: 'Noite', salas: [] }
  ];

  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedClass) return;
      try {
        setLoading(true);
        const data = await apiClient(`/api/alunos/turma/${selectedClass}`);
        setStudents(data || []);

        // Inicializa o estado de presença para cada aluno como 0 (Presente)
        const initialAttendance = {};
        (data || []).forEach(student => {
          initialAttendance[student.id] = 0;
        });
        setAttendance(initialAttendance);
      } catch (err) {
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [selectedClass]);

  const toggleAttendance = (studentId) => {
    setAttendance(prev => ({
      ...prev,
      // Se já tiver falta, volta a 0. Se não, recebe o valor de qtdAulas atual.
      [studentId]: (prev && prev[studentId] > 0) ? 0 : qtdAulas
    }));
  };

  const saveAttendance = async () => {
    try {
      setLoading(true);
      const payload = Object.keys(attendance).map(studentId => ({
        aluno: { id: Number(studentId) },
        disciplina: { id: 1 },
        data: new Date().toISOString().split('T')[0],
        status: attendance[studentId] > 0 ? 'FALTA' : 'PRESENTE',
        // Esta linha garante que o valor 2 (ou 1) chegue ao Java corretamente
        quantidade_faltas: Number(attendance[studentId])
      }));

      await apiClient('/api/presencas/bulk-save', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      alert("Chamada finalizada com sucesso!");
    } catch (err) {
      alert("Erro ao salvar chamada.");
    } finally {
      setLoading(false);
    }
  };


  return {
    selectedClass, setSelectedClass,
    selectedBimestre, setSelectedBimestre,
    students, attendance,
    toggleAttendance, qtdAulas, setQtdAulas,
    turmasPorTurno, loading, saveAttendance
  };
};