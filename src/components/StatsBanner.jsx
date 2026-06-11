import React from 'react';

export default function StatsBanner() {
  const stats = [
    { label: "Active Vacancies", value: "2,45,000+", icon: "💼", glowClass: "glow-card-r" },
    { label: "Open Forms", value: "48", icon: "📝", glowClass: "glow-card-g" },
    { label: "Results Out", value: "32", icon: "📊", glowClass: "glow-card-y" },
    { label: "Admit Cards", value: "21", icon: "🎫", glowClass: "glow-card-p" },
  ];
  return (
    <div className="stats-grid">
      {stats.map(s => (
        <div key={s.label} className={`stat-card ${s.glowClass}`}>
          <div className="stat-value">{s.icon} {s.value}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

