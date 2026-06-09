import React from 'react';
import { JOBS, RESULTS, ADMIT_CARDS, ANSWER_KEYS } from '../data/jobsData';
import StatsBanner from '../components/StatsBanner';
import CategoriesGrid from '../components/CategoriesGrid';
import SectionBox from '../components/SectionBox';
import Sidebar from '../components/Sidebar';

export default function HomePage({ setPage, setCatFilter, onViewDetails }) {
  return (
    <div className="home-grid">
      <div>
        <StatsBanner />
        <CategoriesGrid onFilter={category => {
          setCatFilter(category);
          if (["UIDAI", "PAN", "Parivahan", "Sarkari Kaam", "Election", "Land Records", "Bijli Bill", "Mobile Services"].includes(category)) {
            setPage("otherlinks");
          } else {
            setPage("jobs");
          }
        }} />
        <SectionBox
          title="Latest Online Form — Apply Now 2026" color="#cc0000" items={JOBS} type="jobs"
          onViewAll={() => { setCatFilter("All"); setPage("jobs"); }} onViewDetails={onViewDetails}
        />
        <SectionBox
          title="Rojgar In Bihar Result 2026" color="#2e7d32" items={RESULTS} type="results"
          onViewAll={() => setPage("results")} onViewDetails={onViewDetails}
        />
        <SectionBox
          title="Admit Card 2026 — Download Now"
          color="#e65c00" items={ADMIT_CARDS} type="admit"
          onViewAll={() => setPage("admitcard")} onViewDetails={onViewDetails}
        />
        <SectionBox
          title="Answer Key 2026" color="#6a1b9a" items={ANSWER_KEYS} type="answerkey"
          onViewAll={() => setPage("answerkey")} onViewDetails={onViewDetails}
        />
      </div>
      <Sidebar setPage={setPage} setCatFilter={setCatFilter} onViewDetails={onViewDetails} />
    </div>
  );
}
