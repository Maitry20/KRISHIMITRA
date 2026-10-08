import { useEffect } from 'react';

/**
 * useSectionClipWipe - Scroll-Scrubbed Clip-Path Section Wipe Transition Hook
 * 
 * Creates a cinematic circular/curved mask reveal between website sections as the user scrolls.
 * Controlled 100% by scroll progress with zero layout shift.
 */
export function useSectionClipWipe() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isReducedMotion = mediaQuery && mediaQuery.matches;

    // Define deliberate mask origins for each consecutive section transition pair
    const transitionOrigins = [
      '50% 100%', // Hero -> Monitor (Bottom-Center)
      '20% 100%', // Monitor -> AI Irrigation (Bottom-Left)
      '80% 100%', // AI Irrigation -> Interactive Sim (Bottom-Right)
      '50% 50%',  // Interactive Sim -> Water Conservation (Center)
      '50% 100%', // Water Conservation -> Automation vs AI (Bottom-Center)
      '25% 100%', // Automation vs AI -> Plant Health (Bottom-Left)
      '75% 100%', // Plant Health -> How AI Works (Bottom-Right)
      '50% 50%',  // How AI Works -> Architecture (Center)
      '50% 100%', // Architecture -> Impact Bharat (Bottom-Center)
    ];

    const sections = Array.from(document.querySelectorAll('main > section'));
    if (sections.length < 2) return;

    // Set up section elements with scoped transition classes
    sections.forEach((sec, idx) => {
      sec.classList.add('pierc-clip-section');
      // Set section index attribute
      sec.setAttribute('data-clip-index', idx);
      
      // Skip the first section (Hero) as it's the starting view
      if (idx > 0) {
        sec.style.willChange = 'clip-path, transform, opacity';
      }
    });

    let animFrameId = null;

    const updateClipWipes = () => {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const isMobile = window.innerWidth < 768;

      sections.forEach((sec, idx) => {
        if (idx === 0) return; // Skip Hero

        const rect = sec.getBoundingClientRect();
        const origin = transitionOrigins[(idx - 1) % transitionOrigins.length];

        // Only compute when section top is approaching or inside viewport
        if (rect.top > windowHeight || rect.bottom < 0) {
          if (rect.top > windowHeight) {
            // Unrevealed state (below viewport)
            if (!isReducedMotion) {
              sec.style.clipPath = `circle(0% at ${origin})`;
              sec.style.transform = isMobile ? 'scale(1.02)' : 'scale(1.05)';
              sec.style.opacity = '0.85';
            }
          } else {
            // Passed state (above viewport)
            sec.style.clipPath = 'none';
            sec.style.transform = 'none';
            sec.style.opacity = '1';
          }
          return;
        }

        // Calculate scroll progress (0 when section top enters bottom of window -> 1 when 75% revealed)
        const revealThreshold = windowHeight * 0.85;
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / revealThreshold));

        if (isReducedMotion) {
          // Simple crossfade for reduced motion
          sec.style.clipPath = 'none';
          sec.style.transform = 'none';
          sec.style.opacity = (0.85 + progress * 0.15).toFixed(2);
          return;
        }

        if (progress >= 0.99) {
          // Fully revealed: remove clip-path to save GPU compositing
          sec.style.clipPath = 'none';
          sec.style.transform = 'none';
          sec.style.opacity = '1';
        } else {
          // Scrubbed circular mask expansion: 0% -> 150%
          const radius = (progress * 150).toFixed(1);
          sec.style.clipPath = `circle(${radius}% at ${origin})`;

          // Depth effect: scale 1.05 -> 1.00 & opacity 0.85 -> 1.00
          const scaleFactor = isMobile ? (1.02 - progress * 0.02) : (1.05 - progress * 0.05);
          const opacityVal = 0.85 + progress * 0.15;

          sec.style.transform = `scale(${scaleFactor.toFixed(3)})`;
          sec.style.opacity = opacityVal.toFixed(2);
        }
      });
    };

    const onScrollOrResize = () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      animFrameId = requestAnimationFrame(updateClipWipes);
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    // Initial calculation
    updateClipWipes();

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (animFrameId) cancelAnimationFrame(animFrameId);
      sections.forEach((sec) => {
        sec.style.clipPath = '';
        sec.style.transform = '';
        sec.style.opacity = '';
        sec.style.willChange = '';
      });
    };
  }, []);
}
