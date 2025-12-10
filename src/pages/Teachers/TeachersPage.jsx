import React from "react";
import { useTeachers } from "../../context/TeacherContext.jsx";

export default function TeachersPage() {
  const { teachers } = useTeachers();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ background: "var(--panel)", borderRadius: "var(--radius)", boxShadow: "var(--shadow)", padding: 12 }}>
        <div style={{ fontWeight: 800 }}>Professores</div>
        <div style={{ marginTop: 6, color: "var(--muted)", fontSize: 13 }}>
          Total: <b>{teachers.length}</b>
        </div>
      </div>

      <div style={{ background: "var(--panel)", borderRadius: "var(--radius)", boxShadow: "var(--shadow)", overflow: "hidden" }}>
        <div style={{ padding: 12, borderBottom: "1px solid var(--line)", fontWeight: 800 }}>Lista</div>
        <div style={{ maxHeight: 520, overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["ID", "Nome", "Disciplina", "Desde", "Status"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "10px 10px", fontSize: 13, borderBottom: "1px solid var(--line)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teachers.map((p) => (
                <tr key={p.id}>
                  <td style={{ padding: "10px 10px", borderBottom: "1px solid var(--line)", fontSize: 13 }}>{p.id}</td>
                  <td style={{ padding: "10px 10px", borderBottom: "1px solid var(--line)", fontSize: 13 }}>{p.name}</td>
                  <td style={{ padding: "10px 10px", borderBottom: "1px solid var(--line)", fontSize: 13 }}>{p.subject}</td>
                  <td style={{ padding: "10px 10px", borderBottom: "1px solid var(--line)", fontSize: 13 }}>{p.since}</td>
                  <td style={{ padding: "10px 10px", borderBottom: "1px solid var(--line)", fontSize: 13 }}>{p.active ? "Ativo" : "Inativo"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
