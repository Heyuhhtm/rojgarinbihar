import React from 'react';
import { STATES, JOBS } from '../data/jobsData';

export default function StateListPage({ onStateSelect }) {
  // Calculate dynamic count per state
  const getVacancyCount = (stateCode) => {
    return JOBS.filter(job => job.state === stateCode).length;
  };

  return (
    <div>
      <div
        className="section-header"
        style={{ 
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", 
          borderRadius: "4px 4px 0 0", 
          padding: "12px 16px", 
          fontSize: "16px" 
        }}
      >
        🗺️ Browse State Wise Vacancies — Rojgar In Bihar 2026
      </div>
      <div className="section-box" style={{ borderRadius: "0 0 4px 4px", borderTop: "none", padding: "20px" }}>
        <p style={{ marginBottom: "20px", color: "#64748b", fontSize: "14px", lineHeight: "1.6" }}>
          Select your target state below to view all currently active government job recruitment notifications, online application forms, and vacancy updates.
        </p>
        <div 
          style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", 
            gap: "16px" 
          }}
        >
          {STATES.map(state => {
            const count = getVacancyCount(state.code);
            return (
              <div
                key={state.code}
                onClick={() => onStateSelect(state.name)}
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "20px",
                  background: "#fff",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.02)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.05)";
                  e.currentTarget.style.borderColor = state.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.02)";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <div 
                      style={{ 
                        width: "12px", 
                        height: "12px", 
                        borderRadius: "50%", 
                        background: state.color 
                      }} 
                    />
                    <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b" }}>{state.name}</h3>
                  </div>
                  <p style={{ fontSize: "12px", color: "#64748b", lineHeight: "1.5", marginBottom: "16px" }}>
                    Find all state services, board recruitments, and departmental vacancies in {state.name}.
                  </p>
                </div>
                <div 
                  style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center" 
                  }}
                >
                  <span 
                    style={{ 
                      fontSize: "12px", 
                      fontWeight: "700", 
                      color: state.color,
                      background: state.bg,
                      padding: "4px 10px",
                      borderRadius: "6px"
                    }}
                  >
                    {count} {count === 1 ? "Vacancy" : "Vacancies"}
                  </span>
                  <span 
                    style={{ 
                      fontSize: "12px", 
                      fontWeight: "bold", 
                      color: "#64748b" 
                    }}
                  >
                    View &raquo;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
