import React, { useEffect, useRef, useState } from 'react';

/**
 * ParallaxCard - Premium Scroll Parallax Wrapper Component
 * 
 * Applies smooth GPU-accelerated 3D scroll depth, subtle vertical & horizontal translation,
 * scale shift based on viewport position, and smooth hover elevation without disturbing layout.
 */
export default function ParallaxCard({
  children,
  speed = 0.2,
  cardIndex = 0,
  className = '',
  style = {},
  onClick,
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const animFrameId = useRef(null);

  useEffect(() => {
    const cardEl = cardRef.current;
    if (!cardEl) return;

    // Respect prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery && mediaQuery.matches) {
        cardEl.style.transform = 'none';
        cardEl.style.opacity = '1';
        return;
      }
    }

    const updateParallax = () => {
      if (!cardEl || isHovered) return;

      const rect = cardEl.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Calculate progress relative to viewport center (-1 = below, 0 = viewport center, +1 = above)
      const viewportCenter = windowHeight / 2;
      const cardCenter = rect.top + rect.height / 2;
      const progress = (cardCenter - viewportCenter) / (windowHeight / 2);

      // Clamp progress range
      const clampedProgress = Math.max(-1.5, Math.min(1.5, progress));

      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

      // Responsive parallax scaling factor
      let responsiveFactor = 1;
      if (isTablet) responsiveFactor = 0.6; // 40% reduction on tablet
      if (isMobile) responsiveFactor = 0.3; // subtle vertical only on mobile

      // 1. Vertical TranslateY (20px - 40px max)
      const maxTransY = 32 * speed * responsiveFactor;
      const translateY = clampedProgress * maxTransY;

      // 2. Horizontal TranslateX (8px - 12px max, desktop & tablet only)
      let translateX = 0;
      if (!isMobile) {
        const direction = cardIndex % 2 === 0 ? 1 : -1;
        translateX = clampedProgress * 10 * speed * direction * responsiveFactor;
      }

      // 3. Scale calculation (0.96 when approaching -> ~1.02 at center -> ~0.98 when passing)
      const distFromCenter = Math.abs(clampedProgress);
      let scale = 1;
      if (clampedProgress > 0.1) {
        // Below center / coming into view
        scale = 0.96 + (1 - Math.min(1, distFromCenter)) * 0.06;
      } else if (distFromCenter <= 0.1) {
        // Viewport center peak
        scale = 1.02;
      } else {
        // Passing above center
        scale = 1.02 - (distFromCenter * 0.04);
        scale = Math.max(0.97, scale);
      }

      // 4. Opacity transition (0.75 when off-screen below -> 1 near center)
      let opacity = 1;
      if (clampedProgress > 0.6) {
        opacity = Math.max(0.75, 1 - (clampedProgress - 0.6) * 0.5);
      }

      // 5. 3D Perspective & Rotation (rotateX 1-2deg max, desktop only)
      let rotateX = 0;
      let rotateY = 0;
      if (!isMobile && !isTablet) {
        rotateX = clampedProgress * -1.5 * speed;
        rotateY = (cardIndex % 2 === 0 ? 1 : -1) * clampedProgress * 0.8 * speed;
      }

      // Apply hardware accelerated transform
      cardEl.style.transform = `perspective(1000px) translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, 0px) scale(${scale.toFixed(3)}) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      cardEl.style.opacity = opacity.toFixed(2);
      cardEl.style.willChange = 'transform, opacity';
    };

    const onScrollOrResize = () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      animFrameId.current = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    // Initial positioning
    updateParallax();

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [speed, cardIndex, isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, filter 0.4s ease, opacity 0.4s ease';
      cardRef.current.style.transform = 'perspective(1000px) translate3d(0px, -4px, 12px) scale(1.03) rotateX(0deg) rotateY(0deg)';
      cardRef.current.style.filter = 'brightness(1.025)';
      cardRef.current.style.boxShadow = '0 20px 38px rgba(45, 106, 79, 0.22)';
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease, filter 0.5s ease, opacity 0.5s ease';
      cardRef.current.style.filter = 'none';
      cardRef.current.style.boxShadow = '';
      requestAnimationFrame(() => {
        if (cardRef.current) {
          cardRef.current.style.transition = 'none';
        }
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        ...style
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
