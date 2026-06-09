import React from 'react';
import { SYLLABI } from '../data/jobsData';
import CatPill from '../components/CatPill';

export default function SyllabusPage({ onBack }) {
  return (
    <div>
      <div
        className="section-header"
        style={{ background: "#1565c0", borderRadius: "4px 4px 0 0", padding: "10px 14px", fontSize: "15px" }}
      >
        📘 Syllabus & Exam Pattern 2026
      </div>
      <div className="section-box" style={{ borderRadius: "0 0 4px 4px", borderTop: "none" }}>
        {SYLLABI.map(item => (
          <div key={item.id} className="syllabus-row">
            <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
              <div className="item-title" style={{ display: 'inline' }}>
                <span className="item-diamond">◆</span>{item.title}
              </div>
              <div style={{ marginTop: "4px" }}>
                <CatPill category={item.category} />
                <span className="item-meta">Updated: {item.updated}</span>
              </div>
            </a>
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn-syllabus">📄 PDF</a>
          </div>
        ))}
      </div>
      {onBack && (
        <div style={{ textAlign: 'center', marginTop: '24px', paddingBottom: '16px' }}>
          <button 
            onClick={onBack} 
            className="btn-back"
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#475569', 
              color: '#fff', 
              border: 'none', 
              padding: '10px 24px', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              fontWeight: '600',
              fontSize: '14px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = '#334155'}
            onMouseLeave={(e) => e.target.style.background = '#475569'}
          >
            &laquo; Back
          </button>
        </div>
      )}
    </div>
  );
}
