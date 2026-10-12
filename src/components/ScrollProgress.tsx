import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setPercent(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        zIndex: 9999,
        background: 'rgba(255, 255, 255, 0.05)',
        pointerEvents: 'none'
      }}
      aria-hidden="true"
    >
      <div
        style={{
          height: '100%',
          width: `${percent}%`,
          backgroundColor: 'var(--accent-toxic)',
          transition: 'width 60ms linear',
          boxShadow: '0 0 8px var(--accent-toxic)'
        }}
      />
    </div>
  );
};
