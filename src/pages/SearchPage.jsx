import React from 'react';
import { JOBS, RESULTS, ADMIT_CARDS, ANSWER_KEYS } from '../data/jobsData';
import ItemRow from '../components/ItemRow';

export default function SearchPage({ query, onViewDetails }) {
  const all = [
    ...JOBS.map(j => ({ ...j, type: "jobs" })),
    ...RESULTS.map(r => ({ ...r, type: "results" })),
    ...ADMIT_CARDS.map(a => ({ ...a, type: "admit" })),
    ...ANSWER_KEYS.map(k => ({ ...k, type: "answerkey" })),
  ];
  const q = query.toLowerCase();
  const results = all.filter(i =>
    i.title.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)
  );
  return (
    <div>
      <div
        className="section-header"
        style={{ background: "#003366", borderRadius: "4px 4px 0 0", padding: "10px 14px", fontSize: "15px" }}
      >
        🔍 Search Results for &ldquo;{query}&rdquo; — {results.length} found
      </div>
      <div className="section-box" style={{ borderRadius: "0 0 4px 4px", borderTop: "none" }}>
        {results.length === 0 ? (
          <div className="no-results-big">
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>🔍</div>
            <div>No results found for &ldquo;{query}&rdquo;</div>
            <div style={{ fontSize: "13px", color: "#aaa", marginTop: "6px" }}>
              Try: Railway, Bank, SSC, UPSC, Police
            </div>
          </div>
        ) : (
          <table className="item-table">
            <tbody>
              {results.map(item => (
                <ItemRow key={`${item.type}-${item.id}`} item={item} type={item.type} onViewDetails={onViewDetails} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
