import { useState, useEffect, useMemo } from 'react';
import { apiClient } from '../../../services/apiClient';

export const useGrades = (user) => {
  const [disciplinas, setDisciplinas] = useState([]); // Inicializado como array vazio
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGrades = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const data = await apiClient(`/grades/${user.id}`);
      setDisciplinas(data || []); // Garante que nunca seja null
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGrades(); }, [user?.id]);

  const calcularMediaParcial = (notas) => {
    if (!notas || notas.length === 0) return "0.0";
    const notasValidas = notas.filter(n => n > 0);
    if (notasValidas.length === 0) return "0.0";
    const soma = notasValidas.reduce((a, b) => a + b, 0);
    return (soma / notasValidas.length).toFixed(1);
  };

  return { disciplinas, calcularMediaParcial, mediaAprovacao: 6.0, loading, error };
};