import { useMemo } from 'react';

export const useGrades = (user) => {
  // Simulando dados que virão da API
  const disciplinas = useMemo(() => [
    { nome: 'Língua Portuguesa', notas: [7.5, 8.0, 0, 0], faltas: 4 },
    { nome: 'Matemática', notas: [5.5, 6.0, 0, 0], faltas: 8 },
    { nome: 'História', notas: [9.0, 8.5, 0, 0], faltas: 2 },
    { nome: 'Geografia', notas: [7.0, 7.0, 0, 0], faltas: 4 },
    { nome: 'Ciências', notas: [6.5, 5.0, 0, 0], faltas: 6 },
    { nome: 'Artes', notas: [10, 9.5, 0, 0], faltas: 0 },
  ], []);

  const calcularMediaParcial = (notas) => {
    // Filtra apenas as notas preenchidas (maiores que 0)
    const notasPreenchidas = notas.filter(n => n > 0);
    if (notasPreenchidas.length === 0) return 0;
    
    const soma = notasPreenchidas.reduce((acc, nota) => acc + nota, 0);
    return (soma / notasPreenchidas.length).toFixed(1);
  };

  return {
    disciplinas,
    calcularMediaParcial,
    mediaAprovacao: 6.0
  };
};