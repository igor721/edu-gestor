import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { computeStudentTotals, toChartSeries } from "./analytics.js";

export async function generatePdfReport({ students, teachers, calendar }) {
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });

  const stats = computeStudentTotals(students);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Relatório Escolar — EduGestor", 40, 40);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`Ano letivo: ${calendar.schoolYear}`, 40, 62);

  doc.setFont("helvetica", "bold");
  doc.text("Indicadores principais", 40, 92);

  autoTable(doc, {
    startY: 108,
    theme: "grid",
    head: [["Indicador", "Valor"]],
    body: [
      ["Total de alunos", String(stats.total)],
      ["Total de professores", String(teachers.length)],
      ["Média de desenvolvimento", String(stats.avgDevelopment)],
      ["Presença média (%)", String(stats.avgAttendance)],
    ],
    styles: { fontSize: 10 },
    headStyles: { fillColor: [79, 70, 229] },
  });

  const yAfter = (doc.lastAutoTable?.finalY || 140) + 18;
  doc.setFont("helvetica", "bold");
  doc.text("Distribuição de alunos (por turma)", 40, yAfter);

  autoTable(doc, {
    startY: yAfter + 12,
    theme: "grid",
    head: [["Turma", "Alunos"]],
    body: toChartSeries(stats.byGrade).map((r) => [r.name, String(r.value)]),
    styles: { fontSize: 10 },
    headStyles: { fillColor: [34, 197, 94] },
  });

  const y2 = (doc.lastAutoTable?.finalY || yAfter + 120) + 18;
  doc.setFont("helvetica", "bold");
  doc.text("Calendário acadêmico (eventos)", 40, y2);

  autoTable(doc, {
    startY: y2 + 12,
    theme: "grid",
    head: [["Data", "Evento", "Tipo"]],
    body: calendar.events.map((e) => [e.date, e.title, e.type]),
    styles: { fontSize: 10 },
    headStyles: { fillColor: [15, 23, 42] },
  });

  doc.save("relatorio-edu-gestor.pdf");
}
