import React, { useMemo } from 'react';
import { MOCK_STUDENTS, MOCK_TEACHERS } from '../constants';
import { StatCard } from './StatCard';
import { Users, GraduationCap, TrendingUp, MapPin } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

export const Dashboard: React.FC = () => {
  // Compute stats on the fly
  const stats = useMemo(() => {
    const totalStudents = MOCK_STUDENTS.length;
    const totalTeachers = MOCK_TEACHERS.length;
    const avgPerformance = Math.round(MOCK_STUDENTS.reduce((acc, curr) => acc + curr.performanceScore, 0) / totalStudents);

    // Group by City
    const cityMap = new Map<string, number>();
    MOCK_STUDENTS.forEach(s => cityMap.set(s.city, (cityMap.get(s.city) || 0) + 1));
    const cityData = Array.from(cityMap).map(([name, value]) => ({ name, value }));

    // Group by Grade
    const gradeMap = new Map<string, number>();
    MOCK_STUDENTS.forEach(s => gradeMap.set(s.grade, (gradeMap.get(s.grade) || 0) + 1));
    const gradeData = Array.from(gradeMap).map(([name, value]) => ({ name, value })).sort((a,b) => a.name.localeCompare(b.name));

    // Group by Gender
    const genderMap = new Map<string, number>();
    MOCK_STUDENTS.forEach(s => genderMap.set(s.gender, (genderMap.get(s.gender) || 0) + 1));
    const genderData = Array.from(genderMap).map(([name, value]) => ({ name, value }));

    return { totalStudents, totalTeachers, avgPerformance, cityData, gradeData, genderData };
  }, []);

  const COLORS = ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Alunos"
          value={stats.totalStudents}
          icon={Users}
          color="bg-indigo-500 text-indigo-500"
          trend="+5% este mês"
        />
        <StatCard
          title="Professores"
          value={stats.totalTeachers}
          icon={GraduationCap}
          color="bg-pink-500 text-pink-500"
          trend="Quadro completo"
        />
        <StatCard
          title="Média de Notas"
          value={`${stats.avgPerformance}/100`}
          icon={TrendingUp}
          color="bg-teal-500 text-teal-500"
          trend="Acima da meta"
        />
        <StatCard
          title="Cidades Atendidas"
          value={stats.cityData.length}
          icon={MapPin}
          color="bg-amber-500 text-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grade Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Alunos por Turma</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.gradeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} name="Alunos" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gender Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Distribuição por Sexo</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* City Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Alunos por Cidade</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.cityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={150} tick={{fontSize: 12}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" fill="#14b8a6" radius={[0, 4, 4, 0]} barSize={20} name="Alunos" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};