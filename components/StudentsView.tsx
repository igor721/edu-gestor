import React, { useState } from 'react';
import { MOCK_STUDENTS } from '../constants';
import { Search } from 'lucide-react';

export const StudentsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = MOCK_STUDENTS.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Alunos Matriculados</h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar aluno..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600">ID</th>
                <th className="p-4 font-semibold text-gray-600">Nome</th>
                <th className="p-4 font-semibold text-gray-600">Idade</th>
                <th className="p-4 font-semibold text-gray-600">Turma</th>
                <th className="p-4 font-semibold text-gray-600">Cidade</th>
                <th className="p-4 font-semibold text-gray-600">Desempenho</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                  <td className="p-4 text-gray-500 font-mono text-sm">{student.id}</td>
                  <td className="p-4 font-medium text-gray-800">{student.name}</td>
                  <td className="p-4 text-gray-600">{student.age} anos</td>
                  <td className="p-4 text-gray-600">
                    <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-semibold">
                      {student.grade}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{student.city}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${student.performanceScore >= 80 ? 'bg-green-500' : student.performanceScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${student.performanceScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{student.performanceScore}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredStudents.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            Nenhum aluno encontrado.
          </div>
        )}
      </div>
    </div>
  );
};