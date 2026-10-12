import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { FAQ_LIST } from '../data/eventData';
import { Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Registration', 'Prerequisites', 'Logistics', 'Technical'];

  const filteredFaqs = selectedCategory === 'ALL'
    ? FAQ_LIST
    : FAQ_LIST.filter((item) => item.category === selectedCategory);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="faq-page" style={{ paddingTop: 'clamp(2.5rem, 5vw, 4rem)', paddingBottom: 'var(--section-pad-y)' }}>
      <div className="container">
        {/* Page Heading */}
        <SectionHeading
          number="02"
          category="FREQUENTLY ASKED QUESTIONS"
          title="QUICK"
          highlightWord="ANSWERS."
          metaRight="INFO_DESK // ATTENDEE_SUPPORT"
          description="Clear answers regarding event fees, hardware prerequisites, AWS credentials, and deployment possibilities for the Student Builder Community Day."
        />

        {/* Category Filters */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '2.5rem',
            padding: '1rem',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)'
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', marginRight: '10px' }}>
            CATEGORIES:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={selectedCategory === cat ? 'zine-tag zine-tag-toxic' : 'zine-tag'}
              style={{
                cursor: 'pointer',
                fontSize: '0.6875rem',
                padding: '4px 10px',
                transition: 'all var(--transition-fast)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Editorial Accordion */}
        <div
          style={{
            maxWidth: '1000px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1px',
            backgroundColor: 'var(--border-color)',
            border: '1px solid var(--border-color)',
            marginBottom: '4rem'
          }}
        >
          {filteredFaqs.map((item, index) => {
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
                    padding: 'clamp(1.25rem, 2.5vw, 2rem)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1.5rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    backgroundColor: isOpen ? 'var(--bg-tertiary)' : 'transparent',
                    borderLeft: isOpen ? '4px solid var(--accent-toxic)' : '4px solid transparent',
                    transition: 'all var(--transition-fast)'
                  }}
                  data-cursor="TOGGLE"
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

                    <div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
                          fontWeight: 800,
                          letterSpacing: '-0.02em',
                          color: 'var(--text-primary)',
                          margin: 0
                        }}
                      >
                        {item.question}
                      </h3>
                      <span className="zine-tag" style={{ fontSize: '0.5625rem', marginTop: '4px', padding: '1px 5px' }}>
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      border: '1px solid var(--border-strong)',
                      backgroundColor: 'var(--bg-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isOpen ? 'var(--accent-toxic)' : 'var(--text-primary)',
                      flexShrink: 0
                    }}
                  >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '1.25rem clamp(1.25rem, 2.5vw, 2rem) 2rem',
                      paddingLeft: 'clamp(2.75rem, 5vw, 4.5rem)',
                      borderTop: '1px dashed var(--border-color)',
                      backgroundColor: 'var(--bg-tertiary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      lineHeight: 1.65,
                      color: 'var(--text-primary)'
                    }}
                  >
                    <p style={{ margin: 0 }}>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
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
              STILL HAVE QUESTIONS ABOUT THE EVENT?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
              Our campus organizing committee is happy to answer any questions about lab access or attendance.
            </p>
          </div>

          <Link to="/contact" className="btn-noise-outline" data-cursor="CONTACT">
            CONTACT THE ORGANIZERS →
          </Link>
        </div>
      </div>
    </div>
  );
};
