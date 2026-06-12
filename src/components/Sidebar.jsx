import React from 'react';
import { ADMIT_CARDS, RESULTS } from '../data/jobsData';

export default function Sidebar({ setPage, setCatFilter, onViewDetails }) {
  return (
    <aside className="sidebar">
      <div className="section-box">
        <div className="section-header" style={{ background: "#cc0000" }}>🔗 Important Links</div>
        {[
          { label: "Latest Online Form", page: "jobs", color: "#cc0000" },
          { label: "Rojgar In Bihar Result 2026", page: "results", color: "#2e7d32" },
          { label: "Admit Card 2026", page: "admitcard", color: "#e65c00" },
          { label: "Answer Key 2026", page: "answerkey", color: "#6a1b9a" },
          { label: "Syllabus 2026", page: "syllabus", color: "#1565c0" },
          { label: "State Wise Jobs", page: "state-list", color: "#003366" },
          { label: "Rojgar Services", page: "otherlinks", color: "#008080", filter: "Certificates" },
          { label: "Contact Us", page: "contact", color: "#37474f" },
        ].map(link => (
          <div
            key={link.label}
            className="sidebar-link"
            style={{ color: link.color }}
            onClick={() => {
              if (link.page === 'jobs') {
                setCatFilter('All');
              } else if (link.page === 'otherlinks') {
                setCatFilter(link.filter || 'Rojgar');
              }
              setPage(link.page);
            }}
          >
            <span style={{ color: link.color, fontWeight: "bold" }}>▶</span> {link.label}
          </div>
        ))}
      </div>

      <div className="section-box" style={{ marginTop: "14px" }}>
        <div className="section-header" style={{ background: "#e65c00" }}>🎫 Upcoming Exams</div>
        {ADMIT_CARDS.slice(0, 5).map(item => (
          <div 
            key={item.id} 
            className="sidebar-item" 
            onClick={() => onViewDetails && onViewDetails(item, 'admit')}
            style={{ cursor: 'pointer' }}
          >
            <div className="sidebar-item-title">◆ {item.title}</div>
            <div className="sidebar-item-meta" style={{ color: "#e65c00" }}>
              Exam: {item.examDate}
            </div>
          </div>
        ))}
      </div>

      <div className="section-box" style={{ marginTop: "14px" }}>
        <div className="section-header" style={{ background: "#2e7d32" }}>📊 Latest Results</div>
        {RESULTS.slice(0, 5).map(item => (
          <div 
            key={item.id} 
            className="sidebar-item" 
            onClick={() => onViewDetails && onViewDetails(item, 'results')}
            style={{ cursor: 'pointer' }}
          >
            <div className="sidebar-item-title">◆ {item.title}</div>
            <div className="sidebar-item-meta">{item.date}</div>
          </div>
        ))}
      </div>

      <div className="section-box" style={{ marginTop: "14px" }}>
        <div className="section-header" style={{ background: "#003366" }}>📱 Our Apps</div>
        <div style={{ padding: "12px", textAlign: "center" }}>
          <p style={{ fontSize: "12px", color: "#555", marginBottom: "10px", lineHeight: "1.6" }}>
            Get instant alerts for Sarkari Naukri on your phone!
          </p>
          <button className="btn-apply" style={{ width: "100%", padding: "8px", fontSize: "13px", marginBottom: "6px" }}>
            📱 Android App
          </button>
          <button className="btn-admit" style={{ width: "100%", padding: "8px", fontSize: "13px" }}>
            🍎 iOS App
          </button>
        </div>
      </div>

      <div className="disclaimer-box">
        <strong>⚠️ Disclaimer:</strong> RojgarInBihar is an informational portal.
        We do not charge any fee. Always verify from official government websites before applying.
      </div>
    </aside>
  );
}
