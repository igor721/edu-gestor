import React from 'react';
import { StatCard } from '../../components/StatCard';
import { Clock, AlertTriangle, Megaphone, Info } from 'lucide-react';

export const StudentDashboard = ({ user, stats }) => (
  <div className="space-y-6">
    <header>
      <h2 className="text-2xl font-bold text-gray-800">Painel do Aluno</h2>
      <p className="text-gray-500">Olá, {user.name}. Acompanhe seu desempenho.</p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <StatCard title="Matérias em Alerta" value="2" icon={AlertTriangle} color="bg-red-500 text-red-500" trend="Nota abaixo de 7.0" />
      <StatCard 
        title="Faltas Restantes" 
        value={stats.faltasRestantes} 
        icon={Clock} 
        color={stats.nivelRiscoFalta === 'alto' ? "bg-orange-500 text-orange-500" : "bg-indigo-500 text-indigo-500"} 
        trend={`Você já possui ${stats.faltasAtuais} faltas`} 
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-indigo-600" /> Horário das Aulas (Hoje)
        </h3>
        <div className="space-y-3">
          {[
            { time: '07:00', subject: 'Língua Portuguesa', room: 'Sala 05' },
            { time: '07:50', subject: 'Matemática', room: 'Sala 05' },
            { time: '08:40', subject: 'História', room: 'Sala 05' },
            { time: '09:50', subject: 'Ciências', room: 'Laboratório' },
            { time: '10:40', subject: 'Educação Física', room: 'Quadra' }
          ].map((aula, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-indigo-300 transition-all group">
              <div className="flex items-center gap-6">
                <span className="text-sm font-bold text-gray-400 tabular-nums">{aula.time}</span>
                <div>
                  <p className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">{aula.subject}</p>
                  <p className="text-xs text-gray-500 uppercase font-medium">{aula.room}</p>
                </div>
              </div>
              <Info className="w-4 h-4 text-gray-300 group-hover:text-indigo-400" />
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-lg">
          <Megaphone className="w-5 h-5 text-indigo-600" /> Avisos
        </h3>
        <div className="space-y-4">
          <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
            <p className="text-xs font-bold text-red-700 uppercase tracking-wider">Atenção</p>
            <p className="text-sm text-red-800 font-medium">Reunião de pais nesta sexta às 19h.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);