import React from 'react';
import { FileText, Download, AlertCircle } from 'lucide-react';
import { useGrades } from './hooks/useGrades';

export const GradesView = ({ user }) => {
  const { disciplinas, calcularMediaParcial, mediaAprovacao } = useGrades(user);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FileText className="text-indigo-600" /> Meu Boletim
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-md shadow-indigo-200">
          <Download className="w-4 h-4" /> Gerar PDF
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-xs font-bold text-gray-400 uppercase">Disciplina</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase text-center">1º Bim</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase text-center">2º Bim</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase text-center">3º Bim</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase text-center">4º Bim</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase text-center bg-indigo-50/50">Média Parcial</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {disciplinas.map((disc, index) => {
                const media = calcularMediaParcial(disc.notas);
                
                return (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      <p className="font-semibold text-gray-800">{disc.nome}</p>
                      <p className="text-xs text-gray-400">{disc.faltas} faltas acumuladas</p>
                    </td>
                    
                    {disc.notas.map((nota, i) => (
                      <td key={i} className="p-4 text-center font-medium">
                        {nota > 0 ? (
                          <span className={nota < mediaAprovacao ? 'text-red-500' : 'text-gray-700'}>
                            {nota.toFixed(1)}
                          </span>
                        ) : (
                          <span className="text-gray-300">-</span>
                        )}
                      </td>
                    ))}

                    <td className="p-4 text-center bg-indigo-50/30">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${media < mediaAprovacao ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                        {media}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg flex gap-3 shadow-sm">
        <AlertCircle className="text-amber-600 shrink-0" />
        <div className="text-sm text-amber-800">
          <p><strong>Atenção:</strong> A média para aprovação é <strong>{mediaAprovacao.toFixed(1)}</strong>.</p>
          <p className="mt-1 opacity-90">Disciplinas em vermelho indicam que você está abaixo da média e pode precisar de recuperação paralela.</p>
        </div>
      </div>
    </div>
  );
};