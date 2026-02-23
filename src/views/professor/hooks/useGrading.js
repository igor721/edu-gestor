import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../../../services/apiClient';

export const useGrading = (selectedClass, selectedSubject, selectedBimestre) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Busca os alunos e as notas do bimestre selecionado
  const fetchGradingData = useCallback(async () => {
    if (!selectedClass || !selectedSubject) return;

    try {
      setLoading(true);
      setError(null);
      // Rota mapeada no NotasController.java
      const data = await apiClient(
        `/api/notas/turma/${selectedClass}/disciplina/${selectedSubject}?bimestre=${selectedBimestre}`
      );
      setStudents(data || []);
    } catch (err) {
      console.error("Erro ao carregar notas:", err);
      setError("Não foi possível carregar a lista de notas.");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  }, [selectedClass, selectedSubject, selectedBimestre]);

  useEffect(() => {
    fetchGradingData();
  }, [fetchGradingData]);

  // 2. Atualiza a nota no estado local enquanto o professor digita
  const updateLocalGrade = (studentId, field, value) => {
    setStudents(prev => prev.map(item => {
      // Verifica se estamos lidando com o objeto Aluno ou a própria Nota
      const idMatches = item.id === studentId || item.aluno?.id === studentId;
      if (idMatches) {
        return { ...item, [field]: parseFloat(value) || 0 };
      }
      return item;
    }));
  };

  // 3. Salva a lista completa no Banco de Dados
  const saveGrades = async () => {
    try {
      setIsSaving(true);
      
      // Formata os dados para o formato esperado pelo NotasController (List<Notas>)
      const payload = students.map(s => ({
        id: s.id || null, // Se for edição, envia o ID da nota existente
        n1: s.n1 || 0,
        n2: s.n2 || 0,
        n3: s.n3 || 0,
        bimestre: selectedBimestre,
        aluno: { id: s.aluno?.id || s.id }, // Referência ao ID do Aluno
        disciplina: { id: selectedSubject }  // Referência ao ID da Disciplina
      }));

      await apiClient('/api/notas/bulk-update', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      
      alert("Notas guardadas com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar lote:", err);
      alert("Erro ao guardar notas. Verifique a conexão.");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    students,
    loading,
    error,
    isSaving,
    updateLocalGrade,
    saveGrades,
    refresh: fetchGradingData
  };
};