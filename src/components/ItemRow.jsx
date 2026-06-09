import React from 'react';
import NewHotBadge from './NewHotBadge';
import CatPill from './CatPill';

export default function ItemRow({ item, type, onViewDetails }) {
  const handleView = () => {
    onViewDetails(item, type);
  };
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
            {type === "jobs" && `Vacancies: ${item.posts} | Last Date: ${item.lastDate}`}
            {type === "results" && `Result Date: ${item.date}`}
            {type === "admit" && `Exam Date: ${item.examDate} | Released: ${item.date}`}
            {type === "answerkey" && `Date: ${item.date}`}
          </span>
        </div>
      </td>
      <td className="item-btn-td">
        <button onClick={handleView} className={`btn-${type === 'jobs' ? 'apply' : type === 'results' ? 'result' : type === 'admit' ? 'admit' : 'answer'}`}>
          {type === 'jobs' ? 'Apply Now' : type === 'results' ? 'View Result' : type === 'admit' ? 'Download' : 'View Key'}
        </button>
      </td>
    </tr>
  );
}
