import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useAttendance } from './hooks/useAttendance';

export const AttendanceView = ({ user }) => {
  const { resumoFrequencia, statsGerais } = useAttendance(user);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <CheckCircle className="text-emerald-500" /> Frequência Detalhada
      </h2>

      {/* Cards de Resumo de Frequência */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-500 uppercase">Presença Geral</p>
          <p className="text-3xl font-bold text-gray-800">{statsGerais.presencaGeral}%</p>
          <div className="mt-4 w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full transition-all duration-500" 
              style={{ width: `${statsGerais.presencaGeral}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-500 uppercase">Limite de Faltas</p>
          <p className="text-3xl font-bold text-amber-600">{statsGerais.limiteLegal}</p>
          <p className="text-xs text-gray-400 mt-2">Permitido por lei (LDB)</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-500 uppercase">Situação Atual</p>
          <p className={`text-xl font-bold uppercase mt-1 ${statsGerais.situacao === 'Regular' ? 'text-emerald-600' : 'text-red-600'}`}>
            {statsGerais.situacao}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {statsGerais.situacao === 'Regular' ? 'Sem risco de reprovação' : 'Atenção às faltas'}
          </p>
        </div>
      </div>

      {/* Tabela de Disciplinas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-800">Faltas por Disciplina</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-4 text-xs font-bold text-gray-400 uppercase">Matéria</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase text-center">Aulas Dadas</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase text-center">Minhas Faltas</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase text-center">% Presença</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {resumoFrequencia.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-semibold text-gray-700">{item.materia}</td>
                  <td className="p-4 text-center text-gray-600">{item.total}</td>
                  <td className="p-4 text-center">
                    <span className={`font-bold ${item.faltas > 10 ? 'text-red-500' : 'text-gray-700'}`}>
                      {item.faltas}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden min-w-[100px]">
                        <div 
                          className={`h-full ${item.presenca < 75 ? 'bg-red-500' : 'bg-emerald-500'}`} 
                          style={{ width: `${item.presenca}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-700">{item.presenca}%</span>
                    </div>
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