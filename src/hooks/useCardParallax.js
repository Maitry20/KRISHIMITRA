import { useEffect } from 'react';

/**
 * useCardParallax - Hook for applying GPU-accelerated scroll parallax to card elements.
 * 
 * Automatically attaches smooth scroll- scrubbing 3D depth, vertical/horizontal shifts,
 * scale transitions based on viewport position, and hover elevation to targeted card containers.
 * Does NOT alter layout geometry, top/left, margins, padding, width, or height.
 */
export function useCardParallax(selector = '.card-elevated, .parallax-card') {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion && prefersReducedMotion.matches) return;

    // Card depth speed patterns as specified
    const depthSpeeds = [0.15, 0.25, 0.18, 0.30, 0.20];

    const cards = Array.from(document.querySelectorAll(selector));
    if (cards.length === 0) return;

    // Attach mouse event listeners to each card for smooth hover
    const mouseStateMap = new WeakMap();

    cards.forEach((card, idx) => {
      const speed = depthSpeeds[idx % depthSpeeds.length];
      mouseStateMap.set(card, { isHovered: false, speed, index: idx });

      const handleMouseEnter = () => {
        const state = mouseStateMap.get(card);
        if (state) state.isHovered = true;
        card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, filter 0.4s ease, opacity 0.4s ease';
        card.style.transform = 'perspective(1000px) translate3d(0px, -4px, 12px) scale(1.03) rotateX(0deg) rotateY(0deg)';
        card.style.filter = 'brightness(1.025)';
        card.style.boxShadow = '0 20px 38px rgba(45, 106, 79, 0.22)';
      };

      const handleMouseLeave = () => {
        const state = mouseStateMap.get(card);
        if (state) state.isHovered = false;
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease, filter 0.5s ease, opacity 0.5s ease';
        card.style.filter = 'none';
        card.style.boxShadow = '';
        requestAnimationFrame(() => {
          card.style.transition = 'none';
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
      card._parallaxCleanup = () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });

    let animFrameId = null;

    const updateParallax = () => {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

      // Responsive multiplier
      let responsiveFactor = 1;
      if (isTablet) responsiveFactor = 0.6; // 40% reduction on tablet
      if (isMobile) responsiveFactor = 0.3; // subtle vertical only on mobile

      cards.forEach((card) => {
        const state = mouseStateMap.get(card);
        if (!state || state.isHovered) return;

        const rect = card.getBoundingClientRect();
        
        // Skip off-screen cards far outside viewport to save GPU frames
        if (rect.bottom < -200 || rect.top > windowHeight + 200) return;

        const viewportCenter = windowHeight / 2;
        const cardCenter = rect.top + rect.height / 2;
        const progress = (cardCenter - viewportCenter) / (windowHeight / 2);
        const clampedProgress = Math.max(-1.5, Math.min(1.5, progress));

        const speed = state.speed;

        // 1. Vertical TranslateY (20-40px max)
        const maxTransY = 32 * speed * responsiveFactor;
        const translateY = clampedProgress * maxTransY;

        // 2. Horizontal TranslateX (8-12px max, desktop/tablet only)
        let translateX = 0;
        if (!isMobile) {
          const direction = state.index % 2 === 0 ? 1 : -1;
          translateX = clampedProgress * 10 * speed * direction * responsiveFactor;
        }

        // 3. Scale Shift (0.96 approaching -> ~1.02 at center -> ~0.98 passing)
        const distFromCenter = Math.abs(clampedProgress);
        let scale = 1;
        if (clampedProgress > 0.1) {
          scale = 0.96 + (1 - Math.min(1, distFromCenter)) * 0.06;
        } else if (distFromCenter <= 0.1) {
          scale = 1.02;
        } else {
          scale = 1.02 - (distFromCenter * 0.04);
          scale = Math.max(0.97, scale);
        }

        // 4. Opacity Transition (0.75 below -> 1 near center)
        let opacity = 1;
        if (clampedProgress > 0.6) {
          opacity = Math.max(0.75, 1 - (clampedProgress - 0.6) * 0.5);
        }

        // 5. 3D Perspective & Rotation (rotateX 1-2deg max, desktop only)
        let rotateX = 0;
        let rotateY = 0;
        if (!isMobile && !isTablet) {
          rotateX = clampedProgress * -1.5 * speed;
          rotateY = (state.index % 2 === 0 ? 1 : -1) * clampedProgress * 0.8 * speed;
        }

        // Apply hardware accelerated transform strictly without changing document layout
        card.style.transform = `perspective(1000px) translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, 0px) scale(${scale.toFixed(3)}) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
        card.style.opacity = opacity.toFixed(2);
        card.style.willChange = 'transform, opacity';
      });
    };

    const onScrollOrResize = () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      animFrameId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    // Trigger initial frame
    updateParallax();

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (animFrameId) cancelAnimationFrame(animFrameId);
      cards.forEach((card) => {
        if (card._parallaxCleanup) card._parallaxCleanup();
      });
    };
  }, [selector]);
}
