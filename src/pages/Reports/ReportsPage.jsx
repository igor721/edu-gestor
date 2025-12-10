import React, { useState } from "react";
import { useStudents } from "../../context/StudentContext.jsx";
import { useTeachers } from "../../context/TeacherContext.jsx";
import { academicCalendar } from "../../data/calendar.js";
import { generatePdfReport } from "../../services/pdfReport.js";

export default function ReportsPage() {
  const { students } = useStudents();
  const { teachers } = useTeachers();
  const [status, setStatus] = useState("Pronto");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ background: "var(--panel)", borderRadius: "var(--radius)", boxShadow: "var(--shadow)", padding: 12 }}>
        <div style={{ fontWeight: 800, marginBottom: 6 }}>Relatórios em PDF</div>
        <div style={{ color: "var(--muted)", fontSize: 13 }}>
          Gera um PDF com totalizadores, indicadores e calendário.
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <button
          onClick={async () => {
            setStatus("Gerando PDF...");
            try {
              await generatePdfReport({ students, teachers, calendar: academicCalendar });
              setStatus("PDF gerado (verifique seu download).");
            } catch (e) {
              setStatus("Falha ao gerar PDF (ver console).");
              console.error(e);
            }
          }}
          style={{
            border: "none",
            borderRadius: 12,
            padding: "10px 14px",
            background: "var(--primary)",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Gerar relatório
        </button>
        <div style={{ color: "var(--muted)", fontSize: 13 }}>{status}</div>
      </div>
    </div>
  );
}
