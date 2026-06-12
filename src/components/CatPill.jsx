import React from 'react';
import { CATEGORIES } from '../data/jobsData';

export default function CatPill({ category }) {
  const c = CATEGORIES.find(x => x.label === category) || { color: "#555", bg: "#eee" };
  return (
    <span style={{
      background: c.bg, color: c.color, fontSize: "10px", padding: "1px 6px",
      borderRadius: "2px", marginRight: "6px", fontWeight: "600",
      border: `1px solid ${c.color}33`, display: "inline-block"
    }}>
      {category} {c.hindi ? `/ ${c.hindi}` : ''}
    </span>
  );
}
