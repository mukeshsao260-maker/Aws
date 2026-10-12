import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Respect prefers-reduced-motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Clean up all ScrollTriggers
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((st) => st.kill());
};

// Staggered hero text entrance
export const animateHeroEntrance = (
  containerSelector: string,
  onComplete?: () => void
) => {
  if (prefersReducedMotion()) {
    onComplete?.();
    return;
  }

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ onComplete });

    tl.fromTo(
      '.hero-stagger-line',
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.05,
        stagger: 0.12,
        ease: 'power4.out'
      }
    )
      .fromTo(
        '.hero-stagger-fade',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        '.hero-terminal-reveal',
        { scale: 0.95, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.7'
      );
  }, containerSelector);

  return ctx;
};

// Staggered reveal for cards and list items
export const setupScrollStagger = (
  triggerSelector: string,
  itemSelector: string,
  staggerDelay = 0.12
) => {
  if (prefersReducedMotion()) return;

  const ctx = gsap.context(() => {
    gsap.fromTo(
      itemSelector,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: staggerDelay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: triggerSelector,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  return ctx;
};

// Curtain image reveal with clip-path
export const setupImageReveal = (imageSelector: string) => {
  if (prefersReducedMotion()) return;

  const ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>(imageSelector).forEach((img) => {
      gsap.fromTo(
        img,
        { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', scale: 1.1 },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          scale: 1,
          duration: 1.2,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: img,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  });

  return ctx;
};

// Horizontal scroll sequence for gallery/timelines
export const setupHorizontalScroll = (
  sectionSelector: string,
  trackSelector: string
) => {
  if (prefersReducedMotion()) return;

  const section = document.querySelector<HTMLElement>(sectionSelector);
  const track = document.querySelector<HTMLElement>(trackSelector);

  if (!section || !track) return;

  const ctx = gsap.context(() => {
    const totalScroll = track.scrollWidth - window.innerWidth;

    if (totalScroll > 0) {
      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true
        }
      });
    }
  });

  return ctx;
};

// Text fill highlight on scroll
export const setupTextFillAnimation = (elementSelector: string) => {
  if (prefersReducedMotion()) return;

  const ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>(elementSelector).forEach((el) => {
      gsap.fromTo(
        el,
        { backgroundSize: '0% 100%' },
        {
          backgroundSize: '100% 100%',
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 0.5
          }
        }
      );
    });
  });

  return ctx;
};
