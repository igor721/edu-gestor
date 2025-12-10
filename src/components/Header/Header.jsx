import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext.jsx";

export default function Header() {
  const { compact, setCompact } = useSettings();
  const location = useLocation();

  return (
    <header style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)", background: "var(--panel)" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
          <div style={{ fontWeight: 800, letterSpacing: -0.2 }}>EduGestor</div>
          <div style={{ color: "var(--muted)", fontSize: 13 }}>{location.pathname || "/"}</div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: "var(--muted)" }}>
            <input
              type="checkbox"
              checked={compact}
              onChange={(e) => setCompact(e.target.checked)}
            />
            Compactar UI
          </label>
          <Link to="/relatorios" style={{ color: "var(--primary)", fontWeight: 600, fontSize: 13 }}>
            Relatórios (PDF)
          </Link>
        </div>
      </div>
    </header>
  );
}
