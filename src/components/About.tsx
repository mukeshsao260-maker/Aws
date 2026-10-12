import React from 'react';
import { FEATURE_DATA } from '../lib/data';
import { ArrowUpRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section
      id="about"
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
            <span className="section-num">[ 01 ]</span>
            <span>// ABOUT THE DAY</span>
          </div>
          <div>FOCUS: EXPERIENTIAL LEARNING</div>
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
          TURN CURIOSITY INTO SOMETHING YOU CAN{' '}
          <span style={{ color: 'var(--accent-toxic)', textDecoration: 'underline' }}>
            SHIP.
          </span>
        </h2>

        {/* About Grid: Copy on Left, Feature Cards on Right */}
        <div
          className="about-layout-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'start'
          }}
        >
          {/* Left: Editorial Copy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p
              style={{
                fontSize: 'clamp(1.15rem, 1.6vw, 1.4rem)',
                lineHeight: 1.45,
                fontWeight: 600,
                color: 'var(--text-primary)',
                borderLeft: '3px solid var(--accent-toxic)',
                paddingLeft: '1.25rem'
              }}
            >
              Student Builder Community Day is a fictional campus event built around practical learning instead of long lectures.
            </p>

            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.65 }}>
              Explore cloud fundamentals, modern web development, AI-assisted workflows and deployment through short sessions, guided labs and community conversations.
            </p>

            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.65 }}>
              Bring your laptop, your questions and one idea you want to turn into a working prototype.
            </p>

            {/* Zine Sticker Annotation */}
            <div
              style={{
                marginTop: '1.5rem',
                padding: '1.25rem',
                border: '1px dashed var(--border-strong)',
                backgroundColor: 'var(--bg-tertiary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-primary)'
              }}
            >
              <div style={{ color: 'var(--accent-toxic)', fontWeight: 'bold', marginBottom: '4px' }}>
                &gt; COMMUNITY_DIRECTIVE:
              </div>
              <div>No slides without code. No lectures without labs. Prototype before sunset.</div>
            </div>
          </div>

          {/* Right: Feature Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: 'var(--border-color)', border: '1px solid var(--border-color)' }}>
            {FEATURE_DATA.map((feature) => (
              <article
                key={feature.index}
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  padding: '1.75rem 1.5rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1.5rem',
                  transition: 'background-color var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-elevated)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-primary)';
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        color: 'var(--accent-toxic)'
                      }}
                    >
                      {feature.index}
                    </span>
                    <span className="zine-tag" style={{ fontSize: '0.5625rem' }}>
                      {feature.tag}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {feature.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.5
                    }}
                  >
                    {feature.description}
                  </p>
                </div>

                <div
                  style={{
                    color: 'var(--text-muted)',
                    padding: '6px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ArrowUpRight size={18} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
