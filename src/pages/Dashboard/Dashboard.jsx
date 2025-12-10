import React from "react";
import { useStudents } from "../../context/StudentContext.jsx";
import { useTeachers } from "../../context/TeacherContext.jsx";
import { computeStudentTotals, toChartSeries } from "../../services/analytics.js";
import StatsCard from "../../components/Cards/StatsCard.jsx";
import BarChartCard from "../../components/Charts/BarChartCard.jsx";
import PieChartCard from "../../components/Charts/PieChartCard.jsx";

export default function Dashboard() {
  const { students } = useStudents();
  const { teachers } = useTeachers();
  const stats = computeStudentTotals(students);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <StatsCard title="Total Alunos" value={stats.total} hint="Base fictícia (demo)" />
        <StatsCard title="Professores" value={teachers.length} hint="Corpo docente ativo" />
        <StatsCard title="Média de Desenvolvimento" value={stats.avgDevelopment} hint="Meta (ex.: 7,5)" />
        <StatsCard title="Taxa de Presença" value={`${stats.avgAttendance}%`} hint="Alta estabilidade" />
      </div>

      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr" }}>
        <BarChartCard title="Alunos por Turma" data={toChartSeries(stats.byGrade)} />
        <PieChartCard title="Gênero" data={toChartSeries(stats.byGender)} />
      </div>

      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr" }}>
        <BarChartCard title="Distribuição por Idade" data={toChartSeries(stats.byAge)} />
        <BarChartCard title="Alunos por Cidade" data={toChartSeries(stats.byCity)} />
      </div>
    </div>
  );
}
