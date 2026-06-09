import React from 'react';

export default function TermsConditionsPage({ onBack }) {
  return (
    <div className="section-box">
      <div className="section-header" style={{ background: "#003366", fontSize: "15px" }}>
        ⚖️ Terms & Conditions — RojgarInBihar
      </div>
      <div className="sr-inner-padding" style={{ background: "#fff", lineHeight: "1.8", color: "#334155" }}>
        <h2 style={{ fontSize: "20px", color: "#1e3a8a", marginBottom: "12px", fontWeight: "800" }}>Terms and Conditions</h2>
        <p style={{ marginBottom: "16px" }}>
          Welcome to RojgarInBihar (rojgarinbihar.com). By accessing and using this website, you agree to comply with and be bound by the following terms of service.
        </p>
        <h3 style={{ fontSize: "16px", color: "#1e3a8a", marginBottom: "8px", fontWeight: "700", marginTop: "20px" }}>1. Use of the Site</h3>
        <p style={{ marginBottom: "12px" }}>
          The contents of this website are for general informational purposes only. We compile exam dates, result notifications, and eligibility criteria from various official government press releases. While we strive to ensure maximum accuracy, information is subject to change.
        </p>
        <h3 style={{ fontSize: "16px", color: "#1e3a8a", marginBottom: "8px", fontWeight: "700", marginTop: "20px" }}>2. Disclaimers & Verification</h3>
        <p style={{ marginBottom: "12px" }}>
          <strong>RojgarInBihar is NOT a government organization</strong> and is not associated with any government recruitment board. We do not claim any official authority. Candidates are strongly advised to verify all details from official gazettes and portals before applying or paying any recruitment fee.
        </p>
        <p style={{ marginBottom: "12px" }}>
          We shall not be held liable for any inaccuracies, errors, delays, or any damage arising from the use of the info provided on this website.
        </p>
        <h3 style={{ fontSize: "16px", color: "#1e3a8a", marginBottom: "8px", fontWeight: "700", marginTop: "20px" }}>3. Prohibited Use</h3>
        <p style={{ marginBottom: "12px" }}>
          You are prohibited from using this website for scraping, harvesting data, distributing spam, or attempting to compromise the security features of the application.
        </p>
        <h3 style={{ fontSize: "16px", color: "#1e3a8a", marginBottom: "8px", fontWeight: "700", marginTop: "20px" }}>4. Modifications</h3>
        <p style={{ marginBottom: "12px" }}>
          We reserve the right to modify these terms and conditions at any time without prior notice.
        </p>
        {onBack && (
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <button 
              onClick={onBack} 
              className="btn-back"
              style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#475569', 
                color: '#fff', 
                border: 'none', 
                padding: '10px 24px', 
                borderRadius: '8px', 
                cursor: 'pointer', 
                fontWeight: '600',
                fontSize: '14px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#334155'}
              onMouseLeave={(e) => e.target.style.background = '#475569'}
            >
              &laquo; Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
