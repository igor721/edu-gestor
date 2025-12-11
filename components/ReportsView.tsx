import React from 'react';
import { MOCK_STUDENTS } from '../constants';
import { FileText, Download, Printer } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const ReportsView: React.FC = () => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text("Relatório de Desempenho Escolar", 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`, 14, 28);

    // Summary
    const avgScore = (MOCK_STUDENTS.reduce((acc, s) => acc + s.performanceScore, 0) / MOCK_STUDENTS.length).toFixed(1);
    const total = MOCK_STUDENTS.length;
    
    doc.setDrawColor(200, 200, 200);
    doc.line(14, 32, 196, 32);
    doc.text(`Total de Alunos: ${total}`, 14, 40);
    doc.text(`Média Geral: ${avgScore}`, 60, 40);

    // Table Data
    const tableData = MOCK_STUDENTS.map(s => [
      s.id,
      s.name,
      s.grade,
      s.city,
      `${s.attendance}%`,
      s.performanceScore
    ]);

    autoTable(doc, {
      head: [['ID', 'Nome', 'Turma', 'Cidade', 'Freq.', 'Nota']],
      body: tableData,
      startY: 45,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [79, 70, 229] }, // Indigo-600
      alternateRowStyles: { fillColor: [245, 247, 255] },
    });

    doc.save("relatorio_escolar_completo.pdf");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Central de Relatórios</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:border-indigo-200 transition-colors">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Relatório Geral de Alunos</h3>
          <p className="text-gray-500 mb-6">
            Gere um arquivo PDF completo contendo a lista de todos os alunos, 
            suas respectivas turmas, frequência e notas de desempenho atuais.
          </p>
          <button 
            onClick={generatePDF}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            <Download className="w-5 h-5" />
            Baixar PDF
          </button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center opacity-75">
           <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-4">
            <Printer className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Boletins Individuais</h3>
          <p className="text-gray-500 mb-6">
            Geração em lote de boletins individuais para impressão. 
            (Funcionalidade demonstrativa indisponível no momento)
          </p>
          <button 
            disabled
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-400 rounded-lg font-medium cursor-not-allowed"
          >
            <Download className="w-5 h-5" />
            Em Breve
          </button>
        </div>
      </div>
    </div>
  );
};