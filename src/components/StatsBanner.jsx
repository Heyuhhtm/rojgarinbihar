import React from 'react';

export default function StatsBanner() {
  const stats = [
    { label: "Active Vacancies", value: "2,45,000+", icon: "💼" },
    { label: "Open Forms", value: "48", icon: "📝" },
    { label: "Results Out", value: "32", icon: "📊" },
    { label: "Admit Cards", value: "21", icon: "🎫" },
  ];
  return (
    <div className="stats-grid">
      {stats.map(s => (
        <div key={s.label} className="stat-card">
          <div className="stat-value">{s.icon} {s.value}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
