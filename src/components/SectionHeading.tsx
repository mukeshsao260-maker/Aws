import React from 'react';

interface SectionHeadingProps {
  number: string;
  category: string;
  title: string;
  highlightWord?: string;
  metaRight?: string;
  description?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  category,
  title,
  highlightWord,
  metaRight,
  description
}) => {
  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Chapter Metadata Line */}
      <div className="section-meta-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="section-num">[{number}]</span>
          <span>// {category.toUpperCase()}</span>
        </div>
        {metaRight && <div>{metaRight.toUpperCase()}</div>}
      </div>

      {/* Main Display Headline */}
      <h2
        className="section-heading-title"
        style={{
          fontSize: 'clamp(2.4rem, 6vw, 4.75rem)',
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          lineHeight: 0.95,
          letterSpacing: '-0.04em',
          color: 'var(--text-primary)',
          maxWidth: '1000px',
          textTransform: 'uppercase',
          marginBottom: description ? '1.25rem' : '0'
        }}
      >
        {title}{' '}
        {highlightWord && (
          <span style={{ color: 'var(--accent-toxic)', textDecoration: 'underline' }}>
            {highlightWord}
          </span>
        )}
      </h2>

      {/* Optional Description */}
      {description && (
        <p
          style={{
            fontSize: 'clamp(1rem, 1.35vw, 1.2rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.55,
            maxWidth: '720px',
            borderLeft: '2px solid var(--accent-toxic)',
            paddingLeft: '1rem',
            marginTop: '1rem'
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
};
