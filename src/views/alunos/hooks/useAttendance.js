import { useMemo } from 'react';

export const useAttendance = (user) => {
  // Dados que virão da API no futuro
  const resumoFrequencia = useMemo(() => [
    { materia: 'Português', total: 60, faltas: 4, presenca: 93 },
    { materia: 'Matemática', total: 60, faltas: 8, presenca: 86 },
    { materia: 'História', total: 40, faltas: 2, presenca: 95 },
    { materia: 'Ciências', total: 40, faltas: 6, presenca: 85 },
  ], []);

  const statsGerais = useMemo(() => {
    // Cálculo simples da média de presença
    const somaPresenca = resumoFrequencia.reduce((acc, item) => acc + item.presenca, 0);
    const media = (somaPresenca / resumoFrequencia.length).toFixed(1);
    
    return {
      presencaGeral: media,
      limiteLegal: '25%',
      situacao: media >= 75 ? 'Regular' : 'Risco'
    };
  }, [resumoFrequencia]);

  return {
    resumoFrequencia,
    statsGerais
  };
};