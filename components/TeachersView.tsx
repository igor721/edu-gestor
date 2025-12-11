import React from 'react';
import { MOCK_TEACHERS } from '../constants';
import { Mail, BookOpen, Star } from 'lucide-react';

export const TeachersView: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Corpo Docente</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_TEACHERS.map((teacher) => (
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
    </div>
  );
};