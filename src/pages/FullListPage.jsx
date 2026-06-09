import React, { useState, useEffect } from 'react';
import ItemRow from '../components/ItemRow';

export default function FullListPage({ title, color, items, type, initialFilter = "All", onViewDetails, onBack }) {
  const [filter, setFilter] = useState(initialFilter);

  // Sync internal filter state if the initialFilter prop changes (e.g., from a new navigation)
  useEffect(() => {
    setFilter(initialFilter);
  }, [initialFilter]);

  const cats = ["All", ...new Set(items.map(i => i.category))];
  const filtered = filter === "All" ? items : items.filter(i => i.category === filter);

  return (
    <div>
      <div
        className="section-header"
        style={{ background: color, borderRadius: "4px 4px 0 0", padding: "10px 14px", fontSize: "15px" }}
      >
        ⚡ {title}
      </div>
      <div className="filter-bar">
        <span className="filter-label">Filter:</span>
        {cats.map(cat => (
          <button
            key={cat}
            className="filter-btn"
            style={{
              background: filter === cat ? color : "#f0f0f0",
              color: filter === cat ? "#fff" : "#444",
              border: `1px solid ${filter === cat ? color : "#ccc"}`,
              fontWeight: filter === cat ? "bold" : "normal",
            }}
            onClick={() => setFilter(cat)}
          >
            {cat} {filter === cat && `(${filtered.length})`}
          </button>
        ))}
      </div>
      <div className="section-box" style={{ borderRadius: "0 0 4px 4px", borderTop: "none" }}>
        <table className="item-table">
          <tbody>
            {filtered.map(item => <ItemRow key={item.id} item={item} type={type} onViewDetails={onViewDetails} />)}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="no-results">No items found in this category.</p>
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
