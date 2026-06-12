import React from 'react';
import { JOBS, RESULTS, ADMIT_CARDS, ANSWER_KEYS } from '../data/jobsData';
import StatsBanner from '../components/StatsBanner';
import CategoriesGrid from '../components/CategoriesGrid';
import StateVacancyGrid from '../components/StateVacancyGrid';
import SectionBox from '../components/SectionBox';
import Sidebar from '../components/Sidebar';

export default function HomePage({ setPage, setCatFilter, setStateFilter, onViewDetails }) {
  return (
    <div className="home-grid">
      <div>
        <StatsBanner />
        <CategoriesGrid onFilter={category => {
          setCatFilter(category);
          if (["Certificates", "Cards", "Utility Bills", "Land Records", "Education"].includes(category)) {
            setPage("otherlinks");
          } else {
            setPage("jobs");
          }
        }} />
        <StateVacancyGrid onStateSelect={stateName => {
          setStateFilter(stateName);
          setPage("statejobs");
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

        {/* ── "HOW THIS SITE HELPS YOU" SECTION ── */}
        <section className="helps-section">
          <h3 className="helps-title">How This Site Helps You / यह साइट आपकी कैसे मदद करती है</h3>
          <p style={{ fontSize: '13px', color: '#475569', marginBottom: '16px', lineHeight: '1.6' }}>
            Rojgar In Bihar is a dedicated portal built to help candidates, cyber café operators, and rural students access all Bihar state and central government vacancies and services from a single dashboard. (रोजगार इन बिहार एक समर्पित पोर्टल है जो सभी सरकारी नौकरियों और योजनाओं को एक मंच पर लाता है।)
          </p>
          <div className="helps-grid">
            <div className="helps-card">
              <h4 className="helps-card-title">🎯 Direct Official Links (आधिकारिक लिंक)</h4>
              <p className="helps-card-text">
                Save time and avoid spam. We provide direct, clean links to official government websites (.gov.in, .nic.in, .bihar.gov.in) with zero redirect ads. (बिना विज्ञापन सीधे आधिकारिक वेबसाइट्स के लिंक।)
              </p>
            </div>
            <div className="helps-card">
              <h4 className="helps-card-title">📝 Step-by-Step Guides (आवेदन मार्गदर्शिका)</h4>
              <p className="helps-card-text">
                Avoid form rejections. Every job and result has a clear "How to Apply / Check" instructions list tailored for rural candidates and café operators. (गलतियों से बचने के लिए फॉर्म भरने की आसान गाइड।)
              </p>
            </div>
            <div className="helps-card">
              <h4 className="helps-card-title">🗺️ One-Stop Bihar Portal (बिहार विशेष सेवाएं)</h4>
              <p className="helps-card-text">
                Access RTPS Bihar certificates, Bhu-Naksha land records, electricity bills, e-Shram, Ayushman cards, and state scholarships all in one tab. (बिहार राज्य की सभी जरूरी ऑनलाइन सेवाएं एक ही जगह।)
              </p>
            </div>
          </div>
        </section>
      </div>
      <Sidebar setPage={setPage} setCatFilter={setCatFilter} onViewDetails={onViewDetails} />
    </div>
  );
}
