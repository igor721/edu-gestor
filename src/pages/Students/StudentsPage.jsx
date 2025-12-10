import React, { useMemo, useState } from "react";
import { useStudents } from "../../context/StudentContext.jsx";
import { computeStudentTotals } from "../../services/analytics.js";

export default function StudentsPage() {
  const { students } = useStudents();
  const [filters, setFilters] = useState({ gender: "Todos", city: "Todas", grade: "Todas" });

  const derived = useMemo(() => {
    return students.filter((s) => {
      if (filters.gender !== "Todos" && s.gender !== filters.gender) return false;
      if (filters.city !== "Todas" && s.city !== filters.city) return false;
      if (filters.grade !== "Todas" && s.grade !== filters.grade) return false;
      return true;
    });
  }, [students, filters]);

  const summary = useMemo(() => computeStudentTotals(derived), [derived]);

  const unique = (key) => ["Todas", ...Array.from(new Set(students.map((s) => s[key]))).sort()];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
        <div style={{ background: "var(--panel)", padding: 12, borderRadius: "var(--radius)", boxShadow: "var(--shadow)" }}>
          <div style={{ fontWeight: 800, marginBottom: 6 }}>Filtros</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <select value={filters.grade} onChange={(e) => setFilters((f) => ({ ...f, grade: e.target.value }))}>
              {unique("grade").map((g) => <option key={g}>{g}</option>)}
            </select>
            <select value={filters.gender} onChange={(e) => setFilters((f) => ({ ...f, gender: e.target.value }))}>
              {["Todos", "Masculino", "Feminino"].map((g) => <option key={g}>{g}</option>)}
            </select>
            <select value={filters.city} onChange={(e) => setFilters((f) => ({ ...f, city: e.target.value }))}>
              {unique("city").map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div style={{ background: "var(--panel)", padding: 12, borderRadius: "var(--radius)", boxShadow: "var(--shadow)" }}>
          <div style={{ fontWeight: 800 }}>Resumo (filtro)</div>
          <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 6 }}>
            Total: <b>{summary.total}</b> · Média: <b>{summary.avgDevelopment}</b>
          </div>
        </div>
      </div>

      <div style={{ background: "var(--panel)", borderRadius: "var(--radius)", boxShadow: "var(--shadow)", overflow: "hidden" }}>
        <div style={{ padding: 12, borderBottom: "1px solid var(--line)", fontWeight: 800 }}>Lista de alunos</div>
        <div style={{ maxHeight: 520, overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["ID", "Nome", "Turma", "Idade", "Sexo", "Cidade", "Média"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "10px 10px", fontSize: 13, borderBottom: "1px solid var(--line)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {derived.slice(0, 200).map((s) => (
                <tr key={s.id}>
                  <td style={{ padding: "10px 10px", borderBottom: "1px solid var(--line)", fontSize: 13 }}>{s.id}</td>
                  <td style={{ padding: "10px 10px", borderBottom: "1px solid var(--line)", fontSize: 13 }}>{s.name}</td>
                  <td style={{ padding: "10px 10px", borderBottom: "1px solid var(--line)", fontSize: 13 }}>{s.grade}</td>
                  <td style={{ padding: "10px 10px", borderBottom: "1px solid var(--line)", fontSize: 13 }}>{s.age}</td>
                  <td style={{ padding: "10px 10px", borderBottom: "1px solid var(--line)", fontSize: 13 }}>{s.gender}</td>
                  <td style={{ padding: "10px 10px", borderBottom: "1px solid var(--line)", fontSize: 13 }}>{s.city}</td>
                  <td style={{ padding: "10px 10px", borderBottom: "1px solid var(--line)", fontSize: 13 }}>{s.average}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
