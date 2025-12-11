import React, { useState } from 'react';
import { MOCK_STUDENTS } from '../constants';
import { Search, Edit2, X, Save } from 'lucide-react';
import { User, Student } from '../types';

interface StudentsViewProps {
  user: User;
}

export const StudentsView: React.FC<StudentsViewProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  
  // States para edição de nota
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [newScore, setNewScore] = useState<string>('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startEditing = (student: Student) => {
    setEditingStudent(student);
    setNewScore(student.performanceScore.toString());
  };

  const saveGrade = () => {
    if (editingStudent) {
      const updatedStudents = students.map(s => {
        if (s.id === editingStudent.id) {
          return { ...s, performanceScore: parseInt(newScore) || 0 };
        }
        return s;
      });
      setStudents(updatedStudents);
      setEditingStudent(null);
    }
  };

  const isProfessor = user.role === 'PROFESSOR';

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
                {isProfessor && <th className="p-4 font-semibold text-gray-600 text-center">Ações</th>}
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
                  {isProfessor && (
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => startEditing(student)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Lançar Nota"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  )}
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

      {/* Modal de Lançamento de Notas */}
      {editingStudent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-sm overflow-hidden shadow-2xl p-6">
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Lançar Nota</h3>
                <button onClick={() => setEditingStudent(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
             </div>
             
             <div className="mb-4">
               <p className="text-sm text-gray-500 mb-1">Aluno</p>
               <p className="font-medium text-gray-800">{editingStudent.name}</p>
             </div>

             <div className="mb-6">
               <label className="block text-sm font-medium text-gray-700 mb-1">Nota Final (0-100)</label>
               <input 
                 type="number" 
                 min="0"
                 max="100"
                 value={newScore}
                 onChange={(e) => setNewScore(e.target.value)}
                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg"
               />
             </div>

             <div className="flex gap-3">
               <button 
                 onClick={() => setEditingStudent(null)}
                 className="flex-1 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
               >
                 Cancelar
               </button>
               <button 
                 onClick={saveGrade}
                 className="flex-1 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 flex items-center justify-center gap-2"
               >
                 <Save className="w-4 h-4" />
                 Salvar
               </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};