import React from 'react';
import { useGrading } from './hooks/useGrading';
import { Save, Info, BookOpen, ChevronRight, Sun, Sunset, Moon } from 'lucide-react';
import { Header } from '../../components/Header';

export const GradingView = ({ selectedSubject = 1 }) => {
  const {
    selectedClass, setSelectedClass,
    selectedBimestre, setSelectedBimestre,
    turmasPorTurno, bimestres,
    students, updateLocalGrade, saveGrades, isSaving
  } = useGrading(null, selectedSubject, 1); // Inicializa com valores padrão

  const getTurnoIcon = (turno) => {
    if (turno === 'Manhã') return <Sun className="w-4 h-4 text-amber-500" />;
    if (turno === 'Tarde') return <Sunset className="w-4 h-4 text-orange-500" />;
    return <Moon className="w-4 h-4 text-indigo-400" />;
  };

  if (!selectedClass) {
    return (
      <div className="space-y-8">
        <Header 
          title="Lançamento de Notas" 
          subtitle="Selecione o turno e a sala para abrir o diário." 
        />
        
        {(turmasPorTurno || []).map((grupo) => (
          <div key={grupo.turno} className="space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
              {getTurnoIcon(grupo.turno)}
              <h3 className="font-bold text-gray-700 uppercase text-xs tracking-widest">{grupo.turno}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(grupo.salas || []).map((sala) => (
                <button 
                  key={sala.id}
                  onClick={() => setSelectedClass(sala.id)}
                  className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:border-indigo-500 transition-all text-left group flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-50 text-gray-400 rounded-lg group-hover:bg-indigo-50">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{sala.nome}</h4>
                      <p className="text-[10px] text-gray-400 font-medium uppercase">Lançar Notas</p>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-200 group-hover:text-indigo-500 w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <button onClick={() => setSelectedClass(null)} className="text-xs text-indigo-600 hover:underline mb-2 block font-bold uppercase">
            ← Voltar aos Turnos
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Diário da Turma {selectedClass}</h2>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
          {(bimestres || []).map(b => (
            <button
              key={b}
              onClick={() => setSelectedBimestre(b)}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
                selectedBimestre === b ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'
              }`}
            >
              {b}º Bim
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 bg-indigo-50/50 border-b border-indigo-100 flex items-center justify-between text-indigo-700 text-sm">
          <div className="flex items-center gap-2 font-medium">
            <Info className="w-4 h-4 text-indigo-400" />
            <span>Notas do {selectedBimestre}º Bimestre</span>
          </div>
          <button 
            onClick={saveGrades}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold shadow-sm hover:bg-indigo-700 text-xs disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> {isSaving ? 'Salvando...' : 'Salvar Notas'}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 text-[10px] font-bold text-gray-400 uppercase">Aluno</th>
                <th className="p-4 text-[10px] font-bold text-gray-400 uppercase text-center">N1</th>
                <th className="p-4 text-[10px] font-bold text-gray-400 uppercase text-center">N2</th>
                <th className="p-4 text-[10px] font-bold text-gray-400 uppercase text-center">N3</th>
                <th className="p-4 text-[10px] font-bold text-gray-400 uppercase text-center bg-gray-50">Média</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(students || []).map((item) => {
                const studentId = item.aluno?.id || item.id;
                const media = (((item.n1 || 0) + (item.n2 || 0) + (item.n3 || 0)) / 3).toFixed(1);
                
                return (
                  <tr key={studentId} className="hover:bg-gray-50/30 transition-colors">
                    <td className="p-4 text-sm font-semibold text-gray-700">
                      {item.aluno?.nome || item.nome}
                      <p className="text-[9px] text-gray-400 font-mono tracking-tighter">ID: {studentId}</p>
                    </td>
                    <td className="p-4 text-center">
                      <input 
                        type="number" 
                        value={item.n1 || 0}
                        onChange={(e) => updateLocalGrade(studentId, 'n1', e.target.value)}
                        className="w-12 p-1.5 border border-gray-200 rounded text-center text-sm" 
                      />
                    </td>
                    <td className="p-4 text-center">
                      <input 
                        type="number" 
                        value={item.n2 || 0}
                        onChange={(e) => updateLocalGrade(studentId, 'n2', e.target.value)}
                        className="w-12 p-1.5 border border-gray-200 rounded text-center text-sm" 
                      />
                    </td>
                    <td className="p-4 text-center">
                      <input 
                        type="number" 
                        value={item.n3 || 0}
                        onChange={(e) => updateLocalGrade(studentId, 'n3', e.target.value)}
                        className="w-12 p-1.5 border border-gray-200 rounded text-center text-sm" 
                      />
                    </td>
                    <td className={`p-4 text-center bg-gray-50/30 font-bold ${media < 7 ? 'text-red-500' : 'text-emerald-600'}`}>
                      {media}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};