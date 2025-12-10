import React from "react";

export default function StatsCard({ title, value, hint }) {
  return (
    <div style={{
      background: "var(--panel)",
      borderRadius: "var(--radius)",
      boxShadow: "var(--shadow)",
      padding: 14,
      minWidth: 170,
    }}>
      <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.2 }}>{value}</div>
      {hint ? <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 6 }}>{hint}</div> : null}
    </div>
  );
}
