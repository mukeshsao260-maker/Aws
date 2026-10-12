import React from 'react';
import { COMMUNITY_DATA } from '../lib/data';

export const Community: React.FC = () => {
  return (
    <section
      id="community"
      style={{
        paddingTop: 'var(--section-pad-y)',
        paddingBottom: 'var(--section-pad-y)',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-secondary)',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Section Metadata Header */}
        <div className="section-meta-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="section-num">[ 03 ]</span>
            <span>// COMMUNITY LEADERSHIP</span>
          </div>
          <div>NETWORK: PEERS + VOLUNTEERS + ENGINEERS</div>
        </div>

        {/* Section Headline */}
        <h2
          className="section-heading-title"
          style={{
            fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            marginBottom: '3rem',
            color: 'var(--text-primary)',
            maxWidth: '900px'
          }}
        >
          PEOPLE WHO HELP YOU KEEP{' '}
          <span style={{ color: 'var(--accent-toxic)', textDecoration: 'underline' }}>
            BUILDING.
          </span>
        </h2>

        {/* 3-Column Community Grid */}
        <div
          className="grid-3-col"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem'
          }}
        >
          {COMMUNITY_DATA.map((person) => (
            <article
              key={person.id}
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                padding: '2rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.75rem',
                position: 'relative',
                transition: 'transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--text-primary)';
                e.currentTarget.style.transform = 'translate(-3px, -3px)';
                e.currentTarget.style.boxShadow = '6px 6px 0px 0px var(--accent-toxic)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Card Top: Avatar & Number */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                {/* Monospace Brutalist Avatar */}
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1.5px solid var(--border-strong)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.125rem',
                    fontWeight: 900,
                    color: 'var(--accent-toxic)',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {person.avatar}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: 'var(--text-muted)'
                    }}
                  >
                    #{person.id}
                  </span>
                  <span className="zine-tag" style={{ fontSize: '0.5625rem', padding: '1px 5px' }}>
                    {person.badge}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem'
                  }}
                >
                  {person.title}
                </h3>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--accent-toxic)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '0.75rem'
                  }}
                >
                  {person.subtitle}
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.55
                  }}
                >
                  {person.description}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div
                style={{
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  color: 'var(--text-dim)'
                }}
              >
                <span>OPEN_MENTORSHIP</span>
                <span>IN-PERSON</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
