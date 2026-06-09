import React from 'react';
import { TICKER_ITEMS } from '../data/jobsData';

export default function Ticker() {
  const text = TICKER_ITEMS.join("    ||    ");
  return (
    <div className="ticker-wrap">
      <div className="ticker-label">📢 LATEST:</div>
      <div className="ticker-track">
        <div className="ticker-text">{text}</div>
      </div>
    </div>
  );
}
