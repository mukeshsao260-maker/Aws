import React, { useEffect } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { COMMUNITY_PROFILES } from '../data/eventData';
import { setupScrollStagger } from '../lib/animations';
import { MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Speakers: React.FC = () => {
  useEffect(() => {
    const ctx = setupScrollStagger('.speakers-profile-grid', '.speaker-card-container');
    return () => ctx?.revert();
  }, []);

  return (
    <div className="speakers-page" style={{ paddingTop: 'clamp(2.5rem, 5vw, 4rem)', paddingBottom: 'var(--section-pad-y)' }}>
      <div className="container">
        {/* Page Heading */}
        <SectionHeading
          number="03"
          category="COMMUNITY & MENTORS"
          title="PEOPLE WHO HELP YOU KEEP"
          highlightWord="BUILDING."
          metaRight="OPEN MENTORSHIP CORPS"
          description="Experienced peer leaders, campus organizers, and guest engineers who provide code reviews, unblock architecture decisions, and help you deploy on AWS."
        />

        {/* Detailed Speaker / Community Profiles Grid */}
        <div
          className="speakers-profile-grid"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem',
            marginBottom: '4rem'
          }}
        >
          {COMMUNITY_PROFILES.map((person) => (
            <article
              key={person.id}
              className="speaker-card-container"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-strong)',
                boxShadow: '6px 6px 0px 0px rgba(0, 0, 0, 0.4)',
                padding: 'clamp(1.75rem, 3.5vw, 3rem)',
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                gap: 'clamp(1.5rem, 3vw, 3rem)',
                alignItems: 'start'
              }}
            >
              {/* Left Column: Brutalist Monospace Avatar Badge */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '90px',
                    height: '90px',
                    backgroundColor: 'var(--bg-primary)',
                    border: '2px solid var(--border-strong)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '2rem',
                    fontWeight: 900,
                    color: 'var(--accent-toxic)'
                  }}
                >
                  {person.avatar}
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    textAlign: 'center'
                  }}
                >
                  #{person.id}
                </div>
              </div>

              {/* Right Column: Name, Role, Bio, Topics, Quote */}
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '8px' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.6rem, 3vw, 2.25rem)',
                      fontWeight: 900,
                      letterSpacing: '-0.03em',
                      color: 'var(--text-primary)',
                      margin: 0
                    }}
                  >
                    {person.name}
                  </h3>

                  <span className="zine-tag zine-tag-toxic">{person.badge}</span>
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.875rem',
                    color: 'var(--accent-toxic)',
                    marginBottom: '1.25rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}
                >
                  {person.role}
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {person.bio}
                </p>

                {/* Topics Tags */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    KEY WORKSHOP SPECIALTIES:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {person.topics.map((t) => (
                      <span key={t} className="zine-tag" style={{ fontSize: '0.6875rem', padding: '3px 8px' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quote Box */}
                <div
                  style={{
                    borderLeft: '2px solid var(--accent-toxic)',
                    backgroundColor: 'var(--bg-tertiary)',
                    padding: '0.875rem 1.25rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8125rem',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <MessageSquare size={14} style={{ color: 'var(--accent-toxic)', flexShrink: 0 }} />
                  <span>"{person.quote}"</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mentorship Office Hours Notice */}
        <div
          style={{
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-secondary)',
            padding: '2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem'
          }}
        >
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.65rem', fontWeight: 900, marginBottom: '0.5rem' }}>
              NEED 1-ON-1 CODE REVIEW DURING THE EVENT?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
              All mentors hold open office hours in the Cloud Computing Lab between hands-on sessions.
            </p>
          </div>

          <Link to="/register" className="btn-noise-primary" data-cursor="JOIN">
            REGISTER TO MEET MENTORS →
          </Link>
        </div>
      </div>
    </div>
  );
};
