import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { NAV_LINKS } from '../data/eventData';
import { prefersReducedMotion } from '../lib/animations';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState<'idle' | 'covering' | 'uncovering'>('idle');

  // Match current page meta
  const currentNav = NAV_LINKS.find((link) => link.path === location.pathname) || {
    label: 'PAGE',
    code: 'XX'
  };

  useEffect(() => {
    if (location.pathname === displayLocation.pathname) return;

    if (prefersReducedMotion()) {
      setDisplayLocation(location);
      window.scrollTo(0, 0);
      return;
    }

    const overlay = overlayRef.current;
    const text = textRef.current;
    if (!overlay || !text) {
      setDisplayLocation(location);
      return;
    }

    setTransitionStage('covering');

    const tl = gsap.timeline({
      onComplete: () => {
        setDisplayLocation(location);
        window.scrollTo(0, 0);

        // Stage 2: uncover new page
        setTransitionStage('uncovering');
        const uncoverTl = gsap.timeline({
          onComplete: () => setTransitionStage('idle')
        });

        uncoverTl
          .to(text, { opacity: 0, y: -20, duration: 0.25, ease: 'power2.in' })
          .to(
            overlay,
            {
              clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0 0%)',
              duration: 0.45,
              ease: 'power4.inOut'
            },
            '-=0.1'
          );
      }
    });

    tl.set(overlay, {
      clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
      display: 'flex'
    })
      .set(text, { opacity: 0, y: 30 })
      .to(overlay, {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 0.42,
        ease: 'power4.inOut'
      })
      .to(text, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, '-=0.15');

    return () => {
      tl.kill();
    };
  }, [location, displayLocation]);

  return (
    <>
      {/* Editorial Transition Overlay */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '4px solid var(--accent-toxic)',
          display: transitionStage === 'idle' ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: transitionStage === 'idle' ? 'none' : 'all',
          clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)'
        }}
      >
        <div
          ref={textRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              letterSpacing: '0.15em',
              color: 'var(--accent-toxic)',
              textTransform: 'uppercase'
            }}
          >
            SYS.ROUTING // [{currentNav.code}]
          </div>

          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              color: 'var(--text-primary)',
              textTransform: 'uppercase'
            }}
          >
            {currentNav.label}
          </div>

          <div
            style={{
              width: '80px',
              height: '2px',
              backgroundColor: 'var(--border-strong)',
              marginTop: '8px'
            }}
          />
        </div>
      </div>

      {/* Render children for currently displayed route */}
      <div key={displayLocation.pathname}>{children}</div>
    </>
  );
};
