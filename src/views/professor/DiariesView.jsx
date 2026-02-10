import React from 'react';
import { useDiaries } from './hooks/useDiaries';
import { Save, ChevronRight, BookOpen, Sun, Sunset, Moon, Calendar, Check, X } from 'lucide-react';

export const DiariesView = () => {
  const {
    selectedClass, setSelectedClass,
    attendance, toggleAttendance,
    turmasPorTurno, classStudents,
    qtdAulas, setQtdAulas
  } = useDiaries();

  const getTurnoIcon = (turno) => {
    if (turno === 'Manhã') return <Sun className="w-4 h-4 text-amber-500" />;
    if (turno === 'Tarde') return <Sunset className="w-4 h-4 text-orange-500" />;
    return <Moon className="w-4 h-4 text-indigo-400" />;
  };

  // --- TELA 1: SELEÇÃO DE TURMAS ---
  if (!selectedClass) {
    return (
      <div className="space-y-8">
        <header>
          <h2 className="text-2xl font-bold text-gray-800">Frequência Diária</h2>
          <p className="text-gray-500 text-sm">Selecione a turma para realizar a chamada.</p>
        </header>
        
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
                  className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:border-emerald-500 transition-all text-left group flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-50 text-gray-400 rounded-lg group-hover:bg-emerald-50 group-hover:text-emerald-600">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{sala}</h4>
                      <p className="text-[10px] text-gray-400 uppercase">Abrir Diário</p>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-200 group-hover:text-emerald-500 w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // --- TELA 2: LISTA DE CHAMADA ---
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <button onClick={() => setSelectedClass(null)} className="text-xs text-emerald-600 hover:underline mb-2 block font-bold uppercase">
            ← Voltar para turnos
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Chamada: {selectedClass}</h2>
          <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all">
          <Save className="w-5 h-5" /> Finalizar Chamada
        </button>
      </div>

      {/* SELETOR DE QUANTIDADE DE AULAS */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
        <span className="text-sm font-bold text-gray-600">Quantidade de aulas</span>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map(num => (
            <button
              key={num}
              onClick={() => setQtdAulas(num)}
              className={`w-10 h-10 rounded-lg font-bold transition-all border ${
                qtdAulas === num 
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' 
                : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 text-[10px] font-bold text-gray-400 uppercase">Aluno</th>
              <th className="p-4 text-[10px] font-bold text-gray-400 uppercase text-end">Presença</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {classStudents.map((student) => {
              const numFaltas = attendance[student.id] || 0;
              const isAbsent = numFaltas > 0;

              return (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <p className="font-semibold text-gray-700 text-sm">{student.name}</p>
                    <p className="text-[9px] text-gray-400 font-mono">MAT: {student.id}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col items-end gap-1">
                      <button 
                        onClick={() => toggleAttendance(student.id)}
                        className={`w-14 h-8 rounded-full flex items-center p-1 transition-all duration-300 ${
                          isAbsent ? 'bg-red-500 justify-end' : 'bg-emerald-500 justify-start'
                        }`}
                      >
                        <div className="bg-white w-6 h-6 rounded-full shadow-sm flex items-center justify-center">
                          {isAbsent ? <X className="w-3 h-3 text-red-500" /> : <Check className="w-3 h-3 text-emerald-500" />}
                        </div>
                      </button>
                      <span className={`text-[9px] font-bold uppercase ${isAbsent ? 'text-red-500' : 'text-emerald-500'}`}>
                        {isAbsent ? `${numFaltas} Faltas` : 'Presente'}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};