import React from 'react';
import { Clock } from 'lucide-react';
import { useSchedule } from './hooks/useSchedule';
import { Header } from '../../components/Header';

export const ScheduleView = () => {
  const { dias, gradeHoraria } = useSchedule();

  return (
    <div className="space-y-6">
      <Header
        title="Horário de Aula"
        subtitle="Veja o horário de suas aulas"
        icon={Clock}
        action={
          <span className="text-xs font-bold text-gray-400 uppercase bg-gray-100 px-3 py-1 rounded-full">
            Ano Letivo 2026
          </span>
        }
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Horário
                </th>
                {dias.map(dia => (
                  <th key={dia} className="p-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {dia}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {gradeHoraria.map((linha, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/30 transition-colors">
                  <td className="p-4 font-bold text-indigo-600 bg-indigo-50/30 tabular-nums">
                    {linha.hora}
                  </td>
                  {dias.map(dia => (
                    <td key={dia} className="p-4">
                      <p className="text-sm font-semibold text-gray-700">
                        {linha.aulasDoDia[dia].materia}
                      </p>
                      <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-tight">
                        {linha.aulasDoDia[dia].sala}
                      </p>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
        <p className="text-xs text-indigo-700 leading-relaxed">
          <strong>Nota:</strong> O intervalo para o lanche ocorre entre <strong>09:30</strong> e <strong>09:50</strong>.
          Mudanças pontuais no horário serão notificadas via painel de avisos.
        </p>
      </div>
    </div>
  );
};