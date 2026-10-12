import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { EVENT_INFO } from '../data/eventData';
import { saveInquiryRecord, StoredInquiryRecord } from '../lib/inquiries';
import { MapPin, Send, CheckCircle2, ArrowRight, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ContactProps {
  onShowToast?: (message: string, isError?: boolean) => void;
}

export const Contact: React.FC<ContactProps> = ({ onShowToast }) => {
  const [inquirySent, setInquirySent] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<StoredInquiryRecord | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    topic: 'General Event Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      onShowToast?.('Please fill out all fields before sending.', true);
      return;
    }

    const saved = saveInquiryRecord({
      name: contactForm.name,
      email: contactForm.email,
      topic: contactForm.topic,
      message: contactForm.message
    });

    setSubmittedInquiry(saved);
    setInquirySent(true);
    onShowToast?.(`✓ Inquiry recorded in organizer master database (${saved.id})!`, false);
  };

  const handleResetForm = () => {
    setContactForm({
      name: '',
      email: '',
      topic: 'General Event Inquiry',
      message: ''
    });
    setSubmittedInquiry(null);
    setInquirySent(false);
  };

  return (
    <div className="contact-page" style={{ paddingTop: 'clamp(2.5rem, 5vw, 4rem)', paddingBottom: 'var(--section-pad-y)' }}>
      <div className="container">
        {/* Page Heading */}
        <SectionHeading
          number="03"
          category="CAMPUS & LIAISON CONTACT"
          title="CONNECT WITH THE"
          highlightWord="ORGANIZERS."
          metaRight="COMMUNITY COORDINATION DESK"
          description="Campus venue logistics, university access guidelines, transport navigation, and direct liaison channels for the AWS Student Builder Community Day."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'start',
            marginBottom: '4rem'
          }}
          className="registration-grid"
        >
          {/* Left Column: Campus Coordinates & Transport Info */}
          <div>
            {/* Campus Address Card */}
            <div
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-strong)',
                boxShadow: '6px 6px 0px 0px rgba(0, 0, 0, 0.4)',
                padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                marginBottom: '2rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
                <MapPin size={18} style={{ color: 'var(--accent-toxic)' }} />
                <span className="zine-tag zine-tag-toxic">PRIMARY VENUE</span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 900, marginBottom: '0.75rem' }}>
                {EVENT_INFO.campus}
              </h3>

              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {EVENT_INFO.venue}
              </p>

              {/* Technical GPS Metadata */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  backgroundColor: 'var(--bg-primary)',
                  padding: '1rem',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div>
                  <span style={{ color: 'var(--text-dim)' }}>GPS_COORDINATES: </span>
                  <strong style={{ color: 'var(--accent-toxic)' }}>{EVENT_INFO.coordinates}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-dim)' }}>CITY / STATE: </span>
                  <span>{EVENT_INFO.city}, {EVENT_INFO.state}, India</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-dim)' }}>MAIN GATE: </span>
                  <span>Kurud Road Reception Entrance</span>
                </div>
              </div>
            </div>

            {/* Transport & Access Guidelines */}
            <div
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                padding: '1.75rem'
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-toxic)', marginBottom: '0.75rem' }}>
                TRANSIT & ENTRY PROTOCOL:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                <div>• Nearest Railway Station: Durg Junction (DURG) / Raipur Junction (R).</div>
                <div>• Local Transit: Auto-rickshaws and campus shuttles connect Kohka and Kurud Road.</div>
                <div>• Security Clearance: Display your registration confirmation and Student ID card at Gate 01.</div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Contact Dispatch Form */}
          <div
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-strong)',
              boxShadow: '8px 8px 0px 0px rgba(0, 0, 0, 0.65)',
              padding: 'clamp(1.5rem, 3.5vw, 2.5rem)'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                color: 'var(--text-muted)',
                paddingBottom: '1rem',
                marginBottom: '1.5rem',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <span>DISPATCH_LOG // VOLUNTEER_INQUIRY</span>
              <span className="zine-tag zine-tag-toxic">STORED IN MASTER EXCEL</span>
            </div>

            {inquirySent && submittedInquiry ? (
              <div
                style={{
                  padding: '1.75rem',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--accent-toxic)',
                  fontFamily: 'var(--font-mono)',
                  animation: 'fadeIn 0.3s ease-out'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                  <CheckCircle2 size={24} style={{ color: 'var(--accent-toxic)', flexShrink: 0 }} />
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', margin: 0, fontWeight: 800 }}>
                      INQUIRY RECORDED & DISPATCHED
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-toxic)' }}>
                      REF_ID: {submittedInquiry.id}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    padding: '1rem',
                    marginBottom: '1.25rem',
                    fontSize: '0.8125rem',
                    lineHeight: 1.6
                  }}
                >
                  <div style={{ color: 'var(--text-muted)' }}>NAME: <strong style={{ color: 'var(--text-primary)' }}>{submittedInquiry.name}</strong></div>
                  <div style={{ color: 'var(--text-muted)' }}>EMAIL: <strong style={{ color: 'var(--text-primary)' }}>{submittedInquiry.email}</strong></div>
                  <div style={{ color: 'var(--text-muted)' }}>TOPIC: <strong style={{ color: 'var(--accent-toxic)' }}>{submittedInquiry.topic}</strong></div>
                  <div style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                    MESSAGE: <span style={{ color: 'var(--text-primary)' }}>"{submittedInquiry.message}"</span>
                  </div>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  Your inquiry has been stored in the organizer's Master Inquiries Excel Sheet. A student coordinator will get back to you shortly.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="btn-noise-outline"
                    style={{ width: '100%', padding: '0.75rem', fontSize: '0.75rem' }}
                  >
                    <RefreshCw size={14} />
                    <span>SEND ANOTHER QUESTION</span>
                  </button>

                  <Link
                    to="/"
                    className="btn-noise-primary"
                    style={{ width: '100%', padding: '0.75rem', fontSize: '0.75rem', textDecoration: 'none' }}
                  >
                    <span>RETURN TO HOME</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label
                    htmlFor="contactName"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      marginBottom: '0.5rem',
                      color: 'var(--text-primary)'
                    }}
                  >
                    Your Name <span style={{ color: 'var(--accent-toxic)' }}>*</span>
                  </label>
                  <input
                    id="contactName"
                    type="text"
                    required
                    placeholder="e.g. Mukesh Kumar"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.875rem',
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border-strong)',
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label
                    htmlFor="contactEmail"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      marginBottom: '0.5rem',
                      color: 'var(--text-primary)'
                    }}
                  >
                    Email Address <span style={{ color: 'var(--accent-toxic)' }}>*</span>
                  </label>
                  <input
                    id="contactEmail"
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.875rem',
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border-strong)',
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label
                    htmlFor="contactTopic"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      marginBottom: '0.5rem',
                      color: 'var(--text-primary)'
                    }}
                  >
                    Topic / Category
                  </label>
                  <select
                    id="contactTopic"
                    value={contactForm.topic}
                    onChange={(e) => setContactForm({ ...contactForm, topic: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.875rem',
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border-strong)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="General Event Inquiry">General Event Inquiry</option>
                    <option value="Workshop & Cloud Credentials">Workshop & Cloud Credentials</option>
                    <option value="Transport & Campus Transit">Transport & Campus Transit</option>
                    <option value="Student Badge & Check-in">Student Badge & Check-in</option>
                    <option value="Campus Liaison & Volunteering">Campus Liaison & Volunteering</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1.75rem' }}>
                  <label
                    htmlFor="contactMsg"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      marginBottom: '0.5rem',
                      color: 'var(--text-primary)'
                    }}
                  >
                    Message / Question <span style={{ color: 'var(--accent-toxic)' }}>*</span>
                  </label>
                  <textarea
                    id="contactMsg"
                    rows={4}
                    required
                    placeholder="Question about campus lab, transport, credentials, or sessions..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.875rem',
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border-strong)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button type="submit" className="btn-noise-primary" style={{ width: '100%' }}>
                  <span>SEND INQUIRY TO ORGANIZERS</span>
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
