import React from 'react';
import ItemRow from './ItemRow';

export default function SectionBox({ title, color, items, type, onViewAll, onViewDetails }) {
  return (
    <div className="section-box">
      <div className="section-header" style={{ background: color }}>
        <span>⚡ {title}</span>
        <button className="view-all-btn" onClick={onViewAll}>View All »</button>
      </div>
      <table className="item-table">
        <tbody>
          {items.slice(0, 8).map(item => (
            <ItemRow key={item.id} item={item} type={type} onViewDetails={onViewDetails} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
