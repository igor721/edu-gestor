import React from 'react';
import { useGrading } from './hooks/useGrading';
import { Save, Info, BookOpen, ChevronRight, Sun, Sunset, Moon } from 'lucide-react';

export const GradingView = () => {
  const {
    selectedClass, setSelectedClass,
    selectedBimestre, setSelectedBimestre,
    turmasPorTurno, bimestres,
    students
  } = useGrading();

  // Ícones para cada turno
  const getTurnoIcon = (turno) => {
    if (turno === 'Manhã') return <Sun className="w-4 h-4 text-amber-500" />;
    if (turno === 'Tarde') return <Sunset className="w-4 h-4 text-orange-500" />;
    return <Moon className="w-4 h-4 text-indigo-400" />;
  };

  // Tela 1: Seleção de Turma Organizada por Turno
  if (!selectedClass) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Lançamento de Notas</h2>
          <p className="text-gray-500 text-sm">Selecione o turno e a sala para abrir o diário.</p>
        </div>
        
        {turmasPorTurno.map((grupo) => (
          <div key={grupo.turno} className="space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
              {getTurnoIcon(grupo.turno)}
              <h3 className="font-bold text-gray-700 uppercase text-xs tracking-widest">{grupo.turno}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {grupo.salas.map((sala) => (
                <button 
                  key={sala}
                  onClick={() => setSelectedClass(sala)}
                  className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:border-indigo-500 hover:shadow-md transition-all text-left group flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-50 text-gray-400 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{sala}</h4>
                      <p className="text-[10px] text-gray-400 font-medium">LANÇAR NOTAS</p>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-200 group-hover:text-indigo-500 transition-colors w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Tela 2: O Diário de Notas (Permanece com o seu estilo limpo)
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <button 
            onClick={() => setSelectedClass(null)} 
            className="text-xs text-indigo-600 hover:underline mb-2 block font-bold uppercase tracking-tight"
          >
            ← Voltar aos Turnos
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Diário: {selectedClass}</h2>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
          {bimestres.map(b => (
            <button
              key={b}
              onClick={() => setSelectedBimestre(b)}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
                selectedBimestre === b 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
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
          <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold shadow-sm hover:bg-indigo-700 transition-all text-xs">
            <Save className="w-4 h-4" /> Salvar Notas
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="p-4 text-[10px] font-bold text-gray-400 uppercase">Aluno</th>
                <th className="p-4 text-[10px] font-bold text-gray-400 uppercase text-center">N1</th>
                <th className="p-4 text-[10px] font-bold text-gray-400 uppercase text-center">N2</th>
                <th className="p-4 text-[10px] font-bold text-gray-400 uppercase text-center">N3</th>
                <th className="p-4 text-[10px] font-bold text-gray-400 uppercase text-center bg-gray-50">Média</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="p-4">
                    <p className="font-semibold text-gray-700 text-sm">{student.name}</p>
                    <p className="text-[9px] text-gray-400 font-mono tracking-tighter">MAT: {student.id}</p>
                  </td>
                  <td className="p-4 text-center">
                    <input type="number" min="0" max="10" step="0.5" className="w-12 p-1.5 border border-gray-200 rounded text-center text-sm outline-none focus:ring-1 focus:ring-indigo-500" placeholder="-" />
                  </td>
                  <td className="p-4 text-center">
                    <input type="number" min="0" max="10" step="0.5" className="w-12 p-1.5 border border-gray-200 rounded text-center text-sm outline-none focus:ring-1 focus:ring-indigo-500" placeholder="-" />
                  </td>
                  <td className="p-4 text-center">
                    <input type="number" min="0" max="10" step="0.5" className="w-12 p-1.5 border border-gray-200 rounded text-center text-sm outline-none focus:ring-1 focus:ring-indigo-500" placeholder="-" />
                  </td>
                  <td className="p-4 text-center bg-gray-50/30">
                    <span className="font-bold text-sm text-gray-400">-</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};