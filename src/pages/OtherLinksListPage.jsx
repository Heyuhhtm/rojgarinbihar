import React, { useState, useEffect } from 'react';
import { OTHER_LINKS } from '../data/jobsData';
import CatPill from '../components/CatPill';

export default function OtherLinksListPage({ category, onBack }) {
  const [activeTab, setActiveTab] = useState(category || "Certificates");

  // Sync state if category prop changes (from external nav/home grid click)
  useEffect(() => {
    if (category) {
      setActiveTab(category);
    }
  }, [category]);

  const serviceCategories = [
    { key: "Certificates", label: "Certificates", hindi: "प्रमाण पत्र", color: "#0891b2" },
    { key: "Cards", label: "Govt Cards", hindi: "सरकारी कार्ड", color: "#d97706" },
    { key: "Utility Bills", label: "Bills & Payments", hindi: "बिजली बिल व भुगतान", color: "#854d0e" },
    { key: "Land Records", label: "Land Records", hindi: "भूमि जानकारी", color: "#6b21a8" },
    { key: "Education", label: "Education / Scholarship", hindi: "शिक्षा व छात्रवृत्ति", color: "#008080" },
  ];

  const currentCatInfo = serviceCategories.find(c => c.key === activeTab) || serviceCategories[0];
  const links = OTHER_LINKS.filter(link => link.category === activeTab);

  return (
    <div>
      {/* Category Filter Chips */}
      <div className="service-chips-container" style={{ marginBottom: "18px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {serviceCategories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveTab(cat.key)}
            className="filter-btn"
            style={{
              background: activeTab === cat.key ? cat.color : "#f1f5f9",
              color: activeTab === cat.key ? "#fff" : "#475569",
              border: `1px solid ${activeTab === cat.key ? cat.color : "#cbd5e1"}`,
              padding: "8px 16px",
              borderRadius: "20px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            {cat.label} / {cat.hindi}
          </button>
        ))}
      </div>

      <div
        className="section-header"
        style={{ background: currentCatInfo.color, borderRadius: "4px 4px 0 0", padding: "10px 14px", fontSize: "15px" }}
      >
        🔗 {currentCatInfo.label} / {currentCatInfo.hindi} Services
      </div>
      <div className="section-box" style={{ borderRadius: "0 0 4px 4px", borderTop: "none" }}>
        {links.length > 0 ? links.map(item => (
          <div key={item.id} className="syllabus-row">
            <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
              <div className="item-title" style={{ display: 'inline' }}>
                <span className="item-diamond">◆</span>{item.title}
              </div>
              <div style={{ marginTop: "4px" }}>
                <CatPill category={item.category} />
              </div>
            </a>
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn-syllabus" style={{ background: currentCatInfo.color, margin: 0 }}>Visit</a>
          </div>
        )) : (
          <p className="no-results">No links found for this category.</p>
        )}
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
