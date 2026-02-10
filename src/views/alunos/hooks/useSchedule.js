import { useState, useEffect } from 'react';
import { apiClient } from '../../../services/apiClient';

export const useSchedule = (user) => {
  const [gradeHoraria, setGradeHoraria] = useState([]);
  const [loading, setLoading] = useState(false);
  const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

  const fetchSchedule = async () => {
    if (!user?.turma?.id) return;
    try {
      setLoading(true);
      const data = await apiClient(`/horarios/turma/${user.turma.id}`);
      setGradeHoraria(data || []);
    } catch (err) {
      console.error("Erro ao buscar horários", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSchedule(); }, [user?.turma?.id]);

  return { dias, gradeHoraria, loading };
};