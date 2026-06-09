import React from 'react';

export default function AboutPage() {
  return (
    <div className="section-box">
      <div className="section-header" style={{ background: "#003366", fontSize: "15px" }}>
        ℹ️ About Us — RojgarInBihar
      </div>
      <div className="sr-inner-padding" style={{ background: "#fff", lineHeight: "1.8", color: "#334155" }}>
        <h2 style={{ fontSize: "20px", color: "#1e3a8a", marginBottom: "12px", fontWeight: "800" }}>Welcome to Rojgar In Bihar</h2>
        <p style={{ marginBottom: "16px" }}>
          <strong>RojgarInBihar (rojgarinbihar.com)</strong> is India's premier online information portal dedicated to providing fast, reliable, and comprehensive updates on government job openings (Sarkari Naukri), exam admit cards, result announcements, and academic admission updates, with a special emphasis on the state of Bihar.
        </p>
        <p style={{ marginBottom: "16px" }}>
          Our primary mission is to simplify the job-seeking journey for millions of aspirants by aggregating official recruitments, structuring key details (like dates, eligibility criteria, and fee structures), and offering direct access to official application forms.
        </p>
        <h3 style={{ fontSize: "16px", color: "#1e3a8a", marginBottom: "8px", fontWeight: "700", marginTop: "20px" }}>Why Choose RojgarInBihar?</h3>
        <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
          <li><strong>Speedy Updates:</strong> We track official circulars, news bulletins, and gazettes around the clock to post updates immediately.</li>
          <li><strong>Aesthetic & Accessible Layout:</strong> Styled for readability across desktops, tablets, and smartphones.</li>
          <li><strong>Integrated Document Tools:</strong> Free local PDF converters to merge, split, or digitally sign application materials.</li>
          <li><strong>WhatsApp & Telegram Alerts:</strong> Instant helpdesk and news feeds to ensure you never miss a deadline.</li>
        </ul>
        <div style={{ marginTop: "30px", borderTop: "1px solid #e2e8f0", paddingTop: "20px", textAlign: "center", fontWeight: "700", color: "#0f172a" }}>
          👤 Managed by: Suraj Kumar Gupta
        </div>
      </div>
    </div>
  );
}
