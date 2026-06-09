import React from 'react';
import { STATES, JOBS } from '../data/jobsData';

export default function StateVacancyGrid({ onStateSelect }) {
  // Calculate current open vacancy count per state
  const getVacancyCount = (stateCode) => {
    return JOBS.filter(job => job.state === stateCode).length;
  };

  return (
    <div className="section-box" style={{ marginBottom: "14px" }}>
      <div 
        className="section-header" 
        style={{ 
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", 
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)" 
        }}
      >
        🏛️ State Wise Vacancy — Rojgar In Bihar 2026
      </div>
      <div className="cat-grid">
        {STATES.map(state => {
          const count = getVacancyCount(state.code);
          return (
            <button
              key={state.code}
              className="cat-btn"
              style={{ 
                background: state.color,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 8px',
                minHeight: '60px',
                gap: '4px'
              }}
              onClick={() => onStateSelect(state.name)}
            >
              <span style={{ fontSize: '13px', fontWeight: '700' }}>{state.name}</span>
              <span 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.2)', 
                  padding: '2px 8px', 
                  borderRadius: '12px', 
                  fontSize: '10px', 
                  fontWeight: '800' 
                }}
              >
                {count} {count === 1 ? 'Vacancy' : 'Vacancies'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
