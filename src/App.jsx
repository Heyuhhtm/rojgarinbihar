import { useState } from "react";
import { JOBS, RESULTS, ADMIT_CARDS, ANSWER_KEYS } from "./data/jobsData";
import Ticker from "./components/Ticker";
import Sidebar from "./components/Sidebar";
import WhatsAppButton from "./components/WhatsAppButton";
import HomePage from "./pages/HomePage";
import FullListPage from "./pages/FullListPage";
import DetailPage from "./pages/DetailPage";
import OtherLinksListPage from "./pages/OtherLinksListPage";
import SyllabusPage from "./pages/SyllabusPage";
import SearchPage from "./pages/SearchPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsConditionsPage from "./pages/TermsConditionsPage";

export default function App() {
  const [page, setPage] = useState("home");
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

  const NAV = [
    { label: "Home", page: "home", icon: "🏠" },
    { label: "Latest Jobs", page: "jobs", icon: "💼" },
    { label: "Results", page: "results", icon: "📊" },
    { label: "Admit Card", page: "admitcard", icon: "🎫" },
    { label: "Answer Key", page: "answerkey", icon: "🗝️" },
    { label: "Syllabus", page: "syllabus", icon: "📘" },
    { label: "Contact", page: "contact", icon: "📬" },
  ];

  const handleSearch = e => {
    e.preventDefault();
    if (search.trim()) { setSearchQuery(search.trim()); setPage("search"); }
  };

  const handleViewDetails = (item, type) => {
    setSelectedItem({ item, type });
    setPage('details');
  };

  const pageLabel = page === 'details'
    ? selectedItem?.item.title
    : (NAV.find(l => l.page === page)?.label || 
       (page === 'about' ? 'About Us' : 
        page === 'privacy' ? 'Privacy Policy' : 
        page === 'terms' ? 'Terms & Conditions' : 'Search'));

  return (
    <div className="app">

      {/* ── HEADER ── */}
      <header className="site-header">
        <div className="container header-inner">
          <div className="logo-wrap" onClick={() => setPage("home")} style={{ cursor: "pointer" }}>
            <div className="logo-circle" title="Rojgar In Bihar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "22px", height: "22px" }}>
                <rect x="3" y="8" width="18" height="13" rx="2" />
                <path d="M16 8V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3" />
                <path d="M12 17v-5" />
                <path d="M9 14l3-3 3 3" />
              </svg>
            </div>
            <div>
              <div className="logo-title">ROJGARINBIHAR ®</div>
              <div className="logo-sub">rojgarinbihar.com</div>
            </div>
          </div>
          <div>
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search Vacancy, Result, Admit Card..."
                className="search-input"
              />
              <button type="submit" className="search-btn">🔍 Search</button>
            </form>
            <div className="header-sub-links">📱 App Available | 📺 YouTube | 📢 Telegram</div>
          </div>
        </div>
      </header>

      {/* ── NAV ── */}
      <nav className="site-nav">
        <div className="container nav-inner">
          {NAV.map(link => (
            <button
              key={link.page}
              className={`nav-btn ${page === link.page ? "nav-btn-active" : ""}`}
              onClick={() => {
                if (link.page === 'jobs') {
                  setCatFilter('All');
                }
                setPage(link.page);
              }}
            >
              {link.icon} {link.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ── TICKER ── */}
      <Ticker />

      {/* ── BREADCRUMB ── */}
      <div className="breadcrumb">
        <div className="container breadcrumb-inner">
          <span>🏠 Home {page !== "home" && `» ${pageLabel}`}</span>
          <span className="breadcrumb-alert">
            📢 RRB ALP 9,144 Posts | SSC CGL 17,727 Posts | Apply Now!
          </span>
        </div>
      </div>

      {/* ── MAIN ── */}
      <main className="container main-content">
        {page === "home" && <HomePage setPage={setPage} setCatFilter={setCatFilter} onViewDetails={handleViewDetails} />}
        {page === "jobs" &&
          <FullListPage
            title={catFilter !== "All" ? `${catFilter} Jobs — Rojgar In Bihar 2026` : "Latest Online Form — Rojgar In Bihar 2026"}
            color="#cc0000" items={JOBS} type="jobs" initialFilter={catFilter} onViewDetails={handleViewDetails}
          />
        }
        {page === "results" && <FullListPage title="Rojgar In Bihar Result 2026" color="#2e7d32" items={RESULTS} type="results" onViewDetails={handleViewDetails} />}
        {page === "admitcard" && <FullListPage title="Admit Card 2026 — Download" color="#e65c00" items={ADMIT_CARDS} type="admit" onViewDetails={handleViewDetails} />}
        {page === "answerkey" && <FullListPage title="Answer Key 2026 — Check Now" color="#6a1b9a" items={ANSWER_KEYS} type="answerkey" onViewDetails={handleViewDetails} />}
        {page === "details" && <DetailPage selectedItem={selectedItem} setPage={setPage} />}
        {page === "otherlinks" && <OtherLinksListPage category={catFilter} />}
        {page === "syllabus" && <SyllabusPage />}
        {page === "search" && <SearchPage query={searchQuery} onViewDetails={handleViewDetails} />}
        {page === "contact" && <ContactPage />}
        {page === "about" && <AboutPage />}
        {page === "privacy" && <PrivacyPolicyPage />}
        {page === "terms" && <TermsConditionsPage />}
      </main>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <h4 className="footer-heading">RojgarInBihar</h4>
            <p className="footer-text">
              India&apos;s trusted government job portal. Get latest Rojgar In Bihar updates,
              results, admit cards &amp; syllabus at rojgarinbihar.com
            </p>
          </div>
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            {[
              { label: "Latest Online Form", page: "jobs" },
              { label: "Rojgar In Bihar Result 2026", page: "results" },
              { label: "Admit Card 2026", page: "admitcard" },
              { label: "Answer Key 2026", page: "answerkey" },
              { label: "Syllabus 2026", page: "syllabus" },
            ].map(l => (
              <div key={l.label} className="footer-link" style={{ cursor: 'pointer' }} onClick={() => {
                if (l.page === 'jobs') setCatFilter('All');
                setPage(l.page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>▶ {l.label}</div>
            ))}
          </div>
          <div>
            <h4 className="footer-heading">Top Categories</h4>
            {[
              { label: "Railway", filter: "Railway" },
              { label: "Bank / IBPS / SBI", filter: "Bank" },
              { label: "SSC", filter: "SSC" },
              { label: "UPSC", filter: "UPSC" },
              { label: "Police", filter: "Police" },
              { label: "Army / Navy / Defence", filter: "Defence" },
              { label: "Teaching / TET", filter: "Teaching" },
            ].map(c => (
              <div key={c.label} className="footer-link" style={{ cursor: 'pointer' }} onClick={() => {
                setCatFilter(c.filter);
                setPage('jobs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>▶ {c.label}</div>
            ))}
          </div>
          <div>
            <h4 className="footer-heading">Information</h4>
            {[
              { label: "About Us", page: "about" },
              { label: "Privacy Policy", page: "privacy" },
              { label: "Terms & Conditions", page: "terms" },
              { label: "Contact Us", page: "contact" },
            ].map(l => (
              <div key={l.label} className="footer-link" style={{ cursor: 'pointer' }} onClick={() => {
                setPage(l.page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>▶ {l.label}</div>
            ))}
          </div>

        </div>
        <div className="footer-bottom">
          <div>2026 RojgarInBihar | rojgarinbihar.com | All Rights Reserved</div>
          <div>Disclaimer: Informational portal only. Verify from official websites.</div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
