import React, { useState } from 'react';
import { FAQ_DATA } from '../lib/data';
import { Plus, Minus } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
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
            <span className="section-num">[ 05 ]</span>
            <span>// FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <div>INFO_DESK // ATTENDEE_SUPPORT</div>
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
          QUICK{' '}
          <span style={{ color: 'var(--accent-toxic)', textDecoration: 'underline' }}>
            ANSWERS.
          </span>
        </h2>

        {/* FAQ Accordion List */}
        <div
          style={{
            maxWidth: '960px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1px',
            backgroundColor: 'var(--border-color)',
            border: '1px solid var(--border-color)'
          }}
        >
          {FAQ_DATA.map((item, index) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  transition: 'background-color var(--transition-fast)'
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1.25rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    backgroundColor: isOpen ? 'var(--bg-tertiary)' : 'transparent',
                    borderLeft: isOpen ? '4px solid var(--accent-toxic)' : '4px solid transparent',
                    transition: 'all var(--transition-fast)'
                  }}
                  data-cursor="EXPAND"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        color: isOpen ? 'var(--accent-toxic)' : 'var(--text-muted)'
                      }}
                    >
                      [ 0{index + 1} ]
                    </span>

                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        color: 'var(--text-primary)'
                      }}
                    >
                      {item.question}
                    </span>
                  </div>

                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      border: '1px solid var(--border-strong)',
                      backgroundColor: 'var(--bg-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isOpen ? 'var(--accent-toxic)' : 'var(--text-primary)',
                      flexShrink: 0
                    }}
                  >
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '1.25rem clamp(1.25rem, 2.5vw, 1.75rem) 1.75rem',
                      paddingLeft: 'clamp(2.75rem, 5vw, 4rem)',
                      borderTop: '1px dashed var(--border-color)',
                      backgroundColor: 'var(--bg-tertiary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9375rem',
                      lineHeight: 1.6,
                      color: 'var(--text-primary)'
                    }}
                  >
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
