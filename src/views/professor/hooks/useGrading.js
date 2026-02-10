import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../../../services/apiClient';

export const useGrading = (selectedClass, selectedSubject, selectedBimestre) => {
  // Inicializamos com um array vazio para o .map() da View não quebrar
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Busca os alunos e as notas atuais da turma selecionada
  const fetchGradingData = useCallback(async () => {
    if (!selectedClass || !selectedSubject) return;

    try {
      setLoading(true);
      setError(null);
      // Endpoint que retorna alunos com as notas do bimestre selecionado
      const data = await apiClient(
        `/notas/turma/${selectedClass}/disciplina/${selectedSubject}?bimestre=${selectedBimestre}`
      );
      setStudents(data || []);
    } catch (err) {
      console.error("Erro ao carregar notas:", err);
      setError("Não foi possível carregar a lista de notas.");
      setStudents([]); // Mantém array vazio em caso de erro
    } finally {
      setLoading(false);
    }
  }, [selectedClass, selectedSubject, selectedBimestre]);

  useEffect(() => {
    fetchGradingData();
  }, [fetchGradingData]);

  // 2. Função para atualizar uma nota localmente no estado (antes de salvar)
  const updateLocalGrade = (studentId, field, value) => {
    setStudents(prev => prev.map(student => {
      if (student.id === studentId) {
        return { ...student, [field]: value };
      }
      return student;
    }));
  };

  // 3. Função para salvar tudo no Banco de Dados (Spring Boot)
  const saveGrades = async () => {
    try {
      setIsSaving(true);
      // Envia a lista completa de notas para o teu NotasController
      await apiClient('/notas/bulk-update', {
        method: 'POST',
        body: JSON.stringify({
          disciplinaId: selectedSubject,
          bimestre: selectedBimestre,
          notas: students
        })
      });
      alert("Notas guardadas com sucesso!");
    } catch (err) {
      alert("Erro ao guardar notas. Verifique a ligação com o servidor.");
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