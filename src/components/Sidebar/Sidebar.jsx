import React from "react";
import { NavLink } from "react-router-dom";

const items = [
  { to: "/", label: "Visão Geral" },
  { to: "/alunos", label: "Alunos" },
  { to: "/professores", label: "Professores" },
  { to: "/calendario", label: "Calendário" },
  { to: "/relatorios", label: "Relatórios" },
];

export default function Sidebar() {
  return (
    <aside style={{
      width: 240,
      background: "linear-gradient(180deg, #0f172a 0%, #0b1020 100%)",
      color: "#fff",
      padding: "18px 14px",
      display: "flex",
      flexDirection: "column",
      gap: 14,
    }}>
      <div style={{ fontWeight: 900, letterSpacing: -0.3, fontSize: 18 }}>EduGestor</div>
      <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, marginBottom: 6 }}>
        Gestão escolar — demo (dados fictícios)
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end
            style={({ isActive }) => ({
              padding: "10px 10px",
              borderRadius: 10,
              background: isActive ? "rgba(255,255,255,0.14)" : "transparent",
              color: "#fff",
              fontWeight: isActive ? 700 : 500,
            })}
          >
            {it.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
