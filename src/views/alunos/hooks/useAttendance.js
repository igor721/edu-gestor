import { useState, useEffect, useMemo } from 'react';
import { apiClient } from '../../../services/apiClient';

export const useAttendance = (user) => {
  const [resumoFrequencia, setResumoFrequencia] = useState([]); // Array vazio evita tela branca
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAttendance = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const data = await apiClient(`/attendance/${user.id}`);
      setResumoFrequencia(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAttendance(); }, [user?.id]);

  const statsGerais = useMemo(() => {
    const totalItens = resumoFrequencia?.length || 0;
    if (totalItens === 0) return { presencaGeral: "0.0", situacao: "---" };

    const soma = resumoFrequencia.reduce((acc, item) => acc + (item.presenca || 0), 0);
    const media = (soma / totalItens).toFixed(1);
    return {
      presencaGeral: media,
      situacao: media >= 75 ? 'Regular' : 'Risco'
    };
  }, [resumoFrequencia]);

  return { resumoFrequencia, statsGerais, loading, error };
};