import React from 'react';

export default function PrivacyPolicyPage({ onBack }) {
  return (
    <div className="section-box">
      <div className="section-header" style={{ background: "#003366", fontSize: "15px" }}>
        🔒 Privacy Policy — RojgarInBihar
      </div>
      <div className="sr-inner-padding" style={{ background: "#fff", lineHeight: "1.8", color: "#334155" }}>
        <h2 style={{ fontSize: "20px", color: "#1e3a8a", marginBottom: "12px", fontWeight: "800" }}>Privacy Policy</h2>
        <p style={{ marginBottom: "16px" }}>
          At RojgarInBihar (accessible from rojgarinbihar.com), candidate privacy is one of our top priorities. This Privacy Policy document outlines the types of information we collect and record, and how we utilize it.
        </p>
        <h3 style={{ fontSize: "16px", color: "#1e3a8a", marginBottom: "8px", fontWeight: "700", marginTop: "20px" }}>1. Information We Collect</h3>
        <p style={{ marginBottom: "12px" }}>
          We only collect personal information that you directly provide to us, such as your Name, Email, and Message content when using our <strong>Contact Us</strong> form. This information is used solely to reply to queries and is handled securely via client-side scripts.
        </p>
        <h3 style={{ fontSize: "16px", color: "#1e3a8a", marginBottom: "8px", fontWeight: "700", marginTop: "20px" }}>2. Local Document Processing (No Uploads)</h3>
        <p style={{ marginBottom: "12px" }}>
          To ensure absolute security of your documents, our <strong>File Converter Tools</strong> (PDF Merge, Split, Digital Signing) operate entirely client-side inside your browser. Your files are never uploaded to any remote server, preserving your data confidentiality.
        </p>
        <h3 style={{ fontSize: "16px", color: "#1e3a8a", marginBottom: "8px", fontWeight: "700", marginTop: "20px" }}>3. External Links</h3>
        <p style={{ marginBottom: "12px" }}>
          Our portal contains links to third-party government websites for applications, admit cards, or results. We do not control and are not responsible for the privacy practices or contents of those external websites. We encourage you to review their policies.
        </p>
        <h3 style={{ fontSize: "16px", color: "#1e3a8a", marginBottom: "8px", fontWeight: "700", marginTop: "20px" }}>4. Consent</h3>
        <p style={{ marginBottom: "12px" }}>
          By using our website, you hereby consent to our Privacy Policy and agree to its terms.
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
