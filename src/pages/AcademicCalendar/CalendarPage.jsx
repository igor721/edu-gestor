import React from "react";
import { academicCalendar } from "../../data/calendar.js";

export default function CalendarPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ background: "var(--panel)", borderRadius: "var(--radius)", boxShadow: "var(--shadow)", padding: 12 }}>
        <div style={{ fontWeight: 800 }}>Calendário Acadêmico — {academicCalendar.schoolYear}</div>
        <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 6 }}>
          Períodos letivos e eventos importantes (dados fictícios).
        </div>
      </div>

      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ background: "var(--panel)", borderRadius: "var(--radius)", boxShadow: "var(--shadow)", overflow: "hidden" }}>
          <div style={{ padding: 12, borderBottom: "1px solid var(--line)", fontWeight: 800 }}>Períodos (bimestres)</div>
          <div style={{ padding: 12 }}>
            <ul style={{ margin: 0, paddingLeft: 18, color: "var(--text)" }}>
              {academicCalendar.periods.map((p) => (
                <li key={p.id} style={{ marginBottom: 8 }}>
                  <b>{p.label}</b> — {p.start} → {p.end}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ background: "var(--panel)", borderRadius: "var(--radius)", boxShadow: "var(--shadow)", overflow: "hidden" }}>
          <div style={{ padding: 12, borderBottom: "1px solid var(--line)", fontWeight: 800 }}>Eventos</div>
          <div style={{ padding: 12 }}>
            <ul style={{ margin: 0, paddingLeft: 18, color: "var(--text)" }}>
              {academicCalendar.events.map((e) => (
                <li key={e.date + e.title} style={{ marginBottom: 8 }}>
                  <b>{e.date}</b> — {e.title} <span style={{ color: "var(--muted)" }}>({e.type})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
