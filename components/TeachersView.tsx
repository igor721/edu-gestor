import React, { useState } from 'react';
import { MOCK_TEACHERS } from '../constants';
import { Mail, BookOpen, Star, Plus, X, Save } from 'lucide-react';
import { User, Teacher } from '../types';

interface TeachersViewProps {
  user: User;
}

export const TeachersView: React.FC<TeachersViewProps> = ({ user }) => {
  const [teachers, setTeachers] = useState<Teacher[]>(MOCK_TEACHERS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [experience, setExperience] = useState('');

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    const newTeacher: Teacher = {
      id: `T-${100 + teachers.length}`,
      name,
      email,
      subject,
      yearsExperience: parseInt(experience) || 0,
    };

    setTeachers([...teachers, newTeacher]);
    setIsModalOpen(false);
    
    // Reset form
    setName('');
    setEmail('');
    setSubject('');
    setExperience('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Corpo Docente</h2>
        {user.role === 'DIRETOR' && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Novo Professor
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4 hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                {teacher.name.charAt(0)}
              </div>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                {teacher.subject}
              </span>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-800">{teacher.name}</h3>
              <p className="text-sm text-gray-500">ID: {teacher.id}</p>
            </div>

            <div className="space-y-2 mt-2">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{teacher.yearsExperience} anos de experiência</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-indigo-400" />
                <a href={`mailto:${teacher.email}`} className="hover:text-indigo-600">{teacher.email}</a>
              </div>
               <div className="flex items-center gap-3 text-sm text-gray-600">
                <BookOpen className="w-4 h-4 text-green-500" />
                <span>Disciplina Principal</span>
              </div>
            </div>

            <button className="mt-2 w-full py-2 border border-indigo-100 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors">
              Ver Perfil Completo
            </button>
          </div>
        ))}
      </div>

      {/* Modal de Cadastro */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">Cadastrar Novo Professor</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddTeacher} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Disciplina</label>
                  <input 
                    type="text" 
                    required
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Ex: Matemática"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experiência (Anos)</label>
                  <input 
                    type="number" 
                    required
                    value={experience}
                    onChange={e => setExperience(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Institucional</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Salvar Cadastro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};