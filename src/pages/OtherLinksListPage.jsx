import React from 'react';
import { CATEGORIES, OTHER_LINKS } from '../data/jobsData';
import CatPill from '../components/CatPill';

export default function OtherLinksListPage({ category }) {
  const categoryInfo = CATEGORIES.find(c => c.label === category) || { color: "#004d40", label: "Services" };
  const links = OTHER_LINKS.filter(link => link.category === category);

  return (
    <div>
      <div
        className="section-header"
        style={{ background: categoryInfo.color, borderRadius: "4px 4px 0 0", padding: "10px 14px", fontSize: "15px" }}
      >
        🔗 {categoryInfo.label} Services
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
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn-syllabus" style={{ background: categoryInfo.color }}>Visit</a>
          </div>
        )) : (
          <p className="no-results">No links found for this category.</p>
        )}
      </div>
    </div>
  );
}
