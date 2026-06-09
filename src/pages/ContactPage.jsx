import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from '../config';

export default function ContactPage({ onBack }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("Error: Please fill out all fields.");
      return;
    }

    setStatus("Loading: Sending your message...");

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      reply_to: email,
    };

    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatus(`Success: Thank you for your message, ${name}! We will get back to you soon.`);
        setName("");
        setEmail("");
        setMessage("");
      }, (err) => {
        console.error('FAILED...', err);
        setStatus("Error: Failed to send message. Please try again later.");
      });
  };

  return (
    <div className="section-box">
      <div className="section-header" style={{ background: "#1e293b", fontSize: "15px" }}>
        📬 Contact Us — RojgarInBihar
      </div>
      <div className="contact-form-container" style={{ borderTop: "none", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}>
        <h2 className="contact-form-heading">✉️ Send us a Message</h2>
        <form onSubmit={handleContactSubmit} className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contact-name">Your Name</label>
              <input
                type="text"
                id="contact-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Your Email</label>
              <input
                type="email"
                id="contact-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="contact-message">Your Message</label>
            <textarea
              id="contact-message"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>
          {status && (
            <div className={`contact-status ${status.startsWith("Success") ? "success" : status.startsWith("Error") ? "error" : "loading"}`}>
              {status.substring(status.indexOf(":") + 2)}
            </div>
          )}
          <button type="submit" className="btn-send" style={{ marginTop: '10px' }} disabled={status.startsWith("Loading")}>
            {status.startsWith("Loading") ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      <div style={{ padding: '0 20px 20px 20px' }}>
        <div className="disclaimer-box" style={{ marginTop: "16px" }}>
          <strong>⚠️ Important Disclaimer:</strong>
          <p style={{ fontSize: "12px", marginTop: "6px", lineHeight: "1.7" }}>
            RojgarInBihar (rojgarinbihar.com) is an independent informational portal.
            We do not charge any application fee from candidates. Always apply through official
            government/recruitment board websites. Not affiliated with any government body.
          </p>
        </div>

        <div style={{ 
          marginTop: '20px', 
          textAlign: 'center', 
          padding: '16px', 
          background: 'linear-gradient(135deg, #1e293b, #0f172a)',
          color: '#ffffff',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '700',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
        }}>
          💼 Managed by Suraj Kumar Gupta
        </div>
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
