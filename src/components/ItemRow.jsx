import React from 'react';
import NewHotBadge from './NewHotBadge';
import CatPill from './CatPill';

export default function ItemRow({ item, type, onViewDetails }) {
  const handleView = () => {
    onViewDetails(item, type);
  };

  const officialLink = item.officialLink || item.url;
  const lastUpdatedText = item.lastUpdated ? ` | Updated: ${item.lastUpdated}` : '';

  return (
    <tr className="item-row">
      <td className="item-td">
        <div onClick={handleView} style={{ cursor: 'pointer' }}>
          <span className="item-diamond">◆</span>
          <span className="item-title">{item.title}</span>
          <NewHotBadge isNew={item.isNew} isHot={item.isHot} />
        </div>
        <div style={{ marginTop: "3px" }}>
          <CatPill category={item.category} />
          <span className="item-meta">
            {type === "jobs" && `Vacancies: ${item.posts} | Last Date: ${item.lastDate}${lastUpdatedText}`}
            {type === "results" && `Result Date: ${item.date}${lastUpdatedText}`}
            {type === "admit" && `Exam Date: ${item.examDate} | Released: ${item.date}${lastUpdatedText}`}
            {type === "answerkey" && `Date: ${item.date}${lastUpdatedText}`}
          </span>
        </div>
      </td>
      <td className="item-btn-td" style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
        <button onClick={handleView} className="btn-view-details">
          📄 Details
        </button>
        <a 
          href={officialLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`btn-official-link btn-${type === 'jobs' ? 'apply' : type === 'results' ? 'result' : type === 'admit' ? 'admit' : 'answer'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {type === 'jobs' ? 'Apply' : type === 'results' ? 'Result' : type === 'admit' ? 'Admit' : 'Key'}
        </a>
      </td>
    </tr>
  );
}
