import { useState, useEffect } from "react";
import { JOBS, RESULTS, ADMIT_CARDS, ANSWER_KEYS, STATES, OTHER_LINKS } from "./data/jobsData";
import Ticker from "./components/Ticker";
import Sidebar from "./components/Sidebar";
import WhatsAppButton from "./components/WhatsAppButton";
import HomePage from "./pages/HomePage";
import FullListPage from "./pages/FullListPage";
import DetailPage from "./pages/DetailPage";
import OtherLinksListPage from "./pages/OtherLinksListPage";
import StateListPage from "./pages/StateListPage";
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
  const [stateFilter, setStateFilter] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAppToast, setShowAppToast] = useState(false);
  
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const NAV = [
    { label: "Home", hindi: "मुख्य पृष्ठ", page: "home", icon: "🏠" },
    { label: "Latest Jobs", hindi: "नवीनतम नौकरियाँ", page: "jobs", icon: "💼" },
    { label: "State Jobs", hindi: "राज्य नौकरियाँ", page: "state-list", icon: "🗺️" },
    { label: "Results", hindi: "परीक्षा परिणाम", page: "results", icon: "📊" },
    { label: "Admit Card", hindi: "प्रवेश पत्र", page: "admitcard", icon: "🎫" },
    { label: "Answer Key", hindi: "उत्तर कुंजी", page: "answerkey", icon: "🗝️" },
    { label: "Syllabus", hindi: "पाठ्यक्रम", page: "syllabus", icon: "📘" },
    { label: "Rojgar", hindi: "रोजगार सेवाएं", page: "otherlinks", icon: "🔗", filter: "Certificates" },
    { label: "Contact", hindi: "संपर्क करें", page: "contact", icon: "📬" },
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
        page === 'terms' ? 'Terms & Conditions' : 
        page === 'otherlinks' ? 'Rojgar Services' : 
        page === 'state-list' ? 'State Wise Vacancy' : 
        page === 'statejobs' ? `${stateFilter} Vacancies` : 'Search'));

  // Get dynamic suggestions from hot items
  const hotJobs = JOBS.filter(j => j.isHot).map(j => {
    if (j.title.includes("SSC CGL")) return "SSC CGL";
    if (j.title.includes("RRB ALP")) return "RRB ALP";
    if (j.title.includes("BPSC")) return "BPSC";
    if (j.title.includes("Bihar Police")) return "Bihar Police";
    if (j.title.includes("UP Police")) return "UP Police";
    return j.title.split(" ").slice(0, 2).join(" ");
  });
  const hotLinks = OTHER_LINKS.filter(l => l.isHot).map(l => {
    if (l.title.includes("Aadhaar")) return "Aadhaar";
    if (l.title.includes("Caste")) return "Caste Cert";
    if (l.title.includes("Income")) return "Income Cert";
    if (l.title.includes("Ration")) return "Ration Card";
    if (l.title.includes("Land")) return "Land Record";
    return l.title.split(" ").slice(0, 2).join(" ");
  });
  const searchSuggestions = [...new Set([...hotJobs, ...hotLinks])].slice(0, 4);

  // Get dynamic trending text
  const trendingJobs = JOBS.filter(j => j.isHot).slice(0, 2);
  const trendingText = trendingJobs.length >= 2
    ? `📢 ${trendingJobs[0].title.split(" 2026")[0]} (${trendingJobs[0].posts} Posts) | ${trendingJobs[1].title.split(" 2026")[0]} (${trendingJobs[1].posts} Posts) | Apply Now!`
    : "📢 Latest Government Vacancies & Sarkari Result Updates | Apply Now!";

  return (
    <div className={`app ${darkMode ? "dark-theme" : ""}`}>

      {/* ── HEADER ── */}
      <header className="site-header">
        <div className="container header-inner">
          <div className="logo-wrap" onClick={() => setPage("home")} style={{ cursor: "pointer" }}>
            <div className="logo-circle" title="Rojgar In Bihar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="logo-emblem-text">RiB</span>
            </div>
            <div>
              <div className="logo-title">ROJGARINBIHAR ®</div>
              <div className="logo-sub">rojgarinbihar.com</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search Vacancy, Result..."
                  className="search-input"
                  style={{ width: "240px" }}
                />
                <button type="submit" className="search-btn">🔍 Search</button>
              </form>
              <button 
                type="button" 
                onClick={() => setDarkMode(!darkMode)} 
                className="theme-toggle-btn"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? "☀️ Light" : "🌙 Dark"}
              </button>
            </div>
            <div className="search-suggestions">
              <span className="suggestion-label">Suggested:</span>
              {searchSuggestions.map(tag => (
                <span 
                  key={tag} 
                  className="suggestion-tag"
                  onClick={() => {
                    setSearch(tag);
                    setSearchQuery(tag);
                    setPage("search");
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="header-sub-links" style={{ marginTop: "4px" }}>
              <span className="interactive-social" onClick={() => setShowAppToast(true)}>📱 App Available</span>
              |
              <span className="interactive-social" onClick={() => window.open("https://youtube.com/@rojgarinbihar", "_blank")}>📺 YouTube</span>
              |
              <span className="interactive-social" onClick={() => window.open("https://t.me/rojgarinbihar", "_blank")}>📢 Telegram</span>
            </div>
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
                } else if (link.page === 'otherlinks') {
                  setCatFilter(link.filter || 'Certificates');
                }
                setPage(link.page);
              }}
            >
              {link.icon} {link.label} / {link.hindi}
            </button>
          ))}
        </div>
      </nav>

      {/* ── TICKER ── */}
      <Ticker />

      {/* ── DISCLAIMER BANNER ── */}
      <div className="top-disclaimer-banner">
        <div className="container top-disclaimer-inner">
          <span className="disclaimer-badge">⚠️ Disclaimer / घोषणा</span>
          <span className="disclaimer-text">
            This is an informational portal. We provide direct links to official government websites — always verify details on the official site before applying. (यह एक सूचनात्मक पोर्टल है। हम सीधे आधिकारिक सरकारी वेबसाइटों के लिंक प्रदान करते हैं — आवेदन करने से पहले हमेशा आधिकारिक साइट पर विवरण सत्यापित करें।)
          </span>
        </div>
      </div>

      {/* ── BREADCRUMB ── */}
      <div className="breadcrumb">
        <div className="container breadcrumb-inner">
          <span>🏠 Home {page !== "home" && `» ${pageLabel}`}</span>
          <span className="breadcrumb-alert">
            {trendingText}
          </span>
        </div>
      </div>

      {/* ── MAIN ── */}
      <main className="container main-content">
        {page === "home" && <HomePage setPage={setPage} setCatFilter={setCatFilter} setStateFilter={setStateFilter} onViewDetails={handleViewDetails} />}
        {page === "jobs" &&
          <FullListPage
            title={catFilter !== "All" ? `${catFilter} Jobs — Rojgar In Bihar 2026` : "Latest Online Form — Rojgar In Bihar 2026"}
            color="#cc0000" items={JOBS} type="jobs" initialFilter={catFilter} onViewDetails={handleViewDetails} onBack={() => setPage("home")}
          />
        }
        {page === "results" && <FullListPage title="Rojgar In Bihar Result 2026" color="#2e7d32" items={RESULTS} type="results" onViewDetails={handleViewDetails} onBack={() => setPage("home")} />}
        {page === "admitcard" && <FullListPage title="Admit Card 2026 — Download" color="#e65c00" items={ADMIT_CARDS} type="admit" onViewDetails={handleViewDetails} onBack={() => setPage("home")} />}
        {page === "answerkey" && <FullListPage title="Answer Key 2026 — Check Now" color="#6a1b9a" items={ANSWER_KEYS} type="answerkey" onViewDetails={handleViewDetails} onBack={() => setPage("home")} />}
        {page === "details" && <DetailPage selectedItem={selectedItem} setPage={setPage} />}
        {page === "otherlinks" && <OtherLinksListPage category={catFilter} onBack={() => setPage("home")} />}
        {page === "state-list" && <StateListPage onStateSelect={(stateName) => { setStateFilter(stateName); setPage("statejobs"); }} onBack={() => setPage("home")} />}
        {page === "statejobs" && (
          <FullListPage 
            title={`${stateFilter} Vacancies — Rojgar In Bihar 2026`} 
            color="#0f172a" 
            items={JOBS.filter(job => {
              const st = STATES.find(s => s.name === stateFilter);
              return job.state === st?.code;
            })} 
            type="jobs" 
            onViewDetails={handleViewDetails} 
            onBack={() => setPage("state-list")}
          />
        )}
        {page === "syllabus" && <SyllabusPage onBack={() => setPage("home")} />}
        {page === "search" && <SearchPage query={searchQuery} onViewDetails={handleViewDetails} onBack={() => setPage("home")} />}
        {page === "contact" && <ContactPage onBack={() => setPage("home")} />}
        {page === "about" && <AboutPage onBack={() => setPage("home")} />}
        {page === "privacy" && <PrivacyPolicyPage onBack={() => setPage("home")} />}
        {page === "terms" && <TermsConditionsPage onBack={() => setPage("home")} />}
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

      {/* ── APP TOAST ── */}
      {showAppToast && (
        <div className="custom-toast">
          <div className="toast-content">
            <div className="toast-text">
              📱 <strong>Mobile App Status / मोबाइल ऐप:</strong><br />
              The Rojgar In Bihar official Android and iOS applications are currently under development. Stay tuned for instant job alerts! (रोजगार इन बिहार मोबाइल ऐप जल्द ही उपलब्ध होगा।)
            </div>
            <button className="toast-close-btn" onClick={() => setShowAppToast(false)}>×</button>
          </div>
        </div>
      )}

      <WhatsAppButton />
    </div>
  );
}
