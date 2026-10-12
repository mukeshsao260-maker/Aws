import React from 'react';
import { Terminal } from './Terminal';
import { ArrowDown, ArrowRight, Calendar, Clock, MapPin } from 'lucide-react';
import { EVENT_DATA } from '../lib/data';

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      style={{
        position: 'relative',
        paddingTop: 'clamp(2.5rem, 5vw, 4.5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5.5rem)',
        borderBottom: '1px solid var(--border-color)',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Structural Grid lines */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: '25%',
          width: '1px',
          height: '100%',
          backgroundColor: 'var(--grid-line-color)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '15%',
          width: '1px',
          height: '100%',
          backgroundColor: 'var(--grid-line-color)',
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        {/* Top Eyebrow Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '2rem',
            paddingBottom: '0.75rem',
            borderBottom: '1px dashed var(--border-color)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              className="live-pulse"
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-toxic)',
                display: 'inline-block'
              }}
            />
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              {EVENT_DATA.location.toUpperCase()} · {EVENT_DATA.state.toUpperCase()}
            </span>
          </div>

          <div style={{ color: 'var(--text-muted)', display: 'flex', gap: '16px' }}>
            <span>EDITION: 2026 // PROTOCOL</span>
            <span style={{ color: 'var(--accent-toxic)' }}>STATUS: CONFIRMED</span>
          </div>
        </div>

        {/* Hero Grid Layout */}
        <div
          className="hero-layout-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.25fr 1fr',
            gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Editorial Display Typography */}
          <div>
            <h1
              className="hero-display-title"
              style={{
                fontSize: 'clamp(3.2rem, 8vw, 6.2rem)',
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                lineHeight: 0.88,
                letterSpacing: '-0.05em',
                marginBottom: '1.75rem',
                color: 'var(--text-primary)'
              }}
            >
              AWS.<br />
              STUDENT.<br />
              <span
                style={{
                  color: 'var(--accent-toxic)',
                  WebkitTextStroke: '1px var(--text-primary)',
                  display: 'inline-block'
                }}
              >
                COMMUNITY.
              </span><br />
              DAY.
            </h1>

            {/* Hero Lead Paragraph */}
            <p
              style={{
                fontSize: 'clamp(1rem, 1.35vw, 1.25rem)',
                lineHeight: 1.5,
                color: 'var(--text-primary)',
                maxWidth: '560px',
                marginBottom: '2.25rem',
                borderLeft: '2px solid var(--accent-toxic)',
                paddingLeft: '1.25rem'
              }}
            >
              {EVENT_DATA.lead}
            </p>

            {/* Hero Action Buttons */}
            <div
              className="hero-actions-container"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '3rem'
              }}
            >
              <a
                href="#register"
                className="btn-noise-primary"
                data-cursor="RESERVE"
              >
                RESERVE MY SEAT
                <ArrowRight size={16} />
              </a>

              <a
                href="#schedule"
                className="btn-noise-outline"
                data-cursor="EXPLORE"
              >
                EXPLORE THE DAY
                <ArrowDown size={16} />
              </a>
            </div>

            {/* Event Metadata Ticket Block */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '1px',
                backgroundColor: 'var(--border-color)',
                border: '1px solid var(--border-color)',
                fontFamily: 'var(--font-mono)'
              }}
            >
              <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem' }}>
                <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Calendar size={11} /> DATE
                </div>
                <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{EVENT_DATA.date}</strong>
              </div>

              <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem' }}>
                <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Clock size={11} /> TIME
                </div>
                <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{EVENT_DATA.time}</strong>
              </div>

              <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem' }}>
                <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <MapPin size={11} /> VENUE
                </div>
                <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{EVENT_DATA.location}</strong>
              </div>
            </div>
          </div>

          {/* Right Column: Terminal Component */}
          <div style={{ position: 'relative' }}>
            {/* Background Decorative Tag */}
            <div
              style={{
                position: 'absolute',
                top: '-18px',
                right: '12px',
                zIndex: 2,
                display: 'flex',
                gap: '6px'
              }}
            >
              <span className="zine-tag zine-tag-red">SYS: ONLINE</span>
              <span className="zine-tag">REV.2026</span>
            </div>

            <Terminal />

            {/* Supplementary Annotation */}
            <div
              style={{
                marginTop: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                color: 'var(--text-muted)'
              }}
            >
              <span>// PROMPT & CLOUD RUNTIME</span>
              <span>RUNGTA_CAMPUS_NET</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
