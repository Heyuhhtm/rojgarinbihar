import React from 'react';
import { CATEGORIES } from '../data/jobsData';

export default function CategoriesGrid({ onFilter }) {
  return (
    <div className="section-box" style={{ marginBottom: "14px" }}>
      <div className="section-header" style={{ background: "#003366" }}>
        🗂️ Browse by Category — Rojgar In Bihar 2026
      </div>
      <div className="cat-grid">
        {CATEGORIES.map(cat => (
          <button
            key={cat.label}
            className="cat-btn"
            style={{ background: cat.color }}
            onClick={() => onFilter(cat.label)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
