import React from 'react';
import { STATISTICS_DATA } from '../lib/data';

export const Statistics: React.FC = () => {
  return (
    <section
      style={{
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-primary)'
      }}
    >
      <div className="container" style={{ padding: 0 }}>
        <div
          className="stats-grid-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            borderLeft: '1px solid var(--border-color)',
            borderRight: '1px solid var(--border-color)'
          }}
        >
          {STATISTICS_DATA.map((stat, idx) => (
            <div
              key={idx}
              className="grid-ruled"
              style={{
                padding: 'clamp(1.5rem, 3.5vw, 2.75rem) clamp(1rem, 2vw, 1.75rem)',
                borderRight: idx < 3 ? '1px solid var(--border-color)' : 'none',
                position: 'relative',
                transition: 'background-color var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {/* Technical Index Annotation */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  color: 'var(--text-muted)',
                  marginBottom: '1rem',
                  textTransform: 'uppercase'
                }}
              >
                <span>SYS.METRIC // 0{idx + 1}</span>
                <span className="zine-tag" style={{ fontSize: '0.5625rem', padding: '1px 5px' }}>
                  {stat.note}
                </span>
              </div>

              {/* Massive Brutalist Value */}
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 6vw, 4.75rem)',
                  fontWeight: 900,
                  lineHeight: 0.9,
                  letterSpacing: '-0.05em',
                  color: 'var(--text-primary)',
                  marginBottom: '0.75rem'
                }}
              >
                {stat.value}
              </div>

              {/* Description Label */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
